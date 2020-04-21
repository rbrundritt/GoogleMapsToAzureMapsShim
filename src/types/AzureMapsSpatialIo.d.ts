

/// <reference path="AzureMaps.d.ts"/>

declare namespace atlas {
    /** Options used for reading spatial data files. */
    export interface BaseSpatialDataReadOptions {
        /**
         * Specifies the maximum number of features to read from the data set.
         * If not specified, will read all features.
         */
        maxFeatures?: number;
        /**
         * A URL to a proxy service that can have a URL to an external file appended it.
         * This will be needed to access files that are hosted on non-CORs enabled endpoints.
         */
        proxyService?: string;
    }

    /**
     * Options that customize how XML files are read and parsed.
     */
    export interface BaseSpatialXmlReadOptions extends BaseSpatialDataReadOptions {
        /**
         * Specifies if style information should be parsed from the XML file and included as properties of the features.
         * Default: `true`
         * @default true
         */
        parseStyles?: boolean;
    }

    /** Column header definition for a delimited file. */
    export interface CsvHeader {
        /** The name of each column. */
        names?: string[];
        /**
         * The type of each column; string, number, boolean, date, geography (Well Known Text string).
         * If unspecified or null, will default to string.
         */
        types: Array<"string" | "number" | "date" | "boolean" | "geography">;
    }

    /** Defines a custom XML namespace. */
    export interface CustomGmlNamespace {
        /** A prefix value to append to the tag names. */
        prefix: string;
        /** A URL that points to the namespace schema. */
        namespaceUrl: string;
        /** An array of tag names that are allowed by this namespace. */
        tagNames: string[];
        /** The tag name to wrap the geometry with. */
        geometryTagName: string;
        /** The tag name to wrap feature members with. */
        featureTagName: string;
    }

    /** A Feature Collection that has properties for the collection. */
    export interface ExtendedFeatureCollection extends data.FeatureCollection {
        /** Properties of the feature collection. */
        properties?: any;
    }

    /**
     * Options that customize how GML files are read and parsed.
     */
    export interface GmlReadOptions extends BaseSpatialXmlReadOptions {
        /**
         * If the reading a GML file, this specifies if the coordinate information is ordered 'longitude, latitude'.
         * If set to false, coordinates will be parsed as "latitude, longitude".
         * If unspecified, will try and determine based on hints within the GML,
         * with a preference for 'latitude, longitude' ordering.
         */
        isAxisOrderLonLat?: boolean;
        /**
         * If the reading a GML file, this contains a key-value pair list of property names to types
         * which is used for deserializing custom properties.
         * If a property name is not in the list, the property value will be parsed as a string.
         */
        propertyTypes?: Record<string, string | "string" | "number" | "boolean" | "date">;
    }

    /** Options that are used to customize how to write GML. */
    export interface GmlWriteOptions extends SpatialXmlWriteOptions {
        /**
         * A boolean indicating if the GML namespace should be included as part of the generated XML.
         * If set to false, the GML tags will be prefixed with gml: with the assumption
         * that the namespace is specified in the XML document.
         * Default: `true`
         * @default true
         */
        includeNamespace?: boolean;
        /** Namespace used for writing custom feature data in GML. */
        customNamespace?: CustomGmlNamespace;
        /** The SRS name to add to the geometries.
         * Default: `"urn:ogc:def:crs:EPSG::4326"`
         * @default "urn:ogc:def:crs:EPSG::4326"
         */
        srsName?: string;
        /** Specifies if the srsName value should be written.
         * Default: `false`
         * @default false
         */
        includeSrsName?: boolean;
    }

    /**
     * Options that customize how GPX files are read and parsed.
     */
    export interface GpxReadOptions extends BaseSpatialXmlReadOptions {
        /**
         * Specifies wether the individual waypoint data of a GPX Route or Track should be captured.
         * If set to true, the shape will have a metadata.waypoints property that is an array of
         * pushpins that contains the details of each waypoint along the track.
         * Default: `false`
         * @default false
         */
        capturePathWaypoints?: boolean;
    }

    /**
     * Options that customize how KML files are read and parsed.
     */
    export interface KmlReadOptions extends BaseSpatialXmlReadOptions {
        /**
         * Specifies if shapes visible tags should be used to set the visible property of it's equivalent GeoJSON object.
         * Default: `true`
         * @default true
         */
        ignoreVisibility?: boolean;
        /**
         * The maximum number of network links that a single KML file can have.
         * Default: `10`
         * @default 10
         */
        maxNetworkLinks?: number;
        /**
         * The maximum depth of network links in a KML file.
         * Example: when set to 3; file1 links to file2 which links to file3 but won't open links in file3.
         * Default: `3`
         * @default 3
         */
        maxNetworkLinkDepth?: number;
        /**
         * Specifies if polygon extrusion information should be captured in KML files.
         * If set to true, and a polygon has extrusion data, a height property will be added to polygon features properties
         * to indicate how much the polygon should be extruded vertically in meters.
         * Default: `true`
         * @default true
         */
        extrudePolygons?: boolean;
    }

    /** A custom OGC dimension. */
    export interface OgcDimension {
        /** The identifier of the dimension. */
        id?: string;
        /** The default value of the dimension. */
        default?: string;
        /** The value of the dimension. Often indicates the range. */
        value?: string;
    }

    /** An object that describes the capabilities of an OGC WMS and WMTS service. */
    export interface OgcMapLayerCapabilities {
        /** The title of the OGC service. */
        title?: string;
        /** A description or abstract for the service. */
        description?: string;
        /** Details of all sublayers available in the service. */
        sublayers: OgcSublayer[];
        /** The bounds in which the service is available in EPSG:4326. */
        bounds: data.BoundingBox;
        /**
         * Specifies the maximum number of layers that may be included in a GetMap request.
         * Set to 1 for WMTS services.
         */
        layerLimit: number;
        /** The version of the service. */
        version: string;
    }

    /** Options for an OGC layer. */
    export interface OgcMapLayerOptions extends MediaLayerOptions {
        /**
         * Specifies the type of web mapping service to connect to.
         * If not specified, will try and determine based on the URL.
         * Defaults to 'WMTS' if not specified or if can't be determined from the URL.
         */
        service?: "WMS" | "WMTS";
        /** The URL that points to the service. */
        url?: string;
        /** Specifies the sublayers in the service to render. */
        activeLayers?: Array<string | OgcSublayer>;
        /** The styles of the active layers.  */
        styles?: Array<string | OgcStyle>;
        /** The version of the service to target. If not specified, will automatically try and determine this. */
        version?: string;
        /** Indicates if the map should set the map view to the bounding box of the layer. Not persistent. */
        bringIntoView?: boolean;
        /** Indicates if errors related to accessing the service should be logged to the console. */
        debug?: boolean;
        /** Custom dimensions to add to tile requests. */
        dimensions?: Record<string, string>;
        /**
         * A URL to a proxy service that can have a URL to an external service appended it.
         * This will be needed to access services that are hosted on non-CORs enabled endpoints.
         */
        proxyService?: string;
    }

    /** OGC WMS and WMTS layer style information. */
    export interface OgcStyle {
        /** The identifier of the style. */
        id?: string;
        /** The title of the style. */
        title?: string;
        /** A URL to the legend graphic. */
        legendUrl?: string;
        /** Indicates if the style is the default. */
        isDefault?: boolean;
    }

