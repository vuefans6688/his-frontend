import Store from '@/store/index';

export default function getClinicID() {
  return Store.state.clinic;
}
