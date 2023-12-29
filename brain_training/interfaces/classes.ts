import { Schema } from "inspector";
import { getRandomIcons } from "@/graphql/queries";

export class IQuiz implements Quiz {
   difficulty: Difficulty;
   questions: [];
   constructor({ difficulty = "medium" }: { difficulty?: Difficulty }) {
      this.difficulty = difficulty;
      this.questions = [];
      this.currentQuestion = 0;
      this.availableQuestionTypes = [PictorialQuestion, LexicalQuestion];
      this.initialise();
   }

   initialise() {
      this.createUniqueId();
      const difficultySettings = this.getDifficultySettings({ setting: this.difficulty });
      Object.assign(this, difficultySettings);
      this.createQuestions();
   }

   createUniqueId() {
      const _id = crypto.randomUUID();
      this._id = _id;
   }

   createQuestions() {
      const numQuestions = this.numQuestions ?? 0;
      const allQuestions = [];
      for (let i = 0, n = numQuestions; i < n; i++) {
         const randomNumber = Math.floor(Math.random() * this.availableQuestionTypes.length);
         const questionType = this.availableQuestionTypes[randomNumber];
         const question = new questionType({ numItems: this.numQuestions });
         allQuestions.push(question);
      }
      this.questions = allQuestions;
   }

   getDifficultySettings({ setting }) {
      const settings = {
         Easy: {
            numQuestions: 5,
            numItemsPerQuestion: 3,
         },
         Normal: {
            numQuestions: 10,
            numItemsPerQuestion: 4,
         },
         Hard: {
            numQuestions: 15,
            numItemsPerQuestion: 5,
         },
         default: this.easy,
      };
      if (!setting) setting = "default";
      return settings[setting];
   }

   setDifficulty(difficulty) {
      if (!difficulty || typeof difficulty !== "string") return;
      this.difficulty = difficulty;
      this.changeDifficulty();
   }

   changeDifficulty() {
      const difficultySettings = this.getDifficultySettings({ setting: this.difficulty });
      Object.assign(this, difficultySettings);
      this.createQuestions();
      // console.log(JSON.stringify({ newDifficulty: this.difficulty, questions: this.questions }));
   }

   getUniqueId() {
      return this._id;
   }

   getQuestions() {
      return this.questions;
   }

   getNumQuestions() {
      return this.questions.length;
   }

   getNextQuestion() {
      let question;
      if (this.currentQuestion === this.questions.length) {
         question = this.questions[this.questions.length];
      } else {
         question = this.questions[this.currentQuestion];
         this.currentQuestion += 1;
      }
      question = new Question({ numItems: this.numItemsPerQuestion });
      question.initialise();
      return question;
   }
}

export class Question {
   constructor({ numItems, problemStatement, question }) {
      this.numItems = numItems;
      this.textLength = 3;
      this.problemStatement = problemStatement;
      this.question = question;
      this.initialise();
   }

   async initialise() {
      try {
         this.createUniqueId();
         this.createInternalValues();
         this.createProblemStatement();
         await this.fetchRandomIcons();
         this.createQuestion();
      } catch (error) {
         console.log(error);
      }
   }

   getQuizData() {
      return {
         _id: this.getUniqueId(),
         problemStatement: this.getProblemStatement(),
         question: this.getQuestion(),
      };
   }

   createUniqueId() {
      const _id = crypto.randomUUID();
      this._id = _id;
   }

   createInternalValues() {
      try {
         const internalValues = [];
         const numItems = this?.numItems ?? 3;
         for (let i = 0, n = numItems; i < n; i++) {
            const valueName = this.createRandomString();
            const value = Math.floor(Math.random() * 2);
            internalValues.push({ value, valueName });
         }
         this.internalValues = internalValues;
      } catch (error) {
         console.log(error);
      }
   }

   createRandomString() {
      // console.log("createText");
      const text = ["BCDFGHJKLMNPQRSTVWXYZ", "AEIOU"];
      let newString = "";
      const textLength = this?.textLength ?? 3;
      for (let i = 0; i < textLength; i++) {
         const randomElement = this.selectRandomElement({ iterable: text });
         newString += this.selectRandomElement({ iterable: randomElement });
      }
      return newString;
   }

   selectRandomElement({ iterable }) {
      try {
         // console.log(`selectRandomElement input: ${JSON.stringify(string)}`);
         if (!iterable || iterable.length === 0) return console.log(`Please provide a non-empty string. Received ${iterable}.`);
         const randomNumber = Math.floor(Math.random() * iterable.length);
         const result = iterable[randomNumber];
         // console.log(JSON.stringify(result));
         return iterable[randomNumber];
      } catch (error) {
         console.log(error);
      }
   }

