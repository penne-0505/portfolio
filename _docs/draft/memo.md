# Project Concept: 透過するグリッド (Translucent Grid)

## 1. Core Statement (核となる思想)

**「情報のノイズを濾過し、幾何学的な構造（線・面・反復）と有機的な現象（影・反射・透過）を等価に扱って、静寂な秩序として再構築する。」**

本プロジェクトは、単なる作品集（ポートフォリオ）ではなく、Webサイト全体を一つの「建築的フィルター」として構築する試みである。
散在するアウトプット（写真、コード、文章）への入口を、構築された秩序の中に「インデックス（標本ラベル）」として再配置し、ユーザーに回遊・観測させる体験を提供する。

## 2. Design Principles (3つの美学軸)

### Axis 1: Geometric Order (幾何学的秩序 / 線)

**「UIは線で描く」**

* **グリッドの可視化**: レイアウトの境界線（Border）を隠さず、建築の梁や柱のように「構造材」として常に表示する。

* **直線の徹底**: `border-radius: 0px`。有機的な曲線を排除し、水平・垂直のラインだけで画面を分節する。

* **構造としての余白**: 余白を「何もない場所」ではなく、「線で囲まれた空室」として設計する。

### Axis 2: Tactile Light & Texture (触覚的な光 / 現象)

**「コンテンツは光で満たす」**

* **物質感**: デジタルなフラットさ（ベタ塗り）を避け、微細なノイズ（粒子）や磨りガラスのようなテクスチャを用い、「モニターの向こう側に壁や空気がある」ような触覚性を持たせる。

* **光のインタラクション**:

  * ホバー時の反応は「移動」や「拡大」ではなく、「光の変化」で行う。

  * 例：影が濃くなる、逆光で透過する、微かなハイライトが走る。

### Axis 3: Anonymous Silence (静寂な標本化 / 余白)

**「情報は孤立させる」**

* **ノイズの除去**: 感情的な装飾、過剰な彩度、説明的なナレーションを排除する。

* **標本的提示**: コンテンツを文脈から切り離し、博物館の標本のように淡々と並置する。

* **ログ形式**: 日付、時間、技術仕様（ISO、言語）などのメタデータを機能美としてデザインに取り入れる。

## 3. Content Metaphors (コンテンツの定義)

各カテゴリを、この建築物における「構成要素」として再定義する。 テキストとコードは外部サービスへのポインタとなるため、サイト内ではその「メタデータ」を美しく提示することに注力する。

| **カテゴリ** | **メタファー** | **定義** | **表現ルール** |
| **Photo** | **窓 (Window)** | 内部コンテンツ<br>グリッドの向こう側に景色が広がっている開口部。 | ・厳格なトリミング<br>・キャプションは枠外に配置<br>・MicroCMSから配信される高画質画像 |
| **Software** | **設計図への参照 (Reference)** | 外部：GitHub<br>機能の論理構造（コード）が保管された場所へのポインタ。 | ・GitHub API連携（Star数、言語、更新日）<br>・リポジトリカードを「インダストリアルな銘板」のようにデザイン |
| **Text** | **蔵書票 (Ex Libris)** | 外部：Note/Zenn等<br>外部に蓄積された思考への案内板。 | ・アイキャッチ画像はモノクロ化などでトーンを統一<br>・タイトルと日付、読了時間のみを静かに配置<br>・別タブ遷移を示す控えめなアイコン |

## 4. Visual Identity (視覚仕様)

### Color Palette (低彩度・温度差)

基本は無機質なグレーで構成し、アクセントとして「光の色」と「影の色」を用いる。

* **Base (Concrete)**: `#F0F0F0` 〜 `#E0E0E0` (昼)、`#1A1A1A` 〜 `#2C2C2C` (夜/ダークモード)

  * わずかなノイズテクスチャを乗せる。

* **Lines (Structure)**: `#888888` (中庸なグレー)

  * 黒すぎず白すぎない、構造を主張するライン。

* **Light (Phenomenon)**: `#E8F4F8` (冷たい透過光)、`#FDFCF0` (暖かい西日)

  * ホバー時やアクティブ状態に使用。

* **Shadow (Depth)**: `#0A0A0A` (深い影)

  * テキストや引き締め色に使用。

### Typography (Structure & Ink)

「ありきたりな機能性」を排し、幾何学的秩序と有機的な質感を対比させる。

* **System / UI (The Grid): `Manrope`**

  * **選定理由**: 現代的な幾何学サンセリフ。特に「数字」の造形が美しく、日付や座標などの「データ」を表示した際に高い審美性を持つ。

