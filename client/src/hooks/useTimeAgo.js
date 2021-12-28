import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'timeago.js';

const useTimeAgo = (datetime) => {
  const [timeAgo, setTimeAgo] = useState(format(datetime));

  useEffect(() => {
    const timeAgoInterval = setInterval(() => {
      setTimeAgo(format(datetime));
    }, 100);

    return () => clearInterval(timeAgoInterval);
  }, [datetime]);

  return timeAgo;
};

useTimeAgo.propTypes = {
  datetime: PropTypes.string.isRequired,
};

export default useTimeAgo;
