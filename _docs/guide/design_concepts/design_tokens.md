---
title: Translucent Grid Design Tokens Guide
status: active  # allowed: proposed | active | superseded
draft_status: n/a  # allowed: idea | exploring | paused | n/a
created_at: 2026-01-06
updated_at: 2026-01-06
references:
  - ../../intent/design_concepts/design_system_and_components_intent.md
  - ../../intent/design_concepts/translucent_grid_overview_intent.md
related_issues: []
related_prs: []
---

## Overview
- 「透過するグリッド」の設計意図を実装に落とし込むためのデザイントークン定義。
- 物理的な構造（線・面）と現象（光・影）を等価に扱うための値を明示する。

## Prerequisites
- Tailwind もしくは CSS Variables によるトークン実装が可能であること。
- UI全体で "線の可視化" を前提にしたレイアウト設計があること。

## Setup / Usage
以下は CSS Variables ベースの定義例。Tailwind へ移す場合は同名トークンで置換する。

```css
:root {
  /* Base */
  --color-concrete-50: #f0f0f0;
  --color-concrete-100: #e0e0e0;
  --color-ink-900: #1a1a1a;
  --color-ink-500: #888888;

  /* Structure */
  --color-structure: #888888;
  --border-width-frame: 1px;

  /* Light / Shadow */
  --color-light-cool: #e8f4f8;
  --color-light-warm: #fdfcf0;
  --color-shadow-deep: #0a0a0a;
  --shadow-overlay: 0 0 0 1px rgba(0, 0, 0, 0.1);

  /* Typography */
  --font-sans: "Manrope", system-ui, sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
  --font-serif-jp: "Shippori Mincho", "Hiragino Mincho ProN", serif;
  --font-serif-latin: "Cormorant Garamond", "Times New Roman", serif;

  /* Motion */
  --ease-organic: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-page: 0.8s;
  --duration-hover: 0.36s;

  /* Layout */
  --header-height-desktop: 64px;
  --header-height-mobile: 56px;
  --footer-height-desktop: 80px;
  --footer-height-mobile: 64px;
}
```

## Best Practices
- **Lines first**: ボーダーは隠さず、構造材として常時表示する。
- **Light as content**: 光や影は「照明」ではなく、他のコンテンツと等価に扱う。
- **Low saturation**: 基調色は低彩度で統一し、差分は光/影で出す。
- **Typography roles**: 文字は役割分担（構造/機構/質感）で使い分ける。
- **Motion by light**: 移動や拡大ではなく、光の変化で状態差分を作る。

## Troubleshooting
- **線が弱い/消える**: 背景色とのコントラストを見直し、`--color-structure` を濃くする。
- **文字の階層が曖昧**: `--font-sans` と `--font-mono` の割当を再確認する。
- **ホバーが派手**: 影や色変化の量を減らし、移動/拡大を避ける。

## References
- `_docs/intent/design_concepts/design_system_and_components_intent.md`
- `_docs/intent/design_concepts/translucent_grid_overview_intent.md`
