
export default function AddDataTypeTable(props:any){
    const {tableName, onEditClick, onDeleteClick, showValidation=false, handleValidationClick} = props;
    return(
        <div className="table-row">		
            <div className="table-data">{tableName}</div>
            <div className="table-data">
                <ul className='d-flex'>
                {!showValidation && <><li onClick={onEditClick}>Edit</li>
                <li>&nbsp; | &nbsp;</li>
                <li onClick={onDeleteClick}>Delete</li></>}
                {showValidation && <li onClick={handleValidationClick}>Add Validation</li>}
                </ul>
            </div>
        </div>
    )
}