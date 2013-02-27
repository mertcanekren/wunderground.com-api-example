$("document").ready(function(){
   getWeather('/q/zmw:89101.1.99999');
});

function getWeather(l){
	$.ajax({
	  url : "http://api.wunderground.com/api/<apikey>/conditions"+l+".json",
	  dataType : "jsonp",
	  success : function(parsed_json){
	  	  var lat = parsed_json['current_observation']['display_location']['latitude'];
	  	  var lng = parsed_json['current_observation']['display_location']['longitude'];
		  var location = parsed_json['current_observation']['display_location']['full'];
		  var temp_c = parsed_json['current_observation']['temp_c'];
		  var icon  = parsed_json['current_observation']['icon_url'];
		  var weathertitle = parsed_json['current_observation']['weather'];
		  initialize(lat,lng,13,location);
		  $('#cityname').html(location);
		  $('#temperature').html(temp_c+'°');
		  $('#icon').html('<img src="'+icon+'">');
		  $('#weather_title').html(weathertitle);
	  }
	});
}

function getLocation(){
  	$.ajax({
	  url : "http://api.wunderground.com/api/<apikey>/geolookup/q/autoip.json",
	  dataType : "jsonp",
	  success : function(parsed_json){
		  getWeather(parsed_json['location']['l']);
	  }
	});  	
}

function initialize(lat,lng,zoom,address){
	var mapOptions = {            
	  center: new google.maps.LatLng(lat,lng),
	  zoom: zoom,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	geocoder = new google.maps.Geocoder();
	var map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
	var pos=new google.maps.LatLng(lat,lng);
	var icon = new google.maps.MarkerImage("img/map.png");
	marker=new google.maps.Marker({
	    position:pos,
	    map: map,
	    icon:icon	         
	});      
	var infowindow = new google.maps.InfoWindow({ content:address });
	google.maps.event.addListener(marker, "click", function(e) {
		infowindow.open(map, marker);
	});
}