export default {
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$option;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      })
        .then(next)
        .catch(next);
    } else {
      next();
    }
    console.log(asyncData, "mix");
  }
};
