import axios, {
  AxiosError,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import {useContext, useState} from 'react';
import AuthContext from "../contexts/AuthContext";
import Cookies from "js-cookie";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 1000 * 60,
});

let savedConfig: AxiosRequestConfig | null = null;
export const useAxios = () => {
  const {isLogin, disable, userToken} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const sendRequest = async (
    method: string,
    url: string,
    data: object | null = null,
    header: AxiosHeaders | NonNullable<unknown> = {
      'content-type': 'application/json',
    }
  ) => {
    setLoading(true);
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        data,
        headers: header,
      };
      
      savedConfig = config;
      const response: AxiosResponse = await instance(config);
      return response.data;

    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError && error.response !== undefined) {
        if (error.response.data.error === 'AUTHORIZATION_ERROR') {
          alert('로그인 정보가 존재하지 않습니다.');
          reload();

        } else if (error.response.data.error === 'TOKEN_EXPIRED') {
          // 토큰 갱신
          const renewalToken = await refreshAccessToken();

          // 토큰 할당 후 재시도
          if (savedConfig) {
            savedConfig.headers = {
              'Authorization': 'Bearer ' + renewalToken,
              'Content-Type': 'application/json',
            };
            const response = await instance.request(savedConfig);
            return response.data;
          }

        } else {
          alert('작업 처리중 오류가 발생하였습니다.');
        }
      } else {
        alert('작업 처리중 오류가 발생하였습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  // 사용자 정보 초기화
  const reload = () => {
    disable();
    location.href = "/";
  }

  // 토큰 재발급
  const refreshAccessToken = async () => {
    try {
      const response = await instance.post(
          '/user/refresh',
          { username: userToken.username },
          { headers: {
              'Authorization': 'Bearer ' + userToken.refreshToken,
              'Content-Type': 'application/json',
            }}
      );

      if (response.data.status === 'success') {
        Cookies.set('userToken', JSON.stringify(response.data.data), { expires: 1 });
        isLogin(response.data.data);
        return response.data.data.accessToken;
      } else {
        reload();
      }
    } catch (error) {
      reload();
    }
  };

  return { sendRequest, loading };
};
