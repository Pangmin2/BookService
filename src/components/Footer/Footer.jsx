import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>Related</p>
        <p>국립금오공과대학교 컴퓨터공학부</p>
        <p>© CHIP_SAT</p>
      </div>
    </footer>
  );
};

export default Footer;
