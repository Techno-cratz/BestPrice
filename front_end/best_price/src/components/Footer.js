import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
    return (
        <div className='footer-container'>
            {/*<section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                Let me know what do you think? </p>
                <p className='footer-subscription-text'>
                    Feel free to contact. </p>
                <div className='input-areas'>
                    <form>
                        <input type='email' name='email' placeholder='Your Email' className='footer-input'/>
                        <Button buttonStyle='btn--outline'>Contact Me</Button>

                    </form>
            </div>
            </section>*/}
            <div className='footer-links'>
               {/* <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it Works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it Works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    
            </div>
            <div className='footer-link-wrapper'>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it Works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    <div className='footer-link-items'>
                        <h2>About Us</h2>
                        <Link to='/sign-up'>How it Works</Link>
                        <Link to='/'>Testimonials</Link>
                        <Link to='/'>Careers</Link>
                        <Link to='/'>Investors</Link>
                        <Link to='/'>Terms of Service</Link>
                    </div>
                    
    </div>*/}
            </div>
            <section className='social-media'>
                <div className='social-media-wrap'>
                   {/* <div className='footer-logo'>
                        <Link to='/' className='social-logo'>
                         Vardan Saini
</Link>
                    </div>*/}
                    <small className='website-rights'>Vardan Saini © 2021</small>
                    <div className='social-icons'>
                        <Link className='social-icon-link facebook'
                        to="/"
                        target="_blank"
                        aria-label='facebook'>
                            <i className='fab fa-facebook-f' />
                        </Link>
                        <Link className='social-icon-link youtube'
                        to="/"
                        target="_blank"
                        aria-label='youtube'>
                            <i className='fab fa-youtube' />
                        </Link>
                        <Link className='social-icon-link instagram'
                        to="/"
                        target="_blank"
                        aria-label='instagram'>
                            <i className='fab fa-instagram' />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Footer
