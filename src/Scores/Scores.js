import { map } from 'lodash';
import './Scores.css';

function Scores(props) {
  const { isVisible, data } = props.state;
  console.log(data);
  return (
    <div className={isVisible ? 'Scores' : 'Scores-hidden'}>
      <div>Top Scores:</div>
      <div>Player</div>
      <div>Time</div>
      {data.map((score, index) => {
        return (
          <div key={'high_score_' + index}>
            <div>{score.user}</div>
            <div>{score.time}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Scores;
