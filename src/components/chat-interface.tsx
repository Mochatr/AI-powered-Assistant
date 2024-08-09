import OpenAI from "openai"

const navbar = () => {
    const openai = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: `${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
        defaultHeaders: {
          "HTTP-Referer": `${process.env.NEXT_PUBLIC_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
          "X-Title": `${process.env.NEXT_PUBLIC_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
        }
      })
      async function main() {
        const completion = await openai.chat.completions.create({
          model: "meta-llama/llama-3.1-8b-instruct:free",
          messages: [
            { role: "user", content: "Say WHAT'S 2+2" }
          ],
        })
        console.log(completion.choices[0].message)
      }
      main()
  
    return (
    <div>Chat Interface</div>
  )
};

export default navbar;