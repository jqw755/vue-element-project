/*
 *   createTime: 2018/09/26
 *   author: xiangyu wu
 *   description: 处理element-ui  from表单的自定义验证规则,\(引入原项目中common/valid 的正则验证规则)
 * */
import RegExpObj from "@/common/valid"
const validatorObj = {
    //判断是否为正整数
    checkInteger: (rule, value, callback) => {
        if (value && !RegExpObj.regInteger(value)) {
            callback(new Error('请输入非0正整数'));
        } else {
            callback();
        }
    },
    //判断是否为【0-100】的正数
    checkSectionOneNumber: (rule, value, callback) => {
        if (value && !RegExpObj.regSectionNumberOne(value)) {
            callback(new Error('请输入0-100的正数,且最多只保留两位小数'));
        } else {
            callback();
        }
    },
    //判断是否为【0-200】的正数
    checkSectionTwoNumber: (rule, value, callback) => {
        if (value && !RegExpObj.regSectionNumberTwo(value)) {
            callback(new Error('请输入0-200的正数,且最多只保留两位小数'));
        } else {
            callback();
        }
    },
    //判断是否含有特殊字符
    checkCharactersNumber: (rule, value, callback) => {
        if (value && RegExpObj.regCharacter(value)) {
            callback(new Error('您输入的信息包含特殊字符，请您删除！'));
        } else {
            callback();
        }
    },
    //判断物流单号
    checkLogisticsNo: (rule, value, callback) => {
        if (value && !RegExpObj.regLogisticsNo(value)) {
            callback(new Error('请填写正确的物流单号！'));
        } else {
            callback();
        }
    }
};
export default validatorObj;