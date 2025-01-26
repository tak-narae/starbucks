import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "App";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { searchData, setSearchData } = useContext(DataContext);
  const location = useLocation();
  const decode = decodeURIComponent(location.search); //url인코딩
  const searchWord = new URLSearchParams(location.search).get("result");

  useEffect(() => {
    if (!searchData) {
      setSearchData(searchWord);
    }
    if(!searchData && !searchWord){
      window.location.href = "/";
    }
  }, []);

  return (
    <>
      <div id="container" className="search__list">
        <div className="layout_fix">
          Search.jsx
          {searchData}
        </div>
      </div>
    </>
  );
};

export default Search;
