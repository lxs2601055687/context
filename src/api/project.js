import request from '@/utils/request'
const userApi = {
  ProjectUpdate: '/add/project',
  ProjectSearch: '/search/project',
  ProjectStatus: '/project/status',
  AwardUpdate: '/award/update',
  GoodProject: '/project/good'
}
export function projectUpdate (param) {
  return request({
    url: userApi.ProjectUpdate,
    method: 'post',
    data: param
  })
}
export function searchProject (param) {
  return request({
    url: userApi.ProjectSearch,
    method: 'post',
    data: param
  })
}
export function getProjectStatus (param) {
  return request({
    url: userApi.ProjectStatus,
    method: 'post',
    data: param
  })
}
export function awardUpdate (param) {
  return request({
    url: userApi.AwardUpdate,
    method: 'post',
    data: param
  })
}
export function getGoodProject () {
  return request({
    url: userApi.GoodProject,
    method: 'post'
  })
}
export function projectDownload (teamId) {
  return request({
    url: '/contest/project/download/' + teamId,
    method: 'get'
  })
}
