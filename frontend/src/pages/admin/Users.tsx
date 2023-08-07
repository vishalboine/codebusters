import { useEffect, useState } from 'react'
import './users.scss'
import { Select, MenuItem, FormControl, Tab, Tabs } from '@mui/material'
import axiosInstance, { axiosPrivate } from '../../config/axiosInstance'
import { toast } from 'react-toastify'
import CustomTabPanel from '../../components/layouts/CustomTabPanel'
import Modal from '../../components/Modal'

const Users = () => {
    const [usersData, setUsersData] = useState([]);
    const [value, setValue] = useState(0);
    const [historyData, setHistoryData] = useState([])
    const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('')
    const handleIsOpen = () => {
        setisLogoutModalOpen((prev:any) => !prev)
        setSelectedUser('')
    }

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
    const handleDeleteUser = () => {
        axiosInstance.post('/users/deleteUser', { id: selectedUser }, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }).then((res: any) => {
            setUsersData(res.data)
            toast('User deleted successfully.', {
                type: 'success'
            });
            setSelectedUser('')
            setisLogoutModalOpen(false)
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

    const openModal = (id) => {
        setSelectedUser(id)
        setisLogoutModalOpen(true)
    }
    const closeModal = () => {
        setSelectedUser('')
        setisLogoutModalOpen(false)
    }

    return (
        <div>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="User Manager" {...a11yProps(0)} />
                <Tab label="Activity" {...a11yProps(1)} />
            </Tabs>
            <CustomTabPanel index={0} value={value}>
                <div className="UsersWrapper logs">
                    <h4>User Manager</h4>
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
                                            <FormControl sx={{ width: 112, height: 40 }}>
                                                <Select
                                                onChange={(e) => updateUserRole(item.username, e.target.value)}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                                defaultValue={item.role}>
                                                <MenuItem value={'User'}>{'User'}</MenuItem>
                                                <MenuItem value={'Admin'}>{'Admin'}</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div onClick={() => {openModal(item._id)}} className="table-data"><ul><li>Delete</li></ul></div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </CustomTabPanel>
            <CustomTabPanel index={1} value={value}>
                <div className="UsersWrapper">
                    <h4>Activity Log</h4>
                    <div className='table' id="logs">
                        <div className="table-header">
                            <div className="header__item">Date & Time</div>
                            <div className="header__item">User</div>
                            <div className="header__item">Data Type</div>
                            <div className="header__item">Imported File</div>
                        </div>
                        <div className="table-content">
                            {
                            historyData.length > 0 ? (
                                historyData.map((item:any) => (
                                <div key={item._id} className='table-row'>
                                    <div className='table-data'>05/08/23 14:51</div>
                                    <div className='table-data'>{item.user}</div>
                                    <div className='table-data'>{item.tableName}</div>
                                    <div className='table-data'>{item.fileName}</div>
                                </div>
                                ))
                            ) : (<h6>No History Found</h6>)
                            }
                        </div>	
                    </div>
                </div>
            </CustomTabPanel>
            <Modal className="wd25" overlayClick={true} isOpen={isLogoutModalOpen} handleClose={handleIsOpen}>
                <div className="logoutWrapper">
                <h5>Are you sure you want to delete this user?</h5>
                <div className="d-flex">
                    <button onClick={closeModal} className='btn btn-text'>Cancel</button>
                    <button onClick={handleDeleteUser} className='btn btn-primary'>Delete</button>
                </div>
                </div>  
            </Modal>
        </div>
    )
}

export default Users