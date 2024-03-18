
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {useAxios} from "../../../hooks/UseAxios";
import {Loading} from "../../../components/Loading";
import {Link, useNavigate, useParams} from "react-router-dom";
import {LabelDiv} from "../../../components/Board/Detail/LabelDiv";

export const Detail = () => {
    const navi = useNavigate();
    const {seq} = useParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventTime, setEventTime] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const [insdate, setInsdate] = useState<string>('');
    const [update, setUpdate] = useState<string>('');
    const { userToken, isAuthenticated } = useContext(AuthContext);
    const { sendRequest, loading } = useAxios();

    const handleData = async () => {
        if(!isAuthenticated){
            alert("로그인이 필요합니다.");
            navi("/");
        }

        const response = await sendRequest(
          "GET",
          "/board/" + seq,
          null,
            {Authorization: 'Bearer ' + userToken.accessToken}
        );

        if(response){
            if(response.status == "success" && response.data){
                setTitle(response.data.title);
                setContent(response.data.content);
                setEventDate(response.data.eventDate);
                setEventTime(response.data.eventTime);
                setEventType(response.data.eventType);
                setInsdate(response.data.insdate);
                setUpdate(response.data.update);
            } else if (response.msg) {
                alert(response.msg);
            }
        }
    }

    const handleDel = async () => {
        if(!confirm("해당 게시글을 삭제하시겠습니까?")){
            return false;
        }

        const response = await sendRequest(
          "DELETE",
            "/board/" + seq,
            null,
            {Authorization: 'Bearer ' + userToken.accessToken}
        );

        if(response){
            if(response.status === 'success'){
                alert("삭제되었습니다.");
                navi('/board');
            } else {
                alert(response.msg);
                navi('/board');
            }
        }
    }

    useEffect(() => {
        handleData();
    }, []);

    return (
        <>
            <Loading loading={loading}/>
            <div className='pagetitle'>
                <h1>다이어리</h1>
                <br />
                <nav>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>NiceDiary</li>
                        <li className='breadcrumb-item active'>다이어리</li>
                    </ol>
                </nav>
            </div>
            <section className="section profile">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="card">
                            <div className="card-body pt-3">
                                <div className="tab-content pt-2">
                                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                                        <Link className="card-title" to={'/board'} ><i className="bi bi-arrow-left"></i></Link><br/><br/>
                                        <LabelDiv label={'제목'} content={title} type={'text'}/>
                                        <LabelDiv label={'예정일자'} content={eventDate} type={'text'}/>
                                        <LabelDiv label={'에정시간'} content={eventTime} type={'text'}/>
                                        <LabelDiv label={'타입'} content={eventType} type={'tag'}/>
                                        <LabelDiv label={'작성일'} content={insdate} type={'text'}/>
                                        {update && insdate !== update && <LabelDiv label={'수정일'} content={update} type={'text'}/>}
                                        <hr/>
                                        <div className={'border-primary'} dangerouslySetInnerHTML={{ __html: content }}></div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="button" className="btn btn-primary" onClick={() => navi('/board/form/' + seq)}>수정하기</button>&nbsp;
                                    <button type="button" className="btn btn-secondary" onClick={() => handleDel()}>삭제하기</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}