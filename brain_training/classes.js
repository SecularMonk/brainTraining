export class Question {
   constructor({ numItems, textLength, problemStatement, question }) {
      this.numItems = numItems;
      this.textLength = textLength;
      this.problemStatement = problemStatement;
      this.question = question;
      this.initialiseQuestion();
   }

   initialiseQuestion() {
      try {
         this.createRandomValues();
         this.createProblemStatement();
         this.createQuestion();
      } catch (error) {
         console.log(error);
      }
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
         // console.log(JSON.stringify({ allValues }));
         for (let i = 0, n = allValues.length; i < n; i++) {
            const comparator = allValues[i].comparator;
            const values = allValues[i]?.["values"];
            const mismatch = values.some((Element) => {
               return Element !== values[0];
            });
            // console.log(JSON.stringify({ comparator, values, mismatch }));
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
         // console.log(JSON.stringify({ results }));
         return results.some((Element) => {
            return Element !== results[0];
         });
      } catch (error) {
         console.log(error);
      }
   }

   getOptions() {
      return this.options;
   }
}
