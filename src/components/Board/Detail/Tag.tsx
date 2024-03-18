
interface Props {
    tag: string

}

export const Tag = ({tag}: Props) => {
    return(
        <>
            {tag === '개인' && <span className="badge bg-primary">개인</span> }
            {tag === '계획' && <span className="badge bg-success">계획</span> }
            {tag === '업무' && <span className="badge bg-info">업무</span> }
            {tag === '특별한일' && <span className="badge bg-warning text-dark">특별한일</span> }
        </>
    );
}