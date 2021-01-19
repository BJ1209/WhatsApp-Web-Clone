import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useStateValue } from '../Context/StateProvider';
import { timeFromNow } from '../utils/utils';
import './Message.css';

function Message({ name, message, timestamp, email }) {
  const colors = ['#128C7E', '#25D366', '#34B7F1'];
  const [{ user }] = useStateValue();
  const [num, setNum] = useState(0);

  useEffect(() => {
    setNum(Math.floor(Math.random() * colors.length));
  }, []);

  return (
    <div className={`message ${user?.email === email ? 'receiver' : ''}`}>
      <p className="message__name" style={{ color: colors[num] }}>
        {name}
      </p>
      <p>{message}</p>
      <p className="message__timestamp">{timeFromNow(timestamp)}</p>
    </div>
  );
}

export default Message;
