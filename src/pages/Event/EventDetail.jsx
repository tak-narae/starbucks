import React, { useContext } from "react";
import { DataContext } from "App";
import { Link, useParams } from "react-router-dom";

const EventDetail = () => {
  let { idx } = useParams();
  const { events } = useContext(DataContext);
  console.log(events);
  const event = events[parseInt(idx)]; // index를 그대로 사용
  console.log("events===", events);
  const prevEvent = events[parseInt(idx) - 1];
  console.log(prevEvent);
  const nextEvent = events[parseInt(idx) + 1];
  console.log(nextEvent);

  return (
    <>
      <div id="container" className="board__event_detail">
        <div className="layout_fix">
          {events ? (
            <>
              <div className="heading">
                <div className="event_tit">
                  <h2 className="tit">{event.subject}</h2>
                  <p className="date">{event.date}</p>
                </div>
              </div>
              <div className="event_cont">{event.contents}</div>
              <div className="post_nav">
                <div className="prev">
                  <button>prev</button>
                  <span>이전글</span>
                  <div className="prev_tit">
                    <Link to={`/event/${parseInt(idx) - 1}`}>
                      {prevEvent ? prevEvent.subject : "해당 글이 없습니다"}
                    </Link>
                  </div>
                </div>
                <div className="next">
                  <button>next</button>
                  <span>다음글</span>
                  <div className="next_tit">
                    <Link to={`/event/${parseInt(idx) + 1}`}>
                      {nextEvent ? nextEvent.subject : "해당 글이 없습니다"}
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
