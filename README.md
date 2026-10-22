# Rug Board

**Board: https://treeoflife2.github.io/rug-board/**

This dataset tracks how much money celebrities, influencers and public figures took from their followers through crypto scams. Each record covers one incident and cites its sources. The data is plain JSON in [`data/scams.json`](data/scams.json), and the board is a single static page that reads it.

## Credits

Most of these records trace back to investigations by **[ZachXBT](https://x.com/zachxbt)**. This dataset exists because of his work. If you reuse the data, please credit him.

Other sources that come up often: Coffeezilla, SEC/DOJ/CFTC actions, court filings, Bubblemaps, and established outlets (CoinDesk, The Block, Bloomberg, NYT, BBC, Fortune, CNBC).

## Scope: what counts as a scam here

A record belongs here only if **a named public figure used their audience to take money from followers through a crypto asset, and the deception or extraction is documented**. It has to fit one of these four types:

1. **Insider Dump**: they launched a token (or took an insider allocation in one), and they or their team sold it to buyers who came in because of their name. Selling a presale allocation at launch counts, and so does sniping their own launch.
2. **Undisclosed Promo**: they were paid to promote a token and hid the payment. The SEC's EthereumMax and Tron/BTT cases are the standard examples.
3. **Deleted Promo**: they promoted a token, the price collapsed, and they deleted the posts. Deleting the posts is treated as evidence of intent. The record still needs a source that documents both the promo and the collapse.
4. **Abandoned Project**: a project sold on their name that took buyers' money and delivered nothing, like CryptoZoo.

**Excluded:**

- **Hacked accounts.** A celebrity whose X or Instagram account was taken over to shill a coin is a victim, not a scammer. The hacker can get a record only if they are a public figure acting under their own name.
- **Fan or impersonation coins.** These are tokens that use a celebrity's name without any documented involvement from that celebrity.
- **Bad calls.** A disclosed promotion of a coin that later dropped is not a scam unless there is evidence of insider selling or a hidden payment.
- **Protocol rugpulls**, where a real protocol's privileged controls were abused. These are a different category.

Every record needs a reputable source that makes the *specific* claim. Allegations are written as allegations ("per ZachXBT's wallet analysis…") unless there is a settlement, conviction or admission. Index and listing pages are not accepted as sources.

[`excluded.md`](excluded.md) lists the names that were researched and ruled out, with the reason for each.

## Record shape

There is one record per **incident** (a person plus a token or project). Serial offenders have several records. Per-person totals are computed from the records and are not stored as a field.

| Field          | Type           | Notes |
| -------------- | -------------- | ----- |
| `date`         | number         | Unix seconds at UTC midnight. Use the launch or promo date, or the dump date if that is what the sources document. |
| `name`         | string         | The person or group (e.g. `FaZe Clan members`), under the real or stage name they're known by. |
| `handle`       | string \| null | Their X handle at the time, without the `@`. |
| `role`         | string         | One of `Musician`, `Athlete`, `Streamer/Gamer`, `Crypto KOL`, `Reality TV/Model`, `Actor`, `Politician`, `Internet Celebrity`, `Other`. |
| `scamType`     | string         | One of `Insider Dump`, `Undisclosed Promo`, `Deleted Promo`, `Abandoned Project`. |
| `token`        | string \| null | Ticker or project name (`HAWK`, `EMAX`, `CryptoZoo`). |
| `chain`        | string[]       | Chain names (`Ethereum`, `Solana`, …). Use `[]` if there are none or they are unknown. |
| `amount`       | number \| null | USD **taken by the person and their insiders**: dump profits, promo fees, presale take. It is not the market-cap collapse and not total victim losses; those go in `amountDesc`. Use `null` when there is no reliable estimate. |
| `amountDesc`   | string         | How the amount breaks down, plus what victims lost. Example: `~$3M insider wallets dumped at peak; token fell 91% from $490M mcap`. |
| `deletedPromo` | boolean        | Whether they deleted the promotional posts afterwards. |
| `source`       | string[]       | Working https URLs. Put the primary investigation first (the ZachXBT thread or article when there is one), then legal filings and press. |
| `description`  | string         | 2–4 sentences: what they promoted, how the money was taken, the evidence, and any legal outcome. Word allegations as allegations. |
| `outcome`      | string \| null | Any legal or regulatory result, e.g. `SEC settlement $1.26M` or `class action pending`. `null` if there is none. |

## Contributing

1. Edit `data/scams.json`. Records are sorted by `date`.
2. Run `node validate.js`. It checks field types, the allowed values and duplicates.
3. Open a PR that links the sources.

To report a mistake or a missing incident, [open an issue](https://github.com/treeoflife2/rug-board/issues/new) with sources.

## Run locally

The page fetches the JSON file, so serve the folder over HTTP rather than opening the file directly:

```sh
npx serve .        # or: python -m http.server
```
