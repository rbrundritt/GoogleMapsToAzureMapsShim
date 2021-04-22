
# Google Maps V3 To Azure Maps Web SDK Shim

This project makes it possible to migrate most apps using the Google Maps V3 JavaScript library to the Azure Maps Web SDK with a single line of code. This shim covers about 90% of the API interface of Google Maps and simply ignores things it doesn’t support in majority of cases. 

Using this shim is not the same as fully migrating the Azure Maps Web SDK. This shim is designed to mimic the behaviour of the Google Maps V3 JavaScript API. 
As such, some Azure Maps Web SDK features are disabled to ensure a consistant experience with the API interface of Google Maps. 
For example, to ensure the OverlayView class works, rotating and pitching the map are disabled when this class is used. 
Fully migrating to the Azure Maps Web SDK will provide a more performance, features and functionalities.
See the [Migrate from Google Maps guide](https://docs.microsoft.com/en-us/azure/azure-maps/migrate-from-google-maps) for details on how to fully migrate your app.

[Try the demos](https://rbrundritt.azurewebsites.net/demos/GoogleMapsShim/samples/)

## How to implement

Implementing this solution requires the following steps to implement:

1. Sign up for an Azure Maps account via the Azure portal as outline in this [quickstart guide](https://docs.microsoft.com/en-us/azure/azure-maps/quick-demo-map-app).
2. Download the **GoogleMapsToAzureMapsShim.js** file from the **dist** folder of this project.
3. Add this file to your application like you would any other JavaScript file. 
4. Locate the script tag in your application which loads the Google Maps V3 SDK. It will look something like one of the following, but may have additional query parameters in the URL.  

```html
<script async await src="https://maps.googleapis.com/maps/api/js?callback=initMap&key={Your_Google_Maps_Key}"></script>
```

Synchornous loading:

```html
<script src="https://maps.googleapis.com/maps/api/js?key={Your_Google_Maps_Key}"></script>
```

5. Update the `{placeholders}` in the following URL then replace the map script tag for Google Maps with following script tag. 

```html
<script async await src="{Path_to_shim_file}/GoogleMapsToAzureMapsShim.js?key={Your_Azure_Maps_Key}"></script>
```

Synchornous loading:

```html
<script src="{Path_to_shim_file}/GoogleMapsToAzureMapsShim.js?key={Your_Azure_Maps_Key}"></script>
```

The following URL parameters are also supported:

- language
- region

### Library support

This shim provides some support for the following libraries. There is no need to specify these when loading the shim as they are automatically loaded.

- drawing
- geometry
- visualizations
- places
- MarkerClusterer: A version of the `MarkerClusterer` class is provided in this shim. As such you can remove any script tags that load the **MarkerClustererPlus** or **MarkerClusterer** library.

### Example Implementation

**Before - using Google Maps**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
         #map {
             height: 100%;
         }
         
         html, body {
             height: 100%;
             margin: 0;
             padding: 0;
         }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });
        }
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?callback=initMap&key={Your_Google_Maps_Key}"></script>
</body >
</html >
```

**After - Using Azure Maps via shim**

```html
<!DOCTYPE html>
<html>
<head>
    <title>Simple Map</title>
    <meta name="viewport" content="initial-scale=1.0">
    <meta charset="utf-8">
    <style>
         #map {
             height: 100%;
         }
         
         html, body {
             height: 100%;
             margin: 0;
             padding: 0;
         }
    </style>
</head>
<body>
    <div id="map"></div>
    <script>
        var map;
        function initMap() {
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: 8
            });
        }
    </script>
    <script async defer src="{Path_to_shim_file}/GoogleMapsToAzureMapsShim.js?key={Your_Azure_Maps_Key}"></script>
</body >
</html >
```

## How to run the samples locally

To run the side by side comparison samples, do the following.

1. Open the `samples/index.html` file in a text editor (or Visual Studio). 
2. Add your Azure Maps and Google Maps keys into the placeholders:

	```javascript
	var googleMapsKey = '<Your Google Maps Key>';
    var azureMapsKey = '<Your Azure Maps Key>';
	```

3. Open the solution in Visual Studio and run it.

## Known limitations

The following is a list of features that this shim does not currently support:

- Custom controls (partial support)
- Map projection
- Street view
- Custom map styles
- Clickable POIs
- Limited support for google.maps.Data.GeometryCollection
- Icon Sequence
- MapTypeRegistry
- Styled Map Type
- Transit layer
- Bicycle layer
- Fusion Tables Layer
- Save Widget
- Maps Engine Layer
- Transit directions
- Draggable directions
- ElevationService
- MaxZoomService
- Image Map Type features: getTile, releaseTile, radius, ownerDocument of getTile
- Places service features: find by phone number, getDetails limited to retrieving cached place data.
- Marker features: anchorPoint, icon (labelOrigin, origin), symbol (labelOrigin), MarkerShape
- Polyline/Polygon/Rectangle/Circle features: zIndex, strokePosition, icons
- Data class features: scaledSize, sprites, zIndex, drawing
- Edittable only works if the shape was created using drawing manager.

### Common issues: 

- All image resources loaded into the map (custom icon images, tile layers, ground overlays), must be hosted in the same domain, or on a CORs enabled endpoint.

## Additional Resources

* [Migrate from Google Maps guide](https://docs.microsoft.com/en-us/azure/azure-maps/migrate-from-google-maps)
* [Azure Maps (main site)](https://azure.com/maps)
* [Azure Maps Documentation](https://docs.microsoft.com/azure/azure-maps/index)
* [Azure Maps Web SDK Samples](https://github.com/Azure-Samples/AzureMapsCodeSamples)
* [Azure Maps Blog](https://azure.microsoft.com/blog/topics/azure-maps/)
* [MSDN Forums](https://social.msdn.microsoft.com/Forums/en-US/home?forum=azurelbs)
* [StackOverflow [azure-maps]](https://stackoverflow.com/questions/tagged/azure-maps)
* [Azure Maps feedback](https://feedback.azure.com/forums/909172-azure-maps)

## License

MIT
 
See [License](LICENSE) for full license text.
