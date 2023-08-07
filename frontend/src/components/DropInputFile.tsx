import { createRef, MouseEvent } from 'react'
import uploadImg from "../assets/images/upload-big.svg"

import './drop-file-input.scss';
 
const DropFileInput = ({onFileDrop}: any) => {

    const wrapperRef = createRef<HTMLDivElement>();

    const onDragEnter = () => wrapperRef.current && wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current && wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current && wrapperRef.current.classList.remove('dragover');
    const onDragDropAreaClick = (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={onDragDropAreaClick}
            >
                <div className="drop-file-input__label">
                    <img src={uploadImg} alt="" />
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
        </>
    );
}

export default DropFileInput;