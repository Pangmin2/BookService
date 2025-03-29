import style from "./SignUp_Page.module.css";
import swal from "sweetalert";
import UserInput from "../../components/UserInput/UserInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SERVER = import.meta.env.VITE_SERVER_URL;

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    mailCode: "",
    password: "",
    // confirmPassword: "",
    name: "",
    department: "",
    grade: "",
    student_id: "",
    phone_number: "",
  });

  // 필드 입력 유효성 확인
  const [usernameError, setUserNameError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [student_idError, setStudentIdError] = useState("");
  const [phone_numberError, setPhoneNumberError] = useState("");
  const [passwordCheckError, setPassWordCheckError] = useState("");

  const [departments, setDepartments] = useState([]); // 학과 리스트 상태
  const [isverify_mailCode, setIsVerify_mailCode] = useState(false); // 이메일 인증 관련 상태
  const [canEdit, setCanEdit] = useState(true); // 웹메일 인증번호 전송 후 웹메일 변경 가능 상태
  const [isVerificationPending, setIsVerificationPending] = useState(false);

  // 모든 필드 입력 및 유효성 검사 함수
  const isAllDataEntered = Object.values(userInfo).every((value) =>
    Boolean(value)
  );

  const isAllFieldsValid = () => {
    return (
      isAllDataEntered &&
      !usernameError &&
      !passwordError &&
      !student_idError &&
      !phone_numberError &&
      !passwordCheckError &&
      isverify_mailCode
    );
  };

  const navigate = useNavigate();
  // 회원가입 정보 전송
  const submit_userInfo = async (e) => {
    e.preventDefault();

    if (!isAllFieldsValid()) {
      swal({
        title: "모든 필드를 올바르게 입력해주세요.",
        icon: "warning",
        button: "확인",
      });
      return;
    }

    try {
      // console.log("사용자 정보: ", userInfo);
      const response = await axios.post(`${SERVER}/register`, userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        swal({
          title: "회원가입이 완료되었습니다.",
          icon: "success",
          button: "확인",
        });
        navigate("/login");
        return response.data.success;
      }
    } catch (error) {
      const ERROR = error.response.data;
      if (ERROR.code === "C002") {
        console.error("ERROR.msg");
        return ERROR.success;
      }
      console.error("알 수 없는 에러:", error);
    }
  };

  // 웹메일 인증번호 요청
  const verify_username = async () => {
    try {
      setCanEdit(false);
      const response = await axios.post(
        `${SERVER}/register/mail`,
        { username: userInfo.username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        swal({ text: "인증번호를 보냈습니다. 확인해주세요.", button: "확인" });
        setIsVerificationPending(true);
        return true;
      }
    } catch (error) {
      if (error.response.data.code === "U001") {
        swal({
          title: error.response.data.msg,
          button: "확인",
          icon: "error",
        });
      } else {
        swal({
          title: "인증번호 요청 중 오류가 발생했습니다.",
          text: "메일을 다시 입력해주세요.",
          button: "확인",
          icon: "error",
        });
      }
      return null;
    }
  };

  // 인증번호 확인 버튼 클릭 핸들러
  const check_mailCode = async () => {
    try {
      const response = await axios.post(
        `${SERVER}/register/mail/verification`,
        { username: userInfo.username, mailCode: userInfo.mailCode },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setIsVerify_mailCode(true);
        setIsVerificationPending(false);
        swal({ title: "인증이 완료되었습니다.", icon: "success" });
        return true;
      }
    } catch (error) {
      if (error.response.data.code === "U006") {
        swal({
          title: error.response.data.msg,
          button: "확인",
          icon: "error",
        });
        setIsVerify_mailCode(false);
        setIsVerificationPending(true);
        setUserInfo({ ...userInfo, mailCode: "" });
        return null;
      }
      swal({
        title: "인증이 실패하였습니다.",
        text: "다시 시도해주세요.",
        button: "확인",
        icon: "error",
      });
      return null;
    }
  };

  // 학과 리스트 서버 요청
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get(`${SERVER}/register`);
        setDepartments(response.data.data);
        // console.log(departments);
      } catch (error) {
        console.error("학과 정보를 가져오는데 실패했습니다:", error);
        setDepartments([]);
      }
    };

    getDepartments();
  }, []);

  // 입력 필드 변경 핸들러
  const onChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    switch (name) {
      case "username":
        usernameCheck(value);
        break;
      case "password":
        passwordCheck(value);
        break;
      case "confirmPassword":
        setPassWordCheckError(
          value !== userInfo.password ? "비밀번호가 일치하지 않습니다." : ""
        );
        break;
      case "student_id":
        student_idCheck(value);
        break;
      case "phone_number":
        phone_numberCheck(value);
        break;
      default:
        break;
    }
  };

  // 웹메일 정규식 확인
  const usernameCheck = (username) => {
    const usernameRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@kumoh\.ac\.kr$/;
    if (!usernameRegex.test(username)) {
      setUserNameError("올바른 메일 형식으로 입력해주세요.");
    } else {
      setUserNameError("");
    }
  };

  // 비밀번호 정규식 확인
  const passwordCheck = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10,20}$/;
    if (!passwordRegex.test(password)) {
      setPassWordError(
        "영문 대/소문자, 숫자, 특수문자를 조합하여 입력해주세요. (10~20자)"
      );
    } else {
      setPassWordError("");
    }
  };

  // 학번 정규식 확인
  const student_idCheck = (student_id) => {
    const student_idRegex = /^\d{8,10}$/;
    if (!student_idRegex.test(student_id)) {
      setStudentIdError("학번 8-10자를 모두 입력해주세요.");
    } else {
      setStudentIdError("");
    }
  };

  // 전화번호 정규식 확인
  const phone_numberCheck = (phone_number) => {
    const phone_numberRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phone_numberRegex.test(phone_number)) {
      setPhoneNumberError("010-1234-5678 형식으로 입력해주세요.");
    } else {
      setPhoneNumberError("");
    }
  };

  return (
    <div className={style.wrapper}>
      <Header />
      <div className={style.contents}>
        <div className={style.container}>
          <h1>회원가입</h1>
          <form onSubmit={submit_userInfo}>
            <div className={style.webMail}>
              <UserInput
                type="text"
                placeholder="금오공대 웹메일"
                value={userInfo.username}
                name="username"
                onChange={onChange}
                disabled={!canEdit} // 인증 완료 후 입력 불가
              />
              <button
                type="button"
                onClick={verify_username}
                disabled={
                  !userInfo.username ||
                  usernameError ||
                  isVerificationPending ||
                  isverify_mailCode
                } // 인증 완료 시 버튼 비활성화
                className={`${style.button} ${
                  !isVerificationPending &&
                  userInfo.username &&
                  !usernameError &&
                  !isverify_mailCode
                    ? style.buttonActive
                    : ""
                }`}
              >
                인증
              </button>
            </div>

            {usernameError && (
              <div className={style.error}>
                <small>{usernameError}</small>
              </div>
            )}

            {/* 인증번호 입력 필드는 인증번호 요청 후(isVerificationPending === true)이고, 아직 인증이 완료되지 않았을 때만 보여줌 */}
            {isVerificationPending && !isverify_mailCode && (
              <div className={style.verificationCode}>
                <UserInput
                  type="text"
                  placeholder="인증번호"
                  value={userInfo.mailCode}
                  name="mailCode"
                  onChange={onChange}
                />
                <button
                  type="button"
                  onClick={check_mailCode}
                  className={style.button}
                >
                  확인
                </button>
              </div>
            )}

            {/* 이후 비밀번호, 이름, 학번 등 나머지 필드들 */}
            <div className={style.passwd}>
              <UserInput
                type="password"
                placeholder="비밀번호"
                value={userInfo.password}
                name="password"
                onChange={onChange}
                maxLength={20}
              />
            </div>
            {passwordError && (
              <div className={style.error}>
                <small>{passwordError}</small>
              </div>
            )}
            <div className={style.checkPasswd}>
              <UserInput
                type="password"
                placeholder="비밀번호 확인"
                value={userInfo.confirmPassword}
                name="confirmPassword"
                onChange={onChange}
              />
            </div>
            {passwordCheckError && (
              <div className={style.error}>
                <small>{passwordCheckError}</small>
              </div>
            )}
            <div className={style.name}>
              <UserInput
                type="text"
                placeholder="이름"
                value={userInfo.name}
                name="name"
                onChange={onChange}
              />
            </div>
            <div className={style.id}>
              <UserInput
                type="text"
                placeholder="학번"
                value={userInfo.student_id}
                name="student_id"
                onChange={onChange}
                maxLength={10}
              />
            </div>
            {student_idError && (
              <div className={style.error}>
                <small>{student_idError}</small>
              </div>
            )}
            <div className={style.major}>
              <select
                name="department"
                onChange={onChange}
                value={userInfo.department}
              >
                <option>학과</option>
                {departments.map((depart, index) => (
                  <option key={index} value={depart}>
                    {depart}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.grade}>
              <select name="grade" onChange={onChange} value={userInfo.grade}>
                <option value="">학년</option>
                <option value="1">1학년</option>
                <option value="2">2학년</option>
                <option value="3">3학년</option>
                <option value="4">4학년</option>
              </select>
            </div>
            <div className={style.tel}>
              <UserInput
                type="text"
                placeholder="전화번호"
                value={userInfo.phone_number}
                name="phone_number"
                onChange={onChange}
              />
            </div>
            {phone_numberError && (
              <div className={style.error}>
                <small>{phone_numberError}</small>
              </div>
            )}
            <div className={style.signupButton}>
              <button type="submit">회원가입</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
