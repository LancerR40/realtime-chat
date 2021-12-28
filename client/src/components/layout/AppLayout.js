import useCalculateHeight from '../../hooks/useCalculateHeight';
import PropTypes from 'prop-types';

const AppLayout = ({ children }) => {
  const screenHeight = useCalculateHeight();

  const classes = {
    height: screenHeight,
    display: 'flex',
    justifyContent: 'center',
  };

  return <div style={classes}>{children}</div>;
};

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AppLayout;
