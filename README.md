# copy-dir

  easy used 'copy-dir', copy a file or directory to anothor path, when distpath or parent distpath not exist, it will create the directory automatically.

# install

```js
npm install copy-dir
```

# grammar

Sync:

```js
copydir.sync(from, to[, filter]);
```

Async:

```js
copydir(from, to, [filter, ]callback);
```

Filter is a function that you want to filter the path, then return true or false.

It can use three arguments named stat, filepath, filename

* stat: 'file' or 'directory', mark the file or path a file or directory
* filepath: the file path
* filename: the file name

# usage

Sync:

```js
var copydir = require('copy-dir');

copydir.sync('/a/b/c', '/a/b/e');
```

Async:

```js
var copydir = require('copy-dir');

copydir('/a/b/c', '/a/b/e', function(err){
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
var copydir = require('copy-dir');

copydir.sync('/a/b/c', '/a/b/e', function(stat, filepath, filename){
  var status = true;
  if (stat === 'file' && path.extname(filepath) === '.html') {
    // copy files, but without .html
    status = false;
  } else if (stat === 'directory' && filename === '.svn') {
    // copy directories, but without .svn
    status = false;
  }
  return status;
}, function(err){
  console.log('ok')
});
```

Async:

```js
var path = require('path');
var copydir = require('copy-dir');

copyDir('/a/b/c', '/a/b/e', function(stat, filepath, filename){
  //...
});
```




