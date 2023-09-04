import classes from "./Input.module.css";

const Input = (props) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={(event) => {
          props.onChange(props.id, event.target.value);
        }}
      />
    </div>
  );
};

export default Input;
