import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import authReducer from '../reducers/authReducer';
import projectsReducer from '../reducers/projectsReducer';
import tasksReducer from '../reducers/tasksReducer';
import uiReducer from '../reducers/uiReducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    ui: uiReducer,
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
