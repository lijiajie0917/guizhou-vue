<template>
  <div class="countentWorpDev">
    <div class="divActive divActiveRight divActiveActive">
      <div class="shujuLog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Facility' }">我的设备</el-breadcrumb-item>
          <el-breadcrumb-item>设备详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <template>
        <el-tabs v-model="activeName">
          <el-tab-pane label="设备详情" name="first">
            <el-form :model="ruleForm" ref="ruleForm" label-width="160px" class="demo-ruleForm">
              <el-form-item label="设备名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="设备类型" prop="deviceType">
                <el-input v-model="ruleForm.deviceType"></el-input>
              </el-form-item>
              <el-form-item label="厂商ID" prop="manufacturerId">
                <el-input v-model="ruleForm.manufacturerId"></el-input>
              </el-form-item>
              <el-form-item label="厂商名称" prop="manufacturerName">
                <el-input v-model="ruleForm.manufacturerName"></el-input>
              </el-form-item>
              <el-form-item label="位置" prop="location">
                <el-input v-model="ruleForm.location"></el-input>
              </el-form-item>
              <el-form-item label="协议类型" prop="protocolType">
                <el-input v-model="ruleForm.protocolType"></el-input>
              </el-form-item>
              <el-form-item label="验证码" prop="nodeId">
                <el-input v-model="ruleForm.nodeId"></el-input>
              </el-form-item>
              <el-form-item label="设备ID" prop="deviceId">
                <el-input v-model="ruleForm.deviceId"></el-input>
              </el-form-item>
              <el-form-item label="设备标识码" prop="nodeId">
                <el-input v-model="ruleForm.nodeId"></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="历史数据" name="second">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                type="index"
                label="序号"
                width="100">
                <template slot-scope="scope">
                  {{ scope.$index + (currentPage - 1) * pageSize + 1}}
                </template>
              </el-table-column>
              <el-table-column
                prop="serviceId"
                label="服务">
              </el-table-column>
              <el-table-column
                prop="data"
                min-width="200%"
                label="数据详情">
              </el-table-column>
              <el-table-column
                prop="timestamp"
                label="时间">
              </el-table-column>
            </el-table>
            <div class="block">
              <p class="demonstration">每页 5 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                background
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'
export default {
  data () {
    return {
      currentPage:1,
      gatewayId:'',
      tableData: [],
      total:1,
      pageSize:5,
      Id:'',
      pId:'',
      id:'',
      gong:0,
      typea:'soil',
      form:{typeId:'',nameId:''},
      ruleForm:{name:'',deviceType:'',manufacturerId:'',manufacturerName:'',location:'',protocolType:'',nodeId:'',deviceId:''},
      jSform:{sysType:'',pId:'',description:''},
      items:[],
      items2:[],
      editFormVisible:false,
      row:{},
      activeName: 'first',
    }
  },
  mounted () {
    this.getData();
    this.getData2(this.currentPage,this.pageSize);
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData2(this.currentPage,this.pageSize);
    },
    // 数据渲染列表
    async getData () {
      // console.log(this.$route.params.profile);
      const res = await this.$http.get(`/hw/${this.$route.params.deviceId}/${this.$route.params.profile}`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data);
      if (data.status === '200') {
        this.ruleForm.name = data.data.deviceInfo.name;
        this.ruleForm.manufacturerId = data.data.deviceInfo.manufacturerId;
        this.ruleForm.deviceType = data.data.deviceInfo.deviceType;
        this.ruleForm.manufacturerName = data.data.deviceInfo.manufacturerName;
        this.ruleForm.location = data.data.deviceInfo.location;
        this.ruleForm.protocolType = data.data.deviceInfo.protocolType;
        this.ruleForm.nodeId = data.data.deviceInfo.nodeId;
        this.ruleForm.deviceId = data.data.deviceId;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    async getData2 (currentPage,pageSize) {
      const res = await this.$http.get(`/hw/data/${this.$route.params.deviceId}/${this.$route.params.profile}`,{params: {pageNo: currentPage,pageSize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data);
      if (data.status === '200') {
        this.total = data.data.totalCount
        var g = data.data.totalCount;
        if (g <= 5) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 5);
          this.gong =  gs;
        }
        this.tableData = data.data.deviceDataHistoryDTOs;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
  }
}
</script>
<style scoped>
  .countentWorpDev .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpDev .divActiveActive{
    height: 600px;
  }
  .countentWorpDev .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .el-form-item{
    float: left;
  }
  .el-input__inner{
    height: 31px!important;
    line-height: 31px!important;
  }
  .el-table thead{
    background: #F5F6FA;
  }
  .el-pagination{
    float: right;
    margin: 24px -10px 0 0;
  }
  .demonstration{
    float: left;
    margin-top: 32px;
  }
  .el-form-item__content{
    margin-left: 10px
  }
</style>
