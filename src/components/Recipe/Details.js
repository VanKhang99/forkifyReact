import React from "react";
import clsx from "clsx";
import styles from "./Details.module.scss";
import icon from "../../assets/images/icons.svg";

function RecipeDetails({
  onClickServings,
  onBookmark,
  cookingTime,
  bookmarked,
  keyCreated,
  servings,
  id,
}) {
  return (
    <div className={styles.recipeDetails}>
      <div className={styles.recipeTime}>
        <svg>
          <use href={`${icon}#icon-clock`}></use>
        </svg>
        <span>
          <strong>{cookingTime}</strong> minutes
        </span>
      </div>

      <div className={styles.recipeServings}>
        <svg>
          <use href={`${icon}#icon-users`}></use>
        </svg>
        <span>
          <strong>{servings}</strong> servings
        </span>
      </div>

      <div className={styles.recipeButtons}>
        <button
          className={clsx("button--tiny")}
          onClick={() => onClickServings(servings - 1)}
        >
          <svg>
            <use href={`${icon}#icon-minus-circle`}></use>
          </svg>
        </button>
        <button
          className={clsx("button--tiny")}
          onClick={() => onClickServings(servings + 1)}
        >
          <svg>
            <use href={`${icon}#icon-plus-circle`}></use>
          </svg>
        </button>
      </div>

      <div className={styles.recipeUser}>
        {keyCreated && (
          <div className={clsx(styles.recipeUserGenerated, "flex-center")}>
            <svg>
              <use href={`${icon}#icon-user`}></use>
            </svg>
          </div>
        )}
      </div>

      <button
        className={clsx(
          styles.recipeBookmark,
          "button--bookmark",
          "flex-center"
        )}
        onClick={() => onBookmark(id)}
      >
        <svg>
          <use
            href={`${icon}#icon-${bookmarked ? "bookmark-fill" : "bookmark"}`}
          ></use>
        </svg>
      </button>
    </div>
  );
}

export default RecipeDetails;
