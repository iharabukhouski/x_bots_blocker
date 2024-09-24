console.clear()

import { sleep } from './utils'
import { listAllFollowers } from './followers'
import { block } from './blocks'
import { isBot } from './bot'
import headers from './headers'

const followers = await listAllFollowers(
  headers,
)

console.log(`===============================`)

// console.log(followers)

const bots = followers.filter(isBot)

console.log(`bots`, bots.length)
console.log(`bots`, bots)

bots.forEach(
  async (
    bot
  ) => {

    console.log(`removing bot`, bot.name, bot.username, bot.url)

    await sleep(5000)

    await block(
      headers,
      bot.id,
    )
  }
)

export {}
