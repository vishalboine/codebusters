import React from "react"

export default function AddDataTypeTable(props:any){
    const {tableName, onEditClick} = props;
    return(
        <div className="table-row">		
            <div className="table-data">{tableName}</div>
            <div className="table-data">
                <ul className='d-flex'>
                <li onClick={onEditClick}>Edit</li>
                <li>&nbsp; | &nbsp;</li>
                <li>Delete</li>
                </ul>
            </div>
        </div>
    )
}