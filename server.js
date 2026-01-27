import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/insight", async (req, res) => {
  const { reflection } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Provide calm, thoughtful insight to help someone reflect more deeply."
        },
        {
          role: "user",
          content: reflection
        }
      ],
      temperature: 0.6
    })
  });

  const data = await response.json();
  res.json({ insight: data.choices[0].message.content });
});

app.listen(3000);
