import React, { useState } from "react";

export default function App() {
  const [values, setValues] = useState({
    name: "",
    preparation_time: "",
    type: "",
    no_of_slices: "",
    diameter: "",
    spiciness_scale: "",
    slices_of_bread: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const [dishes] = React.useState([
    {
      label: "Pizza",
      value: "Pizza",
    },
    { label: "Soup", value: "Soup" },
    { label: "Sandwich", value: "Sandwich" },
  ]);
  const [type, setType] = useState([]);

  const handleChang = (value) => {
    setType(value);
    setValues({ ...values, type: value });
  };

  console.log(values);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={values["name"]}
          onChange={onChange}
          required
        ></input>
        <label>Preperation Time</label>
        <input
          type="time"
          name="preparation_time"
          step="2"
          value={values["preparation_time"]}
          onChange={onChange}
          required
        ></input>

        <label>Type</label>
        <select onChange={(e) => handleChang(e.target.value)}>
          <option disabled selected value>
            {" "}
            -- select an option --{" "}
          </option>
          {dishes.map((dish) => (
            <option key={dish.value} value={dish.value}>
              {dish.label}
            </option>
          ))}
        </select>
        {type === "Pizza" && (
          <>
            {" "}
            <label>Number of slices</label>
            <input
              type="number"
              inputmode="numeric"
              pattern="\d*"
              step="1"
              name="no_of_slices"
              value={values["no_of_slices"]}
              onChange={onChange}
              required
            ></input>
            <label>Diameter</label>
            <input
              type="float"
              name="diameter"
              value={values["diameter"]}
              onChange={onChange}
              required
            ></input>
          </>
        )}
        {type === "Soup" && (
          <>
            {" "}
            <label>Spiciness scale</label>
            <input
              type="range"
              min="1"
              max="10"
              name="spiciness_scale"
              value={values["spiciness_scale"]}
              onChange={onChange}
              required
            ></input>
          </>
        )}
        {type === "Sandwich" && (
          <>
            {" "}
            <label>Slices of bread</label>
            <input
              type="number"
              inputmode="numeric"
              pattern="\d*"
              step="1"
              name="slices_of_bread"
              value={values["slices_of_bread"]}
              onChange={onChange}
              required
            ></input>
          </>
        )}
        <button>submit</button>
      </form>
    </div>
  );
}
//<button onClick={console.log(values)}>check</button>
