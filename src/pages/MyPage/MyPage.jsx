import style from "./MyPage.module.css";
import swal from "sweetalert";
import Layout from "../../components/Layout/Layout";
import UserInput from "../../components/UserInput/UserInput";
import { useEffect, useRef, useState } from "react";
import Hero from "../../components/Hero/Hero";
import { requestWithAuth } from "../../utils/requestWithAuth";

const MyPage = () => {
  const [image, setImage] = useState("사진진");
  const [file, setFile] = useState("");
  const fileInput = useRef(null);

  const [userInfo, setUserInfo] = useState({
    role: "",
    username: "",
    name: "",
    department: [],
    studentId: "",
    grade: "",
    phoneNumber: "",
    departmentPublic: true,
    studentIdPublic: false,
    gradePublic: true,
    phonePublic: false,
    prePassword: "",
    newPassword: "",
  });
  const [modifyMode, setModifyMode] = useState(false);

  useEffect(() => {
    requestUserInfo();
  }, []);

  const requestUserInfo = async () => {
    try {
      const response = await requestWithAuth("GET", "/myPage");
      console.log("사용자 정보 확인 응답: ", response);
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
      const response = await requestWithAuth("PATCH", "/myPage", userInfo);
      if (response === null) {
        throw new Error();
      }
      swal({
        title: "정보가 수정되었습니다.",
        icon: "success",
        button: "확인",
      });
      setModifyMode(!modifyMode);
      console.log(userInfo);
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
  };

  return (
    <>
      <Layout
        hero={<Hero section="마이페이지" />}
        content={
          <div className={style.container}>
            <h3>회원 정보</h3>
            <form className={style.contents} onSubmit={submitUserInfo}>
              <hr />
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
                    placeholder="기존 비밀번호"
                    onChange={onChange}
                    disabled={!modifyMode}
                  />
                  {modifyMode ? (
                    <>
                      <div className={style.passWordRegex}>
                        <UserInput
                          type="password"
                          placeholder="새 비밀번호"
                          onChange={onChange}
                        />
                        <small className={style.error}>
                          영문 대/소문자, 숫자, 특수문자를 조합하여
                          입력해주세요. (10~20자)
                        </small>
                      </div>
                      <UserInput
                        type="password"
                        placeholder="새 비밀번호 확인"
                        onChange={onChange}
                      />
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
                {/* <select
                  name="department"
                  onChange={onChange}
                  value={userInfo?.department}
                  disabled={!modifyMode}
                >
                  {userInfo?.department?.map((depart, index) => (
                    <option key={index} value={depart}>
                      {depart}
                    </option>
                  ))}
                </select> */}
                <UserInput
                  type="text"
                  name="department"
                  value={userInfo?.department}
                  onChange={onChange}
                  disabled={!modifyMode}
                />
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
                  {modifyMode ? (
                    <small className={style.error}>
                      010-1234-5678 형식으로 입력해주세요.
                    </small>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
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
                    <button className={style.button}>완료</button>
                  </>
                ) : (
                  <button className={style.button} onClick={onModify}>
                    수정
                  </button>
                )}
              </div>
            </form>
          </div>
        }
      />
    </>
  );
};

export default MyPage;
