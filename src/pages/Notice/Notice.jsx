import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "App";

const Notice = () => {
  const { notice } = useContext(DataContext);
  notice.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [isActive, setIsActive] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  

  const toggleActive = () => {
    if (isActive) {
      setIsClosing(true);
      setTimeout(() => {
        setIsActive(false);
        setIsClosing(false);
      }, 300);
    } else {
      setIsActive(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // 선택된 카테고리 설정
    setIsClosing(true);
    setTimeout(() => {
      setIsActive(false);
      setIsClosing(false);
    }, 300);
  };

  const filteredNotices = selectedCategory === "전체"
    ? notice
    : notice.filter((n) => n.category === selectedCategory);

  return (
    <div id="container" className="layout_fix guide">
      <div className="heading">
        <h2 className="tit">공지사항</h2>
        <ul className="sort_list">
          <li className={`sort_item ${isActive ? "active" : ""}`}>
            <label onClick={toggleActive}>카테고리</label>
            <Link onClick={toggleActive}>{selectedCategory}</Link>
            <ul className={`dropdown ${isClosing ? "closing" : ""}`}>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("전체");
                  }}
                >
                  전체
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("공지사항");
                  }}
                >
                  공지사항
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("문화소식");
                  }}
                >
                  문화소식
                </Link>
              </li>
              <li>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick("사회공헌");
                  }}
                >
                  사회공헌
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <table className="tb_list">
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
          {filteredNotices.map((notices, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{notices.category}</td>
              <td className="subject">
                <Link onClick={(e) => e.preventDefault()}>{notices.subject}</Link>
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
