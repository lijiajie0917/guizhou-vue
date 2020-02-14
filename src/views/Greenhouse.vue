<template>
  <div class="countentWorpSol">
    <div class="divgreenWrap">
      <el-form :model="formArea"  ref="formArea" label-width="80px" class="demo-ruleForm">
        <el-form-item label="选择区域" prop="device">
            <el-select v-model="formArea.device" @change="change1">
              <el-option v-for="(itemArea,index) in areaForm" :key="index" :label="itemArea.county" :value="itemArea.county"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择片区" prop="area">
            <el-select v-model="formArea.area" @change="changeArea">
              <el-option v-for="(itemArea,index) in greenhouseList" :key="index" :label="itemArea.area" :value="itemArea.area"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择大棚" prop="green">
            <el-select v-model="formArea.green" @change="changegreen">
              <el-option v-for="(itemArea,index) in greenhouseInner" :key="index" :label="itemArea.greenhouse" :value="itemArea.greenhouseId"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <!-- <div class="greenhouseWrap">
        <img class="greenleftBtn" src="../assets/icon/left.png" alt="">
        <div class="greenhouseBox">
          <div class="greenLenth">
            <div class="greenhouseList" v-for="(o,index1) in greenhouseList" :key="index1">
              <h2>{{o.area + '片区'}}</h2>
              <ul class="greenUl">
                <li class="greenLi" v-for="(a,index) in o.greenhouse" :key="index">
                  <span :class ="{addclass:`${index1},${index}` == isactive}" @click="greenhouse(o.area,a.greenhouseId,`${index1},${index}`,a.greenhouse)">{{a.greenhouse}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img class="greenrightBtn" src="../assets/icon/right.png" alt="">
      </div> -->
    </div>
    <div class="divSoliWrap">
      <div class="divActive divSoli divSolifelx">
        <p class="soliSelect">
          <el-form :model="formEquip"  ref="formEquip" label-width="110px" class="demo-ruleForm">
            <el-form-item label="选择设备" prop="device">
                <el-select v-model="formEquip.device" @change="change2($event,equipForm)">
                  <el-option v-for="(itemEquip,index) in equipForm" :key="itemEquip.nodeId" :label="itemEquip.nodeId" :value="itemEquip.nodeId"></el-option>
                </el-select>
            </el-form-item>
          </el-form>
        </p>
        <div class="soliStatus">
          <img src="../assets/icon/status.png" alt="">
          <p class="sbStatus">设备状态</p>
          <p class="working">{{working == 1 ?'未连接':'已连接'}}</p>
        </div>
      </div>
      <div class="divActive divSoli solit">
        <p class="soliSelect soliwd">
          空气温度
        </p>
        <div class="soliStatus">
          <div class="wdBox">
            <div class="solitBox">
              <el-progress
                :percentage="solit == 0?0:solitNumber(solit)"
                :show-text="false"
                color="linear-gradient(0deg,rgba(66,155,255,1),rgba(176,63,255,1))"
                :stroke-width="10"
              ></el-progress>
            </div>
            <div class="slider-bottom">
              <div class="slider-height"></div>
            </div>
          </div>
          <p class="working">{{solit}}℃</p>
        </div>
      </div>
      <div class="divActive divSoli divSoliright solit">
        <p class="soliSelect soliwd">
          相对湿度
        </p>
        <div class="soliStatus">
          <img src="../assets/icon/shi.png" alt="">
          <p class="working">{{soliw}}%RH</p>
        </div>
      </div>
    </div>
    <div class="divActive divSoliproperty">
      <div v-for="(secondeItem,index) in seconde" :key="index" class="propertyList" @mouseover="enter(index)" @mouseout="out(index)">
        <p class="propertyActive" :class="isActive == index ?'active':''"></p>
        <p class="propertyName" :class="classActive == index ?'classactive':''">
          {{secondeItem.attachments.current}}&nbsp;{{secondeItem.unit}}
        </p>
        <p class="propertyValue">
          <img :src="getImgUrl(secondeItem.url)" alt="">
          {{secondeItem.name}}
        </p>
      </div>
    </div>
    <div class="divActive divActiveRight">
      <el-tabs v-model="activeName2" type="card">
        <el-tab-pane label="图表" name="first">
          <div id="main"></div>
        </el-tab-pane>
        <el-tab-pane label="表格" name="second">
          <el-table :data="tableDataWrap" style="width: 100%">
            <el-table-column
              v-for="(col,index) in cols"
              :prop="col.prop" :label="col.label" :key="index">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="shujuLog divshjuju">
        <span class="shujuHeader">数据展示</span>
        <el-form :model="form"  ref="form" label-width="10%" class="demo-ruleForm">
          <!-- <el-form-item prop="nodeId">
            <el-input v-model="form.nodeId" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item prop="nameId">
              <el-select v-model="form.nameId" @change="changedece($event,equipForm)">
                <el-option v-for="(itemEquip,index) in equipForm" :key="index" :label="itemEquip.nodeId" :value="itemEquip.nodeId"></el-option>
              </el-select>
          </el-form-item> -->
          <el-form-item prop="gatewayId">
              <el-select v-model="form.gatewayId" @change="change3">
                  <el-option v-for="item3 in items3" :key="item3.key" :label="item3.name" :value="item3.key"></el-option>
              </el-select>
          </el-form-item>
          <div class="block">
            <el-date-picker
              v-model="dateVals"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions2"
              @change = "startflow">
            </el-date-picker>
          </div>
          <div class="derive" @click="excelTable">
            导出
          </div>
          <!-- <div class="inquire">
            查询
          </div> -->
        </el-form>
      </div>
    </div>
    <div class="divActive divActiveRight">
      <div class="shujuLog">
        <span class="shujuHeader">设备状态</span>
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
          label="当前状态"
          :formatter="formatter">
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
      gong:0,
      typea:'',
      form:{nodeId:'',nameId:'',gatewayId:''},
      formEquip:{device:''},
      formArea:{device:'',area:'',green:''},
      items:[],
      items2:[
        {name : "室外" , id : "044faa45-3914-4304-8ecf-b250e652a648"},
        {name : "棚内" , id : "ed7b9030-dca9-45b1-b6dd-39c86f2da897"},
      ],
      items3:[
        {name : "空气温度" , key : "air_temperature"},
        {name : "空气湿度" , key : "air_humidity"},
        {name : "光照度" , key : "lux"},
        {name : "co2 浓度" , key : "CO2"},
        {name : "土壤温度" , key : "soil_temperature"},
        {name : "土壤湿度" , key : "soil_humidity"},
        {name : "酸碱度" , key : "ph"},
      ],
      seconde:[],
      isActive:-1,
      classActive:-1,
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
      value7: '',
      projectId:7,
      sysType:2,
      solit:'',
      soliw:'',
      st:'',
      et:'',
      timeAge:[],
      dataAge:[],
      columnNameIndex:'空气温度',
      activeName2: 'first',
      tableData3: [],
      areaForm:[],
      equipForm:[],
      greenhouseList:[],
      level:'area',
      areaName:'',
      greenhouseId:'',
      nodeinfoId:'',
      isactive:'0,0',
      greenisactive:'',
      objNode:'',
      startLength:'',
      dateVals:'',
      tableDataWrap:[],
      columName:[],
      columa:[],
      bodyData:[],
      cols:[],
      greenhouseInner:[],
      working:'',
    }
  },
  created: function () {
    this.area();
    // this.defaultDate();
  },
  mounted: function () {

  },
  computed:{

  },
  methods:{
    // 温度计进度条数值
    solitNumber(num){
      let solitNum = 20/60*100;
      let solit = num/60*100;
      if(num != 0){
        if(num>0){
          solit = solit+solitNum;
          // console.log(solit);
          return solit;
        }else{
          solit = solit+solitNum;
          // console.log(solit);
          return solit;
        }
      }else{
        return solitNum;
      }
    },
    // defaultDate(){
    //     //获取新的时间(2019.4.12）
    //     let date = new Date()
    //     //获取当前时间的年份转为字符串
    //     let year = date.getFullYear().toString()   //'2019'
    //     //获取月份，由于月份从0开始，此处要加1，判断是否小于10，如果是在字符串前面拼接'0'
    //     let month = date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1).toString():(date.getMonth()+1).toString()  //'04'
    //     //获取天，判断是否小于10，如果是在字符串前面拼接'0'
    //     let da = date.getDate() < 10 ? '0'+date.getDate().toString():date.getDate().toString()  //'12'
    //     //字符串拼接，开始时间，结束时间
    //     let end = year + '-' + month + '-' + da  //当天'2019-04-12'
    //     // let beg = year + '-' + month + '-01'    //当月第一天'2019-04-01'
    //     this.dateVals = [end,end] //将值设置给插件绑定的数据
    //     // console.log(end);
    //     // console.log(beg);
    // },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      this.sensorInfo(this.currentPage,this.pageSize,this.formArea.device,this.areaName,this.greenhouseId,this.formEquip.device);
    },
    enter: function(index){
      this.isActive = index
      this.classActive = index;
    },
    out: function (index) {
      this.isActive = -1;
      this.classActive = -1;
    },
    // 默认初始化接口
    async area (currentPage,pageSize,county,area,greenhouseId) {
      const res3 = await this.$http.get(`/group/cascade/${this.projectId}`,{params: {county:county,area:area,greenhouseId:greenhouseId,nodeTypeName:'greenhouse'}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data3 = res3.data
      if (data3.status === '200') {
        var array = data3.data;
        // console.log(array);
        var arr = data3.data.value;
        if (array.level == "county") {
          this.areaForm = arr;
          this.formArea.device = arr[0].county;
          this.greenhouseList = arr[0].area;
          this.formArea.area = arr[0].area[0].area;
          this.greenhouseInner = arr[0].area[0].greenhouse;
          this.formArea.green = arr[0].area[0].greenhouse[0].greenhouseId;
          // 片区名称
          this.areaName = arr[0].area[0].area;
          // 大棚id
          this.form.nodeId = arr[0].area[0].greenhouse[0].greenhouse;
          this.greenhouseId = arr[0].area[0].greenhouse[0].greenhouseId;
          if (arr[0].area[0].greenhouse[0].node.length == 0) {
            this.equipForm = [];
            this.formEquip.device = '';
            this.nodeinfoId = "";
            this.form.nameId = '';
          } else {
            this.equipForm = arr[0].area[0].greenhouse[0].node;
            this.formEquip.device = arr[0].area[0].greenhouse[0].node[0].nodeId;
            this.form.gatewayId = this.items3[0].key;
            this.form.nameId = arr[0].area[0].greenhouse[0].node[0].nodeId;
            this.nodeinfoId = arr[0].area[0].greenhouse[0].node[0].gatewayId;
            this.objNode = this.nodeinfoId;
            this.getGreenhouse(this.formEquip.device,this.nodeinfoId);
            this.sysTypeAge(this.form.nameId,this.nodeinfoId,this.form.gatewayId,this.columnNameIndex);
            this.weatherTable(this.form.nameId,this.objNode);
            // this.tableData3Fun(this.form.nameId,this.nodeinfoId,this.form.gatewayId,this.columnNameIndex);
          }
        } else if (array.level == "area") {
          var arr1 = array.value
          console.log(arr1[0]);
          this.formArea.area = arr1[0].area;
          this.greenhouseList = arr1;
          this.greenhouseInner = arr1[0].greenhouse;
          this.areaName = arr1[0].area;
          this.formArea.green = arr1[0].greenhouse[0].greenhouseId;
          this.form.nodeId = arr1[0].greenhouse[0].greenhouse;
          this.greenhouseId = arr1[0].greenhouse[0].greenhouseId;
          if (arr1[0].greenhouse[0].node.length == 0) {
            this.equipForm = [];
            this.formEquip.device = '';
            this.nodeinfoId = "";
            this.form.nameId = '';
          } else {
            this.equipForm = arr1[0].greenhouse[0].node;
            this.formEquip.device = arr1[0].greenhouse[0].node[0].nodeId;
            this.form.nameId = arr1[0].greenhouse[0].node[0].nodeId;
            this.nodeinfoId = arr1[0].greenhouse[0].node[0].gatewayId;
            this.getGreenhouse(this.formEquip.device,this.nodeinfoId);
          }
        } else if (array.level == "greenhouse") {
          var arrgreen = array.value
          // console.log(arrgreen);
          this.greenhouseInner = arrgreen;
          this.formArea.green = arrgreen[0].greenhouseId;
          // this.form.nodeId = arr1[0].greenhouse[0].greenhouse;
          this.greenhouseId = arrgreen[0].greenhouseId;
          if (arrgreen[0].node.length == 0) {
            this.equipForm = [];
            this.formEquip.device = '';
            this.nodeinfoId = "";
            this.form.nameId = '';
          } else {
            this.equipForm = arrgreen[0].node;
            this.formEquip.device = arrgreen[0].node[0].nodeId;
            // this.form.nameId = arr1[0].greenhouse[0].node[0].nodeId;
            this.nodeinfoId = arrgreen[0].node[0].gatewayId;
            this.getGreenhouse(this.formEquip.device,this.nodeinfoId);
          }
        } else if (array.level == 'nodeInfo') {
          var arr3 = array.value;
          // console.log(arr3);
          if (arr3.length == 0) {
            this.equipForm = [];
            this.formEquip.device = '';
            this.form.nameId = '';
            this.nodeinfoId = "";
          } else {
            this.equipForm = arr3;
            this.formEquip.device = arr3[0].nodeId;
            this.form.nameId = arr3[0].nodeId
            this.nodeinfoId = arr3[0].gatewayId;
            this.getGreenhouse(this.formEquip.device,this.nodeinfoId);
          }
        }
        this.sensorInfo(this.currentPage,this.pageSize,this.formArea.device,this.areaName,this.greenhouseId);
      }
    },
    async weatherTable (nodeId,gatewayId) {
      var json = Qs.stringify({
        st: this.st,
        et: this.et,
        nodeId:nodeId,
        gatewayId:gatewayId,
      })
      const res = await this.$http.post(`/excel/greenhouse`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data.body);
      this.columName = data.data.name;
      this.columa = data.data.column;
      this.tableDataWrap = data.data.body;
      this.bodyData = data.data.body;
      this.cols = data.data.cols;
    },
    async excelTable () {
      //excel数据导出
      require.ensure([], () => {
          const {
              export_json_to_excel
          } = require('../../excel/Export2Excel');
          const tHeader = this.columName;
          const filterVal = this.columa;
          const list = this.bodyData;
          const data = this.formatJson(filterVal, list);
          export_json_to_excel(tHeader, data, "温室数据");
      })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    // 数据接口
    async getGreenhouse(nodeId,gatewayId) {
      const res = await this.$http.get(`/greenhouse/current`,{params: {nodeId:nodeId,gatewayId: gatewayId}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data;
      // console.log(data);
      if (data.data != null) {
        this.solit = data.data.first.airTemperature;
        this.working = data.data.first.isDamage;

        this.soliw = data.data.first.airHumidity;
        this.seconde = data.data.seconde;
      } else {
        this.solit = '',
        this.soliw = '',
        this.seconde = []
      }
    },
    // 设备状态接口
    async sensorInfo (currentPage,pageSize,county,area,greenhouseId) {
      var json = Qs.stringify({
        county: county,
        area: area,
        greenhouseId:greenhouseId,
        nodeTypeName:'greenhouse',
      })
      const res = await this.$http.post(`/group/sensorInfo/${this.projectId}`, json ,{params: {nowpage: currentPage,pagesize:pageSize}},{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
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
      if (data.data.rows.length != 0) {
        this.total = data.data.total
        var g = data.data.total;
        if (g <= 10) {
          this.gong = 1;
        } else {
          var gs = Math.round(g / 10);
          this.gong =  gs;
        }
        this.tableData = data.data.rows;
      }
    },
    async greenhouse (area,greenhouseId,index,greenhouse) {
      this.isactive = index;
      this.areaName = area;
      this.greenhouseId = greenhouseId;
      this.form.nodeId = greenhouse;
      this.area(this.currentPage,this.pageSize,this.formArea.device,area,greenhouseId);
    },
    // 历史数据
    async sysTypeAge (nodeId,nameId,gatewayId,columnName) {
      // console.log(nodeId);
      // console.log(nameId);
      var json = Qs.stringify({
        nodeId:nodeId,
        gatewayId:nameId,
        st: this.st,
        et: this.et,
        flag:'chart',
        field:gatewayId,
      })
      const res = await this.$http.post(`/greenhouse/history`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.timeAge = [];
      this.dataAge = [];
      for (var i = 0; i < data.data.length; i++) {
        this.timeAge.push(data.data[i].gatherTime);
        this.dataAge.push(data.data[i].filed);
      }
      this.soilTemperature(this.timeAge,this.dataAge,columnName);
    },
    startflow (val) {
      this.st = val[0];
      this.et = val[1];
      this.sysTypeAge(this.form.nameId,this.objNode,this.form.gatewayId,this.columnNameIndex);
      this.weatherTable(this.form.nameId,this.objNode);
    },
    getImgUrl(icon){
       return this.urlImg + "img/greenhouse/" + icon
    },
    async soilTemperature (timeAge,dataAge,columnName) {

      if (dataAge.length > 40) {
        this.startLength = 100 - (4000/dataAge.length)
      } else {
        this.startLength = 0;
      }
        var dom = document.getElementById('main')
        var myChart = this.echarts.init(dom)
        var colors = ['#4299FE'];
        var option = {
            title: {
                text: columnName
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[columnName]
            },
            dataZoom : [
              {
                   type: 'slider',//图表下方的伸缩条
                   show : true,  //是否显示
                   realtime : true,  //
                   start : this.startLength,  //伸缩条开始位置（1-100），可以随时更改
                   end : 100,  //伸缩条结束位置（1-100），可以随时更改
              },
           ],
            grid: {
                left: '4%',
                right: '4%',
                bottom: '13%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                axisLabel:{
                  interval:0,
                  rotate:38,
                  margin: 20,
                  textStyle: {
                     color: '#444444'
                 },
                },
                axisLine: {  //设置x轴坐标线的样式
                    lineStyle: {
                        color: '#D1D1D1',//x轴坐标线的颜色
                    }
                },
                boundaryGap: false,
                data: timeAge,
            },
            yAxis: {
                // 背景线
                splitLine:{
                  lineStyle:{
                    type:'dashed',
                    color:'#D1D1D1'
                  }
                },
                axisLabel:{
                  margin: 20,
                  textStyle: {
                     color: '#444444'
                 },
                },
                axisTick:{ //y轴刻度线
        		       show:false
                },
                axisLine:{ //y轴
            	    show:false
                },
            },
            series: [
                {
                    name:columnName,
                    type:'line',
                    stack: '总量',
                    smooth: true,
                    data:dataAge,
                    lineStyle:{
                     color:'#4299FE'
                    },
                    itemStyle : {
                              normal : {
                                color:'#4299FE'
                              }
                    }
                },
            ]
        }
        myChart.setOption(option);
        window.onresize = function(){
            myChart.resize();
        }
    },
    // change:function(){
    //   this.sysTypeAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
    // },
    // change4:function(){
    //   this.sysTypeAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
    // },
    async change1 (val){
      this.area(this.currentPage,this.pageSize,this.formArea.device);
    },
    async changeArea () {
      this.area(this.currentPage,this.pageSize,this.formArea.device,this.formArea.area);
    },
    async changegreen () {
      this.area(this.currentPage,this.pageSize,this.formArea.device,this.formArea.area,this.formArea.green);
    },
    change2:function(val,gatewayId){
      this.getGreenhouse(val,gatewayId[0].gatewayId);
    },
    change3:function(key){
      let obj = {};
      obj = this.items3.find((item)=>{
          return item.key === key;
      });
      this.columnNameIndex = obj.name;
      this.sysTypeAge(this.formEquip.device,this.objNode,this.form.gatewayId,this.columnNameIndex);
    },
    formatter(row, column) {
      // console.log(row);
      if (row.isDamage == "1") {
        return "未连接"
      } else if (row.isDamage == "0") {
        if (row.STATUS == "2") {
          return "已连接"
        } else if (row.STATUS == "0") {
          return "关闭"
        } else if (row.STATUS == "1") {
          return "开启"
        }
      }
    },
    // async tableData3Fun(nodeId,nameId,gatewayId,columnName){
    //   var json = Qs.stringify({
    //     nodeId:nodeId,
    //     gatewayId:nameId,
    //     st: this.st,
    //     et: this.et,
    //     flag:'table',
    //     field:gatewayId,
    //   })
    //   const res = await this.$http.post(`/greenhouse/history`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    //   const data = res.data
    //   this.tableData3 = data.data.rows;
    //   console.log(data.data.rows);
    // },
  }
}
</script>
<style scoped>
  .countentWorpSol .divActiveRight{
    width: 100%;
    float: right;
    height: 498px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
    margin-bottom: 35px;
    position: relative;
  }
  .divSoliWrap{
    margin-bottom: 30px;
    display:-webkit-flex;
    display:flex;
    margin-top: 15px;
  }
  .divSoliproperty{
    height: 235px;
    padding: 30px 0 0 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
    display:-webkit-flex;
    display:flex;
  }
  .divSoliWrap .divSoli{
    float: left;
    height: 239px;
    padding: 11px 20px 0 20px;
    text-align: center;
    flex-grow: 1;
    margin-right: 20px;
  }
  .divSoliWrap .divSolifelx{
    flex-grow: 1;
  }
  .divSoliWrap .divSoliright{
    margin-right: 0;
  }
  .soliStatus{
    width: 210px;
    margin: 0 auto;
  }
  .soliStatus img{
    margin: 50px 60px 0 0;
    float: left;
  }
  .soliStatus p{
    float: left;
  }
  .soliStatus .sbStatus{
    margin-top: 48px;
  }
  .soliStatus .working{
    margin-top: 22px;
    color: #333333;
    font-size: 24px;
  }
  .solitBox{
    transform:rotate(270deg);
    width: 120px;
    height: 30px;
    position: relative;
    top: 56px;
    left: 7px;
  }
  .slider-bottom{
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #409EFF;
    margin-left:42px;
    margin-top:103px;
    position: relative;
  }
  .slider-height{
    position: relative;
    top: -6px;
    left: 10px;
    background: #409EFF;
    width: 10px;
    height: 12px;
  }
  .countentWorpSol .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    height: 50px;
    border-bottom: 1px solid #dde3ff;
  }
  .countentWorpSol .divActiveRight .divshjuju{
    position: absolute;
    top: 16px;
    width: 97.5%;
  }
  .shujuLog .el-form{
    float: right;
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
  .soliSelect .el-form-item{
    /* border-bottom: 1px solid #dde3ff; */
  }
  .soliSelect .el-form{
    width: 100%;
  }
  .soliSelect .el-form-item{
    float: none;
  }
  .divSoli .soliwd{
    /* border-bottom: 0.018519rem solid #dde3ff; */
    padding-bottom: 16px;
    margin-top: 4px;
    color: #666666;
    font-size: 16px;
  }
  .propertyList{
    height: 175px;
    border:1px solid rgba(219,229,248,1);
    border-radius:3px 3px 3px 3px;
    flex-grow: 1;
    margin-right: 20px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .propertyList .propertyName{
    height: 78px;
    line-height: 78px;
    text-align: center;
    color: #333333;
    font-size: 28px;
    position: relative;
  }
  .propertyList .propertyValue{
    text-align: center;
    color: #666666;
    font-size: 14px;
    border-top: 1px dashed #dde3ff;
  }
  .propertyList .propertyValue img{
    display: block;
    margin: 0 auto;
    margin-top: 15px;
    margin-bottom: 12px;
  }
  .propertyActive{
    height: 78px;
    width: 100%;
    position: absolute;
    top: -74px;
    transition: 0.5s;
    background:linear-gradient(90deg,#4397fe,#5984fe);
    box-shadow:0px 0px 10px 0px rgba(64,100,253,0.5);
    border-radius:3px 3px 3px 3px;
  }
  .propertyList .active{
    top: 0;
    transition: 0.5s;
  }
  .propertyList .classactive{
    color: #fff;
    transition: 0.5s;
  }
  .shujuLog .shujuHeader{
    float: left;
    margin-top: 9px;
  }
  .divActiveRight .el-range-editor.el-input__inner{
    margin-top: 4px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 10%;
  }
  .inquire{
    width:52px;
    height:31px;
    line-height: 31px;
    background:#daeaff;
    border-radius:3px 3px 3px 3px;
    float: right;
    color: #2182F2;
    text-align: center;
    font-size: 14px;
    margin: 4px 9px 0 60px;
  }
  .derive{
    width:52px;
    height:31px;
    line-height: 31px;
    background:#fff5d0;
    border-radius:3px 3px 3px 3px;
    float: right;
    color: #E8BC20;
    text-align: center;
    font-size: 14px;
    margin-top: 4px;
    margin-left: 50px;
    cursor: pointer;
  }
  .divActiveRight .el-form .block{
    float: left;
  }
  #main{
    width: 100%;
    height: 356px;
    margin-top: 20px;
  }
  .solit .working{
    margin-top: 80px
  }
  .pie{
    width: 146px;
    height: 146px;
    margin: 0 auto;
    margin-top: 23px;
  }
  .soliStatus .wdBox img{
    position: absolute;
    bottom: 5px;
    left: 40px;
  }
  .soliStatus .wdBox{
    width: 105px;
    height: 170px;
    background-image: url("../assets/icon/℃11.png");
    float: left;
    margin-top: 2px;
    margin-right: 11px;
    position: relative;
    cursor: pointer;
  }
  .el-table__header-wrapper th, .el-table__header-wrapper tr{
    background: #F5F6FA!important;
  }
  .divgreenWrap{
    display: flex;
    flex-direction: column;
  }
  .greenhouseWrap{
    position: relative;
  }
  .greenhouseWrap .greenleftBtn{
    float: left;
    margin-top: 90px;
    cursor: pointer;
  }
  .greenhouseWrap .greenrightBtn{
    position: absolute;
    right: 0px;
    top: 95px;
    cursor: pointer;
  }
  .greenhouseWrap .greenhouseBox{
    /* display: flex; */
    margin-left: 41px;
    margin-right: 27px;
    height: 200px;
    overflow: hidden;
    padding-top: 20px;
  }
  .greenhouseBox .greenhouseList{
    height: 150px;
    background: #fff;
    margin-right: 20px;
    /* flex-grow: 1; */
    box-shadow:0px 2px 10px 0px rgba(80,125,255,0.2);
    border-radius:6px;
    padding: 15px 36px 0 36px;
    text-align: center;
    width: 233px;
    float: left;
  }
  .greenLenth{
    width: 1000%;
  }
  .divgreenWrap .el-form{
    height: 40px;
  }
  .greenUl{
    margin-top: 15px;
  }
  .greenUl .greenLi{
    font-size: 14px;
    float: left;
    width: 115px;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .greenUl .greenLi span{
    color: #999999;
    display: inline-block;
    width: 76px;
    height: 26px;
    line-height: 26px;
    border-radius: 20px;
    background: transparent;
  }
  .greenUl .greenLi span:hover{
    color: #4097FD;
    background: #ECF0FF;
  }
  .addclass{
    color : #fff!important;
    background: #4097FD!important;
  }
  .greenaddclass{
    color: #000;
  }
  .solit .soliStatus img{
    margin-right: 15%;
  }
  .countentWorpSol .el-table{
    overflow: auto;
    height: 356px;
  }
  .countentWorpSol .el-table::before{
    height: 0;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 250px;
  }
</style>
