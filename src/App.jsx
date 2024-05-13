import { useState } from 'react'
import './App.css'

function App() {
  const [ingr, setIngr] = useState([{ id: 1, name: '', cost: 0 }]);
  const [peopleNum, setPeopleNum] = useState([1]);
  const [days, setDays] = useState([1]);
  const [sum, setSum] = useState([]);
  const [resultVisibility, setResultVisibility] = useState(false);

  const handleChange = (id, event) => {
    const { name, value } = event.target;
    const newIngr = ingr.map(ingr =>
      ingr.id === id ? { ...ingr, [name]: name === 'number' ? parseFloat(value) : value } : ingr
    );
    setIngr(newIngr);
  };

  const handleAddIngr = () => {
    setIngr([...ingr, { id: Date.now(), name: '', cost: 0 }]);
  };

  const handleDeleteRow = (id) => {
    const newIngr = ingr.filter(ingr => ingr.id !== id);
    setIngr(newIngr);
  };

  const handlePeopleNumChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setPeopleNum(parseInt(value));
    }
  };

  const handleDaysChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setDays(parseInt(event.target.value, 10))
    }
  };

  const calcolaFoodCost = (event) => {
    event.preventDefault();
    let sum = 0;
    ingr.forEach(i => {
      sum += parseFloat(i.cost);
    });
    setSum(sum * peopleNum * days);
    setResultVisibility(true)
  };

  return (
    <div>
      <div class="mb-5">
        <h2>Food Cost App</h2>
      </div>
      {ingr.map((ingr, index) => (
        <div key={ingr.id} class="d-flex justify-content-center mb-2">
          <input
            type="text"
            class="form-control w-auto mr-1"
            name="name"
            value={ingr.name}
            onChange={(event) => handleChange(ingr.id, event)}
            placeholder="ingrediente"
          />
          <input
            type="number"
            class="form-control w-25 mr-1"
            name="cost"
            value={ingr.cost}
            onChange={(event) => handleChange(ingr.id, event)}
            step="0.01"
            placeholder="costo"
          />
          <button className="btn btn-danger" onClick={() => handleDeleteRow(ingr.id)}>Delete</button>
        </div>
      ))}
      <div class="d-flex justify-content-center mt-4">
        <label for="nPersone" class="col-form-label mr-3">Numero persone: </label>
        <input
          type="number"
          id="nPersone"
          class="form-control w-25"  
          value={peopleNum}
          min={1}
          onChange={handlePeopleNumChange}
          placeholder="persone"
        />
      </div>
      <div class="d-flex justify-content-center mt-1">
        <label for="nGiorni" class="col-form-label mr-3">Numero giorni: </label>
        <input
          type="number"
          id="nGiorni"
          class="form-control w-25"  
          value={days}
          min={1}
          onChange={handleDaysChange}
          placeholder="giorni"
        />
      </div>
      <div class="d-flex justify-content-center mt-4">
        <button class="btn btn-primary mr-1" onClick={handleAddIngr}>+</button>
        <button class="btn btn-primary" onClick={calcolaFoodCost}>Calcola Food Cost</button>
      </div>
      <div class="mt-5">
        <h3>Risultato:</h3>
        {resultVisibility &&
          <div>
            <p>Il food cost è uguale a {sum} euro </p>
          </div>
        }
      </div>
    </div>
  );
}

export default App;