import React from "react";
import "./BookManage.css";

const BookManage = () => {
  return (
    <div className="container">
      {/* Left Panel */}
      <div className="loan-status">
        <div className="loan-item">
          <input type="text" className="input-box" placeholder="대출 정보" />
          <button className="action-button">승인</button>
          <button className="action-button">반납</button>
          <button className="action-button">연체</button>
        </div>
        <div className="loan-item">
          <input type="text" className="input-box" placeholder="대출 정보" />
          <button className="action-button">승인</button>
          <button className="action-button">반납</button>
          <button className="action-button">연체</button>
        </div>
        <h3 className="section-title">대출 현황</h3>
      </div>

      {/* Right Panels */}
      <div className="right-panel">
        <div className="return-status">
          <h3 className="section-title">반납 현황</h3>
        </div>
        <div className="reservation-status">
          <h3 className="section-title">예약 현황</h3>
        </div>
      </div>
    </div>
  );
};

export default BookManage;