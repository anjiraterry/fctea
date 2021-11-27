 import { Link } from "react-router-dom";

 
      
 
 const BlogList = ({ blogs, title}) => {
      const blist = document.querySelector(".bl");
     console.log(blist);
     let bl = Object.keys( blogs ).length;

     const fuck = () =>{
       if(bl===0){
         blist.innerHTML = "No joy"       }
     }
      
     return (
       
     
         <div className="blog-list">
         <h2 className="title"> Articles </h2>  
         <div className ="bl">Sorry no Articles available at the moment</div>
          {blogs.map((blog) => (
        <div className="blog-preview" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
           <h2>{blog.title}</h2>
           <p>{blog.description}</p>
        </Link>
        </div>
      ))}
    
      </div>
     );
    
   
 }
   


 export default BlogList;