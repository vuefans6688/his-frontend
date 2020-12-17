import Store from '@/store/index';

export default function getToken() {
  return Store.state.token;
}
