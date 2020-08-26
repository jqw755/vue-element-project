<template>
  <!--运营商所属站点组件-->
  <section class="owned-site-wrap">
    <div class="site-name" @click="openChooseSite">
      <span :class="['show-owned-site name-span text-overflow',{'selected-txt':!selectEdSite}]">
        {{selectEdSite?selectEdSite:`选择所属站点`}}
      </span>
      <i :class="['icon-arrow show-owned-site',isShowSiteResult?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
    </div>
    <transition name="el-zoom-in-top">
      <div v-show="isShowSiteResult" class="show-owned-site search-result-wrap text-overflow">
        <el-input class="search-site-ipt" placeholder="输入搜索的站点名称" prefix-icon="el-icon-search" size="mini"
                  v-model="ownSiteObj.filterTxt" @input="filterOwnedSite"></el-input>
        <div class="show-owned-site result-content" v-loading="loadingSite">
          <p class="show-owned-site text-center"
             v-show="!ownSiteObj.siteArr||!ownSiteObj.siteArr.length">暂无数据</p>
          <p class="site-item" v-for="(item,index) in ownSiteObj.siteArr" :key="index"
             @click="chooseSite(item)">
            {{item.stationName}}
          </p>
        </div>
        <div class="show-owned-site action-site-wrap text-center">
          <el-button class="show-owned-site" icon="el-icon-arrow-left" @click="prevSite"></el-button>
          <el-button class="show-owned-site" icon="el-icon-arrow-right" @click="nextSite"></el-button>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  export default {
    props: {
      companyId: '',
      apiUrl: {
        type: String,
        default: () => {
          return '/nameList' // 默认主平台的api url
        }
      },
    },
    data() {
      return {
        loadingSite: false, // 加载站点中
        isShowSiteResult: false,
        ownSiteObj: {
          filterTxt: '', // 搜索的站点名字
          siteArr: [], // 获取的站点列表数据
        },
        selectEdSite: '',
        // 分页数据
        pageNum: 1,
        pageSize: 50,
        totalSize: undefined
      }
    },
    mounted() {
      this.getSiteList();
      // 点击空白处隐藏站点内容弹窗
      document.onclick = (e) => {
        e.stopPropagation();
        let className = e.target.className;
        let testClassName = ['el-input__inner', 'icon-arrow', 'show-owned-site', 'el-input__icon'];
        let hasClass = testClassName.some(item => {
          return className.includes(item)
        });
        if (!hasClass) {
          this.isShowSiteResult = false;
        }
      }
    },
    methods: {
      // 展开内容选框
      openChooseSite() {
        this.isShowSiteResult = !this.isShowSiteResult;
      },
      // 请求站点数据
      getSiteList(stationName = this.ownSiteObj.filterTxt, companyId = this.companyId) {
        this.loadingSite = true;
        let params = {
          companyId, stationName,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.$api.post('/v1/standard/masterdata/admin/station'+this.apiUrl, params).then(res => {
          if (res.list && res.list.length) {
            this.ownSiteObj.siteArr = res.list;
            this.totalSize = res.totalSize;
          } else {
            this.ownSiteObj.siteArr = [];
            this.totalSize = 0;
          }
        }).catch(e => {
        }).finally(() => {
          this.loadingSite = false;
        })
      },
      // 搜索站点
      filterOwnedSite() {
        this.pageNum = 1;
        this.pageSize = 50;
        this.getSiteList();
      },
      // 上一页
      prevSite() {
        if (this.pageNum > 1) {
          this.pageNum = this.pageNum - 1;
          this.getSiteList();
        }
      },
      // 下一页
      nextSite() {
        // 是否还有数据
        const hasSite = (this.pageNum - 1) * this.pageSize + this.ownSiteObj.siteArr.length;
        if (hasSite >= this.totalSize) {
          return
        }
        this.pageNum = this.pageNum + 1;
        this.getSiteList();
      },
      // 选定站点
      chooseSite(site) {
        this.isShowSiteResult = false;
        this.selectEdSite = site.stationName;
        this.$emit('chooseSite', site.stationId);
      },
      // 清除已选站点数据
      resetSite() {
        this.ownSiteObj.filterTxt = '';
        this.selectEdSite = '';
        this.getSiteList();
      },
    },
    watch: {
      companyId(id) {
        this.resetSite();
      },
    }
  }
</script>
<style lang="scss">
  .search-site-ipt {
    .el-input__inner {
      padding-left: 26px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .owned-site-wrap {
    width: 160px;
    height: 26px;
    font-size: 12px;
    position: relative;
    .site-name {
      width: 100%;
      padding: 0 10px;
      height: 26px;
      line-height: 25px;
      border: 1px solid $base-border;
      position: relative;
      border-radius: 2px;
      cursor: pointer;
      background: #fff;
      .name-span {
        display: inline-block;
        width: 90%;
        height: 100%;
        &.selected-txt {
          color: $base-light-font;
        }
      }
      .icon-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }
    .search-result-wrap {
      width: 220px;
      background: #fff;
      box-shadow: 0 3px 13px 0 rgba(0, 0, 0, .15);
      border-radius: 4px;
      position: absolute;
      top: 40px;
      left: 0;
      z-index: 101;
      overflow: visible;
      &::after {
        content: '';
        display: inline-block;
        border: 7px solid transparent;
        border-bottom-color: #fff;
        position: absolute;
        left: 70px;
        top: -13px;
      }
      .search-site-ipt {
        display: block;
        width: 90%;
        margin: 10px auto;
      }
      .result-content {
        width: 100%;
        min-height: 150px;
        max-height: 400px;
        overflow: auto;
        padding: 0 0 50px 0;
        .site-item {
          width: 100%;
          cursor: pointer;
          padding: 0 15px;
          &:hover {
            color: $base-green;
            background: $base-f7;
          }
        }
      }
      .action-site-wrap {
        width: 100%;
        padding: 5px 0;
        background: #fff;
        position: absolute;
        bottom: 16px;
        left: 0;
        button {
          &:first-child {
            margin-right: 20px;
          }
        }
      }
    }
  }
</style>
