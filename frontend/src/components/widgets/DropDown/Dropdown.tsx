import { useState, useEffect, useRef } from 'react'
import Button from '../../ui-widgets/Button/Button';
import './dropdown.scss';
import { useOutsideClickHandler } from '../../../hooks/useOutsideClickHandler';

type Props = {
    list: string[],
    setSelectedItem: any,
    selectedItem: string,
    isDropDownOpen: boolean,
    setIsDropDownOpen: any
}

const Dropdown = (props: Props) => {
    const { list, selectedItem, setSelectedItem, isDropDownOpen, setIsDropDownOpen } = props;
    const listRef = useOutsideClickHandler(() => {
        isDropDownOpen ? setIsDropDownOpen(false) : null
    });
    useEffect(() => {
        if(list.length > 0) {
            setSelectedItem(list[0])
        }
    },[]);

  return (
    <div className='drop-down'>
        <div className='drop-down-toggle' onClick={() => setIsDropDownOpen(!isDropDownOpen)}>{selectedItem}</div>
        {
            isDropDownOpen && (
                <ul ref={listRef} className='dropdown-menu'>
                    {list.map((ele: string) => (
                        <li onClick={() => {
                            setSelectedItem(ele)
                            setIsDropDownOpen(false)
                        }}>{ele}</li>
                    ))}
                </ul>
            )
        }
    </div>
  )
}

export default Dropdown