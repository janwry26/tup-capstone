import '../styles/home.css'
import hero from '../assets/images/hero/hero.jpg'
import { Link } from 'react-router-dom';
function Home(){
    return(
        <div className='hero-section'>
        <div className="container col-xxl-8 px-2 py-5">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 ">
            <img src={hero} className="d-block mx-lg-auto hero-img img-fluid" alt="Bootstrap Themes" width="600" height="400" />
          </div>
          <div className="col-lg-6 home-text-container">
            <h1 className="title fw-bold mb-2 ">
                ANIMAL HEALTHCARE MANAGEMENT SYSTEM 
            </h1>
            <p className="lead">Zoos and aquaria today focus on providing top-notch care for the animals under their care. They're working on a new management system to keep tabs on the animals' health, so they can quickly identify and treat any problems. The goal is to make sure the animals are healthy and happy, and to support the larger mission of conservation.</p>
            <div className="d-grid gap-3 d-md-flex justify-content-md-center home-button">
              <Link to="/login">
              <button type="button" className="btn btn2 btn-primary btn-lg">Login</button>
              </Link>
              <a href='mailto:janwryd@gmail.com'>
              <button type="button" className="btn btn1 btn-primary btn-lg">Contact Admin</button>
              </a>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}
export default Home;