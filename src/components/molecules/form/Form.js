import React, { useState } from "react";
import axios from "axios";
import FormInput from "../../atoms/formInput/FormInput";
import FormSelect from "../../atoms/formSelect/FormSelect";
import "./style.css";
import FormSubmit from "../../atoms/formSubmit/FormSubmit";

export default function Form() {
  const [values, setValues] = useState({
    name: "",
    preparation_time: "",
    type: "pizza",
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
      ? setValues({
          ...values,
          [e.target.name]: parseInt(e.target.value ? e.target.value : 0),
        })
      : setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChang = (value) => {
    setType(value);
    setValues({ ...values, type: value });
  };

  console.log(values);
  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Dishes App</h2>
      <FormInput
        label="Name"
        type="text"
        name="name"
        value={values["name"]}
        onChange={onChange}
        required
      />

      <FormInput
        label="Preperation Time"
        type="time"
        name="preparation_time"
        step="2"
        value={values["preparation_time"]}
        onChange={onChange}
        required
      />

      <FormSelect
        label="Type"
        onChange={(e) => handleChang(e.target.value)}
        dishes={dishes}
      />
      {type === "pizza" && (
        <>
          {" "}
          <FormInput
            label="Number of slices"
            type="number"
            pattern="\d*"
            step="1"
            name="no_of_slices"
            value={values["no_of_slices"]}
            onChange={onChange}
            required
          />
          <FormInput
            label="Diameter"
            type="number"
            name="diameter"
            value={values["diameter"]}
            onChange={onChange}
            required
          />
        </>
      )}
      {type === "soup" && (
        <FormInput
          label="Spiciness scale"
          type="range"
          min="1"
          max="10"
          step="1"
          name="spiciness_scale"
          value={values["spiciness_scale"]}
          onChange={onChange}
          required
        />
      )}
      {type === "sandwich" && (
        <FormInput
          label="Slices of bread"
          type="number"
          pattern="\d*"
          step="1"
          name="slices_of_bread"
          value={values["slices_of_bread"]}
          onChange={onChange}
          required
        />
      )}
      <FormSubmit>Submit</FormSubmit>
    </form>
  );
}
//<button onClick={console.log(values)}>check</button>
