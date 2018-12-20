import { FETCH_USER } from "../actions/types";

// puts the User model (payload) into state.auth
// auth is:
// null || false || User
// at any time!
export default function(state = null, action) {
  console.log(action);
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false; // payload is the User model. if payload is an empty string, return false (not logged in)
    default:
      return state;
  }
}
