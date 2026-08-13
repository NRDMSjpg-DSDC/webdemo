const {Map, View} = ol;
const {Tile:TileLayer, Vector:VectorLayer} = ol.layer;
const {OSM, Vector:VectorSource} = ol.source;
const {GeoJSON} = ol.format;
const {Style, Fill, Stroke, Circle, Text} = ol.style;
const {fromLonLat} = ol.proj;
const {Overlay} = ol;
const {ScaleLine, FullScreen} = ol.control;
const {defaults: defaultInteractions} = ol.interaction;
const homeCenter = fromLonLat([88.78, 26.65]);
const styles = {
  riskHigh: new Style({fill:new Fill({color:'rgba(210,55,35,.28)'}),stroke:new Stroke({color:'#b52d1f',width:2})}),
  riskMed: new Style({fill:new Fill({color:'rgba(240,173,78,.28)'}),stroke:new Stroke({color:'#b87818',width:2})}),
  road: new Style({stroke:new Stroke({color:'#666',width:2})}),
  blocked: new Style({stroke:new Stroke({color:'#d32f2f',width:4,lineDash:[10,8]})}),
  route: new Style({stroke:new Stroke({color:'#16a34a',width:5})}),
  shelter: new Style({image:new Circle({radius:8,fill:new Fill({color:'#1769aa'}),stroke:new Stroke({color:'#fff',width:2})}),text:new Text({text:'S',fill:new Fill({color:'#fff'}),font:'bold 10px sans-serif'})}),
  facility: new Style({image:new Circle({radius:7,fill:new Fill({color:'#7b1fa2'}),stroke:new Stroke({color:'#fff',width:2})})})
};
function vectorLayer(url, styleFn) {
  return new VectorLayer({
    source:new VectorSource({url,format:new GeoJSON()}),
    style:styleFn
  });
}
const riskLayer = vectorLayer('data/risk_zones.geojson', f => f.get('risk')==='High'?styles.riskHigh:styles.riskMed);
const sheltersLayer = vectorLayer('data/shelters.geojson', styles.shelter);
const roadsLayer = vectorLayer('data/roads.geojson', f => f.get('status')==='Blocked'?styles.blocked:styles.road);
const routesLayer = vectorLayer('data/routes.geojson', styles.route);
const facilitiesLayer = vectorLayer('data/facilities.geojson', styles.facility);
const gramPanchayatLayer = vectorLayer('data/gram_panchayat.geojson', f => new Style({
  fill:new Fill({color:'rgba(142,68,173,.10)'}),
  stroke:new Stroke({color:'#7b1fa2',width:1,lineDash:[8,6]}),
  text:new Text({text:f.get('Gram_Panchayat')||f.get('name')||'',font:'bold 11px sans-serif',
    fill:new Fill({color:'#5e2a72'}),stroke:new Stroke({color:'#fff',width:3})})
}));
const osmLayer = new TileLayer({
  source: new OSM({
    attributions: '© OpenStreetMap contributors',
    crossOrigin: 'anonymous'
  }),
  visible: true,
  zIndex: 0
});
const satelliteLayer = new TileLayer({
  source: new ol.source.XYZ({
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attributions: 'Tiles © Esri',
    crossOrigin: 'anonymous'
  }),
  visible: false,
  zIndex: 0
});
const map = new Map({
  target: 'map',
  layers: [
    osmLayer,
    satelliteLayer,
    riskLayer,
    roadsLayer,
    routesLayer,
    sheltersLayer,
    facilitiesLayer,
    gramPanchayatLayer
  ],
  view: new View({
    center: homeCenter,
    zoom: 11
  }),
  controls: [
    new ScaleLine()
  ]
});
gramPanchayatLayer.setVisible(true);
gramPanchayatLayer.setZIndex(10);
const popup = document.getElementById('popup');
const popupContent = document.getElementById('popupContent');
const overlay = new Overlay({element:popup,autoPan:{animation:{duration:250}}});
map.addOverlay(overlay);
document.getElementById('popupCloser').onclick=()=>overlay.setPosition(undefined);
map.on('singleclick', evt=>{
  let found=false;
  map.forEachFeatureAtPixel(evt.pixel,(feature)=>{
    const props=feature.getProperties(); delete props.geometry;
    popupContent.innerHTML='<b>'+ (props.name||'Map Feature') +'</b><hr>'+Object.entries(props).map(([k,v])=>`<div><b>${k}:</b> ${v}</div>`).join('');
    overlay.setPosition(evt.coordinate); found=true;
    return true;
  });
  if(!found) overlay.setPosition(undefined);
});
map.on('pointermove', evt=>{
  const c=ol.proj.toLonLat(evt.coordinate);
  document.getElementById('coord').textContent=`Lon: ${c[0].toFixed(5)} | Lat: ${c[1].toFixed(5)}`;
});
document.querySelectorAll('[data-layer]').forEach(cb=>{
  cb.addEventListener('change',()=>{
    const layers={risk:riskLayer,shelters:sheltersLayer,routes:routesLayer,roads:roadsLayer,facilities:facilitiesLayer,gramPanchayat:gramPanchayatLayer};
    layers[cb.dataset.layer].setVisible(cb.checked);
  });
});
const measureSource = new VectorSource();
const measureLayer = new VectorLayer({
  source: measureSource,
  zIndex: 50,
  style: new Style({
    fill: new Fill({color:'rgba(201,91,24,.12)'}),
    stroke: new Stroke({color:'#c95b18',width:3}),
    image: new Circle({radius:5,fill:new Fill({color:'#c95b18'}),stroke:new Stroke({color:'#fff',width:2})})
  })
});
map.addLayer(measureLayer);
let drawInteraction = null;
let measureHelpOverlay = null;
let locationLayer = null;
let locationFeature = null;
function formatLength(line){
  const length=ol.sphere.getLength(line,{projection:'EPSG:3857'});
  return length>=1000 ? (length/1000).toFixed(2)+' km' : length.toFixed(1)+' m';
}
function formatArea(polygon){
  const area=ol.sphere.getArea(polygon,{projection:'EPSG:3857'});
  return area>=1000000 ? (area/1000000).toFixed(2)+' km²' : area.toFixed(0)+' m²';
}
function stopMeasure(){
  if(drawInteraction){
    map.removeInteraction(drawInteraction);
    drawInteraction=null;
  }
  if(measureHelpOverlay){
    map.removeOverlay(measureHelpOverlay);
    measureHelpOverlay=null;
  }
}
function startMeasure(){
  stopMeasure();
  measureSource.clear();
  const tooltip=document.createElement('div');
  tooltip.className='measure-tooltip';
  tooltip.textContent='Click to start measuring • Double-click to finish';
  measureHelpOverlay=new Overlay({
    element:tooltip,
    offset:[0,-15],
    positioning:'bottom-center',
    stopEvent:false
  });
  map.addOverlay(measureHelpOverlay);
  drawInteraction=new ol.interaction.Draw({
    source:measureSource,
    type:'LineString',
    style:new Style({
      fill:new Fill({color:'rgba(201,91,24,.10)'}),
      stroke:new Stroke({color:'#c95b18',width:3,dash:[8,6]}),
      image:new Circle({radius:5,fill:new Fill({color:'#c95b18'}),stroke:new Stroke({color:'#fff',width:2})})
    }),
    finishCondition:ol.events.condition.doubleClick
  });
  map.addInteraction(drawInteraction);
  drawInteraction.on('drawstart',evt=>{
    const geom=evt.feature.getGeometry();
    geom.on('change',()=>{
      tooltip.textContent='Distance: '+formatLength(geom)+' • Double-click to finish';
      const last=geom.getLastCoordinate();
      measureHelpOverlay.setPosition(last);
    });
  });
  drawInteraction.on('drawend',evt=>{
    tooltip.textContent='Distance: '+formatLength(evt.feature.getGeometry());
    const last=evt.feature.getGeometry().getLastCoordinate();
    measureHelpOverlay.setPosition(last);
    setTimeout(()=>{
      if(measureHelpOverlay){
        map.removeOverlay(measureHelpOverlay);
        measureHelpOverlay=null;
      }
    },3500);
  });
}
document.getElementById('homeBtn').onclick=()=>{
  map.getView().animate({center:homeCenter,zoom:11,duration:500});
};
document.getElementById('clearBtn').onclick=()=>{
  stopMeasure();
  measureSource.clear();
  overlay.setPosition(undefined);
  if(locationLayer){
    map.removeLayer(locationLayer);
    locationLayer=null;
    locationFeature=null;
  }
};
document.getElementById('measureBtn').onclick=()=>{
  startMeasure();
};
document.getElementById('locateBtn').onclick=()=>{
  if(!navigator.geolocation){
    alert('Location is not supported by this browser.');
    return;
  }
  const button=document.getElementById('locateBtn');
  const originalText=button.textContent;
  button.disabled=true;
  button.textContent='Locating...';
  navigator.geolocation.getCurrentPosition(pos=>{
    const lon=pos.coords.longitude;
    const lat=pos.coords.latitude;
    const coordinate=fromLonLat([lon,lat]);
    if(locationLayer) map.removeLayer(locationLayer);
    locationFeature=new ol.Feature({
      geometry:new ol.geom.Point(coordinate),
      name:'My Location'
    });
    locationFeature.setStyle(new Style({
      image:new Circle({
        radius:10,
        fill:new Fill({color:'#1565c0'}),
        stroke:new Stroke({color:'#fff',width:3})
      })
    }));
    const locationSource=new VectorSource({features:[locationFeature]});
    locationLayer=new VectorLayer({source:locationSource,zIndex:60});
    map.addLayer(locationLayer);
    map.getView().animate({
      center:coordinate,
      zoom:16,
      duration:800
    });
    button.disabled=false;
    button.textContent=originalText;
  },err=>{
    button.disabled=false;
    button.textContent=originalText;
    let message='Unable to obtain your location.';
    if(err.code===1) message='Location permission was denied. Please allow Location access for localhost:8000 and try again.';
    else if(err.code===2) message='Your location could not be determined. Check GPS/Wi-Fi/location services and try again.';
    else if(err.code===3) message='Location request timed out. Please try again.';
    alert(message);
  },{
    enableHighAccuracy:true,
    timeout:15000,
    maximumAge:0
  });
};
function setBasemap(type){
  const sat=type==='satellite';
  osmLayer.setVisible(!sat);
  satelliteLayer.setVisible(sat);
  map.render();
}
document.querySelectorAll('input[name="basemap"]').forEach(r=>{
  r.addEventListener('change',e=>setBasemap(e.target.value));
});
let gpFeatures=[];
function zoomFeatures(fs){
  if(!fs.length)return;
  const ex=ol.extent.createEmpty();
  fs.forEach(f=>ol.extent.extend(ex,f.getGeometry().getExtent()));
  map.getView().fit(ex,{padding:[90,90,90,90],maxZoom:14,duration:600});
}
function setupGPSelectors(){
  gpFeatures=gramPanchayatLayer.getSource().getFeatures();
  if(!gpFeatures.length){setTimeout(setupGPSelectors,250);return;}
  const blocks=[...new Set(gpFeatures.map(f=>f.get('Block')).filter(Boolean))].sort();
  const bs=document.getElementById('blockSelect'), gs=document.getElementById('gpSelect');
  const db=document.getElementById('downloadBlock'), dg=document.getElementById('downloadGP');
  [bs,db].forEach(s=>blocks.forEach(b=>{let o=document.createElement('option');o.value=b;o.textContent=b;s.appendChild(o)}));
  function fill(s,b){
    s.innerHTML='<option value="">Select Gram Panchayat</option>';
    gpFeatures.filter(f=>!b||f.get('Block')===b).sort((a,b)=>String(a.get('name')).localeCompare(String(b.get('name'))))
      .forEach(f=>{let o=document.createElement('option');o.value=f.get('name');o.textContent=f.get('name');s.appendChild(o)});
  }
  bs.onchange=()=>{fill(gs,bs.value);let fs=gpFeatures.filter(f=>f.get('Block')===bs.value);if(fs.length)zoomFeatures(fs)};
  gs.onchange=()=>{let f=gpFeatures.find(f=>f.get('name')===gs.value);if(f)zoomFeatures([f])};
  db.onchange=()=>{fill(dg,db.value);document.getElementById('downloadMessage').textContent=''};
  fill(gs,'');fill(dg,'');
}
setupGPSelectors();
const modal=document.getElementById('downloadModal');
document.getElementById('downloadMapBtn').onclick=()=>modal.classList.add('show');
document.getElementById('downloadClose').onclick=()=>modal.classList.remove('show');
modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};
document.addEventListener('keydown',e=>{if(e.key==='Escape')modal.classList.remove('show')});
document.getElementById('pdfDownloadBtn').onclick=()=>{
  const b=document.getElementById('downloadBlock').value,g=document.getElementById('downloadGP').value,m=document.getElementById('downloadMessage');
  if(!b||!g){m.textContent='Please select both Block and Gram Panchayat.';return}
  const file='pdf/'+b.replace(/[^a-z0-9]+/gi,'_')+'__'+g.replace(/[^a-z0-9]+/gi,'_')+'.pdf';
  const a=document.createElement('a');a.href=file;a.download=file.split('/').pop();document.body.appendChild(a);a.click();a.remove();modal.classList.remove('show');
};
document.getElementById('searchBtn').onclick=()=>{
 const q=document.getElementById('searchBox').value.trim().toLowerCase();
 if(!q)return;
 const sources=[sheltersLayer,facilitiesLayer,riskLayer];
 let matched=false;
 sources.forEach(layer=>{
   layer.getSource().getFeatures().forEach(f=>{
     if(String(f.get('name')||'').toLowerCase().includes(q)){
       const ext=f.getGeometry().getExtent();
       map.getView().fit(ext,{padding:[100,100,100,100],maxZoom:15,duration:700});
       matched=true;
     }
   });
 });
 if(!matched) alert('Location not found in the sample dataset.');
};
document.getElementById('analyzeBtn').onclick=()=>{
 const v=document.getElementById('locationSelect').value;
 const box=document.getElementById('analysisResult');
 const plans={
  Haldibari:`<b>Haldibari Flood Zone</b><br>Affected population: <b>2,170</b><br>Recommended shelter: <b>Haldibari High School</b><br>Available capacity: <b>1,100</b><br>Recommended route: <b>4.2 km</b> · approx. <b>12 min</b><br><br><b>Action:</b> Use the green route and monitor 3 blocked-road locations.`,
  Mekhliganj:`<b>Mekhliganj Flood Zone</b><br>Affected population: <b>1,480</b><br>Recommended shelter: <b>Mekhliganj Community Hall</b><br>Available capacity: <b>950</b><br>Recommended route: <b>3.6 km</b> · approx. <b>11 min</b><br><br><b>Action:</b> Keep the alternate route available.`,
  Maynaguri:`<b>Maynaguri Waterlogging Zone</b><br>Affected population: <b>860</b><br>Recommended shelter: <b>Maynaguri HS</b><br>Available capacity: <b>1,300</b><br>Recommended route: <b>2.8 km</b> · approx. <b>8 min</b><br><br><b>Action:</b> Prioritise vulnerable households.`
 };
 box.innerHTML=plans[v]||'Select an affected area to calculate the evacuation plan.';
};
document.getElementById('measureBtn').onclick=()=>{
 alert('Measure tool placeholder: this demo is ready for OpenLayers Draw/Measure integration.');
};
gramPanchayatLayer.setVisible(true);
gramPanchayatLayer.setZIndex(10);
const legendToggle=document.getElementById('legendToggle');
const legendPanel=document.querySelector('.legend-panel');
if(legendToggle && legendPanel){
  legendPanel.classList.add('legend-collapsed');
  legendToggle.addEventListener('click',()=>{
    const collapsed=legendPanel.classList.toggle('legend-collapsed');
    legendToggle.setAttribute('aria-expanded',String(!collapsed));
    legendToggle.setAttribute('aria-label',collapsed?'Expand legend':'Collapse legend');
    legendToggle.textContent=collapsed?'⌄':'⌃';
  });
}
const basemapIcon=document.getElementById('basemapIcon');
const basemapControl=document.getElementById('basemapControl');
if(basemapIcon && basemapControl){
  basemapIcon.addEventListener('click',e=>{
    e.stopPropagation();
    const open=!basemapControl.classList.contains('open');
    basemapControl.classList.toggle('open',open);
    basemapControl.setAttribute('aria-expanded',String(open));
  });
  document.addEventListener('click',e=>{
    if(!basemapControl.contains(e.target)){
      basemapControl.classList.remove('open');
      basemapControl.setAttribute('aria-expanded','false');
    }
  });
}
document.querySelectorAll('.emergency-menu-item').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.emergency-menu-item').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const key=btn.dataset.layer;
    if(key==='shelters' && sheltersLayer) sheltersLayer.setVisible(true);
    if(key==='routes' && routesLayer) routesLayer.setVisible(true);
    if(key==='roads' && roadsLayer) roadsLayer.setVisible(true);
    if(key==='facilities' && facilitiesLayer) facilitiesLayer.setVisible(true);
    if(key==='population' || key==='capacity'){
      document.querySelector('[data-layer="risk"]')?.click();
    }
  });
});
function statFeatures(layer){ return layer && layer.getSource ? layer.getSource().getFeatures() : []; }
function uniqueValues(features, names){
  const s=new Set();
  features.forEach(f=>names.some(n=>{const v=f.get(n); if(v!==undefined&&v!==null&&String(v).trim()){s.add(String(v).trim());return true;} return false;}));
  return s;
}
function sumValues(features,names){
  let total=0;
  features.forEach(f=>names.some(n=>{const v=f.get(n); if(v!==undefined&&v!==null&&String(v).trim()){const x=Number(String(v).replace(/,/g,'')); if(Number.isFinite(x)){total+=x;return true;}} return false;}));
  return total;
}
function putStat(id,v){const e=document.getElementById(id);if(e)e.textContent=Number(v||0).toLocaleString('en-IN');}
function updateEmergencyStats(){
  const gp=statFeatures(gramPanchayatLayer), sh=statFeatures(sheltersLayer), ef=statFeatures(facilitiesLayer);
  putStat('statGP',gp.length);
  putStat('statBlock',uniqueValues(gp,['Block','block','BLOCK']).size);
  putStat('statShelter',sh.length);
  putStat('statCapacity',sumValues(sh,['Total Capacity','total_capacity','Total_Capacity','Capacity','capacity']));
  putStat('statAvailable',sumValues(sh,['Available Capacity','available_capacity','Available_Capacity','Available','available']));
  putStat('statFacilities',ef.length);
}
(function waitEmergencyStats(){
  if(statFeatures(gramPanchayatLayer).length || statFeatures(sheltersLayer).length || statFeatures(facilitiesLayer).length) updateEmergencyStats();
  else setTimeout(waitEmergencyStats,300);
})();

