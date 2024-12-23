import React from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="layout_fix">
                <div className="menu_logo">
                    <Link to="/" className="btn_hamburger">메뉴</Link>
                    <h1 className="starbucks_logo"><Link to="/">스타벅스 로고</Link></h1>
                </div>
                <ul className="menu_util">
                    <li className="util_search"><Link to="/">검색</Link></li>
                    <li className="util_mypage"><Link to="/mypage">마이페이지</Link></li>
                    <li className="util_cart"><Link to="/">장바구니</Link></li>
                    <li className="util_card"><Link to="/">카드</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Header;