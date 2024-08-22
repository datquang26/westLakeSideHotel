import React, {useEffect, useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import logo from '../../assets/images/The-Hanoi-Club-Logo_Center.png';
import '../../index.css';


const Footer = () => {
    const [showScrollUp, setShowScrollUp] = useState(false);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollUp(true);
      } else {
        setShowScrollUp(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    return (
      <footer className="footer text-light py-4" style={{
        // position: "absolute",
        bottom: "0",
        width: "100%"
    }}>
        <Container>
          <Row>
            <Col xs={12} md={3}>
              <img src={logo} alt="The Hanoi Club Logo" className="img-fluid" style={{width: '270px', height: '135px'}} />
            </Col>
            <Col xs={12} md={3} className=" pl-5">
              <h5 style={{marginLeft: '50px'}}>CONTACT US</h5>
              <p style={{marginLeft: '50px'}}>Tel: (024) 3823 4567</p>
              <div className="social-icons" style={{marginLeft: '50px'}}>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hotel-color p-1">
                  <FaFacebook style={{width: '30px', height: '30px'}} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hotel-color p-1">
                  <FaInstagram style={{width: '30px', height: '30px'}} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hotel-color p-1">
                  <FaTwitter style={{width: '30px', height: '30px'}} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="hotel-color p-1">
                  <FaYoutube style={{width: '30px', height: '30px'}} />
                </a>
              </div>
            </Col>
            <Col xs={12} md={3} className=" pr-5">
              <h5>NEWSLETTER</h5>
              <form>
                <h6>Email</h6>
                <p>
                  <input style={{width: '270px', height: '39px', backgroundColor: '#181A2D', boxShadow: 'none', border: '1px solid #dddddd'}} type="email" />
                </p>
                <p>
                  <button style={{marginLeft: '180px', backgroundColor: '#AB6C2D', color: 'white', border: 'none', width: '79px', height: '33px'}} type="submit">Submit</button>
                </p>
              </form>
            </Col>
            <Col xs={12} md={3} className="">
            <h5>USEFULINK</h5>
              <form>
                <h6>Safety & Security</h6>
                <h6>Site map</h6>
              </form>
            </Col>
          </Row>
          <button 
            className={`scroll-up ${showScrollUp ? 'show' : ''}`} 
            onClick={scrollToTop}
          >
            ↑
          </button>
        </Container>
      </footer>
    );
  };

export default Footer