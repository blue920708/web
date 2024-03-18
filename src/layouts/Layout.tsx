import { Head } from './Head';
import {ReactNode, useEffect} from 'react';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Header } from './Header';
import {useLocation} from "react-router-dom";

interface Props {
  children: ReactNode;
}

export const Layout = (props: Props) => {
    const location = useLocation();
    useEffect(() => {
        if (!location.pathname.startsWith('/board')) {
            localStorage.removeItem('boardSearch');
        }
    }, [location.pathname]);

  return (
    <>
      <Head />
      <Header />
      <Sidebar />
      <main id='main' className={'main'}>
        {props.children}
      </main>
      <Footer />
    </>
  );
};
