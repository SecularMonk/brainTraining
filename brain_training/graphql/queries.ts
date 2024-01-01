import { GET_RANDOM_ICONS_INPUT } from "./schema";
import axios from "axios";

// export async function getRandomIcons(input) {
export async function getRandomIcons(input: GET_RANDOM_ICONS_INPUT) {
   try {
      const result = await axios.post("http://localhost:3000/api/getRandomIcons", input);
      return result;
      // return data;
   } catch (error) {
      console.log(error);
   }
}
