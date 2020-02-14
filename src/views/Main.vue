<template>
  <div class="warpBox">
    <!-- 头部 -->
    <div class="header">
      <b>大数据管理系统</b>
      <div class="hRight">
        <el-form :model="formProject"  ref="formArea" class="demo-ruleForm formProject">
          <el-form-item prop="device">
              <el-select v-model="formProject.device" @change="change1">
                <el-option v-for="(item,index) in prosItem" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
        </el-form>
        <img class="mainPng" src="../assets/icon/main.png" alt="">
        <span class="userName">{{userName}}</span>
        <img @click="logout" class="delPng" src="../assets/icon/del.png" alt="">
      </div>
    </div>
    <!-- 左侧菜单 -->
    <aside class="main-sidebar">
      <section  class="sidebar">
        <!-- nav -->
        <div class="leftNav">
          <div class="headerLogo">
            <img src="../assets/icon/logo.png" alt="">
            <b>科瑞杰云平台</b>
          </div>
        </div>
        <el-menu
          default-active="1"
          class="sidebar-menu"
          @open="handleOpen"
          @close="handleClose"
          text-color="#fff">
          <!-- <router-link v-show="falg" to="/Table"> -->
            <el-submenu class="treeview active" index="1">
              <template slot="title">
                <i>
                  <img class="iconList" src="../assets/icon/icon1.png" alt="">
                </i>
                <span>系统管理</span>
              </template>
              <el-menu-item-group class="treeview-menu">
                  <router-link :to="{path:item.route}" v-for="(item,index) in sysType" :key="item.type">
                    <el-menu-item class="leftList" index="1-1"><i class="fa fa-circle"></i>{{item.name}}</el-menu-item>
                  </router-link>
              </el-menu-item-group>
            </el-submenu>
          <!-- </router-link> -->
          <router-link to="/Pm">
            <el-menu-item class="treeview" index="2">
              <i>
                <img class="iconList" src="../assets/icon/icon2.png" alt="">
              </i>
              <span slot="title">项目管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/User">
            <el-menu-item class="treeview" index="3">
              <i>
                <img class="iconList" src="../assets/icon/icon3.png" alt="">
              </i>
              <span slot="title">用户管理</span>
            </el-menu-item>
          </router-link>
          <router-link v-show="falg" to="/Jurisdiction">
            <el-menu-item class="treeview" index="4">
              <i>
                <img class="iconList" src="../assets/icon/icon4.png" alt="">
              </i>
              <span slot="title">权限管理</span>
            </el-menu-item>
          </router-link>
          <router-link to="/Equipment">
            <el-menu-item class="treeview" index="5">
              <i>
                <img class="iconList" src="../assets/icon/icon5.png" alt="">
              </i>
              <span slot="title">设备管理</span>
            </el-menu-item>
          </router-link>
          <router-link v-show="falg" to="/Log">
            <el-menu-item class="treeview" index="6">
              <i>
                <img class="iconList" src="../assets/icon/icon6.png" alt="">
              </i>
              <span slot="title">日志查询</span>
            </el-menu-item>
          </router-link>
          <router-link v-show="falg" to="/Passthrough">
            <el-menu-item class="treeview" index="7">
              <i>
                <img class="iconList" src="../assets/icon/icon6.png" alt="">
              </i>
              <span slot="title">数据透传系统</span>
            </el-menu-item>
          </router-link>
          <router-link v-show="falg2" to="/Facility">
            <el-menu-item class="treeview" index="7">
              <i>
                <img class="iconList" src="../assets/icon/icon6.png" alt="">
              </i>
              <span slot="title">我的设备</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </section>
    </aside>
    <!-- 内容区 -->
    <div class="countent">
      <!-- 内容区头部 -->
      <div class="weatherMonitor">
        <div class="divActive">

            <div class="MonitorTab" v-for="(item,index) in sysType" :key="index">
              <router-link :to="{path:item.route}">
                <img class="navTagActive" :src="getImgUrl(item.url)" alt="">
                <img class="navTag" :src="getImgUrl2(item.pitchUrl)" alt="">
                <p>{{item.name}}</p>
              </router-link>
            </div>
          </div>
      </div>
      <div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Main',
  data () {
    return {
      access:'',
      meng: {},
      falg:true,
      falg2:false,
      userName:'',
      sysType:[],
      prosItem:[],
      asg:false,
      formProject:{device:''},
      flag3:true,
    }
  },
  created: function () {

      var sysType = JSON.parse(localStorage.getItem('sysType'));
      this.sysType = sysType;
      var prosItem = JSON.parse(localStorage.getItem('prosItem'));
      this.prosItem = prosItem;
      this.formProject.device = prosItem[0].id;
    // console.log(this.sysType);
    // console.log(this.$route.path);
    this.userName = localStorage.username
    if (localStorage.access == 1 || localStorage.access == 2) {
      this.falg = false;
    } else if (localStorage.access == 9) {
      this.falg2 = true;
    }
  },
  // watch:{
  //   $route(to,from){
  //     console.log(to.path);
  //     if (to.path == "/Pm") {
  //       this.asg = false;
  //     } else if (to.path == "/Table") {
  //       this.asg = true;
  //     }
  //   }
  // },
  methods: {

    getImgUrl(icon){
       return this.urlImg+"img/"+icon
       // return "https://krjrobot.cn/krjrobot/img/"+icon
    },
    getImgUrl2(icon){
       return this.urlImg+"img/"+icon
       // return "https://krjrobot.cn/krjrobot/img/"+icon
    },

    async handleOpen (key, keyPath) {
      // 每次打开菜单，就会获取到当前打开的菜单的key，将key作为标识，这样就可以点击设备，展示当前设备的信息
      // 只有当点击三级菜单的时候，才会发送请求
      // console.log(Number(key), keyPath)
      // console.log(key);
      // console.log(keyPath);
      // console.log(key)
      this.key = key
      var data = {
        ids: key,
        nowpage: 1,
        pagesize: 10,
        type: ''
      }
      // 通过父传子组件通信，将侧边栏菜单选择信息，传给子组件
      this.meng = data
    },
    handleClose (key, keyPath) {
      // 关闭侧边栏菜单时触发的事件
    },
    async logout () {
      // 点击注销，将token删除

      this.$confirm('确定注销该用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async () => {
        const res = await this.$http.get('/logout', {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
        // console.log(res)
        // 如果注销成功，弹出成功弹窗
        if (res.data.status === '201') {
          window.localStorage.clear()
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
          // window.location.reload();
          // 点击跳转到登录页面
          this.$router.push({
            name: 'Login'
          })
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消注销'
        });
      });
    },
    async change1 () {
      const res = await this.$http.get(`/project/sysType?projectId=`+ this.formProject.device,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
      const data = res.data
      this.sysType = data.data;
      // console.log(data.data[0].route);
      var str = data.data[0].route;
      str=str.slice(1)
      // console.log(str);
      this.$router.push({
        name: str
      })
    },
  }
}
</script>
<style>
html,
body {
  height: 100%;
  background-image:none;
  background: rgba(245,246,250,1);
}
a{
  text-decoration: none;
}
img{vertical-align: top;}

