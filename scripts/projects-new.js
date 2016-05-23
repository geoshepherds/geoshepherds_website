$(document).ready( function() {

    var googleSheet = 'https://docs.google.com/spreadsheets/d/1lYReMdscbqejyKgobyVulAE0rHhvKra0srED0Gr9d_Q/pubhtml';

    Tabletop.init({
        key: googleSheet,
        callback: visualiseData,
        simpleSheet: true
    });

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = 768 - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom,
        radius = 24,
        gravity = -0.01,
        charge = -30,
        //damper = 0.2,
        nodes = [], 
        legendRect = 16,
        legendSpace = 2,
        root, svg, force, circles;
    
    var pi = Math.PI;

    //SVG CALCULATIONS
    var center = {
        x: width / 2,
        y: height / 2 
    }; //svg center

    var topicCenters = {
        'Remote Sensing': {
            x: center.x / 2 * 3,
            y: center.y
        },
        'Tourism': {
            x: center.x,
            y: center.y
        },
        'Infrastructure': {
            x: center.x / 2,
            y: center.y
        }
    }; //topicCenters
    
    function visualiseData(data, tabletop) {

        //functions call on data load
        filterData();

        $('#filterBtnWrap button').click(function() {
            var view_type = $(this).attr('id');
            toggleView(view_type);
            removeProjectChart();
        });


        function filterData() {

            for(var i = 0; i < data.length; i++){
                if(data[i].ProjectName !== '') {
                    nodes.push(data[i]);
                }
            }
        }//filter data function end

        var nest = d3.nest()
            .key(function(d) { return d.ProjectName; })
            .entries(nodes);

        var svg = d3.select('.chartContainer').append('svg')
        .attr({
            width: width + margin.left + margin.right,
            height: height + margin.top + margin.bottom,
            id: 'svgVis'
        });            

        var groupWrap = svg.append('g')
        .attr({
            class: 'g',
            transform: "translate(" + margin.left + "," + margin.top + ")"
        });

        //CIRCLES SETUP
        var circlesGroup = groupWrap.selectAll('.group')
        .data(nest)
        .enter().append('g')
        .attr({
            class: 'group'
        });

        var circles = circlesGroup.append('circle')
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
            readMore();
            force.alpha(0); //stop force layout
            removeProjectChart();
            hideTopics();
            moveAway($('circle').not(this));                
            moveToCenterBottom(this);               
            singleProjectChart(d.values);
            toggleView('chartView');
            //TODO: on click active chart shouldn't redraw
        }) 
        .on('mouseover', function(d) {
            
        });// TODO: on mouseover show project name

        circles.transition().duration(2500)
            .attr({
                r: radius
            })
            .style({
                opacity: 0.7
            });

        circles.style({
            fill: '#0f2228'
        });

        function readMore() {
            d3.select('.chartContainer')
                .append('div')
                .attr('class', 'btnWrapper')
                .html('<button class="btn btn-default projectBtn" type="button">READ MORE</button>')
                .style('opacity', 0)
                .transition()
                .duration(500)
                .delay(3200)
                .style('opacity', 1);
        }

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
            d3.selectAll(circle).transition()
                .attr({
                    cx: function(d) {
                        return d.x / 2 - 140;
                    },
                    cy: function(d) {
                        return d.y / 2;
                    },
                    r: radius - 10
                })
                .style({
                    opacity: 0.6
                })
                .duration(1000)
                .delay(500);        
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
                circles
                    .each(moveToCenter(e.alpha))
                    .attr({
                    cx: function(d) { return d.x; },
                    cy: function(d) { return d.y; }
                });
            });
            force.start();
            circles.transition().duration(2500)
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
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });
            });
            force.start();
            circles.transition().duration(2500)
                .attr("r", radius)
                .style('opacity', 0.7);
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
                'Infrastructure': 48,
                'Tourism': center.x,
                'Remote Sensing': center.x + 220 
            };
            var topicKeys = d3.keys(topicsX);
            var topicsHead = svg.selectAll('.topics')
            .data(topicKeys);

            topicsHead.enter().append('text')
                .attr('class', 'topics')
                .attr('x', function(d) {
                return topicsX[d];
            })
                .attr('y', center.y / 3)
                .attr('text-anchor', 'middle')
                .text(function(d) {
                return d;
            });
        }

        function hideTopics() {
            svg.selectAll('.topics').remove();
        }

        function removeProjectChart() {
            svg.selectAll('.radialGroup').transition()
                .attr('opacity', 0)
                .duration(800)
                .remove();

            $('#processLabel').remove();
        }

        function singleProjectChart(chartData) {

            var color = d3.scale.ordinal()
            .range(['#30444a', '#77524b', '#375742', '#77624b'])
            .domain(d3.range(0,4)); 
            // TODO:[x] change color palette of graph element

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
            .html( '<h6 class="projectTitle">' + chartData[0].ProjectName + '</h6><hr class="chartDivide">')
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
                    .html('<h6>' + d.data.ProcessTask + '</h6><h3 class="large">' + d.data.DurationPercent + '%</h3><span> of the total project</span>')
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

                var current = this; d3.selectAll('.arcPath').transition()
                    .duration(600)
                    .ease('cubic-in-out')
                    .style({
                    opacity: function() {
                        return (this === current) ? 1 : 1;    
                    }
                });

                d3.select('.projectTitle')          
                    .transition()
                    .duration(200)
                    .delay(400)
                    .ease('cubic-in-out')
                    .style('opacity', function() {
                    return (this === current) ? 0 : 1;    
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

            var legendArr = [];

            for(var i = 0; i < chartData.length; i++) {
                var process = chartData[i].ProcessStage;
                if($.inArray(process, legendArr) == -1) {
                    legendArr.push(process);
                }
            }

            //LEGEND
            var legend = group.selectAll('.legend')
            .data(legendArr)
            .enter().append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var h = legendRect + legendSpace,
                    offset = h * (4 + 2) / 2,
                    x = (center.x / 2) + 40,
                    y = i * offset - 120;
                return 'translate(' + x + ', ' + y + ')';                
            })
            .style('opacity', 0);

            var LegendArc = d3.svg.arc()
            .startAngle(0)
            .endAngle(1.57)
            .innerRadius(14)
            .outerRadius(28);

            legend.append('path')
                .attr('d', LegendArc)
                .style('fill', color)
                .style('stroke', color);

            legend.append('text')
                .attr('x', (legendRect + legendSpace) + 24)
                .attr('y', -8)
                .text(function(d) { return d; });

            legend.transition().ease('cubic-in-out').duration(1000).delay(3200).style('opacity', 1);



        } //END SINGLE PROJECT CHART 

        function toggleView(viewType) {
            if (viewType == 'topicBtn') {
                start();
                displayTopics();
            } else if (viewType == 'chartView') {

            } else {
                start();
                allProjects();
            }
        } // end toggle view function

        toggleView();

    } //end visualise data function
    
});//end document ready