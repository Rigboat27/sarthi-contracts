# sarthi-contracts

Single source of truth for every shared field name and response shape in Sarthi. Extension, engine, and portal derive types from these files. Nothing redefines a shared field locally.

```
sarthi-contracts/
  schemas/          JSON Schema files, draft 2020-12
  types/index.ts    TypeScript mirror of the schemas
  config.json       ports, base URLs, provider flags
```

## Schemas

- `apiEnvelope.schema.json` wraps every engine response in `ok`, `data`, `meta`, and `error`. `meta` carries token counts, INR cost estimate, and the mock flag.
- `holding.schema.json` defines one financial account record. Fields include `id`, `type` (bank, demat, mutual_fund, insurance, ppf, fd), `provider`, `providerCode`, `label`, `maskedNumber`, `value`, `identifier`, `detail`, `fixUrl`, and `nominee` with `name`, `relationship`, and `verified`.
- `aaConsent.schema.json` defines the consent request with `aggregatorId` and `scopes`, plus the artefact shape the engine returns.
- `aaFetchResponse.schema.json` defines the fetch result with `consentId`, optional `ownerName`, and `fips` grouped as `fipId`, `type` (DEPOSIT, INVESTMENTS, INSURANCE, PPF), and `data` holding arrays.
- `grievanceState.schema.json` mirrors the extension `GrievanceState` exactly, including combined `clientIdFolioNoDpid`, `priorContactProof` enum, object `attachments`, and code owned fields such as `priorContactConfirmed` and `skippedFields`.
- `affidavit.schema.json` defines the transmission affidavit inputs. Fields cover deceased name, applicant name, relationship, gender, father name, age, address, company, folio, certificate numbers, distinctive numbers, face value, share count, death date and place, family tree with name plus relationship plus age, and NOC list.

`aaFetchResponse` inlines the holding definition so it validates standalone without a schema registry.

## TypeScript types

`types/index.ts` mirrors each schema with `Holding`, `Nominee`, `Fip`, `AaConsentArtefact`, `AaConsentResponse`, `AaFetchResponse`, `ApiEnvelope`, `Meta`, `GrievanceState`, `Attachment`, `Affidavit`, and `FamilyMember`. Extension and portal import from here.

## config.json

Records the canonical ports and URLs plus provider flags. Engine reads its own `.env` at runtime. Portal reads `NEXT_PUBLIC_API_BASE`. This file stays the documented reference when values drift.

## Consuming the repo

Add it as a git submodule at `contracts/` inside a consumer repo.

```bash
git submodule add https://github.com/Rigboat27/sarthi-contracts contracts
```

Import types in extension or portal code.

```ts
import type { Holding, AaFetchResponse, ApiEnvelope } from "../contracts/types";
```

The portal also ships `npm run sync:contracts`, which vendors the canonical types into `lib/contracts.ts` when a submodule feels heavy.

## Changing a contract

1. Edit the schema in `schemas/` and the matching interface in `types/index.ts`.
2. Update the Pydantic model in `sarthi-engine/app/models/`.
3. Bump the consumer submodule pointer or rerun the sync script.
4. Run `pytest tests/` in the engine and `npm run test:contracts` in the portal. Both validate fixtures against the schemas and fail on drift.

## What lives elsewhere

SEBI timelines and broker contacts live in the engine repo under `app/data/` and are served at runtime through `/data/rules` and `/data/brokers`. They are data, so they stay out of this repo.
