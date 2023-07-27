import React from "react"

export default function AddDataTypeTable(props:any){
    const {tableName, onEditClick, onDeleteClick} = props;
    return(
        <div className="table-row">		
            <div className="table-data">{tableName}</div>
            <div className="table-data">
                <ul className='d-flex'>
                <li onClick={onEditClick}>Edit</li>
                <li>&nbsp; | &nbsp;</li>
                <li onClick={onDeleteClick}>Delete</li>
                </ul>
            </div>
        </div>
    )
}