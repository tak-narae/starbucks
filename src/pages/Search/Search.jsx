import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "App";
import { useLocation } from "react-router-dom";

const Search = () => {
  
  const { searchWord, setSearchWord, coffee,beverage,product,food,notice,events } = useContext(DataContext);
  const location = useLocation();
  // const decode = decodeURIComponent(location.search); //url인코딩
  const searchParams = new URLSearchParams(location.search).get("result");

  useEffect(() => { //이후
    if (searchParams && !searchWord) {
      setSearchWord(searchParams.split(" "));
    }
    if(!searchWord && !searchParams){
      window.location.href = "/";
    }
  }, []);
  useEffect(()=>{ //첫검색
    if(Array.isArray(searchWord)){
      setSearchWord(searchWord.join(" "));
    }
  },[searchWord])
  
  
  return (
    <>
      <div id="container" className="search__list">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit"><b className="sub-em">"{searchWord}"</b>에 대한 <b className="sub-em">0</b>건의 검색결과가 있습니다.</h2>
          </div>
          Search.jsx
          {searchWord}
        </div>
      </div>
    </>
  );
};

export default Search;