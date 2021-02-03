import axios from 'axios';
import { REQUEST, SUCCESS, FAILURE } from 'src/shared/reducers/action-type.util';
import { seaCreaturesUrl } from 'src/shared/reducers/api-urls';
import { ISeaCreatures, defaultValue as defaultSeaC } from 'src/shared/model/sea-creatures.model';

export const ACTION_TYPES = {
  FETCH_SEA_CREATURES_LIST: 'seaCre/FETCH_SEA_CREATURES_LIST',
  FETCH_SEA_CREATURE: 'seaCre/FETCH_SEA_CREATURE',
  RESET: 'seaCre/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISeaCreatures>,
  entity: defaultSeaC
};

export type SeaCreaturesState = Readonly<typeof initialState>;

export default (state: SeaCreaturesState = initialState, action): SeaCreaturesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SEA_CREATURES_LIST):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case REQUEST(ACTION_TYPES.FETCH_SEA_CREATURE):
      return {
        ...state,
        errorMessage: null,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SEA_CREATURES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SEA_CREATURE):
    case SUCCESS(ACTION_TYPES.FETCH_SEA_CREATURES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SEA_CREATURE):
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

const apiUrl = seaCreaturesUrl;

// Actions

export const getEntities = () => {
  const localCopy = localStorage.getItem(seaCreaturesUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_SEA_CREATURES_LIST),
    payload: {
      data: JSON.parse(localCopy)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_SEA_CREATURES_LIST,
    payload: axios.get<ISeaCreatures>(apiUrl)
  };
};

export const getEntity = (bugId: number) => {
  const localCopy = localStorage.getItem(seaCreaturesUrl);
  if (localCopy) return {
    type: SUCCESS(ACTION_TYPES.FETCH_SEA_CREATURE),
    payload: {
      data: (JSON.parse(localCopy) as ISeaCreatures[]).find(b => b.id === bugId)
    }
  };
  return {
    type: ACTION_TYPES.FETCH_SEA_CREATURE,
    payload: axios.get<ISeaCreatures>(`${apiUrl}/${bugId}`)
  };
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
