import React from 'react';
import Tilt from 'react-tilt'
import Robot from './Robots.png'

const Logo = () => {
    return (
        <div className= 'ma4 mt0' >
            <Tilt className="Tilt br2 shadow-3" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> 
                    <img 
                        style={{paddingTop: '30px'}} 
                        src={Robot} 
                        alt='Robot'>
                    </img> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;