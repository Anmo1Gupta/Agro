import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';
import gif from '../../static/images/farmer.png'

function Hero()
{
    return(
        <section className="hero">
            <div className="hero-text">
                <h2>Agro is the Effortless Blockchain Supply Chain Platform</h2>
                <p className="hero-para">Agro is the easiest and safest way to buy, sell crops online.
                   Discover new ways to monetize and scale your business online with Agro.</p>
                <Link to="/crop_catalog"><button className="cta">Get Started</button></Link>
            </div>

            <div className="hero-img">
                <img src={gif} />
            </div>
        </section>
    )
}

export default Hero;