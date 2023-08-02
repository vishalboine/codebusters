import React, {useState,useEffect} from 'react';
import CustomTabPanel from '../../components/layouts/CustomTabPanel';
import { Box, Tab, Tabs } from '@mui/material';

const Profile = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Add Table" {...a11yProps(0)} />
          <Tab label="Update Table" {...a11yProps(1)} />
          <Tab label="Column Validation" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel index={0} value ={value}>
          <h1>Profile</h1>
      </CustomTabPanel>
      <CustomTabPanel index={1} value ={value}>
          <h1>Add</h1>
      </CustomTabPanel>
    </div>
  )
}

export default Profile