import React, {useState,useEffect} from 'react';
import "./admin.scss";
import axiosInstance, { axiosPrivate } from '../../config/axiosInstance';
import { RiAddCircleFill } from "react-icons/ri";
import TextBoxWithRemove from '../../components/TextBoxWithRemove';
import { columnTypes } from '../../mock/data';
import AddDataTypeTable from '../../components/AddDataTypeTable';
import { toast } from 'react-toastify';
import { getUpdatedValues } from '../../utils/common';
import { FormControl, Select, MenuItem, Typography, Tab, Tabs, Box } from "@mui/material";
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import Modal from '../../components/Modal';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = useState(0);
  const [newTableName, setNewTableName] = useState('');
  const [savedTables, setSavedTables] = useState([]);
  const [savedFormat, setSavedFormat] = useState([]);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [selectedTable, setSelectedTable] = useState<{ name: string; value: string[]; }>({ name: "", value: ['','','',''] });
  const tables = getUpdatedValues(savedTables);
  const columnArr = Object.keys(tables)

  function groupObjectsByKey(objects) {
    const groupedObjects = {};
  
    objects.forEach((obj) => {
      delete obj['__v']
      delete obj['_id']
      groupedObjects[Object.keys(obj)[0]] = Object.values(obj)[0]
    });
  
    return groupedObjects;
  }
  
  const handleAddButtonClick = () => {
    const newItem = ""; // Set the default value for the new input field

    setSelectedTable(prevState => ({
      ...prevState,
      value: [...prevState.value, newItem],
    }));
  };

  const handleRemoveButtonClick = (indexToRemove: number) => {
    setSelectedTable(prevState => ({
      ...prevState,
      value: prevState.value.filter((_, index) => index !== indexToRemove),
    }));
  };

  useEffect(() => {
    axiosInstance.get('/table/getAllTables').then((res: any) => {
      setSavedTables(res.data)
    }).catch((err: any) => { })

  }, [])

  useEffect(() => {
    axiosInstance.get('/validations/getValidations').then((res: any) => {
      setSavedFormat(res.data)
    }).catch((err: any) => { })

  }, [])

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeTableName = (e: any) => {
    setNewTableName(e.target.value)
  }

  const handleValidationClick = (item: any) =>{
  setSelectedTable({
    name: item,
    value: tables[item]
  })
  setShowValidationForm(true);

  }

  const handleInputChange = (index: number, newValue: string) => {
    setSelectedTable(prevState => {
      const updatedValue = [...prevState.value];
      updatedValue[index] = newValue;
      return { ...prevState, value: updatedValue };
    });
  };

  const submitNewTable = () => {
    const data = {
      tableName: newTableName,
      columns: selectedTable.value
    }

    const isAllTableFilled = selectedTable.value.every((item) => item !== '')

    if(isAllTableFilled && newTableName !== '') {

      axiosPrivate.post('/table/addTable', data,{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }).then((res: any) => {
        setSavedTables(res.data)
        toast('Table saved successfully.', {
          type: 'success'
        });
        })
        .catch((err: any) => {
          console.log(err);
        })
        setNewTableName('')
        setSelectedTable({name: "", value: ['','','','']});
    } else {
      toast('Please fill all details.', {
        type: 'error'
      });
    }
    
  }

  const getDefaultValue = (obj, val) => {
    return obj[val]
  }

  const changeValidation = (col, tableName, val) => {
    
    const data = {
      tablename: tableName, columnname: col, val
    }
    axiosPrivate.post('/validations/updateValidations', data,{
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((res: any) => {
      setSavedFormat(res.data)
      toast('Validations updated successfully.', {
        type: 'success'
      });
      setShowValidationForm(false)
      setSelectedTable({
        name: '',
        value: []
      })
      })
      .catch((err: any) => {
        console.log(err);
        toast('Something went wrong', {
          type: 'error'
        });
      })
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Add Table" {...a11yProps(0)} />
        <Tab label="Update Table" {...a11yProps(1)} />
        <Tab label="Column Validation" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <div className="adminWrapper">
          <h4>Add Table</h4>
          <div className="addtable">
            <div className="formDiv">
              <div className="formGroup">
                <div className="inputTop">
                  <label htmlFor="Table Name">Table name</label>
                </div>
                <input placeholder='Enter table name' value={newTableName} onChange={handleChangeTableName} id="tableName" />
              </div>
              <div className="tableColumns">
                {selectedTable && selectedTable.value.map((item: any, index:number)=>  <TextBoxWithRemove key={index} i={index} handleRemoveButtonClick={handleRemoveButtonClick} item={item} handleInputChange={handleInputChange} />)}
              </div>
              <div className="addColumn">
                  <button onClick={handleAddButtonClick} className='btn btn-text'>
                    <RiAddCircleFill/>
                    <span>Add Column</span>
                  </button>
                </div>
              <div className="buttonDiv">
                <button className='btn btn-text' onClick={()=>{setNewTableName('');setSelectedTable({name: "", value: ['','','','']})}}>Reset</button>
                <button onClick={submitNewTable} className='btn btn-primary'>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <UpdateTable savedTables={savedTables} setSavedTables={setSavedTables} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="adminWrapper">
        <h4>Column Validation</h4>
          <div className="columnValidation">
          {showValidationForm && <div className="formDiv">
            <div className='tableName' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label>Table Name:</label>
              <p>{selectedTable.name}</p>
            </div>
            <div className="validTableColumns">
              {selectedTable && savedFormat && selectedTable.value.map((item)=>{
                return <>
                  <div className="validCol">
                    <label>{item}</label>
                    <FormControl sx={{ minWidth:226 }}>
                    <Select
                      onChange={(e)=>changeValidation(item, selectedTable.name, e.target.value)}
                      inputProps={{ 'aria-label': 'Without label' }}
                      defaultValue={getDefaultValue(groupObjectsByKey(savedFormat)[selectedTable.name], item)}
                    >
                      {/* this can be multiple inputs more then 10 */}
                      {
                        columnTypes?.map((ele: string, i: number) => (
                          <MenuItem value={ele}>{ele}</MenuItem>
                        ))
                      }
                    </Select>
                    </FormControl>
                  </div>
                </>
            })}
            </div>
            <div className="buttonDiv">
              <button className='btn btn-text' onClick={()=>{setShowValidationForm(false);}}>Cancel</button>
            </div>
          </div>}
          {!showValidationForm && (

          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
            {columnArr?.map((item:any)=>{
              return <AddDataTypeTable tableName={item} showValidation={true} handleValidationClick={() => handleValidationClick(item)}/>
            })}
            </div>	
          </div>
          )}
          </div>
      </div>
      </CustomTabPanel>
    </Box>
  );
}

type updateTableProps = {
  savedTables:any, 
  setSavedTables:any, 
}

const UpdateTable = ({
    savedTables,
    setSavedTables
  }: updateTableProps) => {

    
  const [showAmendForm, setAmendForm] = useState(false)
  const [selectedTable, setSelectedTable] = useState<{ name: string; value: string[]; }>({ name: "", value: [] });
  const [selectedInitialValue, setSelectedInitialValue] = useState<{ name: string; value: string[]; }>({ name: "", value: [] });
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  const [selectedTableId, setselectedTableId] = useState('')
  const handleIsOpen = () => {
    setisLogoutModalOpen((prev:any) => !prev)
  }

  const handleAddButtonClick = () => {
    const newItem = ""; // Set the default value for the new input field

    setSelectedTable(prevState => ({
      ...prevState,
      value: [...prevState.value, newItem],
    }));
  };

  const handleRemoveButtonClick = (indexToRemove: number) => {
    setSelectedTable(prevState => ({
      ...prevState,
      value: prevState.value.filter((_, index) => index !== indexToRemove),
    }));
  };
  
    const handleCancelClick = () =>{
      setAmendForm(false);
    }
    const handleReset = () =>{
      setSelectedTable(selectedInitialValue)
    }

    const handleSubmit = () => {
      const data = {
        tableName: selectedTable.name, updatedColumn: selectedTable.value
      }

      const isAllTableFilled = selectedTable.value.every((item) => item !== '')

      if(isAllTableFilled) {

        axiosPrivate.post('/table/updateTable', data,{
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }).then((res: any) => {
          setSavedTables(res.data)
          toast('Table Updated successfully.', {
            type: 'success'
          });
          })
          .catch((err: any) => {
            console.log(err);
          })
      } else {
        toast('Please fill all details.', {
          type: 'error'
        });
      }
      
    }

    const tables = getUpdatedValues(savedTables);
    const columnArr = Object.keys(tables)
    const handleEditClick = (item: any) =>{
      setSelectedTable({
        name: item,
        value: tables[item]
      })
      setSelectedInitialValue({
        name: item,
        value: tables[item]
      })
      setAmendForm(true)
    }
    const handleDeleteClick = () =>{
      axiosPrivate.post('/table/deleteTable', {
        tableName: selectedTableId
      },{
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      }).then((res: any) => {
        setSavedTables(res.data)
        toast('Table Updated successfully.', {
          type: 'success'
        });
        setisLogoutModalOpen(false)
        setselectedTableId('')
        })
        .catch((err: any) => {
          console.log(err);
        }) 
    }

    const handleInputChange = (index: number, newValue: string) => {
      setSelectedTable(prevState => {
        const updatedValue = [...prevState.value];
        updatedValue[index] = newValue;
        return { ...prevState, value: updatedValue };
      });
    };

    const openModal = (id) => {
      setselectedTableId  (id)
      setisLogoutModalOpen(true)
  }
  const closeModal = () => {
      setselectedTableId('')
      setisLogoutModalOpen(false)
  }
    
  return (
    <>
      <div className="adminWrapper">
        <h4>Update Table</h4>
        <div className="updateTable">
        {showAmendForm && selectedTable && <div className="formDiv">
              <div className='tableName' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label>Table Name:</label>
                <p>{selectedTable.name}</p>
              </div>
              <div className="tableColumns">
                {selectedTable.value.map((item: any, index:number)=>  <TextBoxWithRemove key={index} i={index} handleRemoveButtonClick={handleRemoveButtonClick} item={item} handleInputChange={handleInputChange} />)}
              </div>
              <div className="addColumn" onClick={handleAddButtonClick}>
                <button className='btn btn-text'>
                  <RiAddCircleFill/>
                  <span>Add Column</span>
                </button>
              </div>
              <div className="buttonDiv">
                <button className='btn btn-text' onClick={handleCancelClick}>Cancel</button>
                <button className='btn btn-text' onClick={handleReset}>Reset</button>
                <button className='btn btn-primary' onClick={handleSubmit}>Update</button>
              </div>
            </div>}
          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
            {columnArr.map((item:any)=>{
              return <AddDataTypeTable tableName={item} onDeleteClick={() => openModal(item)} onEditClick ={() => handleEditClick(item)}/>
            })}
            </div>	
          </div>
            
          </div>
          <Modal className="wd25" overlayClick={true} isOpen={isLogoutModalOpen} handleClose={handleIsOpen}>
            <div className="logoutWrapper">
              <h5>Are you sure you want to delete table?</h5>
              <p>After deleting the table, it cannot be recovered.</p>
              <div className="d-flex">
                <button onClick={closeModal} className='btn btn-text'>Cancel</button>
                <button onClick={handleDeleteClick} className='btn btn-danger'>Delete</button>
              </div>
            </div>
          </Modal>
      </div>
    </>
  )
}