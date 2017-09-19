import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
