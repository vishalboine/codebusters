import * as React from 'react';
import { RiIndeterminateCircleFill } from 'react-icons/ri';

export default function TextBoxWithRemove(props: any) {
  const {item, i , handleRemoveButtonClick, handleInputChange} = props;

    return(
      
          <div className="formGroup">
            <div className='inputTop'>
              <label>Column</label>
              {i > 3 && <div className="rightIcon" onClick={()=>{handleRemoveButtonClick(i)}}><RiIndeterminateCircleFill/></div>}
            </div>
            <input onChange={(e:any) => {
              handleInputChange(i,e.target.value)
            } } value={item} placeholder='Add column name'/>
          </div>
    )
}