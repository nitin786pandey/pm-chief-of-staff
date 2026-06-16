# CLAUDE.md — 02-Connected-Tools Section

> **Scope:** This file governs how Claude works within the `02-Connected-Tools/` section of the AI Workflow Showcase. It extends the master `CLAUDE.md` with rules specific to the tool integration documentation.

---

## What This Section Demonstrates

The Connected Tools section shows **how Claude interacts with real external tools** via MCP (Model Context Protocol). Visitors — especially interviewers and technical PMs — should understand:

1. Which tools are connected and why each one matters
2. What Claude reads vs. what it writes for each tool
3. Concrete examples of prompts → actions (what I say, what Claude does)
4. Why MCP specifically, and what it means for security and auditability

---

## Content Rules

### The read/write distinction is critical

Every tool entry must be explicit about what Claude reads and what it writes. This is one of the most important things the showcase communicates — Claude isn't just a passive assistant, it's an active writer to real systems (with appropriate gates).

Always structure tool entries with:
- **What Claude reads** — data pulled in for context
- **What Claude writes** — actions taken in the tool (note: some require explicit approval)
- **Approval model** — does this action fire automatically, or does the user confirm first?

### Approval model conventions

| Action type | Model |
|-------------|-------|
| Reads (Fireflies transcripts, Jira search, Notion page) | Automatic — no confirmation needed |
| Writes to memory files (Open Loops, Risk Register) | Automatic — runs on schedule |
| Writes to external tools (Slack message sent, Jira ticket created) | **Requires user confirmation** unless explicitly scheduled |
| Scheduled writes (nightly harvest, evening debrief mutations) | Automatic — governed by write-ownership rules in master CLAUDE.md |

This distinction matters for the showcase — it shows the system is agentic but not unconstrained.

### Example format

When writing "what I say → what Claude does" examples, follow this format:

```
> **Me:** "[Natural language prompt]"
>
> **Claude:** [Specific action taken — e.g. "Creates the Jira ticket with fields X, Y, Z, 
> links to epic, returns ticket URL: [URL redacted]"]
```

This makes the capability concrete and shows the gap the tool integration closes.

---

## Adding New Tool Documentation

If a new tool connection is added to the showcase:

1. Add a new `##` section to `connected-tools.md`
2. Follow the exact structure of existing tool entries:
   - One-line "what it does"
   - "How I use it" paragraph(s)
   - At least one `> Me: / > Claude:` example
   - "What this replaces" — the meta-work it eliminates
3. Add the tool to the tool map diagram at the top of `connected-tools.md`
4. Update the tool table in `SHOWCASE.md` (Layer 1 — Connected Tools)

### Tool map diagram rules

The ASCII diagram at the top of `connected-tools.md` shows data flow direction. Maintain:
- `──────────────►` for write direction (tool → memory)
- `▲ read by [consumer]` annotations below arrows
- One row per tool, consistent indentation

---

## MCP Section Rules

The "Why MCP" section at the bottom of `connected-tools.md` is intentionally brief. It should explain:

1. No credential storage — token-based auth per tool
2. Explicit permissions — each connection is scoped
3. Auditability — Claude logs what it read/wrote
4. Extensibility — new tools can be added without rebuilding the workflow

Do not expand this into a technical deep dive. It's a trust signal for non-technical readers, not an implementation guide.

---

## Placeholder Conventions (this section)

| What | Format |
|------|--------|
| Tool names | Real names are fine (`Slack`, `Jira`, `Notion`, `Fireflies`, `Google Calendar`) — these are the tools, not company data |
| Channel names | `[Team channel]`, `[Announcements channel]` |
| Slack message content | Generic descriptions — no real message text |
| Jira project keys | `[PROJECT-###]` |
| Notion page titles | `[Project Name] — Notion page` |
| API endpoints | Do not include — not relevant to the showcase |

---

## Files in This Section

| File | What it shows |
|------|--------------|
| `connected-tools.md` | Full tool-by-tool breakdown: reads, writes, examples, MCP rationale |
