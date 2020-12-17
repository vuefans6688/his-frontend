/**
  用于判断诊所是否绑定社保与社保客户端连接状态
  使用方法：
  import connectionTest from '@/common/js/connection';

  async testFunc() {
    const connectionStatus = await connectionTest();
    if (connectionStatus === '1') {
      console.log('调用社保其他接口');
    }
  },
  当flag等于'1'时，为服务状态正常状态
 */

import httpServerNormal from '@httpServerNormal';
import getSbHead from '@/serviceNormal/getSbHead';
import { connecton } from '@apiNormal';
import { MessageBox } from 'element-ui';

export default function (noalert = false) {
  return new Promise((resolve, reject) => {
    const binMsg = getSbHead();
    if (!binMsg.hospitalCode) {
      resolve(false);
      return;
    }
    httpServerNormal(connecton, {
    }).then((res) => {
      if (!(typeof res === 'string' && res.includes('ERRORCODE'))) {
        // 成功的回调( 直接返回data)
        let errmsg = '';
        switch (res.transBody.serverstatus) {
          case '1':
            resolve('1');
            break;
          case '2':
            resolve('2');
            errmsg = '连接社保服务状态异常';
            break;
          case '3':
            resolve('3');
            errmsg = '数据库连接异常';
            break;
          default:
            break;
        }
        if (errmsg.length) { // 若为
          MessageBox.alert('医保接口连接超时,请检查网络及医保服务情况', '错误提示', {
            confirmButtonText: '确定',
            callback: () => {},
          });
        }
      }
    }).catch(() => {
      reject(new Error('抛出异常'));
      if (noalert) {
        return;
      }
      MessageBox.alert('社保客户端连接失败，请确认是否开启客户端？', '错误提示', {
        confirmButtonText: '确定',
        callback: () => {},
      });
    });
  });
}
