export default function convertObjToOptions (obj) {
  return Object.keys(obj).map(key => ({
    value: key,
    label: obj[key]
  }))
}
