import React from "react";
import fracty from "fracty";

import styles from "./Ingredients.module.scss";
import icon from "../../assets/images/icons.svg";

function RecipeIngredients({ ingredients }) {
  return (
    <div className={styles.recipeIngredients}>
      <h2 className="heading--2">RECIPE INGREDIENTS</h2>

      <ul className={styles.ingredients}>
        {ingredients.map((ingredient, index) => {
          const { description, quantity, unit } = ingredient;
          return (
            <li key={index} className={styles.ingredient}>
              <svg>
                <use href={`${icon}#icon-check`}></use>
              </svg>

              {quantity && (
                <span className={styles.ingredientQuantity}>
                  {fracty(quantity)}
                </span>
              )}

              <div className={styles.ingredientDescription}>
                {unit && <span>{unit}</span>}{" "}
                {unit
                  ? description.replace(
                      description[0],
                      description[0].toLowerCase()
                    )
                  : description.replace(
                      description[0],
                      description[0].toUpperCase()
                    )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RecipeIngredients;
