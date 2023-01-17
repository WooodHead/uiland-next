import { createContext, useEffect, useState } from "react";


export const ScreensContext = createContext(null);

export const ScreensContextProvider = ({ children }) => {
  const [screens, setScreens] = useState(null);
  const [filterTerm, setFilterTerm] = useState("");
  const [filterName, setFilterName] = useState("");
  const setFilterItem = (term) => {
    setFilterTerm(term);
  };
  const setFilterItemName = (name) => {
    setFilterName(name);
  };
console.log(filterName)
//   useEffect(() => {
//     const getScreens = async () => {
//       let screens;
//       if (filterTerm) {
//        screens = await getItemsCategoryByQuery(filterTerm);
//       } else if(filterName) {
//         screens= await getItemsNameByQuery(filterName)
//       }else{
// 		 screens = await getScreensData();
// 	  }

//       if (screens) {
//         setScreens(screens);
//       }
//     };
//     getScreens();
//   }, [filterTerm]);

  return (
    <ScreensContext.Provider
      value={{
        screens,
        setFilterItem,
		    setFilterItemName,
		    filterName,
        filterTerm,
      }}
    >
      {children}
    </ScreensContext.Provider>
  );
};
