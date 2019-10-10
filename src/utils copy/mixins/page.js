export default {
  data() {
    return {
      total: 0,
      pageIndex: 1,
      pageSize: this.$store.state.pageSize
    }
  },
  methods: {
    changePage(val) {
      this.pageIndex = val
      this.search()
    },
    changePageSize(val) {
      this.pageSize = val
      this.changePage(1)
    }
  }
}
