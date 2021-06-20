import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './HeroSection3.css'

function HeroSection3() {
    return (
        <div className='hero-container3'>
            
            <h1>How it works?</h1>
            <p></p>
            <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"> <i class="fas fa-list-ul text-primary"></i></div>
                            <h3 class="h4 mb-2">Create</h3>
                            <p class="text-muted mb-0">Start your shopping list by adding items anywhere, anytime.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="fas fa-greater-than text-primary"></i></div>
                            <h3 class="h4 mb-2">Compare</h3>
                            <p class="text-muted mb-0">Compare the prices for your shopping list across multiple stores.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="fas fa-tag text-primary"></i></div>
                            <h3 class="h4 mb-2">Best-Price</h3>
                            <p class="text-muted mb-0">Get the Best Price for your shopping List. View the breakdown for specific items!</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="fas fa-shopping-cart text-primary"></i></div>
                            <h3 class="h4 mb-2">Shop</h3>
                            <p class="text-muted mb-0">Congrats! You have the Best Price. Enjoy Shopping while you save :)</p>
                        </div>
                    </div>
                </div>
                <div class="row gx-4 gx-lg-5 pad">
                    <Link to='/about' className='text-center mt-0 btn btn-primary color-btn btn-xl'>
                    Get Started!
                        </Link>
                </div>
        </div>
    )
}

export default HeroSection3
