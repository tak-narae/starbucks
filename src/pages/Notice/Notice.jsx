import React from 'react';
import { Link } from 'react-router-dom';

const Notice = () => {
  return (
    <div id="container" className='layout_fix guide'>
      <div className="heading">
        <h2 className="tit">공지사항</h2>
        <ul className="sort_list">
          <li>
            <Link onClick={e => e.preventDefault()} className="active">
              전체
            </Link>
            <ul>
              <li>
                <Link onClick={e => e.preventDefault()}>전체</Link>
              </li>
              <li>
                <Link onClick={e => e.preventDefault()}>공지사항</Link>
              </li>
              <li>
                <Link onClick={e => e.preventDefault()}>문화소식</Link>
              </li>
              <li>
                <Link onClick={e => e.preventDefault()}>사회공헌</Link>
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
          <tr>
            <td>2</td>
            <td>문화소식</td>
            <td class="subject">
              <Link onClick={e => e.preventDefault()}>나의 오감을 깨워요</Link>
            </td>
            <td>관리자</td>
            <td>2024-12-02</td>
          </tr>
          <tr>
            <td>1</td>
            <td>공지사항</td>
            <td class="subject">
              <Link onClick={e => e.preventDefault()}>
                단체 대량 구매 문의 (CONTACT FOR GROUP-BULK ORDER CONTACT
                FOR GROUP-BULK ORDER)
              </Link>
            </td>
            <td>관리자</td>
            <td>2024-12-02</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Notice;