import React from "react";
import SignUpStep from "./SignUpStep";

import './member.css';

const SignUp = () => {
  return (
    <div id="container" className="member__join">
      <div className="layout_fix">
            <div className="heading">
                <h2 className="tit">회원가입</h2>
                {/* <h5 className="desc">회원가입 정보입력 단계입니다.</h5> */}
            </div>
            <SignUpStep />
        </div>
    </div>
  );
};

export default SignUp;
