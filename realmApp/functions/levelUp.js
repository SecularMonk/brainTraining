// TRIGGER: transaction generated
exports = async function (arg) {
   const SERVICE_NAME = "Main";
   const DB_NAME = "live";
   const CONFIG_DB_NAME = "configuration";
   const REWARD_TYPE = "XP";

   // Get a collection from the context
   const liveCollections = {
      users: context.services.get(SERVICE_NAME).db(DB_NAME).collection("users"),
      transactions: context.services.get(SERVICE_NAME).db(DB_NAME).collection("transactions"),
   };

   const configCollections = {
      XP: context.services.get(SERVICE_NAME).db(CONFIG_DB_NAME).collection(REWARD_TYPE),
   };

   const { _id: transactionId, userId, rewardType, amount, totalUpdated } = arg?.fullDocument ?? {};

   if (totalUpdated === true) {
      console.log(`Transaction ${_id} already updated in total balance for user ${userId}.`);
      return;
   }

   const userUpdateResult = await liveCollections.users.findOneAndUpdate(
      { userId },
      {
         $inc: {
            [`rewardAmounts.${rewardType}`]: amount,
         },
      },
      { returnNewDocument: true }
   );
   console.log("userUpdateResult: ", JSON.stringify(userUpdateResult))

   const { rewardAmounts } = userUpdateResult;
   const totalReward = rewardAmounts?.[REWARD_TYPE] ?? 0;

   const accrualConfiguration = await configCollections.XP.findOne({ configType: "accrual" });

   const { levelCalculationConstant } = accrualConfiguration ?? {};
   console.log("levelCalculationConstant: ", levelCalculationConstant)

   const level = (() => {
     const level = Math.floor(Math.sqrt(totalReward) * levelCalculationConstant ?? 1);
     return level > 1 ? level : 1
   console.log("level:", level)
   })();

      await liveCollections.users.updateOne({ userId }, { $set: { level } });
   
};
