import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

const NoticeDetail = () => {
  let { idx } = useParams();
  console.log("idx===", idx);
  const { paginatedNotices } = useUtilContext();
  const notices = paginatedNotices[parseInt(idx)]; // index를 그대로 사용
  const prevNotice = paginatedNotices[parseInt(idx) - 1];
  console.log(prevNotice);
  const nextNotice = paginatedNotices[parseInt(idx) + 1];
  console.log(nextNotice);
  
  return (
    <div id="container" className="board__notice_detail">
      <div className="layout_fix">
        {notices ? (
          <>
            <div className="heading">
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
                  <Link to={`/notice/${parseInt(idx) - 1}`}>
                    {prevNotice ? (<div>{prevNotice.subject}</div>) : (<p>해당 글이 없습니다</p>)}
                  </Link>
                </div>
              </div>
              <div className="next">
                <button>next</button>
                <span>다음글</span>
                <div className="next_tit">
                  <Link to={`/notice/${parseInt(idx) + 1}`}>
                    {nextNotice ? (<div>{nextNotice.subject}</div>) : (<p>"해당 글이 없습니다"</p>)}
                  </Link>
                </div>
              </div>
            </div>
            <div className="post">
              <button>
                <Link to="/notice">목록으로</Link>
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
