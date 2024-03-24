interface Page {
  pageTitle: string;
}

export const Main = ({ pageTitle }: Page) => {
  return (
    <>
      <div className='pagetitle'>
        <h1>{pageTitle}</h1>
        <br />
        <nav>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item active'>
              <a href='/'>Home</a>
            </li>
          </ol>
        </nav>
      </div>
      <br />
      <section className='section'>
        <div className='row'>
          {/*<div className='col-lg-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>About</h5>
                <p>
                  이 사이트는 <strong>웹개발자 최성훈</strong>의 개인
                  프로젝트이며 운영 목적을 위해 만들어진 사이트가 아닙니다.
                  <br />
                  이곳에서는 저의 개인 프로젝트인 <strong>NiceDiary</strong>를
                  체험하실 수 있습니다.
                  <br />
                  <br />
                  사이드 메뉴 구분 <strong>[ABOUT]</strong> 아래에는 저의 개인
                  프로필과 경력이 기술되어있으며, 저에 대해 궁금하신 점이 있다면
                  1:1 문의를 보내실 수 있습니다. (언제든지 답변드리겠습니다.)
                </p>
              </div>
            </div>
          </div>*/}

          <div className='col-lg-6'>
            <div className='card'>
              <div className='card-body'>
                <h5 className='card-title'>시작하기</h5>
                <p>
                  - <strong>NiceDiary</strong>는 <strong>개발자 최성훈</strong>의 포트폴리오 목적으로 만들어진 개인 프로젝트입니다.
                  <br />
                  <br />
                  - <strong>NiceDiary</strong>는 개인 업무를 관리하는 웹
                  다이어리입니다.
                  <br />
                  <br />
                  - 로그인 및 회원가입을 진행해주세요.&nbsp;
                  <strong>NiceDiary</strong>는 회원전용입니다.
                  <br />
                  <br />
                  - 사이드 메뉴에 있는 <strong>[새 메모장]</strong> 버튼을
                  클릭하세요. 추가된 페이지 안에서 폼 에디터를 이용하여 메모
                  내용을 작성 및 수정하실 수 있습니다.
                  <br />
                  <br />
                  - <strong>[다이어리]</strong> 메뉴에서는 일정별 TODO 리스트를 작성하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
