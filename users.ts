export type User = {
  id: string,
  username: string,
  name: string,
  bio: string,
  url: string,
  location: string,
  following_count: number, // how many ppl this account follows
  followers_count: number, // how many ppl follow this account
  posts_count: number,
  likes_count: number,
  verified: boolean, // true if has blue tick
  default_profile_image: boolean,
  followed_by: boolean, // true if u are followed by this account
  following: boolean, // true if u following this account
  created_at: string,
}
