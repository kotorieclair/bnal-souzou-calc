export default {
  name: 'ErrorMessage',
  data() {
    return {
      visible: false,
      message: 'aaa',
    };
  },
  created() {
    this.$root.$on('displayError', (message) => {
      this.visible = true;
      this.message = message;
      console.log('error');
      console.log(message);
    });
  },
  methods: {
    hideError() {
      this.visible = false;
      this.message = '';
    }
  }
};
