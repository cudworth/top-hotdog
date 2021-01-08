import './Scores.css';

function Scores(props) {
  const { isVisible } = props.state;
  const scores = props.scores;
  return (
    <div className={isVisible ? 'Scores' : 'Scores-hidden'}>
      <h2>Top Scores</h2>
      <div className="Scores-column-container">
        <div>
          <h3>Player</h3>
          {scores.map((score, index) => {
            return <p key={'high_score_' + index}>{score.user}</p>;
          })}
        </div>

        <div>
          <h3>Completion Time</h3>
          {scores.map((score, index) => {
            return <p key={'high_score_' + index}>{score.time}</p>;
          })}
        </div>
      </div>
      <input
        type="button"
        value="Return to Menu"
        onClick={(e) => {
          e.preventDefault();
          props.onClick();
        }}
      ></input>
    </div>
  );
}

export default Scores;
