import { createStore } from "redux";
import CONFIG from './config';

const initialState = {
  title: CONFIG.TITLE,
  types: CONFIG.TYPES,
  items: CONFIG.ITEMS
};

function initStore(state = initialState, action) {
  if (action.type === "CHANGE_TITLE") {
    return {
      ...state,
      title: action.payload
    }
  }

  if (action.type === "SORT_ITEMS") {
    return {
      ...state,
      items: action.payload
    }
  }

  if (action.type === "ADD_ITEM") {
    return {
      ...state,
      items: [
        ...state.items,
        action.payload
      ]
    }
  }

  if (action.type === "REMOVE_ITEM") {
    return {
      ...state,
      items: [
        ...state.items.slice(0, action.payload),
        ...state.items.slice(action.payload + 1)
      ]
    }
  }

  if (action.type === "CLEAR") {
    return {
      ...state,
      title: initialState.title,
      items: initialState.items
    }
  }

  return state;
}

const persistedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : initialState;
const store = createStore(initStore, persistedState);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
