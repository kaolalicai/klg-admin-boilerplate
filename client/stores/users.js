import {fetchUserList} from 'services/api'
import {registerDataSourceToModule} from 'common/store'

const module = {
  namespaced: true
}

export default registerDataSourceToModule(module, {
  list: ['fetchUserList', fetchUserList]
})
