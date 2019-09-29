<template>
  <!--分页-->
  <!--引入该组件时，父组件必须用一个类名为page-wrap的div包着该组件名-->
  <div class="item">
    <div class="page-wrap-div">
      <el-pagination
        @size-change="sizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageObj.currentPage"
        :page-sizes="pageObj.pageSizeArr"
        :page-size="pageObj.pageSize" :total="pageObj.total"
        layout="sizes, prev, pager, next, jumper"
        prev-text="上一页" next-text="下一页">
      </el-pagination>
    </div>
    <div class="slot-span">
      <span class="range-slot">{{ rangePage }}条，</span>
      <span>共{{ pageObj.total }}条</span>
   </div>
  </div>
</template>

<script>
  export default {
    props: {
      pageObj: {
        pageSizeArr: [10, 20, 50, 100],
        pageSize: 10,
        // 分页默认显示页数
        currentPage: 1,
        total: 0,
        sizeChange: () => {
        },
        handleCurrentChange: () => {
        }
      }
    },
    data() {
      return {
        rangePage: `1~${this.pageObj.pageSize}`
      }
    },
    methods: {
      // 每页显示数量改变时触发
      sizeChange(val) {
        this.pageObj.pageSize = val;
        this.pageObj.sizeChange(this.pageObj.currentPage, this.pageObj.pageSize);
      },
      // 当前页改变时触发
      handleCurrentChange(val) {
        this.pageObj.currentPage = val;
        this.pageObj.handleCurrentChange(this.pageObj.currentPage, this.pageObj.pageSize);
      },
    },
    watch: {
      'pageObj.currentPage'(val) {
        if (val === 1) {
          this.rangePage = `1~${this.pageObj.pageSize}`
        } else {
          let s = (val - 1) * this.pageObj.pageSize + 1,
            e = val * this.pageObj.pageSize;
          this.rangePage = `${s}~${e}`;
        }
      //  console.log(this.rangePage)
      },
      'pageObj.pageSize'(val) {
        if (this.pageObj.currentPage === 1) {
          this.rangePage = `1~${val}`;
          return
        }
        let s = (this.pageObj.currentPage - 1) * val + 1,
          e = this.pageObj.currentPage * val;
        this.rangePage = `${s}~${e}`;
      //  console.log(this.rangePage)
      },
      'pageObj.total'(val) {
        if (typeof val === 'string') {
          this.pageObj.total = parseInt(val)
        }
      },
    }
  }
</script>

<style lang="scss">
  .page-wrap {
   // display: flex;
    //justify-content: space-between;
    margin-top: 20px;
    .item {
      display: inline-block;
     // display: flex;
     // align-items: center;
      flex-shrink: 0;
      .page-wrap-div{
        display: inline-block;
        height: 32px;
        line-height: 28px;
      }
      .slot-span{
        display: inline-block;
      }
      .range-slot{
        margin-left: 10px;
      }
    }
    .new-role {
      background: #7ebf41;
      color: #fff;
    }
  }
</style>
