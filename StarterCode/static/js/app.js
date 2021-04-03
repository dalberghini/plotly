
function handle_list() {
    d3.json("../samples.json").then(function(data) {
        var dropDownMenu = d3.select("#selDataset");
        data.names.forEach((name) => {
            dropDownMenu.append("option").text(name).property("value", name);
        });
    });
}
handle_list();
function buildPlot(sample_id) {
    d3.json("../samples.json").then(function(data){
        var samples_list = data.samples.filter(x=> x.id == sample_id);
        // console.log(samples_list);
        var id_number = samples_list[0].id.slice(0,10);
        var sample_values = samples_list[0].sample_values.slice(0,10);
        var otu_ids = samples_list[0].otu_ids.slice(0,10);
        var otu_labels = samples_list[0].otu_labels.slice(0,10);
        // console.log(id_number);
        // console.log(sample_values);
        // console.log(otu_ids);
        //  console.log(otu_labels);
        var trace1 = [{
            x : sample_values,
            y: otu_ids,
            text : otu_labels,
            type: "bar",
            orientation : "h" }];
        var layout1 = {
            title: "Something of a title",
            xaxis: {
                title : "Concentration of Something"
            },
            yaxis: {
                title: "ID Numbers of Bacteria"
            }
        };
        Plotly.newPlot("bar", trace1, layout1);
        var trace2 = [{
            type : "scatter", 
            x : otu_ids,
            y : sample_values,
            marker : {
                size : sample_values,
                color: otu_ids
            },
            text : otu_labels
        }];
        var layout2 = {
            title : "Bubbles",
        };
        Plotly.newPlot("bubble", trace2, layout2);
    });
}
buildPlot(940);