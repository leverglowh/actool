import { combineReducers } from 'redux';
import fish, { FishState } from 'src/entities/fish/fish.reducer';
import bugs, { BugsState } from 'src/entities/bugs/bugs.reducer';

export interface IRootState {
  readonly fish: FishState;
  readonly bugs: BugsState;
}

const rootReducer = combineReducers<IRootState>({
  fish,
  bugs
});

export default rootReducer;
