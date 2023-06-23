const openai = require("../config/openaiConfig");

const generateMeta = async (req, res) => {
  const { title } = req.body;
  const description = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `Come up with a description for my startup called ${title}`,
      },
    ],
    max_tokens: 20,
  });
  res.status(200).json({
    description: description.data.choices[0].message,
  });
  // console.log(description.data.choices[0].message);
};

module.exports = { generateMeta };
