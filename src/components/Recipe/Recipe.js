import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Recipe.module.scss";
import { Spinner, Message } from "../GlobalComponent";
import { Image, Details, Ingredients, Direction } from "./index";

import { getRecipe } from "../../features/recipe/recipeSlice";
import {
  handleDataRecipe,
  handleAddBookmark,
  handleDeleteBookmark,
} from "../../features/recipe/recipeSlice";

function Recipe() {
  const dispatch = useDispatch();
  const { isLoading, recipe, isDeleted } = useSelector((store) => store.recipe);

  useEffect(() => {
    const handlerRecipe = () => {
      const idHash = window.location.hash.slice(1);
      if (!idHash) return;

      dispatch(getRecipe(idHash));
    };

    ["load", "hashchange"].forEach((typeEvent) => {
      window.addEventListener(typeEvent, handlerRecipe);
    });

    return () => {
      ["load", "hashchange"].forEach((typeEvent) => {
        window.removeEventListener(typeEvent, handlerRecipe);
      });
    };
  }, []);

  if (isLoading === false && !recipe) {
    return (
      <div className={styles.recipe}>
        <Message
          message="Start by searching for a recipe or an ingredient. Have fun!"
          typeIcon="icon-smile"
        />
      </div>
    );
  }

  if (!isLoading && isDeleted) {
    return (
      <div className={styles.recipe}>
        <Message message="Recipe has been deleted !!!" typeIcon="icon-smile" />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.recipe}>
        <Spinner />
      </div>
    );
  }

  /* prettier-ignore */
  const {id, cookingTime, imageUrl, ingredients, publisher, sourceUrl, servings, title, keyCreated, bookmarked,} 
  = recipe;

  const controlServings = (newServings) => {
    if (newServings < 1) return;

    const newIngredients = ingredients.map((ingredient) => {
      const { unit, quantity, description } = ingredient;
      const newQuantity = (newServings * quantity) / servings;
      return { unit, quantity: newQuantity ? +newQuantity : "", description };
    });

    dispatch(
      handleDataRecipe({ servings: newServings, ingredients: newIngredients })
    );
  };

  const handleBookmark = (idRecipeBookmarked) => {
    if (!recipe.bookmarked) dispatch(handleAddBookmark(idRecipeBookmarked));
    else dispatch(handleDeleteBookmark(idRecipeBookmarked));
  };

  return (
    <div className={styles.recipe}>
      <Image image={imageUrl} title={title} />
      <Details
        onClickServings={controlServings}
        onBookmark={handleBookmark}
        cookingTime={cookingTime}
        bookmarked={bookmarked}
        keyCreated={keyCreated}
        servings={servings}
        id={id}
      />
      <Ingredients ingredients={ingredients} />
      <Direction publisher={publisher} sourceUrl={sourceUrl} />
    </div>
  );
}

export default Recipe;