    /** Sublayer information for OGC WMS and WMTS services. */
    export interface OgcSublayer {
        /** Unique identifier for the layer. */
        id?: string;
        /** The title for the layer. */
        title?: string;
        /** A description or abstract for the layer. */
        description?: string;
        /** A list of the supported styles. */
        styles: OgcStyle[];
        /** An integer specifying the minimum zoom level to render the layer at. */
        minZoom: number;
        /** An integer specifying the maximum zoom level to render the layer at. */
        maxZoom: number;
        /** The bounding box of the layer. */
        bounds: data.BoundingBox;
        /** Custom dimension values supported by the layer. */
        dimensions: OgcDimension[];
    }

    /** A collection of sub layers used by the SimpleDataLayer class for rendering shapes. */
    export interface SimpleDataLayerGroup {
        /** The layer used for rendering polygon areas. */
        polygonLayer: layer.PolygonLayer;
        /** The layer used for rendering lines and polygon outlines. */
        lineLayer: layer.LineLayer;
        /** The layer used for rendering extruded polygons. */
        extrudedPolygonLayer: layer.PolygonExtrusionLayer;
        /** The layer used for rendering point features that don't have an image icon and cluster areas. */
        bubbleLayer: layer.BubbleLayer;
        /** The layer used for rendering points features that have an image icon or text. */
        symbolLayer: layer.SymbolLayer;
    }

    /** Options used to customize how the SimpleDataLayer renders. */
    export interface SimpleDataLayerOptions {
        /**
         * If a point feature has a `title` or `name` property,
         * this option specifies if it should be displayed on the map under the marker.
         * Default: `false`
         * @default false
         */
        showPointTitles?: boolean;
        /**
         * Specifies if popups should appear when shapes are clicked.
         * Default: `true`
         * @default true
         */
        enablePopups?: boolean;
        /**
         * Specifies if polygons that have a `height` property should be rendered as extruded polygons.
         * Default: `true`
         * @default true
         */
        allowExtrusions?: boolean;
        /**
         * A boolean indicating if the layer is visible or not.
         * Default: `true`
         * @default true
         */
        visible?: boolean;
        /**
         * A popup template that will be used if a shape doesn't have a popupTemplate property itself.
         */
        popupTemplate?: PopupTemplate;
    }

    /** Options used for reading delimited files. */
    export interface SpatialCsvReadOptions extends BaseSpatialDataReadOptions {
        /**
         * Header information for each column in the delimited file.
         * If not specified, the first row in the data will be used.
         */
        header?: CsvHeader;
        /**
         * If no header information is specified, or the header does not contain type information.
         * Each cell value will be analyzed to determine if it is a number, boolean or date and parsed accordingly.
         * Default: `false`
         * @default false
         */
        dynamicTyping?: boolean;
        /**
         * The delimiter character that separates the cells in a row of data.
         * If set to `"auto"`, the data will be analyzed and a suitable delimiter will be chosen from `","` `"|"`, `"\t"`.
         * Default: `"auto"`
         */
        delimiter?: string;
    }

    /** Options for writing delimited files. */
    export interface SpatialCsvWriteOptions extends SpatialDataWriteOptions {
        /**
         * Specifies how the GeoJSON data should be written.
         * If set to 'latlon' and the geometry is a Point type a latitude and longitude columns will be added.
         * If the geometry is not a Point, its row will not be written.
         * If set to 'latlonelv' an elevation column will also be added.
         * Elevation data will be retrieved from 3rd value in position of Point if specified or by set to 0.
         * If set to 'wkt' the geometry value will be written as a Well-Known Text string.
         * Default: `"wkt"`
         * @default "wkt"
         */
        spatialformat?: "latlon" | "latlonelv" | "wkt";
        /**
         * If `spatialformat` is "latlon" or "latlonelv" this specifies
         * the name of the latitude column to be written in the header.
         * Default: `"lat"`
         * @default "lat"
         */
        latColName?: string;
        /**
         * If `spatialformat` is "latlon" or "latlonelv" this specifies
         * the name of the longitude column to be written in the header.
         * Default: `"lon"`
         * @default "lon"
         */
        lonColName?: string;
        /**
         * If `spatialformat` is 'latlonelv' this specifies
         * the name of the elevation column to be written in the header.
         * Default: `"elv"`
         * @default "elv"
         */
        elvColName?: string;
        /**
         * The column name for the column in which the GeoJSON geometry is written to.
         * Default: `"geo"`
         * @default "geo"
         */
        geoColName?: string;
        /**
         * The delimiter character that separates the cells in a row of data.
         * Default: `","`
         * @default ","
         */
        delimiter?: string;
        /**
         * Specifies the value that wraps text strings that contain the delimiter.
         * Default: `"`
         * @default "
         */
        textQualifier?: string;
        /** Specifies if OData type information should be included in the header beside each column name in brackets.
         * Possible type values: string, number, boolean, date, geography
         * Default: false
         * @default false
         */
        includeTypesInHeader?: boolean;
    }

    /**
     * A set of common properties that may be included in feature properties
     * capture style information and common content when reading or writing a spatial data.
     * The SimpleDataLayer uses these properties to dynamically style the data it renders.
     * Most of these are the property values used in the geometries respective layer options.
     */
    export interface SimpleStyleProperties extends Record<string, any> {
        /** A common title field. Some XML files use 'name' instead, this value will be copied to this property. */
        title?: string;
        /** A common description field. Some XML files use 'desc' instead, this value will be copied to this property. */
        description?: string;
        /** For points, the color when displayed on a bubble layer.  */
        color?: string;
        /** For points, the icon image name when displayed in a Symbol layer. */
        image?: string;
        /** For points, the URL to a icon image. Can be a data URI or a URL that points to a CORs enabled endpoint.  */
        imageUrl?: string;
        /** For points, the scale value to apply to icons when displayed in the symbol or bubble layer. */
        size?: number;
        /** For points, the rotation value to apply to icons when displayed in the symbol layer. */
        rotation?: number;
        /** For points, the icon offset value to apply to icons when displayed in the symbol layer. */
        offset?: [number, number];
        /** For lines and polygons, the color of a line or our polygon outline.  */
        strokeColor?: string;
        /** For lines and polygons, the opacity of a line or our polygon outline. */
        strokeOpacity?: number;
        /** For lines and polygons, the width of a line or our polygon outline.   */
        strokeWidth?: number;
        /** For polygons, the fill color of a polygon.  */
        fillColor?: string;
        /** For polygons, the opacity of fill color. */
        fillOpacity?: number;
        /** For extruded polygons, this value represents the height of the polygon in meters. */
        height?: number;
        /** For extruded polygons, this value represents the how high the polygon is above the ground in meters. */
        base?: number;
        /** If the feature is visible or not. */
        visible?: boolean;
        /** Icon anchor value. */
        anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
        /** A template used to define how content is rendered inside of a popup. */
        popupTemplate?: PopupTemplate;
    }

    /**
     * Options that customize how spatial files are read and parsed.
     */
    export type SpatialDataReadOptions = BaseSpatialDataReadOptions & BaseSpatialXmlReadOptions & GmlReadOptions & GpxReadOptions & KmlReadOptions & SpatialCsvReadOptions;

