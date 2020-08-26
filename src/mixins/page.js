export default {
  data() {
    return {
      // 分页
      pageObj: {
        pageSizeArr: [10, 20, 50, 100],
        pageSize: 10,
        currentPage: 1,
        total: 0,
        sizeChange: (c, p) => this.getList(c, p),
        handleCurrentChange: (c, p) => this.getList(c, p)
      }
    }
  },
  methods: {
    // 分页调用的请求方法
    getList(){}
  }
}
