import { useNavigate, useParams } from 'react-router-dom';
import { useAxios } from '../../../hooks/UseAxios';
import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { Loading } from '../../../components/Loading';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from '@emotion/styled';

const Input = styled.input`
  background-color: transparent;
  border: none;
  width: auto;
`;

export const Page = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [insdate, setInsdate] = useState<string>('');
  const [update, setUpdate] = useState<string>('');
  const { seq } = useParams();
  const { userToken, isAuthenticated } = useContext(AuthContext);
  const { sendRequest, loading } = useAxios();

  const handleSave = async (type: string) => {
    let data = {};
    if (type === 'title') {
      data = { seq: seq, title: title };
    } else if (type === 'content') {
      data = { seq: seq, content: content };
    }

    if (title && title.length > 20) {
      alert('제목은 20자를 초과할 수 없습니다.');
      return false;
    }

    if (content && content.length > 2000) {
      alert('입력 내용은 2000자를 초과할 수 없습니다.');
      return false;
    }
    const response = await sendRequest('POST', '/page/save', data, {
      Authorization: 'Bearer ' + userToken.accessToken,
    });

    if (response) {
      if (response.status === 'success') {
        alert('저장 되었습니다.');
        location.reload();
      } else if (response.status === 'fail') {
        alert(response.msg);
      }
    }
  };

  const handleDel = async () => {
    if (!confirm('현재 페이지를 삭제하시겠습니까?')) {
      return false;
    }

    const response = await sendRequest('DELETE', '/page/' + seq, null, {
      Authorization: 'Bearer ' + userToken.accessToken,
    });

    if (response) {
      if (response.status === 'success') {
        alert('삭제 되었습니다.');
        location.href = "/";
      } else if (response.status === 'fail') {
        alert(response.msg);
      }
    }
  };

  const handleData = async () => {
    if(!isAuthenticated){
      alert("로그인이 필요합니다.");
      navi('/');
    }

    setContent('');
    const response = await sendRequest('GET', '/page/' + seq, null, {
      Authorization: 'Bearer ' + userToken.accessToken,
    });

    if (response && response.data) {
      setTitle(response.data.title);
      setContent(response.data.content);
      setInsdate(response.data.insdate);
      setUpdate(response.data.update);
    }
  };

  useEffect(() => {
    handleData();
  }, [seq]);

  return (
    <>
      <Loading loading={loading} />
      <div className='pagetitle'>
        <h1>메모장</h1>
        <nav>
          <ol className='breadcrumb'>
            <li className='breadcrumb-item'>NiceDiary</li>
            <li className='breadcrumb-item active'>{title}</li>
          </ol>
        </nav>
      </div>
      <br />
      <section className='section'>
        <div className='row'>
          <div className='col-lg-8'>
            <div className='card'>
              <div className={'card-header'}>최초 작성 : {insdate} {update && <span>( 최종 수정 : {update} )</span>}</div>
              <div className='card-body'>
                <Input
                    className='card-title'
                    type={'text'}
                    value={title}
                    maxLength={20}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <i className={'ri-edit-2-line'} style={{ cursor: 'pointer' }} data-bs-toggle='dropdown'></i>
                <ul className='dropdown-menu dropdown-menu-end dropdown-menu-arrow profile'>
                  <li>
                    <a
                        className='dropdown-item d-flex align-items-center'
                        href={''}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSave('title');
                        }}
                    >
                      <span>수정</span>
                    </a>
                  </li>
                  <li>
                    <hr className='dropdown-divider' />
                  </li>
                  <li>
                    <a
                        className='dropdown-item d-flex align-items-center'
                        href={''}
                        onClick={(e) => {
                          e.preventDefault();
                          handleDel();
                        }}
                    >
                      <span>삭제</span>
                    </a>
                  </li>
                </ul>
                <div>
                  <ReactQuill
                    theme='snow'
                    onChange={(value) => setContent(value)}
                    value={content || ''}
                  />
                  {/*<div dangerouslySetInnerHTML={{ __html: content || '' }} />*/}
                </div>
                <br />
                <button
                  style={{ float: 'right' }}
                  className='btn btn-primary'
                  type='button'
                  onClick={() => handleSave('content')}
                >
                  저장하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
