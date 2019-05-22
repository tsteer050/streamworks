import { combineReducers, createStore } from 'redux';


const SELECT_TRACK = 'SELECT_TRACK';
const NEW_PLAY_QUEUE = 'NEW_PLAY_QUEUE';
const TOGGLE_PLAY = 'TOGGLE_PLAY';

export const selectTrack = (index) => ({
  type: SELECT_TRACK,
  selected: index
});

export const newPlayQueue = (queue) => ({
  type: NEW_PLAY_QUEUE,
  queue 
});

export const togglePlay = () => ({
  type: TOGGLE_PLAY
});


const playQueueReducer = (state = [], action) => {
  switch (action.type) {
    case NEW_PLAY_QUEUE:
      return action.queue;
    default:
      return state;
  }
};

const currentTrackReducer = (state = 0, action) => {
  switch (action.type) {
    case SELECT_TRACK:
      return action.selected;
    default:
      return state;
  }
};

const playingReducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_PLAY:
      return !state;
    default: 
      return state;
  }
};

const RootReducer = combineReducers({
  playQueue: playQueueReducer,
  currentTrack: currentTrackReducer,
  playing: playingReducer
});

const configureStore = () => (
  createStore(RootReducer)
);

export const store = configureStore();
window.getState = store.getState;
