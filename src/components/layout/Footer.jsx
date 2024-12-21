import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="f_border">
        <div className="f_quick_menu layout_fix">
          <Link to="/">회사소개</Link>
          <Link to="/">단체구매안내</Link>
          <Link to="/">파트너십</Link>
          <Link to="/">채용안내</Link>
        </div>
      </div>
      <div className="f_content layout_fix">
        <div className="f_logo_sns">
          <h1 className="starbucks_logo"><Link to="/">스타벅스 로고</Link></h1>
          <div className="f_sns">
            <Link to="/" className="insta">인스타그램</Link>
            <Link to="/" className="youtube">유튜브</Link>
            <Link to="/" className="x">x</Link>
            <Link to="/" className="facebook">페이스북</Link>
            <Link to="/" className="blog">블로그</Link>
          </div>
        </div >
        <div className="f_info">
          <span>회사명 : Starbucks Coffee Korea Co., Ltd.</span>
          <span>사업장주소 : 서울특별시 중구 퇴계로 100, 8~10층(회현동2가)</span>
          <span>대표 : 손정현</span>
          <span>사업자등록번호 : 201-81-21515 <button>[사업자번호조회]</button></span>
          <span>대표번호 : 1522-3232</span>
          <span>개인정보 보호책임자 : 이찬우</span>
        </div>
        <div className="f_copy_plus">
          <div className="f_copy">
            <div>&copy; 2024 Starbucks Coffee Company. All Rights Reserved.</div>
          </div>
          <div className="f_plus">
            <div className="f_plus_left">
              <button className="f_plus_color">개인정보처리방침</button>
              <button>영상정보처리기기 운영관리방침</button>
              <button>홈페이지 이용약관</button>
              <button>위치정보 이용약관</button>
            </div>
            <div className="f_plus_right">
              <button>찾아오시는 길</button>
              <button>신규입점제의</button>
              <button>사이트맵</button>
            </div>
          </div>
        </div >
      </div >
    </footer >
  );
};

export default Footer;