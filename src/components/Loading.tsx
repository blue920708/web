
//import Spinner from '../assets/img/spinner.gif';
import styled from '@emotion/styled';

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/*const LoadingText = styled.div`
    font: 1rem 'Noto Sans KR';
    text-align: center;
`;*/

interface Props {
  loading: boolean;
}

export const Loading = ({ loading }: Props) => {
  if (!loading) return null;
  return (
    <>
      <Background>
        {/*<LoadingText>잠시만 기다려 주세요.</LoadingText>*/}
        <img src={'/img/spinner.gif'} alt='로딩중' width='5%' />
      </Background>
    </>
  );
};
