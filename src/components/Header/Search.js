import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";

import styles from "./Search.module.scss";
import icon from "../../assets/images/icons.svg";

import {
  searchResult,
  handleChange,
  clearValues,
  getPreSearchText,
} from "../../features/search/searchSlice";

function Search() {
  const dispatch = useDispatch();
  const { searchText } = useSelector((store) => store.search);
  const inputRef = useRef();
  const preQuery = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    preQuery.current = searchText;
    dispatch(clearValues());
    dispatch(getPreSearchText(preQuery.current));
    dispatch(searchResult(searchText));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  return (
    <div>
      <form
        className={clsx(styles.search, "flex-center")}
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          ref={inputRef}
          type="text"
          name="searchText"
          value={searchText}
          onChange={handleInputChange}
          className={styles.searchInput}
          placeholder="Search over 1,000,000 recipes..."
        />
        <button
          type="submit"
          className={clsx(styles.searchButton, "flex-center")}
        >
          <svg>
            <use href={`${icon}#icon-search`}></use>
          </svg>

          <span>Search</span>
        </button>
      </form>
    </div>
  );
}

export default Search;
