import React from 'react';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        let error = document.getElementById("error");
        this.setState({signInEmail: event.target.value})
        error.textContent = "";
    }

    onPasswrodChange = (event) => {
        let error = document.getElementById("error");
        this.setState({signInPassword: event.target.value})
        error.textContent = "";
    }

    onSubmitSignIn = () =>{
        let error = document.getElementById("error");
        fetch('https://secret-island-60464.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user=>{
            if(user.id){
                this.props.loadUser(user);
                this.props.newPath('home');
            }
            else{
                error.textContent = "Please enter a valid user";
                error.style.color = "red";
            }
        })
    }

    testerSignIn = () =>{
        fetch('https://secret-island-60464.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: "xxxxx",
                password: "xxxxx"
            })
        })
        .then(response => response.json())
        .then(user=>{
                this.props.loadUser(user);
                this.props.newPath('home');
        })
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
                    document.getElementById("inputSubmit").click();
                }
            })
        })
    }


    render(){
        const {newPath} = this.props;
        return (
        <article className="br3 shadow-5 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center">
            <main className="pa4 black-80 ">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 ">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100 " 
                                type="email"
                                name="input"  
                                id="email-address"
                                onChange = {this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password" 
                                name="input"  
                                id="password"
                                onChange = {this.onPasswrodChange}
                             />
                        </div>
                        <span id="error"></span> 
                    </fieldset>
                    <div className="">
                        <input
                            onClick = {this.onSubmitSignIn} 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            id = "inputSubmit"
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p 
                            onClick= {() => newPath('register')}
                            className="f6 link dim black db pointer">Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
        );
    }
}

export default SignIn;