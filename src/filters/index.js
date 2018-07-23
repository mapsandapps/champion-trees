import distanceHuman from './distance-human';
import ordinal from './ordinal';

export default {
  install(Vue, options) {
    Vue.filter('distanceHuman', distanceHuman);
    Vue.filter('ordinal', ordinal);
  }
};
