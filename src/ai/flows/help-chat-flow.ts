
'use server';
/**
 * @fileOverview A simple AI chat flow for the help center.
 *
 * - helpChat - A function that handles the chat interaction.
 * - HelpChatInput - The input type for the helpChat function.
 * - HelpChatOutput - The return type for the helpChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define schemas inside the function or in a separate file not marked with 'use server'
const HelpChatInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.array(z.object({ text: z.string() })),
  })).describe('The chat history.'),
  message: z.string().describe('The latest user message.'),
});
export type HelpChatInput = z.infer<typeof HelpChatInputSchema>;

const HelpChatOutputSchema = z.string();
export type HelpChatOutput = z.infer<typeof HelpChatOutputSchema>;

const helpChatFlow = ai.defineFlow(
  {
    name: 'helpChatFlow',
    inputSchema: HelpChatInputSchema,
    outputSchema: HelpChatOutputSchema,
  },
  async ({history, message}) => {

    const systemPrompt = `You are a friendly and helpful customer support agent for 'Invite Designer', a website for creating and editing digital and print invitation cards.
Your goal is to assist users with their questions about designs, customization, editing requests, printing, and file formats.
Be concise, polite, and professional.
The user is interacting with you through a chat interface in the help center.
Here is some information about our store:
- We sell digital invitation templates for weddings, birthdays, corporate events, and more.
- Users can request edits to any template.
- Our templates are available in JPG and PDF formats.
- Our contact email is abhayrat603@gmail.com and phone is +91 8463062603.
- The admin email is abhayrat603@gmail.com.
- Our brand is about making beautiful design accessible to everyone.

Keep your answers helpful and relevant to an invitation design service.`;
    
    const response = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        system: systemPrompt,
        history: history,
        prompt: message,
    });

    return response.text;
  }
);

export async function helpChat(input: HelpChatInput): Promise<HelpChatOutput> {
  return helpChatFlow(input);
}
