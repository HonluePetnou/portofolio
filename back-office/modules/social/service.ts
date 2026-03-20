import { prisma } from "@/lib/prisma";
import { createAIClient, type AIProviderName } from "@/lib/ai/client";
import { getSettingValue } from "@/modules/settings/service";
import { SocialPlatform, SocialStatus } from "@prisma/client";

export type GeneratedSocialPosts = {
  blogId: string;
  linkedin: {
    storytelling: string;
    valueDriven: string;
  };
  twitter: {
    threadTweets: string[];
    threadCombined: string;
    short: string;
  };
  instagram: {
    caption: string;
  };
  facebook: {
    post: string;
  };
};

export async function generateSocialPostsForBlog(
  blogId: string
): Promise<GeneratedSocialPosts> {
  const blog = await prisma.blogArticle.findUnique({
    where: { id: blogId },
  });

  if (!blog || !blog.published) {
    throw new Error("Blog article must exist and be published.");
  }

  const [providerRaw, apiKey] = await Promise.all([
    getSettingValue("AI_PROVIDER"),
    getSettingValue("AI_API_KEY", { decrypt: true }),
  ]);

  const provider = (providerRaw as AIProviderName | null) ?? "OPENAI";
  if (!apiKey) {
    throw new Error("AI API key not configured.");
  }

  const ai = createAIClient(provider, apiKey);

  const baseContext = `
You are generating social media copy for a B2B agency.
Do NOT use emojis unless explicitly requested.

Blog title: "${blog.title}"
Summary: "${blog.summary || "N/A"}"
Content:
${blog.content}
`.trim();

  const [
    linkedinStorytelling,
    linkedinValue,
    twitterThreadRaw,
    twitterShort,
    instagramCaption,
    facebookPost,
  ] = await Promise.all([
    ai.generateText(
      `${baseContext}

Create a LinkedIn post in a storytelling tone aimed at agency buyers.
Use a strong hook in the first line, 2–3 short paragraphs, and a clear CTA to contact the agency.
Do not add emojis.`
    ),
    ai.generateText(
      `${baseContext}

Create a LinkedIn post that is value-driven and educational.
Use bullet-like short sentences (each on a new line) and end with a CTA to read the full article or contact the agency.
Do not add emojis.`
    ),
    ai.generateText(
      `${baseContext}

Create a Twitter/X thread with exactly 5 short tweets.
Return the result as a valid JSON array of 5 strings, where each string is one tweet.
Tweets should have strong hooks, be concise, and end the last tweet with a clear CTA to read the article or contact the agency.
Do not add emojis. Output ONLY the JSON array, nothing else.`
    ),
    ai.generateText(
      `${baseContext}

Create a single, short, punchy tweet (max 240 characters) that teases the article and ends with a clear CTA.
Do not add emojis.`
    ),
    ai.generateText(
      `${baseContext}

Create an Instagram caption optimized for saves and shares.
Use short lines, strong hook at the top, and end with a clear CTA to check the link in bio or contact the agency.
Do not add emojis.`
    ),
    ai.generateText(
      `${baseContext}

Create a Facebook post that is friendly but professional.
Use 2–4 short paragraphs and end with a CTA to read the article or contact the agency.
Do not add emojis.`
    ),
  ]);

  let threadTweets: string[] = [];
  try {
    const parsed = JSON.parse(twitterThreadRaw);
    if (Array.isArray(parsed) && parsed.length === 5) {
      threadTweets = parsed.map((t) => String(t));
    }
  } catch {
    threadTweets = twitterThreadRaw.split(/\n{2,}/).slice(0, 5);
  }

  const threadCombined = threadTweets.join("\n\n");

  const created = await Promise.all([
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.LINKEDIN,
        content: linkedinStorytelling.trim(),
        status: SocialStatus.READY,
      },
    }),
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.LINKEDIN,
        content: linkedinValue.trim(),
        status: SocialStatus.READY,
      },
    }),
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.TWITTER,
        content: threadCombined.trim(),
        status: SocialStatus.READY,
      },
    }),
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.TWITTER,
        content: twitterShort.trim(),
        status: SocialStatus.READY,
      },
    }),
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.INSTAGRAM,
        content: instagramCaption.trim(),
        status: SocialStatus.READY,
      },
    }),
    prisma.socialPost.create({
      data: {
        blogId,
        platform: SocialPlatform.FACEBOOK,
        content: facebookPost.trim(),
        status: SocialStatus.READY,
      },
    }),
  ]);

  return {
    blogId,
    linkedin: {
      storytelling: created[0].content,
      valueDriven: created[1].content,
    },
    twitter: {
      threadTweets,
      threadCombined: created[2].content,
      short: created[3].content,
    },
    instagram: {
      caption: created[4].content,
    },
    facebook: {
      post: created[5].content,
    },
  };
}

