
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
const Explore = () => {

    return ( 
        <div className="explore">
        <div className="nav-bar">
      <Navbar />
      </div>
         
        <div id="content">
          <Link to="/places" className="one"><div ><p>Places</p></div></Link>
          <Link to="/events"className="two"><div ><p>Events</p></div></Link>
           <Link to="/brands" className="three"><div ><p>Brands</p></div></Link>
           <Link to="/people" className="four"><div ><p>People</p></div></Link>
           <Link to="/tobi's choice" className="five"><div ><p>Tobi's Choice</p></div></Link>
          </div>
        <div><Footer/></div>
        </div>
     );
}
 
export default Explore;