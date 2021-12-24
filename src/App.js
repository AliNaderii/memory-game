// Tools
import { useState } from 'react';

// Styles
import './App.css';

const images = [
  { 'src': '/img/helmet-1.png' },
  { 'src': '/img/potion-1.png' },
  { 'src': '/img/ring-1.png' },
  { 'src': '/img/scroll-1.png' },
  { 'src': '/img/shield-1.png' },
  { 'src': '/img/sword-1.png' }
];

function App() {
  const [ cards, setCards ] = useState([]);

  const shuffleCards = () => {
    // For the game, we need 2 of each card, so we create an array that contains our original array twice
    const cardsDoubled = [ ...images, ...images ];
    // The cards need to be in random order and have a unique id
    const shuffled = cardsDoubled.sort(() => Math.random() - 0.5)
      .map(card => {
        return { ...card, id: Math.random() };
      });

    setCards(shuffled);
    console.log(shuffled);
  };

  return (
    <div className="App">
      <h1>MemoryGame</h1>
      <div className='container'>
        { cards.map(card => (
          <div key={ card.id }>
            <img src="/img/cover.png" alt="cover" className='back' />
            <img src={ card.src } alt="card" className='front' />
          </div>
        )) }
      </div>
      <button onClick={ shuffleCards }>New Game</button>
    </div>
  );
}

export default App;
