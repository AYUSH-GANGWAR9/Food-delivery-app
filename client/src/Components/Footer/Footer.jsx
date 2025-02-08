import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'


const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>
            "At Tomato, we are passionate about delivering fresh and innovative solutions to meet your needs. Whether it’s [products/services offered], we are committed to quality and excellence that you can trust. Stay connected with us on social media or get in touch for personalized support. Explore more about Tomato, our mission, and our policies to ensure an exceptional experience every step of the way."
            </p>
            <div className="footer-social-icons">
                <img src= {assets.facebook_icon} alt="" />
                <img src= {assets.twitter_icon} alt="" />
                <img src= {assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Company</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>
                Get in Touch
            </h2>
            <ul>
                <li>+91 7017725026</li>
                <li>contact@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2024 @ Tomato.com - All right Reserved.</p>
    </div>
  )
}

export default Footer
