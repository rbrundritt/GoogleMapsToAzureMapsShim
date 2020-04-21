﻿/** 
 *  Modified type definitions to simplify development of shim. 
 *  If you want official type definitions, use the NPM package:  
 */

declare namespace atlas {

    //data classes
    export module data {

        /**
         * A GeoJSON Position object - an array that specifies the longitude and latitude of a location. The
         * full description is detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.1}.
         */
        export class Position extends Array<number> {

            /**
             * Constructs a Position.
             * @param longitude The position's longitude.
             * @param latitude The position's latitude.
             * @param elevation The position's elevation.
             */
            constructor(longitude: number, latitude: number, elevation?: number);
            /**
             * Clones a position.
             * @param position The position to clone.
             */
            static fromPosition(position: Position): Position;
            /**
             * Compares the longitude and latitude values of two positions to see if they are equal at an accuracy of 6 decimal places.
             * @param pos1 First position to compare.
             * @param pos2 Second position to compare.
             * @param precision The number of decimal places to compare to. Default: 6.
             * @returns A boolean indicating if two positions to see if they are equal at an accuracy of the specified precision or 6 decimal places.
             */
            static areEqual(pos1: Position, pos2: Position, precision?: number): boolean;
            /**
             * Generates a Position object from an object that contains coordinate information.
             * The object is scanned for the following properties using a case insensitive test.
             * Longitude: lng, longitude, lon, x
             * Latitude: lat, latitude, y
             * Elevation: elv, elevation, alt, altitude, z
             * @param latLng The object to extract coordinate information from.
             * @returns A Position object that represents the provided LatLng information.
             */
            static fromLatLng(latLng: object): Position;
            /**
             * Generates a Position object from latitude and longitude values.
             * @param lat The latitude value.
             * @param lng A longitude value.
             * @param elv An elevation value in meters.
             * @returns A Position object that represents the provided LatLng information.
             */
            static fromLatLng(lat: number, lng: number, elv?: number): Position;
            /**
             * Generates a Position object from an array that has the format; [lat, lng] or [lat, lng, elv]
             * @param latLng An array that contains latitude/longitude information in the format; [lat, lng] or [lat, lng, elv]
             * @returns A Position object that represents the provided LatLng information.
             */
            static fromLatLng(latLng: number[]): Position;
            /**
             * Converts an array of objects that contain coordinate information into an array of Positions. Objects that can't be converted are discarded.
             * Each object is either an array in the format; [lat, lng] or [lat, lng, elv], or an object with the any combination of the following properties:
             * Longitude: lng, longitude, lon, x
             * Latitude: lat, latitude, y
             * Elevation: elv, elevation, alt, altitude, z
             * @param latLngs The objects that contain coordinate information.
             * @returns An array of Position objects that contain all the provided coordinate information.
             */
            static fromLatLngs(latLngs: Array<object | number[]>): Position[];
        }

        /**
         * A GeoJSON BoundingBox object - an array that defines a shape whose edges follow lines of constant longitude,
         * latitude, and elevation. All axes of the most southwesterly point are followed by all axes of the more northeasterly
         * point. The axes order of the BoundingBox follows the axes order of geometries. The full description is detailed in
         * [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-5}.
         */
        export class BoundingBox extends Array<number> {
            /**
             * Constructs a BoundingBox
             * @param positions Can be either [west, south, east, north] or [west, south, elevation1, east, north, elevation2]
             */
            constructor(positions: number[]);
            /**
             * Constructs a BoundingBox.
             * @param southwestPosition The southwestern most position of the bounding box.
             * @param northeastPosition The northeastern most position of the bounding box.
             */
            constructor(southwestPosition: Position, northeastPosition: Position);
            /**
             * Clones a bounding box.
             * @param boundingBox The bounding box to clone.
             */
            static fromBoundingBox(boundingBox: BoundingBox): BoundingBox;
            /**
             * Constructs a BoundingBox from the specified dimensions.
             * @param center The center position of the bounding box.
             * @param width The width of the bounding box.
             * @param height The height of the bounding box.
             */
            static fromDimensions(center: Position, width: number, height: number): BoundingBox;
            /**
             * Constructs a BoundingBox from the specified edges.
             * @param west The west edge of the bounding box.
             * @param south The south edge of the bounding box.
             * @param east The east edge of the bounding box.
             * @param north The north edge of the bounding box.
             */
            static fromEdges(west: number, south: number, east: number, north: number): BoundingBox;
            /**
             * Determines if a position is within a bounding box.
             * @param bounds The bounding box to see if the position is in.
             * @param position The position to see if it is in the bounding box.
             * @returns True if the position is within the bounding box.
             */
            static containsPosition(bounds: BoundingBox, position: Position): boolean;
            /**
             * Returns a boolean indicating if the bounding box crosses the antimeridian or not.
             * @param bounds The bounding box to check.
             * @returns A boolean indicating if the bounding box crosses the antimeridian or not.
             */
            static crossesAntimeridian(bounds: BoundingBox): boolean;
            /**
             * Calculates the center of a bounding box.
             * @param bounds A bounding box to calculate the center of.
             * @returns A position that represents the center of the bounding box.
             */
            static getCenter(bounds: BoundingBox): Position;
            /**
             * Gets the height of a bounding box in degrees.
             * @param bounds The bounding box to check.
             * @returns The height of the bounding box in degrees.
             */
            static getHeight(bounds: BoundingBox): number;
            /**
             * Gets the width of a bounding box in degrees.
             * @param bounds The bounding box to check.
             * @returns The width of the bounding box in degrees.
             */
            static getWidth(bounds: BoundingBox): number;
            /**
             * Returns the south west position of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The south west position of the bounding box.
             */
            static getSouthWest(bounds: BoundingBox): Position;
            /**
             * Returns the north east position of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The north east position of the bounding box.
             */
            static getNorthEast(bounds: BoundingBox): Position;
            /**
             * Returns the north west position of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The north west position of the bounding box.
             */
            static getNorthWest(bounds: BoundingBox): Position;
            /**
             * Returns the south east position of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The south east position of the bounding box.
             */
            static getSouthEast(bounds: BoundingBox): Position;
            /**
             * Returns the south position value of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The south position value of the bounding box.
             */
            static getSouth(bounds: BoundingBox): number;
            /**
             * Returns the west position value of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The west position value of the bounding box.
             */
            static getWest(bounds: BoundingBox): number;
            /**
             * Returns the north position value of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The north position value of the bounding box.
             */
            static getNorth(bounds: BoundingBox): number;
            /**
             * Returns the east position value of the bounding box.
             * @param bounds The bounding box to get the position from.
             * @returns The east position value of the bounding box.
             */
            static getEast(bounds: BoundingBox): number;
            /**
             * Determines is two bounding boxes intersect.
             * @param bounds1 The first bounding box to compare with.
             * @param bounds2 The second bounding box to compare with.
             * @returns true if the provided bounding boxes intersect.
             */
            static intersect(bounds1: BoundingBox, bounds2: BoundingBox): boolean;
            /**
             * Merges two bounding boxes together.
             * @param bounds1 The first bounding box to merge with.
             * @param bounds2 The second bounding box to merge with.
             * @returns A bounding box in the format [minLon, minLat, maxLon, maxLat].
             */
            static merge(bounds1: BoundingBox, bounds2: BoundingBox): BoundingBox;
            /**
             * Creates a BoundingBox that contains all provided Position objects.
             * @param positions An array of locations to use to generate the bounding box.
             * @returns A bounding box that contains all given positions.
             */
            static fromPositions(positions: Position[]): BoundingBox;
            /**
             * Creates a BoundingBox from any array of objects that contain coordinate information.
             * Each object is either an array in the format; [lat, lng] or [lat, lng, elv], or an object with the any combination of the following properties:
             * Longitude: lng, longitude, lon, x
             * Latitude: lat, latitude, y
             * Elevation: elv, elevation, alt, altitude, z
             * @param latLngs The objects that contain coordinate information.
             * @returns A BoundingBox that contains all the provided coordinate information.
             */
            static fromLatLngs(latLngs: Array<object | number[]>): BoundingBox;
            /**
             * Calculates the bounding box of a FeatureCollection, Feature, Geometry, Shape or array of these objects.
             * @param data The FeatureCollection, Feature, Geometry, Shape or array of these objects to calculate the bounding box for.
             * @returns A bounding box in the format [minLon, minLat, maxLon, maxLat].
             */
            static fromData(data: FeatureCollection | Feature<Geometry, any> | Geometry | Shape | Array<FeatureCollection | Feature<Geometry, any> | Geometry>): BoundingBox;
            /**
             * Splits a BoundingBox that crosses the Antimeridian into two BoundingBox's. One entirely west of the Antimerdian and another entirely east of the Antimerdian.
             * @param bounds
             */
            static splitOnAntimeridian(bounds: BoundingBox): BoundingBox[];
        }

        /**
         * A base Geometry object in which all geometry shapes extend; Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon, GeometryCollection
         */
        export type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;

        /**
         * A GeoJSON FeatureCollection object - a JSON object that contains a collection of GeoJSON features. The full
         * description is detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.3}.
         */
        export class FeatureCollection {
            /**
             * A static GeoJSON type descriptor for the FeatureCollection class to be used in runtime comparisons.
             */
            static readonly TYPE: string;
            /**
             * A GeoJSON type descriptor with value "FeatureCollection".
             */
            type: string;
            /**
             * The collection of GeoJSON features contained in the feature collection.
             */
            features: Array<Feature<Geometry, any>>;
            /**
             * The bounding box of the feature collection.
             */
            bbox?: BoundingBox;
            /**
             * Constructs a FeatureCollection.
             * @param features The collection of features that make up the feature collection.
             * @param bbox The bounding box of the feature collection.
             */
            constructor(features: Array<Feature<Geometry, any>>, bbox?: BoundingBox);
        }

        /**
         * A GeoJSON Feature object - a JSON object representing a spatially bounded entity. The full description is detailed in
         * [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.2}.
         */
        export class Feature<G extends Geometry, P extends any> {
            /**
             * A static GeoJSON type descriptor for the Feature class to be used in runtime comparisons.
             */
            static readonly TYPE: string;
            /**
             * A GeoJSON type descriptor with value "Feature".
             */
            type: string;
            /**
             * The geometry of the feature.
             */
            geometry: G;
            /**
             * The bounding box of the feature.
             */
            bbox?: BoundingBox;
            /**
             * The properties of the feature.
             */
            properties?: P;
            /**
             * The id of the feature.
             */
            id?: string | number;
            /**
             * Constructs a Feature.
             * @param geometry The geometry of the feature.
             * @param properties The properties of the feature.
             * @param id The id of the feature.
             * @param bbox The bounding box of the feature.
             */
            constructor(geometry: G, properties?: P, id?: string | number, bbox?: BoundingBox);
        }

        /**
         * A GeoJSON Point object - a JSON object that represents a geographic position. The full description is detailed in
         * [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.2}.
         */
        export class Point {
            /**
             * A static GeoJSON type descriptor for the Point class to be used in runtime comparisons.
             */
            static readonly TYPE: string;
            /**
             * A GeoJSON type descriptor with value "Point".
             */
            readonly type: string;
            /**
             * The position defining the point.
             */
            coordinates: Position;
            /**
             * Constructs a Point.
             * @param coordinates The position defining the point.
             */
            constructor(coordinates: Position);

        }

        /**
         * A GeoJSON LineString object - a JSON object that represents a geographic curve. The full description is detailed
         * in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.4}.
         */
        export class LineString {

            /**
             * A static GeoJSON type descriptor for the LineString class to be used in runtime comparisons.
             */
            static readonly TYPE: string;
            /**
             * A GeoJSON type descriptor with value "LineString".
             */
            readonly type: string;
            /**
             * The ordered list of positions defining the linestring.
             */
            coordinates: Position[];
            /**
             * The bounding box of the linestring.
             */
            bbox?: BoundingBox;
            /**
             * Constructs a LineString.
             * @param coordinates The ordered list of positions defining the linestring.
             * @param bbox The bounding box of the linestring.
             */
            constructor(coordinates: Position[], bbox?: BoundingBox);
        }

        /**
         * A GeoJSON Polygon object - a JSON object that represents a geographic polygon. The full description is detailed in
         * [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.6}.
         */
        export class Polygon {

            /**
             * A static GeoJSON type descriptor for the Polygon class to be used in runtime comparisons.
             */
            static readonly TYPE: string;
            /**
             * A GeoJSON type descriptor with value "Polygon".
             */
            type: string;
            /**
             * The array of linear ring coordinate arrays defining the polygon.
             */
            coordinates: Position[][];
            /**
             * The bounding box of the polygon.
             */
            bbox?: BoundingBox;
            /**
             * Constructs a Polygon.
             * @param coordinates The array of linear ring coordinate arrays defining the polygon.
             * @param bbox The bounding box of the polygon.
             */
            constructor(coordinates: Position[][] | Position[], bbox?: BoundingBox);
        }

        /**
         * A GeoJSON MultiPoint object - a JSON object that represents multiple geographic positions. The full description
         * is detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.3}.
         */
        export class MultiPoint {

            /**
             * A static GeoJSON type descriptor for the MultiPoint class to be used in runtime comparisons.
             */
            public static readonly TYPE: string;

            /**
             * A GeoJSON type descriptor with value "MutliPoint".
             */
            public type: string;

            /**
             * The array of multiple positions defining the multipoint.
             */
            public coordinates: Position[];

            /**
             * The bounding box of the multipoint.
             */
            public bbox?: BoundingBox;

            /**
             * Constructs a MultiPoint.
             * @param coordinates The array of multiple positions defining the multipoint.
             * @param bbox The bounding box of the multipoint.
             */
            constructor(coordinates: Position[], bbox?: BoundingBox)
        }

        /**
         * A GeoJSON MultiLineString object - a JSON object that represents multiple geographic curves. The full description
         * is detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.5}.
         */
        export class MultiLineString {

            /**
             * A static GeoJSON type descriptor for the MultiLineString class to be used in runtime comparisons.
             */
            public static readonly TYPE: string;

            /**
             * A GeoJSON type descriptor with value "MutliLineString".
             */
            public type: string;

            /**
             * The array of LineString coordinate arrays defining the multilinestring.
             */
            public coordinates: Position[][];

            /**
             * The bounding box of the multilinestring.
             */
            public bbox?: BoundingBox;

            /**
             * Constructs a MultiLineString.
             * @param coordinates The array of LineString coordinate arrays defining the multilinestring.
             * @param bbox The bounding box of the multilinestring.
             */
            constructor(coordinates: Position[][], bbox?: BoundingBox)
        }

        /**
         * A GeoJSON MultiPolygon object - a JSON object that represents multiple geographic polygons. The full description is
         * detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.7}.
         */
        export class MultiPolygon {

            /**
             * A static GeoJSON type descriptor for the MultiPolygon class to be used in runtime comparisons.
             */
            public static readonly TYPE: string;

            /**
             * A GeoJSON type descriptor with value "MutliPolygon".
             */
            public type: string;

            /**
             * The array of polygon coordinate arrays defining the multipolygon.
             */
            public coordinates: Position[][][];

            /**
             * The bounding box of the multipolygon.
             */
            public bbox?: BoundingBox;

            /**
             * Constructs a MultiPolygon.
             * @param coordinates The array of polygon coordinate arrays defining the multipolygon.
             * @param bbox The bounding box of the multipolygon.
             */
            constructor(coordinates: Position[][][], bbox?: BoundingBox)
        }

        /**
         * A GeoJSON GeometryCollection object - a JSON object that contains a collection of a GeoJSON Geometry objects. The
         * full description is detailed in [RFC 7946]{@link https://tools.ietf.org/html/rfc7946#section-3.1.8}.
         */
        export class GeometryCollection {

            /**
             * A static GeoJSON type descriptor for the GeometryCollection class to be used in runtime comparisons.
             */
            static readonly TYPE: string;

            /**
             * A GeoJSON type descriptor with value "GeometryCollection".
             */
            type: string;

            /**
             * The collection of GeoJSON geometries contained in the geometry collection.
             */
            geometries: Geometry[];

            /**
             * Constructs a GeometryCollection.
             * @param geometries The collection of geometries that make up the geometry collection.
             */
            constructor(geometries: Geometry[]);
        }

    }

    //control classes
    export module control {

        /**
         * A control for changing the rotation of the map.
         */
        export class CompassControl extends ControlBase {
            private static ROTATION_DURATION_MS;
            private static DEFAULT_ROTATION;
            private static INVERT_ORDER_POSITIONS;
            private hasMouse;
            private options;
            /**
             * Constructs a CompassControl.
             * @param options The options for the control.
             */
            constructor(options?: CompassControlOptions);
            /**
             * Initialization method for the control which is called when added to the map.
             * @param map The map that the control will be added to.
             * @param options The ControlOptions for this control.
             * @return An HTMLElement to be placed on the map for the control.
             */
            onAdd(map: Map, options?: ControlOptions): HTMLElement;
            private constructRotationButton;
            private constructRightRotationButton;
            private constructLeftRotationButton;
        }

        /**
         * A control for changing the pitch of the map.
         */
        export class PitchControl extends ControlBase {
            private static PITCH_DURATION_MS;
            private static DEFAULT_PITCH;
            private static INVERT_ORDER_POSITIONS;
            private hasMouse;
            private options;
            /**
             * Constructs a PitchControl.
             * @param options The options for the control.
             */
            constructor(options?: PitchControlOptions);
            /**
             * Initialization method for the control which is called when added to the map.
             * @param map The map that the control will be added to.
             * @param options The ControlOptions for this control.
             * @return An HTMLElement to be placed on the map for the control.
             */
            onAdd(map: Map, options?: ControlOptions): HTMLElement;
            private constructPitchButton;
            private constructPitchDecrementButton;
            private constructPitchIncrementButton;
        }

        /**
         * A control for changing the style of the map.
         */
        export class StyleControl extends ControlBase {
            private static readonly InvertOrderPositions;
            private static readonly Css;
            private map;
            private options;
            private currStyleImage;
            private styleIcons;
            /**
             * Constructs a StyleControl.
             * @param options The options for the control.
             */
            constructor(options?: StyleControlOptions);
            /**
             * Initialization method for the control which is called when added to the map.
             * @param map The map that the control will be added to.
             * @param options The ControlOptions for this control.
             * @return An HTMLElement to be placed on the map for the control.
             */
            onAdd(map: Map, options?: ControlOptions): HTMLElement;
            /**
             * Method that is called when the control is removed from the map. Should perform any necessary cleanup for the
             * control.
             */
            onRemove(): void;
            private buildSelectStyleBtn;
            private buildCurrStyleBtn;
            private buildStyleOpsGrid;
            private setStyleOpsVisible;
            /**
             * Callback handler for the style changing.
             */
            private onStyleChange;
        }

        /**
         * A control for changing the zoom of the map.
         */
        export class ZoomControl extends ControlBase {
            private static ZOOM_DURATION_MS;
            private options;
            /**
             * Constructs a ZoomControl.
             * @param options The options for the control.
             */
            constructor(options?: ZoomControlOptions);
            /**
             * Initialization method for the control which is called when added to the map.
             * @param map The map that the control will be added to.
             * @return An HTMLElement to be placed on the map for the control.
             */
            onAdd(map: Map): HTMLElement;
            private constructZoomInButton;
            private constructZoomOutButton;
        }
    }

    //internal classes
    export module internal {
        export interface EventArgs {
            [key: string]: any;
        }

        /**
         * An internal abstract class that can be extended to provide event listening/firing.
         * This class is for internal use only, and users will find little use with it.
         * Not to be used by the Map class. MapCallbackHandler implements the more complex logic for handling map events.
         */
        export abstract class EventEmitter<T extends EventArgs> {
            private readonly listeners;
            /**
             * Adds an event listener.
             * @param eventType The event name.
             * @param callback The event handler callback.
             */
            _addEventListener<K extends keyof T>(eventType: K, callback: (e: T[K]) => void, once: boolean): void;
            _addEventListener(eventType: string, callback: (e: T[string]) => void, once: boolean): void;
            /**
             * Removes an event listener.
             * @param eventType The event name.
             * @param callback The event handler callback.
             */
            _removeEventListener<K extends keyof T>(eventType: K, callback: (e: T[K]) => void): void;
            _removeEventListener(eventType: string, callback: (e: T[string]) => void): void;
            /**
             * Invokes a given event type.
             * @param eventType The event name.
             * @param eventData The data to pass to the listener callbacks.
             */
            _invokeEvent<K extends keyof T>(eventType: K, eventData: T[K]): void;
        }
    }

    //layer classes
    export module layer {

        /**
         * Renders Point objects as scalable circles (bubbles).
         */
        export class BubbleLayer extends Layer {

            /**
             * Constructs a new BubbleLayer.
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the bubble layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: BubbleLayerOptions);

            /**
             * Gets the options of the bubble layer.
             */
            getOptions(): BubbleLayerOptions;

            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;

