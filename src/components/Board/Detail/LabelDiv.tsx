import {Tag} from "./Tag";


interface Props {
    label: string,
    content: string,
    type: string
}

export const LabelDiv = ({label, content, type}: Props) => {
    return (
        <>
            <div className="row">
                <div className="col-lg-3 col-md-4 label ">
                    {label}
                </div>
                <div className="col-lg-9 col-md-8">
                    {type === 'text' && content}
                    {type === 'tag' && <Tag tag={content} />}
                </div>
            </div>
        </>
    );
}