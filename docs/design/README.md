# Design drops

Design iterations for stevedores.org are tracked here and released as immutable, rollback-friendly GitHub releases on this repo.

## Convention

- **Tag scheme:** `design-vYYYY.MM.DD` (date-based; add `-N` suffix only for multiple drops on the same day).
- **Per-drop doc:** `YYYY-MM-DD-gap-map.md` in this directory — diffs the new drop against the then-current site, lists open questions, and estimates effort.
- **Release asset:** the original Figma/Make export `.zip`, uploaded verbatim. Marked `--prerelease --latest=false` so it does not appear as the repo's "Latest release."
- **Rollback:** `gh release download design-vYYYY.MM.DD -R stevedores-org/stevedores.org -p '*.zip'` re-pulls the exact bytes.

## Index

| Date | Tag | Doc | Headline |
|---|---|---|---|
| 2026-06-09 | [`design-v2026.06.09`](https://github.com/stevedores-org/stevedores.org/releases/tag/design-v2026.06.09) | [2026-06-09-gap-map.md](2026-06-09-gap-map.md) | Pivot from one-page AI-packaging marketing site to a six-view community-hub dashboard |
