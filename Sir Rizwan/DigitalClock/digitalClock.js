function currentTime() {
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var session = "AM"
    
    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);
    session = updateTime(session)
    document.getElementById("clock").innerText = hour + " : " + min + " : " + sec + " : " + session;
      var time = setTimeout(function(){ currentTime() }, 1000);
  }
  
  function updateTime(time) {
    if (time < 10) {
      return "0" + time;
    }
    else {
      return time;
      session = "PM"
    }
  }
  
  currentTime();
