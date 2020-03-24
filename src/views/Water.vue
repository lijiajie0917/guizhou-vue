<template>
  <div class="countentWorpWat">
    <div class="divActive divActiveRight divWeater">
      <div class="caop">
        <div v-for="sensorItem in sensor" :key="sensorItem.index" :class="setClass(sensorItem.partition)">
          <p><span>{{sensorItem.partition}}</span>区水阀状态</p>
            <div class="wdNum">
              <el-switch
                v-model="sensorItem.status"
                active-value="1"
                inactive-value="0"
                active-text="关"
                inactive-text="开"
                @change="changSwitchSen(sensorItem.id,sensorItem.status)"
                >
              </el-switch>
            </div>
        </div>
      </div>
      <div class="hydrovalve">
        <ul class="waterValue">
          <li v-for="item3 in column" :key="item3.index" @click="columnMsg(item3.name,item3.key)">
            <img src="../assets/icon/iconList.png" alt="">{{item3.name}}
          </li>
        </ul>
      </div>
    </div>
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        水阀设备管理
        <el-form :model="form"  ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="按网关查看" class="leftmargin" prop="gatewayId">
              <el-select v-model="form.gatewayId">
                  <el-option v-for="item3 in items3" :key="item3.id" :label="item3.name" :value="item3.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="按区域查看" prop="typeId">
              <el-select v-model="form.typeId" @change="change2">
                  <el-option v-for="item2 in this.column" :key="item2.key" :label="item2.name" :value="item2.key"></el-option>
              </el-select>
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
        </el-table-column>
        <el-table-column
          prop="id"
          label="传感器 id">
        </el-table-column>
        <el-table-column
          prop="partition"
          label="所属区域"
          :formatter="formatter">
        </el-table-column>
        <el-table-column
          prop="status"
          label="当前状态"
          :formatter="formatter2">
        </el-table-column>
        <!-- <el-table-column
          label="传感器状态"
          prop="status"
          >
          <template slot-scope="scope">
            <div>
              <el-switch
                :disabled="scope.row.type=='3'?false:true"
                v-model="scope.row.status"
                active-value="1"
                inactive-value="0"
                active-text="开"
                inactive-text="关"
                @change="changSwitch(scope.row,scope.$index)"
                >
              </el-switch>
            </div>
          </template>
        </el-table-column > -->
      </el-table>
      <!-- <div class="block">
        <p class="demonstration">每页 5 条 记录 当前 <span class="pageDq">{{currentPage}}</span> 页 共 <span class="pageZ">{{gong}}</span> 页</p>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'
