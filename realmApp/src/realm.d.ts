export {};

//@ts-ignore
import { MongoClient } from "mongodb";

export type Services = {
   (name: string): MongoClient;
};

declare global {
   type exports = any;
   type ValueOf<T> = T[keyof T];
   namespace context {
      const services: {
         get: Services;
      };
      const functions: {
         execute: (name: string, ...args: any[]) => any;
      };
      const environment: {
         tag: string;
      };
      const values: {
         get: (value: any) => any;
      };
      const user: {
         id: string;
         type: "normal" | "server" | "system";
         data: object;
         custom_data: object;
         identities: any[];
      };
      const http: {
         get: () => any;
         post: (options: PostOptions) => PostResponse;
      };
   }

   type PostOptions = {
      url: string;
      body: {
         [key: string]: any;
      };
      headers?: {
         Authorization?: string[];
         "Content-Type"?: ["application/json"];
         Accept?: ["application/json"];
      };
      encodeBodyAsJSON?: boolean;
   };

   type PostResponse = {
      status: string;
      statusCode: HTTPStatusCodes;
      body: PostResponseBody;
   };

   type PostResponseBody = {
      text: () => string;
   };

   type HTTPStatusCodes = 200 | 400 | 404 | 500;
   namespace BSON {
      const ObjectId: (value?: any) => void;
   }
   namespace EJSON {
      const parse: (value?: any) => any;
   }
}
