# sarthi-contracts

Single source of truth for the Sarthi SEBI Track B stack. Every component
(extension, engine, portal) derives its field names and response shapes from
these files — **nothing redefines a shared field locally**.

## Contents

- `schemas/*.json` — canonical JSON Schemas.
- `types/index.ts` — TypeScript types mirroring the schemas (for extension & portal).
- `config.json` — ports, URLs, and provider flags (documented canonical list).

The FastAPI engine keeps Pydantic models in lockstep (see `sarthi-engine/app/models`).

## Consuming this repo

Add as a **git submodule** at `contracts/`:

```bash
git submodule add <this-repo-url> contracts
git submodule update --init --remote
```

Import types (extension/portal):

```ts
import type { Holding, AaFetchResponse, ApiEnvelope } from "../contracts/types";
```

Or install as a git dependency (npm):

```json
"@sarthi/contracts": "github:<org>/sarthi-contracts"
```

## Changing a contract

1. Edit the schema in `schemas/` **and** the TS types in `types/`.
2. Bump `config.json` `version`.
3. Update the engine's Pydantic model.
4. Bump the submodule pointer in every consumer repo. Their typecheck breaks loudly
   if they lag — that's the point.

## Not here

SEBI rules and the broker directory live in the **engine repo**
(`sarthi-engine/app/data/`) and are served at runtime via `/data/rules` and
`/data/brokers`. They are data, not types.
