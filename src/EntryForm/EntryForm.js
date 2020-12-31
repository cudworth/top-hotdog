import './EntryForm.css';

function EntryForm(props) {
  const { isVisible, completionTime } = props.state;
  return (
    <div className={isVisible ? 'EntryForm' : 'EntryForm-hidden'}>
      Completion time: {completionTime}
    </div>
  );
}

export default EntryForm;
