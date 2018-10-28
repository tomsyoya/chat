# chat
- Node.jsを使ってチャットアプリを作成します。  
- Slackのようなチャットアプリを作成するのが目標です。  
- 皆で勉強できるようなプロジェクトなので参加歓迎します。  

#first step
# Githubでpull　requestを送るまで
forkします


//任意のディレクトリで
//git clone https://github.com/ご自身のアカウント名/chat.git
//ex) git clone https://github.com/yoshitaku-jp/chat.git

cd chat
//git checkout -b ご自身のアカウント名/add_name
//ex) git checkout -b yoshitaku-jp/add_name

README.mdを編集する…
編集が終わったら

```
git add README.md
git commit -m "自分のアカウントネームを追加しました"
git push origin ご自身のアカウント名/add_name
```

これで、ご自身のアカウントのGithub上のchatリポジトリに反映されました


ここからはプルリクエスト（PR）を投げます。
ご自身のアカウントのGithub上のchatリポジトリにアクセスします。
https://github.com/ご自身のアカウント名/chat

真ん中の「new pull request」ボタンをクリックします

minminさんのdelvelopブランチに、自分のリポジトリの「ご自身のアカウント名/add_name」ブランチをマージするように変更します

プルリクエストを送信します

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
