const saveBookmarkToLocalStorage = (recipe) => {
  localStorage.setItem("bookmarks", JSON.stringify(recipe));
};

const restoreBookmarkFromLocalStorage = () => {
  const dataBookmark = localStorage.getItem("bookmarks");
  if (!dataBookmark) return;
  const bookmarks = JSON.parse(dataBookmark);
  return bookmarks;
};

const removeBookmarkFromLocalStorage = () => {
  localStorage.removeItem("bookmarks");
};

export {
  saveBookmarkToLocalStorage,
  restoreBookmarkFromLocalStorage,
  removeBookmarkFromLocalStorage,
};
