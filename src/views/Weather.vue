<template>
  <div class="countentWorpWea">
    <div class="">
      <el-form :model="formtop"  ref="form" label-width="10%" class="demo-ruleForm formTop">
        <el-form-item prop="nodeId">
            <el-select v-model="form.nodeId" @change="change2">
                <el-option v-for="item2 in items2" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="nameId">
            <el-select v-model="form.nameId" @change="change">
                <el-option v-for="item in items" :key="item.id" :label="item.id" :value="item.id"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="divSoliWrap">
      <div class="divWeather">
        <div class="divActive solit">
          <p class="soliSelect soliwd">
            空气温度
          </p>
          <div class="soliStatus">
            <div class="wdBox">
              <div class="solitBox">
                <el-progress
                  :percentage="solit == 0?0:solitNumber(solit)"
                  :show-text="false"
                  :style="{'transition':`1.5s`}"
                  color="linear-gradient(0deg,rgba(66,155,255,1),rgba(176,63,255,1))"
                  :stroke-width="14"
                ></el-progress>
              </div>
              <div class="slider-bottom">
                <div class="slider-height"></div>
              </div>
            </div>
            <p class="working">{{solit}}℃</p>
          </div>
        </div>
        <div class="divActive solit">
          <p class="soliSelect soliwd">
            湿度
          </p>
          <el-progress
            style="margin:0 auto;color: #000;"
            class="humidityTag"
            :stroke-width="parseInt(10)"
            :width="parseInt(160)"
            type="circle"
            :percentage="humidity==0?0:parseInt(humidity)"
          >&</el-progress>
        </div>
      </div>
      <div class="divActive divSoli">
        <p class="soliSelect soliwd">
          20分钟实时监测数据
        </p>
        <div class="temperature">
          <img src="../assets/icon/map.png" alt="">
          <div class="">
            <p class="weatherw">{{temperature}}℃</p>
            <p class="working">温度</p>
            <p class="weatherw">{{humidity}}%</p>
            <p class="working">湿度</p>
            <p class="weatherw">{{rainfall}}mm/hr</p>
            <p class="working">雨量</p>
          </div>
        </div>
      </div>
      <div class="divActive divSoli divSoliright">
        <p class="soliSelect soliwd">
          当前风向
        </p>
        <div class="winddirection">
          <div class="CompassBox">
            <p class="direction">N</p>
            <div class="Compass">
              <p class="direction">W</p>
              <div class="CompassItem">
                <img
                  src="../assets/icon/Pointer.png"
                  alt=""
                  class="Pointer"
                  :style="{transform: `rotate(${windNum*1}deg)`,'transition-duration':`1.5s`}"
                >
              </div>
              <p class="direction">E</p>
            </div>
            <p class="direction">S</p>
          </div>
          <p class="weatherwtop">{{winddirection}}</p>
          <p class="working">风向</p>
          <p class="weatherw">{{windsped}}m/s</p>
          <p class="working">风速</p>
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
          <el-table :data="tableData3" style="width: 100%">
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
  </div>
</template>
<script>
import $ from 'jquery'
import Qs from 'qs'

