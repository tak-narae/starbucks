import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "App";

const Notice = () => {
  const { notice } = useContext(DataContext);

  return (
    <div id="container" className="layout_fix guide">
      <div className="heading">
        <h2 className="tit">공지사항</h2>
        <ul className="sort_list">
          <li>
            <Link onClick={(e) => e.preventDefault()} className="active">
              전체
            </Link>
            <ul>
              <li>
                <Link onClick={(e) => e.preventDefault()}>전체</Link>
              </li>
              <li>
                <Link onClick={(e) => e.preventDefault()}>공지사항</Link>
              </li>
              <li>
                <Link onClick={(e) => e.preventDefault()}>문화소식</Link>
              </li>
              <li>
                <Link onClick={(e) => e.preventDefault()}>사회공헌</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <table class="tb_list">
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "160px" }} />
          <col style={{ width: "auto" }} />
          <col style={{ width: "120px" }} />
          <col style={{ width: "120px" }} />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {notice.map((notices, key) => (
            <tr key={key}>
              <td>{notices.key}</td>
              <td>{notices.category}</td>
              <td class="subject">
                <Link onClick={(e) => e.preventDefault()}>
                  {notices.subject}
                </Link>
              </td>
              <td>관리자</td>
              <td>{notices.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Notice;
