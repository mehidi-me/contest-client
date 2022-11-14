import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Hero.css'

const Hero = () => {

    return (
        <>
        <div className='hero'>
            <div className='content'>
                <p>Call us</p>
                <p>Le grand concours</p>
                <p>ThéTipTop est là</p>
                <p>Tantes ta chance </p>
               <Link to="/signup"><button className='button' >Participer</button></Link> 
            </div>
        </div>
        </>
    )
}

export default Hero
