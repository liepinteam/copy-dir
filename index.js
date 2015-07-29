var fs = require('fs');
var path = require('path');
var mkdir = require('mkdir-p');

var nodecopy = function (from, to, filter, callback) {
  if (typeof filter === 'function' && !callback) {
    callback = filter;
    filter = null;
  }
  filter = filter || function (_stat, _path, _file) {
    return true;
  };
  var that = this,
    copyFile = function (_from, _to, _callback) {
      mkdir(path.dirname(_to), function (err) {
        if (err) {
          _callback(err);
        } else {
          fs.readFile(_from, {
            encoding: 'binary'
          }, function (err, data) {
            if (err) {
              _callback(err);
            } else {
              fs.writeFile(_to, data, {
                encoding: 'binary'
              }, function (err) {
                if (err) {
                  _callback(err);
                } else {
                  _callback(null);
                }
              });
            }
          });
        }
      });
    };
  fs.stat(from, function (err, stats) {
    if (err) {
      callback(err);
    } else {
      if (stats.isFile()) {
        // from path is a file
        copyFile(from, to, callback);
      } else if (stats.isDirectory()) {
        // from path is a directory
        (function (_from, _to) {
          var _args = arguments;
          fs.readdir(_from, function (err, data) {
            if (err) {
              callback(err);
            } else {
              mkdir(_to, function (err) {
                if (err) {
                  _callback(err);
                } else {
                  (function () {
                    var __args = arguments;
                    if (data.length === 0) {
                      if (_from === from) {
                        callback(null);
                      }
                    } else {
                      var _file = data.shift(),
                        _src = path.join(_from, _file),
                        _dist = path.join(_to, _file);
                      fs.stat(_src, function (err, stats) {
                        if (err) {
                          callback(err);
                        } else {
                          if (stats.isFile()) {
                            // from path is a file
                            if (filter('file', _src, _file)) {
                              copyFile(_src, _dist, __args.callee);
                            } else {
                              __args.callee();
                            }
                          } else if (stats.isDirectory()) {
                            // from path is a directory
                            if (filter('directory', _src, _file)) {
                              _args.callee(_src, _dist);
                            } else {
                              __args.callee();
                            }
                          }
                        }
                      });
                    }
                  })(_from, _to);
                }
              });
            }
          });
        })(from, to);
      }
    }
  });
};

nodecopy.sync = function (from, to, filter) {
  if (!fs.existsSync(from)) {
    throw new Error('from file not exists.');
    return;
  }
  filter = filter || function (_stat, _path, _file) {
    return true;
  };
  var stat = fs.statSync(from);
  if (stat.isDirectory()) {
    (function (_from, _to) {
      var args = arguments,
        list = fs.readdirSync(_from);
      mkdir.sync(_to);
      list.forEach(function (_file) {
        var _src = path.join(_from, _file),
          _dist = path.join(_to, _file),
          stat = fs.statSync(_src),
          extname = path.extname(_src);
        if (stat.isFile()) {
          if (filter('file', _src, _file)) {
            fs.writeFileSync(_dist, fs.readFileSync(_src, 'binary'), 'binary');
          }
        } else if (stat.isDirectory()) {
          if (filter('directory', _src, _file)) {
            args.callee(_src, _dist);
          }
        }
      });
    })(from, to);
  } else if (stat.isFile()) {
    mkdir.sync(path.dirname(to));
    fs.writeFileSync(to, fs.readFileSync(from, 'binary'), 'binary');
  }
};
module.exports = nodecopy;