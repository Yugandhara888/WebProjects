'use strict'

$(document).ready(function() {
    $("#phyMarks, #chemMarks, #mathmarks").on("input", function() {
        const input = $(this).val();
        const regex = /^\d*\.?\d*$/;

        // If the input does not match, revert to the last valid value
        if (!regex.test(input)) {
            $(this).val(input.slice(0, -1)); // Remove the last character
        }
    });

    $("#phyMarks, #chemMarks, #mathmarks").on("paste", function(e) {
        e.preventDefault();
    });

    $("#phyMarks, #chemMarks, #mathmarks").on("drop", function(e) {
        e.preventDefault();

    });

    $("button").click(function() {
        // alert("Clicked")

        var data1 = parseInt($("#phyMarks").val());
        var data2 = parseInt($("#chemMarks").val());
        var data3 = parseInt($("#mathmarks").val());

        if (isNaN(data1) || isNaN(data2) || isNaN(data3)) {
            $("#p").html("Please, Enter Value!!");
        } else if (data1 < 0 || data2 < 0 || data3 < 0) {
            $("#p").html("Values should be positive!");
        } else {
            var total = data1 + data2 + data3;
            var percentage = Math.round((total / 300) * 100);

            document.querySelector("#total-marks").innerHTML = total;
            document.querySelector("#p2").innerHTML = percentage;
            // console.log(total);
            // console.log(percentage);

            if (percentage > 75) {
                $("#p3").html("First class with distiction");
            } else if (percentage > 60) {
                $("#p3").html("First class");
            } else if (percentage > 50) {
                $("#p3").html("Second class");
            } else {
                $("#p").html("Fail");
            }


            if (percentage > 60) {
                Highcharts.chart("container", {
                    chart: {
                        type: "pie",
                    },
                    title: {
                        text: "PCM Pie Chart",
                    },
                    tooltip: {
                        valueSuffix: "%",
                    },

                    plotOptions: {
                        series: {
                            allowPointSelect: true,
                            cursor: "pointer",
                            dataLabels: [{
                                    enabled: true,
                                    distance: 20,
                                },
                                {
                                    enabled: true,
                                    distance: -40,
                                    format: "{point.percentage:.1f}%",
                                    style: {
                                        fontSize: "1.2em",
                                        textOutline: "none",
                                        opacity: 0.7,
                                    },
                                    filter: {
                                        operator: ">",
                                        property: "percentage",
                                        value: 10,
                                    },
                                },
                            ],
                        },
                    },
                    series: [{
                        name: "Marks",
                        colorByPoint: true,
                        data: [{
                                name: "Mathematics",
                                y: data3,
                            },
                            {
                                name: "Physics",
                                sliced: true,
                                selected: true,
                                y: data1,
                            },
                            {
                                name: "Chemistry",
                                sliced: true,
                                selected: true,
                                y: data2,
                            },
                        ],
                    }, ],
                });
            }



        }

    })


})