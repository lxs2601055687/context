import storage from 'store'
import expirePlugin from 'store/plugins/expire'
import { login, getInfo, logout } from '@/api/login'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome, avatar } from '@/utils/util'

storage.addPlugin(expirePlugin)
const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {},
    activity: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_ACTIVITY: (state, activity) => {
     state.activity = activity
    }
  },
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const token = response.data.token
          storage.set(ACCESS_TOKEN, token, new Date().getTime() + 24 * 60 * 60 * 60 * 1000)
          commit('SET_TOKEN', token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Enlist (context, activity) {
      return new Promise((resolve, reject) => {
        try {
          context.commit('SET_ACTIVITY', activity)
          resolve()
        } catch (error) {
          alert(error)
          reject(error)
          console(error)
        }
      })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        // 请求后端获取用户信息 /api/user/info
        getInfo().then(response => {
          const result = response.data
          console.log('res', response)
          console.log(result)
          if (response.data.role) {
           /* role.permissions = result.role.permissions.map(permission => {
              const per = {
                ...permission,
                actionList: (permission.actionEntitySet || {}).map(item => item.action)
               }
              return per
            }) */
           /* role.permissionList = role.permissions.map(permission => { return permission.permissionId }) */
            // 覆盖响应体的 role, 供下游使用
            commit('SET_ROLES', response.data.role)
            commit('SET_INFO', result)
            commit('SET_NAME', { name: response.data.name, welcome: welcome() })
            commit('SET_AVATAR', { avatar: avatar() })
            /* commit('SET_AVATAR', result.avatar) */
            // 下游
            resolve(response.data)
            console.log(response.data.role)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          storage.remove(ACCESS_TOKEN)
          resolve()
        }).catch((err) => {
          console.log('logout fail:', err)
          // resolve()
        }).finally(() => {
        })
      })
    }

  }
}

export default user
