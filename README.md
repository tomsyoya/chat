# chat
- Node.jsを使ってチャットアプリを作成します。  
- Slackのようなチャットアプリを作成するのが目標です。  
- 皆で勉強できるようなプロジェクトなので参加歓迎します。  

# First Step
## Githubでpull　requestを送るまで
### forkをする

まずは自身のGithubにminmin0530/chatをコピーします。

https://github.com/minmin0530/chat にアクセスし右上のforkを押します。
![fork](https://github.com/yoshitaku-jp/chat/blob/doc/fork.png)

これで自身のGithubにminmin0530/chatがコピーされました。
左上の部分が、自身のアカウント名になっているはずです。
![after_fork](https://github.com/yoshitaku-jp/chat/blob/doc/after_fork.png)

### cloneをする

自身のGithubからchatをローカルPCへ落とします。
自身のGithubのchatにアクセスします。右の緑のボタンをクリックします。
`https`から始まる文字列をコピーします
![after_fork](https://github.com/yoshitaku-jp/chat/blob/doc/clone_or_download.png)

```
//自身のPCの任意のディレクトリにコピーをする
//git clone コピーした文字列
//ex) git clone https://github.com/yoshitaku-jp/chat.git
```

これで任意のディレクトリにchatが落とされました

### 新しいブランチを作り、README.mdを編集する
```
//ディレクトリを移動する
cd chat

// 新しくブランチを作る
//git checkout -b ご自身のアカウント名/add_name
//ex) git checkout -b yoshitaku-jp/add_name
```

README.mdを編集し、一番最後に自身のアカウント名を追加します。
編集が終わったら保存します。


### コミットして、自分のGithubへプッシュする
```
//編集したファイルをaddします
git add README.md
//どういう編集をしたかの説明を記述し、コミットします
git commit -m "自分のアカウントネームを追加しました"
//自分のGithubへプッシュします
git push origin ご自身のアカウント名/add_name
```

これで、ご自身のアカウントのGithub上のchatリポジトリに反映されました。


### minmin0530/chatへプルリクエストを送る
ここからはプルリクエスト（PR）を投げます。
ご自身のアカウントのGithub上のchatリポジトリにアクセスします。
https://github.com/ご自身のアカウント名/chat

![new_pullrequest](https://github.com/yoshitaku-jp/chat/blob/doc/new_pullrequest.png)

真ん中の「new pull request」ボタンをクリックします

minminさんのdelvelopブランチに、自分のリポジトリの「ご自身のアカウント名/add_name」ブランチをマージするように変更します。
一番右の`compare`と書かれている部分を、ご自身のアカウント名/add_nameブランチに変更してください
![pre_pullrequest](https://github.com/yoshitaku-jp/chat/blob/doc/pre_pullrequest.png)

プルリクエストを送信します。

minminさんがマージしてくれるまで待ちます。

以上です。

## develop
### clone
```sh
git clone https://github.com/minmin0530/chat.git
cd chat
```

### setup
```sh
npm install
```

### run
```sh
node index.js
```



## contributors
- @minmin0530
- @tomsyoya
- @mar0519
- @bereu
- @yoshitaku-jp
- @hashikuchi
- @takkyun
- @iritcho
- @1000puki
- @kokoakuma
