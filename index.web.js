import Root from './src/config/Root';
AppRegistry.registerComponent('App', () => Root);
AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });