import {
  faCheckCircle,
  faCommentDots,
  faEnvelope,
  faLock,
  faTimesCircle,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Navs from "../components/Nav";
import "../css/Login.css";
import Swal from 'sweetalert2';


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mem_id: "",
    mem_pw: "",
    confirm_pw: "",
    mem_name: "",
    mem_birth: "",
    mem_profile: "",
    mem_phone: "",
    mem_email: "", // 이메일 필드 추가
  });

  const [isVerified, setIsVerified] = useState(false);
  const [kakaoAccessToken, setKakaoAccessToken] = useState("");
  const [isIdValid, setIsIdValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init('87fcd32c8be8f2ad27893ee83bb4bcc5'); 
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "mem_id") {
      const validId = validateId(value);
      setIsIdValid(validId);
      // 유효하지 않은 경우 에러 메시지를 설정합니다.
      if (!validId) {
        setErrorMessage('아이디는 영문과 숫자만 포함하며, 최소 8자 이상이어야 합니다.');
      } else {
        setErrorMessage('');
      }
    }
    if (name === "confirm_pw") {
      const matching = isPasswordMatching(formData.mem_pw, value);
      if (!matching) {
        setErrorMessage('비밀번호가 일치하지 않습니다.');
      } else {
        setErrorMessage('');
      }
    }
  
    // 나머지 상태 업데이트는 동일하게 유지합니다.
    setFormData({ ...formData, [name]: value });
  };
  
  const handleCheckDuplicate = async () => {
    if (formData.mem_id.length < 8) {
      Swal.fire({
        icon: 'warning',
        text: '아이디는 8글자 이상이어야 합니다.',
        confirmButtonText: '확인'
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
      setIsIdValid(false);
      return;
    }
    try {
      // 백엔드와 일치하는 URL로 변경
      const response = await axios.get(`http://localhost:8081/api/checkId/${formData.mem_id}`);
      setIsIdValid(!response.data);
      if (response.data) {
        Swal.fire({
          icon: 'warning',
          text: '이미 사용중인 아이디입니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      } else {
        Swal.fire({
          icon: 'success',
          text: '사용 가능한 아이디입니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
      }
    } catch (error) {
      console.error("아이디 중복 확인 실패:", error);
    }
  };
  
  const handleKakaoLogin = () => {

      // 기존 로그아웃 로직을 유지합니다.
      // kakaoLogout();
      // unlinkApp();
  
      // getKakaoLoginLink();

      // window.Kakao.Auth.authorize({
      //   // redirectUri: '${REDIRECT_URI}',
      //   // redirectUri: 'http://localhost:3000/auth',
      //   redirectUri: 'http://localhost:3000/Register',
      //   //redirectUri: 'http://localhost:8081/members/register',
      //   prompt: 'login',
      // });

    window.Kakao.Auth.loginForm ({
      scope: 'name, birthday, birthyear, profile_image, phone_number',
      success: (authObj) => {
        window.Kakao.API.request({
          url: "/v2/user/me", 
          success: (res) => {
            const birthyear = res.kakao_account.birthyear;
            const birthday = res.kakao_account.birthday.padStart(4, '0'); // MMDD 형식을 확보합니다.
            const birth =`${birthyear}-${birthday.substring(0, 2)}-${birthday.substring(2, 4)}`;
            const profile = res.kakao_account.profile_image_url || '1711768852850_star-icon.png';
            const phone = formatPhoneNumber(res.kakao_account.phone_number);
            const name = res.kakao_account.name;
            
            // 로그 출력은 상태 설정 외부에서 수행합니다.
            console.log("이름", name, "생년월일", birth, "프로필 이미지", profile, "전화번호", phone);
  
            // 상태를 업데이트합니다.
            setFormData(prevFormData => ({
              ...prevFormData,
              mem_name: name,
              mem_birth: birth,
              mem_profile: profile,
              mem_phone: phone
            }));
            setIsVerified(true);
            // console.log(authObj.access_token);
            setKakaoAccessToken(authObj.access_token);
          },
          fail: (error) => {
            console.error(error);
          },
        });
      },
      fail: (err) => {
        console.error(err);
      },
    });
  };
  // 아이디 정규식.
function validateId(id) {
  const re = /^[A-Za-z0-9]{8,}$/;
  return re.test(id);
}

const deleteCookie= () => {
  document.cookie = 'authorize-access-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const clearLocalStorage = () => {
  // 특정 키가 있다면, 그 키를 사용해서 로컬 스토리지의 아이템을 제거
  localStorage.removeItem(kakaoAccessToken);
  // 또는 전체 로컬 스토리지를 클리어할 수도 있지만, 다른 데이터도 함께 삭제될 수 있으니 주의
  // localStorage.clear();
};

const clearSessionStorage = () => {
  sessionStorage.removeItem(kakaoAccessToken);
  // 또는 전체 세션 스토리지를 클리어할 수도 있습니다.
  // sessionStorage.clear();
};

const kakaoLogout = () => {
  window.Kakao.Auth.logout(() => {
    console.log('로그아웃 되었습니다.');
    // 쿠키, 로컬 스토리지, 세션 스토리지에서 관련 데이터를 모두 삭제
    deleteCookie();
    clearLocalStorage();
    clearSessionStorage();
  });
};

const unlinkApp= () =>  {
  window.Kakao.API.request({
    url: '/v1/user/unlink',
  })
    .then(function(res) {
      alert('success: ' + JSON.stringify(res));
      deleteCookie();
    })
    .catch(function(err) {
      alert('fail: ' + JSON.stringify(err));
    });
}

function isPasswordMatching(password, confirmPassword) {
  return password === confirmPassword;
}
  

  const handleBlur = (e) => {
    const { name, value } = e.target;

    // 아이디 입력 필드에서 포커스를 잃었을 때의 로직
    if (name === "mem_id") {
      if (value.length < 8) {
        Swal.fire({
          icon: 'warning',
          text: '아이디는 8글자 이상이어야 합니다.',
          confirmButtonText: '확인'
        }).then((result) => {
          if (result.isConfirmed) {
          }
        });
        setIsIdValid(false);
      } else {
        setIsIdValid(true);
      }
    }
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    

    if (!isVerified) {
      alert("본인인증을 해주세요.");
      return;
    }
    if (!isIdValid) {
      alert("아이디 중복 확인을 해주세요.");
      return;
    }
    if (formData.mem_pw !== formData.confirm_pw) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!formData.mem_email.trim()) { 
      alert("이메일을 입력해주세요.");
      return;
    }

       // 카카오 로그인으로 받은 정보와 사용자 입력 정보를 합친 객체를 생성
      const userData = {
        mem_id: formData.mem_id,
        mem_pw: formData.mem_pw,
        mem_name: formData.mem_name,
        mem_birth: formData.mem_birth,
        mem_profile: formData.mem_profile,
        mem_phone: formData.mem_phone,
        mem_email: formData.mem_email,
      };



        // 회원가입 요청
        try {
          // 환경 변수 대신 직접 URL 사용하여 회원가입 요청
          await axios.post('http://localhost:8081/api/members/register', userData, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          console.log("회원가입 성공");
          navigate('/login'); // 회원가입 성공 후 로그인 페이지로 리디렉션
        } catch (error) {
          console.error("회원가입 실패:", error);
          setErrorMessage('회원가입에 실패하였습니다: ', error.response ? error.response.data : error.message);
        }
        
      };
        
      function formatPhoneNumber(phoneNumber) {
        // 국가 코드와 공백을 제거합니다.
        let formattedNumber = phoneNumber.replace('+82 ', '');
        // 하이픈을 제거합니다.
        formattedNumber = formattedNumber.replace(/-/g, '');
        // "010"으로 시작하도록 수정합니다.
        if (formattedNumber.startsWith('10')) {
          formattedNumber = '010' + formattedNumber.substring(2);
        }
        return formattedNumber;
      }
      
        return (
        <div>
        <Navs />
        <div id="content" className="my-custom-content">
        <Container>
        <Row className="justify-content-md-center">
        <Col md={6} className="login-form-container">
        <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
        <InputGroup.Text>
        <FontAwesomeIcon icon={faUser} />
        </InputGroup.Text>
        <Form.Control
        type="text"
        placeholder="아이디"
        name="mem_id"
        value={formData.mem_id}
        onChange={handleInputChange}
        onBlur={handleBlur}
        />
        <Button variant="outline-secondary" onClick={handleCheckDuplicate}>
        중복확인
        </Button>
        {isIdValid ? (
        <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
        ) : (
        <FontAwesomeIcon icon={faTimesCircle} className="text-danger" />
        )}
        </InputGroup>


        <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="비밀번호"
                name="mem_pw"
                value={formData.mem_pw}
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon={faLock} />
              </InputGroup.Text>
              <Form.Control
                type="password"
                placeholder="비밀번호 확인"
                name="confirm_pw"
                value={formData.confirm_pw}
                onChange={handleInputChange}
              />
              <Form.Text className={isPasswordMatching(formData.mem_pw, formData.confirm_pw) ? 'text-success' : 'text-danger'}>
                {isPasswordMatching(formData.mem_pw, formData.confirm_pw) ? '비밀번호가 일치합니다.' : '비밀번호가 불일치합니다.'}
              </Form.Text>
            </InputGroup> 


            {/* 이메일 입력 필드 */}
            <InputGroup className="mb-3">
                  <InputGroup.Text>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="이메일"
                    name="mem_email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>


                <Button
                  variant="success"
                  type="submit"
                  className="login-button mb-3"
                >
                  회원가입
                </Button>

                <Button
                  variant="warning"
                  className="kakao-login-button mb-3"
                  onClick={handleKakaoLogin}
                >
                <FontAwesomeIcon icon={faCommentDots} className="me-2" />
                  카카오로 본인인증
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Register;
