# Disaster Management & Evacuation WebGIS

A working front-end WebGIS demonstration built with OpenLayers and sample GeoJSON data.

## Run
Because browsers may block local GeoJSON loading with file://, serve the folder with a local web server.

### Python
python -m http.server 8000

Then open:
http://localhost:8000/

### VS Code
Use the Live Server extension and open index.html.

## Included
- OpenStreetMap basemap
- Disaster risk zones
- Evacuation centres
- Road network with blocked roads
- Recommended evacuation routes
- Critical facilities
- Layer controls
- Feature identification popup
- Location search
- Browser geolocation
- Emergency analysis panel
- Print map
- Responsive layout

## Replace sample data
Replace the GeoJSON files in `data/` with your own layers, keeping the same filenames, or modify the URLs in `js/app.js`.

## Production upgrade
For a real government deployment, connect the layers to GeoServer/PostGIS and add authenticated administration, live incident feeds, network routing (pgRouting/OSRM), user permissions, audit logs, and real population/shelter capacity data.


## If the map is blank

1. Start the server from this project folder:
   `python -m http.server 8000`
2. Open `http://localhost:8000/`.
3. Make sure the computer has Internet access because the default basemap is OpenStreetMap.
4. Press `Ctrl+F5` to hard-refresh the browser.
5. If the base map is still blank, press `F12` -> Console and check for red errors.
6. The sample GeoJSON layers are local; the OpenStreetMap base map requires Internet access.

## Version 5 fixes
- Locate now uses browser geolocation with clear permission/error messages and a location marker.
- Measure now uses OpenLayers Draw to measure distance in metres/km; double-click finishes the measurement.
- Clear removes measurements, location marker, and popup.
- Fixed map layer initialization so basemap switching references defined layers and Gram Panchayat is actually added to the map.

## Version 6 UI updates
- Legend is collapsed by default on initial page load and can be expanded with the arrow.
- Basemap selector is presented as a compact map icon; clicking it opens the OpenStreetMap/Satellite choices.

## Version 7 UI update
- Basemap is collapsed/closed by default at page load. Click the map icon to expand the basemap choices; click outside to collapse it.

## Version 8 UI update
- Added highlighted Emergency Information menus below the Legend: Affected Population, Shelters, Available Capacity, Evacuation Routes, Roads, Emergency Facilities.

## Version 11
- Removed the search bar from the top of the map tools area.

## Version 12
- Removed the `map-title` div from the page.

## Version 14 layout
- Search remains on the left side of the map.
- Basemap and Map Tools are positioned at the top of the right-side controls.
- Legend and Emergency Information follow immediately below, removing unnecessary vertical space.

## Version 15
- Basemap control is positioned below the search box.
- Basemap icon changed to a simple, clearly visible grid/map icon instead of the previous emoji.

## Version 16
- Removed the unwanted search form from the top-right area.
- The intended left-side search control remains available.

## Version 17
- Left sidebar is collapsible with a clear arrow button.
- Search bar is restored and positioned above the Basemap on the left side of the map.
- Responsive layout added for desktop, tablet and mobile screens.
- On mobile, the left menu starts collapsed and can be reopened with the arrow button.
- Removed accidental duplicate Basemap radio controls from the HTML.

## Version 18
- Removed the Control Panel header text from the top of the sidebar.
- The collapse arrow remains inside the left sidebar menu.
- Moved the OpenLayers scale bar to the bottom-right of the map.

## Version 19
- Added transparent login overlay at index loading.
- Fields: Username, Password and User Type (Admin, Analyst, User).
- Demo accounts are defined in `js/app.js`.
- Client-side authentication is for demonstration/local use; production authentication should use a server/API.

## Version 23
- Organized the project code for readability.
- Moved Block and Gram Panchayat selectors from the sidebar to the map tools panel, directly below Home and Locate.
- Removed Measure and Clear buttons and their unused measurement implementation.
- Kept existing Home, Locate, Legend, Basemap, Search, and emergency functions.
