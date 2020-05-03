$(function(){
      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message">
             <ul class="message-content">
               <li class="message-content__user-name">
                 ${message.user_name}
               </li>
               <li class="message-content__date">
                 ${message.created_at}
               </li>
               <li class="message-content">
               <p class="message-content__body">
                 ${message.body}
               </p>
               </li>
             </ul>
             <img src="${message.image}" ></img>
            </div>`
          return html;
        } else {
          var html =
          `<div class="message">
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
               </ul>
             </div>
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
    });
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
});