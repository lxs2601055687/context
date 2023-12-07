import request from '@/utils/request'
const userApi = {
  selectLog: '/log'
}
export function getLog () {
  return request({
    url: userApi.selectLog,
    method: 'post'
  })
}
