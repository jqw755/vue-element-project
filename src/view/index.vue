<template>
  <div class="index-container">
    <!--表格筛选-->
    <section class="table-filter-wrap">
      <!--表格顶部一级搜索-->
      <div class="flex justify-between first-filter">
        <el-form :model="tableFilterObj" :inline="true" class="form-inline" size="mini" ref="tableFilterObj">

          <el-form-item label="设备Id" class="" prop="deviceId">
            <el-input placeholder="输入设备Id" v-model="tableFilterObj.deviceId"></el-input>
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
          <el-switch :value="scope.row.state===1" @change="changeStatus(scope.row)"></el-switch>
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
    <el-dialog title="详情" :visible.sync="detailDialogVisible" width="50%">
      <el-form :model="detailObj" label-width="80px" v-loading="loadingDetail">
        <el-form-item label="设备Id">{{detailObj.id}}</el-form-item>
        <el-form-item label="设备sn">{{detailObj.sn}}</el-form-item>
        <el-form-item label="设备名称">{{detailObj.addr}}</el-form-item>
        <el-form-item label="设备状态">{{detailObj.state}}</el-form-item>
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
          deviceId: '',
        },
        tableData: [
          {
            id: '1002566',
            sn: '456456',
            deviceStatusDesc: '离线',
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            state: 0
          },
          {
            id: '1002565',
            sn: '123123',
            deviceName: 'device008',
            deviceStatusDesc: '在线',
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            state: 1
          }],
        tableCols: [
          {
            prop: 'id',
            label: '设备Id',
            minWidth: '120'
          },   {
            prop: 'sn',
            label: 'sn',
            minWidth: '120'
          }, {
            prop: 'deviceName',
            label: '设备名称',
            minWidth: '130'
          }, {
            prop: 'deviceStatusDesc',
            label: '设备状态',
            minWidth: '100'
          }, {
            prop: 'date',
            label: '日期',
            minWidth: '150'
          }, {
            prop: 'name',
            label: '姓名',
            minWidth: '120'
          }, {
            prop: 'province',
            label: '省份',
            minWidth: '120'
          }, {
            prop: 'address',
            label: '地址',
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
          key: row.key,
          value: row.state === '开' ? 0 : 1,
        };
        this.loadingTable = true;
        this.$api.post('/setState', params).then(res => {
          if (res) {
            row.state = row.state === 1 ? 0 : 1;
            this.$message.success('操作成功')
          }
        }).catch(e => {
          console.log(e)
        }).finally(()=>{
          this.loadingTable = false;
        })

      },
      // 查看详情
      queryDetail(row) {
        this.detailDialogVisible = true;

        const params = {
          id: row.id,
          sn: row.sn,
        };
        this.loadingDetail = true;
        this.$api.post('/listDetail', params).then(res => {
          if (res) {
            this.detailObj = row;
          }
        }).catch(e => {
          console.log(e)
        }).finally(()=>{
          this.loadingDetail = false;
        })
      },
      getList() {
        this.loadingTable = true;
        const params = {
          ...this.tableFilterObj,
          filter1: '',
          page: this.pageObj.currentPage,
          pageSize: this.pageObj.pageSize,
        };
        this.$api.get('/getList', params).then(res => {
          if (res && res.list) {
            this.tableData = res.list;
            this.pageObj.total = res.total;
          }
        }).catch(e => {
          console.log(e)
        }).finally(()=>{
          this.loadingTable = false;
        })
      },
    },
    components: {page}
  }
</script>

<style scoped lang="scss">
  .index-container {
  }
</style>

