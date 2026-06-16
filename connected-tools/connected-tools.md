# Connected Tools

> Claude doesn't just respond to prompts in a chat window. It's connected to the tools I actually use — and it reads from and writes to them automatically, as part of scheduled runs and on-demand tasks.

---

## Tool Map

```
Fireflies ──────────────► Customer Insights — Latest.md (nightly write)
                          ▲ read by Morning Brief

Slack ──────────────────► Search for context, draft/send messages, read threads
                          ▲ Claude reads channel activity for standup, debrief context

Jira ───────────────────► Create issues, update status, add comments
                          ▲ On-demand: spec → Jira ticket in one step

Notion ─────────────────► Sync PRD status, link decisions to pages
                          ▲ On-demand: update project status pages

Google Calendar ────────► Read events for the day (used in Morning Brief context)
                          ▲ Suggest meeting times, flag schedule conflicts
```

---

## Fireflies (Meeting Intelligence)

**What it does:** Records and transcribes meetings. Claude pulls transcripts nightly.

**How I use it:** Every evening at 1 AM, Claude harvests the day's meeting transcripts from Fireflies, extracts customer signals (pain points, feature requests, sentiment), and writes them into `Customer Insights — Latest.md`. By morning, the brief already knows what happened in yesterday's calls.

**Example output (sanitized):**

```
Meeting: [Customer onboarding call] — [Date]
Participants: [CSM], [Customer rep]
Duration: 32 min

Signals extracted:
- Friction: Setup step 3 described as "confusing" — matches T-003 (pricing clarity theme)
- Positive: First successful query in 8 minutes — faster than baseline
- Request: Asked about bulk export feature — second mention this week
```

**What this replaces:** Manually reviewing call notes, copying insights to a doc, trying to remember which customer said what.

---

## Slack

**What it does:** Team messaging. Claude can search, read threads, draft messages, and send (with my confirmation).

**How I use it:**

- **Morning context:** Claude can search for overnight messages relevant to my priorities before generating the brief.
- **Drafting announcements:** I describe what I want to communicate; Claude drafts a Slack message in the right format and tone, then I approve before it's sent.
- **Finding discussions:** "Find all mentions of [Feature X] in the last 2 weeks" — Claude searches and summarizes.

**Example:** When I need to send a sprint announcement, I say: "Draft a Slack message to the [Team] channel announcing [Feature X] delay and the lite variant plan." Claude drafts it, I review, it goes out.

**What this replaces:** Context-switching into Slack to search for information while in the middle of a task.

---

## Jira

**What it does:** Issue tracker. Claude can create tickets, update status, add comments, and search issues.

**How I use it:**

- **Spec → ticket:** After writing a PRD or feature spec, Claude creates the Jira ticket with the right fields, description, and links — no copy-paste.
- **Loop closure:** When an open loop is resolved (e.g., a stakeholder approved something), Claude adds a comment to the relevant Jira ticket automatically.
- **Search:** "What's the current status of [Epic X]?" — Claude queries Jira and summarizes.

**Example prompt → action:**

> Me: "Create a Jira story for [Feature Z Lite] — Phase 1 scope only, link it to [Epic Y], assign to [Team A]."
>
> Claude: Creates the ticket, sets fields, links to epic, adds summary from the PRD, returns the ticket URL.

**What this replaces:** Manually creating and filling in Jira tickets after every spec or decision.

---

## Notion

**What it does:** Documentation and project wiki. Claude can read pages, update status, and create new content.

**How I use it:**

- **PRD sync:** When a PRD phase is completed, Claude updates the Notion project page status.
- **Decision archiving:** Significant decisions from the Decision Ledger can be pushed to the relevant Notion project page.
- **Research:** Claude can search Notion for existing docs before writing a new spec — avoids duplication.

**What this replaces:** Manual wiki updates that nobody does consistently.

---

## Google Calendar

**What it does:** Scheduling. Claude reads my calendar for context.

**How I use it:**

- **Morning Brief enrichment:** Claude checks what's on my calendar today — flags if I have back-to-back meetings that affect task completion time.
- **Scheduling:** "Suggest a 30-min slot this week for a [Stakeholder A] sync" — Claude checks availability and proposes times.
- **Meeting prep:** Before a scheduled meeting, Claude can pull relevant context from memory files (open loops, risks, decisions related to that meeting's topic).

**What this replaces:** Context-switching to calendar while planning the day; manual meeting prep.

---

## Why MCP (Model Context Protocol)?

Each tool connection uses MCP — a standardized protocol that lets Claude interact with external services securely. It means:

- Claude doesn't store credentials — it uses token-based auth per tool.
- Connections are explicit — I can see exactly what Claude is allowed to access.
- Each action is auditable — Claude logs what it read/wrote in the session transcript.
- New tools can be added without rebuilding the workflow — just install the MCP connector.
