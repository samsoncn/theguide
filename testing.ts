// const PORT = 8000;
// const express = require("express");
// const cors = require("cors");
// const app = express();
// app.use(express.json());
// app.use(cors());

// const API_KEY = "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";

// app.post("/completions", async (req, res) => {
//   const options = {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer  + ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: "how are you?" }],
//       max_tokens: 20,
//     }),
//   };

//   try {
//     // wait for the response from user
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );
//     const data = await response.json();
//     res.send(data);
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.listen(PORT, () => console.log("server is running" + PORT));

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("what are you building: \n", (title: any) => console.log(title));
