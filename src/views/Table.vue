<template>
  <div class="countentWorp">
    <div class="divActiveLeft">
      <div class="divActive divSex" v-for="item in items" :key="item.index">
        <p class="borderDiv">
          实时{{item.name}}
          <img :src="getImgUrl(item.url)" alt="">
          <span class="numberDiv">{{item.attachments.current}}{{item.unit}}</span>
        </p>
        <p class="averageDiv">
          7日平均值：
          <span class="average">{{item.attachments.avg}}{{item.unit}}</span>
        </p>
      </div>
    </div>
    <div class="divActiveRight">
      <div class="lawn">
        <div v-for="item2 in items2" :class="setClass(item2.partition)" :key="item2.index">
          <p><span>{{item2.partition}}</span>区{{columnPage}}</p>
          <p class="wdNum"><span>{{item2.field}}</span>℃</p>
        </div>
      </div>
      <div class="tabsDiv">
        <template>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="土壤监测" name="first">
              <ul class="tabsSoil">
                <li v-for="(item3,index) in column" :key="index" :class = "isactive == index ? 'addclass':''" @click="columnMsg(item3.name,item3.key,index)">
                  <img src="../assets/icon/iconList.png" alt="">{{item3.name}}
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="水阀控制" name="second">
              <ul class="tabsWater">
                <li><img src="../assets/icon/iconList.png" alt="">A区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">B区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">C区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">D区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">E区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">F区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">G区水阀</li>
                <li><img src="../assets/icon/iconList.png" alt="">H区水阀</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>
<script>

import $ from 'jquery'

export default {
  data () {
    return {
      column:[

        {name : "土壤温度" , key : "temperature"},
        {name : "土壤湿度" , key : "humidity"},
        {name : "土壤电导率" , key : "Conductivity"},
        {name : "土壤盐度" , key : "salinity"},
        {name : "总溶解固体" , key : "tds"},
        {name : "介电常数" , key : "epsilon"},
      ],
      columnPage:'土壤温度',
      currentPage:1,
      pageSize:5,
      total:1,
      gong:0,
      tableData: [],
      form:{pId:'',pType:''},
      items:[],
      items2:[],
      pId:'',
      pType:'',
      dataList:[],
      activeName: 'first',
      tabPosition: 'top',
      projectId:2,
      sysType:2,
      isactive : -1
    }
  },
  created:function(){
    this.homePage();
  },
  mounted: function () {

  },
  methods:{
    async homePage () {
      const res = await this.$http.post(`/data/homePage/${this.projectId}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data);
      if (data.status === '200') {
        this.items = data.data.weather;
        this.items2 = data.data.soil;
      } else if (data.status === '500') {
        // 如果登录出现500的错误，弹出弹窗提示错误信息
        this.$message({
          message: data.msg,
          type: 'error'
        })
      }
    },
    getImgUrl(icon){
      return this.urlImg + "img/temp/" + icon
    },
    setClass(key) {
      let obj = {alertPop: true}
      obj[`alert${key}`] = true
      return obj
    },
    async columnMsg (name,key,index) {
      this.isactive = index

      const res = await this.$http.post(`/data/homePage/${this.projectId}/${this.sysType}/${key}`,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      // console.log(data.data.soil);
      if (data.status === '200') {
        this.columnPage = name;
        this.items2 = data.data.soil;
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
  .countentWorp .divActive{
    float: left;
  }
  .countentWorp .divActiveLeft{
    width: 415px;
    float: left;
  }
  .divActiveLeft .divSex{
    width: 155px;
    height: 104px;
    padding: 23px 15px 10px 15px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .borderDiv{
    color: #666666;
    font-size: 16px;
    border-bottom:1px solid #dde3ff;
    overflow: hidden;
  }
  .divActiveLeft .borderRight{
    margin-right: 0;
  }
  .countentWorp .divActiveRight{
    height: 451px;
    padding: 15px 20px 19px 20px;
    box-sizing: border-box;
    background: #fff;
    box-shadow:0px 2px 10px 0px rgba(80,125,255,0.2);
    border-radius:8px;
    margin-left: 412px;
  }
  .borderDiv img{
    float: right;
    margin-top: 5px;
    margin-right: 10px;
  }
  .numberDiv{
    font-size: 26px;
    color: #444444;
    margin: 17px 0 10px 0;
    display: inline-block;
  }
  .averageDiv{
    color: #666666;
    font-size: 14px;
    text-align: left;
    margin-top: 4px;
  }
  .divActiveRight .lawn{
    width: 612px;
    height: 240px;
    background-image: url("../assets/icon/cp.png");
    margin-top: 100px;
    float: left;
    margin-left: 13%;
  }
  .lawn .alertPop{
    width: 122px;
    height: 78px;
    background-image: url("../assets/icon/alert.png");
    padding-top: 23px;
    /* float: left; */
    position: absolute;
  }
  .lawn .alertA{
    margin-left: 10px;
    margin-top: 32px;
  }
  .lawn .alertB{
    margin-top: 125px;
    margin-left: 171px;
  }
  .alertPop p{
    text-align: center;
  }
  .alertPop .wdNum{
    margin-top: 16px;
    font-size: 14px;
    font-weight: bold;
  }
  .tabsDiv{
    float: right;
    border: 1px solid #D4E0F5;
    height: 355px;
    margin-top: 35px;
    margin-right: 10px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .tabsSoil,.tabsWater{
    padding-left: 34px;
    list-style: none;
    font-size: 14px;
    color: #666666;
  }
  .tabsSoil li,.tabsWater li{
    margin-bottom: 18px;
    cursor: pointer;
  }
  .tabsSoil li:hover{
    color: #3E99FD;
  }
  .tabsSoil li img,.tabsWater li img{
    margin: 7px 11px 0 0;
  }
  .addclass{
    color : #3E99FD;
  }
</style>
