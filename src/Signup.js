import {useState} from "react";
import {useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Signup = () => {


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
    const [author, setAuthor] = useState('username');
     const [isPending, setIsPending] = useState(false);
     const history = useHistory();

     const handleSubmit = (e) => {
         e.preventDefault();
         const person = { username, email, password};
         setIsPending(true);

         fetch('http://localhost:3001/people' ,{ method: 'POST', 
              headers: { "Content-Type": "application/json"}, 
              body: JSON.stringify(person)
         }).then(() =>{
             setIsPending(false);
             history.push('/');
         })

         
     }


    return ( 
        <div className="signup">
        <div className="nav-bar">
      <Navbar />
      </div>
        <h2><Link to="/login">Login /</Link> Signup</h2>
         
         <form onSubmit={handleSubmit}>

      <label>Username</label>
      <input type="text" required value={username} 
      onChange={(e) => setUsername(e.target.value)}
      />

       <label>Email</label>
      <input type="email" required value={email} 
      onChange={(e) => setEmail(e.target.value)}
      />

      <label>Password</label>
     <input type="password" required value={password} 
      onChange={(e) => setPassword(e.target.value)}
      />
      { !isPending && <button>Sign up</button>}
      { isPending && <button disabled >Signing up...</button>}
     </form>
     <div><Footer/></div>
     </div>
     );

}

 
export default Signup;