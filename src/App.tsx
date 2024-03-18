/*import './assets/vendor/apexcharts/apexcharts.min.js';*/
import './assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import './assets/vendor/chart.js/chart.umd.js';
import './assets/vendor/echarts/echarts.min.js';
import './assets/vendor/quill/quill.min.js';
import './assets/vendor/simple-datatables/simple-datatables.js';
import './assets/vendor/tinymce/tinymce.min.js';
import './assets/vendor/php-email-form/validate.js';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/vendor/boxicons/css/boxicons.min.css';
import './assets/vendor/quill/quill.snow.css';
import './assets/vendor/quill/quill.bubble.css';
import './assets/vendor/remixicon/remixicon.css';
import './assets/vendor/simple-datatables/style.css';
import './assets/css/style.css';
import './App.css';
import { Layout } from './layouts/Layout';
import {Route, Routes, BrowserRouter as Router, useLocation} from 'react-router-dom';
import { Login } from './pages/Login/Login/Login';
import { NotFound } from './pages/Error/NotFound';
import { Main } from './pages/Main/Main';
import { Join } from './pages/Login/Join/Join';
import { AuthProvider } from './contexts/AuthContext';
import React, { useEffect } from 'react';
import { Page } from './pages/Guest/Page/Page';
import { FindId } from './pages/Login/Find/FindId';
import { FindPwd } from './pages/Login/Find/FindPwd';
import { Profile } from './pages/User/Profile/Profile';
import {Board} from "./pages/Guest/Board/Board";
import {Form} from "./pages/Guest/Board/Form";
import {Detail} from "./pages/Guest/Board/Detail";
import {About} from "./pages/About/About";

function App() {

  /*useEffect(() => {
    const script = document.createElement('script');
    script.src = '/assets/js/main.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);*/

  return (
    <>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path={'/login'} element={<Login />} />
              <Route path={'/login/join'} element={<Join />} />
              <Route path={'/login/findId'} element={<FindId />} />
              <Route path={'/login/findPwd'} element={<FindPwd />} />
              <Route path={'/page/:seq'} element={<Page />} />
              <Route path={'/user/profile'} element={<Profile />} />
              <Route path={'/board'} element={<Board />} />
              <Route path={'/board/form'} element={<Form />} />
              <Route path={'/board/form/:seq'} element={<Form />} />
              <Route path={'/board/:seq'} element={<Detail />} />
              <Route path={'/about'} element={<About />} />
              <Route path={'/'} element={<Main pageTitle={'환영합니다.'} />} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
