<template>
  <!--省市区级联-->
  <el-cascader class="area-cascader" ref="cascaderArea"
               :placeholder="placeholderTxt" size="mini" change-on-select
               :props="props" :options="areaData.options"
               v-model="areaData.selectedOptions" @change="areaChange">
  </el-cascader>
</template>

<script>

  export default {
    props: {
      placeholderTxt: {
        type: String,
        default(){
          return '选择省市区'
        }
      },
      // 省市区数据
      areaData: {
        type: Object,
        default(){
          return {
            options: [],
            selectedOptions: [],
          }
        }
      },
    },
    data() {
      return {
        props: {
          label: 'name',
          value: 'id',
          children: 'areas'
        }
      }
    },
    mounted() {
      this.getAreaList(0);
    },
    methods: {
      // 选择省市区
      areaChange(value) {
        // 获取区域得name
        this.getAreaName();
        // 获取选中区域得value
        this.areaData.selectedOptions = value;

        let areaData = this.areaData;
        return this.$api.post('/v1/standard/masterdata/admin/area/list', {parentId: value[value.length - 1]})
          .then(res => {
            let areas = res.areas;
            if (areas) {
              const areaId = areas[0].parentId;
              if (value.length === 1) {
                areas.forEach(item => {
                  item.areas = []
                });
                for (let item of areaData.options) {
                  if (areaId === item.id) {
                    item.areas = areas;
                    break
                  }
                }
              } else if (value.length === 2) {
                areaData.options.forEach(item1 => {
                  for (let item2 of item1.areas) {
                    if (item2.id === areaId) {
                      item2.areas = areas;
                      break
                    }
                  }
                });
              }
            }
            return Promise.resolve({success: 1})
          })
          .catch(() => {
          })
          .finally(() => {
          });
      },
      //  获取省市区
      getAreaList(parentId) {
        this.$api.post('/v1/standard/masterdata/admin/area/list', {parentId}).then(res => {
          let areas = res.areas;
          areas.forEach(item => {
            item.areas = [];
          });
          this.areaData.options = areas;
        }).catch(() => {
        }).finally(() => {
        })
      },

      // 获取省市区名称
      getAreaName(){
        return this.$refs['cascaderArea'].currentLabels || [];
      }
    }
  }
</script>

<style lang="scss">
  .area-cascader {
    width: 160px;
    height: 26px;

    .el-input {
      height: 26px;
    }
  }
</style>
