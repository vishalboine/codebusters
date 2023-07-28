import React, { useEffect, useState } from 'react'
import './users.scss'
import { Box, Select, MenuItem, FormControl } from '@mui/material'
import axiosInstance from '../../config/axiosInstance'
import { ROLES } from '../../constants'
import { toast } from 'react-toastify'

const Users = () => {
    const [usersData, setUsersData] = useState([])

    useEffect(() => {
        axiosInstance.get('/users/getAllUsers').then((res: any) => {
            setUsersData(res.data)
        }).catch((err: any) => { })
    },[])

    const updateUserRole = (username: string, role: string) => {
        const data = {
            username,
            role,
          }
          axiosInstance.post('/users/updateUserRole', data,{
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
    
    return (
        <Box>
            <h2>Users</h2>
            <div className="tableSec">
                <h3>Update User Roles</h3>
                <div className="table">
                    <div className="table-header">
                        <div className="header__item">Users</div>
                        <div className="header__item">Roles</div>
                    </div>
                    <div className="table-content">
                        {
                            usersData.map((item: any,i: number) => (
                                <div className="table-row">
                                    <div className="table-data">{item.username}</div>
                                    <div className="table-data">
                                    <FormControl sx={{ minWidth:120 }}>
                                        <Select
                                            onChange={(e) => updateUserRole(item.username, e.target.value)}
                                            inputProps={{ 'aria-label': 'Without label' }}
                                            defaultValue={item.role}>
                                                <MenuItem value={'User'}>{'User'}</MenuItem>
                                                <MenuItem value={'Admin'}>{'Admin'}</MenuItem>
                                        </Select>
                                        </FormControl>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default Users