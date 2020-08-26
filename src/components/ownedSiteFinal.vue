<template>
  <!--带分页的远程搜索select组件，比如：所属站点、电桩名称, 用此组件可以弃用ownedSite组件-->
  <section class="final-owned-option-wrap" :style="{width: wrapWidth+'px'}">

    <div class="show option-name" @click="openChooseOption">
      <i :class="['show icon-arrow',isShowResult?'el-icon-arrow-up':'el-icon-arrow-down']"></i>
      <span class="show" v-show="!selectedArr.length">{{originPlaceholder}}</span>

      <p :class="['show selected-option-item',{'one-option':selectLimit <= 1}]"
         v-for="(item,index) in selectedArr" :key="index">
        <span class="show">{{item.optionDesc}} </span>
        <i v-if="selectLimit > 1" class="el-icon-circle-close" @click="delOption(index, $event)"></i>
      </p>
    </div>

    <transition name="el-zoom-in-top">
      <div v-show="isShowResult" class="show search-result-wrap text-overflow" :style="{width: wrapWidth+'px'}">
        <el-input class="search-option-ipt" :placeholder="searchPlaceholder" prefix-icon="el-icon-search" size="mini"
                  v-model="ownResultObj.filterTxt" @input="filterOwnedOption"></el-input>
        <div class="show result-content" v-loading="loadingWrap">
          <p class="show text-center" v-show="!ownResultObj.resultArr||!ownResultObj.resultArr.length">暂无数据</p>
          <p class="option-item" v-for="(item,index) in ownResultObj.resultArr" :key="index"
             @click="chooseOption(item)">
            {{item.optionDesc}}
          </p>
        </div>
        <div class="show action-option-wrap text-center">
          <el-button class="show" icon="el-icon-arrow-left" @click="prevPage"></el-button>
          <el-button class="show" icon="el-icon-arrow-right" @click="nextPage"></el-button>
        </div>
      </div>
    </transition>

  </section>
</template>

