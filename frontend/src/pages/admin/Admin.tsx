import React, {useState,useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./admin.scss";
import TextField from '@mui/material/TextField';
import axiosInstance, { axiosPrivate } from '../../config/axiosInstance';
import { RiAddCircleFill } from "react-icons/ri";
import TextBoxWithRemove from '../../components/TextBoxWithRemove';
import { columnTypes } from '../../mock/data';
import AddDataTypeTable from '../../components/AddDataTypeTable';
import { toast } from 'react-toastify';
import { getUpdatedValues } from '../../utils/common';
import { FormControl, Select, MenuItem } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Admin() {
  const [value, setValue] = useState(0);
  const [newTableName, setNewTableName] = useState('');
  const [newTableColumns, setNewTableColumns]: any = useState({});
  const [savedTables, setSavedTables] = useState([]);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [selectedTable, setSelectedTable] = useState<{ name: string; value: string[]; }>({ name: "", value: ['','','',''] });
  const tables = getUpdatedValues(savedTables);
  const columnArr = Object.keys(tables)

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
    
    axiosPrivate.post('/table/addTable', data,{
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((res: any) => {
      setNewTableColumns({})
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
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Table" {...a11yProps(0)} />
          <Tab label="Update Table" {...a11yProps(1)} />
          <Tab label="Column Validation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div className="adminWrapper">
          <h3>Add Table</h3>
          <div className="addtable">
            <div className="formDiv">
              <div className="formGroup">
                <div className="inputTop">
                  <label htmlFor="Table Name">Table name</label>
                </div>
                <input placeholder='Enter table name' value={newTableName} onChange={handleChangeTableName} id="tableName" />
              </div>
              <div className="tableColumns">
                {selectedTable.value.map((item: any, index:number)=>  <TextBoxWithRemove key={index} i={index} handleRemoveButtonClick={handleRemoveButtonClick} item={item} handleInputChange={handleInputChange} />)}
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
        <h3>Column Validation</h3>
          <div className="columnValidation">
          {showValidationForm && <div className="formDiv">
            <div className='tableName' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Typography component='h4'>Table Name:</Typography>
              <Typography sx={{
                fontSize: '24px'
              }} component='h2' variant='h2'>{selectedTable.name}</Typography>
            </div>
            <div className="validTableColumns">
              {selectedTable.value.map((item)=>{
                return <>
                  <div className="validCol">
                    <label>{item}</label>
                    <FormControl sx={{ minWidth:226 }}>
                    <Select
                      onChange={(e)=>{}}
                      inputProps={{ 'aria-label': 'Without label' }}
                      defaultValue={'int'}
                    >
                      {/* this can be multiple inputs more then 10 */}
                      {
                        columnTypes.map((ele: string, i: number) => (
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
              <button className='btn btn-primary' onClick={()=>{}}>Validate</button>
            </div>
          </div>}
          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
            {columnArr.map((item:any)=>{
              return <AddDataTypeTable tableName={item} showValidation={true} handleValidationClick={() => handleValidationClick(item)}/>
            })}
            </div>	
          </div>
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
    const handleDeleteClick = (item: any) =>{
      axiosPrivate.post('/table/deleteTable', {
        tableName: item
      },{
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
    }

    const handleInputChange = (index: number, newValue: string) => {
      setSelectedTable(prevState => {
        const updatedValue = [...prevState.value];
        updatedValue[index] = newValue;
        return { ...prevState, value: updatedValue };
      });
    };
    
  return (
    <>
      <div className="adminWrapper">
        <h3>Update Table</h3>
        <div className="updateTable">
        {showAmendForm && <div className="formDiv">
              <div className='tableName' style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label>Table Name:</label>
                <Typography sx={{
                  fontSize: '24px'
                }} component='h2' variant='h2'>{selectedTable.name}</Typography>
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
              return <AddDataTypeTable tableName={item} onDeleteClick={() => handleDeleteClick(item)} onEditClick ={() => handleEditClick(item)}/>
            })}
            </div>	
          </div>
            
          </div>
      </div>
    </>
  )
}