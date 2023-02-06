import '../styles/login.css';
function Login(){
    return(
        <div className='login-container'>
        <div className="login-box">
            <form>
                <div class="user-box">
                <input required="" name="" type="text"/>
                <label>Username</label>
                </div>
                <div class="user-box">
                <input required="" name="" type="password"/>
                <label>Password</label>
                </div><center>
               <button className='btn'>
                Sign in
                </button></center>
            </form>
        </div>
        </div>
    )
}
export default Login;