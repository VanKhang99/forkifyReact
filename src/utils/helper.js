export const API_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";
export const KEY = "dfa20701-b41a-4326-b451-04612aaf2a48";
export const RESULT_PER_PAGE = 10;
export const TIMEOUT_HIDE_MODAL = 1;

export const changeFormatRecipe = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    cookingTime: recipe.cooking_time,
    servings: recipe.servings,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { keyCreated: recipe.key }),
  };
};
