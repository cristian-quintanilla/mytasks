import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';

import uiReducer from '../reducers/uiReducer';
import projectsReducer from '../reducers/projectsReducer';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    projects: projectsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
