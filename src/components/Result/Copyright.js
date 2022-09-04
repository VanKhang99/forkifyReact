import styles from "./Copyright.module.scss";

function Copyright() {
  return (
    <div className={styles.copyright}>
      <p className={styles.copyrightText}>
        &#169; Copyright by{" "}
        <a href="https://twitter.com/jonasschmedtman">Jonas Schmedtmann</a>. Use
        for learning or your portfolio. Don't use to teach. Don't claim as your
        own.
      </p>
    </div>
  );
}

export default Copyright;
