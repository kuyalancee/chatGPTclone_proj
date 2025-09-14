import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import OpenAI from 'openai';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OpenAI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello World',
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 300,
    });

    const botResponse = completion.choices[0].message.content;

    res.status(200).send({
      bot: botResponse
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Something went wrong!' });
  }
});

app.listen(5000, () => console.log('Server running on port http://localhost:5000'));
