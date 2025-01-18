import style from "./UserInput.module.css";

const UserInput = ({ type, placeholder, value, name, onChange, maxLength }) => {
  return (
    <input
      className={style.userInput}
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      maxLength={maxLength}
    ></input>
  );
};
export default UserInput;
