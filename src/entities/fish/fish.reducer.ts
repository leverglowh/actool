import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { IFish, defaultValue as defaultFish } from 'src/shared/model/fish.model';
import { fishUrl } from 'src/shared/reducers/api-urls';

export const ACTION_TYPES = {
  FETCH_FISH_LIST: 'fish/FETCH_FISH_LIST',
  FETCH_FISH: 'fish/FETCH_FISH',
  RESET: 'fish/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFish>,
  entity: defaultFish
};

export type FishState = Readonly<typeof initialState>;

export default (state: FishState = initialState, action): FishState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FISH_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_FISH):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FISH_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FISH):
    case SUCCESS(ACTION_TYPES.FETCH_FISH_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FISH):
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

const apiUrl = fishUrl;

// Actions

export const getEntities = () => {
  const localCopy = localStorage.getItem(fishUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_FISH_LIST),
    payload: {
      data: JSON.parse(localCopy)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_FISH_LIST,
    payload: axios.get<IFish>(apiUrl)
  };
};

export const getEntity = (fishId: number) => {
  const localCopy = localStorage.getItem(fishUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_FISH),
    payload: {
      data: (JSON.parse(localCopy) as IFish[]).find(f => f.id === fishId)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_FISH,
    payload: axios.get<IFish>(`${apiUrl}/${fishId}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
