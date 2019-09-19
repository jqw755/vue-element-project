export default {
  //截取URL参数
  getQuery: function (name, url) {
    var u = arguments[1] || window.location.search,
      reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
      r = u.substr(u.indexOf('\?') + 1).match(reg);
    return r != null ? r[2] : '';
  },

  //大数字转换
  formatBigVal: function (value) {
    return parseFloat((value / 10000).toFixed(4));
  },

  //检查邮箱
  checkEmail: email => {
    return /^([a-zA-Z0-9-_]*[-_.]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2})?$/.test(email);
  },

  //检查手机
  checkMobile:
    mobile => {
      return /^1\d{10}$/.test(mobile);
    },

  // 将秒转换为时分秒格式
  formatSeconds(seconds) {
    return [
      parseInt(seconds / 60 / 60),
      parseInt(seconds / 60 % 60),
      parseInt(seconds % 60)
    ]
      .join(":")
      .replace(/\b(\d)\b/g, "0$1");
  },

  //两位长度
  subTime: strTime => {
    if (strTime < 10) {
      strTime = '0' + strTime;
    }
    return strTime + '';
  },

  //货币化
  currency: (price, separate = false) => {
    let f = parseFloat(price);
    if (isNaN(f)) {
      return 0;
    }
    f = Math.round(f * 100) / 100;
    let s = f.toString();
    let rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    if (separate) {
      return s.split('.');
    }
    return s;
  },

  // 将金额格式化为三位跟一个逗号的格式
  formatMoney: (s) => {
    /*
    *  s: 金额， l：反转后的数字数组， r：小数点， t：最终数值
    * */
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    let l = s.split(".")[0].split("").reverse(),
      r = s.split(".")[1] || '',
      t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? "," : "");
    }
    if (r) {
      return t.split("").reverse().join("") + "." + r;
    } else {
      return t.split("").reverse().join("");
    }

  },

  formatDate: function (time = Date.now(), fmt = 'yyyy-MM-dd hh:mm:ss') {
    let date = new Date(time);
    let o = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      'S': date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },

  // 获取某年某月有多少天
  getMonthDays: function (month, year = new Date().getFullYear()) {
    let dayCount,
      now = new Date(year, month, 0);
    dayCount = now.getDate();
    return dayCount;
  },

//获取中文星期
  getDay: (time = Date.now(), prefix = '周') => {
    let str = '日一二三四五六';
    return prefix + str[new Date(time).getDay()];
  },

  // 输入合法数字，输出周几
  outWeekDay(n) {
    if (n === 0) {
      return;
    }
    let prefix = "周",
      weekly = "";
    switch (n) {
      case 1:
        weekly = "一";
        break;
      case 2:
        weekly = "二";
        break;
      case 3:
        weekly = "三";
        break;
      case 4:
        weekly = "四";
        break;
      case 5:
        weekly = "五";
        break;
      case 6:
        weekly = "六";
        break;
      case 7:
        weekly = "日";
        break;
    }
    return prefix + weekly;
  },

  //获取字符串长度，区分中英文
  len: (str = '') => {
    let len = 0,
      a = str.split('');
    for (let i = 0; i < a.length; i++) {
      if (a[i].charCodeAt(0) < 299) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  },

  //100000=>10:00:00
  intToStr: function (time, isShort) {
    time = time || 100000;
    time = time.toString();
    return time.substring(0, 2) + ':' + time.substring(2, 4) + (isShort ? '' : ':' + time.substring(4, 6));
  },

// 活动倒计时
// 格式化数字
  formatNumber: (n) => {
    n = parseInt(n).toString();
    return n[1] ? n : '0' + n
  },

  interval: function (ms) {
    var o = {};
    var days = parseInt(ms / (1000 * 60 * 60 * 24));
    var hours = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = (ms % (1000 * 60)) / 1000;
    o.day = this.formatNumber(days);
    o.hour = this.formatNumber(hours);
    o.minute = this.formatNumber(minutes);
    o.second = this.formatNumber(seconds);
    return o;
  },

//  当前数值占总数的百分比
  proportion: function (current, total, fixed = 2) {
    if (total === 0) {
      return 0
    }
    return parseFloat(((current / total) * 100).toFixed(fixed));
  },

//  从字符串中截取数字 （数字是连续的）
  getNumFromStr(str) {
    return parseInt(str.replace(/[^0-9]/ig, ""));
  },
};
