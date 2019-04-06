import request from '@/utils/request'

export function fetchList (query) {
  return request({
    url: '/api/votes/' + query,
    method: 'get'
  })
}

export function fetchDoneList (query) {
  return request({
    url: '/api/done_votes/' + query,
    method: 'get'
  })
}

export function doVote (data) {
  return request({
    url: '/api/setVotes',
    method: 'post',
    data
  })
}