<script>
  export default {
    props: {
      originPlaceholder: {
        type: String,
        default() {
          return '选择站点'
        }
      },
      searchPlaceholder: {
        type: String,
        default() {
          return '输入要搜索的名称'
        }
      },
      // 宽度
      wrapWidth: {
        type: String | Number,
        default() {
          return '220'
        }
      },
      selectLimit: {
        type: Number,
        default() {
          return 1 // 最大可选数
        }
      },
      // 其余参数
      otherData: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于回显
      showResultArr: {
        type: Array,
        default() {
          return []
        }
      },
      // 接口api url
      apiUrl: {
        required: true,
        type: String,
        default() {
          return ''
        }
      },
      // 接口返回值res，封装的对象key，默认list
      resKey: {
        required: false,
        type: String,
        default() {
          return 'list'
        }
      },
      // select组件要显示的每项的label的key
      descKey: {
        required: true,
        type: String,
        default() {
          return ''
        }
      },
      // select组件要每项的value的key
      idKey: {
        required: true,
        type: String,
        default() {
          return ''
        }
      },
      // 该组件中搜索的入参， 可为空，但要传
      searchParam: {
        required: true,
        type: String,
        default() {
          return ''
        }
      },
    },
    data() {
      return {
        loadingWrap: false, // 加载站点中
        isShowResult: false,

        ownResultObj: {
          filterTxt: '', // 搜索的站点名字
          resultArr: [], // 获取的站点列表数据
        },
        selectedArr: [],

        // 分页数据
        pageNum: 1,
        pageSize: 30,
        totalSize: undefined
      }
    },
    mounted() {
      this.getList();

      // 点击空白处隐藏站点内容弹窗
      document.body.addEventListener('click',  (e) =>{
        const className = e.target.className,
            testClassName = ['el-input__inner', 'show', 'el-input__icon'];
        const hasClass = testClassName.some(item => {
          return className.includes(item);
        });
        if (!hasClass) {
          this.isShowResult = false;
        }
      })
    },
    methods: {
      // 展开内容选框
      openChooseOption() {
        this.isShowResult = !this.isShowResult;
      },

      // 请求站点数据
      getList(filterTxt = this.ownResultObj.filterTxt) {
        this.loadingWrap = true;
        let params = {
          ...this.otherData,
          [this.searchParam]: filterTxt, // 此处是外部传递的搜索入参
          pageSize: this.pageSize,
          pageNum: this.pageNum
        };
        this.$api.post(this.apiUrl, params).then(res => {
          const result = res[this.resKey];
          if (result && result.length) {
            // 每个接口返回的描述的key都不一样，所以key由接口定好后，外部传过来(可参考客户平台-优惠券批次管理里的表单）
            this.ownResultObj.resultArr = result.map(item => {
              // 如果返回结果非对象
              if (typeof item !== 'object') {
                return {
                  optionDesc: item,
                  optionId: item
                }
              }
              return {
                ...item,
                optionDesc: item[this.descKey],
                optionId: item[this.idKey] // 如果接口中也有返回optionDesc\optionId字段，此时注意冲突
              };
            })
            this.totalSize = res.totalSize;
            // 数据得到后，向外部emit一次。
            this.$emit('getResult', this.ownResultObj.resultArr);
          } else {
            this.ownResultObj.resultArr = [];
            this.totalSize = 0;
          }
        }).catch(() => {
        }).finally(() => {
          this.loadingWrap = false;
        })
      },
      // 搜索站点
      filterOwnedOption() {
        this.pageNum = 1;
        this.pageSize = 30;
        this.getList();
      },
      // 上一页
      prevPage() {
        if (this.pageNum > 1) {
          this.pageNum = this.pageNum - 1;
          this.getList();
        }
      },
      // 下一页
      nextPage() {
        // 是否还有数据
        const hasOption = (this.pageNum - 1) * this.pageSize + this.ownResultObj.resultArr.length;
        if (hasOption >= this.totalSize) {
          return
        }
        this.pageNum = this.pageNum + 1;
        this.getList();
      },
      // 选定站点
      chooseOption(option) {
        this.isShowResult = false;

        if (this.selectLimit > 1 && this.selectedArr.length >= this.selectLimit) {
          this.$message.warning(`最多选择${this.selectLimit}个`);
          return
        }

        if (this.selectLimit === 1) {
          this.selectedArr = [option]
        } else {
          // 过滤重复
          const sidArr = this.selectedArr.map(item => item.optionId);
          if (sidArr.indexOf(option.optionId) === -1) {
            this.selectedArr.push(option);
          }
        }
        this.$emit('chooseOption', this.selectedArr);
      },

      // 移除选中的
      delOption(index, e) {
        e.stopPropagation();
        this.selectedArr.splice(index, 1);
        this.$emit('delOption', this.selectedArr);
      },

      // 清除已选数据, 外部调用
      resetResult() {
        this.ownResultObj.filterTxt = '';
        this.selectedArr = [];
        this.getList();
        this.$emit('chooseOption', []);
      },

      // 获取请求道的数据
      getResult(){
       return this.ownResultObj.resultArr
      }
    },
    watch: {
      showResultArr(list) {
        // 需要回显站点名称
        if (list && list.length) {
          this.selectedArr = list;
        }
      }
    },
    destroyed() {
      document.body.removeEventListener('click',()=>{})
    }
  }
</script>
<style lang="scss">
  .search-option-ipt {
    .el-input__inner {
      padding-left: 26px !important;
    }
  }
</style>
<style lang="scss" scoped>
  .final-owned-option-wrap {
    font-size: 12px;
    position: relative;

    .option-name {
      width: 100%;
      padding: 0 10px;
      min-height: 26px;
      max-height: 100px;
      border: 1px solid $base-border;
      border-radius: 2px;
      cursor: pointer;
      background: #fff;
      color: $base-light-font;
      overflow-y: auto;
      position: relative;

      .selected-option-item {
        display: inline-block;
        color: #333;
        background: #f4f4f5;
        border-color: #e9e9eb;
        padding: 0 4px;
        margin: 3px 3px;
        border-radius: 4px;
      }

      .one-option {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: inherit;
      }

      .icon-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10px;
      }
    }

    .search-result-wrap {
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

      .search-option-ipt {
        display: block;
        width: 90%;
        margin: 10px auto;
      }

      .result-content {
        /*width: 100%;*/
        min-height: 150px;
        max-height: 350px;
        overflow: auto;
        padding: 0 0 50px 0;

        .option-item {
          /*width: 100%;*/
          cursor: pointer;
          padding: 0 15px;

          &:hover {
            color: $base-green;
            background: $base-f7;
          }
        }
      }

      .action-option-wrap {
        width: 100%;
        padding: 5px 0;
        background: #fff;
        position: absolute;
        bottom: 17px;
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