    /**
     * A data object that contains a set of features and/or kml ground overlays.
     * This is an extension of the FeatureCollection class thus allowing it to easily be added to a data source.
     */
    export class SpatialDataSet implements data.FeatureCollection {
        readonly type = "FeatureCollection";
        /** Bounding box of all the data in the data set. */
        bbox: data.BoundingBox;
        /** GeoJSON features within the data set. */
        features: Array<data.Feature<data.Geometry, SimpleStyleProperties>>;
        /** An array of KML GroundOverlays. */
        groundOverlays: Array<layer.ImageLayer | atlas.layer.OgcMapLayer>;
        /** Property information provided at the document level of a spatial data set. */
        properties: any;
        /** Statistics about the content and processing time of a spatial data set. */
        stats: SpatialDataSetStats;
        /** A set of icon URL's. Key = icon name, Value = URL. */
        icons: Record<string, string>;
        /**
         * Enriches a data set by calculating its bounds, stats,
         * and generating summary information if not already available.
         * @param data The data set to enrich.
         */
        static enrich(data: SpatialDataSet): void;
        /**
         * Merges one spatial data set into the other.
         * @param a The primary data set to merge the data into.
         * @param b The secondary data set to merge into the primary data set.
         */
        static merge(a: SpatialDataSet, b: SpatialDataSet): void;
        /**
         * Calculates the stats for a spatial data set.
         * @param data The data set to calculate the stats for.
         */
        static computeStats(data: SpatialDataSet): void;
        /**
         * Retrieves the bounding box of the data set. If not set on the data set, will calculate it.
         * @param data The data set to calculate the bounding box for.
         */
        static getBounds(data: SpatialDataSet): data.BoundingBox;
    }

    /**
     * Statistics about the content and processing time of a XML feed.
     */
    export interface SpatialDataSetStats {
        /** Number of GeoJSON Point objects in the XML feed. */
        numPoints?: number;
        /** Number of GeoJSON LineString objects in the XML feed. */
        numLineStrings?: number;
        /** Number of GeoJSON Polygon objects in the XML feed. */
        numPolygons?: number;
        /** Number of atlas.data.Position objects in the XML feed. */
        numPositions?: number;
        /** Number of KML Ground Overlays in the XML feed. */
        numGroundOverlays?: number;
        /** The number of network links in the XML feed. */
        numNetworkLinks?: number;
        /** The number of characters in the XML feed. */
        numCharacters?: number;
        /** The amount of time in ms it took to process the XML feed. */
        processingTime?: number;
    }

    /** Base options for writing spatial data. */
    export interface SpatialDataWriteOptions {
        /**
         * The spatial data format to write the shapes to.
         * Default: `"GeoJSON"`
         * @default "GeoJSON"
         */
        format?: "KML" | "GPX" | "GeoRSS" | "GML" | "GeoJSON" | "CSV";
    }

    /** Options that are used to customize how to write XML. */
    export interface SpatialXmlWriteOptions extends SpatialDataWriteOptions {
        /**
         * A boolean indicating if the generated XML should be use new lines and indents
         * to make the generated nicely formatted.
         * Default: `true`
         * @default true
         */
        prettyPrint?: boolean;
        /**
         * A boolean indicating if Position and BoundingBox values should be rounded off to 6 decimals.
         * Default: `false`
         * @default false
         */
        roundPositions?: boolean;
        /**
         * The characters to use to create a new line in the XML data.
         * Default: `"\r\n"`
         * @default "\r\n"
         */
        newLineChars?: string;
        /**
         * The characters to use to create an indent in the XML data.
         * Default: `"\t"`
         * @default "\t"
         */
        indentChars?: string;
        /**
         * Specifies if ID values should be written.
         * Default: false
         * @default false
         */
        writeIds?: boolean;
    }

    /** The capabilities of a WFS service. */
    export interface WfsCapabilities {
        /** Title of service. */
        title?: string;
        /** Description of service. */
        abstract?: string;
        /** The version of the WFS service. */
        version: string;
        /** The feature types available in the service. */
        featureTypes: WfsFeatureType[];
        /** Supported operations of service. */
        operations: string[];
        /** The name of the service provider. */
        providerName?: string;
        namespaces: Record<string, string>;
    }

    /** Options for requesting features from a WFS service. */
    export interface WfsFeatureRequest {
        /** The feature type names. */
        typeNames?: string | string[];
        /** The id of a feature to retrieve. */
        featureId?: string;
        /** Start index to use for WFS paging. */
        startIndex: number;
        /** Number of features to retrieve when paging. */
        count: number;
        /** Method describing how results should be sorted. */
        sortBy: string;
        /** A comma delimited list of property names to return. */
        propertyNames?: string;
        /** Filter condition. Must not be used with BBOX option. */
        filter?: atlas.io.ogc.filter.Filter;
        /** Bounding Box limit. Must not be used with Filter. */
        bbox?: data.BoundingBox;
        /** A custom CQL filter to append to the request. */
        cql_filter?: string;
        /**
         *  Specifies which SRS value to use if a valid one is not specified in the capabilities.
         *  Some WFS services support reprojection on the fly and thus do not list every possible supported SRS.
         *  If set to null, and not supported SRS found in capabilities, an error will be thrown.
         *  Default: 'urn:ogc:def:crs:EPSG::4326'
         */
        fallbackSrs?: string;
        /** A key-value object containing additional parameters to append the request. */
        customDimensions?: Record<string, string>;
    }

    /** Information about a feature type in a WFS service. */
    export interface WfsFeatureType {
        /** A name identifier for the feature type. */
        name?: string;
        /** A title for the feature type. */
        title?: string;
        /** A description of the feature type. */
        abstract?: string;
        /** The bounding box in which the feature type can be found. */
        bounds?: data.BoundingBox;
        /** The default spatial reference identifier for accessing the feature type. */
        defaultSrs?: string;
        /** Additional spatial reference identifier for accessing the feature type. */
        otherSrs?: string[];
    }

    /** Details about a feature type. */
    export interface WfsFeatureTypeDescription {
        /** The name of the feature type. */
        name: string;
        /** The namespace of the feature type. */
        namespace: string;
        /** The namespace prefix used in combination with the feature type name. */
        namespacePrefix: string;
        /** The value type of each property. */
        propertyTypes: Record<string, string>;
        /** The first property the contains geometry data. */
        geomPropertyName: string;
        /** The capability of the feature type as captured from GetCapabilities. */
        capability: WfsFeatureType;
    }

    /** Options for connecting to a WFS service. */
    export interface WfsServiceOptions {
        /**
         * A URL pointing to the WFS service endpoint.
         * WFS service must be on the same domain or have CORs enabled on the server.
         */
        url: string;
        /** Used to transform requests made to the service. The resource type will be "WMTS". */
        transformRequest?: (url: string, resourceType: string) => RequestParameters;
        /**
         * A URL to a proxy service that can have a URL to an external service appended it.
         * This will be needed to access services that are hosted on non-CORs enabled endpoints.
         */
        proxyService?: string;
    }

    export module io {
        /**
         * Takes a spatial data string or a URL to a file or zipped file and parses the spatial data into GeoJSON objects.
         * Supported spatial data formats: KML, KMZ, GPX, GeoRSS, GML, spatial delimited files (CSV), GeoJSON.
         * @param spatialData The spatial data string or URL to a file to read.
         * @param options The read options.
         */
        export function read(spatialData: string | ArrayBuffer | Blob, options?: SpatialDataReadOptions): Promise<SpatialDataSet>;
        /**
         * Writes GeoJSON object data as a geospatial XML string in the specified format.
         * @param data The GeoJSON objects to retrieve shapes from, to write.
         * @param options A set of options that customize how the XML is written.
         */
        export function write(data: source.DataSource | data.FeatureCollection | layer.ImageLayer | atlas.layer.OgcMapLayer | data.Feature<data.Geometry, any> | SpatialDataSet | Array<source.DataSource | data.FeatureCollection | layer.ImageLayer | atlas.layer.OgcMapLayer | data.Feature<data.Geometry, any> | SpatialDataSet>, options?: SpatialXmlWriteOptions & GmlWriteOptions & SpatialCsvWriteOptions): Promise<string>;
        /**
         * Writes GeoJSON object data to a geospatial XML file embedded in a compressed file.
         * The spatial file in the zip file will be names 'doc' and will be assigned an appropriate file extension.
         * Possibly file extensions include; xml, kml, json, csv, tsv, txt.
         * @param data The GeoJSON objects to retrieve shapes from, to write.
         * @param compressFormat The compressed file format to use. Options: Base64 (Data URI), Blob, or ArrayBuffer
         * @param options A set of options that customize how the data is written.
         */
        export function writeCompressed(data: source.DataSource | data.FeatureCollection | layer.ImageLayer | atlas.layer.OgcMapLayer | data.Feature<data.Geometry, any> | SpatialDataSet | Array<source.DataSource | data.FeatureCollection | layer.ImageLayer | atlas.layer.OgcMapLayer | data.Feature<data.Geometry, any> | SpatialDataSet>, compressFormat?: "Base64" | "Blob" | "ArrayBuffer", options?: SpatialXmlWriteOptions & GmlWriteOptions & SpatialCsvWriteOptions): Promise<string | ArrayBuffer | Blob>;