            /**
             * Sets the options of the bubble layer.
             * @param newOptions The new options of the bubble layer.
             */
            setOptions(options: BubbleLayerOptions): void;

        }

        export interface LayerEvents {
            layeradded: Layer;
            layerremoved: Layer;
        }

        /**
         * Abstract class for other layer classes to extend.
         */
        export abstract class Layer<T extends LayerEvents = LayerEvents> extends atlas.internal.EventEmitter<T> {
            protected readonly id: string;
            protected map: Map;
            private static readonly LayerEvents;
            /**
             * A property for associating custom data with the layer.
             */
            metadata?: any;
            constructor(id?: string);
            /**
             * Gets the id of the layer
             */
            getId(): string;
            /**
             * Gets the map that the layer is currently added to, or null.
             */
            getMap(): Map;
            /**
             * Initialization method for the layer which is called when added to the map.
             * @param map The map the layer has been added to.
             */
            onAdd(map: Map): void;
            /**
             * Method that is called when the layer is removed from the map.
             * Should perform any necessary cleanup for the layer.
             */
            onRemove(): void;
        }

        /**
         * Represent the density of data using different colors (HeatMap).
         */
        export class HeatMapLayer extends Layer {

            /**
             * Constructs a new HeatMapLayer..
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the line layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: HeatMapLayerOptions);

            /**
             * Gets the options of the heat map layer.
             */
            getOptions(): HeatMapLayerOptions;

            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;

            /**
             * Sets the options of the heat map layer.
             * @param newOptions The new options of the heat map layer.
             */
            setOptions(options: HeatMapLayerOptions): void;

        }

        /**
         * Overlays an image on the map with each corner anchored to a coordinate on the map. Also known as a ground or image overlay.
         */
        export class ImageLayer extends Layer {
            /**
             * Constructs a new ImageLayer.
             * @param options The options for the tile layer.
             * @param id The id of the layer. If not specified a random one will be generated.
             */
            constructor(options: ImageLayerOptions, id?: string);
            /**
             * Gets the options of the tile layer.
             */
            getOptions(): ImageLayerOptions;
            /**
             * Sets the options of the tile layer.
             * @param newOptions The new options of the tile layer.
             */
            setOptions(options: ImageLayerOptions): void;
            /**
             * Calculates the approximate positions that align with the provided pixels from the source image.
             * @param pixels the provided pixels from the source image used to calculate the positions
             */
            getPositions(pixels: Pixel[]): Promise<atlas.data.Position[]>;
            /**
             * Calculates the approximate pixels on the source image that align with the provided positions.
             * @param positions the provided positions from the source image used to calculate the pixels
             */
            getPixels(positions: atlas.data.Position[]): Promise<Pixel[]>;
            /**
             * Calculates coordinates for a rotated image layer when provided with the bounding box edges and rotation value.
             * Note: If your rotation value is from a KML Ground Overlay it will need to be converted to a clockwise rotation using the following formula: `rotation = 360 – KmlRotation`
             * @param north The north edge of the bounding box.
             * @param south The south edge of the bounding box.
             * @param east The east edge of the bounding box.
             * @param west The west edge of the bounding box.
             * @param rotation Clockwise rotation in degrees
            */
            static getCoordinatesFromEdges(north: number, south: number, east: number, west: number, rotation?: number): atlas.data.Position[];
            /**
            * Calculates coordinates for a rotated image layer when provided with the bounding box edges and rotation value.
            * Note: If your rotation value is from a KML Ground Overlay it will need to be converted to a clockwise rotation using the following formula: `rotation = 360 – KmlRotation`
            * @param north The north edge of the bounding box.
            * @param south The south edge of the bounding box.
            * @param east The east edge of the bounding box.
            * @param west The west edge of the bounding box.
            * @param rotation Clockwise rotation in degrees
            */
            static getCoordinatesFromEdges(north: number, south: number, east: number, west: number, rotation?: number): atlas.data.Position[];
        }

        /**
         * Renders line data on the map. Can be used with SimpleLine, SimplePolygon,
         * CirclePolygon, LineString, MultiLineString, Polygon, and MultiPolygon objects.
         */
        export class LineLayer extends Layer {
            private options;
            /**
             * Constructs a new LineLayer.
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the line layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: LineLayerOptions);
            /**
             * Gets the options of the line layer.
             */
            getOptions(): LineLayerOptions;
            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;
            /**
             * Sets the options of the line layer.
             * @param options The new options of the line layer.
             */
            setOptions(options: LineLayerOptions): void;
        }

        /**
         * Renders extruded filled `Polygon` and `MultiPolygon` objects on the map.
         */
        export class PolygonExtrusionLayer extends Layer {
            private options;
            /**
             * Constructs a new PolygonExtrusionLayer.
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the polygon extrusion layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: PolygonExtrusionLayerOptions);
            /**
             * Gets the options of the polygon layer.
             */
            getOptions(): PolygonExtrusionLayerOptions;
            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;
            /**
             * Sets the options of the polygon layer.
             * @param newOptions The new options of the polygon layer.
             */
            setOptions(options: PolygonExtrusionLayerOptions): void;
        }

        /**
         * Renders filled Polygon and MultiPolygon objects on the map.
         */
        export class PolygonLayer extends Layer {

            /**
             * Constructs a new PolygonLayer.
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the polygon layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: PolygonLayerOptions);

            /**
             * Gets the options of the polygon layer.
             */
            getOptions(): PolygonLayerOptions;

            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;

            /**
             * Sets the options of the polygon layer.
             * @param newOptions The new options of the polygon layer.
             */
            setOptions(options: PolygonLayerOptions): void;

        }

        /**
         * Renders point based data as symbols on the map using text and/or icons.
         * Symbols can also be created for line and polygon data as well.
         */
        export class SymbolLayer extends Layer {
            /**
             * Constructs a new SymbolLayer.
             * @param source The id or instance of a data source which the layer will render.
             * @param id The id of the layer. If not specified a random one will be generated.
             * @param options The options of the polygon layer.
             */
            constructor(source: string | atlas.source.Source, id?: string, options?: SymbolLayerOptions);
            /**
             * Gets the options of the symbol layer.
             */
            getOptions(): SymbolLayerOptions;
            /**
             * Gets the source provided when creating the layer.
             */
            getSource(): string | atlas.source.Source;
            /**
             * Sets the options of the symbol layer.
             * @param newOptions The new options of the polygon layer.
             */
            setOptions(options: SymbolLayerOptions): void;
        }

        /**
         * Renders raster tiled images on top of the map tiles.
         */
        export class TileLayer extends Layer {
            /**
             * Constructs a new TileLayer.
             * @param options The options for the tile layer.
             * @param id The id of the layer. If not specified a random one will be generated.
             */
            constructor(options?: TileLayerOptions, id?: string);
            /**
             * Gets the options of the tile layer.
             */
            getOptions(): TileLayerOptions;
            /**
             * Sets the options of the tile layer.
             * @param newOptions The new options of the tile layer.
             */
            setOptions(options: TileLayerOptions): void;
        }
    }

    //source classes
    export module source {
        export interface DataSourceEvents extends SourceEvents {
            datasourceupdated: DataSource;
            dataadded: Shape[];
            dataremoved: Shape[];
        }

        /**
         * A data source class that makes it easy to manage shapes data that will be displayed on the map.
         * A data source must be added to a layer before it is visible on the map.
         * The DataSource class may be used with the SymbolLayer, LineLayer, PolygonLayer, BubbleLayer, and HeatMapLayer.
         */
        export class DataSource extends Source<DataSourceEvents> {
            private options;
            private shapes;
            private shapesMap;
            private requestId;
            /**
             * A data source class that makes it easy to manage shapes data that will be displayed on the map.
             * A data source must be added to a layer before it is visible on the map.
             * The `DataSource` class may be used with the `SymbolLayer`, `LineLayer`, `PolygonLayer`, `BubbleLayer`, and `HeatMapLayer`.
             * @param id a unique id that the user assigns to the data source. If this is not specified, then the data source will automatically be assigned an id.
             * @param options the options for the data source.
             */
            constructor(id?: string, options?: DataSourceOptions);
            /**
             * Adds shapes to the data source.
             * GeoJSON objects will be wrapped within a Shape class to make them easier to manage.
             * Optionally specify an index to insert the feature between other shapes/features in the layers.
             * @param data
             * @param index
             */
            add(data: atlas.data.FeatureCollection | atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.Geometry | atlas.data.GeometryCollection | Shape | Array<atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.Geometry | Shape>, index?: number): void;
            /**
             * Removes all data in the data source.
             */
            clear(): void;
            /**
             * Cleans up any resources this object is consuming.
             */
            dispose(): void;
            /**
             * Calculates a zoom level at which the cluster will start expanding or break apart.
             * @param clusterId
             */
            getClusterExpansionZoom(clusterId: number): Promise<number>;
            /**
             * Retrieves the children of the given cluster on the next zoom level. This may be a combination of shapes and sub-clusters.
             * The sub-clusters will be features with properties matching ClusteredProperties.
             * @param clusterId
             */
            getClusterChildren(clusterId: number): Promise<Array<atlas.data.Feature<atlas.data.Geometry, ClusteredProperties | any> | Shape>>;
            /**
             * Retrieves shapes that are within the cluster.
             * @param clusterId
             * @param limit The maximum number of features to return. Set to Infinity to return all shapes.
             * @param offset The number of shapes to skip. Allows you to page through the shapes in the cluster.
             */
            getClusterLeaves(clusterId: number, limit: number, offset: number): Promise<Array<atlas.data.Feature<atlas.data.Geometry, any> | Shape>>;
            /**
             * Gets the options used by the data source.
             */
            getOptions(): DataSourceOptions;
            /**
             * Returns all shapes that are in the DataSource.
             */
            getShapes(): Shape[];
            /**
             * Downloads a GeoJSON document and imports its data into the data source.
             * The GeoJSON document must be on the same domain or accessible using CORS.
             * @param url
             */
            importDataFromUrl(url: string): Promise<void>;
            /**
             * Retrieves a shape with the specified id.
             * If no shape with the specified id is contained in the data source, null will be return.
             * @param id The id of the shape to return.
             */
            getShapeById(id: string | number): Shape;
            /**
             * Removes one or more shapes from the data source.
             * If a string is passed in, it is assumed to be an id.
             * If a number is passed in, removes the shape at that index.
             * @param shape The shape(s), shape id(s), or feature(s) to be removed
             */
            remove(shape: number | string | Shape | atlas.data.Feature<atlas.data.Geometry, any> | Array<number | string | Shape | atlas.data.Feature<atlas.data.Geometry, any>>): void;
            /**
             * Removes one or more shapes from the datasource based on its id.
             * @param shape shape id
             */
            removeById(id: number | string | Array<number | string>): void;
            /**
             * Sets the data source options.
             * The data source will retain its current values for any option not specified in the supplied options.
             * @param options the DataSourceOptions to be set
             */
            setOptions(options: DataSourceOptions): void;
            /**
             * Overwrites all shapes in the data source with the new array of shapes.
             * @param shape the new shapes to update
             */
            setShapes(shape: atlas.data.FeatureCollection | Array<atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.Geometry | Shape>): void;
            /**
             * Returns a GeoJSON FeatureCollection which contains all the shape data that is in the data source.
             */
            toJson(): atlas.data.FeatureCollection;
            private _addToSources;
            private _removeFromSources;
            private _updateShapesMap;
            private _updateMboxSource;
            public map: atlas.Map;
        }

        export interface SourceEvents {
            sourceadded: Source;
            sourceremoved: Source;
        }

        /**
         * A base abstract class in which all other source objects extend.
         * A source must be added to a layer before it is visible on the map.
         */
        export abstract class Source<T extends SourceEvents = SourceEvents> extends atlas.internal.EventEmitter<T> {
            private id;
            protected map: Map;
            constructor(id?: string);
            /**
             * Gets the id of the data source
             */
            getId(): string;
        }

        /**
         * A vector tile source describes how to access a vector tile layer.
         * Vector tile sources can be used with; SymbolLayer, LineLayer, PolygonLayer, BubbleLayer, HeatmapLayer and VectorTileLayer.
         */
        export class VectorTileSource extends Source {
            constructor(id?: string, options?: VectorTileSourceOptions);
            /**
             * Gets the options of the VectorTileSource.
             */
            getOptions(): VectorTileSourceOptions;
            /**
             * Returns all GeoJSON features that are in the VectorTileSource and which satisfy the specified filter expression.
             * @param sourceLayer Required if the source is a VectorTileSource. Specifies the layer within the VectorTileSource to query.
             * @param filter A filter that will limit the query.
             */
            getShape(sourceLayer: string, filter?: Expression): Array<atlas.data.Feature<atlas.data.Geometry, any>>;
        }
    }

