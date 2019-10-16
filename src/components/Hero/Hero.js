import React from 'react';
import './Hero.css';
import gif from '../../static/images/farmer.png'

function Hero()
{
    return(
        <section className="hero">
            <div className="hero-text">
                <h2>The Effortless</h2>
                <h2>Blockhain</h2>
                <h2>Supply Chain Platform</h2>
                <p className="hero-para">Agro is the easiest and safest way to buy, sell crops online.
                   Discover new ways to monetize and scale your business online with Agro.</p>
                <a href="#"><button className="cta">Get Started</button></a>
            </div>

            <div className="hero-img">
                <img src={gif} />
            </div>
        </section>
    )
}

export default Hero;