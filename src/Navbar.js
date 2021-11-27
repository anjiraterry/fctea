//install extensinon simple react snippets\
import {Link} from 'react-router-dom';
import img from './img/IMG_20210412_200317_824-removebg-preview.png';
const Navbar = () => {
    
    return (
        <nav className="navbar">
        <h1>THE <span>C<img src={img}/>PITAL</span></h1>
        <div className="links">
        <ul>
       <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
         <li><Link to="/blog">Blog</Link></li>
        
        
        </ul>
        </div>
        </nav>
     );
}

export default Navbar;