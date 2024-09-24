export type User = {
  id: string,
  username: string,
  url: string,
  name: string,
  bio: string,
  location: string,
  following_count: number,
  followers_count: number,
  posts_count: number,
  verified: boolean,
  created_at: string,
  default_profile_image: boolean,
  followed_by: boolean,
  following: boolean,
  likes_count: number,
}