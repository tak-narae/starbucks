import { DataContext } from "App";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const { events } = useContext(DataContext);
  events.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [isActive, setIsActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태

  const itemsPerPage = 16; // 한 페이지당 표시할 항목 수
  const totalPages = Math.ceil(
    (selectedCategory === "전체"
      ? events.length
      : events.filter((n) => n.category === selectedCategory).length) /
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
    setCurrentPage(1);
    setIsClosing(true);
    setTimeout(() => {
      setIsActive(false);
      setIsClosing(false);
    }, 300);
  };

  const filteredEvents =
    selectedCategory === "전체"
      ? events
      : events.filter((n) => n.category === selectedCategory);

  const paginatedEvent = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //pagination 표시 범위 계산
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages);
  const startPage = (currentBlock - 1) * maxVisiblePages + 1;
  const endPage = Math.min(currentBlock * maxVisiblePages, totalPages);
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div id="container" className="layout_fix guide">
      <div className="heading">
        <h2 className="tit">
          <Link to="/event">이벤트</Link>
        </h2>
        <ul className="sort_list">
          <li className={`sort_item ${isActive ? "active" : ""}`}>
            <label onClick={toggleActive}>카테고리</label>
            <Link onClick={toggleActive}>{selectedCategory}</Link>
            <ul className={`dropdown ${isClosing ? "closing" : ""}`}>
              {["전체", "상품출시", "카드출시"].map((category) => (
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
              ))}
            </ul>
          </li>
        </ul>
      </div>

      <div className="tab">
        
      </div>

      <ul className="event_list">
        {paginatedEvent.map((event, idx) => (
          <li key={event.key}>
            <div className="item">
              <div className="thumbnail">
                <Link onClick={(e) => e.preventDefault()}>
                  <img src={event.img} alt={event.title} />
                </Link>
              </div>
              <div className="hover">
                <div className="tit">
                  <div className="m_tit">{event.title}</div>
                  <div className="sub_tit">{event.title2}</div>
                </div>
                <div className="date">{event.date}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>

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
    </div>
  );
};

export default Event;
