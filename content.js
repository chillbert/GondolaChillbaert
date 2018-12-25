chrome.runtime.sendMessage({todo: "showPageAction"});

chrome.runtime.onMessage.addListener(function(req,send,res){
  if(req.todo =="changeColor"){

    var show_comments = function(){
        console.log("Was geht hier?")
        $(".item-image").attr("id","regen");
        $input = $("<input class='message' type='text'>")
        $input.css("width","73%")

         $btn = $("<input type='submit' value='SEND'>")
         $btn.css("width","20%")
         .on("click",function(){
           console.log("hi")
           var message = "Chillbärt: "+$(".message").val()+"<hr>"
           $(".list").append(message)
          // $(".message").val("")
         })

         $wrapper = $("<div></di>")
         $wrapper.css("display","flex")
         .css("bottom","0px")
         .css("width","100%")
         .css("margin","10px")
         .css("position","absolute")
         .append($input)
         .append($btn);


         $kommentar_leiste = $("<div><div>")
          $kommentar_leiste.css("height","100%")
          .css("width","300px")
          .css("overflow","scroll")
          .css("position","fixed")
          .css("right","0px")
          .css("top","0px")
          .css("background","orange")
          .css("z-index","999999")
          .append($wrapper)
          .append("<div class='list'></div>")
          $("body").append($kommentar_leiste)
   }
    $body = $("body");

   //show_comments();

     //init Throwable:
     var inject_script = function(script){
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = script;
      $("head").append(s);

     }

     inject_script("https://benahm.github.io/jquery.throwable/javascripts/jquery.throwable.js");
     //inject_script("https://unpkg.com/sweetalert/dist/sweetalert.min.js");



     //erstes Foto aufmachen:
    $($(".silent.thumb")[0]).find("img").click()
    var music = chrome.extension.getURL("./music/05_Forgotten_dream.mp3"); //https://www.dievantile.com/sad-background-music/
    var wreee = chrome.extension.getURL("./music/wreee.mp3"); //https://www.dievantile.com/sad-background-music/
    var gondola_stay = chrome.extension.getURL('./img/gondola_staying.gif');
    var gondola1 = chrome.extension.getURL('./img/gondola.gif');
    var rainimg = chrome.extension.getURL("./img/regen.gif");
    var weinenUrl = chrome.extension.getURL('./img/cry.gif');
    var ball_url = chrome.extension.getURL('./img/ball.png');
    let schwein_url =chrome.extension.getURL('./img/wildschwein.gif');

    //var ball_url = chrome.extension.getURL('./img/beach_ball.png');
    var grass_url = chrome.extension.getURL('./img/grass.png');
    var bush_url = chrome.extension.getURL('./img/bush.png');
    var krebs_url = chrome.extension.getURL('./img/krebs.gif');
    var hausb_url = chrome.extension.getURL('./img/haus_b1.png');
    var chillbaert_url = chrome.extension.getURL('./img/chillbaert.png');
    var hausf_url = chrome.extension.getURL('./img/haus_f.png');
    var rauch_url = chrome.extension.getURL('./img/rauch.gif');
    var schmuser_url = chrome.extension.getURL('./img/schmuser.jpg');

    var $gondola = $("<img class='gondola' src='"+gondola1+"'>");
    var $gamePlayer = $("<img class='playerG' src='"+gondola_stay+"'>");
    var $rain = $("<img class='rain' src='"+rainimg+"'>");


    //**********FIRE:
    var Fire = function(option){
        this.dom = $('<img src="https://i.gjcdn.net/data/fireside/posts/2/138/179138/media/fireball_fireground-6m5c8d8c.gif" class="fire">');
        this.dom.css(css);
        if(option){
          this.dom.css(option);
        }
    }

    var FireFactory = function(){
    }
    var z = Math.floor((Math.random() * 360) + 1);
    z = 0;
    var css = {
            position: "fixed",
            bottom: 0,
            "z-index": "999",
            width: "100px",
            right: "50%",
            filter:"hue-rotate("+z+"deg)"
      };
    function createFireCSS(){
      var z = Math.floor((Math.random() * 360) + 1);
      var css = {
              position: "fixed",
              bottom: 0,
              "z-index": "999",
              width: "100px",
              right: "50%",
              filter:"hue-rotate("+z+"deg)"
        }; 
      return css; 
    }
    FireFactory.prototype.createFire = function (target, position,fire) {
      fire.dom.css({ left:position.left, right: position.right});
      $(target).append(fire.dom);
    }

    var ff = new FireFactory();
    for(i=0;i<10;i++){
      var fire = new Fire(css);
      var left = Math.floor((Math.random() * 1000) + 1);
      ff.createFire("body",{left:left+"px",right:"0px"},fire)
    }

    setInterval(function(){
      let fire = new Fire(createFireCSS());
      let left = Math.floor((Math.random() * 1000) + 1);
      ff.createFire("body",{left:left+"px",right:"0px"},fire);
      $(".schwein").css('left',$gamePlayer.offset().left-200+'px');
      $(".schwein").css('transform', 'scaleX(1)');
      if(!recognizing){
          //recognition.start();
      }
    },15000)


    //***********AUDIO:
    var audioPlayer = $('<audio class="my_audio" controls preload="none"><source src="'+music+'" type="audio/mpeg"></audio>')
    $body.append(audioPlayer);
    $(".my_audio").trigger('load')
    //.trigger('play'); ////////////////// HIER MUSIK EINSCHALTEN!

    //****** eg. position: 12px
    getNumber = function(position){
      position = position.split("px");
      position = 1*position[0];
      return position;
    }

    //******* animation of gondola (not the player):
    var walkPosition = $(".item-image-wrapper").offset()
    var walkEnd = $(".item-image-wrapper").css("width");
    walkEnd = getNumber(walkEnd)+"px";
    $body.append("<style>@keyframes walk { 0% {left:"+walkPosition.left+"px; -webkit-transform: scaleX(1); transform: scaleX(1);} 50% {left: "+walkEnd+"; -webkit-transform: scaleX(1); transform: scaleX(1);} 51% { -webkit-transform: scaleX(-1); transform: scaleX(-1);} 100% {left: 0px; -webkit-transform: scaleX(-1); transform: scaleX(-1);} }</style>");
    var end = getNumber($(".item-image-wrapper").css("height"))+50;
    var start = walkPosition.top-100;
    var randomTop = Math.floor(Math.random() * end) + start +"px";

    $gondola.css({
      position: "absolute",
      top: randomTop,
      width: "100px",
    //  "mix-blend-mode": "multiply",
      animation: "walk 90s infinite",
      "z-index": 99,
      "animation-timing-function": "linear"
    });
    $rain.css({
        position:"fixed",
        top: 0,
        left:0,
        'z-index':4
    });

    //*** append gondola      EXTRA CHARACTERS HERE!
    //$("body").append($gondola);
    //*** append player
    $body.append($gamePlayer);
    //****** append cry tears
    $body.append("<img src='"+weinenUrl+"' style='bottom: -9px; position:fixed; z-index:999; width:100px;' class='weinen'>")


    var lauf_richtung = 1;
    var weint = false;
    var ground = 15;
    //**** playerG Style at the bottom and add transition for top (jumping) and left (walking):
    $body.append("<style>.playerG{  z-index: 99;position: fixed; bottom: "+ground+"px; width: 100px; transition: left 1s cubic-bezier(0.39, 0.58, 0.57, 1), bottom 1s cubic-bezier(0.42, 0, 0.32, 0.97); left: 522.594px;}</style>");
        // PlayerGondola Javascript: TODO TODO TODO TODO TODO
    var weint_start = 0;
    var weint_end = 0;
    $body.keydown(function(e) {
        if (e.ctrlKey && currentH !==0){
          if(!weint){
            weint_start = e.timeStamp;
            console.log(weint_start);
          }
          weint = true;
      	}
        if(e.key === "n"){
          if($(".playerG").offset().left < 50) return;
          lauf_richtung = -1;
          if($(".playerG").attr("src") != gondola1){
            $(".playerG").attr("src",gondola1);
          }
          var left = $(".playerG").css("left");
          left = left.split("px")[0];
          var newLeft = left*1-100;
          $(".playerG").css("left",newLeft+"px");
          $(".playerG").css("transform","scaleX(-1)");
        }
        if(e.key === "m"){
          if($('body').width()<$(".playerG").offset().left) return;
          lauf_richtung = 1;
          if($(".playerG").attr("src") != gondola1){
            $(".playerG").attr("src",gondola1);
          }
          var left = $(".playerG").css("left");
          left = left.split("px")[0];
          var newLeft = left*1+100;
          $(".playerG").css("left",newLeft+"px");
          $(".playerG").css("transform","scaleX(1)");
        }
        if(e.key === "j"){
          $(".playerG").css("bottom","100px");
          setTimeout(function(){
              $(".playerG").css("bottom",ground+"px");
          },1000)
        }
    });

    var ball_exist = false;
    $body.keyup(function(e) {
        console.log(e.key);
        if (e.key ==="Control"){
          console.log("CONTROL!")
          weint = false;
          weint_end = e.timeStamp;
          console.log("weintEnd", weint_end);
          var duration = (weint_end-weint_start)/1000;
          console.log("Weinte ganze "+duration+" Sekunden lang!");
          reduce_tears(duration);
          if(!ball_exist){
            ball_exist = true;
            create_ball();
          }
      	}
        setTimeout(function(){
          $(".playerG").attr("src",gondola_stay);
        },700)
      })



      var create_element = function(url){
        var $grass = $("<img src='"+grass_url+"' class='grass' >");
        $grass.css("z-index",99999)
        .css("position","fixed")
        .css("left","0px")
        .css("width","700px")
        .css("bottom","-25px");
        $('body').append($grass);
        var $bush = $("<img src='"+bush_url+"' class='bush' >");
        var $bush2 = $("<img src='"+bush_url+"' class='bush' >");
        $bush.css("z-index",9)
        .css("position","fixed")
        .css("bottom","-46px")
        $('body').append($bush);
        $bush2.css("z-index",99999)
        .css("position","fixed")
        .css("bottom","-46px")
        .css("left","500px")
        .css("width","200px")
        $('body').append($bush2);
      }
      create_element();

      $(".vote-fav").throwable({
                           drag:true,
                           gravity:{x:0,y:10},
                           impulse:{
                               f:0,
                               p:{x:1,y:1}
                           },
                           shape:"box",
                           autostart:false,
                           bounce:0.5,
                           damping:100,
                           areaDetection:[[0,0,300,300]],
                           collisionDetection: true
                       }).css("color","orange")


       function collision($div1, $div2) {
               var x1 = $div1.offset().left;
               var y1 = $div1.offset().top;
               var h1 = $div1.outerHeight(true);
               var w1 = $div1.outerWidth(true);
               var b1 = y1 + h1;
               var r1 = x1 + w1;
               var x2 = $div2.offset().left;
               var y2 = $div2.offset().top;
               var h2 = $div2.outerHeight(true);
               var w2 = $div2.outerWidth(true);
               var b2 = y2 + h2;
               var r2 = x2 + w2;

               if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
               if($div2.hasClass("fire")){
                 $div2.remove();
               }
               return true;
             }

        $('body').append('<div class="boxito" style="width:100%; height:95%; left:0; top:0; position:fixed;"></div>')

        var create_ball = function(){
          var $ball = $("<img src='"+ball_url+"' class='ball' />");
          $ball.css("z-index",9999)
          .css("position","fixed")
          .css("bottom","10px")
          .css("width","50px");
          $('.boxito').append($ball);
          //$(".ball").throwable({shape:"circle", gravity:{x:0,y:1},impulse: {f: 5, p: {x:lauf_richtung*15,y:-15}}});
          $(".ball").throwable({
                          containment: "parent",
                          //container:'parent',
                          drag:true,
                          gravity:{x:0,y:1},
                          impulse:{
                              f:5,
                              p:{x:lauf_richtung*16,y:-10}
                          },
                          shape:"circle",
                          autostart:false,
                          bounce:1,
                          damping:10,
                          //areaDetection:[[0,0,300,300]],
                          collisionDetection: true
                      });
                      
        }
        /*
        $(".ball").throwable({
                        drag:true,
                        gravity:{x:0,y:1},
                        impulse:{
                            f:0,
                            p:{x:lauf_richtung*16,y:-10}
                        },
                        shape:"circle",
                        autostart:false,
                        bounce:1,
                        damping:100,
                        areaDetection:[[0,0,300,300]],
                        collisionDetection: true
                    });
                    */
        var $weint = $(".weinen");
        setInterval(function(){
           if(weint){
             var offset = lauf_richtung*20;
             $weint.css({
               display: "block",
               left: getNumber($(".playerG").css("left"))*1+offset+"px",
               transform: "scaleX("+lauf_richtung*-1+")"
             });

           }else{
             $weint.css("display","none");
           }
         	if(collision($(".playerG"),$(".vote-fav"))){
         		$(".vote-fav").css("color","pink");
            $(".vote-fav").throwable({gravity:{x:0,y:1},impulse: {f: 3, p: {x:lauf_richtung*15,y:-15}}});
         	}else{
         		$(".vote-fav").css("color","hotpink").css("font-size","30px")
         	}
          if(ball_exist){
            if(collision($(".playerG"),$(".ball"))){
              $(".ball").throwable({
                containment: "parent",
                //container:'parent',
                drag:true,
                gravity:{x:0,y:1},
                impulse: {f: 5, p: {x:lauf_richtung*15,y:-15}},
                shape:"circle",
                autostart:false,
                bounce:1,
                damping:10,
                //areaDetection:[[0,0,300,300]],
                collisionDetection: true
            });
              //$(".ball").throwable({containment: "parent", shape:"circle", gravity:{x:0,y:1},impulse: {f: 5, p: {x:lauf_richtung*15,y:-15}}});
            }
          }
           
           $( ".fire" ).each(function( index ) {
            if(collision($weint,$( this ))){
              console.log("FEUER!")
           }
          });
         }, 300);

         $body.append($rain);
         $(".ball").css({
           "position":"fixed",
           "top": 'none',
           "bottom": "-13px"
         });
         $("#page").css("z-index","9");
         $("div.item-container").css("background","rgba(0,0,0,0)");

         var $sand = $('<div class="sand"></div>');
         $sand.css({
             width: "100%",
             height: "33px",
             background: "#f4f3e2",
             bottom: "0px",
             position: "fixed",
             "z-index": 9,
             background: 'url('+chrome.extension.getURL('./img/sand.jpg')+')'
            })
           var $sandstaub = $('<div class="sandstaub"></div>');
           $sandstaub.css({
               width: "110%",
               height: "20px",
               background: "#f4f3e2",
               bottom: "20px",
               position: "fixed",
               "z-index": 9,
               filter: "blur(4px)",
               background: 'url('+chrome.extension.getURL('./img/sand.jpg')+')'
             })
           $body.append($sand);
           $body.append($sandstaub);

          var $krebs = $('<img src="'+krebs_url+'" class="krebs" style="position: fixed;bottom: 25px;z-index: 998;width: 50px;right: 77px;">');
          $body.append($krebs);

          //CSS effekte https://blog.kulturbanause.de/2015/03/css-filter-effekte/
          $body.append("<img src='"+schwein_url+"' style='bottom: 0px; position:fixed; z-index:999; left:0px;transition: left 2s;' class='schwein'>");
         
          var schweinSound = new Audio(wreee);

          window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
          var recognizing = false;
          let finalTranscript = '';
          let recognition = new window.SpeechRecognition();
          //recognition.interimResults = true;
          recognition.maxAlternatives = 10;
          recognition.continuous = true;
          recognition.lang = "de-DE"
          recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
              let transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                finalTranscript = transcript;
              } else {
                interimTranscript += transcript;
              }
            }
            console.log( "finalTranscript" ,finalTranscript.trim().toLowerCase() );
            console.log( "interimTranscript",interimTranscript );
            let fs = finalTranscript.toLowerCase().trim();
            if(fs == 'geh weg' || fs == 'hey geh weg' || fs == 'bgb'|| fs == 'bg weg'|| fs == 'gebäck'|| 
            fs == 'eggebek'|| fs == 'egw' || fs == 'bg weg'|| fs == 'nickelback' || fs == 'nickelback' || 
            fs == 'ich geh weg' || fs == 'hege weg' || fs == 'nee geh weg' || fs == 'wir gehen weg' ||
            fs == 'geh geh weg' || fs == 'teegebäck' || fs == 'payback' || fs == 'hey hey wickie' ||
            fs == 'und ewig' || fs == 'hey baby' || fs == 'ich gebe' || fs == 'lgb' || fs == 'wir geweckt' || 
            fs == 'bgw' || fs == 'hergeben' || fs == 'verge weg' ||fs == 'vergebe' ||fs=='tgw'){

              //alert('OK');
              schweinSound.play();
              $(".schwein").css('left','0px');
              $(".schwein").css('transform', 'scaleX(-1)');
            }else if(fs == 'musik'){
              if($(".my_audio")[0].paused){
                $(".my_audio").trigger('play');
              }else{
                $(".my_audio").trigger('pause');
              }
              //alert(transcript);
            }
          }
          recognition.onstart = function () {
            recognizing = true;
          };        
          recognition.onerror = () => {
            recognizing = false;
            recognition.start();
            console.log('FEHLER AUDIO')
            // alert('RESTART!')
          }
          recognition.onend = () => {
            recognizing = false;
            recognition.start();
            console.log('AUDIO RESTART')
            // alert('RESTART!')
          }

          recognition.start();
          $body.append("<img src='"+hausb_url+"' style='bottom: 0px; position:fixed; z-index:9; left:0px;-webkit-filter: brightness(1.4) contrast(1.3); filter: brightness(1.1) contrast(1.3);' class='haus'>");
          $body.append("<img src='"+hausf_url+"' style='bottom: 0px; position:fixed; z-index:999; left:0px;-webkit-filter: brightness(1.4) contrast(1.3); filter: brightness(1.1) contrast(1.3);' class='haus'>");
          $body.append("<img src='"+chillbaert_url+"' style='bottom: 200px; position:fixed; z-index:999; left:150px; width: 130px;' class='haus'>");
          $rauch = $('<img src='+rauch_url+' class="rauch">');
          $rauch.css({
            'z-index': 999,
            position: 'fixed',
            bottom: '290px',
            left: '-75px',
            transform: 'rotate(-90deg)',
            width: '200px',
            'mix-blend-mode': 'lighten'
          })
          $body.append($rauch); //rauch https://www.pinterest.ch/pin/459156124491869426/?lp=true
            //send message ...
          $schmuser = $('<img src='+schmuser_url+' class="schmuser">');
          $schmuser.css({
            'z-index': 999,
            position: 'fixed',
            bottom: '141px',
            left: '272px',
            width: "70px",
            "border-radius": "50%",
            transform: "skew(-10deg) rotate(-28deg)",
            display:'none'
          })
          $body.append($schmuser);
          
            var user_name = $("#user-profile-name").text();
            //var gondola_icon = 'https://user-images.githubusercontent.com/16103879/30236247-f50efb28-951d-11e7-9130-a2afcce2a9c6.png';
            let gondola_icon = chrome.extension.getURL('./img/iconGondola.png');
            let sad_gondola = chrome.extension.getURL('./img/sadGondola.jpg');

            swal({
              //title: "Top result:",
              text: "Gondola: Hi "+user_name+"!",
              icon: gondola_icon,
            });

            var text = $('.swal-text').text();

            var length = text.length;
            var timeOut;
            var character = 0;


            (function typeWriter() {
                timeOut = setTimeout(function() {
                    character++;
                    var type = text.substring(0, character);
                    $('.swal-text').text(type);
                    typeWriter();

                    if (character == length) {
                        clearTimeout(timeOut);
                    }

                }, 100);
            }());

            $body.append("<style>.swal-button, .swal-modal{ border:5px solid black;} .swal-modal{ font-family:monospace;} .swal-icon img{ width: 150px; border-radius: 50%; border: 5px solid black;}</style>");

            $('.swal-modal').tilt({
                glare: true,
                maxGlare: .5
            })

            var $depression = $("<div class='depression'>");
            $depression.css({
              width: "62px",
              height: "36px",
              background: "#5dc8f6",
              "z-index": 99999,
              position: "fixed",
              bottom: "70px",
              left: "61px",
              "mix-blend-mode": "color",
              "border-radius": "35%"
            })
            let $depression_lcd = $("<span class='depression_lcd'>");
            $depression_lcd.css({
              "z-index": 99999,
              position: "fixed",
              bottom: "112px",
              left: "127px",
              color:'black',
              'font-weight': '700'
            })
            $body.append($depression_lcd);
            var currentH = 30;
            $body.append($depression);
            let mieser = true;
            var reduce_tears = function(amount){
              console.log('Amount',amount)
              currentH = getNumber($depression.css("height"));
              let currentHRound = Math.round(currentH);
              if(currentH > 0 ){
                console.log("CurrH", currentH);
                let c = Math.round(currentHRound-amount)
                $depression_lcd.text(c)
                $depression.css("height",c+"px");
              }else{
                $schmuser.css('display','block');
                swal({
                  //title: "Top result:",
                  text: `Lieber ${user_name}, du hast dich ausgeweint! Dein Fühl-Getriebe muss geölt werden. Klicke dafür auf das Fenster.`,
                  icon: sad_gondola,
                });
              }
              if(currentHRound%6 === 0){
                [...'Gamb ist ein Huso! Fröschler sowieso!'].forEach((c,i) =>{
                  setTimeout(()=>{
                    if(mieser){
                            let tmp = $('.comment-form textarea').val()
                            $('.comment-form textarea').val(tmp+c)
                        }
                  },i*500)
                })                
              }
            }
            let $suchbar = $('#search-form-inline .q');
            let $suchbtn = $('#search-submit-inline');
            $schmuser.on('click',function(){
              $suchbar.val('rechts in die fühls');
              $suchbtn.click();
              setTimeout(()=>{
                let rnd = Math.round(Math.random()*20)
                $($(".silent.thumb")[rnd]).find("img").click()
              },500)
              let weinenAufladen = setInterval(()=>{
                  let c_vorher =  $depression_lcd.text()
                  $depression_lcd.text(c_vorher*1+1);
                  let c_danach = $depression_lcd.text()*1;
                  $depression.css("height", c_danach+"px");
                  if(c_danach > 35){
                    clearInterval(weinenAufladen);
                  }
              },1000)
            })
            
            let openProfile = (username)=>{
              $("#user-profile-name").attr('href','/user/'+username)
              document.getElementById('user-profile-name').click();
            }
          //  swal("Good job!", "Hallo lieber schwuchtliger "+user_name+"!", "success", {
          //    button: "Aww yiss!",
          //  });


  }
})
