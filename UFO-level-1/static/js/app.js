// from data.js
var tableData = data;
// Get a reference to the table body
var tbody = d3.select("tbody");
var filterTableBtn = d3.select('#filter-btn');
var filterDataEntry = d3.select('#datetime');


// Init table
init();

filterTableBtn.on('click', handleClick);


function init(){
    appendTable(tableData);
}

function handleClick(){
    // Store the entry date into value
    var dateEntry = filterDataEntry.property('value');
    // console.log(dateEntry);

    // Filter table data by the date entry
    var filteredData = tableData.filter(UFOData => UFOData.datetime === dateEntry);
    // console.log(filteredData);

    // Clean table
    tbody.html('');
    // Append new table into html
    appendTable(filteredData);

}

function appendTable(data){
    // Loop through the data
    data.forEach(UFOData => {
        var row = tbody.append("tr");
        // Loop through each object
        Object.entries(UFOData).forEach(([key, value]) => {
            // console.log(key, value);
            var cell = row.append('td');
            cell.text(value);
        });
    });
};