import React from 'react'


import { Link, Route, Routes} from 'react-router-dom';
import UpdateUser from './UserDetail';
import ChangePasswords from './ChangePasswords';

export default function UserPage() {
  return (
<div className='container '>


    <div className=' w-50 flex  mt-3  border rounded-lg overflow-hidden '>
      <div className=' w-2/12  mr-3 border  '>
        <div className=' p-2 bg-white '>
        <ul className="p-0 flex flex-col ">
          <li className="relative">
            <Link className="p-4 flex justify-start items-center text-gray-500 no-underline cursor-pointer hover:text-black group" to="/user/">
              <span className="absolute w-2 h-8 bg-black rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition ease-in-out" />
              <i className="pr-3  fa-solid fa-user"></i>
              <span className="font-semibold">
              User Profile
              </span>
            </Link>
          </li>   
          <li className="relative">
            <Link className="p-4 flex justify-start items-center text-gray-500 no-underline cursor-pointer hover:text-black group" to="/user/security">
              <span className="absolute w-2 h-8 bg-black rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition ease-in-out" />
              <i className="pr-3  fa-solid fa-user"></i>
              <span className="font-semibold">
              Security
              </span>
            </Link>
          </li>  
        </ul>
        </div>
        
        


      </div>
      <div className=' w-7/12 '>
        <Routes>
       
          <Route path='/' element={<UpdateUser />} />
          <Route path='/security' element={<ChangePasswords />} />
        </Routes>
        
      </div>


    </div>
    </div>


  )
};