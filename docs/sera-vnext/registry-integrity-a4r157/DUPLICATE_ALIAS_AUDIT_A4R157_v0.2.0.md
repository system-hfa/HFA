# Duplicate Alias Audit A4R157 v0.2.0

Status: DUPLICATE_ALIAS_AUDIT_RECORDED
Phase: A4R157

## Shared Paths Across Multiple eventIds

Machine check detected 10 shared local TXT paths used by multiple registry event ids.

Representative pairs:
- Colgan path shared with BS211 alias lane
- UPS path shared across EXT/TXT ids
- Air Canada 624 paths shared across EXT/TXT ids
- G-WNSB, Cougar A09A0016, EC225 G-REDW/G-CHCN shared across EXT/TXT ids
- Execuflight and Corporate 5966 paths shared across EXT/TXT ids

## Events with Multiple Copies

Multiple canonical events keep parallel copies across curated/full-pool/recovered/new50 layers. This is acceptable only when one path is authoritative and the others are explicitly mapped as aliases/copies.

## Acceptable Duplicates

- Same-event parallel copies with consistent authority chain and matching identifiers can remain physically in place.
- They still require registry-level alias normalization (no physical move in this phase).

## Duplicates Requiring Decision

- Any shared path crossing event boundaries or alias-neighbor collisions remains blocking.
- BS211/Colgan collision remains the key precedent for mandatory explicit ownership mapping.

## Known Aliases

- EXT-* and TXT-* identifiers often point to identical local files.
- A4R153/A4R154 overlays remain authoritative where collisions/contamination were already recorded.

## Items Not To Count as Separate Events

- `pdf24_merged-5/6/7/8` (non-event reference contamination)
- `pdf24_merged-3` (bulletin/multi-event index)
- `pdf24_merged-2` (journalism, not official report)

## Forward Action (No Physical Changes Yet)

Use A4R158 overlay correction to normalize ownership and alias mapping before any gate-prep expansion.
