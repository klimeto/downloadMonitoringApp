var catalogEndpoint = "https://cidportal.jrc.ec.europa.eu/services/catalogue/dataset?count=1&";
var scihubApi = "https://scihub.copernicus.eu/dhus/";
var cophubApi = "https://cophub.copernicus.eu/dhus/";
var devSeedApi = "https://api.developmentseed.org/satellites/";
var datacatApi = "https://cidportal.jrc.ec.europa.eu/services/catalogue";
var endpoints = ['Scihub','Cophub','DevSeed','Jeodpp'];
var urlParams = new URLSearchParams(window.location.search);
var day = '';

if(urlParams.get('day')){
    day = urlParams.get('day')
    $('#datePicker').val(day);
}
else{
    var d = new Date();
    var n = d.toISOString();
    $("span:contains('Last update: ')").text('Last update: ' + d);
    day = n.split("T")[0]
}

$(document).ready(function() {
    function loadData() {
        var dayString = new Date(day).toDateString();
        console.log(day);
        var m = day.slice(0,7);
        var y = m.slice(0,4);
        // DAILY DATA
        $('#downMDBox h3').text("Metadata downloaded in day: " + dayString.split(" ")[0]);
        var mdTotal = parseInt($('#downMDBox p').text());
        $('#downMDBox p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + day + '%', function (data) {
            console.log(data);
            var total = data[0].results.total;
            if(mdTotal < total){
                $("#downMDBox span").text('Last update: ' + new Date());
            }
            $('#downMDBox p').attr("align","center");
            $('#downMDBox p').text(total);
            $('#downMDBox p').css("font-size", "50px");
        })
        $('#downDataBox h3').text("Data downloaded in day: " + dayString.split(" ")[0]);
        var dataTotal = parseInt($('#downDataBox p').text());
        $('#downDataBox p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'updated=' + day + '%&data=true&stats=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            if(dataTotal < total){
                $("#downDataBox span").text('Last update: ' + new Date());
            }
            $('#downDataBox p').attr("align","center");
            $('#downDataBox p').text(total);
            $('#downDataBox p').css("font-size", "50px");
        })
        $('#downQuicklookBox h3').text("Quicklooks downloaded in day: " + dayString.split(" ")[0]);
        var quickTotal = parseInt($('#downQuicklookBox p').text());
        $('#downQuicklookBox p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + day + '%&quicklooks=true&data=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            if(quickTotal < total){
                $("#downQuicklookBox span").text('Last update: ' + new Date());
            }
            $('#downQuicklookBox p').attr("align","center");
            $('#downQuicklookBox p').text(total);
            $('#downQuicklookBox p').css("font-size", "50px");
        })
        // MONTHLY DATA
        $('#downMDBoxMonth h3').text("Metadata downloaded in month: " + dayString.split(" ")[1]);
        $('#downMDBoxMonth p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + m + '%', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downMDBoxMonth p').attr("align","center");
            $('#downMDBoxMonth p').text(total);
            $('#downMDBoxMonth p').css("font-size", "50px");
            $("#downMDBoxMonth span:contains('Last update: ')").text('Last update: ' + new Date());
        })
        $('#downDataBoxMonth h3').text("Data downloaded in month: " + dayString.split(" ")[1]);
        $('#downDataBoxMonth p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'updated=' + m + '%&data=true&stats=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downDataBoxMonth p').attr("align","center");
            $('#downDataBoxMonth p').text(total);
            $('#downDataBoxMonth p').css("font-size", "50px");
            $("#downDataBoxMonth span:contains('Last update: ')").text('Last update: ' + new Date());
        })
        $('#downQuicklookBoxMonth h3').text("Quicklooks downloaded in month: " + dayString.split(" ")[1]);
        $('#downQuicklookBoxMonth p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + m + '%&quicklooks=true&data=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downQuicklookBoxMonth p').attr("align","center");
            $('#downQuicklookBoxMonth p').text(total);
            $('#downQuicklookBoxMonth p').css("font-size", "50px");
            $("#downQuicklookBoxMonth span:contains('Last update: ')").text('Last update: ' + new Date());
        })
        // YEARLY DATA
        $('#downMDBoxYear h3').text("Metadata downloaded in year: " + dayString.split(" ")[3]);
        $('#downMDBoxYear p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + y + '%', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downMDBoxYear p').attr("align","center");
            $('#downMDBoxYear p').text(total);
            $('#downMDBoxYear p').css("font-size", "50px");
            $("#downMDBoxYear span:contains('Last update: ')").text('Last update: ' + new Date());
        })
        $('#downDataBoxYear h3').text("Data downloaded in year: " + dayString.split(" ")[3]);
        $('#downDataBoxYear p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'updated=' + y + '%&data=true&stats=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downDataBoxYear p').attr("align","center");
            $('#downDataBoxYear p').text(total);
            $('#downDataBoxYear p').css("font-size", "50px");
            $("#downDataBoxYear span:contains('Last update: ')").text('Last update: ' + new Date());
        })
        $('#downQuicklookBoxYear h3').text("Quicklooks downloaded in year: " + dayString.split(" ")[3]);
        $('#downQuicklookBoxYear p').text("Loading ...");
        $.getJSON(catalogEndpoint + 'inserted=' + y + '%&quicklooks=true&data=false', function (data) {
            console.log(data);
            var total = data[0].results.total;
            $('#downQuicklookBoxYear p').attr("align","center");
            $('#downQuicklookBoxYear p').text(total);
            $('#downQuicklookBoxYear p').css("font-size", "50px");
            $("#downQuicklookBoxYear span:contains('Last update: ')").text('Last update: ' + new Date());
        })
    }
    setInterval(loadData, 30000);

    function checkAvailability(endpoint) {
        var url = '';
        if (endpoint == 'Scihub') {
            url = scihubApi;
        }
        if (endpoint == 'Cophub') {
            url = cophubApi;
        }
        if (endpoint == 'DevSeed') {
            url = devSeedApi;
        }
        if(endpoint == 'Jeodpp'){
            url = datacatApi;
        }
        console.log("checkAvailability" + endpoint);
        $.get(url, function () {
            $('#'+endpoint).addClass("greenBox");
            $('#'+endpoint).html("<a href='"+url+"' target='_blank'>"+endpoint + " online");
            $('#'+endpoint).css("font-size", "20px");
            console.log("SUCCESS");
        })
            .fail(function () {
                $('#'+endpoint).addClass("redBox");
                $('#'+endpoint).text(endpoint + " offline");
                $('#'+endpoint).css("font-size", "20px");
                console.log("FAILURE");
            })
            .always(function () {
                console.log("finished");
            });
    }
    function endpointAvailable(){
        $.each(endpoints, function(k,v){
            checkAvailability(v);
        })
    }
    setInterval(endpointAvailable,30000);

    $('#datePicker').val(day);
    $('#datePicker').change(function(){
        console.log(this.value);
        day = this.value;
        loadData(day);
        makeplot("chartMeta");
    })
    function makeplot(id) {
        if (id == 'chartFull'){
            Plotly.d3.csv("http://139.191.71.14/data/logs/md_lib_s2_down_full_product_logs.csv", function(data){ processData(data,id) } );
        }
        else if (id == 'chartMeta'){
            month = day.split('-')
            //logName = 'md_lib_s2_down_meta_quicklook_logs_'+month[0]+month[1]+'.csv';
            //logName = 'md_lib_s2_down_meta_quicklook_20180306.csv'
            logName = 'md_lib_s2_down_meta_quicklook.csv'
            Plotly.d3.csv("http://139.191.71.14/data/logs/"+logName, function(data){ processData(data,id) } );
        }
        else if (id == 'chartFullZip'){
            Plotly.d3.csv("http://139.191.71.14/data/logs/md_lib_s2_down_full_product_zip_logs.csv", function(data){ processData(data,id) } );
        }
    };

    function processData(allRows,id) {
        allRows.sort(function(a, b) {
            var dateA = new Date(a.timestamp), dateB = new Date(b.timestamp);
            return dateA - dateB;
        });
        console.log("Number of records in csv file: ", allRows.length);
        var x = [], y = [], standard_deviation = [];
        console.log("DATA OBEJCT: ", allRows);
        for (var i=0; i<allRows.length; i++) {
            //row = allRows.sort()[i];
            row = allRows[i];
            //console.log("ROW:",[i], " IS: ", row);
            x.push( row['timestamp'] );
            y.push( row['respTime'] );
        }
        lastTimestamp = ("Last Timestamp is: " + x[(allRows.length)-1]);
        makePlotly( x, y, standard_deviation, id , lastTimestamp);
    }

    function makePlotly( x, y, standard_deviation, id, last ){
        var plotDiv = document.getElementById("plot");
        var traces = [{
            x: x,
            y: y
        }];
        if(id == 'chartFull'){
            $('#chartFull p').remove();
            Plotly.newPlot(id, traces,
                {title: 'Response times for full product download scripts'});
            $('#chartFull span').text(last);

        }
        else if(id == 'chartMeta'){
            $('#chartMeta p').remove();
            var layout = {
                title: 'Response times for metadata + quicklooks download scripts',
                autosize: true,
                //height: 400,
                //width: 600,
                xaxis: {
                    title: 'DateTime',
                    showgrid: true,
                    zeroline: true,
                    showticklabels: true,
                    tickangle: 45,
                    tickfont: {
                        family: 'Old Standard TT, serif',
                        size: 9,
                        color: 'black'
                    },
                },
                yaxis: {
                    title: 'Response time [s]',
                    showline: false
                },
                height:600
            };
            Plotly.newPlot(id, traces,layout);
            $('#chartMeta span').text(last);
        }
        else if(id == 'chartFullZip'){
            $('#chartFullZip p').remove();
            Plotly.newPlot(id, traces,
                {title: 'Response times for full product download scripts - package download time'});
            $('#chartFullZip span').text(last);
        }
    };
    makeplot("chartMeta");
    makeplot("chartFull");
    makeplot("chartFullZip");


})
