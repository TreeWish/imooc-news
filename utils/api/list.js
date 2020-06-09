import http from '../http.js'

export const getLabel = (data) => {
  return http({
    url: 'get_label',
    data
  })
}

export const getList = (data) => {
  return http({
    url: 'get_list',
    data
  })
}
export const updateLike = (data) => {
  return http({
    url: 'update_like',
    data
  })
}
export const getUser = (data) => {
  return http({
    url: 'get_user',
    data
  })
}
export const getSearch = (data) => {
  return http({
    url: 'get_search',
    data
  })
}