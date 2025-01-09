import { Carousel, Typography, Button } from '@material-tailwind/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function CarouselSection() {
  const navigate = useNavigate();

  return (
    <Carousel className="h-28 lg:h-96" 
    transition={{duration: 0.7}} 
    autoplay={true}
    loop={true}
    prevArrow={({handlePrev})=>{

    }}
    nextArrow={({handleNext})=>{

    }}
    >
      <div className="relative h-28 lg:h-96 w-full">
        <img
          src={require('../../images/Home_of_electronic_copy.jpg')}
          alt="image 1"
          className="h-full w-full object-contain lg:object-cover"
        />
      </div>
      <div className="relative h-28 lg:h-96 w-full">
        <img
          src={require('../../images/Home_of_electronic_copy.jpg')}
          alt="image 2"
          className="h-full w-full object-contain lg:object-cover"
        />
      </div>
      <div className="relative h-28 lg:h-96 w-full">
        <img
          src={require('../../images/Home_of_electronic_copy.jpg')}
          alt="image 3"
          className="h-full w-full object-contain lg:object-cover"
        />
      </div>
    </Carousel>
  )
}

export default CarouselSection