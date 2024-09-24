1. create `headers.ts`

```ts
export default {
  "authorization": "<INSERT_TOKEN_HERE>",
  "cookie": "<INSERT_COOKIES_HERE>",
  "x-csrf-token": "<INSERT_CSRF_TOKEN_HERE>"
}
```

2. create `ignore.ts`

```ts
export default [
  // (optional) Insert here usernames that u don't wanna block
] as string[]
```

3. (optional) adjust heuristics in `bot.ts`
4. run `bun index.ts`
