import { Link, Outlet, useLocation } from 'react-router-dom';
import { RiDashboardLine, RiDashboardFill ,RiSettings5Line, RiSettings5Fill } from 'react-icons/ri';
import logo from '../../assets/images/logo.svg';

const Layout = () => {

  const {pathname} = useLocation();
  
  const navItems = [
    {
      key: 1,
      logo: <RiDashboardLine size={26} />,
      activeLogo: <RiDashboardFill />,
      to: '/'
    },
    {
      key: 2,
      logo: <RiSettings5Line size={26} />,
      activeLogo: <RiSettings5Fill />,
      to: '/settings'
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
              {item.logo}
            </Link>
          ))}
        </div>
      </div>
      <div className="rightPanel">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout