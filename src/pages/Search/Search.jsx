import React, { useContext } from 'react';
import { DataContext } from 'App';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const { searchData, setSearchData } = useContext(DataContext);
  const location = useLocation();
  const decode = decodeURIComponent(location.search); //url인코딩
  const searchWord = new URLSearchParams(location.search).get('item');

  if(!searchData){
    setSearchData(searchWord);
  }


 return (
  <>
   <div id="container" className="search__list">
     <div className="layout_fix">
        Search.jsx
        {/* <div className="result">{searchData}</div> */}
        {/* { console.log("확인",decode === searchData) } */}
        { console.log("확인??",searchData, "===", setSearchData) }
        { searchData }
     </div>
   </div>
  </>
 );
};

export default Search;