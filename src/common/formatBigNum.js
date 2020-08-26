const formatBigNum = {
  /**
   * 为数字加上单位：万或亿
   *
   * 例如：
   * 1000.01 => 1000.01
   * 10000 => 1万
   * 99000 => 9.9万
   * 566000 => 56.6万
   * 5660000 => 566万
   * 44440000 => 4444万
   * 11111000 => 1111.1万
   * 444400000 => 4.44亿
   * 40000000,00000000,00000000 => 4000万亿亿
   * 4,00000000,00000000,00000000 => 4亿亿亿
   *
   * @param {number} number 输入数字.
   * @param {number} decimalDigit 小数点后最多位数，默认为2
   * @return {string} 加上单位后的数字
   */

  addWan: function (integer, number, mutiple, decimalDigit) {
    var me = this;
    var digit = me.getDigit(integer);
    if (digit > 3) {
      var remainder = digit % 8;
      if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’
        remainder = 4;
      }
      let s = Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
      s += '<span class="index-data-wan">万</span>';
      return s;
    } else {
      return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
    }
  },
  getDigit: function (integer) {
    var digit = -1;
    while (integer >= 1) {
      digit++;
      integer = integer / 10;
    }
    return digit;
  },
  addChineseUnit: function (number, decimalDigit, params = {}) {
    // 这里参数做特殊处理，kg需要转换为吨
    if (params.dun && number > 9999) {
      number = number / 1000; // kg转吨
    }
    var me = this;
    decimalDigit = decimalDigit == null ? 2 : decimalDigit;
    var integer = Math.floor(number);
    var digit = me.getDigit(integer);
    // ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
    var unit = [];
    // 取得的整数过万
    if (digit > 3) {
      var multiple = Math.floor(digit / 8);
      if (multiple >= 1) {
        var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
        unit.push(me.addWan(tmp, number, 8 * multiple, decimalDigit));
        for (var i = 0; i < multiple; i++) {
          unit.push('亿');
        }
        return unit.join('');
      } else {
        return me.addWan(integer, number, 0, decimalDigit);
      }
      // 输入的数字不过万，直接return掉
    } else {
      return number % 1 > 0 ? number.toFixed(2) : number;
    }
  }
}

export default formatBigNum;
