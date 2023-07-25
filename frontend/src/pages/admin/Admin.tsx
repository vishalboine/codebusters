import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./admin.scss";
import TextField from '@mui/material/TextField';
import { RiAddCircleFill,RiIndeterminateCircleFill } from "react-icons/ri";

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
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
            <TextField id="tableName" label="Table name" variant="outlined" />
            <div className="tableColumns">
              <TextField id="tableName" label="Column 1" placeholder='Add column name' variant="outlined" />
              <TextField id="tableName" label="Column 2" placeholder='Add column name' variant="outlined" />
              <TextField id="tableName" label="Column 3" placeholder='Add column name' variant="outlined" />
              <TextField id="tableName" label="Column 4" placeholder='Add column name' variant="outlined" />
            </div>
            <div className="addColumn">
                <button className='btn btn-outline'>
                  <RiAddCircleFill/>
                  <span>Add Column</span>
                </button>
              </div>
            <div className="buttonDiv">
              <button className='btn btn-text'>Reset</button>
              <button className='btn btn-primary'>Submit</button>
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
              <div className="table-row">		
                <div className="table-data">Balance Sheet</div>
                <div className="table-data">
                <ul className='d-flex'>
                  <li>Edit</li>
                  <li>&nbsp; | &nbsp;</li>
                  <li>Delete</li>
                </ul>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">Opening Balance</div>
                <div className="table-data">
                  <ul className='d-flex'>
                    <li>Edit</li>
                    <li>&nbsp; | &nbsp;</li>
                    <li>Delete</li>
                  </ul>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">Weekly Transction</div>
                <div className="table-data">
                  <ul className='d-flex'>
                    <li>Edit</li>
                    <li>&nbsp; | &nbsp;</li>
                    <li>Delete</li>
                  </ul>
                </div>
              </div>
            </div>	
          </div>
          <div className="formDiv">
            <TextField id="tableName" label="Table name" variant="outlined" />
            <div className="tableColumns">
              <div className="formGroup">
                <div className='inputTop'>
                  <label>Column 1</label>
                  <div className="rightIcon"><RiIndeterminateCircleFill/></div>
                </div>
                <input placeholder='Add column name'/>
              </div>
              <TextField id="tableName" label="Column 2" placeholder='Add column name' variant="outlined" />
              <TextField id="tableName" label="Column 3" placeholder='Add column name' variant="outlined" />
              <TextField id="tableName" label="Column 4" placeholder='Add column name' variant="outlined" />
            </div>
            <div className="addColumn">
              <button className='btn btn-outline'>
                <RiAddCircleFill/>
                <span>Add Column</span>
              </button>
            </div>
            <div className="buttonDiv">
              <button className='btn btn-text'>Reset</button>
              <button className='btn btn-primary'>Submit</button>
            </div>
          </div>

      </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div className="tableSec">
        <h3> Update Table</h3>
          <div className="table">
            <div className="table-header">
              <div className="header__item">Table Name</div>
              <div className="header__item">Action</div>
            </div>
            <div className="table-content">	
              <div className="table-row">		
                <div className="table-data">Balance Sheet</div>
                <div className="table-data">
                <ul className='d-flex'>
                  <li>Edit</li>
                  <li>&nbsp; | &nbsp;</li>
                  <li>Delete</li>
                </ul>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">Opening Balance</div>
                <div className="table-data">
                  <ul className='d-flex'>
                    <li>Edit</li>
                    <li>&nbsp; | &nbsp;</li>
                    <li>Delete</li>
                  </ul>
                </div>
              </div>
              <div className="table-row">
                <div className="table-data">Weekly Transction</div>
                <div className="table-data">
                  <ul className='d-flex'>
                    <li>Edit</li>
                    <li>&nbsp; | &nbsp;</li>
                    <li>Delete</li>
                  </ul>
                </div>
              </div>
            </div>	
          </div>
          <div className="updateTable">
            
          </div>
      </div>
      </CustomTabPanel>
    </Box>
  );
}