import request from '@/utils/request'
const userApi = {
  selectLog: '/graph'
}
export function getGraph () {
  return request({
    url: userApi.selectLog,
    method: 'get'
  })
}
export function searchGraph (name) {
  return request({
    url: '/graph/search/' + name,
    method: 'get'
  })
}