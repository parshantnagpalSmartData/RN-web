/*
 * @file: BackButtonHandling.js
 * @description: Function for handling back preess function.
 * @date: 24.Apr.2018
 * @author: Parshant Nagpal
 * */

'use strict';

import { Alert, BackHandler } from 'react-native';
/**
 * Function for handling back preess function
 */
export function handleBackPress() {
	Alert.alert(
		'Are You Sure You Want To Exit The App',
		'',
		[
			{
				text: 'Cancel',
				onPress: () => {},
				style: 'cancel'
			},
			{
				text: 'OK',
				onPress: () => {
					BackHandler.exitApp();
				}
			}
		],
		{ cancelable: false }
	);
	return true;
}
