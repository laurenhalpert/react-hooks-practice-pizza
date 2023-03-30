import React from "react";

function PizzaForm({ id, onFormSubmit, topping, size, vegetarian, setTopping, setSize, setVegetarian }) {
  function handleChange(e, setter) {
    console.log(e.target.value)
    setter(e.target.value)
  }
  function handleRadioChange(e) {
    setVegetarian(!vegetarian)
  }
  function handleSubmit(e) {
    e.preventDefault()
    const editedObj ={
      id: id,
      topping: topping,
      size: size,
      vegetarian: vegetarian
    }
    fetch(`http://localhost:3001/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(editedObj)
    })
    .then(r=>r.json())
    .then(editedObj => onFormSubmit(editedObj))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            onChange={(e, setter) => handleChange(e, setTopping)}
            value={topping}
          />
        </div>
        <div className="col">
          <select className="form-control" name="size" onChange={(e, setter) => handleChange(e, setSize)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={vegetarian}
              onChange={(e, setter) => handleChange(e, setVegetarian)}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!vegetarian}
              onChange={handleRadioChange}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
