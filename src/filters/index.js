import ordinal from './ordinal';

export default {
  install(Vue, options) {
    Vue.filter('ordinal', ordinal);
  }
};
