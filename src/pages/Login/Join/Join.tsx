import { useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import { useAxios } from '../../../hooks/UseAxios';
import { Loading } from '../../../components/Loading';
import AuthContext from '../../../contexts/AuthContext';
import { InputField } from '../../../components/Login/Join/InputField';
import { Feedback } from '../../../components/Login/Join/Feedback';

export const Join = () => {
  const navi = useNavigate();
  const { sendRequest, loading } = useAxios();
  const { isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordRe, setPasswordRe] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>();
  const [seq, setSeq] = useState<string>();
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false);
  const [isPassword, setIsPasswordValid] = useState<boolean>(false);
  const [isPasswordRe, setIsPasswordReValid] = useState<boolean>(false);

  if (isAuthenticated) {
    navi('/');
  }

  const handleSubmit = async () => {
    if (!isEmailValid) {
      alert('이메일 형식을 확인해주세요.');
      return false;
    }

    if (!isUsernameValid) {
      alert('아이디를 확인해주세요.');
      return false;
    }

    if (!isPassword) {
      alert('비밀번호를 확인해주세요.');
      console.log(isPassword);
      return false;
    }

    if (!isPasswordRe) {
      alert('비밀번호를 확인해주세요.');
      return false;
    }

    if (!isVerified) {
      alert('이메일 인증을 해주세요.');
      return false;
    }

    if (!confirm('회원가입을 진행하시겠습니까?')) {
      return false;
    }

    const response = await sendRequest(
      'post',
      '/user/join',
      { username: username, password: password, email: email },
      {}
    );

    if (response.status && response.status == 'success') {
      alert('가입이 완료되었습니다.');
      navi('/');
    } else if (response.status == 'fail' && response.msg.length != 0) {
      alert(response.msg);
    }
  };

  const sendEmail = async () => {
    setIsVerified(false);

    if (!email || !isEmailValid) {
      alert('이메일 형식을 확인해주세요.');
      return false;
    }

    const response = await sendRequest(
      'post',
      '/user/verify-email',
      { username: username, email: email, type: 'emailForJoin' },
      {}
    );

    if (response.status == 'success') {
      setSeq(response.data);
      alert('인증코드가 메일로 발송되었습니다. 인증코드를 입력해주세요.');
    } else if (response.msg.length != 0) {
      alert(response.msg);
    }
  };

  const handleVerified = async () => {
    if (!seq) {
      alert('인증메일을 발송해주세요.');
      return false;
    }

    if (!code) {
      alert('인증코드를 입력하세요.');
      return false;
    }

    const response = await sendRequest(
      'post',
      '/user/verify-email-code',
      { seq: seq, email: email, code: code },
      {}
    );

    if (response.status == 'success') {
      setIsVerified(true);
    } else if (response.msg.length != 0) {
      setIsVerified(false);
      alert(response.msg);
    }
  };

  const initVerified = () => {
    setIsVerified(false);
  };

  const handleValid = (type: string) => {
    const usernameRegex = /^(?=.*[a-zA-Z]).{4,10}$/;
    const passwordRegex = /^.{4,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    switch (type) {
      case 'username':
        setIsUsernameValid(usernameRegex.test(username));
        break;

      case 'password':
        setIsPasswordValid(passwordRegex.test(password));
        break;

      case 'passwordRe':
        setIsPasswordReValid(password === passwordRe);
        break;

      case 'email':
        setIsEmailValid(emailRegex.test(email));
        break;
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-12 col-md-6 d-flex flex-column align-items-center justify-content-center'>
              {/*<div className='d-flex justify-content-center py-4'>
                <Link
                  to={'/'}
                  className='logo d-flex align-items-center w-auto'
                >
                  <img src='assets/img/logo.png' alt='' />
                  <span className='d-none d-lg-block'></span>
                </Link>
              </div>*/}

              <div className='card mb-3'>
                <div className='card-body'>
                  <div className='pt-4 pb-2'>
                    <h5 className='card-title text-center pb-0 fs-4'>
                      회원가입
                    </h5>
                    <p className='text-center small'>
                      회원가입 절차를 진행해주세요. (이메일 인증이 필요합니다.)
                    </p>
                  </div>

                  <InputField
                    inputId={'email'}
                    inputName={'email'}
                    type={'text'}
                    label='Email'
                    onChange={(e) => {
                      setEmail(e.target.value);
                      initVerified();
                    }}
                    onBlur={() => handleValid('email')}
                    placeholder=''
                    maxLength={30}
                    hasButton={true}
                    buttonName={'인증'}
                    onClick={sendEmail}
                  />
                  {!isEmailValid && email && (
                    <Feedback
                      className={'invalid-feedback'}
                      text={'이메일 형식을 확인해주세요.'}
                    />
                  )}
                  <br />

                  <InputField
                    inputId={'code'}
                    inputName={'code'}
                    type={'text'}
                    label='인증코드'
                    onChange={(e) => setCode(e.target.value)}
                    placeholder=''
                    maxLength={8}
                    hasButton={true}
                    buttonName={'확인'}
                    show={seq ? true : false}
                    onClick={handleVerified}
                  />
                  {isVerified && (
                    <Feedback
                      className={'valid-feedback'}
                      text={'인증되었습니다.'}
                    />
                  )}
                  {seq && <br />}

                  <InputField
                    inputId={'username'}
                    inputName={'username'}
                    type={'text'}
                    label='아이디'
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    onBlur={() => handleValid('username')}
                    placeholder='문자포함 최소 4자 최대 10자'
                    maxLength={10}
                  />
                  {!isUsernameValid && username && (
                    <Feedback
                      className={'invalid-feedback'}
                      text={'아이디를 확인해주세요.'}
                    />
                  )}
                  <br />

                  <InputField
                    inputId={'password'}
                    inputName={'password'}
                    label='비밀번호'
                    type='password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={() => handleValid('password')}
                    placeholder='최소 4자 최대 10자'
                    maxLength={10}
                  />
                  {!isPassword && password && (
                    <Feedback
                      className={'invalid-feedback'}
                      text={'비밀번호를 확인해주세요.'}
                    />
                  )}
                  <br />

                  <InputField
                    inputId={'passwordRe'}
                    onChange={(e) => {
                      setPasswordRe(e.target.value);
                    }}
                    onBlur={() => handleValid('passwordRe')}
                    label='비밀번호 확인'
                    type='password'
                    placeholder='최소 4자 최대 10자'
                    maxLength={10}
                  />
                  {!isPasswordRe && passwordRe && (
                    <Feedback
                      className={'invalid-feedback'}
                      text={'비밀번호가 일치하지 않습니다.'}
                    />
                  )}
                  <br />

                  <div className='col-12'>
                    <button
                      className='btn btn-primary w-100'
                      onClick={handleSubmit}
                    >
                      가입하기
                    </button>
                  </div>
                </div>
              </div>

              <div className='credits'>
                Designed by{' '}
                <a href='https://bootstrapmade.com/'>BootstrapMade</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
