import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import './About.css'; // Import the CSS file for custom styles

function About() {
  const developers = [
    {
        name: 'Dezy Jha',
        role: 'Final Year Student',
        image: require('./dezy-removebg-preview.png'), // Use require for local images
        description: 'Siksha O Anusandhan University, Bhubaneswar'
      },
    {
      name: 'Debasish Giri',
      role: 'Final Year Student',
      image: require('./deba-removebg-preview.png'), // Use require for local images
      description: 'Siksha O Anusandhan University, Bhubaneswar'
    },
    {
      name: 'Suman Gochhayat',
      role: 'Final Year Student',
      image: require('./suma-removebg-preview.png'), // Use require for local images
      description: 'Siksha O Anusandhan University, Bhubaneswar'
    },
    {
      name: 'Soumya Sagar Rath',
      role: 'Final Year Student',
      image: require('./soumya-removebg-preview.png'), // Use require for local images
      description: 'Siksha O Anusandhan University, Bhubaneswar'
    },
    {
      name: 'Sachidananda Tripathy',
      role: 'Final Year Student',
      image: require('./sachiremovebg-preview.png'), // Use require for local images
      description: 'Siksha O Anusandhan University, Bhubaneswar'
    }
  ];

  // Duplicate the developers array to create a seamless loop
  const carouselItems = [...developers, ...developers, ...developers, ...developers, ...developers];

  return (
    <Container className="about-container">
      <div className="carousel">
        <div className="carousel-inner">
          {carouselItems.map((developer, index) => (
            <div key={index} className="carousel-item">
              <div className="developer-card">
                <img src={developer.image} alt={developer.name} />
                <h3>{developer.name}</h3>
                <p>{developer.role}</p>
                <p>{developer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="about-content">
        <Header as="h1" style={{ color: 'white' }}>About Us</Header>
        <p>Welcome to Galaxy Media, your go-to app for seamless media management and exploration. We aim to make accessing, organizing, and enjoying your favorite content simple and intuitive. With a user-friendly interface and high performance, Galaxy Media delivers a personalized media experience like no other.</p>
        <address>
          Our Address<br />
          Jagamara Bhubaneswar,<br />
          123 Innovation Street,<br />
          Odisha, India, 751030<br />
          Email: galaxymediaapp@gmail.com<br />
          Phone: +91 123 456 7890
        </address>
      </div>
    </Container>
  );
}

export default About;