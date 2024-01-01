exports = async function (arg) {
   const SERVICE_NAME = "Main";
   const DB_NAME = "live";

   // Get a collection from the context
   const collections = {
      engagementSummary: context.services.get(SERVICE_NAME).db(DB_NAME).collection("engagements"),
   };

   const { userId, event, quizId, questionId, answerId } = arg?.fullDocument ?? {};

   const engagementSummary = await collections.engagementSummary.findOne({ userId });
   const { lastActiveDay, numActiveDays, streakLength } = engagementSummary ?? {};

   const calendarDate = dateYYMMDDFormat();
   const streakGap = (() => {
      const diff = differenceInDays(new Date(), lastActiveDay);
      return isNaN(diff) ? 1 : diff;
   })();

   const increments = {
      [event]: 1,
      ...((!lastActiveDay || lastActiveDay < calendarDate) && { numActiveDays: 1 }),
      //Extend streak if it's first starting out or actually extended
      ...(streakGap === 1 && { streakLength: 1 }),
   };

   const result = await collections.engagementSummary.updateOne(
      { userId },
      {
         $set: {
            lastActiveDay: calendarDate,
            //Reset streak
            ...(streakGap > 1 && { streakLength: 1 }),
            updatedAt: new Date(),
         },
         $inc: increments,
         $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
   );

   console.log(JSON.stringify(result));

   function dateYYMMDDFormat() {
      return new Date(new Date().toISOString().substring(0, 10));
   }

   function differenceInDays(firstDate, secondDate) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.abs(firstDate?.getTime() - secondDate?.getTime()) / oneDay;
   }
};
