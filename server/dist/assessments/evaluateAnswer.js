export const evaluateAnswer = (userResponse) => {
    try {
        const parsedProblemStatement = parseProblemStatement({ statement: userResponse.problemStatement });
        const valuesFromProblemStatement = getValuesFromProblemStatement({ statement: parsedProblemStatement });
        const parsedQuestion = parseQuestion({ question: userResponse.question });
        const { firstItem, lastItem } = getFirstAndLastItems({ statementItem: parsedQuestion });
        const questionComparison = getComparisonType({ statementItem: parsedQuestion });
        const itemsAreEqual = valuesFromProblemStatement[firstItem] === valuesFromProblemStatement[lastItem];
        //Quicker to initialise and negate than to set each time.
        let expectedAnswer = "Yes";
        switch (questionComparison) {
            case "opposite":
                if (itemsAreEqual) {
                    expectedAnswer = "No";
                }
                break;
            case "equal":
                if (itemsAreEqual === false) {
                    expectedAnswer = "No";
                }
        }
        return userResponse.answer === expectedAnswer;
    }
    catch (error) {
        console.log(error);
    }
};
const parseProblemStatement = ({ statement }) => {
    if (!statement || typeof statement !== "string")
        return;
    return statement.split("\n").filter((element) => element);
};
const getValuesFromProblemStatement = ({ statement }) => {
    if (!statement || statement?.length === 0)
        return;
    const values = {};
    let firstStatement = statement[0];
    const { firstItem, lastItem } = getFirstAndLastItems({ statementItem: firstStatement });
    const comparison = getComparisonType({ statementItem: firstStatement });
    values[firstItem] = 1;
    switch (comparison) {
        case "equal":
            values[lastItem] = 1;
            break;
        case "opposite":
            values[lastItem] = 0;
    }
    for (let i = 1, n = statement.length; i < n; i++) {
        const statementItem = statement[i];
        const { firstItem, lastItem } = getFirstAndLastItems({ statementItem });
        const comparison = getComparisonType({ statementItem });
        switch (comparison) {
            case "equal":
                values[lastItem] = values[firstItem];
                break;
            case "opposite":
                switch (values[firstItem]) {
                    case 0:
                        values[lastItem] = 1;
                        break;
                    case 1:
                        values[lastItem] = 0;
                        break;
                }
        }
    }
    return values;
};
const getFirstAndLastItems = ({ statementItem }) => {
    const firstItem = getFirstItem({ statementItem });
    const lastItem = getLastItem({ statementItem });
    return { firstItem, lastItem };
};
const getFirstItem = ({ statementItem }) => {
    return statementItem.substring(0, statementItem.indexOf(""));
};
const getLastItem = ({ statementItem }) => {
    return statementItem.substring(statementItem.lastIndexOf(" ") + 1, statementItem.length - 1);
};
const getComparisonType = ({ statementItem }) => {
    if (statementItem.indexOf("equal to") > -1) {
        return "equal";
    }
    if (statementItem.indexOf("opposite to") > -1) {
        return "opposite";
    }
};
//Removes "Is " from start and "?" from end of questions
const parseQuestion = ({ question }) => {
    return question.substring(3, question.length - 1);
};
const tests = [
    // {
    //    expectedResult: false,
    //    questionId: "123",
    //    problemStatement: `XPY is equal to LOG.
    //    LOG is opposite to LLA.
    //    `,
    //    question: "Is XPY opposite to LLA?",
    //    answer: "No",
    // },
    {
        expectedResult: true,
        questionId: "234",
        problemStatement: `ABC is equal to DEF.
      DEF is equal to GHI.
      `,
        question: "Is ABC equal to GHI?",
        answer: "Yes",
    },
];
for (let i = 0, n = tests.length; i < n; i++) {
    const result = evaluateAnswer(tests[i]);
    console.log("result: ", result, "expectedResult: ", tests[i].expectedResult, "CORRECT: ", result === tests[i].expectedResult);
}
