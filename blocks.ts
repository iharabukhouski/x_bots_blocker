import { User } from './users'

export async function block(
  headers: { [key: string]: string },
  userId: User['id'],
) {

  const params = new URLSearchParams()

  params.append(`user_id`, userId)

  const response = await fetch(
    `https://x.com/i/api/1.1/blocks/create.json`,
    {
      method: `POST`,
      headers: {
        ...headers,
        'Content-Type': `application/x-www-form-urlencoded`,
      },
      body: params
    }
  )

  const body = await response.json()

  // console.log(body)
}
