import {isUrl} from '../utils/util'

const menuData = [
  {
    name: '用户管理',
    icon: 'news',
    path: 'users',
    children: [
      {
        name: '用户列表',
        path: 'list'
      }
    ]
  }
]

function formatter (data, parentPath = '/') {
  return data.map(item => {
    let {path} = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path
    }
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
