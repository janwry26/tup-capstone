import '../styles/home.css'
import hero from '../assets/images/hero/hero.jpg'
import { Link } from 'react-router-dom';
function Home(){
    return(
        <div className='hero-section'>
        <div className="container col-xxl-8 px-1 py-5">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 ">
            <img src={hero} className="d-block mx-lg-auto hero-img img-fluid" alt="Bootstrap Themes" width="600" height="400" />
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold mb-3 ">
                ANIMAL HEALTHCARE MANAGEMENT SYSTEM 
            </h1>
            <p className="lead">Modern zoos and aquaria have a top priority of ensuring high standards of animal welfare to support and promote wildlife conservation. The study aims to develop a management system to monitor and help animals with health problems or injuries by providing medical care. The objective is to design a system for staff members to access animal records and monitor the animals' health status. The system will improve overall animal welfare and contribute to the goals of the organization.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start ">
              <Link to="/login">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}
export default Home;