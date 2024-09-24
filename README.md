1. create `headers.json` with the following content

```json
{
  "Authorization": "...",
  "Cookie": "...",
  "x-csrf-token": "..."
}
```

2. create `ignore.json`

```json
[
  "username_here"
]
```


3. run

```sh
bun index.ts
```
