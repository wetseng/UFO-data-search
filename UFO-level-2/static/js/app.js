// from data.js
var tableData = data;
// Get a reference to the table body
var tbody = d3.select("tbody");
var theader = d3.select("thead");
var filterTableBtn = d3.select('#filter-btn');
var filterDataEntry = d3.select('#input_box');

const empty_array = [];

// -------------------------------------------  MAIN  ------------------------------------------------
// Init table
init();

filterTableBtn.on('click', handleClick);
d3.selectAll('#selTag').on('change', updateSearchPlaceholder);

// -------------------------------------------  FUNCTION  ------------------------------------------------

function init(){
    appendTable(tableData);
}

function handleClick(){
    // Store the entry date into value
    var dateEntry = filterDataEntry.property('value');
    // console.log(dateEntry);

    var placeHolder = d3.select('#selTag').property('value');

    // Filter table data by the date entry
    switch(placeHolder){
        case 'cityTag':
            var filteredData = tableData.filter(UFOData => UFOData.city === dateEntry.toLowerCase());
            break;
        case 'stateTag':
            var filteredData = tableData.filter(UFOData => UFOData.state === dateEntry.toLowerCase());
            break;
        case 'countryTag':
            var filteredData = tableData.filter(UFOData => UFOData.country === dateEntry.toLowerCase());
            break;
        case 'shapeTag':
            var filteredData = tableData.filter(UFOData => UFOData.shape === dateEntry.toLowerCase());
            break;
        default:
            console.log(dateEntry.valueOf());
            var filteredData = tableData.filter(UFOData => UFOData.datetime === dateEntry);
            break;
    }

    // Clean table
    tbody.html('');
    

    // If the data search data is empty
    if(filteredData.length == 0){
        console.log("EMPTY");
        //alert("Cannot find any data! Please check the search criteria again.");
        theader.html('Cannot find any data! Please check the search criteria and entry again.');
    }
    else{
        // Append new table into html
        theader.html('<tr><th class="table-head">Date</th><th class="table-head">City</th><th class="table-head">State</th>\
        <th class="table-head">Country</th><th class="table-head">Shape</th><th class="table-head">Duration</th>\
        <th class="table-head">Comments</th></tr>');
        appendTable(filteredData);
    };

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

function updateSearchPlaceholder(){

    var placeHolder = d3.select('#selTag').property('value');
    console.log(placeHolder);

    switch(placeHolder){
        case 'cityTag':
            d3.select('#labelHeader').text('Enter a City');
            document.getElementById('input_box').placeholder='cleveland';
            break;
        case 'stateTag':
            d3.select('#labelHeader').text('Enter a State');
            document.getElementById('input_box').placeholder='ca';
            break;
        case 'countryTag':
            d3.select('#labelHeader').text('Enter a Country');
            document.getElementById('input_box').placeholder='us';
            break;
        case 'shapeTag':
            d3.select('#labelHeader').text('Enter a Shape');
            document.getElementById('input_box').placeholder='circle';
            break;
        default:
            d3.select('#labelHeader').text('Enter a Date');
            document.getElementById('input_box').placeholder='M/D/YYYY';
            break;
    }
};