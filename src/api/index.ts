import request from '@/utils/request';

// 获取用户信息
export const getUser = () => {
  return request.get('/user');
}
