#!/usr/bin/env sh
###
 # @Description:
 # @Autor: Southern Wind
 # @Date: 2024-01-19 10:07:56
 # @LastEditors: Please set LastEditors
 # @LastEditTime: 2024-12-11 14:34:44
###

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run build

# 进入生成的文件夹
cd ./dist

git init
git add -A
git commit -m 'deploy'

# Jacqueline712/mondaylab-blog 替换为自己的用户名和对应的仓库名
# 意思为将master构建后的代码合并到gh-pages分支上，然后在gh-pages分支上部署~
git push -f https://gitee.com/NanChen042/vue3-blog.git master:blog-pages

cd -
rm -rf ./dist
