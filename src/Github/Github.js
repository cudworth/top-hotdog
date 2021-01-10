import './Github.css';
import githubIcon from './GitHub-Mark-32px.png';

function Github(props) {
  return (
    <a href="https://github.com/cudworth" className="Github">
      <span>
        <img alt="Github Icon" src={githubIcon}></img>
      </span>
      <span>Github</span>
    </a>
  );
}

export default Github;
