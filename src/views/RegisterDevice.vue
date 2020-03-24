<template>
  <div class="countentWorpReg">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/Facility' }">我的设备</el-breadcrumb-item>
          <el-breadcrumb-item>注册设备</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="deviceType"
          label="网关类型">
        </el-table-column>
        <el-table-column
          prop="id"
          label="网关 id">
        </el-table-column>
        <el-table-column
          prop="manufacturerId"
          label="厂商id">
        </el-table-column>
        <el-table-column
          prop="manufacturerName"
          label="厂商名称">
        </el-table-column>
        <el-table-column
          prop="model"
          label="型号">
        </el-table-column>
        <el-table-column
          prop="protocolType"
          label="协议类型">
        </el-table-column>
        <el-table-column
          prop="location"
          label="位置">
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">注册</el-button>

            <el-dialog class="xiugaiBox" title="注册设备" :visible.sync="editFormVisible">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
                <el-form-item label="设备名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="mac">
                  <el-input v-model="ruleForm.mac"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="handleDelete()">注册</el-button>
                </el-form-item>
              </el-form>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
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
      ruleForm:{name:'',mac:''},
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        deviceType: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      jSform:{sysType:'',pId:'',description:''},
      items:[],
      items2:[],
      editFormVisible:false,
      row:{},
    }
  },
  mounted () {
    this.getData();
  },
  methods:{
    // 数据渲染列表
    async getData () {
      const res = await this.$http.get(`/hw/zd/agent`, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data);
      if (data.status === '200') {
        this.tableData = data.data;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    async handleEdit (index, row) {
			this.editFormVisible = true;
      this.row = row
		},
    async handleDelete(){
      if (this.ruleForm.name == '') {
        this.$message({
          message: '请输入设备名称',
          type: 'error'
        })
      } else if (this.ruleForm.mac == '') {
        this.$message({
          message: '请输入验证码',
          type: 'error'
        })
      } else {
        var json = {
          name:this.ruleForm.name,
          form:this.row
        }
        const res = await this.$http.post(`/hw/${this.ruleForm.mac}/${this.$route.params.profile}`, json, {headers: {'Content-Type': 'application/json'}})
        // console.log(res)
        const data = res.data
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '注册成功!'
          });
          this.editFormVisible = false;
          this.getData();
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
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
  .countentWorpReg .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpReg .divActiveRight .shujuLog{
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
  /* .jSform{
    float: none;
    height: 100px;
  } */
</style>
