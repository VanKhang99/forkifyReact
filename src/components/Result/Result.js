import styles from "./Result.module.scss";
import { useDispatch, useSelector } from "react-redux";

import { Spinner, Message } from "../GlobalComponent";
import { Copyright, Paginate, RecipeList } from "./index";

import { handlePage } from "../../features/search/searchSlice";

function Result() {
  const dispatch = useDispatch();
  const { isLoading, result, total, error, page, resultPerPage } = useSelector(
    (store) => store.search
  );

  const totalPages = Math.ceil(total / resultPerPage);

  const newResult = (page) => {
    const firstIndex = (page - 1) * resultPerPage;
    const secondIndex = page * resultPerPage;
    return result.slice(firstIndex, secondIndex);
  };

  const controlPage = (page) => {
    if (page > 0 && page <= totalPages) dispatch(handlePage(page));
  };

  if (isLoading) {
    return (
      <div className={styles.result}>
        <Spinner />
      </div>
    );
  }

  if (isLoading === false && error) {
    return (
      <div className={styles.result}>
        <Message
          message="No recipes found for your query! Please try again ;)"
          typeIcon="icon-alert-triangle"
        />
        <Paginate />
        <Copyright />
      </div>
    );
  }

  return (
    <div className={styles.result}>
      <RecipeList result={newResult(page)} isBookmarkList={false} />
      <Paginate
        onClickButtonPage={controlPage}
        page={page}
        totalPages={totalPages}
      />
      <Copyright />
    </div>
  );
}

export default Result;
