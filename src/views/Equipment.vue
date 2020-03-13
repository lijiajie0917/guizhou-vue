<template>
  <div class="countentWorpEqu">
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <el-form :model="form"  ref="form" class="demo-ruleForm">
          <el-form-item prop="county">
              <el-select v-model="form.county" @change="change">
                  <el-option v-for="item in items" :key="item.county" :label="item.county" :value="item.county"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="area">
              <el-select v-model="form.area" @change="change1">
                  <el-option v-for="item1 in items1" :key="item1.area" :label="item1.area" :value="item1.area"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="greenhouse">
              <el-select v-model="form.greenhouse" @change="change2">
                  <el-option v-for="item2 in items2" :key="item2.greenhouse" :label="item2.greenhouse" :value="item2.greenhouseId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item prop="greenhouseId">
              <el-select v-model="form.getewayhouseId" @change="change3($event,items3)">
                  <el-option v-for="item3 in items3" :key="item3.nodeId" :label="item3.nodeId" :value="item3.nodeId"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="batchWrap">
        <div class="batchOpen batchBtn">
          批量开启
        </div>
        <div class="batchClose batchBtn">
          批量关闭
        </div>
        <div class="btnBox">
          <span class="btnLabel">新增：</span>
          <el-button type="primary" plain round v-show="falg" @click="dialogVisible = true">新增片区</el-button>
          <el-dialog
            title="新增片区"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :model="jSform" ref="form" label-width="100px" class="jSform demo-ruleForm">
              <el-form-item label="所属区域：" prop="county">
                  <el-select v-model="jSform.county" placeholder="请选择所属项目">
                      <el-option v-for="item in jsItems" :key="item.county" :label="item.county" :value="item.county"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="新增片区：" prop="area">
                <el-input v-model="jSform.area" placeholder="请输入设备ID"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="equipmentAdd">提 交</el-button>
            </span>
          </el-dialog>
          <el-button type="primary" plain round v-show="falg" @click="dialogVisibleHoues = true">新增大棚</el-button>
          <el-dialog
            title="新增大棚"
            :visible.sync="dialogVisibleHoues"
            width="30%">
            <el-form :model="jSform2" ref="form" label-width="100px" class="jSform demo-ruleForm">
              <el-form-item label="所属区域：" prop="county">
                  <el-select v-model="jSform2.county" @change="change4" placeholder="请选择所属项目">
                      <el-option v-for="item1 in jsItems1" :key="item1.county" :label="item1.county" :value="item1.county"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择片区：" prop="area">
                  <el-select v-model="jSform2.area" placeholder="请选择所属项目">
                      <el-option v-for="item2 in jsItems2" :key="item2.area" :label="item2.area" :value="item2.area"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="新增大棚：" prop="greenhouse">
                <el-input v-model="jSform2.greenhouse" placeholder="请输入大棚号"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input type="textarea" v-model="jSform2.comment"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleHoues = false">取 消</el-button>
              <el-button type="primary" @click="equipmentAdd2">提 交</el-button>
            </span>
          </el-dialog>
          <el-button type="primary" plain round v-show="falg" @click="dialogVisibleEqu = true">新增设备</el-button>
          <el-dialog
            title="新增设备"
            :visible.sync="dialogVisibleEqu"
            width="30%">
            <el-form :model="jSform3" ref="form" label-width="100px" class="jSform demo-ruleForm">
              <el-form-item label="所属区域：" prop="county">
                  <el-select v-model="jSform3.county" @change="change5" placeholder="请选择所属项目">
                      <el-option v-for="item in jsItems3" :key="item.county" :label="item.county" :value="item.county"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择片区：" prop="area">
                  <el-select v-model="jSform3.area" @change="change6" placeholder="请选择所属项目">
                      <el-option v-for="item in jsItems4" :key="item.area" :label="item.area" :value="item.area"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="选择大棚：" prop="greenhouse">
                  <el-select v-model="jSform3.greenhouse" placeholder="请选择所属项目">
                      <el-option v-for="item in jsItems5" :key="item.greenhouse" :label="item.greenhouse" :value="item.greenhouseId"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="设备类型：" prop="getewayId">
                  <el-select v-model="jSform3.getewayId" @change="change9" placeholder="请选择设备类型">
                      <el-option v-for="item in jsItems6" :key="item.typeName" :label="item.typeName" :value="item.typeName"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="设备ID：" prop="equipmentId">
                <el-select v-model="jSform3.equipmentId" placeholder="请选择设备类型">
                    <el-option v-for="item in jsItemsId" :key="item.nodeId" :label="item.nodeId" :value="item.localId"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisibleEqu = false">取 消</el-button>
              <el-button type="primary" @click="equipmentAdd3">提 交</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="100">
          <template slot-scope="scope">
            {{ scope.$index + (currentPage - 1) * pageSize + 1}}
          </template>
        </el-table-column>
        <el-table-column
          prop="county"
          label="区域">
        </el-table-column>
        <el-table-column
          prop="area"
          label="片区">
        </el-table-column>
        <el-table-column
          prop="greenhouse"
          label="棚号">
        </el-table-column>
        <el-table-column
          prop="typeName"
          label="设备种类">
        </el-table-column>
        <el-table-column
          prop="nodeId"
          label="设备 ID">
        </el-table-column>
        <el-table-column
          prop="STATUS"
          label="设备状态">
        </el-table-column>
        <el-table-column
          prop="localId"
          label="localId">
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
            <el-dialog
              title="修改设备"
              :visible.sync="editFormVisible"
              width="30%">
              <el-form :model="jSform4" ref="form" label-width="100px" class="jSform demo-ruleForm">
                <el-form-item label="所属区域：" prop="county">
                    <el-select v-model="jSform4.county" @change="change7" placeholder="请选择所属项目">
                        <el-option v-for="item in jsItems7" :key="item.county" :label="item.county" :value="item.county"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择片区：" prop="area">
                    <el-select v-model="jSform4.area" @change="change8" placeholder="请选择所属项目">
                        <el-option v-for="item in jsItems8" :key="item.area" :label="item.area" :value="item.area"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择大棚：" prop="greenhouse">
                    <el-select v-model="jSform4.greenhouse" placeholder="请选择所属项目">
                        <el-option v-for="item in jsItems9" :key="item.greenhouse" :label="item.greenhouse" :value="item.greenhouseId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备类型：" prop="getewayId">
                  <el-input v-model="jSform4.getewayId" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="设备ID：" prop="equipmentId">
                  <el-input v-model="jSform4.equipmentId" :disabled="true"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="equipmentAddxg(scope.row)">确认修改</el-button>
              </span>
            </el-dialog>
            <el-button type="text" @click="handleDelete(scope.row.groupId)">删除</el-button>
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
      cgtableData:[],
      total:1,
      pageSize:5,
      Id:'',
      id:'',
      pId:'',
      value: '0',
      gong:0,
      projectId:7,
      typea:'soil',
      form:{county:'',area:'',greenhouse:'',getewayhouseId:''},
      jSform:{county:'',area:''},
      jSform2:{county:'',area:'',greenhouse:'',comment:''},
      jSform3:{county:'',area:'',greenhouse:'',getewayId:'',equipmentId:''},
      jSform4:{county:'',area:'',greenhouse:'',getewayId:'',equipmentId:''},
      items:[],
      items1:[],
      items2:[],
      items3:[],
      jsItems:[],
      jsItems1:[],
      jsItems2:[],
      jsItems3:[],
      jsItems4:[],
      jsItems5:[],
      jsItems6:[],
      jsItemsId:[],
      jsItems7:[],
      jsItems8:[],
      jsItems9:[],
      dialogVisible: false,
      dialogVisibleHoues:false,
      dialogVisibleEqu:false,
      editFormVisible:false,
      falg:true,
      access:'',
      active: 0,
      multipleSelection: [],
      level:'greenhouse',
      level2:'area',
      nodeId:'',
      aabb:false,
      ccdd:false,
    }
  },
  mounted () {
    this.area();
    this.countys();
    this.unbind();
  },
  created: function () {
    if (localStorage.access == 2) {
      this.falg = false;
    }
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.sensorInfo(this.currentPage,this.pageSize,this.form.county,this.form.area,this.form.greenhouse,this.nodeId,this.form.getewayhouseId);
    },
    // 所属项目下拉框列表
    async area (currentPage,pageSize,county,area,greenhouseId) {
      const res3 = await this.$http.get(`/group/cascade/${this.projectId}`,{params: {county:county,area:area,greenhouseId:greenhouseId}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (data3.status === '200') {
        var array = data3.data;
        var arr = data3.data.value;
        if (array.level == "county") {
          this.items = arr;
          this.form.county = '全部';
          this.items1 = arr[0].area;
          // this.form.area = arr[0].area[0].area;
          this.form.area = '全部';
          this.items2 = arr[0].area[0].greenhouse;
          // this.form.greenhouse = arr[0].area[0].greenhuose[0].greenhouseId;
          this.form.greenhouse = '全部';
          if (arr[0].area[0].greenhouse[0].node.length == 0) {
            this.form.getewayhouseId = "";
            this.nodeId = "";
            this.items3 = [];
          } else {
            this.items3 = arr[0].area[0].greenhouse[0].node;
            // this.form.getewayhouseId = arr[0].area[0].greenhuose[0].node[0].gatewayId;
            this.form.getewayhouseId = '全部';
            this.nodeId = arr[0].area[0].greenhouse[0].node[0].gatewayId;
          }
          this.sensorInfo(this.currentPage,this.pageSize,'','','','','');
        } else if (array.level == "area") {
          var arr1 = array.value
          this.items1 = arr1;
          this.form.area = this.items1[0].area;
          this.items2 = this.items1[0].greenhouse;
          this.form.greenhouse = this.items1[0].greenhouse[0].greenhouseId;
          if (this.items1[0].greenhouse[0].node.length == 0) {
            this.form.getewayhouseId = "";
            this.nodeId = "";
            this.items3 = [];
          } else {
            this.items3 = this.items1[0].greenhouse[0].node;
            this.form.getewayhouseId = this.items1[0].greenhouse[0].node[0].nodeId;
            this.nodeId = this.items1[0].greenhouse[0].node[0].gatewayId;
          }
          this.sensorInfo(this.currentPage,this.pageSize,county,this.form.area,this.form.greenhouse,this.nodeId,this.form.getewayhouseId);
        } else if (array.level == 'greenhouse') {
          var arr2 = array.value;
          this.items2 = arr2;
          this.form.greenhouse = arr2[0].greenhouseId;
          if (arr2[0].node.length == 0) {
            this.form.getewayhouseId = "";
            this.nodeId = "";
            this.items3 = [];
          } else {
            this.items3 = arr2[0].node;
            this.form.getewayhouseId = arr2[0].node[0].nodeId;
            this.nodeId = arr2[0].node[0].gatewayId;
          }
          this.sensorInfo(this.currentPage,this.pageSize,county,area,this.form.greenhouse,this.nodeId,this.form.getewayhouseId);
        } else if (array.level == 'nodeInfo') {
          var arr3 = array.value;
          if (arr3.length == 0) {
            this.form.getewayhouseId = "";
            this.nodeId = "";
            this.items3 = [];
          } else {
            this.items3 = arr3;
            this.nodeId = arr3[0].gatewayId;
            this.form.getewayhouseId = arr3[0].nodeId;
          }
          this.sensorInfo(this.currentPage,this.pageSize,county,area,greenhouseId,this.nodeId,this.form.getewayhouseId);
        }
      }
    },
    async greenhouse (county,area) {
      const res = await this.$http.get(`/group/greenhouse/${this.projectId}`,{params: {level:this.level,county:county,area:area}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.items2 = data.data;
    },
    async sensorInfo (currentPage,pageSize,county,area,greenhouseId,gatewayId,nodeId) {
      var json = Qs.stringify({
        county: county,
        area: area,
        greenhouseId:greenhouseId,
        gatewayId:gatewayId,
        nodeId:nodeId,
      })
      const res = await this.$http.post(`/group/sensorInfo/${this.projectId}`, json ,{params: {nowpage: currentPage,pagesize:pageSize}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data.rows);
      if (data.status === '200') {
        this.tableData = data.data.rows;
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
    // 数据渲染列表
    async getData (currentPage,pageSize,pId) {
      const res = await this.$http.get(`/agent/${pId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      console.log(data);
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
    async handleEdit (index, row) {
      this.aabb = true;
			this.editFormVisible = true;
      console.log(row);
      this.jSform4.getewayId = row.typeName;
      this.jSform4.equipmentId = row.nodeId;
      this.jSform4.county = row.county;
      this.jSform4.area = row.area;
      this.jSform4.greenhouse = row.groupId;
      this.areaWrap(this.jSform4.county);
      this.greenhouseWrap(this.jSform4.county,this.jSform4.area);
		},
    formatter(row, column) {
      if (row.type == "1") {
        return "气象站"
      } else if (row.type == "2") {
        return "土壤"
      } else if (row.type == "3") {
        return "水阀"
      }
    },
    // 修改传感器状态
    async changSwitch (b,index) {
      if (localStorage.access == 2) {
        this.$alert('您没有权限执行该操作', '提示', {
          confirmButtonText: '确定',
        });
      } else {
        const res = await this.$http.post(`/sensor/${b.agentId}/${b.id}/${b.status}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        const data = res.data
        // console.log(data);
      }
    },
    // 删除设备操作
    async handleDelete (gorupId) {
      this.$confirm('确定删除该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        var json = Qs.stringify({
          _method: 'delete'
        })
        const res = await this.$http.post(`/group/${gorupId}`, json, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        if (res.status == "200") {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.area();
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新增片区
    async equipmentAdd(){
      if (this.jSform.area == '') {
        this.$message({
          message: '请选择所属项目',
          type: 'error'
        })
      } else {
        var json = Qs.stringify({
          county: this.jSform.county,
          area: this.jSform.area,
        })
        const res = await this.$http.post(`/group/area/${this.projectId}`,json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '片区添加成功!'
          });
          this.dialogVisible = false;
          // this.getData(this.currentPage,this.pageSize,this.pId);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    // 新增大棚
    async equipmentAdd2(){
      if (this.jSform2.greenhouse == '') {
        this.$message({
          message: '请输入大棚号',
          type: 'error'
        })
      } else if (this.jSform2.comment == '') {
        this.$message({
          message: '请输入备注',
          type: 'error'
        })
      } else {
        var json = Qs.stringify({
          county: this.jSform2.county,
          area: this.jSform2.area,
          greenhouse:this.jSform2.greenhouse,
          comment:this.jSform2.comment,
        })
        const res = await this.$http.post(`/group/greenhouse/${this.projectId}`,json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '大棚添加成功!'
          });
          this.dialogVisible = false;
          this.area();
          // this.getData(this.currentPage,this.pageSize,this.pId);
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
      }
    },
    // 新增设备
    async equipmentAdd3(){
        var json = Qs.stringify({
          greenhouseId:this.jSform3.greenhouse,
          typeName: this.jSform3.getewayId,
          localId: this.jSform3.equipmentId,
        })
        const res = await this.$http.post(`/group/device`,json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        const data = res.data
        if (data.status == "200") {
          this.$message({
            type: 'success',
            message: '设备添加成功!'
          });
          this.dialogVisibleEqu = false;
          this.area();
        } else if (data.status === '500') {
          // 如果登录出现500的错误，弹出弹窗提示错误信息
          this.$message({
            message: data.msg,
            type: 'error'
          })
        }
    },
    // 确认修改
    async equipmentAddxg(row){
      var json = Qs.stringify({
        greenhouseId:this.jSform4.greenhouse,
      })
      const res = await this.$http.put(`/group/${row.groupId}`,json,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      // console.log(res)
      const data = res.data
      if (data.status == "200") {
        this.$message({
          type: 'success',
          message: '修改成功!'
        });
        this.dialogVisible = false;
        this.area();
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    //区域下拉框
    change:function(val){
      // console.log(val);
      this.area(this.currentPage,this.pageSize,val);
    },
    //区号下拉框
    change1:function(){
      this.area(this.currentPage,this.pageSize,this.form.county,this.form.area);
    },
    //大棚下拉框
    change2:function(){
      this.area(this.currentPage,this.pageSize,this.form.county,this.form.area,this.form.greenhouse);
    },
    //设备下拉框
    change3:function(val,gatewayId){
      // console.log(val);
      // console.log(gatewayId[0].gatewayId);
      this.sensorInfo(this.currentPage,this.pageSize,this.form.county,this.form.area,this.form.greenhouse,gatewayId[0].gatewayId,this.form.getewayhouseId);
    },
    // 新增大棚区域下拉框
    async change4 () {
      this.areaWrap(this.jSform2.county);
    },
    // 新增设备区域下拉框
    async change5 () {
      this.areaWrap(this.jSform3.county);
    },
    // 新增设备片区下拉框
    async change6() {
      this.greenhouseWrap(this.jSform3.county,this.jSform3.area);
    },
    async change7() {
      this.areaWrap(this.jSform4.county);
    },
    async change8() {
      this.greenhouseWrap(this.jSform4.county,this.jSform4.area);
    },
    // 获取新增片区区域下拉框
    async countys() {
      const res3 = await this.$http.get(`/group/countys/${this.projectId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      this.jsItems = data3.data;
      this.jsItems1 = data3.data;
      this.jsItems3 = data3.data;
      this.jsItems7 = data3.data;
      this.jSform.county = data3.data[0].county;
      this.jSform2.county = data3.data[0].county;
      this.jSform3.county = data3.data[0].county;
      this.areaWrap(this.jSform.county);
    },
    // 获取新增大棚下拉框
    async areaWrap(county) {
      const res3 = await this.$http.get(`/group/cascade/${this.projectId}`,{params: {county:county}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (this.aabb == true) {
        this.jsItems8 = data3.data.value;
        this.jSform4.area = data3.data.value[0].area;
        this.greenhouseWrap(this.jSform4.county,this.jSform4.area);
      } else {
        this.jsItems2 = data3.data.value;
        this.jsItems4 = data3.data.value;
        this.jsItems8 = data3.data.value;
        this.jSform3.area = data3.data.value[0].area;
        this.jSform2.area = data3.data.value[0].area;
        this.greenhouseWrap(this.jSform3.county,this.jSform3.area);
      }
    },
    // 获取新增设备下拉框
    async greenhouseWrap (county,area) {
      const res3 = await this.$http.get(`/group/cascade/${this.projectId}`,{params: {county:county,area:area}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      // console.log(data3.data);
      if (data3.data.level == "greenhouse") {
        this.jsItems5 = data3.data.value;
        this.jsItems9 = data3.data.value;
        this.jSform3.greenhouse = data3.data.value[0].greenhouseId;
        this.jSform4.greenhouse = data3.data.value[0].greenhouseId;
      }
    },
    async change9 () {
      this.ccdd = true;
      this.unbind(this.jSform3.typeName);
    },
    async unbind (typeName) {
      const res3 = await this.$http.get(`/group/unbind/${this.projectId}`,{params: {typeName:typeName}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (this.ccdd) {
        console.log(data3.data);
      } else {
        this.jsItems6 = data3.data;
        this.jsItemsId = data3.data[0].info;
        this.jSform3.getewayId = data3.data[0].typeName;
        this.jSform3.equipmentId = data3.data[0].info[0].localId;
      }
    },
  }
}
</script>
<style scoped>
  .countentWorpEqu .divActiveRight{
    width: 100%;
    float: right;
    /* height: 419px; */
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
  }
  .countentWorpEqu .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    border-bottom: 1px dashed #EDF0FF;
    height: 54px;
  }
  .countentWorpEqu>.divActiveRight>.shujuLog>.el-form>.el-form-item{
    margin-bottom: 0;
    margin-right: 20px;
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
  .batchWrap{
    overflow: hidden;
    border-bottom: 1px solid #EDF0FF;
  }
  .batchWrap>.el-button{
    float: right;
    margin-top: 11px;
  }
  .batchWrap .batchBtn{
    width: 80px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    margin-top: 15px;
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 5px;
    float: left;
  }
  .batchWrap .batchOpen{
    color: #9cc0f9;
    background:#ecf4ff;
    margin-right: 20px;
  }
  .batchWrap .batchClose{
    color: #f1d37f;
    background:#fffcef;
  }
  .batchWrap .btnBox{
    float: right;
    margin-top: 11px;
  }
  .batchWrap .btnBox .btnLabel{
    font-size: 14px;
    margin-right: 20px;
  }
  .btnBox .el-button{
    margin-left: 10px;
  }
</style>
