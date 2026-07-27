ol.proj.proj4.register(proj4);
//ol.proj.get("EPSG:7755").setExtent([4583762.691646, 3758894.191833, 4965186.170774, 4372358.527626]);
var wms_layers = [];


        var lyr_WorldImagery_0 = new ol.layer.Tile({
            'title': 'World Imagery',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
            })
        });

        var lyr_OpenStreetMap_1 = new ol.layer.Tile({
            'title': 'Open Street Map',
            'type':'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_WB_Block_Boundary_2 = new ol.format.GeoJSON();
var features_WB_Block_Boundary_2 = format_WB_Block_Boundary_2.readFeatures(json_WB_Block_Boundary_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:7755'});
var jsonSource_WB_Block_Boundary_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_WB_Block_Boundary_2.addFeatures(features_WB_Block_Boundary_2);
var lyr_WB_Block_Boundary_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_WB_Block_Boundary_2,
maxResolution:140.0223307613098,
 
                style: style_WB_Block_Boundary_2,
                popuplayertitle: 'WB_Block_Boundary',
                interactive: true,
                title: '<img src="styles/legend/WB_Block_Boundary_2.png" /> WB_Block_Boundary'
            });
var format_WB_District_Boundary_3 = new ol.format.GeoJSON();
var features_WB_District_Boundary_3 = format_WB_District_Boundary_3.readFeatures(json_WB_District_Boundary_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:7755'});
var jsonSource_WB_District_Boundary_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_WB_District_Boundary_3.addFeatures(features_WB_District_Boundary_3);
var lyr_WB_District_Boundary_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_WB_District_Boundary_3,
maxResolution:28004.466152261964,
 minResolution:140.0223307613098,

                style: style_WB_District_Boundary_3,
                popuplayertitle: 'WB_District_Boundary',
                interactive: true,
                title: '<img src="styles/legend/WB_District_Boundary_3.png" /> WB_District_Boundary'
            });
var format_Rural_other_than_sc_4 = new ol.format.GeoJSON();
var features_Rural_other_than_sc_4 = format_Rural_other_than_sc_4.readFeatures(json_Rural_other_than_sc_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:7755'});
var jsonSource_Rural_other_than_sc_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Rural_other_than_sc_4.addFeatures(features_Rural_other_than_sc_4);
var lyr_Rural_other_than_sc_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Rural_other_than_sc_4, 
                style: style_Rural_other_than_sc_4,
                popuplayertitle: 'Rural_other_than_sc',
                interactive: true,
    title: 'Rural_other_than_sc<br />\
    <img src="styles/legend/Rural_other_than_sc_4_0.png" /> (CHC)<br />\
    <img src="styles/legend/Rural_other_than_sc_4_1.png" /> BPHC<br />\
    <img src="styles/legend/Rural_other_than_sc_4_2.png" /> DH<br />\
    <img src="styles/legend/Rural_other_than_sc_4_3.png" /> Hospital<br />\
    <img src="styles/legend/Rural_other_than_sc_4_4.png" /> MCH<br />\
    <img src="styles/legend/Rural_other_than_sc_4_5.png" /> RH<br />\
    <img src="styles/legend/Rural_other_than_sc_4_6.png" /> SDH<br />\
    <img src="styles/legend/Rural_other_than_sc_4_7.png" /> SGH<br />\
    <img src="styles/legend/Rural_other_than_sc_4_8.png" /> <br />' });
var format_Rural_SC_5 = new ol.format.GeoJSON();
var features_Rural_SC_5 = format_Rural_SC_5.readFeatures(json_Rural_SC_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:7755'});
var jsonSource_Rural_SC_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Rural_SC_5.addFeatures(features_Rural_SC_5);
var lyr_Rural_SC_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Rural_SC_5, 
                style: style_Rural_SC_5,
                popuplayertitle: 'Rural_SC',
                interactive: true,
    title: 'Rural_SC<br />\
    <img src="styles/legend/Rural_SC_5_0.png" /> Hospital<br />\
    <img src="styles/legend/Rural_SC_5_1.png" /> Others<br />\
    <img src="styles/legend/Rural_SC_5_2.png" /> State Government<br />\
    <img src="styles/legend/Rural_SC_5_3.png" /> <br />' });
