import {Link} from 'react-router-dom';
import cafe from './svg/local_cafe_white_24dp.svg';
import club from './svg/nightlife_white_24dp.svg'
import grills from './svg/outdoor_grill_white_24dp.svg';
import galleries from './svg/collections_white_24dp.svg';
import hotel from './svg/hotel_white_24dp.svg';
import mall from './svg/local_mall_white_24dp.svg';
import park from './svg/nature_people_white_24dp.svg';
import resort from './svg/terrain_white_24dp.svg'
import restaurant from './svg/restaurant_white_24dp.svg';
import others from './svg/attractions_white_24dp.svg';
import Navbar from './Navbar';
import Footer from './Footer';
import img1 from './img/171188049_3960598757296246_449499561725666016_n.jpg';
const Places = () => {
    return ( 
        <div className="places">
         <div className="nav-bar">
      <Navbar />
      </div>
        <div id="places-content">
          <Link to="/places/cafes" className="cafes"><div > <img src={ cafe }/> <p>Cafes</p></div></Link>
          <Link to="/places/clubs" className="clubs"><div > <img src={ club }/> <p>Clubs</p></div></Link>
          <Link to="/places/galleries" className="galleries"><div ><img src={ galleries}/><p>Galleries</p></div></Link>
           <Link to="/places/grills" className="grills"><div ><img src={ grills }/><p>Grills</p></div></Link>
          <Link to="/places/hotels" className="hotels"><div ><img src={ hotel}/><p>Hotels</p></div></Link>
          <Link to="/places/malls"  className="malls"><div><img src={ mall}/><p>Malls</p></div></Link>
          <Link to="/places/parks" className="parks"><div ><img src={ park }/><p>Parks</p></div></Link>
          <Link to="/places/resorts" className="resorts"><div > <img src={ resort }/> <p>Resorts</p></div></Link>
          <Link to="/places/restaurants" className="restaurant"><div ><img src={ restaurant }/><p>Restaurants</p></div></Link>
          <Link to="/places/other"  className="other"><div><img src={ others }/><p>Other</p></div></Link>
            </div>
            <div><Footer/></div>
            </div>
     );
}
 
export default Places;