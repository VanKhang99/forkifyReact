import styles from "./Logo.module.scss";
import logo from "../../assets/images/logo.png";

function Logo() {
  return (
    <>
      <img className={styles.logo} src={logo} alt="Logo Forkify" />
    </>
  );
}

export default Logo;
