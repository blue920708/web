import ReactQuill from "react-quill";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {useAxios} from "../../../hooks/UseAxios";
import {Loading} from "../../../components/Loading";
import {Link, useNavigate, useParams} from "react-router-dom";

export const Form = () => {
    const navi = useNavigate();
    const {seq} = useParams();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');
    const [eventTime, setEventTime] = useState<string>('');
    const [eventType, setEventType] = useState<string>('');
    const { userToken, isAuthenticated } = useContext(AuthContext);
    const { sendRequest, loading } = useAxios();

    const handleSubmit = async () => {

        if(!isAuthenticated){
            alert("로그인이 필요합니다.");
            navi("/");
        }

        let url = "";
        let data = {}

        if(!title){
            alert("제목을 입력해주세요.");
            return false;
        }

        if(!eventDate){
            alert("예정 일자를 입력해주세요.");
            return false;
        }

        if(!content){
            alert("내용을 입력해주세요.");
            return false;
        }
        
        if(content.length >= 2000){
            alert("입력 내용은 2000자를 초과할 수 없습니다.");
            return false;
        }

        if(!eventType){
            alert("타입을 선택해주세요.");
            return false;
        }


        if(!seq){
            url = "/board/add";
            data = {title: title, content: content, eventDate: eventDate, eventTime: eventTime, eventType: eventType}
        } else {
            url = "/board/save";
            data = {seq: seq, title: title, content: content, eventDate: eventDate, eventTime: eventTime, eventType: eventType}
        }

        const response = await sendRequest(
            "POST",
            url,
            data,
            {Authorization: 'Bearer ' + userToken.accessToken}
        );
        
        if(response){
            if(response.status === "success"){
                alert("저장되었습니다.");
                navi("/board");
            } else if(response.msg) {
                alert(response.msg);
            }
        }
    }

    const handleData = async () => {
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
            } else if (response.msg) {
                alert(response.msg);
                navi("/");
            }
        }
    }

    const goBack = () => {
        history.back();
    }

    useEffect(() => {
        if(seq){
            handleData();
        }
    }, []);

    return (
        <>
            <Loading loading={loading}/>
            <div className='pagetitle'>
                <h1>다이어리</h1>
                <br/>
                <nav>
                    <ol className='breadcrumb'>
                        <li className='breadcrumb-item'>NiceDiary</li>
                        <li className='breadcrumb-item active'>다이어리</li>
                    </ol>
                </nav>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <div className="card-body"><br/>
                                <Link className="card-title" to={'/board/' + seq} ><i className="bi bi-arrow-left"></i></Link><br/><br/>
                                    <div className="row mb-3">
                                        <label htmlFor="inputText" className="col-sm-2 col-form-label">제목<span style={{color:"red"}}>*</span></label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" maxLength={30} onChange={e => setTitle(e.target.value)} value={title}/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputDate" className="col-sm-2 col-form-label">예정일자<span style={{color:"red"}}>*</span></label>
                                        <div className="col-sm-10">
                                            <input type="date" className="form-control" onChange={e => setEventDate(e.target.value)} value={eventDate} />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputTime" className="col-sm-2 col-form-label">예정시간</label>
                                        <div className="col-sm-10">
                                            <input type="time" className="form-control" onChange={e => setEventTime(e.target.value)} value={eventTime}/>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label htmlFor="inputPassword"
                                               className="col-sm-2 col-form-label">내용<span style={{color:"red"}}>*</span></label>
                                        <div className="col-sm-10">
                                            <ReactQuill
                                                theme='snow'
                                                onChange={value => setContent(value)}
                                                value={content}
                                            />
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <label className="col-sm-2 col-form-label">타입<span style={{color:"red"}}>*</span></label>
                                        <div className="col-sm-10">
                                            <select className="form-select" aria-label="Default select example" onChange={e => setEventType(e.target.value)} value={eventType}>
                                                <option value="">선택</option>
                                                <option value="개인">개인</option>
                                                <option value="업무">업무</option>
                                                <option value="계획">계획</option>
                                                <option value="특별한일">특별한일</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row mb-3" >
                                        <label className="col-sm-2 col-form-label"></label>
                                        <div className="col-sm-10">
                                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>저장하기</button>
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