// Version 13: left search
(function(){
  const input=document.getElementById('topSearchInput');
  const btn=document.getElementById('topSearchBtn');
  if(!input || !btn) return;
  function doSearch(){
    const q=input.value.trim().toLowerCase();
    if(!q) return;
    const layers=[gramPanchayatLayer,sheltersLayer,facilitiesLayer,riskLayer,roadsLayer,routesLayer];
    for(const layer of layers){
      if(!layer || !layer.getSource) continue;
      const f=layer.getSource().getFeatures().find(feature=>{
        const p=feature.getProperties();
        return Object.keys(p).some(k=>k!=='geometry' && p[k]!=null &&
          String(p[k]).toLowerCase().includes(q));
      });
      if(f){
        const g=f.getGeometry();
        if(g && typeof map!=='undefined'){
          map.getView().fit(g.getExtent(),{padding:[100,100,100,100],maxZoom:16,duration:700});
        }
        return;
      }
    }
    alert('No matching location found.');
  }
  btn.addEventListener('click',doSearch);
  input.addEventListener('keydown',e=>{if(e.key==='Enter') doSearch();});
})();

// Version 17: collapsible responsive left menu
(function(){
  const workspace=document.querySelector('.workspace');
  const sidebar=document.getElementById('sidebar');
  const toggle=document.getElementById('sidebarToggle');
  const openBtn=document.getElementById('sidebarOpenBtn');
  if(!workspace || !sidebar || !toggle || !openBtn) return;

  function setCollapsed(collapsed){
    workspace.classList.toggle('sidebar-collapsed', collapsed);
    toggle.setAttribute('aria-expanded', String(!collapsed));
    toggle.setAttribute('aria-label', collapsed ? 'Open left menu' : 'Collapse left menu');
    toggle.title=collapsed ? 'Open left menu' : 'Collapse left menu';
    toggle.textContent=collapsed ? '›' : '‹';
    openBtn.style.display=collapsed ? 'block' : 'none';
    setTimeout(()=>{ if(typeof map!=='undefined') map.updateSize(); },250);
  }
  toggle.addEventListener('click',()=>setCollapsed(!workspace.classList.contains('sidebar-collapsed')));
  openBtn.addEventListener('click',()=>setCollapsed(false));

  // On phones start collapsed so the map is immediately visible.
  if(window.matchMedia('(max-width: 600px)').matches) setCollapsed(true);
  window.addEventListener('resize',()=>{ if(typeof map!=='undefined') map.updateSize(); });
})();

/* Version 19 - local/demo login. Production systems should validate credentials server-side. */
(function(){
 const overlay=document.getElementById('loginOverlay'),form=document.getElementById('loginForm'),error=document.getElementById('loginError');
 if(!overlay||!form)return;
 document.body.classList.add('login-locked');
 const accounts=[
  {username:'admin',password:'admin123',type:'ADMIN'},
  {username:'analyst',password:'analyst123',type:'ANALYST'},
  {username:'user',password:'user123',type:'USER'}
 ];
 form.addEventListener('submit',function(e){
  e.preventDefault();
  const u=document.getElementById('loginUsername').value.trim(),p=document.getElementById('loginPassword').value,t=document.getElementById('loginUserType').value;
  const a=accounts.find(x=>x.username===u&&x.password===p&&x.type===t);
  if(a){error.textContent='';overlay.classList.add('hidden');document.body.classList.remove('login-locked');sessionStorage.setItem('dmwgisLoggedIn','1');sessionStorage.setItem('dmwgisUser',a.username);sessionStorage.setItem('dmwgisRole',a.type);}
  else error.textContent='Invalid username, password or user type.';
 });
 document.getElementById('loginUsername').focus();
})();
