import request from '@/utils/request'
const userApi = {
  teamRegistration: '/user/teamRegistration',
  teamSearch: '/team/search',
  teamSearchByName: '/team/searchByName',
  teamSearchById: '/team/searchById'

}
export function teamRegistration (parameter) {
  return request({
    url: userApi.teamRegistration,
    method: 'post',
    data: parameter
  })
}
export function searchTeamById (parameter) {
  return request({
    url: userApi.teamSearchById,
    method: 'post',
    data: parameter
  })
}
  export function getTeams (parameter) {
    return request({
      url: userApi.teamSearch,
      method: 'post',
      data: parameter
    })
  }
export function getTeamsByName (parameter) {
  return request({
    url: userApi.teamSearchByName,
    method: 'post',
    data: parameter
  })
}
