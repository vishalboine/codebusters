import { useEffect, useState } from 'react'
import './users.scss'
import { Select, MenuItem, FormControl, Tab, Tabs } from '@mui/material'
import axiosInstance, { axiosPrivate } from '../../config/axiosInstance'
import { toast } from 'react-toastify'
import CustomTabPanel from '../../components/layouts/CustomTabPanel'

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [value, setValue] = useState(0);
    const [historyData, setHistoryData] = useState([])

    useEffect(() => {
        axiosInstance.get('/users/getAllUsers').then((res: any) => {
            setUsersData(res.data)
        }).catch((err: any) => { })
    }, [])

    useEffect(() => {
        axiosPrivate.get('/history').then((res: any) => {
            setHistoryData(res.data)
        }).catch((err: any) => { })

    }, [])

    const updateUserRole = (username: string, role: string) => {
        const data = {
            username,
            role,
        }
        axiosInstance.post('/users/updateUserRole', data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res: any) => {
            setUsersData(res.data)
            toast('User role updated', {
                type: 'success'
            });
        }).catch((err: any) => {
            toast('Error updating role', {
                type: 'error'
            });
        })
    }
    const handleDeleteUser = (id) => {
        axiosInstance.post('/users/deleteUser', { id }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res: any) => {
            setUsersData(res.data)
            toast('User deleted successfully.', {
                type: 'success'
            });
        }).catch((err: any) => {
            toast('Error updating role', {
                type: 'error'
            });
        })
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="User Manager" {...a11yProps(0)} />
                <Tab label="Users History" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <div className="UsersWrapper">
                    <h3>User Manager</h3>
                    <div className="table">
                        <div className="table-header">
                            <div className="header__item">Users</div>
                            <div className="header__item">Roles</div>
                            <div className="header__item">Action</div>
                        </div>
                        <div className="table-content">
                            {
                                usersData.map((item: any, i: number) => (
                                    <div className="table-row">
                                        <div className="table-data">{item.username}</div>
                                        <div className="table-data">
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <Select
                                                    onChange={(e) => updateUserRole(item.username, e.target.value)}
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                    defaultValue={item.role}>
                                                    <MenuItem value={'User'}>{'User'}</MenuItem>
                                                    <MenuItem value={'Admin'}>{'Admin'}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div onClick={() => handleDeleteUser(item._id)} className="table-data"><ul><li>Delete</li></ul></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
                <h4>Users History</h4>
                <div>
                    {
                        historyData.length > 0 ? (
                            historyData.map((item: any) => (
                                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span>{item.user}</span>
                                    <span>{item.tableName}</span>
                                    <span>{item.fileName}</span>
                                </div>
                            ))
                        ) : (<h3>No History Found</h3>)
                    }
                </div>
            </CustomTabPanel>
        </div>
    )
}

export default Users