        export module core {
            /** A class that reads data from a delimited data set. */
            export class CsvReader {
                private _delimitedData;
                private EOS;
                private EOL;
                private _position;
                private _length;
                private _delimiter;
                private _textQualifier;
                /**
                 * Reads data as a delimited data set.
                 * @param delimitedData The data to read as delimited data.
                 * @param delimiter The delimiter value to split the cells by. If set to 'auto',
                 * the data will be analyzed and a suitable delimiter will be chosen from ',' '|', '\t'. Default: ","
                 * @param textQualifier The value used to wrap text strings. Default quite (")
                 */
                constructor(delimitedData: string, delimiter?: string, textQualifier?: string);
                /**
                 * Reads the full delimited data string into a 2D array of strings. [row][cell]
                 */
                read(): string[][];
                /**
                 * Reads the next row of the delimited file.
                 */
                getNextRow(): string[];
                /**
                 * Gets the next cell value from the delimited file.
                 */
                private _getNextCell;
                /**
                 * Gets the character for the current position in the delimited data string unless told to get the next character.
                 * @param getNextChar Specifies if the next character in the delimited data string should be returned.
                 */
                private _getChar;
            }

            /** A class that writes data as a delimited data set. */
            export class CsvWriter {
                private _delimiter;
                private _textQualifier;
                private _writer;
                private _numCols;
                /**
                 * Writes data as a delimited data set.
                 * @param delimiter The delimiter value to split the cells by. Default: ","
                 * @param textQualifier The value used to wrap text strings. Default quote (")
                 */
                constructor(delimiter?: string, textQualifier?: string);
                /** Resets the writer to its initialized state and removes any data it contains. */
                clear(): void;
                /**
                 * Writes multiple rows of data as a delimited string.
                 * @param data The data to convert into a delimited string.
                 * @param header Optional. Header name for each column.
                 */
                write(data: any[][]): void;
                /**
                 * Writes a row as a delimited string.
                 */
                writeRow(data: any[]): void;
                /**
                 *  Writes the content of the CsvWriter.
                 */
                toString(): string;
                /**
                 * Writes a row of data.
                 * @param data An array of data to write as a row.
                 */
                private _writeRow;
                /**
                 * Get a data value as a string.
                 * @param value The value of the data.
                 */
                private _getStringValue;
            }

            /**
             * A static class that reads GML data.
             */
            export class GmlReader {
                /**
                 * A regular expression that looks for coordinates in the format
                 * longitude1, latitude1 longitude2, latitude2
                 */
                private static _coordinate2Rx;
                /**
                 * A regular expression that looks for coordinates in the format
                 * longitude1, latitude1, altitude1 longitude2, latitude2, altitude2
                 */
                private static _coordinate3Rx;
                /**
                 * An array of tag names that could represent coordinates.
                 */
                private static _coordinateTags;
                /**
                 * Reads GeoJSON objects from a string that is in GML format.
                 * @param gml The GML string to read.
                 * @param options Options to use when parsing GML data.
                 */
                static read(gml: string, options?: GmlReadOptions): ExtendedFeatureCollection;
                /**
                 * Reads a GML Geometry; Feature, Point, LineString, Polygon, MultiPoint,
                 * MultiLineString, MultiPolygon, MultiSurface, MultiCurve.
                 * Other Spatial XML files such as GeoRSS often have embedded GML geometries in them.
                 * @param gmlNode A GML node to parse.
                 * @param options Options to use when parsing GML data.
                 */
                static readGeometry(gmlNode: string | XmlNode, options?: GmlReadOptions): data.Feature<data.Geometry, any>;
                /**
                 * Parses a GML Geometry; Feature, Point, LineString, Polygon, MultiPoint,
                 * MultiLineString, MultiPolygon, MultiSurface, MultiCurve.
                 * Other Spatial XML files such as GeoRSS often have embedded GML geometries in them.
                 * @param node A GML node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseGeometry;
                /**
                 * Parse GML FeatureCollection and MultiGeometry objects into a GeoJSON FeatureCollection.
                 * @param node A GML node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseFeatureCollection;
                /**
                 * Recursively step through nodes looking for geometry objects.
                 * @param node The node to step through.
                 * @param metadata A metadata object to store all non-geometry data in.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _tryParseFeature;
                /**
                 * Parses a GML feature into a GeoJSON feature.
                 * @param node A GML feature node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseFeature;
                /**
                 * Parses metadata from a node.
                 * @param node The node containing metadata.
                 * @param metadata The metadata object to store the value in.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseMetadata;
                /**
                 * Parses an Envelope object as a GeoJSON Bounding box.
                 * @param node A GML Envelope node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseEnvelope;
                /**
                 * Parses a GML Point node into a GeoJSON Point feature.
                 * @param node A GML Point node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parsePoint;
                /**
                 * Parses a GML LineString node into a GeoJSON LineString feature.
                 * @param node A GML LineString node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseLineString;
                /**
                 * Parses a GML Polygon node into a GeoJSON Polygon feature.
                 * @param node A GML Polygon node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parsePolygon;
                /**
                 * Parses MultiPoint, MultiLineString, MultiPolygon, MultiSurface and MultiCurve
                 * GML elements into GeoJSON Feature Geometry.
                 * @param node A GML MultiGeometry node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseMultiGeometry;
                /**
                 * Analyzes a node and tries to determine the coordinate dimensions,
                 * if the CRS is web mercator, and if the axis order should be inverted.
                 * @param node The GML node to analyze.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _analyzeNode;
                /**
                 * Parses a GML pos, posList or coordinates node into an array of GeoJSON Position objects.
                 * @param node A GML pos, posList or coordinates node to parse.
                 * @param details The options to use when parsing GML data and any details known about the data.
                 */
                private static _parseCoordinates;
            }

