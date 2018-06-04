import isomorphicFetch from 'isomorphic-fetch'
import URI from 'urijs'
import _ from 'lodash'

export default function klgFetch (url, options = undefined) {
  if (options && options.query) {
    url = URI(url).query(options.query).toString()
    delete (options.query)
  }

  return isomorphicFetch(ensureAbsoluteUrl(url), optionsHandler(options))
    .then(handleResponse)
}

export function ensureAbsoluteUrl (input) {
  if (typeof input !== 'string') return input
  if (URI(input).is('absolute')) return input
  return URI(input).normalize().toString()
}

export function optionsHandler (options) {
  const defaultOptions = {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (!options) return defaultOptions

  const finalOptions = {
    ...defaultOptions,
    ...options
  }

  delete finalOptions.body
  if (options.body) {
    if (!_.isEmpty(options.body)) {
      finalOptions.body = JSON.stringify(options.body)
    }
  }

  return finalOptions
}

export const handlers = {
  JSONResponseHandler (response) {
    return response.json()
      .then(json => {
        if (response.ok && json.code === 0) {
          return json.data
        } else if (response.ok && !json.code) {
          return json
        } else {
          throw new Error('Bad response from server')
        }
      })
  },
  textResponseHandler (response) {
    if (response.ok) {
      return response.text()
    } else {
      throw new Error('Bad response from server')
    }
  }
}

export function handleResponse (response) {
  if (response.status === 401) {
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'
      return
    }
  }
  let contentType = response.headers.get('content-type')
  if (contentType.includes('application/json')) {
    return handlers.JSONResponseHandler(response)
  } else if (contentType.includes('text/html')) {
    return handlers.textResponseHandler(response)
  } else {
    throw new Error(`Sorry, content-type ${contentType} not supported`)
  }
}
