import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
  return (
    <section className='bg-white'>
        <div className='pl-10 mx-auto p-3 grid lg:grid-cols-[250px,1fr]'>
             {/* menu izquierda */}
            <div className='py-4 sticky top-24 hidden lg:block'>
               <UserMenu/>

            </div>
            {/**contenido de la derecha */}
            <div className='bg-white p-4'>
                <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