            /**
             * A static class that writes GML data.
             */
            export class GmlWriter {
                /**
                 * Writes a GeoJSON Geometry object as a GML formatted string.
                 * @param shape GeoJSON Geometry object to write.
                 * @param options Write options.
                 */
                static write(shape: data.Geometry | data.Feature<data.Geometry, any> | data.FeatureCollection | SpatialDataSet, options?: GmlWriteOptions, addEncodingTag?: boolean): string;
                /**
                 * Writes a GeoJSON Feature as GML.
                 * @param feature The feature to write.
                 * @param writer The XML writer.
                 * @param prefix The GML prefix.
                 * @param customNamespace Custom namespace used to define feature properties.
                 * @param attributes Attributes to append to the geometry.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundLocations Flag indicating if coordinates should be rounded off when writing.
                 * @param srsName The SRS name to append to the geometry.
                 */
                private static _writeFeature;
                /**
                 * Writes metadata properties on GML elements.
                 * Supports name, description, identifier and any specified custom namespace properties.
                 * Will try alternates:
                 * - name: title
                 * - description: desc
                 * @param metadata An object containing metadata information.
                 * @param writer The XML writer.
                 * @param prefix The GML prefix.
                 * @param customNamespace Custom namespace used to define feature properties.
                 */
                private static _writeMetadata;
                /**
                 * Writes a GeoJSON object based on its type and coordinates parts.
                 * @param geoType The type of GeoJSON object.
                 * @param positions The coordinate positions in the GeoJSON object.
                 * @param writer The XML writer.
                 * @param prefix The GML prefix.
                 * @param attributes Attributes to append to the geometry.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundPositions Flag indicating if coordinates should be rounded off when writing.
                 * @param metadata Any metadata properties associated with the shape.
                 */
                private static _writeGeometryByParts;
                /**
                 * Writes a Point as a GML Point.
                 * @param position The position of the point to write.
                 * @param writer The XML writer.
                 * @param prefix The namespace prefix to append to the tag.
                 * @param attributes Any attributes to add to the root tag element.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundPositions Indicates if positions should be rounded to 6 decimal places.
                 */
                private static _writePoint;
                /**
                 * Writes a GeoJSON LineString in GML format.
                 * @param positions The line positions to write.
                 * @param writer The XML writer.
                 * @param prefix The namespace prefix to append to the tag.
                 * @param attributes Any attributes to add to the root tag element.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundPositions Indicates if positions should be rounded to 6 decimal places.
                 */
                private static _writeLineString;
                /**
                 * Writes a Polygon in GML format.
                 * @param rings The Polygon rings to write.
                 * @param writer The XML writer.
                 * @param prefix The namespace prefix to append to the tag.
                 * @param attributes Any attributes to add to the root tag element.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundPositions Indicates if positions should be rounded to 6 decimal places.
                 */
                private static _writePolygon;
                /**
                 * Writes GeoJSON multi-geometry object using its type and coordinates as a GML Mutli-Geometry.
                 * @param geoType The GeoJSON geometry type
                 * @param coords The coordinates of the geometry.
                 * @param writer The XML writer.
                 * @param prefix The namespace prefix to append to the tag.
                 * @param tagNamePrefixLookup A lookup table of custom tag names mapped to its namespace prefix.
                 * @param attributes Any attributes to add to the root tag element.
                 * @param isStandalone Flag indicating if the XML is standalone and thus requires the namespace to be included.
                 * @param roundPositions Indicates if positions should be rounded to 6 decimal places.
                 */
                private static _writeMultiGeometryByParts;
                /**
                 * Writes a position coordinate in GML format.
                 * @param loc The position coordinate to write.
                 * @param writer The XML writer.
                 */
                private static _writeCoordinateValue;
                /**
                 * Writes a list of coordinates in GML format.
                 * @param locs The list of coordinates to write.
                 * @param closed A boolean that indicates if the list of coordinates should form a closed ring or not.
                 * @param writer The XML writer.
                 */
                private static _writeCoordinates;
            }

            /**
             * A simple and fast xml reader that converts an XML string into a JSON object.
             * Ignores tags that start with "<!" or "<?" as these are usually comments, XML schema, or doctype tags.
             * Supports CData tag: <![[CData ]]>
             * Can extract all namespaces in the document.
             */
            export class SimpleXmlReader {
                /** An index tracker when walking the xml string, character by character. */
                private _position;
                /** A list of all the namespaces found when parsing the XML string. */
                private _namespaces;
                /** A boolean that indicates if namespaces should be parsed for the document. */
                private _parseNamespaces;
                /** A Regex that looks for letters. */
                private _letterRx;
                /**
                 * A Regex that looks for the first character after the equal sign of an attribute name.
                 * Expect to find a quote (single or double), but if letter is found, will handle it.
                 * If > is found, then we reached the end of the tag.
                 */
                private _attributeStartRx;
                /**
                 * The possible characters that would mark the end of a tag or attribute name
                 */
                private _nameTerminator;
                /**
                 * A regular expression that looks for a namespace prefix.
                 */
                private _namespacePrefixRx;
                /**
                 * @constructor
                 * @param parseNamespaces A boolean that indicates if namespaces should be parsed for the document.
                 * Default: true.
                 */
                constructor(parseNamespaces?: boolean);
                /**
                 * Parse an XML string into an XmlDocument object.
                 * @param xml The xml string to parse.
                 * @returns An XmlDocument object generated from an xml string.
                 */
                parse(xml: string): XmlDocument;
                /**
                 * Parses the children of a node. This could be an array of child nodes, or a string.
                 * @param xml The xml string to parse.
                 * @returns The children of a node. This could be an array of child nodes, or a string.
                 */
                private _parseChildren;
                /**
                 * Recursively parse an xml node and its child nodes.
                 * @param xml The xml string to parse.
                 * @returns An XML node.
                 */
                private _parseNode;
                /**
                 * Parses the attribute values in the current node.
                 * @param xml The xml string to parse.
                 * @returns A set of attribute values in the current node.
                 */
                private _parseAttributes;
                /**
                 * Parses tag and attribute names.
                 * @param xml The xml string to parse.
                 * @returns A tag or attribute name.
                 */
                private _parseName;
                /**
                 * Advances the position until it finds the specified substring value.
                 * @param xml The xml string to parse.
                 * @param substring The substring value to search for.
                 */
                private _advancePositionToSubstring;
            }

            /**
             * A simple and fast XML writing class that makes it easy to efficiently build an XML string.
             */
            export class SimpleXmlWriter {
                /** An array that is used to  */
                private _xmlDocStringBuilder;
                /** A stack that keeps track of opened xml tags. */
                private _tagNameStack;
                /** The character to use as an indent XML. Default: \t */
                private _indentChars;
                /** The number of indents need per line. */
                private _indentLevel;
                /** The character to use as an indent XML. Default: \r\n */
                private _newLineChars;
                /** A boolean indicating if the generated XML should be formatted and use new lines and indents. */
                private _prettyPrint;
                /** A regular expression that checks to see if a string ends with a new line or tab character. */
                private _endsWithNewLineIndentRx;
                /**
                 * @constructor
                 * @param prettyPrint A boolean indicating if the generated XML should be formatted and use new lines and indents.
                 * Default: `true`.
                 * @param newLineChars The characters to use to create a new line in the XML data.
                 * Default: `"\r\n"`
                 * @param indentChars The characters to use to create an indent in the XML data.
                 * Default: `"\t"`
                 */
                constructor(prettyPrint?: boolean, newLineChars?: string, indentChars?: string);
                /**
                 * Clears all data in the XML writer and sets itself up to be used to write a new document.
                 */
                clear(): void;
                /**
                 * Starts an XML document.
                 * @param includeEncodingTag Specifies if the encoding tag should be added to the document. Default: True.
                 * @param encoding The string encoding value of the document.
                 * @param standalone A boolean indicating if the XML document is standalone or not.
                 */
                writeStartDocument(includeEncodingTag?: boolean, encoding?: string, standalone?: boolean): SimpleXmlWriter;
                /**
                 * Writes all the remaining closing tag in the tag name stack so as to close the document.
                 * @param addTrailingNewLineChar A boolean indicating if a trailing new line character should be added or not.
                 * Default: `true`
                 */
                writeEndDocument(addTrailingNewLineChar?: boolean): SimpleXmlWriter;
                /**
                 * Write a tag element.
                 * @param name The name of this tag.
                 * @param attributes The attributes for this tag.
                 * @param selfClosing A boolean indicating if this tag should be self closing or not.
                 */
                writeStartElement(name: string, attributes?: Record<string, string | number>, selfClosing?: boolean, skipIndent?: boolean): SimpleXmlWriter;
                /**
                 * Writes the closing tag of last tag that was opened.
                 * @param skipNewLine A boolean indicating if the new line character should not be added after the closing tag.
                 * Default: `false`.
                 */
                writeEndElement(skipNewLine?: boolean): SimpleXmlWriter;
                /**
                 * Writes a complete tag element.
                 * @param name The name of the tag element.
                 * @param content The content of the tag element.
                 * @param attributes The attributes for the tag.
                 */
                writeElement(name: string, content: any, attributes?: Record<string, string>): SimpleXmlWriter;
                /**
                 * Writes a value to XML writer.
                 * @param value Any value that is to be written.
                 */
                writeValue(value: any): SimpleXmlWriter;
                /**
                 * Writes a string value.
                 * @param value The string value to write.
                 * @param validate A boolean indicating if the writer should write the string as-is,
                 * or validate and escape of special characters.
                 */
                writeString(value: string, validate?: boolean): SimpleXmlWriter;
                /**
                 * Writes a content value inside of a CData tag.
                 * @param content The content value to write.
                 */
                writeCDataContent(content: string): SimpleXmlWriter;
                /**
                 * Writes a comment in the document.
                 * @param comment The comment to write add to the document.
                 */
                writeComment(comment: string): SimpleXmlWriter;
                /**
                 * Closes the document and returns a string version of the XML document.
                 */
                toString(): string;
                /**
                 * Adds a new line to the document and indents the nextline.
                 * Prevents duplicate newlines from being added.
                 */
                private _writeNewLineAndIndent;
                /**
                 * Checks to see if the XML String Builder ends with a new line or indent character.
                 */
                private _endsWithNewLineIndent;
                /**
                 * Escapes special XML characters in text.
                 * @param text The text to escape the special characters in.
                 */
                private _escapeSpecialChars;
            }

