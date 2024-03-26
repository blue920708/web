
export const About = () => {
    return (
      <>
          <section className="section profile">
              <div className="row">
                  <div className="col-xl-8">
                      <div className="card">
                          <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                              <img src="/img/firstView.jpg" alt="Profile" className="rounded-circle"/>
                              <h2>최성훈</h2><br/>
                              <h3>Web Developer</h3><br/>
                              {/*<p className="small fst-italic">Sunt est soluta temporibus accusantium neque nam
                                  maiores cumque temporibus. Tempora libero non est unde veniam est qui dolor.
                                  Ut sunt iure rerum quae quisquam autem eveniet perspiciatis odit. Fuga sequi
                                  sed ea saepe at unde.</p>*/}
                          </div>
                      </div>

                      <div className="card">
                          <div className="card-body pt-3">

                              <div className="tab-content pt-2">
                                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                      <h5 className="card-title">프로필</h5>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label ">이 름</div>
                                          <div className="col-lg-9 col-md-8">최성훈</div>
                                      </div>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label">생년월일</div>
                                          <div className="col-lg-9 col-md-8">1992. 7. 8 (만 31세)</div>
                                      </div>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label">학 력</div>
                                          <div className="col-lg-9 col-md-8">강릉원주대학교 / 세라믹신소재공학 <br/><em>2011. 3 ~ 2018. 2</em></div>
                                      </div>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label">자격증</div>
                                          <div className="col-lg-9 col-md-8">
                                              품질경영기사 / 한국산업인력공단 - <em>2018.05</em><br/>
                                              컴퓨터활용능력 1급 / 대한상공회의소 - <em>2017.08</em>
                                          </div>
                                      </div>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label">교육</div>
                                          <div className="col-lg-9 col-md-8">자바 프레임워크 개발자 양성과정 (6개월) / KH정보교육원 <br/><em>2019. 8 ~ 2020. 3</em></div>
                                      </div>

                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label">인턴</div>
                                          <div className="col-lg-9 col-md-8">무기재료 분석 및 실험 / 한국산업기술시험원 <br/><em>2018. 8 ~ 2018. 10</em></div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="card">
                          <div className="card-body pt-3">
                              <div className="tab-content pt-2">
                                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                      <h5 className="card-title">경력</h5>
                                      <span className="small fst-italic">총 3년 8개월</span><br/><br/>

                                      <h5 className="card-title">프리텔레콤</h5>
                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label ">2023. 2 ~ 2024. 2 | <br/><span className="small fst-italic">IT 개발팀 / 매니저</span></div>
                                          <div className="col-lg-9 col-md-8">
                                              <strong>홈페이지 및 사내 인트라넷 시스템 운영 및 유지보수</strong><br/>
                                              <strong>통신 3사(SKT/LG/KT) API 연동 시스템 개발 및 유지보수</strong><br/><br/>
                                              담당 :<br/>
                                              - 메인 홈페이지 및 사내 인트라넷 시스템 운영 및 유지보수<br/>
                                              - 통신 3사(SKT/LG/KT) API 연동 시스템 개발 및 유지보수<br/>
                                              <br/>
                                              내용 :<br/>
                                              - LG 유플러스 할인코드 일괄처리 시스템 개발<br/>
                                              - LG 유플러스 차세대 API 전환<br/>
                                              - 농협 올원뱅크 알뜰폰 요금제 제휴 서비스 API 연동 개발<br/>
                                              - KT API 연동 민감정보 데이터 암복호화<br/>
                                              - KT 빌링시스템 서비스 API 연동 개발<br/>
                                              - 3사 셀프개통 및 셀프서비스 개선<br/>
                                              <br/>
                                              ● 기술 : Java, Thymeleaf, SpringBoot, Oracle, Gitlab, Jenkins
                                          </div>
                                      </div>

                                      <h5 className="card-title">교림소프트</h5>
                                      <div className="row">
                                          <div className="col-lg-3 col-md-4 label ">2020. 6 ~ 2022. 12 | <br/><span className="small fst-italic">SI 사업부 / 주임</span></div>
                                          <div className="col-lg-9 col-md-8">
                                          <p>
                                              <strong>2022년도 온라인청년센터 유지관리 및 운영지원 사업 [2022.02.24 ~ 2022.12.21] -한국고용정보원</strong><br/>
                                              <strong>2021년도 온라인청년센터 유지관리 및 운영지원 사업 [2021.03.11 ~ 2022.02.20] -한국고용정보원</strong><br/><br/>
                                              담당 : <br/>
                                              - 온라인청년센터 관리자 및 사용자 시스템 유지보수 및 기능 개발<br/><br/>
                                              내용 :<br/>
                                              - 청년친화강소기업 신청관리 기능 구현<br/>
                                              - 청년정책 데이터 수집 API 기능 구현<br/>
                                              - 청년상담 시스템 고도화<br/>
                                              - 관리자 및 사용자 시스템 개선<br/>
                                              <br/>
                                              ● 사용기술 : Java, JSP, SpringFramework, Oracle, CA Harvest<br/>
                                              <br/>
                                              <strong>차세대교육관리통합시스템 구축(2단계) 사업 [2020.12.21 ~ 2021.03.05] -한국보건복지인력개발원</strong><br/><br/>
                                              담당 : <br/>
                                              - 온/오프라인 학습관리 LMS 시스템 고도화<br/><br/>
                                              내용 :<br/>
                                              - KOHI 의무교육 (온라인 학습관리 시스템) 신규 개발<br/>
                                              - KOHI 공유플랫폼 (대용량 파일공유 시스템) 신규 개발<br/>
                                              - 관리자 시스템 유지보수<br/>
                                              <br/>
                                              ● 기술 : Java, JSP, SpringFramework, Oracle, SVN<br/>
                                              <br/>
                                              <strong>문화예술교육자원조사 시스템 구축 [2020.07.01 ~ 2020.12.20] -한국문화예술교육진흥원</strong><br/><br/>
                                              담당 : <br/>
                                              - 재택근무 출퇴근 및 보고서 관리<br/><br/>
                                              내용 :<br/>
                                              - 본인인증 API를 이용한 사용자 로그인 및 아이디/비밀번호찾기 기능 구현<br/>
                                              - 근무자 출퇴근 관리 기능 구현<br/>
                                              - 관리자 게시판 기능 구현<br/>
                                              <br/>
                                              ● 기술 : Java, JSP, SpringFramework, Oracle, Gitlab
                                          </p>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="card">
                          <div className="card-body pt-3">
                              <div className="tab-content pt-2">
                                  <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                      <h5 className="card-title">포트폴리오</h5>
                                      <div className="row">
                                          <div className="col-lg-9 col-md-8">
                                              <div className="row">
                                                  <div className="col-lg-3 col-md-4 label ">Backend</div>
                                                  <div className="col-lg-9 col-md-8">JAVA, SpringBoot, JPA</div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-lg-3 col-md-4 label ">Frontend</div>
                                                  <div className="col-lg-9 col-md-8">React, Typescript</div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-lg-3 col-md-4 label ">Server</div>
                                                  <div className="col-lg-9 col-md-8">Nginx, Tomcat, Docker</div>
                                              </div>
                                              <div className="row">
                                                  <div className="col-lg-3 col-md-4 label ">CI/CD</div>
                                                  <div className="col-lg-9 col-md-8">Github, Jenkins</div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <div className="contact">
                          <div className="row">
                              <div className="col-lg-6">
                                  <div className="info-box card">
                                      <i className="bi bi-envelope"></i>
                                      <h3>Email</h3>
                                      <p>blue920708@naver.com</p>
                                  </div>
                              </div>
                              <div className="col-lg-6">
                                  <div className="info-box card">
                                      <i className="bi bi-telephone"></i>
                                      <h3>Contact</h3>
                                      <p>010-4946-1768</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                  </div>
              </div>
          </section>
      </>
    );
}