import request from '@/utils/request'
const userApi = {
  addIndividual: '/add/Individual'
}
export function addIndividual (param) {
  return request({
    url: userApi.addIndividual,
    method: 'post',
    data: param
  })
}