* **Text / Texture (The Light): `Shippori Mincho` (JP) + `Cormorant Garamond` (Latin Display)**

  * **選定理由**:

    * `Shippori Mincho`: 墨溜まりのような滑らかな有機的ラインを持ち、「軸2：現象」の美学と共鳴する。

    * `Cormorant Garamond`: 非常に繊細で鋭利なセリフ体。大見出しなどで用いると、光の筋のような緊張感を生む。

* **Code / Data (The Mechanism): `IBM Plex Mono`**

  * **選定理由**: 「IDE」ではなく「タイプライター」や「工業製品の仕様書」を想起させるフォント。物質的な重みがあり、「軸3：標本化」に適している。

## 5. Site Structure (サイト構造案)

### A. Top: "The Grid" (グリッド)

* **概要**: 写真、コード（GitHub）、記事（外部）の更新情報が混在して並ぶ、巨大なグリッド状の壁面。

* **挙動**:

  * **Photo**: クリックでモーダル/詳細ページへ（サイト内で完結）。

  * **Code/Text**: クリックで「外部サイトへ移動します」という趣旨の極めてシンプルなトランジション（あるいはアイコン変化）を経て別タブで開く。

### B. Detail: "The Specimen" (写真詳細)

* **概要**: 写真コンテンツのみ、サイト内に詳細ページを持つ。

* **レイアウト**: 画面分割。左に写真、右に撮影データ（ISO, SS, Lens）。余計な物語は語らない。

### C. About: "The Architect" (設計者)

* **概要**: プロフィールページ。

* **表現**: スペックシート形式。SNSリンクやGitHubプロフィールへのハブ機能。

## 6. Technical Stack (Architecture)

コンテンツの実体を外部サービスに分散させ、サイト自体は「高機能なハブ」として軽量かつ堅牢に構築する。

### Core Framework

* **Next.js (App Router)**

  * **理由**: サーバーコンポーネントによる高速な初期表示。

* **TypeScript**

  * **理由**: 型安全性による堅牢な構築。

### Styling & Interaction

* **Tailwind CSS** / **Framer Motion**

### Content Management & Data Source (Aggregated)

#### A. Photos: `MicroCMS`

* **採用理由:**

  * サイト内で唯一「実体」を持つ画像データの管理。

  * **Schema Definition & Strategy**（後述のセクション7参照）

#### B. Text (Articles/Diary): `External Services` (Note, Zenn, etc.)

* **連携方法:** RSS/Atom Feed取得。

#### C. Code: `GitHub API`

* **連携方法:** Pinned Repositories等のAPI取得。

### Hosting

* **Cloudflare Pages**

## 7. Data Schema & Metadata Strategy (Specimen Label)

写真（Photo）コンテンツにおける入力負荷を極限まで排除し、「画像を置くだけ」で静謐な標本が完成するデータフローを定義する。

### MicroCMS Schema Definition

**API Name**: `photos` (リスト形式)

| **Field ID** | **Name** | **Type** | **Required** | **Description** |
| :--- | :--- | :--- | :--- | :--- |
| **`image`** | 写真データ | 画像 | **Yes** | コンテンツの唯一の実体。Exifを含むオリジナルデータを保持する。 |
| **`picked`** | ピックアップ | 真偽値 | No | デフォルトOFF。ONの場合、グリッド表示時のサイズ係数を変更するなどの演出に使用。 |

※ タイトル、撮影日、説明文などの手動入力フィールドは一切設けない。

### Exif Extraction Strategy (Server-Side)

Next.js (Server Components) 側で、MicroCMSから取得した画像URLからExifメタデータを解析し、以下の情報のみを抽出・利用する。

1. **DateTime (Main)**

   * Source: `DateTimeOriginal`

   * UI Priority: **Primary**

   * 役割: 作品の「タイトル」代わりとなる識別子。最も大きく表示し、ソートキーとしても利用する。

2. **Tech Specs (Sub)**

   * Source: `FNumber`, `ExposureTime` (Shutter Speed), `ISO`

   * UI Priority: **Secondary**

   * 役割: 非常に小さなフォント（IBM Plex Mono）で、作品の脇に工業的なスペックとして添える。

   * 例: `f/1.8 1/250 ISO 400`

3. **Excluded Data**

   * **GPS (Location)**: プライバシーおよび「匿名性（Anonymous Silence）」の観点から、意図的に抽出・表示を行わない。

   * **Camera Model**: ノイズとなるため表示しない（あるいはホバー時の隠し要素とする）。

この設計により、CMS管理画面での作業は「画像のドラッグ＆ドロップ」のみとなり、思考のノイズが完全に除去される。