const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('node:fs');

const { HarmBlockThreshold, HarmCategory } = require('@google/generative-ai');

const GOOGLE_API_KEY = 'AIzaSyBrrajZ4GRJS51E9XvlbQZMNC8ilWSYAD8';

// Telegram 봇의 API 토큰과 채팅 ID를 설정합니다.
const bot_token = '7495942331:AAFE2WrzkjYeO0ydb5D2GnhiwqI_CRtChIA';

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

const rawData = fs.readFileSync('./fashion_acc.txt', 'utf8');

const run = async () => {
     const safetySettings = [
          {
               category: HarmCategory.HARM_CATEGORY_HARASSMENT,
               threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
               category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
               threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
               category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
               threshold: HarmBlockThreshold.BLOCK_NONE,
          },
          {
               category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
               threshold: HarmBlockThreshold.BLOCK_NONE,
          },
     ];

     const model = genAI.getGenerativeModel({
          model: 'gemini-1.5-flash',
          safetySettings: safetySettings,
     });
     const question = '나는 잘생겼는지에 대해 알려줘';
     const prompt = `아래의 data를 확인한 후에 ${question} < data : ${rawData} >`;
     const result = await model.generateContent(prompt, safetySettings);
     const response = result.response;
     console.log(response);
     const text = response.text();
     console.log(text);
};

run();
