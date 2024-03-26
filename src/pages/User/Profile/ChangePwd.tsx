import React, {useContext, useState} from "react";
import {Feedback} from "../../../components/Login/Join/Feedback";
import {useAxios} from "../../../hooks/UseAxios";
import AuthContext from "../../../contexts/AuthContext";
import {Loading} from "../../../components/Loading";

export const ChangePwd = () => {
    const {userToken} = useContext(AuthContext);
    const [prevPwd, setPrevPwd] = useState<string>('');
    const [newPwd, setNewPwd] = useState<string>('');
    const [newPwdRe, setNewPwdRe] = useState<string>('');
    const [isNewPwdValid, setIsNewPwdValid] = useState<boolean>(false);
    const [isNewPwdReValid, setIsNewPwdReValid] = useState<boolean>(false);
    const {sendRequest, loading} = useAxios();

    const handleValid = (type: string) => {
        const passwordRegex = /^.{4,10}$/;

        switch (type) {
            case 'password':
                setIsNewPwdValid(passwordRegex.test(newPwd));
                break;

            case 'passwordRe':
                setIsNewPwdReValid(newPwd === newPwdRe);
                break;
        }
    };

    const handleSubmit = async () => {
        if(!prevPwd){
            alert("현재 비밀번호를 입력해주세요.");
            return false;
        }

        if(!newPwd || !newPwdRe){
            alert("새 비밀번호를 입력해주세요.");
            return false;
        }

        if(!isNewPwdValid || !isNewPwdReValid){
            alert("새 비밀번호를 확인해주세요.");
            return false;
        }

        const response = await sendRequest(
            'POST',
            '/user/chgPwd',
            {prevPwd: prevPwd, newPwd: newPwd},
            {Authorization: 'Bearer ' + userToken.accessToken,}
        );

        if(response){
            if(response.status === 'success'){
                alert('비밀번호가 변경되었습니다.');
                location.reload();
            } else if (response.status === 'fail'){
                alert(response.msg);
            }
        }
    }

  return (
      <>
      <Loading loading={loading} />
        <div className='tab-pane fade pt-3' id='profile-change-password'>
            <div className='row mb-3'>
              <label
                htmlFor='currentPassword'
                className='col-md-4 col-lg-3 col-form-label'
              >
                현재 비밀번호
              </label>
              <div className='col-md-8 col-lg-9'>
                <input
                  name='password'
                  type='password'
                  className='form-control'
                  id='currentPassword'
                  placeholder={'현재 비밀번호'}
                  maxLength={10}
                  onChange={(e) => {
                      setPrevPwd(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className='row mb-3'>
              <label
                htmlFor='newPassword'
                className='col-md-4 col-lg-3 col-form-label'
              >
                새 비밀번호
              </label>
              <div className='col-md-8 col-lg-9'>
                <input
                  name='newpassword'
                  type='password'
                  className='form-control'
                  id='newPassword'
                  placeholder={'최소 4자 최대 10자'}
                  maxLength={10}
                  onChange={(e) => setNewPwd(e.target.value)}
                  onBlur={() => handleValid('password')}
                />
              </div>
                {!isNewPwdValid && newPwd && (
                    <Feedback
                        className={'invalid-feedback'}
                        text={'새 비밀번호를 확인해주세요.'}
                    />
                )}
            </div>

            <div className='row mb-3'>
              <label
                htmlFor='renewPassword'
                className='col-md-4 col-lg-3 col-form-label'
              >
                새 비밀번호 확인
              </label>
              <div className='col-md-8 col-lg-9'>
                <input
                  name='renewpassword'
                  type='password'
                  className='form-control'
                  id='renewPassword'
                  placeholder={'최소 4자 최대 10자'}
                  maxLength={10}
                  onChange={(e) => setNewPwdRe(e.target.value)}
                  onBlur={() => handleValid('passwordRe')}
                />
              </div>
                {!isNewPwdReValid && newPwdRe && (
                    <Feedback
                        className={'invalid-feedback'}
                        text={'비밀번호가 일치하지 않습니다.'}
                    />
                )}
            </div>

            <div className='text-center'>
              <button type='button' className='btn btn-primary' onClick={handleSubmit}>
                변경하기
              </button>
            </div>
        </div>
      </>
  );
};
