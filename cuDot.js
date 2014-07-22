(function(){
    var app = angular.module('cuDot',[])

        .directive('cuDot',function($compile,$log){
            return{
                restrict:"E",
                template:"<h1>coucou</h1>",
                scope: {
                    number: '@',
                    height: '@'
                },
                link: function($scope,$element,attrs){

                    var cuDot ={};

                    async.series([
                            function(next){
                                attrs.$observe('number', function(value){
                                    cuDot.number = value;
                                    next();
                                });
                            },
                            function(next){
                                attrs.$observe('height', function(value){
                                    cuDot.height = value;
                                    next();
                                });
                            },
                            function(next){
                                attrs.$observe('color', function(value){
                                    cuDot.color = value;
                                    next();
                                });
                            }

                        ],

                    function(err, results){
                        if(!cuDot.number)
                            cuDot.number = "3";
                        if(!cuDot.height)
                            cuDot.height = "1";
                        if(!cuDot.color)
                            cuDot.color = "black";
                        generatePoint();
                        movePoint();
                    });


                    function generatePoint(){
                        var myDots = "<span>";

                        for(var i = 0; i < cuDot.number ; i ++){
                            myDots += '<span class="dot">.</span>';
                        }

                        myDots += "</span>";
                        $element.html(myDots);

                        var dots = $element[0].firstChild.children;


                        for(var i = 0; i < dots.length ; i++){
                            dots[i].style.position = "absolute";
                            dots[i].style.left = (5+cuDot.height/5)*i+"px";
                            dots[i].style.fontSize  = cuDot.height + "px";
                            dots[i].style.color = cuDot.color;
                        }

                    }

                    function movePoint(){

                        var dots = $element[0].firstChild.children;

                        async.eachSeries(dots,function(dot,next){
                                dot.style.top = "5px";
                                setTimeout(function(){
                                    dot.style.top = "7px";
                                    next();
                                },150);
                            },
                            function(){
                                movePoint();
                            }
                        );

                    }

                }
           };
        });


})();