import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { KEY, RESULT_PER_PAGE } from "../../utils/helper";

const initialState = {
  isLoading: false,
  error: false,
  isDeleted: false,
  searchText: "",
  result: [],
  total: 0,
  page: 1,
  resultPerPage: RESULT_PER_PAGE,
  preSearchText: "",
};

export const searchResult = createAsyncThunk(
  "search/searchResult",
  async (query, thunkAPI) => {
    try {
      const res = await customFetch.get(`?search=${query}&key=${KEY}`);
      if (!res.data.results) {
        throw new Error("No recipes found for your query! Please try again ;)");
      }
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.res);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleChange: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    handlePage: (state, action) => {
      state.page = action.payload;
    },
    getPreSearchText: (state, action) => {
      state.preSearchText = action.payload;
    },
    clearValues: (state) => {
      return { ...state, searchText: "", page: 1, error: false, total: 0 };
    },
  },
  extraReducers: {
    [searchResult.pending]: (state) => {
      state.isLoading = true;
    },
    [searchResult.fulfilled]: (state, action) => {
      let {
        results,
        data: { recipes },
      } = action.payload;

      recipes = recipes.map((recipe) => {
        return {
          id: recipe.id,
          imageUrl: recipe.image_url,
          publisher: recipe.publisher,
          title: recipe.title,
          ...(recipe.key && { keyCreated: recipe.key }),
        };
      });

      state.isLoading = false;
      state.result = recipes;
      state.total = results;
    },
    [searchResult.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  handleChange,
  clearValues,
  handlePage,
  handleDeleteRecipe,
  getPreSearchText,
} = searchSlice.actions;

export default searchSlice.reducer;

// handleDeleteRecipe: (state, action) => {
//   const id = action.payload;
//   const newResult = state.result.filter((recipe) => recipe.id !== id);
//   state.result = newResult;
// },
