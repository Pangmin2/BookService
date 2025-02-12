import React, { useState } from "react";
import style from "./MemberManage.module.css";
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer'

const MemberManage = () => {
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "손유나", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 2, name: "정보경", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 3, name: "채주혁", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    { id: 4, name: "허광민", department: "컴퓨터공학과", rank: "일반 회원", joinDate: "2024-08-05" },
    // 필요한 데이터 추가
  ]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <Header />
    <div className={style.memberManagementContainer}  style={{ marginTop: '50px' }}>
      <h1>부원 관리</h1>
      <hr />
      <div className={style.searchBar}>
        <input
          type="text"
          placeholder="검색"
          value={search}
          onChange={handleSearch}
        />
        <button className={style.searchButton}>🔍</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>이름</th>
            <th>학과</th>
            <th>등급</th>
            <th>가입일</th>
            <th>계정 삭제</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.department}</td>
              <td>{member.rank}</td>
              <td>{member.joinDate}</td>
              <td>
                <button
                  className={style.deleteButton}
                  onClick={() => handleDelete(member.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer />
    </>

    
  );
};

export default MemberManage;
