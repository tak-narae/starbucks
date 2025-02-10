import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

import './Store.css';

const Store = () => {
  const {isActive, toggleActive, selectedCategory, handleCategoryClick} = useUtilContext();

  // const [sidoList, setSidoList] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchSidoList = async () => {
  //     try {
  //       const response = await fetch('https://www.starbucks.co.kr/store/store_drive.do', {
  //         method: 'POST',
  //       });
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       const data = await response.json();
  //       setSidoList(data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSidoList();
  // }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div id="container" className="board__store">
      <div className="layout_fix">
        <div className="heading">
          <h2 className="tit">매장안내</h2>
          <ul className="sort_list">
            <li className="sort_item">
              <label>카테고리</label>
              <Link 
                className={`${isActive ? "active" : ""}`}
                onClick={toggleActive}
                data-discover="true"
              >{selectedCategory}</Link>
              <ul className="dropdown">
                <li><Link to="/store/map" data-discover="true" onClick={() => handleCategoryClick("매장 찾기")}>매장 찾기</Link></li>
                <li><Link to="/store/drive" data-discover="true" onClick={() => handleCategoryClick("드라이브 스루")}>드라이브 스루</Link></li>
                <li><Link to="/store/reserve" data-discover="true" onClick={() => handleCategoryClick("스타벅스 리저브")}>스타벅스 리저브</Link></li>
              </ul>
            </li>
          </ul>
        </div>
        <Outlet />
      </div>
      {/* <h1>Starbucks Store Sido List</h1>
      <ul>
        {sidoList.map((sido, index) => (
          <li key={index}>{sido}</li> // Display the items in a list
        ))}
      </ul> */}
    </div>
  );
};

export default Store;
