import { combineReducers } from 'redux';
import authentication, { AuthenticationState } from './authentication';

import fish, { FishState } from 'src/entities/fish/fish.reducer';
import bugs, { BugsState } from 'src/entities/bugs/bugs.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly fish: FishState;
  readonly bugs: BugsState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  fish,
  bugs
});

export default rootReducer;
