import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./features/recipe/recipeSlice";
import searchSlice from "./features/search/searchSlice";

export const store = configureStore({
  reducer: {
    recipe: recipeSlice,
    search: searchSlice,
  },
});
