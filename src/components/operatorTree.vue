<template>
  <!--注意：-->
  <!--该组件只用来复用用户选择运营商做筛选条件-->
  <el-dropdown trigger="click" placement="bottom-start" style="padding-top: 1px;">
    <!--dropdown点击区域-->
    <el-button size="mini" plain class="operator-tree-btn">
      <span :class="['text-overflow', 'operator-tree-span', {'selected-companyName':selCompany.companyName}]">
        {{selCompany.companyName || `选择${selCompany.tipText}`}}
      </span>
      <i class="el-icon-arrow-down el-icon--right f-right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown" class="company-tree-menu ">
     <div class="company-tree">
       <!--搜索树状结构数据-->
       <el-input prefix-icon="el-icon-search" :placeholder="`输入搜索的${selCompany.tipText}名称`"
                 v-model="filterText" size="mini" class="search-operator-ipt"></el-input>
       <!--树状结构-->
       <el-tree ref="dropdownTree" :filter-node-method="filterNode" :expand-on-click-node="false"
                @node-click="handleCheckChange"
                :data="operatorData.options" class="project-tree" unselectable="on"
                :default-expanded-keys="[1]" :render-content="renderContent"
                :props="operatorData.defaultProps" node-key="companyId">
       </el-tree>
     </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>
  export default {
    props: {
      selCompany: {
        default(){
          return {
            companyName: '',
            companyId: '',
            isSubCompany: true,
            tipText: '运营商'
          }
        },
        type: Object,
        required: false
      }
    },
    data() {
      return {
        loadingOperatorTree: true,
        // 搜索输入值
        filterText: '',
        // 运营商数据
        operatorData: {
          options: [],
          defaultProps: {
            children: 'children',
            label: 'companyName'
          },
        },
      }
    },
    mounted() {
      this.getOrganTree();
    },
    methods: {
      // 生成树状结构
      renderContent(h, {node, data, store}) {
        return (
          <el-dropdown-item class="company-dropdown-item">
            <span class="custom-tree-node">
              <span class="icons company-tree-node-icon">{node.label}</span>
            </span>
          </el-dropdown-item>)
      },
      // 搜索
      filterNode(value, data) {
        if (!value) return true;
        return data.companyName.indexOf(value) !== -1;
      },
      // 点击选择树状结构选择项
      handleCheckChange(data) {
        this.selCompany.companyName = data.companyName;
        this.selCompany.companyId = data.companyId;
        this.$emit('getSelectCompany', data || []);
      },
      // 获取运营商数据
      getOrganTree() {
        this.loadingOperatorTree = true;
        this.$api.post('/v1/standard/masterdata/admin/company/listForSelect').then(res => {
          this.operatorData.options = res.companies;
          this.$emit('getOperatorDate', res.companies);
        }).catch(e => {
        }).finally(() => {
          this.loadingOperatorTree = false;
        })
      },
      // 清空筛选框中输入的数据
      clearFilterText() {
        this.filterText = '';
      },
    },
    watch: {
      //监听搜索输入值
      filterText(val) {
        this.$refs['dropdownTree'].filter(val);
      }
    },
  }
</script>

<style lang="scss">
  .operator-tree-btn {
    width: 160px;
    height: 26px;
    text-align: left;
    color: #c0c4cc;
    border-radius: 0;
    padding: 7px 10px;
    .operator-tree-span {
      display: inline-block;
      width: 85%;
      font-size: 12px;
      &.selected-companyName {
        color: #333;
      }
    }
  }

  .company-tree-menu {
    overflow: visible;
  }

  .search-operator-ipt {
    display: block;
    width: 90%;
    margin: 0 auto 10px;
    .el-input__inner {
      padding-left: 26px;
      background: #fff;
    }
  }

  .company-dropdown-item {
    padding: 0;
    font-size: 12px;
    width: 100%;
    &:hover {
      background: transparent !important;
    }
  }
</style>
