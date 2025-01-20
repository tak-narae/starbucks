import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePathMatch = () => {
  const location = useLocation();

  const [itemPath, setItemPath] = useState();
  const locationPath = location.pathname.replace(/\/(detail|info)/,"");
  const locationSearch = location.search.split("&", 1);
  const locationURL = locationPath + locationSearch;
  useEffect(() => {
    setItemPath(locationURL);
  },[locationURL])

  return { itemPath };
};

export default usePathMatch;