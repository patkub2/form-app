import "./style.css";

const FormSelect = (props) => {
  const {
    label,
    errorMessage,
    onChange,
    id,
    dishes,
    handleChang,
    ...inputProps
  } = props;

  return (
    <div className="FormSelect">
      <label>{label}</label>

      <select onChange={onChange} {...inputProps}>
        {dishes.map((dish) => (
          <option key={dish.value} value={dish.value}>
            {dish.label}
          </option>
        ))}
      </select>
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormSelect;
