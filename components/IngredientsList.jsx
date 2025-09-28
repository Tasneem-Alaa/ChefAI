export default function IngredientsList(props) {
    const uniqueIngredients = [...new Set(props.ingredients)];

    const ingredientsListItems = uniqueIngredients.map(ingredient => (
        <li key={ingredient} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
            <span>{ingredient}</span>
            <button
                onClick={() => props.removeIngredient(ingredient)}
                style={{
                    background: "transparent",
                    border: "none",
                    color: "#FF6B6B",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    padding: "0",
                    lineHeight: "1",
                }}
                aria-label={`Remove ${ingredient}`}
            >
                ×
            </button>
        </li>
    ))

    return (
        <section>
            <h2>Ingredients on hand:</h2>
            <ul className="ingredients-list" aria-live="polite" style={{ padding: 0, listStyle: "none" }}>
                {ingredientsListItems}
            </ul>
            {uniqueIngredients.length > 3 && (
                <div className="get-recipe-container">
                    <div ref={props.ref}>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={props.getRecipe}>Get a recipe</button>
                </div>
            )}
        </section>
    )
}
