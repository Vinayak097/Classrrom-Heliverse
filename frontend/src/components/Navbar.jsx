import React from 'react'
import { Link } from 'react-router-dom'
import { LuSchool } from "react-icons/lu";

function Navbar() {
  return (
    
        <div>
      
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          
            <LuSchool className="h-6 w-6" />
            <span>Classroom</span>
          
          <div className="flex items-center gap-4">
           
                
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">
                    <button className="   btn-outline border rounded-full">
                        <div className="avatar h-8 w-8 ">
                            <div className="mask mask-squircle w-24">
                            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                    </button>
                </div>
                
            </div>
          </div>
        </div>
      </div>        
    </div>

    
  )
}

export default Navbar