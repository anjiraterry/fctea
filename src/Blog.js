
import BlogList from './BlogList';
import Navbar from './Navbar';
import Footer from './Footer';
import useFetch from './usefetch';
import {Link} from 'react-router-dom';




const Blog = () =>{
    const {data: blogs , isPending, error} = useFetch(' http://localhost:8000/blogs ');
    
    return ( 
      <div className="blogs">
       <div className="nav-bar">
      <Navbar />
      </div>
      <div className="blog">
      {error && <div>{error}</div>}
      { isPending && <div className="loading">Loading...</div>}
     {blogs && <BlogList blogs={blogs} title="All Blogs"/>} 
      <h2 className="add"><Link to="/create">+</Link></h2>
      </div>
      <div><Footer/></div>
      </div>
      
     );
}

export default Blog;
