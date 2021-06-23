
   
    // var socket = io.connect('http://localhost:3000');

    function del_order(name){
      socket.emit('del_order', name)
    }
    function history_order(name,menu){
      data = new Map()
      data[name] = menu
      console.log(data+"보냄")

      socket.emit('order_coffe', data) 
    }
    function order(){  
        name = document.querySelector("#name").value
        if(name.length < 2){
        alert("2글자 이상 이름 입력해주세요")
        return;
        }
        menu = document.querySelector('#menu_input').value
        if(menu.length == 0){
        alert("메뉴를 골라주세요")
        return;

        }
        data = new Map
        data[name] = menu
        console.log(data+"보냄")

        socket.emit('order_coffe', data) 
    }
    // order_response

    socket.on('order_response', function (data) {
      cnt_map = new Map()
      table_innerHtml = '<tr>\
        <td>이름</td>\
        <td>메뉴</td>\
        <td>삭제</td>\
        </tr>'
        
    keys = Object.keys(data)
    for(var i=0 ; i<keys.length; i++){
      name = keys[i]
      menu = data[name]
      console.log(name+","+menu+"받음")
      table_innerHtml +="<tr>\
        <td>"+name+"</td>\
        <td>"+menu+"</td>\
        <td><input type='button' value='삭제' onclick='del_order(\""+name+"\")'</button></td>\
        </tr>"
        if (cnt_map[menu] != undefined){
          cnt_map[menu] +=1
        }else{
          cnt_map[menu] = 1
        }
    }'" "'
    cnt_table_innerHtml = '<tr>\
        <td>메뉴</td>\
        <td>개수</td>\
        </tr>'
    cnt_keys = Object.keys(cnt_map)
    for(var i=0 ; i<cnt_keys.length; i++){
      cnt_key = cnt_keys[i]
      cnt = cnt_map[cnt_key]

      cnt_table_innerHtml += "<tr>\
        <td>"+cnt_key+"</td>\
        <td>"+cnt+"개</td>\
        </tr>"
    }

    document.querySelector('#menu_table').innerHTML = table_innerHtml
    document.querySelector('#count_table').innerHTML = cnt_table_innerHtml

  });

  socket.on('history_menu', function (history_menu) {
    table_innerHtml = '<tr>\
        <td>이름</td>\
        <td>메뉴</td>\
        <td>주문</td>\
        <td>삭제</td>\
        </tr>'
        keys = Object.keys(history_menu)

        for(i=0; i < keys.length; i++){
          name = keys[i]
          menu = history_menu[name]
          table_innerHtml += "<tr>\
          <td>"+name+"</td>\
          <td>"+menu+"</td>\
          <td><button onclick='history_order(\""+name+"\",\""+menu+"\")'>주문하기</button></td>\
          <td><button onclick='del_history_order(\""+name+"\")'>삭제하기</button></td>\
          </tr>"
        }
      document.querySelector("#history_table").innerHTML = table_innerHtml
  })
  function del_history_order(name){
    socket.emit('del_history_order',name) 
  }
  function end_order(){
    socket.emit('end_order',"msg") 

  }
