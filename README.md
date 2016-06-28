# copy-dir

  Easy used 'copy-dir' method, even use a filter, copy a file or directory to anothor path, when target path or parent target path not exists, it will create the directory automatically.

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

It can use three arguments named state, filepath, filename

* state: 'file' or 'directory', mark the file or path a file or directory
* filepath: the file path
* filename: the file name

# usage

Sync:

```js
var copydir = require('copy-dir');

copydir.sync('/my/from/path', '/my/target/path');
```

Async:

```js
var copydir = require('copy-dir');

copydir('/my/from/path', '/my/target/path', function(err){
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

copydir.sync('/my/from/path', '/my/target/path', function(stat, filepath, filename){
  if(stat === 'file' && path.extname(filepath) === '.html') {
    return false;
  }
  if (stat === 'directory' && filename === '.svn') {
    return false;
  }
  return true;
}, function(err){
  console.log('ok');
});
```

Async:

```js
var path = require('path');
var copydir = require('copy-dir');

copydir('/a/b/c', '/a/b/e', function(stat, filepath, filename){
  //...
}, function(err) {
  //...
});
```

## Questions?

If you have any questions, please feel free to ask through [New Issue](https://github.com/pillys/copy-dir/issues/new).

### License

copy-dir is available under the terms of the [MIT](LICENSE) License.