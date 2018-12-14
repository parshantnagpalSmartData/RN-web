import history from "../../utilities/history";
console.log("history", history);

export const pushTParticulatScreen = screen => {
  console.log("here pusig===>", screen);
  return dispatch => {
    console.log("here pusig", screen);
    history.push(screen);
  };
};

export const goBack = () => {
  return dispatch => {
    history.goBack();
  };
};
