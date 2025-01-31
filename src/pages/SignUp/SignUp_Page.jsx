import style from "./SignUp_Page.module.css";
import UserInput from "../../components/UserInput/UserInput";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

const SignUp = () => {
  //TODO: 모든 입력 필드 관리
  const [userInfo, setUserInfo] = useState({
    username: "",
    mailCode: "",
    password: "",
    confirmPassword: "",
    name: "",
    department: "",
    grade: "",
    student_id: "",
    phone_number: "",
  });

  //TODO: 정규식 에러 코드 관리
  const [usernameError, setUserNameError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [student_idError, setStudentIdError] = useState("");
  const [phone_numberError, setPhoneNumberError] = useState("");

  //TODO: 학과 리스트
  const [departments, setDepartments] = useState([]);

  //TODO: 웹메일 인증여부, 인증번호 확인 여부, 비밀번호 동일 여부, 아래 모든 입력칸 제대로 입력 여부를 관리하는 상태

  //TODO: 회원가입 버튼 클릭시 서버에 전달될 정보

  //TODO: 회원가입 버튼 클릭시 서버에 정보 전송 이벤트 핸들러

  //TODO: 웹메일 "인증" 버튼 클릭시 서버에 정보 전송 이벤트 핸들러

  //TODO: 인증번호 "확인" 버튼 클릭시 서버에 정보 전송 이벤트 핸들러

  //TODO: 웹메일 정규식 확인 이벤트 핸들러
  const usernameCheck = (username) => {
    const usernameRegex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@kumoh\.ac\.kr$/;
    if (username === "" || !usernameRegex.test(username)) {
      setUserNameError("올바른 메일 형식으로 입력해주세요.");
      return false;
    } else {
      setUserNameError("");
      return true;
    }
  };

  //TODO: 비밀번호 정규식 확인 이벤트 핸들러
  const passwordCheck = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10,20}$/;
    if (password === "" || !passwordRegex.test(password)) {
      setPassWordError(
        "영문 대/소문자, 숫자, 특수문자를 조합하여 입력해주세요. (10~20자)"
      );
      return false;
    } else {
      setPassWordError("");
      return true;
    }
  };

  //TODO: 학번 정규식 확인 이벤트 핸들러
  const student_idCheck = (student_id) => {
    const student_idRegex = /^\d{8}$/;
    if (student_id === "" || !student_idRegex.test(student_id)) {
      setStudentIdError("학번 8자를 모두 입력해주세요.");
      return false;
    } else {
      setStudentIdError("");
      return true;
    }
  };

  //TODO: 전화번호 정규식 확인 이벤트 핸들러
  const phone_numberCheck = (phone_number) => {
    const phone_numberRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (phone_number === "" || !phone_numberRegex.test(phone_number)) {
      setPhoneNumberError("010-1234-5678 형식으로 입력해주세요.");
      return false;
    } else {
      setPhoneNumberError("");
      return true;
    }
  };

  //TODO: 정규식 유효성 검사
  useEffect(() => {
    if (userInfo.username) {
      const isMatch = usernameCheck(userInfo.username);
    } else if (userInfo.password) {
      const isMatch = passwordCheck(userInfo.password);
    } else if (userInfo.student_id) {
      const isMatch = student_idCheck(userInfo.student_id);
    } else if (userInfo.phone_number) {
      const isMatch = phone_numberCheck(userInfo.phone_number);
    }
  }, [userInfo]);

  //TODO: 웹메일 인증 여부 상태
  //TODO: 인증번호 인증 여부 상태

  //TODO: 모든 텍스트 필드에 대하여 해당 칸 입력시 화면에 렌더링하는 이벤트 핸들러
  const onChange = (e) => {
    const { name, value } = e.target; //포커스된 필드의 이름과 입력된 값을 가져옴

    setUserInfo({
      //기존의 정보들은 스프레드 연산자로 나열하고 변경된 필드의 값에 대해서만 정보를 수정할 수 있도록
      ...userInfo,
      [name]: value,
    });
  };

  //TODO: 비밀번호 확인에 입력한 값과 비밀번호에 입력한 값이 동일한지 확인하는 이벤트 핸들러

  //TODO: 회원가입 페이지 들어왔을 때 학과 리스트 서버 요청
  useEffect(() => {
    const getDepartments = async () => {
      try {
        const response = await axios.get("서버주소");
        setDepartments(response.data);
      } catch (error) {
        console.error("학과 정보를 가져오는데 실패했습니다:", error);
        setDepartments([]);
      }
    };

    getDepartments();
  }, []);

  return (
    <>
      <Header />
      <div className={style.Content}>
        <div className={style.container}>
          <div>
            <h1>회원가입</h1>
          </div>
          <div className={style.contents}>
            <form onSubmit={""}>
              <div className={style.webMail}>
                <UserInput
                  type="text"
                  placeholder="금오공대 웹메일"
                  value={userInfo.username}
                  name="username"
                  onChange={onChange}
                />
                <button onClick={""} disabled={""}>
                  인증
                </button>
              </div>
              {usernameError && (
                <div className={style.error}>
                  <small>{usernameError}</small>
                </div>
              )}
              <div className={style.verificationCode}>
                <UserInput
                  type="text"
                  placeholder="인증번호"
                  value={userInfo.mailCode}
                  name="mailCode"
                  onChange={onChange}
                />
                <button onClick={""} disabled={""}>
                  확인
                </button>
              </div>
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
              <hr />
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
                  maxLength={8}
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
                  <option value="">학과</option>
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
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
