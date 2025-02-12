import style from "./Layout.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";

const Layout = ({ hero, content }) => {
  return (
    <div className={style.wrapper}>
      <Header />
      {hero && hero}
      <div className={style.main}>{content}</div>
      <Footer />
    </div>
  );
};

export default Layout;
