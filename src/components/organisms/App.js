import React, { useState } from "react";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: "",
    spiciness_scale: "",
    slices_of_bread: "",
  });

  const [dishes] = useState([
    {
      label: "Pizza",
      value: "Pizza",
      field: (
        <div>
          <label htmlFor="pizza">Toppings</label>
          <input type="number" id="pizza" />
        </div>
      ),
    },
    {
      label: "Soup",
      value: "Soup",
      field: (
        <div>
          <label htmlFor="soup">How soupy?</label>
          <input type="range" id="soup" max="10" min="1" />
        </div>
      ),
    },
    {
      label: "Sandwich",
      value: "Sandwich",
      field: (
        <div>
          <label htmlFor="sandwich">Enter your ingredients</label>
          <input type="text" id="sandwich" />
        </div>
      ),
    },
  ]);
  const [selectedDish, setSelectedDish] = useState(dishes[0]);

  const handleDishSelect = (e) => {
    const dish = dishes.find((dish) => dish.value === e.target.value);
    if (dish) {
      setSelectedDish(dish);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" onChange={onChange} required></input>
        <label>Preperation Time</label>
        <input type="time" step="2" onChange={onChange} required></input>
        <label>Type</label>
        <select onChange={handleDishSelect}>
          {dishes.map((dish) => (
            <option key={dish.value} value={dish.value}>
              {dish.label}
            </option>
          ))}
        </select>
        {selectedDish && selectedDish.field}
        <button>submit</button>
      </form>
    </div>
  );
}
