import React from "react"
import IngredientsList from "./IngredientsList"
import ClaudeRecipe from "./ClaudeRecipe"
import { getRecipeFromHF } from "../src/ai"

export default function Main() {
    const [ingredients, setIngredients] = React.useState([
        "chicken", "all the main spices", "corn", "heavy cream", "pasta"
    ])
    const [recipe, setRecipe] = React.useState("")
    const recipeSection = React.useRef(null)
    
    React.useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            const yCoord = recipeSection.current.getBoundingClientRect().top + window.scrollY
            window.scroll({
                top: yCoord,
                behavior: "smooth"
            })
        }
    }, [recipe])

    async function getRecipe() {
        const recipeMarkdown = await getRecipeFromHF(ingredients)
        setRecipe(recipeMarkdown)
    }

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }

    function removeIngredient(ingredientToRemove) {
        setIngredients(prevIngredients =>
            prevIngredients.filter(i => i !== ingredientToRemove)
        )
    }
    
    return (
        <main>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    addIngredient(new FormData(e.target))
                    e.target.reset()
                }}
                className="add-ingredient-form"
            >
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button type="submit">Add ingredient</button>
            </form>

            {ingredients.length > 0 &&
                <IngredientsList
                    ref={recipeSection}
                    ingredients={ingredients}
                    getRecipe={getRecipe}
                    removeIngredient={removeIngredient} // <-- مرّري الدالة الجديدة
                />
            }

            {recipe && <ClaudeRecipe recipe={recipe} />}
        </main>
    )
}
