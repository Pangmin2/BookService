import style from "./MyPage.module.css";
import swal from "sweetalert";
import Layout from "../../components/Layout/Layout";
import UserInput from "../../components/UserInput/UserInput";
import { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { requestWithAuth } from "../../utils/requestWithAuth";

const MyPage = () => {
  const [image, setImage] = useState("사진");
  const [file, setFile] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const fileInput = useRef(null);

  const [userInfo, setUserInfo] = useState({
    role: "",
    username: "",
    prePassword: "",
    newPassword: "",
    confirmNewPassword: "",
    name: "",
    department: "",
    departments: [],
    studentId: "",
    grade: "",
    phoneNumber: "",
    departmentPublic: true,
    studentIdPublic: false,
    gradePublic: true,
    phonePublic: false,
  });

  const {
    prePassword,
    newPassword,
    department,
    grade,
    phoneNumber,
    departmentPublic,
    studentIdPublic,
    gradePublic,
    phonePublic,
  } = userInfo;

  const newUserInfo = {
    prePassword,
    newPassword,
    grade,
    phoneNumber,
    departmentPublic,
    studentIdPublic,
    gradePublic,
    phonePublic,
    department: selectedDepartment,
  };

  const [modifyMode, setModifyMode] = useState(false);

  useEffect(() => {
    requestUserInfo();
  }, []);

  const requestUserInfo = async () => {
    try {
      const response = await requestWithAuth("GET", "/myPage");
      console.log(response.data);
      if (response === null) {
        throw new Error();
      }
      setUserInfo(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onModify = (e) => {
    e.preventDefault();
    setModifyMode(!modifyMode);
  };

  //수정된 정보 전송
  const submitUserInfo = async (e) => {
    e.preventDefault();
    try {
      console.log(newUserInfo);
      const response = await requestWithAuth("PATCH", "/myPage", newUserInfo);
      if (response === null) {
        throw new Error();
      }
      swal({
        title: "정보가 수정되었습니다.",
        icon: "success",
        button: "확인",
      });
      setModifyMode(!modifyMode);
      console.log(newUserInfo);
    } catch (e) {
      console.error(e.response.data);
    }
  };

  //프로필 사진 변경
  const onChangeProfileImg = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result); // 이미지 미리보기 설정
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 프로필 사진 삭제
  const onDeleteProfileImg = () => {
    setFile(null);
    setImage("");
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });

    switch (name) {
      case "departments":
        setSelectedDepartment(value);
        break;
      case "newPassword":
        passwordCheck(value);
        break;
      case "confirmNewPassword":
        setConfirmPassword(
          value !== userInfo.newPassword ? "비밀번호가 일치하지 않습니다." : ""
        );
        break;
      case "phoneNumber":
        phoneNumberCheck(value);
        break;
      default:
        break;
    }
  };

  const passwordCheck = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{10,20}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "영문 대/소문자, 숫자, 특수문자를 조합하여 입력해주세요. (10~20자)"
      );
    } else {
      setPasswordError("");
    }
  };

  // 전화번호 정규식 확인
  const phoneNumberCheck = (phoneNumber) => {
    const phone_numberRegex = /^\d{3}-\d{4}-\d{4}$/;
    if (!phone_numberRegex.test(phoneNumber)) {
      setPhoneNumberError("010-1234-5678 형식으로 입력해주세요.");
    } else {
      setPhoneNumberError("");
    }
  };

  return (
    <>
      <Layout
        hero={<Hero section="마이페이지" />}
        content={
          <div className={style.container}>
            <h3>회원 정보</h3>
            <hr />
            <form
              id="userForm"
              className={style.contents}
              onSubmit={submitUserInfo}
            >
              <div className={style.img}>
                <img src={image} alt="프로필" />
                {modifyMode ? (
                  <div className={style.profileImage}>
                    <label htmlFor="profileImg" className={style.profileImg}>
                      변경
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      id="profileImg"
                      onChange={onChangeProfileImg}
                      onClick={() => {
                        fileInput.current.value = null;
                        fileInput.current.click();
                      }}
                      ref={fileInput}
                    />
                    <button
                      className={style.profileImg}
                      type="button"
                      onClick={onDeleteProfileImg}
                    >
                      삭제
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className={style.field}>
                <label>회원등급</label>
                <span>{userInfo?.role}</span>
              </div>
              <div className={style.field}>
                <label>웹메일</label>
                <UserInput
                  type="text"
                  name="username"
                  value={userInfo?.username}
                  onChange={onChange}
                  disabled={true}
                />
              </div>
              <div className={style.field}>
                <label>비밀번호</label>
                <div className={style.passWordContainer}>
                  <UserInput
                    type="password"
                    name="prePassword"
                    placeholder="기존 비밀번호"
                    onChange={onChange}
                    disabled={!modifyMode}
                  />
                  {modifyMode ? (
                    <>
                      <div>
                        <UserInput
                          type="password"
                          name="newPassword"
                          placeholder="새 비밀번호"
                          onChange={onChange}
                        />
                        {passwordError && (
                          <small className={style.error}>{passwordError}</small>
                        )}
                      </div>
                      <div>
                        <UserInput
                          type="password"
                          name="confirmNewPassword"
                          placeholder="새 비밀번호 확인"
                          onChange={onChange}
                        />
                        {confirmPassword && (
                          <small className={style.error}>
                            {confirmPassword}
                          </small>
                        )}
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className={style.field}>
                <label>이름</label>
                <UserInput
                  type="text"
                  name="name"
                  value={userInfo?.name}
                  onChange={onChange}
                  disabled={true}
                />
              </div>
              <div className={style.field}>
                <label>학과</label>
                <select
                  name="department"
                  onChange={onChange}
                  value={selectedDepartment}
                  disabled={!modifyMode}
                >
                  <option value={userInfo?.department}></option>
                  {userInfo?.departments?.map((depart, index) => (
                    <option key={index} value={depart}>
                      {depart}
                    </option>
                  ))}
                </select>
              </div>
              <div className={style.field}>
                <label>학번</label>
                <UserInput
                  type="text"
                  name="studentId"
                  value={userInfo?.studentId}
                  onChange={onChange}
                  disabled={true}
                />
              </div>
              <div className={style.field}>
                <label>학년</label>
                <select
                  name="grade"
                  onChange={onChange}
                  value={userInfo?.grade}
                  disabled={!modifyMode}
                >
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                </select>
              </div>
              <div className={style.field}>
                <label>전화번호</label>
                <div className={style.telRegex}>
                  <UserInput
                    type="text"
                    name="phoneNumber"
                    value={userInfo?.phoneNumber}
                    onChange={onChange}
                    disabled={!modifyMode}
                  />
                  {phoneNumberError ? (
                    <small className={style.error}>
                      010-1234-5678 형식으로 입력해주세요.
                    </small>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
            <div className={style.deleteAccount}>
              <button>회원 탈퇴</button>
            </div>

            <hr />
            <div className={style.buttonContainer}>
              {modifyMode ? (
                <>
                  <button className={style.button} onClick={onModify}>
                    취소
                  </button>
                  <button
                    className={style.button}
                    type="submit"
                    form="userForm"
                  >
                    완료
                  </button>
                </>
              ) : (
                <button className={style.button} onClick={onModify}>
                  수정
                </button>
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default MyPage;
