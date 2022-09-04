import { useDispatch } from "react-redux";
import clsx from "clsx";

import styles from "./RecipeItem.module.scss";
import icon from "../../assets/images/icons.svg";
import { deleteRecipe } from "../../features/recipe/recipeSlice";

function RecipeItem({
  idHash,
  id,
  title,
  publisher,
  imageUrl,
  keyCreated,
  isBookmarkList,
}) {
  // console.log("third");
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRecipe({ id, keyCreated }));
  };

  return (
    <li className={styles.preview}>
      {/* {console.log("four", idHash === id)} */}
      <a
        href={`#${id}`}
        className={clsx(styles.previewLink, {
          [styles.previewLinkActive]: idHash === id,
        })}
      >
        <figure className={styles.previewImg}>
          <img src={imageUrl} alt={title} />
        </figure>
        <div className={styles.previewData}>
          <h4>{title}</h4>
          <p>{publisher}</p>
          {keyCreated && (
            <div className={clsx(styles.previewUserGenerated, "flex-center")}>
              <svg>
                <use href={`${icon}#icon-user`}></use>
              </svg>
            </div>
          )}

          {keyCreated && !isBookmarkList && (
            <button className={styles.previewDelete} onClick={handleDelete}>
              &#215;
            </button>
          )}
        </div>
      </a>
    </li>
  );
}

export default RecipeItem;
