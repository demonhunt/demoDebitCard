// import  linkApi from '../config/linkApi';
// import  duration from '../config/duration';
import Setting from '../common/setting'
import { connect } from 'react-redux'
export default class Api {
  static headers() {
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      dataType: 'json',
    }
  }

  static get(ipLink, route) {
    return this.xhr(ipLink, route, null, 'GET')
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT')
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST')
  }

  static delete(ipLink, route, params) {
    return this.xhr(ipLink, route, params, 'DELETE')
  }

  static xhr(route, params, verb) {
    const host = Setting.FOUR_API_URL
    const url = `${host}/${route}`
    let options = Object.assign(
      { method: verb },
      params ? { body: JSON.stringify(params) } : null
    )
    options = Object.assign(options, options, { credentials: 'include' })
    options.headers = Api.headers()
    return Promise.race([
      fetch(url, options),
      new Promise(function(resolve, reject) {
        setTimeout(() => reject(null), 3000)
      }),
    ])
      .then(resp => {
        let json = resp.json()
        if (resp.ok) {
          return json
        }

        return json.then(err => {
          throw err
        })
      })
      .catch(err => {
        throw err
      })
  }
}

function select(store) {
  return {
    navigateScreen: store.navigateScreen,
    user: store.user,
    loginEbiz: store.loginEbiz,
    chooseDatabase: store.chooseDatabase,
  }
}

module.exports = connect(select)(Api)