            /**
             * Represents an XML Document object.
             */
            export interface XmlDocument {
                /**
                 * A list of namespaces in the document. The key is the namespace prefix,
                 * and the value is the namespace URL.
                 */
                namespaces?: Record<string, string>;
                /**
                 * The root node of the XMl document.
                 */
                root?: XmlNode;
            }

            /**
             * Represents an XML Node object.
             */
            export interface XmlNode {
                /**
                 * The name of the node tag.
                 */
                tagName?: string;
                /**
                 * The namespace prefix.
                 */
                nsPrefix?: string;
                /**
                 * A list of attribute values on the node tag.
                 */
                attributes?: Record<string, string>;
                /**
                 * The child nodes of the node.
                 */
                childNodes?: XmlNode[];
                /**
                 * The value of the node.
                 */
                value?: string;
            }
        }

        export module ogc {
            /** A class that manages connections to an OGC Web Mapping Feature Service (WFS) */
            export class WfsClient {
                private _options;
                private _capabilities;
                private _featureDetails;
                private _allPropertyTypes;
                private _supportedOperations;
                /**
                 * A class for connecting to a OGC Web Feature Services (WFS). May require CORs or a proxy via transformRequest.
                 * @param options Options that define how to connect to a WFS service.
                 */
                constructor(options: WfsServiceOptions);
                /**
                 * Requests service metadata, which contains a description of the server’s information,
                 * content, and acceptable request parameter values.
                 */
                getCapabilities(): Promise<WfsCapabilities>;
                /**
                 * Retrieves details about one or more feature types. The order of the results may not align with input.
                 * @param featureTypeNames One or more feature type names to retrieve details for.
                 */
                describeFeatureTypes(featureTypeNames: string | string[]): Promise<WfsFeatureTypeDescription[]>;
                /**
                 * Queries features from the service and returns a GeoJSON FeatureCollection.
                 * Sets the WFS `resultType` parameter to `"results"`.
                 * If geometry details are filtered out, null will be returned.
                 * @param request The request details for the WFS service.
                 */
                getFeatures(request: WfsFeatureRequest): Promise<data.FeatureCollection>;
                /**
                 * Queries features from the service and returns a raw JSON response.
                 * This may not include geometery information depending on filter parameters.
                 * Sets the WFS `resultType` parameter to `"results"`.
                 * @param request The request details for the WFS service.
                 */
                getFeatureInfo(request: WfsFeatureRequest): Promise<Record<string, any>>;
                /**
                 * Retrieves the number of features that match the query. Sets the WFS `resultType` parameter to `"hits"`
                 */
                getFeatureCount(request: WfsFeatureRequest): Promise<number>;
                /**********************
                 * Private Methods
                 *********************/
                /**
                 * Queries the service and returns the raw XML response.
                 * @param request The request.
                 */
                private _queryFeatures;
                /**
                 * Parses the XML response of GetCapabilities.
                 * @param xml The XML to parse.
                 */
                private _parseCapabilities;
                /**
                 * Parses a feature type.
                 * @param node An XML node to parse.
                 * @param version WFS version
                 */
                private _parseFeatureType;
                /**
                 * Parses the response from the DescribeFeatureType request.
                 * @param xml The XML to parse.
                 */
                private _parseFeatureTypeDescription;
                /**
                 * Checks the XML response returned from the WMS service for exceptions.
                 * @param response The raw XML response string.
                 */
                private _checkForExceptions;
                /**
                 * Analyzes the specified set of feature type names and finds the best SRS id to use with all of them.
                 * A preference for WGS84, then mercator, then one of the extended SRS ids is used to pick which one to use.
                 * @param featureTypeNames List of feature types to analyze.
                 */
                private _getBestSrsName;
            }

