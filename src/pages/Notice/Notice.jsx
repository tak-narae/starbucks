import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

import "pages/Event/Customer.css";

const Notice = () => {
  useEffect(() => {
      setSearch(""); // 페이지 로드 시 검색어 초기화
    }, []); // 의존성 배열이 빈 배열이면 컴포넌트가 처음 마운트될 때만 실행됨

  const {
    isActive, selectedCategory, currentPage, setCurrentPage,
    toggleActive, handleCategoryClick, handlePageChange,
    search, setSearch,
    maxVisiblePages, currentBlock, startPage, noticePages, noticeitemsPerPage, noticetotalPages, datefilteredNotice, paginatedNotices
  } = useUtilContext();

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    handleCategoryClick(selectedCategory);
    navigate(`/notice?cate=${e}`);
  }
  const [filteredNotices, setFilteredNotices] = useState(datefilteredNotice);
  const searchAction = (e) => {
    e.target.closest(".search_notice").classList.toggle("active");
  };

  useEffect(() => {
    if(search.trim === ""){
      setFilteredNotices(datefilteredNotice);
    } else{
      const filtered = datefilteredNotice.filter(notice =>
        notice.subject.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredNotices(filtered);
    }
    setCurrentPage(1);
  }, [search, selectedCategory, datefilteredNotice, setCurrentPage]);

  //검색 여부에 따른 이벤트 목록
  const isSearching = search.trim() !== ""; //검색어 확인
  const displayedNotice = isSearching ? filteredNotices : paginatedNotices;  // 검색이면 필터링된 데이터 사용
  const noticeSearchTotalPages = Math.ceil(
    filteredNotices.length / noticeitemsPerPage
  );
  const noticeSearchEndPage = Math.min(
    currentBlock * maxVisiblePages,
    noticeSearchTotalPages
  );
  const searchPages = Array.from(
    {length: noticeSearchEndPage - startPage + 1 }, 
    (_, i) => startPage + i
  );
  const noticePage = isSearching ? searchPages : noticePages;


  return (
    <>
      <div id="container" className="board__notice">
        <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">
              <Link to="/notice?cate">공지사항</Link>
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

          {displayedNotice.length > 0 ? (
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
                    {displayedNotice.map((notice, idx) => (
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
            ) : (
              <>
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
                </table>
                <div className="empty">현재 표시할 공지사항이 없습니다.</div>
              </>
            )}
          <div className="pagination">
            <button
              className="prev"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo;
            </button>
            { noticePage.length !== 0 ? (
              noticePage.map((page) => (
                <button
                  key={page}
                  className={`page ${currentPage === page ? "active" : ""}`}
                  onClick={() => handlePageChange(page)} >
                  {page}
                </button>
              ))
            ) : (
              <button className="active">1</button>
            ) }
            <button
              className="next"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === noticetotalPages} >
              &raquo;
            </button>
          </div>
          {/* { console.log("currentPage",currentPage,"noticetotalPages",noticetotalPages) } */}
        </div >
      </div >
    </>
  );
};

export default Notice;
