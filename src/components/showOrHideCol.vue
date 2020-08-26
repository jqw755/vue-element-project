<template>
  <el-dropdown trigger="click">
    <el-button type="success" class="show-col-btn" icon="el-icon-setting">显示/隐藏列</el-button>
    <el-dropdown-menu slot="dropdown" class="show-col-wrap">
      <el-checkbox v-for="item in tableCols.cols" :label="item.prop" :key="item.prop" v-model="item.isShow"
                   @change="showOrHideCol(item)">{{item.label}}
      </el-checkbox>
      <p>
        <el-checkbox v-model="tableCols.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-button size="mini" round type="danger" icon="el-icon-refresh" class="reset-show-hide-col"
                   @click="resetShowOrHideCol">重置
        </el-button>
      </p>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  export default {
    props: {
      tableCols: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        tableColsSub: {}
      }
    },
    mounted() {
    },
    methods: {
      // 显示隐藏列全选方法
      handleCheckAllChange(val) {
        this.tableCols.checkAll = val;
        if (val) {
          this.tableCols.cols.forEach((item, index, arr) => {
            item.isShow = true;
          })
        } else {
          this.tableCols.cols.forEach((item, index, arr) => {
            item.isShow = false;
          })
        }
        this.$emit('handleCheckAllChange', this.tableCols)
      },
      showOrHideCol(target) {
        this.tableCols.cols.forEach((item, index, arr) => {
          if (item.prop === target.prop) {
            arr[index].isShow = !!arr[index].isShow;
            this.tableCols.checkAll = arr.every(item => {
              return item.isShow
            })
          }
        });
        this.$emit('showOrHideCol', this.tableCols)
      },
      // 重置显示隐藏列
      resetShowOrHideCol() {
        // this.tableCols.checkAll = false;
        // this.tableCols.cols.forEach((item, index) => {
        //   if (index > parseInt(this.defaultColsLength)) {
        //     item.isShow = false;
        //   }
        // });
        this.$emit('resetShowOrHideCol', {});
      },
    },
  }
</script>

<style lang="scss">
  .show-col {
    float: right;
    .show-col-btn {
      background: #ffb60a;
      border-color: #ffb60a;
    }
  }

  /*修改带表格页面中显示隐藏列中的下拉菜单样式*/
  .show-col-wrap {
    width: 420px;
    padding: 15px 20px;
    .el-checkbox {
      margin: 10px 5px;
      width: 115px;
    }
  }

  /* 重置显示隐藏列按钮*/
  .reset-show-hide-col {
    font-size: 12px;
    background: #f06a3a;
    padding: 5px !important;
    float: right;
    margin: 10px 12px 0 0;
  }


</style>
