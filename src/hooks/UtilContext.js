import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UtilContext = createContext();

export const useUtilContext = () => useContext(UtilContext);

export const UtilProvider = ({ children }) => {
  /* ===== 가져온 데이터 저장 ===== */
  const [notice, setNotice] = useState([]);
  const [event, setEvent] = useState([]);

  // console.log(event);

  /* ===== 데이터 불러오기 [Notice, Events]  ===== */
  const getData = async () => {
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/deliondane/db/main/db.json`
      );
      const fetchedNotices = response.data.notice;
      const fetchedEvents = response.data.events;

      // API에서 받은 데이터를 상태에 저장
      setNotice(fetchedNotices);
      setEvent(fetchedEvents);

    } catch (err) {
      console.error("데이터를 가져오는 중 오류가 발생했습니다:", err);
    }
  }
  // };
  useEffect(() => {
    getData();
  }, []);

  /* ================================================================== */

  /* ===== Notice와 Event 동시에 사용하는 변수 및 설정  ===== */
  const [isActive, setIsActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [noticeCategoryFilteredData, setNoticeCategoryFilteredData] = useState([]); // 필터링된 카테고리 데이터
  const [eventCategoryFilteredData, setEventCategoryFilteredData] = useState([]);

  useEffect(() => {
    const categoryNoticeFiltered = selectedCategory === "전체"
      ? notice
      : notice.filter((n) => n.category === selectedCategory);
    setNoticeCategoryFilteredData(categoryNoticeFiltered);

    const categoryEventFiltered = selectedCategory === "전체"
      ? event
      : event.filter((n) => n.category === selectedCategory);
    setEventCategoryFilteredData(categoryEventFiltered);
  }, [selectedCategory, notice, event]);

  const toggleActive = () => {
    if (isActive) {
      setTimeout(() => {
        setIsActive(false);
      }, 0);
    } else {
      setIsActive(true);
    }
  };
  //
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 설정
    setCurrentPage(1);
    setTimeout(() => {
      setIsActive(false);
    }, 0);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //검색 버튼
  const [search, setSearch] = useState("");
  const searchAction = (e) => {
    if (
      search !== "" &&
      e.target.closest("[class*='search_']:has(.btn_search).active")
    ) {
      return false;
    }
    e.target.closest(".search_event").classList.toggle("active");
    document.querySelector(".heading_tab input").focus();
  };

  //pagination
  const maxVisiblePages = 5;
  const currentBlock = Math.ceil(currentPage / maxVisiblePages);
  const startPage = (currentBlock - 1) * maxVisiblePages + 1;
  // const endPage = Math.min(currentBlock * maxVisiblePages, (title)totalPages); //endPage 각 항목 별로 빼줘야함
  //  const pages = Array.from({ length: noticeEndPage - startPage + 1 },(_, i) => startPage + i); pages도 각 항목 별로 빼줘야함
  //notice = 98줄 ~ , event = 145줄 ~

  /* ===== Notice에 사용하는 변수 및 설정  ===== */
  const noticeitemsPerPage = 10; // 한 페이지당 표시할 항목 수
  const noticetotalPages = Math.ceil(
    noticeCategoryFilteredData.length / noticeitemsPerPage
  );
  const noticeEndPage = Math.min(
    currentBlock * maxVisiblePages,
    noticetotalPages
  );
  const noticePages = Array.from(
    { length: noticeEndPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const datefilteredNotice = noticeCategoryFilteredData.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const paginatedNotices = datefilteredNotice.slice(
    (currentPage - 1) * noticeitemsPerPage,
    currentPage * noticeitemsPerPage
  );

  /* ===== Event에 사용하는 변수 및 설정  ===== */
  // 현재 탭에 따른 이벤트 선택[진행중|종료된]
  const [activeTab, setActiveTab] = useState("ongoing"); // 기본 탭은 진행 중
  const today = new Date(); //오늘 날짜 받아오기
  const displayedEvents = eventCategoryFilteredData.filter((event) => {
    if (activeTab === "ongoing") {
      //진행 중 이벤트
      return (
        new Date(event.startDate) <= today &&
        (!event.endDate || today <= new Date(event.endDate))
      );
    } else if (activeTab === "past") {
      //종료된 이벤트
      return event.endDate && new Date(event.endDate) < today;
    }
    return false;
  });
  //탭 정보 -> 날짜 순서대로 정렬
  const datefilteredEvents = displayedEvents.sort(
    (a, b) => new Date(b.startDate) - new Date(a.startDate)
  );
  const eventitemsPerPage = 16; // 한 페이지당 표시할 항목 수
  const eventtotalPages = Math.ceil(
    datefilteredEvents.length / eventitemsPerPage
  );
  const eventEndPage = Math.min(
    currentBlock * maxVisiblePages,
    eventtotalPages
  );
  const eventPages = Array.from(
    { length: eventEndPage - startPage + 1 },
    (_, i) => startPage + i
  );
  const paginatedEvents = datefilteredEvents.slice(
    (currentPage - 1) * eventitemsPerPage,
    currentPage * eventitemsPerPage
  );

  /* ================================================================== */

  // "공지사항" 카테고리 필터링
  const noticeMain = datefilteredNotice.filter(notice => notice.category === "공지사항");

  return (
    <UtilContext.Provider
      value={{
        notice, setNotice, event, setEvent,
        isActive, setIsActive, selectedCategory, setSelectedCategory, currentPage, setCurrentPage,
        toggleActive, handleCategoryClick, noticeCategoryFilteredData, eventCategoryFilteredData, handlePageChange,
        search, setSearch, searchAction,
        maxVisiblePages, currentBlock, startPage, noticeEndPage, noticePages, eventEndPage, eventPages,
        noticeitemsPerPage, noticetotalPages, datefilteredNotice, paginatedNotices,
        activeTab, setActiveTab, today, displayedEvents, datefilteredEvents, eventitemsPerPage, eventtotalPages, paginatedEvents,
        noticeMain
      }}
    >
      {children}
    </UtilContext.Provider>
  );
};

export default UtilProvider;
