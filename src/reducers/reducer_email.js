import { FETCH_EMAILDATA } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EMAILDATA:
      return [ action.payload.data ];
  }
  return state;
}
