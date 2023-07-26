import React, {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./admin.scss";
import TextField from '@mui/material/TextField';
import { axiosPrivate } from '../../config/axiosInstance';
import { RiAddCircleFill,RiIndeterminateCircleFill } from "react-icons/ri";
import TextBoxWithRemove from '../../components/TextBoxWithRemove';
import { TableName } from '../../mock/data';
import AddDataTypeTable from '../../components/AddDataTypeTable';

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
  const [columnArr, setColumnArr]: any = useState([false, false, false, false])
  const [showAmendForm, setAmendForm] = useState(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeTableName = (e: any) => {
    setNewTableName(e.target.value)
  }

  const changeColumns = (e: any, index: number) => {
    setNewTableColumns((prev: any) => {
      return {...prev, [index]: e.target.value}
    })
  }

  const submitNewTable = () => {
    const data = {
      tableName: newTableName,
      columns: Object.values(newTableColumns)
    }
    
    axiosPrivate.post('/table/addTable', data,{
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        console.log(err);
      })
  }
  const handleAddColumn = () => {
    setColumnArr([...columnArr, true])
  }

  const handleEditClick = () =>{
    setAmendForm(true)
  }

  const handleCancelClick = () =>{
    setAmendForm(false);
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
        <div className="addTable">
          <h3>Add Table</h3>
          <div className="formDiv">
            <TextField onChange={handleChangeTableName} id="tableName" label="Table name" variant="outlined" />
            <div className="tableColumns">
              <TextField onChange={(e) => changeColumns(e,0)} id="tableName" label="Column 1" placeholder='Add column name' variant="outlined" />
              <TextField onChange={(e) => changeColumns(e,1)} id="tableName" label="Column 2" placeholder='Add column name' variant="outlined" />
              <TextField onChange={(e) => changeColumns(e,2)} id="tableName" label="Column 3" placeholder='Add column name' variant="outlined" />
              <TextField onChange={(e) => changeColumns(e,3)} id="tableName" label="Column 4" placeholder='Add column name' variant="outlined" />
            </div>
            <div className="addColumn">
                <button className='btn btn-outline'>
                  <RiAddCircleFill/>
                  <span>Add Column</span>
                </button>
              </div>
            <div className="buttonDiv">
              <button className='btn btn-text'>Reset</button>
              <button onClick={submitNewTable} className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <h3>Update Table</h3>
      <div className="updateTable">
          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
            {TableName.map((item:any)=>{
              return <AddDataTypeTable tableName={item} onEditClick ={handleEditClick}/>
            })}
            </div>	
          </div>
          {showAmendForm && <div className="formDiv">
            <TextField id="tableName" label="Table name" variant="outlined" />
            <div className="tableColumns">
              {columnArr.map((item: any)=>  <TextBoxWithRemove showRemove ={item}/>)}
            </div>
            <div className="addColumn">
              <button className='btn btn-outline'>
                <RiAddCircleFill/>
                <span onClick={handleAddColumn}>Add Column</span>
              </button>
            </div>
            <div className="buttonDiv">
              <button className='btn btn-text'>Reset</button>
              <button className='btn btn-text' onClick={handleCancelClick}>Cancel</button>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>}

      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="tableSec">
        <h3> Column Validation</h3>
          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
            {TableName.map((item:any)=>{
              return <AddDataTypeTable tableName={item}/>
            })}
            </div>	
          </div>
          <div className="updateTable">
            
          </div>
      </div>
      </CustomTabPanel>
    </Box>
  );
}