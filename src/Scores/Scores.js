import './Scores.css';

function Scores(props) {
  const { isVisible } = props.state;
  return <div className={isVisible ? 'Scores' : 'Scores-hidden'}>Scores</div>;
}

export default Scores;
