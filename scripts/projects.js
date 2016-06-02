$(document).ready( function() {
    
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    
    if (isIE) {
        //hide project vis
        $('.chartContainer').hide();
        $('#filterBtnWrap').hide();
        $('.listView').hide();
        $('.pageText').hide();
        
    } else {
    
        function projLanding() {

            d3.selectAll('svg.landingSVG').remove();

            var windowX = $(window).width(),
                windowY = $(window).height();

            var svg = d3.select('.projSection.landing').append('svg')
            .attr({
                viewbox: '0 0 960 560',
                class: 'landingSVG'
            })
            .style({
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
            });

            var circle = svg.selectAll('circle')
            .data(d3.range(50).map(function() {
                return {
                    x: windowX * Math.random(),
                    y: windowY * Math.random(),
                    dx: Math.random() - 0.5,
                    dy: Math.random() - 0.5
                };
            }))
            .enter().append('circle')
            .attr({
                r: 12,
                class: 'randCircle'
            })
            .style({
                fill: '#fff',
                opacity: 0.2
            });

            var start = Date.now(),
                frames = 0;

            d3.timer(function() {

                // Update the FPS meter.
                var now = Date.now(), duration = now - start;

                if (duration >= 1000) frames = 0, start = now;

                // Update the circle positions.
                circle
                    .attr({
                        cx: function(d) { 
                            d.x += d.dx; 
                            if (d.x > windowX) d.x -= windowX; 
                            else if (d.x < 0) d.x += windowX; 
                            return d.x; 
                        },
                        cy: function(d) { 
                            d.y += d.dy; 
                            if (d.y > windowY) d.y -= windowY; 
                            else if (d.y < 0) d.y += windowY; 
                            return d.y; 
                        }
                    });

            });

        }//projLanding end

        function projectViz() {

            queue()
                .defer(d3.csv, 'data/projects/geoshepherds-projects.csv')
                .await(visualiseData);

            var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
                height = 560 - margin.top - margin.bottom,
                radius = 24,
                gravity = -0.01,
                charge = -30,
                //damper = 0.2,
                nodes = [], 
                legendRect = 16,
                legendSpace = 2,
                root, svg, force, circles;
            // FIXME: Work out glitches with force layout movements
            var pi = Math.PI;

            //SVG CALCULATIONS
            var center = {
                x: width / 2,
                y: height / 2 
            }; //svg center

            var topicCenters = {
                'Remote Sensing': {
                    x: center.x * 2 / 5,
                    y: center.y
                },
                'Tourism': {
                    x: center.x * 2 / 5 * 2,
                    y: center.y
                },
                'Infrastructure': {
                    x: center.x * 2 / 5 * 3,
                    y: center.y
                },
                'Environment': {
                    x: center.x * 2 / 5 * 4,
                    y: center.y
                }
            }; //topicCenters

            function visualiseData(error, data) {


                //functions call on data load
                filterData();

                $('#filterBtnWrap button').click(function() {
                    removeProjectChart();
                    removeReadMore();

                    var view_type = $(this).attr('id');
                    toggleView(view_type);

                });


                function filterData() {

                    for(var i = 0; i < data.length; i++){
                        if(data[i].ProjectName !== '') {
                            nodes.push(data[i]);
                        }
                    }
                }

                var nest = d3.nest()
                    .key(function(d) { return d.ProjectName; })
                    .entries(nodes);

                var svg = d3.select('.chartContainer').append('svg')
                    .attr({
    //                    width: width + margin.left + margin.right,
    //                    height: height + margin.top + margin.bottom,
                        id: 'svgVis',
                        viewBox: '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom),
                        preserveAspectRatio: 'xMinYMin meet'
                    });            

                var groupWrap = svg.append('g')
                    .attr({
                        class: 'g',
                        transform: "translate(" + margin.left + "," + margin.top + ")"
                    });

                var toolTipDiv = d3.select('.projUI-view')
                    .append('div')
                    .attr({
                        class: 'tooltip'
                    })
                    .style({
                        opacity: 0
                    });

                //CIRCLES SETUP
                var circles = groupWrap.selectAll('circle.node')
                    .data(nest)
                    .enter().append('circle')
                    .attr({
                        r: 0,
                        id: function(d) { return d.Topic; },
                        class: 'node'
                    })
                    .style({
                        'stroke-width': 2
                    })
                    .on('click', function(d) {
                        removeReadMore();
                        force.alpha(0); //stop force layout
                        removeProjectChart();
                        hideTopics();
                        moveAway($('circle.node').not(this));                
                        moveToCenterBottom(this);               
                        singleProjectChart(d.values);


                        d3.select('.chartContainer')
                            .append('div')
                            .attr('class', 'btnWrapper')
                            .html(function() {

                                var html = '<a href="http://geoshepherds.com/projects/' + d.values[0].pageLink + '" class="btn btn-default projectBtn">';
                                html += '<svg class="readMore">';
                                html += '<rect class="rect" x="0" y="0" fill="none" width="100%" height="100%"/>';
                                html += '</svg>';
                                html += 'READ MORE</a>';

                                return html;
                            })
                            .style('opacity', 0)
                            .transition()
                            .duration(500)
                            .delay(3200)
                            .style('opacity', 1);

                        $('#filterBtnWrap button').removeClass('active');
                 }) 
                    .on('mouseover', function(d) {


                        toolTipDiv.transition()
                            .duration(400)
                            .ease('cubic-in-out')
                            .style({
                                opacity: 0.8
                            });
    //                    
                        toolTipDiv.html('<h6 class="small">' + d.key + '</h6>')
                            .style('top', (d3.event.pageY - 16) + "px")
                            .style('left', (d3.event.pageX + 18) + "px");

                    })
                    .on('mouseout', function(d) {

                        toolTipDiv.transition()
                            .duration(400)
                            .style({
                                opacity: 0
                            });
                    });

                circles.transition()
                    .duration(2500)
                    .attr({
                        r: radius
                    })
                    .style({
                        opacity: 0.7
                    });

                circles.style({
                    fill: '#0f2228'
                });

                function removeReadMore() {
                    d3.select('.btnWrapper').remove();
                }

                function moveToCenterBottom(circle) {

                    d3.select(circle).transition()
                        .attr({
                            cx: center.x,
                            cy: center.y,
                            r: (radius * 2) * 2
                        })  
                        .style({
                            opacity: 0.9
                        })
                        .duration(1500)
                        .delay(1000);
                }

                function moveAway(circle) {

                    d3.selectAll(circle)
                        .each(function(d,i) {
                                d3.select(this)
                                    .transition()
                                    .duration(1000)
                                    .delay(500)
                                    .attr({
                                        cx: function(d) {
                                            return 30 + ((i + 1) * 10);
                                        },
                                        cy: function(d) {
                                                return 30 + ((i + 1) * 10);
                                            },
                                        r: radius - 10
                                    })
                                    .style({
                                        opacity: 0.6
                                    });     
                    });   
                }



                function start() {
                    force = d3.layout.force()
                        .nodes(nest)
                        .size([width, height])
                        .alpha(0.1);
                }
                //ALL PROJECTS(ON LOAD)

                function allProjects() {

                    force.gravity(gravity)
                        .charge(charge)
                        .friction(0.95)
                        .on('tick', function(e) {
                            circles.each(moveToCenter(e.alpha))
                                .attr({
                                    cx: function(d) { return d.x; },
                                    cy: function(d) { return d.y; }
                                });
                        });

                    force.start();

                    circles.transition()
                        .duration(2500)
                        .attr({
                            r: radius
                        })
                        .style({
                            opacity: 0.7
                        });

                    hideTopics();
                }//all projects function end

                function moveToCenter(alpha) {
                    return function(d) {
                        d.x = d.x + (center.x - d.x) * 0.02 * alpha * 1.1;
                        d.y = d.y + (center.y - d.y) * 0.02 * alpha * 1.1;
                    };
                }//function move to center end



                //TOPICS

                function displayTopics() {
                    force.gravity(gravity)
                        .charge(charge)
                        .friction(0.9)
                        .on('tick', function(e) {
                            circles.each(moveToTopicCenter(e.alpha))
                                .attr({
                                    cx: function(d) { return d.x; },
                                    cy: function(d) { return d.y; }
                                });
                        });

                    force.start();

                    circles.transition()
                        .duration(2500)
                        .attr({
                            r: radius
                        })
                        .style({
                            opacity: 0.7
                        });

                    displayTopicHeaders();
                }

                function moveToTopicCenter(alpha) {
                    return function(d) {
                        var target = topicCenters[d.values[0].Topic];
                        d.x = d.x + (target.x - d.x) * 0.02 * alpha * 1.1;
                        d.y = d.y + (target.y - d.y) * 0.02 * alpha * 1.1;
                    };
                }     

                function displayTopicHeaders() {

                    var topicsX = {
                        'Infrastructure': center.x,
                        'Tourism': center.x,
                        'Remote Sensing': center.x,
                        'Environment': center.x
                    },
                        topicKeys = d3.keys(topicsX),
                        topicsHead = svg.selectAll('.topics')
                            .data(topicKeys);

                    topicsHead.enter().append('text')
                        .attr('class', 'topics')
                        .attr('x', function(d) {
                            return topicCenters[d].x;
                        })
                        .attr('y', center.y / 3)
                        .attr('text-anchor', 'middle')
                        .text(function(d) {
                            return d;
                        });
                }

                function hideTopics() {

                    svg.selectAll('.topics')
                        .transition()
                        .duration(400)
                        .ease('cubic-in-out')
                        .remove();

                }

                function removeProjectChart() {

                    d3.select('#projectLabel').transition()
                        .duration(200)
                        .ease('cubic-in-out')
                        .attr('opacity', 0)
                        .remove();

                    d3.select('#processLabel').transition()
                        .duration(200)
                        .ease('cubic-in-out')
                        .attr('opacity', 0)
                        .remove();

                    svg.selectAll('.radialGroup').transition()
                        .duration(800)
                        .attr('opacity', 0)
                        .remove();

                }//Function remove project chart end

                function singleProjectChart(chartData) {

                    var color = d3.scale.ordinal()
                    .range(['#3F8EA7', '#333641', '#B28770', '#DA5D3C'])
        //                .range(['#30444a', '#77524b', '#375742', '#77624b'])
                        .domain(d3.range(0,4));

                    var arr = chartData.length;
                    var increment = pi/arr;

                    var processStage = d3.select('.chartContainer')
                        .append('div')
                        .attr({
                            'id': 'processLabel'
                        })
                        .style('opacity', 0);

                    var projectName = d3.select('.chartContainer')
                        .append('div')
                        .attr({
                            'id': 'projectLabel'
                        })
                        .style('opacity', 0)
                        .html( '<h6 class="projectTitle">' + chartData[0].ProjectName + '</h6>');

                    projectName
                        .transition()
                        .ease('ease-in')
                        .duration(800)
                        .delay(2200)
                        .style('opacity', 1);

                    var arc = d3.svg.arc()
                        .innerRadius((radius * 2) * 2 + 24)
                        .outerRadius((radius * 2) * 2 + 54);

                    var pie = d3.layout.pie()
                        .value(function(d){ return d.DurationPercent; })
                        .sort(null);

                    var group = d3.selectAll('g.g')
                        .append('g')
                        .attr('class', 'radialGroup')
                        .attr('transform', 'translate(' + center.x + 
                          ',' + center.y + ')')
                        ;

                    var path = group.selectAll('path')
                        .data(pie(chartData))
                        .enter()
                        .append('path')
                        .attr({
                            class: 'arcPath'
                        })
                        .style({
                            fill: function(d, i) { 
                                return color(d.data.ProcessStage);
                            },
                            'stroke-width': 1,
                            stroke: '#fff',
                            opacity: 1
                        })
                        .on('mouseenter', function(d) {

                            d3.select('.projectTitle')
                                .transition()
                                .style('opacity', 0);

                            d3.select('#processLabel')
                                .html('<h6 class="xsmall">' + d.data.ProcessTask + '</h6><hr class="chartDivide"><h5 class="small light">' + d.data.DurationPercent + '%</h5><span> of the total project</span>')
                                .transition()
                                .duration(600)
                                .ease('ease-in-out')
                                .style('opacity', 1);

                            var current = this; 
                            d3.selectAll('.arcPath')
                                .transition()
                                .style({
                                opacity: function() {
                                    return (this === current) ? 1 : 0.4;    
                                    }
                                });  
                        })
                        .on('mouseleave', function(d) {

                            d3.select('#processLabel')
                                .transition()
                                .ease('ease-out')
                                .duration(400)
                                .style('opacity', 0);

                            var current = this; 

                            d3.selectAll('.arcPath').transition()
                                .duration(600)
                                .ease('cubic-in-out')
                                .style({
                                    opacity: function() {
                                        return (this === current) ? 1 : 1;    
                                    }
                                });

                            d3.select('.projectTitle')          
                                .transition()
                                .delay(400)
                                .duration(400)
                                .ease('cubic-in-out')
                                .style({
                                    opacity: function() {
                                        return (this === current) ? 0 : 1;    
                                    }
                                });    
                        });


                    path.transition()
                        .duration(1000)
                        .delay(2200)
                        .attrTween('d', function(d) {
                            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
                            return function(t) {
                                return arc(interpolate(t));
                            };
                    });




                    //LEGEND FOR PROJECT CHART

                    var legendArr = [];

                    for(var i = 0; i < chartData.length; i++) {
                        var process = chartData[i].ProcessStage;
                        if($.inArray(process, legendArr) == -1) {
                            legendArr.push(process);
                        }
                    }

                    var legend = group.selectAll('.legend')
                        .data(legendArr)
                        .enter().append('g')
                        .attr({
                            class: 'legend',
                            transform: function(d, i) {
                                var h = legendRect + legendSpace,
                                    offset = h * (4 + 2) / 2,
                                    x = (center.x / 2) + 40,
                                    y = i * offset - 120;
                                return 'translate(' + x + ', ' + y + ')';                
                            }
                        })
                        .style({
                            opacity: 0
                        });

                    var LegendArc = d3.svg.arc()
                        .startAngle(0)
                        .endAngle(1.57)
                        .innerRadius(14)
                        .outerRadius(28);

                    legend.append('path')
                        .attr({
                            d: LegendArc
                        })
                        .style({
                            fill: color,
                            stroke: color
                    });

                    legend.append('text')
                        .attr({
                            x: (legendRect + legendSpace) + 24,
                            y: -8
                        })
                        .text(function(d) { return d; });

                    legend.transition()
                        .ease('cubic-in-out')
                        .duration(1000)
                        .delay(3200)
                        .style('opacity', 1);






                } //END SINGLE PROJECT CHART FUNCTION

                function toggleView(viewType) {
                    if (viewType == 'topicBtn') {
                        start();
                        displayTopics();

                        $('#filterBtnWrap button#topicBtn').addClass('active');

                        $('#filterBtnWrap button#resetBtn').removeClass('active');
                    } else {
                        start();
                        allProjects();

                        $('#filterBtnWrap button#topicBtn').removeClass('active');

                        $('#filterBtnWrap button#resetBtn').addClass('active');
                    }
                } // end toggle view function

                toggleView();

                //create list view of projects
                var listContainer = d3.select('.listViewContainer')
                    .append('div')
                    .attr({
                        id: 'listContainer'
                    });

                var listDiv = listContainer.selectAll('div.row')
                    .data(nest)
                    .enter().append('div')
                    .attr({
                        class: 'row'
                    })
                    .html(function(d, i) {

                        var htmlList = '<div class="col-xs-12 projList">';
                        htmlList += '<div class="projImg"></div>';
                        htmlList += '<h2>' + d.key + '</h2>';
                        htmlList += '<a href="http://geoshepherds.com/projects/' + d.values[0].pageLink + '" class="btn btn-default projReadMore">';
                        htmlList += '<svg class="readMore">';
                        htmlList += '<rect class="rect" x="0" y="0" fill="none" width="100%" height="100%"/>';
                        htmlList += '</svg>';
                        htmlList += 'READ MORE</a>';
                        htmlList += '<hr></div>';

                        return htmlList;
                    });


                d3.selectAll('.projImg')
                    .style({
                        'background-image': function(d, i) {
                            return 'url("http://geoshepherds.com/media/' + nest[i].values[0].Image + '.jpg")'
                        },
                        'background-repeat': 'no-repeat',
                        'background-position': '0% 80%',
                        'background-size': 'cover',
                        width: '100%',
                        height: '280px'
                    });



            } //end visualise data function

        }//projViz end

        var projectCheck = false;

        function isScrolledIntoView(elem) {

            var docViewTop = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height();

            var elemTop = $(elem).offset().top,
                elemBottom = elemTop + $(elem).height();

            return (elemBottom <= docViewTop);
        }//isScrolled end


        function showElement(myelement) {

            $(window).scroll(function() {
                if(isScrolledIntoView(myelement)) {
                    if(!projectCheck) {
                        projectCheck = true;
                        projectViz();
                    }
                }      
            });
        }//showElement end    

        //call functions on document ready
        projLanding();
        showElement($('.geoshepLogo'));

        $(window).resize(function() {
            projLanding(); 
        });


        $('.pageHeader').delay(400).animate({
            opacity: 1
        }, 800, function() {
            $('.pageText').animate({
                marginTop: 0,
                opacity: 1
            }, 1000, function() {
                $('.uiNav').delay(400).animate({
                    bottom: '10px',
                    opacity: 1
                }, 600);
            });
        });
        
    }   //end is not IE
}); //end document ready function
            
   