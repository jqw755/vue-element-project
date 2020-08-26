/*
 *   归纳使用过的正则表达式 20190611 9:58
     edit:2019-09-26
            wuxiangyu
            新增正则校验函数【regSectionNumberOne】【regSectionNumberTwo】判断是否为0-100.0-200的正数，且只保留两位小数
 * */
const RegExpObj = {
    // valid mobile
    regMoblid: (mobile) => {
        return /^1(3|4|5|7|8|9)\d{9}$/.test(mobile)
    },
    // valid email
    regEmail: (email) => {
        return /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,3})$/.test(email)
    },
    // valid 非0正整数
    regInteger: (val) => {
        return /^\+?[1-9][0-9]*$/.test(val)
    },
    // valid money (max 4 decimal)
    regMoney: (money) => {
        return /((^[1-9]\d*)|^0)(\.\d{0,4}){0,1}$/.test(money)
    },
    // valid 英文 数字 下划线组成
    regFormat: (val) => {
        return /^[0-9a-zA-Z_]{1,}$/.test(val)
    },
    // valid 英文 中文 小数点组成
    regFormat1: (val) => {
        return /^[\u0391-\uFFE5A-Za-z.]+$/.test(val)
    },
    //[0-100]正数，含小数 max 2
    regSectionNumberOne: (val) => {
        return /^100$|^(\d|[1-9]\d)(\.\d{1,2})*$/.test(val)
    },
    //[0-200]正数，含小数 max 2
    regSectionNumberTwo: (val) => {
        return /^200$|^(\d|[1-9]\d|[1]\d\d)(\.\d{1,2})*$/.test(val)
    },
    //[1-30]正整数
    regSectionNumberThirty: (val) => {
        return /^([12][0-9]|30|[1-9])$/.test(val)
    },
    //特殊字符验证
    regCharacter: (val) => {
        return /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im.test(val)
    },
    //物流单号验证
    regLogisticsNo: (val) => {
        return /^[0-9a-zA-Z]*$/.test(val)
    },


};
export default RegExpObj;