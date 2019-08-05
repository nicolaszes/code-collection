/**
 * 打印当前文件的行数
 */
Object.defineProperty(global, '__stack', {
  get: function () {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) {
      return stack;
    };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    return stack;
  }
});

Object.defineProperty(global, '__line', {
  get: function () {
    return __stack[1].getLineNumber();
  }
});

/**
 * add console color
 */
let colors = require('colors')
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
})

let fs = require('fs')
let path = require('path')
/**
 * get the build name
 * node build jj/yp/hg
 */
let target = process.argv[2]
let template = require('art-template')
let shell = require('shelljs')
let customerFiles = ['pages/index']
fs.writeFileSync(
  'app.config.js',
  template(
    path.join(__dirname, 'app.configTmpl.js'), {
      target
    }
  )
)
/**
 * 获取编译后的文件名
 */
let config = require('./app.config.js')
// dist_yp
let toDir = config.dir

/**
 * Excludes files
 */
let baseExcludes = [
  toDir,
  'appTmpl.json',
  'app.configTmpl.js',
  'build.js',
  '.gitignore',
  '.git',
  '.idea',
  'node_modules',
  'README.md',
  'package.json',
  'npm-debug.log',
  'yarn.lock',
  'yarn-error.log'
]
let excludeFiles = baseExcludes.concat(config.excludeFiles)

console.log(excludeFiles, __line)

let compileFils = [{
  from: 'appTmpl.json',
  to: 'app.json',
}]
// 初始化启动删除 dist_yp 文件夹
shell.exec(`rm -rf ${toDir}`)
compileFils.forEach((cf) =>
  fs.writeFileSync(
    cf.to,
    template(path.join(__dirname, cf.from),
      config
    )
  ))

console.log(`success remove the ${toDir}`.info, __line)
console.log(`the active config is ${target}Config`.info)

function copy(dir, to, filter) {
  let dirs = []
  let files = []

  function getFiles(subDir) {
    if (!filter(subDir)) {
      return false
    }

    let stats = fs.statSync(subDir)
    if (stats.isDirectory()) {
      dirs.push(subDir)
      fs.readdirSync(subDir).map(child => getFiles(path.join(subDir, child)))
    } else if (stats.isFile()) {
      files.push(subDir)
    }
  }

  getFiles(dir)

  /**
   * 读取 d 当前文件是否在 customerFiles
   * 创建新的文件夹 mkdir
   */
  dirs.map(d => {
    let index = customerFiles.map(cf => `${cf}_${target}`).indexOf(d)
    if (index > -1) {
      d = customerFiles[index]
    }
    try {
      fs.mkdirSync(path.join(to, d))
    } catch (err) {
      if (!(err.code === 'EEXIST')) {
        throw err
      }
    }
  })

  /**
   * 读取二进制文件
   * 如果文件存在文件夹中，替换掉文件
   * 向 dist_yp 写入文件
   */
  files.map(f => {
    let rs = fs.readFileSync(f, 'binary')
    let filePos = customerFiles.findIndex(cf => {
      return f.startsWith(`${cf}_${target}`)
    })
    if (filePos > -1) {
      f = f.replace(`${customerFiles[filePos]}_${target}`, customerFiles[filePos])
    }
    fs.writeFileSync(path.join(to, f), rs, 'binary')
  })
  return files.length
}

/**
 * 如果 excludeFiles 包含 当前文件
 * 
 * 如果 fs.Stats 对象表示一个文件系统目录，则返回 true
 * customerFiles 是否包含 path
 * path 是否等于 target
 * 
 * 当文件夹目录为 dist开头时，忽略
 */
let filterFunc = (path) => {
  if (excludeFiles.includes(path)) {
    return false
  }
  if (fs.statSync(path).isDirectory() &&
    customerFiles.includes(path.split('_')[0]) &&
    path.split('_')[1] !== target) {
    return false
  }
  if (path.startsWith(toDir.split('_')[0])) {
    return false
  }
  return true
}
let filesLen = copy('./', toDir, filterFunc)

console.log(`${filesLen} copied`.info)
let compileFilesFrom = compileFils.map(cf => cf.from)
fs.watch(
  './', {
    recursive: true
  },
  (eventType, changePath) => {
    /**
     * 如果当前的修改路径为 ./ 则直接跳出
     * 
     * 如果修改的文件在 excludeFiles 中，则不监听文件的变化
     * 
     */
    if (changePath.startsWith('.')) {
      return
    }

    let isInExcludeDir = excludeFiles.some((excludeFile) => {
      return changePath.startsWith(excludeFile)
    })
    /**
     * 判断当前 changePath是一个文件夹还是一个具体文件
     * 返回当前文件的文件夹名字
     */
    let tempPath = fs.statSync(changePath).isDirectory() ?
      changePath :
      path.dirname(changePath)

    /**
     * 判断当前的文件是否在不需要被监听的文件夹内
     * 判断修改的文件不在当前的 customerFiles内
     * 无法监听
     */
    let canWatch = (function () {
      if (isInExcludeDir) {
        return false
      }
      if (customerFiles.includes(tempPath.split('_')[0]) && (tempPath.split('_')[1] !== target)) {
        return false
      }
      return true
    })()

    /**
     * 如果文件可以被监听，找到当前被修改的 file
     */
    if (canWatch) {
      console.log(eventType.info, __line)
      console.log(changePath.info, __line)
      // 修改的文件路径
      let toPath = changePath
      let fileIndex = customerFiles.map(cf => `${cf}_${target}`).findIndex(cf => changePath.startsWith(cf))
      if (fileIndex > -1) {
        toPath = toPath.replace(`${customerFiles[fileIndex]}_${target}`, customerFiles[fileIndex])
      }
      /**
       * 如果当前文件是 change 类型，则写入新的修改
       * 如果当前文件是 rename 类型，fs.existsSync(changePath)，则新增代码块，否则删除文件
       */
      let pathJoinDir = path.join(toDir, toPath)
      if (eventType === 'change') {
        return fs.writeFileSync(pathJoinDir, fs.readFileSync(changePath, 'binary'), 'binary')
      }

      if (eventType === 'rename') {
        if (fs.existsSync(changePath)) {
          /**
           * 新增代码块
           * 判断当前修改是修改文件夹还是修改文件
           */
          if (fs.statSync(changePath).isDirectory()) {
            return fs.mkdirSync(pathJoinDir)
          }
          if (fs.statSync(changePath).isFile()) {
            return fs.writeFileSync(pathJoinDir, fs.readFileSync(changePath, 'binary'), 'binary')
          }
        }
        /** 删除代码块 */
        return fs.unlinkSync(pathJoinDir)
      }
    }

    let fIndex = compileFilesFrom.findIndex(cf => cf === changePath)
    if (fIndex > -1) {
      return fs.writeFileSync(
        compileFils[fIndex].to,
        template(path.join(__dirname, compileFilesFrom[fIndex]), config)
      )
    }
  }
)