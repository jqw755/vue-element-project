<template>
  <!--列表查询页面上方的筛选组件-->
  <section class="table-filter-wrap">
    <!--一级搜索-->
    <div class="flex first-filter">
      <div class="table-filter-more" @click="moreFilter" v-show="isMore">
        更多筛选<i :class="[isMore?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
      </div>
      <slot name="filter"></slot>
    </div>
    <!--更多筛选-->
    <div class="more-filter" v-show="isMore">
      <slot name="moreFilter"></slot>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      isMore: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      // 展开更多表格筛选条件
      moreFilter() {
        this.isMore = !this.isMore;
      }
    }
  }
</script>

<style lang="scss">
  @import "../style/pageFilter";
</style>
