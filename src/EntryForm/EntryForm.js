import './EntryForm.css';

import { useState } from 'react';

function EntryForm(props) {
  const { isVisible, completionTime } = props.state;

  const [userName, setUsername] = useState('');

  return (
    <div className={isVisible ? 'EntryForm' : 'EntryForm-hidden'}>
      Completion time: {completionTime}
      <form>
        <label>
          Username
          <input
            type="text"
            value={userName}
            onChange={(e) => {
              setUsername((prev) => {
                const next = e.target.value;
                return next;
              });
            }}
          ></input>
        </label>
        <input
          type="button"
          value="Submit"
          onClick={(e) => props.onClick({ e, userName })}
        ></input>
      </form>
    </div>
  );
}

export default EntryForm;
