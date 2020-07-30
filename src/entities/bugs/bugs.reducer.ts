import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { IBugs, defaultValue as defaultBugs } from 'src/shared/model/bugs.model';
import { bugsUrl } from 'src/shared/reducers/api-urls';

export const ACTION_TYPES = {
  FETCH_BUGS_LIST: 'bugs/FETCH_BUGS_LIST',
  FETCH_BUG: 'bugs/FETCH_BUG',
  RESET: 'bugs/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBugs>,
  entity: defaultBugs
};

export type BugsState = Readonly<typeof initialState>;

export default (state: BugsState = initialState, action): BugsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUGS_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_BUG):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BUGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUG):
    case SUCCESS(ACTION_TYPES.FETCH_BUGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUG):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = bugsUrl;

// Actions

export const getEntities = () => {
  const localCopy = localStorage.getItem(bugsUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_BUGS_LIST),
    payload: {
      data: JSON.parse(localCopy)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_BUGS_LIST,
    payload: axios.get<IBugs>(apiUrl)
  };
};

export const getEntity = (bugId: number) => {
  const localCopy = localStorage.getItem(bugsUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_BUG),
    payload: {
      data: (JSON.parse(localCopy) as IBugs[]).find(b => b.id === bugId)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_BUG,
    payload: axios.get<IBugs>(`${apiUrl}/${bugId}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
