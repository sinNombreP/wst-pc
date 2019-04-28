/*
 * @Description:  常规路线
 * @Author: 彭善智
 * @LastEditors: 彭善智
 * @Date: 2019-04-24 18:26:49
 * @LastEditTime: 2019-04-29 02:26:52
 */
import { getRoutePriceDetails } from 'getData'

const state = {
  routeid: "",  //常规路线ID
  adultNum: 0,  //大人数量
  childNum: 0,  //小孩数量
  oneNum: 0,  //单人间
  twoNum: 0,  //双人间
  threeNum: 0,  //三人间
  fourNum: 0,  //四人间
  arrangeNum: 0, //配房数量
  calendarDate: {},  
  // opt: [{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-04-15","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-05","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-04-06","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-07","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-08","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-09","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-10","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-11","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-12","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-13","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-14","price":3999.00},{"oneCost":3999.0,"twoCost":3999.0,"threeCost":3999.0,"fourCost":3999.0,"arrangeCost":3999.0,"state":"-1","date":"2019-05-15","price":3999.00}],
  opt: "",  //日期列表
  oneCost:0,  //单人房价格
  twoCost:0,  //双人房价格
  threeCost:0, //三人房价格
  fourCost:0,  //四人房价格
  arrangeCost:0,  //配房价格
  sureDate: "", //选中的日期
  dataList: "", //日历展示的日期
  route: "", //参团详情
  
}

const getters = {
    price: (state)=> {
      return state.oneNum * state.oneCost + state.twoNum * state.twoCost + state.threeNum * state.threeCost +
      state.fourNum * state.fourCost + state.arrangeNum * state.arrangeCost + (state.adultNum + state.childNum) * (state.route?state.route.price:0) ;
    },
    //选中的日期  yyyy-mm-dd
    beginDate: (state)=> {
      if(state.sureDate){
        let checkDateList = state.sureDate.split("-")
        return checkDateList[0] +"-"+ 
              (checkDateList[1].length > 1?checkDateList[1]:"0"+checkDateList[1]) + "-"+
              (checkDateList[2].length > 1?checkDateList[2]:"0"+checkDateList[2]);
      }
      return ""
    }
}

const mutations = {
    calendarDateChange: (state, calendarDate)=> {
      state.calendarDate = calendarDate;
      console.log(state)
    },
    //设置日历日期
    setOpt: (state, opt)=> {
      state.opt = opt;
      console.log(state);
    },
    //设置常规路线ID
    setRouteid: (state, routeid)=> {
      state.routeid = routeid;
    },
    //设置房间价格
    setCost: (state, cost)=>{
        [state.oneCost, state.twoCost, state.threeCost, state.fourCost, state.arrangeCost]  =
         [cost.oneCost, cost.twoCost, cost.threeCost, cost.fourCost, cost.arrangeCost ]
    },
    //判断是否是闰年
    isLeapYear(state) {
      if ((state.calendarDate.year % 4 == 0) && (state.calendarDate.year % 100 != 0 || state.calendarDate.year % 400 == 0)) {
        state.calendarDate.isLeapYear = true;
      } else {
        state.calendarDate.isLeapYear = false;
      }
    },
    //获取上个月下个月天数
    getDays(state) {
      if (parseInt(state.calendarDate.month) == 1) {
        state.calendarDate.lastDays = new Date(state.calendarDate.year - 1, 12, 0).getDate();
        state.calendarDate.lastMonth = new Date(state.calendarDate.year - 1, 12, 0).getMonth() + 1;
        state.calendarDate.lastYear = new Date(state.calendarDate.year - 1, 12, 0).getFullYear();
      } else {
        state.calendarDate.lastDays = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getDate();
        state.calendarDate.lastMonth = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getMonth() + 1;
        state.calendarDate.lastYear = new Date(state.calendarDate.year, state.calendarDate.month - 1, 0).getFullYear();
      }
      if (parseInt(state.calendarDate.month) == 12) {
          state.calendarDate.nextDays = new Date(state.calendarDate.year + 1, 1, 0).getDate();
          state.calendarDate.nextMonth = new Date(state.calendarDate.year + 1, 1, 0).getMonth() + 1;
          state.calendarDate.nextYear = new Date(state.calendarDate.year + 1, 1, 0).getFullYear();
      } else {
          state.calendarDate.nextDays = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getDate();
          state.calendarDate.nextMonth = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getMonth() + 1;
          state.calendarDate.nextYear = new Date(state.calendarDate.year, state.calendarDate.month + 1, 0).getFullYear();
      }
      state.calendarDate.days = new Date(state.calendarDate.year, state.calendarDate.month, 0).getDate();
    },
    //改变选中的日期
    activeChange(state){
      state.dataList.map((list)=>{
        Vue.set(list, "check", false);
        if(list.flag && state.sureDate && checkDate(state.sureDate,list.date)){
             Vue.set(list, "check", true);
        }
      })
    },
    //设置日历展示的日期
    setDataList(state, dataList) {
      state.dataList = dataList;
    },
    //设置选中的日期
    setSureDate(state, sureDate){
      state.sureDate = sureDate;
    },
    setAdultNum(state, adultNum){
      state.adultNum = adultNum;
    },
    setChildNum(state, childNum){
      state.childNum = childNum;
    },
    setOneNum(state, oneNum){
      state.oneNum = oneNum;
    },
    setTwoNum(state, twoNum){
      state.twoNum = twoNum;
    },
    setThreeNum(state, threeNum){
      state.threeNum = threeNum;
    },
    setFourNum(state, fourNum){
      state.fourNum = fourNum;
    },
    setArrangeNum(state, arrangeNum){
      state.arrangeNum = arrangeNum;
    },
    setRoute(state, route) {
      state.route = route;
    }
}

