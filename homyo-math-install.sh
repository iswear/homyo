#/bin/bash

cd $(dirname $0)
echo '进入homyo-game目录:'$(pwd)
if [ ! -d 'node_modules/homyo-math' ];then
mkdir -p node_modules/homyo-math
fi
cd ../homyo-math
echo '进入homyo-math目录:'$(pwd)
npm run build

cp -r ./lib ../homyo-game/node_modules/homyo-math/
cp ./package.json ../homyo-game/node_modules/homyo-math/

cd ../