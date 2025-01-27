import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "App";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { searchWord, setSearchWord } = useContext(DataContext);
  const location = useLocation();
  const decode = decodeURIComponent(location.search); //url인코딩
  const searchParams = new URLSearchParams(location.search).get("result");

  useEffect(() => {
    if (!searchWord) {
      setSearchWord(searchParams);
    }
    if(!searchWord && !searchParams){
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div id="container" className="search__list">
        <div className="layout_fix">
          Search.jsx
          {searchWord}
        </div>
      </div>
    </>
  );
};

export default Search;
