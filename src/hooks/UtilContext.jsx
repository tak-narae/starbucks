import { useState } from "react";
import { createContext } from "react";

export const UtilContext = createContext({
    currentPageNumber: 0,
    getNewsOnPage: (number) => {},
    increasePageNumber: () => {},
    decreasePageNumber: () => {},
  })

  const UtilProvider = ({children}) => {
    const [currentPageNumber,setCurrentPageNumber] = useState(1)
  
    const getNewsOnPage = (number) =>{
      setCurrentPageNumber(number);
    }
    const increasePageNumber = () => {
      setCurrentPageNumber(prev => prev + 1);
    }
    const decreasePageNumber = () => {
      setCurrentPageNumber(prev => prev - 1);
    }
  
    const utilContext = {
      getNewsOnPage,
      increasePageNumber,
      decreasePageNumber,
      currentPageNumber
    }
    return <UtilContext.Provider value={utilContext}>{children}</UtilContext.Provider>
  }
  
  
  export default UtilProvider;