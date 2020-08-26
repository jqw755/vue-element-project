<template>
  <div class="table-actions clear-fix f-right">
    <div class="left-action f-left hide" v-if="!tableActionsObj.hideLeft">
      <i class="hide icons icons-set"></i>
      <span class="action-item" @click="selectAllTable">全选</span>
      <span class="action-item" @click="reverseSelectTable">反选</span>
      <span class="action-item" @click="unSelectTable">取消选择</span>
    </div>
    <div class="right-action f-right" v-if="!tableActionsObj.hideRight">
      <span class="action-item del-btn" v-if="!tableActionsObj.hideMoreDel" @click="batchDelete">批量删除</span>
      <span class="action-item add-btn" v-if="!tableActionsObj.hideAdd" @click="tableAddEvt">添加</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tableActionsObj: {
        type: Object,
        default: {
          hideLeft: false,
          hideRight: false,
          hideMoreDel: false,
          hideAdd: false,
        }
      }
    },
    data() {
      return {}
    },
    methods: {
      // 全选
      selectAllTable() {
        this.$emit('selectAllTable');
      },
      // 反选
      reverseSelectTable() {
        this.$emit('reverseSelectTable');
      },
      // 取消选择
      unSelectTable() {
        this.$emit('unSelectTable');
      },
      // 批量删除
      batchDelete() {
        this.$emit('batchDelete');
      },
      // 点击新增
      tableAddEvt() {
        this.$emit('tableAddEvt');
      },
    },
    watch: {}
  }
</script>

<style lang="scss">
  .table-actions {
    /*width: 100%;*/
    flex-shrink: 0;
    height: 26px;
    line-height: 26px;
    /*margin-bottom: 17px;*/
    font-size: 12px;
    color: $base-light-font;
    .action-item {
      margin-right: 10px;
      padding: 3px 10px;
      border-radius: 2px;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
    .left-action {
      .action-item {
        border: 1px solid $base-font;
      }
    }
    .right-action {
      .action-item {
        color: #fff;
        &.del-btn {
          padding: 5px 12px;
          background: $base-danger;
          &:hover {
            background: #ff925c;
          }
          &:active {
            background: #db492c;
          }
        }
        &.add-btn {
          padding: 5px 18px;
          background: $base-success;
          &:hover {
            background: #90d640;
          }
          &:active {
            background: #70ad3b;
          }
        }
      }
    }
  }
</style>
