import React from 'react';

class Register extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            registerName: ''
        }
    }
    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswrodChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }

    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    }

    onSubmitRegister = () =>{
        const error = document.getElementById("error");
        console.log(this.state.registerEmail, this.state.registerPassword, this.state.registerName)
        fetch('https://secret-island-60464.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
        .then(response => response.json())
        .then(user=>{
            if(user.name && user.password && user.email){
                this.props.loadUser(user);
                this.props.newPath('home');
            }
            else{
                error.textContent = "Please fill all ";
                error.style.color = "red";
            }
        }).catch(err=> console.log('Error submiting', err))
    }

     componentDidMount(){
        let inputs = document.getElementsByName("input");
        inputs.forEach(function(elem) 
        {
            elem.addEventListener("keyup", function(event) 
            {
                if (event.code === "Enter") 
                {
                    // Cancel the default action, if needed
                    event.preventDefault();
                    // Trigger the button element with a click
                    document.getElementById("registerSubmit").click();
                }
            })
        })
    }

    
    render(){
        const {newPath} = this.props;
        return (
        <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="user-name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="text"
                                name="input" 
                                id="user-name"
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email"
                                name="input"  
                                id="email-address"
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" 
                                name="input"
                                id="password"
                                onChange={this.onPasswrodChange}
                            />
                        </div>
                    <span id="error"></span> 
                    </fieldset>
                    <div>
                        <input
                            onClick = {this.onSubmitRegister} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            id = "registerSubmit"
                            value="Register"
                        />
                        <div className="lh-copy mt3">
                        <p 
                            onClick= {() => newPath('signin')}
                            className="f6 link dim black db pointer">Back
                        </p>
                    </div>
                    </div>
                </div>
            </main>
        </article> 
        );
    }
}

export default Register;