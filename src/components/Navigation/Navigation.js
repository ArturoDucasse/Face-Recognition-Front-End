import React from 'react';

const Navigation = ({onChange, isSignIn}) => {
    return (isSignIn
        ?
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p
                    onClick ={() => onChange('signout')} 
                    className = 'f3 link dim black underline pa3 pointer'>Sign Out
                </p>
            </nav>
        :
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p
                    onClick ={() => onChange('signin')} 
                    className = 'f3 link dim black underline pa3 pointer'>Sign In
                </p>

                <p
                    onClick ={() => onChange('register')} 
                    className = 'f3 link dim black underline pa3 pointer'>Register
                </p>
            </nav>
    )
}

export default Navigation;