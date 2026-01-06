---
title: Translucent Grid Overview (Intent)
status: active  # allowed: proposed | active | superseded
draft_status: n/a  # allowed: idea | exploring | paused | n/a
created_at: 2026-01-06
updated_at: 2026-01-06
references:
  - ../../draft/design_concepts/translucent_grid_overview.md
  - ../../draft/design_concepts/core_aesthetics.md
  - ../../draft/design_concepts/page_design_concept.md
related_issues: []
related_prs: []
---

## Context
- 「透過するグリッド」の核となる美学と原理を、媒体非依存で統一する必要がある。
- 既存のドラフト群は重複が多く、設計判断の軸が散在していた。

## Decision
- 核となる思想を「構造（線・面・反復）」と「現象（影・反射・透過）」の等価性として定義する。
- 光や影は「照明」ではなく、他のコンテンツと等価に扱う対象として提示する。
- 3軸（Geometric Order / Tactile Light & Texture / Anonymous Silence）を中核原理とする。

## Alternatives
- 美学を媒体ごとに別表現へ分割する案。
- 「光」をアクセントに限定する案。

## Rationale
- 軸を統一することで、UI/文章/写真/実装の全領域で一貫した判断基準を持てる。
- 光や影を等価に扱うことで、構造と現象の二分がブレず、静寂の秩序が保てる。

## Consequences / Impact
- すべての表現は「構造」「現象」「余白」のいずれかに必ず紐づける。
- 情緒的な物語や過剰な装飾は原則として排除される。

## Rollback / Follow-ups
- 方向性の転換が必要な場合は新しい intent を作成し、本ドキュメントを superseded にする。
- 実装が進んだタイミングで guide/reference に反映する。

