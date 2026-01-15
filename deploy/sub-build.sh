#!/bin/bash


git checkout -- \.
git checkout $DEPLOY_BRANCH
git pull origin $DEPLOY_BRANCH


if test $INSTALL_DEPENDENCIES = 'true'
  then 
    npm install
fi

if [ $? -eq 0 ]
  then
    npm run build
    pm2 restart npm --name next-app -- start
    if [ $? -eq 0 ] 
      then 
        echo -e "\n\033[32m 部署成功 \033[0m"
      else 
        echo -e "\033[31m 部署错误 \033[0m"
    fi
    
  else
  echo -e "\033[31m 部署错误 \033[0m"
fi

