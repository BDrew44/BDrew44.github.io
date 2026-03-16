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
    var jsonChart = new google.visualization.LineChart($("#json-chart")[0]);
    var ajaxChart = new google.visualization.LineChart($("#ajax-chart")[0]);
    var wsChart = new google.visualization.LineChart($("#ws-chart")[0]);
    var jsonData = google.visualization.arrayToDataTable([
      ["Time", "JSON Polling Temperature"],
      [getTime(), 0],
    ]);
    var ajaxData = google.visualization.arrayToDataTable([
      ["Time", "AJAX Polling Temperature"],
      [getTime(), 0],
    ]);
    var wsData = google.visualization.arrayToDataTable([
      ["Time", "WebSocket Polling Temperature"],
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
    const json = {
      highest: 0,
      lowest: 100,
      highID: "#json-highest",
      lowID: "#json-lowest",
    };

    const ajax = {
      highest: 0,
      lowest: 100,
      highID: "#ajax-highest",
      lowID: "#ajax-lowest",
    };

    const ws = {
      highest: 0,
      lowest: 100,
      highID: "#ws-highest",
      lowID: "#ws-lowest",
    };

    $("#json-chart-container").append(
      `<p id=${json.highID.slice(1)}>Highest recorded JSON value is ${json.highest}</p>`,
    );
    $("#json-chart-container").append(
      `<p id=${json.lowID.slice(1)}>Lowest recorded JSON value is ${json.lowest}</p>`,
    );

    $("#ajax-chart-container").append(
      `<p id=${ajax.highID.slice(1)}>Highest recorded AJAX value is ${ajax.highest}</p>`,
    );
    $("#ajax-chart-container").append(
      `<p id=${ajax.lowID.slice(1)}>Lowest recorded AJAX value is ${ajax.lowest}</p>`,
    );

    $("#ws-chart-container").append(
      `<p id=${ws.highID.slice(1)}>Highest recorded WebSocket value is ${ws.highest}</p>`,
    );
    $("#ws-chart-container").append(
      `<p id=${ws.lowID.slice(1)}>Lowest recorded WebSocket value is ${ws.lowest}</p>`,
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
        addDataPoint(result, jsonData, jsonChart);
        updateRecords(json, result.value);
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
          addDataPoint(result, ajaxData, ajaxChart);
          updateRecords(ajax, result.value);
        },
      });
    }

    setInterval(doAJAXPoll, 10000);

    // TODO 7: WebSocket Polling
    var socket = new WebSocket("ws://localhost:8080");

    socket.onmessage = function (event) {
      var result = JSON.parse(event.data);
      addDataPoint(result, wsData, wsChart);
      updateRecords(ws, result.value);
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
