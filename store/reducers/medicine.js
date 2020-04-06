import { ADD_MEDICINE, RETRIEVE_MEDICINE } from '../actions/medicine';

const initialState = {
  medicine: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MEDICINE:
      return {
        ...state,
        medicine: state.medicine.concat(action.addMed),
      };
    case RETRIEVE_MEDICINE:
      return {
        medicine: action.medication,
      };
    default:
      return state;
  }
};
