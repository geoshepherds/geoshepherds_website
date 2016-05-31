$(document).ready( function() {
    
    //view and navigation
    var currentView = 'homeView';
    
    var $nextBtn = $('#nextBtn'),
        $skipBtn = $('#skipBtn');
    
    //Introviz texts
    var $mainTitle = $('#mainTitle'),
        $mainText = $('#mainText'),
        $encodeHeader = $('#encodeHeader'),
        $encodeText = $('#encodeText'),
        $revealHeader = $('#revealHeader'),
        $revealText = $('#revealText'),
        $findHeader = $('#findHeader'),
        $findText = $('#findText'),
        $commHeader = $('#commHeader'),
        $commText = $('#commText');
    

    $encodeHeader.hide();
    $encodeText.hide();
    $revealHeader.hide();
    $revealText.hide();
    $findHeader.hide();
    $findText.hide();
    $commHeader.hide();
    $commText.hide();
    
    //Data variables
    var sweOutlineData,
        sweRoadsData,
        eRoadsData,
        eKommunerData,
        roadIntersectsData,
        totalLength;
    
    var svg,
        svgGroup,
        eRoadGroup;
    
    var margin = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
    },
        width = 1200,
        height = 800,
        white = '#fff';
    
    if($(window).width() >= 1440) {

        var windowH = $(window).height() / 3,
            windowW = $(window).width() * 0.45,
            scale = 1000;

    } else if($(window).width() < 1440 && $(window).width() >= 1024) {

        var windowH = $(window).height() / 2,
            windowW = $(window).width() * 0.8,
            scale = 1400;

    } 


    

    
    var projection = d3.geo.mercator()
        .center([20, 63])
        .scale(scale)
        .translate([windowW, windowH]);

    var swePath = d3.geo.path()
    .projection(projection);
    
    function createSVG() {
        
        svg = d3.select('.svgContainer').append('svg')
            .attr({
//                width: width + margin.left + margin.right,
//                height: height + margin.top + margin.bottom,
                id: 'introvizSVG',
                viewBox: '0 0 1280 800'
            })
        .style({
            top: '0px',
            right: '0px',
            position: 'absolute'
        });
        
        svgGroup = svg.append('g')
            .attr({
                class: 'g',
                transform: 'translate(' + margin.left + ',' + margin.top + ')'
            });
        
        createForce();
    } //create svg function end
    
    
    function createForce() {
        
        if($(window).width() >= 1280) {
            
            var windowY = $(window).height() / 2,
                windowX = $(window).width();
            
        } else if($(window).width() < 1280 && $(window).width() >= 1024) {
            
            var windowY = $(window).height() / 2,
                windowX = $(window).width() * 1.4;
            
        } else {
            
            var windowY = $(window).height(),
                windowX = $(window).width() * 2;
        }
        
        
               
        var finaleGroup = svg.append('g')
            .attr({
            class: 'finaleG',
            transform: 'translate(' + margin.left + ',' + margin.top + ')'
        });
        
        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([windowX, windowY]);
        
        d3.json("data/introvis/connections.json", function(error, graph) {
            if (error) throw error;

            force
                .nodes(graph.nodes)
                .links(graph.links)
                .start();                                             

            var link = finaleGroup.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", 1);

            var node = finaleGroup.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", function(d){
                if (d.group == "road") {
                    return 6;
                } else if (d.group == "lan") {
                    return 3;
                } else {
                    return 1.5;
                }
            })
            .style("fill", white)
            .call(force.drag);

            node.append("title")
                .text(function(d) { return d.name; });

            force.on("tick", function() {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

                node.attr("cx", function(d) { return d.x = Math.max(6, Math.min(width - 6, d.x)); })
                    .attr("cy", function(d) { return d.y = Math.max(6, Math.min(height - 6, d.y)); });
            });
        });

    } //create force layout end
    
    function loadData() {
        
        $('.nextSkip h6').fadeOut(400);
        $nextBtn.animate({
          opacity: 0.3
        }, 600);
        $nextBtn.off('click', nextClick);
        
        queue()
            .defer(d3.json, 'data/introvis/swe_outline.geojson')
            .defer(d3.json, 'data/introvis/swe_allroads3.geojson')
            .defer(d3.json, 'data/introvis/swe_eroads.geojson')
            .defer(d3.json, 'data/introvis/swe_eroads_intersect.geojson')
            .defer(d3.json, 'data/introvis/swe_eroad_kommuner.geojson')
            .await(runIntroViz);

    }//loadData function end
    
    function runIntroViz(error, sweOutline, sweRoads, eRoads, roadIntersects, eKommuner) {
        
        sweOutlineData = sweOutline;
        sweRoadsData = sweRoads;
        eRoadsData = eRoads;
        eKommunerData = eKommuner;
        roadIntersectsData = roadIntersects;
        
        introVizStepOne(sweOutlineData, sweRoadsData, eRoadsData, eKommunerData);
        
    }
    
    function introVizStepOne(sweden, roads, eroads, kommuner) {
        
        var count = 0;
        
        d3.selectAll('g.finaleG')
            .transition()
            .duration(800)
            .style({
                opacity: 0
        })
            .remove();
        
        $('#homeTitle').delay(400).animate({
            top: '25%',
            opacity: 0
        }, 1200, function() {
            $('#homeTitle').hide();
            $encodeHeader.show().delay(500).animate({
                marginTop: '25%',
                opacity: 1
            }, 1200, function(){
                $encodeText.delay(200).fadeIn(800);
            });
        });

        
        
       
        
        
//        var pattern = 'media/swe_outlinePattern.png',
//            patternWidth = 100,
//            patternHeight = 714;
//        
//        
//        var defs = svg.append('defs');
//   
//        defs.append('pattern')
//            .attr({
//                id: 'swePattern',
//                patternUnits: 'userSpaceOnUse',
//                width: patternWidth,
//                height: patternWidth
//            })
//            .append('image')
//            .attr({
//                width: patternWidth,
//                height: patternWidth
//            })
//            .attr('xlink:href', pattern)
//            .style({
//                opacity: 0.6
//            });
        
        //transform position of g.g
        svgGroup.attr({
            transform: 'translate(' + margin.left + ',' + margin.top + ')'
        });
        
        //draw sweden outline
        var sweOutlineGroup = svgGroup.append('g')
            .attr({
                class: 'sweOutlineGroup'
            });
        
        sweOutlineGroup.selectAll('path.sweOutline')
            .data(sweden.features)
            .enter().append('path')
            .attr({
                d: swePath,
                fill: '#162C32',
                class: 'sweOutline'
        })
            .style({
                opacity: 0
        })
            .transition()
            .delay(400)
            .duration(4000)
            .style({
                opacity: 1
        });//sweden outline
        
        //draw sweroads
        var roadGroup = svgGroup.append('g')
            .attr({
                class: 'roadGroup'
            });

        var roadPath = roadGroup.selectAll('path.sweroads')
            .data(roads.features)
            .enter().append('path')
            .attr({
                class: 'sweroads',
                d: swePath
            });
        
        var roadsTotalLength = roadPath.node().getTotalLength();
        
        roadPath.style({
                fill: 'none',
                stroke: function(d) {
                    if(d.properties.KKOD == 5011) {
                        return '#fff4f3';
                    } else {
                        return 'rgba(142,106,103,0.85)';
                    }
                },
                'stroke-width': function(d) {
                    if(d.properties.KKOD == 5011) {
                        return '0.85px';
                    } else {
                        return '0.7px';
                    }
                },
                'stroke-dasharray': roadsTotalLength + ' ' + roadsTotalLength,
                'stroke-dashoffset': roadsTotalLength
            })
            .call(roadTransition);
        
        function roadTransition(path) {
            
            path.transition()
                .delay(3400)
                .duration(12000)
                .style({
                    'stroke-dashoffset': 0    
            });
        }
        
        //draw first e-roads
        var motorVagGroup = svgGroup.append('g')
            .attr({
                class: 'motorVag'
            });
        
        var motorVagPath = motorVagGroup.selectAll('path.motorVag')
            .data(eroads.features)
            .enter().append('path')
            .attr({
                d: swePath,
                class: 'motorVag'
            });
        
        var motorVagLength = motorVagPath.node().getTotalLength();
        
        motorVagPath
            .style({
                fill: 'none',
                stroke: 'rgba(251,255,252,0.5)',
                'stroke-width': '0.7px',
                'stroke-dasharray': roadsTotalLength + ' ' + roadsTotalLength,
                'stroke-dashoffset': roadsTotalLength
                })
            .call(motorVagTransition);
        
        function motorVagTransition(path) {

            path.transition()
                .delay(4400)
                .duration(7000)
                .style({
                'stroke-dashoffset': 0    
            });
        } 
        //draw kommuner
        var kommunGroup = svgGroup.append('g')
            .attr({
                class: 'kommunGroup'
            });
        
        kommunGroup.selectAll('path.kommuner')
            .data(kommuner.features)
            .enter().append('path')
            .attr({
                d: swePath,
                id: 'eKommuner',
                class: 'kommuner'
        })
            .style({
                fill: '#6e7660',
                stroke: '#0f2228',
                'stroke-width': '0.45px',
                opacity: 0
        });//kommuner data
        
        //draw e-roads        
        eRoadGroup = svgGroup.append('g')
            .attr({
                class: 'eRoadGroup'
            });

        var eRoadPath = eRoadGroup.selectAll('path.eRoads')
            .data(eroads.features)
            .enter().append('path')
            .attr({
                class: 'eRoads',
                d: swePath
            })
            .style({
                opacity: 0,
                fill: 'none',
                stroke: '#beb89b',
                'stroke-width': '2px',
                'stroke-dasharray': '2.7,2.7'
            });
        
        totalLength = eRoadPath.node().getTotalLength();
        
        var dashPattern = '2.7,2.7';
        
        var dashLength = dashPattern.split(/[\s,]/)
            .map(function(a) { return parseFloat(a) || 0; })
            .reduce(function(a, b) { return a + b; });
        
        var dashCount = Math.ceil( totalLength / dashLength );
        
        var newDashes = new Array(dashCount).join(dashPattern + ' ');
        
        var dashArray = newDashes + ' 0, ' + totalLength;
        
        eRoadPath
            .transition()
            .delay(6000)
            .duration(2500)
            .style({
                opacity: 0.9
        })
            .each('end', function() {
                count += 1;
                if(count === eroads.features.length){
                    $nextBtn.on('click', nextClick);
                    $nextBtn.animate({
                        opacity: 0.75
                    }, 600);
                }
        });
        
       
    }//introviz stepOne function end
    
    function introVizStepTwo() {
        
        var count = 0;
        
        $encodeHeader.animate({
            marginTop: '5%',
            opacity: 0
        }, 1200, function() {
            $encodeHeader.hide();
            $revealHeader.show().delay(500).animate({
                marginTop: '25%',
                opacity: 1
            }, 1200, function(){
                $revealText.fadeIn(600);
            });
        });
        $encodeText.animate({
            opacity: 0
        }, 1200, function() {
            $encodeText.hide();
        });
        $nextBtn.animate({
            opacity: 0.3
        }, 600);
        $nextBtn.off('click', nextClick);
        
        d3.selectAll('path.sweroads')
            .transition()
            .delay(600)
            .duration(2000)
            .style('opacity', 0)
            .each('end', function() {
                
                d3.selectAll('.kommuner')
                    .transition()
                    .delay(function(d, i) {
                    if(d.properties.KOMMUNKOD.length < 4) {
                       return d.properties.KOMMUNKOD * 3;
                    } else {
                       return d.properties.KOMMUNKOD;
                    }
                })
                    .duration(400)
                    .ease('cubic-out')
                    .style('opacity', 0.7)
                    .each('end', function() {
                    count += 1;
                    if(count === eKommunerData.features.length){
                        $nextBtn.on('click', nextClick);
                        $nextBtn.animate({
                            opacity: 0.75
                        }, 600);
                    }
                });
        });
            
        d3.selectAll('path.sweroads').remove();
        
        d3.selectAll('path.motorVag')
            .remove();
        
        
        
    }//introviz stepTwo function end
    
    function introVizStepThree(intersects) {
        
        var count = 0;
        
        $revealHeader.animate({
            marginTop: '5%',
            opacity: 0
        }, 1200, function() {
            $revealHeader.hide();
            roadIntersectGlow();
            $findHeader.show().delay(500).animate({
                marginTop: '25%',
                opacity: 1
            }, 1200, function(){
                $findText.fadeIn(600);
                
            });
        });
        $revealText.animate({
            opacity: 0
        }, 1200, function() {
            $revealText.hide();
        });
        $nextBtn.animate({
            opacity: 0.3
        }, 600);
        $nextBtn.off('click', nextClick);
        
       

        var filterDefs = svg.append('defs');

        var filter = filterDefs.append('filter')
            .attr({
                id: 'blur',
                filterUnits: 'userSpaceOnUse',
                x: '-50%',
                y: '-50%',
                width: '200%',
                height: '200%'
            })
            .append('feGaussianBlur')
            .attr({
                in: 'SourceGraphic',
                stdDeviation: 5
            });
            
        var circleGroup = svgGroup.append('g')
            .attr({
                class: 'circleGroup'
        });
        
        function roadIntersectGlow() {

            circleGroup.selectAll('circle')
                .data(intersects.features)
                .enter().append('circle')
                .attr({
                    class: 'roadIntersects',
                    cx: function(d) {
                        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[0];
                    },
                    cy: function(d) {
                        return projection([d.geometry.coordinates[0], d.geometry.coordinates[1]])[1];
                    },
                    r: 0,
                    filter: 'url(#blur)'
                })
                .style({
                    fill: '#fff'
                });

            d3.selectAll('circle.roadIntersects')
                .transition()
                .delay(function(d, i) {
                    return i * 120;
            })
                .duration(600)
                .ease('back-out')
                .attr({
                    r: 5
            })
                .transition()
                .duration(300)
                .ease('out')
                .attr({
                    r: 3
            })
                .each('end', function() {
                    count += 1;
                    if(count === roadIntersectsData.features.length){
                        $nextBtn.on('click', nextClick);
                        $nextBtn.animate({
                            opacity: 0.75
                        }, 600);
                        roadIntersectGlowRandom();
                    }
            });
            
            function roadIntersectGlowRandom() {
                
                d3.selectAll('circle.roadIntersects')
                    .transition()
                    .duration(600)
                    .each(function() {
                        d3.selectAll(this)
                            .attr({
                                r: 5
                        });
                })
                    .transition()
                    .duration(600)
                    .each(function() {
                        d3.selectAll(this)
                            .attr({
                            r: 3
                        });
                });
            }//road intersect glow random function end
        }//road intersects transition function end
        
    }//introviz stepThree function end
    
    function introVizFinale() {
        
        var count = 0;
        
        $findHeader.animate({
            marginTop: '5%',
            opacity: 0
        }, 1200, function() {
            $findHeader.hide();
            $commHeader.show().delay(500).animate({
                marginTop: '25%',
                opacity: 1
            }, 1200, function(){
                $commText.fadeIn(600);
            });
        });
        $findText.animate({
            opacity: 0
        }, 1200, function() {
            $findText.hide();
        });
        $nextBtn.animate({
            opacity: 0.3
        }, 600);
        $nextBtn.off('click', nextClick);
      
        //d3.selectAll('g.g').remove();
        
        d3.selectAll('g.kommunGroup')
            .transition()
            .duration(800)
            .style({
                opacity: 0
        });
        
        d3.selectAll('g.sweOutlineGroup')
            .transition()
            .delay(800)
            .duration(800)
            .style({
                opacity: 0
        });
        
        var newRoads = svgGroup.append('g')
        .attr({
            class: 'newRoadGroup'
        });

        var newRoadPath = newRoads.selectAll('path.newRoad')
            .data(eRoadsData.features)
            .enter().append('path')
            .attr({
                d: swePath,
                class: 'newRoad'
            });

        var newRoadLength = newRoadPath.node().getTotalLength();

        newRoadPath
            .style({
                fill: 'none',
                stroke: '#beb89b',
                'stroke-width': '2px',
                'stroke-dasharray': newRoadLength + ' ' + newRoadLength,
                'stroke-dashoffset': newRoadLength
        })
            .call(newRoadTransition);

        function newRoadTransition(path) {

            path.transition()
                .delay(1600)
                .duration(800)
                .style({
                'stroke-dashoffset': 0
            })
                .each('end', function() { d3.select(this).call(roadTransitionOut); });
        } 
        
        function roadTransitionOut(path) {
            
            d3.selectAll('path.eRoads').remove();
            
            path.transition()
                .duration(3000)
                .style({
                    'stroke-dashoffset': totalLength
            });
        }
        
        
        
        
        
        d3.selectAll('circle.roadIntersects')
            .transition()
            .delay(5500)
            .duration(1000)
            .attr({
                cx: function(d) {
                    return projection([ 17.094460529383074, 60.670663445012593 ])[0];
                },
                cy: function(d) {
                    return projection([ 17.094460529383074, 60.670663445012593 ])[1];
                }
        })
            .transition()
            .duration(800)
            .ease('back-in')
            .attr({
                r: 0
        })
        .each('end', function(){
            
            count += 1;
            
            if(count === roadIntersectsData.features.length) {
                d3.selectAll('g.g').remove();
                createForce();
                $skipBtn.hide();
                
                $nextBtn.animate({
                    opacity: 0.75
                }, 600);
                $nextBtn.on('click', nextClick);
            }
            
        });
    }
    
    //document event handlers
    $nextBtn.on('click', nextClick);
    $skipBtn.on('click', skipClick);
    
    function nextClick() {

        if (currentView === 'homeView') {
            currentView = 'stepOne';
            loadData();
        } else if (currentView === 'stepOne') {
            currentView = 'stepTwo';
            introVizStepTwo();
        } else if (currentView === 'stepTwo') {
            currentView = 'stepThree';
            introVizStepThree(roadIntersectsData);    
        } else if (currentView === 'stepThree') {
            currentView = 'finale';
            introVizFinale();
        } else if (currentView === 'finale') {
            skipClick();
            $skipBtn.show();
            $nextBtn.prev().show();
            $skipBtn.next().show();
        }
    }
    
    function skipClick() {
        
        firstVisit = false;
        
        var screenHeight = $(window).height();
        
        if(currentView == 'homeView') {
            
            $('body').css('overflow-y', 'auto');
            $('body, html').animate({
                scrollTop: screenHeight
            }, 600, 'linear');
            
        } else {
            
            currentView = 'homeView';

            $('body').css('overflow-y', 'auto');
            $('body, html').animate({
                scrollTop: screenHeight
            }, 600, 'linear');
            d3.selectAll('svg#introvizSVG').remove();
            createSVG();

            //$nextBtn.on('click', nextClick);
            $nextBtn.css('opacity', 0.75);

            $encodeHeader.hide().css({
                'margin-top': '35%',
                opacity: 0
            });
            $encodeText.hide().css('opacity', 1);
            $revealHeader.hide().css({
                'margin-top': '35%',
                opacity: 0
            });
            $revealText.hide().css('opacity', 1);
            $findHeader.hide().css({
                'margin-top': '35%',
                opacity: 0
            });
            $findText.hide().css('opacity', 1);
            $commHeader.hide().css({
                'margin-top': '35%',
                opacity: 0
            });
            $commText.hide().css('opacity', 1);


            $('#homeTitle').show().css({
                opacity: 1,
                top: '50%'
            });
            $mainTitle.css('opacity', 1);
            $mainText.css('opacity', 1);
        
        }
        
    }
    
//    var firstVisit = true;
//
//    if(firstVisit && $(window).width() >= 1024) {
//        $('body').css('overflow', 'hidden');
//    } else {
//        $('body').css('overflow-y', 'auto');
//    }
//
//    
    
    //Call functions on page load
    if($(window).width() >= 1024) {
        $('body').css('overflow', 'hidden');
        createSVG();
        $('.nextSkip').show();
        $('#introvizImg').hide();
    } else if($(window).width() < 1024 && $(window).width() >= 768) {
        $('body').css('overflow-y', 'auto');
        createSVG();
        $('.nextSkip').hide();
        $('#introvizImg').hide();
    } else {
        $('body').css('overflow-y', 'auto');
        $('.nextSkip').hide();
    }
    
});//document ready function end