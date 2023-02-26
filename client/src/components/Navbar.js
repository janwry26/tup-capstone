import { Component } from 'react'
import { MenuData } from './MenuData';
import logo from '../assets/images/logo/tup-logo.png';
import '../styles/navbar.css'
class Navbar extends Component {
    state = {clicked: false};
    handleClick = ()=>{
        this.setState({clicked:!this.state.clicked});
    };
    render(){
        const currentRoute = window.location.pathname; // Get current route
        const hideNavbar = 
        currentRoute === '/dashboard' ||
        currentRoute === '/dashboard/team' ||
        currentRoute === '/dashboard/contact' ||
        currentRoute === '/dashboard/invoices' ||
        currentRoute === '/dashboard/form' ||
        currentRoute === '/dashboard/faq' ||
        currentRoute === '/dashboard/line'  ; // Check if current route is dashboard
        if (hideNavbar) {
            return null; // Return null to hide the navbar
        }
        return(
         <nav className="navBarItems">
            <img className='logo' src={logo} />
            <div className='menu-icons' onClick={this.handleClick}>
                <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"} ></i>
            </div>
            <ul className={this.state.clicked? "nav-menu active" : "nav-menu" }>
                {MenuData.map((item,index)=>{
                    return (
                        <li key={index}>
                            <a href={item.url}
                            className={item.cName}
                            >   
                                <i className={item.icon}></i>
                               {item.title}
                            </a>
                        </li>  
                    )
                })}
               
                
            </ul>
         </nav>
        );
    }
}
export default Navbar;
