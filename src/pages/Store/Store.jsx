import React, {useEffect} from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";
import './Store.css';

const Store = () => {
  const {isActive, toggleActive, selectedCategory, handleCategoryClick} = useUtilContext();
  const navigate = useNavigate();
  useEffect(() => {
        navigate("/store", { replace: true });
    }, []);

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
    </div>
  );
};

export default Store;
