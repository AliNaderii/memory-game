// Tools
import { useEffect, useState } from 'react';

// Styles & components
import SingleCard from './components/SingleCard';
import './App.css';

const images = [
  { 'src': '/img/helmet-1.png', matched: false },
  { 'src': '/img/potion-1.png', matched: false },
  { 'src': '/img/ring-1.png', matched: false },
  { 'src': '/img/scroll-1.png', matched: false },
  { 'src': '/img/shield-1.png', matched: false },
  { 'src': '/img/sword-1.png', matched: false }
];

function App() {
  const [ cards, setCards ] = useState([]);
  const [ choiceOne, setChoiceOne ] = useState(null);
  const [ choiceTwo, setChoiceTwo ] = useState(null);
  const [ disabled, setDisabled ] = useState(false);

  const shuffleCards = () => {
    // For the game, we need 2 of each card, so we create an array that contains our original array twice
    const shuffled = [ ...images, ...images ]
      // The cards need to be in random order and have a unique id
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffled);
    setDisabled(false);
  };

  // Handling choices
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset player choice
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Compare choices
  useEffect(() => {
    // If both choices were made
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      // If both choices were equal
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            else {
              return card;
            }
          });
        });
        resetTurn();
      }
      else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [ choiceOne, choiceTwo ]);

  // Start the game when the page firs loads
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>MemoryGame</h1>
      <div className='card-grid'>
        { cards.map(card => (
          <SingleCard
            card={ card }
            key={ card.id }
            handleChoice={ handleChoice }
            disabled={ disabled }
            flipped={ card === choiceOne || card === choiceTwo || card.matched }
          />
        )) }
      </div>
      <button onClick={ shuffleCards }>New Game</button>
    </div>
  );
}

export default App;
