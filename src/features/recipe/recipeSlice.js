import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import customFetch from "../../utils/axios";
import { changeFormatRecipe, KEY } from "../../utils/helper";
import {
  saveBookmarkToLocalStorage,
  restoreBookmarkFromLocalStorage,
  removeBookmarkFromLocalStorage,
} from "../../utils/localStorage";

import { searchResult } from "../search/searchSlice";

const initialStateAddRecipe = {
  showSpinner: false,
  created: false,
  wrongFormat: false,
  isOpen: false,
  title: "TEST4",
  url: "TEST4",
  imageUrl: "TEST4",
  publisher: "TEST4",
  prepTime: 4,
  servings: 4,
  ingredient1: "0.5,kg,Rice",
  ingredient2: "1,,Avocado",
  ingredient3: ",,salt",
  ingredient4: "",
  ingredient5: "",
  ingredient6: "",
  ingredient7: "",
  ingredient8: "",
};

const initialState = {
  isLoading: false,
  isDeleted: false,
  recipe: null,
  bookmarks: restoreBookmarkFromLocalStorage() || [],
  addRecipe: {
    ...initialStateAddRecipe,
  },
};

export const getRecipe = createAsyncThunk(
  "recipe/getRecipe",
  async (id, thunkAPI) => {
    try {
      const res = await customFetch.get(`/${id}?key=${KEY}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went very wrong!!!");
    }
  }
);

export const createRecipe = createAsyncThunk(
  "recipe/createRecipe",
  async (uploadData, thunkAPI) => {
    try {
      const res = await customFetch.post(`?key=${KEY}`, uploadData);

      // Update list "recipe create" when delete
      if (thunkAPI.getState().search.result.length) {
        thunkAPI.dispatch(searchResult(res.data.data.recipe.title));
      }

      return res.data.data.recipe;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went very wrong!!!");
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  "recipe/deleteRecipe",
  async ({ id, keyCreated }, thunkAPI) => {
    try {
      await customFetch.delete(`/${id}?key=${KEY}`);

      // When delete "user recipe" => auto research to update
      const { preSearchText } = thunkAPI.getState().search;
      thunkAPI.dispatch(searchResult(preSearchText));
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Something went very wrong!!!");
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    handleDataRecipe: (state, action) => {
      const { servings, ingredients } = action.payload;
      state.recipe.servings = servings;
      state.recipe.ingredients = ingredients;
    },
    handleAddBookmark: (state, action) => {
      if (state.recipe.id !== action.payload) return;
      state.recipe.bookmarked = true;
      state.bookmarks.push(state.recipe);
      saveBookmarkToLocalStorage(state.bookmarks);
    },
    handleDeleteBookmark: (state, action) => {
      if (state.recipe.id !== action.payload) return;
      state.recipe.bookmarked = false;
      const index = state.bookmarks.findIndex(
        (bookmark) => bookmark.id === action.payload
      );
      state.bookmarks.splice(index, 1);
      saveBookmarkToLocalStorage(state.bookmarks);
    },
    handleAddRecipeWindow: (state) => {
      state.addRecipe.isOpen = !state.addRecipe.isOpen;
    },
    handleChangeInput: (state, action) => {
      const { name, value } = action.payload;
      state.addRecipe[name] = value;
    },
    handleFormatIngredient: (state) => {
      state.addRecipe.wrongFormat = true;
    },
    resetAddRecipeWindow: (state) => {
      state.addRecipe = { ...initialStateAddRecipe };
    },
  },
  extraReducers: {
    [getRecipe.pending]: (state) => {
      state.isLoading = true;
    },
    [getRecipe.fulfilled]: (state, action) => {
      const { recipe } = action.payload.data;
      state.isLoading = false;
      state.recipe = changeFormatRecipe(recipe);
      state.isDeleted = false;
      state.bookmarks.some((rcpBookmarked) => rcpBookmarked.id === recipe.id)
        ? (state.recipe.bookmarked = true)
        : (state.recipe.bookmarked = false);
    },
    [getRecipe.rejected]: (state) => {
      state.isLoading = false;
    },
    [createRecipe.pending]: (state) => {
      state.addRecipe.showSpinner = true;
    },
    [createRecipe.fulfilled]: (state, action) => {
      state.addRecipe.showSpinner = false;

      const newRecipe = changeFormatRecipe(action.payload);
      state.recipe = { ...newRecipe, bookmarked: true };
      state.bookmarks.push(state.recipe);
      saveBookmarkToLocalStorage(state.bookmarks);

      state.addRecipe.created = true;
      state.isDeleted = false;
    },
    [createRecipe.rejected]: (state) => {
      state.addRecipe.showSpinner = false;
    },
    [deleteRecipe.pending]: (state) => {
      state.isLoading = true;
      state.isDeleted = false;
    },
    [deleteRecipe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isDeleted = true;

      // Update bookmarks when delete "user recipe"
      const newBookmarks = state.bookmarks.filter(
        (ing) => ing.id !== action.payload
      );
      state.bookmarks = newBookmarks;
      removeBookmarkFromLocalStorage();
      saveBookmarkToLocalStorage(newBookmarks);
    },
    [deleteRecipe.rejected]: (state) => {
      state.isLoading = false;
      state.isDeleted = false;
    },
  },
});

export const {
  handleDataRecipe,
  handleAddBookmark,
  handleDeleteBookmark,
  handleAddRecipeWindow,
  handleChangeInput,
  handleFormatIngredient,
  resetAddRecipeWindow,
} = recipeSlice.actions;

export default recipeSlice.reducer;
