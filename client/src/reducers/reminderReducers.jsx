import {
  REMINDER_CREATE_REQUEST,
  REMINDER_CREATE_SUCCESS,
  REMINDER_CREATE_FAIL
} from '../constants/reminderConstants';

export const reminderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REMINDER_CREATE_REQUEST:
      return { loading: true };
    case REMINDER_CREATE_SUCCESS:
      return { loading: false, success: true, reminder: action.payload };
    case REMINDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
