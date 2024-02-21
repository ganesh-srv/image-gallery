import react from 'react'
import './Carousel.css'
export default function Carousel ({img}){
    return (
        <img src={img} alt="" className='image-container' />
    );
}