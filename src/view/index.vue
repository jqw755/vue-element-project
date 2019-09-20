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
            <el-button type="primary" class="" @click="">查询</el-button>
            <el-button type="info" class=" " @click="resetFilterForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </section>

    <!--数据表格-->
    <el-table :data="tableData" border>

      <el-table-column v-for="(item,index) in tableCols" :key="index" :prop="item.prop" :label="item.label"
                       :minWidth="item.minWidth" show-overflow-tooltip></el-table-column>

      <el-table-column prop="status" label="状态" width="120" align="center">
        <template slot-scope="scope">
          <el-switch :value="scope.row.status===1" @change="changeStatus(scope.row)"></el-switch>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--详情dialog-->
    <el-dialog title="详情" :visible.sync="detailDialogVisible" width="50%">
      <el-form :model="detailObj" label-width="80px">
        <el-form-item label="设备Id">{{detailObj.deviceId}}</el-form-item>
        <el-form-item label="设备名称">{{detailObj.deviceName}}</el-form-item>
        <el-form-item label="设备状态">{{detailObj.deviceStatusDesc}}</el-form-item>
        <el-form-item label="日期">{{detailObj.date}}</el-form-item>
        <el-form-item label="姓名">{{detailObj.name}}</el-form-item>
        <el-form-item label="省份">{{detailObj.province}}</el-form-item>
        <el-form-item label="地址">{{detailObj.address}}</el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    data() {
      return {
        tableFilterObj: {
          deviceId: '',
        },
        tableData: [
          {
            deviceId: '1002564',
            deviceName: 'device007',
            deviceStatusDesc: '离线',
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 0
          },
          {
            deviceId: '1002565',
            deviceName: 'device008',
            deviceStatusDesc: '在线',
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 1
          }],
        tableCols: [
          {
            prop: 'deviceId',
            label: '设备Id',
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
        detailDialogVisible: false,
        detailObj: {}
      };
    },
    methods: {
      // 重置筛选表单
      resetFilterForm() {
        this.$refs.tableFilterObj.resetFields();
        // this.pageObj.currentPage = 1;
        // this.pageObj.pageSize = 10;
        // this.getList();
      },

      changeStatus(row) {
        row.status = row.status === 1 ? 0 : 1;
      },
      handleClick(row) {
        this.detailDialogVisible = true;
        this.detailObj = row;
      }
    }
  }
</script>

<style scoped lang="scss">
  .index-container {
  }
</style>

