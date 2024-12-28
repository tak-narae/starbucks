import React from 'react';
import '../../App.css';
import './Header.css';

import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="header_shop">
                <div className="layout_fix">
                    <div className="shop_logo">
                        <Link to="/" className="btn_hamburger">메뉴</Link>
                        <h1 className="starbucks_logo"><Link to="/">스타벅스 로고</Link></h1>
                    </div>
                    <ul className="shop_util">
                        <li className="search"><Link to="/">검색</Link></li>
                        <li className="mypage"><Link to="/mypage">마이페이지</Link></li>
                        <li className="cart"><Link to="/">장바구니</Link></li>
                        <li className="card"><Link to="/">카드</Link></li>
                    </ul>
                </div>
            </div>
            <div className="header_nav">
                <div className="nav_cont">
                    <nav>
                        <ul className="gnb">
                            <li>
                                <h2>커피</h2>
                                <ul>
                                    <li><Link to="/">원두</Link></li>
                                    <li><Link to="/">비아</Link></li>
                                    <li><Link to="/">오리가미</Link></li>
                                    <li><Link to="/">앳홈 by 캡슐</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>음료</h2>
                                <ul>
                                    <li><Link to="/">콜드브루</Link></li>
                                    <li><Link to="/">브루드 커피</Link></li>
                                    <li><Link to="/">에스프레소</Link></li>
                                    <li><Link to="/">프라푸치노</Link></li>
                                    <li><Link to="/">블렌디드</Link></li>
                                    <li><Link to="/">리프레셔</Link></li>
                                    <li><Link to="/">피지오</Link></li>
                                    <li><Link to="/">티(티바나)</Link></li>
                                    <li><Link to="/">주스(병음료)</Link></li>
                                    <li><Link to="/">기타 제조 음료</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>상품</h2>
                                <ul>
                                    <li><Link to="/">머그</Link></li>
                                    <li><Link to="/">글라스</Link></li>
                                    <li><Link to="/">플라스틱 텀블러</Link></li>
                                    <li><Link to="/">스테인리스 텀블러</Link></li>
                                    <li><Link to="/">보온병</Link></li>
                                    <li><Link to="/">액세서리</Link></li>
                                    <li><Link to="/">선물세트</Link></li>
                                    <li><Link to="/">커피용품</Link></li>
                                    <li><Link to="/">패키지 티(티바나)</Link></li>
                                    <li><Link to="/">시럽</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>푸드</h2>
                                <ul>
                                    <li><Link to="/">브레드</Link></li>
                                    <li><Link to="/">케이크</Link></li>
                                    <li><Link to="/">샌드위치 & 샐러드</Link></li>
                                    <li><Link to="/">따뜻한 푸드</Link></li>
                                    <li><Link to="/">과일 & 요거트</Link></li>
                                    <li><Link to="/">스낵 & 미니디저트</Link></li>
                                    <li><Link to="/">아이스크림</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <ul className="banner">
                    <li>img1</li>
                    <li>img2</li>
                    <li>img3</li>
                    </ul>
                </div>
                <div className="customer">
                    <ul className="menu_util">
                        <li><Link to="/"><img src="./images/header_util1.png" alt="이벤트"/>이벤트</Link></li>
                        <li><Link to="/"><img src="./images/header_util2.png" alt="공지사항"/>공지사항</Link></li>
                        <li><Link to="/"><img src="./images/header_util3.png" alt="매장안내"/>매장안내</Link></li>
                        <li><Link to="/"><img src="./images/header_util4.png" alt="고객센터"/>고객센터</Link></li>
                    </ul>
                </div>
            </div>

        </header>
    );
};

export default Header;