import { Configuration, OpenAIApi } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export const generateImagePrompt = async (noteBookName: string) => {
  try {
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an creative and helpful AI assistance capable of generating interesting thumbnail descriptions for my notes. Your output will be fed into the DALLE API to generate a thumbnail. The description should be minimalistic and flat styled",
        },
        {
          role: "user",
          content: `Please generate a thumbnail description for my notebook titles ${noteBookName}`,
        },
      ],
    });

    const data = await res.json();
    const img_description = data.choices[0].message.content;
    return img_description as string;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const generateImage = async (img_description: string) => {
  try {
    const res = await openai.createImage({
      prompt: img_description,
      n: 1,
      size: "256x256",
    });
    const data = await res.json();
    const img_url = data.choices[0].url;
    return img_url as string;
  } catch (error) {
    console.log(error);
  }
};
