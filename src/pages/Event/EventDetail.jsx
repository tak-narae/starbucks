import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "App";
import { Link, useParams } from "react-router-dom";

const EventDetail = () => {
  let { idx } = useParams();
  const { events } = useContext(DataContext);
  const event = events[parseInt(idx)]; // index를 그대로 사용
  console.log(event.detailImg);
  const prevEvent = events[parseInt(idx) - 1];
  const nextEvent = events[parseInt(idx) + 1];

  return (
    <>
      <div id="container" className="board__event_detail">
        <div className="layout_fix">
          {events ? (
            <>
              <div className="heading">
                <div className="event_tit">
                  <h2 className="tit">{event.title}</h2>
                  <p className="date">
                    {event.startDate} ~ {event.endDate}
                  </p>
                </div>
              </div>
              <div className="event_cont">
                {event.detailImg && event.detailImg.length > 0 ? (
                  <div className="detail_img">
                    {event.detailImg.map((imgUrl, index) => {
                      return (
                        <img
                          key={index}
                          src={`${process.env.PUBLIC_URL}/${imgUrl}`}
                          alt={`detailImg ${index + 1}`}
                        ></img>
                      );
                    })}
                  </div>
                ) : (
                  <p>해당 이벤트 상세 내용이</p>
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
