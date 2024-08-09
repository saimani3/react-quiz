import React from 'react';
import './Home.css';  
import image1 from '../../assets/images/rrb.jpeg'

function Home() {
  const cards = [
    {
      id: 1,
      name: 'RRB Technician Gr III',
      image: image1,
      buttonText: 'Click To Start',
    },
    // {
    //   id: 2,
    //   name: 'Card 2',
    //   image: 'https://via.placeholder.com/150',
    //   buttonText: 'Learn More',
    // },
    // {
    //   id: 3,
    //   name: 'Card 3',
    //   image: 'https://via.placeholder.com/150',
    //   buttonText: 'Learn More',
    // },
  ];

 
  return (
    <div className="home">
      <h1>Welcome to the Quiz App</h1>
      <div className="card-container">
        {cards.map((card) => (
          <div className="card" key={card.id}>
            <img src={card.image} alt={card.name} className="card-image" />
            <h2 className="card-name">{card.name}</h2>
            <a href='/topics'><button className="card-button">{card.buttonText}</button></a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
