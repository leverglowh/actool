import { combineReducers } from 'redux';
import fish, { FishState } from 'src/entities/fish/fish.reducer';

export interface IRootState {
  readonly fish: FishState;
}

const rootReducer = combineReducers<IRootState>({
  fish
});

export default rootReducer;
