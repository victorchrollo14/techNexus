import { marked } from "marked";
import TurnDownService from "turndown";
import sanitizeHtml from "sanitize-html";

export const sanitizeBlog = async (content: string): Promise<string> => {
  try {
    const turndown = new TurnDownService();

    const htmlContent = await marked.parse(content);
    console.log(htmlContent);
    const sanitizedHtml = sanitizeHtml(htmlContent);
    const sanitizedMd = turndown.turndown(sanitizedHtml);

    console.log(sanitizedMd);
    return sanitizedMd;
  } catch (error) {
    throw new Error(error.message);
  }
};
