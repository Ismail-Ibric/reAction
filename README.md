# reAction REST API

![Imgur](https://i.imgur.com/g4mowgX.png)

## Details

Watches for GitHub Actions to rebuild a repo.

## Frameworks / Libraries

- Node.js
  -
  - TypeScript used for strict typing.
  - Express used to serve endpoints.
  - Spawning a process, waiting, reading output.
  - GitHub CLI called to clone a Repo, with a Private Key.
  - Repo Build deployed into [this production site](https://izzys.work).