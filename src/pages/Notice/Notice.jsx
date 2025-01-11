import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";
import "pages/Event/Customer.css";

const Notice = () => {
  const {
    notice,
    isActive, selectedCategory, currentPage,
    toggleActive, handleCategoryClick, handlePageChange,
    noticePages,
    noticeitemsPerPage, noticetotalPages, datefilteredNotice, paginatedNotices,
  } = useUtilContext();

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    handleCategoryClick(selectedCategory);
    navigate(`/notice?cate=${e}`);
  }

  const [search, setSearch] = useState("");
  const [filteredNotices, setFilteredNotices] = useState(notice);

  const searchAction = (e) => {
    if (
      search !== "" &&
      e.target.closest("[class*='search_']:has(.btn_search).active")
    ) {
      return false;
    }
    e.target.closest(".search_notice").classList.toggle("active");
  };

  useEffect(() => {
    const filtered = notice.filter(notice =>
      notice.subject.includes(search) &&
      (selectedCategory === "전체" || notice.category === selectedCategory)
    );
    setFilteredNotices(filtered);
  }, [search, selectedCategory, notice]);


  return (
    <>
      <div id="container" className="board__notice">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">
              <Link to="/notice">공지사항</Link>
            </h2>
            <ul className="sort_list">
              <li className={`sort_item`}>
                <label>카테고리</label>
                <Link
                  className={`${isActive ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleActive();
                  }}
                >
                  {selectedCategory}
                </Link>
                <ul className="dropdown">
                  {["전체", "공지사항", "문화소식", "사회공헌"].map((category) => (
                    <li key={category}>
                      <Link to={{
                        pathname: `/notice/${datefilteredNotice.idx}`, search: `?cate=${category}`
                      }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleCategoryChange(category);
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
            <div className="search_notice">
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
                  <td>{(currentPage - 1) * noticeitemsPerPage + idx + 1}</td>
                  <td>{notice.category}</td>
                  <td className="subject">
                    <Link
                      to={{ pathname: `/notice/${idx}`, search: `?cate=${notice.category}` }}
                    >{notice.subject}</Link>
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
            {noticePages.map((page) => (
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
              disabled={currentPage === noticetotalPages}
            >
              &raquo;
            </button>
          </div>
        </div >
      </div >
    </>
  );
};

export default Notice;
