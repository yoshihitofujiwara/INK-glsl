https://docs.google.com/presentation/d/12RrqyAkFanKmfL96ZHvhDCozE-_rKFPlU1YVwej4_bc/edit#slide=id.g3ff612b37b_1_203





https://experiments.withgoogle.com/sand-ghost

https://docs.google.com/presentation/d/1NMhx4HWuNZsjNRRlaFOu2ysjo04NgcpFlEhzodE8Rlg/edit#slide=id.g423da70889_217_0

transiton
slice transition

ripple
湾曲
glow

https://github.com/Blackhart/GLSL-Shaders/blob/master/glsl/Chromakey/chromakey.frag

https://docs.google.com/presentation/d/14J6kMfSSFcKuJPXT8of9MUQPnCPRhqNjGviLcWDIjco/mobilepresent?slide=id.g5e1d6a0216_0_94

https://codepen.io/zadvorsky/pen/PNXbGo


---


## 開発環境

### バージョン
```
node: 10.16.0
npm: 6.9.0
gulp: 4.0.2
webpack: 4.32.2
```

### コマンドリスト
#### インストール
開発環境インストールコマンド。package-lock.jsonのモジュールのバージョンを揃えるため`npm ci`を使用。
```
npm ci
```

#### 開発版
ローカルサーバー起動、ファイル監視(Watch), ソース非圧縮、JS SourceMap生成<br>
起動時、ソースのコンパイルは行いません。（※案件別に必要に応じて設定変更してください）
```
npm run dev
```

#### ステージング版
ローカルサーバー起動、ソース圧縮、SourceMap削除、console削除（※案件別に必要に応じて設定変更してください）
```
npm run stg
```

#### プロダクト版
ソース圧縮、SourceMap削除、console削除
```
npm run prd
```

#### サーバー起動
サーバー起動のみ
```
npm run srv
```

#### コマンド追記例: コマンド名
コマンドの説明
```
npm run xxx
```
