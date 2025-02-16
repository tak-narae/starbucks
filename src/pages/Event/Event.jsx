import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

import "pages/Event/Customer.css";

const Event = () => {
  useEffect(() => {
    setSearch(""); // 페이지 로드 시 검색어 초기화
  }, []); // 의존성 배열이 빈 배열이면 컴포넌트가 처음 마운트될 때만 실행됨

  const {
    isActive,
    selectedCategory,
    currentPage,
    setCurrentPage,
    toggleActive,
    handleCategoryClick,
    handlePageChange,
    search,
    setSearch,
    eventPages,
    eventitemsPerPage,
    currentBlock,
    maxVisiblePages,
    startPage,
    activeTab,
    setActiveTab,
    today,
    datefilteredEvents,
    totalFilteredPages,
  } = useUtilContext();

  const navigate = useNavigate();

  const handleCategoryChange = (e) => {
    handleCategoryClick(selectedCategory);
    navigate(`/event?cate=${e}`);
  };

  const [filteredEvents, setFilteredEvents] = useState(datefilteredEvents);

  const searchAction = (e) => {
    e.target.closest(".search_event").classList.toggle("active");
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredEvents(datefilteredEvents);
    } else {
      const filtered = datefilteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.title2.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
    // setCurrentPage(1); //검색 시 현재 페이지 초기화 => pagination 안 넘어감
  }, [search, selectedCategory, datefilteredEvents, setCurrentPage]);

  //검색 여부에 따른 이벤트 목록
  const isSearching = search.trim() !== ""; //검색어 확인
  const displayedEvents = isSearching ? filteredEvents : datefilteredEvents; // 검색이면 필터링된 데이터 사용
  const paginatedEvents = displayedEvents.slice(
    (currentPage - 1) * eventitemsPerPage,
    currentPage * eventitemsPerPage
  );
  const eventSearchTotalPages = Math.ceil(
    filteredEvents.length / eventitemsPerPage
  );
  const eventSearchEndPage = Math.min(
    currentBlock * maxVisiblePages,
    eventSearchTotalPages
  );
  const searchPages = Array.from(
    { length: eventSearchEndPage - startPage + 1 },
    (_, i) => startPage + i
  );
  const eventPage = isSearching ? searchPages : eventPages;

  return (
    <div id="container" className="board__event">
      <div className="layout_fix">
        <div className="heading">
          <h2 className="tit">이벤트</h2>
          <ul className="sort_list">
            <li className="sort_item">
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
                      to={{
                        pathname: `/event/${datefilteredEvents.idx}`,
                        search: `?cate=${category}`,
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
                  <Link
                    to={{
                      pathname: `/event/${idx}`,
                      search: `?cate=${event.category}`,
                    }}
                    className="item"
                    state={{ event }}
                  >
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
            disabled={currentPage === 1} >
            &laquo;
          </button>
          { eventPage.length !== 0 ? (
            eventPage.map((page) => (
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
            disabled={currentPage === totalFilteredPages + 1}>
            &raquo;
          </button>
        </div>
        {/* { console.log("currentPage",currentPage,"totalFilteredPages",totalFilteredPages) } */}
      </div>
    </div>
  );
};

export default Event;

// export default Event;
