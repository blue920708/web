import {useContext, useEffect} from 'react';
import AuthContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie";

export const Header = () => {
  const { userToken, isLogout, isLogin } = useContext(AuthContext);

  useEffect(() => {
    const userToken = Cookies.get("userToken");
    if(userToken){
      isLogin(JSON.parse(userToken));
    }
  }, [])

  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
      <div className='d-flex align-items-center justify-content-between'>
        <Link to='/' className='logo d-flex align-items-center'>
          <img src='assets/img/logo.png' alt='' />
          <span className='d-none d-lg-block'>NiceDiary</span>
        </Link>
      </div>

      <nav className='header-nav ms-auto'>
        <ul className='d-flex align-items-center'>
          <li className='nav-item d-block d-lg-none'>
            <a className='nav-link nav-icon search-bar-toggle ' href='#'>
              <i className='bi bi-search'></i>
            </a>
          </li>
          <li className='nav-item dropdown pe-3'>
            {!userToken ||
              (!userToken.username && (
                <span className='d-none d-md-block ps-2'>
                  로그인이 필요합니다.
                </span>
              ))}
            {userToken && userToken.username && (
              <>
                <a
                  className='nav-link nav-profile d-flex align-items-center pe-0'
                  href='#'
                  data-bs-toggle='dropdown'
                >
                  <span
                    className='d-none d-md-block dropdown-toggle'
                    style={{ fontSize: "20px" }}
                  >
                    {userToken.username}
                  </span>
                </a>
                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                  <li>
                    <a
                      className='dropdown-item d-flex align-items-center'
                      href='users-profile.html'
                    >
                      <i className='bi bi-person'></i>
                      <span>My Profile</span>
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a
                      className='dropdown-item d-flex align-items-center'
                      href='users-profile.html'
                    >
                      <i className='bi bi-gear'></i>
                      <span>Account Settings</span>
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a
                      className='dropdown-item d-flex align-items-center'
                      href='#'
                      onClick={(e) => {
                        e.preventDefault();
                        isLogout();
                      }}
                    >
                      <i className='bi bi-box-arrow-right'></i>
                      <span>Sign Out</span>
                    </a>
                  </li>
                </ul>
              </>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