export default {
  data () {
    return {
      column:[
        {name : "A区水阀" , key : "A"},
        {name : "B区水阀" , key : "B"},
        {name : "C区水阀" , key : "C"},
        {name : "D区水阀" , key : "D"},
        {name : "E区水阀" , key : "E"},
        {name : "F区水阀" , key : "F"},
        {name : "G区水阀" , key : "G"},
        {name : "H区水阀" , key : "H"},
      ],
      columnPage:'A区水阀',
      currentPage:1,
      tableData: [],
      total:1,
      pageSize:5,
      Id:'',
      pId:'',
      gatewayId:'',
      gong:0,
      form:{typeId:'',gatewayId:''},
      items:[],
      items2:[],
      items3:[],
      sensor:[],
      sysType:3,
      projectId:2,
      type:3,
      partition:'',
      nodeId:'936203bb-e6a1-4b8f-8dbc-a7738fd31720',
    }
  },
  mounted () {
    this.gateway();
  },
  methods:{
    // handleCurrentChange: function(currentPage){
    //   this.currentPage = currentPage;
    //   this.getData(this.currentPage,this.pageSize,this.pId,this.gatewayId,this.typea,this.Id);
    // },
    // 网关下拉框
    async gateway () {
      const res3 = await this.$http.get(`/data/gateway/${this.projectId}/${this.type}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (data3.data.length == 0) {
        this.form.gatewayId = "无数据"
        this.items3 = [];
      } else {
        this.items3 = data3.data;
        var selectMsg3 = data3.data;
        this.gatewayId = selectMsg3[0].id;
        this.form.gatewayId = selectMsg3[0].name;
        this.form.typeId = this.column[0].name;
        this.area(this.gatewayId,this.partition);
      }
    },
    //区域列表
    async area (gatewayId,partition) {
      var json = Qs.stringify({
        partition: partition,
      })
      const res = await this.$http.post(`/data/statusNode/${this.sysType}/${gatewayId}`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      this.tableData = data.data
    },
    formatter(row) {
      return row.partition + " 区";
    },
    formatter2(row) {
      if (row.status == "0") {
        return "关"
      } else if (row.status == "1") {
        return "开"
      } else if (row.status == "2") {
        return "非水阀"
      } else if (row.status == "3") {
        return "损坏"
      }
    },
    // 修改传感器状态
    // async changSwitch (b,index) {
    //   if (localStorage.access == 2) {
    //     this.$alert('您没有权限执行该操作', '提示', {
    //       confirmButtonText: '确定',
    //     });
    //   } else {
    //     const res = await this.$http.post(`/sensor/${b.agentid}/${b.id}/${b.status}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    //     const data = res.data
    //     if (data.status === '200') {
    //       this.$message({
    //         type: 'success',
    //         message: data.msg
    //       });
    //       this.getData(this.currentPage,this.pageSize,this.pId);
    //     } else if (data.status === '500') {
    //       // 如果登录出现500的错误，弹出弹窗提示错误信息
    //       this.$message({
    //         message: data.msg,
    //         type: 'error'
    //       })
    //       this.getData(this.currentPage,this.pageSize,this.pId);
    //     }
    //   }
    // },
    // 区域修改传感器状态
    async changSwitchSen (id,status) {
      const res = await this.$http.post(`/sensor/${this.nodeId}/${id}/${status}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data);
      if (data.status === '200') {
        this.$message({
          type: 'success',
          message: data.msg
        });
        this.gateway();
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
        this.gateway();
        this.columnMsg();
      } else if (data.status === '005001') {
        this.$message({
          message: data.msg,
          type: 'error'
        })
        this.gateway();
        this.columnMsg();
      }
    },
    // change3:function(){
    //   this.gatewayId = this.form.gatewayId
    //   this.currentPage = 1;
    //   this.deviceId(this.gatewayId,this.typea);
    // },
    change2:function(){
      this.partition = this.form.typeId
      this.area(this.gatewayId,this.partition);
    },
    setClass(key) {
      let obj = {alertPop: true}
      obj[`alert${key}`] = true
      return obj
    },
    async columnMsg (name,key) {
      // console.log(key);
      var json = Qs.stringify({
        partition: key
      })
      const res = await this.$http.post(`/data/statusNode/${this.sysType}/${this.nodeId}`, json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data.data);
      if (data.status === '200') {
        // this.columnPage = name;
        this.sensor = data.data;
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
  .countentWorpWat .divActiveRight{
    width: 100%;
    float: right;
    height: 419px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
    margin-bottom: 16px;
  }
  .countentWorpWat .divWeater{
    height: 365px;
    display: flex;
  }
  .countentWorpWat .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
  }
  .el-form{
    border-top: 1px solid #dde3ff;
    margin-top: 16px;
  }
  .el-form-item{
    float: left;
    margin-top: 15px;
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
  .divActiveRight .caop{
    width: 910px;
    height: 256px;
    background-image: url("../assets/icon/b447b084c2bda20170418e2c11d6744.png");
    margin-top: 45px;
    float: left;
    margin-left: 12%;
    flex: 2;
    background-size: 100% 100%;
    margin-right: 13%;
  }
  .hydrovalve{
    float: right;
    min-width: 240px;
  }
  .waterValue{
    padding-left: 34px;
    list-style: none;
    font-size: 14px;
    color: #666666;
    padding-right: 95px;
    padding-left: 64px;
    border-left: 0.018519rem dashed #dde3ff;
    margin-top: 27px;
  }
  .waterValue li{
    margin-bottom: 18px;
    cursor: pointer;
  }
  .waterValue li img{
    margin: 7px 21px 0 0;
  }
  .caop .alertPop{
    width: 122px;
    height: 78px;
    background-image: url("../assets/icon/alert.png");
    padding-top: 23px;
    float: left;
  }
  .alertPop p{
    text-align: center;
  }
  .caop .alertA{
    margin-left: 10px;
    margin-top: 32px;
  }
  .caop .alertB{
    margin-top: 115px;
    margin-left: 250px;
  }
  .wdNum{
    text-align: center;
    margin-top: 10px;
  }
</style>