            /**
             * A static class for reading/writing Well Known Text (WKT) strings as GeoJSON geometries.
             */
            export class WKT {
                /*******************
                 * Public Functions
                 *******************/
                /**
                 * Reads the data in well-known text format and returns the geometry.
                 * If the geometry is a GeometryCollection, an array of geometries is returned.
                 * @param wkt Well-known text string data that needs to be parsed into geometries.
                 */
                static read(wkt: string): data.Geometry[];
                /**
                 * Writes geometry data as well-known text.
                 * @param data Geometry data to be written as well-known text.
                 * Array of geometries will be written as geometry collections.
                 * @param coordinatePrecision The number of decimal places to round coordinates to. Default: 6.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 * If set to true and no elevation data in Position, will default to 0.
                 */
                static write(data: data.Geometry | data.Feature<data.Geometry, any> | Array<data.Geometry | data.Feature<data.Geometry, any>>, coordinatePrecision?: number, includeElev?: boolean): string;
                /*******************
                 * Private Functions
                 *******************/
                /**
                 * Parse the ring in well known text format and returns the positions
                 * @param wkt - ring that needs to be deserialized into positions
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseCoordinates;
                /**
                 * Parse the coordinate in well known text format and returns the position.
                 * @param wkt Coordinate that needs to be deserialized into position.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseCoordinate;
                /**
                 * Parse the well known text format and return a geometries.
                 * @param wkt Text that needs to be deserialized into geometries.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseGeometry;
                /**
                 * Parse the geometry collection in well known text format and returns the geometries.
                 * @param wkt Geometry collection that needs to be deserialized into geometries.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseGeometryCollection;
                /**
                 * Parse the point in wkt format and returns a point geometry.
                 * @param wkt point geometry in wkt format
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parsePoint;
                /**
                 * Parse the linestring in wkt format and returns a linestring geometry.
                 * @param wkt Linestring geometry in wkt format.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseLinestring;
                /**
                 * Parse the polygon in wkt format and returns a polygon.
                 * @param wkt Polygon in wkt format.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parsePolygon;
                /**
                 * Parse the MultiPoint in wkt format and returns a MultiPoint.
                 * @param wkt MultiPoint in wkt format.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseMultiPoint;
                /**
                 * Parse the MultiLineString in wkt format and returns a MultiLineString.
                 * @param wkt MultiLineString in wkt format.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseMultiLinestring;
                /**
                 * Parse the MultiPolygon in wkt format and returns a MultiPolygon.
                 * @param wkt MultiPolygon in wkt format.
                 * @param includeElev Specifies if elevation data should be captured.
                 */
                private static _parseMultiPolygon;
                /**
                 * Serializes a single coordinate into wkt format.
                 * @param writer The writer.
                 * @param position A single position.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeCoordinate;
                /**
                 * Serializes a list of coordinates into wkt format.
                 * @param writer The writer.
                 * @param pos Set of positions.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeCoordinates;
                /**
                 * Writes an array of rings as WKT.
                 * @param writer The writer.
                 * @param rings Array of rings to write.
                 * @param closed A boolean indicating if the ring should be closed or not.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeRings;
                /**
                 * Serializes a single GeoJSON Point into wkt format.
                 * @param writer The writer.
                 * @param point A single GeoJSON Point.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writePoint;
                /**
                 * Serializes a single LineString into wkt format.
                 * @param writer The writer.
                 * @param line A single LineString.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeLinestring;
                /**
                 * Serializes a single polygon into wkt format.
                 * @param writer The writer.
                 * @param polygon A single polygon.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writePolygon;
                /**
                 * Serializes a single MultiPoint into wkt format.
                 * @param writer The writer.
                 * @param mp A single MultiPoint.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeMultiPoint;
                /**
                 * Serializes a single MultiLineString into wkt format.
                 * @param writer The writer.
                 * @param ml A single MultiLineString.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeMultiLineString;
                /**
                 * Serializes a single MultiPolygon into wkt format.
                 * @param writer The writer.
                 * @param mp A single MultiPolygon.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _writeMultiPolygon;
                /**
                 * Serializes am array of geometries or features into wkt format.
                 * @param writer The writer.
                 * @param geoms An array of geometries or features.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 * @returns The wkt formatted string.
                 */
                private static _writeGeometryCollection;
                /**
                 * Serializes geometries and features into wkt format.
                 * @param writer The writer.
                 * @param data geometry, feature or array of geometries or features.
                 * @param decimalRounder A value used to round the decimals off to.
                 * @param includeElev Specifies if elevation data, stored in 3rd value of Position, should be written.
                 */
                private static _write;
            }

            export module filter {
                /** An add operator filter. */
                export class Add extends MathOperator {
                    /**
                     * An add operator filter.
                     * @param value1 The first value to pass into the operator.
                     * @param value2 The second value to pass into the operator.
                     */
                    constructor(value1: number | PropertyName | Filter, value2: number | PropertyName | Filter);
                }

                /** Represents an AND logic operator filter. */
                export class And extends LogicOperatorFilter {
                    /**
                     * Represents an AND logic operator filter.
                     * @param filters A group of filters to apply the AND logic operator to.
                     */
                    constructor(...filters: Filter[]);
                }

                /** Options for a binary comparison filter. */
                export interface BinaryComparisonOptions {
                    matchCase?: boolean;
                    matchAction?: "Any" | "All" | "One";
                }

                /** Abstract class for binary comparison operator filters. */
                export abstract class BinaryComparisonOpType extends Filter {
                    protected _options: any;
                    private _comparisonType;
                    private _value1;
                    private _value2;
                    _isSpatial: boolean;
                    /**
                     * Abstract class for binary comparison operator filters.
                     * @param comparisonType The type of comparison to perform.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(comparisonType: string, value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter | data.Geometry | data.Feature<data.Geometry, any> | data.BoundingBox, options?: any);
                    _buildContent(version: string): string;
                }

                /** Represents a custom defined XML Filter string component. Do not wrap with the <Filter> tag. */
                export class CustomFilter extends Filter {
                    private _xmlFilter;
                    /**
                     * Represents a custom defined XML Filter string component. Do not wrap with the <Filter> tag.
                     * @param xmlFilter The raw filter XML.
                     */
                    constructor(xmlFilter: string);
                    _buildContent(): string;
                    /**
                     * Generates an XML version of the filter.
                     * @param version The WFS service version.
                     */
                    toXml(version?: string): string;
                }

                /** A divide operator filter. */
                export class Div extends MathOperator {
                    /**
                     * A divide operator filter.
                     * @param value1 The first value to pass into the operator.
                     * @param value2 The second value to pass into the operator.
                     */
                    constructor(value1: number | PropertyName | Filter, value2: number | PropertyName | Filter);
                }

                /** Abstract filter class in which all other filters inherit from. */
                export abstract class Filter {
                    abstract _buildContent(version: string): string;
                    /**
                     * Generates an XML version of the filter.
                     * @param version The WFS service version.
                     */
                    toXml(version?: string): string;
                    static _serializeValue(value: PropertyName | Literal | Filter | data.Geometry | data.Feature<data.Geometry, any> | data.BoundingBox, version: string, srsName?: string): string;
                }

                /**
                 * Represents a filter on the GML id of a shape.
                 * Uses ogc:GmlObjectId for version 1.1.0 and fes:ResourceId for all other versions.
                 * Version 1.0.0 typically does not support this filter.
                 */
                export class Id extends Filter {
                    private _id;
                    /**
                     * Represents a filter on the GML id of a shape.
                     * Uses ogc:GmlObjectId for version 1.1.0 and fes:ResourceId for all other versions.
                     * Version 1.0.0 typically does not support this filter.
                     * @param id The id to filter on.
                     */
                    constructor(id: string);
                    _buildContent(version: string): string;
                }

                /** Checks to see if a value is between two other specified values. */
                export class IsBetween extends Filter {
                    protected _options: BinaryComparisonOptions;
                    private _value;
                    private _lowerBoundary;
                    private _upperBoundary;
                    /**
                     * Checks to see if a value is between two other specified values.
                     * @param value The value to compare.
                     * @param lowerBoundary The minimum value of the comparison.
                     * @param upperBoundary The maximum value of the comparison.
                     * @param options Options for the comparison.
                     */
                    constructor(value: PropertyName | Literal | Filter, lowerBoundary: Literal, upperBoundary: Literal, options?: BinaryComparisonOptions);
                    _buildContent(version: string): string;
                }

                /** Compares two values to see if they are equal. */
                export class IsEqual extends BinaryComparisonOpType {
                    /**
                     * Compares two values to see if they are equal.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if one value is greater than another. */
                export class IsGreaterThan extends BinaryComparisonOpType {
                    /**
                     * Checks to see if one value is greater than another.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if one value is greater than or equal to another. */
                export class IsGreaterThanOrEqual extends BinaryComparisonOpType {
                    /**
                     *  Checks to see if one value is greater than or equal to another.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if one value is less than another. */
                export class IsLessThan extends BinaryComparisonOpType {
                    /**
                     * Checks to see if one value is less than another.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if one value is less than or equal to another. */
                export class IsLessThanOrEqual extends BinaryComparisonOpType {
                    /**
                     * Checks to see if one value is less than or equal to another.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if a value is like another using a wild card search. */
                export class IsLike extends BinaryComparisonOpType {
                    /**
                     * Checks to see if a value is like another using a wild card comparison.
                     * @param propertyName The name of the property to containing the value to compare.
                     * @param literal The value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(propertyName: string, literal: string, options: LikeOptions);
                }

                /** Checks to see if a value is nil. */
                export class IsNil extends BinaryComparisonOpType {
                    /**
                     * Checks to see if a value is nil.
                     * @param value The value to check.
                     * @param options Options for the comparison.
                     */
                    constructor(value: PropertyName | Literal | Filter, options: IsNilOptions);
                }

