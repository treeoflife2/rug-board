# CLAUDE.md

Rug Board is a public dataset of celebrity and influencer crypto scams, plus a static board that displays it, hosted on GitHub Pages from `main` at https://treeoflife2.github.io/rug-board/.

- `data/scams.json` holds all the records. Edit this file directly.
- `README.md` is the authority on scope and record shape. Read it before adding or changing records.
- `excluded.md` lists names that were researched and ruled out. Check it before adding someone, and add to it when you rule someone out.
- `index.html` is the whole board: vanilla JS that fetches `data/scams.json`. Keep it to that one file, with no build step, framework or dependencies.
- `validate.js` checks the data. Run `node validate.js` after every data change. It must print `OK` before you commit.

## Adding records

- **Scope test:** a named public figure used their audience to take money from followers through a crypto asset, and the deception or extraction is documented. Hacked accounts are victims, so exclude them. Exclude fan coins the celebrity had nothing to do with, and disclosed endorsements that simply went down.
- **Sourcing bar:** each record needs a reputable source that makes the specific claim. That means a ZachXBT investigation, an SEC/DOJ/CFTC action, a court filing, or an established outlet (CoinDesk, The Block, Bloomberg, Reuters, BBC, NYT, Decrypt). Index and listing pages, blog spam and SEO coin sites don't count. Put the primary investigation first in `source`.
- **Wording:** write allegations as allegations ("per ZachXBT's wallet analysis…"). Only state a legal outcome when it is documented.
- **`amount`** is the USD taken by the person and their insiders: dump profits, promo fees, presale take. It is not the market-cap collapse and not total victim losses; those go in `amountDesc`. Use `null` rather than guess.
- **One record per incident** (person plus token). Serial offenders get several records. Keep the file sorted by `date` (unix seconds, UTC midnight).
- **New legal outcome** for an existing record (a settlement, ruling or dismissal): update its `outcome` and `description` rather than adding a new record.

## Verifying sources

- **Tweets:** fetch `https://api.fxtwitter.com/<user>/status/<id>`, which returns JSON. Direct x.com fetches fail.
- **ZachXBT's Mirror articles:** `zachxbt.mirror.xyz` returns 403, so read them through `web.archive.org`.
- **sec.gov and justice.gov** block bots. If you only found a URL through search, say so instead of claiming you fetched it.

## Credits

ZachXBT's investigations are the backbone of this dataset. Keep the credit to him prominent in the board header and the README, and in anything else built from this data.

## Publishing (public repo)

- **Sanitize before every commit.** Nothing private or internal goes in: no local paths, no internal company or tool names, no credentials or tokens, no personal contact details of the people in the records (no emails, phone numbers or home addresses).
- **Check `git config user.name` before pushing.** It must be `treeoflife2`. The remote uses the SSH host alias `git@tol.github.com:treeoflife2/rug-board.git`.
- **Test the board locally** with `python -m http.server` (it fetches the JSON, so `file://` won't work). Check desktop width and a 390px phone width; the page must not scroll sideways.
- **Pushing to `main` deploys** the site within about a minute.
