import React, { useState, useEffect } from "react";

import RecipeItem from "./RecipeItem";

function RecipeList({ result, isBookmarkList }) {
  const [idHash, setIdHash] = useState(window.location.hash.slice(1));

  useEffect(() => {
    const handlerRecipe = () => {
      const idHash = window.location.hash.slice(1);
      if (!idHash) return;
      setIdHash(idHash);
    };

    window.addEventListener("hashchange", handlerRecipe);

    return () => {
      window.removeEventListener("hashchange", handlerRecipe);
    };
  }, []);

  return (
    <ul className="results">
      {result.map((recipe, index) => {
        return (
          <RecipeItem
            recipe={recipe}
            idHash={idHash}
            key={index}
            {...recipe}
            isBookmarkList={isBookmarkList}
          />
        );
      })}
    </ul>
  );
}

export default RecipeList;
