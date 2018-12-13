
import history from '../../utilities/history';
console.log('history',history)

export const pushTParticulatScreen = (screen) => {
    return (dispatch) => {
        history.push(screen)
    };
  }



export const goBack = () => {
    return (dispatch) => {
        history.goBack()
    };
  }