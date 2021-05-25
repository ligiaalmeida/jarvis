const electron = require('electron');

const window = electron.remote.getCurrentWindow();

export const setFullScreen = (isFullScreen = true) => window.setFullScreen(isFullScreen);

export const isFullScreenEnable = () => {
  return window.isFullScreen();
};