const actions = {
    //日期初始化
    calendarDateInit: ({commit, dispatch})=> {
      let calendarDate = {}
      calendarDate.today = new Date();
      calendarDate.year = calendarDate.today.getFullYear();
      calendarDate.month = calendarDate.today.getMonth() + 1;
      calendarDate.date = calendarDate.today.getDate();
      calendarDate.day = calendarDate.today.getDay();
      commit("calendarDateChange", calendarDate)
      dispatch("calendarClick")
    },
    //获取日期价格
    async calendarClick({state, getters, commit, dispatch }) {
      let priceDate = state.calendarDate.year + "-" + (state.calendarDate.month > 9 ? state.calendarDate.month : "0" + state.calendarDate.month);
      let data = await getRoutePriceDetails({
          routeid: state.routeid,
          priceDate: priceDate,
      })
      console.log(data)
      if(data){
        commit("setOpt",data)
        commit("setCost",data[0])
      }
      dispatch("getIndexDay")
    },
    //天数初始化
    getIndexDay({state, commit, dispatch }) {
      commit("isLeapYear");
      commit("getDays");
      let calendarDate = state.calendarDate;
      let dataList = [];
      calendarDate.monthStart = new Date(calendarDate.year + "/" + calendarDate.month + "/1").getDay();
      if (calendarDate.monthStart == 0) {
          calendarDate.monthStart = 7;
      }
      for (let i = calendarDate.monthStart; i > 0; i--) {
          let map = {};
          map.flag = false;
          map.day = calendarDate.lastDays - i + 1;
          map.date = calendarDate.lastYear + "-" + calendarDate.lastMonth + "-" + (calendarDate.lastDays - i +
              1);
          dataList.push(map);
      }
      for (var k = 0; k < calendarDate.days; k++) {
          let map = {};
          map.flag = false;
          map.day = k + 1;
          map.date = calendarDate.year + "-" + calendarDate.month + "-" + (k + 1);
          for (let d in state.opt) {
              map.state = state.opt[d].state;//房间数量情况
              map.price = state.opt[d].price;//价格
              map.flag = checkDate(map.date, state.opt[d].date);
              if (map.flag) {
                  break;
              }
          }
          dataList.push(map);
      }
      for (let j = 0; j < (42 - calendarDate.days - calendarDate.monthStart); j++) {
          let map = {};
          map.flag = false;
          map.day = j + 1;
          map.date = calendarDate.nextYear + "-" + calendarDate.nextMonth + "-" + (j + 1);
          dataList.push(map);
      }
      commit("setDataList",dataList)
      if(state.sureDate){
        commit("activeChange")
      }
      console.log(dataList)
      console.log(calendarDate)
    },
    //点击左边月份
    monthLeftClick({state, commit, dispatch}){
      let calendarDate = state.calendarDate
      if (calendarDate.month <= 1) {
          calendarDate.year -= 1;
          calendarDate.month = 12;
      } else {
          calendarDate.month -= 1;
      }
      commit("calendarDateChange", calendarDate)
      dispatch("getIndexDay")
    },
    //点击右边月份
    monthRightClick({state, commit, dispatch}){
      let calendarDate = state.calendarDate
        if (calendarDate.month == 12) {
            calendarDate.year += 1;
            calendarDate.month = 1;
        } else {
            calendarDate.month += 1;
        }
        commit("calendarDateChange", calendarDate)
        dispatch("getIndexDay")
    },
    //点击日期
    dayClick({state, commit, dispatch},index) {
      commit("setSureDate", state.dataList[index].date)
      if(state.dataList[index].flag){
        commit("activeChange")
      }
    },
}

//判断日期是否相等
const checkDate = (dateStr1, dateStr2)=>{
    let date1 = dateStr1.split("-");
    let date2 = dateStr2.split("-");
    if (date1[1] < 10 && date1[1].length < 2) {
        date1[1] = "0" + date1[1];
    }
    if (date1[2] < 10 && date1[2].length < 2) {
        date1[2] = "0" + date1[2];
    }
    if (date2[1] < 10 && date2[1].length < 2) {
        date2[1] = "0" + date2[1];
    }
    if (date2[2] < 10 && date2[2].length < 2) {
        date2[2] = "0" + date2[2];
    }
    date1 = date1.join("-");
    date2 = date2.join("-");
    return date1 == date2;
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
