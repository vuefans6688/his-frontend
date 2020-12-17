import axios from 'axios';
import Vue from 'vue';
import { Message, MessageBox } from 'element-ui';
// import router from '@/router';
import getToken from './getToken';
import getClinicID from './getClinicID';
import getSbHead from './getSbHead';

const baseURL = '';

axios.interceptors.request.use((config) => {
  // 请求之前的处理
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
  // 响应的处理
  return response;
}, (error) => {
  return Promise.resolve(error.response);
});

const httpServerNormal = (config, data = {}) => {
  const Public = {  // 公共数据结构
    head: {
      accessToken: config.needToken ? getToken() : '',
      lastnotice: 0,
      msgid: '',
    },
    body: config.data || {},
  };

  if (config.clinicid) {
    Vue.set(Public.body, config.clinicid, getClinicID());
  }
  if (config.needSbHead) {
    Object.assign(Public.body, getSbHead());
  }

  Object.assign(Public.body, data);
  const httpDefaultOpts = { // http默认配置
    method: config.method || 'post',
    baseURL: config.baseURL ? config.baseURL : baseURL,
    url: config.url,
    data: Public,
  };

  const promise = new Promise((resolve, reject) => {
    const durationTime = 1500;
    axios(httpDefaultOpts).then((response) => {
      const res = response.data;
      if (res.errcode === 0) {
        // his接口
        if (!config.baseURL) {
          resolve(res.data);
        } else if (res.data.transReturnCode === '00000000' || res.data.success) { // client接口成功
          resolve(res.data);
        } else {  // client 接口失败
          resolve(`ERRORCODE:${res.data.transReturnCode}`);
          MessageBox.alert(res.data.transReturnMessage, '错误提示', {
            confirmButtonText: '确定',
            callback: () => {},
          });
        }
      } else {
        // 处理错误码异常
        resolve(`ERRORCODE:${res.errcode}`);
        if ((response.config.url === '/service/drug/createstockcheck' && res.errcode === -1) || res.errcode === 24) {
          return;
        }
        if (response.config.url === '/service/medical/info' || response.config.url === '/sysmng/conn') {
          return;
        }
        if (res.errcode === 42) {
          MessageBox.alert(res.errmsg, '错误提示', {
            confirmButtonText: '确定',
            callback: () => {},
          });
          return;
        }
        Message({ message: res.errmsg ? res.errmsg : res, type: 'error', showClose: true, duration: durationTime });
      }
    }).catch((response) => {
      if (!config.baseURL) {
        // his接口异常
        // router.push('/error/safe_guard');
        Message({ message: '网络异常,请检查网络', type: 'error', showClose: true, duration: durationTime });
        return;
      }
      reject(response);
    });
  });
  return promise;
};

export default httpServerNormal;
