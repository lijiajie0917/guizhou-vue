<template>
    <div>
      <div id="mainEcharts">

      </div>
    </div>
</template>

<script>

import $ from 'jquery'
import Qs from 'qs'

import {MP} from '../map.js'

    export default {
        data() {
            return {

            }
        },

        methods: {

        },

        mounted: function () {
            this.$nextTick(function(){
              var _this = this;
              MP(_this.ak).then(BMap => {

            var myChart = this.echarts.init(document.getElementById('mainEcharts'));
                  // var dom = document.getElementById('mainEcharts')
                  // var myChart = this.echarts.init(dom)

                  var data = [
                     {name: '海门', value:[121.15,31.89,9]},
                     {name: '鄂尔多斯', value:[109.781327,39.608266,12]},
                     {name: '招远', value:[120.38,37.35,12]},
                     {name: '舟山', value:[122.207216,29.985295,34]},
                     {name: '齐齐哈尔', value:[123.97,47.33,14]}
                  ];

                  // console.log(data);

                  var option = {
                        title: {
                            text: '设备管理',
                            left: 'center',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: function(param) {
                              var value = param.value;
                              return '设备数量：' + value[2] + '&nbsp个'
                            }
                        },
                        bmap: {
                            center: [116.307698, 40.056975], // 中心位置坐标
                            zoom: 5, // 地图缩放比例
                            roam: true, // 开启用户缩放
                            mapStyle:{
                              styleJson: [
                                {
                                       "featureType": "water",
                                       "elementType": "all",
                                       "stylers": {
                                            "color": "#044161"
                                       }
                                  },
                            //       {
                            //            "featureType": "land",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "color": "#004981"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "boundary",
                            //            "elementType": "geometry",
                            //            "stylers": {
                            //                 "color": "#064f85"
                            //            }
                            //       },
                            //       // 铁道显示
                            //       // {
                            //       //      "featureType": "railway",
                            //       //      "elementType": "all",
                            //       //      "stylers": {
                            //       //           "visibility": "off"
                            //       //      }
                            //       // },
                            //       // 公路线边框
                            //       {
                            //            "featureType": "highway",
                            //            "elementType": "geometry",
                            //            "stylers": {
                            //                 "color": "#004981"
                            //            }
                            //       },
                            //       // 公路线内容
                            //       {
                            //            "featureType": "highway",
                            //            "elementType": "geometry.fill",
                            //            "stylers": {
                            //                 "color": "#005b96",
                            //                 "lightness": 1
                            //            }
                            //       },
                            //       // 公路线标签
                            //       {
                            //            "featureType": "highway",
                            //            "elementType": "labels",
                            //            "stylers": {
                            //                 "visibility": "on"  //开/关  on/off
                            //            }
                            //       },
                            //       {
                            //            "featureType": "arterial",
                            //            "elementType": "geometry",
                            //            "stylers": {
                            //                 "color": "#004981"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "arterial",
                            //            "elementType": "geometry.fill",
                            //            "stylers": {
                            //                 "color": "#00508b"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "poi",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "green",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "color": "#056197",
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "subway",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "manmade",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "local",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "arterial",
                            //            "elementType": "labels",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "boundary",
                            //            "elementType": "geometry.fill",
                            //            "stylers": {
                            //                 "color": "#029fd4"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "building",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "color": "#1a5787"
                            //            }
                            //       },
                            //       {
                            //            "featureType": "label",
                            //            "elementType": "all",
                            //            "stylers": {
                            //                 "visibility": "off"
                            //            }
                            //       }
                              ]
                            }
                        },
                        series : [
                            {
                                name: '设备数量',
                                type: 'effectScatter',
                                coordinateSystem: 'bmap',
                                data:data,
                                symbolSize: 25,
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: '{b}',
                                        position: 'right',
                                        show: true
                                    }
                                },
                                itemStyle: {
                                    normal: {
                                        color: 'yellow',
                                        shadowBlur: 10,
                                        shadowColor: '#333'
                                    }
                                },
                                zlevel: 1
                            }
                        ]
                    };
                  myChart.setOption(option);
              })
            })
        },
    }
</script>

<style scoped>

    #mainEcharts {
    width: 100%;
    height: 800px;
    }

</style>
