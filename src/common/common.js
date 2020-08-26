/**
  抽离项目中多次使用的重复函数
*/
import router from '@/router/index';
import axios from '@/common/axios.js';

/**
 * 在新窗口中打开页面（常用于打开二级页面，如列表页跳转详情页）
 * @param name 路由name
 * @param params 下个路由跳转参数
 */
export const openNewPage = (nextPageRoute) => {
  const { route } = router.resolve({ ...nextPageRoute });

  window.open('#' + route.fullPath, '_blank');
}

/**
 * 导出文件
 * @param url 导出的API路径
 * @param params 导出的参数
 */
export const exportFile = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    // 避免对象双向绑定
    params = JSON.parse(JSON.stringify(params));

    Object.assign(params, {
      responseType: 'blob', //下载文件需要在请求里添加responseType
      timeOut: 1200000
    });
    axios.post(url, params).then(res => {
      // 使用 URL.createObjectURL(new Blob([]))下载文件
      let csvData = new Blob([res.data], { type: res.contentType }),
        fileName = decodeURI(res.fName);
      // for IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(csvData, fileName);
      } else {
        // for no IE
        let elink = document.createElement('a');
        elink.style.display = 'none';
        elink.download = fileName;
        elink.href = URL.createObjectURL(csvData);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      }
      resolve(1)
    }).catch(e => { reject(e) })
  });
}