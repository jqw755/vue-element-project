<template>
  <span></span>
</template>
<script>
  export default {
    props: {
      needInitData: {
        type: Array,
        required: true
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.needInitData.forEach(item => {
        this[item]();
      })
    },
    methods: {
      // 获取接口状态
      getConnectorState() {
        this.$api.post('/v1/standard/masterdata/admin/equipment/status').then(res => {
          this.$emit('getConnectorState', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取站点类型
      getSiteType() {
        this.$api.post('/v1/standard/masterdata/admin/station/types').then(res => {
          this.$emit('getSiteType', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取站点状态
      getSiteStatus() {
        this.$api.post('/v1/standard/masterdata/admin/station/status').then(res => {
          this.$emit('getSiteStatus', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取站点审核状态
      getSiteAudit() {
        this.$api.post('/v1/standard/masterdata/admin/station/auditStatus').then(res => {
          this.$emit('getSiteAudit', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取站点建设场地
      getSiteConstruction() {
        this.$api.post('/v1/standard/masterdata/admin/station/constructions').then(res => {
          this.$emit('getSiteConstruction', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取数据使用方名称
      getEmpList() {
        this.$api.post('/v1/standard/masterdata/admin/emp/list').then(res => {
          this.$emit('getEmpList', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取数据来源方名称
      getCpoList() {
        this.$api.post('/v1/standard/masterdata/admin/company/listForSelect').then(res => {
          this.$emit('getCpoList', res.companies || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取对接协议
      getConfigType() {
        this.$api.post('/v1/standard/masterdata/admin/connect/configType').then(res => {
          this.$emit('getConfigType', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      //  获取对接类型
      getType() {
        this.$api.post('/v1/standard/masterdata/admin/connect/type').then(res => {
          this.$emit('getType', res.list || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      // 获取订单状态
      getOrderState() {
        this.$api.post('/v1/operation/admin/order/getEnumList', {type: 1}).then(res => {
          this.$emit('getOrderState', res || [])
        }).catch(e => {
        }).finally(() => {
        })
      },
      // 获取订单类型
      getOrderType() {
        this.$api.post("/v1/enterprise/administration/enterpriseOrderType").then(res => {
          this.$emit('getOrderType', res.list || [])
        }).catch(e => {
        }).finally(() => {
        });
      },
      // 获取终端类型
      getClientType() {
        this.$api.post('/v1/operation/admin/order/getEnumList', {type: 2}).then(res => {
          this.$emit('getClientType', res || [])
        }).catch(e => {
        }).finally(() => {
        })
      },

    }
  }
</script>

<style lang="scss">

</style>
