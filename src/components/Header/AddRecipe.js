import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import styles from "./AddRecipe.module.scss";
import icon from "../../assets/images/icons.svg";
import { TIMEOUT_HIDE_MODAL } from "../../utils/helper";
import { Spinner, Message } from "../GlobalComponent";
import UploadColumnInput from "./UploadColumnInput";

import {
  handleAddRecipeWindow,
  handleChangeInput,
  createRecipe,
  handleFormatIngredient,
  resetAddRecipeWindow,
} from "../../features/recipe/recipeSlice";

function AddRecipe() {
  const dispatch = useDispatch();
  const {
    addRecipe: {
      showSpinner,
      isOpen,
      created,
      wrongFormat,
      title,
      url,
      imageUrl,
      publisher,
      prepTime,
      servings,
      ingredient1,
      ingredient2,
      ingredient3,
      ingredient4,
      ingredient5,
      ingredient6,
      ingredient7,
      ingredient8,
    },
  } = useSelector((store) => store.recipe);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = [...new FormData(e.target)];
    const objectRecipe = Object.fromEntries(dataForm);
    const filterIngredients = dataForm.filter(
      (data) => data[0].startsWith("ingredient") && data[1] !== ""
    );

    const ingredients = filterIngredients.map((ing) => {
      const infoIngredient = ing[1].split(",").map((element) => element.trim());

      if (
        infoIngredient.length !== 3 ||
        infoIngredient.every((ing) => ing === "")
      ) {
        dispatch(handleFormatIngredient());
      }

      const [quantity, unit, description] = infoIngredient;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    const uploadData = {
      title: objectRecipe.title,
      publisher: objectRecipe.publisher,
      image_url: objectRecipe.imageUrl,
      cooking_time: +objectRecipe.prepTime,
      servings: +objectRecipe.servings,
      source_url: objectRecipe.url,
      ingredients,
    };

    dispatch(createRecipe(uploadData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChangeInput({ name, value }));
  };

  const handleHideAddRecipeWindow = (e) => {
    if (e.target.classList.contains("add-recipe-wrapper"))
      return dispatch(handleAddRecipeWindow());
  };

  const handleHideAddRecipeWindowByKey = (e) => {
    if (e.key === "Escape") return dispatch(handleAddRecipeWindow());
  };

  if (showSpinner) {
    return (
      <div
        className={clsx(
          styles.addRecipeWrapper,
          { [styles.open]: isOpen },
          "flex-center",
          "add-recipe-wrapper"
        )}
        tabIndex={0}
        onClick={handleHideAddRecipeWindow}
        onKeyDown={handleHideAddRecipeWindowByKey}
      >
        <div className={styles.addRecipe}>
          <Spinner />
        </div>
      </div>
    );
  }

  if (showSpinner === false && created) {
    return (
      <div
        className={clsx(
          styles.addRecipeWrapper,
          { [styles.open]: isOpen },
          "flex-center",
          "add-recipe-wrapper"
        )}
        tabIndex={0}
        onClick={handleHideAddRecipeWindow}
        onKeyDown={handleHideAddRecipeWindowByKey}
      >
        <div className={styles.addRecipe}>
          <Message
            message="Your recipe have been uploaded successfully :)"
            typeIcon="icon-smile"
          />

          <span style={{ display: "none" }}>
            {setTimeout(() => {
              dispatch(resetAddRecipeWindow());
            }, TIMEOUT_HIDE_MODAL * 1000)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.addRecipeWrapper,
        { [styles.open]: isOpen },
        "flex-center",
        "add-recipe-wrapper"
      )}
      tabIndex={0}
      onClick={handleHideAddRecipeWindow}
      onKeyDown={handleHideAddRecipeWindowByKey}
    >
      <div className={styles.addRecipe}>
        <button
          className="button--close-modal"
          onClick={() => dispatch(handleAddRecipeWindow())}
        >
          &#215;
        </button>
        <form className={styles.upload} onSubmit={handleSubmit}>
          <div className={styles.uploadColumn}>
            <h3 className={styles.uploadHeading}>Recipe data</h3>
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={title}
              label="Title"
              id="title"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={url}
              label="URL"
              id="url"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={imageUrl}
              label="Image URL"
              id="imageUrl"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={publisher}
              label="Publisher"
              id="publisher"
            />
            <UploadColumnInput
              type="number"
              handleChange={handleChange}
              value={prepTime}
              label="Prep time"
              id="prepTime"
            />
            <UploadColumnInput
              type="number"
              handleChange={handleChange}
              value={servings}
              label="Servings"
              id="servings"
            />
          </div>

          <div className={styles.uploadColumn}>
            <h3 className={styles.uploadHeading}>Ingredients</h3>
            {wrongFormat && (
              <p className={styles.uploadFormatError}>
                Wrong ingredients format. Please use the correct format!
              </p>
            )}
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient1}
              label="Ingredient 1"
              id="ingredient1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient2}
              label="Ingredient 2"
              id="ingredient2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient3}
              label="Ingredient 3"
              id="ingredient3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient4}
              label="Ingredient 4"
              id="ingredient4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient5}
              label="Ingredient 5"
              id="ingredient5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient6}
              label="Ingredient 6"
              id="ingredient6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />

            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient7}
              label="Ingredient 7"
              id="ingredient7"
              placeholder="Format: 'Quantity,Unit,Description'"
            />

            <UploadColumnInput
              type="text"
              handleChange={handleChange}
              value={ingredient8}
              label="Ingredient 8"
              id="ingredient8"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button className={clsx(styles.uploadButton, "flex-center")}>
            <svg>
              <use href={`${icon}#icon-upload-cloud`}></use>
            </svg>
            <span>UPLOAD</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
