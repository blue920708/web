import {useNavigate} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../../contexts/AuthContext";
import {useAxios} from "../../../hooks/UseAxios";
import {DataTable} from "../../../components/Board/Board/DataTable";
import Pagination from "react-js-pagination";
import {Loading} from "../../../components/Loading";

export const Board = () => {
    const navi = useNavigate();
    const {isAuthenticated, userToken} = useContext(AuthContext);
    const {sendRequest, loading} = useAxios();
    const [size, setSize] = useState<number>(10);
    const [page, setPage] = useState<number>(1);
    const [keyword, setKeyword] = useState<string>('');
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const [data, setData] = useState([]);
    const handleData = async () => {
        if(!isAuthenticated){
            alert("로그인이 필요합니다.");
            navi("/");
            return false;
        }

        saveStorage();
        const response = await sendRequest(
          "GET",
          "/board/list?size=" + size + "&page=" + page + "&keyword=" + keyword,
            null,
            {Authorization: 'Bearer ' + userToken.accessToken}
        );

        if(response){
            if(response.status === "success"){
                setData(response.data.dataList);
                setTotal(response.data.count);
            } else {
                alert(response.msg);
            }
        }
    }

    const saveStorage = () => {
        const boardSearch = {
            page: page,
            size: size,
            keyword: keyword
        }
        localStorage.setItem("boardSearch", JSON.stringify(boardSearch));
    }

    const goSearch = () => {
        setKeyword(keywordInput);
        setPage(1);
        setSize(10);
    }

    const goPage = (value: number) => {
        setPage(value);
    }

    useEffect(() => {
        const item = localStorage.getItem("boardSearch");
        if(item){
            const boardSearch = JSON.parse(item);
            setPage(boardSearch.page);
            setSize(boardSearch.size);
            setKeyword(boardSearch.keyword);
            setKeywordInput(boardSearch.keyword);
        }
    }, [])

    useEffect(() => {
        handleData();
    }, [keyword, page]);

    return (
        <>
            <Loading loading={loading} />
            <div className="pagetitle">
                <h1>다이어리</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">NiceDiary</li>
                        <li className="breadcrumb-item active">다이어리</li>
                    </ol>
                </nav>
            </div>
            <section className="section">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title"></h5>
                                <div className="datatable-top" >
                                    <div className="search-bar" style={{display: "-webkit-inline-box"}}>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="inputText"
                                            placeholder={'검색어를 입력하세요.'}
                                            maxLength={30}
                                            value={keywordInput}
                                            onChange={e => setKeywordInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if(e.key === 'Enter'){
                                                    goSearch();
                                                }
                                            }}
                                        />&nbsp;
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={goSearch}
                                        >검색</button>
                                    </div>
                                    <div>
                                        <button type="button" className="btn btn-primary" onClick={() => navi("/board/form")}>작성하기</button>
                                    </div>
                                </div>
                                <br/>
                                <DataTable data={data} />
                                <Pagination
                                    activePage={page}
                                    itemsCountPerPage={10} // 한 페이지당 항목 수
                                    totalItemsCount={total > 0 ? total : 1} // 총 페이지 수
                                    pageRangeDisplayed={5} // 표시할 페이지 수
                                    onChange={goPage}
                                    itemClass="page-item"
                                    linkClass="page-link"
                                    prevPageText="이전"
                                    nextPageText="다음"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}