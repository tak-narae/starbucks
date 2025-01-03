import { DataContext } from "App";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Event = () => {
  const { events } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState("ongoing"); // 기본 탭은 진행 중
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const today = new Date(); //오늘 날짜 받아오기

  // 진행 중 이벤트
  const ongoingEvents = events.filter(
    (event) =>
      new Date(event.startDate) <= today &&
      (!event.endDate || today <= new Date(event.endDate))
  );

  // 종료된 이벤트
  const endEvents = events.filter(
    (event) => event.endDate && new Date(event.endDate) < today
  );

  // 현재 탭에 따른 이벤트 선택
  const displayedEvents = activeTab === "ongoing" ? ongoingEvents : endEvents;

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
    if (search !== "" && e.target.closest(".search.active")) {
      return false;
    }
    e.target.closest(".event_search").classList.toggle("active");
    document.querySelector(".tab input").focus();
  };

  return (
    <div id="container" className="layout_fix guide">
      <div className="heading">
        <h2 className="tit">
          <Link to="/event">이벤트</Link>
        </h2>
      </div>

      <div className="tab">
        <div className="event_tab">
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
        <div className="event_search">
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
          paginatedEvents.map((event) => {
            const isEnded = event.endDate && new Date(event.endDate) < today; //종료 이벤트 확인
            return (
            <li key={event.key} className={isEnded ? "li-ended" : ""}>
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
                  <div className="date">
                    {event.startDate} ~ {event.endDate}
                  </div>
                </div>
              </div>
              {console.log(isEnded ? 'Ended' : 'Ongoing')}  {/* 확인용 로그 */}
            </li>
          );})
        ) : (
          <p>현재 표시할 이벤트가 없습니다.</p>
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
  );
};

export default Event;

// export default Event;
