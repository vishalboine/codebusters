import React, { useRef, useState } from 'react';
import uploadImg from "../assets/images/upload.svg"

import './drop-file-input.scss';
 
const DropFileInput = ({onFileDrop}: any) => {

    // const wrapperRef = useRef<HTMLElement>(null);
    const wrapperRef = React.createRef<HTMLDivElement>();

    const onDragEnter = () => wrapperRef.current && wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current && wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current && wrapperRef.current.classList.remove('dragover');
    const onDragDropAreaClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
    };

    // const onFileDrop = (e: any) => {
    //     const newFile = e.target.files[0];
    //     if (newFile) {
    //         setSelectedFile(newFile)
    //     }
    // }

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
                    <p>Drag & Drop your files here</p>
                </div>
                <input type="file" value="" onChange={onFileDrop}/>
            </div>
        </>
    );
}

export default DropFileInput;