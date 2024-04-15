mkdir -p dist
cp -R src/client/pages/. dist/public
npx tsc --p ./src/client
