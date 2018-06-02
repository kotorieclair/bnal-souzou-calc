export default {
  name: 'ErrorMessage',
  data() {
    return {
      visible: false,
    };
  },
  created() {
    this.$on('displayError', (e) => {
      this.visible = true;
      console.log('error');
      console.log(e);
    });
  },
};
