import { connect } from 'react-redux';
import { selectTrack, newPlayQueue, togglePlay, setCurrentTrack } from './redux_config';

const mapStateToProps = state => ({
  state
});

const mapDispatchToProps = dispatch => ({
  selectTrack: (index) => dispatch(selectTrack(index)),
  newPlayQueue: (queue) => dispatch(newPlayQueue(queue)),
  togglePlay: () => dispatch(togglePlay()),
  setCurrentTrack: (index) => dispatch(setCurrentTrack(index))
});

const withRedux = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default withRedux;