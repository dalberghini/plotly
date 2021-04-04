handle_list();
d3.select("body").on("change", handle_list);
function handle_list() {
    d3.json("https://raw.githubusercontent.com/dalberghini/plotly/main/samples.json").then(function(data) { //"../samples.json"
        var dropDownMenu = d3.select("#selDataset");
        data.names.forEach((name) => {
            dropDownMenu.append("option").text(name).property("value", name);
        });
    });
}
handle_list();
function buildPlot(sample_id) {
    d3.json("https://raw.githubusercontent.com/dalberghini/plotly/main/samples.json").then(function(data){ //"../samples.json"
        var samples_list = data.samples.filter(x=> x.id == sample_id);
        // console.log(samples_list);
        var sample_values = samples_list[0].sample_values;
        var sliced_sample_values = samples_list[0].sample_values.slice(0,10).reverse();
        var otu_ids = samples_list[0].otu_ids;
        var sliced_otu_ids = samples_list[0].otu_ids.slice(0,10).reverse();
        var otu_labels = samples_list[0].otu_labels;
        var sliced_otu_labels = samples_list[0].otu_labels.slice(0,10).reverse();
        // console.log(id_number);
        // console.log(sample_values);
        // console.log(otu_ids);
        //  console.log(otu_labels)
        var labels = sliced_otu_ids.map(x=> `OTU ${x}`)
        var trace1 = [{
            x : sliced_sample_values,
            y: labels,
            text : sliced_otu_labels,
            type: "bar",
            orientation : "h" }];
        var layout1 = {
            title: `Top ${sliced_sample_values.length} Bacteria Found in Bellybutton of Patient #${sample_id}.`,
            xaxis: {
                title : "Sample Values"
            },
            yaxis: {
                title: "Bacteria ID"
            }
        };
        Plotly.newPlot("bar", trace1, layout1);
        var trace2 = [{
            type : "scatter", 
            x : otu_ids,
            y : sample_values,
            mode: "markers",
            marker : {
                size : sample_values,
                color: otu_ids
            },
            text : otu_labels
        }];
        var layout2 = {
            title : `Top ${sample_values.length} Bacteria Found in Bellybutton of Patient #${sample_id}.`,
            xaxis : {
                title: "Bacteria ID"
            },
            yaxis : {
                title: "Sample Values"
            }
        };
        Plotly.newPlot("bubble", trace2, layout2);
        var metadata = data.metadata.filter(x=> x.id == sample_id)[0];
        var div = d3.select("#sample-metadata");
        div.append("tbody");
        var tbody = d3.select("tbody");
        tbody.html("");
        Object.entries(metadata).forEach(([key, value])=> {
            var row = tbody.append("tr");
            var cell = row.append("td");
            cell.text(`${key} : ${value}`);
        });
    });
}
buildPlot(940);