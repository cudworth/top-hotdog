import './EntryForm.css';

function EntryForm(props) {
  const { isVisible } = props.state;
  return (
    <div className={isVisible ? 'EntryForm' : 'EntryForm-hidden'}>
      EntryForm
    </div>
  );
}

export default EntryForm;
