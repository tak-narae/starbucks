import React, { useContext } from "react";
import { DataContext } from "App";
import { Link, useParams } from "react-router-dom";

const NoticeDetail = () => {
  // let { key } = useParams();
  //   console.log(key);
  let { idx } = useParams();
  console.log("idx===", idx);
  const { notice } = useContext(DataContext);
  console.log("notice===", notice);
  const notices = notice[parseInt(idx)]; // index를 그대로 사용
  console.log("notices===", notices);
  const prevNotice = notice[parseInt(idx) - 1];
  console.log(prevNotice);
  const nextNotice = notice[parseInt(idx) + 1];
  console.log(nextNotice);

  //key값으로 가져오는 경우
  // const noticeDetail = notice.find((notices) => notices.idx === parseInt(idx));
  //find 함수
  //find(function(요소){return 요소 === })
  //받아온 key값은 문자열이므로 notices.key안의 값을 문자열로 형변환

  return (
    <div id="container" className="notice_detail">
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
                  {prevNotice ? prevNotice.subject : "해당 글이 없습니다"}
                </div>
              </div>
              <div className="next">
                <button>next</button>
                <span>다음글</span>
                <div className="next_tit">
                  {nextNotice ? nextNotice.subject : "해당 글이 없습니다"}
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
