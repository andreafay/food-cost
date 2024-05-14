import { useState } from 'react'

function Calcolatore(){
    const [ingr, setIngr] = useState([{ id: 1, name: '', cost: 0 }]);
    const [peopleNum, setPeopleNum] = useState(1);
    const [days, setDays] = useState(1);
    const [sum, setSum] = useState([]);
    const [resultVisibility, setResultVisibility] = useState(false);
  
    const handleChange = (id, event) => {
      const { name, value } = event.target;
      const newIngr = ingr.map(ingr =>
        ingr.id === id ? { ...ingr, [name]: name === 'cost' ? parseFloat(value) : value } : ingr
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
  
    const calcolaFoodCost = (event) => {
      event.preventDefault();
      let sum = 0;
      ingr.forEach(i => {
        sum += parseFloat(i.cost);
      });
      setSum((Math.round(sum * peopleNum * days * 100) / 100).toFixed(2));
      setResultVisibility(true)
    };
  
    return (
      <div>
        <div class="mb-5">
          <h2>Calcola Food Cost</h2>
        </div>
        {ingr.map((ingr, index) => (
          <div key={ingr.id} class="d-flex justify-content-center mb-2">
            <input
              type="text"
              class="form-control w-50 mr-1"
              name="name"
              value={ingr.name}
              onChange={(event) => handleChange(ingr.id, event)}
              placeholder="ingrediente"
            />
            <input
              type="number"
              class="form-control w-50 mr-1"
              name="cost"
              value={ingr.cost}
              onChange={(event) => handleChange(ingr.id, event)}
              step="0.01"
              placeholder="costo"
            />
            <button className="btn btn-danger" onClick={() => handleDeleteRow(ingr.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
              </svg>
            </button>
          </div>
        ))}
        <div class="d-flex justify-content-center mt-4">
          <label for="nPersone" class="col-form-label mr-3">Numero persone: </label>
          <input
            type="number"
            id="nPersone"
            class="form-control w-25"  
            value={peopleNum}
            onChange={handlePeopleNumChange}
            placeholder="persone"
          />
        </div>
        <div class="d-flex justify-content-center mt-1">
          <label for="nGiorni" class="col-form-label mr-3">Numero di giorni: </label>
          <input
            type="number"
            id="nGiorni"
            class="form-control w-25"  
            value={days}
            onChange={handleDaysChange}
            placeholder="giorni"
          />
        </div>
        <div class="d-flex justify-content-center mt-4">
          <button class="btn btn-primary mr-1" onClick={handleAddIngr}>+</button>
          <button class="btn btn-primary mr-1" onClick={calcolaFoodCost}>Calcola</button>
          <button class="btn btn-secondary" onClick="/">
            <a href="/">Indietro</a>
          </button>
        </div>
        <div class="mt-5">
          {resultVisibility &&
            <div>
              <h3>Risultato:</h3>
              <h5>Il food cost è uguale a {sum} euro </h5>
            </div>
          }
        </div>
      </div>
    );
}

export default Calcolatore;