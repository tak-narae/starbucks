import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUtilContext } from "hooks/UtilContext";

const EventDetail = () => {
  let { idx } = useParams();
  
  const { event, paginatedEvents } = useUtilContext();

  useEffect(() => {
    if (paginatedEvents.length > 0) {
      localStorage.setItem("paginatedEvents", JSON.stringify(paginatedEvents));
    }
  }, [event]);

  const storedPaginatedEvents = JSON.parse(localStorage.getItem("paginatedEvents"));

  // localStorage에서 paginatedEvents 가져오기
  const EventDetail = storedPaginatedEvents
    ? storedPaginatedEvents[parseInt(idx)]
    : "null";
  const prevEvent = storedPaginatedEvents
    ? storedPaginatedEvents[parseInt(idx) - 1]
    : "null";
  const nextEvent = storedPaginatedEvents
    ? storedPaginatedEvents[parseInt(idx) + 1]
    : "null";

  return (
    <>
      <div id="container" className="board__event_detail">
        <div className="layout_fix">
          {EventDetail ? (
            <>
              <div className="heading">
                <div className="path">
                  <Link to="/">{EventDetail.category}</Link>
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
                <div className="prev">
                  <button>prev</button>
                  <span>이전글</span>
                  <div className="prev_tit">
                    <Link to={`/event/${parseInt(idx) - 1}`}>
                      {prevEvent ? (
                        <div>{prevEvent.title}</div>
                      ) : (
                        <p> 해당 글이 없습니다 </p>
                      )}
                    </Link>
                  </div>
                </div>
                <div className="next">
                  <button>next</button>
                  <span>다음글</span>
                  <div className="next_tit">
                    <Link to={`/event/${parseInt(idx) + 1}`}>
                      {nextEvent ? (
                        <div>{nextEvent.title}</div>
                      ) : (
                        <p> 해당 글이 없습니다 </p>
                      )}
                    </Link>
                  </div>
                </div>
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
      </div>
    </>
  );
};

export default EventDetail;
