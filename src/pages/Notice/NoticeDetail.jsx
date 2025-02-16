import React from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

const NoticeDetail = () => {
  let { key } = useParams(); // `key`로 변경
  const { search } = useLocation();
  const category = new URLSearchParams(search).get("cate"); // 카테고리 쿼리 파라미터 가져오기

  const { datefilteredNotice, handleCategoryClick } = useUtilContext();

  console.log("URL에서 가져온 key:", key);

  const notices = datefilteredNotice.find((notice) => notice.key === key); // `key`로 비교

  // 현재 공지의 key를 기준으로 이전글과 다음글 찾기
  const currentIndex = datefilteredNotice.findIndex(
    (notice) => notice.key === key
  );

  console.log("찾은 공지사항:", notices);

  const prevNotice =
    currentIndex > 0 ? datefilteredNotice[currentIndex - 1] : null;
  const nextNotice =
    currentIndex < datefilteredNotice.length - 1
      ? datefilteredNotice[currentIndex + 1]
      : null;

  return (
    <div id="container" className="board__notice_detail">
      <div className="layout_fix">
        {notices ? (
          <>
            <div className="heading">
              <div className="path">
                <Link to={`/notice?cate=${category}`}>{category}</Link>
              </div>
              <div className="notice_tit">
                <h2 className="tit">{notices.subject}</h2>
                <p className="date">{notices.date}</p>
              </div>
            </div>
            <div className="notice_cont">
              {notices.contents}
              {notices.img ? (
                <div className="detail_img">
                  <img
                    src={`${process.env.PUBLIC_URL}/${notices.img}`}
                    alt={notices.subject}
                  />
                </div>
              ) : null}
            </div>
            <div className="post_nav">
              {prevNotice ? (
                <div className="prev">
                  <button>prev</button>
                  <span>이전글</span>
                  <div className="prev_tit">
                    <Link to={`/notice/${prevNotice.key}?cate=${category}`}>
                      <div>{prevNotice.subject}</div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="prev" style={{ display: "none" }}></div>
              )}
              {nextNotice ? (
                <div className="next">
                  <button>next</button>
                  <span>다음글</span>
                  <div className="next_tit">
                    <Link to={`/notice/${nextNotice.key}?cate=${category}`}>
                      <div>{nextNotice.subject}</div>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="next" style={{ display: "none" }}></div>
              )}
            </div>
            <div className="post">
              <button>
                <Link
                  to={`/notice?cate=${category}`}
                  onClick={(e) => {
                    handleCategoryClick(notices.category);
                  }}
                >
                  목록으로
                </Link>
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
