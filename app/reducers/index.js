
const InitialState = {
  allLots: ['test'],
};

const reducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'SET_ALL_LOTS':
      return { ...state, allLots: action.payload };
    default:
      return state;

  }
};

export default reducer;
