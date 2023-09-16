import { NextRequest, NextResponse } from 'next/server';
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";

export async function POST(request: NextRequest) {
  try {

    const { talk_text } = await request.json();
    
    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
      SystemMessagePromptTemplate.fromTemplate(
        "あなたは提示された文章の文脈や構造を理解し、理解しやすい形に構造化・整理することが得意です。出力するのはMarkdownのプレーンテキストです。"
        ),
        HumanMessagePromptTemplate.fromTemplate("以下の文章の文脈を汲み取り、誤字脱字と推測される部分を適切に修正した上で、人間が理解しやすい形で構造化したMarkdown形式で出力してください。出力するのはあなたが整理したMarkdownプレーンテキストのみにしてください。「{text}」"),
        HumanMessagePromptTemplate.fromTemplate("===以下が出力結果==="),
      ]);
      
      const chat_prompt = (await chatPrompt.formatPromptValue({
        text: talk_text,
      })).toChatMessages();
      
      const chat = new ChatOpenAI({
        modelName: "gpt-4",
        temperature: 0.7,
      });
      
      const response = await chat.call(chat_prompt);
      console.log(response);
      
      return NextResponse.json({reply: response.content});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    };
}