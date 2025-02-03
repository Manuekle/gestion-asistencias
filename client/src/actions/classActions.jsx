import axios from 'axios';

import {
  CLASS_DETAILS_REQUEST,
  CLASS_DETAILS_SUCCESS,
  CLASS_DETAILS_FAIL,
  CLASS_CREATE_REQUEST,
  CLASS_CREATE_SUCCESS,
  CLASS_CREATE_FAIL
} from '../constants/classConstants';

// DETAILS
export const detailsClass = (id) => async (dispatch) => {
  try {
    dispatch({ type: CLASS_DETAILS_REQUEST });

    const { data } = await axios.get(`http://localhost:4000/docente/${id}`);

    dispatch({
      type: CLASS_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_DETAILS_FAIL,
      payload: error.response.data.message
    });
  }
};

export const createClass = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLASS_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.post(`/clase/`, {}, config);
    dispatch({
      type: CLASS_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: CLASS_CREATE_FAIL,
      payload: error.response.data.message
    });
  }
};
