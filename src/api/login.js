import request from '@/utils/request'

const userApi = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendUpdate: '/account/sms2',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  UserMenu: '/user/nav',
  UserUpdate: '/user/update',
  Verification: '/user/verification',
  PasswordUpdate: '/user/passwordUpdate',
  PhoneUpdate: '/user/phoneUpdate'
}

/**
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}
export function phoneUpdate (parameter) {
  return request({
    url: userApi.PhoneUpdate,
    method: 'post',
    data: parameter
  })
}
export function passwordUpdate (parameter) {
  return request({
    url: userApi.PasswordUpdate,
    method: 'post',
    data: parameter
  })
}
export function userInfoUpdate (parameter) {
  return request({
    url: userApi.UserUpdate,
    method: 'post',
    data: parameter
  })
}

export function getSmsCaptcha (parameter) {
  return request({
    url: userApi.SendSms,
    method: 'post',
    data: parameter
  })
}
export function getSmsCaptcha2 (parameter) {
  return request({
    url: userApi.SendUpdate,
    method: 'post',
    data: parameter
  })
}
export function getInfo () {
  return request({
    url: userApi.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function logout () {
  return request({
    url: userApi.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 注册
 * @param parameter
 * @returns {*}
 */
export function register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function verification (parameter) {
  return request({
    url: userApi.Verification,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
/**
 * get user 2step code open?
 * @param parameter {*}
 */
export function get2step (parameter) {
  return request({
    url: userApi.twoStepCode,
    method: 'post',
    data: parameter
  })
}
