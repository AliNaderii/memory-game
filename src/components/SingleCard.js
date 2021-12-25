// Styles
import './SingleCard.css';

export default function SingleCard({ card, handleChoice, disabled, flipped }) {
  const handleClick = () => {
    // Check if selecting cards is not disabled
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className='card'>
      <div className={ flipped ? 'flipped' : '' }>
        <img src={ card.src } alt="card" className='front' />
        <img src="/img/cover.png" alt="cover" className='back' onClick={ handleClick } />
      </div>
    </div>
  );
}
