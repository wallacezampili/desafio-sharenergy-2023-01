import {Link} from 'react-router-dom';
import {BsList} from 'react-icons/bs';
import { useState, useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import './navbar.css';


function Navbar() {

    var [menuStatus,setMenu] = useState("nav_menu close");
    const context = useContext(AuthContext);

    function showNav()
    {
        let e = () => {
            setMenu("nav_menu active close");
            setTimeout(() =>{ setMenu("nav_menu close")}, 400);
        }

        menuStatus === "nav_menu close" ? setMenu("nav_menu active open") : e();
       
    }

    return (
       <>
        
        {
            context?.authloading ? null : (
                
                context?.authenticated && (
                    <nav className='navbar'>
                   
                    <ul className={menuStatus}>
                        <li><Link to="/" className='nav_link' onClick={showNav}>RandomUsers</Link></li>
                        <li><Link to="/cats" className='nav_link' onClick={showNav}>HttpCat</Link></li>
                        <li><Link to="/dogs" className='nav_link' onClick={showNav}>RandomDogs</Link></li>
                        <li><Link to="/clients" className='nav_link' onClick={showNav}>Clients</Link></li>
                        <button onClick={context.loggout} className='loggout-btn'>Loggout</button>
                    </ul>
           
        
                    <div onClick={showNav} className='nav_toggler' >
                        <BsList />
                    </div>

                    
                </nav>
               )
            )
        }
       
       </>

        
    );
}

export default Navbar;