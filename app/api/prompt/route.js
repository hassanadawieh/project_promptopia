import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store", // or other cache control directives
      },
    });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const revalidate = 0;

