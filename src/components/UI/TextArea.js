import classes from "./TextArea.module.css"

const TextArea = (props) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.htmlFor}>{props.label}</label>
      <textarea
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

export default TextArea;
