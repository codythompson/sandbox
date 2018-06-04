import { combineReducers } from 'redux';

import {
  ADD_BOX,
  TOGGLE_BOX,
  CHANGE_BOX_COLOR
} from './actions';

const reducerMap = {
  [ADD_BOX]: (prevBoxes=[], payload) =>
    [...prevBoxes, {color: payload.color, visible: payload.visible}],
  [TOGGLE_BOX]: (prevBoxes=[], payload) =>
    prevBoxes.map((box, i) => {
      if (i === payload.index) {
        return {...box, visible: payload.visible}
      }
      return box;
    }),
  [CHANGE_BOX_COLOR]: (prevBoxes=[], payload) =>
    prevBoxes.map((box, i) => {
      if (i === payload.index) {
        let bx = {...box, color: payload.color};
        return bx;
      }
      return box;
    })
};

function boxes (state=[], action) {
  if (action.type in reducerMap) {
    return reducerMap[action.type](state, action.payload);
  } else {
    return [];
  }
}

const appState = combineReducers({
  boxes
});

export default appState;