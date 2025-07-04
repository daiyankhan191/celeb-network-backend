import { Injectable, InternalServerErrorException } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class AiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async suggestCelebrities(introLine: string): Promise<any[]> {
    const prompt = `
You are a celebrity discovery assistant.

Given the description: "${introLine}"

Return ONLY a JSON array (no explanation) of 3 real celebrities that match this intro.
Each should include:

- name
- category (Singer, Actor, Speaker)
- country
- instagram
- fanbase (number)
- setlist (top songs or topics)

Example Output:

[
  {
    "name": "Diljit Dosanjh",
    "category": "Singer",
    "country": "India",
    "instagram": "https://instagram.com/diljitdosanjh",
    "fanbase": 4200000,
    "setlist": "Born To Shine, G.O.A.T"
  }
]
`;

    try {
      const chat = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
      });

      const result = chat.choices[0].message?.content || '[]';

      // Try parsing safely
      return JSON.parse(result);
    } catch (error) {
      console.error('OpenAI suggestion error:', error);
      throw new InternalServerErrorException('AI suggestion failed');
    }
  }
}
