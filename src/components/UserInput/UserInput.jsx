import style from "./UserInput.module.css";

const UserInput = ({
  inputKey,
  type,
  placeholder,
  value,
  name,
  onChange,
  maxLength,
  disabled,
}) => {
  return (
    <input
      className={style.userInput}
      key={inputKey}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
      disabled={disabled}
    ></input>
  );
};
export default UserInput;
