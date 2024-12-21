import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="menu_corp">
        <div className="layout_fix">
          <Link to="/">회사소개</Link>
          <Link to="/">단체구매안내</Link>
          <Link to="/">파트너십</Link>
          <Link to="/">채용안내</Link>
        </div>
      </div>
      <div className="fnb">
        <div className="layout_fix">
          <h1 className="starbucks_logo"><Link to="/">스타벅스 로고</Link></h1>
          <div className="info">
            <div className="info_biz">
              <span>회사명 : Starbucks Coffee Korea Co., Ltd.</span>
              <span>사업장주소 : 서울특별시 중구 퇴계로 100, 8~10층(회현동2가)</span>
              <span>대표 : 손정현</span>
              <span>사업자등록번호 : 201-81-21515 <button>[사업자번호조회]</button></span>
              <span>대표번호 : 1522-3232</span>
              <span>개인정보 보호책임자 : 이찬우</span>
            </div>
            <div className="info_sns">
              <Link to="/" className="insta" title="인스타그램">인스타그램</Link>
              <Link to="/" className="youtube" title="유튜브">유튜브</Link>
              <Link to="/" className="x" title="트위터">트위터</Link>
              <Link to="/" className="facebook" title="페이스북">페이스북</Link>
              <Link to="/" className="blog" title="네이버 블로그">블로그</Link>
            </div>
          </div>
          <div className="copyright">&copy; 2024 Starbucks Coffee Company. All Rights Reserved.</div>
          <div className="link">
            <div>
              <button><b>개인정보처리방침</b></button>
              <button>영상정보처리기기 운영관리방침</button>
              <button>홈페이지 이용약관</button>
              <button>위치정보 이용약관</button>
            </div>
            <div>
              <button>찾아오시는 길</button>
              <button>신규입점제의</button>
              <button>사이트맵</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;