                /** Options for an IsNil filter. */
                export interface IsNilOptions extends BinaryComparisonOptions {
                    nilReason?: "noValue" | "valueUnknown";
                }

                /** Compares two values to see if they are not equal. */
                export class IsNotEqual extends BinaryComparisonOpType {
                    /**
                     * Compares two values to see if they are not equal.
                     * @param value1 The first value to compare.
                     * @param value2 The second value to compare.
                     * @param options Options for the comparison.
                     */
                    constructor(value1: PropertyName | Literal | Filter, value2: PropertyName | Literal | Filter, options?: BinaryComparisonOptions);
                }

                /** Checks to see if a value is null. */
                export class IsNull extends BinaryComparisonOpType {
                    /**
                     * Checks to see if a value is null.
                     * @param value The value to check.
                     * @param options Options for the comparison.
                     */
                    constructor(value: PropertyName | Literal | Filter, options: BinaryComparisonOptions);
                }

                /** Options for a Like filter. */
                export interface LikeOptions extends BinaryComparisonOptions {
                    wildCard?: string;
                    singleChar?: string;
                    escapeChar?: string;
                }

                /** A literal value type. string, number, boolean, or Date */
                export type Literal = string | number | boolean | Date;

                /** Represents a logic operator filter. */
                export abstract class LogicOperatorFilter extends Filter {
                    private _filters;
                    private _operator;
                    /**
                     * Represents a logic operator filter.
                     * @param operator The logic operator to apply to the group of filters.
                     * @param filters A group of filters to apply a logic operator to.
                     */
                    constructor(operator: string, filters: Filter[]);
                    _buildContent(version: string): string;
                }

                /** An abstract class in which all math operator filters inherit from. */
                export abstract class MathOperator extends Filter {
                    protected _operator: string;
                    protected _value1: number | PropertyName | Filter;
                    protected _value2: number | PropertyName | Filter;
                    constructor(operator: string, _value1: number | PropertyName | Filter, _value2: number | PropertyName | Filter);
                    _buildContent(version: string): string;
                }

                /** A multiply operator filter. */
                export class Mul extends MathOperator {
                    /**
                     * A multiply operator filter.
                     * @param value1 The first value to pass into the operator.
                     * @param value2 The second value to pass into the operator.
                     */
                    constructor(value1: number | PropertyName | Filter, value2: number | PropertyName | Filter);
                }

                /** Represents an NOT logic operator filter. */
                export class Not extends Filter {
                    private _filter;
                    constructor(filter: Filter);
                    _buildContent(version: string): string;
                }

                /** Represents an OR logic operator filter. */
                export class Or extends LogicOperatorFilter {
                    /**
                     * Represents an Or logic operator filter.
                     * @param filters A group of filters to apply the OR logic operator to.
                     */
                    constructor(...filters: Filter[]);
                }

                /** Property name value. */
                export class PropertyName {
                    private _name;
                    constructor(name: string);
                    /**
                     * Generates an XML version of the property name.
                     * @param version The WFS service version.
                     */
                    toXml(version?: string): string;
                }

                /** A subtract operator filter. */
                export class Sub extends MathOperator {
                    /**
                     * A subtract operator filter.
                     * @param value1 The first value to pass into the operator.
                     * @param value2 The second value to pass into the operator.
                     */
                    constructor(value1: number | PropertyName | Filter, value2: number | PropertyName | Filter);
                }
            }
        }
    }

    export module layer {
        /**
         *  Renders raster tiled images on top of the map tiles from an OGC Web Mapping Service (WMS or WMTS).
         */
        export class OgcMapLayer extends layer.TileLayer {
            private _isInitialized;
            private _options;
            /*************************
            * Constructor
            *************************/
            /**
             * Renders raster images on top of the map tiles from an OGC Web Mapping Service (WMS or WMTS).
             * @param options Options for rendering the WMS layer.
             */
            constructor(options: OgcMapLayerOptions);
            /*************************
            * Public Methods
            *************************/
            /** Gets the capabilities of the underlying WMTS service. */
            getCapabilities(): Promise<OgcMapLayerCapabilities>;
            /** Gets the options of the WMS layer. */
            getOptions(): OgcMapLayerOptions;
            /**
             * Retrieves an array of WMS feature info objects at a point on the map.
             * If the service does not return a geometry, a Point feature for the specified position will be returned.
             * @param position The position on the map to request feature info for.
             */
            getFeatureInfo(position: data.Position): Promise<data.FeatureCollection>;
            /**
             * Gets feature info for the WMS layer as a HTML string. The result will be a HTML document string
             * and should be added to an IFrame when adding to an existing page. Returns null if no feature is found.
             * Requires the service to support 'text/html' format.
             * @param position The position on the map to request feature info for.
             */
            getFeatureInfoHtml(position: data.Position): Promise<string>;
            /**
             * Sets the options of the WMS layer.
             * @param options The options.
             */
            setOptions(options: OgcMapLayerOptions): void;
            /**
             * Initialization method for the layer which is called when added to the map.
             * @param map The map the layer has been added to.
             */
            onAdd(map: Map): void;
            onActiveLayersChanged: (layer: OgcMapLayer) => void;
            /*************************
            * Private Methods
            *************************/
            /**
             * Update the underlying tile layer.
             * @param needsNewTileUrl Specifies if a new tile URL needs to be generated.
             * @param bringIntoView Specifies if the map should be brought into view.
             */
            private _updateLayer;
        }

        /**
         * A layer that simplifies the rendering of geospatial data on the map.
         * **Note:** Because this layer wraps other layers which will be added/removed with this
         * some layer ordering operations are not supported.
         * Adding this layer before another, adding another layer before this, and moving this layer are not supported.
         * These restrictions only apply to this layer and not the layers wrapped by this.
         */
        export class SimpleDataLayer extends layer.Layer {
            /** The data source for the rendering layers. */
            private _datasource;
            /** The rendering layers. */
            private _layers;
            /** The layer options, starts with everything undefined */
            private _options;
            /** A popup assigned to the layer. */
            private _popup;
            /**
             * Constructs a new SimpleDataLayer.
             * @param datasource The data source that contains the data.
             * @param options The options of the simple data layer.
             */
            constructor(datasource: source.DataSource, options?: SimpleDataLayerOptions);
            /** Closes the popup. */
            closePopup(): void;
            /** Cleans up any resources this layer is consuming. */
            dispose(): void;
            /**
             * Gets the group of layers wrapped by this class, used for rendering data.
             */
            getLayers(): SimpleDataLayerGroup;
            /** Gets the options of the layer. */
            getOptions(): SimpleDataLayerOptions;
            /**
             * Sets the options of the layer.
             * @param options The new options for the layer.
             */
            setOptions(options: SimpleDataLayerOptions): void;
            /** The event logic that processes when the layer is added to the map. */
            onAdd(map: Map): void;
            /** The event logic that processes when the layer is removed from the map. */
            onRemove(): void;
            /** Event handler for when a DataSource updates. */
            private _dataSourceUpdated;
            /** Mouse click event handler */
            private _mouseClick;
            /** Hover event handler. */
            private _mouseEnter;
            /** Mouse mouse leave event handler. */
            private _mouseLeave;
            /**
             * Handler for when a zoom level has been calculated for a cluster.
             * @param cluster The cluster the zoom level was calculated for.
             */
            private _getZoomClusterHandler;
            /**
             * Opens a popup for a shape.
             * @param shape The shape to open the popup for.
             * @param mousePosition The mouse position to fallback to if the shape is not a point.
             */
            private _showPopup;
        }
    }
}