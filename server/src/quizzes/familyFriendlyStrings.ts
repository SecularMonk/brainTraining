import { dataSources } from "..";

export async function generateSanitisedStrings({ numStrings, dataSource }: { numStrings: number; dataSource: typeof dataSources.AllowedStrings }) {
   return getRandomStringSample({ numItems: numStrings, dataSource });
}

async function getRandomStringSample({ numItems, dataSource }: { numItems: number; dataSource: typeof dataSources.AllowedStrings }) {
   return dataSource
      .aggregate<{ words: string[] }>([
         { $match: { word: { $exists: true } } },
         { $sample: { size: numItems } },
         { $group: { _id: null, words: { $push: "$word" } } },
      ])
      .toArray();
}

function createRandomString(): string {
   return (
      selectRandomElement({ iterable: text.consonants }) + selectRandomElement({ iterable: text.vowels }) + selectRandomElement({ iterable: text.consonants })
   );
}

function selectRandomElement({ iterable }: { iterable: string }): string {
   try {
      const randomNumber = Math.floor(Math.random() * iterable.length);
      return iterable[randomNumber];
   } catch (error) {
      console.log(error);
   }
}

function generateCandidateStrings(numStrings: number) {
   const newStrings: string[] = [];
   for (let i = 0; i < numStrings; i++) {
      newStrings.push(createRandomString());
   }
   return newStrings;
}

async function testCandidateStrings(strings: string[], dataSource: typeof dataSources.AllowedStrings) {
   let regexMatch: string = "";
   for (let i = 0, n = strings.length; i < n; i++) {
      regexMatch += `${strings[i]}|`;
   }
   if (regexMatch.charAt(regexMatch.length - 1) === "|") {
      regexMatch = regexMatch.slice(0, regexMatch.length - 1);
   }
   const matches = await dataSource.find({ word: { $regex: new RegExp(regexMatch, "i") } }).toArray();
   return matches.length === 0;
}

const text = { consonants: "BCDFGHJKLMNPQRSTVWXYZ", vowels: "AEIOU" };
