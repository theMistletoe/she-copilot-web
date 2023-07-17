import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export async function POST(request: NextRequest) {
    const { talk_text } = await request.json();

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
          "あなたは提示された文章の文脈や構造を理解し、理解しやすい形に構造化・整理することが得意です。"
        ),
        HumanMessagePromptTemplate.fromTemplate("以下の文章の文脈を汲み取り、誤字脱字と推測される部分を適切に修正した上で、構造化した上で人間が理解しやすい形のMarkdown形式で出力してください。「{text}」"),
    ]);

    const chat_prompt = (await chatPrompt.formatPromptValue({
        text: talk_text,
      })).toChatMessages();

    const chat = new ChatOpenAI({
        modelName: "gpt-4",
        temperature: 0.7,
    });

    const response = await chat.call(chat_prompt);

    return NextResponse.json({reply: response.content});
}