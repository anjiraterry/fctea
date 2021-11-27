import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const Errors = () => {
    return ( 
        
        <div className="errors">
        <div className="nav-bar">
         <Navbar />
         </div>
        <h2>Sorry</h2>
        <p>That page cannot be found</p>
        <Link to="/">Back to the homepage...</Link>
        <div><Footer/></div>
        </div>
     );
}
 
export default Errors;