    //math functions
    export module math {
        /**
         * An Affine Transform class generated from a set of reference points.
         */
        export class AffineTransform {
            /**
             * An Affine Transform class generated from a set of reference points.
             * @param source A set of reference points from the source reference system to transform from.
             * @param target A set of reference points from the target reference system to transform to.
             */
            constructor(source: number[][], target: number[][]);
            /**
             * Converts an array of points from the source reference system to the target reference system.
             * @param sourcePoints An array of points from the source reference system to transform.
             * @param decimals Number of decimal places to round the results off to.
             * @returns An array of points that have been transformed to the target reference system.
             */
            toTarget(sourcePoints: number[][], decimals?: number): number[][];
            /**
             * Converts an array of points from the target reference system to the source reference system.
             * @param targetPoints An array of points from the target reference system to transform.
             * @param decimals Number of decimal places to round the results off to.
             * @returns An array of points that have been transformed to the source reference system.
             */
            toSource(targetPoints: number[][], decimals?: number): number[][];
        }
        /**
         * Units of measurement for areas.
         */
        export enum AreaUnits {
            /**
             * Represents areas in square meters (m^2).
             * Literal value `""`
             */
            squareMeters = "squareMeters",
            /**
             * Represents areas in acres (ac).
             * Literal value `"acres"`
             */
            acres = "acres",
            /**
             * Represents areas in hectares (ha).
             * Literal value `"hectares"`
             */
            hectares = "hectares",
            /**
             * Represents areas in feet (ft^2).
             * Literal value `"squareFeet"`
             */
            squareFeet = "squareFeet",
            /**
             * Represents areas in square kilometers (km^2).
             * Literal value `"squareKilometers"`
             */
            squareKilometers = "squareKilometers",
            /**
             * Represents areas in miles (mi^2).
             * Literal value `"squareMiles"`
             */
            squareMiles = "squareMiles",
            /**
             * Represents areas in yards (yds^2).
             * Literal value `"squareYards"`
             */
            squareYards = "squareYards"
        }
        /**
         * Units of measurement for distances.
         */
        export enum DistanceUnits {
            /**
             * Represents a distance in meters (m).
             * Literal value `"meters"`
             */
            meters = "meters",
            /**
             * Represents a distance in kilometers (km).
             * Literal value `"kilometers"`
             */
            kilometers = "kilometers",
            /**
             * Represents a distance in feet (ft).
             * Literal value `"feet"`
             */
            feet = "feet",
            /**
             * Represents a distance in miles (mi).
             * Literal value `"miles"`
             */
            miles = "miles",
            /**
             * Represents a distance in nautical miles.
             * Literal value `"nauticalMiles"`
             */
            nauticalMiles = "nauticalMiles",
            /**
             * Represents a distance in yards (yds).
             * Literal value `"yards"`
             */
            yards = "yards"
        }
        /**
         * Units of measurement for time.
         */
        export enum TimeUnits {
            /**
             * Represents a time in seconds (s).
             * Literal value `"seconds"`
             */
            seconds = "seconds",
            /**
             * Represents a time in hours (hr).
             * Literal value `"hours"`
             */
            hours = "hours",
            /**
             * Represents a time in milliseconds (ms).
             * Literal value `"ms"`
             */
            ms = "ms",
            /**
             * Represents a time in minutes (min).
             * Literal value `"minutes"`
             */
            minutes = "minutes",
            /**
             * Represents a time in days (d).
             * Literal value `"days"`
             */
            days = "days"
        }
        /**
         * Units of measurement for speed.
         */
        export enum SpeedUnits {
            /**
             * Represents a speed in meters per second (m/s).
             * Literal value `"metersPerSecond"`
             */
            metersPerSecond = "metersPerSecond",
            /**
             * Represents a speed in kilometers per hour (km/h).
             * Literal value `"kilometersPerHour"`
             */
            kilometersPerHour = "kilometersPerHour",
            /**
             * Represents a speed in feet per second (ft/s).
             * Literal value `"feetPerSecond"`
             */
            feetPerSecond = "feetPerSecond",
            /**
             * Represents a speed in miles per hour (mph).
             * Literal value `"milesPerHour"`
             */
            milesPerHour = "milesPerHour",
            /**
             * Represents a speed in knots (knts).
             * Literal value `"knots"`
             */
            knots = "knots",
            /**
             * Represents a speed in mach.
             * Literal value `"mach"`
             */
            mach = "mach"
        }
        /**
         * Units of measurement for acceleration.
         */
        export enum AccelerationUnits {
            /**
             * Represents an acceleration in miles per second squared (mi/s^2).
             * Literal value `"milesPerSecondSquared"`
             */
            milesPerSecondSquared = "milesPerSecondSquared",
            /**
             * Represents an acceleration in kilometers per second squared (km/s^2).
             * Literal value `"kilometersPerSecondSquared"`
             */
            kilometersPerSecondSquared = "kilometersPerSecondSquared",
            /**
             * Represents an acceleration in knots per second (knts/s).
             * Literal value `"knotsPerSecond"`
             */
            knotsPerSecond = "knotsPerSecond",
            /**
             * Represents an acceleration in standard gravity units (g).
             * Literal value `"standardGravity"`
             */
            standardGravity = "standardGravity",
            /**
             * Represents an acceleration in feet per second squared (ft/s^2).
             * Literal value `"feetPerSecondSquared"`
             */
            feetPerSecondSquared = "feetPerSecondSquared",
            /**
             * Represents an acceleration in yards per second squared (yds/s^2).
             * Literal value `"yardsPerSecondSquared"`
             */
            yardsPerSecondSquared = "yardsPerSecondSquared",
            /**
             * Represents an acceleration in miles per hour second (mi/h/s).
             * Literal value `"milesPerHourSecond"`
             */
            milesPerHourSecond = "milesPerHourSecond",
            /**
             * Represents an acceleration in kilometers per hours second (km/h/s).
             * Literal value `"kilometersPerHourSecond"`
             */
            kilometersPerHourSecond = "kilometersPerHourSecond",
            /**
             * Represents an acceleration in meters per second squared (m/s^2).
             * Literal value `"metersPerSecondSquared"`
             */
            metersPerSecondSquared = "metersPerSecondSquared"
        }
        /**
         * Takes a BoundingBox and converts it to a polygon.
         * @param bounds The BoundingBox to convert to a Polygon.
         * @returns A polygon representation of the BoundingBox.
         */
        export function boundingBoxToPolygon(bounds: atlas.data.BoundingBox): atlas.data.Polygon;
        /**
         * Converts a distance from one distance units to another. Supported units: miles, nauticalMiles, yards, meters, kilometers, feet
         * @param distance A number that represents a distance to convert.
         * @param fromUnits The distance units the original distance is in.
         * @param toUnits The desired distance units to convert to.
         * @param decimals Specifies the number of decimal places to round the result to. If undefined, no rounding will occur.
         * @returns A distance in the new units.
         */
        export function convertDistance(distance: number, fromUnits: string | DistanceUnits, toUnits: string | DistanceUnits, decimals?: number): number;
        /**
         * Calculates an array of positions that form a cardinal spline between the specified array of positions.
         * @param positions The array of positions to calculate the spline through.
         * @param tension A number that indicates the tightness of the curve. Can be any number, although a value between 0 and 1 is usually used. Default: 0.5
         * @param nodeSize Number of nodes to insert between each position. Default: 15
         * @param close A boolean indicating if the spline should be a closed ring or not. Default: false
         * @returns An array of positions that form a cardinal spline between the specified array of positions.
         */
        export function getCardinalSpline(positions: atlas.data.Position[], tension?: number, nodeSize?: number, close?: boolean): atlas.data.Position[];
        /**
         * Calculates a destination position based on a starting position, a heading, a distance, and a distance unit type.
         * @param origin Position that the destination is relative to.
         * @param heading A heading angle between 0 - 360 degrees. 0 - North, 90 - East, 180 - South, 270 - West.
         * @param distance Distance that destination is away.
         * @param units Unit of distance measurement. Default is meters.
         * @returns A position that is the specified distance away from the origin.
         */
        export function getDestination(origin: atlas.data.Position | atlas.data.Point, heading: number, distance: number, units?: string | DistanceUnits): atlas.data.Position;
        /**
         * Calculate the distance between two position objects on the surface of the earth using the Haversine formula.
         * @param origin First position to calculate distance between.
         * @param destination Second position to calculate distance between.
         * @param units Unit of distance measurement. Default is meters.
         * @returns The shortest distance between two positions in the specified units.
         */
        export function getDistanceTo(origin: atlas.data.Position | atlas.data.Point, destination: atlas.data.Position | atlas.data.Point, units?: string | DistanceUnits): number;
        /**
         * Retrieves the radius of the earth in a specific distance unit for WGS84.
         * @param units Unit of distance measurement. Default: meters
         * @returns A number that represents the radius of the earth in a specific distance unit.
         */
        export function getEarthRadius(units?: string | DistanceUnits): number;
        /**
         * Takes an array of positions objects and fills in the space between them with accurately positioned positions to form an approximated Geodesic path.
         * @param path Array of position objects that form a path to fill in.
         * @param nodeSize Number of nodes to insert between each position. Default: 15
         * @returns An array of position objects that form a geodesic paths.
         */
        export function getGeodesicPath(path: atlas.data.LineString | atlas.data.Position[], nodeSize?: number): atlas.data.Position[];
        /**
         * Calculates the heading from one position object to another.
         * @param origin Point of origin.
         * @param destination Destination to calculate relative heading to.
         * @returns A heading in degrees between 0 and 360. 0 degrees points due North.
         */
        export function getHeading(origin: atlas.data.Position | atlas.data.Point, destination: atlas.data.Position | atlas.data.Point): number;
        /**
         * Calculates the distance between all position objects in an array.
         * @param path The array of position objects that make up the path to calculate the length of.
         * @param units Unit of distance measurement. Default: meters
         * @returns The distance between all positions in between all position objects in an array on the surface of a earth in the specified units.
         */
        export function getLengthOfPath(path: atlas.data.LineString | atlas.data.Position[], units?: string | DistanceUnits): number;
        /**
         * Calculates the position object on a path that is a specified distance away from the start of the path. If the specified distance is longer
         * than the length of the path, the last position of the path will be returned.
         * @param path A polyline or array of position coordinates that form a path.
         * @param distance The distance along the path (from the start) to calculate the position for.
         * @param units Unit of distance measurement. Default is meters.
         * @returns A position object that is the specified distance away from the start of the path when following the path.
         */
        export function getPositionAlongPath(path: atlas.data.LineString | atlas.data.Position[], distance: number, units?: string | DistanceUnits): atlas.data.Position;
        /**
         * Calculates an array of position objects that are an equal distance away from a central point to create a regular polygon.
         * @param origin Center of the regular polygon.
         * @param radius Radius of the regular polygon.
         * @param numberOfPositions Number of positions the polygon should have.
         * @param units Unit of distance measurement. Default is meters.
         * @param offset An offset to rotate the polygon. When 0 the first position will align with North.
         * @returns An array of position objects that form a regular polygon.
         */
        export function getRegularPolygonPath(origin: atlas.data.Position | atlas.data.Point, radius: number, numberOfPositions: number, units?: string | DistanceUnits, offset?: number): atlas.data.Position[];
        /**
         * Calculates a position object that is a fractional distance between two position objects.
         * @param origin First position to calculate mid-point between.
         * @param destination Second position to calculate mid-point between.
         * @param fraction The fractional parameter to calculate a mid-point for. Default 0.5.
         * @returns A position that lies a fraction of the distance between two position objects, relative to the first position object.
         */
        export function interpolate(origin: atlas.data.Position | atlas.data.Point, destination: atlas.data.Position | atlas.data.Point, fraction?: number): atlas.data.Position;
        /**
         * Normalizes a latitude value between -90 and 90 degrees.
         * @param lat The latitude value to normalize.
         */
        export function normalizeLatitude(lat: number): number;
        /**
         * Normalizes a longitude value between -180 and 180 degrees.
         * @param lng The longitude value to normalize.
         */
        export function normalizeLongitude(lng: number): number;
        /**
         * Takes an array of positions and rotates them around a given position for the specified angle of rotation.
         * @param positions An array of positions to be rotated.
         * @param origin The position to rotate the positions around.
         * @param angle The amount to rotate the array of positions in degrees clockwise.
         */
        export function rotatePositions(positions: atlas.data.Position[], origin: atlas.data.Position | atlas.data.Point, angle: number): atlas.data.Position[];
        /**
         * Calculates the pixel accurate heading from one position to another based on the Mercator map projection. This heading is visually accurate.
         * @param origin
         * @param destination
         */
        export function getPixelHeading(origin: atlas.data.Position | atlas.data.Point, destination: atlas.data.Position | atlas.data.Point): number;
        /**
         * Converts an array of global Mercator pixel coordinates into an array of geospatial positions at a specified zoom level.
         * Global pixel coordinates are relative to the top left corner of the map [-180, 90].
         * @param pixels Array of pixel coordinates.
         * @param zoom Zoom level.
         * @returns An array of positions.
         */
        export function mercatorPixelsToPositions(pixels: Pixel[], zoom: number): atlas.data.Position[];
        /**
         * Converts an array of positions into an array of global Mercator pixel coordinates at a specified zoom level.
         * @param positions Array of positions.
         * @param zoom Zoom level.
         * @returns Array of global Mercator pixels.
         */
        export function mercatorPositionsToPixels(positions: atlas.data.Position[], zoom: number): Pixel[];
        /**
         * Converts an acceleration value from one unit to another.
         * Supported units:
         *    milesPerSecondSquared, kilometersPerSecondSquared, metersPerSecondSquared, feetPerSecondSquared
         *    yardsPerSecondSquared, kilometersPerHoursSecond, milesPerHourSecond, knotsPerSecond, standardGravity
         * @param acceleration The acceleration value to convert.
         * @param fromUnits The acceleration units the value is in.
         * @param toUnits The acceleration units to convert to.
         * @param decimals The number of decimal places to round the result to.
         * @returns An acceleration value convertered from one unit to another.
         */
        export function convertAcceleration(acceleration: number, fromUnits: string | AccelerationUnits, toUnits: string | AccelerationUnits, decimals?: number): number;
        /**
         * Converts an area value from one unit to another.
         * Supported units: squareMeters, acres, hectares, squareFeet, squareYards, squareMiles, squareKilometers
         * @param area The area value to convert.
         * @param fromUnits The area units the value is in.
         * @param toUnits The area units to convert to.
         * @param decimals The number of decimal places to round the result to.
         * @returns An area value convertered from one unit to another.
         */
        export function convertArea(area: number, fromUnits: string, toUnits: string, decimals?: number): number;
        /**
         * Converts a speed value from one unit to another.
         * Supported units:
         *    kilometersPerHour, milesPerHour, metersPerSecond, feetPerSecond, knots, mach
         * @param speed The speed value to convert.
         * @param fromUnits The speed units to convert from.
         * @param toUnits The speed units to convert to.
         * @param decimals The number of decimal places to round the result to.
         * @returns A speed value convertered from one unit to another.
         */
        export function convertSpeed(speed: number, fromUnits: string | SpeedUnits, toUnits: string | SpeedUnits, decimals?: number): number;
        /**
         * Converts a timespan value from one unit to another.
         * Supported units:
         *    ms (milliseconds), hours, minutes, seconds
         * @param timespan The time value to convert.
         * @param fromUnits The time units to convert from.
         * @param toUnits The time units to convert to.
         * @param decimals The number of decimal places to round the result to.
         * @returns A time value convertered from one unit to another.
         */
        export function convertTimespan(timespan: number, fromUnits: string | TimeUnits, toUnits: string | TimeUnits, decimals?: number): number;
        /**
         * Calculates an acceleration based on an initial speed, travel distance and timespan. Formula: a = 2*(d - v*t)/t^2
         * @param initialSpeed The initial speed.
         * @param distance The distance that has been travelled.
         * @param timespan The timespan that was travelled.
         * @param distanceUnits The units of the distance information. If not specified meters are used.
         * @param timeUnits The units of the timespan information. If not specified seconds are used.
         * @param speedUnits The units of the speed information. If not specified m/s are used.
         * @param accelerationUnits The units to return the acceleration value in. If not specified m/s^2 are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns An acceleration based on an initial speed, travel distance and timespan.
         */
        export function getAcceleration(initialSpeed: number, distance: number, timespan: number, speedUnits?: string | SpeedUnits, distanceUnits?: string | DistanceUnits, timeUnits?: string | TimeUnits, accelerationUnits?: string | AccelerationUnits, decimals?: number): number;
        /**
         * Calculates an acceleration based on an initial speed, final speed and timespan. Formula: a = 2* (v2 - v1)/t
         * @param initialSpeed The initial speed.
         * @param finalSpeed The final speed.
         * @param timespan The timespan that was travelled.
         * @param speedUnits The units of the speed information. If not specified meters are used.
         * @param timeUnits The units of the timespan information. If not specified seconds are used.
         * @param accelerationUnits The units to return the acceleration value in. If not specified m/s^2 are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns An acceleration based on an initial speed, final speed and timespan.
         */
        export function getAccelerationFromSpeeds(initialSpeed: number, finalSpeed: number, timespan: number, speedUnits?: string | SpeedUnits, timeUnits?: string | TimeUnits, accelerationUnits?: string | AccelerationUnits, decimals?: number): number;
        /**
         * Calculates an acceleration between two point features that have a timestamp property and optionally a speed property.
         * if speeds are provided, ignore distance between points as the path may not have been straight and calculate: a = (v2 - v1)/(t2 - t1)
         * if speeds not provided or only provided on first point, calculate straight line distance between points and calculate: a = 2*(d - v*t)/t^2
         * @param origin The initial point in which the acceleration is calculated from.
         * @param destination The final point in which the acceleration is calculated from.
         * @param timestampProperty The name of the property on the features that contains the timestamp information.
         * @param speedProperty The name of the property on the features that contains a speed information.
         * @param speedUnits The units of the speed information. If not specified m/s is used.
         * @param accelerationUnits The units to return the acceleration value in. If not specified m/s^2 are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns An acceleration between two point features that have a timestamp property and optionally a speed property. Returns NaN if unable to parse timestamp.
         */
        export function getAccelerationFromFeatures(origin: atlas.data.Feature<atlas.data.Point, any>, destination: atlas.data.Feature<atlas.data.Point, any>, timestampProperty: string, speedProperty?: string, speedUnits?: string | SpeedUnits, accelerationUnits?: string | AccelerationUnits, decimals?: number): number;
        /**
         * Calculates the approximate area of a geometry in the specified units
         * @param coordinates The coordinates of the polyon ring.
         * The first ring is the outer/exterior ring and all other rings are the interior ring.
         * @param areaUnits Unit of area measurement. Default is squareMeters.
         * @param decimals The number of decimal places to round the result to.
         * @returns The area of a geometry in the specified units.
         */
        export function getArea(data: atlas.data.Geometry | atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape, areaUnits?: AreaUnits, decimals?: number): number;
        /**
         * Calculates the average speed of travel between two points based on the provided amount of time.
         * @param origin The initial point in which the speed is calculated from.
         * @param destination The final point in which the speed is calculated from.
         * @param time The time take to travel between the start and end points.
         * @param timeUnits The units of the time value. If not specified seconds are used.
         * @param speedUnits The units to return the speed value in. If not specified m/s are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns The average speed of travel between two points based on the provided amount of time.
         */
        export function getSpeed(origin: atlas.data.Position | atlas.data.Point | atlas.data.Feature<atlas.data.Point, any>, destination: atlas.data.Position | atlas.data.Point | atlas.data.Feature<atlas.data.Point, any>, timespan: number, timeUnits?: string | TimeUnits, speedUnits?: string | SpeedUnits, decimals?: number): number;
        /**
         * Calculates the average speed of travel between two point features that have a property containing a timestamp.
         * The timestamp can be;
         *  - A JavaScript Date object
         *  - A number which represents the number of milliseconds since Jan 1st, 1970.
         *  - A string which uses one of the following formats:
         *      - ISO8601 date format (i.e. 2012-04-23T18:25:43.511Z)
         *      - RFC282 / IETF date syntax (section 3.3)
         *      - OData Date string (i.e. "/Date(1235764800000)/")
         * @param origin The initial point in which the speed is calculated from.
         * @param destination The final point in which the speed is calculated from.
         * @param timestampProperty The name of the property on the features which has the timestamp information.
         * @param speedUnits The units to return the speed value in. If not specified m/s are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns The speed in the specified units or NaN if valid timestamps are not found.
         */
        export function getSpeedFromFeatures(origin: atlas.data.Feature<atlas.data.Point, any>, destination: atlas.data.Feature<atlas.data.Point, any>, timestampProperty: string, speedUnits?: string | SpeedUnits, decimals?: number): number;
        /**
         * Calculates the timespan between two dates or timestamps.
         * Timestamps can be;
         *  - A JavaScript Date object
         *  - A number which represents the number of milliseconds since Jan 1st, 1970.
         *  - A string which uses one of the following formats:
         *      - ISO8601 date format (i.e. 2012-04-23T18:25:43.511Z)
         *      - RFC282 / IETF date syntax (section 3.3)
         *      - OData Date string (i.e. "/Date(1235764800000)/")
         * @param startTime The start date or time.
         * @param endTime The end date or time.
         * @param units The units to return the time value in. If not specified seconds are used.
         * @returns A timespan between two dates or timestamps. Returns NaN if unable to parse timestamps.
         */
        export function getTimespan(startTime: Date | string | number, endTime: Date | string | number, units?: TimeUnits, decimals?: number): number;
        /**
         * Calculates the distance traveled for a specified timespan, speed and optionally an acceleration.
         * Formula: d = v*t + 0.5*a*t^2
         * @param distanceUnits The distance units in which to return the distance in.
         * @param timespan The timespan to calculate the distance for.
         * @param speed The initial or constant speed.
         * @param acceleration Optional. An acceleration which increases the speed over time.
         * @param timeUnits The units of the timespan. If not specified seconds are used.
         * @param speedUnits The units of the speed value. If not specified m/s are used.
         * @param accelerationUnits Optional. The units of the acceleration value. If not specified m/s^2 are used.
         * @param decimals The number of decimal places to round the result to.
         * @returns The distance traveled for a specified timespan, speed and optionally an acceleration.
         */
        export function getTravelDistance(distanceUnits: string, timespan: number, speed: number, acceleration?: number, timeUnits?: string | TimeUnits, speedUnits?: string | SpeedUnits, accelerationUnits?: string, decimals?: number): number;
        /**
         * Parses a timestamp into a JavaScript Date object.
         * Timestamps can be;
         *  - A JavaScript Date object
         *  - A number which represents the number of milliseconds since Jan 1st, 1970.
         *  - A string which uses one of the following formats:
         *      - ISO8601 date format (i.e. 2012-04-23T18:25:43.511Z)
         *      - RFC282 / IETF date syntax (section 3.3)
         *      - OData Date string (i.e. "/Date(1235764800000)/")
         * @param timestamp The timestamp value to parse.
         * @returns A Date object that represents the timestamp or null if the timestamp could not be parsed.
         */
        export function parseTimestamp(timestamp: Date | string | number): Date;
        /**
         * Calculates a Convex Hull from an array of positions, geometries or features.
         * @param data The array of positions, geometries or features to calculate a convex hull for.
         * @returns A Convex Hull from an array of positions, geometries or features.
         */
        export function getConvexHull(data: atlas.data.Position[] | atlas.data.Geometry | atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.FeatureCollection | atlas.data.GeometryCollection | atlas.data.Geometry[] | Array<atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape> | atlas.Shape): atlas.data.Polygon;
        /**
         * Retrieves an array of all positions in the provided geometry, feature or array of geometries/features.
         * @param data The geometries or features to retrieve the positions from.
         * @returns An array of all positions in the provided geometry, feature or array of geometries/features.
         */
        export function getPositions(data: atlas.data.Position[] | atlas.data.Geometry | atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.FeatureCollection | atlas.data.GeometryCollection | atlas.data.Geometry[] | Array<atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape> | atlas.Shape): atlas.data.Position[];
        /**
         * Gets the position of an object that is a position, point, point feature, or circle. If it is a circle, its center coordinate will be returned.
         * @param data The data object to extract the position from.
         * @returns The position of an object that is a position, point, or point feature. Returns null if invalid data passed in.
         */
        export function getPosition(data: atlas.data.Position | atlas.data.Point | atlas.data.Feature<atlas.data.Point, any> | atlas.Shape): atlas.data.Position;
        /**
         * Gets an array of evenly spaced positions along a path.
         * @param path The path to get the positions from.
         * @param numPositions The number of positions to get.
         * @returns An array of evenly spaced positions along a path.
         */
        export function getPositionsAlongPath(path: atlas.data.LineString | atlas.data.Position[], numPositions: number): atlas.data.Position[];
        /**
         * Gets a point with heading a specified distance along a path.
         * @param path The path to get the point from.
         * @param distance The distance along the path to get the point at.
         * @param units The distance units.
         * @returns A point with heading a specified distance along a path.
         */
        export function getPointWithHeadingAlongPath(path: atlas.data.LineString | atlas.data.Position[], distance: number, units?: string | DistanceUnits): atlas.data.Feature<atlas.data.Point, {
            heading: number;
        }>;
        /**
         * Gets an array of evenly spaced points with headings along a path.
         * @param path The path to get the positions from.
         * @param numPoints The number of points to get.
         * @returns An array of evenly spaced points with headings along a path.
         */
        export function getPointsWithHeadingsAlongPath(path: atlas.data.LineString | atlas.data.Position[], numPoints: number): Array<atlas.data.Feature<atlas.data.Point, {
            heading: number;
        }>>;
        /**
         * Calculates the closest point on the edge of a geometry to a specified point or position.
         * The returned point feature will have a `distance` property that specifies the distance between the two points in the specified units.
         * If the geometry is a Point, that points position will be used for the result.
         * If the geometry is a MultiPoint, the distances to the individual positions will be used.
         * If the geometry is a Polygon or MultiPolygon, the point closest to any edge will be returned regardless of if the point intersects the geometry or not.
         * @param pt The point or position to find the closest point on the edge of the geometry.
         * @param geom The geometry to find the closest point on.
         * @param units Unit of distance measurement. Default is meters.
         * @param decimals The number of decimal places to round the result to.
         * @returns
         */
        export function getClosestPointOnGeometry(pt: atlas.data.Position | atlas.data.Point | atlas.data.Feature<atlas.data.Point, any> | atlas.Shape, geom: atlas.data.Geometry | atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape, units?: string | DistanceUnits, decimals?: number): atlas.data.Feature<atlas.data.Point, {
            distance: number;
        }>;
    }

