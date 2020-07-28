import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { IFish, defaultValue as defaultFish } from 'src/shared/model/fish.model';
import { parseList } from 'src/shared/util/api-utils';

export const ACTION_TYPES = {
  FETCH_FISH_LIST: 'fish/FETCH_FISH_LIST',
  FETCH_FISH: 'fish/FETCH_FISH',
  RESET: 'fish/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFish>,
  entity: defaultFish,
  totalItems: 0
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
        entities: parseList(action.payload.data),
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
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

const apiUrl = 'http://acnhapi.com/v1/fish';

// Actions

export const getEntities = () => ({
  type: ACTION_TYPES.FETCH_FISH_LIST,
  payload: axios.get<IFish>(apiUrl)
});

export const getEntity = (fishId: number) => ({
  type: ACTION_TYPES.FETCH_FISH,
  payload: axios.get<IFish>(`${apiUrl}/${fishId}`)
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
