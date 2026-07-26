var size = 0;
var placement = 'point';

var style_WB_Block_Boundary_2 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "9.1px \'Arial\', sans-serif";
    var labelFill = "#727073";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = 'left';
    var offsetX = 8;
    var offsetY = 3;
    var overflow = false;
    var repeat = 0;
    var placement = 'point';
    if (feature.get("subdistric") !== null) {
        labelText = String(feature.get("subdistric"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(143,140,122,1.0)', lineDash: [1.52,3.04], lineCap: 'round', lineJoin: 'round', width: 1.52}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth, textAlign, offsetX, offsetY, overflow, repeat)
    })];

    return style;
};
