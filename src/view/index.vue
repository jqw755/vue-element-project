<template>
  <div class="index-container">
    <!--表格筛选-->
    <section class="table-filter-wrap">
      <!--表格顶部一级搜索-->
      <div class="flex justify-between first-filter">
        <el-form :model="tableFilterObj" :inline="true" class="form-inline" size="mini" ref="tableFilterObj">

          <el-form-item label="设备Id" class="" prop="id">
            <el-input placeholder="输入设备Id" v-model="tableFilterObj.id"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="" @click="getList">查询</el-button>
            <el-button type="info" class=" " @click="resetFilterForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <!--数据表格-->
    <el-table :data="tableData" border  v-loading="loadingTable">

      <el-table-column v-for="(item,index) in tableCols" :key="index" :prop="item.prop" :label="item.label"
                       :minWidth="item.minWidth" show-overflow-tooltip></el-table-column>

      <el-table-column prop="state" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-switch :value="scope.row.state==='开'" @change="changeStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="queryDetail(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <section class="page-wrap">
      <page :pageObj="pageObj"></page>
    </section>

    <!--详情dialog-->
    <el-dialog title="详情" :visible.sync="detailDialogVisible" width="50%" :close-on-click-modal="false">
      <el-form :model="detailObj" label-width="120px" v-loading="loadingDetail">
        <el-form-item label="设备Id：">{{detailObj.id||'--'}}</el-form-item>
        <el-form-item label="设备sn：">{{detailObj.sn||'--'}}</el-form-item>
        <el-form-item label="设备ip：">{{detailObj.ip||'--'}}</el-form-item>
        <el-form-item label="设备名称：">{{detailObj.addr||'--'}}</el-form-item>
        <el-form-item label="在线状态：">{{detailObj.isonline||'--'}}</el-form-item>
        <el-form-item label="开关状态：">{{detailObj.state||'--'}}</el-form-item>
        <el-form-item label="详细：">{{detailObj.detailed||'--'}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import page from '@/components/page'

  export default {
    data() {
      return {
        loadingTable: false,

        tableFilterObj: {
          id: '',
        },
        tableData: [],
        tableCols: [
          {
            prop: 'id',
            label: '设备Id',
            minWidth: '120'
          },   {
            prop: 'sn',
            label: 'sn',
            minWidth: '150'
          }, {
            prop: 'addr',
            label: '设备名称',
            minWidth: '150'
          }, {
            prop: 'isonline',
            label: '在线状态',
            minWidth: '100'
          }, {
            prop: 'ip',
            label: 'ip',
            minWidth: '160'
          },  {
            prop: 'detailed',
            label: '详细',
            minWidth: '160'
          },{
            prop: 'type',
            label: 'type',
            minWidth: '160'
          },
          {
            prop: 'blue',
            label: 'blue',
            minWidth: '120'
          },
          {
            prop: 'green',
            label: 'green',
            minWidth: '120'
          },
          {
            prop: 'red',
            label: 'red',
            minWidth: '120'
          },
        ],
        // 分页
        pageObj: {
          pageSizeArr: [10, 20, 50, 100],
          pageSize: 10,
          currentPage: 1,
          total: 0,
          sizeChange: (c, p) => this.getList(c, p),
          handleCurrentChange: (c, p) => this.getList(c, p)
        },

        detailDialogVisible: false,
        loadingDetail: false,
        detailObj: {}
      };
    },
    mounted() {
      this.getList();
    },
    methods: {
      // 重置筛选表单
      resetFilterForm() {
        this.$refs.tableFilterObj.resetFields();
        this.pageObj.currentPage = 1;
        this.pageObj.pageSize = 10;
        this.getList();
      },

      // 切换状态
      changeStatus(row) {
        const params = {
          id: row.id,
          sn: row.sn,
          key: 'power',
          value: row.state === '开' ? 0 : 1,
        };
        this.loadingTable = true;
        this.$api.post('/setState', params).then(res => {

          this.$message.success('操作成功');
          this.getList();

        }).catch(e => {
        }).finally(()=>{
          this.loadingTable = false;
        })

      },
      // 查看详情
      queryDetail(row) {
        this.detailDialogVisible = true;
        this.detailObj = row;
        return

        const params = {
          id: row.id,
          sn: row.sn,
        };
        this.loadingDetail = true;
        this.$api.post('/listDetail', params).then(res => {
          if (res) {

          }
        }).catch(e => {
        }).finally(()=>{
          this.loadingDetail = false;
        })
      },
      getList() {
        this.loadingTable = true;
        const params = {
          ...this.tableFilterObj,
          page: this.pageObj.currentPage,
          pagesize: this.pageObj.pageSize,
        };
        this.$api.post('/getList', params).then(res => {
          if (res && res.list) {
            this.tableData = res.list;
            this.pageObj.total = res.total;
          }
        }).catch(e => {
        }).finally(()=>{
          this.loadingTable = false;
        })
      },
    },
    components: {page}
  }
</script>

<style scoped lang="scss">
</style>

