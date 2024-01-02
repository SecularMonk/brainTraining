import { User, Quiz, Question } from "../__generated__/resolvers-types";
import { randomUUID } from "crypto";
import { dataSources } from "..";
import { logger } from "../logger.ts";
import { pickNumberFromDistribution, bindNumberToRange } from "../helpers.ts";
import { generateSanitisedStrings } from "./familyFriendlyStrings.ts";

const text = { consonants: "BCDFGHJKLMNPQRSTVWXYZ", vowels: "AEIOU" };
type QuestionInitialisationData = { value: number; valueName: string };
type Difficulty = "easy" | "normal" | "hard";
type DifficultySettings = { numQuestions: number; problemSizeRange: { min: number; max: number } };

export async function generateNewUserQuiz({
   userId,
   quizzesDataSource,
   dictionaryDataSource,
   difficulty = "easy",
}: {
   userId: User["_id"];
   quizzesDataSource: typeof dataSources.Quizzes;
   dictionaryDataSource: typeof dataSources.AllowedStrings;
   difficulty?: Difficulty;
}): Promise<Quiz | undefined> {
   const questions: Question[] = [];
   const quizId = randomUUID();
   const { numQuestions, problemSizeRange } = getDifficultySettings(difficulty);
   for (let i = 0; i < numQuestions; i++) {
      const problemSize = randomIntFromInterval({ min: problemSizeRange.min, max: problemSizeRange.max });
      const question = await createQuestion({ quizId, problemSize, dictionaryDataSource });
      questions.push(question);
   }

   const quiz = {
      _id: quizId,
      userId,
      difficulty,
      createdAt: new Date(),
      questions,
   };

   const result = await quizzesDataSource.insertOne(quiz);
   if (result) {
      return quiz;
   } else {
      logger.error(`Failed to created quiz. Quiz details: ${JSON.stringify(quiz)}`);
   }
}

function getDifficultySettings(difficulty: Difficulty): DifficultySettings {
   const lowercaseDifficulty = difficulty?.toLowerCase();
   switch (lowercaseDifficulty) {
      case "hard": {
         return { numQuestions: 15, problemSizeRange: { min: 5, max: 7 } };
      }
      case "normal": {
         return { numQuestions: 10, problemSizeRange: { min: 4, max: 6 } };
      }
      case "easy":
      default: {
         return { numQuestions: 5, problemSizeRange: { min: 3, max: 3 } };
      }
   }
}

async function generateStringsAndValues(numItems: number = 3, dictionaryDataSource: typeof dataSources.AllowedStrings) {
   try {
      const internalValues: QuestionInitialisationData[] = [];
      const aggregationResult = await generateSanitisedStrings({ dataSource: dictionaryDataSource, numStrings: numItems });
      const valueNames = aggregationResult?.[0]?.words;
      console.log("valueNames: ", JSON.stringify(valueNames));
      for (let i = 0, n = valueNames.length; i < n; i++) {
         const value = Math.floor(Math.random() * 2);
         internalValues.push({ value, valueName: valueNames?.[i] });
      }
      return internalValues;
   } catch (error) {
      console.log(error);
   }
}

function createProblemStatement({ initialisationData }: { initialisationData: Awaited<ReturnType<typeof generateStringsAndValues>> }) {
   try {
      let problemStatement: string[] = [];
      for (let i = 0, n = initialisationData.length - 1; i < n; i++) {
         const thisValueName = initialisationData[i]?.valueName;
         const thisValue = initialisationData[i]?.value;

         const nextValueName = initialisationData[i + 1]?.valueName;
         const nextValue = initialisationData[i + 1]?.value;

         const valuesAreEqual = thisValue === nextValue;
         const string = `${thisValueName} is ${valuesAreEqual ? "equal" : "opposite"} to ${nextValueName}.\n`;
         problemStatement.push(string);
      }
      return problemStatement;
   } catch (error) {
      console.log(error);
   }
}

async function createQuestion({ quizId, problemSize, dictionaryDataSource }) {
   const initialisationData = await generateStringsAndValues(problemSize, dictionaryDataSource);
   console.log("initialisationData: ", initialisationData);
   const problemStatement = createProblemStatement({ initialisationData });
   console.log("problemStatement: ", problemStatement);
   if (!initialisationData) {
      throw new Error("Did not receive correct initialisation data.");
   }

   const { firstItemIndex, secondItemIndex } = selectNormalisedArrayElements({ initialisationData });

   const item1 = initialisationData[firstItemIndex];
   const item2 = initialisationData[secondItemIndex];

   const options = ["equal", "opposite"];
   const comparator = options[Math.floor(Math.random() * options.length)];
   const itemsAreEqual = item1?.value === item2?.value;
   const correctAnswer = getCorrectAnswer({ comparator, itemsAreEqual });
   return {
      _id: randomUUID(),
      quizId,
      options,
      problemStatement,
      question: `Is ${item1?.valueName} ${comparator} to ${item2?.valueName}?`,
      correctAnswer,
      availableAnswers: ["Yes", "No"],
   };
}

function selectNormalisedArrayElements({ initialisationData }: { initialisationData: QuestionInitialisationData[] }) {
   //Pick 2 items at random from initialisation data.
   //This involves a bit of maths to pick items from the first and second halves of the array, and ensure they fit a normal distribution (i.e a bell curve).
   const quarterArrayLength = initialisationData.length / 4;
   let firstItemIndex = Math.floor(
      bindNumberToRange({
         // Mean === 1/4 of array length
         number: pickNumberFromDistribution({ mean: quarterArrayLength, standardDeviation: 1 }),
         min: 0,
         max: Math.floor(initialisationData.length / 2),
      })
   );
   let secondItemIndex = Math.floor(
      bindNumberToRange({
         // Mean === 3/4 of array length
         number: pickNumberFromDistribution({ mean: quarterArrayLength * 3, standardDeviation: 1 }),
         min: Math.ceil(initialisationData.length / 2),
         max: initialisationData.length,
      })
   );

   //Ensure indeces never collide, so long as there's more than 1 item in the array (where it's inevitable that they collide!)
   if (firstItemIndex === secondItemIndex && initialisationData.length !== 1) {
      if (firstItemIndex === 0) {
         secondItemIndex += 1;
      } else {
         firstItemIndex -= 1;
      }
   }
   return { firstItemIndex, secondItemIndex };
}

function getCorrectAnswer({ comparator, itemsAreEqual }: { comparator: string; itemsAreEqual: boolean }): "Yes" | "No" {
   switch (comparator) {
      case "equal":
         if (itemsAreEqual === true) {
            return "Yes";
         } else {
            return "No";
         }
      case "opposite":
         if (itemsAreEqual === false) {
            return "Yes";
         } else {
            return "No";
         }
   }
}

function randomIntFromInterval({ min, max }: { min: number; max: number }) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}
