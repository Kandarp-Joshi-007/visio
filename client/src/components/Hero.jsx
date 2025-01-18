import React from 'react';
import home from "../assets/images/hero-banner.png"
import chat from "./greentick.jpg"
import detect from "./detect.jpg"
import feature from "./feature.jpg"
import afford from "./aff.jpg"
import datasupport from "./security.jpg"
import suite from "./suite.jpg"
import analysis from "./analysis.jpg"
import secure from "./secure.jpg"
import logo from "./visio.png"

function Hero() {
  const HandleStartSession = () => {
    // Navigate to the homepage or any other desired page
    window.location.href = '/upload'; // Replace '/' with the URL of your homepage
  };
  return (
    <>
    <meta charSet="UTF-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>VisioBrain</title>
    {/* 
      - favicon
    */}
    <link rel="shortcut icon" href="./favicon.svg" type="image/svg+xml" />
    {/* 
      - custom css link
    */}
    <link rel="stylesheet" href="./assets/css/style.css" />
    {/* 
      - google font link
    */}
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700;900&display=swap"
      rel="stylesheet"
    />
    {/* 
      - preload image
    */}
    {/* 
      - #HEADER
    */}
    <header className="header" data-header="">
      <div className="container">
      <img style={{width:"70px"}} src={logo} />
        <h1>
          <a href="#" className="logo" style={{marginLeft:"-60px"}}>
            VisioBrain
          </a>
        </h1>
        <nav className="navbar container" data-navbar="">
          <ul className="navbar-list">
            <li className="navbar-item">
              <a href="#home" className="navbar-link" data-nav-link="">
                Home
              </a>
            </li>
            <li className="navbar-item">
              <a href="#services" className="navbar-link" data-nav-link="">
                Services
              </a>
            </li>
            <li className="navbar-item">
              <a href="#features" className="navbar-link" data-nav-link="">
                Features
              </a>
            </li>
            <li className="navbar-item">
              <a href="#about" className="navbar-link" data-nav-link="">
                About
              </a>
            </li>
           
          </ul>
        </nav>
        <button className="btn btn-secondary" onClick={HandleStartSession}>Start Session</button>
     
        <button
          className="nav-toggle-btn"
          aria-label="Toggle menu"
          data-nav-toggle-btn=""
        >
          <ion-icon name="menu-outline" className="menu-icon" />
          <ion-icon name="close-outline" className="close-icon" />
        </button>
      </div>
    </header>
    <main>
      <article>
        {/* 
    - #HERO
  */}
        <section className="section hero" id="home">
          <div className="container">
            <figure className="hero-banner">
              <img
                src={home}
                width={804}
                height={643}
                loading="lazy"
                alt="hero banner"
                className="w-100"
              />
            </figure>
            <div className="hero-content">
              <h2 className="h1 hero-title">
              Democratizing Data Analysis with OneClick Automation
              </h2>
              <p className="section-text">
              VisioBrain is a revolutionary one-click data analysis tool designed to empower
users of all skill levels to unlock the hidden potential within their data. Imagine
a platform that eliminates the need for complex coding or deep statistical
knowledge
              </p>
              <form action="" className="hero-form">
                <input
                  type="email"
                  name="email_address"
                  placeholder="Enter Your Email"
                  aria-label="Enter Your Email"
                  required=""
                  className="input-field"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
              <ul className="hero-list">
                <li className="hero-item">
                  <img
                    src={chat}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt="Checkmark icon"
                  />
                  <span className="span">Live Customization</span>
                </li>
                <li className="hero-item">
                  <img
                    src={chat}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt="Checkmark icon"
                  />
                  <span className="span">Pre-built Powerhouse</span>
                </li>
                <li className="hero-item">
                  <img
                    src={chat}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt="Checkmark icon"
                  />
                  <span className="span">Automated Operations</span>
                </li>
                <li className="hero-item">
                  <img
                    src={chat}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt="Checkmark icon"
                  />
                  <span className="span">Constant Evalution</span>
                </li>
                <li className="hero-item">
                  <img
                    src={chat}
                    width={16}
                    height={16}
                    loading="lazy"
                    alt="Checkmark icon"
                  />
                  <span className="span">Secure</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
        {/* 
    - #SERVICE
  */}
        <section className="section service" id="services">
          <div className="container">
            <h2 className="h2 section-title">Our Solutions For You</h2><br />
            <ul className="service-list">
              <li>
                <div className="service-card">
                  <figure className="card-banner">
                    <img
                      src={datasupport}
                      width={728}
                      height={344}
                      loading="lazy"
                      alt="support"
                      className="w-100"
                    />
                  </figure>
                  <div className="card-content">
                    <h3 className="h3">
                      <a href="#" className="card-title">
                      Universal Data Support
                      </a>
                    </h3>
                    <p className="card-text">
                    Unlike primarily spreadsheet-based tools like
Excel and Google Sheets, VisioBrain handles diverse data formats, from
audio and images to text.
                    </p>
                    <a href="#" className="btn-link">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="service-card">
                  <figure className="card-banner">
                    <img
                      src={suite}
                      width={728}
                      height={44}
                      loading="lazy"
                      alt="Engagement"
                      className="w-100"
                    />
                  </figure>
                  <div className="card-content">
                    <h3 className="h3">
                      <a href="#" className="card-title">
                      Comprehensive Suite of Operations
                      </a>
                    </h3>
                    <p className="card-text">
                    VisioBrain goes beyond basic
 visualizations offered by spreadsheet tools, providing a
wide set for analysis like predictive modeling and
NLP.
      </p>
                    <a href="#" className="btn-link">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
              <li>
                <div className="service-card">
                  <figure className="card-banner">
                    <img
                      src={afford}
                      width={728}
                      height={344}
                      loading="lazy"
                      alt="Marketing"
                      className="w-100"
                    />
                  </figure>
                  <div className="card-content">
                    <h3 className="h3">
                      <a href="#" className="card-title">
                      Affordability
                      </a>
                    </h3>
                    <p className="card-text">
                    Unlike the potentially high licensing costs of other tools,
VisioBrain aims to provide cost-effective solutions for users of all
budgets with detailed anlaysis and security.
                    </p>
                    <a href="#" className="btn-link">
                      <ion-icon name="arrow-forward" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </section>
        {/* 
    - #FEATURES
  */}
        <section className="section features" id="features">
          <div className="container">
            <div className="features-content">
              <h2 className="h2 section-title">
                Our Awesome Features To Serve You
              </h2>
              <p className="section-text">
                Planning, tracking and delivering your team’s best work has never
                been easier. We make it easiest for you through the software.
              </p>
              <ul className="features-list">
                <li className="features-item">
                  <img
                    src={chat}
                    width={26}
                    height={26}
                    loading="lazy"
                    aria-hidden="true"
                    className="item-icon"
                  />
                  <h3 className="item-title">Ease of Use</h3>
                </li>
                <li className="features-item">
                  <img
                    src={chat}
                    width={26}
                    height={26}
                    loading="lazy"
                    aria-hidden="true"
                    className="item-icon"
                  />
                  <h3 className="item-title">Range of
Operations</h3>
                </li>
                <li className="features-item">
                  <img
                    src={chat}
                    width={26}
                    height={26}
                    loading="lazy"
                    aria-hidden="true"
                    className="item-icon"
                  />
                  <h3 className="item-title">Visualization</h3>
                </li>
                <li className="features-item">
                  <img
                    src={chat}
                    width={26}
                    height={26}
                    loading="lazy"
                    aria-hidden="true"
                    className="item-icon"
                  />
                  <h3 className="item-title">Customization</h3>
                </li>
              </ul>
            </div>
            <div className="banner-wrapper">
          
              
            </div>
          </div>
        </section>
        {/* 
    - #ABOUT
  */}
  <section className="section about" id="about">
      <div className="container">
        <h2 className="h2 section-title">What We Do</h2>
        <p className="section-text">
        VisioBrain aims to bridge this gap by offering a
revolutionary platform that automates data analysis tasks, making powerful
insights accessible to everyone.        </p>
        <ul className="about-list">
          <li>
            <div className="about-card about-card-1">
              <figure className="card-banner">
                <img
                  src={secure}
                  width={104}
                  height={94}
                  loading="lazy"
                  alt="Firebase Security"
                />
              </figure>
              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Firebase Security
                  </a>
                </h3>
                <p className="card-text">
                  Secure your applications with Firebase authentication, authorization rules, and data encryption.
                </p>
                <a href="#" className="btn-link">
                  <span className="span">Learn More</span>
                  <ion-icon name="arrow-forward" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="about-card about-card-2">
              <figure className="card-banner">
                <img
                  src={datasupport}
                  width={125}
                  height={94}
                  loading="lazy"
                  alt="Format Support"
                />
              </figure>
              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Format Support
                  </a>
                </h3>
                <p className="card-text">
                  Process various data formats seamlessly, including JSON, XML, CSV, and more, with our versatile format support.
                </p>
                <a href="#" className="btn-link">
                  <span className="span">Learn More</span>
                  <ion-icon name="arrow-forward" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="about-card about-card-3">
              <figure className="card-banner">
                <img
                  src={analysis}
                  width={108}
                  height={94}
                  loading="lazy"
                  alt="Real-time Analytics"
                />
              </figure>
              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Real-time Analytics
                  </a>
                </h3>
                <p className="card-text">
                  Gain insights into your data instantly with real-time analytics capabilities, enabling swift decision-making and responsiveness.
                </p>
                <a href="#" className="btn-link">
                  <span className="span">Learn More</span>
                  <ion-icon name="arrow-forward" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
          <li>
            <div className="about-card about-card-4">
              <figure className="card-banner">
                <img
                  src={detect}
                  width={104}
                  height={94}
                  loading="lazy"
                  alt="Anomaly Detection"
                />
              </figure>
              <div className="card-content">
                <h3 className="h3">
                  <a href="#" className="card-title">
                    Anomaly Detection
                  </a>
                </h3>
                <p className="card-text">
                  Identify abnormal patterns or behaviors in your data automatically, allowing for proactive intervention and risk mitigation.
                </p>
                <a href="#" className="btn-link">
                  <span className="span">Learn More</span>
                  <ion-icon name="arrow-forward" aria-hidden="true" />
                </a>
              </div>
            </div>
          </li>
          {/* Add more cards as needed */}
        </ul>
        <p className="section-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget gravida facilisis maecenas vitae.
          <a href="#" className="btn-link">
            <span className="span">View All Features</span>
            <ion-icon name="arrow-forward" aria-hidden="true" />
          </a>
        </p>
      </div>
    </section>
        {/* 
    - #STATS
  */}
   
 
      
        {/* 
    - #SUPPORT
  */}
        <section className="section support">
          <div className="container">
            <div className="support-content">
              <h2 className="h2 section-title">24/7 Customer Support</h2>
              <p className="section-text">
                Our team is here to provide you with personalized and outstanding
                service. We also offer a range of self-learning tools in our
                support center:
              </p>
            </div>
            <a href="#" className="btn btn-primary">
              Contact Us Now
            </a>
          </div>
        </section>
      </article>
    </main>
    {/* 
      - #FOOTER
    */}
    <footer className="footer">
    
      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © 2022 <span className="span">VisioBrain</span>. All rights reserved by{" "}
            <a href="#" className="copyright-link">
              VisioBrain
            </a>
          </p>
          <ul className="footer-bottom-list">
            <li>
              <a href="#" className="footer-bottom-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-bottom-link">
                Security
              </a>
            </li>
            <li>
              <a href="#" className="footer-bottom-link">
                Terms &amp; Conditions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
    {/* 
      - #BACK TO TOP
    */}
    <a
      href="#top"
      className="back-top-btn"
      aria-label="Back to top"
      data-back-top-btn=""
    >
      <ion-icon name="chevron-up" />
    </a>
    {/* 
      - custom js link
    */}
    {/* 
      - ionicon link
    */}
  </>
  
  );
}

export default Hero;
