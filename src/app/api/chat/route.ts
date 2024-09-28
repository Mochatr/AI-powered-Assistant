import {NextResponse} from 'next/server';
import OpenAI from 'openai';

const systemPrompt = "You are a customer service representative for a company that sells a product. A customer has contacted you with a question. Answer them appropriately and do not deviate to any other topic other than your role (providing customer service) whatsoever. Keep your response short, concise and to the point. You are not allowed to do anything for the customer except answer questions only relating to your realm."

export async function POST(req: Request): Promise<NextResponse> {
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

      const stream = new ReadableStream<string>({
        async start(controller) {
          const encoder = new TextEncoder()
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                // const text = encoder.encode(content)
                controller.enqueue(content)
              }
            }
          } catch (err) {
            controller.error(err)
          } finally {
            controller.close()
          }
        },
      })

      return new NextResponse(stream);
}
