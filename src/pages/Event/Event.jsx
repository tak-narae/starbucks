import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

import "pages/Event/Customer.css";

const Event = () => {
  const {
    isActive, selectedCategory, currentPage, setCurrentPage,
    toggleActive, handleCategoryClick, handlePageChange,
    search, setSearch, searchAction,
    eventPages,
    activeTab, setActiveTab, today, eventtotalPages, paginatedEvents, datefilteredEvents,
  } = useUtilContext();

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    handleCategoryClick(selectedCategory);
    navigate(`/event?cate=${e}`);
  }

  return (
    <div id="container" className="board__event">
      <div className="layout_fix">
        <div className="heading">
          <h2 className="tit">이벤트</h2>
          <ul className="sort_list">
            <li className={`sort_item`}>
              <label>카테고리</label>
              <Link
                className={`${isActive ? "active" : ""}`}
                onClick={toggleActive}
              >
                {selectedCategory}
              </Link>
              <ul className="dropdown">
                {["전체", "상품출시", "카드출시"].map((category) => (
                  <li key={category}>
                    <Link
                      to={{ pathname: `/event/${datefilteredEvents.idx}`, search: `?cate=${category}` }}
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
                ))}
              </ul>
            </li>
          </ul>
        </div>

        <div className="heading_tab">
          <div className="tab_rect">
            {/* 진행 중 이벤트 탭 */}
            <p
              className={`event_ing ${activeTab === "ongoing" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("ongoing");
                setCurrentPage(1); // 탭 변경 시 페이지를 1로 초기화
              }}
            >
              진행중인 이벤트
            </p>

            {/* 종료된 이벤트 탭 */}
            <p
              className={`event_end ${activeTab === "past" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("past");
                setCurrentPage(1); // 탭 변경 시 페이지를 1로 초기화
              }}
            >
              종료된 이벤트
            </p>
          </div>
          <div className="search_event">
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

        <ul className="event_list">
          {paginatedEvents.length > 0 ? (
            paginatedEvents.map((event, idx) => {
              const isEnded = event.endDate && new Date(event.endDate) < today; //종료 이벤트 확인
              return (
                <li key={idx} className={isEnded ? "li-ended" : ""}>
                  <Link to={{ pathname: `/event/${idx}`, search: `?cate=${event.category}` }} className="item">
                    <div className="thumbnail">
                      <img src={event.img} alt={event.title} />
                    </div>
                    <div className="overlay">
                      <div className="subject">
                        <div className="tit">{event.title}</div>
                        <div className="sub_tit">{event.title2}</div>
                      </div>
                      <div className="date">
                        {event.startDate} ~ {event.endDate}
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="empty">현재 표시할 이벤트가 없습니다.</li>
          )}
        </ul>

        <div className="pagination">
          <button
            className="prev"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
          {eventPages.map((page) => (
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
            disabled={currentPage === eventtotalPages}
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Event;

// export default Event;
