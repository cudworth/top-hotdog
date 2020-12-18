import './Header.css';

function Header(props) {
  const greenStyle = { backgroundColor: 'lime' };
  const redStyle = { backgroundColor: 'orangered' };

  return (
    <div className="Header">
      <div style={greenStyle}>Hotdog!</div>
      <div style={redStyle}>Not hotdog!</div>
    </div>
  );
}

export default Header;
