import React from "react";
import { Link, useParams } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

const EventDetail = () => {
  let { idx } = useParams();

  const { paginatedEvents } = useUtilContext();

  const EventDetail = paginatedEvents ? paginatedEvents[parseInt(idx)] : "null";
  const prevEvent = paginatedEvents ? paginatedEvents[parseInt(idx) - 1] : "null";
  const nextEvent = paginatedEvents ? paginatedEvents[parseInt(idx) + 1] : "null";

  return (
    <>
      <div id="container" className="board__event_detail">
        <div className="layout_fix">
          {EventDetail ? (
            <>
              <div className="heading">
                <div className="path">
                  <Link to={`/event?cate=${EventDetail.category}`}> {EventDetail.category}</Link>
                </div>
                <div className="event_tit">
                  <h2 className="tit">{EventDetail.title}</h2>
                  <p className="date">
                    {EventDetail.startDate} ~ {EventDetail.endDate}
                  </p>
                </div>
              </div>
              <div className="event_cont">
                {EventDetail.detailImg && EventDetail.detailImg.length > 0 ? (
                  <div className="detail_img">
                    {EventDetail.detailImg.map((imgUrl) => {
                      return (
                        <img
                          key={idx}
                          src={`${process.env.PUBLIC_URL}/${imgUrl}`}
                          alt={`detailImg ${idx + 1}`}
                        ></img>
                      );
                    })}
                  </div>
                ) : (
                  <p>해당 이벤트 상세 내용이 없습니다</p>
                )}
              </div>
              <div className="post_nav">
                {prevEvent ? (
                  <div className="prev">
                    <button>prev</button>
                    <span>이전글</span>
                    <div className="prev_tit">
                      <Link to={`/event/${parseInt(idx) - 1}?cate=${EventDetail.category}`}>
                        <div>{prevEvent.title}</div>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="prev" style={{display: "none"}}></div>
                )}
                {nextEvent ? (
                <div className="next">
                  <button>next</button>
                  <span>다음글</span>
                  <div className="next_tit">
                    <Link to={`/event/${parseInt(idx) + 1}?cate=${EventDetail.category}`}>
                        <div>{nextEvent.title}</div>
                    </Link>
                  </div>
                </div>
                ) : (
                  <div className="next" style={{display: "none"}}></div>
                )}
              </div>
              <div className="post">
                <button>
                  <Link to="/event">목록으로</Link>
                </button>
              </div>
            </>
          ) : (
            <p>이벤트를 찾을 수 없습니다.</p>
          )}
        </div>
      </div >
    </>
  );
};

export default EventDetail;
