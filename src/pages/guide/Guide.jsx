import React from "react";
import { Link } from "react-router-dom";
import "./guide.css";
import "../../App";

const Guide = () => {
  return (
    <div id="main" className="guide">
      <div id="contents">
        <div className="layout_fix">
          <div className="guideItem">
            <p className="guideTitle">.login_input</p>
            <div className="login_input">
              <input type="email" placeholder="이메일을 입력해주세요" />
              <h5>이메일 아이디</h5>
            </div>
            <div className="login_input">
              <input type="password" placeholder="비밀번호를 입력해주세요" />
              <h5>비밀번호</h5>
            </div>
          </div>
          <div className="guideItem">
            <p className="guideTitle">.heading + .sort_list</p>
            <div className="heading">
              <h2 className="tit">커피</h2>
              <ul className="sort_list">
                <li>
                  <label>조회기간</label>
                  <Link to="javascript:;" className="active">
                    전체
                  </Link>
                  <ul>
                    <li>
                      <Link to="javascript:;">전체</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션1</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션2</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션3</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션4</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션5</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <label>처리상태</label>
                  <Link to="javascript:;">전체</Link>
                  <ul>
                    <li>
                      <Link to="javascript:;">전체</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션1</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션2</Link>
                    </li>
                    <li>
                      <Link to="javascript:;">옵션3</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div className="heading">
              <h2 className="tit2">주문내역조회</h2>
            </div>
          </div>

          <div class="guideItem">
            <p class="guideTitle">.tb_prd</p>
            <table class="tb_prd">
              <caption>주문내역조회</caption>
              <thead>
                <tr>
                  <th>주문일자 [주문번호]</th>
                  <th>상품정보</th>
                  <th>수량</th>
                  <th>주문금액</th>
                  <th>진행상태</th>
                  <th>처리</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="number">
                    <span class="date">2024-12-04</span>
                    <Link to="javaxcript: ;" class="underline">
                      O2024120123375331114
                    </Link>
                  </td>
                  <td>
                    <Link
                      to="javaxcript: ;"
                      style={{display: "inline-flex", alignItems: "center", gap: "20px",}}
                    >
                      <div style={{width: "80px", height: "80px", background: "#fafafa",}}></div>
                      <span>홀리데이 프렌즈 플레이트 커트러리 세트</span>
                    </Link>
                  </td>
                  <td>1개</td>
                  <td>39,000원</td>
                  <td>
                    <b>상품준비중</b>
                  </td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>

            <p class="guideTitle">.tb_list</p>
            <table class="tb_list">
              <colgroup>
                <col style={{width: "100px"}} />
                <col style={{width: "160px"}} />
                <col style={{width: "auto"}} />
                <col style={{width: "120px"}} />
                <col style={{width: "120px"}} />
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
                    <Link to="javaxcript: ;">나의 오감을 깨워요</Link>
                  </td>
                  <td>관리자</td>
                  <td>2024-12-02</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>공지사항</td>
                  <td class="subject">
                    <Link to="javaxcript: ;">
                      단체 대량 구매 문의 (CONTACT FOR GROUP-BULK ORDER CONTACT
                      FOR GROUP-BULK ORDER)
                    </Link>
                  </td>
                  <td>관리자</td>
                  <td>2024-12-02</td>
                </tr>
              </tbody>
            </table>

            <p class="guideTitle">.tb_grid</p>
            <table class="tb_grid">
              <caption>주문상세조회</caption>
              <colgroup>
                <col style={{ width: "160px" }} />
                <col style={{ width: "auto" }} />
              </colgroup>

              <tbody>
                <tr>
                  <th>주문번호</th>
                  <td>O2024120123375331114</td>
                </tr>
                <tr>
                  <th>주문일자</th>
                  <td>2024-12-04 22:41:12</td>
                </tr>
                <tr>
                  <th>주문자명</th>
                  <td>테스트</td>
                </tr>
                <tr>
                  <th>진행상태</th>
                  <td>상품준비중</td>
                </tr>
              </tbody>
            </table>

            <p class="guideTitle">.tb_block</p>
            <table class="tb_block">
              <tbody>
                <tr>
                  <th class="required">회원구분</th>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <th>아이디</th>
                  <td>
                    <input type="text" placeholder="4~13자리 이내" />
                  </td>
                </tr>
                <tr>
                  <th>비밀번호</th>
                  <td>
                    <input type="text" placeholder="10~20자리 이내" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="guideItem">
            <p className="guideTitle">input / select</p>
            <ul className="mg_list">
              <li>
                <input type="text" placeholder="기본상태" />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="기본상태(focus)"
                  value="focus"
                />
              </li>
              <li>
                <input type="text" placeholder="disabled" disabled />
              </li>
              <li>
                <input
                  type="text"
                  placeholder="disabled"
                  value="valueDisabled"
                  disabled
                />
              </li>
              <li>
                <select>
                  <option>옵션1</option>
                  <option>옵션2</option>
                  <option>옵션3</option>
                </select>
              </li>
              <li>
                <select>
                  <option selected disabled>
                    옵션을 선택하세요
                  </option>
                  <option>옵션1</option>
                  <option>옵션2</option>
                </select>
              </li>
            </ul>
          </div>

          <div className="guideItem">
            <p className="guideTitle">flex input / select</p>
            <ul className="mg_list">
              <li>
                <div className="flex_items">
                  <input type="text" />
                </div>
              </li>
              <li>
                <div className="flex_items">
                  <input type="text" />
                  <input type="text" />
                </div>
              </li>
              <li>
                <div className="flex_items">
                  <input type="text" />
                  <input type="text" />
                  <input type="text" />
                </div>
              </li>
              <li>
                <div className="flex_items">
                  <input type="text" /> - <input type="text" />
                </div>
              </li>
              <li>
                <div className="flex_items">
                  <input type="text" /> - <input type="text" /> -{" "}
                  <input type="text" />
                </div>
              </li>
              <li>
                <div className="flex_items">
                  <input type="text" />
                  <select>
                    <option>전체</option>
                    <option>옵션1</option>
                    <option>옵션2</option>
                  </select>
                </div>
              </li>
            </ul>
          </div>

          <div className="guideItem">
            <p className="guideTitle">button</p>
            {/* <!-- btn_layers , --> */}
            <ul className="mg_list">
              <li>
                <div className="btn_primary">
                  <Link to="javascript: ;" className="btn_dark">
                    btn1
                  </Link>
                  <Link to="javascript: ;" className="btn_light">
                    btn2
                  </Link>
                  <Link to="javascript: ;" className="btn_normal">
                    btn3
                  </Link>
                </div>
              </li>
              <li>
                <div className="btn_primary column">
                  <Link to="javascript: ;" className="btn_strong">
                    btn1
                  </Link>
                  <Link to="javascript: ;" className="btn_basic">
                    btn2
                  </Link>
                </div>
              </li>
            </ul>
          </div>

          <div className="guideItem">
            <p className="guideTitle">.prd_list</p>
            <ul className="prd_list">
              <li>
                <div className="item">
                  <div className="thumbnail">
                    <Link to="javascript: ;">
                      <img src="https://placehold.co/600" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="name">상품이름</div>
                    <div className="price">39,000원</div>
                    <div className="review">4.9</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="thumbnail">
                    <Link to="javascript: ;">
                      <img src="https://placehold.co/600" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="name">상품이름</div>
                    <div className="price">39,000원</div>
                    <div className="review">4.9</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="thumbnail">
                    <Link to="javascript: ;">
                      <img src="https://placehold.co/600" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="name">상품이름</div>
                    <div className="price">39,000원</div>
                    <div className="review">4.9</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="thumbnail">
                    <Link to="javascript: ;">
                      <img src="https://placehold.co/600" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="name">상품이름</div>
                    <div className="price">39,000원</div>
                    <div className="review">4.9</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="item">
                  <div className="thumbnail">
                    <Link to="javascript: ;">
                      <img src="https://placehold.co/600" />
                    </Link>
                  </div>
                  <div className="desc">
                    <div className="name">상품이름</div>
                    <div className="price">39,000원</div>
                    <div className="review">4.9</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
