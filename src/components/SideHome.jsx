import React from 'react'
import Dashboard from './Dashboard';
import Transation from './Transation';
import Income from './Income';
import Expenes from './Expenes';

export default function SideHome({active, setActive}) {

        // //("active",active)
        
    const displayData = ( ) => {
        switch(active){
            case 1 : return <Dashboard/>;
            case 2 : return <Transation/>;
            case 3 : return <Income/>;
            case 4 : return <Expenes/>;
            default: return <Dashboard />
        }
    }

  return (
    <div className=' border-[5px] w-full max-w-[1200px] bg-[#F9E6CF] border-white shadow-2xl h-full lg:h-[80vh] relative  rounded-xl mx-[0px] xl:mx-[30px] lg:mx-[20px]  ' >
        {/* <h1>Home</h1> */}
        <div className='bg-' >
            {
                displayData()
            }
        </div>
    </div>  
  )
}
