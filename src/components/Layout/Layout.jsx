import style from "./Layout.module.css";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import useUserStore from "../../../store/useUserStore";
import GuestBlock from "../GuestBlock/GuestBlock";

const Layout = ({ hero, content }) => {
  const isLogined = useUserStore((state) => state.isLogined);

  return (
    <div className={style.wrapper}>
      <Header />

      {isLogined ? (
        <>
          {hero && hero}
          <div className={style.contents}>{content}</div>
        </>
      ) : (
        <GuestBlock />
      )}

      <Footer />
    </div>
  );
};

export default Layout;
