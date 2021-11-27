import {useState} from "react";
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar';
import Footer from './Footer';
const Create = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
     const [body, setBody] = useState('');
    const [author, setAuthor] = useState('username');
     const [isPending, setIsPending] = useState(false);
     const history = useHistory();
      let username ="terry";
      
     const handleSubmit = (e) => {
         e.preventDefault();
         const blog = { title, description, body, author};
         
         setIsPending(true);

         fetch('http://localhost:8000/blogs' ,{ method: 'POST', 
              headers: { "Content-Type": "application/json"}, 
              body: JSON.stringify(blog)
         }).then(() =>{
             setIsPending(false);
             history.push('/blog');
         })

         
     }


    return (  
     <div className="create-blog">
     <div className="nav-bar">
      <Navbar />
      </div>
   <div className="create">
     <h2>Add a New Blog</h2>

     <form onSubmit={handleSubmit}>
      <label>Blog title:</label>
      <input type="text" required value={title} 
      onChange={(e) => setTitle(e.target.value)}
      />

       <label>Blog description:</label>
      <input type="text" required value={description} 
      onChange={(e) => setDescription(e.target.value)}
      />

      <label>Blog body:</label>
      <textarea required
      value={body} 
      onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <label>Blog author:</label>
      <select
       value={author} 
      onChange={(e) => setAuthor(e.target.value)}
      >
      <option value="username">{username}</option>
      <option value="anonymous">anonymous</option>
      </select>
      { !isPending && <button>Add Blog</button>}
      { isPending && <button disabled >Adding Blog...</button>}
     </form>
     </div>
     <div><Footer/></div>
     </div>  
    );
}
 
export default Create;