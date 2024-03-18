import { useNavigate } from 'react-router-dom';
import { useAxios } from '../../../hooks/UseAxios';
import React, { useContext, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { Loading } from '../../../components/Loading';
import { InputField } from '../../../components/Login/Join/InputField';
import { Feedback } from '../../../components/Login/Join/Feedback';

export const FindId = () => {
  const navi = useNavigate();
  const { sendRequest, loading } = useAxios();
  const { isAuthenticated } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>();
  const [seq, setSeq] = useState<string>();
  const [isVerified, setIsVerified] = useState<boolean>(false);

  if (isAuthenticated) {
    navi('/');
  }

  const sendEmail = async () => {
    setIsVerified(false);

    if (!email) {
      alert('가입 이메일을 입력해주세요.');
      return false;
    }

    const response = await sendRequest(
      'post',
      '/user/verify-email',
      { email: email, type: 'emailForMissing' },
      {}
    );

    if (response.status == 'success') {
      setSeq(response.data);
      alert('인증코드가 메일로 발송되었습니다. 인증코드를 입력해주세요.');
    } else if (response.msg) {
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
      '/user/findId',
      { seq: seq, email: email, code: code },
      {}
    );

    if (response.status == 'success') {
      setIsVerified(true);
      setUsername(response.data);
    } else if (response.msg) {
      alert(response.msg);
    }
  };

  const initVerified = () => {
    setIsVerified(false);
  };

  return (
    <>
      <Loading loading={loading} />
      <section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-12 col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <div className='card mb-3'>
                <div className='card-body'>
                  <div className='pt-4 pb-2'>
                    <h5 className='card-title text-center pb-0 fs-4'>
                      아이디 찾기
                    </h5>
                    <p className='text-center small'>
                      가입 이메일을 입력해주세요.
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
                    placeholder=''
                    maxLength={30}
                    hasButton={true}
                    buttonName={'인증'}
                    onClick={sendEmail}
                  />
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
                  {isVerified && username && (
                    <div className='col-12'>가입{username}</div>
                  )}
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
