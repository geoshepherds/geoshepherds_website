<!DOCTYPE html>
<html>
<head>
<title>
    Svenska Eko-Kartan
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

<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/leaflet.css" />
<link href='https://fonts.googleapis.com/css?family=Oleo+Script' rel='stylesheet' type='text/css'>
<link href='https://fonts.googleapis.com/css?family=Lato|Open+Sans:400,300' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/css/style.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
<script>window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));</script>

</head>
    
<body>
    
    <div class="row" id="topBanner">
        
        <div class="col-md-9 title">
    
            <h2>Svenska Eko-Kartan</h2>
            <h4>Följ ekotrenden i Sverige och upptäck var flest svenskar väljer ekologisk mat.</h4>
            <h4>Klicka på kartan för att se varje läns utveckling och få reda på hur din kommun ligger till.</h4>
    
        </div>
        
        <div class="col-md-3 infoPopup">
            
            
                
            <div id="infoBubble" class="hidden">
            
                <p>Kartan och graferna visar ekologiska inköp, i procent av totala livsmedelsinköp, i Sveriges kommuner och landsting.</p>
                <p>Källa: EkoMatCentrum - Ekologiskt i offentlig storhushåll 2014 Rapport 2015</p>
            
            </div>
            
            <div>
                <ul class="topIcons">
                
                    <li id="i">i</li>
                    <li id="twitter">
                        <a href="https://twitter.com/share"
                           target="_blank"
                          data-url="http://geoshepherds.com/ekokartan/"
                          data-via="geoshepherds"
                          data-hashtags="#ekokartan"
                          data-text="Follow the eco-trend in Sweden"><img src="<?php bloginfo('template_url'); ?>/data/TwitterLogo_white.png" width="40px" height="40px">
                        </a>
                    </li>
                    <li id="facebook">
                        
                        <a href="https://www.facebook.com/sharer/sharer.php?u=http://geoshepherds.com/ekokartan/" target="_blank"><img src="<?php bloginfo('template_url'); ?>/data/facebook55.png" width="30px" height="30px"  alt="fb-share icon">
                        </a>
                    
                    </li>
                    
                </ul>
                
            </div>
        
        </div>
        
        
    </div>
    
    <div class="row">
    
        <div class="col-md-6" id="map">
        
        
            
        </div>
        
        <div class="col-md-6" id="sidebar">
            
            <div class="col-xs-12">
        
                <div class="col-xs-6" id="lanName">

                    <h4 class="sweTotal">HELA SVERIGE</h4>

                    <h4 class="name"></h4>
                    
                </div>
                
                                
                <div class="col-xs-2" id="resultat">
                    
                    <h4 id="swePercent"></h4>
                    
                    <h4 id="lanPercent"></h4>

                </div>
                
                <div class="col-xs-3 col-xs-offset-1" id="resultat">
                    
                    <h4 id="sweYear"></h4>

                </div>

                <div class="" id="lineChart">


                </div>
                
            </div>
            
            <div class="col-xs-12">
            
                <div id="kommun">

                    <h4>KOMMUN STATISTIK:</h4>

                </div>

                <div id="toolTip" class="hidden">

                    <p><span id="value">100</span></p>

                </div>

                <div class="" id="barChart">


                </div>
                
            </div>
            
        </div>
    
    </div>
    
    <footer>
    
        <div class="col-sm-3 copyright">
        
            <p>&#169; Geoshepherds 2016</p>
            
        </div>
        
        <div class="col-sm-offset-3 col-sm-6 mapVis">
        
            <p>Map visualisation by:</p>
            <a href="http://geoshepherds.com" target="_blank"><img src="<?php bloginfo('template_url'); ?>/data/compass_logo_website200.png" width="90px" height="89px"></a>
            
        </div>
    
    </footer>

<script src="<?php bloginfo('template_url'); ?>/js/d3.min.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/leaflet.js"></script>
<script src="<?php bloginfo('template_url'); ?>/data/swe_ecodata.js"></script>
<script src="<?php bloginfo('template_url'); ?>/data/kommun_data.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/app.js"></script> 
</body> 

</html>