$(function(){
/*  $("#name").keyup(function(){
      $("#greet").text("Hallo "+$(this).val())
  });
*/
chrome.storage.sync.get(['total','limit'],function(value){
  $("#greet").text(value.total);
});

$("#notify").on("click",function(){
//    var music = "05_Forgotten_dream.mp3"; //https://www.dievantile.com/sad-background-music/
//    var audio = new Audio(music);
//    audio.play();

     var opt= {
      type: 'basic',
      iconUrl:'icon48.png',
      title:'Ich warne nur!',
      message: "Geniess dein Leben Chillbärt!"
    }
    chrome.notifications.create('notifyID', opt,function(){
      console.log("ja!")
    });

    var mess = $("#name").val();
    // Start the Game: But first reload the page! Prevent schlaue Pr0grammer ... 
    chrome.tabs.query({active: true, currentWindow: true, url: "https://pr0gramm.com/*"}, function(tabs) {
      chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
      setTimeout(()=>{
        chrome.tabs.sendMessage(tabs[0].id, {todo:"changeColor", message: mess});
      }, 2000)
    });

});
$("#save").on("click",function(){
    chrome.storage.sync.get(['total','limit'],function(value){
        var newTotal = parseInt($("#name").val());
        if(value.total){
          newTotal += parseInt(value.total);
        }
        chrome.storage.sync.set({'total': newTotal});
        $("#greet").text(newTotal);
    });
  });
})
