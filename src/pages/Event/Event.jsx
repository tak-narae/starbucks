import { DataContext } from "App";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "pages/Event/Customer.css";

const Event = () => {
  const { events } = useContext(DataContext);
  events.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  const [isActive, setIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [activeTab, setActiveTab] = useState("ongoing"); // 기본 탭은 진행 중
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const today = new Date(); //오늘 날짜 받아오기


  const toggleActive = () => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 0);
    } else {
      setIsActive(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 설정
    setCurrentPage(1);
    setTimeout(() => {
      setIsActive(false);
    }, 0);
  };

  const filteredEvents =
    selectedCategory === "전체"
      ? events
      : events.filter((n) => n.category === selectedCategory);

  // 현재 탭에 따른 이벤트 선택
  const displayedEvents = filteredEvents.filter((event) => {
    if (activeTab === "ongoing") { //진행 중 이벤트
      return (
        new Date(event.startDate) <= today &&
        (!event.endDate || today <= new Date(event.endDate))
      );
    } else if (activeTab === "past") { //종료된 이벤트
      return event.endDate && new Date(event.endDate) < today;
    }
    return false;
  });
  
  const itemsPerPage = 16; // 한 페이지당 표시할 항목 수
  const totalPages = Math.ceil(displayedEvents.length / itemsPerPage);

  const paginatedEvents = displayedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Pagination 표시 범위 계산
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages); //5개씩 보여질 수 있도록
  const startPage = (currentBlock - 1) * maxVisiblePages + 1; //현재 페이지 계산
  const endPage = Math.min(currentBlock * maxVisiblePages, totalPages); //페이지네이션 마지막 번호
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  ); //start부터 end 페이지 계산(있는 페이지까지만 나오게)

  const [search, setSearch] = useState("");
  const searchAction = (e) => {
    if (search !== "" && e.target.closest("[class*='search_']:has(.btn_search).active")) {
      return false;
    }
    e.target.closest(".search_event").classList.toggle("active");
    document.querySelector(".heading_tab input").focus();
  };

  return (
    <div id="container" className="board__event">
      <div className="layout_fix">
        <div className="heading">
          <h2 className="tit">이벤트</h2>
          <ul className="sort_list">
            <li className={`sort_item`}>
              <label>카테고리</label>
              <Link className={`${isActive ? "active" : ""}`} onClick={toggleActive}>{selectedCategory}</Link>
              <ul className="dropdown">
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
                <Link to={`/event/${idx}`} className="item">
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
            );})
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
    </div>
  );
};

export default Event;

// export default Event;
