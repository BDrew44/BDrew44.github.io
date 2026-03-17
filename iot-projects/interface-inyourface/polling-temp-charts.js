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
    var ajaxTempChart = new google.visualization.LineChart(
      $("#ajax-temp-chart")[0],
    );
    var ajaxAirChart = new google.visualization.LineChart(
      $("#ajax-air-chart")[0],
    );
    var wsSimChart = new google.visualization.LineChart($("#ws-sim-chart")[0]);
    var jsonSimData = google.visualization.arrayToDataTable([
      ["Time", "JSON Simulation Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxTempData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Temperature Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxAirData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Air Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsSimData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Simulation Polling Temperature"],
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
    const jsonSim = {
      highest: 0,
      lowest: 100,
      highID: "json-sim-highest",
      lowID: "json-sim-lowest",
    };

    const ajaxTemp = {
      highest: 0,
      lowest: 100,
      highID: "ajax-temp-highest",
      lowID: "ajax-temp-lowest",
    };

    const ajaxAir = {
      highest: 0,
      lowest: 100,
      highID: "ajax-air-highest",
      lowID: "ajax-air-lowest",
    };

    const wsSim = {
      highest: 0,
      lowest: 100,
      highID: "ws-sim-highest",
      lowID: "ws-sim-lowest",
    };

    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.highID}>Highest recorded JSON Simulation value is ${jsonSim.highest}</p>`,
    );
    $("#json-sim-chart-container").append(
      `<p id=${jsonSim.lowID}>Lowest recorded JSON Simulation value is ${jsonSim.lowest}</p>`,
    );

    $("#ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.highID}>Highest recorded AJAX Temperature value is ${ajaxTemp.highest}</p>`,
    );
    $("#ajax-temp-chart-container").append(
      `<p id=${ajaxTemp.lowID}>Lowest recorded AJAX Temperature value is ${ajaxTemp.lowest}</p>`,
    );

    $("#ajax-air-chart-container").append(
      `<p id=${ajaxAir.highID}>Highest recorded AJAX Air value is ${ajaxAir.highest}</p>`,
    );
    $("#ajax-air-chart-container").append(
      `<p id=${ajaxAir.lowID}>Lowest recorded AJAX Air value is ${ajaxAir.lowest}</p>`,
    );

    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.highID}>Highest recorded WebSocket Simulation value is ${wsSim.highest}</p>`,
    );
    $("#ws-sim-chart-container").append(
      `<p id=${wsSim.lowID}>Lowest recorded WebSocket Simulation value is ${wsSim.lowest}</p>`,
    );

    // TODO 4: Update high and low records
    function updateRecords(record, value) {
      if (value > record.highest) {
        record.highest = value;
        $(record.highID).text(`Highest recorded value is ${record.highest}`);
      }
      if (value < record.lowest) {
        record.lowest = value;
        $(record.lowID).text(`Lowest recorded value is ${record.lowest}`);
      }
    }

    // TODO 5: Regular JSON Polling
    function doJSONPoll() {
      $.getJSON("http://localhost:8080/", function (result) {
        addDataPoint(result, jsonSimData, jsonSimChart);
        updateRecords(jsonSim, result.value);
      });
    }

    setInterval(doJSONPoll, 5000);

    // TODO 6: AJAX Polling
    function doAJAXPoll() {
      $.ajax({
        url: "http://localhost:8080/",
        method: "GET",
        dataType: "json",
        success: function (result) {
          addDataPoint(result, ajaxTempData, ajaxTempChart);
          updateRecords(ajaxTemp, result.value);
        },
      });
    }

    setInterval(doAJAXPoll, 10000);

    // Polling for AJAX Air
    function doAJAXAirPoll() {
      $.ajax({
        url: "http://localhost:8080/",
        method: "GET",
        dataType: "json",
        success: function (result) {
          addDataPoint(result, ajaxAirData, ajaxAirChart);
          updateRecords(ajaxAir, result.value);
        },
      });
    }

    setInterval(doAJAXAirPoll, 7000);

    // TODO 7: WebSocket Polling
    var socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      addDataPoint(result, wsSimData, wsSimChart);
      updateRecords(wsSim, result.value);
    };

    socket.onerror = function (error) {
      console.error("WebSocket error:", error);
    };

    // Do not work below this line
    function getTime() {
      var d = new Date();
      return d.toLocaleTimeString();
    }
  }
});
