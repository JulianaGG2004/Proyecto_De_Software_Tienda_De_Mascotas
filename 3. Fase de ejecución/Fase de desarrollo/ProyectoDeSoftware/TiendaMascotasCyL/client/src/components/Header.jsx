import React from 'react'
import logo from '../assets/logo.png'
import Search from './Search'
import {Link, useLocation} from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Header = () => {
    const [ isMobile ] = useMobile()
    const location = useLocation()

    const isSearchPage = location.pathname === "/search"
  return (
    <header className='h-24 lg:h-20 lg:shadow-md sticky top-0 flex flex-col  justify-center gap-1' style={{ backgroundColor: "#0098AA" }}>
        {
            !(isSearchPage && isMobile)&&(
                <div className='container mx-auto flex items-center px-2 justify-between'> 
                    {/**logo */}
                    <div className='h-full'>
                        <Link to={'/'} className='h-full felx justify-center items-center' >
                            <img
                            src={logo}
                            width={280}
                            height={60}
                            alt='logo'
                            className='hidden  lg:block'
                            />
                            <img
                            src={logo}
                            width={120}
                            height={60}
                            alt='logo'
                            className='lg:hidden'
                            />
                        </Link>
                    </div>
                    {/**Search */}
                    <div className='hidden lg:block'>
                        <Search/>
                    </div>
                    {/**login and my card */}
                    <div className=''>
                        <button className='text-neutral-100 lg:hidden'>
                            <FaUserCircle size={26}/>
                        </button>
                        <div className='hidden lg:block'>
                            Ingrear a mi carrito
                        </div>
                    </div>
                </div>
            )
        }
        <div className='container mx-auto px-2 lg:hidden'>
            <Search/>
        </div>
        </header>
  )
}

export default Header
