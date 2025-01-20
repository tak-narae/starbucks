import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccessToken } from "./AccessTokenContext.js";
import axios from "axios";
import { API_URL } from "config/constants.js";


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAccessToken();
  const [userId, setUserId] = useState("");
  const [pw, setPw] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(`${API_URL}/users/login`, {
        user_id: userId,
        pw: pw,
      });

      if (result.data.user === userId && result.data.accessToken) {
        alert("로그인이 성공했습니다.");
        // accessToken을 Context와 localStorage에 저장
        setAccessToken(result.data.accessToken);
        localStorage.setItem('accessToken', result.data.accessToken);

        navigate('/'); // 메인 화면으로 이동
      } else {
        alert("로그인 정보를 다시 확인해주세요");
      }
    } catch (err) {
      console.error("Login failed", err);
      alert("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div id="container" className="member__Login">
      <div className="layout_fix">
          <div className="heading">
            <h2 className="tit">로그인</h2>
            {/* <h5 className="desc">회원가입 정보입력 단계입니다.</h5> */}
          </div>
          <form onSubmit={onSubmit} onFinishFailed={onFinishFailed}>
            <div className="login_input">
              <input id="user_id" name="user_id" placeholder="아이디를 입력해주세요." type="text" value={userId} onChange={(e)=>setUserId(e.target.value)} required/>
              <h5>이메일 아이디</h5>
            </div>
            <div className="login_input">
              <input id="pw" name="pw" placeholder="비밀번호를 입력해주세요." type="password" value={pw} onChange={(e)=>setPw(e.target.value)} required/>
              <h5>비밀번호</h5>
            </div>
            <div className="page_btn_wrap">
              <button className="btn_dark wid40" type="submit" disabled={!userId || !pw}>로그인</button>
            </div>
          </form>
      </div>
    </div>
  );
};

export default Login;