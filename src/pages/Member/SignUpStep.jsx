import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from 'config/constants.js';

import './member.css';

const SignUpStep = () => {
      //signup 단계
      const [step, setStep] = useState(1);

      const navigate = useNavigate();
      const location = useLocation();

      useEffect(() => {
        const params = new URLSearchParams(location.search);
        const queryStep = params.get('step');
        if (queryStep) {
          setStep(Number(queryStep));
        } else {
          setStep(1); // 기본값을 1로 설정
          navigate('/signup?step=1'); // URL이 없을 경우, step=1로 자동 이동
        }
      }, [location.search, navigate]); // location.search가 변경될 때마다 실행
    
        //약관동의
      const [allChecked, setAllChecked] = useState(false);
      const [termsChecked, setTermsChecked] = useState(false);
      const [privacyChecked, setPrivacyChecked] = useState(false);
      const [cardChecked, setCardChecked] = useState(false);
      const [marketingChecked, setMarketingChecked] = useState(false);

      //정보입력
      const idInputRef = useRef(null);
      const pwInputRef = useRef(null);
      const nameInputRef = useRef(null);
      const phoneInputRef = useRef(null);
      const emailInputRef = useRef(null);

      const [type, setType] = useState("individual");
      const [id, setId] = useState("");
      const [isIdChecked, setIsIdChecked] = useState(false); //아이디 중복 체크
      const [pw, setPw] = useState("");
      const [pw2, setPw2] = useState("");
      const [name, setName] = useState("");
      const [phone, setPhone] = useState("");
      const [phoneFirst, setPhoneFirst] = useState("");
      const [phoneMiddle, setPhoneMiddle] = useState("");
      const [phoneLast, setPhoneLast] = useState("");
      const [email, setEmail] = useState("");
      const [emailFront, setEmailFront] = useState("");
      const [emailBack, setEmailBack] = useState("");
      const [birth, setBirth] = useState("");
      const [year, setYear] = useState("");
      const [month, setMonth] = useState("");
      const [day, setDay] = useState("");
      const [sex, setSex] = useState("male");
      const [store, setStore] = useState("");

        //회원가입 제출 여부
        const [isSubmitted, setIsSubmitted] = useState(false);
        //회원가입완료
        const [isRegistered, setIsRegistered] = useState(false);

        const idRule = /^[a-z0-9]{6,16}$/;
        const pwRule = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$&^*])[a-zA-Z\d!@#$&^*]{8,16}$/;
        const nameRule = /^[a-zA-Z가-힣]{1,20}$/;
        const phoneRule = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
        const emailRule = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+[a-zA-Z]{2,4}$/i;

        const [messages, setMessages] = useState({
          id: { text: "", color: "" },
          pw: { text: "", color: "" },
          pw2: { text: "", color: "" },
          name: { text: "", color: "" },
          phone: { text: "", color: "" },
          email: { text: "", color: "" },
        })

        useEffect(()=>{
          if(isSubmitted){
            if(isRegistered){
              alert('회원가입이 완료되었습니다.')
            }else{
              alert('회원가입에 실패했습니다.')
            }
          }
        },[isSubmitted, isRegistered])
    
        const handleAllChecked = () => {
          setAllChecked(!allChecked);
          setTermsChecked(!termsChecked);
          setPrivacyChecked(!privacyChecked);
          setCardChecked(!cardChecked);
          setMarketingChecked(!marketingChecked);
        };
    
      useEffect(()=>{
        if(termsChecked && privacyChecked && cardChecked && marketingChecked){
            setAllChecked(true);
        } else {
            setAllChecked(false);
        }
      },[termsChecked, privacyChecked, cardChecked, marketingChecked]);

      const handleMessageChange = (key, text, color) => {
        setMessages((prevMessages) => ({
          ...prevMessages,
          [key]: { text, color },
        }));
      };

      const handleType = (e) => {
        setType(e.target.value);
      }

      const handleId = (e) => {
        const newValue = e.target.value;
        setId(newValue);
        if (idRule.test(newValue)) {
          handleMessageChange("id", "사용 가능한 아이디입니다.", "success_color");
        } else if (newValue === "") {
          handleMessageChange("id", "아이디를 입력해주세요.", "error_color");
        } else {
          handleMessageChange("id", "아이디는 영문소문자/숫자 4글자 이상 16글자 미만으로 사용 가능합니다.", "error_color");
          setId("")
        }
      };

      //중복확인
      const handleIdCheck = async () =>{
        if(!idRule.test(id)){
          alert("유효안 아이디를 입력하세요");
          return;
        }
        try{
          const response = await axios.get(`${API_URL}/users/check-id`, {
            params: {user_id: id},
          });
          if(response.data.success){
            handleMessageChange('id', '사용 가능한 아이디입니다.', 'success_color');
            setIsIdChecked(true); //중복확인완료
          } else{
            handleMessageChange('id', '이미 사용중인 아이디입니다.', 'error_color');
            setIsIdChecked(false);
          }
        }catch(err){
          console.error(err);
          alert('중복 확인에 실패했습니다. 잠시 후 다시 시도해주세요.')
        }
      }

      const handlePw = (e) => {
        const newPwValue = e.target.value;
        setPw(newPwValue);
        if (pwRule.test(newPwValue)) {
          handleMessageChange("pw", "사용 가능한 비밀번호입니다.", "success_color");
        } else if (newPwValue === "") {
          handleMessageChange("pw", "비밀번호를 입력해주세요.", "error_color")
        } else {
          handleMessageChange("pw", "비밀번호는 영문 대소문자/숫자/특수문자 조합, 8글자 이상 16글자 미만으로 사용 가능합니다.", "error_color");
        }
      }

      const handlePw2 = (e) => {
        const newPw2Value = e.target.value;
        setPw2(newPw2Value);
        if (pw === "") {
          handleMessageChange("pw", "비밀번호를 입력해주세요", "error_color");
        } else if (newPw2Value === pw) {
          handleMessageChange("pw2", "비밀번호가 일치합니다", "success_color");
        } else if (newPw2Value === "") {
          handleMessageChange("pw2", "비밀번호를 입력해주세요", "error_color");
        } else {
          handleMessageChange("pw2", "비밀번호가 일치하지 않습니다", "error_color");
        }
      };

      const handleName = (e) => {
        const newNameValue = e.target.value;
        setName(newNameValue);
        if (nameRule.test(newNameValue)) {
          handleMessageChange("name", "사용가능한 이름입니다.", "success_color");
        } else if (newNameValue === "") {
          handleMessageChange("name", "이름을 입력해주세요", "error_color");
        } else {
          handleMessageChange("name", "올바른 이름이 아닙니다", "error_color");
          setName("");
        }
      };
      
      const handlePhone = (e) => {
        const phoneNumber = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;
        setPhone(phoneNumber);
        if (phoneRule.test(phoneNumber)) {
          handleMessageChange(
            "phone",
            "사용가능한 휴대전화 번호입니다.",
            "success_color"
          );
        } else if (phoneNumber === "") {
          handleMessageChange(
            "phone",
            "휴대전화 번호를 입력해주세요",
            "error_color"
          );
        } else {
          handleMessageChange(
            "phone",
            "휴대전화 번호를 확인해주세요",
            "error_color"
          );
          setPhone("");
        }
      };

      const handleEmail = (e) => {
        const newEmailValue = `${emailFront}@${emailBack}`;
        setEmail(newEmailValue);
        if (emailRule.test(newEmailValue)) {
          handleMessageChange("email", "사용가능한 이메일입니다.", "success_color");
        } else if (newEmailValue === "") {
          handleMessageChange("email", "이메일을 입력해주세요", "error_color");
        } else {
          handleMessageChange("email", "이메일을 확인해주세요", "error_color");
          setEmail("");
        }
      };

      const handleYearChange = (e) => {
        const value = e.target.value;
        setYear(value);
        updateBirth(value, month, day);
      };
    
      const handleMonthChange = (e) => {
        const value = e.target.value;
        setMonth(value);
        updateBirth(year, value, day);
      };
    
      const handleDayChange = (e) => {
        const value = e.target.value;
        setDay(value);
        updateBirth(year, month, value);
      };

      const updateBirth = (year, month, day) => {
        // month와 day가 한 자리 숫자인 경우 두 자리로 맞춤
        const formattedMonth = month.padStart(2, '0');
        const formattedDay = day.padStart(2, '0');
        setBirth(`${year}-${formattedMonth}-${formattedDay}`);
      };

      const handleSex = (e) => {
        setSex(e.target.value);
      }

      const handleBack = () => {
        setStep(1);
        navigate('/signup?step=1');
      }

      const handleMain = () => {
        navigate('/');
      }

      const handleLogin = () => {
        navigate('/login');
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
          if (termsChecked && privacyChecked && cardChecked) {
            setStep(prevStep => Math.min(prevStep + 1, 2));
            navigate(`/signup?step=${step + 1}`);
          } else {
            console.log('약관 동의가 필요합니다');
          }
        } else if (step === 2) {
          if (!isIdChecked) {
            alert('아이디 중복확인을 진행해주세요.');
            return;
          }
      
          if (idRule.test(id) &&
              pwRule.test(pw) &&
              pw2 === pw &&
              nameRule.test(name) &&
              phoneRule.test(phone) &&
              emailRule.test(email)) {
            try {
              const result = await axios.post(`${API_URL}/users`, {
                type: type,
                user_id: id,
                pw: pw,
                name: name,
                phone: phone,
                email: email,
                birth: birth,
                sex: sex,
                allTermsChecked: allChecked ? "True" : "False"
              });
              console.log(result);
              setIsSubmitted(true);
              setIsRegistered(true);
              setStep(prevStep => {
                const nextStep = Math.min(prevStep + 1, 3);
                navigate(`/signup?step=${nextStep}`);
                return nextStep;
              });
              console.log('회원가입을 축하합니다.');
            } catch (err) {
              console.error(err);
              setIsSubmitted(true);
              setIsRegistered(false);
            }
          } else {
            console.log('회원정보를 모두 입력해주세요');
          }
        }
      };
  return (
    <div className="signupContainer">
            {step !== 3 && (
                <ul className="step_bar">
                        <li className={`step step1 ${step === 1 ? "on" : ""}`}>
                        <div className="step_circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25">
                            <path d="M1.33194 8.60033C1.76135 8.60033 1.99607 8.3494 1.99607 7.9207V4.66639C1.99607 3.12797 2.80132 2.33457 4.31818 2.33457H7.61557C8.04499 2.33457 8.29631 2.09651 8.29631 1.67458C8.29631 1.24587 8.04499 1.00781 7.61557 1.00781H4.28191C1.8943 1.00781 0.664062 2.22246 0.664062 4.59257V7.9207C0.664062 8.3494 0.90252 8.60033 1.33194 8.60033ZM23.9963 8.60033C24.4325 8.60033 24.6641 8.3494 24.6641 7.9207V4.59257C24.6641 2.24818 23.4407 1.00781 21.0462 1.00781H17.7126C17.2832 1.00781 17.0319 1.24587 17.0319 1.67458C17.0319 2.09651 17.2832 2.33457 17.7126 2.33457H21.0099C22.4821 2.33457 23.3321 3.12797 23.3321 4.66639V7.9207C23.3321 8.3494 23.5736 8.60033 23.9963 8.60033ZM4.28191 24.9681H7.61557C8.04499 24.9681 8.29631 24.727 8.29631 24.2984C8.29631 23.8763 8.04499 23.6383 7.61557 23.6383H4.31818C2.80132 23.6383 1.99607 22.845 1.99607 21.3065V18.0522C1.99607 17.6234 1.75762 17.3725 1.33194 17.3725C0.898782 17.3725 0.664062 17.6234 0.664062 18.0522V21.3803C0.664062 23.7505 1.8943 24.9681 4.28191 24.9681ZM17.7126 24.9681H21.0462C23.4407 24.9681 24.6641 23.7278 24.6641 21.3803V18.0522C24.6641 17.6234 24.4256 17.3725 23.9963 17.3725C23.5669 17.3725 23.3321 17.6234 23.3321 18.0522V21.3065C23.3321 22.845 22.4821 23.6383 21.0099 23.6383H17.7126C17.2832 23.6383 17.0319 23.8763 17.0319 24.2984C17.0319 24.727 17.2832 24.9681 17.7126 24.9681Z"/>
                            <path d="M8.99537 20.8026H16.7778C18.2423 20.8026 18.988 20.041 18.9819 18.5917V11.9681H13.4171C12.5863 11.9681 12.1274 11.5033 12.1274 10.6677V5.125H8.99537C7.55046 5.125 6.78516 5.8867 6.78516 7.33597V18.5917C6.78516 20.0477 7.54438 20.8026 8.99537 20.8026ZM13.645 10.9465H18.8842C18.8473 10.7332 18.675 10.5131 18.4304 10.2592L13.8294 5.66267C13.5848 5.41853 13.3583 5.25263 13.1439 5.21571V10.453C13.1439 10.7871 13.3036 10.9465 13.645 10.9465Z"/>
                            </svg>
                            <p>STEP1</p>
                        </div>
                        <p className="step_name">약관동의</p>
                    </li>
                    <li className={`step step2 ${step === 2 ? "on" : ""}`}>
                        <div className="step_circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="15" viewBox="0 0 20 15" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.6992 12.0359C14.6992 13.3697 15.7655 13.3077 16.2685 13.3697V14.1543H11.5608V13.3697C12.0637 13.3085 13.13 13.3697 13.13 12.0359V2.14971C13.13 0.815865 12.0637 0.877065 11.5608 0.815865V0.03125H16.2685V0.815865C15.7655 0.877065 14.6992 0.815865 14.6992 2.14971V12.0359ZM16.2685 2.3851V3.95433H17.8377V10.2313H16.2685V11.8005H19.4069V2.3851H16.2685ZM2.1454 10.2313V3.95433H11.5608V2.3851H0.576172V11.8005H11.5608V10.2313H2.1454Z"/>
                            </svg>
                            <p>STEP2</p>
                        </div>
                        <p className="step_name">정보입력</p>
                    </li>
                    <li className={`step step3 ${step === 3 ? "on" : ""}`}>
                        <div className="step_circle">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.8192 9.64789L15.7043 8.54315L10.9142 13.4211L8.49917 11.1167L7.40385 12.2442L10.9346 15.6329L16.8192 9.64789ZM11.9154 2.67188C10.0532 2.67188 8.23283 3.22408 6.68448 4.25865C5.13613 5.29323 3.92934 6.76371 3.21671 8.48415C2.50408 10.2046 2.31762 12.0977 2.68092 13.9241C3.04421 15.7505 3.94094 17.4282 5.25771 18.7449C6.57447 20.0617 8.25213 20.9584 10.0785 21.3217C11.9049 21.685 13.7981 21.4986 15.5185 20.7859C17.2389 20.0733 18.7094 18.8665 19.744 17.3182C20.7786 15.7698 21.3308 13.9494 21.3308 12.0873C21.3308 9.59014 20.3388 7.1953 18.5731 5.42958C16.8073 3.66385 14.4125 2.67188 11.9154 2.67188ZM11.9154 4.24111C13.4672 4.24111 14.9842 4.70127 16.2745 5.56342C17.5648 6.42557 18.5704 7.65097 19.1643 9.08467C19.7581 10.5184 19.9135 12.096 19.6108 13.618C19.308 15.14 18.5608 16.538 17.4635 17.6353C16.3662 18.7326 14.9681 19.4799 13.4461 19.7827C11.9241 20.0854 10.3465 19.93 8.9128 19.3362C7.4791 18.7423 6.2537 17.7366 5.39155 16.4463C4.5294 15.1561 4.06923 13.6391 4.06923 12.0873C4.07152 10.007 4.8989 8.01266 6.36984 6.54171C7.84079 5.07077 9.83516 4.24339 11.9154 4.24111Z"/>
                            </svg>
                            <p>STEP3</p>
                        </div>
                        <p className="step_name">가입완료</p>
                    </li>
                </ul>
            )}
                {step === 1 && (
                    <form id="input_form" action="#" method="post" name="signup" onSubmit={handleSubmit}>
                    <fieldset className="signup__area">
                        <ul className="terms_section">
                        <li className="terms">
                            <input type="checkbox" id="checkAll" className="check_style"
                            checked={allChecked}
                            onChange={handleAllChecked}
                            />
                            <label htmlFor="checkAll">
                                <span className="chk"></span>
                                <span className="checkAll terms_title">
                                Starbucks Korea 홈페이지 이용약관 및 개인정보 수집 및 이용,
                                스타벅스 카드 이용약관, 마케팅 활용 수집 <pre/> · 이용(선택)에 모두
                                동의합니다.
                                </span>
                            </label>
                        </li>
                        <hr />
                        <li className="terms">
                            <input type="checkbox" id="termscheck" className="check_style"
                            checked={termsChecked}
                            onChange={() => setTermsChecked(!termsChecked)}
                            />
                            <label htmlFor="termscheck">
                                <span className="chk"></span>
                                <span className="terms_title">
                                <strong>[필수]</strong> 홈페이지 이용약관 동의
                                </span>
                            </label>
                            <div className="terms_scroll_box">
                                <ul className="pri_terms_wrap">
                                    <li className="pri_tit">
                                        스타벅스 코리아는 고객님을 보호합니다. <br/>
                                        본 약관은 스타벅스 코리아의 홈페이지 서비스 이용과 관련하여 필요한 사항을 규정합니다.
                                    </li>
                                    <li>
                                        <p className="pri_tit">제1장 총칙</p>
                                        <ol className="pri_con">
                                            <li>
                                            <p className="sub_tit">제 1 조 목적</p>
                                            <ol className="mb40">
                                                <li>1. 스타벅스 코리아를 운영하는 주식회사 에스씨케이컴퍼니(이하 '회사'라고 합니다)에서 운영하는 홈페이지 (https://www.starbucks.co.kr/, 이하 “홈페이지”라고 합니다)는 아래와 같은 약관에 동의하는 이용자들에게 제공되는 인터넷서비스로, 본 약관은 이용자와 회사 사이에 본 홈페이지 이용에 관한 권리 및 의무를 규정하는 것을 목적으로 합니다.</li>
                                                <li>2. 홈페이지의 모든 자료는 Starbucks Corporation 및 자회사, 계열사 혹은 Starbucks Corporation에 의해 자격을 취득한 기타 이해 관계자에 의한 저작권, 등록의장, 등록상표 또는 기타 지적소유권으로 보호되고 있습니다.</li>
                                                <li>3. 본 홈페이지에 포함된 자료는 이용자에게 정보 제공을 위한 목적으로만 제공됩니다. 이용자는 본 홈페이지의 내용에 대하여 어떤 방법으로도 배포, 출판, 전송, 변경, 전시, 모방작품의 창조 혹은 개발할 수 없습니다. 이용자는 회사의 권한을 보호하여야 하고, 본 홈페이지의 자료를 허가 없이 유용할 수 없습니다. 허가 없이 본 홈페이지의 내용을 유용하는 경우에 회사와 Starbucks Corporation은 이용자에게
                                                    법적, 재정적으로 가능한 기타 추가적인 배상을 청구할 수 있습니다.</li>
                                                <li>4. 이용자가 제출하는 자료의 내용에 대한 책임은 전적으로 이용자에게 있습니다. 이용자가 제출하는 자료에 불법, 중상모략, 비난 혹은 비도덕적인 내용이 포함되어서는 안됩니다. 이용자는 본 홈페이지에 저작권, 등록상표권, 사생활권 혹은 기타 사적 권리 혹은 소유권을 포함하는 제3자의 권리를 침해하는 어떤 자료도 게시하여서는 안됩니다.</li>
                                                <li>5. 이용자의 개인정보 보호 및 보안, 개인정보에 대한 수집, 이용 및 저장과 관련한 관행 및 정책에 대하여는 회사의 개인정보 처리방침에 의합니다. 개인정보 처리방침은 홈페이지에 별도 게시하고 있습니다.</li>
                                            </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit" id="quick_01_02">제 2 조 용어의 정의</p>
                                                <ol className="mb40">
                                                    <li>본 약관에서 사용하는 용어는 다음과 같이 정의합니다.</li>
                                                    <li>1. “이용자”란 홈페이지에 접속하여 홈페이지를 이용하는 회원 및 비회원을 말합니다.</li>
                                                    <li>2. '회원”이란 홈페이지에 접속하여 본 약관에 따라 회사 인터넷 회원으로 가입하여 홈페이지가 제공하는 서비스를 받는 자를 말하고, “비회원”이란 회원이 아닌 자를 말합니다.</li>
                                                    <li>3. 회원이 소지한 Starbucks Card를 등록하면 “스타벅스 리워드 회원”이 됩니다. 본 약관에서 별도로 정한 사항이 없다면, “스타벅스 리워드 회원”의 권한 및 이용과 관련한 규정은 “스타벅스 카드 이용약관”에 따릅니다.</li>
                                                    <li>4.”e-프리퀀시 바코드”란 회원 가입 시 회원의 계정에 자동으로 발급되는 온라인 적립 수단이며, e-프리퀀시 이벤트 진행 시, 등록된 e-프리퀀시 바코드에 e-스티커를 적립하여 관련 혜택을 받을 수 있습니다.</li>
                                                    <li>5. “스타벅스 모바일 애플리케이션”이란 회사가 모바일 및 휴대용 기기 등을 통하여 제공하는 앱을 말합니다.</li>
                                                    <li>6. '사이렌 오더 서비스'란 회사가 스타벅스 모바일 애플리케이션을 통해 회원이 주문할 매장을 선택하여 주문 가능 메뉴를 확인하고 다양한 결제수단으로 주문 및 예약할 수 있는 전자상거래 서비스를 말합니다.</li>
                                                    <li>7. “사이렌오더”란 회원이 사이렌 오더 서비스를 통하여 회사의 다양한 메뉴를 매장별 실시간 주문 가능 수량을 확인하여 선결제한 후, 나의 위치정보(GPS, 고주파 등 이용)를 기반으로 2km 내 매장에 주문을 전송을 하는 것을 말합니다.</li>
                                                    <li>8. “홀케이크 선물/예약”이란 회원이 사이렌 오더를 통해 홀케이크를 선결제 하고, 지정한 매장에서 지정한 날짜에 “홀케이크 모바일 교환권”으로 수령하는 주문 유형을 말합니다. “선물”이란 회원이 “예약”한 “홀케이크 모바일 교환권”을 휴대폰 MMS 전송 방법을 통해 선물할 수 있는 서비스를 말합니다.</li>
                                                    <li>9. “홀케이크 모바일 교환권”이라 함은 “홀케이크”가 화체된 모바일용 쿠폰으로서, “홀케이크 모바일 교환권” 내에 명시된 교환 조건에 따라 해당 상품으로 교환할 수 있으며, 현금 및 다른 상품으로 대체 수령은 불가합니다. “홀케이크 모바일 교환권”의 수신자라 함은 “홀케이크 모바일 교환권”을 회원으로부터 전송 받은 자를 말합니다.</li>
                                                    <li>10. “스타벅스 모바일 상품권 서비스”란 회원이 스타벅스 모바일 애플리케이션 및 기타 유무선 인터넷 플랫폼을 통해 스타벅스 모바일 상품권을 구매하고, 구매한 스타벅스 모바일 상품권을 모바일 단말기를 통해 타인 또는 본인에게 전송할 수 있도록 하며, 스타벅스 모바일 상품권의 소지자에게 명시된 조건에 따라 회사의 상품으로의 교환을 허용하기 위해 회사가 제공하는 서비스를 말합니다.</li>
                                                    <li>11. “스타벅스 모바일 상품권”이란 회원이 휴대전화 등을 이용하여, 회사가 판매하는 일정 상품의 종류, 금액, 수량의 교환 권리를 전자적 증서 형태로 구매한 후 본인 또는 타인에게 전송하고, 본 증서의 소지자가 회사에게 제시하는 경우 그 증표에 명시된 조건에 따라 상품을 제공 받을 수 있는 교환권을 말합니다.</li>
                                                    <li>12. “구매자”란 스타벅스 모바일 애플리케이션 및 기타 유무선 인터넷 플랫폼을 이용하여 “스타벅스 모바일 상품권”을 결제 및 구매한 자를 말하며, “소지자”란 구매된 “스타벅스 모바일 상품권”을 소지하고 있거나 또는 스타벅스 모바일 애플리케이션 및 기타 유무선 인터넷 플랫폼에 등록하여 소지하고 있는 자를 말합니다.</li>
                                                    <li>13. “사용처”란 회사가 운영하는 매장 중 “스타벅스 모바일 상품권”을 사용할 수 있는 매장을 말합니다.</li>
                                                    <li>14. “Delivers 서비스”란 회원이 스타벅스 모바일 애플리케이션을 통해 회원이 지정한 주소로 주문 가능한 상품 등을 배달 받는 서비스를 말합니다.</li>
                                                    <li>15. “에코매장”이란 일회용컵 사용 절감을 목적으로 이용자가 음료 외부 반출을 희망하는 경우 보증금을 지불 시 기존 매장에서 제공되던 일회용컵 대신 리유저블컵으로 음료를 제공하며, 리유저블컵을 반납 시 보증금을 환급해주는 매장을 말합니다.</li>
                                                    <li>16. “스타벅스 모바일 카드”란 회원이 휴대전화 등을 이용하여, 회사가 판매하는 일정 금액의 교환 권리를 전자적 증서 형태로 구매한 후 본인 또는 타인에게 전송하고, 본 증서의 소지자가 회사에게 제시하는 경우 그 증표에 명시된 조건에 따라 상품을 제공받을 수 있는 교환권을 말합니다. '스타벅스 모바일 카드'를 스타벅스 모바일 애플리케이션에 등록하는 경우 Starbucks Card로 사용할 수 있으며, 본 약관에서 별도로 정한 사항이 없다면 이용에 관한 규정은 '스타벅스 카드 이용약관'에 따릅니다.</li>
                                                    <li>17. “온라인 스토어”란 스타벅스 모바일 애플리케이션을 통해 제공하는 전자상거래 서비스를 말합니다.</li>
                                                    <li>18. “온라인 스토어”의 “구매자”란 스타벅스 모바일 애플리케이션에서 판매하는 상품 등을 구매하여 배송을 받는 회원을 말하며, “수신자”란 상품을 구매한 회원으로부터 해당 상품을 선물 받은 회원 또는 비회원을 말합니다.</li>
                                                    <li>19. “단체 주문 배달 서비스”란 회원이 스타벅스 홈페이지를 통해 회원이 지정한 주소로 주문 가능한 상품 등을 배달 받는 서비스를 말합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit" id="quick_01_03">제 3 조 약관의 효력 및 개정 등</p>
                                                <ol className="mb40">
                                                    <li>1. 본 약관은 그 내용을 회사가 홈페이지에 게시하고, 회원이 홈페이지 회원가입 시 본 약관에 동의함으로써 그 효력이 발생합니다.</li>
                                                    <li>2. 본 약관과 스타벅스 카드 이용약관의 내용상 충돌이 있을 경우 스타벅스 카드 이용약관이 우선합니다.</li>
                                                    <li>3. 회사는 본 약관을 변경할 수 있으며 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 홈페이지에 그 적용일의 7일전부터 공시하거나 회원이 입력한 가장 최근의 이메일로 전송하는 방법으로 회원에게 고지합니다. 다만, 회원에게 불리한 내용으로 약관을 개정하는 경우에는 적용일로부터 30일 전까지 홈페이지에 공시하고 회원이 입력한 가장 최근의 이메일로 전송하는 방법으로 회원에게 고지합니다.</li>
                                                    <li>4. 변경된 약관은 공시하거나 고지한 적용일로부터 효력이 발생합니다.</li>
                                                    <li>5. 회원이 변경된 약관 사항에 동의하지 않을 경우, 약관의 효력 발생 전일까지 서비스 이용을 중단하거나 회원 탈퇴를 할 수 있으며, 약관의 개정과 관련하여 효력 발생일 전일까지 이의를 제기하지 않는 경우에는 개정된 약관에 동의한 것으로 간주합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_02">제 2장 회원 관리 및 서비스</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_02_01" className="sub_tit">제 4 조 회원 ID와 비밀번호</p>
                                                <ol className="mb40">
                                                    <li>1. 회원 가입은 무료입니다. 다만, 14세 미만인 자는 회원으로 가입할 수 없습니다.</li>
                                                    <li>2. 회원ID(계정)는 1인당 1개의 ID만 생성 및 등록이 가능하며, ID생성을 위해 필요한 개인정보를 허위로 제공하거나, 본인이 아닌 타인의 정보를 무단으로 사용하여 회원ID를 만들 수 없습니다. 이를 위반할 경우, 회원에게 제공되는 서비스의 제한이 있을 수 있으며, 본 약관 각 조항에서 정하고 있는 불이익을 받을 수 있습니다.</li>
                                                    <li>3. 회원 가입 시, e-프리퀀시 바코드가 회원계정으로 발급되며, e-프리퀀시 이벤트 기간 일 경우 해당 바코드로 e-프리퀀시 이벤트 참여가 가능합니다.</li>
                                                    <li>4. 회원에게 부여된 회원번호(ID) 및 비밀번호의 관리소홀, 부정사용에 의하여 발생하는 모든 결과에 대한 책임은 회원에게 있습니다.</li>
                                                    <li>5. 회원 자신의 ID가 부정하게 사용된 경우 해당 회원은 반드시 회사에 그 사실을 지체 없이 통보하여 조치를 받아야 하며, 통보의 지연으로 인해 발생하는 손해는 회사가 책임지지 않습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_02" className="sub_tit">제 5 조 회원 정보</p>
                                                <ol className="mb40">
                                                    <li>회원은 가입 시 기재하는 이름을 포함한 모든 정보에 실명 등 사실에 기초한 정보를 기재하여야 합니다. 실명이나 실제 정보를 입력하지 않은 회원은 법적인 보호를 받을 수 없으며 회사로부터 서비스 이용 제한 등의 조치를 받을 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_03" className="sub_tit">제 6 조 본인 인증 서비스</p>
                                                <ul className="mb40">
                                                    <li>1. 회사는 전기통신사업법 제84조의2에 따라 발신번호의 변조 방지를 위해 번호인증을 통한 발신번호 사전 등록서비스를 제공 및 운영합니다.</li>
                                                    <li>2. 회사는 이용자의 회원가입 시 타인의 명의를 도용한 부정가입을 방지하기 위해 본인인증 서비스 사업자가 제공하는 인증방법을 통해 본인인증서비스를 제공 및 운영합니다.</li>
                                                    <li>3. 회사는 회원을 보호하기 위하여 보안 및 인증수단을 회사 보안 정책에 따라 시행 및 변경할 수 있습니다.</li>
                                                    <li>4. 회사는 회원의 발신번호 사전등록 및 본인 인증 절차를 거친 후 스타벅스 모바일 카드 및 e-Coupon 선물하기 서비스를 제공하여야 합니다.</li>
                                                    <li>5. 본인 인증 서비스에 대한 동의 거부 시, 회원 가입이 불가하며, 스타벅스 모바일 카드 및 e-Coupon 선물하기 서비스를 이용할 수 없습니다.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <p id="quick_02_04" className="sub_tit">제 7 조 회원 등록정보의 이용</p>
                                                <ul className="mb40">
                                                    <li>1. 회사는 회원 등록정보를 집단적인 통계치 형태로 사용할 수 있습니다.</li>
                                                    <li>2. 회사는 관련 법령에 따른 경우를 제외하고는 회원의 동의 없이 회원 정보를 공개하지 않습니다.</li>
                                                    <li>3. 회사는 회원이 회사의 권리를 침해하거나 기타 불법행위를 하는 경우, 정당한 법 절차에 따라 회원의 정보를 이용할 수 있습니다.</li>
                                                    <li>4. 회사는 수사기관이 수사와 관련하여 정당한 법 절차에 따라 회원의 정보를 요구하는 경우에는 이에 응하여 회원의 등록 정보를 수사기관에 제공할 수 있습니다.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <p id="quick_02_05" className="sub_tit">제 8 조 회사 서비스에 포함된 회원 게시물의 관리</p>
                                                <ol className="mb40">
                                                    <li>1. 회원이 홈페이지를 이용하여 홈페이지에 게시한 부호ㆍ문자ㆍ음성ㆍ음향ㆍ화상ㆍ동영상 등의 정보 형태의 글, 사진, 동영상 및 각종 파일과 링크 등 '게시물'의 저작권은 적법한 저작권자에게 귀속됩니다.</li>
                                                    <li>2. 회원이 홈페이지를 이용하는 경우, 회사는 회원의 프로필 사진 및 게시물(예: 캘린더 상 직접 입력 정보, 리뷰, 댓글 등)을 회원 서비스 화면에 표시할 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, 회원은 언제든지 고객센터 또는 홈페이지 내 관리기능을 통해 해당 게시물에 대해 삭제, 비공개 등의 조치를 취할 수 있습니다.</li>
                                                    <li>3. 회사는 회원의 게시물을 소중하게 생각하며 게시물이 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호합니다. 그러나 회원의 게시물이 '정보통신망법' 및 '저작권법' 등 관련법에 위반되는 내용을 포함하는 경우, 권리자는 관련법이 정한 절차에 따라 해당 게시물의 게시 중단 및 삭제 등을 요청할 수 있으며, 회사는 관련법에 따라 조치를 취하여야 합니다.</li>
                                                    <li>4. 회사는 전항에 따른 권리자의 요청이 없는 경우라도 권리 침해가 인정될 만한 사유가 있거나 기타 회사 정책 및 관련법에 위반되는 경우에는 관련법에 따라 해당 '게시물'에 대해 임시 조치 등을 취할 수 있습니다.</li>
                                                    <li>5. 회사는 바람직한 게시판 문화를 활성화하기 위하여 동의 없는 타인의 신상 공개 시 특정부분을 삭제하거나 기호 등으로 수정하여 게시할 수 있습니다.</li>
                                                    <li>6. 게시물에 관련된 제반 권리와 책임은 작성자 개인에게 있습니다. 또 게시물을 통해 자발적으로 공개된 정보는 보호받기 어려우므로 정보 공개 전에 심사숙고 하시기 바랍니다.</li>
                                                    <li>7. 가입 해지 시 회원께서 작성하신 게시물은 자동으로 파기됩니다. 보관을 원하시는 게시물은 미리 회원의 컴퓨터에 저장하셔야 합니다.</li>
                                                    <li>8. 일부 정보는 정당한 사유 또는 목적이 달성되는 등의 경우 삭제될 수 있으며 이러한 사유발생 시 별도 안내 및 적정 절차를 거쳐 삭제 조치될 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_06" className="sub_tit">제 9 조 휴면계정 관리</p>
                                                <ul className="mb40">
                                                    <li>1. 회사는 회원이 12개월 이상 로그인 하지 않으면, 휴면계정으로 간주하고 회사가 제공하는 서비스 이용을 아래와 같이 제한/상실시킬 수 있습니다.</li>
                                                    <li>2. 12개월 이상 서비스에 로그인하지 않는 경우에는 휴면계정으로 별도 관리되어 웹서비스 이용이 중단되며, 이후 다시 서비스를 이용하려면 본인확인 절차를 거쳐야 합니다. 회사는 휴면계정 전환 30일 전 회원이 등록한 가장 최근의 이메일로 휴면계정 전환 예정 통지를 합니다.</li>
                                                    <li>3. 스타벅스 리워드 회원은 제2항에도 불구하고, 홈페이지 또는 스타벅스 모바일 애플리케이션에 12개월 이상 로그인 하지 않고, 계정에 등록된 Starbucks Card로 12개월 이상 거래내역(충전, 결제 등)이 없는 경우 휴면계정으로 구분됩니다.</li>
                                                    <li>4. 회원이 스타벅스 카드 이용약관 제14조에 명시된 제휴신용카드 신청을 위해 본인 인증절차를 진행할 경우에는 더 이상 휴면계정으로 관리되지 않으며 다시 서비스 이용이 가능합니다. 또한 제휴신용카드 이용 회원이 제휴신용카드 사용을 통해 별 적립을 하는 경우 휴면계정으로 관리되지 않습니다.</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <p id="quick_02_07" className="sub_tit">제 10 조 회원 탈퇴</p>
                                                <ol className="mb40">
                                                    <li>
                                                        1. 회원은 탈퇴를 희망하는 경우, “My Starbucks” 페이지에서 “회원 탈퇴” 버튼을 사용하여 탈퇴 신청을 합니다.
                                                        <ol>
                                                            <li>가. 스타벅스 기명식 선불 충전카드를 보유한 회원의 카드가 잔액이 남아 있고 정지 상태에 있는 회원의 경우, Starbucks Card에 잔액이 없거나 잔액이 있는 Starbucks Card가 모두 등록 해지된 후에 탈퇴할 수 있습니다.</li>
                                                            <li>나. 아직 수령 전인 사이렌 오더 홀케이크 예약 건이 있을 경우, 수령 처리를 완료 후 탈퇴할 수 있습니다.</li>
                                                            <li>다. 스타벅스 e-프리퀀시 이벤트 기간 중 탈퇴 시에는 적립된 e-스티커가 모두 소멸되며 재가입 시 소멸된 e-스티커는 복원되지 않습니다.</li>
                                                            <li>라. “온라인 스토어”의 진행 중인 주문 내역 등이 있는 경우, 배송완료일로부터 9일 이후 회원 탈퇴가 가능합니다.</li>
                                                            <li>마. “단체 주문 배달 서비스”의 진행 중인 예약 주문 건이 있는 경우, 배달 완료 후 탈퇴할 수 있습니다.</li>
                                                            <li>바. 스타벅스의 승인을 받아 신세계 유니버스 클럽 서비스에 가입한 회원의 경우, 신세계 유니버스 클럽 서비스에 대한 청약철회 또는 이용계약 해지 후 탈퇴할 수 있습니다. 회원 탈퇴를 진행하는 경우 신세계 유니버스 클럽 서비스 이용계약 해지를 우선 진행하도록 안내됩니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>2. 회원 재가입은 회원이 가입 후 탈퇴, 재가입 등을 반복함으로써 회사가 제공하는 쿠폰, 이벤트 혜택 등 경제상의 이익을 취하거나 기타 명의도용 등의 불법적인 행위 등을 방지하기 위하여, 회원 탈퇴를 한 날로부터 30일이 경과한 경우에 가능합니다.</li>
                                                    <li>
                                                        3. 회원이 다음 각 호의 사유에 해당하는 경우, 회사는 회원자격을 제한 또는 정지시킬 수 있고, 14일의 기간을 정하여 시정하거나 소명할 기회를 부여한 뒤, 회원의 소명이 없거나 그 소명이 정당하지 아니한 경우 회원자격을 박탈할 수 있습니다.
                                                        <ol>
                                                            <li>가. 타인의 회사 이용을 방해하거나 그 정보를 도용하는 등 전자거래질서를 위협하는 경우</li>
                                                            <li>나. 회원 가입 시 허위 내용의 등록 및 타인의 정보 도용</li>
                                                            <li>다. 관계 법령을 위배하거나 미풍양속을 저해하고자 하는 목적으로 회원 가입신청을 할 경우</li>
                                                            <li>라. 회사 서비스 이용과 관련하여 법령, 본 약관 또는 공서양속에 반하는 행위를 하는 경우</li>
                                                            <li>마. 회사 또는 기타 제3자의 권리를 침해하거나 도용하였을 경우</li>
                                                            <li>바. 회사 또는 기타 제3자에 대해 명예 또는 신용 훼손,  폭언, 폭행, 성적 언행 등 부적절한 행위를 하거나 업무를 방해하는  행위</li>
                                                            <li>사. 구매상품을 정당한 이유 없이 상습적으로 취소 또는 반품(환불)하는 등의 방법으로 회사의 업무를 현저히 방해하는 경우</li>
                                                            <li>아. 재판매 목적으로 상품 등을 대량으로 중복 구매하여 다른 이용자의 구매 기회를 제한하는 등 공정한 거래질서를 현저히 방해하는 경우</li>
                                                            <li>자. 상품 구매 및 서비스 이용 시 정상적인 거래 범위를 현저히 이탈하여 오남용하는 경우 </li>
                                                            <li>차. 사기 등 불법 또는 부정한 방법으로 서비스를 이용한 경우</li>
                                                            <li>카. 기타 회원으로서의 자격을 지속시키는 것이 객관적으로 부적절하다고 판단되는 경우</li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_08" className="sub_tit">제 11 조 서비스의 중단</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 컴퓨터 등 정보통신설비의 보수 점검 교체 및 고장, 통신의 두절, 기타 불가항력적 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있습니다.</li>
                                                    <li>2. 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 아니합니다. 단 회사의 고의 또는 과실이 있는 경우에는 그러하지 아니합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_09" className="sub_tit">제 12 조 회원에 대한 통지</p>
                                                <ol className="mb40">
                                                    <li>1. 회사가 회원에 대한 통지를 하는 경우 본 약관에 별도 규정이 없는 한 문자메시지(SMS), 모바일 애플리케이션 푸쉬, 이메일 등으로 할 수 있습니다.</li>
                                                    <li>2. 회사는 회원 전체에 대한 통지의 경우 7일 이상 회사의 게시판에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별통지를 합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_10" className="sub_tit">제 13 조 정보의 제공 및 광고의 게재</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 회원이 서비스 이용 중 필요하다고 인정되는 다양한 정보를 공지사항이나 문자메시지(SMS), 모바일 애플리케이션 푸쉬, 이메일 등의 방법으로 회원에게 제공할 수 있습니다. 다만, 회원은 관련법에 따른 거래관련 정보 및 고객문의 등에 대한 답변 등을 제외하고는 언제든지 이메일 등에 대해서 수신 거절을 할 수 있습니다.</li>
                                                    <li>2. 제1항의 정보를 문자메시지(SMS), 모바일 애플리케이션 푸쉬, 이메일 등을 통하여 전송하려고 하는 경우에는 회원의 사전 동의를 받아서 전송합니다. 다만, 회원의 거래관련 정보 및 고객문의 등에 대한 회신에 있어서는 그러하지 않습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_11" className="sub_tit">제 14 조 업무의 제휴</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자의 편의를 도모하고 효과적인 서비스 운영을 위해 서비스의 일정 부분에 대해 다른 회사와 제휴할 수 있습니다.</li>
                                                    <li>2. 제휴회사가 서비스와 관련하여 진행한 활동은 회사가 직접 시행한 활동에 준하는 효력이 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_02_12" className="sub_tit">제 15 조 이벤트 참여</p>
                                                <ol className="mb40">
                                                    <li>1. 회원의 경우, e-프리퀀시 바코드가 자동 발급됩니다.</li>
                                                    <li>2. 회사에서 프리퀀시 이벤트가 진행되는 기간 동안, 회원 가입 시 자동으로 발급된 e-프리퀀시 바코드에 회사에서 정한 적립 기준에 따라 “e-스티커”를 적립할 수 있습니다.</li>
                                                    <li>3. e-프리퀀시 바코드의 구체적인 운영 방침이나 활용 방법 및 혜택은 회사의 마케팅 정책에 따라 변경될 수 있으며, 이에 대해서는 별도의 방법으로 사전에 안내해 드립니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_03">제 3 장 사이렌 오더 서비스</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_03_01" className="sub_tit">제 16 조 적용범위</p>
                                                <ol className="mb40">
                                                    <li>회원은 스타벅스 모바일 애플리케이션을 통해 제공하는 사이렌 오더 서비스를 이용할 수 있으며, 본 장의 규정은 사이렌 오더 서비스를 이용하는 회원들에게 적용됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_03_02" className="sub_tit">제 17 조 제공되는 사이렌 오더 서비스</p>
                                                <ol className="mb40">
                                                    <li>회사가 제공하는 사이렌 오더 서비스는 다음 각 호와 같습니다.</li>
                                                    <li>
                                                        가. 스타벅스 모바일 애플리케이션을 통한 결제 및 주문 서비스
                                                        <ol>
                                                            <li>① 스타벅스 모바일 애플리케이션을 통하여 회원과 회사간에 상품 등의 매매가 이루어질 수 있도록 온라인 거래 장소를 제공</li>
                                                            <li>② 매장별 실시간 주문 가능 수량을 확인하여 2km 반경 내 매장에 상품 등을 주문 및 결제</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        나. 회원 맞춤형 서비스
                                                        <ol>
                                                            <li>① 저장된 나만의 음료 및 푸드 중 가장 즐겨 찾는 메뉴는 My favorites로 등록</li>
                                                            <li>② 매장을 내 위치 정보에 따라 설정하는 서비스 </li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        다. 예약 및 선물하기 서비스
                                                        <ol>
                                                            <li>① 회원이 원하는 날짜에 원하는 매장에서 주문한 상품을 수령할 수 있도록 하는 모바일 주문 예약 서비스, 단 예약 가능한 상품은 회사의 정책에 따라 변동될 수 있음</li>
                                                            <li>② 회원이 예약한 상품의 홀케이크 모바일 교환권을 휴대폰 MMS 전송으로 선물하는 기능</li>
                                                        </ol>
                                                    </li>
                                                    <li>라. 기타 회사가 사이렌 오더 서비스 제공을 위하여 회원의 편의성을 향상시킨다고 판단하여 제공하는 일체의 서비스</li>

                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_03_03" className="sub_tit">제 18 조 사이렌 오더 서비스의 이용 및 변경</p>
                                                <ol className="mb40">
                                                    <li>1. 사이렌 오더 주문 전송 가능 시간은 각 매장별로 상이할 수 있으며, 매장 상황에 따라 변경될 수 있습니다. 회사는 사이렌 오더 주문 전송 가능 시간을 회사의 홈페이지 또는 모바일 애플리케이션에 공지하여 정할 수 있습니다.</li>
                                                    <li>2. 회사는 사이렌 오더 서비스를 일정 범위로 분할하여 각 범위 별로 이용 가능한 시간을 별도로 정할 수 있으며, 이 경우 그 내용을 사이렌 오더 서비스 내 공지사항 등에 관련 내용을 공지합니다.</li>
                                                    <li>3. 상품 등의 품절 또는 사양의 변경 등의 경우에는 상품 등이 제한 또는 변경될 수 있습니다.</li>
                                                    <li>4. 회사는 필요한 경우 상품 등의 제한 또는 변경 사실 및 그 사유를 회원에게 제12조(회원에 대한 통지)에서 정한 방법으로 통지합니다.</li>
                                                    <li>5. 본 조 제4항에서 규정한 상품 등의 제한 또는 변경으로 회원이 손해를 입은 경우, 회사는 회원이 회사의 행위로 손해를 입었음을 입증한 경우 회원에게 실제 발생한 손해를 배상합니다. 다만, 회사가 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_03_04" className="sub_tit">제 19 조 결제 및 주문 취소 등</p>
                                                <ol className="mb40">
                                                    <li>1. 사이렌 오더 서비스 내 판매 상품 등의 주문 요청에 대하여 회사가 주문을 승인함으로써 회사와 회원 사이에 판매 상품 등에 관한 매매계약이 성립합니다.</li>
                                                    <li>
                                                        2. 본 서비스의 결제에 따른 대금 지급 방법은 다음 각호의 방법 중 가능한 방법으로 할 수 있습니다. 회사는 회원의 지급방법에 대하여 어떠한 명목의 수수료도 추가하여 징수하지 않습니다.
                                                        <ol>
                                                            <li>가. Starbucks Card </li>
                                                            <li>나. 신용카드 등의 각종 카드 결제</li>
                                                            <li>다. SSG PAY</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 회원은 상품 등의 구매 시 제2항의 결제 수단을 사용함에 있어 반드시 본인 명의의 결제 수단을 사용하여야 하며, 타인의 결제 수단을 임의로 사용하여서는 안됩니다. 타인의 결제 수단을 임의 사용함으로써 발생하는 회사, 결제 수단의 적법한 소유자, 결제 관련 제3자의 손실과 손해에 대한 책임은 회원에게 있습니다.</li>
                                                    <li>4. 회사는 상품 등의 결제의 취소 및 환불과 관련하여 전자상거래법 등 관계 법령을 준수합니다.</li>
                                                    <li>5. 홀케이크를 비롯하여 회원의 주문에 따라 개별적으로 생산되는 상품 등 또는 이와 유사한 상품 등인 경우에는 전자상거래법 등 관계법령상 청약 철회가 제한될 수 있습니다. 이에 회사는 청약 철회가 제한되는 사실을 개별 상품 등에 대한 안내 또는 결제 화면 등에서 고지하고, 회원이 이에 동의하여야 결제가 가능한 것으로 할 수 있습니다.</li>
                                                    <li>
                                                        6. 제5항의 규정에도 불구하고 다음 각 호의 경우에 회사는 즉시 결제 취소를 위한 조치를 취하여야 하고, 회사가 결제 취소 및 그로 인해 발생한 일체의 비용을 부담합니다.
                                                        <ol>
                                                            <li>가. 제공된 상품 등이 회원이 결제한 상품 등의 내용과 현저히 상이할 경우</li>
                                                            <li>나. 제공된 상품 등이 변질, 손상되는 하자 발생 시</li>
                                                            <li>다. 천재지변 등 특수 상황에 따른 미입고 발생 시</li>
                                                        </ol>
                                                    </li>
                                                    <li>7. 상품 등의 수령 후, 이물질 등 명백한 제조 과정 상의 하자가 확인되는 경우, 회원은 환불 요청을 할 수 있으며, 환불 요청 시 회사는 하자에 대하여 즉시 조치를 취하여야 합니다.</li>
                                                    <li>8. 사이렌 오더 서비스 이용 시, 회원의 귀책 사유로 인한 주문 결제 건에 대한 변경 또는 취소는 결제 및 주문 전송 이후 일체 불가합니다.</li>
                                                    <li>9. 회원이 결제 및 주문 전송 이후 상품을 수령하지 않는 경우, 주문 취소가 받아들여지지 아니할 수 있으며, 이로 인하여 회원에게 발생하는 손해에 대하여 회사는 고의 또는 과실이 없는 한 책임을 부담하지 않습니다. 다만 결제 및 주문 동시에 판매가 완료되는 메뉴인 경우, 매장에서 주문 승인을 하지 않으며, 회원에게 해당 사유가 푸시 알림으로 발송됩니다. 이 경우, 회원은 [히스토리] 메뉴에서 결제 취소하기 기능으로
                                                        즉시 결제를 취소할 수 있고, 그렇지 않으면 익일 (24시간 이내) 자동으로 취소됩니다.</li>
                                                    <li>10. 회원이 홀케이크 수령을 원하는 날짜로부터 3~15일 이전에 주문의 예약/수정/취소가 가능합니다. 단, 화요일에 수령을 원하는 경우에는 전 주 금요일까지 예약/수정/취소 가능하며, 신상품 홀케이크 출시, 공휴일 및 명절 연휴 등에는 예약 가능 일정이 변동될 수 있습니다. 크리스마스 홀케이크, 사이렌 오더 전용 홀케이크 등 일부 시즌 홀케이크의 경우에는 명시된 예약 기간에만 주문 예약/수정/취소가 가능하며, 명시된
                                                        수령 기간에만 수령이 가능합니다. 회사는 이에 대한 사실을 개별 상품 등에 대한 안내 또는 결제 화면 등에서 고지하고, 회원이 이에 동의하여야 결제가 가능한 것으로 할 수 있습니다.</li>
                                                    <li>11. 사이렌 오더 홀케이크 선물/예약 서비스 이용 시, 회원의 귀책 사유로 인한 예약의 변경 또는 취소는 명시된 “수정/취소가능일”까지 가능하며, 회원이 지정한 수령일에 홀케이크 미수령 시, 홀케이크는 당일 매장 영업 마감 시까지 매장에서 보관 후 폐기됩니다. 홀케이크 선물/예약 시 고지한 “수정/취소가능일” 이후에는 일체의 취소 및 환불이 불가합니다.</li>
                                                    <li>12. 사이렌 오더 주문 또는 예약 취소 시, 매장 방문 수령 시 제공되는 방문 별은 제공되지 않습니다. 이로 인하여 회원에게 발생하는 손해에 대하여 회사는 고의 또는 과실이 없는 한 책임을 부담하지 않습니다.</li>
                                                    <li>13. 주문 및 예약 세부 상태 내역은 별첨한 채널을 통해 안내합니다.
                                                        <div className="acco_ToggleWrap login-toggle-wrap">
                                                            <div className="acco_tit_box">
                                                                <input type="checkbox" className="toggle-input" name="toggle-button" id="toggle-1" />
                                                                <label className="taggle-label" for="toggle-1">별첨</label>
                                                                <div className="acco_cont" id="cont1">
                                                                    <p className="pri_cont_tit">주문 / 예약 상태별 알림 세부 내역 안내표</p>
                                                                    <table className="pri_cont_tbl" summary="수집하는 개인정보의 항목">
                                                                        <caption className="hid">수집하는 개인정보의 항목에 대한 테이블</caption>
                                                                        <colgroup>
                                                                            <col width="35%" />
                                                                            <col width="20%" />
                                                                            <col width="15%" />
                                                                            <col width="15%" />
                                                                            <col width="15%" />
                                                                        </colgroup>
                                                                        <thead>
                                                                            <tr>
                                                                                <th rowspan="2" scope="col">사이렌 오더 메뉴 주문</th>
                                                                                <th rowspan="2" scope="col">발행대상</th>
                                                                                <th colspan="3" className="nbr">채널</th>
                                                                            </tr>
                                                                            <tr>
                                                                                <th scope="col">앱 내 [히스토리]화면</th>
                                                                                <th scope="col">LMS<br className="for_mob"/>(SMS)</th>
                                                                                <th scope="col" className="nbr">푸쉬</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>결제 완료</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>주문 요청</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>주문 승인</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"> O </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>준비 완료</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"> O </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>주문 거절</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td className="nbr"> O </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table><br/>
                                                                    <table className="pri_cont_tbl" summary="수집하는 개인정보의 항목">
                                                                        <caption className="hid">수집하는 개인정보의 항목에 대한 테이블</caption>
                                                                        <colgroup>
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                            <col width="11.1%" />
                                                                        </colgroup>
                                                                        <thead>
                                                                            <tr>
                                                                                <th scope="col">구 분</th>
                                                                                <th scope="col">발행시점</th>
                                                                                <th scope="col">발행대상</th>
                                                                                <th scope="col">히스토리</th>
                                                                                <th scope="col">MMS</th>
                                                                                <th scope="col">LMS<br className="for_mob"/>(SMS)</th>
                                                                                <th scope="col">인박스알림</th>
                                                                                <th scope="col">이메일</th>
                                                                                <th scope="col" className="nbr">앱 푸쉬</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>예약 완료</td>
                                                                                <td>최초예약</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td> O </td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>예약 변경</td>
                                                                                <td>수정시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>예약 변경(선물 후)</td>
                                                                                <td>선물 후 수정시</td>
                                                                                <td>선물 수신자</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>결제 취소</td>
                                                                                <td>취소시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>결제 취소(선물 후)</td>
                                                                                <td>선물 후 취소시</td>
                                                                                <td>선물 수신자</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowspan="2" scope="col">선물완료(발주확정 전)</td>
                                                                                <td>선물 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>선물 시</td>
                                                                                <td>선물 수신자</td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>선물거절</td>
                                                                                <td>선물 거절 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>취소가능일 변경안내</td>
                                                                                <td>발주확정일 변경 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>예약확인</td>
                                                                                <td>발주확정일 기준D-1(자동)</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"> O </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>예약확정</td>
                                                                                <td>발주확정일</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td rowspan="2" scope="col">선물완료(발주확정 후)</td>
                                                                                <td>선물 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>선물 시</td>
                                                                                <td>선물 수신자</td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>선물거절</td>
                                                                                <td>발주확정 후 선물 거절 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>매장도착</td>
                                                                                <td>수령일(자동)</td>
                                                                                <td>선물 수신자</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td className="nbr"> O </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>매장도착(선물 시)</td>
                                                                                <td>수령일(자동)</td>
                                                                                <td>선물 수신자</td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>수령완료</td>
                                                                                <td>교환 바코드 스캔/처리 완료 시</td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>결제취소(미입고 하자 반품등)</td>
                                                                                <td> - </td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>기간만료 시</td>
                                                                                <td> - </td>
                                                                                <td>이용자(결제자)</td>
                                                                                <td> O </td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td></td>
                                                                                <td className="nbr"></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_03_05" className="sub_tit">제 20 조 홀케이크 선물하기</p>
                                                <ol className="mb40">
                                                    <li>1. 회원이 예약 완료한 홀케이크는 홀케이크 모바일 교환권 형태로 지정한 홀케이크 수령일 까지 선물 받는 분(이하 “수신자”라고 합니다)의 휴대폰으로 선물발송이 가능합니다.</li>
                                                    <li>2. 홀케이크 모바일 교환권은 회사 대표번호(1522-3232)로 수신자의 단말기에 MMS 형태로 전송되며, 회원 본인에게는 선물할 수 없습니다.</li>
                                                    <li>3. 선물한 교환권은 회수가 불가하며 동일한 휴대폰 번호로 MMS 1회 재전송이 가능합니다.</li>
                                                    <li>4. 선물 발송 이후, 수령 정보(수령 매장/날짜)는 명시된 “수정/취소가능일” 까지 수정 및 취소가 가능합니다. 단, 결제수단/조건, 예약품목, 선물 수신자는 수정이 불가하며, 예약 취소 후 다시 홀케이크 선물/예약을 진행하셔야 합니다. “수정/취소가능일” 이후에는 수정 및 취소가 일체 불가합니다.</li>
                                                    <li>5. 수신자는 선물 받은 홀케이크 모바일 교환권을 MMS 내 거절 링크를 통해 지정된 홀케이크 수령일 까지 거절할 수 있으며, 거절 시, 이에 대한 별도 알림 문자가 회원에게 발송됩니다. 회원은 이를 확인하여, 홀케이크 모바일 교환권으로 직접 수령하거나, 명시된 “수정/취소가능일” 전에 수정 또는 취소를 할 수 있습니다.</li>
                                                    <li>6. 번호도용 문자차단/휴대폰 번호 도용방지 서비스에 가입된 휴대폰은 발송 또는 수신이 불가하며, 수신자의 단말기 설정에 따라 MMS 수신이 불가능한 경우 홀케이크 모바일 교환권을 받지 못할 수 있으며 이로 인해 발생된 문제에 대해서는 회사의 귀책사유가 없는 한 회사가 책임지지 않습니다.</li>
                                                    <li>7. 회원은 사이렌 오더 서비스를 상업적으로 이용할 수 없으며, 사이렌 오더 서비스에서 제공된 선물하기 기능이 아닌 다른 방식으로 전달된 홀케이크 모바일 교환권 사용으로 인해 발생된 문제에 대해서는 회사의 귀책사유가 없는 한 회사가 책임지지 않습니다.</li>
                                                    <li>8. 회사는 개인정보 보호 차원에서 선물 수신자의 휴대폰 정보를 발송 후 3개월만 보관하며, 이용목적이 달성된 후에는 회사의 “개인정보 처리방침”에 따라 해당 정보를 지체 없이 파기합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_03_06" className="sub_tit">제 21 조 사이렌 오더 서비스 이용 회원의 혜택</p>
                                                <ol className="mb40">
                                                    <li>1. 스타벅스 리워드 회원의 경우, 사이렌 오더 이용 시 회원 계정으로 영수증 당 1개의 별이 적립되며, 별적립에 관한 구체적인 내용은 “스타벅스 카드 이용약관”이 적용됩니다. 단, 결제 취소 시 별은 적립되지 않습니다.</li>
                                                    <li>2. 제1항에도 불구하고 회원의 고의 또는 과실 없이 회사의 과실 또는 천재지변 등의 특수한 상황에 따라 회원이 상품 등을 수령하지 못하였을 경우, 회사는 회원에게 별 적립 혜택을 제공합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_03">제 4 장 스타벅스 모바일 상품권 서비스</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_04_01" className="sub_tit">제 22 조 적용의 범위</p>
                                                <ol className="mb40">
                                                    <li>본 장의 규정은 스타벅스 모바일 상품권 서비스를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_04_02" className="sub_tit">제 23조 스타벅스 모바일 상품권 서비스 이용에 관한 총칙</p>
                                                <ol className="mb40">
                                                    <li>
                                                        1. 이용의 제한
                                                        <ol>
                                                            <li>가. 회원은 1일부터 말일까지의 결제 승인금액 기준 (구매 및 취소 포함) 최대 월간 50만원을 상한으로 스타벅스 모바일 상품권을 구매 할 수 있습니다.</li>
                                                            <li>
                                                                나. 회사는 다음 각 호에 해당하는 경우 이용자에게 스타벅스 모바일 상품권의 전송을 제한하거나 중단할 수 있습니다.
                                                                <ol>
                                                                    <li>① 문자메시지 발송 관련 설비의 장애 및 보수, 정전, 이용량의 폭주 등 기술상 스타벅스 모바일 상품권 서비스를 제공할 수 없는 경우</li>
                                                                    <li>② 이용자가 타인 명의로 서비스를 이용하는 경우</li>
                                                                    <li>③ 이용자가 회사의 스타벅스 모바일 상품권 서비스 정책 또는 본 약관을 위반하여 서비스를 이용하고자 하는 경우</li>
                                                                    <li>④ 이용자가 스타벅스 모바일 상품권 서비스의 시스템을 무단으로 침범한 경우</li>
                                                                    <li>⑤ 기타 회사가 별도로 정하여 공지한 요건을 충족하지 않은 경우 </li>
                                                                </ol>
                                                            </li>
                                                            <li>다. 본 조에 따라 스타벅스 모바일 상품권 서비스 제한이나 중단이 있을 때에는 회사가 제12조에서 정한 방법으로 회원에게 해당 내용을 통지합니다. 다만, 회사가 통제할 수 없는 사유로 스타벅스 모바일 상품권 서비스가 중단(회사의 고의, 과실이 없는 디스크 장애, 시스템 다운 등)되는 등 미리 통지할 수 없는 상황이 발생했을 때에는 그러하지 않습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        2. 스타벅스 모바일 상품권 서비스의 이용시간
                                                        <ol>
                                                            <li>가. 스타벅스 모바일 상품권 서비스의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 회사의 업무나 기술상의 이유로 스타벅스 모바일 상품권 서비스가 일시 중지될 수 있고, 운영상의 목적으로 회사가 정한 기간에는 스타벅스 모바일 상품권 서비스가 일시 중지될 수 있습니다. 이때 회사는 미리 해당 내용을 공지하며, 부득이하면 사후에 통보할 수 있습니다.</li>
                                                            <li>나. 회사는 스타벅스 모바일 상품권 서비스를 일정 범위로 나누어 범위 별로 이용할 수 있는 시간을 정할 수 있으며, 이 경우 그 내용을 공지합니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 스타벅스 모바일 상품권 서비스 이용에 대한 이용자의 의무와 책임</li>
                                                    <li>회사가 정상적으로 스타벅스 모바일 상품권 서비스를 제공한 경우 스타벅스 모바일 상품권 서비스 이용 시 발생하는 개인 간의 모든 민∙형사상 책임은 이용자에게 있습니다.</li>
                                                    <li>
                                                        4. 발행 및 지급보증
                                                        <ol>
                                                            <li>가. 스타벅스 모바일 상품권 은 전자상거래(결제수단) 보증보험증권에 가입되어 있습니다.</li>
                                                            <li>나. 스타벅스 모바일 상품권 에 대한 정상적인 결제가 완료된 경우 해당 상품권이 발행된 것으로 정하며, 해당 상품권이 발행된 날을 발행일로 정합니다.</li>
                                                            <li>
                                                                다. 회사는 스타벅스 모바일 상품권 의 발행 시 다음 사항을 표시합니다.
                                                                <ol>
                                                                    <li>① 발행자</li>
                                                                    <li>② 구매가격 (할인된 경우 할인율 및 할인금액)</li>
                                                                    <li>③ 유효기간(유효기간이 설정된 경우에 한함)</li>
                                                                    <li>④ 사용조건 (사용가능금액, 제공 물품, 수량 등)</li>
                                                                    <li>⑤ 사용가능 가맹점 </li>
                                                                    <li>⑥ 환불 조건 및 방법</li>
                                                                    <li>⑦ 지급보증 또는 피해보상보험계약 체결에 관한 사항</li>
                                                                    <li>⑧ 소비자피해 발생 시 연락할 관련 전화번호 등</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        5. 스타벅스 모바일 상품권의 구매/전송이력의 관리 및 제3자 전송 지원
                                                        <ol>
                                                            <li>가. 회사는 스타벅스 모바일 애플리케이션 또는 유무선 인터넷 서비스를 통해 스타벅스 모바일 상품권 구매일로부터 소멸시효 만료 전에 한하여 스타벅스 모바일 상품권의 구매 및 전송이력 정보를 구매자에게 제공합니다.</li>
                                                            <li>나. 구매자 또는 수신자의 고의 또는 과실로 인하여 스타벅스 모바일 상품권의 구매 및 전송이력이 제3자에게 노출되어 발생한 손해에 대하여 회사는 책임을 지지 않습니다.</li>
                                                            <li>다. 회사는 구매한 스타벅스 모바일 상품권의 제3자 전송(양도)을 희망하는 이용자의 편의를 위하여, 구매자의 휴대기기에 설치된 전송 수단 중 일부를 전송 수단으로 사용할 수 있도록 지원하되, 휴대폰 문자 메시지를 통한 전송을 희망하는 경우에 한하여, 회사는 회사가 보유 또는 계약하여 사용 중인 휴대폰 문자 메시지 발송 플랫폼을 통해 이를 무상 발송 지원합니다.  단, 회사가 제공하지 않는 기타 전송 수단을 통한 전송 요청에 대하여, 회사는 전송을 지원하지 않으며 비용을 부담할 책임이 없습니다.</li>
                                                            <li>라. 회원이 수신자의 전화번호 또는 수신자의 모바일 메신저 사용자명 등을 잘못 입력하여 스타벅스 모바일 상품권이 잘못 발송된 후 해당 수신자에 의해 스타벅스 모바일 상품권이 교환되었다면 회사에서는 회원의 잘못된 발송에 대해 책임을 지지 않습니다. </li>
                                                            <li>마. 스타벅스 모바일 상품권을 구매한 후 회사가 제공하는 휴대폰 문자 메시지 발송 플랫폼을 통해 본인 또는 제3자에게 전송 한 경우, 회사는 사후 관리 및 원활한 서비스 응대를 목적으로 해당 전송 건의 송신/발신 이력을 보관 및 조회할 수 있습니다. 또한 회원의 요청이 있는 경우 1회에 한하여 동일한 전송 수단을 이용하여 해당 건의 무상 재발송을 지원합니다. 단 회사가 제공하지 않는 기타 전송 수단을 통한 전송 건에 대해서 회사는 전송 및 수신성공, 수신자 목록 등 일체의 전송 이력을 기술적으로 확인할 수 없으며, 관련 정보의 보관/관리 및 재발송 지원이 불가하며, 회사의 귀책사유가 없는 경우 책임을 지지 않습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        6. 스타벅스 모바일 상품권의 유효기간 및 연장
                                                        <ol>
                                                            <li>가. 스타벅스 모바일 상품권은 발행일로부터 5년간 유효하며, 이를 기본유효기간이라 말합니다. 단, 무상으로 제공되었거나 한정된 기간 동안 판매되는 상품 등에 대한 스타벅스 모바일 상품권의 경우에는 기본유효기간을 상품의 종류와 특성 그리고 회사의 사정에 따라 달리 정할 수 있으며, 그 구체적 기간은 각 상품별 스타벅스 모바일 상품권 증서 또는 증서의 유의사항 및 상품 정보제공고시에 기재된 바에 따릅니다.</li>
                                                            <li>나. 이용자는 기본유효기간 만료 전까지 유효기간의 연장을 요청할 수 있습니다. 이러한 요청이 있는 경우에, 회사는 유효기간을 연장할 수 있으며, 이를 추가유효기간이라 정합니다. 추가유효기간은 상품의 종류와 특성 그리고 회사의 사정에 따라 달리 정할 수 있습니다.</li>
                                                            <li>다. 유효기간 만료 후에는 일체의 사용 또는 유효기간의 연장이 불가하며, 환불규정에 따라 환불할 수 있습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        7. 서비스 및 스타벅스 모바일 상품권의 사용
                                                        <ol>
                                                            <li>가. 스타벅스 모바일 상품권은 유효기간 내에만 사용할 수 있으며, 사용 가능한 매장의 조건은 각 상품별 스타벅스 모바일 상품권 증서에 기재된 바에 따릅니다.</li>
                                                            <li>
                                                                나. 스타벅스 모바일 상품권 권면 기재 상품이 아닌 타 상품으로의 변경 사용 또는 권면 기재 개별 옵션의 변경은 다음 각 호의 조건을 충족하는 경우에 한하여 허용됩니다.
                                                                <ol>
                                                                    <li>① 상품 결제 시 제휴할인 등을 적용한 후 최종 결제할 금액이 제시된 스타벅스 모바일 상품권 의 권면 기재 금액의 60% 이상인 경우</li>
                                                                    <li>② 홀케이크 예약, 온라인 스토어, 딜리버스 결제 시 제휴할인 등을 적용한 후 최종 결제할 금액이 제시한 스타벅스 모바일 상품권의 권면 기재 금액과 동일하거나 초과하는 경우</li>
                                                                    <li>③ ①, ②호의 최종 결제금액이 권면 기재금액을 초과할 경우 추가결제 필요</li>
                                                                    <li>④ ①호의 남은 잔액에 대한 적립 등 방법에 대해서는 회사가 별도로 고지하는 방법에 따름</li>
                                                                </ol>
                                                            </li>
                                                            <li>
                                                                다. 회사는 다음 각 호에 해당하는 경우 스타벅스 모바일 상품권의 구매, 사용, 취소, 환불 등 스타벅스 모바일 상품권 서비스의 전부 또는 일부의 이용을 제한하거나 중지시킬 수 있습니다.
                                                                <ol>
                                                                    <li>① 영업 중단 등 회사의 제반 사정으로 스타벅스 모바일 상품권 서비스를 유지할 수 없는 경우</li>
                                                                    <li>② 회사가 제공하는 스타벅스 모바일 상품권 서비스가 아닌 불법 또는 부정한 방법으로 구매되거나 다른 수신자로부터 재판매된 스타벅스 모바일 상품권을 수신하여 서비스를 이용하고자 하는 경우</li>
                                                                    <li>③ 타인의 명의를 무단으로 사용한 결제 수단을 통하여 받은 스타벅스 모바일 상품권으로 서비스를 이용하고자 하는 경우</li>
                                                                    <li>④ 여신전문금융업법을 포함한 관계 법령을 위반하여 불법적 환전 및 대출 등을 목적으로 한 불법적 구매 및 서비스 이용이 의심되는 경우</li>
                                                                    <li>⑤ 회사의 정당한 영업 행위를 현저히 방해하는 악성 구매 및 서비스 이용인 경우</li>
                                                                    <li>⑥ 정부의 협조 요청에 따라 스타벅스 모바일 상품권 서비스의 이용 제한 등 조치가 필요하다고 판단될 경우</li>
                                                                    <li>⑦ 천재지변, 국가비상사태 등 불가항력의 사유가 있는 경우</li>
                                                                    <li>⑧ 기타 본 약관에서 정한 서비스 이용 제한 사유가 발생한 경우</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_04_03" className="sub_tit">제 24 조 취소, 환불 등</p>
                                                <ol className="mb40">
                                                    <li>1. 스타벅스 모바일 상품권의 선물결제취소</li>
                                                    <li>구매자는 스타벅스 모바일 상품권 최초 결제일로부터 100일 이내 결제 취소를 요청할 수 있으며, 회사는 최초 결제 금액의 100%를 원 결제수단의 승인 취소 또는 환급으로 취소합니다. 선물결제취소의 기한은 상품의 종류와 특성 그리고 회사의 사정에 따라 달리 정할 수 있으며 그 구체적 기한은 각 상품별 스타벅스 모바일 상품권 증서 또는 증서의 유의사항 및 상품정보제공고시에 기재된 바에 따릅니다.</li>

                                                    <li>2. 스타벅스 모바일 상품권의 소멸시효</li>
                                                    <li>스타벅스 모바일 상품권이 발행 된 날로부터 5년이 경과하면 상법상의 상사채권소멸시효가 완성되어 이용자는 회사 등에게 물품 등의 제공 또는 환불 등을 요청할 수 없습니다. 단, 회사가 자발적으로 스타벅스 모바일 상품권의 환불을 허락할 수 있습니다.</li>

                                                    <li>
                                                        3. 스타벅스 모바일 상품권의 환불
                                                        <ol>
                                                            <li>가. 본 조 1항의 결제취소 기한 만료 이후 스타벅스 모바일 상품권 최종 소지자에 한하여 환불을 요청할 수 있습니다. 단, 최종 소지자가 환불을 요청할 수 없는 경우에 한하여, 구매자가 환불을 요청할 수 있습니다. 구매자에게 환불을 완료한 경우 회사의 환불 책임이 면제됩니다.</li>
                                                            <li>나. 본 조 1항의 결제취소 기한 만료 이후 유효기간 내 환불 요청 시 회사는 최초 결제금액 전액을 환불합니다. 단, 단순 변심에 따른 환불 요청 시 회사는 결제수수료 및 제반 비용을 차감한 최초 결제금액의 95%를 환불할 수 있습니다.</li>
                                                            <li>다. 유효기간 만료 후 환불 요청 시 회사는 최초 결제금액의 전액을 환불합니다.</li>
                                                            <li>라. 회사는 전자상거래법상 청약철회 요청을 받은 경우 전자상거래법에 따라 청약철회를 받은 날로부터 3영업일 이내에 최초 결제금액의 전액을 환불합니다.</li>
                                            <li>마. 회사는 천재지변 또는 상품권 자체의 결함으로 인하여 상품 등의 제공이 곤란한 경우 최초 결제금액의 전액을 환불합니다.</li>
                                            <li>바. 회사가 이용자에게 불리하게 상품권 사용처를 축소하거나 이용조건을 변경하는 경우 최초 결제금액의 전액을 환불합니다. 다만, 지점(매장 등) 폐업, 계약기간의 만료와 같이 전자금융거래법 등 관계법령상 정당한 이유가 있는 경우에는 회사의 환불 책임이 면제됩니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        4. 면책 사항
                                                        <ol>
                                                            <li>가. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 스타벅스 모바일 상품권 서비스를 제공할 수 없거나 회사의 귀책사유가 없는 경우에는 본 서비스 제공이 제한될 수 있습니다.</li>
                                                            <li>나. 회사는 이용자의 귀책사유로 인한 스타벅스 모바일 상품권 서비스의 이용장애에 대하여 책임을 지지 않습니다.</li>
                                                            <li>
                                                                다. 회사는 다음 각 호에서 예시하는 바와 같이 이용자가 불법 또는 부정한 방법으로 스타벅스 모바일 상품권 서비스를 이용하거나 과실에 해당하는 행위를 하여 이용자 상호 간 또는 이용자와 제3자 상호 간에 분쟁이 발생하였을 때 회사의 책임을 주장하는 자가 회사의 귀책사유를 객관적으로 입증하지 않는 한 이에 개입할 의무가 없으며 분쟁으로 발생하는 손해를 배상할 책임이 없습니다.
                                                                <ol>
                                                                    <li>① 타인의 휴대전화(분실된 전화 포함)를 이용하거나 번호를 무단으로 사용하여 스타벅스 모바일 상품권을 구매한 경우</li>
                                                                    <li>② 구매자가 수신자의 번호를 잘못 입력하여 스타벅스 모바일 상품권을 잘못 전송하였는데, 수신자가 스타벅스 모바일 상품권을 이미 사용하였거나 반환을 거절하는 경우</li>
                                                                    <li>③ 이용자가 스타벅스 모바일 상품권 을 불법 할인 등의 목적으로 구매하여 제3자 또는 수신자에게 전송(판매)하는 경우</li>
                                                                    <li>④ 이용자가 계좌 정보 등 환불 관련 정보를 잘못 입력하여 환불 오류가 발생한 경우 </li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_04_04" className="sub_tit">제 25 조 계약 당사자의 의무</p>
                                                <ol className="mb40">
                                                    <li>1. 회사의 의무
                                                        <ol>
                                                            <li>가. 회사는 스타벅스 모바일 상품권 서비스와 관련한 이용자의 불만사항이 접수되면 이를 신속히 처리해야 하며, 신속한 처리가 어려운 경우 그 사유와 처리 일정을 스타벅스 모바일 상품권 서비스 화면에 게시하거나 휴대전화, 문자메시지(SMS), 모바일 애플리케이션 푸쉬, 이메일 등을 통하여 해당 이용자에게 통지합니다.</li>
                                                            <li>나. 회사가 제공하는 스타벅스 모바일 상품권 서비스로 인하여 이용자에게 손해가 발생하였을 때 그러한 손해가 회사의 고의나 과실로 인하여 발생하였다면 회사가 그 책임을 부담하며, 책임의 범위는 통상 손해에 한합니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>2. 이용자의 의무
                                                        <ol>
                                                            <li>
                                                                가. 이용자는 스타벅스 모바일 상품권 서비스를 이용할 때 다음 각 호의 행위를 해서는 안 됩니다.
                                                                <ol>
                                                                    <li>① 부정하게 스타벅스 모바일 상품권 서비스에 접속하여 사용하는 행위</li>
                                                                    <li>② 서비스 정보를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제 또는 유통하거나 상업적으로 이용하는 행위 </li>
                                                                    <li>③ 회사의 저작권, 제3자의 저작권 등 기타 권리를 침해하는 행위 </li>
                                                                    <li>④ 공공질서와 미풍양속에 위반되는 내용 등을 타인에게 유포하는 행위 </li>
                                                                    <li>⑤ 스타벅스 모바일 상품권 서비스 운영을 고의로 방해하거나 서비스의 안정적 운영을 방해할 수 있는 정보와 수신자의 명시적 수신거부 의사에 반하는 광고성 정보를 전송하는 행위</li>
                                                                    <li>⑥ 스타벅스 모바일 상품권 서비스에 게시된 정보를 변경하는 행위</li>
                                                                    <li>⑦ 관련 법령에 따라 그 전송 또는 게시가 금지되는 정보(컴퓨터 프로그램 포함)를 전송하거나 게시하는 행위</li>
                                                                    <li>⑧ 회사의 직원이나 스타벅스 모바일 상품권 서비스 운영자로 가장하거나 사칭하여 문자메시지(SMS)를 발송하거나 연락을 취하는 행위</li>
                                                                    <li>⑨ 재판매의 목적으로 스타벅스 모바일 상품권을 구매하는 행위</li>
                                                                    <li>⑩ 기타 불법적이거나 부당한 행위</li>
                                                                </ol>
                                                            </li>
                                                            <li>나. 이용자는 관계 법령, 본 약관의 규정, 이용안내 및 스타벅스 모바일 상품권  서비스상에 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        3. 회원의 의무
                                                        <ol>
                                                            <li>가. 회원은 관계 법령, 약관, 스타벅스 모바일 상품권 서비스 이용안내 및 스타벅스 모바일 상품권 서비스상에 공지한 주의사항, 회사가 스타벅스 모바일 상품권 서비스 이용과 관련하여 회원에게 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 해서는 안 됩니다.</li>
                                                            <li>나. 회원은 본 약관에서 별도로 정하거나 회사의 분명한 동의가 있는 때가 아니면 회원의 스타벅스 모바일 상품권 서비스 이용권한을 타인에게 양도, 증여 또는 이용하게 하거나 이를 담보로 제공할 수 없습니다.</li>
                                                            <li>다. 회원은 스타벅스 모바일 상품권 서비스를 이용할 때 다음 각 호의 행위를 해서는 안 됩니다.
                                                                <ol>
                                                                    <li>① 스타벅스 모바일 상품권 서비스 이용신청 또는 변경 시 거짓된 정보를 기재하거나 타인의 개인정보를 이용하는 행위</li>
                                                                    <li>② 스타벅스 모바일 상품권 서비스 이용 중 습득한 게시물 또는 정보를 상업적 목적으로 이용하거나 출판, 방송 등을 통하여 제3자에게 노출하는 행위. 다만, 공익 목적을 위하여 필요한 경우 사전에 회사의 동의를 얻어야 함</li>
                                                                    <li>③ 스타벅스 모바일 상품권 서비스를 이용하여 상품 또는 용역을 판매하는 영업활동 등의 상행위(해킹, 광고를 통한 수익, 음란사이트를 통한 상업행위, 상용소프트웨어 불법배포 등 포함). 다만, 사전에 회사의 동의를 얻은 경우에는 해당 조항에 따른 제한은 적용되지 않음</li>
                                                                    <li>④ 회사의 스타벅스 모바일 상품권 서비스 운영이나 다른 회원의 스타벅스 모바일 상품권 서비스 이용을 방해하는 행위와 자신을 회사의 운영진, 직원 또는 관계자라고 속이는 행위</li>
                                                                    <li>⑤ 회원의 스타벅스 모바일 상품권을 제3자와 유상으로 거래하거나 현금으로 전환하는 행위</li>
                                                                    <li>⑥ 기타 불법적이거나 회사에게 피해를 발생시키는 행위</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_04">제 5 장 Delivers 서비스</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_05_01" className="sub_tit">제 26 조 적용범위</p>
                                                <ol className="mb40">
                                                    <li>회원은 스타벅스 모바일 애플리케이션을 통해 제공하는 Delivers 서비스를 이용할 수 있으며, 본 장의 규정은 Delivers 서비스를 이용하는 회원들에게 적용됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_05_02" className="sub_tit">제 27 조 제공되는 Delivers 서비스</p>
                                                <ol className="mb40">
                                                    <li>회사가 제공하는 Delivers 서비스는 다음 각 호와 같습니다.</li>
                                                    <li>가. 스타벅스 모바일 애플리케이션을 통한 주문 결제 및 배달 서비스
                                                        <ol>
                                                            <li>① 스타벅스 모바일 애플리케이션을 통하여 회원과 회사간에 상품 등의 매매가 이루어 질 수 있도록 온라인 거래 장소를 제공</li>
                                                            <li>② 상품을 배송 받고자 하는 위치에 따라 주문 가능한 상품 정보를 제공 및 주문 내역에 따라 고객에게 상품 배달</li>
                                                        </ol>
                                                    </li>
                                                    <li>나. 배달 주소 관리
                                                        <ol>
                                                            <li>① 주문 신청 시 지번, 도로명, 건물명을 입력하여 배달 받을 주소를 입력하여야 함</li>
                                                            <li>② Delivers 서비스 이용 시 최근 입력한 배달지 주소를 저장 및 관리함</li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_05_03" className="sub_tit">제 28 조 Delivers 서비스의 이용 및 변경</p>
                                                <ol className="mb40">
                                                    <li>1. Delivers 서비스 이용 가능 시간은 회원이 지정한 배달 주소로 배달 가능한 매장의 영업시간을 원칙으로 하며, 각 매장별 영업시간은 상이할 수 있습니다. 회사는 Delivers 서비스 이용 가능 시간을 회사의 홈페이지 또는 모바일 애플리케이션에 공지하여 정할 수 있습니다.</li>
                                                    <li>2. Delivers 서비스 이용 가능 위치는 회사에서 정한 배달 가능 지역 및 기준에 한하며, 배달 받을 주소지 위치에 따라 서비스 이용 가능 여부가 상이할 수 있습니다.</li>
                                                    <li>3. Delivers 서비스는 회사의 업무나 기술상의 이유 또는 운영상의 목적으로 회사가 정한 기간에 일시 중지될 수 있습니다. 이와 관련하여 회사는 해당 내용을 사전에 공지하며, 합리적인 사유가 있는 경우에는 사후에 통보할 수 있습니다.</li>
                                                    <li>4. 상품 등의 품절 또는 사양의 변경 등의 경우에는 Delivers 서비스를 통해 판매하는 상품 등이 제한 또는 변경될 수 있습니다.</li>
                                                    <li>5. 회사는 필요한 경우 상품 등의 제한 또는 변경 사실 및 그 사유를 회원에게 제 12조(회원에 대한 통지)에서 정한 방법으로 통지합니다.</li>
                                                    <li>6. 본 조 제 6항에 따른 상품 등의 제한 또는 변경으로 인해 회원이 손해를 입은 경우, 회사는 회원이 회사의 행위로 손해를 입었음을 입증한 경우 회원에게 실제 발생한 손해를 배상합니다. 다만, 회사의 고의 또는 과실이 없는 경우에는 그러지 아니합니다.</li>
                                                    <li>7. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 Delivers 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_05_04" className="sub_tit">제 29 조 Delivers 서비스 결제 및 주문 취소 등</p>
                                                <ol className="mb40">
                                                    <li>1. Delivers 서비스 내 판매 상품 등의 주문 신청에 대하여 회사가 주문을 승인함으로써 회사와 회원 사이에 판매상품 등에 관한 매매계약이 성립합니다.</li>
                                                    <li>2. Delivers 서비스의 결제에 따른 대금 지급 방법은 다음 각 호의 방법 중 가능한 방법으로 할 수 있습니다. 회사는 회원의 지급 방법에 대하여 어떠한 명목의 수수료도 추가하여 징수하지 않습니다.
                                                        <ol>
                                                            <li>가. Starbucks Card</li>
                                                            <li>나. 신용카드 등의 각종 카드 결제</li>
                                                            <li>다. 스타벅스 모바일 상품권 및 회사와 계약을 체결했거나 회사가 인정한 상품권에 의한 결제</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 회원은 상품 등의 구매 시 제2항의 결제 수단을 사용함에 있어 반드시 본인명의의 결제 수단을 사용하여야 하며, 타인의 결제 수단을 임의로 사용하여서는 안됩니다. 타인의 결제 수단을 임의 사용함으로써 발생하는 회사, 결제 수단의 적법한 소유자, 결제 관련 제3자 손실과 손해에 대한 책임은 회원에게 있습니다.</li>
                                                    <li>4. 회사는 상품 등의 결제의 취소 및 환불과 관련하여 전자상거래법 등 관계 법령을 준수합니다.</li>
                                                    <li>5. 회원의 주문에 따라 개별적으로 생산 또는 조리되는 상품 등 또는 이와 유사한 상품 등인 경우에는 전자상거래법 등 관계 법령상 청약 철회가 제한될 수 있습니다. 이에 회사는 청약 철회가 제한되는 사실을 개별 상품 등에 대한 안내 또는 결제 화면 등에서 고지하고, 회원이 이에 동의하여야 결제가 가능한 것으로 할 수 있습니다.</li>
                                                    <li>6. 제5항의 규정에도 불구하고 다음 각 호의 경우에는 회사는 즉시 결제 취소를 위한 조치를 취하여야 하고, 회사가 결제 취소 및 그로 인해 발생한 일체의 비용을 부담합니다.
                                                        <ol>
                                                            <li>가. 제공된 상품 등이 회원이 결제한 상품 등의 내용과 현저히 상이할 경우</li>
                                                            <li>나. 제공된 상품 등이 변질, 손상되는 하자 발생 시(단, 배송상품의 특성상 통상 발생할 수 있는 상품의 변형 등은 하자로 보지 아니함)</li>
                                                            <li>다. 천재지변 등 특수 상황에 따른 미입고 발생 시</li>
                                                            <li>라. 주문 신청한 상품 등이 단종, 품절 등의 사유로 인도 또는 제공될 수 없는 경우</li>
                                                        </ol>
                                                    </li>
                                                    <li>7. 상품 등의 수령 후, 이물질 등 명백한 제조 과정 상의 하자가 확인되는 경우, 회원은 환불 요청을 할 수 있으며, 환불 요청 시 회사는 하자에 대하여 즉시 조치를 취하여야 합니다.</li>
                                                    <li>8. 주문 승인 이후 품질 저하 등이 우려되는 등 특별한 사정이 있는 경우 회사는 주문을 취소할 수 있습니다. 이 경우, 회사는 환불 외에는 책임을 부담하지 않습니다.</li>
                                                    <li>9. Delivers 서비스 이용 시, 회원은 배달주소, 연락처 등 배송지 정보에 대한 정확한 정보를 기재해야 하며, 배송이 시작 되었으나 부재, 주소지 오입력 등 회원의 과실에 의하여 배송지나 수령자를 확인할 수 없는 경우 또는 물품이 분실되는 경우, 주문 결제 건에 대한 변경 또는 취소는 결제 및 주문 전송 이후 일체 불가하며, 그로 인해 발생하는 책임과 비용은 회원이 부담합니다.</li>
                                                    <li>10. 회원이 결제 및 주문 전송 이후 상품을 수령하지 않거나 상품 수령자가 수령을 원치 않는 경우, 주문 취소가 받아들여지지 아니할 수 있으며, 이로 인하여 발생하는 손해에 대한 일체의 비용과 책임은 회원이 부담합니다. 다만 결제 및 주문과 동시에 상품 판매가 완료되었거나 상품 제공이 불가한 경우 등이 발생하면 매장에서 주문 승인을 하지 않으며 회원에게 해당 사유가 푸시 알림으로 발송됩니다. 이 경우, 결제는 자동으로
                                                        즉시 취소되며, 즉시 자동 취소가 되지 않는 경우에는 익일 (24시간 이내) 자동으로 취소됩니다.</li>
                                                    <li>11. Delivers 서비스를 통해 제공된 상품의 취소, 교환 및 환불 요청은 스타벅스 고객센터를 통해 접수할 수 있고, 회사가 상품을 확인 후에 처리됩니다. 이 때, 회원의 변심, 오주문으로 인한 취소, 교환 및 환불 시 발생하는 배송비는 회원이 부담합니다.</li>
                                                    <li>12. Delivers 서비스 이용 시 결제 건당 최소 이용금액은 회사의 사정에 따라 달리 정할 수 있으며, 홈페이지 또는 모바일 애플리케이션을 통해 안내합니다.</li>
                                                    <li>13. Delivers 서비스 이용 시 상품의 배송은 전문배송업체를 통해 진행되며, 배송업체에게 상품이 인도되는 시점에 배송업체의 책임과 비용으로 회원에게 상품 배송이 진행됩니다. 상품 자체의 하자 또는 회사의 고의, 중과실로 발생한 문제 등에 대해서는 회사가 그 책임을 부담합니다. 다만, 배송과정에서 발생하는 문제는 상법 등 관련 법령에 따라 배송업체가 회원에 대하여 직접 책임을 부담합니다.</li>
                                                    <li>14. 배송업체의 사정으로 배달이 불가한 경우 결제가 이루어진 이후에도 주문이 취소될 수 있습니다. 이 경우, 결제는 자동으로 즉시 취소되며, 즉시 자동 취소가 되지 않는 경우에는 익일 (24시간 이내) 자동으로 취소됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_05_05" className="sub_tit">제30 조 Delivers 서비스 이용 회원의 혜택</p>
                                                <ol className="mb40">
                                                    <li>1. 스타벅스 리워드 회원의 경우, Delivers 서비스 이용 시 회원 계정으로 영수증 당 1개의 별이 적립되며, 별 적립에 관한 구체적인 내용에 대해서는 “스타벅스 카드 이용약관”이 적용됩니다. 단, 상품 등을 수령하지 않거나, 결제 취소 시 별은 적립되지 않습니다.</li>
                                                    <li>2. 제1항에도 불구하고 회원의 고의 또는 과실 없이 회사의 과실 또는 천재지변 등의 특수한 상황에 따라 회원이 상품 등을 수령하지 못하였을 경우, 회사는 회원에게 별 적립 혜택을 제공합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_05">제 6 장 에코매장</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_06_01" className="sub_tit">제 31 조 적용범위</p>
                                                <ol className="mb40">
                                                    <li>본 장의 규정은 에코매장을 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_02" className="sub_tit">제 32 조 에코매장 이용에 관한 총칙</p>
                                                <ol className="mb40">
                                                    <li>1. 에코매장 이용
                                                        <p className="mt0">에코매장에서 이용자에게 제공하는 서비스는 다음 각 호와 같습니다.</p>
                                                        <ol>
                                                            <li>가. 리유저블컵 운영
                                                                <ol>
                                                                    <li>① 에코매장은 음료 외부 반출을 희망하시는 모든 이용자께 일회용컵이 아닌 리유저블컵으로 제공합니다.</li>
                                                                    <li>② 이용자는 보증금을 지불하고 리유저블컵에 음료를 수령하며, 에코매장 및 지정된 반납장소에 설치된 리유저블컵 반납기에서 리유저블컵 반납과 교환으로 보증금을 환급받을 수 있습니다.</li>
                                                                    <li>③ 이용자는 보증금을 현금 혹은 Starbucks Card 및 회사에서 지정하는 모바일 앱을 통해 환급받을 수 있습니다.</li>
                                                                </ol>
                                                            </li>
                                                            <li>나. 보증금 동의 관리
                                                                <ol>
                                                                    <li>① 회원이 사이렌오더로 결제하는 경우, 보증금 결제에 대해 동의가 요구되며, 해당 동의는 이후 결제에 대하여도 전부 적용됩니다.</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_03" className="sub_tit">제 33 조 에코매장 내 서비스의 이용 및 변경</p>
                                                <ol className="mb40">
                                                    <li>1. 에코매장 내 리유저블컵 재고가 소진된 경우에는 부득이하게 한시적으로 일회용컵으로 제공합니다.</li>
                                                    <li>2. 사용 중 이용자의 고의 또는 과실로 인해 파손 또는 훼손된 리유저블컵을 반납하는 경우에는 리유저블컵 반납 및 보증금 환급이 제한될 수 있습니다.</li>
                                                    <li>3. 회사는 필요한 경우 리유저블컵 이용 등의 제한 또는 운영정책 변경 사유를 회원에게 제12조(회원에 대한 통지)에서 정한 방법으로 통지합니다.</li>
                                                    <li>4. 본 조 제4항에 따른 리유저블컵 이용 등의 제한 또는 변경으로 인해 회원이 손해를 입은 경우, 회사는 회원이 회사의 행위로 손해를 입었음을 입증한 경우 회원에게 실제 발생한 손해를 배상합니다. 다만, 회사의 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_04" className="sub_tit">제 34 조 에코매장 내 결제 및 주문 취소 등</p>
                                                <ol className="mb40">
                                                    <li>1. 에코매장에서 이용자의 리유저블컵을 포함한 상품 등의 주문에 대하여 회사가 이를 승인함으로써 계약이 성립합니다.</li>
                                                    <li>2. 이용자가 결제 시 대금 지급 방법은 다음 각 호의 방법 중 가능한 방법으로 할 수 있습니다. 단, 회원은 사이렌오더를 통해 리유저블컵을 포함하여 상품 등을 결제하는 경우 Starbucks Card로만 결제하여야 합니다.
                                                        <ol>
                                                            <li>가. Starbucks Card</li>
                                                            <li>나. 현금</li>
                                                            <li>다. 신용/체크카드</li>
                                                            <li>라. 유가증권(상품권, 기프티콘 등)</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 이용자는 상품 등의 구매 시 제2항의 결제 수단을 사용함에 있어 반드시 본인명의의 결제 수단을 사용하여야 하며, 타인의 결제 수단을 임의로 사용하여서는 안됩니다. 타인의 결제 수단을 임의 사용함으로써 발생하는 회사, 결제 수단의 적법한 소유자, 결제 관련 제3자 손실과 손해에 대한 책임은 이용자에게 있습니다.</li>
                                                    <li>4. 리유저블컵을 포함하여 상품 등을 결제한 경우 부분 취소는 불가하며, 결제 취소 진행 시 리유저블컵을 미지참하는 경우 리유저블컵 보증금에 대한 환급이 불가합니다. </li>
                                                    <li>5. 리유저블컵의 세척 및 관리는 전문업체를 통해 진행되며, 세척 또는 관리상 하자 등으로 인해 발생하는 문제는 해당 업체가 피해자에 대해 직접 책임을 부담할 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_05" className="sub_tit">제35 조 에코매장 이용 회원의 혜택</p>
                                                <ol className="mb40">
                                                    <li>1. 스타벅스 리워드 회원의 경우, 에코매장 이용 시 회원 계정으로 영수증 당 1개의 별이 적립되며, 별 적립에 관한 구체적인 내용에 대해서는 “스타벅스 카드 이용약관”이 적용됩니다. 단, 결제 취소 시 별은 적립되지 않습니다.</li>
                                                    <li>2. 제1항에도 불구하고 회원의 고의 또는 과실 없이 회사의 과실 또는 천재지변 등의 특수한 상황에 따른 결제 취소의 경우, 회사는 회원에게 별 적립 혜택을 제공합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_05">제 7 장 온라인 스토어</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p className="sub_tit">제 36 조 적용의 범위</p>
                                                <ol className="mb40">
                                                    <li>본 장의 규정은 온라인 스토어를 이용하고자 하는 모든 이용자에게 그 효력이 발생합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 37 조 제공되는 서비스</p>
                                                <ol className="mb40">
                                                    <li>회사가 제공하는 온라인 스토어의 서비스는 다음 각 호와 같습니다.</li>
                                                    <li>1. 스타벅스 모바일 애플리케이션을 통한 주문 결제 및 배송 서비스
                                                        <ol>
                                                            <li>가. 상품에 대한 정보 제공 및 구매 계약의 체결</li>
                                                            <li>나. 구매 계약이 체결된 상품의 배송</li>
                                                        </ol>
                                                    </li>
                                                    <li>2. 선물하기 서비스 
                                                        <ol>
                                                            <li>가. 이용자가 주문 및 결제한 상품을 모바일 전송수단을 통하여 선물하는 서비스</li>
                                                            <li>나. 선물을 받은 수신자가 원하는 배송지에서 상품을 수령할 수 있도록 하는 배송 서비스</li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 38 조 온라인 스토어의 이용 및 변경</p>
                                                <ol className="mb40">
                                                    <li>1. 온라인 스토어의 이용은 연중무휴 1일 24시간을 원칙으로 합니다. 다만, 회사의 업무나 기술상의 이유로 온라인 스토어 서비스가 일시 중지될 수 있고, 운영상의 목적으로 회사가 정한 기간에는 온라인 스토어 서비스가 일시 중지될 수 있습니다. 이 때 회사는 미리 해당 내용을 공지하며, 합리적인 사유가 있는 경우에는 사후에 통보할 수 있습니다.</li>
                                                    <li>2. 회사는 온라인 스토어 서비스를 일정 범위로 나누어 범위별로 이용할 수 있는 시간을 정할 수 있으며, 이 경우 그 내용을 공지합니다.</li>
                                                    <li>3. 회사는 상품 등의 품절 또는 사양의 변경 등의 경우에는 상품 등을 제한 또는 변경할 수 있습니다.</li>
                                                    <li>4. 회사는 온라인 스토어 서비스를 통한 상품 구매 가능 금액을 관련 법령 및 회사의 사정에 따라 제한할 수 있으며, 그 구체적 금액은 온라인 스토어 서비스를 통해 안내합니다.</li>
                                                    <li>5. 회사는 필요한 경우 상품 등의 제한 또는 변경 사실 및 그 사유를 이용자에게 제12조(회원에 대한 통지)에서 정한 방법으로 통지합니다.</li>
                                                    <li>6. 본 조 제3항에 따른 상품 등의 제한 또는 변경으로 인해 이용자가 손해를 입은 경우, 회사는 이용자가 회사의 행위로 손해를 입었음을 입증한 경우 이용자에게 실제 발생한 손해를 배상합니다. 다만, 회사의 고의 또는 과실이 없는 경우에는 그러지 아니합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 39 조 구매 신청</p>
                                                <ol className="mb40">
                                                    <li>이용자는 온라인 스토어 서비스에서 다음 또는 이와 유사한 방법에 의하여 구매를 신청하며, 회사는 이용자가 구매를 신청함에 있어서 다음의 각 내용을 알기 쉽게 제공해야 합니다.</li>
                                                    <li>1. 상품 등의 검색 및 선택</li>
                                                    <li>2. 약관 내용, 청약 철회권이 제한되는 서비스, 배송료, 결제수단, 환불수단 등 비용 부담 관련 내용에 대한 확인</li>
                                                    <li>3. 본 약관에 동의하고 위 2호의 사항을 확인하거나 거부하는 표시 (예. 체크박스 선택)</li>
                                                    <li>4. 상품 등의 구매 신청 및 이에 관한 확인 또는 회사의 확인에 대한 동의</li>
                                                    <li>5. 결제방법의 선택</li>
                                                    <li>6. 기타 회사에서 별도로 정하는 절차</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 40 조 계약의 성립</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자의 구매 신청에 대하여 다음 각 호에 해당하면 승낙하지 않을 수 있습니다. 다만, 미성년자와 계약을 체결하는 경우에는 법정 대리인의 동의를 얻지 못하면 미성년자 본인 또는 법정대리인이 계약을 취소할 수 있다는 내용을 고지하여야 합니다.
                                                        <ol>
                                                            <li>가. 신청 내용에 허위, 기재 누락, 오기가 있는 경우</li>
                                                            <li>나. 상행위(재판매)를 목적으로 구매하는 거래이거나, 거래 정황상 상행위(재판매)를 목적으로 한 구매로 판단되는 경우</li>
                                                            <li>다. 기타 구매 신청에 승낙하는 것이 회사의 기술상 현저히 지장이 있다고 판단하는 경우</li>
                                                        </ol>
                                                    </li>
                                                    <li>2. 이용자의 구매계약 성립시기는 회사가 구매완료를 구매절차 상에서 표시한 시점으로 합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 41 조 수신 확인 통지 ∙ 구매 신청 변경 및 취소</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자의 구매신청이 있는 경우 이용자에게 수신확인통지를 합니다.</li>
                                                    <li>2. 수신확인통지를 받은 이용자는 의사표시의 불일치 등이 있는 경우에는 수신확인통지를 받은 후 즉시 구매신청 변경 및 취소를 요청할 수 있고, 회사는 배송 전에 이용자의 요청이 있는 경우에는 지체 없이 그 요청에 따라 처리하여야 합니다. 다만, 이미 대금을 지불한 경우에는 제 46 조의 청약철회 등에 관한 규정에 따릅니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 42 조 결제 수단</p>
                                                <ol className="mb40">
                                                    <li>온라인 스토어에서 구매한 상품에 대한 대금 지급 방법은 다음 각 호의 방법 중 가용한 방법으로 할 수 있습니다. 단, 회사는 이용자의 지급 방법에 대하여 상품 등의 대금에 어떠한 명목의 수수료도 추가하여 징수할 수 없습니다.</li>
                                                    <li>1. 스타벅스 모바일 애플리케이션에 등록되어 있는 Starbucks Card</li>
                                                    <li>2. 선불 카드, 직불 카드, 신용카드 등의 각종 카드 결제</li>
                                                    <li>3. 스타벅스 모바일 상품권 및 회사와 계약을 체결했거나 회사가 인정한 상품권에 의한 결제</li>
                                                    
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 43 조 할인 쿠폰</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자가 온라인 스토어를 통하여 상품 등을 구매하는 경우, 회사의 정책에 따라 이용자에게 일정액 또는 일정비율을 할인 받을 수 있는 할인 쿠폰을 부여할 수 있습니다.</li>
                                                    <li>2. 회사는 품목, 거래금액 등에 따라 할인 쿠폰의 사용을 제한할 수 있습니다.</li>
                                                    <li>3. 쿠폰의 부여 및 사용에 관한 상세한 사항은 회사가 정한 정책에 따르며, 회사는 온라인 스토어 서비스 또는 회사가 운영하는 홈페이지 등을 통하여 이를 회원에게 안내합니다.</li>
                                                    <li>4. 이용자는 쿠폰을 명시된 사용 기간 내에만 사용할 수 있습니다.</li>
                                                    <li>5. 이용자는 쿠폰을 본인의 거래에 대해서만 사용할 수 있으며, 어떠한 경우라도 쿠폰을 타인에게 매매 또는 양도하거나, 실질적으로 매매 또는 양도와 동일하게 볼 수 있는 행위를 할 수 없습니다.</li>
                                                    <li>6. 이용자가 부당 또는 부정하게 쿠폰을 취득한 경우 이용자는 쿠폰을 사용할 수 없으며, 회사는 이를 회수할 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 44 조 상품 등의 공급</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자와 상품 등의 공급시기에 관하여 별도의 약정이 없는 이상, 이용자가 청약을 한 날부터 신속하게 상품 등을 배송할 수 있도록 포장, 배송 의뢰 등 기타의 필요한 조치를 취합니다.</li>
                                                    <li>2. 제1항에도 불구하고 이용자와 회사간 상품 등의 공급 시기에 관하여 별도의 약정이 있는 경우에는 그에 따릅니다. 이 때 회사는 이용자가 상품 등의 공급 절차 및 진행 사항을 확인할 수 있도록 적절한 조치를 합니다.</li>
                                                    <li>3. 회사는 이용자가 구매한 상품 등에 대해 배송 수단, 수단별 배송 비용 부담자, 수단별 배송 기간 등을 명시합니다. 단, 배송기간은 거래계에서 통상 합리적으로 기대할 수 있는 기간을 의미합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 45 조 환급</p>
                                                <ol className="mb40">
                                                    <li>회사는 이용자가 구매 신청한 상품 등이 품절 등의 사유로 인도 또는 제공을 할 수 없을 때에는 지체 없이 그 사유를 이용자에게 통지하고 사전에 상품 등의 대금을 받은 경우에는 대금을 받은 날부터 3영업일 이내에 환급하거나 환급에 필요한 조치를 취합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 46 조 청약철회</p>
                                                <ol className="mb40">
                                                    <li>1. 회사와 상품 등의 구매에 관한 계약을 체결한 이용자는 계약 내용에 관한 서면을 교부 받은 날 또는 수신 확인의 통지를 받은 날로부터 7일 이내에 청약의 철회를 할 수 있습니다. 만일 그 서면을 교부 또는 수신확인의 통지를 받은 때보다 상품 등의 공급이 늦게 이루어진 경우에는 상품 등의 공급을 받거나 공급이 개시된 날부터 7일 이내에 청약의 철회를 할 수 있습니다. 다만, 청약철회에 관하여 전자상거래 등에서의 소비자보호에 관한 법률에 달리 정함이 있는 경우에는 동 법 규정에 따릅니다.</li>
                                                    <li>2. 이용자는 상품 등을 배송 받은 경우 다음 각 호의 1에 해당하는 경우에는 반품 및 교환을 할 수 없습니다.
                                                        <ol>
                                                            <li>가. 이용자에게 책임 있는 사유로 상품 등이 멸실 또는 훼손된 경우(다만, 상품 등의 내용을 확인하기 위하여 포장 등을 훼손한 경우에는 청약 철회를 할 수 있음)</li>
                                                            <li>나. 이용자의 사용 또는 일부 소비에 의하여 상품 등의 가치가 현저히 감소한 경우</li>
                                                            <li>다. 시간의 경과에 의하여 재판매가 곤란할 정도로 상품 등의 가치가 현저히 감소한 경우</li>
                                                            <li>라. 같은 성능을 지닌 상품 등으로 복제가 가능한 경우 그 원본인 상품 등의 포장을 훼손한 경우</li>
                                                            <li>마. 용역 또는 문화산업진흥기본법 제2조 제5호의 디지털콘텐츠의 제공이 개시된 경우 (단, 가분적 용역 또는 가분적 디지털콘텐츠로 구성된 계약의 경우 제공이 개시되지 아니한 부분에 대해서는 그러하지 아니함)</li>
                                                            <li>바. 주문에 따라 개별적으로 생산되는 상품 등 또는 이와 유사한 상품의 경우</li>
                                                            <li>사. 그 밖에 거래의 안전을 위하여 전자상거래 등에서의 소비자보호에 관한 법률 및 동법 시행령등에서 정하는 경우</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 제2항 나 내지 마의 경우에는 회사가 사전에 청약 철회 등이 제한되는 사실을 이용자가 쉽게 알 수 있는 곳에 명기하거나 시용 상품을 제공하는 등의 조치를 하지 않았다면 이용자의 청약 철회 등이 제한되지 않습니다.</li>
                                                    <li>4. 이용자는 제1항 및 제2항의 규정에도 불구하고 상품 등의 내용이 표시, 광고 내용과 다르거나 계약 내용과 다르게 이행된 때에는 당해 상품 등을 공급받은 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 청약 철회 등을 할 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 47 조 청약철회 등의 효과</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자로부터 상품 등을 반환 받은 경우 3영업일 이내에 이미 지급받은 상품 등의 대금을 환급합니다. 이 경우 회사가 이용자에게 상품 등의 환급을 지연한 때에는 그 지연 기간에 대하여 전자상거래 등에서의 소비자보호에 관한 법률 시행령이 정하는 지연 이자율을 곱하여 산정한 지연 이자(이하 '지연 배상금'이라 한다)를 지급합니다.</li>
                                                    <li>2. 회사는 위 대금을 환급함에 있어서 이용자가 신용카드 그 밖에 전자상거래 등에서의 소비자보호에 관한 법률 시행령 등이 정하는 결제 수단으로 상품 등의 대금을 지급한 때에는 지체 없이 당해 결제 수단을 제공한 사업자로 하여금 상품 등의 대금 청구를 정지 또는 취소하도록 요청합니다. 단, 사용처가 회사로 제한되어 있는 스타벅스 모바일 상품권 또는 제휴사 모바일 상품권으로 결제 후 판매자의 사유로 익일 이후 결제 취소하는 경우 회사는 Starbucks Card에 환급할 금액을 적립하여 환급합니다.</li>
                                                    <li>3. 청약철회 등의 경우 공급받은 상품 등의 반환에 필요한 비용은 이용자가 부담합니다. 회사는 이용자에게 청약 철회 등을 이유로 위약금 또는 손해배상을 청구하지 않습니다. 다만, 상품 등의 내용이 표시, 광고 내용과 다르거나 계약 내용과 다르게 이행되어 청약철회 등을 하는 경우 상품 등의 반환에 필요한 비용은 회사가 부담합니다.</li>
                                                    <li>4. 이미 상품 등이 일부 사용 또는 일부 소비된 경우에는 해당 상품 등의 사용 또는 일부 사용에 의하여 이용자가 얻은 이익 또는 해당 상품 등의 공급에 소요된 비용에 상당하는 금액으로서 전자상거래 등에서의 소비자보호에 관한 법률 시행령이 정하는 범위의 금액의 지급을 이용자에게 청구할 수 있습니다.</li>
                                                    <li>5. 이용자는 청약철회 시 상품 등을 구매하여 회사로부터 별, 무료음료 쿠폰 등의 리워드를 지급받은 경우 이를 회사에 반환해야 합니다.</li>
                                                    <li>6. 이용자가 상품 등을 제공받을 때 배송비를 부담한 경우에 회사는 청약 철회 시 그 비용을 누가 부담하는지를 알기 쉽도록 명확하게 표시합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 48 조 상품 등의 교환 및 환불의 특칙</p>
                                                <ol className="mb40">
                                                    <li>상품 등의 반품에 따른 환불 및 교환은 반품 또는 교환을 요청한 상품 등이 회사에 도착되고, 반품, 교환 사유 및 배송비 부담 주체가 확인된 이후에 이루어집니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p className="sub_tit">제 49 조 계약 당사자의 의무</p>
                                                <ol className="mb40">
                                                    <li>1. 회사의 의무
                                                        <ol>
                                                            <li>가. 회사는 법령과 본 약관이 금지하거나 공서 양속에 반하는 행위를 하지 않으며, 본 약관이 정하는 바에 따라 지속적이고, 안정적으로 상품 등을 제공하는데 최선을 다하여야 합니다.</li>
                                                            <li>나. 회사는 이용자가 안전하게 인터넷 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위한 보안 시스템을 갖추며, 개인정보 처리방침을 공지하고 이를 준수합니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>2. 이용자의 의무
                                                        <ol>
                                                            <li>가. 이용자는 상품 등을 구매하기 전에 반드시 회사가 제공하는 상품 등의 상세 내용과 거래의 조건을 정확하게 확인한 후 구매를 신청하여야 합니다. 구매하려는 상품 등의 상세내용과 거래의 조건을 확인하지 않고 구매하여 발생하는 손해에 대하여 이용자가 책임을 부담합니다.</li>
                                                            <li>나. 이용자는 본 약관 및 회사가 서비스와 관련하여 고지하는 내용을 준수하여야 하며, 약관 및 고지내용을 위반하거나 이행하지 아니하여 발생하는 손해에 대하여 책임을 부담합니다.</li>
                                                            <li>다. 이용자는 회사가 서비스를 안전하게 제공할 수 있도록 회사에 협조하여야 하며, 회사가 이용자의 본 약관 위반행위를 발견하여 이용자에게 해당 위반행위에 대하여 소명을 요청할 경우 이용자는 회사의 요청에 적극 응하여야 합니다.</li>
                                                            <li>라. 이용자가 구매대금의 지급 완료일로부터 7일 이내에 배송지 주소 등의 정보를 제공하지 않을 경우 주문이 취소될 수 있으며, 그 경우 결제는 자동으로 취소처리 됩니다.</li>
                                                            <li>마. 미성년자인 이용자가 서비스를 이용하여 상품 등을 구매 시 법정대리인이 해당 계약에 대하여 동의를 하여야 정상적인 상품 등의 구매계약이 체결될 수 있습니다. 만약, 미성년자인 이용자가 법정대리인의 동의 없이 상품 등을 구매하는 경우 본인 또는 법정대리인이 이를 취소할 수 있습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 이용자의 금지 행위
                                                        <ol>
                                                            <li>가. 이용자는 다음 각호의 행위를 하여서는 안됩니다.
                                                                <ol>
                                                                    <li>① 회사가 제공하는 서비스 이용방법에 의하지 아니하고 비정상적인 방법으로 서비스를 이용하거나 시스템에 접근하는 행위</li>
                                                                    <li>② 타인의 명의, 카드정보, 계좌정보 등을 도용하여 회사가 제공하는 서비스를 이용하는 행위</li>
                                                                    <li>③ 회사가 정하지 않은 비정상적인 방법으로 상품 등을 취득하거나 사용하는 행위</li>
                                                                    <li>④ 회사가 게시하는 정보의 무단, 변경 또는 회사가 정한 정보 이외의 정보(컴퓨터프로그램 등) 등을 송신 또는 게시하는 행위</li>
                                                                    <li>⑤ 불법 할인의 목적으로 상품 등을 구매하여 제3자에게 판매하는 행위</li>
                                                                    <li>⑥ 구매의사 없이 반복적인 구매행위를 하는 행위</li>
                                                                    <li>⑦ 기타 불법적이거나 부당한 행위</li>
                                                                </ol>
                                                            </li>
                                                            <li>나. 회사는 이용자가 본 조의 금지행위를 행하는 경우 서비스의 일부 또는 전부를 이용 정지하거나 서비스 이용계약을 임의로 해지할 수 있으며, 이 경우 발생하는 손해에 대한 책임은 이용자가 부담합니다. 회사는 필요한 경우 이용자의 금지행위 사실을 관련 정부기관 또는 사법기관에 통지할 수 있습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>4. 면책 사항
                                                        <ol>
                                                            <li>가. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 온라인 스토어 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                                            <li>나. 회사는 이용자의 귀책사유로 인한 온라인 스토어의 이용장애에 대하여 책임을 지지 않습니다.</li>
                                                            <li>다. 회사는 다음 각 호에서 예시하는 바와 같이 이용자가 불법 또는 부정한 방법으로 온라인 스토어를 이용하거나 과실에 해당하는 행위를 하여 이용자 상호 간 또는 이용자와 제3자 상호 간에 분쟁이 발생하였을 때 회사의 책임을 주장하는 자가 회사의 귀책사유를 객관적으로 입증하지 않는 한 이에 개입할 의무가 없으며 분쟁으로 발생하는 손해를 배상할 책임이 없습니다.
                                                                <ol>
                                                                    <li>① 타인의 휴대전화(분실된 전화 포함)를 이용하거나 번호를 무단으로 사용하여 상품을 구매한 경우</li>
                                                                    <li>② 구매자가 수신자의 번호를 잘못 입력하여 배송상품을 잘못 전송하였는데, 수신자가 배송상품을 이미 배송받았거나 반환을 거절하는 경우</li>
                                                                    <li>③ 이용자가 배송상품을 불법 할인 등의 목적으로 구매하여 제3자 또는 수신자에게 전송(판매)하는 경우</li>
                                                                    <li>④ 이용자가 휴대폰번호 등 환불에 필요한 정보를 잘못 관리하거나 오입력하여 환불 오류가 발생한 경우</li>
                                                                </ol>
                                                            </li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_05">제 8 장 단체 주문 배달 서비스</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_06_01" className="sub_tit">제50조 적용범위</p>
                                                <ol className="mb40">
                                                    <li>회원은 스타벅스 홈페이지를 통해 제공하는 단체 주문 배달 서비스를 이용할 수 있으며, 본 장의 규정은 단체 주문 배달 서비스를 이용하는 회원들에게 적용됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_02" className="sub_tit">제51조 제공되는 단체 주문 배달 서비스</p>
                                                <ol className="mb40">
                                                    <li>회사가 제공하는 단체 주문 배달 서비스는 다음 각 호와 같습니다.</li>
                                                    <li>
                                                        가. 스타벅스 홈페이지를 통한 주문 신청 및 배달 서비스
                                                        <ol>
                                                            <li>① 단체 주문 배달 서비스에 대한 정보 제공 및 상품 매매 계약 체결</li>
                                                            <li>② 매매 계약이 체결된 상품의 배달  </li>
                                                        </ol>
                                                    </li>
                                                    <li>
                                                        나. 배달 주소 관리
                                                        <ol>
                                                            <li>① 주문 신청 시 지번, 도로명, 건물명 등 배달 받을 주소를 입력하여야 함</li>
                                                        </ol>
                                                    </li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_03" className="sub_tit">제52조 단체 주문 배달 서비스의 이용 및 변경</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 단체 주문 배달 서비스를 일정 범위로 나누어 범위별로 이용할 수 있는 시간을 정할 수 있으며, 이 경우 그 내용을 공지합니다.</li>
                                                    <li>2. 주문 신청에 따른 배달 서비스 이용 가능 시간은 회원이 지정한 배달 주소로 배달 가능한 매장의 영업시간을 원칙으로 하며, 각 매장별 영업시간은 상이할 수 있습니다. </li>
                                                    <li>3. 단체 주문 배달 서비스 이용 가능 위치는 회사에서 정한 배달 가능 지역 및 기준에 한하며, 배달 받을 주소지 위치에 따라 서비스 이용 가능 여부가 상이할 수 있습니다.</li>
                                                    <li>4. 단체 주문 배달 서비스는 회사의 업무나 기술상의 이유 또는 운영상의 목적으로 회사가 정한 기간에 일시 중지될 수 있습니다. 이와 관련하여 회사는 해당 내용을 사전에 공지하며, 합리적인 사유가 있는 경우에는 사후에 통보할 수 있습니다.</li>
                                                    <li>5. 상품 등의 품절 또는 사양의 변경 등의 경우에는 단체 주문 배달 서비스를 통해 판매하는 상품 등이 제한 또는 변경될 수 있습니다.</li>
                                                    <li>6. 회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 단체 주문 배달 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_04" className="sub_tit">제53조 단체 주문 배달 서비스 결제 및 주문 취소 등</p>
                                                <ol className="mb40">
                                                    <li>1. 단체 주문 배달 서비스 내 판매 상품 등의 주문 신청에 대하여 회사가 주문을 승인함으로써 회사와 회원 사이에 판매상품 등에 관한 매매계약이 성립합니다.</li>
                                                    <li>
                                                        2. 단체 주문 배달 서비스의 결제에 따른 대금 지급 방법은 다음 각 호의 방법 중 가능한 방법으로 할 수 있습니다. 회사는 회원의 지급 방법에 대하여 어떠한 명목의 수수료도 추가하여 징수하지 않습니다.
                                                        <ol>
                                                            <li>가. 신용카드</li>
                                                            <li>나. 무통장입금</li>
                                                        </ol>
                                                    </li>
                                                    <li>3. 회원은 상품 등의 구매 시 제2항의 결제 수단을 사용함에 있어 반드시 본인명의의 결제 수단을 사용하여야 하며, 타인의 결제 수단을 임의로 사용하여서는 안 됩니다. 타인의 결제 수단을 임의 사용함으로써 발생하는 회사, 결제 수단의 적법한 소유자, 결제 관련 제3자 손실과 손해에 대한 책임은 회원에게 있습니다.</li>
                                                    <li>4. 회원이 제53조 제3항의 결제 수단으로 대금을 지급한 후 주문 취소 또는 환불을 요청하는 경우, 회사는 주문 취소 가능 여부 등을 확인한 후 결제 수단에 따라 환불합니다. 신용카드 결제의 경우 신용카드사 환불 기준에 따라 처리되며 현금으로 환불되지 않습니다. 만일 회원이 주문 후 회원탈퇴를 하는 등 결제 수단에 따른 환불이 불가능한 경우 회원이 재가입하여 동일인임을 인증하는 때에는 결제 수단에 따라 환불받을 수 있습니다.</li>
                                                    <li>5. 회사는 상품 등의 결제 취소 및 환불 등과 관련하여 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령을 준수합니다.</li>
                                                    <li>6. 회원의 주문에 따라 개별적으로 생산 또는 조리되는 상품 등 또는 이와 유사한 상품 등인 경우에는 전자상거래 등에서의 소비자보호에 관한 법률 등 관계 법령상 청약 철회가 제한될 수 있습니다. 이에 회사는 청약 철회가 제한되는 사실을 개별 상품 등에 대한 안내 또는 결제 화면 등에서 고지하고, 회원이 이에 동의하여야 결제가 가능한 것으로 할 수 있습니다. 회사는 별도의 취소 및 환불 관련 규정을 정할 수 있으며, 이 경우 해당 규정이 본 약관에 우선하여 적용됩니다.</li>
                                                    <li>7. 본 조 제6항의 규정에도 불구하고 다음 각 호의 경우에는 회사는 지체 없이 그 사유를 회원에게 통지하고, 회사가 결제 취소 및 그로 인해 발생한 일체의 비용을 부담합니다.
                                                        <ol>
                                                            <li>가. 제공된 상품 등이 회원이 결제한 상품 등의 내용과 현저히 상이할 경우</li>
                                                            <li>나. 제공된 상품 등이 변질, 손상되는 하자 발생 시(단, 배달상품의 특성상 통상 발생할 수 있는 상품의 변형 등은 하자로 보지 아니함)</li>
                                                            <li>다. 천재지변 등 특수 상황에 따른 판매 상품의 미입고 및 배달 불가 시</li>
                                                            <li>라. 주문 신청한 상품 등이 단종, 품절 등의 사유로 인도 또는 제공될 수 없는 경우</li>
                                                        </ol>
                                                    </li>
                                                    <li>8. 상품 등의 수령 후 제조 과정상의 하자가 명백히 확인되는 경우, 회원은 환불을 요청할 수 있으며, 환불 요청 시 회사는 하자에 대하여 즉시 조치를 취하여야 합니다.</li>
                                                    <li>9. 단체 주문 배달 서비스 이용 시, 회원은 배달주소, 연락처 등 배송지 정보에 대한 정확한 정보를 기재해야 하며, 배송이 시작되었으나 수령자 부재, 주소지 오입력 등 회원의 과실에 의하여 배송지나 수령자를 확인할 수 없는 경우 또는 물품이 분실되는 경우, 주문 결제 건에 대한 변경 및 취소는 불가하며, 그로 인해 발생하는 책임과 비용은 회원이 부담합니다. </li>
                                                    <li>10. 회원이 결제 이후 상품을 수령하지 않거나 상품 수령자가 수령을 원치 않는 경우, 주문 취소가 받아들여지지 아니할 수 있으며, 이로 인하여 발생하는 손해에 대한 일체의 비용과 책임은 회원이 부담합니다. </li>
                                                    <li>11. 단체 주문 배달 서비스를 통해 제공된 상품의 취소, 교환 및 환불 요청은 홈페이지를 통해 접수할 수 있고, 상품 확인 후 취소 및 환불 규정 등 회사가 정한 규정에 따라 처리됩니다. 이때, 회원의 변심, 오주문 등 회원의 사유로 인한 취소, 교환 및 환불 시 발생하는 배송비는 회원이 부담합니다.</li>
                                                    <li>12. 단체 주문 배달 서비스 이용 시 결제 건당 최소 이용금액은 회사의 사정에 따라 달리 정할 수 있으며, 홈페이지를 통해 안내합니다.</li>
                                                    <li>13. 단체 주문 배달 서비스 이용 시 상품의 배송은 전문배송업체를 통해 진행되며, 배송업체에게 상품이 인도되는 시점에 배송업체의 책임과 비용으로 회원에게 상품 배송이 진행됩니다. 상품 자체의 하자 또는 회사의 고의, 중과실로 발생한 문제 등에 대해서는 회사가 그 책임을 부담합니다. 다만, 배송과정에서 발생하는 문제는 상법 등 관련 법령에 따라 배송업체가 회원에 대하여 직접 책임을 부담합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_05" className="sub_tit">제54조 기타 사항</p>
                                                <ol className="mb40">
                                                    <li>1. 단체 주문 배달 서비스 이용 시 별 적립 등 스타벅스 리워드 혜택은 제공되지 않습니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                        <p className="pri_tit" id="quick_05">제 9 장 기타</p>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p id="quick_06_01" className="sub_tit">제 55 조 전자영수증(e-Receipt &amp; History)의 발행 및 거래 내역의 확인</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 이용자의 사이렌 오더 거래, Delivers 서비스를 통한 거래와 회원이 매장을 통해 거래한 내역 및 그 증빙에 대하여, 전자적 형태인 전자 영수증으로 우선 발급하며, 회원은 이에 동의합니다.</li>
                                                    <li>2. 제1항에도 불구하고, 회원이 지류 형태의 영수증 발급을 희망하는 경우 회원은 해당 거래가 발생한 매장에 방문하여 지류 영수증의 발급을 요청할 수 있습니다. 단, Delivers 서비스를 통한 거래의 경우 지류 영수증의 발급이 불가할 수 있습니다.</li>
                                                    <li>3. 홈페이지 또는 스타벅스 모바일 애플리케이션을 통한 Starbucks Card 충전, 스타벅스 모바일 카드 구매, 충전 및 스타벅스 모바일 상품권 구매 등 제1항에 포함되지 않는 거래에 해당하는 경우에는 전자 영수증이 별도로 발행되지 않을 수 있습니다. 단, 본 조 제6항에 따라 당해 거래내역을 확인할 수 있습니다.</li>
                                                    <li>4. 회원은 홈페이지와 스타벅스 모바일 애플리케이션의 “전자영수증(e-Receipt &amp; History)” 메뉴를 통해 사이렌 오더 주문, 등록된 Starbucks Card의 결제 및 e-쿠폰 결제 등 매장에서 승인 완료된 회원의 거래내역 등을 확인할 수 있습니다. 비회원의 경우, 사이렌 오더 거래에 한하여 홈페이지 “비회원 전자영수증 조회” 메뉴에서 영수증을 확인할 수 있습니다.</li>
                                                    <li>5. 회사는 다음 각 호에 해당하는 경우, “전자영수증(e-Receipt &amp; History)” 서비스 전부 또는 일부를 제한하거나 중지할 수 있습니다.
                                                        <ol>
                                                            <li>가. 서비스를 위한 설비 보수, 점검, 교체 등의 사유로 일시적인 서비스 장애가 발생한 경우</li>
                                                            <li>나. 제반 설비의 장애 또는 이용폭주 등의 사유로 정상적인 서비스 이용이 어려운 경우</li>
                                                            <li>다. 천재지변 등 불가항력적 사유가 발생한 경우</li>
                                                        </ol>
                                                    </li>
                                                    <li>6. 회사는 관련 법령에 의거하여 회원과의 거래내역을 거래가 발생한 날로부터 최대 5년 간 보관하며, 해당 기간 동안 회원은 회사가 제공하는 홈페이지 및 스타벅스 모바일 애플리케이션을 통하여 열람 및 확인할 수 있습니다. 스타벅스 모바일 카드의 거래내역은 스타벅스 모바일 카드 선물내역에서 최대 1년 간의 거래내역 확인이 가능하며, 스타벅스 모바일 상품권의 거래내역은 스타벅스 모바일 상품권 보낸 선물 메뉴에서 최대 5년 간의 거래내역을 확인할 수 있습니다. 또한, 온라인 스토어의 거래내역은 마이페이지에서 최대 5년간의 거래내역을 확인할 수 있습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_02" className="sub_tit">제 56 조 약관의 해석 등</p>
                                                <ol className="mb40">
                                                    <li>본 약관에 명시되지 않은 사항 또는 본 약관 해석상 다툼이 있는 경우에는 이용자와 회사의 합의에 의하여 결정합니다. 다만, 합의가 이루어지지 않은 경우에는 관계법령 및 거래관행에 따릅니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_03" className="sub_tit">제 57 조 책임 제한</p>
                                                <ol className="mb40">
                                                    <li>1. 회사는 천재지변 기타 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없거나 회사의 귀책사유가 없는 경우에는 책임을 지지 않습니다.</li>
                                                    <li>2. 회사는 서비스 이용과 관련하여 이용자의 고의 또는 과실로 인하여 발생한 손해에 관하여 책임을 지지 않습니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_04" className="sub_tit">제 58 조 손해배상</p>
                                                <ol className="mb40">
                                                    <li>1. 이용자가 본 약관의 규정을 위반함으로 인하여 회사에 손해가 발생하게 되는 경우, 이용자는 회사에 발생하는 손해를 배상해야 합니다.</li>
                                                    <li>2. 서비스를 이용하면서 불법행위나 본 약관을 위반하는 행위를 한 이용자로 말미암아 회사가 해당 이용자 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는다면 해당 이용자는 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 당해 이용자는 그로 인하여 회사에 발생한 손해를 배상해야 합니다.</li>
                                                </ol>
                                            </li>
                                            <li>
                                                <p id="quick_06_05" className="sub_tit">제 59 조 관할법원</p>
                                                <ol className="mb40">
                                                    <li>본 약관과 관련하여 회사와 이용자 사이에 발생한 분쟁에 관한 소송은 회사의 소재지를 관할하는 법원 또는 민사소송법상의 관할법원을 관할법원으로 합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>
                                        <ol className="pri_con pri_con2 mb40">
                                            <li>
                                                <p><span className="color_point">본 이용약관은 2024년 11월 19일부터 시행합니다.</span></p>
                                            </li>
                                        </ol>
                                    </li>
                                    <li>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="terms">
                            <input type="checkbox" id="privacycheck" className="check_style" 
                            checked={privacyChecked} onChange={()=>setPrivacyChecked(!privacyChecked)}/>
                            <label htmlFor="privacycheck">
                                <span className="chk"></span>
                                <span className="terms_title">
                                <strong>[필수]</strong> 개인정보 수집 및 이용동의
                                </span>
                            </label>
                            <div className="terms_scroll_box">
                                <ul className="pri_terms_wrap">
                                    <li>
                                        <p className="pri_con">본인은 스타벅스 코리아를 운영하는 주식회사 에스씨케이컴퍼니(이하 '회사'라 합니다)가 제공하는 회원 서비스(이하 ‘서비스’라 합니다)를 이용하기 위해, 다음과 같이 ‘회사’가 본인의 개인정보를 수집/이용하는 것에 동의합니다.</p>
                                    </li>
                                    <li>
                                        <p className="pri_con">※ 귀하께서는 개인정보 수집·이용에 대한 동의를 거부하실 수 있으나, 동의를 거부하실 경우 회원가입, 서비스 이용 등을 하실 수 없습니다.</p>
                                    </li>
                                    <li>
                                        <ul className="pri_con">
                                            <li>
                                                <span className="pri_tit">1. 개인정보 항목·목적·보유기간</span>
                                                    <table className="vod_tb_ag mb20 mt10">
                                                    <caption className="hid">수집하는 개인정보에 대한 항목, 목적, 보유기간 안내 테이블</caption>
                                                        <colgroup>
                                                            <col width=""/>
                                                            <col width="80%"/>
                                                        </colgroup>
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">구분</th>
                                                            <th scope="col">필수</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <th scope="row"><span>항목</span></th>
                                                                <td className="taLeft">성명, 생년월일, 성별, 아이디, 비밀번호, 휴대전화번호, E-Mail, DI (Duplication information), 아이핀번호, 스타벅스 카드 번호, 스타벅스 카드 Pin 번호</td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"><span>목적</span></th>
                                                                <td> - 회원가입, 본인확인<br/> - 서비스 제공 및 개선<br/> * 상품(제품), 서비스 결제, 환불, 배송<br/> * 개인 맞춤형 서비스 및 혜택 제공<br/> - 회원관리, 부정이용 방지<br/> - 서비스 관련 이벤트 및 행사정보 안내<br/> (별도 마케팅정보 수신 동의 회원에 한함) 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <th scope="row"><span>보유 및 <br/>
                                                                이용기간</span></th>
                                                                <td>
                                                                    <span className="underLine">회원 탈퇴 시 즉시 파기(단, 반복 재가입 등의 방법을 이용한 서비스 부정이용 방지를 위해 이름, ID, DI, 성별, 생년은 탈퇴 후 30일 보관) 또는 관계법령에 의한 별도 보존기간</span> (2. 관계법령에 의한 개인정보 보존기간참고)</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                            </li>
                                            <li>
                                                <span>2. 관계법령에 의한 개인정보 보존기간</span>
                                                <ul>
                                                    <li>- 서비스이용기록, 접속로그, 접속IP정보 (통신비밀보호법 : 3개월)</li>
                                                    <li>- 표시/광고에 관한 기록 (전자상거래법 : 6개월)</li>
                                                    <li>- 계약 또는 청약철회 등에 관한 기록 (전자상거래법 : 5년)</li>
                                                    <li>- 대금결제 및 재화 등의 공급에 관한 기록 (전자상거래법 : 5년)</li>
                                                    <li>- 소비자의 불만 또는 분쟁처리에 관한 기록 (전자상거래법 : 3년)</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="terms">
                            <input type="checkbox" id="cardcheck" className="check_style"
                                checked={cardChecked}
                                onChange={() => setCardChecked(!cardChecked)}
                                />
                                <label htmlFor="cardcheck">
                                    <span className="chk"></span>
                                    <span className="terms_title">
                                    <strong>[필수]</strong> 스타벅스 카드 이용약관  
                                    </span>
                                </label>
                                <div className="terms_scroll_box">
                                    <div className="pri_terms_wrap">
                                        <p className="pri_tit">스타벅스 코리아는 고객님을 보호합니다.</p>
                                        <p>본 약관은 스타벅스 코리아의 스타벅스 카드 이용과 관련하여 필요한 사항을 규정합니다.</p>

                                        <p className="pri_tit">제 1 장 총칙</p>

                                        <p className="sub_tit">제 1 조 (목적)</p>
                                        <p className="pri_con">본 약관은 스타벅스 코리아를 운영하는 주식회사 에스씨케이컴퍼니(이하 '회사'라 합니다)가 발행한 스타벅스 카드를 구입 또는 정당한 방법으로 소지한 고객이 회사가 제공하는 스타벅스 카드 서비스를 이용함에 있어 필요한 이용 조건, 절차 및 당사자간의 권리, 의무 등 기본적인 사항을 규정하는 것을 목적으로 합니다.</p>

                                        <p className="sub_tit">제 2 조 (용어의 정의)</p>
                                        <ol className="pri_con">
                                            <li>본 약관에서 사용하는 용어는 다음과 같이 정의합니다.</li>
                                            <li>1. '스타벅스 카드'란 회사가 정의한 기술사양에 따라 회사가 인증한 Chip 또는 Application을 내장하고 스타벅스 카드 브랜드를 부착한 카드로 선불 결제할 수 있는 수단임과 동시에 고객이 “별”을 적립하여 서비스를 정상적으로 이용할 수 있도록 회사가 승인한 카드로서 회사가 발급합니다. 스타벅스 카드는 지류 또는 플라스틱의 소재의 ‘실물 스타벅스 카드’와 모바일 APP에서 확인 가능한 전자적 형태의 ‘모바일 카드’로 구분되며, 회원은 실물 스타벅스 카드를  모바일APP에 등록함으로써 ‘모바일 카드’로도 사용하실 수 있습니다.</li>
                                            <li>2. '고객'이란 본 약관에 동의하고 매장에서 스타벅스 카드를 구입, 충전하거나 기타 정당한 방법으로 소지한 자를 말합니다. </li>
                                            <li>3. “회원”이란 고객 중 회사의 홈페이지 등을 통해 이용 약관과 개인정보의 수집, 제공 및 활용에 관한 동의서에 동의하고, 소지한 스타벅스 카드를 등록한 자를 말합니다.</li>
                                            <li>4. '매장'이란 회사가 직영으로 운영하는 모든 매장을 말합니다.</li>
                                            <li>5. '최초 충전(Activation)'이란 스타벅스 카드를 처음 구입하여 충전 하는 행위를 말합니다.</li>
                                            <li>6. '결제(Redemption)'란 스타벅스 카드로 이용금액의 전체 또는 일부 금액을 결제하는 행위를 말합니다.</li>
                                            <li>7. '잔액 조회(Balance inquiry)'란 스타벅스 카드의 잔액에 대해 문의하는 행위를 말합니다.</li>
                                            <li>8. '재충전(Reload)'이란 소지한 스타벅스 카드에 금액을 재충전하는 행위를 말합니다.</li>
                                            <li>9. '환급' 또는 “환불”이란 스타벅스 카드에 기록된 잔액을 고객과 회사간에 약정된 방법과 절차에 따라 고객에게 돌려주는 것을 말합니다.</li>
                                            <li>10. '고장카드'란 정상적으로 사용이 불가능한 스타벅스 카드를 말하며, 불량카드와 파손카드로 구분합니다.
                                                <ol>
                                                    <li>가. 고장카드 중 '불량카드'란 스타벅스 카드의 외형상 이상은 없으나, 기능상의 문제로 단말기 등에서 사용이 불가능한 상태의 스타벅스 카드를 말합니다.</li>
                                                    <li>나. 고장카드 중 '파손카드'란 고객의 고의 혹은 과실로 구멍 뚫림, 구김, 휘어짐, 찍힘, 태움, 조각남, 깨짐, 갈라짐, 카드 번호 지워짐 등으로 인하여 훼손된 스타벅스 카드를 말합니다.</li>
                                                </ol>
                                            </li>
                                            <li>11. 'Free Extra&nbsp;제공'이란 스타벅스 카드로&nbsp;매장에서&nbsp;직접&nbsp;음료 구매 시 제조한 음료에 Extra(샷, 시럽, 드리즐, 휘핑, 자바칩 등)를 제공하는 혜택을 말합니다.</li>
                                            <li>12. '별'이란 고객이 회사의 제품 및 상품을 구입할 경우 회사가 고지한 방침에 따라 부여되는 혜택을 말합니다.</li>
                                            <li>13. '별 부정 적립 및 사용'이란 고객이 제품 및 상품을 구매 또는 사용하지 않았음에도 불구하고 해당 고객에게 별이 적립 또는 사용된 경우를 말합니다.</li>
                                            <li>14. “스타벅스 리워드(Starbucks Rewards)”란 스타벅스 카드 회원에게 회사가 혜택을 제공하는 프로그램입니다.</li>
                                            <li>15. “실물카드 활성/비활성 설정”이란 실물 스타벅스 카드를 계정에 등록한 회원이 본인에게 등록된 실물 스타벅스 카드를 결제 · 잔액 조회 · 재충전 · 환급 등 사용 불가능하도록 설정(이하 ‘실물카드 비활성 설정’이라 함)하거나, 또는 실물 카드 비활성 설정된 실물 스타벅스 카드를 다시 결제 · 잔액 조회 · 재충전 · 환급 등 사용이 가능하도록 하는 설정(이하 ‘실물카드 활성 설정’이라 함) 할 수 있도록 하는 서비스를 말합니다. 회원이 이러한 설정을 하지 아니하거나 지연함으로써 발생하는 회원의 손해에 대하여 회사는 어떠한 책임도 부담하지 않습니다.</li>
                                            <li>16. “자동 재충전”이란 회원의 선택에 따라 특정 일자에 특정 금액이 자동으로 결제되어 스타벅스 카드에 충전되거나, 또는 회원의 카드 잔액이 일정금액 이하로 하락하는 경우 지정한대로 특정 금액이 결제되는 절차를 말합니다.</li>
                                            <li>17. “e-프리퀀시 카드”란 스타벅스 리워드 가입을 하면 회원의 계정에 자동으로 발급되는 온라인 적립 수단이며, 회사에서 프로모션을 진행하면 등록된 스타벅스 카드 결제를 통해 e-스티커를 적립하여 관련 혜택을 받을 수 있습니다.</li>
                                            <li>18. “무기명 카드”란 회원 계정에 등록되지 않은 모든 스타벅스 카드를 말합니다.</li>
                                            <li>19. “제휴 신용카드”란 스타벅스와 제휴 신용카드사 간의 제휴계약 체결을 통해 출시된 신용카드로서, 동 카드의 사용 실적에 따른 혜택 및 제공 방법은 제휴 신용카드사의 규정을 따릅니다.</li>
                                            <li>20. ‘Greeting Card’란 고객이 별을 적립하여 서비스를 정상적으로 이용할 수 있도록 회사가 승인한 스타벅스 카드로서 회사가 발급하며, 동 카드와 관련된 상세사항은 본 약관을 따릅니다. Greeting Card 에는 충전금액이 들어있지 않으며 홈페이지 또는 모바일 APP에서 확인 가능한 모바일 카드 형태로 발급됩니다. 또한, Greeting Card의 경우 타인에게 양도가 제한될 수 있습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 3 조 (약관의 효력 및 변경 등)</p>
                                        <ol className="pri_con">
                                            <li>1. 본 약관은 그 내용을 회사가 홈페이지에 게시하고, 고객이 스타벅스 카드를 충전 후 소지 또는 기타 정당한 방법으로 소지하여 사용함으로써 그 효력이 발생됩니다.</li>
                                            <li>2. 회사는 본 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 홈페이지에 그 적용일의 7일 전부터 공시하거나 회원이 입력한 가장 최근의 e-mail로 전송하는 방법으로 회원에게 고지합니다. 다만, 회원에게 불리한 내용으로 약관을 개정하는 경우에는 적용일로부터 30일 전까지 홈페이지에 공시하고 회원이 입력한 가장 최근의 e-mail로 전송하는 방법으로 회원에게 고지합니다.</li>
                                            <li>3. 본 조의 규정에 의하여 개정된 약관은 원칙적으로 그 변경되는 약관의 효력 발생일로부터 장래를 향하여 유효합니다.</li>
                                            <li>4. 고객이 변경된 약관 사항에 동의하지 않을 경우, 약관의 효력 발생 전일까지 서비스 이용을 중단하거나 회원탈퇴 및 등록된 스타벅스 카드를 고객이 계정에서 등록 해지함으로써 이용 계약을 해지할 수 있으며, 약관의 개정과 관련하여 효력 발생일 전일까지 이의를 제기하지 않는 경우에는 개정된 약관에 동의한 것으로 간주합니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 4 조 (약관의 해석 등)</p>
                                        <p className="pri_con">본 약관에 명시되지 않은 사항 또는 본 약관 해석상 다툼이 있는 경우에는 고객과 회사의 합의에 의하여 결정합니다. 다만, 합의가 이루어지지 않은 경우에는 관계법령 및 거래관행에 따릅니다.</p>

                                        <p className="pri_tit">제 2 장 스타벅스 카드 서비스</p>

                                        <p className="sub_tit">제 5 조 (목적별 이용)</p>
                                        <ol className="pri_con">
                                            <li>1. 선불 결제 수단
                                                <ol>
                                                    <li>가. 고객은 국내 스타벅스 매장 어디에서나 스타벅스 카드로 서비스를 제공받거나 제품 및 상품을 구매할 수 있습니다. <br/>단, 스타벅스 카드의 발행 목적, 매장의 임대차 계약상 임대인이 요구한 조건, 또는 기술적 사유(시스템 점검, 단말기 고장, 통신회선 불량, 신규 카드 또는 단말기의 안정화 작업 등)로 일부 스타벅스 카드는 매장 내 이용이나 충전, 환급 신청이 제한될 수 있으며, 이 경우 회사는 매장에
                                                        배포된 안내장 또는 홈페이지 등을 이용하여 고객에게 고지합니다.</li>
                                                    <li>나. 스타벅스 카드로 매장에서 직접 제조한 음료를 구입하는 경우 Free Extra 추가 등과 같은 사전 공지된 별도의 혜택을 받으실 수 있습니다. 다만, 이 혜택은 음료 1잔 구매 시 1회에 한하여 제공되며, 구체적인 혜택 사항은 회사의 마케팅 정책에 따라 변경될 수 있습니다.</li>
                                                    <li>다. 스타벅스 카드는 기술적 결함이나 네트워크의 오류 및 장애 발생으로 일시적으로 서비스 이용에 제한이 발생할 수 있습니다.</li>
                                                    <li>라. 스타벅스 카드 잔액에 대한 고객의 권리는 최종 충전일 또는 최종 사용일 중 늦은 날로부터 5년이 경과하면 자동 소멸합니다. 다만, 회사가 자발적으로 스타벅스 카드의 사용을 허락한 경우에는 소멸시효를 적용하지 않습니다.</li>
                                                </ol>
                                            </li>
                                            <li>2. 스타벅스 리워드(Starbucks Rewards)
                                                <ol>
                                                    <li>가. 회원은 회사의 계정에 스타벅스 카드를 등록함으로써, 스타벅스 카드의 스타벅스 리워드 혜택을 받을 수 있습니다.</li>
                                                    <li>나. 별 적립: 회원은 회사에서 제품 및 상품 구입을 통하여 별을 적립 받을 수 있습니다. 구체적인 적립 방법과 적립 기준은 본 약관 제11조의 별 적립 기준에 따라 제공됩니다.</li>
                                                    <li>다. 기타 서비스: 회사는 추가적인 서비스를 개발하여 회원에게 제공할 수 있습니다. 서비스 제공 기준은 각각의 서비스 제공 시점에 회사 홈페이지에 고시한 기준으로 적용됩니다.</li>
                                                    <li>라. 회원이 본 약관 또는 회사 개인정보취급방침에 따라 등록해야 하는 고객에 대한 정보를 등록하지 않거나 허위로 등록하는 경우 본 조에 따른 혜택의 이용이 제한될 수 있습니다.</li>
                                                </ol>
                                            </li>
                                        </ol>

                                        <p className="sub_tit">제 5 조의 2 (발행 등)</p>
                                        <ol className="pri_con">
                                            <li>스타벅스 카드의 발행 관련 구체적인 내용은 다음과 같습니다.</li>
                                            <li>1. 발행자: 주식회사 에스씨케이컴퍼니</li>
                                            <li>2. 구매가격: 스타벅스 카드는 별도의 카드 구매가격이 없는 충전식 상품권입니다.</li>
                                            <li>3. 사용조건 (사용가능금액, 제공 가능 물품 등) <br/>스타벅스 카드는 충전식 상품권으로, 고객이 사용할 수 있는 금액은 충전한 금액과 같으며, 현금과 동일하게 스타벅스 매장에서 제품 및 상품을 구매할 수 있습니다.</li>
                                            <li>4. 사용가능 가맹점: 스타벅스 카드는 국내 스타벅스 매장 어디에서나 사용이 가능합니다.</li>
                                            <li>5. 환불 조건 및 방법: 고객이 충전된 금액의 잔액 요청 시, 회사는 최종 충전 후 그 시점의 잔액을 기준으로 60% 이상을 사용한 후 40% 이하에 해당하는 잔액의 반환을 요구하는 경우 홈페이지 또는 매장을 통해 환급을 신청할 수 있습니다. 보다 자세한 방법은 본 약관 제10조를 참조바랍니다.</li>
                                            <li>6. 스타벅스 카드는 충전금액에 대하여 전자상거래(결제수단) 보증보험증권에 가입되어 있습니다.</li>
                                            <li>7. 스타벅스 카드의 이용과 관련하여 고객 피해 발생시, 회사의 고객지원부서 및 공정거래위원회 소비자상담센터에 연락을 하실 수 있으며, 전화번호는 아래와 같습니다.</li>
                                            <li>회사 고객지원센터: 1522 - 3232(유료)</li>
                                            <li>공정거래위원회 소비자상담센터: (국번없이) 1372</li>
                                        </ol>

                                        <p className="sub_tit">제 6 조 (스타벅스 리워드 회원가입)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사의 홈페이지에 가입하면 ‘Greeting Card’가  자동으로 발급 및 등록될 수 있으며, 이 경우 스타벅스 리워드 회원의 자격이 부여됩니다.</li>
                                            <li>2. 스타벅스 카드는 회사의 전국 매장(일부 매장 제외)에서 최초 충전하실 경우 발급 받으실 수 있습니다.</li>
                                            <li>3. 스타벅스 리워드 회원이 되고자 하는 고객은 본 약관에 동의하고 회사가 발급한 스타벅스 카드를 최초 충전하거나  스타벅스 모바일 카드로 양도 받은 후 모바일 APP을 통해 계정에 등록함으로써 스타벅스 리워드 프로그램에 참여할 수 있습니다. 단, 14세 미만인 자는 회원 가입이 불가합니다.</li>
                                            <li>4. 스타벅스 리워드 회원이 되시면, e-프리퀀시 카드가 계정을 통해 자동으로 발급됩니다.</li>
                                            <li>5. 고객으로부터 회원 가입신청이 있는 경우 회사는 자체 기준에 따른 심사를 거친 뒤 동 기준을 만족시키는 고객에게 회원 자격 및 스타벅스 리워드 혜택 이용을 승인하여 드립니다.</li>
                                            <li>6. 회원은 회원 자격을 타인에게 양도하거나 대여하거나 담보의 목적물로 이용할 수 없습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 7 조 (회원 탈퇴 및 자격 상실)</p>
                                        <ol className="pri_con">
                                            <li>1. 회원은 언제든지 홈페이지를 통해 회원 탈퇴를 요청할 수 있으며, 당사는 회원의 요청에 따라 조속히 회원 탈퇴에 필요한 제반 절차를 수행합니다. <br/>(단, 회원이 탈퇴를 요청할 때에는 회원의 계정에 등록된 스타벅스 카드에 잔액이 없거나 잔액이 있는 스타벅스 카드가 모두 등록 해지되어야 합니다.)</li>
                                            <li>2. 회원이 다음 각 호의 사유에 해당하는 경우, 당사는 당해 회원에 대한 통보로써 회원의 자격을 제한 또는 정지시킬 수 있고, 14일의 기간을 정하여 시정하거나 소명할 기회를 부여한 뒤, 회원의 소명이 없거나 그 소명이 정당하지 아니할 경우 회원의 자격을 상실시킬 수 있습니다. 단, '다'의 경우에는 별도의 통보 없이 당연히 자격이 상실됩니다.</li>
                                            <li>가. 카드 등록 시에 허위의 내용을 등록한 경우</li>
                                            <li>나. 별 또는 e-쿠폰을 부정 적립 또는 부정 사용하는 등 서비스를 부정한 방법 또는 목적으로 이용한 경우</li>
                                            <li>다. 회원이 사망한 경우</li>
                                            <li>라. 다른 회원의 서비스 이용을 방해하거나 그 정보를 도용하는 경우</li>
                                            <li>마. 스타벅스 카드 이용과 관련하여 법령, 본 약관 또는 공서양속에 반하는 행위를 하는 경우</li>
                                            <li>바. 회사 또는 기타 제3자에 대해 명예 또는 신용 훼손, 폭언, 폭행, 성적 언행 등 부적절한 행위를 하거나 업무를 방해하는  행위</li>
                                            <li>사. 구매상품을 정당한 이유 없이 상습적으로 취소 또는 반품(환불)하는 등의 방법으로 회사의 업무를 현저히 방해하는 경우</li>
                                            <li>아. 재판매 목적으로 재화 등을 대량으로 중복 구매하여 공정한 거래질서를 현저히 방해하는 경우</li>
                                            <li>자. 상품 구매 및 서비스 이용 시 정상적인 거래 범위를 현저히 이탈하여 오남용하는 경우</li>
                                            <li>차. 사기 등 불법 또는 부정한 방법으로 서비스를 이용한 경우</li>
                                            <li>카. 기타 회원으로서의 자격을 지속시키는 것이 객관적으로 부적절하다고 판단되는 경우</li>
                                        </ol>
                    
                

                                        <p className="sub_tit">제 8 조 (카드의 이용 및 관리)</p>
                                        <ol className="pri_con">
                                            <li>1. 회원이 스타벅스 카드에 적립된 별에 따른 혜택을 이용하고자 할 경우에는 반드시 스타벅스 카드를 제시하는 것을 원칙으로 합니다. 단, 여기에서 '스타벅스 카드를 제시한다'함은 스타벅스 카드를 회사에 보여주는 행위, 단말기에 읽히는 행위 등 스타벅스 카드를 이용하고자 하는 고객이 회사로부터 적법하게 인정된 회원임을 증명하는 행위를 말합니다.</li>
                                            <li>2. 회원이 서비스를 이용하고자 스타벅스 카드를 제시할 경우 회사는 회원에게 본인 확인을 위한 신분증 제시를 요청할 수 있습니다. 이 경우 회원은 회사의 요청을 준수하여야 정상적인 서비스를 제공받을 수 있습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 9 조 (충전)</p>
                                        <ol className="pri_con">
                                            <li>1. 스타벅스 카드의 충전은 다음 각 호의 방법으로 가능합니다.
                                                <ol>
                                                    <li>가. 고객이 매장(일부 매장 제외)을 직접 방문하여 현금 또는 회사가 현금과 동일하게 인정하는 금전적 가치(신용카드 등)를 제공하는 방법으로 해당 가치를 전자적 장치(단말기 등)를 이용하여 스타벅스 카드에 직접 저장하는 방법</li>
                                                    <li>나. 회원이 회사와 약정한 절차에 따라 사전에 일정금액을 회사에 지급하고 회사는 지급 받은 금액에 해당하는 가치를 스타벅스 카드에 관한 정보를 기준으로 회사의 시스템에 전자적 방법으로 저장한 후, 회원과 회사가 약정한 조건에 따라 별도의 절차 없이 회사가 지정한 전자적 장치 (단말기 등)를 통해 회사의 시스템에 저장된 가치를 스타벅스 카드로 이전하여 기록하는 방법 (이하 “인터넷 결제를 통한 충전”이라고
                                                        합니다.)
                                                    </li>
                                                    <li>다. 기타 회사가 사전에 고지하고 고객이 해당 방법을 이용함으로써 동의 의사가 표시된 방법</li>
                                                </ol>
                                            </li>
                                            <li>2. 스타벅스 카드에 충전할 수 있는 최소 최초 충전 금액은 5천원이며, 이는 회사의 마케팅 정책에 따라 변경될 수 있습니다. 1장의 스타벅스 카드에 저장되는 총 금액 한도, 1회 충전 시 충전할 수 있는 금액, 계정당 스타벅스 카드 잔액 보유 한도 등에 대한 기준은 다음 각호와 같습니다. 회사는 스타벅스 모바일 카드에 대한 결제수단별 구매 가능 금액과 스타벅스 카드 교환권의 계정 등록 가능 금액을 관련 법령 및 회사의 사정에 따라 달리 정할 수 있으며, 그 구체적 금액은 홈페이지 또는 모바일 APP을 통해 안내합니다.            
                                                <ol>
                                                    <li>가. 1장의 스타벅스 카드 당 잔액 보유 한도는 55만원입니다.</li>
                                                    <li>나. 1회 충전 시 최초 충전 50만원, 재충전 55만원까지 가능합니다. 단, 계좌이체를 통한 충전은 전단의 조건을 충족하는 범위 내에서 하나의 계좌당 1일 최대 30만원까지 가능합니다.</li>
                                                    <li>다. 계정당 스타벅스 카드 잔액 보유 한도는 200만원입니다.</li>
                                                    <li>라. 결제취소로 구매대금이 스타벅스 카드로 반환되는 경우 예외적으로 위 잔액 보유 한도를 초과할 수 있습니다.</li>
                                                    <li>마. 이 외 회사가 별도로 지정하여, 회사의 홈페이지 등에 공지한 사항</li>
                                                </ol>
                                            </li>
                                            <li>3. 스타벅스 카드에 충전된 금액에 대하여는 이자가 발생되지 않습니다.</li>
                                            <li>4. 다음 각호에 해당되는 경우 회사는 고객의 충전을 제한할 수 있습니다.
                                                <ol>
                                                    <li>가. 회사가 아닌, 다른 국가의 Starbucks 사업자가 발행한 Card 등을 소지한 경우</li>
                                                    <li>나. 기타 충전이 불가능한 기술적, 제도적 사유가 발생한 경우</li>
                                                </ol>
                                            </li>
                                            <li>5.  고객은 스타벅스 카드에 저장된 금액을 다른 스타벅스 카드로 이체할 수 없습니다. 단, 고객이 무기명 스타벅스 카드의 고장으로 인해 교체 신청하는 경우에는 무기명 카드로 이체할 수 있습니다. 또한 회원이 본인 계정에 등록된 카드의 고장으로 인해 교체신청을 하거나, 잔액 이체를 신청하는 경우로서, 이체 신청 시점에 다음 각 호에 해당하는 사유가 없는 경우에 한하여 제한적으로 가능합니다. 
                                                <ol>
                                                    <li>가. Delivers 서비스를 통해 진행 중인 주문 또는 예약 건의 제 · 상품이 배송 업체에게 인도되기 전인 경우</li>
                                                    <li>나. 온라인 스토어를 통해 진행 중인 주문 건의 제 · 상품이 배송 완료되기 전인 경우</li>
                                                    <li>다. 스타벅스 모바일 상품권 결제 완료일로부터 7일이 경과하지 아니한 경우</li>
                                                    <li>라. 진행 중인 주문 예약 건의 홀케이크를 회원이 수령하기 전인  경우</li>
                                                    <li>마. 사이렌 오더를 통해 진행 중인 주문을 회원이 수령하기 전인 경우(단, 그 진행 중인 주문이 홈페이지 이용약관 '제19조 5.'의 상품 등에 대한 것인 경우는 제외되며, 그 진행 중인 주문이 홀케이크 예약인 경우에는 '본조 5. 라.'가 적용됩니다.)</li>
                                                    <li>바. 이 외 회사가 별도로 지정하여 회사의 홈페이지 등에 공지한 사항</li>
                                                </ol>
                                            </li>
                                            <li>6. 회원은 제3자에게 스타벅스 카드를 충전하여 선물하기 기능 등을 통해서 양도할 수 있습니다. 단, 이 때 제3자에게 양도한 카드는 거래가 없는 경우 당일에 한해서만 양도행위에 대한 취소가 가능합니다. 이와 관련된 구체적인 지침이나 정책은 회사의 마케팅 정책에 따라 달라질 수 있습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 9 조의 2 (자동 재충전)</p>
                                        <ol className="pri_con">
                                            <li>스타벅스 리워드(Starbucks Rewards)로 회원등록이 되어 있는 스타벅스 카드의 경우, 아래와 같은 방법으로 자동 재충전을 설정할 수 있습니다.</li>
                                            <li>1. 기준 하한 자동 재충전: 회원이 지정한 카드의 최저 잔액 이하로 잔액이 하락하는 경우, 회원이 사전에 선택한 결제 수단으로 지정한 금액이 재충전 됩니다.</li>
                                            <li>2. 월 정액 자동 재충전: 회원이 지정한 특정 일자에 사전에 선택한 결제 수단으로 지정한 금액이 재충전 됩니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 9 조의 3 (결제 확인 통지•안내•충전신청 변경 및 취소)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 회원이 인터넷 결제를 통한 충전을 신청한 경우 결제와 동시에 팝업창 등을 통해 결제 확인을 통지하며, 회원의 선택에 따라 e-mail로 결제 관련 정보를 안내해 드립니다. 회사의 확인통지가 회원에게 도달한 시점에 계약이 성립된 것으로 보고, 그 통지에는 회원의 구매신청에 대한 확인 및 판매가능여부, 구매신청의 정정 취소절차 등에 관한 정보 등을 포함하도록 합니다.</li>
                                            <li>2. 회원은 의사표시의 불일치 등이 있는 경우에는 구매신청 변경 및 취소를 요청할 수 있고, 회사는 특별한 사정이 없는 한 그 요청에 따라 처리하여야 합니다. 다만 이미 대금이 지급된 경우에는 제10조의 2의 청약철회 등에 관한 규정에 따릅니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 10 조 (환급)</p>
                                        <ol className="pri_con">
                                            <li>1. 고객이 스타벅스 카드에 충전된 잔액의 환급을 요청하는 때에는 회사는 스타벅스 카드의 상태에 따라 다음 각호에 명시된 절차에 의거하여 환급 처리를 합니다.
                                                <ol>
                                                    <li>가. 구매하거나 충전한 정상카드의 잔액은 현금으로 반환되지 않습니다. 단, 구매 또는 최종 충전 후 그 시점의 잔액을 기준으로 60% 이상을 사용한 후 40% 이하에 해당하는 잔액의 반환을 요구하는 경우 등록된 스타벅스 카드의 회원은 모바일 APP을 통해서 환급을 신청할 수 있고, 등록되지 않은 카드의 소지인은 매장에 환급을 신청할 수 있습니다. 단, 40% 이하에 해당하는 잔액을 다른 카드로 이체하거나 카드를 교체한 경우에는 현금으로 반환되지 않습니다.
                                                        <ol>
                                                            <li>- 등록되지 않은 정상카드도 계정에 등록한 후 환불 접수가 가능합니다.</li>
                                                            <li>- 본인 계정에 등록된 정상카드에 대하여 모바일 APP을 통해 잔액 환급을 신청하면, 회사에서 확인 후 고객이 지정한 계좌로 신청일로부터 영업일 기준 7일 이내에 잔액을 환급해 드립니다. 단, 고객 본인의 환급 신청 계좌정보를 오입력 또는 부정 사용 등으로 인해 확인 절차가 필요한 경우에는 환급이 지연될 수 있으나, 회사 귀책이 없는 사유로 환급이 지연되는 경우가 아닌 한 환급 신청 시부터 환급 시까지의 전체 기간은 30일을 초과하지 않습니다.</li>
                                                            <li>- 매장을 통해 환급을 신청하는 경우 등록되지 않은 무기명 카드는 환급을 신청한 카드소지인에게 현금으로 환급해 드리지만, 스타벅스 리워드 등록 회원은 반드시 본인이 직접 환급을 신청해야 하며 본인 확인 후 현금으로 환급해 드립니다. 이 경우 고객이 환불 금액을 수령할 때 한 서명은 향후 정상적으로 환불 금액을 수령하였다는 사실을 입증하는 자료로 사용됩니다.</li>
                                                            <li>- 매장 중 백화점 및 쇼핑몰에 입점되어 있어 정책상 카드의 충전이 불가능한 매장에서는 환급도 불가능할 수 있습니다. 이 경우 해당 매장 직원의 안내에 따라 인접 매장을 이용하거나 홈페이지를 통해 환급 받으실 수 있습니다.
                                                            </li>
                                                        </ol>
                                                    </li>
                                                    <li>나. 정상카드에 대한 충전을 취소하고자 하는 경우에는 해당 거래의 영수증을 지참하여 충전일로부터 14일 내에 해당 매장에 충전 취소를 요청함으로써 충전방법에 따라 현금 또는 신용카드 취소 등의 형식으로 환급해 드립니다. 단, 충전일로부터 14일을 경과한 경우에는 가.호에 따라 잔액을 환급해 드립니다.</li> 
                                                    <li>다. 고장카드는 매장에 접수하시면 잔액 확인 등의 절차를 거쳐 고장카드의 잔액이 충전된 신규 스타벅스 카드를 발급하여 드리며, 신규로 발급 받으신 후에는 고장카드를 사용하실 수 없습니다. 단, 고객이 고장카드의 잔액을 금전으로 받기 원하는 경우, 가.호에 따라 잔액을 환급하여 드립니다.
                                                        <ol>
                                                            <li>- 등록된 카드의 교환 처리 후, 신규로 교환 받은 카드는 모바일 APP을 통해 계정에 다시 등록을 한 후 스타벅스 리워드 프로그램의 혜택을 받을 수 있습니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>라. 고장카드 중 카드 번호의 식별이 불가능한 카드와 분실 신고된 카드는 신규 스타벅스 카드로의 발급 또는 환불이 불가능합니다.</li>
                                                </ol>
                                            </li>
                                            <li>2. 스타벅스 카드의 발행 목적 또는 기술적 사유(시스템 점검, 단말기 고장, 통신회선 불량, 신규 카드 또는 단말기의 안정화 작업 등)로 일부 스타벅스 카드는 환급이 제한될 수 있으며, 이 경우 회사는 별도의 환급 절차 및 방법을 매장에서 배포하는 안내장 또는 홈페이지 등을 이용하여 고객에게 고지합니다.</li>
                                        <li>3. 제9조 제5항 각호의 사유가 발생한 경우, 본조에 따른 환급이 제한됩니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 10 조의 2 (청약철회 등)</p>
                                        <ol className="pri_con">
                                            <li>1. 인터넷 결제를 통한 충전을 청약한 회원은 청약 후 결제가 완료된 날로부터 7일 이내에는 그 청약의 철회를 할 수 있습니다.</li>
                                            <li>2. 회사는 제1항의 청약철회를 수신한 날부터 3영업일 이내에 지급받은 대금을 환급합니다. 이 경우 그 환급을 지연하는 때에는 그 지연기간에 대하여 전자상거래 등에서의 소비자보호에 관한 법률 시행령이 정하는 지연이자율(연 100분의 15)을 곱하여 산정한 지연이자를 지급합니다.</li>
                                            <li>3. 회사는 위 대금을 반환함에 있어서 회원이 신용카드 또는 전자화폐 등의 결제수단으로 재화 등의 대금을 지급한 때에는 지체없이 당해 결제수단을 제공한 사업자로 하여금 재화 등의 대금의 청구를 정지 또는 취소하도록 요청합니다.</li>
                                            <li>4. 회사의 시스템에 저장된 가치가 이미 스타벅스 카드로 이전하여 기록된 경우에는 제10조의 규정에 의하여 환급합니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 11 조 (별 적립 및 등급별 혜택•e-프리퀀시 혜택)</p>
                                        <ol className="pri_con">
                                            <li>1. 별 적립 <br/>스타벅스 카드로 상품을 구입한 회원에 대하여 회사는 내부 별 적립 정책에 따라 회원 계정에 등록된 스타벅스 카드로 결제 시,?영수증 당 별?1개를 방문별로 지급하며,?이벤트 등 프로모션으로 지급되는 별의 구체적인 적립기준은 적립 시점의 회사의 별 적립 기준을 따릅니다.?구체적인 별 적립 기준은 홈페이지 또는?APP?내 메뉴에서 확인 가능합니다.
                                            </li>
                                            <li>2. 회원 등급별 혜택 및 쿠폰의 유효기간 <br/>적립된 유효 별의 개수에 따라 회원의 등급이 부여되며, 등급별로 다양한 혜택이 제공됩니다. 각 상위 등급은 하위 등급의 혜택이 포함됩니다. 단, 각 등급별 혜택은 회사의 관련 정책에 따라 변경될 수 있으며, 자세한 내용은 홈페이지에서 확인이 가능합니다. 스타벅스 카드의 사용에 따라 발급된 쿠폰은 발급 시 안내드린 유효기간 내에서만 사용이 가능합니다.</li>
                                            <li>3. e-프리퀀시의 기능 및 혜택 <br/>회사에서 e-프리퀀시 프로모션이 진행되는 기간 동안 회원이 계정에 등록된 스타벅스 카드로 결제 하는 경우, 회원 가입 시 자동으로 발급된 e-프리퀀시 카드계정에 회사에서 정한 적립 기준에 따라 “e-스티커”가 적립됩니다. 아울러 e-프리퀀시 카드의 구체적인 운영 방침이나 활용 방법 및 혜택은 회사의 마케팅 정책에 따라 변할 수 있으며, 이에 대해서는 별도의 방법으로 사전에 안내해
                                                드립니다.
                                            </li>
                                        </ol>

                                        <p className="sub_tit">제 12 조 (“별” 유효기간 및 소멸)</p>
                                        <ol className="pri_con">
                                            <li>1. 별의 유효기간은 적립 일로부터 1년 (12개월) 이며, Gold Level의 무료 음료 증정을 위한 별 또한 Gold Level의 유효기간과 동일하게 1년입니다.</li>
                                            <li>2. 유효기간이 경과된 별은 적립 일 기준으로 12개월 후부터 일 단위 선입선출 방식에 의하여 자동으로 소멸되며, 유효기간 만료 이전에 1개월 단위로 e-mail, 홈페이지 등을 통해 통지하여 드리며, 홈페이지에서도 조회하실 수 있습니다.</li>
                                            <li>3. 스타벅스 카드로 결제 시 적립된 별은 해당 결제를 취소하실 경우 적립이 취소됩니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 13 조 (무기명 스타벅스 카드)</p>
                                        <ol className="pri_con">
                                            <li>1. 무기명 스타벅스 카드
                                                <ol>
                                                    <li>가. 복합 결제 시 리워드 발행 기준
                                                        <ol>
                                                            <li>①계정 등록된 스타벅스 카드와 무기명 스타벅스 카드 복합 결제 시: 스타벅스 카드가 등록된 계정에 별이 발행됩니다. e-프리퀀시 이벤트 기간에는 별이 발행된 회원 계정에 e-프리퀀시 스티커도 함께 적립됩니다.</li>
                                                            <li>②무기명 스타벅스 카드와 무기명 스타벅스 카드 복합 결제 시: e-프리퀀시 이벤트 기간에는 첫 번째 적용된 무기명 카드에 e-프리퀀시 스티커가 자동 적립됩니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>나. e-프리퀀시 적립 무기명 스타벅스 카드를 이용한 e-프리퀀시 스티커 적립이 가능합니다.</li>
                                                    <li>다. 무기명 카드 이용자가 스타벅스 리워드 회원 전환 시 회원 계정으로의 리워드 이관
                                                        <ol>
                                                            <li>① 기 발급된 e-프리퀀시 스티커 등 리워드는 전환된 회원 계정으로 자동 이관 처리됩니다.</li>
                                                        </ol>
                                                    </li>
                                                    <li>라. 무기명 스타벅스 카드 이용자의 보유한 e-프리퀀시 스티커 등 리워드 개수 등의 카드 관련 제 정보는 영수증에 표기됩니다. 당사는 무기명 카드 이용자의 개인정보를 수집하지 않으므로, 홈페이지 혹은 APP에서 이용자의 결제 실적을 확인할 수 없습니다.</li>
                                                </ol>
                                            </li>
                                            <li>2. 무기명 카드의 도난, 분실 등에 대하여 회사는 책임지지 않으며, 이 경우 해당 카드의 잔액과 적립된 리워드 및 e-프리퀀시 스티커 등은 보호되지 않습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 14 조 (스타벅스 제휴 신용카드)</p>
                                        <ol className="pri_con">
                                            <li>1. 제휴 신용카드는 해당 제휴 신용카드사 또는 금융기관 등의 자격 기준 충족 시 발급됩니다.</li>
                                            <li>2. 제휴 신용카드 서비스 이용을 위한 조건
                                                <ol>
                                                    <li>가. 제휴 신용카드 혜택은 제 5조 제2항의 “스타벅스 리워드(Starbucks Rewards)” 에 따라 스타벅스 카드를 등록한 회원에게 한하여 제공합니다.</li>
                                                    <li>나. 제휴 신용카드 정책에 따라 해당 카드 발급이 완료되는 시점에 스타벅스 공카드가 자동 부여될 수 있으며 이 경우 스타벅스 리워드 회원의 자격이 부여됩니다. 발급이 완료된 스타벅스 공카드는 홈페이지 또는 모바일 APP에서 확인 가능합니다.</li>
                                                    <li>다. 본 약관에 동의하여 제휴 신용카드를 신청한 회원이라 하여도 제휴 신용카드 발급 조건이 충족되지 않을 경우 스타벅스 공카드가 발급되지 않습니다. </li>
                                                    <li>라. 제휴 신용카드 발급 완료 후 “회원” 조건 충족 시에는 본 약관에 명시되어 있는 스타벅스 리워드 혜택이 제공됩니다. 단, “회원” 조건 충족 후 해당 계정에 스타벅스 카드가 1개 이상 등록되어 있지 않을 경우 혜택 이용이 제한될 수 있습니다. </li>
                                                </ol>
                                            </li>
                                            <li>3. 제휴 신용카드 혜택 안내
                                                <ol>
                                                    <li>가. 제휴 신용카드 발급을 통한 별 적립기준 및 카드상품 등은 제휴 신용카드사의 제휴 신용카드 약관에 따릅니다. 더불어 스타벅스 리워드 혜택을 제공받기 위해 제휴 신용카드를 이용할 경우 해당 제휴 신용카드사의 규정에 따라야 하며 이용과정에서 제휴 신용카드사의 책임으로 발생하는 회원의 불만이나 손해에 대하여 스타벅스는 책임이 없습니다. </li>
                                                    <li>나. 제휴 신용카드를 통해 적립된 별은 별도 안내가 있는 경우를 제외하고 본 약관에 명시된 별 정책에 따라 운영됩니다. </li>
                                                    <li>다. 적립된 별은 금전적으로 환산하거나 타인에게 양도ㆍ판매될 수 없습니다.</li>
                                                    <li>라. 기존 스타벅스 리워드 회원이 제휴 신용카드 발급 후 스타벅스 공카드를 부여 받았을 경우 제휴 신용카드를 통해 적립된 별은 기존에 등록된 스타벅스 카드로 적립된 별과 합산 및 관리됩니다.</li>
                                                    <li>마. 제휴 신용카드의 별 적립 시기는 각 제휴 신용카드사별로 상이합니다.</li>
                                                </ol>
                                            </li>
                                        </ol>

                                        <p className="sub_tit">제 15 조 (고객의 의무)</p>
                                        <ol className="pri_con">
                                            <li>1. 고객은 본 약관에서 규정하는 사항과 이용안내 또는 공지사항 등을 통하여 회사가 제공하는 사항을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안됩니다.</li>
                                            <li>2. 회원은 회사가 제공한 별을 이용하여 영업 활동을 할 수 없습니다.</li>
                                            <li>3. 회원은 적립한 별을 다른 회원에게 재판매 할 수 없으며, 위반 시에는 제공받았던 혜택을 반환하여야 합니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 16 조 (휴면계정 관리)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 회원이 홈페이지 또는 모바일 APP에 12개월 이상 로그인 하지 않고, 계정에 등록된 스타벅스 카드로 12개월 이상 거래내역(최초 충전, 재충전, 결제 등 모든 거래 포함)이 없는 경우, 휴면계정으로 간주하고 회사가 제공하는 서비스 이용을 아래와 같이 제한/상실시킬 수 있습니다.</li>
                                            <li>2. 12개월 이상 서비스에 로그인하지 않고 등록된 스타벅스 카드의 거래내역이 없는 경우에는 휴면계정으로 별도 관리되어 홈페이지 이용이 중단되고, 이후 다시 이용하시려면 인증 절차 혹은 계정에 등록된 스타벅스 카드로 1회 이상 이용(최초 충전, 재충전, 결제 등 모든 거래 포함)해 주시기 바랍니다. <br/>또한, 휴면계정으로 별도 관리되는 경우 스타벅스 리워드 별과 등급별 쿠폰이 제공되지 않으며, 등급별 유지 조건 미충족
                                                시 회원 등급 레벨이 하향 조정될 수 있습니다.</li>
                                            <li>3. 회원이 제14조에 명시된 제휴 신용카드 신청을 위해 스타벅스 본인 인증절차를 진행할 경우 더 이상 휴면계정으로 관리되지 않으며 다시 서비스 이용이 가능합니다. 또한 제휴 신용카드 이용회원은 제휴 신용카드 사용을 통해 별 적립이 될 경우 휴면계정으로 관리되지 않습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 17 조 (회원 탈퇴와 별의 소멸 처리)</p>
                                        <ol className="pri_con">
                                            <li>1. 본 약관 제 7 조 제 1 항에 정해진 방법으로 회원 탈퇴 시 회원 탈퇴 요청일 현재까지 적립된 별은 자동으로 소멸되며, 재가입 시 소멸된 별은 복원되지 않습니다.</li>
                                            <li>2. 본 약관 제 7 조 제 2 항에 따라 회원 자격이 상실된 경우, 자격 상실일 현재까지 적립된 별은 자동으로 소멸됩니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 18 조 (거래지시의 철회)</p>
                                        <p className="pri_con">고객이 스타벅스 카드로 서비스를 제공받거나 제품 또는 상품을 구매하고 스타벅스 카드의 잔액이 차감되어 거래내역이 기록된 후에는 그 거래가 발생한 날의 14일 이내에 영수증 등 구매사실을 소명할 수 있는 자료를 첨부하여 거래 취소를 요구할 수 있습니다. 단, 지급된 쿠폰 또는 판촉물은 반드시 함께 반환하셔야만 거래지시의 철회가 가능합니다.</p>

                                        <p className="pri_tit">제 3 장 거래내역 정보</p>

                                        <p className="sub_tit">제 19 조 (거래내역의 수집)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 고객이 스타벅스 카드를 통해 서비스 이용 및 제품 또는 상품 구매 시 필요한 최소한의 거래내역 정보(카드 번호, 거래 일시, 거래 금액, 단말기 및 매장 정보 등)를 수집합니다.</li>
                                            <li>2. 스타벅스 카드를 통해 수집된 거래내역 정보는 이용대금 정산의 목적 및 (개인정보의 경우 개인정보보호 관련 법령에 따른 비식별화 조치를 거쳐) 회사의 통계 작성 및 활용의 목적에 사용될 수 있습니다. </li>
                                        </ol>

                                        <p className="sub_tit">제 20 조 (거래내역의 제공)</p>
                                        <ol className="pri_con">
                                            <li>1. 회원은 홈페이지와 모바일 APP을 통해 거래 내역을 확인할 수 있습니다.</li>
                                            <li>2. 회사는 회원과 거래한 내역 및 그 증빙에 대하여, 전자적 형태인 전자 영수증으로 우선 발급하며, 회원은 이에 동의합니다. </li>
                                            <li>3. 회사는 관련법령에 의거하여 회원과의 거래내역을 거래가 발생한 날로부터 최대 5년 간 보관하며, 해당 기간 동안 회원은 회사가 제공하는 홈페이지 및 모바일 APP을 통하여 최근 1년 간의 거래 내역을 열람 및 확인할 수 있습니다. </li>
                                            <li>4. 1항에도 불구하고, 회원이 지류 형태의 영수증 발급을 희망하는 경우 회원은 해당 거래가 발생한 매장에 방문하여 지류 영수증의 발급을 요청할 수 있습니다. 단, 다음 각 호에 해당하는 거래인 경우 지류 영수증의 발급은 불가합니다.
                                                <ol>
                                                    <li>가. 홈페이지 또는 모바일 APP을 통한 스타벅스 카드 충전과 스타벅스 모바일 카드 구매 또는 충전 거래 내역의 증빙</li>
                                                    <li>나. 모바일 APP을 통한 스타벅스 모바일 상품권의 구매 거래 내역의 증빙<br/>
                                                        스타벅스 모바일 카드의 거래이력은 스타벅스 모바일 카드 선물내역에서 최대 1년 간의 거래내역 확인이 가능하며, 스타벅스 모바일 상품권은 스타벅스 모바일 상품권 보낸 선물 메뉴에서 최대 5년 간의 거래내역 확인이 가능합니다.</li>
                                                </ol>
                                            </li>
                                            <li>5. 회사는 다음 각 호에 해당하는 경우, “전자영수증(e-Receipt &amp; History)” 서비스 전부 또는 일부를 제한하거나 중지할 수 있습니다.
                                                <ol>
                                                    <li>가. 서비스를 위한 설비 보수, 점검, 교체 등의 사유로 일시적인 서비스 장애가 발생한 경우</li>
                                                    <li>나. 제반 설비의 장애 또는 이용폭주로 정상적인 서비스 이용이 어려운 경우</li>
                                                    <li>다. 천재지변 등 불가항력적 사유가 발생한 경우</li>
                                                </ol>
                                            </li>
                                            <li>6. 고객이 거래내역을 서면으로 받고자 하는 경우, 스타벅스 카드를 소지한 본인임을 확인하기 위해 필요한 자료 (스타벅스 카드 사본, 신분증 사본 등 회사가 요청하는 자료)를 거래내역 신청서와 함께 팩스 또는 우편으로 회사에 송부하여야 하며, 회사는 스타벅스 카드 소지자 본인임이 확인되는 경우에 한하여 요청을 받은 날로부터 2주 이내에 해당 정보를 고객이 요청한 수령지로 팩스 또는 우편을 이용하여 제공합니다.
                                                <ul>
                                                    <li>우편주소: 서울특별시 중구 퇴계로 100 9F 주식회사 에스씨케이컴퍼니 고객센터</li>
                                                    <li>문의전화: 1522-3232 (유료)</li>
                                                    <li>팩스: 02-3015-1108</li>
                                                    <li>고객이 본 조에 의거 거래내역을 제공받기 위하여 회사에 제공한 수령지 정보가 부정확하거나 오류인 관계로 발생된 고객의 해당정보 누출 또는 고객의 손해에 대하여 회사는 책임을 지지 않습니다.</li>
                                                </ul>
                                            </li>
                                        </ol>

                                        <p className="sub_tit">제 21 조 (거래내역의 정정)</p>
                                        <ol className="pri_con">
                                            <li>1. 고객은 본인이 이용한 거래와 관련된 오류를 발견하는 경우 소명할 수 있는 자료를 갖추고 회사가 정한 절차를 거쳐, 해당 거래에 대한 정정을 요청할 수 있습니다.</li>
                                            <li>2. 회사는 본 조 제1항에 의해 고객의 정정 요청을 받은 날로부터 2주 이내에 해당 거래내역을 검토하여 고객에게 그 결과를 통보하여 드립니다.</li>
                                        </ol>

                                        <p className="pri_tit">제 4 장 개인정보 보호</p>

                                        <p className="sub_tit">제 22 조 (개인 정보 보호)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 고객의 정보 수집 시 정상적인 서비스를 위한 최소한의 정보를 수집하며, 고객의 개인식별이 가능한 개인정보를 수집하는 때에는 반드시 해당 고객의 동의를 받습니다.</li>
                                            <li>2. 회사는 양질의 서비스를 제공하기 위해 여러 비즈니스 파트너와 제휴를 맺거나 국가 기관의 요구 등을 위해 개인정보를 위탁관리 하거나 개인정보를 제공할 수 있습니다. 개인정보 위탁의 경우에는 홈페이지를 통해 관련 사항을 공개하고, 개인정보 제공의 경우에는 제공과 관련된 사항을 고객에게 알리고 동의를 받습니다. 단, 고객의 소득공제 목적으로 국세청에 개인정보 및 스타벅스 카드 사용내역을 제공하는 경우 등과 같이 고객의
                                                요청에 의하는 경우는 예외로 합니다.</li>
                                            <li>3. 고객이 제공한 개인정보는 고객의 동의 없이 제3자에게 누설하거나 제공하지 않습니다. 다만, 다음 각 호에 해당하는 경우에는 예외로 합니다.
                                                <ol>
                                                    <li>가. 통계 작성, 과학적 연구 또는 공익적 기록보존 등을 위해 특정 개인을 식별할 수 없는 형태로 제공하는 경우</li>
                                                    <li>나. 관계 법령에 의하여 수사상의 목적으로 관계 기관으로부터 요구 받은 경우</li>
                                                    <li>다. 기타 관계 법령에 의한 경우</li>
                                                </ol>
                                            </li>
                                            <li>4. 고객은 자신의 개인정보처리와 관련하여 개인정보의 처리에 관한 정보를 제공받을 권리, 개인정보에 대하여 열람을 요구할 권리, 개인정보의 처리정지, 정정, 삭제 및 파기를 요구할 권리를 갖습니다.</li>
                                            <li>5. 회사 또는 회사로부터 개인정보를 제공받은 제3자는 개인정보의 수집목적 또는 제공받은 목적을 달성한 때에는 당해 개인정보를 지체 없이 파기하여야 합니다.</li>
                                        </ol>

                                        <p className="pri_tit">제 5 장 기타</p>

                                        <p className="sub_tit">제 23 조 (책임 소재)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 고객이 스타벅스 카드 서비스 이용 중 발생한 손해에 대하여 배상할 책임을 집니다. 단, 본 약관에 별도 명시된 경우 및 다음 각호의 어느 하나에 해당하는 경우는 제외합니다.
                                                <ol>
                                                    <li>가. 스타벅스 카드를 회사가 스타벅스 카드 후면 또는 단말기를 통해 안내하거나 규정하는 방법 이외의 방법으로 거래 행위를 한 경우 (단, 여기에서 '거래 행위'라 함은 카드 번호를 입력하는 행위, 카드를 단말기에 접촉하는 행위 등 고객이 스타벅스 카드 서비스를 이용하기 위해 스타벅스 카드를 이용하는 행위를 말합니다)</li>
                                                    <li>나. 스타벅스 카드를 회사가 지정하지 아니한 방법으로 불법 거래 또는 부정 사용한 경우</li>
                                                    <li>다. 스타벅스 카드를 변형하거나 원형을 훼손하여 사용한 경우</li>
                                                    <li>라. 스타벅스 카드를 도난 당하거나 분실한 경우</li>
                                                    <li>마. 제3자가 권한 없이 고객의 스타벅스 카드를 이용할 수 있음을 알았거나 쉽게 알 수 있었음에도 불구하고 고객이 자신의 스타벅스 카드 정보 (카드 번호 및 PIN 번호 포함)를 누설 또는 노출하거나 방치한 경우</li>
                                                </ol>
                                            </li>
                                            <li>2. 고객이 본 조 제1항에서 규정한 행위를 하여 회사에 손해가 발생하는 경우, 그 고객은 회사의 손해에 대하여 배상할 책임을 집니다.</li>
                                            <li>3. 서비스를 이용하면서 불법행위나 본 약관을 위반하는 행위를 한 이용자로 말미암아 회사가 해당 회원 이외의 제3자로부터 손해배상 청구 또는 소송을 비롯한 각종 이의제기를 받는다면 해당 회원 자신의 책임과 비용으로 회사를 면책시켜야 하며, 회사가 면책되지 못한 경우 당해 이용자는 그로 인하여 회사에 발생한 손해를 배상해야 합니다.</li>
                                            <li>4. 회사는 이용자가 불법 또는 부정한 방법으로 서비스를 이용하거나 과실에 해당하는 행위를 하여 이용자와 회원간 또는 이용자와 회원 및 제3자 상호간에 분쟁이 발생하였을 때 회사의 책임을 주장하는 자가 회사의 귀책사유를 객관적으로 입증하지 않는 한, 회사는 이에 개입할 의무가 없으며 분쟁으로 발생하는 손해를 배상할 책임이 없습니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 23 조의 2 (지급 보증 등)</p>
                                        <p className="pri_con">스타벅스 카드는 충전금액에 대하여 전자상거래(결제수단) 보증보험증권에 가입되어 있습니다.</p>

                                        <p className="sub_tit">제 24 조 (분쟁 해결)</p>
                                        <ol className="pri_con">
                                            <li>1. 회사는 고객이 제기하는 정당한 의견이나 불만을 반영하기 위하여 고객의견수렴 제도를 운영하며, 고객은 홈페이지의 해당 서비스 페이지를 통해 의견을 제시할 수 있습니다.
                                                <ul>
                                                    <li>홈페이지 주소: www.starbucks.co.kr</li>
                                                    <li>문의전화: 1522-3232(유료)</li>
                                                </ul>
                                            </li>
                                            <li>2. 회사는 고객에게 손해가 발생하거나 회사와 고객간 분쟁이 발생하는 경우 손해 배상 등 분쟁처리를 위해 고객상담센터를 설치, 운영합니다.</li>
                                            <li>3. 회사는 고객으로부터 제출되는 불만사항 및 의견은 15일 이내에 그 사항을 처리합니다. 다만, 신속한 처리가 곤란한 경우에는 고객에게 그 사유와 처리일정을 즉시 통보합니다.</li>
                                            <li>4. 회사와 고객간에 발생한 분쟁이 원만히 해결되지 않는 경우, 관련 법령에 따라 '소비자기본법'에 따른 한국소비자원의 소비자분쟁조정위원회를 통해 조정신청이 가능합니다.</li>
                                        </ol>

                                        <p className="sub_tit">제 25 조 (관할 법원)</p>
                                        <p className="pri_con">스타벅스 카드 서비스 및 본 약관과 관련한 제반 분쟁 및 소송은 회사의 본점 소재지를 관할하는 법원 또는 민사소송법상의 관할 법원을 제1심 관할 법원으로 합니다.</p>

                                        <p className="pri_tit">(부칙)</p>
                                        <p>본 이용약관은 2024년 10월 24일부터 시행합니다.</p>
                                    </div>
                                </div>
                        </li>
                        <li className="terms">
                            <input type="checkbox" id="marketingcheck" className="check_style"
                                checked={marketingChecked}
                                onChange={() => setMarketingChecked(!marketingChecked)}
                            />
                            <label htmlFor="marketingcheck">
                                <span className="chk"></span>
                                <span className="terms_title">
                                <strong>[선택]</strong> 마케팅 활용 수집·이용 동의
                                </span>
                            </label>
                            <div className="terms_scroll_box select_cont">
                                <div className="pri_terms_wrap">
                                    <table> 
                                    <colgroup>
                                            <col width=""/>
                                            <col width="70%"/>
                                        </colgroup>    
                                        <tbody style={{fontSize: "11px"}}>
                                            <tr>
                                                <th scope="row"><span>목적</span></th>
                                                <td><span><span>마케팅 정보 활용(상품정보 및 행사 정보 안내 등)</span></span></td>
                                            </tr>
                                            <tr>
                                                <th scope="row"><span>항목</span></th>
                                                <td>휴대전화번호, 이메일<br/></td> 
                                            </tr>
                                            <tr>
                                                <th scope="row"><span>보유 및 이용 기간</span></th>
                                                <td><span><span>회원 탈퇴시까지</span> </span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p style={{fontSize: "13px"}}>※ 귀하께서는 동의를 거부하실 수 있으나, 동의를 거부 하실 경우 마케팅 정보를 받으실 수 없습니다.</p>
                                </div>
                            </div>
                        </li>
                        <hr />
                        <li className="terms">
                            <span className="terms_title desc">회원가입 유의사항</span>
                            <div className="terms_desc">
                                <p>· 반드시 회원님 명의로 된 휴대폰, 아이핀을 이용해주세요.</p>
                                <p>· 타인의 개인정보를 도용하여 가입할 경우 향후 적발 시 서비스 이용제한 및 법적 제재를 받으실 수 있습니다.</p>
                                <p>· 스타벅스 코리아의 공식 홈페이지는 Internet Explorer 9.0 이상, Chrome, Firefox, Safari 브라우저에 최적화 되어있습니다.</p>
                            </div>
                        </li>
                        </ul>
                    </fieldset>
                    </form>
                )}
                {step === 2 && (
                    <div className="input_form">
                      <ul id="info_section">
                      <li className="type_section">
                          <div className="area_style">
                            <label htmlFor="typeArea" className="label_style required">회원 정보</label>
                            <div className="select">
                              <label>
                                <input className="input_radio" id="individual" type="radio" name="type" value="individual" onChange={handleType} checked={type === 'individual'}/>
                                <span htmlFor="individual" >개인회원</span>
                              </label>
                              <label>
                                <input className="input_radio" id="business" type="radio" name="type" value="business" onChange={handleType} checked={type === 'business'}/>
                                <span htmlFor="business">사업자회원</span>
                              </label>
                            </div>
                          </div>
                        </li>
                        <hr />
                        <li className="id_section">
                          <div className="area_style">
                            <label htmlFor="idArea" className="label_style required">아이디(E-mail)</label>
                            <input ref={idInputRef} type="text" required size={20} value={id}
                              className="line_box mb_10"
                              placeholder="4~13자리 이내"
                              onChange={(e) => { setId(e.target.value); }}
                              onBlur={handleId} />
                            <span className={`mes_style ${messages.id.color} m0`}>
                              {messages.id.text}
                            </span>
                            <button type="button" onClick={handleIdCheck} className='id_check_button'>중복확인</button>
                          </div>
                        </li>
                        <hr />
                        <li className="pw_section">
                          <div className="area_style">
                            <label htmlFor="pwArea" className="label_style required">비밀번호</label>
                            <input ref={pwInputRef} type="password" id="pwArea" required size={20} value={pw}
                              className="line_box"
                              placeholder="10~20자리 이내"
                              onChange={(e) => { setPw(e.target.value); }}
                              onBlur={handlePw} />
                            <span className={`mes_style ${messages.pw.color}`}>
                              {messages.pw.text}
                            </span>
                            <p className="help_style">
                              영문 대소문자/숫자/특수문자 조합, 8자 ~ 16자
                            </p>
                          </div>
                        </li>
                        <li className="pw_section">
                          <div className="area_style">
                            <label htmlFor="pwArea" className="label_style required">비밀번호 확인</label>
                            <input ref={pwInputRef} type="password" id="pwArea" required size={20} value={pw2}
                              className="line_box"
                              placeholder="비밀번호를 입력해주세요"
                              onChange={(e) => { setPw2(e.target.value); }}
                              onBlur={handlePw2} />
                            <span className={`mes_style ${messages.pw2.color} mb_10`}>
                              {messages.pw2.text}
                            </span>
                          </div>
                        </li>
                        <hr />
                        <li className="name_section">
                          <div className="area_style">
                            <label htmlFor="nameArea" className="label_style required">이름</label>
                            <input ref={nameInputRef} type="text" id="nameArea" required size={20} value={name}
                              className="line_box"
                              onChange={(e) => { setName(e.target.value); }}
                              onBlur={handleName} />
                            <span className={`mes_style ${messages.name.color} mb_10`}>
                              {messages.name.text}
                            </span>
                          </div>
                        </li>
                        <hr />
                        <li className="phone_section">
                          <div className="area_style">
                            <label htmlFor="phoneArea" className="label_style required">휴대전화</label>
                            <div class="flex_items">
                            <select
                              value={phoneFirst}
                              onChange={(e) => setPhoneFirst(e.target.value)}
                            >
                              <option value="">선택</option>
                              <option value="010">010</option>
                              <option value="011">011</option>
                              <option value="016">016</option>
                              <option value="018">018</option>
                              <option value="019">019</option>
                            </select>
                              - 
                              <input type="text" value={phoneMiddle} requiredsize={4}
                                onChange={(e) => setPhoneMiddle(e.target.value)}
                                onBlur={handlePhone}
                              />
                              -
                              <input type="text" value={phoneLast} required size={4}
                                onChange={(e) => setPhoneLast(e.target.value)}
                                onBlur={handlePhone}
                              />
                            </div>
                            <span className={`mes_style ${messages.phone.color}`}>
                              {messages.phone.text}
                            </span>
                          </div>
                        </li>
                        <hr />
                        <li className="email-section">
                          <div className="area_style">
                            <label htmlFor="emailArea" className="label_style required">이메일</label>
                            <div class="flex_items">
                              <input type="text" value={emailFront} required size={20}
                                onChange={(e) => setEmailFront(e.target.value)} 
                              />
                              @
                              <select value={emailBack} onChange={(e) => setEmailBack(e.target.value)} onBlur={handleEmail}>
                                <option value="">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                                <option value="hanmail.net">hanmail.net</option>
                                <option value="yahoo.com">yahoo.com</option>
                                <option value="outlook.com">outlook.com</option>
                                <option value="nate.com">nate.com</option>
                                <option value="kakao.com">kakao.com</option>
                              </select>
                            </div>
                            <span className={`mes_style ${messages.email.color}`}>
                              {messages.email.text}
                            </span>
                          </div>
                        </li>
                        <hr />
                        <li className="birth_section">
                          <div className="area_style">
                            <label htmlFor="birthArea" className="label_style">생년월일</label>
                            <div class="flex_items">
                              <input type="text" placeholder="년도(4자)" value={year} onChange={handleYearChange}/>
                              <input type="text" placeholder="월" value={month} onChange={handleMonthChange}/>
                              <input type="text" placeholder="일" value={day} onChange={handleDayChange}/>
                            </div>
                          </div>
                        </li>
                        <hr />
                        <li className="sex_section">
                          <div className="area_style">
                            <label htmlFor="sexArea" className="label_style">성별</label>
                            <div className="select">
                              <label>
                                <input className="input_radio" id="male" type="radio" name="sex" value="male" onChange={handleSex} checked={sex === 'male'}/>
                                <span htmlFor="male" >남성</span>
                              </label>
                              <label>
                                <input className="input_radio" type="radio" name="sex" value="female" onChange={handleSex} checked={sex === 'female'} />
                                <span htmlFor="female">여성</span>
                              </label>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                )}
                {step === 3 && (
                  <div className="signup_success">
                    <div className="signup_greeting">
                        <span className="signup_name"><strong>{name}</strong> 님은 <strong>[Green]</strong> 회원입니다</span>
                        <h1 className="title">Welcome To Starbucks Korea!</h1>
                    </div>
                    <div className="signup_info">
                        <p className="signup_id">아이디<span className="id">{id}</span></p>
                        <p className="signup_email">이메일<span className="email">{email}</span></p>
                    </div>
                    <div className="signup_img">
                        <img src={process.env.PUBLIC_URL + "/db/images/signup_kakao.png"} alt="" />
                    </div>
                  </div>
                )}
                <div className="step_btn_wrap">
                    {step === 1 && (
                        <button className="btn_dark" type="submit" disabled={step === 3 || !allChecked} onClick={handleSubmit}>다음</button>
                    )}
                    {step === 2 && (
                        <>
                        <button className="btn_light" onClick={handleBack}>이전</button>
                        <button className="btn_dark" type="submit" disabled={step === 3 || !allChecked} onClick={handleSubmit}>가입하기</button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                        <button className="btn_light" onClick={handleMain}>메인으로이동</button>
                        <button className="btn_dark" onClick={handleLogin}>로그인</button>
                        </>
                    )}
                </div>
            </div>
  );
};

export default SignUpStep;