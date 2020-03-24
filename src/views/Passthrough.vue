<template>
  <div class="countentWorpPas">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        数据透传系统
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="nameId">
            <el-input placeholder="请输入网关id" v-model="form.nameId">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
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
          prop="gatewayId"
          label="网关id">
        </el-table-column>
        <el-table-column
          prop="data"
          label="透传信息">
        </el-table-column>
        <el-table-column
          prop="gatherTime"
          label="时间">
        </el-table-column>
      </el-table>
      <div class="block">
        <p class="demonstration">每页 10 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
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
      pageSize:10,
      Id:'',
      pId:'',
      id:'',
      gong:0,
      typea:'soil',
      form:{typeId:'',nameId:''},
      jSform:{sysType:'',pId:'',description:''},
      items:[],
      items2:[],
    }
  },
  mounted () {
    this.getData(this.currentPage,this.pageSize,this.gatewayId);
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.gatewayId);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,gatewayId) {
      const res = await this.$http.get(`/data/transfer`,{params: {gatewayId:gatewayId,nowpage: currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      if (data.status === '200') {
        this.total = data.data.total
        var g = data.data.total;
        if (g <= 10) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 10);
          this.gong =  gs;
        }
        this.tableData = data.data.rows;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 角色搜索
    search:function () {
      this.gatewayId = this.form.nameId;
      this.getData(this.currentPage,this.pageSize,this.gatewayId);
    },
  }
}
</script>
<style scoped>
  .countentWorpPas .divActiveRight{
    width: 100%;
    float: right;
    /* height: 419px; */
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpPas .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .countentWorpPas .divActiveRight .shujuLog .el-form{
    float: right;
    height: 50px;
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
  /* .jSform{
    float: none;
    height: 100px;
  } */
</style>
