import React from 'react';

const Navigation = ({newPath, isSignIn}) => {
    return (isSignIn
        ?
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p
                    onClick ={() => newPath('signout')} 
                    className = 'br3 shadow-5 ba b--black-10 mv4 w-100 w-100-m w-25-l mw5 pv3 f3 mr3 pointer'>Sign Out
                </p>
            </nav>
        :
            <nav style= {{display: 'flex', justifyContent: 'flex-end'}}>
                <p
                    onClick ={() => newPath('home')} 
                    className = 'br3 shadow-5 ba b--black-10 mv4 w-100 w-100-m w-25-l mw5 pv3 f3 mr3 pointer'>
                    Sign-in<br></br>(without registration)
                </p>
            </nav>
    )
}

export default Navigation;