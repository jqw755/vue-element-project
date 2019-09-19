<template>
  <div class="index-container">
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
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 0
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 1
          }],
        tableCols: [
          {
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
