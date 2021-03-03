import type {Action} from '../actions/types';

var initialState = {
  isShowLoadingView: false,
  showLoginIdem : false, 
  callbackIdem : null
};


function appState(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'CHANGE_LOADING_VIEW':
          return {...state, isShowLoadingView: action.isShow};
        case 'ShowLoginIdem' : return {...state, showLoginIdem : true , callbackIdem : action.callback}
        case 'HideLoginIdem' : return {...state, showLoginIdem : false}
        default:
          return state;
      }
  }
  
  module.exports = appState;
  