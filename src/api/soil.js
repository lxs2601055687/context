import request from '@/utils/request'
const userApi = {
  SoilSearch: '/search/soil',
  SearchSoilName: '/soil/searchByName'

}
export function searchSoil (param) {
  return request({
    url: userApi.SoilSearch,
    method: 'post',
    data: param
  })
}
export function searchSoilByName (param) {
  return request({
    url: userApi.SearchSoilName,
    method: 'post',
    data: param
  })
}
