# Quasar App

Deploy to Github Pages:


```
quasar build
cd dist/spa-mat
git add --all
git commit -m "Build output as of "(git log '--format=format:%h %s' master -1)

OR

git commit -m "Release at "(date)
git push origin gh-pages
cd ../../
```
