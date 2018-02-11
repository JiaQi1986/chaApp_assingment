(function() {
  var socket;
  var uname;

  //data:{user:'' msg:''}
  function createTpl(data,flag) {
    var str = '';
    str += '<div class="con-item">'
    str += '<p><span class="alert alert-success">'
    str += flag? 'Me':data.user;
    str += '</span></p>'
    str += '<p><span class="alert alert-'
    str += flag? 'warning' : 'primary'
    str += '">'
    str += data.msg;
    str += '</span></p>'
    str += '</div>'

    return str;
  }

  $('#show-btn').on('click', function(){
    uname = $.trim($('#username').val());
    if(uname==''){return;}
    $('#login').hide();
    $('#content').show();

    socket = io();

    socket.on('connect', function() {
      socket.emit('login',uname);
    });

    socket.on('msg', function(data) {
      //console.log(data);
      var flag = data.user == uname;
      var tpl = createTpl(data,flag);
      $('#chatcon').append(tpl);
    });

    socket.on('disconnect', function() {
      console.log('disconnect');
    });

    socket.on('count', function(data) {
      $('#chat-count').html('(' +data+')people');
    });
  });

  $('#send-btn').on('click', function() {
    socket.emit('send',$('#msgcon').val());
    $('#msgcon').val('');
  });

})();
