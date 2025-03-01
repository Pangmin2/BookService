import style from "./MyBookPage.module.css";
import Layout from "../../components/Layout/Layout";
import Hero from "../../components/Hero/Hero";

const MyBookPage = () => {
  return (
    <Layout
      hero={<Hero section="도서 대여 현황" />}
      content={
        <div className={style.wrapper}>
          <div className={style.borrow}>
            <h3>대출 현황</h3>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>도서명</th>
                  <th>대출일자</th>
                  <th>반납 예정일</th>
                  <th>연체일수</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>2025-02-21</td>
                  <td>0</td>
                  <td>대출</td>
                </tr>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>2025-02-21</td>
                  <td>0</td>
                  <td>반납</td>
                </tr>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>2025-02-21</td>
                  <td>0</td>
                  <td>연체</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <div className={style.return}>
            <h3>반납 현황</h3>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>도서명</th>
                  <th>반납일자</th>
                  <th>반납처리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>반납 완료</td>
                </tr>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>반납 완료</td>
                </tr>
                <tr>
                  <td>어쩌고</td>
                  <td>2025-02-21</td>
                  <td>반납 완료</td>
                </tr>
              </tbody>
            </table>
          </div> */}
        </div>
      }
    />
  );
};

export default MyBookPage;
