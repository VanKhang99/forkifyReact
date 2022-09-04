import clsx from "clsx";
import styles from "./Paginate.module.scss";
import icon from "../../assets/images/icons.svg";

function Paginate({ onClickButtonPage, page, totalPages }) {
  if (page === 1 && totalPages > 1) {
    return (
      <div className={styles.paginate}>
        <p className={styles.paginateTotal}>
          {page} / {totalPages}
        </p>

        <button
          className={clsx(
            styles.paginateBtn,
            styles.paginateBtnNext,
            "button--page"
          )}
          onClick={() => onClickButtonPage(page + 1)}
        >
          <span>{`Page ${page + 1}`}</span>
          <svg>
            <use href={`${icon}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
    );
  }

  if (page < totalPages) {
    return (
      <div className={styles.paginate}>
        <button
          className={clsx(
            styles.paginateBtn,
            styles.paginateBtnPrev,
            "button--page"
          )}
          onClick={() => onClickButtonPage(page - 1)}
        >
          <svg>
            <use href={`${icon}#icon-arrow-left`}></use>
          </svg>
          <span>{`Page ${page - 1}`}</span>
        </button>

        <p className={styles.paginateTotal}>
          {page} / {totalPages}
        </p>

        <button
          className={clsx(
            styles.paginateBtn,
            styles.paginateBtnNext,
            "button--page"
          )}
          onClick={() => onClickButtonPage(page + 1)}
        >
          <span>{`Page ${page + 1}`}</span>
          <svg>
            <use href={`${icon}#icon-arrow-right`}></use>
          </svg>
        </button>
      </div>
    );
  }

  if (page === totalPages && totalPages > 1) {
    return (
      <div className={styles.paginate}>
        <button
          className={clsx(
            styles.paginateBtn,
            styles.paginateBtnPrev,
            "button--page"
          )}
          onClick={() => onClickButtonPage(page - 1)}
        >
          <svg>
            <use href={`${icon}#icon-arrow-left`}></use>
          </svg>
          <span>{`Page ${page - 1}`}</span>
        </button>

        <p className={styles.paginateTotal}>
          {page} / {totalPages}
        </p>
      </div>
    );
  }

  return <div className={styles.paginate}></div>;
}

export default Paginate;
