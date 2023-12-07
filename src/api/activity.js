import request from '@/utils/request'
const userApi = {
  AddActivity: '/activity/add',
  deleteActivity: '/activity/delete',
  updateActivity: '/activity/update',
  uploadActivity: '/oss/upload',
  selectActivity: '/activity/select',
  searchActivity: '/activity/selectByName',
  selectAllActivity: '/activity/selectAll',
  selectActivityByStatus: '/activity/selectByStatus',
  selectActivityByType: '/activity/selectByType',
  uploadPdf: '/oss/pdf'
}
export function selectAllActivityName (parameter) {
  return request({
    url: userApi.selectAllActivity,
    method: 'post',
    data: parameter
  })
}
export function selectActivityByType (parameter) {
  return request({
    url: userApi.selectActivityByType,
    method: 'post',
    data: parameter
  })
}
export function addActivity (parameter) {
  return request({
    url: userApi.AddActivity,
    method: 'post',
    data: parameter
  })
}
export function updateActivity (parameter) {
  return request({
    url: userApi.updateActivity,
    method: 'post',
    data: parameter
  })
}
export function uploadActivity (parameter) {
  return request({
    url: userApi.uploadActivity,
    method: 'post',
    data: parameter,
    processData: false,
    contentType: false
  })
}
export function uploadPdf (parameter) {
  return request({
    url: userApi.uploadPdf,
    method: 'post',
    data: parameter,
    processData: false,
    contentType: false
  })
}
  export function selectActivity (parameter) {
    return request({
      url: userApi.selectActivity,
      method: 'post',
      data: parameter
    })
  }
  export function deleteActivity (parameter) {
      return request({
        url: userApi.deleteActivity,
        method: 'post',
        data: parameter
      })
}
  export function selectActivityByName (parameter) {
  return request({
    url: userApi.searchActivity,
    method: 'post',
    data: parameter
  })
}
export function selectActivityByStatus (parameter) {
  return request({
    url: userApi.selectActivityByStatus,
    method: 'post',
    data: parameter
  })
}
