import axios from 'axios';
import {
  DOCENTE_LIST_REQUEST,
  DOCENTE_LIST_SUCCESS,
  DOCENTE_LIST_FAIL,
  DOCENTE_DETAILS_REQUEST,
  DOCENTE_DETAILS_SUCCESS,
  DOCENTE_DETAILS_FAIL,
  DOCENTE_CREATE_REQUEST,
  DOCENTE_CREATE_SUCCESS,
  DOCENTE_CREATE_FAIL,
  DOCENTE_UPDATE_REQUEST,
  DOCENTE_UPDATE_SUCCESS,
  DOCENTE_UPDATE_FAIL,
  DOCENTE_DELETE_REQUEST,
  DOCENTE_DELETE_SUCCESS,
  DOCENTE_DELETE_FAIL
} from '../constants/docenteConstants';

// Fetch all teachers
export const fetchDocentes = () => async (dispatch) => {
  try {
    dispatch({ type: DOCENTE_LIST_REQUEST });
    const { data } = await axios.get('/api/docentes');
    dispatch({
      type: DOCENTE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Fetch a single teacher by ID
export const fetchDocenteById = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCENTE_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/docentes/${id}`);
    dispatch({
      type: DOCENTE_DETAILS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Create a new teacher
export const createDocente = (docente) => async (dispatch) => {
  try {
    dispatch({ type: DOCENTE_CREATE_REQUEST });
    const { data } = await axios.post('/api/docentes', docente);
    dispatch({
      type: DOCENTE_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Update an existing teacher
export const updateDocente = (docente) => async (dispatch) => {
  try {
    dispatch({ type: DOCENTE_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/docentes/${docente.id}`, docente);
    dispatch({
      type: DOCENTE_UPDATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: DOCENTE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};

// Delete a teacher
export const deleteDocente = (id) => async (dispatch) => {
  try {
    dispatch({ type: DOCENTE_DELETE_REQUEST });
    await axios.delete(`/api/docentes/${id}`);
    dispatch({ type: DOCENTE_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DOCENTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
    });
  }
};
