
$(document).ready(function () {
    $(".menu div").hover(survolnav);
    $(".menu div").click(afficheSection);
    $(".back").click(retourMenu);
    $('.right').click(nextSection);
    $('.left').click(previousSection);
    $('body').removeAttr('class');
    $('.menu').addClass('active');
      
    
    var k = new Kibo();
    
    k.down('left', previousSection).down('right', nextSection).down('esc ', retourMenu);


    
    
   function survolnav() {
    var href= $(this).find("a").attr("href").substring(1);
    $('.'  +href).toggleClass('hover');
    return false;
   }

    function afficheSection(){
       var href= $(this).find("a").attr("href");
       $('.active').removeClass('active');
        $('.hover').removeClass('hover');
       $(href).toggleClass('active');
       return false;
  }

    function retourMenu(){
       $(".active").removeClass('active');
       $('.menu').toggleClass('active');
        $('.hover').removeClass('hover');
        
       return false;
  }

     function nextSection(){
        var $next = $('.square.active').removeClass('active').next('.square');
        if($next.length){ // si il en trouve une lenght==1 si il en trouve pas lenght==0
           $next.toggleClass('active','titleOff');
        }else {
            $('.aboutMe').toggleClass('active');
        }
         
        return false;
   }

     function previousSection(){
        var $prev = $('.square.active').removeClass('active').prev('.square');
         
        if($prev.length && !$prev.hasClass('menu')){
                
            $prev.toggleClass('active','titleOff');
    
        }else{
            $('.contactMe').toggleClass('active');
        }
         
         
        return false;
   }

    
     $('header').jrumble({
	x: 300,
	y: 300,
	rotation: 4,
	speed: 40,
	opacity: true,
	opacityMin: .05
});
   
    var easter_egg = new Konami();
easter_egg.code = function() {
 $('header').trigger('startRumble')
   
}
easter_egg.load();

});
