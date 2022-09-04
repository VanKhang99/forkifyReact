import React from "react";
import styles from "./Image.module.scss";

function RecipeImage({ image, title }) {
  return (
    <figure className={styles.recipeFigure}>
      <img src={image} alt={title} className={styles.recipeFigureImage} />
      <h1 className={styles.recipeFigureTitle}>
        <span>
          {title.length > 70 ? `${title.substring(0, 70)}...` : title}
        </span>
      </h1>
    </figure>
  );
}

export default RecipeImage;
