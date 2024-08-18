import { useState, useEffect } from "react";

function VediRicette() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleDeleteRecipe = (selectedRecipe) => {
        const updatedRecipes = recipes.filter(recipe => recipe !== selectedRecipe);
        setRecipes(updatedRecipes);
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setSelectedRecipe(null);
    }

    function capitalize(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="vediRicette">
            <div>
                <h2 className="h2 mb-5 ml-2">Le mie ricette</h2>
            </div>
            <ul className="recipe-list">
                {recipes.sort((a, b) => a.nome.localeCompare(b.nome))
                        .map((recipe, index) => (
                <li key={index}>
                    <button type="button" data-toggle="modal" data-target="#recipeModal" onClick={() => handleRecipeClick(recipe)}>{capitalize(recipe.nome)}</button>
                </li>
                ))}
            </ul>
            
            <div className="mt-5">
                <button className="btn btn-secondary mt-2">
                    <a href="/">Indietro</a>
                </button>
            </div>

            <div className="modal fade" id="recipeModal" tabIndex="-1" role="dialog" aria-labelledby="recipeModal" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="recipeModalLabel">{selectedRecipe ? capitalize(selectedRecipe.nome) : ''}</h5>
                        </div>
                        <div className="modal-body">
                            {selectedRecipe ? (
                                <ul>
                                    {selectedRecipe.ingredienti.map((ingredient, index) => (
                                        <li key={index}>
                                            {ingredient.name} - {(Math.round(ingredient.cost * 100) / 100).toFixed(2)}€
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No recipe selected.</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Indietro</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => handleDeleteRecipe(selectedRecipe)}>Elimina</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default VediRicette;