import { Overview } from './Overview';
import { ChangePwd } from './ChangePwd';
import { useAxios } from '../../../hooks/UseAxios';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';

export const Profile = () => {
  const { sendRequest } = useAxios();
  const { userToken } = useContext(AuthContext);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [insdate, setInsdate] = useState<string>('');
  const userInfo = async () => {
    const response = await sendRequest('GET', '/user/info', null, {
      Authorization: 'Bearer ' + userToken.accessToken,
    });

    if (response) {
      if (response.status === 'success') {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setInsdate(response.data.insdate);

      } else if (response.msg) {
        alert(response.msg);
      }
    }
  };
  useEffect(() => {
    userInfo();
  }, []);

  return (
    <>
      <div className='pagetitle'>
        <h1>프로필</h1>
        <nav>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>사용자</li>
            <li className='breadcrumb-item active'>프로필</li>
          </ol>
        </nav>
      </div>
      <section className='section profile'>
        <div className='row'>
          <div className='col-xl-8'>
            <div className='card'>
              <div className='card-body pt-3'>
                <ul className='nav nav-tabs nav-tabs-bordered'>
                  <li className='nav-item'>
                    <button
                      className='nav-link active'
                      data-bs-toggle='tab'
                      data-bs-target='#profile-overview'
                    >
                      프로필
                    </button>
                  </li>
                  <li className='nav-item'>
                    <button
                      className='nav-link'
                      data-bs-toggle='tab'
                      data-bs-target='#profile-change-password'
                    >
                      비밀번호 변경
                    </button>
                  </li>
                </ul>
                <div className='tab-content pt-2'>
                  <Overview
                    username={username}
                    email={email}
                    insdate={insdate}
                  />
                  <ChangePwd />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
