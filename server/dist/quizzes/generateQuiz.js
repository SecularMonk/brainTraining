import { randomUUID } from "crypto";
const text = { consonants: "BCDFGHJKLMNPQRSTVWXYZ", vowels: "AEIOU" };
export function createQuiz({ userId, numQuestions = 5 }) {
    const questions = [];
    const quizId = randomUUID();
    for (let i = 0; i < numQuestions; i++) {
        const question = createQuestion({ quizId });
        questions.push(question);
    }
    return {
        _id: quizId,
        userId,
        questions,
    };
}
function generateStringsAndValues({ numItems = 3 }) {
    try {
        const internalValues = [];
        for (let i = 0, n = numItems; i < n; i++) {
            const valueName = createRandomString();
            const value = Math.floor(Math.random() * 2);
            internalValues.push({ value, valueName });
        }
        return internalValues;
    }
    catch (error) {
        console.log(error);
    }
}
function createRandomString() {
    const newString = selectRandomElement({ iterable: text.consonants }) + selectRandomElement({ iterable: text.vowels }) + selectRandomElement({ iterable: text.consonants });
    return newString;
}
function selectRandomElement({ iterable }) {
    try {
        // console.log(`selectRandomElement input: ${JSON.stringify(string)}`);
        const randomNumber = Math.floor(Math.random() * iterable.length);
        return iterable[randomNumber];
    }
    catch (error) {
        console.log(error);
    }
}
function createProblemStatement({ initialisationData }) {
    try {
        let problemStatement = [];
        for (let i = 0, n = initialisationData.length - 1; i < n; i++) {
            const thisValueName = initialisationData[i].valueName;
            const thisValue = initialisationData[i].value;
            const nextValueName = initialisationData[i + 1].valueName;
            const nextValue = initialisationData[i + 1].value;
            const valuesAreEqual = thisValue === nextValue;
            const string = `${thisValueName} is ${valuesAreEqual ? "equal" : "opposite"} to ${nextValueName}.\n`;
            problemStatement.push(string);
        }
        return problemStatement;
    }
    catch (error) {
        console.log(error);
    }
}
function createQuestion({ quizId }) {
    try {
        const initialisationData = generateStringsAndValues({});
        const problemStatement = createProblemStatement({ initialisationData });
        if (!initialisationData) {
            throw new Error("Did not receive correct initialisation data.");
        }
        const firstItemIndex = Math.floor(Math.random() * initialisationData.length - 1);
        const secondItemIndex = randomIntFromInterval({ min: firstItemIndex + 1, max: initialisationData.length });
        const item1 = initialisationData[firstItemIndex];
        const item2 = initialisationData[secondItemIndex];
        const options = ["equal", "opposite"];
        const comparator = options[Math.floor(Math.random() * options.length)];
        const itemsAreEqual = item1.value === item2.value;
        const question = `Is ${item1.valueName} ${comparator} to ${item2.valueName}?`;
        const availableAnswers = ["Yes", "No"];
        const correctAnswer = getCorrectAnswer({ comparator, itemsAreEqual });
        return {
            _id: randomUUID(),
            quizId,
            question,
            options,
            correctAnswer,
            problemStatement,
            availableAnswers,
        };
    }
    catch (error) {
        console.log(error);
    }
}
function getCorrectAnswer({ comparator, itemsAreEqual }) {
    switch (comparator) {
        case "opposite":
            if (itemsAreEqual) {
                return "No";
            }
        case "equal":
            if (itemsAreEqual === false) {
                return "No";
            }
    }
}
function randomIntFromInterval({ min, max }) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
