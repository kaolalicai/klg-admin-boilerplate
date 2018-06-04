import _ from 'lodash'

/**
 * 创建通用异步state
 */
export function createAsyncState () {
  return {data: null, isLoading: false, error: null}
}

/**
 * 创建异步操作 Action，譬如获取订单列表：createAsyncAction('fetchList', fetchOrderList)
 * 1. start：commit fetchList_START
 * 2. 调用 fetchOrderList 返回 response
 * 2. resolve：commit fetchList_SUCCESS {response}
 * 3. reject：commit fetchList_ERROR {error}
 * @param {String} actionName Action Name
 * @param {Function} asyncFunc Promise function
 */
export function createAsyncAction (actionName, asyncFunc) {
  return function ({commit, dispatch, state}, ...rest) {
    commit(`${actionName}_START`)
    return asyncFunc(...rest)
      .then((response = {}) => {
        commit(`${actionName}_SUCCESS`, {response})
        return response
      })
      .catch(error => {
        commit(`${actionName}_ERROR`, {error})
      })
  }
}

/**
 * 创建异步操作 Mutation
 * @param {String} type createAsyncAction(func) func.name
 * @param {Array} props 需要修改的state.prop...prop 不传则直接修改state
 */
export function createAsyncMutation (type, ...props) {
  function getMutationState (state, props) {
    let mutationState = state
    if (props && props.length) {
      mutationState = _.get(state, props)
    }
    if (!mutationState) {
      throw new Error(`getMutationState can not find state.${props.join('.')}`)
    }
    return mutationState
  }

  return {
    [type + '_START']: function (state) {
      const mutationState = getMutationState(state, props)
      mutationState.isLoading = true
    },
    [type + '_SUCCESS']: function (state, {response}) {
      const mutationState = getMutationState(state, props)
      mutationState.data = response.data || response
      mutationState.isLoading = false
      mutationState.error = null
    },
    [type + '_ERROR']: function (state, {error}) {
      const mutationState = getMutationState(state, props)
      mutationState.error = error
      mutationState.data = null
      mutationState.isLoading = false
    }
  }
}

/**
 * 绑定数据源到Module
 * @param {Object} module vuex module
 * @param {Object} options
 * {
 *    data1: ['actionName', asyncFunc],
 *    data2: {
 *      info: ['fetchInfo', fetchInfo],
 *      detail: ['fetchDetail', fetchDetail]
 *    }
 * }
 * @param {Rest} props
 */
export function registerDataSourceToModule (module, options, ...props) {
  _.forOwn(options, (source, key) => {
    const parentProps = props.concat(key)
    if (_.isArray(source)) {
      const [actionName, asyncFunc] = source
      module.state = _.set(module.state || {}, parentProps, createAsyncState())
      module.actions = {
        ...module.actions,
        [actionName]: createAsyncAction(actionName, asyncFunc)
      }
      module.mutations = {
        ...module.mutations,
        ...createAsyncMutation(actionName, ...parentProps)
      }
    } else if (_.isPlainObject(source)) {
      registerDataSourceToModule(module, source, ...parentProps)
    } else {
      throw new Error('registerDataSourceToModule Only [actionName, asyncFunc] or Object Support: ')
    }
  })

  return module
}
