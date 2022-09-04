import clsx from "clsx";
import { useDispatch } from "react-redux";

import styles from "./NavItem.module.scss";
import icon from "../../assets/images/icons.svg";
import { Bookmark } from "./index";

import { handleAddRecipeWindow } from "../../features/recipe/recipeSlice";

function CreateRecipe() {
  const dispatch = useDispatch();

  return (
    <nav className={styles.nav}>
      <ul className={clsx(styles.navList, "flex-center")}>
        <li className={styles.navItem}>
          <button
            className={clsx(styles.navButton, "flex-center")}
            onClick={() => dispatch(handleAddRecipeWindow())}
          >
            <svg>
              <use href={`${icon}#icon-edit`}></use>
            </svg>
            <span>add recipe</span>
          </button>
        </li>
        <li className={styles.navItem}>
          <button className={clsx(styles.navButton, "flex-center")}>
            <svg>
              <use href={`${icon}#icon-bookmark`}></use>
            </svg>
            <span>bookmarks</span>
          </button>
          <Bookmark />
        </li>
      </ul>
    </nav>
  );
}

export default CreateRecipe;
