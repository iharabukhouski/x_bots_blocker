import { User } from './users'
import ignore from './ignore'

export function isBot(
  user: User,
): boolean {

  // a bot if has 0 likes
  // if (user.likes_count === 0) {

  //   return true
  // }

  // not a bot if has blue tick
  if (user.verified === true) {

    return false
  }

  // not a bot if u are following this account
  if (user.following === true) {

    return false
  }

  // not a bot if has >0 likes
  if (user.likes_count > 0) {

    return false
  }

  // not a bot if in the `ignore` list
  if (ignore.includes(user.username)) {

    return false
  }

  // not a bot if >1000 ppl follow this user
  if (user.followers_count > 1000) {

    return false
  }


  // not a bot if this account follows <500 ppl
  if (user.following_count < 500) {

    return false
  }

  // not a bot if has posted >100 times
  if (user.posts_count > 100) {

    return false
  }

  // not a bot is bio has content
  if (user.bio.length !== 0) {

    return false
  }

  return true
}
