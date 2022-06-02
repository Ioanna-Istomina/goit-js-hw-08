import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onSaveTime, 1000));

function onSaveTime({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}
const getStorageValue = localStorage.getItem(STORAGE_KEY);

if (getStorageValue) {
  player.setCurrentTime(getStorageValue);
}
