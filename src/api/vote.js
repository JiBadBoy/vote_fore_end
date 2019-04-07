import request from '@/utils/request'

export function fetchList (code, type) {
  return request({
    url: '/api/votes/' + code + '/' + type,
    method: 'get'
  })
}

export function fetchDoneList (code, type) {
  return request({
    url: '/api/votes_done/' + code + '/' + type,
    method: 'get'
  })
}

export function doVote (data) {
  return request({
    url: '/api/Vote',
    method: 'post',
    data
  })
}
