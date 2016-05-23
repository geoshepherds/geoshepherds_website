<!DOCTYPE html>
<html>
<head>
<title>
    
</title>
<meta charset="utf-8">
<link rel="icon" href="<?php bloginfo('template_url'); ?>/images/favicon.ico">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/styleeuro.css">
<link href='https://fonts.googleapis.com/css?family=Roboto+Condensed:400,300' rel='stylesheet' type='text/css'>    
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>  
</head>
    
<body>
    <div class="clearfix">
    <div id="banner" class="row">
        <div class="col-xs-1"><img src="<?php bloginfo('template_url'); ?>/images/logo.png" height="80px" width="57.6px">  </div>
        <div class="col-xs-7 col-md-5" id="timeSlider"></div>
        <div class="col-xs-offset-2 col-xs-2 col-sm-offset-0 col-md-6" id="matchCalendar">
        
            <div id="month"><span id="sliderMonth">JUNE</span></div>
            <div id="date"><span id="sliderDate">09</span></div>
        
        </div>
    </div>
    
    <div id="bodyBlock" class="container">
        
        <div class="row">
            <div id="countrySearch" class="col-xs-5 col-sm-4">
                <div class="input-group">
                    <input id="countryInput" class="form-control" type="text" placeholder="Search for a team...">
                    <span class="input-group-btn">
                            <button id="searchButton" class="btn btn-default" type="button"><span class="glyphicon glyphicon-search" aria-hidden="true"></span></button>
                    </span>

                </div> 
            </div>
            
            <div class="col-xs-5 col-sm-4">
                <div id="messageDisplay" class="" role="alert">
                    <span id="searchMessage"></span>
                </div> 
            </div>
            
            <div id="infoModal" class="col-xs-offset-1 col-xs-1 col-sm-offset-3"><button class="btn btn-default" data-toggle="modal" data-target="#myModal"><span class="glyphicon glyphicon-info-sign" aria-hidden="true"></span></button></div>
            
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>An Interactive Guide to EURO 2016</h2>
                        </div>
                        <div class="modal-body">
                            <p><strong>Hover over a city</strong> for a full list of the tournament fixtures at that location. Want to know which team is more likely to win? Click on the team name to find their FIFA ranking, top goalscorer and other useful information.</p>
                            <p><strong>Use the date slider</strong> at the top of the page to discover what games are playing when you're in France.</p>
                            <p><strong>Search for your team</strong> to follow their journey through EURO 2016.</p>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
        <div class="col-sm-7 col-md-6" id="map"></div>
        
        <div class="col-sm-offset-1 col-sm-4 col-md-5 col-md-offset-1" id="info">
            
            <div id="teamStatsDiv" class="hidden">
                
                <div class="row">
                    <div id="teamName" class="col-xs-8"></div>        
                    <div id="exitButton" class="col-xs-offset-1 col-xs-3 col-md-offset-2 col-md-2"></div>
                </div>
                <div id="teamFlag" class="col-xs-3"></div>
                <div id="fifaRank" class="col-xs-offset-3 col-xs-6"></div>
                <hr>
                <div class="row">
                    <div id="topResult" class="col-xs-12"></div>
                </div>
                
                <div class="row">
                    <div id="teamCoach" class="col-xs-6"></div>
                    <div id="topScorer" class="col-xs-6"></div>
                </div>
                <hr>
                <div id="groupName" class="col-xs-12"></div>
                
                <div class="row">
                    <div id="groupLeft" class="col-xs-6"></div>
                    <div id="groupRight" class="col-xs-6"></div>
                </div>
                
                <div class="row">
                    <div id="groupBottomLeft" class="col-xs-6"></div>
                    <div id="groupBottomRight" class="col-xs-6"></div>
                </div>
                
            </div>
            
            <div id="placeInfo">
                <h2 id="city"><span id="cityName"></span></h2>
                <h4 id="stadium"><span id="stadiumName"></span></h4>
                <h6 id="capacity">CAPACITY:<span id="capacityNumber"></span></h6>
                <hr>
                
            
            <div id="matchFixtures">
                <h4 id="euro2016"></h4>
                <h4>GROUP STAGE</h4>
                <div id="groupStage"></div><hr>
                <h4>ROUND OF 16</h4>
                <div id="round16"></div><hr>
                <h4>QUARTER FINALS</h4>
                <div id="qtrFinals"></div><hr>
                <h4>SEMI FINALS</h4>
                <div id="semiFinals"></div><hr>
                <h4>FINAL</h4>
                <div id="final"></div><hr>
            </div>
            </div>
        </div>
    </div>
    </div>
    <footer>
        <div class="row">
        <div class="col-xs-3 copyright">
            <p>&#169; Geoshepherds 2016</p>
        </div>
        <div class="col-xs-offset-3 col-xs-6 mapVis">
            <p>Visualisation by:</p>
            <a href="http://geoshepherds.com" target="_blank"><img src="<?php bloginfo('template_url'); ?>/images/compass_logo_website200.png" width="60px" height="59px"></a>
        </div>
        </div>
    </footer>
 
</body> 

<!--<script src="js/d3.min.js"></script>-->
<script src="<?php bloginfo('template_url'); ?>/js/d3.min.js"></script>
<script src="<?php bloginfo('template_url'); ?>/data/france_outline.js"></script> 
<script src="<?php bloginfo('template_url'); ?>/data/stadiums_euro2016.js"></script>    
<script src="<?php bloginfo('template_url'); ?>/data/euro2016_matches.js"></script>
<script src="<?php bloginfo('template_url'); ?>/data/team_stats.js"></script>    
<script src="<?php bloginfo('template_url'); ?>/js/appeuro.js"></script>    
</html>