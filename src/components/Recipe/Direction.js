import styles from "./Direction.module.scss";
import icon from "../../assets/images/icons.svg";

function RecipeDirections({ publisher, sourceUrl }) {
  return (
    <div className={styles.recipeDirection}>
      <h2 className="heading--2">How to cook it</h2>

      <p>
        This recipe was carefully designed and tested by{" "}
        <strong>{publisher}</strong>. Please check out directions at their
        website.
      </p>

      <a href={sourceUrl} target="_blank" className="button--directions">
        <span>Directions</span>
        <svg>
          <use href={`${icon}#icon-arrow-right`}></use>
        </svg>
      </a>
    </div>
  );
}

export default RecipeDirections;
