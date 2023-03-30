import React, { useEffect, useState } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [topping, setTopping] = useState("")
  const [size, setSize] = useState("")
  const [vegetarian, setVegetarian] = useState(false)
  const [id, setId] = useState("")
  useEffect(()=> {
    fetch("http://localhost:3001/pizzas")
    .then(r=>r.json())
    .then(pizzas => setPizzas(pizzas))
  }, [])
  function handleEdit(toppingItem, sizeItem, vegetarianItem, idItem) {
    setTopping(toppingItem)
    setSize(sizeItem)
    setVegetarian(vegetarianItem)
    setId(idItem)
  }
  function handleFormSubmit(obj) {
    setPizzas(pizzas.map(pizza => 
      pizza.id === obj.id? obj: pizza
    ))
  }
  return (
    <>
      <Header />
      <PizzaForm onFormSubmit={handleFormSubmit} id={id} setTopping={setTopping} setSize={setSize} setVegetarian={setVegetarian} topping={topping} size={size} vegetarian={vegetarian} onEdit={handleEdit} />
      <PizzaList pizzas={pizzas} onEdit={handleEdit}/>
    </>
  );
}

export default App;
