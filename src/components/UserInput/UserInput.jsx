import style from "./UserInput.module.css";

const UserInput = ({
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
