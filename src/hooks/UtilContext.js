import React, { createContext, useContext, useState } from "react";

const UtilContext = createContext();

export const useUtilContext = () => useContext(UtilContext);

export const UtilProvider = ({children}) => {

    const [paginatedNotices, setPaginatedNotices] = useState([]);
    const [paginatedEvents, setPaginatedEvents] = useState([]);

    return (
    <UtilContext.Provider value={ {paginatedNotices, setPaginatedNotices, paginatedEvents, setPaginatedEvents} }>
      {children}
      </UtilContext.Provider>
    );
  }
  
  
  export default UtilProvider;


  