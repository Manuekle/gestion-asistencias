import axios from 'axios';
import {
  ESTUDIANTE_LIST_REQUEST,
  ESTUDIANTE_LIST_SUCCESS,
  ESTUDIANTE_LIST_FAIL,
  ESTUDIANTE_DETAILS_REQUEST,
  ESTUDIANTE_DETAILS_SUCCESS,
  ESTUDIANTE_DETAILS_FAIL,
  ESTUDIANTE_CREATE_REQUEST,
  ESTUDIANTE_CREATE_SUCCESS,
  ESTUDIANTE_CREATE_FAIL,
  ESTUDIANTE_UPDATE_REQUEST,
  ESTUDIANTE_UPDATE_SUCCESS,
  ESTUDIANTE_UPDATE_FAIL,
  ESTUDIANTE_DELETE_REQUEST,
  ESTUDIANTE_DELETE_SUCCESS,
  ESTUDIANTE_DELETE_FAIL
} from '../constants/estudianteConstants';

// Fetch all students
export const fetchEstudiantes = () => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_LIST_REQUEST });
    const { data } = await axios.get('/api/estudiantes');
    dispatch({
      type: ESTUDIANTE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Fetch a single student by ID
export const fetchEstudianteById = (id) => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/estudiantes/${id}`);
    dispatch({
      type: ESTUDIANTE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Create a new student
export const createEstudiante = (estudiante) => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_CREATE_REQUEST });
    const { data } = await axios.post('/api/estudiantes', estudiante);
    dispatch({
      type: ESTUDIANTE_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update an existing student
export const updateEstudiante = (estudiante) => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_UPDATE_REQUEST });
    const { data } = await axios.put(
      `/api/estudiantes/${estudiante.id}`,
      estudiante
    );
    dispatch({
      type: ESTUDIANTE_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete a student
export const deleteEstudiante = (id) => async (dispatch) => {
  try {
    dispatch({ type: ESTUDIANTE_DELETE_REQUEST });
    await axios.delete(`/api/estudiantes/${id}`);
    dispatch({ type: ESTUDIANTE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: ESTUDIANTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
