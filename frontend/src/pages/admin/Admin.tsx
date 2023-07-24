import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import "./admin.scss";

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
          <Tab label="Update Column" {...a11yProps(0)} />
          <Tab label="Update Table" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
      Update Column
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div className="tableSec">
         Update Table
         <div className="table">
          <div className="table-header">
            <div className="header__item"><a id="tablename" className="filter__link" href="#">Table Name</a></div>
            <div className="header__item"><a id="wins" className="filter__link filter__link--number" href="#">Action</a></div>
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
      </div>
      </CustomTabPanel>
    </Box>
  );
}