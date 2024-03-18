import Pagination from "react-js-pagination";
import {useNavigate} from "react-router-dom";

interface Props {
    currPage: number,
    total: number,
    pSize?: number,
    pKeyword?: string,
}

export const Paging = ({currPage, total, pSize=10, pKeyword=''}: Props) => {
    const navi = useNavigate();
    const goPage = (page: number) => {
        navi('/board?pPage=' + page + '&pSize=' + pSize + '&pKeyword=' + pKeyword);
    }
    return (
        <>
            <Pagination
                activePage={currPage === 0 ? 1 : currPage}
                itemsCountPerPage={10} // 한 페이지당 항목 수
                totalItemsCount={total} // 총 페이지 수
                pageRangeDisplayed={5} // 표시할 페이지 수
                onChange={goPage}
                itemClass="page-item"
                linkClass="page-link"
                prevPageText="이전"
                nextPageText="다음"
            />
        </>
    );
}