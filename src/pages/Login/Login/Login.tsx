import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { useAxios } from '../../../hooks/UseAxios';
import { Loading } from '../../../components/Loading';
import AuthContext from '../../../contexts/AuthContext';
import Cookies from "js-cookie";

export const Login = () => {
  const navi = useNavigate();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const { sendRequest, loading } = useAxios();
  const { isLogin, isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    navi('/');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await sendRequest(
      'post',
      '/login/process',
      { username: username, password: password },
      { 'content-type': 'application/x-www-form-urlencoded' }
    );

    if (response) {
      if (response.status === 'success') {
        //sessionStorage.setItem('userToken', JSON.stringify(response.data));
        Cookies.set('userToken', JSON.stringify(response.data), { expires: 1 });
        isLogin(response.data);
        navi('/');
      } else {
        alert('로그인 정보가 존재하지 않습니다.');
      }
    }
  };

  return (
    <>
      <Loading loading={loading} />
      <section className='section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center'>
              <div className='d-flex justify-content-center py-4'>
                <Link
                  to={'/'}
                  className='logo d-flex align-items-center w-auto'
                >
                  <span className='d-none d-lg-block'></span>
                </Link>
              </div>

              <div className='card mb-3'>
                <div className='card-body'>
                  <div className='pt-4 pb-2'>
                    <h5 className='card-title text-center pb-0 fs-4'>로그인</h5>
                    <p className='text-center small'>
                      아이디 & 비밀번호를 입력해주세요.
                    </p>
                  </div>

                  <form
                    className='row g-3 needs-validation'
                    onSubmit={handleSubmit}
                  >
                    <div className='col-12'>
                      <label htmlFor='yourEmail' className='form-label'>
                        아이디
                      </label>
                      <div className='input-group has-validation'>
                        {/*<span
                          className='input-group-text'
                          id='inputGroupPrepend'
                        >
                          @
                        </span>*/}
                        <input
                          type='text'
                          name='email'
                          className='form-control'
                          id='yourEmail'
                          required
                          autoComplete='off'
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <div className='invalid-feedback'>
                          Please enter your username.
                        </div>
                      </div>
                    </div>

                    <div className='col-12'>
                      <label htmlFor='yourPassword' className='form-label'>
                        비밀번호
                      </label>
                      <input
                        type='password'
                        name='password'
                        className='form-control'
                        id='yourPassword'
                        required
                        autoComplete='off'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div className='invalid-feedback'>
                        Please enter your password!
                      </div>
                    </div>

                    {/*<div className='col-12'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='remember'
                          value='true'
                          id='rememberMe'
                        />
                        <label
                          className='form-check-label'
                          htmlFor='rememberMe'
                        >
                          Remember me
                        </label>
                      </div>
                    </div>*/}
                    <div className='col-12'>
                      <button className='btn btn-primary w-100' type='submit'>
                        Login
                      </button>
                    </div>
                    <div className='col-12'>
                      <p className='small mb-0'>
                        계정이 없으신가요?
                        <Link to={'/login/join'}> 회원가입</Link>
                      </p>
                    </div>
                    <div className='col-12'>
                      <p className='small mb-0'>
                        계정 정보를 잊으셨나요?&nbsp;
                        <Link to={'/login/findPwd'}>비밀번호 찾기</Link>
                      </p>
                    </div>
                  </form>
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