    /**
     * The control for a visual and interactive web map.
     */
    export class Map {
        private readonly styleLayerIds;
        private readonly styleSourceIds;
        private readonly map;
        private localizedStringsPromise;
        private insights;
        private removed;
        private loaded;
        private ready;
        readonly controls: ControlManager;
        readonly events: EventManager;
        readonly imageSprite: ImageSpriteManager;
        readonly layers: LayerManager;
        readonly markers: HtmlMarkerManager;
        readonly sources: SourceManager;
        readonly authentication: AuthenticationManager;
        readonly popups: PopupManager;
        private copyrightControl;
        private logoControl;
        private serviceOptions;
        private styleOptions;
        private trafficOptions;
        private readonly incidentDelegate;
        private readonly flowDelegate;
        private readonly accessibleMapDelegate;
        private readonly userInteractionDelegate;
        /**
         * Displays a map in the specified container.
         * @param container The id of the element where the map should be displayed.
         * @param options Options for the initial display and interactability with the map.
         */
        constructor(container: string | HTMLElement, options: ServiceOptions & StyleOptions & UserInteractionOptions & (CameraOptions | CameraBoundsOptions));
        /**
         * Returns the HTMLCanvasElement that the map is drawn to.
         */
        getCanvas(): HTMLCanvasElement;
        /**
         * Returns the HTMLElement that contains the map's HTMLCanvasElement. The map's events (e.g. panning and zooming)
         * are attached to this element.
         */
        getCanvasContainer(): HTMLElement;
        /**
         * Returns the HTMLElement that contains the map.
         */
        getMapContainer(): HTMLElement;
        /**
         * Returns the service options with which the map control was initialized.
         */
        getServiceOptions(): ServiceOptions;
        /**
         * Set the service options.
         */
        setServiceOptions(options: ServiceOptions): void;
        /**
         * Set the camera of the map control with an animated transition. Any options not specified will default to their
         * current values.
         * @param options The options for setting the map's camera and for the animation of any view change.
         */
        setCamera(options?: (CameraOptions | CameraBoundsOptions) & AnimationOptions): void;
        /**
         * Returns the camera's current properties.
         */
        getCamera(): CameraOptions & CameraBoundsOptions;
        /**
         * Set the map control's style options. Any options not specified will default to their current values.
         * @param options The options for setting the style of the map control.
         */
        setStyle(options?: StyleOptions): void;
        /**
         * Returns the map control's current style settings.
         */
        getStyle(): StyleOptions;
        /**
         * Set the map control's user interaction handlers. Any options not specified will default to their current values.
         * @param options The options for enabling/disabling the user interaction handlers.
         */
        setUserInteraction(options?: UserInteractionOptions): void;
        /**
         * Return the map control's current user interaction handler settings.
         */
        getUserInteraction(): UserInteractionOptions;
        /**
         * Set the traffic options for the map. Any options not specified will default to their current values.
         * @param options The options for defining the map's traffic display.
         */
        setTraffic(options?: TrafficOptions): void;
        /**
         * Return the map control's current traffic settings.
         */
        getTraffic(): TrafficOptions;
        /**
         * Removes all user added sources, layers, markers, and popups from the map.
         * User added images are preserved.
         */
        clear(): void;
        /**
         * Clean up the map's resources. Map will not function correctly after calling this method.
         */
        dispose(): void;
        /**
         * Resize the map according to the dimensions of its container element.
         * @param eventData Optional additional properties to be added to event objects of events triggered by this method.
         */
        resize(eventData?: any): void;
        /**
         * Resizes the map's container element then the map itself.
         * @param height The height for the map and its container element. A number input is assumed to be in pixels.
         * @param width The width for the map and its container element. A number input is assumed to be in pixels.
         * @param eventData Optional additional properties to be added to event objects of events triggered by this method.
         */
        resize(height: number | string, width: number | string, eventData?: any): void;
        /**
         * Converts an array of Pixel objects to an array of geographic Positions objects on the map.
         * @param pixels The pixels to be converted.
         */
        pixelsToPositions(pixels: Pixel[]): atlas.data.Position[];
        /**
         * Converts an array of Positions objects to an array of Pixel objects relative to the map container.
         * @param positions The positions to be converted.
         */
        positionsToPixels(positions: atlas.data.Position[]): Pixel[];
        /**
         * Returns a boolean indicating if all tiles in the current viewport for all sources have loaded or not.
         */
        areTilesLoaded(): boolean;
        /**
         * Stops any animated transition that is currently underway.
         */
        stop(): void;
        /**
         * The callback used when styleOptions.autoResize is true.
         */
        private _windowResizeCallback;
        /**
         * Sets whether the map will automatically resize when the browser window resizes.
         * @private
         */
        private _setAutoResize;
        /**
         * Adds or replaces the relevant fundamental map components (layers and sources) based on the input options.
         * Removes sources and layers that aren't used by the new style or any remaining layers.
         * @private
         */
        private _setStyleComponents;
        /**
         * Set the default service/style options.
         * Only set defaults if the users provided a value for them and no other default have been set.
         */
        private _updateGlobalDefaults;
        private _generateSafeBounds;
    }

    /**
     * Represent a pixel coordinate or offset. Extends an array of [x, y].
     */
    export class Pixel extends Array<number> {
        /**
         * Constructs a Pixel object and initializes it with the specified x and y coordinates.
         * @param x The horizontal pixel offset.
         * @param y The vertical pixel offset.
         */
        constructor(x: number, y: number);
        /**
         * Generates a Pixel object from an object that contains coordinate information.
         * The object is scanned for x and y properties using a case insensitive test.
         * @param data The object to extract coordinate information from.
         * @returns A Pixel object that represents the provided data information.
         */
        static fromData(data: object): Pixel;
        /**
         * Return the x coordinate of the specified pixel.
         * @param pixel The pixel to get the x coordinate of.
         */
        static getX(pixel: Pixel): number;
        /**
         * Return the y coordinate of the specified pixel.
         * @param pixel The pixel to get the y coordinate of.
         */
        static getY(pixel: Pixel): number;
        /**
         * Calculates a destination pixel given an origin pixel,
         * a heading relative to the y-axis (0 = north) with clockwise-rotation,
         * and a distance in pixel units.
         * @param origin The starting pixel.
         * @param heading The heading at which to move away from the origin pixel.
         * @param distance The distance to move from the origin pixel.
         */
        static getDestination(origin: Pixel, heading: number, distance: number): Pixel;
        /**
         * Calculates the distance between two pixels.
         * Returned value is in screen pixel units.
         * @param p1 The first pixel.
         * @param p2 The second pixel.
         */
        static getDistance(p1: Pixel, p2: Pixel): number;
        /**
         * Calculates the heading between two pixels.​ The heading value is relative to the y-axis (0 = north) with clockwise-rotation.
         * @param origin The pixel the heading will point away from.
         * @param destination The pixel the heading will point toward.
         */
        static getHeading(origin: Pixel, destination: Pixel): number;
    }

    export interface PopupEvents {
        drag: TargetedEvent;
        dragend: TargetedEvent;
        dragstart: TargetedEvent;
        open: TargetedEvent;
        close: TargetedEvent;
    }

    /**
     * An information window anchored at a specified position on a map.
     */
    export class Popup extends atlas.internal.EventEmitter<PopupEvents> {
        private static readonly Css;
        private dragOffset;
        private dragging;
        private contentDiv;
        private closeBtn;
        private arrowDiv;
        private containerDiv;
        private htmlContent;
        private options;
        private marker;
        private map;
        private autoAnchor;
        /**
         * Constructs a Popup object and initializes it with the specified options.
         * @param options The options for the popup.
         */
        constructor(options?: PopupOptions);
        /**
         * Sets the options for the popup.
         * @param options The options for the popup.
         * @deprecated Use setOptions(...) instead.
         */
        setPopupOptions(options?: PopupOptions): void;
        /**
         * Sets the options for the popup.
         * @param options The options for the popup.
         */
        setOptions(options?: PopupOptions): void;
        /**
         * Returns the options for the popup.
         * @deprecated Use getOptions() instead.
         */
        getPopupOptions(): PopupOptions;
        /**
         * Returns the options for the popup.
         */
        getOptions(): PopupOptions;
        /**
         * Attaches the popup to the HTML document in a hidden state.
         * @param map The map.
         */
        attach: (map: Map) => void;
        /**
         * Opens the popup.
         * @param map The map to open the popup on.
         * Optional if already attached to a map.
         */
        open: (map?: Map) => void;
        /**
         * Closes the popup on the map. The popup remains attached to the HTML document.
         */
        close: () => void;
        /**
         * Closes the popup on the map and removes it from the HTML document.
         */
        remove: () => void;
        /**
         * Returns true if the popup is currently open, otherwise false.
         */
        isOpen: () => boolean;
        /**
         * Creates the overall container div.
         */
        private _createContainerDiv;
        /**
         * Creates the content container div.
         */
        private _createContentDiv;
        /**
         * Creates an arrow element.
         */
        private _createArrowDiv;
        /**
         * Creates a close button.
         */
        private _createCloseButton;
        /**
         * Creates the user content element.
         */
        private _createHtmlContent;
        /**
         * Creates the marker which wraps the popup.
         */
        private _createMarker;
        /**
         * Calculates the auto anchor value for the current marker.
         */
        private _getAutoAnchor;
        /**
         * Replaces the current marker with a new one using the specified options.
         */
        private _replaceMarker;
        /**
         * Callback for the move listener used for auto anchoring.
         */
        private _onMove;
        /**
         * Called to setup or remove draggability.
         */
        private _setDraggable;
        /**
         * Called by a mouse down or touch start event.
         */
        private _onDown;
        /**
         * Called by the container's dragstart event.
         * Used to call preventDefault as a fix for Edge dragging issues.
         */
        private _onDragStart;
    }

    /** A set of properties that can be used with a `PopupTemplate` */
    export interface Properties<T = any> {
        [k: string]: T;
    }
    /** Species details of how a property is to be displayed. */
    export interface PropertyInfo {
        /**
         * The path to the property with each sub-property separated with a forward slash "/",
         * for example "property/subproperty1/subproperty2.
         * Array indices can be added as subproperties as well, for example "property/0"
         */
        propertyPath: string;
        /** The label to display for this property. If not specified, will fallback to the property name. */
        label?: string;
        /**
         * Specifies if the label of this property should be hidden and the content should span both columns of the table.
         * Default: `false`
         * @default false
         */
        hideLabel?: boolean;
        /**
         * If the property is a date object, these options specify how it should be formatted when displayed.
         * Uses [Date.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
         * If not specified, will fallback to the popup templates date format setting.
         */
        dateFormat?: Intl.DateTimeFormatOptions;
        /**
         * If the property is a number, these options specify how it should be formatted when displayed.
         * Uses [Number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).
         * If not specified, will fallback to the popup templates number format setting.
         */
        numberFormat?: Intl.NumberFormatOptions;
        /** Format options for hyperlink strings. */
        hyperlinkFormat?: HyperLinkFormatOptions;
    }
    /** Format option for hyperlink strings. */
    export interface HyperLinkFormatOptions {
        /**
         * Specifies the text that should be displayed to the user.
         * If not specified, the hyperlink will be displayed.
         * If the hyperlink is an image, this will be set as the "alt" property of the img tag.
         */
        label?: string;
        /**
         * Specifies if the hyperlink is for an image.
         * If set to true, the hyperlink will be loaded into an img tag and when clicked,
         * will open the hyperlink to the image.
         */
        isImage?: boolean;
        /**
         * Specifies the where the hyperlink should open.
         * Default: `"_blank"`
         * @default "_blank"
         */
        target?: "_blank" | "_self" | "_parent" | "_top";
        /** Specifies a scheme to prepend to a hyperlink such as 'mailto:' or 'tel:'. */
        scheme?: string;
    }
    /** A layout template for a popup. */
    export class PopupTemplate {
        /** The background color of the popup template. */
        fillColor?: string;
        /** The default text color of the popup template. */
        textColor?: string;
        /**
         * A HTML string for the title of the popup that contains placeholders for properties of the feature it is being displayed for.
         * Placeholders can be in the format "{propertyName}" or "{propertyName/subPropertyName}".
         */
        title?: string;
        /**
         * If a description is available, it will be written as the content rather than as a table of properties.
         * Default: `true`
         * @default true
         */
        singleDescription?: boolean;
        /**
         * A HTML string for the main content of the popup that contains placeholders for properties of the feature it is being displayed for.
         * Placeholders can be in the format "{propertyName}" or "{propertyName/subPropertyName}".
         */
        content?: string | PropertyInfo[] | Array<string | PropertyInfo[]>;
        /**
         * Specifies if content should be wrapped with a sandboxed iframe.
         * Unless explicitly set to false, the content will be sandboxed within an iframe by default.
         * When enabled, all content will be wrapped in a sandboxed iframe with scripts, forms, pointer lock and top navigation disabled.
         * Popups will be allowed so that links can be opened in a new page or tab.
         * Older browsers that don't support the srcdoc parameter on iframes will be limited to rendering a small amount of content.
         */
        sandboxContent?: boolean;
        /**
         * If the property is a date object, these options specify how it should be formatted when displayed.
         * Uses [Date.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString).
         * If not specified, dates will be converted to strings using
         * [Date.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
         */
        dateFormat?: Intl.DateTimeFormatOptions;
        /**
         * If the property is a number, these options specify how it should be formatted when displayed.
         * Uses [Number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString).
         */
        numberFormat?: Intl.NumberFormatOptions;
        /** Format options for hyperlink strings. */
        hyperlinkFormat?: HyperLinkFormatOptions;
        /**
         * Specifies if hyperlinks and email addresses should automatically be detected and rendered as clickable links.
         * Default: `true`
         * @default true
         */
        detectHyperlinks?: boolean;
        /**
         * Generates popup content by applying a template to a set of properties.
         * If no template is specified, `title` or `name` properties will be used as fallbacks for the title if available.
         * For content, a `description` property will be used or else all properties will be converted into a table.
         * @param prop The properties object generate the popup content from.
         * @param template The template to apply.
         */
        static applyTemplate(prop: Properties, template?: PopupTemplate): HTMLElement;
        /** Regular expression for content property placeholders. */
        private static readonly _placeholderRx;
        /** Regular expression for external URLs. */
        private static readonly _isUrlRx;
        /** Regular expression for image urls. */
        private static readonly _isImageUrlRx;
        /** Regular expression for email addresses. */
        private static readonly _emailRx;
        /** The URL to load our CSS from for iframed popups. */
        private static readonly _cssUrl;
        private static readonly Css;
        /**
         * Generates a sandboxed iframe that contains the specified content.
         * @param content The content to sandbox.
         */
        private static _createSandboxedIframe;
        /**
         * Appends an HTML element as a child of another element and adds a class name to the child if specified.
         * @param container The container to add the child element to.
         * @param child The child element to add.
         * @param className The class name to add to the child element.
         */
        private static _appendChild;
        /**
         * Generates the popup content based on the template and available properties.
         * @param properties The properties to apply to the template.
         * @param content The template content.
         * @param template The templates.
         */
        private static _generateContent;
        /**
         * Replaces placeholders with the property values in a string template.
         * @param properties The properties to use.
         * @param stringTemplate The string template to apply.
         * @param template The template.
         */
        private static _applyStringTemplate;
        /**
         * Retrieves the value of a property using its path.
         * @param properties The set of properties to search from.
         * @param propertyPath The path of the property.
         * @param template The template.
         * @param propertyInfo Property info to apply which specifies how the values should be displayed.
         */
        private static _getPropertyValue;
        /**
         * Generates a table from a set of properties filtered on an array of property info values.
         * @param properties The properties.
         * @param propertyInfo The property info values that specify which properties to display and how to display them.
         * @param template The template.
         */
        private static _generatePropertyInfoTable;
        /**
         * Dynamically creates a table from the property information. Recursively steps through the property tree.
         * @param properties The properties to generate a table for.
         * @param subPath The sub-path within the properties to generate the table for.
         * @param template The template.
         */
        private static _generateDynamicTableHtml;
        /**
         * Checks to see if the property should be ignored based on the key or value.
         * @param key The property name key.
         * @param value The value of the property.
         */
        static _ignoreProperty(key: string, value: any): boolean;
    }

    export interface ShapeEvents {
        shapechanged: Shape;
    }

    /**
     * A helper class that wraps a Geometry or Feature and makes it easy to update and maintain.
     */
    export class Shape extends atlas.internal.EventEmitter<ShapeEvents> {
        private data;
        private circlePolygon;
        /**
         * Constructs a Shape object and initializes it with the specified Feature.
         * @param data: a Feature which contains a Geometry object and properties.
         * If the feature does not have an id, a unique id value will be assigned to it.
         */
        constructor(data: atlas.data.Feature<atlas.data.Geometry, any>);
        /**
         * Constructs a Shape object and initializes it with the specified Geometry, ID, and properties.
         * @param data a Geometry object
         * @param id a unique id that the user assigns to the shape. If not provided, a unique id value will be assigned to it.
         * @param properties User defined properties for the shape.
         */
        constructor(data: atlas.data.Geometry, id?: string | number, properties?: any);
        /**
         * Adds or updates an existing property value in the shape.
         * @param key
         * @param value
         */
        addProperty(key: string, value: any): void;
        /**
         * Gets the bounding box of the shape
         */
        getBounds(): atlas.data.BoundingBox;
        /**
         * Gets the coordinates of the shape.
         */
        getCoordinates(): atlas.data.Position | atlas.data.Position[] | atlas.data.Position[][] | atlas.data.Position[][][];
        /**
         * If the shape is a circle, this gets its coordinates. Otherwise returns null.
         */
        getCircleCoordinates(): atlas.data.Position[];
        /**
         * Gets the id of the shape.
         */
        getId(): string | number;
        /**
         * Gets the properties of the shape.
         */
        getProperties(): any;
        /**
         * Returns a string indicating the type of geometry this shape contains.
         */
        getType(): string;
        /**
         * Indicates if the contained shape is a Circle, defined by the extended GeoJSON specification supported by Azure Maps.
         * [Extended Spec]{@link https://docs.microsoft.com/en-us/azure/azure-maps/extend-geojson}
         */
        isCircle(): boolean;
        /**
         * Indicates if the contained shape is a Rectangle, defined by the extended GeoJSON specification supported by Azure Maps.
         * [Extended Spec]{@link https://docs.microsoft.com/en-us/azure/azure-maps/extend-geojson}
         */
        isRectangle(): boolean;
        /**
         * Updates the coordinates of the shape
         * @param coords Point: Position, LineString: Position[], Polygon: Position[][],
         * MultiPoint: Position[], MultiLineString: Position[][], MultiPolygon: Position[][]
         */
        setCoordinates(coords: atlas.data.Position | atlas.data.Position[] | atlas.data.Position[][] | atlas.data.Position[][][]): void;
        /**
         * Sets the properties on the shape. Overwrites all existing properties.
         * @param properties
         */
        setProperties(properties: any): void;
        /**
         * Returns a GeoJSON feature that represents the shape.
         */
        toJson(): atlas.data.Feature<atlas.data.Geometry, any>;
        /**
         * Check if the shape's wrapped feature is a circle form the extended GeoJSON spec.
         * If so it will calculate a polygon feature that approximates the specified circle.
         * @private
         */
        private _handleCircle;

        /** A reference to the original Google Maps feature the shape represents. */
        public _googleFeature: any;

        public dataSource: atlas.source.DataSource;
    }

    export interface HtmlMarkerEvents {
        click: TargetedEvent;
        dblclick: TargetedEvent;
        contextmenu: TargetedEvent;
        drag: TargetedEvent;
        dragend: TargetedEvent;
        dragstart: TargetedEvent;
        keydown: TargetedEvent;
        keypress: TargetedEvent;
        keyup: TargetedEvent;
        mousedown: TargetedEvent;
        mouseup: TargetedEvent;
        mousemove: TargetedEvent;
        mouseout: TargetedEvent;
    }

    /**
     * This class wraps an HTML element that can be displayed on the map.
     */
    export class HtmlMarker extends atlas.internal.EventEmitter<HtmlMarkerEvents> {
        private static readonly collectionContainerClass;
        private static readonly hiddenClass;
        private static readonly containerClass;
        private options;
        private marker;
        private element;
        private map;
        /**
         * Constructs a new HtmlMarker.
         * @param options The options for the HtmlMarker.
         */
        constructor(options?: HtmlMarkerOptions);
        /**
         * Gets the HTML marker options.
         */
        getOptions(): HtmlMarkerOptions;
        /**
         * Sets the options of the marker.
         * @param options The options for the marker.
         */
        setOptions(options: HtmlMarkerOptions): void;
        /**
         * Toggles the popup attached to the marker.
         */
        togglePopup(): void;
        /**
         * Builds the Mapbox marker that this HtmlMarker will wrap.
         * @private
         */
        private _buildMarker;
        /**
         * Returns a HTML string with all place holders substituted for.
         * @private
         */
        private _getSubbedHtmlString;
        /**
         * Returns the element that should contain all the markers.
         * Creates it if it doesn't already exist.
         * @private
         */
        private _getCollectionContainer;
        /**
         * Called to set the element dragstart listener, needed for proper draggability on Edge.
         */
        private _setDraggable;
        /**
         * Called by the drag event of the mapbox marker.
         * @private
         */
        private _onDrag;
        /**
         * Called by the dragstart event of the mapbox marker.
         * @private
         */
        private _onDragStart;
        /**
         * Called by the dragend event of the mapbox marker.
         * @private
         */
        private _onDragEnd;
        /**
         * Called by the events of the marker's element.
         * @private
         */
        private _bubbleElementEvent;
        /**
         * Called by the element's dragstart event.
         * Used to call preventDefault so Edge doesn't break dragging.
         * @private
         */
        private _onEleDragStart;
    }

