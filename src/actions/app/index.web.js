/*
FileName: index.js
Author :Parshant Nagpal
Description: Conatins all navigation actions for App 
Date : 13 december 2018
*/




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