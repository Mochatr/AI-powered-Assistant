import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemPrompt = "What's 2+2?"

export async function POST(req) {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: `${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        defaultHeaders: {
          "HTTP-Referer": `${process.env.NEXT_PUBLIC_SITE_URL}`,
          "X-Title": `${process.env.NEXT_PUBLIC_SITE_NAME}`,
        }
      })
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [
          { role: "user", content: systemPrompt }, ...data
        ],
        stream: true,
      })

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder()
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                const text = encoder.encode(content)
                controller.enqueue(text)
              }
            }
          } catch (err) {
            controller.error(err) // Handle any errors that occur during streaming
          } finally {
            controller.close() // Close the stream when done
          }
        },
      })

      return new NextResponse(stream);
}
