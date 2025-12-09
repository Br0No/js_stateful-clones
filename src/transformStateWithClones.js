'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let prevState = { ...state };
  const result = [];

  for (const action of actions) {
    const nextState = { ...prevState };

    if (action.type === 'addProperties') {
      Object.assign(nextState, action.extraData);
    }

    if (action.type === 'removeProperties') {
      for (const key of action.keysToRemove) {
        delete nextState[key];
      }
    }

    if (action.type === 'clear') {
      for (const key in nextState) {
        delete nextState[key];
      }
    }
    result.push(nextState);
    prevState = nextState;
  }

  return result;
}

module.exports = transformStateWithClones;
