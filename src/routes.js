import Playlist from './components/Playlist.vue';
import Player from './components/Player.vue';
import Settings from './components/Settings.vue';

export default [
  { path: '/', component: Playlist },
  { path: '/settings', component: Settings },
  { path: '/play/:id/:playlist?', component: Player }
]