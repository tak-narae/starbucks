import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

const NoticeDetail = () => {
  let { idx } = useParams();
  const { search } = useLocation();
  const category = new URLSearchParams(search).get('cate'); // 카테고리 쿼리 파라미터 가져오기
  console.log(category)

  const { paginatedNotices, datefilteredNotice, handleCategoryClick } = useUtilContext();

  const noticeIndex = parseInt(idx, 10);
  const notices = paginatedNotices[noticeIndex];

  const filteredNotices = notices ? datefilteredNotice.filter(notice => notice.category === notices.category) : [];
  const currentFilteredIndex = filteredNotices.findIndex(notice => notice === notices);

  const prevNotice = currentFilteredIndex > 0 ? filteredNotices[currentFilteredIndex - 1] : null;
  const nextNotice = currentFilteredIndex < filteredNotices.length ? filteredNotices[currentFilteredIndex + 1] : null;

  return (
    <div id="container" className="board__notice_detail">
      <div className="layout_fix">
        {notices ? (
          <>
            <div className="heading">
              <div className="path">
                <Link to={`/notice?cate=${category}`}>{category}</Link>
                {/* <Link to={{
                  pathname: `/notice`,
                  search: `?cate=${notices.category}`
                }}>{notices.category}
                </Link> */}
              </div>
              <div className="notice_tit">
                <h2 className="tit">{notices.subject}</h2>
                <p className="date">{notices.date}</p>
              </div>
            </div>
            <div className="notice_cont">{notices.contents}</div>
            <div className="post_nav">
              <div className="prev">
                <button>prev</button>
                <span>이전글</span>
                <div className="prev_tit">
                  <Link to={`/notice/${parseInt(idx) - 1}?cate=${category}`}>
                    {prevNotice ? (<div>{prevNotice.subject}</div>) : (<p>해당 글이 없습니다</p>)}
                  </Link>
                </div>
              </div>
              <div className="next">
                <button>next</button>
                <span>다음글</span>
                <div className="next_tit">
                  <Link to={`/notice/${parseInt(idx) + 1}?cate=${category}`}>
                    {nextNotice ? (<div>{nextNotice.subject}</div>) : (<p>해당 글이 없습니다</p>)}
                  </Link>
                </div>
              </div>
            </div>
            <div className="post">
              <button>
                <Link
                  // to={{ pathname: `/notice`, search: `?cate=${notices.category}` }}
                  to={`/notice?cate=${category}`}
                  onClick={(e) => {
                    handleCategoryClick(notices.Lcategory);
                  }}
                >목록으로</Link>
              </button>
            </div>
          </>
        ) : (
          <p>공지사항을 찾을 수 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default NoticeDetail;
