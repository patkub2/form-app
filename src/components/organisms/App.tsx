import React, { useState } from "react";
import axios from "axios";

interface Values {
  name: string;
  preparation_time: string;
  type: string;
  no_of_slices: number;
  diameter: number;
  spiciness_scale: number;
  slices_of_bread: number;
}

export default function App() {
  const [values, setValues] = useState<Values>({
    name: "",
    preparation_time: "19:25:06",
    type: "",
    no_of_slices: 0,
    diameter: 0,
    spiciness_scale: 0,
    slices_of_bread: 0,
  });
  const [dishes] = useState([
    { label: "Pizza", value: "pizza" },
    { label: "Soup", value: "soup" },
    { label: "Sandwich", value: "sandwich" },
  ]);
  const [type, setType] = useState("pizza");

  const config = {
    method: "post",
    url: "https://frosty-wood-6558.getsandbox.com:443/dishes",
    headers: {
      "Content-Type": "application/json",
    },

    data: values,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onChange = (e) => {
    e.target.type === "number" || e.target.type === "range"
      ? setValues({ ...values, [e.target.name]: parseInt(e.target.value) })
      : setValues({ ...values, [e.target.name]: e.target.value });
  };

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
          {dishes.map((dish) => (
            <option key={dish.value} value={dish.value}>
              {dish.label}
            </option>
          ))}
        </select>
        {type === "pizza" && (
          <>
            {" "}
            <label>Number of slices</label>
            <input
              type="number"
              pattern="\d*"
              step="1"
              name="no_of_slices"
              value={values["no_of_slices"]}
              onChange={onChange}
              required
            ></input>
            <label>Diameter</label>
            <input
              type="number"
              name="diameter"
              value={values["diameter"]}
              onChange={onChange}
              required
            ></input>
          </>
        )}
        {type === "soup" && (
          <>
            {" "}
            <label>Spiciness scale</label>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              name="spiciness_scale"
              value={values["spiciness_scale"]}
              onChange={onChange}
              required
            ></input>
          </>
        )}
        {type === "sandwich" && (
          <>
            {" "}
            <label>Slices of bread</label>
            <input
              type="number"
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
