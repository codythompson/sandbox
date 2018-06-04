import { create } from "domain";

export const ADD_BOX = 'ADD_BOX';
export const TOGGLE_BOX = 'TOGGLE_BOX';
export const CHANGE_BOX_COLOR = 'CHANGE_BOX_COLOR';

function createAction (type, payload) {
  return {
    type,
    payload
  }
};

export function addBox (color, visible=true) {
  return createAction(ADD_BOX, {color, visible});
};
export function toggleBox (index) {
  return createAction(TOGGLE_BOX, {index});
};
export function changeBoxColor (index, color) {
  return createAction(CHANGE_BOX_COLOR, {index, color});
};