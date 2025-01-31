import style from "./Tag.module.css";

const Tag = ({ status }) => {
  const getTagClass = () => {
    switch (status) {
      case "AVAILABLE":
        return style.available; // 대여 가능
      case "RESERVED":
        return style.reserved; // 예약중
      case "FULLY_RESERVED":
        return style.fullyReserved; // 예약 불가
      default:
        return style.default; // 기본 상태
    }
  };

  const getTagText = () => {
    switch (status) {
      case "AVAILABLE":
        return "대여 가능";
      case "RESERVED":
        return "예약중";
      case "FULLY_RESERVED":
        return "예약 불가";
      default:
        return "ERROR";
    }
  };

  return <div className={`${style.tag} ${getTagClass()}`}>{getTagText()}</div>;
};

export default Tag;
