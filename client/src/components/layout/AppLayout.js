import useCalculateHeight from '../../hooks/useCalculateHeight';

const AppLayout = ({ children }) => {
  const screenHeight = useCalculateHeight();

  const classes = {
    height: screenHeight,
    display: 'flex',
    justifyContent: 'center',
  };

  return <div style={classes}>{children}</div>;
};

export default AppLayout;
