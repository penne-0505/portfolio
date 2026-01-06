---
title: UI Structure and Interaction (Intent)
status: active  # allowed: proposed | active | superseded
draft_status: n/a  # allowed: idea | exploring | paused | n/a
created_at: 2026-01-06
updated_at: 2026-01-06
references:
  - ../../draft/design_concepts/ui_structure_and_interaction.md
  - ../../draft/design_concepts/ui_structure.md
  - ../../draft/design_concepts/page_design_concept.md
related_issues: []
related_prs: []
---

## Context
- UIの構造と動線が複数ドキュメントに分散し、同一概念の重複が発生していた。
- フレーム固定＋グリッド流動の体験が軸になるため、構造の前提を明文化する必要がある。

## Decision
- 外枠・ヘッダー・フッターを固定し、コンテンツのみが奥へ流れる構造を採用する。
- デスクトップは非対称グリッド、モバイルは縦積みを基本とする。
- フィルタは「隠す」ではなく「薄く残す」方針で、層の切替を体験化する。

## Alternatives
- 従来のカードUI（浮遊・影）を採用する案。
- カテゴリ切替時に非表示にする案。

## Rationale
- 固定フレームは「建築的フィルター」のメタファーを最も直接的に体現できる。
- 残像として薄く残すことで、都市的な「層」を維持できる。

## Consequences / Impact
- 既存の一般的なカードUIとは相性が悪く、線と枠の運用が必須になる。
- 詳細表示（Specimen Mode）はモーダルであっても「セル生成」として見せる必要がある。

## Rollback / Follow-ups
- 体験が過剰に重くなる場合は、フレーム固定の強度を調整する。
- 実装開始時に grid 定義とレスポンシブ規約を constants に落とし込む。

