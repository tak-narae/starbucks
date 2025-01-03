import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { DataContext } from "App";

const Notice = () => {
  const { notice } = useContext(DataContext);
  notice.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [isActive, setIsActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const itemsPerPage = 10; // 한 페이지당 표시할 항목 수
  const totalPages = Math.ceil(
    (selectedCategory === "전체"
      ? notice.length
      : notice.filter((n) => n.category === selectedCategory).length) /
    itemsPerPage
  );

  const toggleActive = () => {
    if (isActive) {
      setIsClosing(true);
      setTimeout(() => {
        setIsActive(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsActive(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 설정
    setCurrentPage(1); //카테고리 변경 시 페이지 초기화
    setIsClosing(true);
    setTimeout(() => {
      setIsActive(false);
      setIsClosing(false);
    }, 300);
  };

  const filteredNotices =
    selectedCategory === "전체"
      ? notice
      : notice.filter((n) => n.category === selectedCategory);

  const paginatedNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // //pagination 표시 범위 계산
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages);
  const startPage = (currentBlock - 1) * maxVisiblePages + 1;
  const endPage = Math.min(currentBlock * maxVisiblePages, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const [search, setSearch] = useState("");
  const searchAction = (e) => {
    if (search !== "" && e.target.closest(".search.active")) {
      return false;
    }
    e.target.closest(".notice_search").classList.toggle("active");
    document.querySelector(".notice_search input").focus();
  };

  return (
    <div id="container" className="layout_fix notice">
      <div className="heading">
        <div className="notice_tit">
          <h2 className="tit">
            <Link to="/notice">공지사항</Link>
          </h2>
          <ul className="sort_list">
            <li className={`sort_item ${isActive ? "active" : ""}`}>
              <label onClick={toggleActive}>카테고리</label>
              <Link onClick={toggleActive}>{selectedCategory}</Link>
              <ul className={`dropdown ${isClosing ? "closing" : ""}`}>
                {["전체", "공지사항", "문화소식", "사회공헌"].map(
                  (category) => (
                    <li key={category}>
                      <Link
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(category);
                        }}
                      >
                        {category}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </li>
          </ul>
        </div>
        <div className="notice_search">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="검색어 입력"
          />
          <button className="btn_search" onClick={(e) => searchAction(e)}>
            Search
          </button>
        </div>
      </div>

      <table className="tb_list">
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "160px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {paginatedNotices.map((notice, idx) => (
            <tr key={idx}>
              <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
              <td>{notice.category}</td>
              <td className="subject">
                <Link to={`/notice/${idx}`}>
                  {notice.subject}
                </Link>
              </td>
              <td>관리자</td>
              <td>{notice.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          className="prev"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          &laquo;
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`page ${currentPage === page ? "active" : ""}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="next"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Notice;
