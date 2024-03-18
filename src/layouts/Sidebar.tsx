import { useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useAxios } from '../hooks/UseAxios';
import { Loading } from '../components/Loading';
import { NavItem } from '../components/Sidebar/NavItem';

export const Sidebar = () => {
  const navi = useNavigate();
  const { sendRequest, loading } = useAxios();
  const { isAuthenticated, userToken, isLogout } = useContext(AuthContext);
  interface NavItem {
    seq?: number;
    pageTitle: string;
    path: string;
    class: string;
    onClick?: () => void;
  }

  const [navItemList, setNavItemList] = useState<NavItem[]>([]);

  const handleLogout = async () => {
    isLogout();
  };

  const hanldePageAdd = async () => {
    if (!isAuthenticated || !userToken) {
      alert('로그인이 필요합니다.');
      return false;
    }

    if (!confirm('새 메모장을 추가하시겠습니까?')) {
      return false;
    }

    const response = await sendRequest(
      'POST',
      '/page/add',
      { username: userToken.username },
      { Authorization: 'Bearer ' + userToken.accessToken }
    );

    if (response) {
      handleData();
      if(response.status === 'success'){
        alert("새 메모장이 생성되었습니다.");
        navi('/page/' + response.data);
      } else if (response.status === 'fail') {
        alert(response.msg);
      }
    }
  };

  const handleData = async () => {
    if (!isAuthenticated || !userToken) {
      setNavItemList([]);
      return false;
    }

    const response = await sendRequest(
      'GET',
      '/page',
      { username: userToken.username },
      { Authorization: 'Bearer ' + userToken.accessToken }
    );

    if(response){
      if (Array.isArray(response.data)) {
        setNavItemList(
            response.data.map((item: { title: string; seq: number }) => ({
              seq: item.seq,
              pageTitle: item.title,
              path: '/page/' + item.seq,
              class: 'bi bi-file-text',
            }))
        );
      }
    }
  };

  useEffect(() => {
    handleData();
  }, [isAuthenticated, userToken]);

  return (
    <>
      <Loading loading={loading} />
      <aside id='sidebar' className='sidebar'>
        <ul className='sidebar-nav' id='sidebar-nav'>
          <li className='nav-heading'>NiceDiary</li>

          {/* HOME */}
          <NavItem path={'/'} pageTitle={'HOME'} className={'bi bi-grid'} />

          {/* 게시판 */}
          <NavItem
              path={'/board'}
              pageTitle={'다이어리'}
              className={'bi bi-layout-text-window-reverse'}
              isActive={location.pathname.startsWith('/board')}
          />

          {navItemList.map((navItem, index) => {
            const isActive = location.pathname === navItem.path;
            return (
              <NavItem
                key={index}
                path={navItem.seq ? '/page/' + navItem.seq : ''}
                pageTitle={navItem.pageTitle}
                className={navItem.class}
                isActive={isActive}
              />
            );
          })}

          {/* 새 메모장 항목 */}
          <NavItem
            path={''}
            pageTitle={'새 메모장'}
            className={'bi bi-plus-lg'}
            onClick={hanldePageAdd}
          />

          <li className='nav-heading'>사용자</li>
          {/* 로그인 및 회원가입 항목 */}
          {!isAuthenticated && (
            <>
              <NavItem
                path={'/login'}
                pageTitle={'로그인'}
                className={'bi bi-box-arrow-in-right'}
                isActive={location.pathname === '/login'}
              />
              <NavItem
                path={'/login/join'}
                pageTitle={'회원가입'}
                className={'bi bi-card-list'}
                isActive={location.pathname === '/login/join'}
              />
            </>
          )}

          {/* 로그아웃 항목 */}
          {isAuthenticated && (
            <>
              <NavItem
                path={'/user/profile'}
                pageTitle={'프로필'}
                className={'bi bi-person'}
                isActive={location.pathname === '/user/profile'}
              />
              <NavItem
                path={''}
                pageTitle={'로그아웃'}
                className={'bi bi-box-arrow-in-right'}
                onClick={handleLogout}
              />
            </>
          )}

          <li className='nav-heading'>About</li>
          <NavItem
            path={'/about'}
            pageTitle={'About'}
            className={'bi bi-file-person'}
            isActive={location.pathname === '/about'}
          />
          <NavItem
            path={'/about'}
            pageTitle={'Contact'}
            className={'bi bi-envelope'}
            isActive={location.pathname === '/about/contact'}
          />
        </ul>
      </aside>
    </>
  );
};