export default {
  data () {
    return {
      currentPage:1,
      total:1,
      pageSize:5,
      Id:'',
      pId:'',
      gatewayId:'',
      gong:0,
      typea:'',
      form:{gatewayId:''},
      formtop:{nodeId:'',nameId:''},
      items:[],
      items2:[],
      windNum:0,
      items3:[
        {name : "空气温度" , key : "temperature"},
        {name : "空气湿度" , key : "humidity"},
        {name : "压力" , key : "pressure"},
        {name : "风速" , key : "windsped"},
        {name : "风向" , key : "Winddirection"},
        {name : "降雨量" , key : "Rainfall"},
        {name : "日光照" , key : "dailyRadiation"},
        {name : "辐射功率" , key : "radiationPower"},
        {name : "uv辐射" , key : "uv"},
      ],
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
      nodeType:1,
      sysType:1,
      solit:0,
      winddirection:'',
      windsped:'',
      temperature:'',
      humidity:'',
      rainfall:'',
      seconde:[],
      isActive:-1,
      classActive:-1,
      st:'',
      et:'',
      timeAge:[],
      dataAge:[],
      columnNameIndex:'空气温度',
      projectId:2,
      startLength:'',
      tableData3:[],
      activeName2: 'first',
      columName:[],
      columa:[],
      bodyData:[],
      cols:[],
      dateVals:'',
    }
  },
  created: function () {
    this.credNode();
    // this.defaultDate();
  },
  mounted: function () {
    // this.weatherTemperature();
  },
  computed:{
    // imgUrl:function() {
    //   return require("../assets/" + this.solit  + ".png");
    // },
  },
  methods:{
    // 温度计进度条数值
    solitNumber(num){
      let solitNum = 20/60*100;
      let solit = num/60*100;
      if(num != 0){
        if(num>0){
          solit = solit+solitNum;
          console.log(solit);
          return solit;
        }else{
          solit = solit+solitNum;
          console.log(solit);
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
    enter: function(index){
      this.isActive = index;
      this.classActive = index;
    },
    out: function (index) {
      this.isActive = -1;
      this.classActive = -1;
    },
    async credNode () {
      const res = await this.$http.get(`/data/gateway/${this.projectId}/${this.nodeType}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data);
      this.items2 = data.data;
      this.form.nodeId = this.items2[0].id;
      this.node(this.form.nodeId)
    },
    async node (nodeId) {
      const res = await this.$http.get(`/data/node/${nodeId}/${this.nodeType}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      this.items = data.data;
      this.form.gatewayId = this.items3[0].key;
      this.form.nameId = data.data[0].id;
      this.sysTypeAge(this.form.nameId,nodeId);
      this.weatherAge(nodeId,data.data[0].id,this.items3[0].key,this.columnNameIndex)
      this.weatherTable(nodeId,this.form.nameId);
    },
    async weatherTable (nodeId,gatewayId) {
      var json = Qs.stringify({
        st: this.st,
        et: this.et
      })
      const res = await this.$http.post(`/excel/weather/${nodeId}/${gatewayId}`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data.body);
      this.columName = data.data.name;
      this.columa = data.data.column;
      this.tableData3 = data.data.body;
      this.bodyData = data.data.body;
      this.cols = data.data.cols;
    },
    // 导出表格
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
          export_json_to_excel(tHeader, data, "气象数据");
      })
    },
    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
    },
    async sysTypeAge (nodeId,id) {
      const res = await this.$http.post(`/data/sysType/${this.sysType}/${id}/${nodeId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log("数据集合",data);
      this.windNum = data.data.first.winddirection;
      this.solit = data.data.first.temperature;
      this.winddirection = data.data.first.winddirection;
      this.windsped = data.data.first.windsped;
      this.temperature = data.data.first.temperature;
      this.humidity = data.data.first.humidity;
      this.rainfall = data.data.first.rainfall;
      this.seconde = data.data.seconde;
    },
    async weatherAge (pId,nodeId,column,columnName) {
      var json = Qs.stringify({
        st: this.st,
        et: this.et
      })
      const res = await this.$http.post(`/data/sysType/${this.sysType}/${pId}/${nodeId}/${column}`, json ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.timeAge = [];
      this.dataAge = [];
      for (var i = 0; i < data.data.length; i++) {
        this.timeAge.push(data.data[i].gatherTime);
        this.dataAge.push(data.data[i].field);
      }
      this.soilTemperature(this.timeAge,this.dataAge,columnName);
    },
    startflow (val) {
      this.st = val[0];
      this.et = val[1];
      this.weatherAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
      this.weatherTable(this.form.nodeId,this.form.nameId);
    },
    getImgUrl(icon){
      return this.urlImg + "img/syspage/" + icon
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
                  interval:5,
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
    change:function(){
      this.weatherAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
      this.weatherTable(this.form.nodeId,this.form.nameId)
      this.sysTypeAge(this.form.nameId,this.form.nodeId);
    },
    change2:function(){
      this.node(this.form.nodeId,)
      // this.weatherAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
    },
    change3:function(key){
      let obj = {};
      obj = this.items3.find((item)=>{
          return item.key === key;
      });
      this.columnNameIndex = obj.name;
      this.weatherAge(this.form.nodeId,this.form.nameId,this.form.gatewayId,this.columnNameIndex);
    },
  }
}
</script>
<style scoped>
  .countentWorpWea .divActiveRight{
    width: 100%;
    float: right;
    height: 500px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
    margin-bottom: 30px;
    position: relative;
  }
  .countentWorpWea .divActiveRight .shujuLog{
    font-size: 16px;
    color: #333333;
    margin-bottom: 21px;
    border-bottom: 1px solid #dde3ff;
    overflow: hidden;
  }
  .el-form{
    height: 50px;
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
  .divSoliWrap{
    display:-webkit-flex;
    display:flex;
  }
  .divSoliWrap .divSoli{
    float: left;
    height: 497px;
    padding: 11px 20px 0 20px;
    text-align: center;
    flex-grow: 2;
    margin-right: 20px;
  }
  .divSoliWrap .divWeather{
    flex-grow: 1;
    margin-right: 20px;
  }
  .divSoli .soliwd{
    /* border-bottom: 0.018519rem solid #dde3ff; */
    padding-bottom: 16px;
    margin-top: 4px;
    color: #666666;
    font-size: 16px;
  }
  .divWeather .soliwd{
    /* border-bottom: 0.018519rem solid #dde3ff; */
    height: 52px;
    line-height: 52px;
    text-align: center;
    font-size: 16px;
  }
  .soliStatus{
    width: 195px;
    margin: 0 auto;
  }
  .soliStatus .wdBox img{
    position: absolute;
    bottom: 5px;
    left: 40px;
  }
  .sdStatus img{
    margin-left: 35px;
    margin-top: 22px;
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
  .divWeather .divActive{
    height: 234px;
    margin-bottom: 30px;
    padding: 0 20px;
  }
  .divSoliWrap .divSoliright{
    margin-right: 0;
    flex-grow: 1;
    text-align: center;
  }
  .divSoliproperty{
    height: 235px;
    padding: 30px 0 0 20px;
    margin-bottom: 30px;
    box-sizing: border-box;
    display:-webkit-flex;
    display:flex;
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
  .divActiveRight .block{
    float: left;
  }
  .divActiveRight .el-range-editor.el-input__inner{
    margin-top: 4px;
    padding-top: 0;
    padding-bottom: 0;
    margin-left: 6%;
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
    margin-right: 9px;
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
  #main,#rainfall,#humidity,#wind{
    width: 100%;
    height: 356px;
  }
  .solit{
    text-align: center;
  }
  .solit .working{
    margin-top: 75px
  }
  .winddirection{
    margin:0 auto;
    width: 297px;
    padding-top: 10px;
    text-align: center;
    border-top:1px solid rgba(81,111,255,.2);
  }
  .CompassBox{
    padding-bottom: 22px;
  }
  .direction{
    font-size:18px;
    font-family:Source Han Sans CN;
    font-weight:400;
    color:rgba(102,102,102,1);
  }
  .Compass{
    margin: 0 auto;
    padding-right: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .CompassItem{
    width: 144px;
    height: 144px;
    background-image: url("../assets/icon/Compass.png");
    background-size: 144px 144px;
  }
  .Pointer{
    margin-top: 29px;
    width: 26px;
    height: 59px;
    transform: rotate(0deg);
    transform-origin:50% 70%;
    /* transition-duration:1s; */
  }
  .weatherw{
    color: #333;
    font-size: 26px;
    margin-top: 40px;
  }
  .weatherwtop{
    color: #333;
    font-size: 26px;
    margin-top: 25px;
  }
  .winddirection .working{
    margin-top: 10px;
  }
  .temperature{
    display: flex;
  }
  .temperature img{
    height: 270px;
    margin-top: 70px;
  }
  .temperature div{
    float: right;
    flex: 2;
  }
  .humidityTag{
    color: #000;
    font-size: 24px;
    font-weight: bold;
  }
  .solitBox{
    transform:rotate(270deg);
    width: 120px;
    height: 30px;
    position: relative;
    top: 56px;
    left: 5px;
  }

  .el-progress /deep/ path:first-child {
    stroke: #409EFF;
    stroke-width:1;
  }
  .slider-bottom{
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #409EFF;
    margin-left:40px;
    margin-top:101px;
    position: relative;
  }
  .slider-height{
    position: relative;
    top: -6px;
    left: 10px;
    background: #409EFF;
    width: 14px;
    height: 12px;
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
  .countentWorpWea .divActiveRight .divshjuju{
    position: absolute;
    top: 16px;
    width: 97.5%;
  }
  .countentWorpWea .el-table{
    overflow: auto;
    height: 356px;
  }
  .countentWorpWea .el-table::before{
    height: 0;
  }
  .formTop{
    float: none;
  }
  .formTop .el-form-item{
    margin-bottom: 0;
  }
  .el-date-editor--daterange.el-input__inner{
    width: 250px;
  }
</style>