   createProblemStatement() {
      try {
         const internalValues = this.internalValues;

         if (!internalValues) return console.log(`Unable to create question without named values. Please create named values before continuing.`);
         let problemStatement = [];
         for (let i = 0, n = internalValues.length - 1; i < n; i++) {
            const thisValueName = internalValues[i].valueName;
            const thisValue = internalValues[i].value;

            const nextValueName = internalValues[i + 1].valueName;
            const nextValue = internalValues[i + 1].value;

            const valuesAreEqual = thisValue === nextValue;
            const string = `${thisValueName} is ${valuesAreEqual ? "equal" : "opposite"} to ${nextValueName}.\n`;
            problemStatement.push(string);
         }
         this.problemStatement = problemStatement;
      } catch (error) {
         console.log(error);
      }
   }

   async fetchRandomIcons() {
      const query = { numIcons: this.numItems };
      const icons = await getRandomIcons(query);
      // console.log(`icons fetched: ${JSON.stringify(icons)}`);
      if (!icons || !icons.getRandomIcons) return;
      const internalValues = this.internalValues;
      if (!internalValues) return;
      for (let i = 0, n = internalValues.length; i < n; i++) {
         internalValues[i].icon = icons.getRandomIcons[i].base64;
      }
      // this.setInternalValues(internalValues);
      this.icons = icons.getRandomIcons;
   }

      createQuestion() {
         try {
            const questionValues = this.internalValues;

            if (!questionValues) return console.log(`Unable to create question without named values. Please create named values before continuing.`);
            let randomNumber = Math.floor(Math.random() * questionValues.length);
            if (randomNumber < 1) randomNumber = 1;
            const subArray1 = questionValues.splice(0, randomNumber);
            const subArray2 = questionValues;
            // console.log(JSON.stringify({ subArray1 }));
            const value1 = this.selectRandomElement({ iterable: subArray1 });
            const value2 = this.selectRandomElement({ iterable: subArray2 });

            const options = ["equal", "opposite"];
            const comparator = options[Math.floor(Math.random() * options.length)];
            const question = `Is ${value1.valueName} ${comparator} to ${value2.valueName}?`;
            this.values = [{ values: [value1.value, value2.value, comparator] }];
            this.question = question;
            this.options = ["Yes", "No"];
         } catch (error) {
            console.log(error);
         }
      }

   setInternalValues(values) {
      if (!values || !Array.isArray(values)) return;
      this.internalValues = values;
   }

   getUniqueId() {
      return this._id;
   }

   getInternalValues() {
      return this.internalValues;
   }

   getValues() {
      return this.values;
   }

   getQuestion() {
      return this.question;
   }

   getProblemStatement() {
      return this.problemStatement;
   }

   getCorrectAnswer() {
      try {
         // return "Yes"
         const results = [];
         const allValues = this.getValues();
         // console.log(JSON.stringify({ allValues }));
         for (let i = 0, n = allValues.length; i < n; i++) {
            const comparator = allValues[i].comparator;
            const values = allValues[i]?.["values"];
            const mismatch = values.some((Element) => {
               return Element !== values[0];
            });
            console.log(JSON.stringify({ comparator, values, mismatch }));
            switch (true) {
               case mismatch === true && comparator === "equal":
                  results.push(0);
                  break;
               case mismatch === true && comparator === "opposite":
                  results.push(1);
                  break;
               case mismatch === false && comparator === "equal":
                  results.push(1);
                  break;
               case mismatch === false && comparator === "opposite":
                  results.push(0);
                  break;
            }
         }
         console.log(JSON.stringify({ results }));
         const result = results.some((Element) => {
            return Element !== 1;
         });
         return result === true ? "Yes" : "No";
      } catch (error) {
         console.log(error);
      }
   }

   getOptions() {
      return this.options;
   }
}

export class LexicalQuestion extends Question {
   constructor({ numItems }) {
      super({ numItems });
      this.initialise();
   }
}

export class PictorialQuestion extends Question {
   constructor({ numItems }) {
      super({ numItems });
      this.initialise();
   }

   async fetchRandomIcons() {
      const query = { numIcons: this.numItems };
      const icons = await getRandomIcons(query);
      if (!icons || !icons.getRandomIcons) return;
      this.icons = icons.getRandomIcons;
   }

   getIcons() {
      return this.icons;
   }
}
