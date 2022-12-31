import { v4 as uuidv4 } from "uuid";
import { getRandomIcons } from "./graphql/queries";
export class Quiz {
   constructor({ difficulty = "Normal" }) {
      this.difficulty = difficulty;
      this.questions = [];
      this.currentQuestion = 0;
      this.availableQuestionTypes = [PictorialQuestion, LexicalQuestion];
      this.initialiseQuiz();
   }

   initialiseQuiz() {
      this.createUniqueId();
      const difficultySettings = this.getDifficultySettings({ setting: this.difficulty });
      Object.assign(this, difficultySettings);
      this.createQuestions();
   }

   createUniqueId() {
      const _id = uuidv4();
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
      console.log(JSON.stringify({ newDifficulty: this.difficulty, questions: this.questions }));
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
      question.initialiseQuestion();
      return question;
   }
}

export class Question {
   constructor({ numItems, problemStatement, question }) {
      this.numItems = numItems;
      this.textLength = 3;
      this.problemStatement = problemStatement;
      this.question = question;
      this.initialiseQuestion();
   }

   initialiseQuestion() {
      try {
         this.createRandomValues();
         this.createProblemStatement();
         this.createQuestion();
         this.createUniqueId();
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
      const _id = uuidv4();
      this._id = _id;
   }

   createRandomValues() {
      try {
         const result = {};
         const numItems = this?.numItems ?? 3;
         for (let i = 0, n = numItems; i < n; i++) {
            const valueName = this.createRandomString();
            const value = Math.floor(Math.random() * 2);
            result[valueName] = value;
         }
         this.questionValues = result;
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
         const randomElement = this.selectRandomElement({ string: text });
         newString += this.selectRandomElement({ string: randomElement });
      }
      return newString;
   }

   selectRandomElement({ string }) {
      try {
         // console.log(`selectRandomElement input: ${JSON.stringify(string)}`);
         if (!string || string.length === 0) return console.log(`Please provide a non-empty string. Received ${string}.`);
         const randomNumber = Math.floor(Math.random() * string.length);
         const result = string[randomNumber];
         // console.log(JSON.stringify(result));
         return string[randomNumber];
      } catch (error) {
         console.log(error);
      }
   }

   createProblemStatement() {
      try {
         const questionValues = this.questionValues;
         if (!questionValues) return console.log(`Unable to create question without named values. Please create named values before continuing.`);
         const questionValueKeys = Object.keys(questionValues);
         let problemStatement = "";
         for (let i = 0, n = questionValueKeys.length - 1; i < n; i++) {
            const thisValueName = questionValueKeys[i];
            const thisValue = questionValues[thisValueName];

            const nextValueName = questionValueKeys[i + 1];
            const nextValue = questionValues[nextValueName];

            const valuesAreEqual = thisValue === nextValue;
            const string = `${thisValueName} is ${valuesAreEqual ? "equal" : "opposite"} to ${nextValueName}.\n`;
            problemStatement += string;
         }
         this.problemStatement = problemStatement;
      } catch (error) {
         console.log(error);
      }
   }

   createQuestion() {
      try {
         const questionValues = this.questionValues;
         if (!questionValues) return console.log(`Unable to create question without named values. Please create named values before continuing.`);
         const questionValueKeys = Object.keys(questionValues);
         let randomNumber = Math.floor(Math.random() * questionValueKeys.length);
         if (randomNumber < 1) randomNumber = 1;
         const subArray1 = questionValueKeys.splice(0, randomNumber);
         const subArray2 = questionValueKeys;
         // console.log(JSON.stringify({ subArray1 }));
         const value1 = this.selectRandomElement({ string: subArray1 });
         const value2 = this.selectRandomElement({ string: subArray2 });

         const options = ["equal", "opposite"];
         const comparator = options[Math.floor(Math.random() * options.length)];
         const question = `Is ${value1} ${comparator} to ${value2}?`;
         this.values = [{ values: [questionValues[value1], questionValues[value2]], comparator }];
         // let answer = questionValues[value1] === questionValues[value2] ? "Yes" : "No";
         // if (comparator === "opposite") answer = !answer;
         this.question = question;
         // this.answer = answer;
         this.options = ["Yes", "No"];
      } catch (error) {
         console.log(error);
      }
   }

   getUniqueId() {
      return this._id;
   }

   getQuestionValues() {
      return this.questionValues;
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
         console.log(JSON.stringify({ allValues }));
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
      this.initialiseQuestion();
   }
}

export class PictorialQuestion extends Question {
   constructor({ numItems }) {
      super({ numItems });
      this.initialiseQuestion();
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
