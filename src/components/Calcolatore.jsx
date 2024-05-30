import { useState, useRef, useEffect } from 'react';

function Calcolatore() {
  const [ingr, setIngr] = useState([{ id: 0, name: '', cost: 0 }]);
  const [peopleNum, setPeopleNum] = useState(1);
  const [days, setDays] = useState(1);
  const [sum, setSum] = useState([]);
  const [resultVisibility, setResultVisibility] = useState(false);
  const [nameRecipe, setNameRecipe] = useState('');
  const [recipes, setRecipes] = useState([]);
  const ingredientIdCounter = useRef(1); // Initialize counter for ingredient IDs


  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      setRecipes(JSON.parse(storedRecipes));
    }
  }, []);

  useEffect(() => {
    if(recipes.length > 0){
      localStorage.setItem('recipes', JSON.stringify(recipes));
    }
  }, [recipes]);


  const handleChange = (id, event) => {
    const { name, value } = event.target;
    const newIngr = ingr.map(ingr =>
      ingr.id === id ? { ...ingr, [name]: name === 'cost' ? parseFloat(value) : value } : ingr
    );
    setIngr(newIngr);
  };

  const handleAddIngr = () => {
    const newIngredientId = ingredientIdCounter.current;
    setIngr([...ingr, { id: newIngredientId, name: '', cost: 0 }]);
    ingredientIdCounter.current++; // Increment counter for next ingredient
  };

  const handleDeleteRow = (id) => {
    const newIngr = ingr.filter(ingr => ingr.id !== id);
    setIngr(newIngr);
  };

  const handlePeopleNumChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setPeopleNum(value);
    } else {
      setPeopleNum('');
    }
  };

  const handleDaysChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setDays(value);
    } else {
      setDays('');
    }
  };

  const handleNameRecipeChange = (event) => {
    const value = event.target.value;
    if (value.trim() !== '') {
      setNameRecipe(value);
    }
  };

  const calcolaFoodCost = (event) => {
    event.preventDefault();
    let sum = 0;
    ingr.forEach(i => {
      sum += parseFloat(i.cost);
    });
    setSum((Math.round(sum * peopleNum * days * 100) / 100).toFixed(2));
    setResultVisibility(true);
  };

  const saveRecipe = (event) => {
    event.preventDefault();

    if(!nameRecipe || nameRecipe.trim() === '' || ingr.length < 1 || ingr[0].name.trim() === '' || peopleNum < 0 || days < 0){
      return;
    }
      
    const newRecipe = {
      nome: nameRecipe,
      ingredienti: ingr,
      costo: sum,
      numero_persone: peopleNum,
      numero_giorni: days,
      data_creazione: new Date().getTime()
    };

    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);

    setIngr([{ id: 0, name: '', cost: 0 }]);
    setNameRecipe('');
    $('#saveModal').modal('toggle');
    $("#savedAlert").addClass('show');
    console.log('Hello');
    showAlert(2000).then(() => { $("#savedAlert").hide(); });
};

const showAlert = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


  
    return (
      <div>
        <div className="alert alert-success alert-dismissible fade" id="savedAlert" role="alert">
          Ricetta salvata!
        </div>
        <div className="mb-5">
          <h2>Calcola Food Cost</h2>
        </div>
        {ingr.map((ingridient, index) => (
          <div key={`${ingridient.id}-${index}`} className="d-flex justify-content-center mb-2">
            <input
              type="text"
              className="form-control w-50 mr-1"
              name="name"
              value={ingridient.name}
              onChange={(event) => handleChange(ingridient.id, event)}
              placeholder="ingrediente"
            />
            <input
              type="number"
              className="form-control w-50 mr-1"
              name="cost"
              value={ingridient.cost}
              onChange={(event) => handleChange(ingridient.id, event)}
              step="0.01"
              placeholder="costo"
            />
            <button className="btn btn-danger" onClick={() => handleDeleteRow(ingridient.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4">
          <label htmlFor="nPersone" className="col-form-label mr-3">Numero persone: </label>
          <input
            type="number"
            id="nPersone"
            className="form-control w-25"  
            value={peopleNum}
            onChange={handlePeopleNumChange}
            placeholder="persone"
          />
        </div>
        <div className="d-flex justify-content-center mt-1">
          <label htmlFor="nGiorni" className="col-form-label mr-3">Numero di giorni: </label>
          <input
            type="number"
            id="nGiorni"
            className="form-control w-25"  
            value={days}
            onChange={handleDaysChange}
            placeholder="giorni"
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary mr-1" onClick={handleAddIngr}>+</button>
          <button className="btn btn-primary mr-1" onClick={calcolaFoodCost}>Calcola</button>
          <button className="btn btn-secondary">
            <a href="/">Indietro</a>
          </button>
        </div>

        <div className="mt-5">
          {resultVisibility &&
            <div>
              <h3>Risultato:</h3>
              <h5 className="mt-4">Il food cost è uguale a {sum} euro </h5>
              <button type="button" className="btn btn-success mt-2" data-toggle="modal" data-target="#saveModal">Salva ricetta</button>
            </div>
          }
        </div>

        <div className="modal fade" id="saveModal" tabIndex="-1" role="dialog" aria-labelledby="saveModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="saveModalLabel">Inserisci nome ricetta</h5>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control w-100"
                  name="nomeRicetta"
                  value={nameRecipe}
                  onChange={handleNameRecipeChange}
                  placeholder="nome ricetta"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Indietro</button>
                <button type="button" className="btn btn-success" onClick={saveRecipe}>Salva</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
}

export default Calcolatore;