import { useState, useEffect } from "react";

function VediRicette() {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const storedRecipes = localStorage.getItem('recipes');
        if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
        }
    }, []);

    return (
        <div>
        <div>
            <h2 className="h2 mb-5">Le mie ricette</h2>
        </div>
        <ul>
            {recipes.map((recipe, index) => (
            <li key={index}>{recipe.nome}</li>
            ))}
        </ul>
        <div className="mt-5">
            <button className="btn btn-secondary mt-2">
                <a href="/">Indietro</a>
            </button>
        </div>
        </div>
    );
}

export default VediRicette;