.header{
  height: 60px;
  line-height: 60px;
  background: #fff;
  box-shadow:0px 2px 10px 0px rgba(80,125,255,0.2);
  position: fixed;
  width: 100%;
  z-index: 10;
}
.header b{
  margin-left: 199px;
  float: left;
  font-size: 15px;
}
.header .hRight{
  position: absolute;
  right: 0;
}
.header .hRight .mainPng{
  margin:19px 15px 0 0;
}
.header .hRight .userName{
  display: inline-block;
  height: 12px;
}
.header .hRight .delPng{
  margin:21px 20px 0 20px;
}
.el-header{
  padding: 0;
}

.leftNav{
  width:180px;
}
.leftNav .headerLogo{
  width:180px;
  height:60px;
  line-height: 60px;
  color: #fff;
  background:rgba(35,53,67,1);
}
.leftNav .headerLogo img{
  width: 25px;
  margin:17px 15px 0 20px;
}
.leftNav .headerLogo b{
  color: #fff;
  font-size: 15px;
}

.sidebar-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #1D2536; }
    .sidebar-menu > .treeview:hover, .sidebar-menu > .treeview.is-opened{
      background:linear-gradient(90deg,rgba(66,187,255,1),rgba(29,43,54,1));
    }
    .sidebar-menu > .treeview.active{
      margin-top: 11px;
    }
    .el-menu-item:focus, .el-menu-item:hover{
      background: transparent;
    }
    .el-submenu__title:focus, .el-submenu__title:hover{
      background: transparent;
    }
    .sidebar-menu .treeview .treeview-menu {
      background: #111621; }
        .main-sidebar{
          position: fixed;
          top: 0;
          left: 0;
          height: 100%;
          min-height: 100%;
          width: 180px;
          z-index: 810;
          background-color: #1D2536;
        }

        .countent{
           background:rgba(245,246,250,1);
           margin-left: 180px;
           padding: 82px 20px 60px 20px;
           /* overflow: auto; */
           min-height: 100%;
           /* position: fixed; */
         }
         .countent .divActive{
           background: #fff;
           box-shadow:0px 2px 10px 0px rgba(80,125,255,0.2);
           border-radius:8px;
         }
         .countent .weatherMonitor .divActive{
           padding: 30px 0 19px 0;
           height: 129px;
           width: 100%;
           margin-bottom: 20px;
           box-sizing: border-box;
           display: -webkit-box;
         }
         .countent .weatherMonitor .divActive .MonitorTab{
           height: 61px;
           border-right: 1px dashed #dde3ff;
           width: 25%;
           text-align: center;
           box-sizing: border-box;
           -webkit-box-flex: 1;
         }
         .countent .weatherMonitor .divActive .MonitorTab:last-child{
           border-right: none;
         }
         .countent .weatherMonitor .divActive .MonitorTab img{
           position: relative;
           top: -15px;
         }
         .countent .weatherMonitor .divActive .MonitorTab p{
           font-size: 16px;
           color: #666666;
         }
         .el-menu{
           border-right: 0;
         }
         .navTag{
           display: none;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active p{
           color: #000;
           font-weight: bold;
           position: relative;
           bottom: 9px;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active .navTag{
           display: block;
           margin: 0 auto;
           position: relative;
           top: -18px;
           width: 72px;
         }
         .weatherMonitor .divActive .MonitorTab .router-link-active .navTagActive{
           display: none;
         }
         .sidebar-menu>.router-link-active{
           display: block;
           background:linear-gradient(90deg,rgba(66,187,255,1),rgba(29,43,54,1));
         }
         .sidebar-menu>.router-link-active>li>i{
           color: #fff;
         }
         .sidebar-menu>.router-link-active>.is-active,.sidebar-menu>a>.is-active{
           color: #fff;
         }
         .iconList{
           margin: 0 8px;
         }
         .leftList{
           color: #555555!important;
         }
         .router-link-active li{
           color: #fff;
         }
         .omit img{
           margin-top: 22px;
         }
         .formProject{
           float: left;
           padding-top: 10px;
           margin-right: 29px;
         }
</style>
