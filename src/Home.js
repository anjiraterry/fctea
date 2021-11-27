
import {Link} from 'react-router-dom';
import img from './img/IMG_20210412_200317_824-removebg-preview.png';
import img1 from './img/Abuja-metropolis.jpg';
import img2a from  './img/169258591_2783460571968614_779909320267893886_n.jpg';
import img2b from   './img/dunes.jpg';
import img2c from  './img/160077326_1942732905895989_3442977912681147455_n.jpg';
import img2d from   './img/IMG_3430-768x1024.jpg';

import {useState, useEffect} from 'react';

const Home = () => {
      useEffect(() => {
      const lis = document.querySelectorAll(".intro li");
      const list = Array.from(lis);
      const section = document.querySelector('section');
     
      
      let i = 0;
      setInterval(() => {
           i++
          if(i==4){
            i=0
              
          }

 list[i].classList.remove("b")

 const nolist = list.filter((lists)=>
      lists != list[i]
 )
 nolist.forEach((nolis)=>{
     nolis.classList.add("b")
})
      }, 3000);
     

      const sectionChange = () =>{
           
      }
    section.addEventListener('click', e =>{
       const names = document.querySelectorAll('section .name')
         const namesArray = Array.from(names);
         const filternames = namesArray.filter((nm)=>
              nm != e.target
         )
          filternames.forEach((nm)=>{
              nm.parentElement.classList.remove('hide');
         })

   if (e.target.classList.contains('show') ){
      e.target.classList.add('hide');
   
  }
  if(e.target.classList.contains('name')){
      e.target.parentElement.classList.add('hide');
  }
 

})
      
        
        }, []); 
return (
        <div className='container'>
        <nav className="home">
        <div className="imgs"><img src={img1} className='img1'/> </div>
        <h1>THE <span>C<img src={img}/>PITAL</span></h1>
      
        <div className="links">
        <ul>
       <li><Link to="/">Home</Link></li>
        <li><Link to="/explore">Explore</Link></li>
         <li><Link to="/blog">Blog</Link></li>
    </ul>
      </div>
      </nav>
         <div className='intro'>
    <h2>Discover <ul><li className="a">places</li><li className="b">events</li><li className="b">people</li><li className="b">brands</li></ul><span>in Abuja</span></h2>
    <p><Link to="/explore">Explore</Link></p>
     </div>
     <div className='section'>
    <h2> Your guide to F the CT up!</h2>
     </div>
     <div className='section2'>
    <img src={img2a} className='img2'/> 
    <h2>ALMAT Farms</h2>
    
    <section>
    
    <a className="almat-farms show hide"><p className="name" >ALMAT Farms</p ></a>
    <a className="dunes show"><p className="name" >Dunes</p></a>
    <a className="junkyard show"><p className="name" >Junkyard Grills</p></a>
    <a  className="the-hive show"><p className="name">The Hive</p></a>

    
    </section>
     </div>
     <div className='section3'>
    <h2> Sign up / Sign in for Free</h2>
     </div>
     <footer>
     </footer>
     </div>

     );
}

export default Home;