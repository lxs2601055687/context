import request from '@/utils/request'
const userApi = {
  selectFile: '/activity/file',
  addFileUrl: '/activity/fileUrl',
  downLoad: '/downLoad/zip',
  downloadPdf: '/downLoad/pdf',
  addPdfUrl: '/award/pdf'
}
export function getFile (param) {
  return request({
    url: userApi.selectFile,
    method: 'post',
    data: param
  })
}
export function addUrl (param) {
  return request({
    url: userApi.addFileUrl,
    method: 'post',
    data: param
  })
}
export function addAwardUrl (param) {
  return request({
    url: userApi.addPdfUrl,
    method: 'post',
    data: param
  })
}
export function downloadZip (param) {
  return request({
    url: userApi.downLoad,
    method: 'post',
    data: param
  })
}
export function downloadPdf (param) {
  return request({
    url: userApi.downloadPdf,
    method: 'post',
    data: param
  })
}
