import Store from '@/store/index';

export default function getSbHead() {
  const obj = { ...Store.state.bindSbMsg };
  delete (obj.zhihuiybtoken);
  return obj;
}
