import * as React from 'react';
import { RiIndeterminateCircleFill } from 'react-icons/ri';

export default function TextBoxWithRemove(props: any) {
  const {showRemove} = props;

  const [showTextBox, setShowTextBox] = React.useState(true);
  const handleRemoveTextBox = () => {
    setShowTextBox(false)
  }
    return(
      <>
      {showTextBox && 
          <div className="formGroup">
            <div className='inputTop'>
              <label>Column</label>
              {showRemove && <div className="rightIcon" onClick={()=>{handleRemoveTextBox()}}><RiIndeterminateCircleFill/></div>}
            </div>
            <input placeholder='Add column name'/>
          </div>
      }
      </>
    )
}