    /**
     * Gets the default authentication options that were provided.
     * If not previously set all properties will be undefined.
     */
    export function getAuthenticationOptions(): AuthenticationOptions;
    /**
     * Gets the default domain that was provided.
     * If not previously set the default value is `"atlas.microsoft.com"`.
     */
    export function getDomain(): string;
    /**
     * Gets the default language that was provided.
     * If not previously set the default value is `"NGT"`.
     */
    export function getLanguage(): string;
    /**
     * Gets the default session id that was provided.
     * If not previously set the default value is a random UUID.
     */
    export function getSessionId(): string;
    /**
     * Gets the default Azure Maps subscription key that was provided.
     */
    export function getSubscriptionKey(): string;
    /**
     * @deprecated use atlas.getView() instead
     */
    export function getUserRegion(): string;
    /**
     * Gets the default view setting of the map control.
     * If not previously set the default value is `undefined`.
     */
    export function getView(): string;
    /**
     * Current API version number based on build number.
     */
    export function getVersion(): string;
    /**
     * Checks to see if the user's browser is supported by the map control.
     * @param failIfMajorPerformanceCaveat If true the function will return false
     * if the performance of the map control would be dramatically worse than expected
     * (e.g. a software WebGL renderer would be used).
     */
    export function isSupported(failIfMajorPerformanceCaveat?: boolean): boolean;
    /**
     * Sets your authentication options as the default options in the atlas namespace
     * which is used by the map control and any modules that make requests to the Azure maps services.
     * If a Map is initialized with the authentication options explicitly defined and
     * setAuthenticationOptions hasn't previously been called it will automatically be called by the Map constructor.
     * @param options The new default authentication options.
     */
    export function setAuthenticationOptions(options: AuthenticationOptions): void;
    /**
     * Sets the default domain used by the map and service modules unless the
     * domain is explicitly specified when using those parts of the API.
     * If a Map is initialized with the domain explicitly defined and
     * setDomain hasn't previously been called it will automatically be called by the Map constructor.
     * If the protocol is not specified `https` is assumed.
     * @param domain The new default domain.
     */
    export function setDomain(domain: string): void;
    /**
     * Sets the default language used by the map and service modules unless the
     * language is explicitly specified when using those parts of the API.
     * If a Map is initialized with the language explicitly defined and
     * setLanguage hasn't previously been called it will automatically be called by the Map constructor.
     * @param language The new default language.
     */
    export function setLanguage(language: string): void;
    /**
     * Sets the default session id used by the map and service modules unless the
     * session id is explicitly specified when using those parts of the API.
     * If a Map is initialized with the session ID explicitly defined and
     * setSessionId hasn't previously been called it will automatically be called by the Map constructor.
     * @param id The new default session id.
     */
    export function setSessionId(id: string): void;
    /**
     * Sets your Azure Maps subscription key as the default subscription key in the atlas namespace
     * which is used by the map control and any modules that make requests to the Azure maps services.
     * If a Map is initialized with the subscription key explicitly defined and
     * setSubscriptionKey hasn't previously been called it will automatically be called by the Map constructor.
     * @param key The new default subscription key.
     */
    export function setSubscriptionKey(key: string): void;
    /**
     * @deprecated use atlas.setView(view: string) instead.
     */
    export function setUserRegion(userRegion: string): void;
    /**
     * Specifies which set of geopolitically disputed borders and labels are displayed on the map. The View parameter (also referred to as “user region parameter”) is a 2-letter ISO-3166 Country Code that will show the correct maps for that country/region. Country/Regions that are not on the View list or if unspecified will default to the “Unified” View.
     * Please see the supported [Views]{@link https://aka.ms/AzureMapsLocalizationViews }.
     * It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that You are authorized to access via Azure Maps is made available.
     * @param view The new default view
     */
    export function setView(view: string): void;
    /**
     * Adds an image template to the atlas namespace.
     * @param templateName The name of the template.
     * @param template The SVG template to add. Supports {color}, {secondaryColor}, {scale}, {text}.
     * @param override Specifies if it should override existing templates if one with the same name already exists.
     */
    export function addImageTemplate(templateName: string, template: string, override: boolean): void;
    /**
     * Retrieves an SVG template by name.
     * @param templateName The name of the template to retrieve.
     * @param scale Specifies how much to scale the template. For best results, scale the icon to the maximum size you want to display it on the map, then use the symbol layers icon size option to scale down if needed. This will reduce blurriness due to scaling. Default: 1
     */
    export function getImageTemplate(templateName: string, scale?: number): string;
    /**
     * Retrieves an array of names for all image templates that are available in the atlas namespace.
     */
    export function getAllImageTemplateNames(): string[];

