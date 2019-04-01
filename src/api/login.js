import request from '@/utils/request'

export function sendMsg (mobile) {
  return request({
    url: '/api/sendMsg/' + mobile,
    method: 'get'
  })
}
