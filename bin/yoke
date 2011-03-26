#!/usr/bin/env node

var fs      = require('fs'),
    path    = require('path'),
    stdio   = process.binding('stdio'),
    options = {
      verbose:     false,
      directories: ['.']
    };

var includeFollowing = false;
process.argv.slice(2).forEach(function(option) {
  if (option === '-v' || option === '--verbose') {
    options.verbose = true;
  } else if (option === '-I' || option === '--include') {
    includeFollowing = true;
  } else if (option.indexOf('-I') === 0) {
    options.directories.push(option.substring(2));
  } else if (includeFollowing) {
    options.directories.push(option);
    includeFollowing = false;
  }
});

function findOne(file, directories) {
  var resolved = null;
  directories.forEach(function(directory) {
    if (resolved) {
      return;
    }
    var target = path.join(directory, file.replace(/\.js$/, '') + '.js');
    if (path.existsSync(target)) {
      resolved = target;
    }
  });
  return resolved;
}

function pad(level) {
  return Array(level * 2 + 1).join(' ');
}

function processOne(file, level) {
  var lines = fs.readFileSync(file, 'utf8');
  level || (level = 0);
  if (options.verbose) {
    stdio.writeError(pad(level) + '> ' + file + '\n');
  }
  lines = lines.replace(/^\s*\/\/=\s*require\s+(["<])([^">]+).$/mg, function(match, type, location) {
    var resolved = findOne(location, (type === '<' ? options.directories : [path.dirname(file)]));
    if (resolved) {
      return processOne(resolved, level + 1);
    }
    throw new Error('Cannot resolve require:\n\n    ' + match + '\n\n in file ' + file);
  });
  return lines;
}

process.stdout.write(processOne(process.argv.pop()));