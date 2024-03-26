import { ReactNode, createContext, useState } from 'react';
import { useAxios } from '../hooks/UseAxios';
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  userToken: { [key: string]: string };
  isLogin: (userToken: { [key: string]: string }) => void;
  isLogout: () => void;
  disable: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userToken: {},
  isLogin: () => {},
  isLogout: () => {},
  disable: () => {}
});

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const { sendRequest } = useAxios();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const userToken = Cookies.get('userToken');
    return userToken ? JSON.parse(userToken) : false;
  });

  const [userToken, setUserToken] = useState<{ [key: string]: string }>(() => {
    const userToken = Cookies.get('userToken');
    return userToken ? JSON.parse(userToken) : null;
  });

  const isLogin = (userToken: { [key: string]: string }) => {
    setIsAuthenticated(true);
    setUserToken(userToken);
  };

  const isLogout = async () => {
    if (!confirm('로그아웃 하시겠습니까?')) {
      return false;
    }

    Cookies.remove("userToken");
    setIsAuthenticated(false);
    setUserToken({});
    location.href = "/";
  };

  const disable = async () => {
    Cookies.remove("userToken");
    setIsAuthenticated(false);
    setUserToken({});
    location.href = "/";
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userToken, isLogin, isLogout, disable }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
