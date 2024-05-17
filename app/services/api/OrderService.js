import AxiosAPI from './AxiosApi';
import {BASE_API_URL} from '@config/Urls';

const OrderService = {
  /**
   * users search
   * @param params
   * @returns {Promise<any>}
   */
  search(params) {
    return AxiosAPI.post(`${BASE_API_URL}/users/`, params);
  },
  getUser(id) {
    return AxiosAPI.get(`${BASE_API_URL}/users/`, id);
  },
  /**
   * add order
   * @param params
   * @returns {Promise<any>}
   */
  addOrder(params) {
    return AxiosAPI.post('/api/orders', params);
  },
  /**
   * update order by id
   * @param id
   * @param params
   * @returns {Promise<any>}
   */
  update(id, params) {
    return AxiosAPI.put(`/api/orders/${id}`, params);
  },
  /**
   * delete order by id
   * @param id
   * @returns {Promise<any>}
   */
  deleteOrder(id) {
    return AxiosAPI.delete(`/api/orders/${id}`);
  },
  /**
   * change status of order by id
   * @param id
   * @param status
   * @returns {Promise<any>}
   */
  changeStatus(id, status) {
    return AxiosAPI.post(`/api/orders/${id}/change-status`, {status});
  },
  /**
   * get delivery date
   */
  getDeliveryDate({contractorId, departmentId}) {
    return AxiosAPI.post('/api/delivery-schedule/next-delivery-date', {contractorId, departmentId});
  },
};

export default OrderService;
