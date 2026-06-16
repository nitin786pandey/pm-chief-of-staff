# /onboard — PM Chief of Staff Connector Setup

**Trigger:** User runs `/onboard`
**Purpose:** Detect which MCP connectors are live, walk through setup for missing ones, confirm auth, write config.

---

## Step 0 — Read config

Read `.pm-chief/config.json` to check initialisation state and which connectors are already confirmed.
If the file doesn't exist, tell the user to run `pm-chief init` first and stop.

---

## Step 1 — Detect connected MCP servers

Check `.claude/mcp.json` (or `~/.claude/mcp.json` if not local) for server entries.

Map each entry to a connector:

| Connector | MCP server name patterns |
|-----------|--------------------------|
| Slack | `slack`, `mcp-slack` |
| Jira | `jira`, `atlassian`, `mcp-jira` |
| Notion | `notion`, `mcp-notion` |
| Fireflies | `fireflies`, `mcp-fireflies` |
| Granola | `granola`, `mcp-granola`, `granola-cli` |
| Gmail | `gmail`, `google-mail` |
| Google Calendar | `google-calendar`, `gcal` |

Build a status table:

```
CONNECTOR          STATUS
─────────────────────────────
Slack              ✅ connected
Jira               ✅ connected
Notion             ⚠️  not found
Fireflies          ⚠️  not found
Granola            ✅ connected
Gmail              ⚠️  not found
Google Calendar    ⚠️  not found
```

Print this table. Then say:

> "I'll walk you through setting up each missing connector. You can skip any you don't use — pm-chief will only schedule runs using the ones you confirm."

---

## Step 2 — Walk through each missing connector

For each connector with status ⚠️ not found, in this order:
Slack → Jira → Notion → Fireflies → Granola → Gmail → Google Calendar

### For each connector:

1. **Explain what it's used for** (one sentence, from the table below)
2. **Show the install command** (exact, copy-paste ready)
3. **Ask:** "Do you want to set this up now, or skip?"
4. If skip → mark as `skipped` in config, move on
5. If yes → show full setup steps, then **smoke test** (see Step 3)

---

### Connector details

**Slack**
- Used for: reading channel messages and threads for the Evening Debrief and COMMITMENT DRIFT detection
- Install: `claude mcp add slack -- npx -y @modelcontextprotocol/server-slack`
- Needs: `SLACK_BOT_TOKEN` and `SLACK_TEAM_ID` in `.env`
- Docs: https://github.com/modelcontextprotocol/servers/tree/main/src/slack

**Jira**
- Used for: reading ticket status for Open Loops reconfirmation; writing new tickets and comments
- Install: `claude mcp add jira -- npx -y @modelcontextprotocol/server-jira`
- Needs: `JIRA_URL`, `JIRA_EMAIL`, `JIRA_API_TOKEN` in `.env`
- Docs: https://github.com/modelcontextprotocol/servers/tree/main/src/jira

**Notion**
- Used for: reading and writing PRD pages and project status
- Install: `claude mcp add notion -- npx -y @modelcontextprotocol/server-notion`
- Needs: `NOTION_API_KEY` in `.env`
- Docs: https://github.com/modelcontextprotocol/servers/tree/main/src/notion

**Fireflies**
- Used for: pulling meeting transcripts nightly (Fireflies Harvest run)
- Install: `claude mcp add fireflies -- npx -y mcp-fireflies`
- Needs: `FIREFLIES_API_KEY` in `.env`
- Docs: https://fireflies.ai/api

**Granola**
- Used for: reading AI meeting summaries from the Granola app
- Install: `npm install -g granola-cli` then `claude mcp add granola -- granola mcp`
- Needs: `granola auth login` completed first
- Note: granola-cli must be authenticated separately before MCP will work

**Gmail**
- Used for: reading inbound threads for the Morning Brief and TRUST RISK detection
- Install: `claude mcp add gmail -- npx -y @modelcontextprotocol/server-gmail`
- Needs: OAuth — follow the Google Cloud Console setup at the docs link
- Docs: https://github.com/modelcontextprotocol/servers/tree/main/src/gmail

**Google Calendar**
- Used for: reading today's events for the Morning Brief and Day Shape calculation
- Install: `claude mcp add gcal -- npx -y @modelcontextprotocol/server-google-calendar`
- Needs: same OAuth credentials as Gmail if already set up
- Docs: https://github.com/modelcontextprotocol/servers/tree/main/src/google-calendar

---

## Step 3 — Smoke test each newly set up connector

After the user installs a connector and says they're ready:

Run a minimal read to confirm auth works:

| Connector | Smoke test |
|-----------|-----------|
| Slack | List the 3 most recent messages in any channel |
| Jira | Fetch the title of any open ticket |
| Notion | Search for any page |
| Fireflies | List the most recent meeting |
| Granola | Run `granola meeting list` |
| Gmail | List subject lines of the 3 most recent emails |
| Google Calendar | List today's events |

If the smoke test passes → print `✅ [Connector] confirmed`
If it fails → print the error, suggest likely fix (wrong token, missing scope, etc.), and offer to retry or skip

---

## Step 4 — Timezone confirmation

Read the timezone from `.pm-chief/config.json`.
Display it and ask: "Your scheduled runs will fire in **[timezone]**. Is this correct?"
If no → ask for the correct timezone and update the config file.

---

## Step 5 — Write confirmed connectors to config

Update `.pm-chief/config.json`:

```json
{
  "connectors": {
    "slack": "confirmed",
    "jira": "confirmed",
    "notion": "skipped",
    "fireflies": "confirmed",
    "granola": "confirmed",
    "gmail": "skipped",
    "google-calendar": "skipped"
  }
}
```

---

## Step 6 — Summary and next step

Print a summary table of all connectors with final status.

Then say:

> "Setup complete. Your runs will use: **[list of confirmed connectors]**."
>
> "To start scheduled auto-runs (requires pm2):
> ```
> pm-chief start
> ```
>
> To fire a run manually right now:
> ```
> pm-chief run morning
> pm-chief run evening
> pm-chief run weekly
> ```"

---

## Rules

- Never store API keys or tokens in the skill output — always write them to `.env` only
- Never mark a connector as `confirmed` without a passing smoke test
- If a connector was previously confirmed in config, skip its setup steps and just show its status as ✅
- If `.pm-chief/config.json` is missing, stop and tell the user to run `pm-chief init` first