var format_Urban_6 = new ol.format.GeoJSON();
var features_Urban_6 = format_Urban_6.readFeatures(json_Urban_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:7755'});
var jsonSource_Urban_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Urban_6.addFeatures(features_Urban_6);
var lyr_Urban_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Urban_6, 
                style: style_Urban_6,
                popuplayertitle: 'Urban',
                interactive: true,
    title: 'Urban<br />\
    <img src="styles/legend/Urban_6_0.png" /> U-CHC<br />\
    <img src="styles/legend/Urban_6_1.png" /> U-PHC<br />\
    <img src="styles/legend/Urban_6_2.png" /> U-SHC<br />\
    <img src="styles/legend/Urban_6_3.png" /> <br />' });

lyr_WorldImagery_0.setVisible(false);lyr_OpenStreetMap_1.setVisible(true);lyr_WB_Block_Boundary_2.setVisible(true);lyr_WB_District_Boundary_3.setVisible(true);lyr_Rural_other_than_sc_4.setVisible(true);lyr_Rural_SC_5.setVisible(true);lyr_Urban_6.setVisible(true);
var layersList = [lyr_WorldImagery_0,lyr_OpenStreetMap_1,lyr_WB_Block_Boundary_2,lyr_WB_District_Boundary_3,lyr_Rural_other_than_sc_4,lyr_Rural_SC_5,lyr_Urban_6];
lyr_WB_Block_Boundary_2.set('fieldAliases', {'id': 'id', 'objectid': 'objectid', 'subdistric': 'subdistric', 'sdcode': 'sdcode', 'district': 'district', 'dtcode': 'dtcode', 'state': 'state', 'stcode': 'stcode', 'total_hous': 'total_hous', 'total_popu': 'total_popu', 'avg_hh': 'avg_hh', 'total_geog': 'total_geog', 'forest_are': 'forest_are', 'area_under': 'area_under', 'barren_un_': 'barren_un_', 'permanent_': 'permanent_', 'land_under': 'land_under', 'culturable': 'culturable', 'fallows_la': 'fallows_la', 'current_fa': 'current_fa', 'net_area_s': 'net_area_s', 'total_unir': 'total_unir', 'area_irrig': 'area_irrig', 'canals_are': 'canals_are', 'wells_tube': 'wells_tube', 'tanks_lake': 'tanks_lake', 'waterfall_': 'waterfall_', 'shape_leng': 'shape_leng', 'shape_area': 'shape_area', 'ds_name': 'ds_name', 'src_agency': 'src_agency', 'State_Name': 'State_Name', });
lyr_WB_District_Boundary_3.set('fieldAliases', {'district': 'district', });
lyr_Rural_other_than_sc_4.set('fieldAliases', {'Sl_No_': 'Sl_No_', 'District_N': 'District_N', 'Health_Fac': 'Health_Fac', 'Latitude': 'Latitude', 'Longitude': 'Longitude', 'Category': 'Category', });
lyr_Rural_SC_5.set('fieldAliases', {'Facility_N': 'Facility_N', 'NIN_2_HFI': 'NIN_2_HFI', 'State': 'State', 'District': 'District', 'Taluka': 'Taluka', 'Block': 'Block', 'Facility_T': 'Facility_T', 'Latitude': 'Latitude', 'longitude': 'longitude', 'Region_Ind': 'Region_Ind', 'Operationa': 'Operationa', 'Ownership': 'Ownership', });
lyr_Urban_6.set('fieldAliases', {'SL_No': 'SL_No', 'District_n': 'District_n', 'ULB_Name': 'ULB_Name', 'Facility_N': 'Facility_N', 'NIN_ID': 'NIN_ID', 'Latitude': 'Latitude', 'longitude': 'longitude', 'Type_of_Bu': 'Type_of_Bu', 'Functional': 'Functional', 'Remarks': 'Remarks', 'Facility_T': 'Facility_T', });
lyr_WB_Block_Boundary_2.set('fieldImages', {'id': 'TextEdit', 'objectid': 'TextEdit', 'subdistric': 'TextEdit', 'sdcode': 'TextEdit', 'district': 'TextEdit', 'dtcode': 'TextEdit', 'state': 'TextEdit', 'stcode': 'TextEdit', 'total_hous': 'TextEdit', 'total_popu': 'TextEdit', 'avg_hh': 'TextEdit', 'total_geog': 'TextEdit', 'forest_are': 'TextEdit', 'area_under': 'TextEdit', 'barren_un_': 'TextEdit', 'permanent_': 'TextEdit', 'land_under': 'TextEdit', 'culturable': 'TextEdit', 'fallows_la': 'TextEdit', 'current_fa': 'TextEdit', 'net_area_s': 'TextEdit', 'total_unir': 'TextEdit', 'area_irrig': 'TextEdit', 'canals_are': 'TextEdit', 'wells_tube': 'TextEdit', 'tanks_lake': 'TextEdit', 'waterfall_': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_area': 'TextEdit', 'ds_name': 'TextEdit', 'src_agency': 'TextEdit', 'State_Name': 'TextEdit', });
lyr_WB_District_Boundary_3.set('fieldImages', {'district': 'TextEdit', });
lyr_Rural_other_than_sc_4.set('fieldImages', {'Sl_No_': 'TextEdit', 'District_N': 'TextEdit', 'Health_Fac': 'TextEdit', 'Latitude': 'TextEdit', 'Longitude': 'TextEdit', 'Category': 'TextEdit', });
lyr_Rural_SC_5.set('fieldImages', {'Facility_N': 'TextEdit', 'NIN_2_HFI': 'TextEdit', 'State': 'TextEdit', 'District': 'TextEdit', 'Taluka': 'TextEdit', 'Block': 'TextEdit', 'Facility_T': 'TextEdit', 'Latitude': 'TextEdit', 'longitude': 'TextEdit', 'Region_Ind': 'TextEdit', 'Operationa': 'TextEdit', 'Ownership': 'TextEdit', });
lyr_Urban_6.set('fieldImages', {'SL_No': 'TextEdit', 'District_n': 'TextEdit', 'ULB_Name': 'TextEdit', 'Facility_N': 'TextEdit', 'NIN_ID': 'TextEdit', 'Latitude': 'TextEdit', 'longitude': 'TextEdit', 'Type_of_Bu': 'TextEdit', 'Functional': 'TextEdit', 'Remarks': 'TextEdit', 'Facility_T': 'TextEdit', });
lyr_WB_Block_Boundary_2.set('fieldLabels', {'id': 'no label', 'objectid': 'no label', 'subdistric': 'no label', 'sdcode': 'no label', 'district': 'no label', 'dtcode': 'no label', 'state': 'no label', 'stcode': 'no label', 'total_hous': 'no label', 'total_popu': 'no label', 'avg_hh': 'no label', 'total_geog': 'no label', 'forest_are': 'no label', 'area_under': 'no label', 'barren_un_': 'no label', 'permanent_': 'no label', 'land_under': 'no label', 'culturable': 'no label', 'fallows_la': 'no label', 'current_fa': 'no label', 'net_area_s': 'no label', 'total_unir': 'no label', 'area_irrig': 'no label', 'canals_are': 'no label', 'wells_tube': 'no label', 'tanks_lake': 'no label', 'waterfall_': 'no label', 'shape_leng': 'no label', 'shape_area': 'no label', 'ds_name': 'no label', 'src_agency': 'no label', 'State_Name': 'no label', });
lyr_WB_District_Boundary_3.set('fieldLabels', {'district': 'no label', });
lyr_Rural_other_than_sc_4.set('fieldLabels', {'Sl_No_': 'inline label - always visible', 'District_N': 'inline label - always visible', 'Health_Fac': 'inline label - always visible', 'Latitude': 'inline label - always visible', 'Longitude': 'inline label - always visible', 'Category': 'inline label - always visible', });
lyr_Rural_SC_5.set('fieldLabels', {'Facility_N': 'inline label - always visible', 'NIN_2_HFI': 'inline label - always visible', 'State': 'inline label - always visible', 'District': 'inline label - always visible', 'Taluka': 'inline label - always visible', 'Block': 'inline label - always visible', 'Facility_T': 'inline label - always visible', 'Latitude': 'inline label - always visible', 'longitude': 'inline label - always visible', 'Region_Ind': 'inline label - always visible', 'Operationa': 'inline label - always visible', 'Ownership': 'inline label - always visible', });
lyr_Urban_6.set('fieldLabels', {'SL_No': 'inline label - always visible', 'District_n': 'inline label - always visible', 'ULB_Name': 'inline label - always visible', 'Facility_N': 'inline label - always visible', 'NIN_ID': 'inline label - always visible', 'Latitude': 'inline label - always visible', 'longitude': 'inline label - always visible', 'Type_of_Bu': 'inline label - always visible', 'Functional': 'inline label - always visible', 'Remarks': 'inline label - always visible', 'Facility_T': 'inline label - always visible', });
lyr_Urban_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});