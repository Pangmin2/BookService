import React from "react";
import styles from "./BookManage.module.css";

const BookManage = () => {
  return (
    <div className={styles.container}>
      {/* Left Panel */}
      <div className={styles.loanStatus}>
        <div className={styles.loanItem}>
          <input type="text" className={styles.inputBox} placeholder="대출 정보" />
          <button className={styles.actionButton}>승인</button>
          <button className={styles.actionButton}>반납</button>
          <button className={styles.actionButton}>연체</button>
        </div>
        <div className={styles.loanItem}>
          <input type="text" className={styles.inputBox} placeholder="대출 정보" />
          <button className={styles.actionButton}>승인</button>
          <button className={styles.actionButton}>반납</button>
          <button className={styles.actionButton}>연체</button>
        </div>
        <h3 className={styles.sectionTitle}>대출 현황</h3>
      </div>

      {/* Right Panels */}
      <div className={styles.rightPanel}>
        <div className={styles.returnStatus}>
          <h3 className={styles.sectionTitle}>반납 현황</h3>
        </div>
        <div className={styles.reservationStatus}>
          <h3 className={styles.sectionTitle}>예약 현황</h3>
        </div>
      </div>
    </div>
  );
};

export default BookManage;