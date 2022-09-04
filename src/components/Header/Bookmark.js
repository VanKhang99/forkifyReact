import styles from "./Bookmark.module.scss";
import { useSelector } from "react-redux";

import { Message } from "../GlobalComponent";
import { RecipeList } from "../Result";

function Bookmark() {
  const { bookmarks } = useSelector((store) => store.recipe);

  if (!bookmarks.length) {
    return (
      <div className={styles.bookmarks}>
        <Message
          message="No bookmarked recipe found! Please try again ;)"
          typeIcon="icon-alert-triangle"
        />
      </div>
    );
  }

  return (
    <div className={styles.bookmarks}>
      <RecipeList result={bookmarks} isBookmarkList={true} />
    </div>
  );
}

export default Bookmark;
