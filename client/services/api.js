import _ from 'lodash'
// import fetch from '../utils/fetch'

export function fetchUserList (params) {
  // return fetch('/api/v1/user/list', params)
  // Mock Data
  return new Promise((resolve, reject) => {
    const limit = +params.query.limit || 10
    setTimeout(() => {
      const docs = _.range(0, limit).map(index => {
        const firstNames = ['张', '李', '陈', '王', '郑']
        const lastNames = ['志军', '爽', '志文', '伟霆', '婷', '天天', '考拉']
        const roles = _.isArray(params.query.role) && params.query.role.length ? params.query.role : ['INVESTOR', 'BORROWER']
        return {
          createdAt: new Date().toISOString(),
          role: _.shuffle(roles)[0],
          name: _.shuffle(firstNames)[0] + _.shuffle(lastNames)[0],
          phone: `1326510718${index % 10}`
        }
      })

      resolve({
        code: 0,
        data: {
          docs,
          total: 100
        }
      })
    }, 200)
  })
}
