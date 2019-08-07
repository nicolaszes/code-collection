// 结合 Express 应用
// 在 Express 中只需要简单的 use 就可以了（ app.js：

var session = require('../sessionUtils');
app.use(session());
// 这个被引用的 session 模块暴露了一些操作 session 的方法，在需要时可以这样使用：

app.get('/user', function(req, res){
  var id = req.query.sid;
  session.getById(id, 'user', function(err, reply){
    if(reply){
      //Some thing TODO
    }
  });
  res.end('');
});