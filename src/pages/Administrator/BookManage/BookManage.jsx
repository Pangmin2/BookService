import React from 'react';
import './BookManage.css';

function BookManage () {
  return (
    <div className="app">
      <header className="header">
        <div className="menu">☰</div>
        <div className="auth-links">
          <a href="#login">로그인</a>
          <span> | </span>
          <a href="#signup">회원가입</a>
        </div>
      </header>

      <main className="main-container">
        <div className="loan-management">
          <div className="loan-item">
            <div className="loan-input"></div>
            <div className="loan-actions">
              <button>승인</button>
              <button>반납</button>
              <button>연체</button>
            </div>
          </div>
          <div className="loan-item">
            <div className="loan-input"></div>
            <div className="loan-actions">
              <button>승인</button>
              <button>반납</button>
              <button>연체</button>
            </div>
          </div>
          <h2>대출 현황</h2>
        </div>

        <div className="status-panels">
          <div className="panel">반납 현황</div>
          <div className="panel">예약 현황</div>
        </div>
      </main>

      <footer className="footer">
        <p>Related</p>
        <p>국립금오공과대학교 컴퓨터공학부</p>
        <p>@ CHIP_SAT Page 2024</p>
      </footer>
    </div>
  );
}

export default BookManage;