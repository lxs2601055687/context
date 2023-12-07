import request from '@/utils/request'
const userApi = {
 SelectByInvitation: '/user/selectByInvitation'

}
export function SelectByInvitation (parameter) {
  return request({
    url: userApi.SelectByInvitation,
    method: 'post',
    data: parameter
  })
}
