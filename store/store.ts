import { configureStore, Action, ThunkAction } from '@reduxjs/toolkit';

import uiReducer from '../reducers/uiReducer';
import projectsReducer from '../reducers/projectsReducer';
import tasksReducer from '../reducers/tasksReducer';

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
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
