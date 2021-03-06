$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message" data-message-id=${message.id}>
             <ul class="message-content">
               <li class="user-name">
                 ${message.user_name}
               </li>
               <li class="date">
                 ${message.created_at}
               </li>
               <li class="message-content">
                 <p class="message-content__body">
                   ${message.body}
                </p>
               </li>
             </ul>
             <img src="${message.image}" >
            </div>`
          return html;
        } else {
          var html =
          `<div class="message" data-message-id=${message.id}>
             <ul class="message-content">
               <li class="user-name">
                 ${message.user_name}
               </li>
               <li class="date">
                 ${message.created_at}
               </li>
               <li class="message-content">
                 <p class="message-content__body">
                   ${message.body}
                 </p>
               </li>
             </ul>
           </div>`
          return html;
        };
      }
  $('#new_message').on('submit', function(e) {
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message-table').append(html);
      $("form")[0].reset();
      $('.message-table').animate({ scrollTop: $('.message-table')[0].scrollHeight});
      $('input').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.message-table').append(insertHTML);
        $('.message-table').animate({ scrollTop: $('.message-table')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});