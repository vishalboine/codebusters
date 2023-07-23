import {useState} from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { RiHome6Line, RiHome7Fill ,RiSettings5Line, RiSettings5Fill, RiAdminLine, RiAdminFill, RiLogoutCircleRLine, RiLogoutCircleRFill } from 'react-icons/ri';
import logo from '../../assets/images/logo.svg';
import {IconButton} from '@mui/material'
import Modal from '../Modal';

const Layout = () => {

  const {pathname} = useLocation();
  const [isLogoutModalOpen, setisLogoutModalOpen] = useState(false);
  const handleIsOpen = () => {
    setisLogoutModalOpen((prev:any) => !prev)
  }
    
  const navItems = [
    {
      key: 1,
      logo: <RiHome6Line size={26} />,
      activeLogo: <RiHome7Fill size={26} />,
      to: '/'
    },
    {
      key: 2,
      logo: <RiSettings5Line size={26} />,
      activeLogo: <RiSettings5Fill size={26} />,
      to: '/settings'
    },
    {
      key: 3,
      logo: <RiAdminLine size={26} />,
      activeLogo: <RiAdminFill size={26} />,
      to: '/admin'
    }
  ]

  return (
    <div className='dashboard'>
      <div className="leftPanel">
        <div className="head">
          <img src={logo} alt="" />
        </div>
        <div className="navItems">
          { navItems.map((item: any) => (
            <Link className={`navItem ${item.to === pathname ? 'active' : ''}`} to={item.to} key={item.key}>
              {item.to === pathname ? item. activeLogo : item.logo}
            </Link>
          ))}
          <IconButton onClick={handleIsOpen} className='navItem' aria-label="logout">
            <RiLogoutCircleRLine size={26} />
          </IconButton>
        </div>
      </div>
      <div className="rightPanel">
        <Outlet />
      </div>
      <Modal overlayClick={true} isOpen={isLogoutModalOpen} handleClose={handleIsOpen}>
        Logout now
      </Modal>
    </div>
  )
}

export default Layout