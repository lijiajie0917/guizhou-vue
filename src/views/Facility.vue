<template>
  <div class="countentWorpFac">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        我的设备
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="按项目查询" prop="profile">
              <el-select v-model="form.profile" @change="change2">
                <el-option v-for="itemNode in nodes" :key="itemNode.id" :label="itemNode.description" :value="itemNode.profile"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按状态查询" prop="nameId">
              <el-select v-model="form.nameId" @change="change">
                <el-option label="ONLINE" value="ONLINE"></el-option>
                <el-option label="OFFLINE" value="OFFLINE"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
            <!-- <router-link v-show="falg" to="/RegisterDevice"> -->
              <el-button type="primary" v-show="falg" @click="RegistrationDevice()">注册设备</el-button>
            <!-- </router-link> -->
          </el-form-item>
        </el-form>
      </div>
      <div class="eventOff">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="deviceInfo.status"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.name"
            label="设备名称">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.manufacturerName"
            label="厂商名称">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.model"
            label="设备型号">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.deviceType"
            label="设备类型">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.manufacturerId"
            label="厂商id">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.nodeId"
            label="节点id">
          </el-table-column>
          <el-table-column
            prop="deviceInfo.protocolType"
            label="协议类型">
          </el-table-column>
          <el-table-column
            label="操作"
            >
            <template slot-scope="scope">
              <i class="el-icon-search" @click.stop="openDetails(scope.row)"></i>
              <i class="el-icon-edit" @click.stop="handleEdit(scope.row)"></i>

              <el-dialog class="xiugaiBox" title="配置设备" :visible.sync="editFormVisible">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm">
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
                  <el-form-item label="设备型号" prop="model">
                    <el-input v-model="ruleForm.model"></el-input>
                  </el-form-item>
                  <el-form-item label="协议类型" prop="protocolType">
                    <el-input v-model="ruleForm.protocolType"></el-input>
                  </el-form-item>
                  <el-form-item label="位置" prop="location">
                    <el-input v-model="ruleForm.location"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click.stop="submitForm()">确定</el-button>
                  </el-form-item>
                </el-form>
              </el-dialog>
              <i class="el-icon-delete" @click.stop="handleDelete(scope.row)"></i>
            </template>
          </el-table-column >
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
      tableData: [],
      total:1,
      pageSize:5,
      Id:'',
      id:'',
      pId:'',
      value: '0',
      gong:0,
      typea:'soil',
      form:{nameId:'',profile:''},
      jSform:{pId:'',id:''},
      items:[],
      items2:[],
      dialogVisible: false,
      editFormVisible:false,
      falg:true,
      access:'',
      deviceId:'',
      ruleForm:{name:'',manufacturerId:'',manufacturerName:'',deviceType:'',model:'',protocolType:'',location:''},
      rules: {
        name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' },
        ],
        manufacturerId: [
          { required: true, message: '请输入设备类型', trigger: 'blur' },
        ],
        manufacturerName: [
          { required: true, message: '请输入厂商ID', trigger: 'blur' },
        ],
        deviceType: [
          { required: true, message: '请输入厂商名称', trigger: 'blur' },
        ],
        model: [
          { required: true, message: '请输入设备型号', trigger: 'blur' },
        ],
        protocolType: [
          { required: true, message: '请输入协议类型', trigger: 'blur' },
        ],
        location: [
          { required: true, message: '请输入位置', trigger: 'blur' },
        ],
      },
      nodes:[],
    }
  },
  mounted () {
    this.profile();
  },
  created: function () {
    if (localStorage.access == 2) {
      this.falg = false;
    }
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.form.nameId,this.form.profile);
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,status,profile) {
      const res = await this.$http.get(`/hw/devices/${profile}`,{params: {status:status,pageNo: currentPage,pageSize:pageSize}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      if (data.status === '200') {
        this.total = data.data.totalCount
        var g = data.data.totalCount;
        if (g <= 5) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 5);
          this.gong =  gs;
        }
        var deviceInfo = data.data.devices;
        // console.log(deviceInfo);
        this.tableData = deviceInfo;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    async profile () {
      const res = await this.$http.get(`/hw/profile`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.nodes = data.data;
      this.form.profile = data.data[0].profile;
      this.form.nameId = "ONLINE";
      // console.log(data.data[0].profile);
      this.getData(this.currentPage,this.pageSize,this.form.nameId,data.data[0].profile);
    },
    // 修改按钮
    async handleEdit (row) {
			this.editFormVisible = true;
      this.deviceId = row.deviceId;
      this.ruleForm.name = row.deviceInfo.name;
      this.ruleForm.deviceType = row.deviceInfo.deviceType;
      this.ruleForm.manufacturerId = row.deviceInfo.manufacturerId;
      this.ruleForm.manufacturerName = row.deviceInfo.manufacturerName;
      this.ruleForm.model = row.deviceInfo.model;
      this.ruleForm.protocolType = row.deviceInfo.protocolType;
      this.ruleForm.location = row.deviceInfo.location;
		},
    // 确认修改
    async submitForm () {
      var json = Qs.stringify(this.ruleForm)
      const res = await this.$http.put(`/hw/${this.deviceId}/${this.form.profile}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      // console.log(res)
      const data = res.data
      if (res.status == "200") {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.editFormVisible = false;
        this.getData(this.currentPage,this.pageSize,this.form.nameId,this.form.profile);
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    // 删除设备操作
    async handleDelete (scope) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        var json = Qs.stringify({
          _method: 'delete'
        })
        const res = await this.$http.post(`/hw/${scope.deviceId}/${this.form.profile}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '用户删除成功!'
          });
          this.getData(this.currentPage,this.pageSize,this.form.nameId,this.form.profile);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 添加角色
    async equipmentAdd(){
      if (this.jSform.pId == '') {
        this.$message({
          message: '请选择所属项目',
          type: 'error'
        })
      } else if (this.jSform.id == '') {
        this.$message({
          message: '请输入设备ID',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        // const jSform = Qs.stringify(this.jSform)
        const res = await this.$http.post(`/agent/${this.jSform.pId}/${this.jSform.id}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '设备添加成功!'
          });
          this.dialogVisible = false;
          this.getData(this.currentPage,this.pageSize,this.pId);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    change:function(){
      this.getData(this.currentPage,this.pageSize,this.form.nameId,this.form.profile);
    },
    change2:function () {
      this.getData(this.currentPage,this.pageSize,this.form.nameId,this.form.profile);
    },
    openDetails (row) {
      // console.log(row);
      this.$router.push({
        path: `/Deviceidinfo/${row.deviceId}/${this.form.profile}`,
      })
    },
    RegistrationDevice () {
      this.$router.push({
        path: `/RegisterDevice/${this.form.profile}`,
      })
    },
  }
}
</script>
<style scoped>
  .countentWorpFac .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpFac .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  /* .shujuLog .el-form{
    float: right;
    height: 50px;
  } */
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
  .countentWorpFac>.divActiveRight>.shujuLog>.el-form{
    float: right;
  }
  /* .jSform{
    float: none;
    height: 100px;
  } */
</style>
