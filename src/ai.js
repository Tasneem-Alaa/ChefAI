// // import Anthropic from "@anthropic-ai/sdk"
// import { HfInference } from '@huggingface/inference'

// const SYSTEM_PROMPT = `
// You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
// You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
// Format your response in markdown to make it easier to render to a web page.
// `

// // ⚠️ IMPORTANT: Don't commit your token to GitHub or expose it publicly!
// // Use environment variables (like .env) to keep it safe.

// // Make sure you set an environment variable in your project 
// // called HF_ACCESS_TOKEN
// const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

// export async function getRecipeFromHF(ingredientsArr) {
//     const ingredientsString = ingredientsArr.join(", ")

//     try {
//         const response = await hf.textGeneration({
//             model: "Chama99/flan-t5-small-recipe-generator",
//             inputs: `I have ${ingredientsString}. Please suggest a recipe I can make.`,
//             parameters: {
//                 max_new_tokens: 400,
//                 temperature: 0.8,
//                 do_sample: true,
//                 repetition_penalty: 1.2,
//             },
//         })

//         return response.generated_text
//     } catch (err) {
//         console.error("Error generating recipe:", err.message)
//         return "Sorry, something went wrong while generating your recipe."
//     }
// }

// import Anthropic from "@anthropic-ai/sdk"
import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. 
You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 
Format your response in markdown to make it easier to render to a web page.
`

// تأكدي من وجود المتغير في .env.local
// VITE_HF_ACCESS_TOKEN=hf_xxx123abc456xyz
const hf = new HfInference(import.meta.env.VITE_HF_ACCESS_TOKEN)

export async function getRecipeFromHF(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ")

    try {
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1", // الموديل الأصلي
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
            ],
            max_tokens: 1024,
        })

        // ارجعي نص الوصفة
        return response.choices[0].message.content
    } catch (err) {
        console.error("Error generating recipe:", err.message)
        return "Sorry, something went wrong while generating your recipe."
    }
}
