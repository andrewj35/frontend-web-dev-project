import "../styles/About.css";
export default function About() {
    // console.log(props["match"]["params"]["pageNumber"]);
    return (
      <div className= "About">
        <h1>
          About
          </h1>
        <div>
          <div className="info" width="800px">
          <p>
            Hello! Welcome to our Movie Dashboard Application. This Movie Dashbaord Application is developed by Andrew Wiles, Shashank Sekhar and Jaya Bhargavi Vengala. 
            <br/>
            We are students at Portland State University. 
            
            We created this project for our Front-end Course CS 410p/510 under Caterina Paun.
          </p>
          </div>
          <div className="description">
            <h3>
              Description
            </h3>
            <p>
            This Dashboard application gives information about all the Movies, Tv shows. 
            <br/>
            When you search a movie it gives information about the cast, description, Imdb rating, release date. 
            <br/>
            <center>
            <b>Motive:</b>Users can know all the information about the Movies, Tv shows
            </center>
            <br/>
                
            <center>
              <b>
                Main Stack Used: 
                </b>
                 HTML, CSS, JavaScript 
                </center>
            <br/>
            <center>
              <b>
                Libraries Used: 
                </b>
                 Charts.js, react-js-pagination
                </center> 
            <br/>
            <center>
              <b>
                APIs Used:
                </b>
                 The Movie Database, The Open Movie Database 
                </center>
            <br/>
            <center>
              <b>Frameworks Used:
              </b> 
               React, Bootstrap 
              </center>
            <br/>
          
            </p>
          </div>
        </div>
        
        
      </div>
    );
  }