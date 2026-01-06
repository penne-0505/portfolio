---
title: Content Strategy and Data (Intent)
status: active  # allowed: proposed | active | superseded
draft_status: n/a  # allowed: idea | exploring | paused | n/a
created_at: 2026-01-06
updated_at: 2026-01-06
references:
  - ../../draft/design_concepts/content_strategy_and_data.md
  - ../../draft/design_concepts/about_me_content_strategy.md
  - ../../draft/design_concepts/page_design_concept.md
related_issues: []
related_prs: []
---

## Context
- コンテンツの意味づけ（Window/Reference/Ex Libris）とAboutの方針が別々に記述されていた。
- 写真データの入力負荷を極限まで下げる要件がある。

## Decision
- コンテンツはメタファーに紐づけて提示し、内部は最小メタデータに限定する。
- Aboutは自己紹介ではなく「設計者の仕様書」として扱う。
- 写真は MicroCMS の `image` を唯一の必須項目とし、Exif から識別子とスペックを抽出する。

## Alternatives
- 写真に手入力のタイトル/説明を持たせる案。
- Aboutをストーリー中心に構成する案。

## Rationale
- メタファー設計により、外部サービスへの参照が「建築的インデックス」として機能する。
- 入力項目を減らすことで、作品の「現象」優先と匿名性が保たれる。

## Consequences / Impact
- GPSやカメラ機種などノイズになる情報は意図的に除外する。
- Aboutの表現はデータ的であるほど美学に適合する。

## Rollback / Follow-ups
- 追加情報が必要になった場合は、外部に置き、サイト内はメタデータに限定する。
- CMSやExif抽出の設計が変わる場合は新規 intent を作成する。

