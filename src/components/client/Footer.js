import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

function Footer() {

    const currentYear = new Date().getFullYear();
  return (
    <div className="mt-5 text-center p-5 text-xs bg-gray-100 border-t border-gray-300">   
        <div className='flex gap-1 justify-center items-center my-1'>
            <PhoneIcon sx={{fontSize:16}} />
            <span className=''>+254 117 074 301</span>
        </div>
        <div className='gap-1 justify-center items-center'>
            <LocationOnIcon sx={{fontSize:16}} /> REHEMA HSE 6TH FLOOR 01 - ALONG STANDARD STREET, NAIROBI 
        </div>
        <div className='mt-2'>© {currentYear} Copyright Electronics Den</div>
    </div>
  )
}

export default Footer
