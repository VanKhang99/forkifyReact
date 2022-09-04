import styles from "./Header.module.scss";
import { Logo, Search, NavItem } from "./index";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
      <NavItem />
    </header>
  );
}

export default Header;
