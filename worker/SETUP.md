# Private Listening Room — setup

The page lives at `/listening` and is not linked from anywhere on the site.

**The rule this whole design exists to enforce: unreleased audio never goes in
`public/`.** Everything under `public/` is copied to `dist/` and served to
anyone who knows the URL, linked or not. Private tracks live in a private R2
bucket and only ever reach a browser through the Worker, after a code check.

## One-time setup

All commands run from `website/future/`.

### 1. Private bucket for the audio

```bash
npx wrangler r2 bucket create obelisk-private-audio
```

Leave public access **off**. The Worker reads it with a binding, not a URL.

### 2. Store for the invitations

```bash
npx wrangler kv namespace create INVITES
```

Copy the printed `id` into `wrangler.jsonc`, replacing
`REPLACE_WITH_KV_NAMESPACE_ID`.

### 3. Signing secret for sessions

```bash
npx wrangler secret put SESSION_SECRET
```

Paste a long random string when prompted. It signs the session cookie; nobody
needs to remember it. Changing it later logs everyone out, which is a fine way
to end every session at once.

## Adding a track

Transcode first — the master never leaves your machine:

```bash
ffmpeg -i "master.wav" -c:a libmp3lame -b:a 128k -map_metadata -1 "artifact-ii-01.mp3"
```

`-map_metadata -1` strips tags, so the file carries no title or artist if it
does escape.

```bash
npx wrangler r2 object put obelisk-private-audio/unreleased/artifact-ii-01.mp3 \
  --file=artifact-ii-01.mp3 --remote
```

## Inviting someone

```bash
node ../../tools/mint_invite.mjs "Label A&R" 14 unreleased/artifact-ii-01.mp3
```

It prints a code and the exact `wrangler kv key put` command to activate it.
Nothing is written until you run that command.

Send the person `https://…/listening` and the code — ideally through two
different channels.

## Revoking, and checking who listened

```bash
# who used this code, how often, when
npx wrangler kv key get --binding=INVITES --remote "invite:XXXX-XXXX"

# cut them off immediately
npx wrangler kv key delete --binding=INVITES --remote "invite:XXXX-XXXX"
```

Each record carries `hits` and `lastSeen`. That is the point of per-person
codes: if a track appears online, the access log narrows it to one invitation.

## What this does not do

It does not stop someone recording their own speakers or screen. No system
does. What it does is keep the files off the open web, out of search engines,
and out of anyone's hands who was not invited — and make a leak traceable to a
single code. Treat it as deterrence and attribution, not prevention.
