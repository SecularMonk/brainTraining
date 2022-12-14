const MongoClient = require("mongodb");
// const uri = process.env.MONGODB_URI;
const uri = "mongodb+srv://SecularMonk:cBMSwY5NBiKQ-cG@main.pt6xaka.mongodb.net/?retryWrites=true&w=majority";

// Enable command monitoring for debugging
const client = new MongoClient(uri, { monitorCommands: true });

client.on("commandStarted", (started) => console.log(started));
client.db().collection("pets");
await client.insertOne({ name: "spot", kind: "dog" });

client.close();

export default function Test() {
   return <h1>Hello, world!</h1>;
}
