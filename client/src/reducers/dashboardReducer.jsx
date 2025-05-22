import {
  DASHBOARD_RESUMEN_REQUEST,
  DASHBOARD_RESUMEN_SUCCESS,
  DASHBOARD_RESUMEN_FAIL
} from '../constants/dashboardConstants';

const initialState = {
  loading: false,
  resumen: null,
  error: null
};

export const dashboardResumenReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_RESUMEN_REQUEST:
      return {
        ...initialState,
        loading: true
      };
    case DASHBOARD_RESUMEN_SUCCESS:
      return {
        ...initialState,
        loading: false,
        resumen: action.payload
      };
    case DASHBOARD_RESUMEN_FAIL:
      return {
        ...initialState,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
