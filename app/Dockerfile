#公式イメージのnode.jsの8.12.xをベースにする
FROM centos:7

#/usr/src/appをワーキングディレクトリに指定
COPY    . /usr/src/app
WORKDIR /usr/src/app

#node.jsの8系をインストール
RUN     curl -sL https://rpm.nodesource.com/setup_8.x | bash -
RUN     yum -y update
RUN     yum install -y gcc gcc-c++ nodejs && rm -rf /var/cache/yum/*
RUN     yum clean all

#8080番ポート開放
EXPOSE  8080
CMD     node index.js