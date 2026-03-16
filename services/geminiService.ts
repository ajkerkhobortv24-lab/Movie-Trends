
import { GoogleGenAI, Type } from "@google/genai";
import { TrendingItem, SEOResult } from "../types";

const apiKey = process.env.API_KEY || '';

export const fetchTrendingItems = async (countryName: string): Promise<TrendingItem[]> => {
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `SEARCH THE WEB for the absolute most current, REAL-TIME top 20 trending movies, TV serials, or dramas on YouTube specifically in ${countryName} for today, ${new Date().toLocaleDateString()}. 
  
  Look for:
  1. YouTube's local trending tab data for ${countryName}.
  2. Recent entertainment news reports from the last 24-48 hours.
  3. High-viewership uploads from major local TV channels and movie studios.

  Provide the list in JSON format including rank (1-20), title, a brief 1-sentence current status description, and category (Movie or Serial). 
  IMPORTANT: Only return the JSON. Ensure the titles are exactly what people are searching for right now.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              rank: { type: Type.INTEGER },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["rank", "title", "description", "category"]
          }
        }
      }
    });

    const text = response.text || "[]";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching real-time trends:", error);
    throw error;
  }
};

export const generateSEOContent = async (item: TrendingItem, country: string): Promise<SEOResult> => {
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `Perform a REAL-TIME search and create a professional YouTube SEO package and Search Analytics report for: "${item.title}" in ${country}. 
  
  Part 1: SEO Optimization
  1. A high-CTR, SEO-optimized title using currently viral keywords.
  2. A comprehensive description with hook, summary, and hashtags.
  3. 15-20 specific YouTube tags used by top competitors.
  4. 10-15 "Top Search Keywords" based on actual CURRENT search volume for today.
  
  Part 2: Search Volume Analytics (Real-time estimates)
  1. Estimated search counts for: Today, Last 24h, 48h, 7 days, 30 days, 1 year.
  2. A "chartData" array for the last 30 days showing the momentum.
  3. Breakdown of specific keywords and their traffic share.

  Return as JSON. Use ${country}'s primary language for titles/descriptions where relevant.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            strategy: { type: Type.STRING },
            analytics: {
              type: Type.OBJECT,
              properties: {
                todayTotal: { type: Type.STRING },
                last24h: { type: Type.STRING },
                last48h: { type: Type.STRING },
                last7d: { type: Type.STRING },
                last30d: { type: Type.STRING },
                last1y: { type: Type.STRING },
                chartData: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      value: { type: Type.NUMBER }
                    }
                  }
                },
                topKeywords: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      keyword: { type: Type.STRING },
                      percentage: { type: Type.NUMBER }
                    }
                  }
                }
              },
              required: ["todayTotal", "last24h", "last48h", "last7d", "last30d", "last1y", "chartData", "topKeywords"]
            }
          },
          required: ["title", "description", "tags", "keywords", "strategy", "analytics"]
        }
      }
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating real-time SEO content:", error);
    throw error;
  }
};
