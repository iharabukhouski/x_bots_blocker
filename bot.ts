import { User } from './users'
import ignore from './ignore.json'

export function isBot(
  user: User,
): boolean {

  if (user.verified === true) {

    return false
  }

  if (user.following === true) {

    return false
  }

  if (user.likes_count > 0) {

    return false
  }

  if (ignore.includes(user.username)) {

    return false
  }

  if (user.followers_count > 1000) {

    return false
  }

  if (user.following_count < 500) {

    return false
  }

  if (user.posts_count > 10) {

    return false
  }

  if (user.bio.length !== 0) {

    return false
  }

  return true
}
