import Cookies from 'js-cookie'

const userKey = 'vote_user_key'

export function getUser () {
  return Cookies.get(userKey)
}

export function setUser (userInfo) {
  return Cookies.set(userKey, userInfo)
}

export function removeUser () {
  return Cookies.remove(userKey)
}
