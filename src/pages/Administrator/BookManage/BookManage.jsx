import React, { useEffect, useState, useCallback } from 'react';
import style from './BookManage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import ReservationStatus from '../../../components/BookManage/ReservationStatus';
import LoanStatus from '../../../components/BookManage/LoanStatus';
import ReturnStatus from '../../../components/BookManage/ReturnStatus';
import axios from 'axios';

const BookManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loans, setLoans] = useState([]);
  const [returns, setReturns] = useState([]);
  const [activeTab, setActiveTab] = useState('reservations');
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const SERVER = import.meta.env.VITE_SERVER_URL;

  // 상태 변경 핸들러 추가 (반납/연체 상태 변경)
  const handleStatusChange = (index, newStatus) => {
    const updatedReturns = returns.map((item, i) => {
      if (i === index) {
        return { ...item, status: newStatus };
      }
      return item;
    });
    setReturns(updatedReturns);
  };

  // 예약 승인 함수 수정
  const acceptReservation = async (reservationId) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${reservationId}/accept`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchReservations(); // 예약 현황 업데이트
        fetchLoans();       // 대출 현황 업데이트
        fetchReturns();     // 반납 현황 업데이트
      } else {
        console.error("예약 승인 실패", response.data);
      }
    } catch (error) {
      console.error("예약 승인 중 오류 발생:", error);
    }
  };

  // 반납 현황 조회 함수 추가
  const fetchReturns = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/returns?page=0&size=10&sort=returnDate,desc`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setReturns(response.data.data.returns);
      } else {
        console.error("반납 조회 실패", response.data);
      }
    } catch (error) {
      console.error("반납 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 예약 목록을 가져오는 함수
  const fetchReservations = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/reservations?page=0&size=10&sort=reservationDate%2Casc`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        setReservations(response.data.data.reservations);
      } else {
        console.error("예약 조회 실패", response.data);
      }
    } catch (error) {
      console.error("예약 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 대출 목록을 가져오는 함수
  const fetchLoans = useCallback(async () => {
    try {
      const response = await axios.get(`${SERVER}/book/admin/loans?page=0&size=10&sort=borrowDate,asc`, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        setLoans(response.data.data.loans);
      } else {
        console.error("대여 조회 실패", response.data);
      }
    } catch (error) {
      console.error("대여 조회 중 오류 발생:", error);
    }
  }, [SERVER, token]);

  // 반납 처리 함수 추가
  const returnLoan = async (loanId) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${loanId}/return`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        fetchLoans();
        fetchReturns();
      } else {
        console.error("반납 처리 실패", response.data);
      }
    } catch (error) {
      console.error("반납 처리 중 오류 발생:", error);
    }
  };

  // 반납 현황 조회 useEffect
  useEffect(() => {
    fetchReturns();
  }, [fetchReturns]);

  // 예약 목록을 가져오는 useEffect
  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  // 대출 목록을 가져오는 useEffect
  useEffect(() => {
    fetchLoans();
  }, [fetchLoans]);

  // 상태 변경 함수 추가
  const updateReturnStatus = async (reservationId, newStatus) => {
    try {
      const response = await axios.post(`${SERVER}/book/admin/${reservationId}/return/correct?status=${newStatus}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`, // 토큰을 헤더에 추가
        },
      });

      if (response.data.success) {
        fetchReturns(); // 상태 변경 후 반납 목록 갱신
      } else {
        console.error("상태 변경 실패", response.data);
      }
    } catch (error) {
      console.error("상태 변경 중 오류 발생:", error);
    }
  };

  return (
    <>
      <Header />
      <div className={style.adminLayout}>
        <div className={style.sidebar}>
          <button
            className={`${style.tabButton} ${activeTab === 'reservations' ? style.active : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            예약 현황
          </button>
          <button
            className={`${style.tabButton} ${activeTab === 'loans' ? style.active : ''}`}
            onClick={() => setActiveTab('loans')}
          >
            대출 현황
          </button>
          <button
            className={`${style.tabButton} ${activeTab === 'returns' ? style.active : ''}`}
            onClick={() => setActiveTab('returns')}
          >
            반납 현황
          </button>
        </div>
        <div className={style.content}>
          {activeTab === 'reservations' && (
            <ReservationStatus
              reservations={reservations}
              acceptReservation={acceptReservation}
            />
          )}
          {activeTab === 'loans' && (
            <LoanStatus
              loans={loans}
              returnLoan={returnLoan}
            />
          )}
          {activeTab === 'returns' && (
            <ReturnStatus
              returns={returns}
              updateReturnStatus={updateReturnStatus}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookManagement;