const readline = require("readline");
const express = require("express");
const { generateMeta } = require("./src/controllers/openaiController");

// Testing on Terminal
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("what are you building: \n", generateMeta);

////////////////////////////////////////////////////////////////
// app setup
const app = express();
app.listen(4000, () => console.log("listening for requests on port 4000"));

// middleware
app.use(express.json());
app.use(express.static("src"));

// routes
app.post("./openai/meta", generateMeta);
////////////////////////////////////////////////////////////////
