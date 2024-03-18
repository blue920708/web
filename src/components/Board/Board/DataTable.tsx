import {Tag} from "./Tag";
import {Link} from "react-router-dom";

interface Props {
    data: {
        seq: number;
        title: string;
        eventDate: string;
        eventTime: string;
        eventType: string;
        insdate: number[];
    }[];
}

export const DataTable = ({ data }: Props) => {
    return (
        <>
            <table className="table datatable">
                <colgroup>
                    <col width={"10%"} />
                    <col width={"50%"} />
                    <col width={"10%"} />
                    <col width={"10%"} />
                    <col width={"20%"} />
                </colgroup>
                <thead>
                    <tr>
                        <th>타입</th>
                        <th>제목</th>
                        <th>예정일자</th>
                        <th>예정시간</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td><Tag tag={item.eventType} /></td>
                        <td><Link to={`/board/${item.seq}`}>{item.title}</Link></td>
                        <td>{item.eventDate}</td>
                        <td>{item.eventTime}</td>
                        <td>{item.insdate}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}