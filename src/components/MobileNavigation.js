import React from 'react'
import { mobileNavigation } from '../contant/navigation'
import { NavLink } from 'react-router-dom'

const MobileNavigation = () => {
  return (
    <section className='fixed bottom-0 w-full bg-black z-60 lg:hidden h-14 bg-opacity-70 backdrop-blur-2xl'>
        <div className='flex items-center justify-between h-full text-neutral-400 '>
            {
                mobileNavigation.map((nav,index)=>{
                    return(
                        <NavLink
                            key={nav.label+"mobilenavigation"}
                            to={nav.href}
                            className={({isActive}) => isActive ? 'text-black-500' : 'text-white ${isActive && "text-black-700"}'}
                        >
                            <div>
                                {nav.icons}
                            </div>
                            <p>{nav.label}</p>
                        </NavLink>
                    )
                })
            }
        </div>
        </section>
  )
}

export default MobileNavigation