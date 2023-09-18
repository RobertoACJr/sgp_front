const COLORS = {
  error: 'tertiary',
  success: 'primary',
  warning: 'warning',
};

const defaultState = () => ({
  title: '',
  text: '',
  show: false,
  showClosebtn: false,
  status: 'success',
});

export default {
  namespaced: true,
  state: defaultState(),
  getters: {
    getTitle: state => state.title,
    getText: state => state.text,
    getShow: state => state.show,
    getShowCloseBtn: state => state.showCloseBtn,
    getColorByStatus: state => COLORS[state.status] || COLORS.success,
  },
  mutations: {
    reset(state) {
      Object.keys(state).forEach(k => state[k] = defaultState()[k]);
    },
    setTitle(state, title) {
      state.title = title;
    },
    setText(state, text) {
      state.text = text;
    },
    setShow(state, show) {
      state.show = show;
    },
    setShowCloseBtn(state, showCloseBtn) {
      state.showCloseBtn = showCloseBtn;
    },
    setStatus(state, status) {
      state.status = status || 'success';
    },
  },
  actions: {
  },
}
