# Gnou

Small functional project coded in a few hours and requiring a little refactoring.

This game is based on the real game
[COMMENT J'AI ADOPTÉ UN GNOU]([https://link](https://ledroitdeperdre.com/nos-jeux/18-comment-j-ai-adopte-un-gnou.html)).

It's better to have the real game, but with this website you can play it anywhere and anytime. 

Only in french.

## Project setup
```
npm i
```

## Launch dev
```
npm run serve
```

## Build
```
npm run build
```
Front build into ```server/public``` folder

## Build docker
```
docker build -t test --build-arg VUE_APP_SERVER_URL=http://localhost:2203 .
```
then run with 
```
docker run -p 2203:2203 -e PORT=2203 test
```