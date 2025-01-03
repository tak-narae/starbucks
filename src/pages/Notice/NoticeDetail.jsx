import React, { useContext } from "react";
import { DataContext } from "App";
import { Link, useParams } from "react-router-dom";

const NoticeDetail = () => {
  let { key } = useParams();
  //   console.log(key);
  const { notice } = useContext(DataContext);

  const noticeDetail = notice.find((notices) => String(notices.key) === key);
  //find 함수
  //find(function(요소){return 요소 === })
  //받아온 key값은 문자열이므로 notices.key안의 값을 문자열로 형변환

  return (
    <div id="container" className="Notice_Detail">
      <div className="layout_fix">
        {noticeDetail ? (
          <>
            <div className="heading">
              <div className="notice_tit">
                <h2 className="tit">{noticeDetail.subject}</h2>
                <p className="date">{noticeDetail.date}</p>
              </div>
            </div>
            <div className="notice_cont">{noticeDetail.contents}</div>
            <div className="post_nav">
              <div className="prev"></div>
              <div className="next"></div>
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
