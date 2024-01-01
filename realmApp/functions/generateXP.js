// TRIGGER: Quizzes.complete === true
exports = async function (arg) {
   const SERVICE_NAME = "Main";
   const DB_NAME = "live";
   const CONFIG_DB_NAME = "configuration";
   const REWARD_TYPE = "XP";

   // Get a collection from the context
   const liveCollections = {
      transactions: context.services.get(SERVICE_NAME).db(DB_NAME).collection("transactions"),
      quizzes: context.services.get(SERVICE_NAME).db(DB_NAME).collection("quizzes"),
   };

   const configCollections = {
      XP: context.services.get(SERVICE_NAME).db(CONFIG_DB_NAME).collection(REWARD_TYPE),
   };

   const { userId, _id: quizId, difficulty, score, complete, rewards } = arg?.fullDocument ?? {};

   if (rewards && rewards?.length > 0 && rewards.some((element) => element.rewardType === REWARD_TYPE)) {
      console.log(`${REWARD_TYPE} already earned for user ${userId} and quiz ${quizId}.`);
      return;
   }

   const accrualConfiguration = await configCollections.XP.findOne({ configType: "accrual" });
   const generationConfiguration = await configCollections.XP.findOne({ configType: "generation" });
   console.log("accrualConfiguration: ", JSON.stringify(accrualConfiguration));
   console.log("generationConfiguration: ", JSON.stringify(generationConfiguration));

   const { XPAccrualConstant } = accrualConfiguration ?? {};
   const { levelModifiers } = generationConfiguration ?? {};

   const appliedLevelModifier = levelModifiers?.[difficulty] ?? 1;
   const totalXPEarned = (XPAccrualConstant ? XPAccrualConstant : 1) * score * appliedLevelModifier;

   const transaction = {
      userId,
      event: "rewardEarned",
      rewardType: REWARD_TYPE,
      amount: totalXPEarned,
      eventDetails: {
         quizId,
      },
   };

   console.log("transaction: ", JSON.stringify(transaction));

   const transactionInsertResult = await liveCollections.transactions.insertOne(transaction);
   const { insertedId } = transactionInsertResult;

   console.log("transactionInsertResult: ", JSON.stringify(transactionInsertResult));

   const quizUpdateResult = liveCollections.quizzes.updateOne(
      { _id: quizId },
      {
         $push: {
            rewards: {
               transactionId: insertedId,
               rewardType: REWARD_TYPE,
               rewardAmount: totalXPEarned,
            },
         },
      }
   );
   console.log("quizUpdateResult: ", JSON.stringify(quizUpdateResult));
};
