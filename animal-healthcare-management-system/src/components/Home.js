import '../styles/home.css'
import hero from '../assets/images/hero/hero.png'
function Home(){
    return(
        <div className='hero-section'>
        <div className="container col-xxl-8 px-1 py-5">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6 ">
            <img src={hero} className="d-block mx-lg-auto hero-img img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
          </div>
          <div className="col-lg-6">
            <h1 className="display-6 fw-bold lh-1 mb-3">
                ANIMAL HEALTHCARE MANAGEMENT SYSTEM 
            </h1>
            <p className="lead">Incididunt laborum minim elit pariatur officia velit irure nostrud ullamco voluptate in cupidatat sunt. Laboris laborum ea nulla veniam. Lorem dolore velit duis nostrud sint pariatur sunt esse labore laboris nulla nostrud sint consectetur. Commodo deserunt consectetur occaecat id. Nostrud qui est anim commodo quis et commodo consectetur commodo esse aliquip anim aute qui.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button type="button" className="btn btn-primary btn-lg px-4 me-md-2">Login</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    )
}
export default Home;