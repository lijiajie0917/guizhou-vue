<template>
  <div class="countentWorpJur">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        权限管理
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="nameId">
            <el-input placeholder="请输入角色名称" v-model="form.nameId">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="dialogVisible = true">添加角色</el-button>
            <el-dialog
              title="添加角色"
              :visible.sync="dialogVisible"
              width="30%">
              <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="用户角色" prop="sysType">
                  <el-select v-model="jSform.sysType" placeholder="请选择用户角色">
                    <el-option label="系统管理员" value="0"></el-option>
                    <el-option label="项目管理员" value="1"></el-option>
                    <el-option label="二级管理员" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="所属项目" prop="pId">
                    <el-select v-model="jSform.pId" placeholder="请选择所属项目">
                        <el-option v-for="item in items" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="权限内容" prop="description">
                  <el-input v-model="jSform.description" placeholder="请输入权限内容"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="equipmentAdd">添 加</el-button>
              </span>
            </el-dialog>
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
          prop="username"
          label="用户ID">
        </el-table-column>
        <el-table-column
          prop="pName"
          label="归属项目">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="用户角色">
        </el-table-column>
        <el-table-column
          prop="description"
          label="权限">
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <!-- <el-button type="text">授权</el-button> -->
            <el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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
      pId:'',
      id:'',
      gong:0,
      typea:'soil',
      form:{typeId:'',nameId:''},
      jSform:{sysType:'',pId:'',description:''},
      items:[],
      items2:[],
      dialogVisible: false,
    }
  },
  mounted () {
    this.getData(this.currentPage,this.pageSize,this.name);
    this.project();
  },
  methods:{
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.getData(this.currentPage,this.pageSize,this.name);
    },
    // 所属项目下拉框列表
    async project () {
      const res2 = await this.$http.get(`/data/project`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data2 = res2.data
      this.items = data2.data;
    },
    // 数据渲染列表
    async getData (currentPage,pageSize,name) {
      const res = await this.$http.get(`/role`,{params: {name:name,nowpage: currentPage,pagesize:pageSize}}, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      if (data.status === '200') {
        this.total = data.data.total
        var g = data.data.total;
        if (g <= 5) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 5);
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
    // 增加项目
    async onSubmit () {

    },
    // 角色搜索
    search:function () {
      this.name = this.form.nameId;
      this.getData(this.currentPage,this.pageSize,this.name);
    },
    // 删除用户操作
    async handleDelete (scope) {
      this.id = scope.id
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        var json = Qs.stringify({
          _method: 'delete'
        })
        const res = await this.$http.post(`/role/${this.id}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '用户删除成功!'
          });
          this.getData(this.currentPage,this.pageSize,this.name);
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
      if (this.jSform.sysType == '') {
        this.$message({
          message: '请选择用户角色',
          type: 'error'
        })
      } else if (this.jSform.pId == '') {
        this.$message({
          message: '请选择所属项目',
          type: 'error'
        })
      } else if (this.jSform.description == '') {
        this.$message({
          message: '请输入权限内容',
          type: 'error'
        })
      } else {
        // 将对象序列化成URL的形式，以&进行拼接
        const jSform = Qs.stringify(this.jSform)
        const res = await this.$http.post(`/role`,jSform,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '角色添加成功!'
          });
          this.dialogVisible = false;
          this.getData(this.currentPage,this.pageSize,this.name);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
  }
}
</script>
<style scoped>
  .countentWorpJur .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpJur .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .countentWorpJur>.divActiveRight>.shujuLog>.el-form{
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
