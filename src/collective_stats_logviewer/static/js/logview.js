jQuery(document).ready(function() {
    $(document).on('ready', function(){
        $('dl.url-details dd').hide();
    });
    $(document).on('click', 'dt.url-help', function(){
        $('dl.url-details dd').toggle();
        plot();
    });
	
});


function plot(){
	var options = {
		lines: {
			show: true
		},
		points: {
			show: true
		},
        xaxis: { mode: "time",  
                 timeformat: "%Y-%m-%dT%h%m%s",   
                 }
	};

    var data = [];

    function onDataReceived(series) {
        $.each(series.data, function(key, value){
            time = value.render_time;
            timestamp = value.timestamp;
            data.push([time, timestamp]);
        });
		$.plot("#placeholder1", data, options);
	}

	$.ajax({
		url: '/reponse_time_details?url=/newscenter/inthenewsview',
		type: "GET",
		dataType: "json",
		success: onDataReceived
	});

}
