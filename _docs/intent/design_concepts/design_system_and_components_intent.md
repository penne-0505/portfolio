---
title: Design System and Components (Intent)
status: active  # allowed: proposed | active | superseded
draft_status: n/a  # allowed: idea | exploring | paused | n/a
created_at: 2026-01-06
updated_at: 2026-01-06
references:
  - ../../draft/design_concepts/design_system_and_components.md
  - ../../draft/design_concepts/ui_component_archtecture.md
  - ../../draft/design_concepts/page_design_concept.md
related_issues: []
related_prs: []
---

## Context
- 色・タイポ・コンポーネント構成の指針が複数ドキュメントに分散していた。
- 「構造」と「現象」の両立をUI定数で担保する必要がある。

## Decision
- 低彩度のコンクリート基調に、構造線と光/影の差分を与える配色を採用する。
- タイポは「構造（Manrope）」と「機構（IBM Plex Mono）」と「質感（Shippori Mincho/Cormorant）」の三層で運用する。
- コンポーネントは `ui` / `layout` / `features` の階層で分離する。

## Alternatives
- 単一書体で統一する案。
- ボーダーを非表示にして余白で区切る案。

## Rationale
- 書体の役割分担により、情報の階層と質感を明確化できる。
- 構造線の可視化は世界観の中核であり、削ると意図が薄れる。

## Consequences / Impact
- Tailwind の tokens と constants に明示的な定義が必須となる。
- 影やホバーは「移動」ではなく「光の変化」を優先する。

## Rollback / Follow-ups
- デバイスや表示環境で可読性に問題が出た場合は、文字サイズとウェイトを再調整する。
- 実装フェーズで design tokens を config に集約する。

