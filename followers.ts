import { sleep } from './utils'
import { User } from './users'

export async function listFollowers(
  headers: { [key: string]: string },
  cursor?: string,
): Promise<{ followers: User[], bottomCursor: string }> {

  console.log(`list followers start`)
  console.log(`cursor`, cursor)

  const cursorStr = cursor ? `%22cursor%22%3A%22${encodeURIComponent(cursor)}%22%2C` : ``

  const response = await fetch(
    `https://x.com/i/api/graphql/OSXFkKmGvfw_6pGgGtkWFg/Followers?variables=%7B%22userId%22%3A%221499103096%22%2C%22count%22%3A20%2C${cursorStr}%22includePromotedContent%22%3Afalse%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D`,
    {
      headers,
    }
  )

  const body = await response.json()

  // console.log(`body:`, JSON.stringify(body))

  // const entries = body.data.user.result.timeline.timeline.instructions[0].entries
  const entries = body.data.user.result.timeline.timeline.instructions.find(
    (
      instruction,
    ) => {

      return Array.isArray(instruction.entries)
    }
  ).entries

  const bottomCursor = entries.find(
    (
      entry
    ) => {

      return entry.content.entryType === `TimelineTimelineCursor` && entry.content.cursorType === `Bottom`
    }
  ).content.value

  console.log(`bottomCursor`, bottomCursor)

  const followers = entries.map(
    (
      entry,
      i,
    ) => {

      // if (i === 0) {

      //   console.log(entry)
      // }

      if (entry.content.entryType === `TimelineTimelineCursor`) {

        return null
      }

      try {

        const username = entry.content.itemContent.user_results.result.legacy.screen_name

        return {
          id: entry.content.itemContent.user_results.result.rest_id,
          username,
          url: `https://x.com/${username}`,
          name: entry.content.itemContent.user_results.result.legacy.name,
          bio: entry.content.itemContent.user_results.result.legacy.description,
          location: entry.content.itemContent.user_results.result.legacy.location,
          following_count: entry.content.itemContent.user_results.result.legacy.friends_count,
          followers_count: entry.content.itemContent.user_results.result.legacy.followers_count,
          posts_count: entry.content.itemContent.user_results.result.legacy.statuses_count,
          verified: entry.content.itemContent.user_results.result.legacy.verified,
          created_at: entry.content.itemContent.user_results.result.legacy.created_at,
          default_profile_image: entry.content.itemContent.user_results.result.legacy.default_profile_image,
          followed_by: entry.content.itemContent.user_results.result.legacy.followed_by,
          following: entry.content.itemContent.user_results.result.legacy.following,
          likes_count: entry.content.itemContent.user_results.result.legacy.favourites_count,
        }
      } catch {

        console.log(entry)
      }
    }
  )
  .filter(
    (
      follower
    ) => {

      return follower != null
    }
  )

  console.log(`followers`, followers.length)
  console.log(`list followers end`)

  return {
    followers,
    bottomCursor,
  }
}

export async function listAllFollowers(
  headers: { [key: string]: string },
  followers: User[] = [],
  cursor?: string,
): Promise<User[]> {

  const response = await listFollowers(
    headers,
    cursor,
  )

  const followersUpdated = [
    ...followers,
    ...response.followers
  ]

  if (!response.bottomCursor.startsWith(`0`)) {

    await sleep(5000)

    return listAllFollowers(
      headers,
      followersUpdated,
      response.bottomCursor,
    )
  }

  return followersUpdated
}
