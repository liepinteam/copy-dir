# copy-dir

  easy used 'copy-dir', copy a file or directory to anothor path, when distpath or parent distpath not exist, it will create the directory automatically.

# install

```js
npm install copy-dir
```

# grammar

Sync:

```js
copyDir.sync(from, to[, filter]);
```

Async:

```js
copyDir(from, to, [filter, ]callback);
```

Filter is a function that you want to filter the path, then return true or false.

It can use three arguments named _stat, _path, _file

* _stat: 'file' or 'directory', mark the file or path a file or directory
* _path: the file path
* _file: the file name

# usage

Sync:

```js
var copyDir = require('copy-dir');

copyDir.sync('/a/b/c', '/a/b/e');
```

Async:

```js
var copyDir = require('copy-dir');

copyDir('/a/b/c', '/a/b/e', function(err){
  if(err){
    console.log(err);
  } else {
    console.log('ok');
  }
});
```

# add a filter

When you want to copy a directory, but some file or sub directory is not you want, you can do like this:

Sync:

```js
var path = require('path');
var copyDir = require('copy-dir');

copyDir.sync('/a/b/c', '/a/b/e', function(_stat, _path, _file){
  var stat = true;
  if (_stat === 'file' && path.extname(_path) === '.html') {
    // copy files, without .html
    stat = false;
  } else if (_stat === 'directory' && _file === '.svn') {
    // copy directories, without .svn
    stat = false;
  }
  return stat;
}, function(err){
  console.log('ok')
});
```

Async:

```js
var path = require('path');
var copyDir = require('copy-dir');

copyDir('/a/b/c', '/a/b/e', function(_stat, _path, _file){
  var stat = true;
  if (_stat === 'file' && path.extname(_path) === '.html') {
    // copy files, without .html
    stat = false;
  } else if (_stat === 'directory' && _file === '.svn') {
    // copy directories, without .svn
    stat = false;
  }
  return stat;
});
```




