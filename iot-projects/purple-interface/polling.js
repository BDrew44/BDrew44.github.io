///////////////////////////////////////////////////////////
////////////////// JAVASCRIPT BEGINS HERE /////////////////
///////////////////////////////////////////////////////////
$(document).ready(function () {
  // Chart initialization code
  var maxDataPoints = 10;

  // Setup to use charts
  google.charts.load("current", { packages: ["corechart"] });
  google.setOnLoadCallback(drawVisualization);
  function drawVisualization() {
    /////////////////////////////////////////////////
    // CHART PREP SECTION: DO NOT TOUCH /////////////
    /////////////////////////////////////////////////
    var jsonSimChart = new google.visualization.LineChart(
      $("#json-sim-chart")[0],
    );
    var wsSimChart = new google.visualization.LineChart($("#ws-sim-chart")[0]);
    var ajaxTempChart = new google.visualization.LineChart(
      $("#ajax-temp-chart")[0],
    );
    var ajaxAirChart = new google.visualization.LineChart(
      $("#ajax-air-chart")[0],
    );
    var jsonSimData = google.visualization.arrayToDataTable([
      ["Time", "JSON Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsSimData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxTempData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxAirData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Purple Air Polling Quality"],
      [getTime(), 0],
    ]);

    var options = {
      title: "Temperature",
      curveType: "function",
      animation: {
        duration: 1000,
        easing: "in",
      },
      legend: { position: "bottom" },
    };
    /////////////////////////////////////////////////
    // END CHART PREP SECTION: //////////////////////
    /////////////////////////////////////////////////

    // Code to add a data point
    function addDataPoint(dataPoint, dataSet, chart) {
      if (dataSet.getNumberOfRows() > maxDataPoints) {
        dataSet.removeRow(0);
      }
      dataSet.addRow([getTime(), dataPoint.value]);
      chart.draw(dataSet, options);
    }

    // TODO 3: Initialize high and low records

    // TODO 4: Update high and low records

    // TODO 5: Simulation JSON Polling

    // TODO 7: WebSocket Polling

    // TODO 8: Purple Air JSON Polling
    
    // TODO 9: AJAX Polling

    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
