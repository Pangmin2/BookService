import { useState, useEffect } from 'react';
import axios from 'axios';
import './Main_Page.css';
import Banner from '../../assets/Banner.png';

const mockNotices = [
  { id: 1, content: "첫 번째 공지사항 내용", date: "2024-07-31" },
  { id: 2, content: "두 번째 공지사항 내용", date: "2024-08-01" },
  { id: 3, content: "세 번째 공지사항 내용", date: "2024-08-02" },
  { id: 4, content: "네 번째 공지사항 내용", date: "2024-08-03" },
  { id: 5, content: "다섯 번째 공지사항 내용", date: "2024-08-04" },
];

const mockActivities = [
  { id: 1, title: "활동 1" },
  { id: 2, title: "활동 2" },
  { id: 3, title: "활동 3" },
  { id: 4, title: "활동 4" },
];

const mockResources = [
  { id: 1, title: "자료 1" },
  { id: 2, title: "자료 2" },
  { id: 3, title: "자료 3" },
  { id: 4, title: "자료 4" },
];

const mockFreeBoard = [
  { id: 1, content: "첫 번째 자유 게시판 내용", date: "2024-07-31" },
  { id: 2, content: "두 번째 자유 게시판 내용", date: "2024-08-01" },
  { id: 3, content: "세 번째 자유 게시판 내용", date: "2024-08-02" },
  { id: 4, content: "네 번째 자유 게시판 내용", date: "2024-08-03" },
  { id: 5, content: "다섯 번째 자유 게시판 내용", date: "2024-08-04" },
];

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

const fetchData = (endpoint, mockData) => {
  return api.get(endpoint)
    .then(response => response.data)
    .catch(error => {
      console.error('API 요청 실패:', error);
      return mockData; 
    });
};

const MainPage = () => {
  const [notices, setNotices] = useState([]);
  const [activities, setActivities] = useState([]);
  const [resources, setResources] = useState([]);
  const [freeBoard, setFreeBoard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchData('/notices', mockNotices),
      fetchData('/activities', mockActivities),
      fetchData('/resources', mockResources),
      fetchData('/free-board', mockFreeBoard)
    ]).then(([noticesData, activitiesData, resourcesData, freeBoardData]) => {
      setNotices(noticesData);
      setActivities(activitiesData);
      setResources(resourcesData);
      setFreeBoard(freeBoardData);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="main-page">
      <header className="header">
        <img src={Banner} alt="CHIP_SAT" className="banner" />
        <div className="header-overlay">
          <div className="menu-icon">&#9776;</div>
          <a href="#" className="login-link">login</a>
        </div>
      </header>

      <h2 className="section-title">공지사항</h2>
      <section className="notice-section">
        <div className="notice-list">
          <ul>
            {notices.map((notice) => (
              <li key={notice.id}>
                <span>{notice.content}</span>
                <span className="date">{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="activities-section">
        <h2 className="section-title">활동</h2>
        <div className="activities">
          {activities.map((activity) => (
            <div key={activity.id} className="activity-box">{activity.title}</div>
          ))}
        </div>
      </section>

      <section className="resources-section">
        <h2 className="section-title">자료 공유</h2>
        <div className="resources">
          {resources.map((resource) => (
            <div key={resource.id} className="resource-box">{resource.title}</div>
          ))}
        </div>
      </section>

      <h2 className="section-title">자유 게시판</h2>
      <section className="free-board-section">
        <div className="free-board-list">
          <ul>
            {freeBoard.map((post) => (
              <li key={post.id}>
                <span>{post.content}</span>
                <span className="date">{post.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MainPage;