    /**
     * Options used when rendering Point objects in a BubbleLayer.
     */
    export interface BubbleLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;
        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;
        /**
         * The color to fill the circle symbol with.
         * Default `"#1A73AA"`.
         * @default "#1A73AA"
         */
        color?: string | Expression;
        /**
         * The amount to blur the circles.
         * A value of 1 blurs the circles such that only the center point if at full opacity.
         * Default `0`.
         * @default 0
         */
        blur?: number | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the circles will be drawn.
         * Default `1`.
         * @default 1
         */
        opacity?: number | Expression;
        /**
         * The color of the circles' outlines.
         * Default `"#FFFFFF"`.
         * @default "#FFFFFF"
         */
        strokeColor?: string | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the circles' outlines will be drawn.
         * Default `1`.
         * @default 1
         */
        strokeOpacity?: number | Expression;
        /**
         * The width of the circles' outlines in pixels.
         * Default `2`.
         * @default 2
         */
        strokeWidth?: number | Expression;
        /**
         * Specifies the orientation of circle when map is pitched.
         * <p>`"map"`: The circle is aligned to the plane of the map.</p>
         * <p>`"viewport"`: The circle is aligned to the plane of the viewport.</p>
         * Default: `"viewport"`
         * @default "viewport"
         */
        pitchAlignment?: "map" | "viewport";
        /**
         * The radius of the circle symbols in pixels.
         * Must be greater than or equal to 0.
         * Default `8`.
         * @default 8
         */
        radius?: number | Expression;
    }

    /**
     * Options used to customize the icons in a SymbolLayer
     */
    export interface IconOptions extends Options {
        /**
         * Specifies if the symbol icon can overlay other symbols on the map.
         * If `true` the icon will be visible even if it collides with other previously drawn symbols.
         * Tip: Set this to true if animating an symbol to ensure smooth rendering.
         * Default `false`.
         * @default false
         */
        allowOverlap?: boolean;
        /**
         * Specifies which part of the icon is placed closest to the icons anchor position on the map.
         * <p>`"center"`: The center of the icon is placed closest to the anchor.</p>
         * <p>`"left"`: The left side of the icon is placed closest to the anchor.</p>
         * <p>`"right"`: The right side of the icon is placed closest to the anchor.</p>
         * <p>`"top"`: The top of the icon is placed closest to the anchor.</p>
         * <p>`"bottom"`: The bottom of the icon is placed closest to the anchor.</p>
         * <p>`"top-left"`: The top left corner of the icon is placed closest to the anchor.</p>
         * <p>`"top-right"`: The top right corner of the icon is placed closest to the anchor.</p>
         * <p>`"bottom-left"`: The bottom left corner of the icon is placed closest to the anchor.</p>
         * <p>`"bottom-right"`: The bottom right corner of the icon is placed closest to the anchor.</p>
         * Default `"bottom"`.
         * @default "bottom"
         */
        anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | Expression;
        /**
         * Specifies if other symbols can overlap this symbol.
         * If true, other symbols can be visible even if they collide with the icon.
         * Default `false`.
         * @default false
         */
        ignorePlacement?: boolean;
        /**
         * The name of the image in the map's image sprite to use for drawing the icon.
         * Available built-in images are: `marker-black`, `marker-blue`, `marker-darkblue`,
         * `marker-red`, `marker-yellow`, `pin-blue`, `pin-darkblue`, `pin-red`, `pin-round-blue`,
         * `pin-round-darkblue`, `pin-round-red`.
         * Default `"marker-blue"`.
         * @default "marker-blue"
         */
        image?: string | Expression;
        /**
         * Specifies an offset distance of the icon from its anchor in pixels.
         * Positive values indicate right and down, while negative values indicate left and up.
         * Each component is multiplied by the value of size to obtain the final offset in pixels.
         * When combined with rotation the offset will be as if the rotated direction was up.
         * Default `[0, 0]`.
         * @default [0, 0]
         */
        offset?: atlas.Pixel | Expression;
        /**
         * Specifies if a symbols icon can be hidden but its text displayed if it is overlapped with another symbol.
         * If true, text will display without their corresponding icons
         * when the icon collides with other symbols and the text does not.
         * Default `false`.
         * @default false
         */
        optional?: boolean;
        /**
         * Specifies the orientation of the icon when the map is pitched.
         * <p>`"auto"`: Automatically matches the value of `rotationAlignment`.</p>
         * <p>`"map"`: The icon is aligned to the plane of the map.</p>
         * <p>`"viewport"`: The icon is aligned to the plane of the viewport</p>
         * Default `"auto"`
         * @default "auto"
         */
        pitchAlignment?: "auto" | "map" | "viewport";
        /**
         * The amount to rotate the icon clockwise in degrees
         * Default `0`.
         * @default 0
         */
        rotation?: number | Expression;
        /**
         * In combination with the placement property of a SymbolLayerOptions
         * this determines the rotation behavior of icons.
         * <p>`"auto"`: When placement is "point" this is equivalent to "viewport".
         * When placement is "line" this is equivalent to "map".</p>
         * <p>`"map"`: When placement is "point" aligns icons east-west.
         * When placement is "line" aligns the icons' x-axes with the line.</p>
         * <p>`"viewport"`: Icons' x-axes will align with the x-axis of the viewport.</p>
         * Default `"auto"`.
         * @default "auto"
         */
        rotationAlignment?: "auto" | "map" | "viewport";
        /**
         * Scales the original size of the icon by the provided factor.
         * Must be greater or equal to 0.
         * Default `1`.
         * @default 1
         */
        size?: number | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the icon will be drawn.
         * Default `1`.
         * @default 1
         */
        opacity?: number | Expression;
    }

    /**
     * A base class which all other layer options inherit from.
     */
    export interface LayerOptions extends Options {
        /**
         * An expression specifying conditions on source features.
         * Only features that match the filter are displayed.
         */
        filter?: Expression;
        /**
         * An integer specifying the minimum zoom level to render the layer at.
         * This value is inclusive, i.e. the layer will be visible at `maxZoom > zoom >= minZoom`.
         * Default `0`.
         * @default 0
         */
        minZoom?: number;
        /**
         * An integer specifying the maximum zoom level to render the layer at.
         * This value is exclusive, i.e. the layer will be visible at `maxZoom > zoom >= minZoom`.
         * Default `24`.
         * @default 24
         */
        maxZoom?: number;
        /**
         * Specifies if the layer is visible or not.
         * Default `true`.
         * @default true
         */
        visible?: boolean;
    }

    /**
     * Options used when rendering Point objects in a HeatMapLayer.
     */
    export interface HeatMapLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;

        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;

        /**
         * Specifies the color gradient used to colorize the pixels in the heatmap. 
         * This is defined using an expression that uses `["heatmap-density"]` as input. 
         * Default `["interpolate",["linear"],["heatmap-density"],0,"rgba(0,0, 255,0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]`
         * @default `["interpolate",["linear"],["heatmap-density"],0,"rgba(0,0, 255,0)",0.1,"royalblue",0.3,"cyan",0.5,"lime",0.7,"yellow",1,"red"]`
         */
        color?: Expression;

        /**
         * Similar to `heatmap-weight` but specifies the global heatmap intensity. 
         * The higher this value is, the more ‘weight’ each point will contribute to the appearance.
         * Default `1`
         * @default 1
         */
        intensity?: number | Expression;

        /**
         * The opacity at which the heatmap layer will be rendered defined as a number between 0 and 1.
         * Default `1`.
         * @default 1
         */
        opacity?: number | Expression;

        /**
         * The radius in pixels used to render a data point on the heatmap. 
         * The radius must be a number greater or equal to 1.
         * Default `30`.
         * @default 30
         */
        radius?: number | Expression;

        /**
         * Specifies how much an individual data point contributes to the heatmap. 
         * Must be a number greater than 0. A value of 5 would be equivalent to having 5 points of weight 1 in the same spot. 
         * This is useful when clustering points to allow heatmap rendering or large datasets. 
         * Default `1`
         * @default 1
         */
        weight?: number | Expression;
    }

    /**
    * Options used when rendering Point objects in a ImageLayer.
    */
    export interface ImageLayerOptions extends MediaLayerOptions {
        /**
         * URL to an image to overlay. Images hosted on other domains must have CORs enabled.
         */
        url?: string;

        /**
         * An array of positions for the corners of the image listed in clockwise order: [top left, top right, bottom right, bottom left].
         */
        coordinates?: atlas.data.Position[];
    }

    /**
     * Options used when rendering SimpleLine, SimplePolygon, CirclePolygon,
     * LineString, MultiLineString, Polygon, and MultiPolygon objects in a line layer.
     */
    export interface LineLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;
        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;
        /**
         * Specifies how the ends of the lines are rendered.
         * <p>`"butt"`: A cap with a squared-off end which is drawn to the exact endpoint of the line.</p>
         * <p>`"round"`: A cap with a rounded end which is drawn beyond the endpoint of the line
         * at a radius of one-half of the lines width and centered on the endpoint of the line.</p>
         * <p>`"square"`: A cap with a squared-off end which is drawn beyond the endpoint of the line
         * at a distance of one-half of the line width.</p>
         * Default `"round"`.
         * @default "round"
         */
        lineCap?: "butt" | "round" | "square";
        /**
         * Specifies how the joints in the lines are rendered.
         * <p>`"bevel"`: A join with a squared-off end which is drawn beyond the endpoint of the line
         * at a distance of one-half of the lines width.</p>
         * <p>`"round"`: A join with a rounded end which is drawn beyond the endpoint of the line
         * at a radius of one-half of the lines width and centered on the endpoint of the line.</p>
         * <p>`"miter"`: A join with a sharp, angled corner which is drawn with the outer sides
         * beyond the endpoint of the path until they meet.</p>
         * Default `"round"`.
         * @default "round"
         */
        lineJoin?: "bevel" | "round" | "miter";
        /**
         * The amount of blur to apply to the line in pixels.
         * Default `0`.
         * @default 0
         */
        blur?: number | Expression;
        /**
         * Specifies the color of the line.
         * Default `"#1E90FF"`.
         * @default "#1E90FF"
         */
        strokeColor?: string | Expression;
        /**
         * Specifies the lengths of the alternating dashes and gaps that form the dash pattern.
         * Numbers must be equal or greater than 0. The lengths are scaled by the strokeWidth.
         * To convert a dash length to pixels, multiply the length by the current stroke width.
         */
        strokeDashArray?: number[];
        /**
         * Defines a gradient with which to color the lines.
         * Requires the DataSource lineMetrics option to be set to true.
         * Disabled if strokeDashArray is set.
         */
        strokeGradient?: Expression;
        /**
         * The line's offset.
         * A positive value offsets the line to the right, relative to the direction of the line.
         * A negative value offsets to the left.
         * Default `0`.
         * @default 0
         */
        offset?: number | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the line will be drawn.
         * Default `1`.
         * @default 1
         */
        strokeOpacity?: number | Expression;
        /**
         * The amount of offset in pixels to render the line relative to where it would render normally.
         * Negative values indicate left and up.
         * Default: `[0,0]`
         * @default [0, 0]
         */
        translate?: Pixel;
        /**
         * Specifies the frame of reference for `translate`.
         * <p>`"map"`: Lines are translated relative to the map.</p>
         * <p>`"viewport"`: Lines are translated relative to the viewport</p>
         * Default: `"map"`
         * @default "map"
         */
        translateAnchor?: "map" | "viewport";
        /**
         * The width of the line in pixels. Must be a value greater or equal to 0.
         * Default `2`.
         * @default 2
         */
        strokeWidth?: number | Expression;
    }

    /**
     * Options used when rendering canvas, image, raster tile, and video layers
     */
    export interface MediaLayerOptions extends LayerOptions {
        /**
         * A number between -1 and 1 that increases or decreases the contrast of the overlay.
         * Default `0`.
         * @default 0
         */
        contrast?: number;
        /**
         * The duration in milliseconds of a fade transition when a new tile is added.
         * Must be greater or equal to 0.
         * Default `300`.
         * @default 300
         */
        fadeDuration?: number;
        /**
         * Rotates hues around the color wheel.
         * A number in degrees.
         * Default `0`.
         * @default 0
         */
        hueRotation?: number;
        /**
         * A number between 0 and 1 that increases or decreases the maximum brightness of the overlay.
         * Default `1`.
         * @default 1
         */
        maxBrightness?: number;
        /**
         * A number between 0 and 1 that increases or decreases the minimum brightness of the overlay.
         * Default `0`.
         * @default 0
         */
        minBrightness?: number;
        /**
         * A number between 0 and 1 that indicates the opacity at which the overlay will be drawn.
         * Default `1`.
         * @default 1
         */
        opacity?: number;
        /**
         * A number between -1 and 1 that increases or decreases the saturation of the overlay.
         * Default `0`.
         * @default 0
         */
        saturation?: number;
    }

    /**
     * Options used when rendering `Polygon` and `MultiPolygon` objects in a `PolygonExtrusionLayer`.
     */
    export interface PolygonExtrusionLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;
        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;
        /**
         * The height in meters to extrude the base of this layer.
         * This height is relative to the ground.
         * Must be greater or equal to 0 and less than or equal to `height`.
         * Default `0`.
         * @default 0
         */
        base?: number | Expression;
        /**
         * The color to fill the polygons with.
         * Ignored if `fillPattern` is set.
         * Default `"#1E90FF"`.
         * @default "#1E90FF"
         */
        fillColor?: string | Expression;
        /**
         * The height in meters to extrude this layer.
         * This height is relative to the ground.
         * Must be a number greater or equal to 0.
         * Default `0`
         * @default 0
         */
        height?: number | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the fill will be drawn.
         * Default `1`.
         * @default 1
         */
        fillOpacity?: number;
        /**
         * Name of image in sprite to use for drawing image fills.
         * For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512).
         */
        fillPattern?: string;
        /**
         * The polygons' pixel offset.
         * Values are [x, y] where negatives indicate left and up, respectively.
         * Default `[0, 0]`
         * @default [0, 0]
         */
        translate?: Pixel;
        /**
         * Specifies the frame of reference for `translate`.
         * <p>`"map"`: Polygons are translated relative to the map.</p>
         * <p>`"viewport"`: Polygons are translated relative to the viewport.</p>
         * Default: `"map"`
         * @default "map"
         */
        translateAnchor?: "map" | "viewport";
        /**
         * Specifies if the polygon should have a vertical gradient on the sides of the extrusion.
         * Default: `true`
         * @default true
         */
        verticalGradient?: boolean;
    }

    /**
     * Options used when rendering Polygon and MultiPolygon objects in a PolygonLayer.
     */
    export interface PolygonLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;
        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;
        /**
         * The color to fill the polygons with.
         * Default `"#1E90FF"`.
         * @default "#1E90FF"
         */
        fillColor?: string | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the fill will be drawn.
         * Default `0.5`.
         * @default 0.5
         */
        fillOpacity?: number | Expression;

        /**
         * Name of image in sprite to use for drawing image fills. For seamless patterns, image width must be a factor of two (2, 4, 8, ..., 512).
         */
        fillPattern?: string | Expression;
    }

    /**
     * Options used when rendering geometries in a SymbolLayer.
     */
    export interface SymbolLayerOptions extends LayerOptions {
        /**
         * The id or instance of a data source which the layer will render.
         */
        source?: string | atlas.source.Source;
        /**
         * Required when the source of the layer is a VectorTileSource.
         * A vector source can have multiple layers within it, this identifies which one to render in this layer.
         * Prohibited for all other types of sources.
         */
        sourceLayer?: string;
        /**
         * Options used to customize the icons of the symbols.
         * @see IconOptions for defaults.
         */
        iconOptions?: IconOptions;
        /**
         * Options used to customize the text of the symbols.
         * @see TextOptions for defaults.
         */
        textOptions?: TextOptions;
        /**
         * Specifies the label placement relative to its geometry.
         * <p>`"point"`: The label is placed at the point where the geometry is located.</p>
         * <p>`"line"`: The label is placed along the line of the geometry.
         * Can only be used on LineString and Polygon geometries.</p>
         * <p> `"line-center"`: The label is placed at the center of the line of the geometry.
         * Can only be used on `LineString` and `Polygon` geometries </p>
         * Default `"point"`.
         * @default "point"
         */
        placement?: "point" | "line" | "line-center";
        /**
         * Distance in pixels between two symbol anchors along a line. Must be greater or equal to 1.
         * Default `250`.
         * @default 250
         */
        lineSpacing?: number | Expression;
    }

    /**
     * Options used to customize the text in a SymbolLayer
     */
    export interface TextOptions extends Options {
        /**
         * Specifies if the text will be visible if it collides with other symbols.
         * If true, the text will be visible even if it collides with other previously drawn symbols.
         * Default `false`.
         * @default false
         */
        allowOverlap?: boolean;
        /**
         * Specifies which part of the icon is placed closest to the icons anchor position on the map.
         * <p>`"center"`: The center of the icon is placed closest to the anchor.</p>
         * <p>`"left"`: The left side of the icon is placed closest to the anchor.</p>
         * <p>`"right"`: The right side of the icon is placed closest to the anchor.</p>
         * <p>`"top"`: The top of the icon is placed closest to the anchor.</p>
         * <p>`"bottom"`: The bottom of the icon is placed closest to the anchor.</p>
         * <p>`"top-left"`: The top left corner of the icon is placed closest to the anchor.</p>
         * <p>`"top-right"`: The top right corner of the icon is placed closest to the anchor.</p>
         * <p>`"bottom-left"`: The bottom left corner of the icon is placed closest to the anchor.</p>
         * <p>`"bottom-right"`: The bottom right corner of the icon is placed closest to the anchor.</p>
         * Default `"center"`.
         * @default "center"
         */
        anchor?: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right" | Expression;
        /**
         * Specifies the name of a property on the features to use for a text label.
         */
        textField?: string | Expression;
        /**
         * The font stack to use for displaying text.
         * Possible values: `"SegoeFrutigerHelveticaMYingHei-Bold"`, `"SegoeFrutigerHelveticaMYingHei-Medium"`,
         * `"SegoeFrutigerHelveticaMYingHei-Regular"`, `"SegoeUi-Bold"`, `"SegoeUi-Light"`, `"SegoeUi-Regular"`,
         * `"SegoeUi-SemiBold"`, `"SegoeUi-SemiLight"`, `"SegoeUi-SymbolRegular"`, `"StandardCondensedSegoeUi-Black"`,
         * `"StandardCondensedSegoeUi-Bold"`, `"StandardCondensedSegoeUi-Light"`, `"StandardCondensedSegoeUi-Regular"`,
         * `"StandardFont-Black"`, `"StandardFont-Bold"`, `"StandardFont-Light"`, `"StandardFont-Regular"`,
         * `"StandardFontCondensed-Black"`, `"StandardFontCondensed-Bold"`, `"StandardFontCondensed-Light"`,
         * `"StandardFontCondensed-Regular"`.
         * Default `["StandardFont-Regular"]`.
         * @default ["StandardFont-Regular"]
         */
        font?: string[] | Expression;
        /**
         * Specifies if the other symbols are allowed to collide with the text.
         * If true, other symbols can be visible even if they collide with the text.
         * Default `false`.
         * @default false
         */
        ignorePlacement?: boolean;
        /**
         * Specifies an offset distance of the icon from its anchor in ems.
         * Positive values indicate right and down, while negative values indicate left and up.
         * Default `[0, 0]`.
         * @default [0, 0]
         */
        offset?: atlas.Pixel | Expression;
        /**
         * Specifies if the text can be hidden if it is overlapped by another symbol.
         * If true, icons will display without their corresponding text
         * when the text collides wit other symbols and the icon does not.
         * Default `false`.
         * @default false
         */
        optional?: boolean;
        /**
         * Specifies the orientation of the text when the map is pitched.
         * <p>`"auto"`: Automatically matches the value of `rotationAlignment`.</p>
         * <p>`"map"`: The text is aligned to the plane of the map.</p>
         * <p>`"viewport"`: The text is aligned to the plane of the viewport.</p>
         * Default: `"auto"`
         * @default "auto"
         */
        pitchAlignment?: "auto" | "map" | "viewport";
        /**
         * The amount to rotate the text clockwise in degrees.
         * Default `0`
         * @default 0
         */
        rotation?: number | Expression;
        /**
         * In combination with the `placement` property of the `SymbolLayerOptions`,
         * specifies the rotation behavior of the individual glyphs forming the text.
         * <p>`"auto"`: When the `placement` is set to `"point"`, this is equivalent to `"map"`.
         * When the `placement` is set to `"line"` this is equivalent to `"map"`.</p>
         * <p>`"map"`: When the `placement` is set to `"point"`, aligns text east-west.
         * When the `placement` is set to `"line"`, aligns text x-axes with the line.</p>
         * <p>`"viewport"`: Produces glyphs whose x-axes are aligned with the x-axis of the viewport,
         * regardless of the value of `placement`.</p>
         * Default: `"auto"`
         * @default "auto"
         */
        rotationAlignment?: "auto" | "map" | "viewport";
        /**
         * The size of the font in pixels.
         * Must be a number greater or equal to 0.
         * Default `16`.
         * @default 16
         */
        size?: number | Expression;
        /**
         * The color of the text.
         * Default `"#000000"`.
         * @default "#000000"
         */
        color?: string | Expression;
        /**
         * The halo's fadeout distance towards the outside in pixels.
         * Must be a number greater or equal to 0.
         * Default `0`.
         * @default 0
         */
        haloBlur?: number | Expression;
        /**
         * The color of the text's halo, which helps it stand out from backgrounds.
         * Default `"rgba(0,0,0,0)"`.
         * @default "rgba(0,0,0,0)"
         */
        haloColor?: string | Expression;
        /**
         * The distance of the halo to the font outline in pixels.
         * Must be a number greater or equal to 0.
         * The maximum text halo width is 1/4 of the font size.
         * Default `0`.
         * @default 0
         */
        haloWidth?: number | Expression;
        /**
         * A number between 0 and 1 that indicates the opacity at which the text will be drawn.
         * Default `1`.
         * @default 1
         */
        opacity?: number | Expression;
    }

    /**
     * Options used when rendering raster tiled images in a TileLayer.
     */
    export interface TileLayerOptions extends MediaLayerOptions {
        /**
         * A bounding box that specifies where tiles are available.
         * When specified, no tiles outside of the bounding box will be requested.
         * Default `[-180, -85.0511, 180, 85.0511]`.
         * @default [-180, -85.0511, 180, 85.0511]
         */
        bounds?: atlas.data.BoundingBox;
        /**
         * An integer specifying the minimum zoom level in which tiles are available from the tile source.
         * Default `0`.
         * @default 0
         */
        minSourceZoom?: number;
        /**
         * An integer specifying the maximum zoom level in which tiles are available from the tile source.
         * Default `22`.
         * @default 22
         */
        maxSourceZoom?: number;
        /**
         * An integer value that specifies the width and height dimensions of the map tiles.
         * For a seamless experience, the tile size must be a multiplier of 2.
         * Default `512`.
         * @default 512
         */
        tileSize?: number;
        /**
         * Specifies if the tile systems coordinates uses the Tile Map Services specification,
         * which reverses the Y coordinate axis.
         * Default `false`.
         * @default false
         */
        isTMS?: boolean;
        /**
         * An array of subdomain values to apply to the tile URL.
         */
        subdomains?: string[];
        /**
         * A http/https URL to a TileJSON resource or a tile URL template that uses the following parameters:
         * <p>{x}: X position of the tile. Usually also needs {y} and {z}.</p>
         * <p>{y}: Y position of the tile. Usually also needs {x} and {z}.</p>
         * <p>{z}: Zoom level of the tile. Usually also needs {x} and {y}.</p>
         * <p>{quadkey}: Tile quadKey id based on the Bing Maps tile system naming convention.</p>
         * <p>{bbox-epsg-3857}: A bounding box string with the format {west},{south},{east},{north}
         * in the EPSG 4325 Spacial Reference System.</p>
         * <p>{subdomain}: A placeholder where the subdomain values if specified will be added.</p>
         */
        tileUrl?: string;
    }

    /**
     * Available styles for a Control.
     */
    export enum ControlStyle {
        /**
         * The control will be in the light style.
         * Literal value `"light"`
         */
        light = "light",
        /**
         * The control will be in the dark style.
         * Literal value `"dark"`
         */
        dark = "dark",
        /**
         * The control will automatically switch styles based on the style of the map.
         * If a control doesn't support automatic styling the light style will be used by default.
         * Literal value `"auto"`
         */
        auto = "auto"
    }

    /**
     * The options for a CompassControl object.
     */
    export interface CompassControlOptions extends Options {
        /**
         * The angle that the map will rotate with each click of the control.
         * Default `15`.
         * @default 15
         */
        rotationDegreesDelta?: number;
        /**
         * The style of the control.
         * Default `ControlStyle.light`
         * @default ControlStyle.light
         */
        style?: ControlStyle;
    }

    /**
     * The options for a PitchControl object.
     */
    export interface PitchControlOptions extends Options {
        /**
         * The angle that the map will tilt with each click of the control.
         * Default `10`.
         * @default 10
         */
        pitchDegreesDelta: number;
        /**
         * The style of the control.
         * Default `ControlStyle.light`.
         * @default ControlStyle.light
         */
        style: ControlStyle;
    }

    /**
     * The options for a StyleControl object.
     */
    export interface StyleControlOptions extends Options {
        /**
         * The layout to display the styles in.
         * <p>`"icons"`: A row of clickable icons for each style.</p>
         * <p>`"list"`: A scrollable list with the icons and names for each style.</p>
         * Default `"icons"`
         * @default "icons"
         */
        layout?: "icons" | "list";
        /**
         * The map styles to show in the control.
         * Style names are case sensitive.
         * If an included style isn't supported by the map it will be ignored.
         * Available styles can be found in the
         * [supported styles]{@link https://docs.microsoft.com/en-us/azure/azure-maps/supported-map-styles} article.
         * If "all" is specified, all map styles will be shown.
         * Default `["road", "grayscale_light", "grayscale_dark", "night", "road_shaded_relief"]`
         * @default ["road", "grayscale_light", "grayscale_dark", "night", "road_shaded_relief"]
         */
        mapStyles?: string[] | "all";
        /**
         * The style of the control.
         * Default `ControlStyle.light`.
         * @default ControlStyle.light
         */
        style?: ControlStyle;
    }

    /**
     * The options for a ZoomControl object.
     */
    export interface ZoomControlOptions extends Options {
        /**
         * The extent to which the map will zoom with each click of the control.
         * Default `1`.
         * @default 1
         */
        zoomDelta: number;
        /**
         * The style of the control.
         * Default `ControlStyle.light`.
         * @default ControlStyle.light
         */
        style: ControlStyle;
    }

    /**
     * The options for animating changes to the map control's camera.
     */
    export interface AnimationOptions extends Options {
        /**
         * The duration of the animation in milliseconds.
         * Default `1000`.
         * @default 1000
         */
        duration?: number;
        /**
         * The type of animation.
         * <p>"jump" is an immediate change.</p>
         * <p>"ease" is a gradual change of the camera's settings.</p>
         * <p>"fly" is a gradual change of the camera's settings following an arc resembling flight.</p>
         * Default `"jump"`.
         * @default "jump"
         */
        type?: "jump" | "ease" | "fly";
    }

    /**
     * The options for setting the bounds of the map control's camera.
     */
    export interface CameraBoundsOptions extends Options {
        /**
         * The bounds of the map control's camera.
         * `default [-180, -89, 180, 90]`
         * @default [-180, -89, 180, 90]
         */
        bounds?: atlas.data.BoundingBox;
        /**
         * A bounding box in which to constrain the viewable map area to.
         * Users won't be able to pan the center of the map outside of this bounding box.
         * Set maxBounds to null or undefined to remove maxBounds
         * Default `undefined`.
         * @default undefined
         */
        maxBounds?: atlas.data.BoundingBox;
        /**
         * The maximum zoom level to allow when the map view transitions to the specified bounds.
         * `default 20`
         * @default 20
         */
        maxZoom?: number;
        /**
         * An offset of the center of the given bounds relative to the map's center, measured in pixels.
         * `default [0, 0]`
         * @default [0, 0]
         */
        offset?: atlas.Pixel;
        /**
         * The amount of padding in pixels to add to the given bounds.
         * `default {top: 0, bottom: 0, left: 0, right: 0}`
         * @default {top: 0, bottom: 0, left: 0, right: 0}
         */
        padding?: Padding | number;
    }

    /**
     * The options for setting the map control's camera.
     */
    export interface CameraOptions extends Options {
        /**
         * The zoom level of the map view.
         * `default 1`
         * @default 1
         */
        zoom?: number;
        /**
         * The position to align the center of the map view with.
         * `default [0, 0]`
         * @default [0, 0]
         */
        center?: atlas.data.Position;

        /**
         * A pixel offset to apply to the center of the map.
         * This is useful if you want to programmatically pan the map to another location or if you want to center the map over a shape, then offset the maps view to make room for a popup.
         * Default `[0, 0]`.
         * @default [0, 0]
         */
        centerOffset?: atlas.Pixel;
        /**
         * The bearing of the map (rotation) in degrees. 
         * When the bearing is 0, 90, 180, or 270 the top of the map container will be north, east, south or west respectively.
         * `default 0`
         * @default 0
         */
        bearing?: number;
        /**
         * The pitch (tilt) of the map in degrees between 0 and 60, where 0 is looking straight down on the map.
         * `default 0`
         * @default 0
         */
        pitch?: number;
        /**
         * The minimum zoom level that the map can be zoomed out to during the animation. Must be between 0 and 24, and less than or equal to `maxZoom`.
         * `default 1`
         * @default 1
         */
        minZoom?: number;
        /**
         * The maximum zoom level that the map can be zoomed into during the animation. Must be between 0 and 24, and greater than or equal to `minZoom`.
         * `default 20`
         * @default 20
         */
        maxZoom?: number;
        /**
         * A bounding box in which to constrain the viewable map area to.
         * Users won't be able to pan the center of the map outside of this bounding box.
         * Set maxBounds to null or undefined to remove maxBounds
         * Default `undefined`.
         * @default undefined
         */
        maxBounds?: atlas.data.BoundingBox;
    }

    /**
     * Positions where the control can be placed on the map.
     */
    export enum ControlPosition {
        /**
         * Places the control in the top left of the map.
         * Literal value `"top-left"`
         */
        TopLeft = "top-left",
        /**
         * Places the control in the top right of the map.
         * Literal value `"top-right"`
         */
        TopRight = "top-right",
        /**
         * Places the control in the bottom left of the map.
         * Literal value `"bottom-left"`
         */
        BottomLeft = "bottom-left",
        /**
         * Places the control in the bottom right of the map.
         * Literal value `"bottom-right"`
         */
        BottomRight = "bottom-right",
        /**
         * The control will place itself in its default location.
         * Literal value `"non-fixed"`
         */
        NonFixed = "non-fixed"
    }

    /**
     * The options for adding a control to the map.
     */
    export interface ControlOptions extends Options {
        /**
         * The position the control will be placed on the map. If not specified, the control will be located at the
         * default position it defines.
         * default `ControlPosition.NonFixed`
         * @default ControlPosition.NonFixed
         */
        position?: ControlPosition;
    }

    /**
     * A data source for managing shape data that will be displayed on the map.
     * A data source must be added to a layer before it is visible on the map.
     * Options for a `DataSourceOptions`.
     * @module Object Definitions
     */
    export interface DataSourceOptions extends Options {
        /**
         * Maximum zoom level at which to create vector tiles (higher means greater detail at high zoom levels).
         * default `18`
         * @default 18
         */
        maxZoom?: number;
        /**
         * A boolean indicating if Point features in the source should be clustered or not.
         * If set to true, points will be clustered together into groups by radius.
         * default `false`
         * @default false
         */
        cluster?: boolean;
        /**
         * The radius of each cluster in pixels.
         * default `50`
         * @default 50
         */
        clusterRadius?: number;
        /**
         * The maximum zoom level in which to cluster points.
         * Defaults to one zoom less than `maxZoom` so that last zoom features are not clustered.
         */
        clusterMaxZoom?: number;
        /**
         * Specifies whether to calculate line distance metrics.
         * This is required for line layers that specify `lineGradient` values.
         * default `false`
         * @default false
         */
        lineMetrics?: boolean;
        /**
         * The Douglas-Peucker simplification tolerance that is applied to the data when rendering (higher means simpler geometries and faster performance).
         * default `0.375`
         * @default 0.375
         */
        tolerance?: number;
        /**
         * Defines custom properties that are calculated using expressions against all the points within each cluster and added to the properties of each cluster point.
         */
        clusterProperties?: Record<string, AggregateExpression>;
    }

    /**
     * A data source for managing shape data that will be displayed on the map.
     * A data source must be added to a layer before it is visible on the map.
     * Options for a `VectorTileSource`.
     * @module Object Definitions
     */
    export interface VectorTileSourceOptions extends Options {
        /**
         * A bounding box that specifies where tiles are available.
         * When specified, no tiles outside of the bounding box will be requested.
         */
        bounds?: atlas.data.BoundingBox;
        /**
         * An integer specifying the minimum zoom level to render the layer at.
         * default `0`
         * @default 0
         */
        minZoom?: number;
        /**
         * An integer specifying the maximum zoom level to render the layer at.
         * default `22`
         * @default 22
         */
        maxZoom?: number;
        /**
         * Specifies is the tile systems y coordinate uses the OSGeo Tile Map Services which reverses the Y coordinate axis.
         * default `false`
         * @default false
         */
        isTMS?: boolean;
        /**
         * An array of one or more tile source URLs. Supported URL parameters:
         *  <ul>
         *      <li>`{x}` - X position of tile. Tile URL usually also needs {y} and {z}.</li>
         *      <li>`{y}` - Y position of tile. Tile URL usually also needs {x} and {z}.</li>
         *      <li>`{z}` - Zoom level of tile. Tile URL usually also needs {x} and {y}.</li>
         *      <li>`{quadkey}` - Tile quadkey id based on the Bing Maps tile system naming convention.</li>
         *      <li>`{bbox-epsg-3857}` - A bounding box string with the format "{west},{south},{east},{north}" with coordinates in the EPSG 3857 Spatial Reference System also commonly known as WGS84 Web Mercator. This is useful when working with WMS imagery services.</li>
         *  <ul>
         */
        tiles?: string[];
        /**
         * An integer value that specifies the width and height dimensions of the map tiles.
         * For a seamless experience, the tile size must by a multiplier of 2. (i.e. 256, 512, 1024…).
         * default `512`
         * @default 512
         */
        tileSize?: number;
        /**
         * A URL to a TileJSON resource.
         * Supported protocols are `http:` and `https:`.
         */
        url?: string;
    }

    /**
     * The options for a popup.
     */
    export interface PopupOptions extends Options {
        /**
         * Specifies if the popup can be dragged away from its position.
         * default `false`
         * @default false
         */
        draggable?: boolean;
        /**
         * Specifies if the close button should be displayed in the popup or not.
         * default `true`
         * @default true
         */
        closeButton?: boolean;
        /**
         * The content to display within the popup.
         * default `span`
         * @default span
         */
        content?: HTMLElement | string;
        /**
         * Specifies the fill color of the popup.
         * default `"#FFFFFF"`
         * @default "#FFFFFF"
         */
        fillColor?: string;
        /**
         * An array of [pixelsRight, pixelsDown] for how many pixels to the right and down the anchor of the popup should be
         * offset. Negative numbers can be used to offset the popup left and up.
         * default `[0, 0]`
         * @default [0, 0]
         */
        pixelOffset?: atlas.Pixel;
        /**
         * The position on the map where the popup should be anchored.
         * default `[0, 0]`
         * @default [0, 0]
         */
        position?: atlas.data.Position;
        /**
         * Specifies if the pointer should be displayed in the popup or not.
         * default `true`
         * @default true
         */
        showPointer?: boolean;
    }

    /**
     * This is the object type expected to be returned by the transformRequest callback.
     */
    export interface RequestParameters {
        /**
         * Used to specify the cross-origin request (CORs) credentials setting. Can be `'same-origin'` or `'include'`.
         */
        credentials?: string;
        /**
         * The headers to be sent with the request.
         */
        headers?: object;
        /**
         * The url to be requested.
         */
        url?: string;
    }

    /**
     * Options for rendering an HtmlMarker object
     */
    export interface HtmlMarkerOptions extends Options {
        /**
         * Indicates the marker's location relative to its position on the map.
         * Optional values: `"center"`, `"top"`, `"bottom"`, `"left"`, `"right"`,
         * `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`.
         * Default `"bottom"`
         * @default "bottom"
         */
        anchor?: string;
        /**
         * A color value that replaces any {color} placeholder property that has been included in a string htmlContent.
         * default `"#1A73AA"`
         * @default "#1A73AA"
         */
        color?: string;
        /**
         * Indicates if the user can drag the position of the marker using the mouse or touch controls.
         * default `false`
         * @default false
         */
        draggable?: boolean;
        /**
         * The HTML content of the marker. Can be an HTMLElement or HTML string.
         * Add {text} and {color} to HTML strings as placeholders to make it easy to update
         * these values in your marker by using the setOptions function of the HtmlMarker class.
         * This allows you to create a single HTML marker string that can be used as a template for multiple markers.
         */
        htmlContent?: string | HTMLElement;
        /**
         * An offset in pixels to move the popup relative to the markers center.
         * Negatives indicate left and up.
         * default `[0, -18]`
         * @default [0, -18]
         */
        pixelOffset?: atlas.Pixel;
        /**
         * The position of the marker.
         * default `[0, 0]`
         * @default [0, 0]
         */
        position?: atlas.data.Position;
        /**
         * A popup that is attached to the marker.
         */
        popup?: atlas.Popup;
        /**
         * A color value that replaces any {secondaryColor} placeholder property that has been included in a string htmlContent.
         * default `"white"`
         * @default "white"
         */
        secondaryColor?: string;
        /**
         * A string of text that replaces any {text} placeholder property that has been included in a string htmlContent.
         */
        text?: string;
        /**
         * Specifies if the marker is visible or not.
         * default `true`
         * @default true
         */
        visible?: boolean;
    }

    /**
     * The options for the map's lighting.
     */
    export interface LightOptions extends Options {
        /**
         * Specifies wether extruded geometries are lit relative to the map or viewport.
         * Supported values:
         * <p>`"map"`: The position of the light source is aligned to the rotation of the map.</p>
         * <p>`"viewport"`: The position fo the light source is aligned to the rotation of the viewport.</p>
         * Default: `"map"`
         * @default "map"
         */
        anchor?: "map" | "viewport";
        /**
         * Color tint for lighting extruded geometries
         * Default: `"#FFFFFF"`
         * @default "#FFFFFF"
         */
        color?: string | Expression;
        /**
         * Intensity of lighting (on a scale from 0 to 1).
         * Higher numbers will present as more extreme contrast.
         * Default `0.5`
         * @default 0.5
         */
        intensity?: number | Expression;
        /**
         * Position of the light source relative to lit (extruded) geometries,
         * in [r radial coordinate, a azimuthal angle, p polar angle]
         * where r indicates the distance from the center of the base of an object to its light,
         * a indicates the position of the light relative to 0°
         * (0° when `anchor` is set to viewport corresponds to the top of the viewport,
         * or 0° when `anchor` is set to map corresponds to due north, and degrees proceed clockwise),
         * and p indicates the height of the light (from 0°, directly above, to 180°, directly below).
         */
        position?: [number, number, number] | Expression;
    }

    /**
     * The options for the map's style.
     */
    export interface StyleOptions extends Options {
        /**
         * If true the map will automatically resize whenever the window's size changes.
         * Otherwise map.resize() must be called.
         * Default `true`.
         * @default true
         */
        autoResize?: boolean;
        /**
         * The language of the map labels.
         * [Supported language]{@link https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages}.
         * Default `atlas.getLanguage()`.
         * @default atlas.getLanguage()
         */
        language?: string;
        /**
         * Sets the lighting options of the map.
         */
        light?: LightOptions;
        /**
         * If true, the map's canvas can be exported to a PNG using map.getCanvas().toDataURL().
         * This option may only be set when initializing the map.
         * Default `false`
         * @default false
         */
        preserveDrawingBuffer?: boolean;
        /**
         * Specifies if multiple copies of the world should be rendered when zoomed out.
         * Default `true`
         * @default true
         */
        renderWorldCopies?: boolean;
        /**
         * Specifies if buildings will be rendered with their models.
         * If false all buildings will be rendered as just their footprints.
         * Default `false`
         * @default false
         */
        showBuildingModels?: boolean;
        /**
         * Specifies if the feedback link should be displayed on the map or not.
         * Default `true`
         * @default true
         */
        showFeedbackLink?: boolean;
        /**
         * Specifies if the Microsoft logo should be hidden or not.
         * If set to true a Microsoft copyright string will be added to the map.
         * Default `true`
         * @default true
         */
        showLogo?: boolean;
        /**
         * Specifies if the map should render an outline around each tile and the tile ID.
         * These tile boundaries are useful for debugging.
         * The uncompressed file size of the first vector source is drawn in the top left corner of each tile,
         * next to the tile ID.
         * Default `false`
         * @default false
         */
        showTileBoundaries?: boolean;
        /**
         * The name of the style to use when rendering the map. Available styles can be found in the
         * [supported styles]{@link https://docs.microsoft.com/en-us/azure/azure-maps/supported-map-styles} article. The
         * default style is "road".
         */
        style?: string;
        /**
         * Specifies which set of geopolitically disputed borders and labels are displayed on the map. The View parameter (also referred to as “user region parameter”) is a 2-letter ISO-3166 Country Code that will show the correct maps for that country/region. Country/Regions that are not on the View list or if unspecified will default to the “Unified” View.
         * Please see the supported [Views]{@link https://aka.ms/AzureMapsLocalizationViews}
         * It is your responsibility to determine the location of your users, and then set the View parameter correctly for that location. The View parameter in Azure Maps must be used in compliance with applicable laws, including those regarding mapping, of the country where maps, images and other data and third party content that You are authorized to access via Azure Maps is made available.
         * default: `undefined`
         * @default undefined
         */
        view?: string;
        /**
         * @deprecated use `view` instead.
         */
        userRegion?: string;
    }

    /**
     * The options for setting traffic on the map.
     */
    export interface TrafficOptions extends Options {
        /**
         * The type of traffic flow to display:
         * <p>"none" is to display no traffic flow data</p>
         * <p>"relative" is the speed of the road relative to free-flow</p>
         * <p>"absolute" is the absolute speed of the road</p>
         * <p>"relative-delay" displays relative speed only where they differ from free-flow;
         * false to stop displaying the traffic flow.</p>
         * default `"none"``
         * @default "none"
         */
        flow?: "none" | "relative" | "absolute" | "relative-delay";
        /**
         * Whether to display incidents on the map.
         * default `false`
         * @default false
         */
        incidents?: boolean;
    }

    /**
     * The options for enabling/disabling user interaction with the map.
     */
    export interface UserInteractionOptions extends Options {
        /**
         * Whether the map is interactive or static. If false, all user interaction is disabled.  If true, only selected
         * user interactions will enabled.
         * default `true`
         * @default true
         */
        interactive?: boolean;
        /**
         * Whether the map should zoom on scroll input.
         * default `true`
         * @default true
         */
        scrollZoomInteraction?: boolean;
        /**
         * Whether the Shift + left click and drag will draw a zoom box.
         * default `true`
         * @default true
         */
        boxZoomInteraction?: boolean;
        /**
         * Whether right click and drag will rotate and pitch the map.
         * default `true`
         * @default true
         */
        dragRotateInteraction?: boolean;
        /**
         * Whether left click and drag will pan the map.
         * default `true`
         * @default true
         */
        dragPanInteraction?: boolean;
        /**
         * Whether the keyboard interactions are enabled.
         * <style> .k-key { border: 1px solid grey; border-radius: 6px; background-color: #ccc; line-height: 14px;
         * font-size: 14px; padding: 2px; } </style>
         * <p><span class="k-key">Escape</span>: Jump focus to the map.</p>
         * <p><span class="k-key">+/=</span>: Increase zoom level by 1.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">+/=</span>: Increase the zoom level by 2.</p>
         * <p><span class="k-key">-</span>: Decrease zoom level by 1.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">-</span>: Decrease zoom level by 2.</p>
         * <p><span class="k-key">⇢</span>: Pan right 100 pixels.</p>
         * <p><span class="k-key">⇠</span>: Pan left 100 pixels.</p>
         * <p><span class="k-key">⇡</span>: Pan up 100 pixels.</p>
         * <p><span class="k-key">⇣</span>: Pan down 100 pixels.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">⇢</span>: Rotate 15 degrees clockwise.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">⇠</span>: Rotate 15 degrees counter-clockwise.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">⇡</span>: Increase pitch by 10 degrees.</p>
         * <p><span class="k-key">Shift</span> + <span class="k-key">⇣</span>: Decrease pitch by 10 degrees.</p>
         * default `true`
         * @default true
         */
        keyboardInteraction?: boolean;
        /**
         * Whether double left click will zoom the map inwards.
         * default `true`
         * @default true
         */
        dblClickZoomInteraction?: boolean;
        /**
         * Whether touch interactions are enabled for touch devices.
         * default `true`
         * @default true
         */
        touchInteraction?: boolean;
        /**
         * Sets the zoom rate of the mouse wheel
         * default `1/450`
         * @default 1/450
         */
        wheelZoomRate?: number;
    }

    /**
     * An interface for defining a control of the map.
     */
    export interface Control {
        /**
         * Initialization method for the control which is called when added to the map.
         * @param map The map that the control will be added to.
         * @param options The ControlOptions for this control.
         * @return An HTMLElement to be placed on the map for the control.
         */
        onAdd(map: Map, options?: ControlOptions): HTMLElement | null;
        /**
         * Method that is called when the control is removed from the map. Should perform any necessary cleanup for the
         * control.
         */
        onRemove(): void;
    }
    /**
     * For internal use only.
     * Implements control interface and provides support for automatic styling based on the map style.
     */
    export abstract class ControlBase implements Control {
        private _observer;
        private _container;
        private _theme;
        private _map;
        /**
         * Initialization method for the control which is called when added to the map.
         * @param map The map that the control will be added to.
         * @param options The ControlOptions for this control.
         * @return An HTMLElement to be placed on the map for the control.
         */
        abstract onAdd(map: Map, options?: ControlOptions): HTMLElement;
        /**
         * Method that is called when the control is removed from the map. Should perform any necessary cleanup for the
         * control.
         */
        onRemove(): void;
        /**
         * Build the outermost container for the control, applies styling including any listeners for auto styling.
         */
        buildContainer<K extends keyof HTMLElementTagNameMap = "div">(map: Map, style: ControlStyle, ariaLabel?: string, tagName?: K): HTMLElementTagNameMap[K];
        /**
         * Sets the control's theme (light/dark).
         * Only applies changes if the theme is different than the previous.
         */
        private _setTheme;
        /**
         * A callback for when the map's style changes.
         * Used for auto styling.
         */
        private _onStyleChange;
        /**
         * A callback for when the map's
         */
        private _onBackgroundChange;
    }

    /**
     * The callback function used to acquire an authentication token in anonymous authentication mode.
     * Resolve with the authentication token or reject with any errors.
     */
    export type getAuthTokenCallback = (resolve: (value?: string) => void, reject: (reason?: any) => void, map: Map) => void;

    /**
     * An enumeration used to specify the type of authentication mechanism to use.
     */
    export enum AuthenticationType {
        /**
         * The subscription key authentication mechanism.
         * Literal value `"subscriptionKey"`
         */
        subscriptionKey = "subscriptionKey",
        /**
         * The AAD implicit grant mechanism. Recommended for pages protected by a sign-in.
         * By default the page will be redirected to the AAD login when the map control initializes.
         * Specify a logged-in `AuthenticationContext` in the `AuthenticationOptions`
         * for greater control over when/how the users signs in.
         * Literal value `"aad"`
         */
        aad = "aad",
        /**
         * The anonymous authentication mechanism. Recommended for public pages.
         * Allows a callback responsible for acquiring an authentication token to be provided.
         * Literal value `"anonymous"`
         */
        anonymous = "anonymous"
    }

    /**
     * Options for specifying how the map control should authenticate with the Azure Maps services.
     */
    export interface AuthenticationOptions extends Options {
        /**
         * The authentication mechanism to be used.
         */
        authType?: AuthenticationType;
        /**
         * Subscription key from your Azure Maps account.
         * Must be specified for subscription key authentication type.
         */
        subscriptionKey?: string;
        /**
         * The Azure Maps client ID, This is an unique identifier used to identify the maps account.
         * Preferred to always be specified, but must be specified for AAD and anonymous authentication types.
         */
        clientId?: string;
        /**
         * The Azure AD registered app ID. This is the app ID of an app registered in your Azure AD tenant.
         * Must be specified for AAD authentication type.
         */
        aadAppId?: string;
        /**
         * The AAD tenant that owns the registered app specified by `aadAppId`.
         * Must be specified for AAD authentication type.
         */
        aadTenant?: string;
        /**
         * The AAD instance to use for logging in.
         * Can be optionally specified when using the AAD authentication type.
         * By default the `https://login.microsoftonline.com/` instance will be used.
         */
        aadInstance?: string;
        /**
         * A callback to use with the anonymous authentication mechanism.
         * This callback will be responsible for resolving to a authentication token.
         * E.g. fetching a CORS protected token from an endpoint.
         */
        getToken?: getAuthTokenCallback;

        /**
         * Sets the required options to configure the subscription key authentication mechanism.
         * @param subscriptionKey Subscription Key from your azure maps account
         */
        setSubscriptionKey?(key: string): void;
        /**
         * Sets the required authentication options to configure the AAD implicit grant mechanism.
         * @param clientId Client ID from your azure maps account
         * @param aadAppId Azure AD App ID
         * @param aadTenant Azure AD Tenant Name
         * @param aadInstance An optional Azure AD Instance
         */
        setAadProperties?(clientId: string, aadAppId: string, aadTenant: string, aadInstance?: string): void;
        /**
         * Sets the required options to configure the anonymous authentication method.
         * @param getTokenCallback Callback function responsible for resolving to an authentication token.
         */
        setTokenCallbackFunction?(getTokenCallback: getAuthTokenCallback): void;
    }

    /**
     * Global properties used in all atlas service requests.
     */
    export interface ServiceOptions extends Options {
        /**
         * The authentication options used to customize how the map control authenticates with Azure Maps services.
         * If these authentication options are specified then ServiceOptions.subscriptionKey should not be.
         * Recommend using the atlas.setAuthenticationOptions function instead.
         */
        authOptions?: AuthenticationOptions;
        /**
         * Disable telemetry collection
         * This option may only be set when initializing the map.
         * default: false
         * @default false
         */
        disableTelemetry?: boolean;
        /**
         * The domain to use when requesting map tiles and other Azure Maps services.
         * If the protocol is not specified `https` is assumed.
         * Recommend using atlas.setDomain function instead.
         * @default "atlas.microsoft.com"
         */
        domain?: string;
        /**
         * Enable accessibility
         * default: true
         * @default true
         */
        enableAccessibility?: boolean;
        /**
         * A boolean that specifies if vector and raster tiles should be reloaded when they expire (based on expires header).
         * This is useful for data sets that update frequently. When set to false, each tile will be loaded once, when needed, and not reloaded when they expire.
         * default: true
         * @default true
         */
        refreshExpiredTiles?: boolean;
        /**
         * The customer subscription key used to authorize requests.
         * This option may only be set when initializing the map.
         * Recommend using the atlas.setSubscriptionKey function instead
         */
        subscriptionKey?: string;
        /**
         * The session id to pass with requests.
         * Recommend using atlas.setSessionId instead.
         * @default Random UUID generated at runtime
         */
        sessionId?: string;
        /**
         * If defined transformRequest will be called to provide custom request parameters for loading a tile.
         */
        transformRequest?: (url: string, resourceType: string) => RequestParameters;
    }

    type ExpressionName = "array" | "boolean" | "collator" | "format" | "literal" | "number" | "object" | "string" | "to-boolean" | "to-color" | "to-number" | "to-string" | "typeof" | "feature-state" | "geometry-type" | "id" | "line-progress" | "properties" | "at" | "get" | "has" | "length" | "!" | "!=" | "<" | "<=" | "==" | ">" | ">=" | "all" | "any" | "case" | "match" | "interpolate" | "interpolate-hcl" | "interpolate-lab" | "step" | "let" | "var" | "concat" | "downcase" | "is-supported-script" | "resolved-locale" | "upcase" | "rgb" | "rgba" | "-" | "*" | "/" | "%" | "^" | "+" | "abs" | "acos" | "asin" | "atan" | "ceil" | "cos" | "e" | "floor" | "ln" | "ln2" | "log10" | "log2" | "max" | "min" | "pi" | "round" | "sin" | "sqrt" | "tan" | "zoom" | "heatmap-density";
    /**
     * Can be specified as the value of filter or certain layer options.
     * An expression defines a formula for computing the value of the property.
     * Expressions are represented as JSON arrays.
     * The first element of an expression is a string naming the expression operator.
     */
    export type Expression = [ExpressionName, ...any[]];

    /**
    * An aggregate expression defines a calculation that is processed over a set of data.
    * Schema: [operator: string, initialValue?: boolean | number, mapExpression: Expression]
    * operator: An expression function that is then applied to against all values calculated by the `mapExpression` for each point in the cluster. Supported operators:
    * o  For numbers: `+`, `*`, `max`, `min`
    * o  For Booleans: `all`, `any`
    * initialValue: Optional, an initial value in which the first calculated value is aggregated against.
    * mapExpression: An expression that is applied against each point in the data set.
    */
    export interface AggregateExpression extends Array<any> {
    }

    /**
     * A manager for the map control's authentication.
     * Exposed through the authentication property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface AuthenticationManager {
        /**
         * Initializes the authentication mechanism specified in AuthenticationOptions.
         * If this method has been called before the original initialize promise is returned.
         */
        initialize(): Promise<void>;
        /**
         * Returns the current authentication type in use.
         */
        getAuthType(): AuthenticationType;
        /**
         * Returns the current client ID in use.
         */
        getClientId(): string;
        /**
         * Returns the access token with an audience URI of https://atlas.microsoft.com.
         */
        getToken(): string;
        /**
         * Adds the necessary authentication query parameters or headers to a RequestParameters.
         * Returns the updated RequestParameters.
         * @param params The RequestParameters to update.
         */
        signRequest(params: RequestParameters): RequestParameters;
    }

    /**
     * A manager for the map control's controls.
     * Exposed through the controls property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface ControlManager {
        /**
         * Add a control(s) to the map.
         * @param control The control to add.
         * @param options The options for the added control.
         */
        add(control: Control | Control[], options?: ControlOptions): void;
        /**
         * Remove a control(s) from the map.
         * @param control The control to remove.
         */
        remove(control: Control | Control[]): void;
        /**
         * Gets an array of all controls on the map
         */
        getControls(): Control[];
    }

    /**
     * A manager for the map control's events.
     * Exposed through the events property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export class EventManager {
        private readonly map;
        private readonly mapCallbackHandler;
        /**
         * Adds a data event to the map.
         * @param eventType The data event name.
         * @param callback The event handler callback.
         */
        add(eventType: "data" | "sourcedata" | "styledata", callback: (e: MapDataEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The error event name.
         * @param callback The event handler callback.
         */
        add(eventType: "error", callback: (e: MapErrorEvent) => void): void;
        /**
         * Adds a touch event to the map.
         * @param eventType The touch event name.
         * @param callback The event handler callback.
         */
        add(eventType: "touchstart" | "touchend" | "touchmove" | "touchcancel", callback: (e: MapTouchEvent) => void): void;
        /**
         * Adds a mouse event to the map.
         * @param eventType The mouse event name.
         * @param callback The event handler callback.
         */
        add(eventType: "mousedown" | "mouseup" | "mouseover" | "mousemove" | "click" | "dblclick" | "mouseout" | "contextmenu", callback: (e: MapMouseEvent) => void): void;
        /**
         * Adds a style image missing event to the map.
         * @param eventType The style image missing event name.
         * @param callback The event handler callback.
         */
        add(eventType: "styleimagemissing", callback: (e: string) => void): void;
        /**
         * Adds a wheel event to the map.
         * @param eventType The wheel event name.
         * @param callback The event handler callback.
         */
        add(eventType: "wheel", callback: (e: MapMouseWheelEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        add(eventType: "boxzoomstart" | "boxzoomend" | "dragstart" | "drag" | "dragend" | "idle" | "load" | "movestart" | "move" | "moveend" | "pitchstart" | "pitch" | "pitchend" | "ready" | "render" | "resize" | "rotatestart" | "rotate" | "rotateend" | "tokenacquired" | "zoomstart" | "zoom" | "zoomend", callback: (e: MapEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        add(eventType: "layeradded" | "layerremoved", callback: (e: atlas.layer.Layer) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        add(eventType: "sourceadded" | "sourceremoved", callback: (e: atlas.source.Source) => void): void;
        /**
         * Adds an event to the DataSource(s).
         * @param eventType The event name.
         * @param target The DataSource(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "datasourceupdated", target: atlas.source.DataSource | atlas.source.DataSource[], callback: (e: atlas.source.DataSource) => void): void;
        /**
         * Adds an event to the DataSource(s).
         * @param eventType The event name.
         * @param target The DataSource(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "dataadded" | "dataremoved", target: atlas.source.DataSource | atlas.source.DataSource[], callback: (e: Shape[]) => void): void;
        /**
         * Adds an event to the HtmlMarker(s).
         * @param eventType The event name.
         * @param target The HtmlMarker(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "click" | "contextmenu" | "dblclick" | "drag" | "dragstart" | "dragend" | "keydown" | "keypress" | "keyup" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup", target: HtmlMarker | HtmlMarker[], callback: (e: TargetedEvent) => void): void;
        /**
         * Adds a touch event to the Layer(s).
         * @param eventType The event name.
         * @param target The Layer(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "touchstart" | "touchend" | "touchmove" | "touchcancel", target: atlas.layer.Layer | atlas.layer.Layer[], callback: (e: MapTouchEvent) => void): void;
        /**
         * Adds an event to the Layer(s).
         * @param eventType The event name.
         * @param target The Layer(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "layeradded" | "layerremoved", target: atlas.layer.Layer | atlas.layer.Layer[], callback: (e: atlas.layer.Layer) => void): void;
        /**
         * Adds a mouse event to the Layer(s).
         * @param eventType The event name.
         * @param target The Layer(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "mousedown" | "mouseup" | "mouseover" | "mousemove" | "click" | "dblclick" | "mouseout" | "mouseenter" | "mouseleave" | "contextmenu", target: atlas.layer.Layer | atlas.layer.Layer[], callback: (e: MapMouseEvent) => void): void;
        /**
         * Adds a wheel event to the Layer(s).
         * @param eventType The event name.
         * @param target The Layer(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "wheel", target: atlas.layer.Layer | atlas.layer.Layer[], callback: (e: MapMouseWheelEvent) => void): void;
        /**
         * Adds an event to the Popup(s).
         * @param eventType The event name.
         * @param target The Popup(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "drag" | "dragend" | "dragstart" | "open" | "close", target: Popup | Popup[], callback: (e: TargetedEvent) => void): void;
        /**
         * Adds an event to the Shape(s).
         * @param eventType The event name.
         * @param target The Shape(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "shapechanged", target: Shape | Shape[], callback: (e: Shape) => void): void;
        /**
         * Adds an event to the Source(s).
         * @param eventType The event name.
         * @param target The Source(s) to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "sourceadded" | "sourceremoved", target: atlas.source.Source | atlas.source.Source[], callback: (e: atlas.source.Source) => void): void;

        add(eventType: string, callback: any): void;
        add(eventType: string, target: any, callback: any): void;

        /**
         * Adds a data event to the map.
         * @param eventType The data event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "data" | "sourcedata" | "styledata", callback: (e: MapDataEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The error event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "error", callback: (e: MapErrorEvent) => void): void;
        /**
         * Adds a touch event to the map.
         * @param eventType The touch event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "touchstart" | "touchend" | "touchmove" | "touchcancel", callback: (e: MapTouchEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "layeradded" | "layerremoved", callback: (e: atlas.layer.Layer) => void): void;
        /**
         * Adds a mouse event to the map.
         * @param eventType The mouse event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "mousedown" | "mouseup" | "mouseover" | "mousemove" | "click" | "dblclick" | "mouseout" | "contextmenu", callback: (e: MapMouseEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "sourceadded" | "sourceremoved", callback: (e: atlas.source.Source) => void): void;
        /**
         * Adds a style image missing event to the map.
         * @param eventType The style image missing event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "styleimagemissing", callback: (e: string) => void): void;
        /**
         * Adds a wheel event to the map.
         * @param eventType The wheel event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "wheel", callback: (e: MapMouseWheelEvent) => void): void;
        /**
         * Adds an event to the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "boxzoomstart" | "boxzoomend" | "dragstart" | "drag" | "dragend" | "idle" | "load" | "movestart" | "move" | "moveend" | "pitchstart" | "pitch" | "pitchend" | "ready" | "render" | "resize" | "rotatestart" | "rotate" | "rotateend" | "tokenacquired" | "zoomstart" | "zoom" | "zoomend", callback: (e: MapEvent) => void): void;
        /**
         * Adds an event to the DataSource.
         * @param eventType The event name.
         * @param target The DataSource to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "datasourceupdated", target: atlas.source.DataSource, callback: (e: atlas.source.DataSource) => void): void;
        /**
         * Adds an event to the DataSource.
         * @param eventType The event name.
         * @param target The DataSource to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "dataadded" | "dataremoved", target: atlas.source.DataSource, callback: (e: Shape[]) => void): void;
        /**
         * Adds an event to the HtmlMarker.
         * @param eventType The event name.
         * @param target The HtmlMarker to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "click" | "contextmenu" | "dblclick" | "drag" | "dragstart" | "dragend" | "keydown" | "keypress" | "keyup" | "mousedown" | "mouseenter" | "mouseleave" | "mousemove" | "mouseout" | "mouseover" | "mouseup", target: HtmlMarker, callback: (e: TargetedEvent) => void): void;
        /**
         * Adds a touch event to the Layer.
         * @param eventType The touch event name.
         * @param target The Layer to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "touchstart" | "touchend" | "touchmove" | "touchcancel", target: atlas.layer.Layer, callback: (e: MapTouchEvent) => void): void;
        /**
         * Adds a touch event to the Layer.
         * @param eventType The touch event name.
         * @param target The Layer to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "layeradded" | "layerremoved", target: atlas.layer.Layer, callback: (e: atlas.layer.Layer) => void): void;
        /**
         * Adds a mouse event to the Layer.
         * @param eventType The mouse event name.
         * @param target The Layer to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "mousedown" | "mouseup" | "mouseover" | "mousemove" | "click" | "dblclick" | "mouseout" | "mouseenter" | "mouseleave" | "contextmenu", target: atlas.layer.Layer, callback: (e: MapMouseEvent) => void): void;
        /**
         * Adds a wheel event to the Layer.
         * @param eventType The wheel event name.
         * @param target The Layer to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "wheel", target: atlas.layer.Layer, callback: (e: MapMouseWheelEvent) => void): void;
        /**
         * Adds an event to the Popup.
         * @param eventType The event name.
         * @param target The Popup to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "drag" | "dragend" | "dragstart" | "open" | "close", target: Popup, callback: (e: TargetedEvent) => void): void;
        /**
         * Adds an event to the Shape.
         * @param eventType The event name.
         * @param target The Shape to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "shapechanged", target: Shape, callback: (e: Shape) => void): void;
        /**
         * Adds an event to the Source.
         * @param eventType The event name.
         * @param target The Source to add the event for.
         * @param callback The event handler callback.
         */
        addOnce(eventType: "sourceadded" | "sourceremoved", target: atlas.source.Source, callback: (e: atlas.source.Source) => void): void;
        /**
         * Adds a listener to a single layer. Will add the event listeners to the layer's underlying Mapbox layers too.
         * @private
         */
        private _addLayerListener;
        /**
         * Adds a listener to a single layer. Will add the event listeners to the layer's underlying Mapbox layers too.
         * @private
         */
        private _addGlobalListener;
        /**
         * Invokes an event on the map.
         * This causes all event handlers on the map with the specified event name to be called.
         * @param eventType The name of the event to invoke.
         * @param args The data to be passed to the callbacks.
         */
        invoke(eventType: string, args: any): any;
        /**
         * Invokes an event of the target.
         * This causes all event handlers on the target with the specified event name to be called.
         * @param eventType The name of the event to invoke.
         * @param target The target to invoke the event on. Supported target types are Layer, HtmlMarker, and Popup.
         * @param args The data to be passed to the callbacks. The data can be `null` but cannot be `undefined`.
         */
        invoke(eventType: string, target: any, args: any): any;
        /**
         * Invokes all listeners for the given event and layer.
         * @param eventType The event type to invoke.
         * @param layer The layer to invoke the event for. Use an empty string for map global events.
         * @param args The data to pass to the listener callbacks.
         * @private
         */
        private _invokeListeners;
        /**
         * Removes an event listener from the map.
         * @param eventType The event name.
         * @param callback The event handler callback.
         */
        remove(eventType: string, callback: (e: void | atlas.layer.Layer | MapEvent | MapDataEvent | MapMouseEvent | MapTouchEvent | MapMouseWheelEvent | atlas.source.Source | string) => void): void;
        /**
         * Removes an event listener from the DataSource(s).
         * @param eventType The event name.
         * @param target The DataSource(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: atlas.source.DataSource | atlas.source.DataSource[], callback: (e: atlas.source.DataSource | Shape[]) => void): void;
        /**
         * Removes an event listener from the HtmlMarker(s).
         * @param eventType The event name.
         * @param target The HtmlMarker(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: HtmlMarker | HtmlMarker[], callback: (e: TargetedEvent) => void): void;
        /**
         * Removes an event listener from the Layer(s).
         * @param eventType The event name.
         * @param target The Layer(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: atlas.layer.Layer | atlas.layer.Layer[], callback: (e: void | MapMouseEvent | MapTouchEvent | MapMouseWheelEvent | atlas.layer.Layer) => void): void;
        /**
         * Removes an event listener from the Popup(s).
         * @param eventType The event name.
         * @param target The Popup(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: Popup | Popup[], callback: (e: TargetedEvent) => void): void;
        /**
         * Removes an event listener from the Shape(s).
         * @param eventType The event name.
         * @param target The Shapes(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: Shape | Shape[], callback: (e: Shape) => void): void;
        /**
         * Removes an event listener from the Source(s).
         * @param eventType The event name.
         * @param target The Source(s) to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: atlas.source.Source | atlas.source.Source[], callback: (e: atlas.source.Source) => void): void;
    }

    /**
     * A manager for the map control's HTML markers.
     * Exposed through the markers property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface HtmlMarkerManager {
        /**
         * Adds HTML based markers to the map.
         * @param elements The markers to add.
         */
        add(elements: HtmlMarker[]): any;
        /**
         * Adds an HTML based marker to the map.
         * @param element The marker to add.
         * @param position Optionally specify the position of the marker on the map.
         */
        add(element: HtmlMarker, position?: atlas.data.Position): any;
        /**
         * Gets an array of all the markers on the map.
         */
        getMarkers(): HtmlMarker[];
        /**
         * Removes one or more HTML markers from the map.
         * @param marker A HtmlMarker instance, a string id of a marker's htmlContent, or an array of these.
         */
        remove(marker: string | HtmlMarker | Array<string | HtmlMarker>): void;
        /**
         * Clears all markers.
         */
        clear(): void;
    }

    /**
     * A manager for the map control's image sprite.
     * Exposed through the imageSprite property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface ImageSpriteManager {
        /**
         * Add an icon image to the map's image sprite for use with symbols and patterns.
         * @param id The image's id.
         * If the specified id matches the id of a previously added image the new image will be ignored.
         * @param icon The image to add to the map's sprite. Can be a data URI, inline SVG, or image URL.
         */
        add(id: string, icon: string | HTMLImageElement | ImageData): Promise<void>;
        /**
         * Removes all images added by the user.
         */
        clear(): void;
        /**
         * Gets a list of all the image ids that have been added to the maps image sprite.
         */
        getImageIds(): string[];
        /**
         * Checks to see if an image is already loaded into the maps image sprite.
         * @param id The id to check the map's image sprite for.
         */
        hasImage(id: string): boolean;
        /**
         * Removes an image from the map's image sprite.
         * @param id The id of the image to remove.
         */
        remove(id: string): void;

        /**
         * Creates and adds an image to the maps image sprite. Provide the name of the built-in template to use, and a color to apply.
         * Optionally, specifiy a secondary color if the template supports one. A scale can also be specified.
         * This will allow the SVG to be scaled before it is converted into an image and thus look much better when scaled up.
         * Returns a promise.
         * Reference this in the Polygon or Symbol layer.
         * @param id  The image's id. If the specified id matches the id of a previously added image the new image will be ignored.
         * @param templateName The name of the template to use.
         * @param color The primary color value. Default: #1A73AA
         * @param secondaryColor A secondary color value. Default: white
         * @param scale Specifies how much to scale the template. For best results, scale the icon to the maximum size you want to display it on the map, then use the symbol layers icon size option to scale down if needed. This will reduce blurriness due to scaling. Default: 1
         */
        createFromTemplate(id: string, templateName: string, color?: string, secondaryColor?: string, scale?: number): Promise<void>;
    }

    /**
     * A manager for the map control's layers.
     * Exposed through the layers property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface LayerManager {
        /**
         * Adds one or more layers to the map.
         * The map must be ready before a layer can be added.
         * Use the map.events.add method with event type 'ready'.
         * @param layer The layer(s) to add.
         * @param before Optionally specify a layer or layer id to insert the new layer(s) before it.
         */
        add(layer: atlas.layer.Layer | atlas.layer.Layer[], before?: string | atlas.layer.Layer): void;
        /**
         * Removes all user added layers from the map.
         */
        clear(): void;
        /**
         * Retrieves a layer with the specified id.
         * @param id The id of the layer to retrieve.
         */
        getLayerById(id: string): atlas.layer.Layer;
        /**
         * Retrieves all layers that have been added to the map.
         */
        getLayers(): atlas.layer.Layer[];
        /**
         * Moves a layer to a different z-position.
         * @param layer The layer or id of the layer to move.
         * @param before Optionally specify to move the layer before this.
         */
        move(layer: string | atlas.layer.Layer, before?: string | atlas.layer.Layer): void;
        /**
         * Retrieve all Shapes and GeoJSON features that are visible on the map that are in a DataSource or VectorTileSource.
         * Shape objects are editable, while Feature objects are not editable and either reside in a VectorTileSource or represent a cluster point.
         * Clusters have the following properties:
         * <p>cluster: `boolean` - Indicates that the point is a cluster.
         * This will be set to true if Point object represents a cluster.
         * All other point objects are unlikely to have this value unless
         * a property with this same name was added to the Point property data from your app.</p>
         * <p>cluster_id: `string` - A unique id for the cluster.</p>
         * <p>point_count: `number` - The number of points inside the cluster.</p>
         * <p>point_count_abbreviated: `string` - An abbreviated string version of the point count. i.e. `"10K"`</p>
         * Features/Shapes that are not visible or who's layer zoom range does not include the current zoom level will not be returned.
         * Symbol features/Shapes that have been hidden due to text or icon collisions are not included.
         * Features/Shapes from all other layers are included even if they have no contribution to the map rendering, e.g. alpha set to zero.
         * The topmost rendered features/shapes appears first in the returned array and subsequent features are sorted in descending z-order.
         * @param geometry A Position, Point, or BoundingBox that returned features must intersect. If not specified the whole visible world is used.
         * @param layers An array of layers or their ids to limit the query to.
         * @param filter A expression to filter the returned features by.
         */
        getRenderedShapes(geometry?: atlas.data.Position | atlas.data.Point | atlas.data.BoundingBox, layers?: string | atlas.layer.Layer | Array<string | atlas.layer.Layer>, filter?: Expression): Array<Shape | atlas.data.Feature<atlas.data.Geometry, any>>;
        /**
         * Removes one or more layers from the map.
         * @param layer One or more layers or their ids for removal.
         */
        remove(layer: string | atlas.layer.Layer | Array<string | atlas.layer.Layer>): void;
    }

    /**
     * A manager for the map control's popups.
     * Exposed through the `popups` property of the `atlas.Map` class.
     * Cannot be instantiated by the user.
     */
    export interface PopupManager {
        /**
         * Adds a popup to the map
         * @param popup The popup(s) to add.
         */
        add(popup: Popup | Popup[]): void;
        /**
         * Removes all popups from the map.
         */
        clear(): void;
        /**
         * Removes a popup from the map
         * @param popup The popup(s) to remove.
         */
        remove(popup: Popup | Popup[]): void;
        /**
         * Returns the popups currently attached to the map.
         */
        getPopups(): Popup[];
    }

    /**
     * A manager for the map control's sources.
     * Exposed through the sources property of the atlas.Map class.
     * Cannot be instantiated by the user.
     */
    export interface SourceManager {
        /**
         * Adds one or more data sources to the map.
         * The map must be ready before a source can be added.
         * Use the map.events.add method with event type 'ready'.
         * @param source
         */
        add(source: atlas.source.Source | atlas.source.Source[]): void;
        /**
         * Returns all rendered shape features in a source that match a specified filter. If the source is a vector tile source, a source layer name needs to be specified.
         * @param source source to be queried
         * @param filter a filter to limit the query
         * @param sourceLayer the layer where shapes and features are matched
         */
        getRenderedShapes(source: string | atlas.source.Source, filter?: Expression, sourceLayer?: string): Array<atlas.data.Feature<atlas.data.Geometry, any> | Shape>;
        /**
         * Removes all sources from the map.
         */
        clear(): void;
        /**
         * Retrieves a source with the specified id.
         * @param id
         */
        getById(id: string): atlas.source.Source;
        /**
         * Retrieves all sources that have been added to the map.
         */
        getSources(): atlas.source.Source[];
        /**
         * Returns a boolean indicating if the source is loaded or not.
         * @param source The id of a source or a Source object.
         */
        isSourceLoaded(source: string | atlas.source.Source): boolean;
        /**
         * Removes one or more sources from the map by specifying the source id or providing the source itself.
         * @param source
         */
        remove(source: string | atlas.source.Source | Array<string | atlas.source.Source>): void;
    }

    export interface Options {
        [property: string]: any;
    }

    /**
     * Tile object returned by the map when a source data event occurs.
     */
    export interface Tile {
        /**
         * The ID of the tile.
         */
        id: TileId;
        /**
         * The size of the tile.
         */
        size: number;
        /**
         * The state of the tile.
         * <p>`"loading"`: Tile data is in the process of loading.</p>
         * <p>`"loaded"`: Tile data has been loaded.</p>
         * <p>`"reloading"`: Tile data has been loaded and is being updated.</p>
         * <p>`"unloaded"`: The data has been deleted.</p>
         * <p>`"errored"`: Tile data was not loaded because of an error.<p>
         * <p>`"expired"`: Tile data was previously loaded, but has expired per its HTTP headers
         * and is in the process of refreshing.</p>
         */
        state: "loading" | "loaded" | "reloading" | "unloaded" | "errored" | "expired";
    }
    export interface TileId {
        /**
         * The x coordinate of the tile.
         */
        x: number;
        /**
         * The y coordinate of the tile.
         */
        y: number;
        /**
         * The z coordinate of the tile.
         */
        z: number;
    }
    /**
     * Event object returned by the maps when a data event occurs.
     */
    export interface MapDataEvent extends MapEvent {
        /**
         * The type of data that has changed.
         * Either `"source"` or `"style"`.
         */
        dataType: "style" | "source";
        /**
         * True if the event has a `dataType` of `"source"` and the source has no outstanding network requests.
         */
        isSourceLoaded?: boolean;
        /**
         * If the `dataType` is `"source"` this is the related `Source` object.
         */
        source?: atlas.source.Source;
        /**
         * Specified if the `dataType` is `"source"` and the event signals that internal data has been received or changed.
         * Either `"metadata"` or `"content"`
         */
        sourceDataType?: "metadata" | "content";
        /**
         * The tile being loaded or changed.
         * Specified if `dataType` is `"source"` and the event is related to loading of a tile.
         */
        tile?: Tile;
    }

    /**
     * Event object returned by the maps when an error event occurs.
     */
    export interface MapErrorEvent extends MapEvent {
        /**
         * The `Error` object that triggered the event.
         */
        error: Error;
    }

    /**
     * Event object returned by the maps when a basic event occurs.
     */
    export interface MapEvent {
        /**
         * The original event that was fired.
         */
        originalEvent?: Event;
        /**
         * The `Map` instance in which the event occurred on.
         */
        map: atlas.Map;
        /**
         * The event type.
         */
        type: string;
    }

    /**
     * Event object returned by the maps when a wheel event occurs.
     */
    export interface MapMouseWheelEvent extends MapEvent {
        /**
         * Prevents event propagation bubbling up the event chain.
         */
        preventDefault: () => void;
    }

    /**
     * Event object returned by the maps when a touch event occurs.
     */
    export interface MapTouchEvent extends MapMouseWheelEvent {
        /**
         * The pixel coordinate at the center of the all touch points on the map, relative to the top left corner.
         */
        pixel?: atlas.Pixel;
        /**
         * The array of pixel coordinates of all touch points on the map.
         */
        pixels?: atlas.Pixel[];
        /**
         * The geographic location of the center of all touch points on the map.
         */
        position?: atlas.data.Position;
        /**
         * The geographical location of all touch points on the map.
         */
        positions?: atlas.data.Position[];
        /**
         * The shapes of all touch points on the map.
         */
        shapes?: Shape[];
        /**
         * The id of the layer the event is attached to.
         */
        layerId?: string;
    }

    /**
     * Event object returned by the maps when a mouse event occurs.
     */
    export interface MapMouseEvent extends MapMouseWheelEvent {
        /**
         * An array of Shape and Feature objects that the mouse event occurred on.
         * Shape objects are editable, while Feature objects are not editable
         * and either reside in a VectorTileSource or represent a cluster point.
         * Clusters have the following properties:
         * <p>cluster: `boolean` - Indicates that the point is a cluster.
         * This will be set to true if Point object represents a cluster.
         * All other point objects are unlikely to have this value unless
         * a property with this same name was added to the Point property data from your app.</p>
         * <p>cluster_id: `string` - A unique id for the cluster.</p>
         * <p>point_count: `number` - The number of points inside the cluster.</p>
         * <p>point_count_abbreviated: `string` - An abbreviated string version of the point count. i.e. `"10K"`</p>
         */
        shapes?: Array<atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape>;
        /**
         * The geographical location of all touch points on the map.
         */
        position?: atlas.data.Position;
        /**
         * The pixel coordinate where the event occurred as an array of [x, y].
         */
        pixel?: atlas.Pixel;
        /**
         * The id of the layer the event is attached to.
         */
        layerId?: string;
    }

    export interface TargetedEvent {
        /**
         * The target object the event occurred on.
         */
        target?: atlas.HtmlMarker | atlas.Popup;
        /**
         * The event type.
         */
        type: string;
    }

    /**
     * Represent the amount of padding in pixels to add to the side of a BoundingBox when setting the camera of a map.
     */
    export interface Padding extends Options {
        /**
         * Amount of padding in pixels to add to the bottom.
         * default `0`
         * @default 0
         */
        bottom: number;
        /**
         * Amount of padding in pixels to add to the left.
         * default `0`
         * @default 0
         */
        left: number;
        /**
         * Amount of padding in pixels to add to the right.
         * default `0`
         * @default 0
         */
        right: number;
        /**
         * Amount of padding in pixels to add to the top.
         * default `0`
         * @default 0
         */
        top: number;
    }

    /**
     * The properties which will exist for ClusteredProperties
     */
    export interface ClusteredProperties {
        /**
         * Specifies if the point is a cluster
         */
        cluster: boolean;
        /**
         * A unique ID for the cluster
         */
        cluster_id: number;
        /**
         * The number of points within the cluster
         */
        point_count: number;
        /**
         * An abbreviated point count
         */
        point_count_abbreviated: string;
    }
}