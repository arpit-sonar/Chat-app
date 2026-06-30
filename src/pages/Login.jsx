// const Login = ( /* input */) => { // function  ( component)
//     return ( // return this JSX(JS XML)  
//         <div> 
//             <h1>Login Page</h1>
//         </div>
//     )
// }

// export default Login; // make this component as module



import {useState} from 'react'


const Login = () => {
    // these are state variable to store user input
    // we have 2 objects having 2 entities
    const [email, setEmail] = useState('YOUREMAIL@GMAIL.COM')
    const [password , setPassword] = useState('SECRETPASSWORD')

    const handleSubmit = (e) => { // custom function of what to do when u click submit button 
        e.preventDefault();
        console.log('Form Submitted!')
        console.log('Email:', email)
        console.log('Password:', password)
    }

    return (
        <div style = { { padding : '40px', maxWidth: '400px', margin : '0 auto'}}>
            <h2> Welcome Back</h2>
            <p> Sign in to start chatting</p>

            <form onSubmit = {handleSubmit}> 
                <div style = {{ marginBottom : '15px'}}>
                    <label style = {{ display : 'block' , marginBottom :'5px'}}>Email Address</label>
                    <input 
                    type = "email"   
                    placeholder = "enter your email"
                    value = {email} // FORCES BOX TO ALWAYS SHOW WHATEVER IN THIS STATE VARIABLE
                    onChange = {(e) => setEmail(e.target.value)}
                    style = {{ width : '100%' , padding : '8px'}}
                    required // DONOT LET USER CLICK SUBMIT UNLESS THERE IS TEXT INSIDE BOX
                    />
                </div>
        
                <div style = {{marginBottom : '25px'}}>
                    <label style = {{display : 'block' , marginBottom : '5px'}}> Password </label>
                    <input 
                    type = "password"
                    placeholder = "........."
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    style = {{ width : '100%' , padding : '8px'}}
                    required
                    />
                </div>

                <button type = "submit" style = {{width : '100%' , padding: '10px', cursor :'pointer' }}>
                    Login
                </button>

            </form>

        </div>

    )
}


export default Login