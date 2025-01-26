import React from 'react';
import '../../App.css';
import './Header.css';

import { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataContext } from 'App';


const Header = () => {

    //===header
    const location = useLocation();
    useEffect(() => {
        if (location.pathname) {
        // if (location.pathname !== '/') {
            document.querySelectorAll("header .btn_hamburger i").forEach(i => {
                i.style.transition = "none";
                setTimeout(() => i.removeAttribute("style"), 0);
            });
            document.querySelector("header .btn_hamburger").classList.remove("active");
            document.querySelector("header .header_nav").classList.remove("active");
        };
    }, [location])
    useEffect(() => {
        document.querySelector("header .btn_hamburger").addEventListener("click", (e) => {
            document.querySelector("header .search_form.active")?.classList.remove("active");
            e.currentTarget.classList.toggle("active");
            document.querySelector("header .header_nav").classList.toggle("active");
        })
        document.querySelectorAll(".header_nav .gnb ul").forEach(el => {
            el.addEventListener("mouseenter", (item) => {
                item.target.closest('li').classList.add("active");
            })
            el.addEventListener("mouseleave", (item) => {
                item.target.closest('li').classList.remove("active");
            })
        })
    }, [])

    
    //===search
    const navigate = useNavigate();
    const { setSearchData } = useContext(DataContext);
    const [ searchValue, setSearchValue ] = useState("");
    const [ hasHistory, setHasHistory ] = useState(true); //입력이력 확인

    const searchForm = (e)=>{
        e.preventDefault();
        const searchForm = e.target.closest("li.search").querySelector(".search_form");
        const searchInput = e.target.closest("li.search").querySelector("input");
        e.target.textContent === "검색" ? searchForm.classList.toggle("active") : searchForm.classList.remove("active");
        searchInput.value = ""; //비우기
        setHasHistory(true); //컬러버튼
    }
    const searchBtnAction = (e)=>{ //버튼비활성화
        if(e.target.nextElementSibling){
            e.target.value === "" && hasHistory === false ? e.target.nextElementSibling.disabled = true : e.target.nextElementSibling.disabled = false;
        }
    }
    const actionSearch = (e)=>{ //검색페이지로 값 전달
        e.preventDefault();
        setSearchData(searchValue);
        navigate(`/search?item=${searchValue}`);
    }
    useEffect(()=>{ //페이지 이동시 초기화
        document.querySelector("header .search_form.active")?.classList.remove("active");
        setSearchValue("");
        setHasHistory(true);
    },[location])


    return (
        <header>
            <div className="header_shop">
                <div className="layout_fix">
                    <div className="shop_logo">
                        <Link to="/" className="btn_hamburger" onClick={e => e.preventDefault()}>
                            <i className="i1"></i><i className="i2"></i><i className="i3"></i>
                        </Link>
                        <h1 className="starbucks_logo"><Link to="/">스타벅스 로고</Link></h1>
                    </div>
                    <ul className="shop_util">
                        <li className="search">
                            <Link to="/" onClick={(e)=>searchForm(e)}>검색</Link>
                            <div className="search_form">
                                <form onSubmit={actionSearch}>
                                    <h3>검색</h3>
                                    <button className="btn_close" onClick={(e)=>searchForm(e)}>닫기</button>
                                    <fieldset>
                                        <input type="text" placeholder="검색어 입력" value={searchValue}
                                            onInput={(e)=> { setSearchValue(e.target.value); setHasHistory(false); searchBtnAction(e); } }/>
                                        { hasHistory === false ? <button type="submit" className="btn_submit">&gt;</button> : "" }
                                    </fieldset>    
                                </form>
                            </div>
                        </li>
                        <li className="mypage"><Link to="/signup?step=1">마이페이지</Link></li>
                        {/* <li className="mypage"><Link to="/mypage">마이페이지</Link></li> */}
                        <li className="cart"><Link to="/order/cart">장바구니</Link></li>
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
                                    <li><Link to="/menu/coffee?cate=0">원두</Link></li>
                                    <li><Link to="/menu/coffee?cate=1">비아</Link></li>
                                    <li><Link to="/menu/coffee?cate=2">오리가미</Link></li>
                                    <li><Link to="/menu/coffee?cate=3">앳홈 by 캡슐</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>음료</h2>
                                <ul>
                                    <li><Link to="/menu/beverage?cate=0">콜드브루</Link></li>
                                    <li><Link to="/menu/beverage?cate=1">브루드 커피</Link></li>
                                    <li><Link to="/menu/beverage?cate=2">에스프레소</Link></li>
                                    <li><Link to="/menu/beverage?cate=3">프라푸치노</Link></li>
                                    <li><Link to="/menu/beverage?cate=4">블렌디드</Link></li>
                                    <li><Link to="/menu/beverage?cate=5">리프레셔</Link></li>
                                    <li><Link to="/menu/beverage?cate=6">피지오</Link></li>
                                    <li><Link to="/menu/beverage?cate=7">티(티바나)</Link></li>
                                    <li><Link to="/menu/beverage?cate=8">기타 제조 음료</Link></li>
                                    <li><Link to="/menu/beverage?cate=9">주스(병음료)</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>상품</h2>
                                <ul>
                                    <li><Link to="/menu/product?cate=0">머그</Link></li>
                                    <li><Link to="/menu/product?cate=1">글라스</Link></li>
                                    <li><Link to="/menu/product?cate=2">플라스틱 텀블러</Link></li>
                                    <li><Link to="/menu/product?cate=3">스테인리스 텀블러</Link></li>
                                    <li><Link to="/menu/product?cate=4">보온병</Link></li>
                                    <li><Link to="/menu/product?cate=5">액세서리</Link></li>
                                    <li><Link to="/menu/product?cate=6">선물세트</Link></li>
                                    <li><Link to="/menu/product?cate=7">커피용품</Link></li>
                                    <li><Link to="/menu/product?cate=8">패키지 티(티바나)</Link></li>
                                    <li><Link to="/menu/product?cate=9">시럽</Link></li>
                                </ul>
                            </li>
                            <li>
                                <h2>푸드</h2>
                                <ul>
                                    <li><Link to="/menu/food?cate=0">브레드</Link></li>
                                    <li><Link to="/menu/food?cate=1">케이크</Link></li>
                                    <li><Link to="/menu/food?cate=2">샌드위치 & 샐러드</Link></li>
                                    <li><Link to="/menu/food?cate=3">따뜻한 푸드</Link></li>
                                    <li><Link to="/menu/food?cate=4">과일 & 요거트</Link></li>
                                    <li><Link to="/menu/food?cate=5">스낵 & 미니디저트</Link></li>
                                    <li><Link to="/menu/food?cate=6">아이스크림</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                    <ul className="banner">
                        <li><Link to="/event?cate=상품출시"><img src={require("../../images/header_banner1.png")} alt="이벤트 배너" /></Link></li>
                        <li><Link to="/event/12?cate=상품출시"><img src={require("../../images/header_banner2.png")} alt="이벤트 배너" /></Link></li>
                        <li><Link to="/event"><img src={require("../../images/header_banner3.png")} alt="이벤트 배너" /></Link></li>
                    </ul>
                </div>
                <div className="customer">
                    <ul className="menu_util">
                        <li><Link to="/event"><img src={require('../../images/header_util1.png')} alt="이벤트" /><span>이벤트</span></Link></li>
                        <li><Link to="/notice"><img src={require('../../images/header_util2.png')} alt="공지사항" /><span>공지사항</span></Link></li>
                        <li><Link to="/store"><img src={require('../../images/header_util3.png')} alt="매장안내" /><span>매장안내</span></Link></li>
                        <li><Link to="/"><img src={require('../../images/header_util4.png')} alt="고객센터" /><span>고객센터</span></Link></li>
                    </ul>
                </div>
            </div>
        </header>
    );
};

export default Header;