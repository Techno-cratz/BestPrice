import React from 'react'
import { Component, useRef, useEffect } from "react";
import {Link} from 'react-router-dom';
import '../../App.css'
import HeroSection3 from '../HeroSection3'
import HeroSection4 from '../HeroSection4'
import './HeroSection.css'
import './HeroSection2.css'

import Footer from '../Footer'

function Home () {
    const ref = React.createRef();
 
      const handleClick = () =>
        ref.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
    return(
        <>
        <div className='hero-container'>
            <div class="logo"><i class="fas fa-hand-holding-usd logo-primary"></i></div>
            <h1>Best-Price</h1>
            <h2>____________</h2>
            <p>Spend Less, Save More!</p>
            <div className="hero-btns">
            {/*<img src={"./images/Geo.jpg"} />*/}
                {/*<Button className='btn' buttonStyle='btn--outline' buttonSize='btn--large'>
                Learn More</Button>*/}
                <button className = "btn" type="button" onClick={handleClick}>
            Learn More
          </button>
                </div>
        {/*<div className='check'>
        <h1>Heading for the section</h1>
    </div>*/}
            </div>
            <div ref={ref} className='hero-container2' >
            
            <h1>We've got what you need!</h1>
            <h2>_______</h2>
            <p>BestPrice is a web application which compares store prices to not only find the best deals, but also the best overall price you have to pay. It finds the cheapest store for your grocery needs!</p>
            </div>
        <HeroSection3 />
        </>

    )
}

export default Home;
