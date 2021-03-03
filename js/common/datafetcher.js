'use strict'
import Setting from './setting'
const URL_API = Setting.API_URL + '/'
import langvi from '../common/langvi'

function DataFetcher() {
  if (!(this instanceof DataFetcher)) {
    return new DataFetcher()
  }
}

DataFetcher.prototype.fetch = function(url, onSuccess, onFail) {
  fetch(url, {
    method: 'GET',
  })
    .then(response => {
      if (onSuccess instanceof Function) {
        onSuccess(response)
      }
    })
    .catch(error => {
      if (onFail instanceof Function) {
        onFail(response)
      }
    })
}

DataFetcher.prototype.post = function(url, data, onSuccess, onFail) {
  fetch(url, {
    method: 'POST',
    body: data,
  })
    .then(response => {
      try {
        var json
        if (response.status >= 400) {
          json = { success: false, error: null }
        } else {
          // json = JSON.parse(response['_bodyInit'])
          json = response.json()
        }
      } catch (error) {
        json = { success: false, error: null }
      }
      onSuccess(json)
    })
    //  .then((responseData) =>  {
    //    if (onSuccess instanceof Function) {

    //      onSuccess(responseData);
    //    }
    //  })
    .catch(error => {
      if (onFail instanceof Function) {
        onFail(error)
      }
    })
}

DataFetcher.prototype.getSessionID = function(onSuccess, onFail) {
  return fetch(Setting.API_URL + '/sessions/', {
    method: 'POST',
  })
    .then(response => {
      let json
      try {
        // json = JSON.parse(response['_bodyInit'])
        json = response.json()
      } catch (error) {
        json = ''
      }

      return json
    })
    .then(responseData => {
      if (responseData) {
        if (onSuccess instanceof Function) {
          onSuccess(responseData)
        }
      } else {
        if (onFail instanceof Function) {
          onFail(responseData.error)
        }
      }
    })
    .catch(error => {
      if (onFail instanceof Function) {
        onFail(error)
      }
    })
}

DataFetcher.prototype.fetch2 = function(url, onSuccess, onFail) {
  OAuthUtil.getAccessToken(
    function(accessToken, accessTokenSecret) {
      var authorizationHeader = OAuthUtil.getAuthorizationHeader(
        url,
        true,
        accessToken,
        accessTokenSecret
      )
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: authorizationHeader,
        },
      })
        .then(response => {
          if (onSuccess instanceof Function) {
            onSuccess(response)
          }
        })
        .catch(error => {
          if (onFail instanceof Function) {
            onFail(response)
          }
        })
    },
    function(error) {
      onFail(error)
    }
  )
}

DataFetcher.prototype.get = function(url): Promise {
  return new Promise((resolve, reject) => {
    fetch(URL_API + url, {
      method: 'GET',
    })
      .then(response => {
        if (parseInt(response.status) >= 400) {
          return { success: false, message: 'Bad request' }
        } else {
          return response.json()
        }
      })
      .then(json => {
        if (json.success) {
          return resolve(json)
        } else {
          return reject(json)
        }
      })
      .catch(error => {
        return reject({ success: false, message: error })
      })
  })
}
DataFetcher.prototype.postData = function(data, url): Promise {
  return new Promise((resolve, reject) => {
    DataFetcher().post(
      Setting.API_URL + url,
      JSON.stringify(data),
      function(response) {
        if (response.success) {
          return resolve(response)
        } else {
          return resolve(response)
        }
      },
      function(error) {
        error.success = false
        error.error = langvi['ERROR_NO_INTERNET']
        return resolve(error)
      }
    )
  })
}
DataFetcher.prototype.sendPost = async function(data, url) {
  var result = {}
  if (data.sessionId) {
    var result_Temp = await DataFetcher().postData(data, url)
    if (result_Temp.error === langvi['ERROR_NO_INTERNET']) {
      result.success = false
      result.message = langvi['ERROR_NO_INTERNET']
      result.type = 'alert'
    } else if (result_Temp.success == true) {
      result_Temp.success = true
      result = result_Temp
    } else {
      result.success = false
      result.message = result_Temp.message
      result.type = 'alert'
    }
  }
  return result
}
module.exports = DataFetcher
