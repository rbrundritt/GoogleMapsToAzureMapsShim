
namespace google.maps {
    export const version: string = '0.1';

    //A look up table for Google features by ID.
    var _featureTable: { [key: string]: google.maps.Data.Feature } = {};

    var _counter = 0;
    var _tileLayers: { [key: string]: google.maps.ImageMapType } = {};

    var _placesCache: { [placeId: string]: google.maps.places.PlaceResult } = {};

    var _markerIcons: { [key: string]: MarkerIconDetails } = {};

    ////////////////////////////////////////////
    // Interfaces
    ////////////////////////////////////////////

    interface LatLngLiteral {
        lat: number;
        lng: number;
    }

    interface LatLngBoundsLiteral {
        east: number;
        north: number;
        south: number;
        west: number;
    }

    interface Padding {
        bottom: number;
        left: number;
        right: number;
        top: number;
    }

    interface MapOptions {
        backgroundColor?: string;
        center?: LatLng | LatLngLiteral;
        controlSize?: number;
        disableDefaultUI?: boolean;
        disableDoubleClickZoom?: boolean;
        draggable?: boolean;
        heading?: number;
        keyboardShortcuts?: boolean;
        mapTypeControl?: boolean;
        mapTypeControlOptions?: MapTypeControlOptions;
        mapTypeId?: MapTypeId | string;
        maxZoom?: number;
        minZoom?: number;
        restriction?: MapRestriction;
        rotateControl?: boolean;
        rotateControlOptions?: RotateControlOptions;
        scrollwheel?: boolean;
        styles?: MapTypeStyle[];
        tilt?: number;
        zoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: ZoomControlOptions;
        fullscreenControl?: boolean;
        fullscreenControlOptions?: FullscreenControlOptions;

        //Not supported

        clickableIcons?: boolean;
        draggableCursor?: string;
        draggingCursor?: string;
        gestureHandling?: GestureHandlingOptions;
        noClear?: boolean;
        panControl?: boolean;
        panControlOptions?: PanControlOptions;
        scaleControl?: boolean;
        scaleControlOptions?: ScaleControlOptions;
        streetView?: StreetViewPanorama;
        streetViewControl?: boolean;
        streetViewControlOptions?: StreetViewControlOptions;
    }

    interface MapTypeControlOptions {
        mapTypeIds?: Array<MapTypeId | string>;
        position?: ControlPosition;
        style?: MapTypeControlStyle;
    }

    interface RotateControlOptions {
        position?: ControlPosition;
    }

    interface MapRestriction {
        latLngBounds: LatLngBounds | LatLngBoundsLiteral;
        strictBounds?: boolean;
    }

    interface ZoomControlOptions {
        position?: ControlPosition;
        style?: ZoomControlStyle;
    }

    interface FullscreenControlOptions {
        position?: ControlPosition;
    }

    interface CircleLiteral extends CircleOptions {
        center?: LatLng | LatLngLiteral;
        radius?: number;
    }

    interface CircleOptions {
        center?: LatLng | LatLngLiteral;
        //clickable?: boolean;
        //draggable?: boolean;
        //editable?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        map?: Map;
        radius?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        // strokePosition?: StrokePosition;
        strokeWeight?: number;
        visible?: boolean;
        // zIndex?: number;
    }

    interface PolylineOptions {
        //clickable?: boolean;
        //draggable?: boolean;
        //editable?: boolean;
        geodesic?: boolean;
        //icons?: IconSequence[];
        map?: Map;
        path?: MVCArray<LatLng> | LatLng[] | LatLngLiteral[];
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
        visible?: boolean;
        //zIndex?: number;
    }

    interface PolygonOptions {
        //clickable?: boolean;
        //draggable?: boolean;
        //editable?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        geodesic?: boolean;
        map?: Map;
        paths?:
        | MVCArray<MVCArray<LatLng>>
        | MVCArray<LatLng>
        | LatLng[][]
        | LatLngLiteral[][]
        | LatLng[]
        | LatLngLiteral[];
        strokeColor?: string;
        strokeOpacity?: number;
        //strokePosition?: StrokePosition;
        strokeWeight?: number;
        visible?: boolean;
        //zIndex?: number;
    }

    interface RectangleOptions {
        bounds?: LatLngBounds | LatLngBoundsLiteral;
        //clickable?: boolean;
        //draggable?: boolean;
        //editable?: boolean;
        fillColor?: string;
        fillOpacity?: number;
        map?: Map;
        strokeColor?: string;
        strokeOpacity?: number;
        //strokePosition?: StrokePosition;
        strokeWeight?: number;
        visible?: boolean;
        //zIndex?: number;
    }

    interface Symbol {
        anchor?: Point;
        fillColor?: string;
        fillOpacity?: number;
        path: SymbolPath | string;
        rotation?: number;
        scale?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
    }

    interface Icon {
        anchor?: Point;
        //labelOrigin?: Point;
        //origin?: Point;
        scaledSize?: Size;
        size?: Size;
        url: string;
    }

    interface MarkerOptions {
        //anchorPoint?: Point;
        animation?: Animation;
        //clickable?: boolean;
        //crossOnDrag?: boolean;
        cursor?: string;
        draggable?: boolean;
        icon?: string | Icon | Symbol;
        label?: string | MarkerLabel;
        map?: Map;// | StreetViewPanorama;
        opacity?: number;
        optimized?: boolean;
        position?: LatLng | LatLngLiteral;
        //shape?: MarkerShape;
        title?: string;
        visible?: boolean;
        zIndex?: number;
    }

    interface InfoWindowOptions {
        content?: string | HTMLElement;
        // disableAutoPan?: boolean;
        //maxWidth?: number;
        pixelOffset?: Size;
        position?: LatLng | LatLngLiteral;
        //zIndex?: number;
    }

    interface GroundOverlayOptions {
        //clickable?: boolean;
        map?: Map;
        opacity?: number;
    }

    interface KmlLayerOptions {
        //clickable?: boolean;
        map?: Map;
        preserveViewport?: boolean;
        //screenOverlays?: boolean;
        suppressInfoWindows?: boolean;
        url?: string;
        //zIndex?: number;
    }

    interface KmlLayerMetadata {
        author: KmlAuthor;
        description: string;
        hasScreenOverlays: boolean;
        name: string;
        snippet: string;
    }

    interface KmlFeatureData {
        author: KmlAuthor;
        description: string;
        id: string;
        infoWindowHtml: string;
        name: string;
        snippet: string;
    }

    interface KmlAuthor {
        email: string;
        name: string;
        uri: string;
    }

    interface KmlMouseEvent {
        featureData: KmlFeatureData;
        latLng: LatLng;
        pixelOffset: Size;
    }

    interface TrafficLayerOptions {
        //autoRefresh?: boolean;
        map?: Map;
    }

    export interface MapType {
        _layer?: atlas.layer.Layer;
        _setMap(map: Map, before?: string | atlas.layer.Layer): void;
        getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element;
        releaseTile(tile: Element): void;
        alt?: string;
        maxZoom?: number;
        minZoom?: number;
        name?: string;
        projection?: Projection;
        radius?: number;
        tileSize?: Size;
    }

    interface Projection {
        fromLatLngToPoint(latLng: LatLng, point?: Point): Point;
        fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng;
    }

    interface ImageMapTypeOptions {
        alt?: string;
        getTileUrl(tileCoord: Point, zoom: number): string;
        maxZoom?: number;
        minZoom?: number;
        name?: string;
        opacity?: number;
        tileSize: Size;
    }

    ////////////////////////////////////////////
    // Public enums
    ////////////////////////////////////////////

    export enum MapTypeId {
        HYBRID = 'hybrid',
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        TERRAIN = 'terrain',
    }

    export enum ControlPosition {
        BOTTOM_CENTER = 11,
        BOTTOM_LEFT = 10,
        BOTTOM_RIGHT = 12,
        LEFT_BOTTOM = 6,
        LEFT_CENTER = 4,
        LEFT_TOP = 5,
        RIGHT_BOTTOM = 9,
        RIGHT_CENTER = 8,
        RIGHT_TOP = 7,
        TOP_CENTER = 2,
        TOP_LEFT = 1,
        TOP_RIGHT = 3
    }

    export enum MapTypeControlStyle {
        DEFAULT = 0,
        HORIZONTAL_BAR = 1,
        DROPDOWN_MENU = 2,
        INSET = 3,
        INSET_LARGE = 4,
    }

    export enum Animation {
        BOUNCE = 1,
        DROP = 2,
    }

    export enum KmlLayerStatus {
        DOCUMENT_NOT_FOUND = 'DOCUMENT_NOT_FOUND',
        DOCUMENT_TOO_LARGE = 'DOCUMENT_TOO_LARGE',
        FETCH_ERROR = 'FETCH_ERROR',
        INVALID_DOCUMENT = 'INVALID_DOCUMENT',
        INVALID_REQUEST = 'INVALID_REQUEST',
        LIMITS_EXCEEDED = 'LIMITS_EXCEEDED',
        OK = 'OK',
        TIMED_OUT = 'TIMED_OUT',
        UNKNOWN = 'UNKNOWN',
    }

    ////////////////////////////////////////////
    // Public MVC classes
    ////////////////////////////////////////////

    let listenerId = 0;
    const oBindings = '__o_bindings';
    const oAccessors = '__o_accessors';
    const oListeners = '__o_listeners';
    const oObjectId = '__o_oid';

    let objectId = 0;

    function capitalize(str: string): string {
        return capitalize[str] || (capitalize[str] = str.substr(0, 1).toUpperCase() + str.substr(1));
    }

    function getObjectId(obj: object): number {
        return obj[oObjectId] || (obj[oObjectId] = ++objectId);
    }

    function hasOwnProperty(instance: object, property: string): boolean {
        return Object.prototype.hasOwnProperty.call(instance, property);
    }

    function getGetterName(key: string): string {
        return `get${capitalize(key)}`;
    }

    function getSetterName(key: string): string {
        return `set${capitalize(key)}`;
    }

    function triggerChange(target: MVCObject, targetKey: string): void {
        const eventName = `${targetKey}_changed`;

        if (target[eventName]) {
            target[eventName]();
        } else {
            target.changed(targetKey);
        }

        if (target[oBindings] && target[oBindings][targetKey]) {
            const bindings = target[oBindings][targetKey];
            for (let key in bindings) {
                if (hasOwnProperty(bindings, key)) {
                    const binding = bindings[key];
                    triggerChange(binding.binder, binding.binderKey);
                }
            }
        }

        if (!target[oListeners] || !target[oListeners][eventName]) {
            return;
        }
        const listeners = { ...target[oListeners][eventName] };
        for (let id in listeners) {
            const eventListener = listeners[id];
            if (eventListener && eventListener.handler) {
                eventListener.handler();
            }
        }
    }

    export class EventListener {
        constructor(private instance: any, private eventName: string, public handler: any, public removeHandler?: Function) {
            instance[oListeners] = instance[oListeners] || {};
            instance[oListeners][eventName] = instance[oListeners][eventName] || {};

            instance[oListeners][eventName][handler] = this;
        }

        public remove() {
            const { instance, eventName, handler, removeHandler } = this;
            instance[oListeners] = instance[oListeners] || {};
            instance[oListeners][eventName] = instance[oListeners][eventName] || {};
            delete instance[oListeners][eventName][handler];

            if (removeHandler) {
                removeHandler();
            } else if (instance.removeEventListener) {
                instance.removeEventListener(eventName, handler);
            }
        }
    }

    export class MouseEvent {
        public _azEvent;

        public _markerOrPopup: atlas.HtmlMarker | atlas.Popup;

        constructor(e: atlas.MapMouseEvent |
            atlas.MapEvent |
            atlas.TargetedEvent |
            atlas.HtmlMarkerEvents |
            atlas.PopupEvents |
            atlas.ShapeEvents
        ) {
            this._azEvent = e;

            if (e['position']) {
                this.latLng = ConvertToG.position(e['position']);
            }

            if (e['pixel']) {
                this.pixel = ConvertToG.pixel(e['pixel']);
            }

            if (e['shapes'] && e['shapes'].length > 0 && e['shapes'][0] instanceof atlas.Shape) {
                this.feature = ConvertToG.feature(<atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape>(e['shapes'][0]));

                if (this.feature && e['position']) {
                    var r: atlas.data.Position[][];

                    if (this.feature instanceof google.maps.Data.Feature) {
                        var g = this.feature.getGeometry();

                        if (g.getType() === 'LineString') {
                            r = [<atlas.data.Position[]>g._g.coordinates];
                        } else if (g.getType() === 'Polygon') {
                            r = <atlas.data.Position[][]>g._g.coordinates;
                        }
                    } else if (this.feature['_shape']) {
                        var s: atlas.Shape = this.feature['_shape'];
                        this._shapes = [s];

                        if (s.getType() === 'LineString') {
                            r = [<atlas.data.Position[]>s.getCoordinates()];
                        } else if (s.getType() === 'Polygon') {
                            r = <atlas.data.Position[][]>s.getCoordinates();
                        }
                    }

                    var pos = <atlas.data.Position>e['position'];

                    var path: number = 0;
                    var edge: number = 0;
                    var vertex: number = 0;
                    var minDistance = Number.MAX_VALUE;
                    var dx: number;

                    if (r) {
                        for (var i = 0, len = r.length; i < len; i++) {
                            let c = r[i];

                            for (var j = 0, cnt = c.length; j < cnt; j++) {
                                dx = atlas.math.getDistanceTo(c[j], pos);

                                if (dx < minDistance) {
                                    path = i;
                                    vertex = j

                                    if (j === 0) {
                                        edge = 0;
                                    } else if (j === cnt - 1) {
                                        edge = cnt - 2;
                                    } else {
                                        if (atlas.math.getDistanceTo(c[j - 1], pos) < atlas.math.getDistanceTo(c[j + 1], pos)) {
                                            edge = j - 1;
                                        } else {
                                            edge = j;
                                        }
                                    }
                                }
                            }
                        }

                        this.path = path;
                        this.edge = edge;
                        this.vertex = vertex;
                    }
                }
            }

            if (e['target'] && (e['target'] instanceof atlas.HtmlMarker || e['target'] instanceof atlas.Popup)) {
                this._markerOrPopup = e['target'];
            }
        }

        public _shapes: atlas.Shape[];

        public feature: Data.Feature | Marker;

        public latLng: LatLng;

        public pixel: Point;

        public stop(): void {
            if (this._azEvent['preventDefault']) {
                (<atlas.MapMouseEvent>this._azEvent).preventDefault();
            }
        }

        public path: number;
        public edge: number;
        public vertex: number;
    }

    export namespace event {
        var _instanceId = 1;
        var _eventIdx = {};

        export function addDomListener(
            instance: HTMLElement,
            eventName: string,
            handler: (...args: any[]) => void,
            capture?: boolean
        ): EventListener {
            instance.addEventListener(eventName, handler, { capture: capture });
            var ev = new google.maps.EventListener(instance, eventName, handler);
            _registerEvent(instance, eventName, handler, ev);
            return ev;
        }

        export function addDomListenerOnce(
            instance: HTMLElement,
            eventName: string,
            handler: (...args: any[]) => void,
            capture?: boolean
        ): EventListener {
            instance.addEventListener(eventName, handler, { capture: capture, once: true });
            return new google.maps.EventListener(instance, eventName, handler);
        }

        export function addListener(instance: MVCObject, eventName: string, handler: Function): EventListener {
            var listener = new google.maps.EventListener(instance, eventName, handler);
            _registerEvent(instance, eventName, handler, listener);
            return listener;
        }

        export function addListenerOnce(instance: any, eventName: string, handler: Function): EventListener {
            var wrappedHandler = function (args) {
                handler(args);
                _deregisterEvent(instance, eventName, handler);
            };

            var listener = new google.maps.EventListener(instance, eventName, wrappedHandler);
            _registerEvent(instance, eventName, handler, listener);
            return listener;
        }

        export function clearInstanceListeners(instance: any): void {
            var id = _getInstanceId(instance);
            if (instance[id]) {
                Object.keys(_eventIdx[id]).forEach(eventName => {
                    Object.keys(_eventIdx[id][eventName]).forEach(handler => {
                        _eventIdx[id][eventName][handler].remove();
                        delete _eventIdx[id][eventName][handler];
                    });
                    delete _eventIdx[id][eventName];
                });
                delete _eventIdx[id];
            }
        }

        export function clearListeners(instance: any, evName: string): void {
            var id = _getInstanceId(instance);
            Object.keys(_eventIdx[id]).forEach(eventName => {
                if (evName === eventName) {
                    Object.keys(_eventIdx[id][eventName]).forEach(handler => {
                        _eventIdx[id][eventName][handler].remove();
                        delete _eventIdx[id][eventName][handler];
                    });
                    delete _eventIdx[id][eventName];
                }
            });
            delete _eventIdx[id];
        }

        export function removeListener(listener: EventListener): void {
            listener.remove();
        }

        export function trigger(instance: any, evName: string, ...args: any[]): void {
            var id = _getInstanceId(instance);

            if (_eventIdx[id]) {
                Object.keys(_eventIdx[id]).forEach(eventName => {
                    if (evName === eventName) {
                        Object.keys(_eventIdx[id][eventName]).forEach(handler => {
                            if (_eventIdx[id][eventName][handler]) {
                                _eventIdx[id][eventName][handler].handler.apply(null, args);
                            }
                        });
                    }
                });
            }
        }

        function _registerEvent(instance: any, eventName: string, handler: Function, listener: EventListener): void {
            var id = _getInstanceId(instance);

            if (!_eventIdx[id][eventName]) {
                _eventIdx[id][eventName] = {};
            }

            _eventIdx[id][eventName][handler] = listener;
        }

        function _deregisterEvent(instance: any, eventName: string, handler: Function): void {
            var id = _getInstanceId(instance);
            if (_eventIdx[id] && _eventIdx[id][eventName] && _eventIdx[id][eventName][handler]) {
                _eventIdx[id][eventName][handler] = null;
            }
        }

        function _getInstanceId(instance: any): number {
            var id: number;

            if (instance['_instanceId']) {
                id = instance['_instanceId'];
            } else {
                id = _instanceId;
                instance['_instanceId'] = id;
                _instanceId++;
            }

            if (!_eventIdx[id]) {
                _eventIdx[id] = {};
            }

            return id;
        }

        export function _simpleMouseEvent(instance: any, eventName: string, ignoreOnFeature?: boolean): (e: atlas.MapMouseEvent) => void {
            return (e: atlas.MapMouseEvent) => {
                var args = new google.maps.MouseEvent(e);

                if (!(args.feature && ignoreOnFeature)) {
                    google.maps.event.trigger(instance, eventName, args, args);
                }
            };
        };

        export function _simpleEventHandler(instance: any, eventName: string | string[]): () => void {
            return () => {
                if (Array.isArray(eventName)) {
                    eventName.forEach(name => {
                        google.maps.event.trigger(instance, name, null);
                    });
                } else {
                    google.maps.event.trigger(instance, eventName, null);
                }
            };
        };

        export function _layerMouseEvent(layer: any, eventName: string): (e: atlas.MapMouseEvent) => void {
            return (e: atlas.MapMouseEvent) => {
                if (e.shapes && e.shapes.length > 0 && e.shapes[0] instanceof atlas.Shape && (<atlas.Shape>e.shapes[0])._googleFeature) {
                    var instance = (<atlas.Shape>e.shapes[0])._googleFeature;
                    google.maps.event.trigger(instance, eventName, new google.maps.MouseEvent(e));

                    if (eventName === 'mouseover') {
                        layer._mousedOver = instance;
                    }
                } else if (eventName === 'mouseout' && layer._mousedOver) {
                    google.maps.event.trigger(layer._mousedOver, eventName, new google.maps.MouseEvent(e));
                    layer._mousedOver = null;
                }
            };
        }
    }

    export class Binding {
        constructor(public binder: MVCObject, public binderKey: string) { };
    }

    export class Accessor {
        constructor(public target: MVCObject, public targetKey: string, public binding: Binding) { };
    }

    export class MVCObject {
        public static removeListener(eventListener: EventListener): void {
            if (eventListener) {
                eventListener.remove();
            }
        }

        public get<T = any>(key: string): T {
            const self = this;
            if (self[oAccessors] && hasOwnProperty(self[oAccessors], key)) {
                const { target, targetKey } = self[oAccessors][key];
                const getterName = getGetterName(targetKey);
                if (target[getterName]) {
                    return target[getterName]();
                } else {
                    return target.get(targetKey);
                }
            } else {
                return self[key];
            }
        }

        public set(key: string, value?: any): MVCObject {
            const self = this;
            if (self[oAccessors] && hasOwnProperty(self[oAccessors], key)) {
                const { target, targetKey } = self[oAccessors][key];
                const setterName = getSetterName(targetKey);
                if (target[setterName]) {
                    target[setterName](value);
                } else {
                    target.set(targetKey, value);
                }
            } else {
                self[key] = value;
                triggerChange(self, key);
            }
            return self;
        }

        public changed(...args: any[]): any { }

        public notify(key: string): MVCObject {
            const self = this;
            if (self[oAccessors] && hasOwnProperty(self[oAccessors], key)) {
                const { target, targetKey } = self[oAccessors][key];
                target.notify(targetKey);
            } else {
                triggerChange(self, key);
            }
            return self;
        }

        public setValues(values: object): MVCObject {
            const self = this;
            for (let key in values) {
                if (hasOwnProperty(values, key)) {
                    const value = values[key];
                    const setterName = getSetterName(key);
                    if (self[setterName]) {
                        self[setterName](value);
                    } else {
                        self.set(key, value);
                    }
                }
            }
            return self;
        }

        public bindTo(key: string, target: MVCObject, targetKey: string = key, noNotify?: boolean): MVCObject {
            const self = this;
            self.unbind(key);

            self[oAccessors] || (self[oAccessors] = {});
            target[oBindings] || (target[oBindings] = {});
            target[oBindings][targetKey] || (target[oBindings][targetKey] = {});

            const binding = new Binding(self, key);
            const accessor = new Accessor(target, targetKey, binding);

            self[oAccessors][key] = accessor;
            target[oBindings][targetKey][getObjectId(binding)] = binding;

            if (!noNotify) {
                triggerChange(self, key);
            }

            return self;
        }

        public unbind(key: string): MVCObject {
            const self = this;
            if (!self[oAccessors] || !self[oAccessors][key]) {
                return self;
            }

            const { target, targetKey, binding } = self[oAccessors][key];
            self[key] = self.get(key);
            delete target[oBindings][targetKey][getObjectId(binding)];
            delete self[oAccessors][key];

            return self;
        }

        public unbindAll(): MVCObject {
            const self = this;
            if (!self[oAccessors]) {
                return self;
            }
            const accessors = self[oAccessors];
            for (let key in accessors) {
                if (hasOwnProperty(accessors, key)) {
                    self.unbind(key);
                }
            }
            return self;
        }

        public addListener(eventName: string, handler: Function): EventListener {
            return google.maps.event.addListener(this, eventName, handler);
        }

        public addListenerOnce(eventName: string, handler: Function): EventListener {
            return google.maps.event.addListenerOnce(this, eventName, handler);
        }

        public removeListener(eventListener: EventListener): void {
            google.maps.event.removeListener(eventListener);
        }
    }

    export class MVCArray<T> extends MVCObject {
        private _arr: any[] = [];

        constructor(array?: T[]) {
            super();

            if (array) {
                this._replace(array);

                if (array instanceof google.maps.MVCArray) {
                    google.maps.event.addListener(array, 'changed', () => {
                        google.maps.event.trigger(this, 'changed', null);
                    });
                }
            }
        }

        public clear(): void {
            this._replace([]);
        }

        public forEach(callback: (elem: T, i: number) => void): void {
            this._arr.forEach((x, i) => {
                callback(x, i);
            })
        }

        public getArray(): T[] {
            return this._arr;
        }

        public getAt(i: number): T {
            return this._arr[i];
        }

        public getLength(): number {
            return this._arr.length;
        }

        public insertAt(i: number, elem: T): void {
            this._arr.splice(i, 0, elem);
            google.maps.event.trigger(this, 'insert_at', { index: i, new: elem, target: this });
            google.maps.event.trigger(this, 'changed', null);
        }

        public pop(): T {
            var t = this._arr.pop();
            google.maps.event.trigger(this, 'remove_at', { index: this._arr.length, removed: t, target: this });
            google.maps.event.trigger(this, 'changed', null);
            return t;
        }

        public push(elem: T): number {
            var t = this._arr.push(elem);
            google.maps.event.trigger(this, 'insert_at', { index: t, new: elem, target: this });
            google.maps.event.trigger(this, 'changed', null);
            return t;
        }

        public removeAt(i: number): T {
            var t = this._arr.splice(i, 1)[0];
            google.maps.event.trigger(this, 'remove_at', { index: i, removed: t, target: this });
            google.maps.event.trigger(this, 'changed', null);
            return t;
        }

        public setAt(i: number, elem: T): void {
            var p = this._arr[i];
            this._arr[i] = elem;
            google.maps.event.trigger(this, 'setAt', { index: i, previous: p, new: elem, target: this });
            google.maps.event.trigger(this, 'changed', null);
        }

        public _replace(array: T[]): void {
            for (var i = this._arr.length - 1; i >= 0; i--) {
                this.pop();
            }

            if (array) {
                for (var i = 0; i < array.length; i++) {
                    this.push(array[i]);
                }
            }
        }
    }

    ////////////////////////////////////////////
    // Public classes
    ////////////////////////////////////////////

    export class LatLng {
        public _position: atlas.data.Position;

        constructor(latLngOrLiteral: number | LatLngLiteral, lng?: number) {
            this._position = ConvertToA.latLng(latLngOrLiteral, lng);
        }

        public equals(other: LatLng, precision?: number): boolean {
            return atlas.data.Position.areEqual(this._position, ConvertToA.latLng(other), precision);
        }

        public lat(): number {
            return this._position[1];
        }

        public lng(): number {
            return this._position[0];
        }

        public toString(): string {
            return `(${this._position[1]}, ${this._position[0]})`;
        }

        public toUrlValue(precision?: number): string {
            if (typeof precision !== 'undefined') {
                return `${roundToPrecision(this._position[1], precision)}, ${roundToPrecision(this._position[0], precision)}`;
            }

            return `${this._position[1]}, ${this._position[0]}`;
        }

        public toJSON(): LatLngLiteral {
            return {
                lat: this._position[1],
                lng: this._position[0]
            };
        }
    }

    export class LatLngBounds {
        //For some reason this is what Google has as the default.
        public _bounds: atlas.data.BoundingBox = null;
        public _isEmpty = true;

        constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral) {
            if (sw && ne) {
                var swp = ConvertToA.latLng(sw);
                var nep = ConvertToA.latLng(ne);

                this._bounds = [swp[0], swp[1], nep[0], nep[1]];
                this._isEmpty = false;
            }
        }

        public contains(latLng: LatLng | LatLngLiteral): boolean {
            if (this._bounds && latLng) {
                return atlas.data.BoundingBox.containsPosition(this._bounds, ConvertToA.latLng(latLng));
            }

            return false;
        }

        public equals(other: LatLngBounds | LatLngBoundsLiteral): boolean {
            if (this._bounds && other) {
                var b2 = ConvertToA.bbox(other);
                return atlas.data.Position.areEqual([this._bounds[0], this._bounds[1]], [b2[0], b2[1]]) &&
                    atlas.data.Position.areEqual([this._bounds[2], this._bounds[3]], [b2[2], b2[3]]);
            }

            return false;
        }

        public extend(point: LatLng | LatLngLiteral): LatLngBounds {
            var b = this._bounds;

            if (point) {
                var p2 = ConvertToA.latLng(point);
                var b2 = [p2[0], p2[1], p2[0], p2[1]];

                if (b) {
                    b = atlas.data.BoundingBox.merge(b, b2);
                } else {
                    b = b2;
                    this._isEmpty = false;
                }

                this._bounds = b;
            }

            return this;
        }

        public getCenter(): LatLng {
            if (this._bounds) {
                return ConvertToG.position(atlas.data.BoundingBox.getCenter(this._bounds));
            }

            return null;
        }

        public getNorthEast(): LatLng {
            if (this._bounds) {
                return ConvertToG.position(atlas.data.BoundingBox.getNorthEast(this._bounds));
            }

            return null;
        }

        public getSouthWest(): LatLng {
            if (this._bounds) {
                return ConvertToG.position(atlas.data.BoundingBox.getSouthWest(this._bounds));
            }

            return null;
        }

        public intersects(other: LatLngBounds | LatLngBoundsLiteral): boolean {
            if (this._bounds && other) {
                var b2 = ConvertToA.bbox(other);
                return atlas.data.BoundingBox.intersect(this._bounds, b2);
            }

            return false;
        }

        public isEmpty(): boolean {
            return this._isEmpty || this._bounds === null;
        }

        public toJSON(): LatLngBoundsLiteral {
            if (this._bounds) {
                return {
                    west: this._bounds[0],
                    south: this._bounds[1],
                    east: this._bounds[2],
                    north: this._bounds[3]
                };
            }

            return null;
        }

        public toSpan(): LatLng {
            if (this._bounds) {
                return new google.maps.LatLng(
                    atlas.data.BoundingBox.getHeight(this._bounds),
                    atlas.data.BoundingBox.getWidth(this._bounds));
            }

            return null;
        }

        public toString(): string {
            if (this._bounds) {
                return `((${this._bounds[1]},${this._bounds[0]}), (${this._bounds[3]},${this._bounds[2]}))`;
            }

            return null;
        }

        public toUrlValue(precision?: number): string {
            if (this._bounds) {
                //lat_lo,lng_lo,lat_hi,lng_hi
                if (typeof precision !== 'undefined') {
                    return `${roundToPrecision(this._bounds[1], precision)},${roundToPrecision(this._bounds[0], precision)},${roundToPrecision(this._bounds[3], precision)},${roundToPrecision(this._bounds[2], precision)}`;
                }

                return `${this._bounds[1]},${this._bounds[0]},${this._bounds[3]},${this._bounds[2]}`;
            }

            return null;
        }

        public union(other: LatLngBounds | LatLngBoundsLiteral): LatLngBounds {
            if (other) {
                var b2 = ConvertToA.bbox(other);

                if (this._bounds) {
                    this._bounds = atlas.data.BoundingBox.merge(this._bounds, b2);
                } else {
                    this._bounds = b2;
                }
            }

            return this;
        }
    }

    export class Point {
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }

        public _toPixel(): atlas.Pixel {
            return [this.x, this.y];
        }

        public x: number;

        public y: number;

        public equals(other: Point): boolean {
            if (other) {
                return this.x === other.x && this.y === other.y;
            }

            return false;
        }

        public toString(): string {
            return `(${this.x}, ${this.y})`;
        }
    }

    export class Size {
        public _widthUnit: string;
        public _heightUnit: string;

        constructor(width: number, height: number, widthUnit?: string, heightUnit?: string) {
            this.width = width;
            this.height = height;
            this._widthUnit = widthUnit;
            this._heightUnit = heightUnit;
        }

        public height: number;
        public width: number;

        public equals(other: Size): boolean {
            if (other) {
                return this.width === other.width && this.height === other.height && this._widthUnit === other._widthUnit && this._heightUnit === other._heightUnit;
            }

            return false;
        }

        public toString(): string {
            return `(${this.width}, ${this.height})`;
        }
    }

    interface MapBaseLayers {
        polygonLayer?: atlas.layer.PolygonLayer;
        lineLayer?: atlas.layer.LineLayer;
    }

    export class Map extends MVCObject {
        public _map: atlas.Map;
        public _datasource = new atlas.source.DataSource();
        public _baseLayers: MapBaseLayers = {
            polygonLayer: new atlas.layer.PolygonLayer(this._datasource, null, {
                fillColor: [
                    'case',

                    //Look for a fillColor property. 
                    ['has', 'fillColor'],
                    ['get', 'fillColor'],

                    //Github style.
                    ['has', 'fill'],
                    ['get', 'fill'],

                    //Fallback to the default option. 
                    'black'
                ],

                fillOpacity: [
                    'case',

                    //Look for a fillOpacity property.
                    ['has', 'fillOpacity'],
                    ['get', 'fillOpacity'],

                    //Github style.
                    ['has', 'fill-opacity'],
                    ['get', 'fill-opacity'],

                    0.25
                ],

                filter: ['all', ['any', ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']]]
            }),

            lineLayer: new atlas.layer.LineLayer(this._datasource, null, {
                strokeColor: [
                    'case',

                    //Look for a strokeColor property.
                    ['has', 'strokeColor'],
                    ['get', 'strokeColor'],

                    //Github style.
                    ['has', 'stroke'],
                    ['get', 'stroke'],

                    //Fallback to the default option. 
                    'black'
                ],

                strokeWidth: [
                    'case',

                    //Look for a strokeWidth property.
                    ['has', 'strokeWidth'],
                    ['get', 'strokeWidth'],

                    //Github style.
                    ['has', 'stroke-width'],
                    ['get', 'stroke-width'],

                    //Look for a stroke-thickness property. Other commonly used property name from CSS.
                    ['has', 'stroke-thickness'],
                    ['get', 'stroke-thickness'],

                    //Fallback to the default option. 
                    3
                ],

                strokeOpacity: [
                    'case',

                    //Look for a strokeOpacity property.
                    ['has', 'strokeOpacity'],
                    ['get', 'strokeOpacity'],

                    //Github style.
                    ['has', 'stroke-opacity'],
                    ['get', 'stroke-opacity'],

                    //Fallback to the default option. 
                    1
                ],

                lineJoin: 'round',
                lineCap: 'round',

                filter: ['any', ['==', ['geometry-type'], 'LineString'], ['==', ['geometry-type'], 'MultiLineString'], ['==', ['geometry-type'], 'Polygon'], ['==', ['geometry-type'], 'MultiPolygon']]
            })
        };

        private _mouseEvents = ['click', 'dblclick', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout'];

        constructor(mapDiv: HTMLElement, options?: MapOptions) {
            super();

            this.set('mapDiv', mapDiv);

            this._initCustomControls();

            options = options || {};

            //If default UI is shown, set these as default options.
            if (!options.disableDefaultUI) {
                options = Object.assign(<MapOptions>{
                    mapTypeId: google.maps.MapTypeId.TERRAIN,
                    mapTypeControl: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.TERRAIN],
                        position: google.maps.ControlPosition.TOP_LEFT
                    },
                    fullscreenControl: true,
                    fullscreenControlOptions: {
                        position: google.maps.ControlPosition.TOP_RIGHT
                    },
                    zoomControl: true,
                    zoomControlOptions: {
                        position: google.maps.ControlPosition.BOTTOM_RIGHT
                    }
                }, options);
            }

            var cam = ConvertToA.cameraOptions(options);
            var sty = ConvertToA.styleOptions(options);
            var uio = ConvertToA.userInteractionOptions(options);

            var opt = Object.assign({
                style: 'road_shaded_relief',
                gestureHandling: 'auto',
                transformRequest: (url: string, resourceType: string): atlas.RequestParameters => {
                    // `tile_layer:${_tileLayerCounter},{x},{y},{z}`
                    if (url.startsWith('tile_layer:')) {
                        var parts = url.replace('tile_layer:', '').split(',');
                        var id = 'tile_layer:' + parts[0];
                        var tl = _tileLayers[id];

                        if (tl && parts.length === 4) {
                            var getTileUrl = tl.get('getTileUrl');

                            if (getTileUrl) {
                                try {
                                    url = getTileUrl(new google.maps.Point(parseInt(parts[1]), parseInt(parts[2])), parseInt(parts[3]));

                                    if (url) {
                                        return { url };
                                    }
                                } catch{ }
                            }
                        }

                        //Return an empty image
                        url = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                    }

                    return { url };
                },
            }, cam, sty, uio);

            this._map = new atlas.Map(mapDiv, opt);

            var self = this;
            Object.keys(opt).forEach(key => {
                switch (key) {
                    case 'center':
                    case 'zoom':
                    case 'minZoom':
                    case 'maxZoom':
                    case 'keyboardShortcuts':
                    case 'gestureHandling':
                        self.set(key, options[key]);
                        break;
                    case 'pitch':
                        self.set('tilt', options.tilt);
                        break;
                    case 'bearing':
                        self.set('heading', options.heading);
                        break;
                    case 'maxBounds':
                        self.set('restriction', options.restriction);
                        break;
                    case 'style':
                        self.set('mapTypeId', options.mapTypeId || google.maps.MapTypeId.ROADMAP);
                        break;
                    case 'dragPanInteraction':
                    case 'dragRotateInteraction':
                        self.set('draggable', options.draggable);
                        break;
                    case 'dblClickZoomInteraction':
                        self.set('disableDoubleClickZoom', options.disableDoubleClickZoom);
                        break;
                    case 'scrollZoomInteraction':
                        self.set('scrollwheel', options.scrollwheel);
                        break;
                }
            });

            var self = this;

            self._mouseEvents.forEach(name => {
                self._map.events.add(name, google.maps.event._simpleMouseEvent(self, name, true));
            });

            self._map.events.add('contextmenu', google.maps.event._simpleMouseEvent(self, 'rightclick', true));
            self._map.events.add('move', this._mapMove);
            self._map.events.add('dragstart', google.maps.event._simpleEventHandler(self, 'dragstart'));
            self._map.events.add('dragend', google.maps.event._simpleEventHandler(self, 'dragend'));
            self._map.events.add('idle', google.maps.event._simpleEventHandler(self, ['idle', 'tilesloaded']));
            self._map.events.add('styledata', this._mapTypeChanged);
            self._map.events.add('resize', google.maps.event._simpleEventHandler(self, 'resize'));

            self._map.events.add('ready', () => {
                var _deafultMarker = google.maps.Marker._getMarkerIcon({});
                self._map.imageSprite.add(_deafultMarker.id, <string>_deafultMarker.iconOptions.image);

                this.setOptions(options);

                self._map.sources.add(self._datasource);
                self._map.layers.add(self._baseLayers.polygonLayer, 'labels');
                self._map.layers.add(self._baseLayers.lineLayer, 'labels');

                self._mouseEvents.forEach(name => {
                    self._map.events.add(name, self._baseLayers.polygonLayer, google.maps.event._layerMouseEvent(self._baseLayers.polygonLayer, name));
                    self._map.events.add(name, self._baseLayers.lineLayer, google.maps.event._layerMouseEvent(self._baseLayers.lineLayer, name));
                });
                self._map.events.add('contextmenu', self._baseLayers.polygonLayer, google.maps.event._layerMouseEvent(self._baseLayers.polygonLayer, 'rightclick'));
                self._map.events.add('contextmenu', self._baseLayers.lineLayer, google.maps.event._layerMouseEvent(self._baseLayers.lineLayer, 'rightclick'));

                self._setControls(options);
                self.data.setMap(self);
            
                self._limitScrollWheelZoom();
                self._restrictMapToTwoFingerPan();
            });
        }        
        
        private _mapMove = (): void => {
            google.maps.event.trigger(this, 'drag', null);

            var cam = this._map.getCamera();

            var b = ConvertToG.bbox(cam.bounds)

            if (!this.get('bounds') || !b.equals(this.get('bounds'))) {
                this.set('bounds', b);
                google.maps.event.trigger(this, 'bounds_changed', null);
            }

            var c = ConvertToG.position(cam.center);

            if (!c.equals(this.get('center'), 6)) {
                this.set('center', c);
                google.maps.event.trigger(this, 'center_changed', null);
            }

            var z = Math.round(cam.zoom) + 1;

            if (z !== this.get('zoom')) {
                this.set('zoom', z);
                google.maps.event.trigger(this, 'zoom_changed', null);
            }

            if (cam.bearing !== this.get('heading')) {
                this.set('heading', cam.bearing);
                google.maps.event.trigger(this, 'heading_changed', null);
            }

            if (cam.pitch !== this.get('tilt')) {
                this.set('tilt', cam.pitch);
                google.maps.event.trigger(this, 'tilt_changed', null);
            }
        }

        private _mapTypeChanged = (): void => {
            var mt = ConvertToG.mapTypeId(this._map.getStyle().style);
            if (!this.get('mapTypeId') || mt !== this.get('mapTypeId')) {
                this.set('mapTypeId', mt);
                google.maps.event.trigger(this, 'maptypeid_changed', null);
            }
        }

        public fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void {
            this._map.setCamera({
                bounds: ConvertToA.bbox(bounds),
                padding: ConvertToA.padding(padding)
            });
        }

        public getBounds(): LatLngBounds | null | undefined {
            return this.get('bounds');
        }

        public getCenter(): LatLng {
            return this.get('center');
        }

        public getDiv(): HTMLElement {
            return this.get('mapDiv');
        }

        public getHeading(): number {
            return this.get('heading');
        }

        public getMapTypeId(): MapTypeId {
            return this.get('mapTypeId');
        }

        public getProjection(): Projection | null {
            var self = this;

            return {
                fromLatLngToPoint: function (latLng: LatLng, point?: Point): Point {
                    return ConvertToG.pixel(self._map.positionsToPixels([ConvertToA.latLng(latLng)])[0]);
                },
                fromPointToLatLng(pixel: Point, noWrap?: boolean): LatLng {
                    return ConvertToG.position(self._map.pixelsToPositions([ConvertToA.point(pixel)])[0]);
                }
            };
        }

        public getTilt(): number {
            return this.get('tilt');
        }

        public getZoom(): number {
            return this.get('zoom');
        }

        public panBy(x: number, y: number): void {
            this._map.setCamera({ centerOffset: [x, y], type: 'ease', duration: 250 });
        }

        public panTo(latLng: LatLng | LatLngLiteral): void {
            var c = ConvertToA.latLng(latLng);
            if (!atlas.data.Position.areEqual(c, this._map.getCamera().center)) {
                this._map.setCamera({ center: c, type: 'ease', duration: 250 });
            }
        }

        public panToBounds(latLngBounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void {
            var b = ConvertToA.bbox(latLngBounds);
            var bbox = this._map.getCamera().bounds;
            if (atlas.data.BoundingBox.getWidth(b) !== atlas.data.BoundingBox.getWidth(bbox) ||
                atlas.data.BoundingBox.getHeight(b) !== atlas.data.BoundingBox.getHeight(bbox) ||
                !atlas.data.Position.areEqual(atlas.data.BoundingBox.getCenter(b), atlas.data.BoundingBox.getCenter(bbox))) {
                this._map.setCamera({
                    bounds: ConvertToA.bbox(latLngBounds),
                    padding: ConvertToA.padding(padding),
                    type: 'ease',
                    duration: 250
                });
            }
        }

        public setCenter(latLng: LatLng | LatLngLiteral): void {
            this._map.setCamera({ center: ConvertToA.latLng(latLng) });
            this.set('center', ConvertToG.position(ConvertToA.latLng(latLng)));
        }

        public setHeading(heading: number): void {
            this._map.setCamera({ bearing: heading });
            this.set('heading', heading);
        }

        private _lasyMapStyle: string;
        private _lastCustomMapType: ImageMapType;

        public setMapTypeId(mapTypeId: MapTypeId | string): void {
            if (this._lastCustomMapType) {
                this._lastCustomMapType._setMap(null);
                this._lastCustomMapType = null;

                if (mapTypeId === null) {
                    this._map.setStyle({ style: this._lasyMapStyle });
                }
            }

            if (mapTypeId === google.maps.MapTypeId.HYBRID ||
                mapTypeId === google.maps.MapTypeId.ROADMAP ||
                mapTypeId === google.maps.MapTypeId.SATELLITE ||
                mapTypeId === google.maps.MapTypeId.TERRAIN) {
                this._lasyMapStyle = ConvertToA.mapTypeId(mapTypeId);
                this._map.setStyle({ style: this._lasyMapStyle });
                this.set('mapTypeId', mapTypeId);
            } else {
                var mt = this.mapTypes.get(mapTypeId);
                if (mt && mt instanceof google.maps.ImageMapType) {
                    mt._setMap(this);
                    this._lastCustomMapType = mt;
                    this._map.setStyle({ style: 'blank_accessible' });
                }
            }
        }

        public setOptions(options: MapOptions): void {
            if (options) {
                if (options.backgroundColor) {
                    this.set('backgroundColor', options.backgroundColor);
                    this._map.getMapContainer().style.backgroundColor = options.backgroundColor;
                }

                this._setControls(options);

                var cam: atlas.CameraOptions & atlas.CameraBoundsOptions = {};
                var style: atlas.StyleOptions = {};
                var ui: atlas.UserInteractionOptions = {};

                Object.keys(options).forEach(key => {
                    this.set(key, options[key]);

                    switch (key) {
                        case 'center':
                            this.setCenter(options.center);
                            break;
                        case 'tilt':
                            cam.pitch = options.tilt;
                            break;
                        case 'heading':
                            cam.bearing = options.heading;
                            break;
                        case 'mapTypeId':
                            style.style = ConvertToA.mapTypeId(options.mapTypeId);
                            break;
                        case 'zoom':
                        case 'minZoom':
                        case 'maxZoom':
                            cam[key] = Math.max(options[key] - 1, 0);
                            break;
                        case 'restriction':
                            cam.maxBounds = ConvertToA.bbox(options.restriction.latLngBounds);
                            break;
                        case 'disableDoubleClickZoom':
                            ui.dblClickZoomInteraction = !options.disableDoubleClickZoom;
                            break;
                        case 'draggable':
                            ui.dragPanInteraction = options.draggable;
                            ui.dragRotateInteraction = options.draggable;
                            break;
                        case 'scrollwheel':
                            ui.scrollZoomInteraction = !options.scrollwheel;
                            break;
                        case 'keyboardShortcuts':
                            ui.keyboardShortcuts = !options.keyboardShortcuts;
                            break;
                        default:
                            break;
                    }
                });

                if (Object.keys(cam).length > 0) {
                    this._map.setCamera(cam);
                }

                if (Object.keys(style).length > 0) {
                    this._map.setStyle(style);
                }

                if (Object.keys(ui).length > 0) {
                    this._map.setUserInteraction(ui);
                }
            }
        }

        public setTilt(tilt: number): void {
            this._map.setCamera({ pitch: tilt });
            this.set('tilt', tilt);
        }

        public setZoom(zoom: number): void {
            this._map.setCamera({ zoom: zoom - 1 });
            this.set('zoom', zoom);
        }

        public controls: Array<ControlManager> = [];

        public data: Data = new google.maps.Data();

        public overlayMapTypes: MVCArray<MapType> = new OverlayMapTypesManager(this);

        //Container for built-in controls
        private _controls: { [key: string]: atlas.Control } = {};

        private _setControls(options: MapOptions): void {
            if (options) {
                if (typeof options.disableDefaultUI === 'boolean' && options.disableDefaultUI) {
                    //Remove all controls.
                    Object.keys(this._controls).forEach(k => {
                        this._map.controls.remove(this._controls[k]);
                        delete this._controls[k];
                    });
                } else {
                    var pos = undefined;

                    if (typeof options.mapTypeControl === 'boolean') {
                        var mtc = this._controls['mapTypeControl'];

                        if (options.mapTypeControl) {
                            var mtco: atlas.StyleControlOptions = {};

                            if (options.mapTypeControlOptions) {
                                if (typeof options.mapTypeControlOptions.position !== 'undefined') {
                                    pos = { position: ConvertToA.controlPosition(options.mapTypeControlOptions.position, 'top-left') };
                                }

                                if (options.mapTypeControlOptions.mapTypeIds) {
                                    var s = [];

                                    options.mapTypeControlOptions.mapTypeIds.forEach(x => {
                                        var mt = ConvertToA.mapTypeId(x);

                                        if (s.indexOf(mt) === -1) {
                                            s.push(mt);
                                        }
                                    });

                                    if (s.length > 0) {
                                        mtco.mapStyles = s;
                                    }
                                }

                                if (typeof options.mapTypeControlOptions.style !== 'undefined') {
                                    switch (options.mapTypeControlOptions.style) {
                                        case google.maps.MapTypeControlStyle.DROPDOWN_MENU:
                                            mtco.layout = 'list';
                                            break;
                                        case google.maps.MapTypeControlStyle.HORIZONTAL_BAR:
                                        case google.maps.MapTypeControlStyle.INSET:
                                        case google.maps.MapTypeControlStyle.INSET_LARGE:
                                        default:
                                            mtco.layout = 'icons';
                                            break;
                                    }
                                }
                            }

                            if (mtc) {
                                this._map.controls.remove(mtc);
                            }

                            mtc = new atlas.control.StyleControl(mtco);
                            this._controls['mapTypeControl'] = mtc;
                            this._map.controls.add(mtc, pos);
                        } else if (mtc) {
                            this._map.controls.remove(mtc);
                            delete this._controls['mapTypeControl'];
                        }
                    }

                    pos = undefined;

                    if (typeof options.rotateControl === 'boolean') {
                        var rc = this._controls['rotateControl'];

                        if (options.rotateControl) {
                            if (options.rotateControlOptions && typeof options.rotateControlOptions.position !== 'undefined') {
                                pos = { position: ConvertToA.controlPosition(options.rotateControlOptions.position, 'bottom-right') };
                            }

                            if (rc) {
                                this._map.controls.remove(rc);
                            }

                            rc = new atlas.control.CompassControl();
                            this._controls['rotateControl'] = rc;
                            this._map.controls.add(rc, pos);
                        } else if (rc) {
                            this._map.controls.remove(rc);
                            delete this._controls['rotateControl'];
                        }
                    }

                    pos = undefined;

                    if (typeof options.zoomControl === 'boolean') {
                        var zc = this._controls['zoomControl'];

                        if (options.zoomControl) {
                            if (options.zoomControlOptions && typeof options.zoomControlOptions.position !== 'undefined') {
                                pos = { position: ConvertToA.controlPosition(options.zoomControlOptions.position, 'bottom-right') };
                            }

                            if (zc) {
                                this._map.controls.remove(zc);
                            }

                            zc = new atlas.control.ZoomControl();
                            this._controls['zoomControl'] = zc;
                            this._map.controls.add(zc, pos);
                        } else if (zc) {
                            this._map.controls.remove(zc);
                            delete this._controls['zoomControl'];
                        }
                    }

                    pos = undefined;

                    if (typeof options.zoomControl === 'boolean') {
                        var fs = this._controls['fullscreen'];

                        if (options.fullscreenControl) {
                            if (options.fullscreenControlOptions) {
                                if (typeof options.fullscreenControlOptions.position !== 'undefined') {
                                    pos = { position: ConvertToA.controlPosition(options.fullscreenControlOptions.position, 'top-right') };
                                }
                            }

                            if (fs) {
                                this._map.controls.remove(fs);
                            }

                            fs = new FullscreenControl();
                            this._controls['fullscreen'] = fs;
                            this._map.controls.add(fs, pos);
                        } else if (fs) {
                            this._map.controls.remove(fs);
                            delete this._controls['fullscreen'];
                        }
                    }
                }
            }
        }

        private _initCustomControls(): void {
            this.controls[google.maps.ControlPosition.BOTTOM_CENTER] = new ControlManager(google.maps.ControlPosition.BOTTOM_CENTER, this);
            this.controls[google.maps.ControlPosition.BOTTOM_LEFT] = new ControlManager(google.maps.ControlPosition.BOTTOM_LEFT, this);
            this.controls[google.maps.ControlPosition.BOTTOM_RIGHT] = new ControlManager(google.maps.ControlPosition.BOTTOM_RIGHT, this);
            this.controls[google.maps.ControlPosition.LEFT_BOTTOM] = new ControlManager(google.maps.ControlPosition.LEFT_BOTTOM, this);
            this.controls[google.maps.ControlPosition.LEFT_CENTER] = new ControlManager(google.maps.ControlPosition.LEFT_CENTER, this);
            this.controls[google.maps.ControlPosition.LEFT_TOP] = new ControlManager(google.maps.ControlPosition.LEFT_TOP, this);
            this.controls[google.maps.ControlPosition.RIGHT_BOTTOM] = new ControlManager(google.maps.ControlPosition.RIGHT_BOTTOM, this);
            this.controls[google.maps.ControlPosition.RIGHT_CENTER] = new ControlManager(google.maps.ControlPosition.RIGHT_CENTER, this);
            this.controls[google.maps.ControlPosition.RIGHT_TOP] = new ControlManager(google.maps.ControlPosition.RIGHT_TOP, this);
            this.controls[google.maps.ControlPosition.TOP_CENTER] = new ControlManager(google.maps.ControlPosition.TOP_CENTER, this);
            this.controls[google.maps.ControlPosition.TOP_LEFT] = new ControlManager(google.maps.ControlPosition.TOP_LEFT, this);
            this.controls[google.maps.ControlPosition.TOP_RIGHT] = new ControlManager(google.maps.ControlPosition.TOP_RIGHT, this);
        }

        private _restrictMapToTwoFingerPan(): void {
            var self = this;
            var pointerCount = 0;

            var msgDialog = self._createMsgPanel('Use two fingers to move the map');

            //Monitor the drag start event.
            self._map.events.add('dragstart', function (e) {
                //Determine if the drag event is due to touch.
                if (e.originalEvent && pointerCount === 1) {
                    //If there is only one touch point, disable drag panning by disablling, then re-enabling to cancel the current pan request.
                    //Disable then re-enable the drag panning. This will cancel the single touch drag functionality.
                    self._map.setUserInteraction({ dragPanInteraction: false });
                    self._map.setUserInteraction({ dragPanInteraction: true });
                    self._showMsg(msgDialog);
                }
            });

            //Add touch events to the map container and monitor the movement and move the page accordingly when there is a single touch.

            var pageX = 0;
            var pageY = 0;
            var scale = 1;

            var mapDiv = self._map.getMapContainer();

            var touchStartHandler = function (e) {
                if (!self._canUseGestures()) {
                    var px, py;
                    if (window['PointerEvent']) {
                        if (e.pointerType !== 'touch') {
                            return;
                        }

                        pointerCount++;
                        px = e.pageX;
                        py = e.pageY;
                    } else {
                        pointerCount = e.touches.length;
                        px = e.touches[0].pageX;
                        py = e.touches[0].pageY;
                    }

                    if (pointerCount === 2) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        return;
                    }

                    pageX = px;
                    pageY = py;
                }
            };

            var touchMoveHandler = (e) => {
                if (!self._canUseGestures()) {
                    var px, py;
                    if (window['PointerEvent']) {
                        if (e.pointerType !== 'touch') {
                            return;
                        }

                        px = pageX - e.screenX;
                        py = pageY - e.screenY;
                    } else {
                        pointerCount = e.touches.length;
                        px = pageX - e.touches[0].screenX;
                        py = pageY - e.touches[0].screenY;
                    }

                    if (pointerCount === 2) {
                        return;
                    }

                    if (scale === e.scale) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                    }

                    scale = e.scale;

                    window.scrollTo(px, py);
                }
            };

            //Add support for Pointer Events and fallback onto touch events. Edge only supports pointer events, and Safari only supports touch events. Chrome supports both.
            if (window['PointerEvent']) {
                mapDiv.addEventListener('pointerdown', touchStartHandler, false);

                mapDiv.addEventListener('pointerup', (e) => {
                    if (e.pointerType === 'touch') {
                        pointerCount--;
                    }
                }, false);

                mapDiv.addEventListener('pointermove', touchMoveHandler, false);
            } else {
                mapDiv.addEventListener('touchstart', touchStartHandler, false);
                mapDiv.addEventListener('touchmove', touchMoveHandler, false);
            }
        }

        private _limitScrollWheelZoom(): void {
            var self = this;

            self._map.setUserInteraction({ scrollZoomInteraction: false });

            var msgDialog = self._createMsgPanel('Use ctrl + scroll to zoom the map');

            self._map.getMapContainer().addEventListener('mousewheel', function (e) {
                if (!e['ctrlKey'] && !self._canUseGestures()) {
                    self._showMsg(msgDialog);
                }
            });

            window.addEventListener('keydown', function (e) {
                if (e.ctrlKey && !self._canUseGestures()) {
                    self._map.setUserInteraction({ scrollZoomInteraction: true });
                }
            });

            window.addEventListener('keyup', function (e) {
                if (!e.ctrlKey && !self._canUseGestures()) {
                    self._map.setUserInteraction({ scrollZoomInteraction: false });
                }
            });
        }

        private _canUseGestures(): boolean {
            var gh = this.get('gestureHandling') || 'auto';

            if (gh === 'greedy') {
                return true;
            }

            if (gh === 'none') {
                return false;
            }

            if (gh === 'auto' || gh === 'cooperative') {
                //If the page has scroll area, don't let the user zoom the map using the scroll wheel.
                return !(document.body.scrollHeight > document.body.clientHeight);
            }

            return true;
        }
               
        private _createMsgPanel(msg: string): HTMLDivElement {
            var msgDialog = document.createElement('div');
            Object.assign(msgDialog.style, {
                display: 'none',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                fontSize: '24px',
                fontWeight: 'bold',
                transition: 'visibility 0s linear 0s opacity 500ms'
            });
            msgDialog.innerHTML = `<div style="position:relative;float:left;top:50%;left:50%;transform:translate(-50%,-50%);">${msg}</div>`;
            this._map.getMapContainer().append(msgDialog);
            return msgDialog;
        }

        private _showMsg(msgPanel: HTMLDivElement): void {
            //Show the message dialog for 2 seconds then fade out over 300ms.
            msgPanel.style.display = '';
            msgPanel.style.opacity = '1';

            setTimeout(function () {
                msgPanel.style.opacity = '0';

                setTimeout(function () {
                    msgPanel.style.display = 'none';
                }, 300);
            }, 2000);
        }

        /*********** NOT SUPPORTED *************/

        public mapTypes: MapTypeRegistry = new google.maps.MapTypeRegistry(this);

        public getClickableIcons(): boolean { return false; }
        public setClickableIcons(clickable: boolean): void { }

        public getStreetView(): StreetViewPanorama { return null; }
        public setStreetView(panorama: StreetViewPanorama | null): void { }
    }

    class OverlayMapTypesManager extends MVCArray<MapType> {
        private _map: Map;

        constructor(map: Map) {
            super();
            this._map = map;
        }

        public clear(): void {
            this.forEach(e => {
                this.pop();
            });
        }

        public insertAt(i: number, elem: MapType): void {
            if (elem && elem instanceof google.maps.ImageMapType) {
                var before = undefined;
                if (i < this.getLength()) {
                    before = this.getAt(i)._layer;
                }
                elem._setMap(this._map, before);
                super.insertAt(i, elem);
            }
        }

        public pop(): MapType {
            var e = super.pop();
            e._setMap(null);
            return e;
        }

        public push(elem: MapType): number {
            if (elem && elem instanceof google.maps.ImageMapType) {
                elem._setMap(this._map);
                return super.push(elem);
            }
            return -1;
        }

        public removeAt(i: number): MapType {
            var e = super.removeAt(i);
            e._setMap(null);
            return e;
        }

        public setAt(i: number, elem: MapType): void {
            if (elem && elem instanceof google.maps.ImageMapType) {
                var e = super.getAt(i);
                elem._setMap(this._map, e._layer);
                e._setMap(null);
                super.setAt(i, elem);
            }
        }
    }

    class CustomControl implements atlas.Control {

        constructor(public element: HTMLElement) {
        }

        public onAdd(map: atlas.Map, options?: atlas.ControlOptions): HTMLElement | null {
            return this.element;
        }

        public onRemove() {
        }
    }

    class ControlManager extends MVCArray<HTMLElement>{
        private _controlPosition: ControlPosition;
        private _map: Map;
        private _azPosition: string;

        constructor(controlPosition: ControlPosition, map: Map) {
            super();

            this._controlPosition = controlPosition;
            this._map = map;
            this._azPosition = ConvertToA.controlPosition(controlPosition, 'top-left');
        }

        public clear(): void {
            this.forEach(e => {
                this.pop();
            });
        }

        public insertAt(i: number, elem: HTMLElement): void {
            if (elem) {
                this._prepareControl(elem);
                this._map._map.controls.add(elem['_control'], {
                    position: <atlas.ControlPosition>this._azPosition
                });
                super.insertAt(i, elem);
            }
        }

        public pop(): HTMLElement {
            var e = super.pop();
            this._map._map.controls.remove(<atlas.Control>(e['_control']));
            return e;
        }

        public push(elem: HTMLElement): number {
            if (elem) {
                this._prepareControl(elem);
                this._map._map.controls.add(elem['_control'], {
                    position: <atlas.ControlPosition>this._azPosition
                });
                return super.push(elem);
            }
            return -1;
        }

        public removeAt(i: number): HTMLElement {
            var e = super.removeAt(i);
            this._map._map.controls.remove(<atlas.Control>(e['_control']));
            return e;
        }

        public setAt(i: number, elem: HTMLElement): void {
            if (elem) {
                var e = super.getAt(i);
                this._map._map.controls.remove(<atlas.Control>(e['_control']));

                this._prepareControl(elem);
                this._map._map.controls.add(elem['_control'], {
                    position: <atlas.ControlPosition>this._azPosition
                });

                super.setAt(i, elem);
            }
        }

        private _prepareControl(elm: HTMLElement): void {
            elm.style.pointerEvents = 'all';

            if (!elm['_control']) {
                if (!elm['onAdd'] || !elm['onRemove']) {
                    elm['_control'] = new CustomControl(elm);
                } else {
                    elm['_control'] = elm;
                }
            }
        }
    }

    export class MapTypeRegistry extends MVCObject {
        private _map: Map;

        constructor(map: Map) {
            super();

            this._map = map;

            this.terrain = {
                minZoom: 0,
                maxZoom: 19,
                name: google.maps.MapTypeId.TERRAIN,
                tileSize: new google.maps.Size(256, 256),
                projection: this._map.getProjection(),
                _setMap: null,
                getTile: null,
                releaseTile: null
            };

            this.hybrid = {
                minZoom: 0,
                maxZoom: 19,
                name: google.maps.MapTypeId.HYBRID,
                tileSize: new google.maps.Size(256, 256),
                projection: this._map.getProjection(),
                _setMap: null,
                getTile: null,
                releaseTile: null
            };

            this.roadmap = {
                minZoom: 0,
                maxZoom: 19,
                name: google.maps.MapTypeId.ROADMAP,
                tileSize: new google.maps.Size(256, 256),
                projection: this._map.getProjection(),
                _setMap: null,
                getTile: null,
                releaseTile: null
            };

            this.satellite = {
                minZoom: 0,
                maxZoom: 19,
                name: google.maps.MapTypeId.SATELLITE,
                tileSize: new google.maps.Size(256, 256),
                projection: this._map.getProjection(),
                _setMap: null,
                getTile: null,
                releaseTile: null
            };
        }

        public hybrid: MapType;
        public terrain: MapType;
        public roadmap: MapType;
        public satellite: MapType;
    }

    export class Marker extends MVCObject {
        static readonly MAX_ZINDEX: number = 10000;

        public _marker: atlas.HtmlMarker;
        private _options: MarkerOptions = {};
        public _shape: atlas.Shape;
        public _drawingManager: drawing.DrawingManager;

        constructor(opts?: MarkerOptions) {
            super();

            opts = opts || {};

            this.set('cursor', 'pointer');
            this.set('draggable', false);
            this.set('opacity', 1);
            this.set('visible', true);
            this.set('zIndex', 0);

            this._marker = new atlas.HtmlMarker({
                visible: false
            });
            this._marker['_gm'] = this;

            var self = this;

            this.changed = (property: string) => {
                switch (property) {
                    case 'animation':
                        self._options.animation = self.get('animation');
                        google.maps.event.trigger(self, 'animation_changed', null);
                        break;
                    case 'icon':
                        self._options.icon = self.get('icon');
                        self._renderMarker();
                        google.maps.event.trigger(self, 'icon_changed', null);
                        break;
                    case 'editable':
                        if (self._drawingManager) {
                            if (self.get('editable')) {
                                var m = self.get('map');
                                if (m) {
                                    m._map.markers.remove(self._marker);
                                }
                                self._drawingManager._drawingManager.getSource().add(self._shape);
                                //@ts-ignore
                                self._drawingManager._drawingManager.setOptions({ mode: 'edit-geometry' })
                                self._drawingManager._drawingManager['editHelper'].edit(self._shape);
                            } else {
                                self._drawingManager._drawingManager.setOptions({ mode: atlas.drawing.DrawingMode.idle });
                            }
                        }
                        break;
                    case 'map':
                        var m2: atlas.Map = self._marker['map'] ? self._marker['map'] : ((self._shape && self._shape['dataSource']) ? self._shape['dataSource'].map : null);

                        if (m2) {
                            if (self._shape) {
                                var ds = self._shape['dataSource'];
                                if (ds) {
                                    ds.remove(self._shape);
                                }

                                if (self._drawingManager) {
                                    self._drawingManager._drawingManager.setOptions({ mode: atlas.drawing.DrawingMode.idle });
                                }
                            }

                            m2.markers.remove(self._marker);

                            this._mouseEvents.forEach(name => {
                                m2.events.remove(name, self._marker, google.maps.event._simpleMouseEvent(self, name));
                                //@ts-ignore
                                m2.events.remove(name, self._shape, google.maps.event._simpleMouseEvent(self, name));
                            });

                            m2.events.remove('contextmenu', self._marker, google.maps.event._simpleMouseEvent(self, 'rightclick'));
                            //@ts-ignore
                            m2.events.remove('contextmenu', self._shape, google.maps.event._simpleMouseEvent(self, 'rightclick'));
                            m2.events.add('drag', self._marker, self._dragged);

                            self._dragEvents.forEach(name => {
                                m2.events.remove(name, self._marker, google.maps.event._simpleEventHandler(self, name));
                            });
                        }

                        var map: Map = self.get('map');

                        if (map) {
                            map._map.markers.add(self._marker);

                            self._mouseEvents.forEach(name => {
                                map._map.events.add(name, self._marker, google.maps.event._simpleMouseEvent(self, name));
                            });

                            map._map.events.add('contextmenu', self._marker, google.maps.event._simpleMouseEvent(self, 'rightclick'));
                            map._map.events.add('drag', self._marker, self._dragged);

                            self._dragEvents.forEach(name => {
                                map._map.events.add(name, self._marker, google.maps.event._simpleEventHandler(self, name));
                            });
                        }
                        break;
                    case 'position':
                        var p = this.get('position');
                        if (p) {
                            this._marker.setOptions({
                                position: ConvertToA.latLng(p)
                            });

                            if (this._shape) {
                                this._shape.setCoordinates(ConvertToA.latLng(p));
                            }
                        }
                        google.maps.event.trigger(self, 'position_changed', null);
                        google.maps.event.trigger(self, 'drag', null);
                        break;
                    case 'opacity':
                        self._options.opacity = self.get('opacity');
                        break;
                    case 'cursor':
                        self._options.cursor = self.get('cursor');
                        google.maps.event.trigger(self, 'cursor_changed', null);
                        break;
                    case 'draggable':
                        self._marker.setOptions({
                            draggable: self.get('draggable') || false
                        });
                        google.maps.event.trigger(self, 'draggable_changed', null);
                        break;
                    case 'title':
                        self._options.title = self.get('title');
                        google.maps.event.trigger(self, 'title_changed', null);
                        break;
                    case 'label':
                        var label = self.get('label');
                        self._options.label = self.get('label');
                        if (label) {
                            var l: MarkerLabel;

                            if (typeof label === 'string') {
                                l = {
                                    text: label
                                };
                            } else {
                                l = label;
                            }

                            this._marker.setOptions({
                                text: l.text
                            });
                        }
                        break;
                    case 'visible':
                        self._marker.setOptions({
                            visible: self.get('visible') || false
                        });
                        google.maps.event.trigger(self, 'visible_changed', null);
                        break;
                    case 'zIndex':
                        self._options.zIndex = self.get('zIndex') || 0;
                        google.maps.event.trigger(self, 'zindex_changed', null);
                        break;
                }

                self._renderMarker();
                google.maps.event.trigger(self, 'changed', null);
            };

            this.setOptions(opts);
        }

        public getZIndex(): number | null | undefined {
            return this.get('zIndex');
        }

        public getVisible(): boolean {
            return this.get('.visible');
        }

        public getClickable(): boolean {
            return this.get('clickable');
        }

        public getDraggable(): boolean | null | undefined {
            return this.get('draggable');
        }

        public getCursor(): string | null | undefined {
            return this.get('cursor');
        }

        public getIcon(): string | Icon | Symbol | null | undefined {
            return this.get('icon');
        }

        public getMap(): Map | null | undefined { // | StreetViewPanorama
            return this.get('map');
        }

        public getOpacity(): number | null | undefined {
            return this.get('opacity');
        }

        public getPosition(): LatLng | null | undefined {
            return this.get('position');
        }

        public getTitle(): string | null | undefined {
            return this.get('title');
        }

        public setIcon(icon: string | Icon | Symbol | null): void {
            this.set('icon', icon);
        }

        private _mouseEvents = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout'];
        private _dragEvents = ['dragend', 'dragstart'];

        public setMap(map: Map | null): void {//| StreetViewPanorama
            this.set('map', map);
        }

        private _dragged = () => {
            this.set('position', ConvertToG.position(this._marker.getOptions().position));
        };

        public setOpacity(opacity: number | null): void {
            this.set('opacity', opacity);
        }

        public setCursor(cursor: string | null): void {
            this.set('cursor', cursor);
        }

        public setOptions(options: MarkerOptions): void {
            if (options) {
                this._options = Object.assign(this._options, options);

                if (typeof options.map !== 'undefined') {
                    this.setMap(<Map>options.map);
                }

                if (typeof options.draggable === 'boolean') {
                    this.setDraggable(options.draggable);
                }

                if (options.cursor) {
                    this.set('cursor', options.cursor);
                }

                if (options.icon) {
                    this.set('icon', options.icon);
                }

                if (typeof options.opacity === 'number') {
                    this.set('opacity', options.opacity);
                }

                if (typeof options.label !== 'undefined') {
                    this.setLabel(options.label, true);
                }

                if (typeof options.zIndex === 'number') {
                    this.set('zIndex', options.zIndex);
                }

                if (options.position) {
                    this.setPosition(options.position);
                }

                if (typeof options.visible === 'boolean') {
                    this.setVisible(options.visible);
                }

                if (options.title) {
                    this.set('title', options.title);
                }

                if (typeof options.animation !== 'undefined') {
                    this.set('animation', options.animation);
                }
            }
        }

        public setPosition(latlng: LatLng | LatLngLiteral | null): void {
            if (latlng) {
                var p = ConvertToA.latLng(latlng);
                this.set('position', ConvertToG.position(p));
            }
        }

        public getLabel(): MarkerLabel | null | undefined {
            return this.get('label');
        }

        public setClickable(flag: boolean): void {
            this.set('clickable', flag);
        }

        public setLabel(label: MarkerLabel | string | null, skipRender?: boolean): void {
            this.set('label', label);
        }

        public setTitle(title: string | null): void {
            this.set('title', title);
        }

        public setDraggable(flag: boolean | null): void {
            this.set('draggable', flag);
        }

        public setVisible(visible: boolean): void {
            this.set('visible', visible);
        }

        public setZIndex(zIndex: number | null): void {
            this.set('zIndex', zIndex);
        }

        public getAnimation(): Animation | null | undefined {
            return this.get('animation');
        }

        public setAnimation(animation: Animation | null): void {
            this.set('animation', animation);
        }

        private _renderMarker(): void {
            var icon = google.maps.Marker._getMarkerIcon(this._options);
            this._marker.setOptions(icon.markerOptions);

            if (!this._marker.getOptions().visible && this.get('visible')) {
                this._marker.setOptions({ visible: true });
            }
        }

        public static _getMarkerIcon(options: MarkerOptions): MarkerIconDetails {
            //Create a copy of the options and remove the unneeded.
            options = Object.assign({}, options);
            options.draggable = undefined;
            options.map = undefined;
            options.optimized = undefined;
            options.position = undefined;
            options.visible = undefined;

            var size = 1;

            var id = JSON.stringify(options);

            if (_markerIcons[id]) {
                return _markerIcons[id];
            }

            var icon = options.icon;

            if (typeof options.label === 'string') {
                options.label = { text: options.label };
            }

            var fontSize = 14;

            var font = Object.assign({
                fontSize: '14px',
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontWeight: 'normal',
                color: 'black'
            }, options.label || { text: '' });

            var fs = parseFloat(font.fontSize);
            var sfs = font.fontSize.toLowerCase();

            if (sfs.indexOf('px') > 0) {
                fontSize = fs;
            } else if (sfs.indexOf('em') > 0) {
                fontSize = fs * 16;
            }

            var css = 'style="position:relative;text-align:center;';

            if (options.cursor) {
                css += `cursor:${options.cursor};`
            }

            if (typeof options.opacity === 'number') {
                css += `opacity:${options.opacity.toString()};`
            }

            if (typeof options.zIndex === 'number') {
                css += `z-index:${options.zIndex.toString()};`
            }

            css += '" ';

            if (options.animation) {
                var a = options.animation === google.maps.Animation.BOUNCE ? 'marker-bounce' : 'marker-drop';
                css += `class="${a}" `;
            }

            if (typeof options.title === 'string') {
                css += `title="${options.title}" `;
            }

            var bubbleOptions: atlas.BubbleLayerOptions;

            if (icon) {
                var url: string;
                var content: string;
                var anchor: "center" | "left" | "right" | "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
                var pixelOffset = new atlas.Pixel(0, 0);
                var rotation = 0;
                var imageCss = '';

                if (typeof icon === 'string') {
                    url = icon;
                } else if (typeof (<Symbol>icon).path !== 'undefined') {
                    //Symbol -> SVG (out of box or custom path)
                    var scale = (<Symbol>icon).scale || 1;

                    var sy = Object.assign({
                        scale: scale,
                        fillColor: 'black',
                        fillOpacity: 0,
                        strokeColor: 'black',
                        strokeOpacity: 1,
                        strokeWeight: scale
                    }, <Symbol>icon);

                    var path: string;

                    if (sy.path === google.maps.SymbolPath.CIRCLE) {
                        var size = (scale + sy.strokeWeight) * 2;
                        var cxy = scale + sy.strokeWeight;

                        content = `<svg height="${size}" width="${size}" display="block" viewBox="0 0 ${size} ${size}" ${css}><circle cx="${cxy}" cy="${cxy}" r="${scale}" stroke="${sy.strokeColor}" stroke-width="${sy.strokeWeight}" stroke-opacity="${sy.strokeOpacity}" fill="${sy.fillColor}" fill-opacity="${sy.fillOpacity}"/><text style="font-family:${font.fontFamily};font-size:${font.fontSize};fill:${font.color};" text-anchor="middle" dominant-baseline="central" x="50%" y="50%">${font.text}</text></svg>`;

                        bubbleOptions = {
                            radius: scale,
                            strokeColor: sy.strokeColor,
                            strokeOpacity: sy.strokeOpacity,
                            strokeWidth: sy.strokeWeight,
                            color: sy.fillColor,
                            opacity: sy.fillOpacity
                        };

                        if (sy.anchor) {
                            anchor = 'top-left';
                            pixelOffset = new atlas.Pixel(-sy.anchor.x, -sy.anchor.y);
                        } else {
                            anchor = 'center';
                        }
                    } else {
                        switch (sy.path) {
                            case google.maps.SymbolPath.BACKWARD_CLOSED_ARROW:
                                path = 'M0 0 L2 4.5 L4 0 L2 1 Z';
                                anchor = 'bottom';
                                break;
                            case google.maps.SymbolPath.BACKWARD_OPEN_ARROW:
                                path = 'M0 0 L2 4.5 L4 0';
                                break;
                            case google.maps.SymbolPath.FORWARD_CLOSED_ARROW:
                                path = 'M0 4.5 L2 0 L4 4.5 L2 3.5 Z';
                                anchor = 'top';
                                break;
                            case google.maps.SymbolPath.FORWARD_OPEN_ARROW:
                                path = 'M0 4.5 L2 0 L4 4.5';
                                anchor = 'top';
                                break;
                            default:
                                path = sy.path;
                                anchor = 'top-left';
                                break;
                        }
                    }

                    if (typeof path === 'string') {
                        var svgSize = SvgParser.getPathSize(path);

                        if (svgSize) {
                            var strokeOffet = sy.strokeWeight * 1.5;
                            var buffer = strokeOffet * 2;

                            var sw = svgSize[2] * sy.scale + buffer;
                            var sh = svgSize[3] * sy.scale + buffer;

                            content = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="${sh}" width="${sw}" display="block" viewBox="0 0 ${sw} ${sh}" ${css}><g transform="translate(${-svgSize[1] * sy.scale + strokeOffet}, ${-svgSize[1] * sy.scale + strokeOffet})" style="transform-origin: 50% 50%;"><path d="${sy.path}" transform="scale(${sy.scale})" stroke="${sy.strokeColor}" vector-effect="non-scaling-stroke" stroke-width="${sy.strokeWeight}" stroke-opacity="${sy.strokeOpacity}" fill="${sy.fillColor}" fill-opacity="${sy.fillOpacity}"/></g><text style="font-family:${font.fontFamily};font-size:${font.fontSize};fill:${font.color};" text-anchor="middle" dominant-baseline="middle" x="50%" y="50%">{text}</text></svg>`;

                            url = content;

                            if (sy.anchor) {
                                anchor = 'top-left';
                                pixelOffset = new atlas.Pixel(-sy.anchor.x * sy.scale, -sy.anchor.y * sy.scale);
                            }
                        }
                    }
                } else {
                    //Icon - Image
                    var ic = <Icon>icon;

                    if (ic.url) {
                        url = ic.url;
                    }

                    if (ic.anchor) {
                        anchor = 'top-left';
                        pixelOffset = new atlas.Pixel(-ic.anchor.x, -ic.anchor.y);
                    }

                    if (ic.scaledSize) {
                        css += `width="${ic.scaledSize.width}px" height="${ic.scaledSize.height}px" `;
                        imageCss += `width:${ic.scaledSize.width}px;height:${ic.scaledSize.height}px;`;

                        if (ic.size) {
                            var wScale = ic.scaledSize.width / ic.size.width;
                            var hScale = ic.scaledSize.height / ic.size.height;
                            size = (wScale + hScale) / 2;
                        }
                    }
                }

                if (url && !content) {
                    content = `<div ${css}><img src="${url}" style="${imageCss}"/><div style="position:absolute;top:50%;left:50%;transform: translate(-50%, -50%);color:${font.color};font-size:${font.fontSize};font-family:${font.fontFamily};font-weight:${font.fontWeight};">{text}</div></div>`;
                }

                if (content) {
                    return {
                        id: id,
                        markerOptions: {
                            anchor: anchor || 'bottom',
                            pixelOffset: pixelOffset,
                            htmlContent: content,
                            text: font.text,
                            rotation: (rotation) ? rotation : undefined
                        },
                        bubbleOptions: bubbleOptions,
                        iconOptions: (url) ? {
                            image: url.replace('{text}', ''),
                            rotation: (rotation) ? rotation : undefined,
                            anchor: anchor || 'bottom',
                            offset: pixelOffset,
                            size: size || 1
                        } : undefined,
                        textOptions: (font.text && font.text !== '') ? {
                            color: font.color,
                            size: fontSize,
                            textField: font.text
                        } : undefined
                    };
                }
            }

            if (!font.text || font.text === '') {
                font.text = '●';
                font.fontSize = '20px';
                font.color = '#990000';
            }

            content = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.5 36.5" width="24.5" height="36.5" display="block" ${css}><path d="M12.25.25a12.2543,12.2543,0,0,0-12,12.4937c0,6.4436,6.4879,12.1093,11.059,22.5641.5493,1.2563,1.3327,1.2563,1.882,0C17.7621,24.8529,24.25,19.1857,24.25,12.7437A12.2543,12.2543,0,0,0,12.25.25Z" fill="{color}" stroke="{secondaryColor}" stroke-width="1"/><text style="font-family:${font.fontFamily};font-size:${font.fontSize};fill:${font.color};" text-anchor="middle" x="50%" y="18">{text}</text></svg>`;

            //Use the default marker template.
            var m = {
                id: id,
                markerOptions: {
                    anchor: 'bottom',
                    htmlContent: content,
                    color: '#ea4335',
                    secondaryColor: 'white',
                    text: font.text
                },
                iconOptions: <atlas.IconOptions>{
                    image: 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(content.replace('{color}', '#ea4335').replace('{secondaryColor}', 'white').replace('{text}', '●')))),
                    rotation: 0,
                    anchor: 'bottom',
                    offset: [0, 0],
                    size: 1
                },
                textOptions: {
                    color: font.color
                }
            };

            _markerIcons[id] = m;

            return m;
        }

        public _getShape(): atlas.Shape {
            var self = this;
            if (self._shape) {
                return self._shape;
            }

            self._shape = new atlas.Shape(new atlas.data.Point(ConvertToA.latLng(self.get('position'))));
            self._shape._googleFeature = self;

            var map = this.get('map');
            if (map) {
                self._mouseEvents.forEach(name => {
                    map._map.events.remove(name, self._shape, google.maps.event._simpleMouseEvent(self, name));
                });

                map._map.events.remove('contextmenu', self._shape, google.maps.event._simpleMouseEvent(self, 'rightclick'));
            }

            return self._shape;
        }

        //Not supported

        public getShape(): null | undefined { //| MarkerShape
            return null;
        }
        public setShape(shape: any) { }//| MarkerShape
    }

    interface MarkerIconDetails {
        id: string;
        markerOptions: atlas.HtmlMarkerOptions;
        iconOptions?: atlas.IconOptions;
        textOptions?: atlas.TextOptions;
        bubbleOptions?: atlas.BubbleLayerOptions;
    }

    export class PolyShape extends MVCObject {
        public _shape: atlas.Shape;
        public _drawingManager: drawing.DrawingManager;

        constructor(geom: atlas.data.Geometry) {
            super();

            this.set('fillColor', '#1e90ff');
            this.set('fillOpacity', 0.5);
            this.set('geodesic', false);
            this.set('strokeColor', 'black');
            this.set('strokeOpacity', 1);
            this.set('strokeWeight', 3);
            this.set('visible', true);

            this._shape = new atlas.Shape(geom);

            this.changed = (property: string) => {
                switch (property) {
                    case 'map':
                        if (this._drawingManager) {
                            this._drawingManager._drawingManager.setOptions({ mode: atlas.drawing.DrawingMode.idle });
                        }

                        var ds = this._shape['dataSource'];
                        if (ds) {
                            ds.remove(this._shape);
                        }

                        var m: Map = this.get('map');
                        if (m instanceof google.maps.Map) {
                            m._datasource.add(this._shape);
                        }
                        break;
                    case 'visible':
                        var visible = this.get('visible');
                        if (typeof visible === 'boolean') {

                            if (visible) {
                                this._shape.setProperties(Object.assign(this._shape.getProperties(), {
                                    strokeOpacity: this.get('strokeOpacity'),
                                    fillOpacity: this.get('strokeOpacity')
                                }));
                            } else {
                                this._shape.setProperties(Object.assign(this._shape.getProperties(), {
                                    fillOpacity: 0,
                                    strokeOpacity: 0
                                }));
                            }
                        }
                        break;
                    case 'editable':
                        if (this._drawingManager) {
                            if (this.get('editable')) {
                                this._drawingManager._drawingManager.getSource().add(this._shape);
                                //@ts-ignore
                                this._drawingManager._drawingManager.setOptions({ mode: 'edit-geometry' })
                                this._drawingManager._drawingManager['editHelper'].edit(this._shape);
                            } else {
                                this._drawingManager._drawingManager.setOptions({ mode: atlas.drawing.DrawingMode.idle });
                            }
                        }
                        break
                }

                google.maps.event.trigger(self, 'changed', null);
            };
        }

        public getMap(): Map {
            return this.get('map');
        }

        public setMap(map: Map | null): void {
            this.set('map', map);
        }

        public getVisible(): boolean {
            return this.get('visible');
        }

        public setVisible(visible: boolean): void {
            this.set('visible', visible);
        }

        public getEditable(): boolean {
            return this.get('editable');
        }

        public setEditable(editable: boolean): void {
            this.set('editable', editable);
        }

        //Not supported

        public getDraggable(): boolean {
            return true;
        }

        public setDraggable(draggable: boolean): void { }
    }

    export class Polyline extends PolyShape {
        public _coords: atlas.data.Position[];

        constructor(opts?: PolylineOptions) {
            super(new atlas.data.LineString([[]]));

            this._shape._googleFeature = this;
            var a = new google.maps.MVCArray();
            google.maps.event.addListener(a, 'changed', this._pathChanged);
            this.set('path', a);

            this.setOptions(opts);
        }

        public getPath(): MVCArray<LatLng> {
            return this.get('path');
        }

        public setOptions(options: PolylineOptions): void {
            if (options) {

                if (options.map) {
                    this.setMap(options.map);
                }

                if (typeof options.geodesic === 'boolean') {
                    this.set('geodesic', options.geodesic);

                    if (this._coords) {
                        var c = this._coords;

                        if (options.geodesic) {
                            c = atlas.math.getGeodesicPath(c);
                        }

                        this._shape.setCoordinates(c);
                    }
                }

                if (options.path) {
                    this.setPath(options.path);
                }

                if (typeof options.visible === 'boolean') {
                    this.setVisible(options.visible);
                }

                var style: any = {};

                if (options.strokeColor || typeof options.strokeColor !== 'undefined') {
                    style.strokeColor = options.strokeColor;
                    this.set('strokeColor', options.strokeColor);
                }

                if (typeof options.strokeOpacity !== 'undefined') {
                    style.strokeOpacity = options.strokeOpacity;
                    this.set('strokeOpacity', options.strokeOpacity);
                }

                if (typeof options.strokeWeight !== 'undefined') {
                    style.strokeWidth = options.strokeWeight;
                    this.set('strokeWeight', options.strokeWeight);
                }

                if (Object.keys(style).length) {
                    this._shape.setProperties(Object.assign(this._shape.getProperties(), style));
                }

                //Not supported: clickable, draggable, editable, zIndex, icons
            }
        }

        public setPath(path: MVCArray<LatLng> | LatLng[] | LatLngLiteral[]): void {
            if (path) {
                if (path instanceof google.maps.MVCArray) {
                    google.maps.event.addListener(path, 'changed', this._pathChanged);
                    this.set('path', path);
                } else {
                    var p: google.maps.MVCArray<LatLng> = this.get('path');
                    p._replace(<LatLng[]>path);
                }
            }
        }

        public _pathChanged = () => {
            var path = this.get('path');

            this._coords = ConvertToA.latLngs(path);

            var c = this._coords;

            if (this.get('geodesic')) {
                c = atlas.math.getGeodesicPath(c);
            }

            this._shape.setCoordinates(c);
        };
    }

    export class Polygon extends PolyShape {
        public _coords: atlas.data.Position[][];

        constructor(opts?: PolygonOptions) {
            super(new atlas.data.Polygon([[]]));

            this._shape._googleFeature = this;

            var a = new google.maps.MVCArray<MVCArray<LatLng>>();
            google.maps.event.addListener(a, 'changed', this._pathChanged);
            this.set('paths', a);

            this.setOptions(opts);
        }

        public getPath(): MVCArray<LatLng> {
            return this.get('path');
        }

        public getPaths(): MVCArray<MVCArray<LatLng>> {
            return this.get('paths');
        }

        public setOptions(options: PolygonOptions): void {
            if (options) {

                if (options.map) {
                    this.setMap(options.map);
                }

                if (typeof options.geodesic === 'boolean') {
                    this.set('geodesic', options.geodesic);
                    this.setPaths(this.get('paths'));
                }

                if (options.paths) {
                    this.setPaths(options.paths);
                }

                if (typeof options.visible === 'boolean') {
                    this.setVisible(options.visible);
                }

                var style: any = {};

                if (options.fillColor || typeof options.fillColor !== 'undefined') {
                    style.fillColor = options.fillColor;
                    this.set('fillColor', options.fillColor);
                }

                if (typeof options.fillOpacity !== 'undefined') {
                    style.fillOpacity = options.fillOpacity;
                    this.set('fillOpacity', options.fillOpacity);
                }

                if (options.strokeColor || typeof options.strokeColor !== 'undefined') {
                    style.strokeColor = options.strokeColor;
                    this.set('strokeColor', options.strokeColor);
                }

                if (typeof options.strokeOpacity !== 'undefined') {
                    style.strokeOpacity = options.strokeOpacity;
                    this.set('strokeOpacity', options.strokeOpacity);
                }

                if (typeof options.strokeWeight !== 'undefined') {
                    style.strokeWidth = options.strokeWeight;
                    this.set('strokeWeight', options.strokeWeight);
                }

                if (Object.keys(style).length) {
                    this._shape.setProperties(Object.assign(this._shape.getProperties(), style));
                }

                //Not supported: clickable, draggable, editable, zIndex, icons
            }
        }

        public setPath(path: MVCArray<LatLng> | LatLng[] | LatLngLiteral[]): void {
            if (path) {
                this._coords = [ConvertToA.latLngs(path, true)];

                var c = this._coords;

                if (c.length > 0 && this.get('geodesic')) {
                    c = [atlas.math.getGeodesicPath(c[0])];
                }

                this._shape.setCoordinates(c);

                if (path instanceof google.maps.MVCArray) {
                    this.set('path', new google.maps.MVCArray([<MVCArray<LatLng>>path]));
                } else {
                    this.set('path', new google.maps.MVCArray([new google.maps.MVCArray(<LatLng[]>path)]));
                }

                this.set('paths', new google.maps.MVCArray(this.get('path')));
            }
        }

        public setPaths(paths: MVCArray<MVCArray<LatLng>> | MVCArray<LatLng> | LatLng[][] | LatLngLiteral[][] | LatLng[] | LatLngLiteral[]): void {
            if (paths) {
                var rings: (LatLng | LatLngLiteral)[][];

                if (paths instanceof google.maps.MVCArray) {
                    if (paths.getLength() > 0) {
                        if (paths.getAt(0) instanceof google.maps.MVCArray) {
                            //MVCArray<MVCArray<LatLng>>
                            rings = [];

                            (<MVCArray<LatLng>[]>paths.getArray()).forEach(r => {
                                rings.push(r.getArray());
                            });
                        } else {
                            //MVCArray<LatLng>
                            rings = [<LatLng[]>paths.getArray()];
                        }
                    }
                } else if (paths.length > 0 && Array.isArray(paths[0])) {
                    //LatLng[][] | LatLngLiteral[][]
                    rings = <LatLng[][]>paths;
                } else if (paths.length > 0) {
                    //LatLng[] | LatLngLiteral[]
                    rings = [<LatLng[]>paths];
                }

                if (rings) {
                    this._coords = [];
                    var geoCoords = [];
                    var p: MVCArray<MVCArray<LatLng>> = new google.maps.MVCArray();

                    for (var i = 0, len = rings.length; i < len; i++) {
                        var c = ConvertToA.latLngs(rings[i], true);

                        this._coords.push(c);

                        if (c.length > 0 && this.get('geodesic')) {
                            geoCoords.push(atlas.math.getGeodesicPath(c));
                        } else {
                            geoCoords.push(c);
                        }

                        p.push(new google.maps.MVCArray(<LatLng[]>rings[i]));
                    }

                    google.maps.event.addListener(p, 'changed', this._pathChanged);

                    this._shape.setCoordinates(geoCoords);
                    this.set('path', (p.getLength() > 0) ? p[0] : null);
                    this.set('paths', p);
                }
            }
        }

        private _pathChanged = () => {
            var path = this.get('paths');
            this.setPath(path);
        };
    }

    export class Rectangle extends PolyShape {
        public _bounds: LatLngBounds;

        constructor(opts?: RectangleOptions) {
            super(new atlas.data.Polygon([[]]));

            this._shape._googleFeature = this;
            this.setOptions(opts);
        }

        public getBounds(): LatLngBounds {
            return this.get('bounds');
        }

        public setOptions(options: RectangleOptions): void {
            if (options) {

                if (options.map) {
                    this.setMap(options.map);
                }

                if (options.bounds) {
                    this.setBounds(options.bounds);
                }

                if (typeof options.visible === 'boolean') {
                    this.setVisible(options.visible);
                }

                var style: any = {};

                if (options.fillColor || typeof options.fillColor !== 'undefined') {
                    style.fillColor = options.fillColor;
                    this.set('fillColor', options.fillColor);
                }

                if (typeof options.fillOpacity !== 'undefined') {
                    style.fillOpacity = options.fillOpacity;
                    this.set('fillOpacity', options.fillOpacity);
                }

                if (options.strokeColor || typeof options.strokeColor !== 'undefined') {
                    style.strokeColor = options.strokeColor;
                    this.set('strokeColor', options.strokeColor);
                }

                if (typeof options.strokeOpacity !== 'undefined') {
                    style.strokeOpacity = options.strokeOpacity;
                    this.set('strokeOpacity', options.strokeOpacity);
                }

                if (typeof options.strokeWeight !== 'undefined') {
                    style.strokeWidth = options.strokeWeight;
                    this.set('strokeWeight', options.strokeWeight);
                }

                if (Object.keys(style).length) {
                    this._shape.setProperties(Object.assign(this._shape.getProperties(), style));
                }

                //Not supported: clickable, draggable, editable, zIndex, icons
            }
        }

        public setBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void {
            if (bounds) {
                var bbox = ConvertToA.bbox(bounds);
                this._shape.setCoordinates(atlas.math.boundingBoxToPolygon(bbox).coordinates);
                this._bounds = ConvertToG.bbox(bbox);
                this.set('bounds', this._bounds);
            }
            google.maps.event.trigger(this, 'bounds_changed', null);
        }
    }

    export class Circle extends PolyShape {
        constructor(opts?: CircleOptions) {
            super(new atlas.data.Polygon([[]]));

            this._shape._googleFeature = this;
            this.setOptions(opts);
        }

        public getBounds(): LatLngBounds {
            return this.get('bounds');
        }

        public getCenter(): LatLng {
            return this.get('center');
        }

        public getRadius(): number {
            return this.get('radius');
        }

        public setOptions(options: CircleOptions): void {
            if (options) {

                if (options.map) {
                    this.setMap(options.map);
                }

                if (options.center) {
                    this.setCenter(options.center);
                }

                if (typeof options.radius === 'number') {
                    this.setRadius(options.radius);
                }

                if (typeof options.visible === 'boolean') {
                    this.setVisible(options.visible);
                }

                var style: any = {};

                if (options.fillColor || typeof options.fillColor !== 'undefined') {
                    style.fillColor = options.fillColor;
                    this.set('fillColor', options.fillColor);
                }

                if (typeof options.fillOpacity !== 'undefined') {
                    style.fillOpacity = options.fillOpacity;
                    this.set('fillOpacity', options.fillOpacity);
                }

                if (options.strokeColor || typeof options.strokeColor !== 'undefined') {
                    style.strokeColor = options.strokeColor;
                    this.set('strokeColor', options.strokeColor);
                }

                if (typeof options.strokeOpacity !== 'undefined') {
                    style.strokeOpacity = options.strokeOpacity;
                    this.set('strokeOpacity', options.strokeOpacity);
                }

                if (typeof options.strokeWeight !== 'undefined') {
                    style.strokeWidth = options.strokeWeight;
                    this.set('strokeWeight', options.strokeWeight);
                }

                if (Object.keys(style).length) {
                    this._shape.setProperties(Object.assign(this._shape.getProperties(), style));
                }

                //Not supported: clickable, draggable, editable, zIndex, icons
            }
        }

        public setCenter(center: LatLng | LatLngLiteral): void {
            if (center) {
                var c = ConvertToA.latLng(center);
                this.set('center', ConvertToG.position(c));
                var r = this.get('radius');
                if (typeof r === 'number' && r >= 0) {
                    this._shape.setCoordinates(atlas.math.getRegularPolygonPath(c, r, 72))
                }

                this._setBounds();
            }
            google.maps.event.trigger(this, 'center_changed', null);
        }

        public setRadius(radius: number): void {
            if (typeof radius === 'number' && radius >= 0) {
                this.set('radius', radius);
                var c = this.get('center');
                if (c) {
                    this._shape.setCoordinates(atlas.math.getRegularPolygonPath(ConvertToA.latLng(c), radius, 72))
                }

                this._setBounds();
            }
            google.maps.event.trigger(this, 'radius_changed', null);
        }

        private _setBounds(): void {
            var c = this.get('center');
            var r = this.get('radius');

            if (c && typeof r === 'number') {
                this.set('bounds', ConvertToG.bbox(atlas.data.BoundingBox.fromData(this._shape)));
                return;
            }

            this.set('bounds', null);
        }
    }

    export class InfoWindow extends MVCObject {
        private _popup = new atlas.Popup();

        constructor(opts?: InfoWindowOptions) {
            super();
            this.setOptions(opts);
        }

        public close(): void {
            this._popup.close();
        }

        public getContent(): string | HTMLElement {
            return this.get('content');
        }

        public getPosition(): LatLng {
            var p = this.get('position');
            var p2 = ConvertToG.position(this._popup.getOptions().position);
            if (!p2.equals(p)) {
                p = p2;
                this.set('position', p2);
            }
            return p;
        }

        public open(map?: Map, anchor?: MVCObject): void {// | StreetViewPanorama
            var m: Map = this.get('map');

            if (m !== map) {
                if (m) {
                    m._map.events.remove('close', this._popup, google.maps.event._simpleEventHandler(this, 'closeclick'));
                }

                if (map) {
                    map._map.events.add('close', this._popup, google.maps.event._simpleEventHandler(this, 'closeclick'));
                }
            }

            this.set('map', map);

            if (anchor) {
                if (anchor['azTarget'] && anchor['azTarget']['_gm']) {
                    anchor = anchor['azTarget']['_gm'];
                }

                if (anchor instanceof google.maps.Marker) {
                    var p = anchor.get('position');

                    if (p) {
                        this.setPosition(p);
                    }

                    if (anchor instanceof google.maps.Marker) {
                        this._popup.setOptions({ pixelOffset: [0, -35] });
                    } else {
                        this._popup.setOptions({ pixelOffset: [0, 0] });
                    }
                }
            }

            if (map) {
                this._popup.open(map._map);
            } else {
                this._popup.close();
            }
        }

        public setContent(content: string | HTMLElement): void {
            var c = document.createElement('div');
            c.style.padding = '10px';

            if (typeof content === 'string') {
                c.innerHTML = content;
            } else {
                c.appendChild(content);
            }

            this._popup.setOptions({
                content: c
            });

            this.set('content', content);
            google.maps.event.trigger(this, 'content_changed', null);
        }

        public setOptions(options: InfoWindowOptions): void {
            if (options) {
                if (options.content) {
                    this.setContent(options.content);
                }

                if (options.position) {
                    this.setPosition(options.position);
                }

                if (options.pixelOffset) {
                    this._popup.setOptions({
                        pixelOffset: [
                            options.pixelOffset.width,
                            options.pixelOffset.height
                        ]
                    });

                    this.set('pixelOffset', options.pixelOffset);
                }
            }
        }

        public setPosition(position: LatLng | LatLngLiteral): void {
            this._popup.setOptions({
                position: ConvertToA.latLng(position)
            });

            this.set('position', position);
            google.maps.event.trigger(this, 'position_changed', null);
        }

        //Not supported
        public getZIndex(): number { return 0; }
        public setZIndex(zIndex: number): void { }
    }

    export class ImageMapType extends MVCObject implements MapType {
        public _layer: atlas.layer.TileLayer;
        private _ev: EventListener;

        constructor(opts: ImageMapTypeOptions) {
            super();

            opts = opts || <ImageMapTypeOptions>{};

            var options: atlas.TileLayerOptions = {
                opacity: 1,
                minZoom: 0,
                maxZoom: 18,
                tileSize: 256
            };

            if (typeof opts.maxZoom === 'number') {
                this.set('maxZoom', opts.maxZoom);
                options.maxSourceZoom = Math.max(opts.maxZoom - 1, 0);
            } else {
                this.set('maxZoom', 18);
            }

            if (typeof opts.minZoom === 'number') {
                this.set('minZoom', opts.minZoom);
                options.minSourceZoom = Math.max(opts.minZoom - 1, 0);
            } else {
                this.set('minZoom', 0);
            }

            if (typeof opts.opacity === 'number') {
                this.set('opacity', opts.opacity);
                options.opacity = opts.opacity;
            } else {
                this.set('opacity', 1);
            }

            if (opts.tileSize) {
                this.set('tileSize', opts.tileSize);
            } else {
                this.set('tileSize', 256);
            }

            if (opts.alt) {
                this.set('alt', opts.alt);
            }

            if (opts.name) {
                this.set('name', opts.name);
            }

            if (opts.getTileUrl) {
                this.set('getTileUrl', opts.getTileUrl);
            }

            this.set('radius', 6378137);

            var id = `tile_layer:${_counter}`;
            _counter++;
            _tileLayers[id] = this;
            options.tileUrl = id + ',{x},{y},{z}';

            this._layer = new atlas.layer.TileLayer(options);

            this.changed = (property: string) => {
                switch (property) {
                    case 'opacity':
                        var opacity = this.get('opacity');
                        this._layer.setOptions({ opacity: (typeof opacity === 'number') ? opacity : 1 });
                        break;
                    case 'maxZoom':
                        var maxZoom = this.get('maxZoom');
                        this._layer.setOptions({ maxSourceZoom: (typeof maxZoom === 'number') ? maxZoom : 18 });
                        break;
                    case 'minZoom':
                        var minZoom = this.get('minZoom');
                        this._layer.setOptions({ minSourceZoom: (typeof minZoom === 'number') ? minZoom : 1 });
                        break;
                    case 'tileSize':
                        var tileSize = this.get('tileSize');
                        this._layer.setOptions({ tileSize: (tileSize) ? tileSize.width : 256 });
                        break;
                }
            };
        }

        public getOpacity(): number {
            return this.get('opacity');
        }

        public setOpacity(opacity: number): void {
            this.set('opacity', opacity);
        }

        private _before: string | atlas.layer.Layer;

        public _setMap(map: Map, before?: string | atlas.layer.Layer): void {
            this._before = before;

            var m: Map = this.get('map');
            if (m) {
                m._map.layers.remove(this._layer);
                google.maps.event.removeListener(this._ev);
                map._map.events.remove('ready', this._mapReady);
            }

            this.set('map', map);

            if (map) {
                map._map.events.add('ready', this._mapReady);
            }
        }

        private _mapReady = (): void => {
            var map: Map = this.get('map');
            map._map.layers.add(this._layer, this._before);
            this._ev = google.maps.event.addListener(map, 'tilesloaded', this._tilesLoaded);
            this.set('projection', map.getProjection());
        };

        private _tilesLoaded = (): void => {
            google.maps.event.trigger(this, 'tilesloaded', null);
        };

        //Not supported

        public releaseTile(tile: Element): void { }

        public getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element {
            return null;
        }
    }

    export class GroundOverlay extends MVCObject {
        private _layer: atlas.layer.ImageLayer;

        constructor(url: string, bounds: LatLngBounds | LatLngBoundsLiteral, opts?: GroundOverlayOptions) {
            super();

            this.set('url', url);

            var bbox = ConvertToG.bbox(ConvertToA.bbox(bounds));
            this.set('bounds', bbox);

            var ne = bbox.getNorthEast();
            var sw = bbox.getSouthWest();

            this._layer = new atlas.layer.ImageLayer({
                url: url,
                coordinates: [
                    [sw.lng(), ne.lat()], //Top Left Corner
                    [ne.lng(), ne.lat()], //Top Right Corner
                    [ne.lng(), sw.lat()], //Bottom Right Corner
                    [sw.lng(), sw.lat()]  //Bottom Left Corner
                ]
            });

            if (opts) {
                if (opts.map) {
                    this.setMap(opts.map);
                }

                if (opts.opacity) {
                    this.setOpacity(opts.opacity);
                }
            }
        }

        public getBounds(): LatLngBounds {
            return this.get('bounds');
        }

        public getMap(): Map {
            return this.get('map');
        }

        public getOpacity(): number {
            return this.get('opacity');
        }

        public getUrl(): string {
            return this.get('url');
        }

        public setMap(map: Map | null): void {
            if (this._layer) {
                var m = this.get('map');
                if (m && this._layer) {
                    m._map.layers.remove(this._layer);
                }

                if (map) {
                    var self = this;
                    map._map.events.add('ready', () => {
                        map._map.layers.add(self._layer, 'labels');
                    });
                }
            }

            this.set('map', map);
        }

        public setOpacity(opacity: number): void {
            this._layer.setOptions({
                opacity: opacity
            });
            this.set('opacity', opacity);
        }
    }

    export class KmlLayer extends MVCObject {
        private _datasource = new atlas.source.DataSource();
        private _layer = new atlas.layer.SimpleDataLayer(this._datasource);
        private _icons: Record<string, string>;
        private _groundOverlays: atlas.layer.ImageLayer[] = [];

        private _bbox: atlas.data.BoundingBox;
        private _options: KmlLayerOptions = {};

        constructor(opts?: KmlLayerOptions) {
            super();

            this.set('status', google.maps.KmlLayerStatus.OK);

            this._options = Object.assign(this._options, opts, { map: null });
            if (opts.map) {
                this.setMap(opts.map);
            }
        }

        public getDefaultViewport(): LatLngBounds {
            return ConvertToG.bbox(this._bbox);
        }

        public getMap(): Map {
            return this.get('map');
        }

        public getMetadata(): KmlLayerMetadata {
            return this.get('metadata');
        }

        public getStatus(): KmlLayerStatus {
            return this.get('status');
        }

        public getUrl(): string {
            return this.get('url');
        }

        public setMap(map: Map | null): void {
            var m = this.get('map');
            if (m) {
                //Remove layers 
                m._map.sources.remove(this._datasource);
                m._map.layers.remove(this._layer);
                this._removeImages();

                if (this._groundOverlays) {
                    this._groundOverlays.forEach(gl => {
                        m._map.layers.remove(gl);
                    });
                }

                map._map.events.remove('ready', this._mapReady);
            }

            this.set('map', map);

            if (map) {
                map._map.events.add('ready', this._mapReady);
            }
        }

        private _mapReady = (): void => {
            var map = this.get('map');

            if (this._icons) {
                this._loadImages().then(() => {
                    map._map.sources.add(this._datasource);
                    map._map.layers.add(this._layer);

                    if (this._groundOverlays) {
                        this._groundOverlays.forEach(gl => {
                            map._map.layers.add(gl);
                        });
                    }

                    if (this._options) {
                        this.setOptions(this._options);
                        this._options = null;
                    }
                });
            } else {
                map._map.sources.add(this._datasource);
                map._map.layers.add(this._layer);

                if (this._groundOverlays) {
                    this._groundOverlays.forEach(gl => {
                        map._map.layers.add(gl);
                    });
                }

                if (this._options) {
                    this.setOptions(this._options);
                    this._options = null;
                }
            }
        };

        public setUrl(url: string): void {
            this._clear();

            if (url) {
                this.set('url', url);
                this._loadKml();
            }
        }

        public setOptions(options: KmlLayerOptions): void {
            if (options) {
                if (options.map) {
                    this.setMap(options.map);
                }

                if (typeof options.suppressInfoWindows === 'boolean') {
                    this.set('suppressInfoWindows', options.suppressInfoWindows);
                    this._layer.setOptions({
                        enablePopups: options.suppressInfoWindows
                    });
                }

                if (options.preserveViewport) {
                    this.set('preserveViewport', options.preserveViewport);
                }

                if (options.url) {
                    this.setUrl(options.url);
                }
            }
        }

        private _clear(): void {
            this._datasource.clear();
            var m = this.get('map');
            if (m) {
                this._groundOverlays.forEach(gl => {
                    m._map.layers.remove(gl);
                });
            }
            this._groundOverlays = [];
            this.set('defaultViewport', null);

            this._removeImages();
            this.set('icons', null);
            this.set('metadata', null);
        }

        private _removeImages(): void {
            if (this._icons) {
                var keys = Object.keys(this._icons);
                if (keys.length !== 0) {
                    var m = this.get('map');
                    keys.forEach(function (key) {
                        m._map.imageSprite.remove(key);
                    });
                }
            }
        }

        private async _loadImages(): Promise<any> {
            var keys = Object.keys(this._icons);

            if (keys.length !== 0) {
                var imagePromises = [];
                var m = this.get('map');
                var self = this;

                keys.forEach(function (key) {
                    imagePromises.push(m._map.imageSprite.add(key, self._icons[key]));
                });

                return Promise.all(imagePromises);
            }

            return null;
        }

        private _loadKml(): void {
            var m = this.get('map');
            var url = this.get('url');
            if (m && url) {
                var self = this;
                atlas.io.read(url).then(r => {
                    if (r) {
                        if (r.icons) {
                            self._icons = r.icons;
                            self._loadImages().then(() => {
                                if (r.features && r.features.length > 0) {
                                    self._datasource.add(r.features);
                                }
                            });
                        } else {
                            if (r.features && r.features.length > 0) {
                                self._datasource.add(r.features);
                            }
                        }

                        if (r.groundOverlays && r.groundOverlays.length > 0) {
                            self._groundOverlays = self._groundOverlays.concat(<atlas.layer.ImageLayer[]>r.groundOverlays);
                            m._map.layers.add(r.groundOverlays);
                        }

                        self._bbox = r.bbox;

                        var preserveViewport = this.get('preserveViewport');
                        if (!preserveViewport && r.bbox) {
                            m._map.setCamera({ bounds: r.bbox, padding: 50 });
                        }

                        if (r.properties) {
                            self.set('metadata', r.properties);
                        }

                        self.set('status', google.maps.KmlLayerStatus.OK);
                    }
                }, (e) => {
                    self.set('status', google.maps.KmlLayerStatus.FETCH_ERROR);
                });
            }
        }

        //Not supported
        public getZIndex(): number { return 0; }
        public setZIndex(zIndex: number): void { }
    }

    export class TrafficLayer extends MVCObject {

        constructor(opts?: TrafficLayerOptions) {
            super();

            this.setOptions(opts);
        }

        public getMap(): Map {
            return this.get('map');
        }

        public setMap(map: Map | null): void {
            var m = this.get('map');
            if (m) {
                m._map.setTraffic({
                    flow: 'none',
                    incidents: false
                });
                map._map.events.remove('ready', this._mapReady);
            }

            this.set('map', map);

            if (map) {
                map._map.events.add('ready', this._mapReady);
            }
        }

        public setOptions(options: TrafficLayerOptions): void {
            if (options && options.map) {
                this.setMap(options.map);
            }
        }

        private _mapReady = () => {
            var map = this.get('map');

            if (map) {
                map._map.setTraffic({
                    flow: 'relative',
                    incidents: true
                });
            }
        };
    }

    interface MarkerLabel {
        color?: string;
        fontFamily?: string;
        fontSize?: string;
        fontWeight?: string;
        text?: string;
    }

    export class OverlayView extends MVCObject {
        private _mapPane = new MapPaneControl();
        public projection: MapCanvasProjection;

        constructor() {
            super();
        }

        public draw(): void { }

        public getMap(): Map { //| StreetViewPanorama
            return this.get('map');
        }

        public getPanes(): MapPanes {
            return this.get('panes');
        }

        public getProjection(): MapCanvasProjection {
            return this.projection;
        }

        public onAdd(): void { }

        public onRemove(): void { }

        public setMap(map: Map | null): void { // | StreetViewPanorama
            var self = this;
            var m = self.get('map');

            if (m) {
                self.onRemove();
                m._map.controls.remove(self._mapPane);
                map._map.events.remove('move', () => {
                    self.draw();
                });
                self.projection = null;
            }

            this.set('map', map);

            if (map) {
                this.projection = new google.maps.MapCanvasProjection(map);

                map._map.setUserInteraction({
                    dragRotateInteraction: false
                });

                self.set('panes', <MapPanes>{
                    floatPane: self._mapPane._container,
                    mapPane: self._mapPane._container,
                    markerLayer: self._mapPane._container,
                    overlayLayer: self._mapPane._container,
                    overlayMouseTarget: self._mapPane._container,
                    overlayImage: self._mapPane._container
                });

                map._map.controls.add(self._mapPane);
                map._map.events.add('move', () => {
                    self.draw();
                });
                
                self.onAdd();
                self.draw();

                google.maps.event.trigger(self, 'map_changed', null);
            }
        }

        public static preventMapHitsAndGesturesFrom(element: Element): void {
            google.maps.OverlayView.preventMapHitsFrom(element);
        }

        public static preventMapHitsFrom(element: Element): void {
            //element.style.pointerEvents = '';
        }
    }

    class MapPaneControl implements atlas.Control {
        public _container: HTMLDivElement;
        private _map: atlas.Map;

        constructor() {
            this._container = document.createElement('div');
        }

        public onAdd(map: atlas.Map, options?: atlas.ControlOptions): HTMLElement {
            this._map = map;
            return this._container;
        }

        public onRemove(): void {
            this._map = null;
        }
    }

    interface MapPanes {
        readonly floatPane: Element;
        readonly mapPane: Element;
        readonly markerLayer: Element;
        readonly overlayLayer: Element;
        readonly overlayMouseTarget: Element;
    }

    export class MapCanvasProjection {
        private _map: Map;

        constructor(map: Map) {
            this._map = map;
        }

        //Contariner Pixel = global pixel
        //Div pixel = relative to viewport

        public fromContainerPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng {
            return ConvertToG.position(atlas.math.mercatorPixelsToPositions([ConvertToA.point(pixel)], this._map._map.getCamera().zoom)[0]);
        }

        public fromDivPixelToLatLng(pixel: Point, nowrap?: boolean): LatLng {
            return ConvertToG.position(this._map._map.pixelsToPositions([ConvertToA.point(pixel)])[0]);
        }

        public fromLatLngToContainerPixel(latLng: LatLng): Point {
            return ConvertToG.pixel(atlas.math.mercatorPositionsToPixels([ConvertToA.latLng(latLng)], this._map._map.getCamera().zoom)[0]);
        }

        public fromLatLngToDivPixel(latLng: LatLng): Point {
            return ConvertToG.pixel(this._map._map.positionsToPixels([ConvertToA.latLng(latLng)])[0]);
        }

        public getWorldWidth(): number {
            return Math.pow(2, this._map._map.getCamera().zoom) * 512;
        }
    }
    
    ////////////////////////////////////////////
    // Public Data namespace
    ////////////////////////////////////////////

    export class Data extends MVCObject {
        protected _ds = new atlas.source.DataSource();

        private _defaultStyles = {
            bubbleStyles: <atlas.BubbleLayerOptions>{
                filter: ["all",
                    ["any", ["has", "radius"], ["has", "size"], ["has", "marker-size"], ["has", "scale"], ["has", "point_count"]],
                    ["any",
                        ["==", ["geometry-type"], "Point"],
                        ["==", ["geometry-type"], "MultiPoint"]
                    ]
                ],
                color: ["case",
                    // Look for a color property.
                    ["has", "color"],
                    ["get", "color"],
                    // Github style.
                    ["has", "marker-color"], ["get", "marker-color"],
                    // Cluster support
                    ["has", "point_count"],
                    ["step",
                        ["get", "point_count"],
                        "#009dff",            // Default to blue.
                        10, "rgb(241,211,87)",         // If the point_count >= 10, color is yellow.
                        100, "rgb(253,156,115)"        // If the point_count >= 100, color is orange.
                    ],
                    // Fallback to the default option.
                    "#1A73AA"
                ],
                radius: ["case",
                    ["has", "radius"],
                    ["get", "radius"],
                    // Look for a size property.
                    ["has", "size"],
                    ["*", ["get", "size"], 8],

                    // Github style.
                    ["has", "marker-size"],
                    ["match",
                        ["get", "marker-size"],
                        "small", 6,
                        "medium", 8,
                        "large", 12,
                        1
                    ],
                    // Try looking for a scale property.
                    ["has", "scale"], ["*", ["get", "scale"], 8],
                    // Cluster support
                    ["has", "point_count"], 16,
                    8
                ],
                opacity: [
                    'case',
                    ['has', 'opacity'],
                    ['get', 'opacity'],
                    1
                ],
                strokeOpacity: [
                    'case',
                    ['has', 'strokeOpacity'],
                    ['get', 'strokeOpacity'],
                    1
                ],
                strokeWidth: [
                    'case',
                    ['has', 'strokeWidth'],
                    ['get', 'strokeWidth'],
                    2
                ]
            },
            symbolStyles: <atlas.SymbolLayerOptions>{
                filter: ["all",
                    ["!", ['any', ["has", "radius"], ["has", "radius"], ["has", "size"], ["has", "marker-size"], ["has", "scale"]]],
                    ["any",
                        ["==", ["geometry-type"], "Point"],
                        ["==", ["geometry-type"], "MultiPoint"]
                    ]
                ],
                iconOptions: {
                    allowOverlap: true,
                    anchor: ["case",
                        // Look for an anchor property and make sure it is a valid value.
                        ["has", "anchor"],
                        ["match",
                            ["get", "anchor"], // Verify value is valid.
                            ["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
                            ["get", "anchor"], // return value.
                            "bottom" // return default
                        ],
                        "bottom" // return default
                    ],
                    ignorePlacement: true,
                    image: ["case",
                        // Look for a image property.
                        ["has", "image"],
                        ["get", "image"],

                        ["has", "point_count"],
                        'none',

                        //Default marker id.
                        '{}'
                    ],
                    offset: ["case",
                        // Look for a offset property.
                        ["has", "offset"],
                        ["get", "offset"],
                        // Fallback to the default option.
                        ["literal", [0, 0]]
                    ],
                    rotation: ["case",
                        // Look for a rotation property.
                        ["has", "rotation"], ["get", "rotation"],
                        // Fallback to the default option.
                        0
                    ],
                    size: ["case",
                        // Look for a size property.
                        ["has", "size"],
                        ["get", "size"],
                        // Github style.
                        ["has", "marker-size"],
                        ["match",
                            ["get", "marker-size"],
                            "small", 0.5,
                            "medium", 1,
                            "large", 2,
                            1
                        ],
                        // Fallback to the default option.
                        1
                    ]
                },
                textOptions: {
                    offset: ["case",
                        ["has", "image"], ["literal", [0, 1.2]],
                        ["has", "point_count_abbreviated"], ["literal", [0, 0.4]],
                        ["literal", [0, 2]]
                    ],
                    textField: ["format",
                        ["case",
                            // Support clusters
                            ["has", "point_count_abbreviated"],
                            ["get", "point_count_abbreviated"],

                            ["has", "textField"],
                            ["get", "textField"],

                            // Fallback
                            ""
                        ], {}
                    ],
                    color: ['case',
                        ['has', 'fontColor'],
                        ['get', 'fontColor'],
                        '#000000'
                    ],
                    size: ['case',
                        ['has', 'fontSize'],
                        ['get', 'fontSize'],
                        12
                    ]
                }
            },
            lineStyles: <atlas.LineLayerOptions>{
                filter: ["any",
                    ["==", ["geometry-type"], "LineString"],
                    ["==", ["geometry-type"], "MultiLineString"],
                    ["==", ["geometry-type"], "Polygon"],
                    ["==", ["geometry-type"], "MultiPolygon"]
                ],
                lineCap: "round",
                lineJoin: "round",
                strokeColor: ["case",
                    // Look for a strokeColor property.
                    ["has", "strokeColor"], ["get", "strokeColor"],
                    // Github style.
                    ["has", "stroke"], ["get", "stroke"],
                    // Fallback to the default option.
                    "black"
                ],
                strokeOpacity: ["case",
                    // Look for a strokeOpacity property.
                    ["has", "strokeOpacity"], ["get", "strokeOpacity"],
                    // Github style.
                    ["has", "stroke-opacity"], ["get", "stroke-opacity"],
                    // Fallback to the default option.
                    1
                ],
                strokeWidth: ["case",
                    // Look for a strokeWidth property.
                    ["has", "strokeWidth"], ["get", "strokeWidth"],
                    // Github style.
                    ["has", "stroke-width"], ["get", "stroke-width"],
                    // Look for a stroke-thickness property. Other commonly used property name from CSS.
                    ["has", "stroke-thickness"], ["get", "stroke-thickness"],
                    // Fallback to the default option.
                    3
                ]
            },
            polygonStyles: <atlas.PolygonLayerOptions>{
                fillColor: ["case",
                    // Look for a fillColor property.
                    ["has", "fillColor"], ["get", "fillColor"],
                    // Github style.
                    ["has", "fill"], ["get", "fill"],
                    // Fallback to the default option.
                    "black"
                ],
                fillOpacity: ["case",
                    // Look for a fillOpacity property.
                    ["has", "fillOpacity"], ["get", "fillOpacity"],
                    // Github style.
                    ["has", "fill-opacity"], ["get", "fill-opacity"],
                    // Fallback to the default option.
                    0.25
                ],
                filter: ["any",
                    ["==", ["geometry-type"], "Polygon"],
                    ["==", ["geometry-type"], "MultiPolygon"]
                ]
            }
        };

        private _polygonLayer = new atlas.layer.PolygonLayer(this._ds, null, this._defaultStyles.polygonStyles);

        private _lineLayer = new atlas.layer.LineLayer(this._ds, null, this._defaultStyles.lineStyles);

        protected _bubbleLayer = new atlas.layer.BubbleLayer(this._ds, null, this._defaultStyles.bubbleStyles);

        private _symbolLayer = new atlas.layer.SymbolLayer(this._ds, null, this._defaultStyles.symbolStyles);

        private _style: Data.StyleOptions = {};
        private _styleFunction: Function = null;
        private _icons: any = {};

        constructor(options?: Data.DataOptions) {
            super();

            this.set('clickable', true);

            if (options) {
                if (options.map) {
                    this.setMap(options.map);
                }

                if (options.style) {
                    this.setStyle(options.style);
                }
            }
        }

        public addListener(eventName: string, handler: Function): EventListener {
            return google.maps.event.addListener(this, eventName, handler);
        }

        public addListenerOnce(eventName: string, handler: Function): EventListener {
            return google.maps.event.addListenerOnce(this, eventName, handler);
        }

        public add(feature: Data.Feature | Data.FeatureOptions): Data.Feature {
            var f: Data.Feature = (feature instanceof google.maps.Data.Feature) ? feature : new google.maps.Data.Feature(feature);
            var s = f._getShape();
            this._ds.add(s);
            this._watchShape(s);
            google.maps.event.trigger(self, 'addfeature', { feature: f });
            return f;
        }

        public addGeoJson(geoJson: object, options?: Data.GeoJsonOptions): Data.Feature[] {
            var gfeatures = [];
            var self = this;

            if (geoJson && geoJson['type']) {
                var features = ((geoJson['type'] === 'FeatureCollection') ? <atlas.data.Feature<atlas.data.Geometry, any>[]>geoJson['features'] : [<atlas.data.Feature<atlas.data.Geometry, any> | atlas.data.GeometryCollection>geoJson]);

                if (features.length > 0) {
                    var shapes: atlas.Shape[] = [];
                    var s: atlas.Shape;
                    var gf: Data.Feature;
                    var id: any;

                    for (var i = 0, len = features.length; i < len; i++) {
                        id = null;

                        if (features[i].type === 'GeometryCollection') {
                            let gc = <atlas.data.GeometryCollection>features[i];
                            gc.geometries.forEach(g => {
                                gf = <Data.Feature>ConvertToG.feature(new atlas.data.Feature(g));
                                s = gf._getShape();
                                shapes.push(s);
                                gfeatures.push(gf);
                            });
                        } else {
                            let f = <atlas.data.Feature<atlas.data.Geometry, any>>features[i];

                            if (options && options.idPropertyName && typeof f.properties[options.idPropertyName] !== 'undefined') {
                                id = f.properties[options.idPropertyName];
                            }

                            gf = <Data.Feature>ConvertToG.feature(f, id);
                            s = gf._getShape();
                            shapes.push(s);
                            gfeatures.push(gf);
                        }
                    }

                    self._ds.add(shapes);

                    shapes.forEach(s => {
                        self._watchShape(s);
                    });
                }
            }

            if (gfeatures.length > 0) {
                gfeatures.forEach(gf => {
                    google.maps.event.trigger(self, 'addfeature', { feature: gf });
                });
            }

            return gfeatures;
        }

        public contains(feature: Data.Feature): boolean {
            var s = feature._getShape();
            if (s) {
                return this._ds.getShapeById(s.getId()) !== null;
            }
            return false;
        }

        public forEach(callback: (feature: Data.Feature) => void): void {
            var s = this._ds.getShapes();
            s.forEach(x => {
                callback(x._googleFeature);
            });
        }

        public getFeatureById(id: number | string): Data.Feature {
            var s = this._ds.getShapeById(id);
            if (s) {
                return s._googleFeature;
            }

            return null;
        }

        public getMap(): Map {
            return this.get('map');
        }

        public getStyle(): Data.StyleOptions {
            return Object.assign({}, this._style);
        }

        public loadGeoJson(url: string, options?: Data.GeoJsonOptions, callback?: (features: Data.Feature[]) => void): void {
            var self = this;
            fetch(url).then(r => r.json()).then(r => {
                var f = self.addGeoJson(r, options);

                if (callback) {
                    callback(f);
                }
            });
        }

        private _overriddenStyles: { [key: string]: Data.StyleOptions } = {};

        public overrideStyle(feature: Data.Feature, style: Data.StyleOptions): void {
            if (feature && style) {
                var props = feature._getShape().getProperties();

                var id = props._azureMapsShapeId;

                var oldStyle: any = {};

                Object.keys(props).forEach(key => {
                    switch (key) {
                        case 'anchor':
                        case 'clickable':
                        case 'cursor':
                        case 'strokeColor':
                        case 'strokeOpacity':
                        case 'strokeWidth':
                        case 'fillColor':
                        case 'fillOpacity':
                        case 'title':
                        case 'radius':
                        case 'rotation':
                        case 'image':
                        case 'offset':
                        case 'fontColor':
                        case 'fontSize':
                        case 'title':
                        case 'visible':
                            oldStyle[key] = props[key] || null;
                            break;
                    }
                });

                this._overriddenStyles[id] = oldStyle;

                this._applyStyle(feature, style);
            }
        }

        public remove(feature: Data.Feature): void {
            this._ds.remove(feature._getShape());
            google.maps.event.trigger(self, 'removefeature', { feature: feature });
        }

        public revertStyle(feature?: Data.Feature): void {
            if (feature) {
                var id = feature._getShape().getProperties()._azureMapsShapeId;
                var os = this._overriddenStyles[id];

                if (os) {
                    feature._setProperties(os);
                }
            } else {
                this.forEach(f => {
                    this.revertStyle(f);
                });
            }
        }

        private _mouseEvents = ['click', 'dblclick', 'mousedown', 'mouseup'];

        public setMap(map: Map | null): void {
            var self = this;
            var m = self.get('map');
            var layers = [this._polygonLayer, this._lineLayer, this._bubbleLayer, this._symbolLayer];

            if (m) {
                m._map.sources.remove(self._ds);
                m._map.layers.remove(layers);

                self._mouseEvents.forEach(name => {
                    m._map.events.remove(name, layers, google.maps.event._simpleMouseEvent(self, name));
                });
                m._map.events.remove('mousemove', self._mouseMove);
                m._map.events.remove('contextmenu', layers, google.maps.event._simpleMouseEvent(self, 'rightclick'));
            }

            if (map) {
                map._map.events.add('ready', () => {
                    var iconsLoaded = () => {
                        if (!map._map.sources.getById(self._ds.getId())) {
                            map._map.sources.add(self._ds);
                        }
                        map._map.layers.add([self._polygonLayer, self._lineLayer], 'labels');
                        map._map.layers.add([self._bubbleLayer, self._symbolLayer]);

                        self._mouseEvents.forEach(name => {
                            map._map.events.add(name, layers, google.maps.event._simpleMouseEvent(self, name));
                        });
                        map._map.events.add('mousemove', self._mouseMove);
                        map._map.events.add('contextmenu', layers, google.maps.event._simpleMouseEvent(self, 'rightclick'));
                    };

                    var iconIds = Object.keys(self._icons);

                    var promises = [];

                    iconIds.forEach(key => {
                        if (!map._map.imageSprite.hasImage(key)) {
                            promises.push(map._map.imageSprite.add(key, self._icons[key]));
                        }
                    });

                    if (promises.length > 0) {
                        Promise.all(promises).then(() => {
                            iconsLoaded();
                        }, () => { });
                    } else {
                        iconsLoaded();
                    }
                });
            }

            self.set('map', map);
        }

        public setStyle(style: Data.StyleOptions | Function): void {
            if (style) {
                if (typeof style === 'function') {
                    //Revert all to defaults
                    this._polygonLayer.setOptions(this._defaultStyles.polygonStyles);
                    this._lineLayer.setOptions(this._defaultStyles.lineStyles);
                    this._bubbleLayer.setOptions(this._defaultStyles.bubbleStyles);
                    this._symbolLayer.setOptions(this._defaultStyles.symbolStyles);

                    this._styleFunction = style;

                    var shapes = this._ds.getShapes();
                    shapes.forEach(s => {
                        this._applyStyleFunction(s._googleFeature);
                    });
                } else {
                    var style2 = <Data.StyleOptions>style;

                    if (style2.icon === null) {
                        this._style.icon = style2.icon;

                        //Revert point layers to defaults
                        this._bubbleLayer.setOptions(this._defaultStyles.bubbleStyles);
                        this._symbolLayer.setOptions(this._defaultStyles.symbolStyles);
                    } else if (style2.icon) {
                        this._style.icon = style2.icon;

                        var markerIcon = google.maps.Marker._getMarkerIcon({
                            icon: style.icon
                        });

                        if (markerIcon.bubbleOptions) {
                            var bo = markerIcon.bubbleOptions;

                            this._bubbleLayer.setOptions({
                                color: ["case",
                                    // Look for a color property.
                                    ["has", "color"],
                                    ["get", "color"],
                                    // Github style.
                                    ["has", "marker-color"], ["get", "marker-color"],
                                    // Cluster support
                                    ["has", "point_count"],
                                    ["step",
                                        ["get", "point_count"],
                                        "rgb(181,226,140)",            // Default to green.
                                        10, "rgb(241,211,87)",         // If the point_count >= 10, color is yellow.
                                        100, "rgb(253,156,115)"        // If the point_count >= 100, color is orange.
                                    ],
                                    // Fallback to the default option.
                                    bo.color || "#1A73AA"
                                ],
                                radius: ["case",
                                    ["has", "radius"],
                                    ["get", "radius"],

                                    // Look for a size property.
                                    ["has", "size"],
                                    ["*", ["get", "size"], 8],

                                    // Github style.
                                    ["has", "marker-size"],
                                    ["match",
                                        ["get", "marker-size"],
                                        "small", 6,
                                        "medium", 8,
                                        "large", 12,
                                        1
                                    ],
                                    // Try looking for a scale property.
                                    ["has", "scale"], ["*", ["get", "scale"], 8],
                                    // Cluster support
                                    ["has", "point_count"], 16,
                                    bo.radius || 8
                                ],
                                opacity: [
                                    'case',
                                    ['has', 'opacity'],
                                    ['get', 'opacity'],
                                    bo.opacity || 1
                                ],
                                strokeOpacity: [
                                    'case',
                                    ['has', 'strokeOpacity'],
                                    ['get', 'strokeOpacity'],
                                    bo.strokeOpacity || 1
                                ],
                                strokeWidth: [
                                    'case',
                                    ['has', 'strokeWidth'],
                                    ['get', 'strokeWidth'],
                                    bo.strokeWidth || 2
                                ]
                            });
                        } else {
                            if (markerIcon.iconOptions.image) {
                                var props: any = {};

                                if (markerIcon.iconOptions) {
                                    props.rotation = markerIcon.iconOptions.rotation;

                                    if (markerIcon.iconOptions.image) {
                                        props.image = markerIcon.id;
                                        props.offset = markerIcon.iconOptions.offset;
                                        props.anchor = markerIcon.iconOptions.anchor;
                                        props.size = markerIcon.iconOptions.size;

                                        if (!this._icons[markerIcon.id]) {
                                            this._icons[markerIcon.id] = markerIcon.iconOptions.image;
                                        }
                                    }
                                }

                                if (markerIcon.textOptions) {
                                    props.fontColor = markerIcon.textOptions.color;
                                    props.fontSize = markerIcon.textOptions.size;
                                }

                                this._symbolLayer.setOptions({
                                    iconOptions: {
                                        rotation: ["case",
                                            // Look for a rotation property.
                                            ["has", "rotation"], ["get", "rotation"],
                                            // Fallback to the default option.
                                            props.rotation || 0
                                        ],
                                        offset: [
                                            'case',

                                            //Look for a offset property.
                                            ['has', 'offset'],
                                            ['get', 'offset'],

                                            //Fallback to the default option. 
                                            ['literal', props.offset]
                                        ],
                                        anchor: ["case",
                                            // Look for an anchor property and make sure it is a valid value.
                                            ["has", "anchor"],
                                            ["match",
                                                ["get", "anchor"], // Verify value is valid.
                                                ["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
                                                ["get", "anchor"], // return value.
                                                "bottom" // return default
                                            ],
                                            props.anchor || 'bottom'
                                        ],
                                        size: ["case",
                                            // Look for a size property.
                                            ["has", "size"],
                                            ["get", "size"],
                                            // Github style.
                                            ["has", "marker-size"],
                                            ["match",
                                                ["get", "marker-size"],
                                                "small", 0.5,
                                                "medium", 1,
                                                "large", 2,
                                                1
                                            ],
                                            // Fallback to the default option.
                                            props.size || 1
                                        ]
                                    },
                                    textOptions: {
                                        color: ['case',
                                            ['has', 'fontColor'],
                                            ['get', 'fontColor'],
                                            props.fontColor || '#000000'
                                        ],
                                        size: ['case',
                                            ['has', 'fontSize'],
                                            ['get', 'fontSize'],
                                            props.fontSize || 12
                                        ]
                                    }
                                });

                                if (props.image) {
                                    var m = this.get('map');

                                    var imageExp: atlas.SymbolLayerOptions = {
                                        iconOptions: {
                                            image: [
                                                "case",
                                                // Look for a image property.
                                                ["has", "image"],
                                                ["get", "image"],

                                                ["has", "point_count"],
                                                'none',

                                                //Default marker id.
                                                props.image
                                            ]
                                        }
                                    };

                                    if (m && !m._map.imageSprite.hasImage(markerIcon.id)) {
                                        m._map.imageSprite.add(markerIcon.id, this._icons[markerIcon.id]).then(() => {
                                            this._symbolLayer.setOptions(imageExp);
                                        });
                                    } else {
                                        this._symbolLayer.setOptions(imageExp);
                                    }
                                } else {
                                    this._symbolLayer.setOptions(imageExp);
                                }
                            }
                        }
                    }

                    if (style2.strokeColor) {
                        this._updateExpressionDefault(this._lineLayer, 'strokeColor', style2.strokeColor);
                        this._style.strokeColor = style2.strokeColor;
                    } else if (style2.strokeColor === null) {
                        this._updateExpressionDefault(this._lineLayer, 'strokeColor', this._defaultStyles.lineStyles.strokeColor);
                        this._style.strokeColor = null;
                    }

                    if (typeof style2.strokeOpacity === 'number') {
                        this._updateExpressionDefault(this._lineLayer, 'strokeOpacity', style2.strokeOpacity);
                        this._style.strokeOpacity = style2.strokeOpacity;
                    } else if (style2.strokeOpacity === null) {
                        this._updateExpressionDefault(this._lineLayer, 'strokeOpacity', this._defaultStyles.lineStyles.strokeOpacity);
                        this._style.strokeOpacity = null;
                    }

                    if (typeof style2.strokeWeight === 'number') {
                        this._updateExpressionDefault(this._lineLayer, 'strokeWidth', style2.strokeWeight);
                        this._style.strokeWeight = style2.strokeWeight;
                    } else if (style2.strokeWeight === null) {
                        this._updateExpressionDefault(this._lineLayer, 'strokeWeight', this._defaultStyles.lineStyles.strokeWidth);
                        this._style.strokeWeight = null;
                    }

                    if (style2.fillColor) {
                        this._updateExpressionDefault(this._polygonLayer, 'fillColor', style2.fillColor);
                        this._style.fillColor = style2.fillColor;
                    } else if (style2.fillColor === null) {
                        this._updateExpressionDefault(this._polygonLayer, 'fillColor', this._defaultStyles.polygonStyles.fillColor);
                        this._style.fillColor = null;
                    }

                    if (typeof style2.fillOpacity === 'number') {
                        this._updateExpressionDefault(this._polygonLayer, 'fillOpacity', style2.fillOpacity);
                        this._style.fillOpacity = style2.fillOpacity;
                    } else if (style2.fillOpacity === null) {
                        this._updateExpressionDefault(this._polygonLayer, 'fillOpacity', this._defaultStyles.polygonStyles.fillOpacity);
                        this._style.fillOpacity = null;
                    }

                    if (typeof style2.visible === 'boolean') {
                        this._polygonLayer.setOptions({ visible: style2.visible });
                        this._lineLayer.setOptions({ visible: style2.visible });
                        this._symbolLayer.setOptions({ visible: style2.visible });
                        this._bubbleLayer.setOptions({ visible: style2.visible });
                        this._style.visible = style2.visible;
                    }

                    if (typeof style2.clickable === 'boolean' || style2.clickable === null) {
                        this.set('clickable', style2.clickable);
                    }
                }

                //Not supported: draggable, editable, zIndex, shape, cursor
            }
        }

        public toGeoJson(callback: (feature: object) => void): void {
            callback(this._ds.toJson());
        }

        private _updateExpressionDefault(layer: atlas.layer.BubbleLayer | atlas.layer.SymbolLayer | atlas.layer.LineLayer | atlas.layer.PolygonLayer, propName: string, val: any): void {
            var exp = <atlas.Expression>layer.getOptions()[propName];
            if (Array.isArray(exp)) {
                exp.pop();
                exp.push(val);
            } else {
                exp = val;
            }
            var o = {};
            o[propName] = exp;
            (<atlas.layer.BubbleLayer>layer).setOptions(<atlas.BubbleLayerOptions>o);
        }

        private _applyStyleFunction = (feature: Data.Feature): void => {
            if (this._styleFunction && feature) {
                var st = this._styleFunction(feature);

                this._applyStyle(feature, st);
            }
        }

        private _applyStyle(feature: Data.Feature, style: Data.StyleOptions): void {
            if (feature && style) {
                if (style.icon) {
                    var markerIcon = google.maps.Marker._getMarkerIcon({
                        icon: style.icon
                    });

                    if (markerIcon.bubbleOptions) {
                        feature._setProperties(markerIcon.bubbleOptions);
                    } else {
                        if (markerIcon.iconOptions.image) {
                            var iconProps: any = {};

                            if (markerIcon.iconOptions) {
                                iconProps.rotation = markerIcon.iconOptions.rotation;
                                iconProps.anchor = markerIcon.iconOptions.anchor;
                                iconProps.offset = markerIcon.iconOptions.offset;
                                iconProps.size = markerIcon.iconOptions.size;

                                if (markerIcon.iconOptions.image) {
                                    iconProps.image = markerIcon.id;

                                    if (!this._icons[markerIcon.id]) {
                                        this._icons[markerIcon.id] = markerIcon.iconOptions.image;
                                    }
                                }
                            }

                            if (markerIcon.textOptions) {
                                iconProps.fontColor = markerIcon.textOptions.color;
                                iconProps.fontSize = markerIcon.textOptions.size;
                            }

                            if (iconProps.image) {
                                var m = this.get('map');

                                if (m && !m._map.imageSprite.hasImage(markerIcon.id)) {
                                    m._map.imageSprite.add(markerIcon.id, this._icons[markerIcon.id]).then(() => {
                                        feature._setProperties(iconProps);
                                    });
                                } else {
                                    feature._setProperties(iconProps);
                                }
                            } else {
                                feature._setProperties(iconProps);
                            }
                        }
                    }
                }

                var props: any = {};

                if (style.strokeColor || style.strokeColor === null) {
                    props.strokeColor = style.strokeColor;
                }

                if (typeof style.strokeOpacity === 'number' || style.strokeOpacity === null) {
                    props.strokeOpacity = style.strokeOpacity;
                }

                if (typeof style.strokeWeight === 'number' || style.strokeWeight === null) {
                    props.strokeWidth = style.strokeWeight;
                }

                if (style.fillColor || style.fillColor === null) {
                    props.fillColor = style.fillColor;
                }

                if (typeof style.fillOpacity === 'number' || style.fillOpacity === null) {
                    props.fillOpacity = style.fillOpacity;
                }

                if (style.title || style.title === null) {
                    props.title = style.title;
                }

                if (typeof style.clickable === 'boolean' || style.clickable === null) {
                    props.clickable = style.clickable;
                }

                if (Object.keys(props).length > 0) {
                    feature._setProperties(props);
                }

                //Not supported: draggable, editable, zIndex, shape, cursor, clickable, visible
            }
        }

        private _hoveredShape: string;

        private _mouseMove = (e: atlas.MapMouseEvent): void => {
            if (e.shapes && e.shapes.length > 0) {
                var shape: atlas.Shape;
                var id: string;

                for (var i = 0; i < e.shapes.length; i++) {
                    var s = <atlas.Shape>e.shapes[i];

                    if (s instanceof atlas.Shape) {
                        id = s.getProperties()._azureMapsShapeId;

                        if (this._ds.getShapeById(id)) {
                            shape = s;
                            break;
                        }
                    }
                }

                if (shape) {
                    if (this._hoveredShape !== id) {
                        this._mouseOut(e);
                        if (this._ds.getShapes().indexOf(s) > -1) {
                            this._hoveredShape = id;
                            google.maps.event.trigger(this, 'mouseover', this._wrapEvent(e, shape));
                        }

                        if (this.get('clickable') || s.getProperties().clickable) {
                            this.get('map')._map.getCanvasContainer().style.cursor = s._googleFeature.get('cursor') || this.get('cursor') || 'pointer';
                        }
                    }
                } else if (this._hoveredShape) {
                    this._mouseOut(e);
                }
            } else if (this._hoveredShape) {
                this._mouseOut(e);
            }
        }

        private _mouseOut(e: atlas.MapMouseEvent): void {
            if (this._hoveredShape) {
                var s = this._ds.getShapeById(this._hoveredShape);
                var args = this._wrapEvent(e, s);
                google.maps.event.trigger(this, 'mouseout', args);
                this._hoveredShape = null;
            }
            this.get('map')._map.getCanvasContainer().style.cursor = 'grab';
        }

        private _wrapEvent(e: atlas.MapMouseEvent, s: atlas.Shape): google.maps.MouseEvent {
            var args = new google.maps.MouseEvent(e);
            args.feature = s._googleFeature;
            args.vertex = undefined;
            args.edge = undefined;
            args.path = undefined;
            return args;
        }

        private _watchShape(s: atlas.Shape): void {
            var self = this;
            google.maps.event.addListener(s._googleFeature, 'removeproperty', () => {
                if (self._styleFunction) {
                    self._applyStyleFunction(s._googleFeature);
                }
            });
            google.maps.event.addListener(s._googleFeature, 'setproperty', () => {
                if (self._styleFunction) {
                    self._applyStyleFunction(s._googleFeature);
                }
            });
            google.maps.event.addListener(s._googleFeature, 'changed', () => {
                if (self._styleFunction) {
                    self._applyStyleFunction(s._googleFeature);
                }
            });

            if (self._styleFunction) {
                self._applyStyleFunction(s._googleFeature);
            }
        }

        //Not supported.

        public setControlPosition(controlPosition: ControlPosition): void { }

        public setControls(controls: DrawingMode[] | null): void { }

        public setDrawingMode(drawingMode: DrawingMode | null): void { }

        public getControlPosition(): ControlPosition { return null; }

        public getControls(): DrawingMode[] { return []; }

        public getDrawingMode(): DrawingMode | null { return null; }
    }

    export namespace Data {
        //Public classes

        export class Feature extends MVCObject {
            private _s: atlas.Shape;
            public _o: FeatureOptions = {
                properties: {}
            };

            constructor(options?: FeatureOptions) {
                super();
                var self = this;

                if (options) {
                    if (options.id) {
                        self.set('id', options.id);
                        self._o.id = options.id;
                    }

                    if (options.geometry) {
                        self.setGeometry(options.geometry);
                    }

                    if (options.properties) {
                        Object.keys(options.properties).forEach(key => {
                            self.setProperty(key, options.properties[key]);
                        });
                    }
                }
            }

            public forEachProperty(callback: (value: any, name: string) => void): void {
                Object.keys(this._o.properties).forEach(key => {
                    callback(this._o.properties[key], key);
                });
            }

            public getGeometry(): Geometry {
                return this.get('geometry');
            }

            public getId(): number | string {
                return this.get('id');
            }

            public getProperty(name: string): any {
                return this._o.properties[name];
            }

            public removeProperty(name: string): void {
                var val = this._o.properties[name];
                this._o.properties[name] = undefined;
                if (this._s) {
                    this._s.setProperties(this._o.properties);
                }
                google.maps.event.trigger(this, 'removeproperty', { feature: this, name: name, oldValue: val });
            }

            public setGeometry(newGeometry: Geometry | LatLng | LatLngLiteral): void {
                var oGeom = this._o.geometry;

                if (newGeometry instanceof google.maps.Data.Geometry) {
                    this._o.geometry = newGeometry;
                    this.set('geometry', newGeometry);
                } else {
                    this._o.geometry = new google.maps.Data.Point(newGeometry);
                    this.set('geometry', this._o.geometry);
                }

                var ds: atlas.source.DataSource;
                var idx: number = -1;

                if (this._s) {
                    ds = this._s.dataSource;
                    ds.remove(this._s);
                }

                this._getShape();

                if (ds) {
                    ds.add(this._s, idx);
                }

                google.maps.event.trigger(this, 'setgeometry', { feature: this, oldGeometry: oGeom, newGeometry: newGeometry });
            }

            public setProperty(name: string, newValue: any): void {
                if (typeof newValue !== 'undefined') {
                    var oVal = this.get(name);
                    this.set(name, newValue);
                    this._o.properties[name] = newValue;
                    if (this._s) {
                        var p: any = this._s.getProperties();
                        p[name] = newValue;
                        this._s.setProperties(p);
                    }

                    google.maps.event.trigger(this, 'setproperty', { feature: this, name: name, oldValue: oVal, newValue: newValue });
                }
            }

            public toGeoJson(callback: (feature: object) => void): void {
                if (this._o.geometry) {
                    callback(this._s.toJson());
                } else {
                    callback(null);
                }
            }

            public _getShape(): atlas.Shape {
                if (this._s) {
                    return this._s;
                }

                if (this._o.geometry && (<Geometry>this._o.geometry)._g) {
                    this._s = new atlas.Shape((<Geometry>this._o.geometry)._g, this._o.id, this._o.properties);

                    _featureTable[this._s.getProperties()._azureMapsShapeId] = this;
                    this._s._googleFeature = this;
                    return this._s;
                }

                return null;
            }

            public _setProperties(props: any): void {
                Object.assign(this._o.properties, props);
                if (this._s) {
                    this._s.setProperties(Object.assign(this._s.getProperties(), this._o.properties));
                }
            }
        }

        export class Geometry {
            public _g: atlas.data.Geometry;

            constructor(g?: atlas.data.Geometry) {
                this._g = g;
            }

            public getType(): string {
                return this._g.type;
            }

            public forEachLatLng(callback: (latLng: LatLng) => void): void {
                if (this._g.type === 'Point') {
                    callback(ConvertToG.position(<atlas.data.Position>this._g.coordinates));
                } else if (this._g.type === 'MultiPoint' || this._g.type === 'LineString') {
                    (<atlas.data.Position[]>this._g.coordinates).forEach(c => {
                        callback(ConvertToG.position(c));
                    });
                } else if (this._g.type === 'MultiLineString' || this._g.type === 'Polygon') {
                    (<atlas.data.Position[][]>this._g.coordinates).forEach(r => {
                        r.forEach(c => {
                            callback(ConvertToG.position(c));
                        });
                    });
                } else if (this._g.type === 'MultiPolygon') {
                    (<atlas.data.Position[][][]>this._g.coordinates).forEach(p => {
                        p.forEach(r => {
                            r.forEach(c => {
                                callback(ConvertToG.position(c));
                            });
                        });
                    });
                } else if (this._g.type === 'GeometryCollection') {
                    //Overriden by GeometryCollection class.
                }
            }

            public getLength(): number {
                return this._g.coordinates.length;
            }

            public _toGeoJson(): atlas.data.Geometry | atlas.data.GeometryCollection {
                return this._g;
            }

            public static _fromGeoJson(geom: atlas.data.Geometry): Geometry {
                var g: Geometry = null;

                switch (geom.type) {
                    case 'Point':
                        g = new google.maps.Data.Point({ lat: 0, lng: 0 });
                        break;
                    case 'MultiPoint':
                        g = new google.maps.Data.MultiPoint([{ lat: 0, lng: 0 }]);
                        break;
                    case 'LineString':
                        g = new google.maps.Data.LineString([{ lat: 0, lng: 0 }]);
                        break;
                    case 'MultiLineString':
                        g = new google.maps.Data.MultiLineString([[{ lat: 0, lng: 0 }]]);
                        break;
                    case 'LinearRing':
                        g = new google.maps.Data.LinearRing([{ lat: 0, lng: 0 }]);
                        break;
                    case 'Polygon':
                        g = new google.maps.Data.Polygon([[{ lat: 0, lng: 0 }]]);
                        break;
                    case 'MultiPolygon':
                        g = new google.maps.Data.MultiPolygon([[[{ lat: 0, lng: 0 }]]]);
                        break;
                }

                if (g) {
                    g._g = geom;
                }

                return g;
            }
        }

        export class Point extends Geometry {
            constructor(latLng: LatLng | LatLngLiteral) {
                super(new atlas.data.Point(ConvertToA.latLng(latLng)));
            }

            public get(): LatLng {
                return ConvertToG.position(<atlas.data.Position>this._g.coordinates);
            }
        }

        export class MultiPoint extends Geometry {
            constructor(elements: Array<LatLng | LatLngLiteral>) {
                super(new atlas.data.MultiPoint(ConvertToA.latLngs(elements)));
            }

            public getArray(): LatLng[] {
                return ConvertToG.positions(<atlas.data.Position[]>this._g.coordinates);
            }

            public getAt(n: number): LatLng {
                return ConvertToG.position(<atlas.data.Position>this._g.coordinates[n]);
            }
        }

        export class LineString extends Geometry {
            constructor(elements: Array<LatLng | LatLngLiteral>) {
                super(new atlas.data.LineString(ConvertToA.latLngs(elements)));
            }

            public getArray(): LatLng[] {
                return ConvertToG.positions(<atlas.data.Position[]>this._g.coordinates);
            }

            public getAt(n: number): LatLng {
                return ConvertToG.position(<atlas.data.Position>this._g.coordinates[n]);
            }

            public static _fromPositions(pos: atlas.data.Position[]): LineString {
                var l = new google.maps.Data.LineString([]);
                l._g.coordinates = [...pos];
                return l;
            }
        }

        export class MultiLineString extends Geometry {
            constructor(elements: Array<LineString | Array<LatLng | LatLngLiteral>>) {
                var pos: atlas.data.Position[][] = [];
                elements.forEach(e => {
                    if (e instanceof google.maps.Data.LineString) {
                        pos = pos.concat((<atlas.data.LineString>e._g).coordinates);
                    } else {
                        pos = pos.concat(ConvertToA.latLngs(e));
                    }
                });

                super(new atlas.data.MultiLineString(pos));
            }

            public getArray(): LineString[] {
                var lines: LineString[] = [];
                (<atlas.data.Position[][]>this._g.coordinates).forEach(l => {
                    lines.push(google.maps.Data.LineString._fromPositions(l));
                });
                return lines;
            }

            public getAt(n: number): LineString {
                return google.maps.Data.LineString._fromPositions((<atlas.data.Position[][]>this._g.coordinates)[n]);
            }
        }

        export class LinearRing extends Geometry {
            constructor(elements: Array<LatLng | LatLngLiteral>) {
                super(new atlas.data.LineString(ConvertToA.latLngs(elements, true)));
            }

            public getArray(): LatLng[] {
                return ConvertToG.positions(<atlas.data.Position[]>this._g.coordinates);
            }

            public getAt(n: number): LatLng {
                return ConvertToG.position(<atlas.data.Position>this._g.coordinates[n]);
            }

            public static _fromPositions(pos: atlas.data.Position[]): LineString {
                var l = new google.maps.Data.LineString([]);
                if (!atlas.data.Position.areEqual(pos[0], pos[pos.length - 1])) {
                    pos.push(pos[0]);
                }

                l._g.coordinates = [...pos];
                return l;
            }
        }

        export class Polygon extends Geometry {
            constructor(elements: Array<LinearRing | Array<LatLng | LatLngLiteral>>) {
                var pos: atlas.data.Position[][] = [];
                elements.forEach(p => {
                    if (p instanceof google.maps.Data.LinearRing) {
                        pos.push((<atlas.data.Position[]>(p._g.coordinates)));
                    } else {
                        pos.push(ConvertToA.latLngs(p, true));
                    }
                });

                super(new atlas.data.Polygon(pos));
            }

            public getArray(): LinearRing[] {
                var lines: LinearRing[] = [];
                (<atlas.data.Position[][]>this._g.coordinates).forEach(l => {
                    lines.push(google.maps.Data.LinearRing._fromPositions(l));
                });
                return lines;
            }

            public getAt(n: number): LinearRing {
                return google.maps.Data.LinearRing._fromPositions((<atlas.data.Position[][]>this._g.coordinates)[n]);
            }

            public static _fromPositions(pos: atlas.data.Position[][]): Polygon {
                var l = new google.maps.Data.Polygon([]);
                l._g.coordinates = [...pos];
                return l;
            }
        }

        export class MultiPolygon extends Geometry {
            constructor(elements: Array<Polygon | Array<LinearRing | Array<LatLng | LatLngLiteral>>>) {
                var pos: atlas.data.Position[][][] = [];
                elements.forEach(p => {
                    if (p instanceof google.maps.Data.Polygon) {
                        pos.push((<atlas.data.Position[][]>(p._g.coordinates)));
                    } else {
                        var rings: atlas.data.Position[][] = [];

                        p.forEach(r => {
                            if (r instanceof google.maps.Data.LinearRing) {
                                rings.push((<atlas.data.Position[]>(r._g.coordinates)));
                            } else {
                                rings.push(ConvertToA.latLngs(r, true));
                            }
                        });

                        pos.push(rings);
                    }
                });

                super(new atlas.data.MultiPolygon(pos));
            }

            public getArray(): Polygon[] {
                var polys: Polygon[] = [];
                (<atlas.data.Position[][][]>this._g.coordinates).forEach(p => {
                    polys.push(google.maps.Data.Polygon._fromPositions(p));
                });
                return polys;
            }

            public getAt(n: number): Polygon {
                return google.maps.Data.Polygon._fromPositions((<atlas.data.Position[][][]>this._g.coordinates)[n]);
            }
        }

        export class GeometryCollection extends Geometry {
            public _geoms: Geometry[] = [];

            constructor(elements: Array<Geometry[] | LatLng[] | LatLngLiteral>) {
                super();

                elements.forEach(e => {
                    if (Array.isArray(e)) {
                        (<any[]>e).forEach(x => {
                            if (x instanceof google.maps.Data.Geometry) {
                                this._geoms.push(x);
                            } else {
                                this._geoms.push(new google.maps.Data.Point(<LatLng>x));
                            }
                        });
                    } else {
                        this._geoms.push(new google.maps.Data.Point(e));
                    }
                })
            }

            public getType(): string {
                return 'GeometryCollection';
            }

            public forEachLatLng(callback: (latLng: LatLng) => void): void {
                this._geoms.forEach(g => {
                    g.forEachLatLng(callback);
                });
            }

            public getArray(): Geometry[] {
                return this._geoms;
            }

            public getAt(n: number): Geometry {
                return this._geoms[n];
            }

            public getLength(): number {
                return this._geoms.length;
            }

            public _toGeoJson(): atlas.data.GeometryCollection {
                var geoms = [];

                this._geoms.forEach(g => {
                    geoms.push(g._toGeoJson());
                });

                return <atlas.data.GeometryCollection>{
                    type: 'GeometryCollection',
                    geometries: geoms
                };
            }
        }

        //Private interfaces

        export interface FeatureOptions {
            geometry?: Geometry | LatLng | LatLngLiteral;
            id?: number | string;
            properties?: object;
        }

        export interface DataOptions {
            //controlPosition?: ControlPosition;
            //controls?: DrawingMode[] | null;
            //drawingMode?: DrawingMode | null;
            featureFactory?: (geometry: Data.Geometry) => Data.Feature;
            map?: Map;
            style?: (f: Data.Feature) => Data.StyleOptions | StyleOptions;
        }

        export interface GeoJsonOptions {
            idPropertyName?: string;
        }

        export interface StyleOptions {
            clickable?: boolean;
            cursor?: string;
            //draggable?: boolean;
            // editable?: boolean;
            fillColor?: string;
            fillOpacity?: number;
            icon?: string | Icon | Symbol;
            //shape?: MarkerShape;
            strokeColor?: string;
            strokeOpacity?: number;
            strokeWeight?: number;
            title?: string;
            visible?: boolean;
            //zIndex?: number;
        }
    }

    ////////////////////////////////////////////
    // Geometry namespace
    ////////////////////////////////////////////

    export namespace geometry {
        export namespace encoding {
            export function decodePath(encodedPath: string): LatLng[] {
                return decoder.decode(encodedPath);
            }

            export function encodePath(path: LatLng[] | MVCArray<LatLng>): string {
                if (path instanceof google.maps.MVCArray) {
                    path = path.getArray();
                }

                return encoder.encode(path);
            }

            var decoder = {
                PRECISION: 1e5,

                decode: function (value: string): LatLng[] {
                    var points = [];
                    var lat = 0;
                    var lon = 0;

                    decoder.integers(value, function (x, y) {
                        lat += x;
                        lon += y;
                        points.push(new google.maps.LatLng(lat / decoder.PRECISION, lon / decoder.PRECISION));
                    })

                    return points;
                },
                sign: function (value) {
                    return value & 1 ? ~(value >>> 1) : (value >>> 1);
                },
                integers: function (value: string, callback: (x: number, y: number) => void): number {
                    var values = 0;
                    var x = 0;
                    var y = 0;

                    var byte = 0;
                    var current = 0;
                    var bits = 0;

                    for (var i = 0; i < value.length; i++) {

                        byte = value.charCodeAt(i) - 63;
                        current = current | ((byte & 0x1F) << bits);
                        bits = bits + 5;

                        if (byte < 0x20) {
                            if (++values & 1) {
                                x = decoder.sign(current);
                            } else {
                                y = decoder.sign(current);
                                callback(x, y);
                            }
                            current = 0;
                            bits = 0;
                        }
                    }

                    return values;
                }
            };

            var encoder = {
                CHARMAP: {},

                encode: function (points: LatLng[]): string {
                    if (Object.keys(encoder.CHARMAP).length === 0) {
                        for (var i = 0x20; i < 0x7F; i++) {
                            encoder.CHARMAP[i] = String.fromCharCode(i);
                        }
                    }

                    var px = 0, py = 0

                    return encoder.reduce(points, function (str, lat, lon) {
                        var x = Math.round(lat * 1e5);
                        var y = Math.round(lon * 1e5);

                        str += encoder.chars(encoder.sign((x - px))) +
                            encoder.chars(encoder.sign((y - py)));

                        px = x;
                        py = y;

                        return str;
                    })
                },

                reduce: function (points: LatLng[], callback: (str: string, lat: number, lon: number) => string): string {
                    var point = null;

                    var lat: any = 0;
                    var lon: any = 0;
                    var str = '';

                    for (var i = 0; i < points.length; i++) {
                        point = points[i];
                        lat = (typeof point.lat === 'function') ? point.lat() : (point.lat || point.x || point[0]);
                        lon = (typeof point.lng === 'function') ? point.lng() : (point.lng || point.lon || point.y || point[1]);
                        str = callback(str, lat, lon);
                    }

                    return str;
                },

                sign: function (value: number): number {
                    return (value < 0) ? ~(value << 1) : (value << 1);
                },

                charCode: function (value: number): number {
                    return ((value & 0x1F) | 0x20) + 63;
                },

                chars: function (value: number): string {
                    var str = '';

                    while (value >= 0x20) {
                        str += encoder.CHARMAP[encoder.charCode(value)];
                        value = value >> 5;
                    }

                    str += encoder.CHARMAP[value + 63];

                    return str;
                }
            };
        }

        export namespace spherical {
            export function computeArea(path: LatLng[] | MVCArray<LatLng>, radius?: number): number {
                return atlas.math.getArea(new atlas.data.Polygon(ConvertToA.latLngs(path)));
            }
            export function computeDistanceBetween(from: LatLng, to: LatLng, radius?: number): number {
                return atlas.math.getDistanceTo(ConvertToA.latLng(from), ConvertToA.latLng(to));
            }
            export function computeHeading(from: LatLng, to: LatLng): number {
                return atlas.math.getHeading(ConvertToA.latLng(from), ConvertToA.latLng(to));
            }
            export function computeLength(path: LatLng[] | MVCArray<LatLng>, radius?: number): number {
                return atlas.math.getLengthOfPath(ConvertToA.latLngs(path));
            }
            export function computeOffset(from: LatLng, distance: number, heading: number, radius?: number): LatLng {
                return ConvertToG.position(atlas.math.getDestination(ConvertToA.latLng(from), distance, heading));
            }
            export function computeOffsetOrigin(to: LatLng, distance: number, heading: number, radius?: number): LatLng {
                return ConvertToG.position(atlas.math.getDestination(ConvertToA.latLng(to), distance, heading - 180));
            }
            export function computeSignedArea(loop: LatLng[] | MVCArray<LatLng>, radius?: number): number {
                return atlas.math.getArea(new atlas.data.Polygon(ConvertToA.latLngs(loop)));
            }
            export function interpolate(from: LatLng, to: LatLng, fraction: number): LatLng {
                return ConvertToG.position(atlas.math.interpolate(ConvertToA.latLng(from), ConvertToA.latLng(to), fraction));
            }
        }

        export namespace poly {
            export function containsLocation(point: LatLng, polygon: Polygon): boolean {
                var p = ConvertToA.latLng(point);

                if (polygon._shape.isCircle()) {
                    return booleanPointInPolygon(p, new atlas.data.Polygon(polygon._shape.getCircleCoordinates()));
                }

                return booleanPointInPolygon(p, <atlas.data.Polygon>polygon._shape.toJson().geometry);
            }

            export function isLocationOnEdge(point: LatLng, poly: Polygon | Polyline, tolerance?: number): boolean {
                tolerance = tolerance || 0.001;
                tolerance /= 111000;
                var p = atlas.math.getClosestPointOnGeometry(ConvertToA.latLng(point), poly._shape.toJson().geometry);
                return p.properties.distance <= tolerance;
            }

            function booleanPointInPolygon(
                point: atlas.data.Position,
                polygon: atlas.data.Polygon | atlas.data.MultiPolygon,
                options: {
                    ignoreBoundary?: boolean,
                } = {},
            ) {
                // validation
                if (!point) { return false; }
                if (!polygon) { return false; }

                const type = polygon.type;
                let polys: any[] = polygon.coordinates;

                // normalize to multipolygon
                if (type === "Polygon") {
                    polys = [polys];
                }

                let insidePoly = false;
                for (let i = 0; i < polys.length && !insidePoly; i++) {
                    // check if it is in the outer ring first
                    if (inRing(point, polys[i][0], options.ignoreBoundary)) {
                        let inHole = false;
                        let k = 1;
                        // check for the point in any of the holes
                        while (k < polys[i].length && !inHole) {
                            if (inRing(point, polys[i][k], !options.ignoreBoundary)) {
                                inHole = true;
                            }
                            k++;
                        }
                        if (!inHole) {
                            insidePoly = true;
                        }
                    }
                }

                return insidePoly;
            }

            function inRing(pt: number[], ring: number[][], ignoreBoundary?: boolean) {
                let isInside = false;
                if (ring[0][0] === ring[ring.length - 1][0] && ring[0][1] === ring[ring.length - 1][1]) {
                    ring = ring.slice(0, ring.length - 1);
                }
                for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
                    const xi = ring[i][0];
                    const yi = ring[i][1];
                    const xj = ring[j][0];
                    const yj = ring[j][1];
                    const onBoundary = (pt[1] * (xi - xj) + yi * (xj - pt[0]) + yj * (pt[0] - xi) === 0) &&
                        ((xi - pt[0]) * (xj - pt[0]) <= 0) && ((yi - pt[1]) * (yj - pt[1]) <= 0);
                    if (onBoundary) {
                        return !ignoreBoundary;
                    }
                    const intersect = ((yi > pt[1]) !== (yj > pt[1])) &&
                        (pt[0] < (xj - xi) * (pt[1] - yi) / (yj - yi) + xi);
                    if (intersect) {
                        isInside = !isInside;
                    }
                }
                return isInside;
            }
        }
    }

    ////////////////////////////////////////////
    // Visualization Library namespace
    ////////////////////////////////////////////

    export namespace visualization {

        export class HeatmapLayer extends MVCObject {
            private _datasource = new atlas.source.DataSource();
            private _layer = new atlas.layer.HeatMapLayer(this._datasource, null, {
                opacity: 0.5,
                radius: 9,
                color: [
                    'interpolate',
                    ['linear'],
                    ['heatmap-density'],
                    0, 'transparent',
                    0.33, 'greenyellow',
                    0.66, 'yellow',
                    1, 'red'
                ]
            });

            constructor(opts?: HeatmapLayerOptions) {
                super();

                opts = <HeatmapLayerOptions>Object.assign({ dissipating: true }, opts || {});
                this.setOptions(opts);
            }

            public getData(): MVCArray<LatLng | WeightedLocation> {
                return this.get('data');
            }

            public getMap(): Map {
                return this.get('map');
            }

            public setData(data: MVCArray<LatLng | WeightedLocation> | LatLng[] | WeightedLocation[]): void {
                var hasWeights = false;
                var points: atlas.data.Feature<atlas.data.Point, any>[] = [];

                if (data) {
                    var locs: (LatLng | WeightedLocation)[];

                    if (data instanceof google.maps.MVCArray) {
                        locs = data.getArray();
                    } else {
                        locs = data;
                    }

                    points = (<(LatLng | WeightedLocation)[]>locs).map(x => {
                        if (x['location']) {
                            let wl = <WeightedLocation>x;
                            //Is WeightedLocation
                            return new atlas.data.Feature(new atlas.data.Point(ConvertToA.latLng(wl.location)), {
                                weight: wl.weight
                            });
                        } else {
                            //Is LatLng
                            return new atlas.data.Feature(new atlas.data.Point(ConvertToA.latLng(<LatLng>x)));
                        }
                    });
                }

                this._datasource.setShapes(points);
                this._layer.setOptions({
                    weight: (hasWeights) ? ['get', 'weight'] : null
                });

                super.set('data', data);
            }

            public setMap(map: Map | null): void {
                var m: Map = this.get('map');

                if (m) {
                    m._map.layers.remove(this._layer);
                    m._map.sources.remove(this._datasource);
                }

                if (map) {
                    var self = this;
                    map._map.events.add('ready', () => {
                        map._map.sources.add(self._datasource);
                        map._map.layers.add(self._layer, 'labels');
                    });
                }

                super.set('map', map);
            }

            public setOptions(options: HeatmapLayerOptions): void {
                if (options) {
                    if (typeof options.map !== 'undefined') {
                        this.setMap(options.map);
                    }

                    if (options.data) {
                        this.setData(options.data);
                    }

                    var style: atlas.HeatMapLayerOptions = {};

                    if (typeof options.gradient !== 'undefined') {
                        var gradient = (options.gradient && Array.isArray(options.gradient)) ? options.gradient : [
                            'transparent',
                            'greenyellow',
                            'yellow',
                            'red'
                        ];

                        var step = 1 / (gradient.length - 1);

                        var colorExp: atlas.Expression = [
                            'interpolate',
                            ['linear'],
                            ['heatmap-density']
                        ];

                        for (var i = 0; i < gradient.length; i++) {
                            colorExp.push(i * step, gradient[i]);
                        }

                        style.color = colorExp;

                        super.set('gradient', options.gradient);
                    }

                    if (typeof options.maxIntensity !== 'undefined') {
                        if (typeof options.maxIntensity === 'number' && options.maxIntensity > 0) {
                            //Dividing 3 by the max intensity appears pretty close equivalent to Google Maps.
                            style.intensity = 3 / options.maxIntensity;
                        } else {
                            style.intensity = 1;
                        }

                        super.set('maxIntensity', options.maxIntensity);
                    }

                    if (typeof options.opacity !== 'undefined') {
                        if (typeof options.opacity === 'number') {
                            style.opacity = options.opacity;
                        } else {
                            style.opacity = 0.5;
                        }

                        super.set('opacity', options.opacity);
                    }

                    if (typeof options.radius !== 'undefined') {
                        var r = 9;

                        if (typeof options.radius === 'number') {
                            r = options.radius;
                        }

                        style.radius = this._getRadius(r, this.get('dissipating'));

                        super.set('radius', options.radius);
                    }

                    if (typeof options.dissipating !== 'undefined') {
                        if (typeof options.dissipating === 'boolean') {
                            var r = options.radius || this.get('radius') || 9;

                            style.radius = this._getRadius(r, options.dissipating);
                        } else {
                            style.radius = this._getRadius(r, true);
                        }

                        super.set('dissipating', options.dissipating);
                    }

                    if (Object.keys(style).length > 0) {
                        this._layer.setOptions(style);
                    }
                }
            }

            private _getRadius(radius: number, dissipating: boolean): any {
                if (!dissipating) {
                    return [
                        'interpolate',
                        ['exponential', 2],
                        ['zoom'],
                        1, radius,
                        19, radius * Math.pow(2, 18)
                    ];
                }

                return radius;
            }

            public set(key: string, value?: any): MVCObject {
                var p: any = {};
                p[key] = value;
                this.setOptions(p);
                return this;
            }

            public setValues(values: any): MVCObject {
                this.setOptions(values);
                return this;
            }
        }

        interface HeatmapLayerOptions {
            data: any;
            dissipating?: boolean;
            gradient?: string[];
            map?: Map;
            maxIntensity?: number;
            opacity?: number;
            radius?: number;
        }

        interface WeightedLocation {
            location: LatLng;
            weight: number;
        }

        //Not supported

        export class MapsEngineLayer extends MVCObject {
            constructor(options: MapsEngineLayerOptions) {
                super()
            }
            public getLayerId(): string { return null; }
            public getLayerKey(): string { return null; }
            public getMap(): Map { return null; }
            public getMapId(): string { return null; }
            public getOpacity(): number { return null; }
            public getProperties(): MapsEngineLayerProperties { return null; }
            public getStatus(): MapsEngineStatus { return null; }
            public getZIndex(): number { return null; }
            public setLayerId(layerId: string): void { }
            public setLayerKey(layerKey: string): void { }
            public setMap(map: Map | null): void { }
            public setMapId(mapId: string): void { }
            public setOpacity(opacity: number): void { }
            public setOptions(options: MapsEngineLayerOptions): void { }
            public setZIndex(zIndex: number): void { }
        }

        interface MapsEngineLayerOptions {
            accessToken?: string;
            clickable?: boolean;
            fitBounds?: boolean;
            layerId?: string;
            layerKey?: string;
            map?: Map;
            mapId?: string;
            opacity?: number;
            suppressInfoWindows?: boolean;
            zIndex?: number;
        }

        interface MapsEngineLayerProperties {
            name: string;
        }

        interface MapsEngineMouseEvent {
            featureId?: string;
            infoWindowHtml?: string;
            latLng?: LatLng;
            pixelOffset?: Size;
        }

        export enum MapsEngineStatus {
            INVALID_LAYER = 'INVALID_LAYER',
            OK = 'OK',
            UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        }
    }

    ////////////////////////////////////////////
    // Drawing namespace
    ////////////////////////////////////////////

    export namespace drawing {
        export class DrawingManager extends MVCObject {
            public _drawingManager: atlas.drawing.DrawingManager;

            constructor(options?: DrawingManagerOptions) {
                super();

                this.set('drawingControl', true);

                this.setOptions(options);

                this.changed = (property: string) => {
                    this._updateDrawingOptions();
                };
            }

            public getDrawingMode(): OverlayType {
                return this.get('drawingMode');
            }

            public getMap(): Map {
                return this.get('map');
            }

            public setDrawingMode(drawingMode: OverlayType | null): void {
                this.set('drawingMode', drawingMode);

                var mode: OverlayType = this.get('drawingMode');

                if (this._drawingManager && typeof mode !== 'undefined') {
                    this._drawingManager.setOptions({ mode: this._convertDrawingMode(mode) });
                }
            }

            public setMap(map: Map | null): void {
                var self = this;
                var m = self.get('map');

                if (m) {
                    //@ts-ignore
                    map._map.events.remove('drawingmodechanged', self._drawingManager, self._modechanged);
                    //@ts-ignore
                    map._map.events.remove('drawingcomplete', self._drawingManager, self._drawingComplete);
                    self._drawingManager.dispose();
                }

                self.set('map', map);

                if (map) {
                    map._map.events.add('ready', () => {
                        self._drawingManager = new atlas.drawing.DrawingManager(map._map);

                        map._map.events.add('drawingmodechanged', self._drawingManager, self._modechanged);
                        map._map.events.add('drawingcomplete', self._drawingManager, self._drawingComplete);


                        self._updateDrawingOptions();
                    });
                }
            }

            private _modechanged = () => {
                //@ts-ignore
                if (this._drawingManager.getOptions().mode !== 'edit-geometry' && this._drawingManager.getOptions().mode !== 'idle') {
                    google.maps.event.trigger(this, 'drawingmode_changed', null);
                }
            };

            public setOptions(options: DrawingManagerOptions): void {
                if (options) {
                    if (options.map) {
                        this.setMap(options.map);
                    }

                    Object.keys(options).forEach(key => {
                        if (key !== 'map') {
                            this.set(key, options[key]);
                        }
                    });

                    this._updateDrawingOptions();
                }
            }

            private _updateDrawingOptions(): void {
                if (this._drawingManager) {
                    var options: atlas.DrawingManagerOptions = {};

                    var mode: OverlayType = this.get('drawingMode');

                    if (typeof mode !== 'undefined') {
                        options.mode = this._convertDrawingMode(mode);
                    }

                    var layers = this._drawingManager.getLayers();

                    var markerIcon = google.maps.Marker._getMarkerIcon(this.get('markerOptions') || {});

                    if (markerIcon.iconOptions.image) {
                        var props: any = {
                            offset: [0, 0]
                        };
                        var url: string;

                        if (markerIcon.iconOptions) {
                            props.rotation = markerIcon.iconOptions.rotation;

                            if (markerIcon.iconOptions.image) {
                                props.image = markerIcon.id;
                                props.offset = markerIcon.iconOptions.offset;
                                props.anchor = markerIcon.iconOptions.anchor;
                                props.size = markerIcon.iconOptions.size;
                                url = <string>markerIcon.iconOptions.image;
                            }
                        }

                        if (markerIcon.textOptions) {
                            props.fontColor = markerIcon.textOptions.color;
                            props.fontSize = markerIcon.textOptions.size;
                        }

                        layers.pointLayer.setOptions({
                            iconOptions: {
                                rotation: ["case",
                                    // Look for a rotation property.
                                    ["has", "rotation"], ["get", "rotation"],
                                    // Fallback to the default option.
                                    props.rotation || 0
                                ],
                                offset: [
                                    'case',

                                    //Look for a offset property.
                                    ['has', 'offset'],
                                    ['get', 'offset'],

                                    //Fallback to the default option. 
                                    ['literal', props.offset]
                                ],
                                anchor: ["case",
                                    // Look for an anchor property and make sure it is a valid value.
                                    ["has", "anchor"],
                                    ["match",
                                        ["get", "anchor"], // Verify value is valid.
                                        ["center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"],
                                        ["get", "anchor"], // return value.
                                        "bottom" // return default
                                    ],
                                    props.anchor || 'bottom'
                                ],
                                size: ["case",
                                    // Look for a size property.
                                    ["has", "size"],
                                    ["get", "size"],
                                    // Github style.
                                    ["has", "marker-size"],
                                    ["match",
                                        ["get", "marker-size"],
                                        "small", 0.5,
                                        "medium", 1,
                                        "large", 2,
                                        1
                                    ],
                                    // Fallback to the default option.
                                    props.size || 1
                                ]
                            },
                            textOptions: {
                                color: ['case',
                                    ['has', 'fontColor'],
                                    ['get', 'fontColor'],
                                    props.fontColor || '#000000'
                                ],
                                size: ['case',
                                    ['has', 'fontSize'],
                                    ['get', 'fontSize'],
                                    props.fontSize || 12
                                ]
                            }
                        });

                        if (props.image && url) {
                            var map: Map = this.get('map');

                            var imageExp: atlas.SymbolLayerOptions = {
                                iconOptions: {
                                    image: [
                                        "case",
                                        // Look for a image property.
                                        ["has", "image"],
                                        ["get", "image"],

                                        props.image
                                    ],
                                    size: props.size || 1
                                }
                            };

                            if (map && !map._map.imageSprite.hasImage(markerIcon.id)) {
                                map._map.imageSprite.add(markerIcon.id, url).then(() => {
                                    layers.pointLayer.setOptions(imageExp);
                                });
                            } else {
                                layers.pointLayer.setOptions(imageExp);
                            }
                        } else {
                            layers.pointLayer.setOptions(imageExp);
                        }
                    }

                    var polyOptions: CircleOptions & RectangleOptions & PolylineOptions & PolygonOptions = {};

                    var circleOptions: CircleOptions = this.get('circleOptions');

                    if (circleOptions) {
                        Object.assign(polyOptions, circleOptions);
                    }

                    var rectangleOptions: RectangleOptions = this.get('rectangleOptions');

                    if (rectangleOptions) {
                        Object.assign(polyOptions, rectangleOptions);
                    }

                    var polygonOptions: PolygonOptions = this.get('polygonOptions');

                    if (polygonOptions) {
                        Object.assign(polyOptions, polygonOptions);
                    }

                    if (Object.keys(polyOptions).length > 0) {
                        this._setPolyLayerOptions(layers.polygonLayer, polyOptions);
                        this._setPolyLayerOptions(layers.polygonOutlineLayer, polyOptions);
                    }

                    var polylineOptions: PolylineOptions = this.get('polylineOptions');

                    if (polylineOptions) {
                        this._setPolyLayerOptions(layers.lineLayer, polylineOptions);
                    }

                    var drawingControlOptions: DrawingControlOptions = this.get('drawingControlOptions');
                    var dto: atlas.DrawingToolbarOptions = {};

                    if (drawingControlOptions) {
                        if (drawingControlOptions.drawingModes) {
                            var drawingModes: atlas.drawing.DrawingMode[] = [];

                            for (var i = 0; i < drawingControlOptions.drawingModes.length; i++) {
                                var m = this._convertDrawingMode(drawingControlOptions.drawingModes[i]);
                                if (m !== atlas.drawing.DrawingMode.idle) {
                                    drawingModes.push(m);
                                }
                            }

                            dto.buttons = drawingModes;
                        }

                        if (drawingControlOptions.position && drawingControlOptions.position !== google.maps.ControlPosition.TOP_CENTER) {
                            dto.position = ConvertToA.controlPosition(drawingControlOptions.position, 'top-right');
                        } else {
                            dto.position = 'non-fixed';
                        }
                    }

                    var drawingControl: boolean = this.get('drawingControl');

                    if (typeof drawingControl === 'boolean') {
                        options.toolbar = (drawingControl) ? new atlas.control.DrawingToolbar(dto) : null;
                    }

                    if (Object.keys(options).length > 0) {
                        this._drawingManager.setOptions(options);
                    }
                }
            }

            private _convertDrawingMode(mode: OverlayType): atlas.drawing.DrawingMode {
                if (mode) {
                    switch (mode) {
                        case google.maps.drawing.OverlayType.CIRCLE:
                            return atlas.drawing.DrawingMode.drawCircle;
                        case google.maps.drawing.OverlayType.MARKER:
                            return atlas.drawing.DrawingMode.drawPoint;
                        case google.maps.drawing.OverlayType.POLYGON:
                            return atlas.drawing.DrawingMode.drawPolygon;
                        case google.maps.drawing.OverlayType.RECTANGLE:
                            return atlas.drawing.DrawingMode.drawRectangle;
                    }
                }

                return atlas.drawing.DrawingMode.idle;
            }

            private _setPolyLayerOptions(layer: atlas.layer.PolygonLayer, options: CircleOptions & RectangleOptions & PolylineOptions & PolygonOptions) {
                if (this._drawingManager && layer && options) {
                    var opt: atlas.PolygonLayerOptions & atlas.LineLayerOptions = {};

                    if (options.fillColor) {
                        opt.fillColor = ["case",
                            // Look for a fillColor property.
                            ["has", "fillColor"], ["get", "fillColor"],
                            // Github style.
                            ["has", "fill"], ["get", "fill"],
                            // Fallback to the default option.
                            options.fillColor
                        ];
                    }

                    if (typeof options.fillOpacity === 'number') {
                        opt.fillOpacity = ["case",
                            // Look for a fillOpacity property.
                            ["has", "fillOpacity"], ["get", "fillOpacity"],
                            // Github style.
                            ["has", "fill-opacity"], ["get", "fill-opacity"],
                            // Fallback to the default option.
                            options.fillOpacity
                        ];
                    }

                    if (options.strokeColor) {
                        opt.strokeColor = options.strokeColor;
                    }

                    if (typeof options.strokeOpacity === 'number') {
                        opt.strokeOpacity = options.strokeOpacity;
                    }

                    if (typeof options.strokeWeight === 'number') {
                        opt.strokeWidth = options.strokeWeight;
                    }

                    layer.setOptions(opt);
                }
            }

            private _drawingComplete = (s: atlas.Shape): void => {
                var o = this._getOverlay(s);

                if (o) {
                    var eventName: string;

                    switch (o.type) {
                        case google.maps.drawing.OverlayType.MARKER:
                            eventName = 'markercomplete';
                            break;
                        case google.maps.drawing.OverlayType.CIRCLE:
                            eventName = 'circlecomplete';
                            break;
                        case google.maps.drawing.OverlayType.POLYGON:
                            eventName = 'polygoncomplete';
                            break;
                        case google.maps.drawing.OverlayType.POLYLINE:
                            eventName = 'polylinecomplete';
                            break;
                        case google.maps.drawing.OverlayType.RECTANGLE:
                            eventName = 'rectanglecomplete';
                            break;
                    }

                    google.maps.event.trigger(this, eventName, o.overlay);
                    google.maps.event.trigger(this, 'overlaycomplete', o);
                }
            }

            private _getOverlay(shape: atlas.Shape): OverlayCompleteEvent {
                var props = shape.getProperties();
                var gType = shape.getType();

                var polygonOptions: PolygonOptions = this.get('polygonOptions');

                if (shape.isCircle()) {
                    var c = new google.maps.Circle();
                    c._shape = shape;
                    shape._googleFeature = c;
                    c._drawingManager = this;
                    c.setOptions(polygonOptions);
                    return {
                        overlay: c,
                        type: google.maps.drawing.OverlayType.CIRCLE
                    };
                } else if (props.subType === 'rectangle') {
                    var r = new google.maps.Rectangle();
                    r._shape = shape;
                    shape._googleFeature = r;
                    r._drawingManager = this;
                    r.setOptions(polygonOptions);
                    return {
                        overlay: r,
                        type: google.maps.drawing.OverlayType.RECTANGLE
                    };
                } else if (gType === 'Polygon') {
                    var p = new google.maps.Polygon();
                    p._shape = shape;
                    shape._googleFeature = p;
                    p._drawingManager = this;
                    p.setOptions(polygonOptions);
                    return {
                        overlay: p,
                        type: google.maps.drawing.OverlayType.POLYGON
                    };
                } else if (gType === 'LineString') {
                    var l = new google.maps.Polyline();
                    l._shape = shape;
                    shape._googleFeature = l;
                    l._drawingManager = this;
                    l.setOptions(this.get('polylineOptions'));
                    return {
                        overlay: l,
                        type: google.maps.drawing.OverlayType.POLYLINE
                    };
                } else if (gType === 'Point') {
                    this._drawingManager.getSource().remove(shape);

                    var m = new google.maps.Marker({
                        position: ConvertToG.position(<atlas.data.Position>shape.getCoordinates())
                    });
                    m._shape = shape;
                    shape._googleFeature = m;
                    m._drawingManager = this;
                    m.setOptions(this.get('markerOptions'));

                    return {
                        overlay: m,
                        type: google.maps.drawing.OverlayType.MARKER
                    };
                }

                return null;
            }
        }

        interface DrawingManagerOptions {
            drawingControl?: boolean;
            drawingControlOptions?: DrawingControlOptions;
            drawingMode?: OverlayType | null;
            map?: Map;

            /**
             * Options to apply to any new circles created with this DrawingManager.
             * The center and radius properties are ignored, and the map property of a
             * new circle is always set to the DrawingManager's map.
             */
            circleOptions?: CircleOptions;
            /**
             * Options to apply to any new markers created with this DrawingManager.
             * The position property is ignored, and the map property of a new marker
             * is always set to the DrawingManager's map.
             */
            markerOptions?: MarkerOptions;
            /**
             * Options to apply to any new polygons created with this DrawingManager.
             * The paths property is ignored, and the map property of a new polygon is
             * always set to the DrawingManager's map.
             */
            polygonOptions?: PolygonOptions;
            /**
             * Options to apply to any new polylines created with this DrawingManager.
             * The path property is ignored, and the map property of a new polyline is
             * always set to the DrawingManager's map.
             */
            polylineOptions?: PolylineOptions;
            /**
             * Options to apply to any new rectangles created with this
             * DrawingManager. The bounds property is ignored, and the map property of
             * a new rectangle is always set to the DrawingManager's map.
             */
            rectangleOptions?: RectangleOptions;
        }

        interface DrawingControlOptions {
            drawingModes?: OverlayType[];
            position?: ControlPosition;
        }

        interface OverlayCompleteEvent {
            overlay: Marker | Polygon | Polyline | Rectangle | Circle;
            type: OverlayType;
        }

        /**
         * The types of overlay that may be created by the DrawingManager. Specify
         * these by value, or by using the constant's name. For example, 'polygon'
         * or google.maps.drawing.OverlayType.POLYGON.
         */
        export enum OverlayType {
            /**
             * Specifies that the DrawingManager creates circles, and that the overlay
             * given in the overlaycomplete event is a circle.
             */
            CIRCLE = 'circle',
            /**
             * Specifies that the DrawingManager creates markers, and that the overlay
             * given in the overlaycomplete event is a marker.
             */
            MARKER = 'marker',
            /**
             * Specifies that the DrawingManager creates polygons, and that the
             * overlay given in the overlaycomplete event is a polygon.
             */
            POLYGON = 'polygon',
            /**
             * Specifies that the DrawingManager creates polylines, and that the
             * overlay given in the overlaycomplete event is a polyline.
             */
            POLYLINE = 'polyline',
            /**
             * Specifies that the DrawingManager creates rectangles, and that the
             * overlay given in the overlaycomplete event is a rectangle.
             */
            RECTANGLE = 'rectangle',
        }
    }

    ////////////////////////////////////////////
    // Services methods
    ////////////////////////////////////////////

    export class Geocoder {
        private searchURL: atlas.service.SearchURL;

        constructor() {
            this.searchURL = new atlas.service.SearchURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
        }

        public geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void {
            if (!callback) {
                return;
            }

            if (request.address && request.address !== '') {
                //Forward geocode.
                var opt: atlas.service.Models.SearchGetSearchFuzzyOptionalParams = {
                    language: atlas.getLanguage(),
                    view: atlas.getView()
                };

                if (request.bounds) {
                    var b = ConvertToA.bbox(request.bounds);
                    opt.btmRight = `${Math.min(b[1], b[3])},${Math.max(b[0], b[2])}`;
                    opt.topLeft = `${Math.max(b[1], b[3])},${Math.min(b[0], b[2])}`;
                }

                if (request.region) {
                    opt.countrySet = [request.region];
                }

                this.searchURL.searchFuzzy(atlas.service.Aborter.timeout(10000), request.address, opt).then(r => {
                    if (r.summary.numResults === 0) {
                        callback([], google.maps.GeocoderStatus.ZERO_RESULTS);
                    } else {
                        var results = r.results.map(a => {
                            return google.maps.Geocoder._convertFuzzyResult(a);
                        });

                        results = google.maps.Geocoder._filterResults(results, request);

                        callback(results, google.maps.GeocoderStatus.OK);
                    }
                }, (e) => {
                    callback(null, google.maps.GeocoderStatus.ERROR)
                });
            } else if (request.location) {
                var pos = ConvertToA.latLng(request.location);

                var opt2: atlas.service.Models.SearchGetSearchAddressReverseOptionalParams = {
                    language: atlas.getLanguage(),
                    view: atlas.getView()
                };

                //Reverse geocode.
                this.searchURL.searchAddressReverse(atlas.service.Aborter.timeout(10000), pos, opt2).then(r => {
                    if (r.summary.numResults === 0) {
                        callback([], google.maps.GeocoderStatus.ZERO_RESULTS);
                    } else {
                        var results = r.addresses.map(a => {
                            return google.maps.Geocoder._convertReverseAddressResult(a);
                        });

                        callback(results, google.maps.GeocoderStatus.OK);
                    }
                }, (e) => {
                    callback(null, google.maps.GeocoderStatus.ERROR)
                });
            } else {
                callback(null, google.maps.GeocoderStatus.INVALID_REQUEST);
            }
        }

        public static _convertFuzzyResult(result: atlas.service.Models.SearchFuzzyResult & atlas.service.Models.SearchPoiResult): google.maps.places.PlaceResult {
            var _cachedPlace = _placesCache[result.id];

            if (_placesCache[result.id]) {
                return Object.assign({}, _cachedPlace);
            }

            var r: google.maps.places.PlaceResult = {
                formatted_address: null,
                address_components: (result.address) ? google.maps.Geocoder._convertAddress(result.address) : undefined,
                types: ['geocode'],
                place_id: result.id,
                id: result.id
            };

            if (result.address) {
                r.formatted_address = result.address.freeformAddress;
                r.adr_address = result.address.freeformAddress;

                if (result.address.streetNameAndNumber) {
                    r.name = result.address.streetNameAndNumber;
                    r._placeName = result.address.freeformAddress.replace(result.address.streetNameAndNumber, '').trim();
                }
            }

            var bbox = new google.maps.LatLngBounds(new google.maps.LatLng(result.viewport.btmRightPoint.lat, result.viewport.topLeftPoint.lon), new google.maps.LatLng(result.viewport.topLeftPoint.lat, result.viewport.btmRightPoint.lon))

            r.geometry = {
                location: new google.maps.LatLng(result.position.lat, result.position.lon),
                bounds: bbox,
                viewport: bbox,
                location_type: google.maps.GeocoderLocationType.GEOMETRIC_CENTER
            };

            var eType = result.entityType || result.type;
            if (eType) {
                switch (eType) {
                    case 'POI':
                        r.types.push('point_of_interest');
                        r.geometry.location_type = google.maps.GeocoderLocationType.APPROXIMATE;
                        break;
                    case 'Street':
                        r.types.push('route');
                        r.geometry.location_type = google.maps.GeocoderLocationType.RANGE_INTERPOLATED;
                        break;
                    case 'Point Address':
                        r.types.push('street_address', 'address');
                        r.geometry.location_type = google.maps.GeocoderLocationType.ROOFTOP;
                        break;
                    case 'Address Range':
                        r.types.push('street_address', 'address');
                        r.geometry.location_type = google.maps.GeocoderLocationType.RANGE_INTERPOLATED;
                        break;
                    case 'Cross Street':
                        r.types.push('intersection');
                        r.geometry.location_type = google.maps.GeocoderLocationType.ROOFTOP;
                        break;
                    case 'Country':
                        r.types.push('country', 'political', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'CountrySubdivision':
                        r.types.push('administrative_area_level_1', 'administrative_area1', 'political', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'CountrySecondarySubdivision':
                        r.types.push('administrative_area_level_2', 'administrative_area2', 'political', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'CountryTertiarySubdivision':
                        r.types.push('administrative_area_level_3', 'political', '(cities)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'Municipality':
                        r.types.push('locality', '(cities)', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'MunicipalitySubdivision':
                        r.types.push('sublocality', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'Neighbourhood':
                        r.types.push('neighborhood');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                    case 'PostalCodeArea':
                        r.types.push('postal_code', '(regions)');
                        r.geometry.location_type = google.maps.GeocoderLocationType.GEOMETRIC_CENTER;
                        break;
                }
            }

            if (result.poi) {
                r.formatted_address = result.poi.name || r.formatted_address;
                r.name = result.poi.name;

                if (result.poi.phone) {
                    r.formatted_phone_number = result.poi.phone;
                    r.international_phone_number = result.poi.phone;
                }

                if (result.poi.url) {
                    r.website = result.poi.url;
                }

                if (result.poi.classifications && result.poi.classifications.length > 0) {
                    r.types = r.types.concat(ConvertToG.poiClassificationsType(result.poi.classifications));
                }
            }

            //Remove duplicates
            r.types = [...new Set(r.types)];

            r.icon = ConvertToG.poiIconFromTypes(r.types);

            _placesCache[r.id] = r;

            return r;
        }
        
        public static _filterResults(results: google.maps.places.PlaceResult[], options: atlas.service.Models.SearchGetSearchFuzzyOptionalParams): google.maps.places.PlaceResult[] {
            if (options) {
                if (options.types && options.types.length > 0) {
                    var filtered = [];

                    results.forEach(r => {
                        for (var i = 0; i < r.types.length; i++) {
                            if (options.types.indexOf(r.types[i]) > -1) {
                                filtered.push(r);
                                break;
                            }
                        }
                    });

                    results = filtered;
                }

                if (options.strictBounds && options.bounds) {
                    var filtered = [];
                    var bbox = ConvertToG.bbox(ConvertToA.bbox(options.bounds));

                    results.forEach(r => {
                        if (bbox.contains(r.geometry.location)) {
                            filtered.push(r);
                        }
                    });

                    results = filtered;
                }

                var limit = options.limit || 10;

                if (results.length > limit) {
                    return results.slice(0, limit);
                }
            }

            return results;
        }

        public static _convertReverseAddressResult(result: atlas.service.Models.SearchAddressReverseResult): GeocoderResult {
            var r: GeocoderResult = {
                formatted_address: null,
                address_components: (result.address) ? google.maps.Geocoder._convertAddress(result.address) : undefined,
                types: []
            };

            r.formatted_address = result.position;

            if (result.address) {
                r.formatted_address = result.address.freeformAddress || result.position;

                if (result.address.streetNameAndNumber || result.address.streetNumber) {
                    r.types.push('street_address');
                }
            }

            var coord = result.position.split(',');
            var pos = [parseFloat(coord[1]), parseFloat(coord[0])];
            var bbox = ConvertToG.bbox(atlas.data.BoundingBox.fromDimensions(pos, 0.00001, 0.00001));

            r.geometry = {
                location: ConvertToG.position(pos),
                bounds: bbox,
                viewport: bbox,
                location_type: google.maps.GeocoderLocationType.GEOMETRIC_CENTER
            };

            if (result.matchType) {
                switch (result.matchType) {
                    case 'POI':
                        r.types.push('point_of_interest');
                        r.geometry.location_type = google.maps.GeocoderLocationType.APPROXIMATE;
                        break;
                    case 'Street':
                        r.types.push('route');
                        r.geometry.location_type = google.maps.GeocoderLocationType.RANGE_INTERPOLATED;
                        break;
                    case 'Geography':
                        break;
                    case 'Point Address':
                        r.types.push('street_address');
                        r.geometry.location_type = google.maps.GeocoderLocationType.ROOFTOP;
                        break;
                    case 'Address Range':
                        r.types.push('street_address');
                        r.geometry.location_type = google.maps.GeocoderLocationType.RANGE_INTERPOLATED;
                        break;
                    case 'Cross Street':
                        r.types.push('intersection');
                        r.geometry.location_type = google.maps.GeocoderLocationType.ROOFTOP;
                        break;
                }
            }

            return r;
        }

        private static _streetNameNumberIso2 = 'AD|AR|AW|AT|BD|BY|BE|BO|BR|BG|CM|CL|CN|CO|HR|CZ|DK|DO|EC|EE|FI|DE|GR|HU|IS|ID|IQ|IE|IT|KR|LV|LI|LT|MO|MG|MX|NL|NO|OM|PA|PY|PE|PL|PT|RO|RU|RS|SG|SK|SI|ES|LK|SR|SE|CH|TW|TR|UA|UY|VE';

        public static _convertAddress(address: atlas.service.Models.SearchResultAddress): GeocoderAddressComponent[] {
            var comp: GeocoderAddressComponent[] = [];

            if (address.streetNameAndNumber) {
                comp.push({
                    long_name: address.streetNameAndNumber,
                    short_name: address.streetNameAndNumber,
                    types: ['street_address']
                });
            } else if (address.streetNumber && address.streetName) {
                if (this._streetNameNumberIso2.indexOf(address.countryCode) > -1) {
                    var streetNameAndNumber = '';

                    if (address.streetName && address.streetName !== '') {
                        streetNameAndNumber += address.streetName;
                    }

                    if (address.streetNumber && address.streetName !== '') {
                        if (streetNameAndNumber !== '') {
                            streetNameAndNumber += ' ';
                        }

                        streetNameAndNumber += address.streetNumber;
                    }

                    comp.push({
                        long_name: `${address.streetName} ${address.streetNumber}`,
                        short_name: `${address.streetName} ${address.streetNumber}`,
                        types: ['street_address']
                    });
                } else {
                    var streetNumberAndName = '';

                    if (address.streetNumber && address.streetName !== '') {
                        streetNumberAndName += address.streetNumber;
                    }

                    if (address.streetName && address.streetName !== '') {
                        if (streetNumberAndName !== '') {
                            streetNumberAndName += ' ';
                        }

                        streetNumberAndName += address.streetName;
                    }

                    comp.push({
                        long_name: streetNumberAndName,
                        short_name: streetNumberAndName,
                        types: ['street_address']
                    });
                }
            }

            if (address.streetNumber) {
                comp.push({
                    long_name: address.streetNumber,
                    short_name: address.streetNumber,
                    types: ['street_number']
                });
            }

            if (address.streetName) {
                comp.push({
                    long_name: address.streetName,
                    short_name: address.streetName,
                    types: ['route']
                });
            }

            if (address.crossStreet) {
                comp.push({
                    long_name: address.crossStreet,
                    short_name: address.crossStreet,
                    types: ['intersection']
                });
            }

            if (address.extendedPostalCode || address.postalCode) {
                comp.push({
                    long_name: address.extendedPostalCode || address.postalCode,
                    short_name: address.extendedPostalCode || address.postalCode,
                    types: ['postal_code', 'political']
                });
            }

            if (address.municipality) {
                comp.push({
                    long_name: address.municipality,
                    short_name: address.municipality,
                    types: ['locality', 'political']
                });
            }

            if (address.countryTertiarySubdivision) {
                comp.push({
                    long_name: address.countryTertiarySubdivision,
                    short_name: address.countryTertiarySubdivision,
                    types: ['administrative_area_level_3', 'political']
                });
            }

            if (address.countrySecondarySubdivision) {
                comp.push({
                    long_name: address.countrySecondarySubdivision,
                    short_name: address.countrySecondarySubdivision,
                    types: ['administrative_area_level_2', 'political']
                });
            }

            if (address.countrySubdivision || address.countrySubdivisionName) {
                comp.push({
                    long_name: address.countrySubdivisionName || address.countrySubdivision,
                    short_name: address.countrySubdivision || address.countrySubdivisionName,
                    types: ['administrative_area_level_1', 'political']
                });
            }

            if (address.country || address.countryCode) {
                comp.push({
                    long_name: address.country || address.countryCode,
                    short_name: address.countryCode || address.country,
                    types: ['country', 'political']
                });
            }

            return comp;
        }
    }

    export enum GeocoderStatus {
        ERROR = 'ERROR',
        INVALID_REQUEST = 'INVALID_REQUEST',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS',
    }

    export enum GeocoderLocationType {
        APPROXIMATE = 'APPROXIMATE',
        GEOMETRIC_CENTER = 'GEOMETRIC_CENTER',
        RANGE_INTERPOLATED = 'RANGE_INTERPOLATED',
        ROOFTOP = 'ROOFTOP',
    }

    interface GeocoderRequest {
        address?: string;
        bounds?: google.maps.LatLngBounds | LatLngBoundsLiteral;
        componentRestrictions?: GeocoderComponentRestrictions;
        location?: google.maps.LatLng | LatLngLiteral;
        placeId?: string;
        region?: string;
    }

    interface GeocoderComponentRestrictions {
        administrativeArea?: string;
        country?: string | string[];
        locality?: string;
        postalCode?: string;
        route?: string;
    }

    interface GeocoderResult {
        address_components?: GeocoderAddressComponent[];
        formatted_address?: string;
        geometry?: GeocoderGeometry;
        partial_match?: boolean;
        place_id?: string;
        postcode_localities?: string[];
        types?: string[];
        _placeName?: string;
    }

    interface GeocoderAddressComponent {
        long_name: string;
        short_name: string;
        types: string[];
    }

    interface GeocoderGeometry {
        bounds: google.maps.LatLngBounds;
        location: google.maps.LatLng;
        location_type: GeocoderLocationType;
        viewport: google.maps.LatLngBounds;
    }

    export namespace places {

        export class AutocompleteService {
            private searchURL: atlas.service.SearchURL;

            constructor() {
                this.searchURL = new atlas.service.SearchURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
            }

            public getPlacePredictions(
                request: AutocompletionRequest,
                callback: (result: AutocompletePrediction[], status: PlacesServiceStatus) => void,
            ): void {
                if (!callback) {
                    return;
                }

                //POI search
                if (request.input && request.input !== '') {
                    var opt = google.maps.places.AutocompleteService._convertRequest(request, true);

                    if (request.types) {
                        opt.limit = 100;
                    }

                    this.searchURL.searchPOI(atlas.service.Aborter.timeout(10000), request.input, opt).then(r => {
                        if (r.summary.numResults === 0) {
                            callback([], google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
                        } else {
                            var results = r.results.map(a => {
                                return google.maps.places.AutocompleteService._convertResult(a, request.input);
                            });

                            results = google.maps.places.AutocompleteService._filterSuggestions(results, request);

                            callback(results, google.maps.places.PlacesServiceStatus.OK);
                        }
                    }, (e) => {
                        callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND);
                    });
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST);
                }
            }

            public getQueryPredictions(
                request: AutocompletionRequest,
                callback: (result: AutocompletePrediction[], status: PlacesServiceStatus) => void,
            ): void {
                if (!callback) {
                    return;
                }

                //Fuzzy search
                if (request.input && request.input !== '') {
                    var opt = google.maps.places.AutocompleteService._convertRequest(request, true);

                    if (request.types) {
                        opt.limit = 100;
                    }

                    this.searchURL.searchFuzzy(atlas.service.Aborter.timeout(10000), request.input, opt).then(r => {
                        if (r.summary.numResults === 0) {
                            callback([], google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
                        } else {
                            var results = r.results.map(a => {
                                return google.maps.places.AutocompleteService._convertResult(a, request.input);
                            });

                            results = google.maps.places.AutocompleteService._filterSuggestions(results, request);

                            callback(results, google.maps.places.PlacesServiceStatus.OK);
                        }
                    }, (e) => {
                        callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND);
                    });
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST);
                }
            }

            public static _convertRequest(request: PlaceSearchRequest & AutocompletionRequest & TextSearchRequest, autocomplete: boolean, offset?: number): atlas.service.Models.SearchGetSearchPOIOptionalParams {

                var opt: atlas.service.Models.SearchGetSearchPOIOptionalParams = {
                    language: atlas.getLanguage(),
                    view: atlas.getView(),
                    typeahead: autocomplete,
                    ofs: offset || 0,
                    limit: request._limit || 10
                };

                if (request.bounds) {
                    var b = ConvertToA.bbox(request.bounds);
                    opt.btmRight = `${Math.min(b[1], b[3])},${Math.max(b[0], b[2])}`;
                    opt.topLeft = `${Math.max(b[1], b[3])},${Math.min(b[0], b[2])}`;
                }

                if (request.componentRestrictions && request.componentRestrictions.country && request.componentRestrictions.country !== '') {
                    if (Array.isArray(request.componentRestrictions.country)) {
                        opt.countrySet = request.componentRestrictions.country;
                    } else {
                        opt.countrySet = [request.componentRestrictions.country];
                    }
                }

                if (request.location) {
                    var pos = ConvertToA.latLng(request.location);
                    opt.lat = pos[1];
                    opt.lon = pos[0];
                }

                if (typeof request.offset === 'number') {
                    opt.ofs = request.offset;
                }

                if (typeof request.radius === 'number') {
                    opt.radius = request.radius;
                }

                return opt;
            }

            public static _convertResult(result: atlas.service.Models.SearchPoiResult, query: string): AutocompletePrediction {
                var desc = '';
                var mainText;

                if (result.poi && result.poi.name) {
                    mainText = result.poi.name;
                    desc = mainText + ', ';
                }

                desc += result.address.freeformAddress;

                if (!mainText) {
                    if (result.type === 'Geography' && result.entityType) {
                        switch (result.entityType) {
                            case 'CountrySubdivision':
                                mainText = result.address.countrySubdivision;
                                break;
                            case 'CountrySecondarySubdivision':
                                mainText = result.address.countrySecondarySubdivision;
                                break;
                            case 'CountryTertiarySubdivision':
                                mainText = result.address.countryTertiarySubdivision;
                                break;
                            case 'Municipality':
                                mainText = result.address.municipality;
                                break;
                            case 'MunicipalitySubdivision':
                                mainText = result.address.municipalitySubdivision;
                                break;
                            case 'PostalCodeArea':
                                mainText = result.address.postalCode;
                                break;
                            case 'Country':
                                mainText = result.address.country;
                                break;
                        }
                    } else if (result.type === 'Street') {
                        mainText = result.address.streetName;
                    } else if (result.type === 'Point Address' || result.type === 'Address Range') {
                        mainText = google.maps.places.AutocompleteService._getAddressLine(result.address);
                    } else {
                        mainText = result.address.freeformAddress;
                    }
                }

                var secondaryText = result.address.freeformAddress;

                if (secondaryText.startsWith(mainText)) {
                    secondaryText = secondaryText.replace(mainText, '').replace(/(^[, ]+)|([, ]+$)/g, '');
                }

                var terms = google.maps.places.AutocompleteService._getTerms(desc, result);

                var mainTextMatch = google.maps.places.AutocompleteService._getTerm(mainText, query);
                var secondaryTextMatch = google.maps.places.AutocompleteService._getTerm(secondaryText, query);

                var fuzzyResult = google.maps.Geocoder._convertFuzzyResult(result);

                return {
                    id: result.id,
                    place_id: result.id,
                    description: desc,
                    distance_meters: result.dist,
                    matched_substrings: terms,
                    types: fuzzyResult.types,
                    terms: terms,
                    structured_formatting: {
                        main_text: mainText,
                        main_text_matched_substrings: (mainTextMatch) ? [mainTextMatch]: [],
                        secondary_text: secondaryText,
                        secondary_text_matched_substrings: (secondaryTextMatch) ? [secondaryTextMatch] : []
                    },
                    _result: fuzzyResult
                };
            }

            public static _getTerms(stringVal: string, result: atlas.service.Models.SearchPoiResult): PredictionSubstring[] {
                var terms: PredictionSubstring[] = [];
                var t: PredictionSubstring;

                if (result.poi && result.poi.name) {
                    t = this._getTerm(stringVal, result.poi.name);

                    if (t) {
                        terms.push(t);
                    }
                }

                Object.keys(result.address).forEach(key => {
                    if (key !== 'freeformAddress') {
                        t = google.maps.places.AutocompleteService._getTerm(stringVal, result.address[key]);

                        if (t) {
                            terms.push(t);
                        }
                    }
                });

                //Remove duplicates
                terms = terms.filter((thing, index, self) =>
                    index === self.findIndex((t) => (
                        t.offset === thing.offset && t.length === thing.length && t.value === thing.value
                    ))
                );

                return terms;
            }

            public static _getTerm(stringVal: string, matchString: string): PredictionSubstring {
                if (stringVal) {
                    var l = stringVal.toLowerCase();
                    var ml = matchString.toLowerCase();

                    var o = l.indexOf(ml);
                    if (o > -1) {
                        return {
                            offset: o,
                            length: matchString.length,
                            value: l.substr(o, matchString.length)
                        };
                    }
                }

                return null;
            }

            private static _streetNameNumberIso2 = 'AD|AR|AW|AT|BD|BY|BE|BO|BR|BG|CM|CL|CN|CO|HR|CZ|DK|DO|EC|EE|FI|DE|GR|HU|IS|ID|IQ|IE|IT|KR|LV|LI|LT|MO|MG|MX|NL|NO|OM|PA|PY|PE|PL|PT|RO|RU|RS|SG|SK|SI|ES|LK|SR|SE|CH|TW|TR|UA|UY|VE';

            public static _getAddressLine(address: atlas.service.Models.SearchResultAddress): string {
                if (address.streetNameAndNumber) {
                    return address.streetNameAndNumber;
                } else if (address.streetNumber && address.streetName) {
                    if (this._streetNameNumberIso2.indexOf(address.countryCode) > -1) {
                        var streetNameAndNumber = '';

                        if (address.streetName && address.streetName !== '') {
                            streetNameAndNumber += address.streetName;
                        }

                        if (address.streetNumber && address.streetName !== '') {
                            if (streetNameAndNumber !== '') {
                                streetNameAndNumber += ' ';
                            }

                            streetNameAndNumber += address.streetNumber;
                        }

                        return streetNameAndNumber;
                    }
                    var streetNumberAndName = '';

                    if (address.streetNumber && address.streetName !== '') {
                        streetNumberAndName += address.streetNumber;
                    }

                    if (address.streetName && address.streetName !== '') {
                        if (streetNumberAndName !== '') {
                            streetNumberAndName += ' ';
                        }

                        streetNumberAndName += address.streetName;
                    }

                    return streetNumberAndName;
                }

                return '';
            }
                       
            private static _filterSuggestions(results: AutocompletePrediction[], request: AutocompletionRequest): AutocompletePrediction[] {
                if (request) {
                    if (request.types && request.types.length > 0) {
                        var filtered = [];

                        results.forEach(r => {
                            for (var i = 0; i < r.types.length; i++) {
                                if (request.types.indexOf(r.types[i]) > -1) {
                                    filtered.push(r);
                                    break;
                                }
                            }
                        });

                        results = filtered;
                    }

                    if (request._strictBounds && request.bounds) {
                        var filtered = [];
                        var bbox = ConvertToG.bbox(ConvertToA.bbox(request.bounds));

                        results.forEach(r => {
                            if (bbox.contains(r._result.geometry.location)) {
                                filtered.push(r);
                            }
                        });

                        results = filtered;
                    }

                    if (request._limit && results.length > request._limit) {
                        return results.slice(0, request._limit);
                    }
                }

                return results;
            }
        }

        export class AutocompleteSessionToken { }

        interface AutocompletePrediction {
            description?: string;
            id?: string;
            matched_substrings?: PredictionSubstring[];
            place_id?: string;
            structured_formatting?: AutocompleteStructuredFormatting;
            terms?: PredictionSubstring[];
            types?: string[];
            distance_meters?: number;
            _result?: PlaceResult & GeocoderResult
        }

        interface PredictionSubstring {
            length: number;
            offset: number;
            value: string;
        }

        interface AutocompletionRequest {
            bounds?: LatLngBounds | LatLngBoundsLiteral;
            componentRestrictions?: ComponentRestrictions;
            input?: string;
            location?: LatLng | LatLngLiteral;
            offset?: number;
            radius?: number;
            sessionToken?: AutocompleteSessionToken;
            types?: string[];
            _limit?: number;
            _strictBounds?: boolean;
        }

        interface ComponentRestrictions {
            country: string | string[];
        }

        type LocationBias =
            | LatLng
            | LatLngLiteral
            | LatLngBounds
            | LatLngBoundsLiteral
            | Circle
            | CircleLiteral
            | string;

        interface PlaceAspectRating {
            rating: number;
            type: string;
        }

        interface PlacePlusCode {
            compound_code?: string;
            global_code: string;
        }

        interface PlaceDetailsRequest {
            placeId: string;
            fields?: string[];
            sessionToken?: AutocompleteSessionToken;
        }

        interface PlaceGeometry {
            location: LatLng;
            viewport: LatLngBounds;
            bounds: LatLngBounds;
            location_type: GeocoderLocationType;
        }

        interface PlacePhoto {
            height: number;
            html_attributions: string[];
            width: number;
            getUrl(opts: PhotoOptions): string;
        }

        interface PhotoOptions {
            maxHeight?: number;
            maxWidth?: number;
        }

        interface PlaceReview {
            aspects: PlaceAspectRating[];
            author_name: string;
            author_url: string;
            language: string;
            text: string;
        }

        export class PlaceSearchPagination {
            private _service: PlacesService;
            private _method: string;
            private _request: PlaceSearchRequest;
            private _callback: (
                results: PlaceResult[],
                status: PlacesServiceStatus,
                pagination: PlaceSearchPagination
            ) => void;
            private _offset: number = 0;

            constructor(
                service?: PlacesService,
                method?: string,
                request?: PlaceSearchRequest,
                callback?: (
                    results: PlaceResult[],
                    status: PlacesServiceStatus,
                    pagination: PlaceSearchPagination
                ) => void,
                offset?: number
            ) {
                if (typeof offset === 'number') {
                    this._service = service;
                    this._method = method;
                    this._request = request;
                    this._callback = callback;
                    this._offset = offset;
                    this.hasNextPage = true;
                }
            }

            public nextPage(): void {
                if (this.hasNextPage) {
                    this._service[this._method](this._request, this._callback, this._offset);
                }
            }

            public hasNextPage: boolean = false;
        }

        interface PlaceSearchRequest {
            bounds?: LatLngBounds | LatLngBoundsLiteral;
            keyword?: string;
            location?: LatLng | LatLngLiteral;
            maxPriceLevel?: number;
            minPriceLevel?: number;
            name?: string;
            openNow?: boolean;
            radius?: number;
            rankBy?: RankBy;
            types?: string[] /* Deprecated. Will be removed February 16, 2017 */;
            type?: string;
        }

        export class PlacesService {
            private searchURL: atlas.service.SearchURL;

            constructor(attrContainer?: HTMLDivElement | Map) {
                this.searchURL = new atlas.service.SearchURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
            }

            public findPlaceFromQuery(
                request: FindPlaceFromQueryRequest,
                callback: (results: PlaceResult[], status: PlacesServiceStatus) => void,
            ): void {
                if (!callback) {
                    return;
                }

                //POI search
                if (request.query && request.query !== '') {
                    var bias: LatLng;
                    var radius: number = undefined;

                    if (request.locationBias) {
                        if (request.locationBias['center']) {
                            //Circle literal
                            bias = ConvertToG.position(ConvertToA.latLng(request.locationBias['center']));
                            radius = request.locationBias['radius'];
                        } else if (request.locationBias instanceof google.maps.Circle) {
                            bias = request.locationBias.getCenter();
                            radius = request.locationBias.getRadius();
                        } else if (typeof request.locationBias === 'string') {
                            //Not supported.
                        } else {
                            bias = <LatLng>request.locationBias;
                        }
                    }

                    this.searchURL.searchPOI(atlas.service.Aborter.timeout(10000), request.query, {
                        lat: (bias) ? bias.lat() : undefined,
                        lon: (bias) ? bias.lng() : undefined,
                        radius: (radius) ? radius : undefined,
                        language: atlas.getLanguage(),
                        view: atlas.getView()
                    }).then(r => {
                        if (r.summary.numResults === 0) {
                            callback([], google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
                        } else {
                            var results = r.results.map(a => {
                                return google.maps.Geocoder._convertFuzzyResult(a);
                            });

                            callback(results, google.maps.places.PlacesServiceStatus.OK);
                        }
                    }, (e) => {
                        callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND);
                    });
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST);
                }
            }

            public nearbySearch(
                request: PlaceSearchRequest,
                callback: (
                    results: PlaceResult[],
                    status: PlacesServiceStatus,
                    pagination: PlaceSearchPagination
                ) => void,
                offset: number
            ): void {
                if (!callback) {
                    return;
                }
                
                if (!request.location && request.bounds) {
                    var bbox = ConvertToG.bbox(ConvertToA.bbox(request.bounds));
                    request.location = bbox.getCenter();
                    request.radius = google.maps.geometry.spherical.computeDistanceBetween(request.location, bbox.getNorthEast());
                }

                //Nearby search
                if (request.location) {
                    var pos = ConvertToA.latLng(request.location);
                    var opt = google.maps.places.AutocompleteService._convertRequest(request, false, offset);
                    var typeQuery: string;

                    if (request.types && request.types.length > 0) {
                        typeQuery = ConvertToA.poiType(request.types[0]);
                    }

                    if (typeQuery) {
                        this.searchURL.searchPOICategory(atlas.service.Aborter.timeout(10000), typeQuery, opt).then(this._getCallbackHandler(request, request.types, 'nearbySearch', callback), (e) => {
                            callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND, new google.maps.places.PlaceSearchPagination());
                        });
                    } else {
                        this.searchURL.searchNearby(atlas.service.Aborter.timeout(10000), pos, opt).then(this._getCallbackHandler(request, request.types, 'nearbySearch', callback), (e) => {
                            callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND, new google.maps.places.PlaceSearchPagination());
                        });
                    }
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST, new google.maps.places.PlaceSearchPagination());
                }
            }

            public textSearch(
                request: TextSearchRequest,
                callback: (
                    results: PlaceResult[],
                    status: PlacesServiceStatus,
                    pagination: PlaceSearchPagination
                ) => void,
                offset: number
            ): void {
                if (!callback) {
                    return;
                }

                //Fuzzy search
                if (request.query && request.query !== '') {
                    var opt = google.maps.places.AutocompleteService._convertRequest(request, false, offset);

                    this.searchURL.searchFuzzy(atlas.service.Aborter.timeout(10000), request.query, opt).then(this._getCallbackHandler(request, request.types, 'textSearch', callback), (e) => {
                        callback(null, google.maps.places.PlacesServiceStatus.NOT_FOUND, new google.maps.places.PlaceSearchPagination());
                    });
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST, new google.maps.places.PlaceSearchPagination());
                }
            }

            private _getCallbackHandler(request, types: string[], serviceType: string, callback: (
                results: PlaceResult[],
                status: PlacesServiceStatus,
                pagination: PlaceSearchPagination
            ) => void) {
                return (r) => {
                    if (r.summary.numResults === 0) {
                        callback([], google.maps.places.PlacesServiceStatus.ZERO_RESULTS, new google.maps.places.PlaceSearchPagination());
                    } else {
                        var results = r.results.map(a => {
                            return google.maps.Geocoder._convertFuzzyResult(a);
                        });

                        request.types = types;

                        results = google.maps.Geocoder._filterResults(results, request);

                        callback(results, google.maps.places.PlacesServiceStatus.OK, (r.summary.totalResults - r.summary.numResults + r.summary.offset > 0) ?
                            new google.maps.places.PlaceSearchPagination(this, serviceType, request, callback, r.summary.offset + 10) : new google.maps.places.PlaceSearchPagination());
                    }
                };
            }


            //Partially supported. Only searches against cache.
            public getDetails(
                request: PlaceDetailsRequest,
                callback: (result: PlaceResult, status: PlacesServiceStatus) => void,
            ): void {
                if (request.placeId) {
                    var cachedPlace = _placesCache[request.placeId];

                    if (cachedPlace) {
                        callback(Object.assign({}, cachedPlace), google.maps.places.PlacesServiceStatus.OK);
                    } else {
                        callback(null, google.maps.places.PlacesServiceStatus.ZERO_RESULTS);
                    }
                } else {
                    callback(null, google.maps.places.PlacesServiceStatus.INVALID_REQUEST);
                }
            }

            //Not supported

            public findPlaceFromPhoneNumber(
                request: FindPlaceFromPhoneNumberRequest,
                callback: (results: PlaceResult[], status: PlacesServiceStatus) => void,
            ): void {
                callback([], google.maps.places.PlacesServiceStatus.INVALID_REQUEST)
            }

            public radarSearch(
                request: RadarSearchRequest,
                callback: (results: PlaceResult[], status: PlacesServiceStatus) => void,
            ): void { }
        }

        export interface PlaceResult {
            address_components?: GeocoderAddressComponent[];
            adr_address?: string;
            // aspects?: PlaceAspectRating[];
            formatted_address?: string;
            formatted_phone_number?: string;
            geometry?: PlaceGeometry;
            // html_attributions?: string[];
            icon?: string;
            id?: string;
            international_phone_number?: string;
            name?: string;
            //opening_hours?: OpeningHours;
            //permanently_closed?: boolean;
            //photos?: PlacePhoto[];
            place_id?: string;
            //plus_code?: PlacePlusCode;
            //price_level?: number;
            //rating?: number;
            //reviews?: PlaceReview[];
            types?: string[];
            // url?: string;
            // user_ratings_total?: number;
            /**
             * @deprecated utc_offset is deprecated as of November 2019 and will be turned off in November 2020.
             *      Use PlaceResult.utc_offset_minutes instead.
             */
            // utc_offset?: number;
            // utc_offset_minutes?: number;
            // vicinity?: string;
            website?: string;
            _placeName?: string;
        }

        export enum PlacesServiceStatus {
            INVALID_REQUEST = 'INVALID_REQUEST',
            NOT_FOUND = 'NOT_FOUND',
            OK = 'OK',
            OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
            REQUEST_DENIED = 'REQUEST_DENIED',
            UNKNOWN_ERROR = 'UNKNOWN_ERROR',
            ZERO_RESULTS = 'ZERO_RESULTS',
        }

        interface RadarSearchRequest {
            bounds?: LatLngBounds | LatLngBoundsLiteral;
            keyword?: string;
            location?: LatLng | LatLngLiteral;
            name?: string;
            radius?: number;
            types?: string[] /* Deprecated. Will be removed February 16, 2017 */;
            type?: string;
        }

        export enum RankBy {
            PROMINENCE = 0,
            DISTANCE = 1,
        }

        export class Autocomplete extends MVCObject {

            private _inputField: HTMLInputElement;
            private _itemContainer: HTMLDivElement;
            private _service: google.maps.places.AutocompleteService;
            private _cache: { [key: string]: AutocompletePrediction[] } = {};
            private _minChar = 3;
            private _minTimeDelay = 300;
            private _currentFocus = -1;
            private _maxSuggestions = 5;
            private _skipInput = false;
            private _delayHandler: number;
            public _searchOnEnter = false;
            private _searchService: google.maps.places.PlacesService;

            constructor(inputField: HTMLInputElement, opts?: AutocompleteOptions) {
                super();
                this._service = new google.maps.places.AutocompleteService();
                this._inputField = inputField;

                this.set('place', null);
                this.set('strictBounds', true);

                this.setOptions(opts);

                this.changed = (property: string) => {
                    switch (property) {
                        case 'bounds':
                        case 'componentRestrictions':
                        case 'fields':
                        case 'types':
                        case 'strictBounds':
                            this._cache = {};
                            this._closeList();
                            break;
                        case 'place':
                            google.maps.event.trigger(this, 'place_changed', null);
                            break;
                        case 'places':
                            google.maps.event.trigger(this, 'places_changed', null);
                            break;
                    }
                };

                this._attachInput();
            }

            public getBounds(): LatLngBounds {
                return this.get('bounds');
            }

            public getPlace(): PlaceResult {
                return this.get('place');
            }

            public setBounds(bounds: LatLngBounds | LatLngBoundsLiteral): void {
                this.set('bounds', ConvertToG.bbox(ConvertToA.bbox(bounds)));
            }

            public setComponentRestrictions(restrictions: ComponentRestrictions): void {
                this.set('componentRestrictions', restrictions);
            }

            public setFields(fields: string[] | undefined): void {
                this.set('fields', fields);
            }

            public setOptions(options: AutocompleteOptions): void {
                if (options) {
                    Object.keys(options).forEach(key => {
                        if (this.get(key) !== options[key]) {
                            if (key === 'bounds') {
                                this.set('bounds', ConvertToG.bbox(ConvertToA.bbox(options.bounds)));
                            } else {
                                this.set(key, options[key]);
                            }
                        }
                    });
                }
            }

            public setTypes(types: string[]): void {
                this.set('types', types);
            }

            private _attachInput(): void {
                var self = this;

                if (self._inputField) {                   
                    self._inputField.setAttribute('autocomplete', 'off');

                    self._inputField.addEventListener('input', this._onInput);
                    self._inputField.addEventListener('click', this._onInput);
                    self._inputField.addEventListener('keydown', this._keydown);
                    document.addEventListener('click', this._closeList);

                    self._inputField.setAttribute('auto-capitalize', 'off');
                    self._inputField.setAttribute('aria-atuocomplete', 'both');
                    self._inputField.setAttribute('aria-expanded', 'false');
                    self._inputField.setAttribute('spellcheck', 'false');
                    self._inputField.setAttribute('role', 'combobox');
                    self._inputField.setAttribute('aria-live', 'polite');   

                    if (!self._inputField.title) {
                        if (self._inputField.placeholder) {
                            self._inputField.setAttribute('title', self._inputField.placeholder);
                        } else {
                            self._inputField.setAttribute('title', 'Enter your search term');
                        }
                    }

                    if (!self._inputField.id) {
                        self._inputField.id = 'atlas-autocomplete-' + _counter;
                        _counter++;
                    }
                   
                    /*create a DIV element that will contain the items (values):*/
                    self._itemContainer = <HTMLDivElement>document.createElement('DIV');

                    self._itemContainer.id = self._inputField.id + '-container';
                    self._inputField.setAttribute('aria-owns', self._itemContainer.id);
                    self._inputField.setAttribute('aria-controls', self._itemContainer.id);    

                    self._itemContainer.setAttribute('class', 'pac-card');
                    self._itemContainer.setAttribute('aria-label', 'Suggestions');                    
                    
                    self._itemContainer.setAttribute('class', 'pac-container');
                    self._resizeContainer();

                    /*append the DIV element as a child of the autocomplete container:*/
                    document.body.appendChild(self._itemContainer);
                }
            }

            private _resizeContainer(): void {
                var rect = this._inputField.getBoundingClientRect();

                Object.assign(this._itemContainer.style, {
                    width: rect.width + 'px',
                    /*position the autocomplete items to be the same width as the container:*/
                    top: (rect.top + rect.height) + 'px',
                    left: rect.left + 'px'
                });
            }

            private _closeList = () => {
                var items = this._itemContainer.children;
                
                for (var i = items.length - 1; i >= 0; i--) {
                    items[i].parentNode.removeChild(items[i]);
                }

                this._itemContainer.setAttribute('aria-expanded', 'false');
                this._inputField.setAttribute('aria-activedescendent', null);
            };

            private _onInput = (e) => {
                //Stop any previous suggestions from being requested until we know the user has paused typing.
                if (this._delayHandler) {
                    clearTimeout(this._delayHandler);
                    this._delayHandler = null;
                }

                if (this._skipInput) {
                    this._skipInput = false;
                    return;
                }

                var val = this._inputField.value;

                if (!val || val === '') {
                    this._currentFocus = -1;
                    this._closeList();
                    return false;
                }

                var query = (this._inputField.value) ? this._inputField.value.trim().toLowerCase() : '';

                //Throttle queries to the service based on typing speed. This will reduce queries made when the user is typing multiple characters.
                if (!this._cache[query]) {
                    this._delayHandler = setTimeout(this._getSuggestions, this._minTimeDelay);
                } else {
                    this._getSuggestions();
                }

                e.stopPropagation();
            };

            private _keydown = (e) => {
                var items = this._itemContainer.getElementsByTagName("div");

                if (items && items.length > 0) {
                    if (e.keyCode == 40) {
                        /*If the arrow DOWN key is pressed, increase the currentFocus variable:*/
                        this._currentFocus++;
                        /*and and make the current item more visible:*/
                        this._setActive(items);
                        e.preventDefault();
                    } else if (e.keyCode == 38) { //up
                        /*If the arrow UP key is pressed,
                        decrease the currentFocus variable:*/
                        this._currentFocus--;
                        /*and and make the current item more visible:*/
                        this._setActive(items);
                        e.preventDefault();
                    } else if (e.keyCode == 13) {
                        if (this._searchOnEnter) {
                            this._search();
                        } else {
                            if (this._currentFocus > -1) {
                                /*and simulate a click on the "active" item:*/
                                if (items) {
                                    items[this._currentFocus].click();
                                }
                            }
                        }

                        /*If the ENTER key is pressed, prevent the form from being submitted,*/
                        e.preventDefault();
                    }
                }
            };

            private _getSuggestions = () => {
                var self = this;

                var query = (self._inputField.value) ? self._inputField.value.trim().toLowerCase() : '';

                if (query !== '' && query.length >= self._minChar) {
                    var c = self._cache[query];

                    if (c) {
                        self._renderSuggestions(c);
                    } else {
                        var poi = false;

                        var request = <AutocompletionRequest>{
                            input: query,
                            bounds: self.get('bounds'),
                            componentRestrictions: self.get('componentRestrictions'),
                            _limit: self._maxSuggestions,
                            _strictBounds: self.get('strictBounds'),
                            types: self.get('types')
                        };

                        if (poi) {
                            //poi -> getPlacePredictions
                            this._service.getPlacePredictions(request, (results => {
                                self._cache[query] = results;
                                self._renderSuggestions(results);
                            }));
                        } else {
                            //fuzzy -> getQueryPredictions
                            this._service.getQueryPredictions(request, (results => {
                                self._cache[query] = results;
                                self._renderSuggestions(results);
                            }));
                        }
                    }
                } else {
                    self._closeList();
                }
            };

            private _renderSuggestions = (suggestions: AutocompletePrediction[]) => {
                var self = this;

                self._currentFocus = -1;
                self._closeList();

                if (suggestions && suggestions.length > 0) {

                    /*for each item in the array...*/
                    for (var i = 0; i < suggestions.length; i++) {
                        /*create a DIV element for each matching element:*/
                        var item = <HTMLDivElement>document.createElement("DIV");
                        item.setAttribute('class', 'pac-item');
                        item.setAttribute('role', 'option');
                        item.setAttribute('aria-selected', 'false');

                        item.id = self._inputField.id + '-item-' + i;

                        item.setAttribute('aria-label', suggestions[i].description);
                        
                        var match: string = '';
                        var q1: string = '';
                        var q2: string = '';

                        if (suggestions[i].structured_formatting.main_text_matched_substrings && suggestions[i].structured_formatting.main_text_matched_substrings.length > 0) {
                            var ss = suggestions[i].structured_formatting.main_text_matched_substrings[0];
                            var mt = suggestions[i].structured_formatting.main_text;

                            if (ss.offset + ss.length < mt.length) {
                                q2 = mt.substr(ss.offset + ss.length);
                            }

                            match = mt.substr(ss.offset, ss.length);

                            if (ss.offset > 0) {
                                q1 = mt.substr(0, ss.offset);
                            }
                        } else {
                            q1 = suggestions[i].structured_formatting.main_text;
                        }
                        
                        /*insert a input field that will hold the current array item's value:*/
                        item.innerHTML = `<span aria-hidden="true" class="pac-icon"></span><span aria-hidden="true" class="pac-item-query">${q1}<span aria-hidden="true" class="pac-matched">${match}</span>${q2}</span><span aria-hidden="true">${suggestions[i].structured_formatting.secondary_text || ''}</span>`;
                        item.setAttribute('rel', i.toString());

                        /*execute a function when someone clicks on the item value (DIV element):*/
                        item.addEventListener('click', (e) => {
                            var elm = <HTMLElement>e.target;

                            if (!elm.classList.contains('pac-item')) {
                                while (elm && !elm.classList.contains('pac-item')) {
                                    elm = elm.parentElement;
                                }
                            }

                            if (elm) {
                                var suggestion = suggestions[parseInt(elm.getAttribute('rel'))];
                                self.set('place', suggestion._result);
                                self.set('places', [suggestion._result]);

                                /*insert the value for the autocomplete text field:*/
                                self._skipInput = true;
                                self._inputField.value = suggestion.structured_formatting.main_text;

                                /*close the list of autocompleted values, (or any other open lists of autocompleted values:*/
                                self._closeList();
                            }
                        });
                        
                        item.addEventListener('mouseenter', (e) => {
                            var items = self._itemContainer.getElementsByTagName("div");
                            self._currentFocus = parseInt((<HTMLDivElement>e.target).getAttribute('rel'));
                            self._setActive(items);
                        });

                        self._itemContainer.appendChild(item);
                    }

                    self._itemContainer.setAttribute('aria-expanded', 'true');

                    self._resizeContainer();
                } else {
                    this._closeList();
                }
            };

            private _setActive(items: HTMLCollectionOf<HTMLDivElement>): void {
                /*a function to classify an item as "active":*/
                if (!items) {
                    return;
                }
                /*start by removing the "active" class on all items:*/
                this._removeActive(items);

                if (this._currentFocus >= items.length) {
                    this._currentFocus = 0;
                }

                if (this._currentFocus < 0) {
                    this._currentFocus = (items.length - 1);
                }

                /*add class "autocomplete-active":*/
                items[this._currentFocus].classList.add('pac-item-selected');
                items[this._currentFocus].setAttribute('aria-selected', 'true');

                this._inputField.setAttribute('aria-activedescendent', items[this._currentFocus].id);
            }

            private _removeActive(items: HTMLCollectionOf<HTMLDivElement>) {
                /*a function to remove the "active" class from all autocomplete items:*/
                for (var i = 0; i < items.length; i++) {
                    items[i].classList.remove('pac-item-selected');
                    items[i].setAttribute('aria-selected', 'false');
                }
                this._inputField.setAttribute('aria-activedescendent', null);
            }

            private _search = () => {
                var self = this;

                self._closeList();

                var query = (self._inputField.value) ? self._inputField.value.trim().toLowerCase() : '';

                if (query !== '' && query.length >= self._minChar) {
                    var request = <TextSearchRequest>{
                        query: query,
                        bounds: self.get('bounds')
                    };

                    if (!self._searchService) {
                        self._searchService = new google.maps.places.PlacesService();
                    }

                    self._searchService.textSearch(request, this._handleSearchResults, 0);
                }
            };

            private _handleSearchResults = (results: PlaceResult[], status: PlacesServiceStatus, pagination: PlaceSearchPagination) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    this.set('places', results);
                }
            };
        }

        export class SearchBox extends Autocomplete {
            constructor(inputField: HTMLInputElement, opts?: SearchBoxOptions) {
                super(inputField, opts);
                this._searchOnEnter = true;
            }

            public getPlaces(): PlaceResult[] {
                return this.get('places');
            }
        }

        interface SearchBoxOptions {
            bounds: LatLngBounds | LatLngBoundsLiteral;
        }
        
        interface FindPlaceFromQueryRequest {
            fields?: string[];
            locationBias?: LocationBias;
            query: string;
        }

        //Not supported

        interface TextSearchRequest {
            bounds?: LatLngBounds | LatLngBoundsLiteral;
            location?: LatLng | LatLngLiteral;
            query?: string;
            radius?: number;
            types?: string[] /* Deprecated. Will be removed February 16, 2017 */;
            type?: string;
            _strictBounds?: boolean;
        }

        interface FindPlaceFromPhoneNumberRequest {
            fields: string[];
            locationBias?: LocationBias;
            phoneNumber: string;
        }

        interface AutocompleteOptions {
            bounds?: LatLngBounds | LatLngBoundsLiteral;
            componentRestrictions?: ComponentRestrictions;
            placeIdOnly?: boolean;
            strictBounds?: boolean;
            types?: string[];
            //  type?: string;
            fields?: string[];
        }

        interface AutocompleteStructuredFormatting {
            main_text: string;
            main_text_matched_substrings: PredictionSubstring[];
            secondary_text: string;
            secondary_text_matched_substrings?: PredictionSubstring[];
        }

        interface OpeningHours {
            /**
             * @deprecated open_now is deprecated as of November 2019 and will be turned off in November 2020.
             *      Use the PlaceOpeningHours.isOpen function from a PlacesService.getDetails result instead.
             */
            // open_now: boolean;
            periods: OpeningPeriod[];
            weekday_text: string[];
            isOpen(date?: Date): boolean;
        }

        interface OpeningPeriod {
            open: OpeningHoursTime;
            close?: OpeningHoursTime;
        }

        interface OpeningHoursTime {
            day: number;
            hours: number;
            minutes: number;
            nextDate: number;
            time: string;
        }
    }

    export class DistanceMatrixService {

        private searchURL: atlas.service.SearchURL;
        private routeURL: atlas.service.RouteURL;

        constructor() {
            this.searchURL = new atlas.service.SearchURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
            this.routeURL = new atlas.service.RouteURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
        }

        public getDistanceMatrix(
            request: DistanceMatrixRequest,
            callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void,
        ): void {
            this._getDistanceMatrix(request, callback).then();
        }

        private async _getDistanceMatrix(request: DistanceMatrixRequest, callback: (response: DistanceMatrixResponse, status: DistanceMatrixStatus) => void): Promise<void> {

            var origins = await google.maps.DirectionsService._getWaypoints(this.searchURL, request.origins, request.region);
            var destinations = await google.maps.DirectionsService._getWaypoints(this.searchURL, request.destinations, request.region);

            try {
                var r = await this.routeURL.calculateRouteMatrix(atlas.service.Aborter.timeout(10000), {
                    origins: <atlas.service.Models.MultiPoint>new atlas.data.MultiPoint(origins),
                    destinations: <atlas.service.Models.MultiPoint>new atlas.data.MultiPoint(destinations)
                }, google.maps.DirectionsService._convertRequestOptions(request));

                callback(google.maps.DistanceMatrixService._convertResult(request, r), google.maps.DistanceMatrixStatus.OK);
            } catch {
                callback(null, google.maps.DistanceMatrixStatus.INVALID_REQUEST);
            }
        }

        private static _convertResult(request: DistanceMatrixRequest, result: atlas.service.CalculateRouteMatrixResponse): DistanceMatrixResponse {

            var r: DistanceMatrixResponse = {
                destinationAddresses: google.maps.DirectionsService._getAddresses(request.destinations),
                originAddresses: google.maps.DirectionsService._getAddresses(request.origins),
                rows: []
            };

            result.matrix.forEach(row => {
                var rowCells: DistanceMatrixResponseRow = {
                    elements: []
                };

                row.forEach(c => {
                    if (c.response && c.response.routeSummary && c.response.routeSummary.arrivalTime) {
                        rowCells.elements.push({
                            distance: {
                                text: google.maps.DirectionsService._formatDistance(c.response.routeSummary.lengthInMeters, (request.unitSystem && request.unitSystem === google.maps.UnitSystem.IMPERIAL) ? 'imperial' : 'metric'),
                                value: c.response.routeSummary.lengthInMeters
                            },
                            duration: {
                                text: google.maps.DirectionsService._formatTimespan(c.response.routeSummary.noTrafficTravelTimeInSeconds),
                                value: c.response.routeSummary.noTrafficTravelTimeInSeconds
                            },
                            duration_in_traffic: {
                                text: google.maps.DirectionsService._formatTimespan(c.response.routeSummary.travelTimeInSeconds),
                                value: c.response.routeSummary.travelTimeInSeconds
                            },
                            status: google.maps.DistanceMatrixElementStatus.NOT_FOUND
                        });
                    } else {
                        rowCells.elements.push({
                            status: google.maps.DistanceMatrixElementStatus.NOT_FOUND
                        });
                    }
                });

                r.rows.push(rowCells);
            });

            return r;
        }
    }

    interface DistanceMatrixRequest {
        avoidFerries?: boolean;
        avoidHighways?: boolean;
        avoidTolls?: boolean;
        destinations?: string[] | LatLng[] | LatLngLiteral[] | Place[];
        drivingOptions?: DrivingOptions;
        durationInTraffic?: boolean;
        origins?: string[] | LatLng[] | LatLngLiteral[] | Place[];
        region?: string;
        transitOptions?: TransitOptions;
        travelMode?: TravelMode;
        unitSystem?: UnitSystem;
    }

    interface DistanceMatrixResponse {
        destinationAddresses: string[];
        originAddresses: string[];
        rows: DistanceMatrixResponseRow[];
    }

    interface DistanceMatrixResponseRow {
        elements: DistanceMatrixResponseElement[];
    }

    interface DistanceMatrixResponseElement {
        distance?: Distance;
        duration?: Duration;
        duration_in_traffic?: Duration;
        //fare: TransitFare;
        status: DistanceMatrixElementStatus;
    }

    export enum DistanceMatrixStatus {
        INVALID_REQUEST = 'INVALID_REQUEST',
        MAX_DIMENSIONS_EXCEEDED = 'MAX_DIMENSIONS_EXCEEDED',
        MAX_ELEMENTS_EXCEEDED = 'MAX_ELEMENTS_EXCEEDED',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    }

    export enum DistanceMatrixElementStatus {
        NOT_FOUND = 'NOT_FOUND',
        OK = 'OK',
        ZERO_RESULTS = 'ZERO_RESULTS',
    }

    interface Place {
        location?: LatLng | LatLngLiteral;
        placeId?: string;
        query?: string;
    }

    export class DirectionsService {
        private searchURL: atlas.service.SearchURL;
        private routeURL: atlas.service.RouteURL;

        constructor() {
            this.searchURL = new atlas.service.SearchURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
            this.routeURL = new atlas.service.RouteURL(atlas.service.MapsURL.newPipeline(new atlas.service.SubscriptionKeyCredential(atlas.getSubscriptionKey())));
        }

        public route(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): void {
            this._calculateRoute(request, callback).then();
        }

        private async _calculateRoute(request: DirectionsRequest, callback: (result: DirectionsResult, status: DirectionsStatus) => void): Promise<void> {
            var origin = await google.maps.DirectionsService._getWaypoint(this.searchURL, request.origin, request.region);
            var destination = await google.maps.DirectionsService._getWaypoint(this.searchURL, request.destination, request.region);
            var waypoints: atlas.data.Position[] = [origin];

            if (request.waypoints) {
                var wps = await google.maps.DirectionsService._getWaypoints(this.searchURL, request.waypoints, request.region);
                waypoints = waypoints.concat(wps);
            }

            waypoints.push(destination);

            if (origin && destination) {
                try {
                    var opts = google.maps.DirectionsService._convertRequestOptions(request);
                    opts.instructionsType = <atlas.service.Models.RouteInstructionsType>'text';

                    var r = await this.routeURL.calculateRouteDirections(atlas.service.Aborter.timeout(10000), waypoints, opts);

                    callback(google.maps.DirectionsService._convertResponse(request, r), google.maps.DirectionsStatus.OK);
                } catch (e) {
                    console.log(e);
                    callback(null, google.maps.DirectionsStatus.UNKNOWN_ERROR);
                }
            } else {
                callback(null, google.maps.DirectionsStatus.INVALID_REQUEST);
            }
        }

        public static async _getWaypoints(searchURL: atlas.service.SearchURL, waypoints: (string | LatLng | LatLngLiteral | Place | DirectionsWaypoint)[], region: string): Promise<atlas.data.Position[]> {
            var pos: atlas.data.Position[] = [];

            var promises: Promise<atlas.data.Position>[] = [];

            for (var i = 0; i < waypoints.length; i++) {
                promises.push(google.maps.DirectionsService._getWaypoint(searchURL, waypoints[i], region));
            }

            var wps = await Promise.all(promises);

            for (var i = 0; i < wps.length; i++) {
                if (wps[i] !== null) {
                    pos.push(wps[i]);
                }
            }

            return pos;
        }

        public static async _getWaypoint(searchURL: atlas.service.SearchURL, waypoint: string | LatLng | LatLngLiteral | Place | DirectionsWaypoint, region: string): Promise<atlas.data.Position> {
            var query: string;

            if (typeof waypoint['placeId'] === 'string') {
                var cachedPlace = _placesCache[waypoint['placeId']];

                if (cachedPlace) {
                    return ConvertToA.latLng(cachedPlace.geometry.location);
                }
            } else if (waypoint['location'] && typeof waypoint['location']['placeId'] === 'string') {
                var cachedPlace = _placesCache[waypoint['location']['placeId']];

                if (cachedPlace) {
                    return ConvertToA.latLng(cachedPlace.geometry.location);
                }
            }

            if (typeof waypoint === 'string') {
                if (/\(?[-0-9]+\.?[0-9]*[,\s]+[-0-9]+\.?[0-9]*\)?/.test(waypoint)) {
                    var parts = waypoint.replace('(', '').replace(')', '').split(/[,\s]+/);
                    if (parts.length === 2) {
                        return [parseFloat(parts[0]), parseFloat(parts[1])];
                    }
                }

                query = waypoint;
            } else if (waypoint['location']) {
                if (typeof waypoint['location'] === 'string') {
                    query = waypoint['location'];
                } else if (waypoint['location']['location']) {
                    return ConvertToA.latLng(waypoint['location']['location']);
                } else {
                    return ConvertToA.latLng(waypoint['location']);
                }
            } else if (waypoint['query']) {
                query = waypoint['query'];
            } else {
                return ConvertToA.latLng(<LatLng | LatLngLiteral>waypoint);
            }

            if (query && query !== '') {
                var r = await searchURL.searchFuzzy(atlas.service.Aborter.timeout(10000), query, {
                    language: atlas.getLanguage(),
                    view: atlas.getView(),
                    countrySet: (region && region !== '') ? [region] : undefined,
                    limit: 1,
                    lat: 0,
                    lon: 0
                });

                if (r.results && r.results.length > 0) {
                    return [r.results[0].position.lon, r.results[0].position.lat];
                }
            }

            return null;
        }

        public static _convertRequestOptions(request: DirectionsRequest): atlas.service.Models.RouteGetRouteDirectionsOptionalParams {
            var r: atlas.service.Models.RouteGetRouteDirectionsOptionalParams = {
                language: atlas.getLanguage(),
                view: atlas.getView()
            };

            if (typeof request.avoidFerries === 'boolean') {
                r.avoid = <atlas.service.Models.Avoid>'ferries';
            }

            if (typeof request.avoidHighways === 'boolean') {
                r.avoid = <atlas.service.Models.Avoid>'motorways';
            }

            if (typeof request.avoidTolls === 'boolean') {
                r.avoid = <atlas.service.Models.Avoid>'tollRoads';
            }

            if (request.drivingOptions) {
                if (request.drivingOptions.departureTime) {
                    r.departAt = request.drivingOptions.departureTime;
                }

                if (request.drivingOptions.trafficModel) {
                    r.traffic = true;
                }
            }

            if (typeof request.optimizeWaypoints === 'boolean') {
                r.computeBestOrder = request.optimizeWaypoints;
            }

            if (typeof request.provideRouteAlternatives === 'boolean') {
                r.maxAlternatives = 5;
            }

            if (request.travelMode) {
                switch (request.travelMode) {
                    case google.maps.TravelMode.BICYCLING:
                        r.travelMode = <atlas.service.Models.TravelMode>'bicycle';
                        break;
                    case google.maps.TravelMode.TWO_WHEELER:
                        r.travelMode = <atlas.service.Models.TravelMode>'motorcycle';
                        break;
                    case google.maps.TravelMode.WALKING:
                        r.travelMode = <atlas.service.Models.TravelMode>'pedestrian';
                        break;
                    case google.maps.TravelMode.DRIVING:
                        r.travelMode = <atlas.service.Models.TravelMode>'car';
                    default:
                        break;
                }
            }

            return r;
        }

        public static _convertResponse(request: DirectionsRequest, response: atlas.service.Models.RouteDirectionsResponse): DirectionsResult {
            var r: DirectionsResult = {
                routes: []
            };

            if (response.routes.length > 0) {
                var t: any = [request.origin];
                if (request.waypoints) {
                    t = t.concat(request.waypoints);
                }
                t.push(request.destination);

                var names: string[] = google.maps.DirectionsService._getAddresses(t);

                var waypoint_order: number[];
                //@ts-ignore
                var units: 'imperial' | 'metric' = (request.unitSystem && request.unitSystem === google.maps.UnitSystem.METRIC) ? 'metric' : 'imperial';

                if (response.optimizedWaypoints) {
                    waypoint_order = [0];

                    var n = [names[0]];

                    response.optimizedWaypoints.map(wp => {
                        waypoint_order[wp.providedIndex + 1] = wp.optimizedIndex + 1;
                        n[wp.providedIndex + 1] = names[wp.optimizedIndex + 1];
                    });

                    waypoint_order.push(response.optimizedWaypoints.length + 1);
                    n.push(names[names.length - 1]);

                    names = n;
                }

                response.routes.forEach(route => {
                    var legs: DirectionsLeg[] = [];
                    var path: LatLng[] = [];
                    var legPaths: atlas.data.Position[][] = [];

                    route.legs.forEach((leg, idx) => {
                        var positionPath: atlas.data.Position[] = [];

                        leg.points.forEach(c => {
                            path.push(new google.maps.LatLng(c.latitude, c.longitude));
                            positionPath.push([c.longitude, c.latitude]);
                        });

                        legPaths.push(positionPath);

                        legs.push({
                            arrival_time: {
                                text: leg.summary.arrivalTime,
                                time_zone: new Date(Date.parse(leg.summary.arrivalTime)).getTimezoneOffset().toString(),
                                value: new Date(Date.parse(leg.summary.arrivalTime))
                            },
                            departure_time: {
                                text: leg.summary.departureTime,
                                time_zone: new Date(Date.parse(leg.summary.departureTime)).getTimezoneOffset().toString(),
                                value: new Date(Date.parse(leg.summary.departureTime))
                            },
                            distance: {
                                text: google.maps.DirectionsService._formatDistance(leg.summary.lengthInMeters, units),
                                value: leg.summary.lengthInMeters
                            },
                            duration: {
                                text: google.maps.DirectionsService._formatTimespan(leg.summary.noTrafficTravelTimeInSeconds),
                                value: leg.summary.noTrafficTravelTimeInSeconds
                            },
                            duration_in_traffic: {
                                text: google.maps.DirectionsService._formatTimespan(leg.summary.travelTimeInSeconds),
                                value: leg.summary.travelTimeInSeconds
                            },
                            end_address: names[idx + 1],
                            end_location: new google.maps.LatLng(leg.points[leg.points.length - 1].latitude, leg.points[leg.points.length - 1].longitude),
                            start_address: names[idx],
                            start_location: new google.maps.LatLng(leg.points[0].latitude, leg.points[0].longitude),
                            steps: [],
                            via_waypoints: null
                        });
                    });

                    var legIdx = 0;
                    var traveledDistance = 0;
                    var traveledTime = 0;

                    route.guidance.instructions.forEach((ins, idx) => {
                        legIdx = google.maps.DirectionsService._getLegIndex(legIdx, [ins.point.longitude, ins.point.longitude], legPaths);

                        legs[legIdx].steps.push({
                            distance: {
                                text: google.maps.DirectionsService._formatDistance(ins.routeOffsetInMeters - traveledDistance, units),
                                value: ins.routeOffsetInMeters - traveledDistance
                            },
                            duration: {
                                text: google.maps.DirectionsService._formatTimespan(ins.travelTimeInSeconds - traveledTime),
                                value: ins.travelTimeInSeconds - traveledTime
                            },
                            instructions: ins.message,
                            path: ConvertToG.positions(legPaths[legIdx]),
                            start_location: new google.maps.LatLng(ins.point.latitude, ins.point.longitude),
                            end_location: (idx === route.guidance.instructions.length - 1) ? new google.maps.LatLng(ins.point.latitude, ins.point.longitude) : new google.maps.LatLng(route.guidance.instructions[idx + 1].point.latitude, route.guidance.instructions[idx + 1].point.longitude),
                            steps: null,
                            travel_mode: request.travelMode
                        });

                        traveledDistance = ins.routeOffsetInMeters;
                        traveledTime = ins.travelTimeInSeconds;
                    });

                    r.routes.push({
                        bounds: ConvertToG.bbox(atlas.data.BoundingBox.fromPositions(ConvertToA.latLngs(path))),
                        copyrights: response.copyright,
                        legs: legs,
                        overview_path: path,
                        overview_polyline: google.maps.geometry.encoding.encodePath(path),
                        waypoint_order: waypoint_order
                    });
                });
            }

            return r;
        }

        public static _getLegIndex(legIdx: number, position: atlas.data.Position, legPaths: atlas.data.Position[][]): number {
            var minDistance = Number.MAX_VALUE;
            var legIdx = 0;

            legPaths.forEach((path, idx) => {
                if (idx >= legIdx) {
                    path.forEach(c => {
                        let d = atlas.math.getDistanceTo(position, c);

                        if (d < minDistance) {
                            legIdx = idx;
                            minDistance = d;
                        }
                    });
                }
            });

            return legIdx;
        }

        public static _getAddresses(waypoints: (string | LatLng | LatLngLiteral | Place | DirectionsWaypoint)[]): string[] {
            return waypoints.map(waypoint => {
                if (typeof waypoint === 'string') {
                    return waypoint;
                } else if (waypoint['location']) {
                    if (typeof waypoint['location'] === 'string') {
                        return waypoint['location'];
                    } else if (waypoint['location']['location']) {
                        return ConvertToG.position(ConvertToA.latLng(waypoint['location']['location'])).toString();
                    } else {
                        return ConvertToG.position(ConvertToA.latLng(waypoint['location'])).toString();
                    }
                } else if (waypoint['query']) {
                    return waypoint['query'];
                }

                return ConvertToG.position(ConvertToA.latLng(<LatLng | LatLngLiteral>waypoint)).toString();
            });
        }

        public static _formatDistance(distanceMeters: number, units: 'metric' | 'imperial'): string {
            if (distanceMeters === 0) {
                return '';
            }

            if (units === 'imperial') {  //miles/feet
                //Use miles for distances of 0.1 miles or more, use feet for shorter distances.
                if (distanceMeters >= 160.9344) { //use miles
                    var miles = distanceMeters * 0.00062137;

                    //Show one decimal is less than 100 miles.
                    if (miles < 100) {
                        miles = Math.round(miles * 10) / 10;
                    } else {
                        miles = Math.round(miles);
                    }

                    return `${miles.toLocaleString()} mi`;
                }

                return `${Math.round(distanceMeters * 3.2808399)} ft`;
            } else {    //KM/meters
                //Use km for distances of 0.1 km or more, use feet for shorter distances.
                if (distanceMeters >= 100) { //use miles
                    var km = distanceMeters * 0.001;

                    //Show one decimal if less than 100 km.
                    if (km < 100) {
                        km = Math.round(km * 10) / 10;
                    } else {
                        km = Math.round(km);
                    }

                    return `${km.toLocaleString()} km`;
                }

                return `${distanceMeters} m`;
            }
        }

        public static _formatTimespan(timeInSeconds: number): string {
            var t = '';
            var days: number = 0, hours: number = 0, mins: number = 0;

            var res: any = {
                min: "min",
                mins: "mins",
                hr: "hr",
                hrs: "hrs",
                days: "days",
                day: "day"
            };

            //If travel time is more than 24 hours, format as 'x day(s) y hour(s)'
            if (timeInSeconds > 86400) {
                days = Math.round(timeInSeconds / 86400);
                hours = Math.round((timeInSeconds % 86400) / 3600);
            } else if (timeInSeconds > 3600) { //If time is greater than an hour, format as 'x hour(s) y min(s)'
                hours = Math.round(timeInSeconds / 3600);
                mins = Math.round((timeInSeconds % 3600) / 60);
            } else {
                //format as 'min(s}'
                mins = Math.round(timeInSeconds / 60);
            }

            if (days > 0) {
                t += days;

                if (days === 1) {
                    t += ' ' + res.day;
                } else {
                    t += ' ' + res.days;
                }
            }

            if (hours > 0) {
                if (t.length > 0) {
                    t += ' ';
                }

                t += hours;

                if (hours === 1) {
                    t += ' ' + res.hr;
                } else {
                    t += ' ' + res.hrs;
                }
            }

            if (mins > 0) {
                if (t.length > 0) {
                    t += ' ';
                }

                t += mins;

                if (mins === 1) {
                    t += ' ' + res.min;
                } else {
                    t += ' ' + res.mins;
                }
            }

            if (mins === 0 && hours === 0 && days === 0) {
                t = '0 ' + res.min;
            }

            return t;
        }
    }

    /** A directions query to be sent to the DirectionsService. */
    interface DirectionsRequest {
        /**
         * If true, instructs the Directions service to avoid ferries where
         * possible. Optional.
         */
        avoidFerries?: boolean;
        /**
         * If true, instructs the Directions service to avoid highways where
         * possible. Optional.
         */
        avoidHighways?: boolean;
        /**
         * If true, instructs the Directions service to avoid toll roads where
         * possible. Optional.
         */
        avoidTolls?: boolean;
        /**
         * Location of destination. This can be specified as either a string to be
         * geocoded, or a LatLng, or a Place. Required.
         */
        destination?: string | LatLng | LatLngLiteral | Place;
        /** Deprecated. Use drivingOptions field instead */
        durationInTraffic?: boolean;
        /**
         * Settings that apply only to requests where travelMode is DRIVING. This
         * object will have no effect for other travel modes.
         */
        drivingOptions?: DrivingOptions;
        /**
         * If set to true, the DirectionService will attempt to re-order the
         * supplied intermediate waypoints to minimize overall cost of the route. If
         * waypoints are optimized, inspect DirectionsRoute.waypoint_order in the
         * response to determine the new ordering.
         */
        optimizeWaypoints?: boolean;
        /**
         * Location of origin. This can be specified as either a string to be
         * geocoded, or a LatLng, or a Place. Required.
         */
        origin?: string | LatLng | LatLngLiteral | Place;
        /** Whether or not route alternatives should be provided. Optional. */
        provideRouteAlternatives?: boolean;
        /** Region code used as a bias for geocoding requests. Optional. */
        region?: string;
        /**
         * Settings that apply only to requests where travelMode is TRANSIT. This
         * object will have no effect for other travel modes.
         */
        transitOptions?: TransitOptions;
        /** Type of routing requested. Required. */
        travelMode?: TravelMode;
        /**
         * Preferred unit system to use when displaying distance. Defaults to the
         * unit system used in the country of origin.
         */
        unitSystem?: UnitSystem;
        /**
         * Array of intermediate waypoints. Directions will be calculated from the
         * origin to the destination by way of each waypoint in this array. The
         * maximum allowed waypoints is 8, plus the origin, and destination. Premium
         * Plan customers are allowed 23 waypoints, plus the origin, and
         * destination. Waypoints are not supported for transit directions.
         * Optional.
         */
        waypoints?: DirectionsWaypoint[];
    }

    export enum TravelMode {
        BICYCLING = 'BICYCLING',
        DRIVING = 'DRIVING',
        TRANSIT = 'TRANSIT',
        TWO_WHEELER = 'TWO_WHEELER',
        WALKING = 'WALKING',
    }

    export enum UnitSystem {
        METRIC = 0,
        IMPERIAL = 1,
    }

    interface TransitOptions {
        arrivalTime?: Date;
        departureTime?: Date;
        modes?: TransitMode[];
        routingPreference?: TransitRoutePreference;
    }

    export enum TransitMode {
        BUS = 'BUS',
        RAIL = 'RAIL',
        SUBWAY = 'SUBWAY',
        TRAIN = 'TRAIN',
        TRAM = 'TRAM',
    }

    export enum TransitRoutePreference {
        FEWER_TRANSFERS = 'FEWER_TRANSFERS',
        LESS_WALKING = 'LESS_WALKING',
    }

    interface TransitFare {
        currency: string;
        value: number;
    }

    interface DrivingOptions {
        departureTime: Date;
        trafficModel?: TrafficModel;
    }

    export enum TrafficModel {
        BEST_GUESS = 'bestguess',
        OPTIMISTIC = 'optimistic',
        PESSIMISTIC = 'pessimistic',
    }

    interface DirectionsWaypoint {
        location?: string | LatLng | Place;
        stopover?: boolean;
    }

    export enum DirectionsStatus {
        INVALID_REQUEST = 'INVALID_REQUEST',
        MAX_WAYPOINTS_EXCEEDED = 'MAX_WAYPOINTS_EXCEEDED',
        NOT_FOUND = 'NOT_FOUND',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS',
    }

    interface DirectionsResult {
        //geocoded_waypoints: DirectionsGeocodedWaypoint[];
        routes: DirectionsRoute[];
    }

    interface DirectionsGeocodedWaypoint {
        partial_match: boolean;
        place_id: string;
        types: string[];
    }

    interface DirectionsRoute {
        bounds: LatLngBounds;
        copyrights: string;
        //fare: TransitFare;
        legs: DirectionsLeg[];
        overview_path: LatLng[];
        overview_polyline: string;
        //warnings: string[];
        waypoint_order: number[];
    }

    interface DirectionsLeg {
        arrival_time: Time;
        departure_time: Time;
        distance: Distance;
        duration: Duration;
        duration_in_traffic: Duration;
        end_address: string;
        end_location: LatLng;
        start_address: string;
        start_location: LatLng;
        steps: DirectionsStep[];
        via_waypoints: LatLng[];
    }

    interface BaseDirectionsStep {
        distance: Distance;
        duration: Duration;
        end_location: LatLng;
        instructions: string;
        path: LatLng[];
        start_location: LatLng;
        //transit: TransitDetails;
        travel_mode: TravelMode;
    }

    interface DirectionsStep extends BaseDirectionsStep {
        steps: BaseDirectionsStep[];
    }

    interface Distance {
        text: string;
        value: number;
    }

    interface Duration {
        text: string;
        value: number;
    }

    interface Time {
        text: string;
        time_zone: string;
        value: Date;
    }

    interface TransitDetails {
        arrival_stop: TransitStop;
        arrival_time: Time;
        departure_stop: TransitStop;
        departure_time: Time;
        headsign: string;
        headway: number;
        line: TransitLine;
        num_stops: number;
    }

    interface TransitStop {
        location: LatLng;
        name: string;
    }

    interface TransitLine {
        agencies: TransitAgency[];
        color: string;
        icon: string;
        name: string;
        short_name: string;
        text_color: string;
        url: string;
        vehicle: TransitVehicle;
    }

    interface TransitAgency {
        name: string;
        phone: string;
        url: string;
    }

    interface TransitVehicle {
        icon: string;
        local_icon: string;
        name: string;
        type: VehicleType;
    }

    export enum VehicleType {
        BUS,
        CABLE_CAR,
        COMMUTER_TRAIN,
        FERRY,
        FUNICULAR,
        GONDOLA_LIFT,
        HEAVY_RAIL,
        HIGH_SPEED_TRAIN,
        INTERCITY_BUS,
        METRO_RAIL,
        MONORAIL,
        OTHER,
        RAIL,
        SHARE_TAXI,
        SUBWAY,
        TRAM,
        TROLLEYBUS,
    }

    export class DirectionsRenderer extends MVCObject {
        private _datasource = new atlas.source.DataSource();
        private _routeLayer = new atlas.layer.LineLayer(this._datasource, null, {
            strokeWidth: 6,
            lineJoin: 'round',
            lineCap: 'round'
        });
        private _waypointLayer = new atlas.layer.SymbolLayer(this._datasource, null, {
            iconOptions: {
                image: 'marker-red'
            },
            textOptions: {
                textField: ['get', 'label'],
                offset: [0, -1],
                color: 'white'
            },
            filter: ['==', ['geometry-type'], 'Point']
        });

        constructor(opts?: DirectionsRendererOptions) {
            super();

            this.setOptions(opts);
        }

        public getDirections(): DirectionsResult {
            return this.get('directions');
        }

        public getMap(): Map {
            return this.get('map');
        }

        public getPanel(): HTMLElement {
            return this.get('panel');
        }

        public getRouteIndex(): number {
            return this.get('routeIndex');
        }

        public setDirections(directions: DirectionsResult, skipRender?: boolean): void {
            this.set('routeIndex', 0);
            this.set('directions', directions);

            this._updateMapView();

            if (!skipRender) {
                this._renderRoute();
            }

            google.maps.event.trigger(this, 'directions_changed', null);
        }

        public setMap(map: Map | null, render?: boolean): void {
            var m = this.getMap();

            if (m) {
                m._map.layers.remove(this._routeLayer);
                m._map.layers.remove(this._waypointLayer);
                m._map.sources.remove(this._datasource);
            }

            if (map) {
                var self = this;
                map._map.events.add('ready', () => {
                    map._map.sources.add(self._datasource);
                    map._map.layers.add(self._routeLayer, 'labels');
                    map._map.layers.add(self._waypointLayer);

                    self.set('map', map);
                    self._updateMapView();

                    if (render) {
                        self._renderRoute();
                    }
                });
            }

            if (!map) {
                this.set('map', map);
                this._updateMapView();

                if (render) {
                    this._renderRoute();
                }
            }
        }

        public setOptions(options: DirectionsRendererOptions): void {
            if (options) {
                if (typeof options.preserveViewport === 'boolean') {
                    this.set('preserveViewport', options.preserveViewport);
                }

                if (options.directions || options.directions === null) {
                    this.setDirections(options.directions, true);
                }

                if (typeof options.hideRouteList === 'boolean') {
                    this.set('hideRouteList', options.hideRouteList);
                }

                if (options.map || options.map === null) {
                    this.setMap(options.map);
                }

                if (options.panel || options.panel === null) {
                    this.setPanel(options.panel);
                }

                if (options.polylineOptions) {
                    var opts: atlas.PolygonLayerOptions = {};

                    if (options.polylineOptions.strokeColor) {
                        opts.strokeColor = options.polylineOptions.strokeColor;
                    }

                    if (typeof options.polylineOptions.strokeOpacity === 'number') {
                        opts.strokeOpacity = options.polylineOptions.strokeOpacity;
                    }

                    if (typeof options.polylineOptions.strokeWeight === 'number') {
                        opts.strokeWidth = options.polylineOptions.strokeWeight;
                    }

                    this._routeLayer.setOptions(opts);

                    this.set('polylineOptions', Object.assign(this.get('polylineOptions') || {}, options.polylineOptions));
                }

                if (typeof options.routeIndex === 'number') {
                    this.setRouteIndex(options.routeIndex, false);
                }

                if (typeof options.suppressMarkers === 'boolean') {
                    this.set('suppressMarkers', options.suppressMarkers);
                    this._waypointLayer.setOptions({ visible: options.suppressMarkers });
                }

                if (typeof options.suppressPolylines === 'boolean') {
                    this.set('suppressPolylines', options.suppressPolylines);
                    this._routeLayer.setOptions({ visible: options.suppressPolylines });
                }

                this._renderRoute();
            }
        }

        public setPanel(panel: HTMLElement, render?: boolean): void {
            var p: HTMLElement = this.get('panel');

            if (p) {
                p.innerHTML = '';
            }

            this.set('panel', panel);

            if (render) {
                this._renderRoute();
            }
        }

        public setRouteIndex(routeIndex: number, render?: boolean): void {
            if (routeIndex < this.getDirections().routes.length) {
                this.set('routeIndex', routeIndex);
                this._updateMapView();
                if (render) {
                    this._renderRoute();
                }
            }
        }

        private _updateMapView(): void {
            var directions = this.getDirections();
            var map = this.getMap();

            if (map && directions && !this.get('preserveViewport')) {
                map._map.setCamera({
                    bounds: ConvertToA.bbox(directions.routes[this.getRouteIndex()].bounds),
                    padding: 50
                });
            }
        }

        private _renderRoute(): void {
            var directions = this.getDirections();

            if (directions && directions.routes && directions.routes.length > 0) {
                var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var html: string[] = ['<div class="directions-container"><table>'];

                var route = directions.routes[this.getRouteIndex()];

                var shapes: atlas.data.Feature<atlas.data.Geometry, any>[] = [
                    new atlas.data.Feature(new atlas.data.LineString(ConvertToA.latLngs(route.overview_path)))
                ];

                var stepNum = 1;

                route.legs.forEach((leg, idx) => {
                    shapes.push(new atlas.data.Feature(new atlas.data.Point(ConvertToA.latLng(leg.start_location)), {
                        label: labels[idx],
                        address: leg.start_address
                    }));

                    html.push(
                        //Waypoint label
                        '<tr class="directions-waypoint"><td>', atlas.getImageTemplate('marker').replace('{text}', labels[idx]).replace('{color}', '#ef4c4c').replace('{secondaryColor}', 'white'), '</td><td colspan="2">', leg.start_address, '</td></tr>',

                        //Travel distance/time.
                        '<tr class="directions-summary"><td colspan="3">', leg.distance.text, '. ', leg.duration_in_traffic.text, '</td></tr>'
                    );

                    leg.steps.forEach((step) => {
                        html.push(
                            '<tr class="directions-step"><td style="width:30px">', stepNum.toString(), '.</td><td>', step.instructions, '</td><td style="width:50px">', step.distance.text, '</td></tr>'
                        );

                        stepNum++;
                    });
                });

                //Destination
                var lastLegIdx = route.legs.length - 1;
                var lastLeg = route.legs[lastLegIdx];

                shapes.push(new atlas.data.Feature(new atlas.data.Point(ConvertToA.latLng(lastLeg.end_location)), {
                    label: labels[lastLegIdx + 1],
                    address: lastLeg.end_address
                }));

                html.push(
                    '<tr class="directions-waypoint"><td>', atlas.getImageTemplate('marker').replace('{text}', labels[lastLegIdx + 1]).replace('{color}', '#ef4c4c').replace('{secondaryColor}', 'white'), '</td><td colspan="2">', lastLeg.end_address, '</td></tr>',

                    '</table></div>'
                );

                var p = this.getPanel();
                if (p) {
                    this.getPanel().innerHTML = html.join('');
                }

                this._datasource.setShapes(shapes);
            } else {
                //Reset UI.
                this._datasource.clear();
                var p = this.getPanel();
                if (p) {
                    this.getPanel().innerHTML = '';
                }
            }
        }
    }

    interface DirectionsRendererOptions {
        directions?: DirectionsResult;
        //draggable?: boolean;
        hideRouteList?: boolean;
        //infoWindow?: InfoWindow;
        map?: Map;
        //markerOptions?: MarkerOptions;
        panel?: HTMLElement;
        polylineOptions?: PolylineOptions;
        preserveViewport?: boolean;
        routeIndex?: number;
        //suppressBicyclingLayer?: boolean;
        //suppressInfoWindows?: boolean;
        suppressMarkers?: boolean;
        suppressPolylines?: boolean;
    }

    ////////////////////////////////////////////
    // Private methods
    ////////////////////////////////////////////

    //Lookup table of powers of 10. Used for fast rounding of numbers to significant decimal places.
    var _powerFactor = [1e0, 1e1, 1e2, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10];

    //Function to round coordinates to percision.
    function roundToPrecision(val: number, roundTo: number): number {
        if (roundTo < 0) {
            roundTo = 0;
        }

        if (roundTo > 10) {
            roundTo = 10;
        }

        var precision = _powerFactor[roundTo];
        return Math.round(val * precision + 1e-14) / precision;
    }

    //Static converter from Google Maps objects to Azure Maps objects.
    class ConvertToA {
        public static latLng(latLngOrLiteral: number | LatLng | LatLngLiteral, lng?: number): atlas.data.Position {
            if (typeof latLngOrLiteral !== 'undefined') {
                if (latLngOrLiteral['_position']) {
                    return latLngOrLiteral['_position'];
                } if (typeof latLngOrLiteral === 'number') { //Assume lat, lng
                    return [lng, latLngOrLiteral];
                } else if (typeof latLngOrLiteral.lat === 'number') { //Assume literal
                    return [<number>latLngOrLiteral.lng, latLngOrLiteral.lat];
                }
            }

            return [0, 0];
        }

        public static latLngs(latLngs: MVCArray<LatLng> | (LatLng | LatLngLiteral)[], close?: boolean): atlas.data.Position[] {
            if (latLngs) {
                if (latLngs instanceof google.maps.MVCArray) {
                    latLngs = latLngs.getArray();
                } else if (latLngs['coordinates']) {
                    latLngs = latLngs['coordinates'];
                }

                var pos = (<(LatLng | LatLngLiteral)[]>latLngs).map(x => {
                    return ConvertToA.latLng(x);
                });

                if (close && pos.length > 0 && !atlas.data.Position.areEqual(pos[0], pos[pos.length - 1])) {
                    pos.push(pos[0]);
                }

                return pos;
            }

            return [];
        }

        public static bbox(bounds: LatLngBounds | LatLngBoundsLiteral): atlas.data.BoundingBox {
            if (typeof bounds !== 'undefined') {
                if (bounds['_bounds']) {
                    return [...bounds['_bounds']];
                }

                var b = <LatLngBoundsLiteral>bounds;
                if (typeof b.west === 'number' && typeof b.east === 'number' && typeof b.south === 'number' && typeof b.north === 'number') {
                    return [b.west, b.south, b.east, b.north];
                }
            }

            return null;
        }

        public static point(point: Point): atlas.Pixel {
            return [point.x, point.y];
        }

        public static padding(padding?: number | Padding): number {
            if (typeof padding !== 'undefined') {
                if (typeof padding === 'number') {
                    return padding;
                }

                return Math.max(Math.max(padding.bottom, padding.top), Math.max(padding.left, padding.right));
            }

            return undefined;
        }

        public static mapTypeId(mapTypeId: google.maps.MapTypeId | string): string {
            if (mapTypeId) {
                switch (mapTypeId) {
                    case google.maps.MapTypeId.SATELLITE:
                        return 'satellite';
                    case google.maps.MapTypeId.HYBRID:
                        return 'satellite_road_labels';
                    case google.maps.MapTypeId.TERRAIN:
                        return 'road_shaded_relief';
                    case google.maps.MapTypeId.ROADMAP:
                    default:
                        return 'road';
                }
            }

            return 'road';
        }

        public static cameraOptions(options: MapOptions): atlas.CameraOptions & atlas.CameraBoundsOptions {
            var opt: atlas.CameraOptions & atlas.CameraBoundsOptions = {};

            if (options) {
                if (options.center) {
                    opt.center = ConvertToA.latLng(options.center);
                }

                if (options.heading) {
                    opt.bearing = options.heading;
                }

                if (options.tilt) {
                    opt.pitch = options.tilt;
                }

                if (options.zoom) {
                    opt.zoom = options.zoom - 1;
                }

                if (options.minZoom) {
                    opt.minZoom = Math.max(options.minZoom - 1, 0);
                }

                if (options.maxZoom) {
                    opt.maxZoom = Math.max(options.maxZoom - 1, 0);
                }

                if (options.restriction) {
                    opt.maxBounds = ConvertToA.bbox(options.restriction.latLngBounds);
                }
            }

            return opt;
        }

        public static styleOptions(options: MapOptions): atlas.StyleOptions {
            var opt: atlas.StyleOptions = {};

            if (options && options.mapTypeId) {
                opt.style = ConvertToA.mapTypeId(options.mapTypeId);
            }

            return opt;
        }

        public static userInteractionOptions(options: MapOptions): atlas.UserInteractionOptions {
            var opt: atlas.UserInteractionOptions = {};

            if (options) {
                if (typeof options.disableDoubleClickZoom === 'boolean') {
                    opt.dblClickZoomInteraction = !options.disableDoubleClickZoom;
                }

                if (typeof options.draggable === 'boolean') {
                    opt.dragPanInteraction = options.draggable;
                    opt.dragRotateInteraction = options.draggable;
                }

                if (typeof options.keyboardShortcuts === 'boolean') {
                    opt.keyboardShortcuts = options.keyboardShortcuts;
                }

                if (typeof options.scrollwheel === 'boolean') {
                    opt.scrollZoomInteraction = options.scrollwheel;
                }
            }

            return opt;
        }

        public static mapEvents = {
            'bounds_changed': 'move',
            'center_changed': 'move',
            'click': 'click',
            'dblclick': 'dblclick',
            'drag': 'drag',
            'dragend': 'dragend',
            'dragstart': 'dragstart',
            'heading_changed': 'rotate',
            'idle': 'idle',
            'maptypeid_changed': 'styledata',
            'mousedown': 'mousedown',
            'mousemove': 'mousemove',
            'mouseout': 'mouseout',
            'mouseover': 'mouseover',
            'rightclick': 'contextmenu',
            'tilesloaded': 'idle',
            'tilt_changed': 'pitch',
            'zoom_changed': 'zoom',
            'overlaycomplete': 'drawingchanged',
            'markercomplete': 'drawingchanged',
            'polygoncomplete': 'drawingchanged',
            'polylinecomplete': 'drawingchanged',
            'rectanglecomplete': 'drawingchanged',
            'circlecomplete': 'drawingchanged'
        };

        public static controlPosition(opt: ControlPosition, defaultPosition: string): string {
            switch (opt) {
                case google.maps.ControlPosition.BOTTOM_LEFT:
                case google.maps.ControlPosition.BOTTOM_CENTER:
                case google.maps.ControlPosition.LEFT_BOTTOM:
                case google.maps.ControlPosition.LEFT_CENTER:
                    return 'bottom-left';
                case google.maps.ControlPosition.BOTTOM_RIGHT:
                case google.maps.ControlPosition.RIGHT_BOTTOM:
                    return 'bottom-right';
                case google.maps.ControlPosition.LEFT_TOP:
                case google.maps.ControlPosition.TOP_LEFT:
                case google.maps.ControlPosition.TOP_CENTER:
                    return 'top-left';
                case google.maps.ControlPosition.RIGHT_TOP:
                case google.maps.ControlPosition.TOP_RIGHT:
                    return 'top-right';
            }

            return defaultPosition;
        }

        public static poiType(typeQuery: string): string {
            if (typeQuery && typeQuery !== '') {
                switch (typeQuery.toLowerCase()) {
                    case 'airport':
                    case 'courthouse':
                    case 'doctor':
                    case 'embassy':
                    case 'library':
                    case 'museum':
                    case 'post_office':
                    case 'stadium':
                    case 'amusement_park':
                    case 'bank':
                    case 'car_wash':
                    case 'casino':
                    case 'dentist':
                    case 'department_store':
                    case 'cemetery':
                    case 'park':
                    case 'parking':
                    case 'school':
                    case 'place_of_worship':
                    case 'synagogue':
                    case 'mosque':
                    case 'church':
                    case 'store':
                    case 'laundry':
                    case 'florists':
                    case 'spa':
                    case 'hospital':
                        return typeQuery;
                    case 'bus_station':
                        return 'bus station';
                    case 'light_rail_station':
                        return 'tram stop';
                    case 'subway_station':
                        return 'metro station';
                    case 'transit_station':
                        return 'public transport stop';
                    case 'taxi_stand':
                        return 'taxi stand';
                    case 'taxi_stand':
                        return 'taxi stand';
                    case 'train_station':
                        return 'railway_station';
                    case 'primary_school':
                        return 'primary school';
                    case 'secondary_school':
                        return 'high school';
                    case 'zoo':
                        return 'zoos_arboreta_botanical_garden';
                    case 'veterinary_care':
                        return 'veterinarian';
                    case 'university':
                        return 'college_university';
                    case 'atm':
                        return 'cash_dispenser';
                    case 'night_club':
                    case 'bar':
                        return 'nightlife';
                    case 'bakers':
                        return 'food drinks: bakers';
                    case 'hair_care':
                        return 'hairdressers barbers';
                    case 'beauty_salon':
                        return 'beauty salon';
                    case 'drugstore':
                        return 'drug store';
                    case 'electronics_store':
                        return 'electronics';
                    case 'furniture_store':
                        return 'furniture';
                    case 'home_goods_store':
                        return 'furniture/home furnishings';
                    case 'grocery_or_supermarket':
                    case 'food':
                        return 'food drinks: grocers';
                    case 'book_store':
                        return 'book shops';
                    case 'hardware_store':
                        return 'hardware';
                    case 'jewelry_store':
                        return 'jewelry';
                    case 'pet_store':
                        return 'pet supplies';
                    case 'clothing_store':
                        return 'clothing accessories: general';
                    case 'shoe_store':
                        return 'clothing accessories: footwear shoe repairs';
                    case 'convenience_store':
                        return 'convenience stores';
                    case 'travel_agency':
                        return 'travel agents';
                    case 'funeral_home':
                        return 'funeral service mortuaries';
                    case 'travel_agency':
                        return 'travel agency';
                    case 'insurance':
                        return 'insurance';
                    case 'real_estate_agency':
                        return 'real estate';
                    case 'storage':
                        return 'moving storage';
                    case 'meal_takeaway':
                        return 'moving take away';
                    case 'bowling_alley':
                        return 'bowling';
                    case 'cafe':
                        return 'café';
                    case 'bar':
                        return 'microbrewery/beer garden';
                    case 'gas_station':
                        return 'gas_station';
                    case 'fire_station':
                        return 'fire_station_brigade';
                    case 'supermarket':
                        return 'supermarkets hypermarkets';
                    case 'local_government_office':
                        return 'local government office';
                    case 'police':
                        return 'police_station';
                    case 'campground':
                        return 'camping_ground';
                    case 'car_repair':
                        return 'reapir_facility';
                    case 'car_rental':
                        return 'rent_a_car_facility';
                    case 'car_dealer':
                        return 'automotive_dealer';
                    case 'shopping_mall':
                        return 'shopping_center';
                    case 'tourist_attraction':
                        return 'important_tourist_attraction';
                    case 'lodging':
                        return 'hotel_motel';
                }
            }

            return null;
        }
    }

    //Static converter from Azure Maps objects to Google Maps objects.
    class ConvertToG {

        public static position(pos: atlas.data.Position): LatLng {
            return new google.maps.LatLng(pos[1], pos[0]);
        }

        public static positions(pos: atlas.data.Position[]): LatLng[] {
            return pos.map(x => {
                return new google.maps.LatLng(x[1], x[0]);
            });
        }

        public static bbox(bbox: atlas.data.BoundingBox): LatLngBounds {
            if (bbox) {
                var b = new google.maps.LatLngBounds();
                b._bounds = [...bbox];
                b._isEmpty = false;
                return b;
            }

            return null;
        }

        public static pixel(pixel: atlas.Pixel): Point {
            return new google.maps.Point(pixel[0], pixel[1]);
        }

        public static mapTypeId(mapStyle: string): google.maps.MapTypeId {
            if (mapStyle) {
                switch (mapStyle) {
                    case 'satellite':
                        return google.maps.MapTypeId.SATELLITE;
                    case 'satellite_road_labels':
                        return google.maps.MapTypeId.HYBRID;
                    case 'road_shaded_relief':
                        return google.maps.MapTypeId.TERRAIN;
                    case 'road':
                    default:
                        return google.maps.MapTypeId.ROADMAP;
                }
            }

            return google.maps.MapTypeId.ROADMAP;
        }

        public static feature(feature: atlas.data.Feature<atlas.data.Geometry, any> | atlas.Shape, featureId?: any): google.maps.Data.Feature | google.maps.Marker {
            if (feature instanceof atlas.Shape) {
                if (feature._googleFeature) {
                    return feature._googleFeature;
                }

                var id = feature.getProperties()._azureMapsShapeId;

                if (_featureTable[id]) {
                    return _featureTable[id];
                }

                feature = feature.toJson();
            } else if (typeof feature.id !== 'undefined' && _featureTable[feature.id]) {
                return _featureTable[feature.id];
            }

            //Feature is GeoJSON
            return new google.maps.Data.Feature({
                id: feature.id || featureId,
                properties: feature.properties,
                geometry: google.maps.Data.Geometry._fromGeoJson(feature.geometry)
            });
        }

        public static poiClassificationsType(classifications: atlas.service.Models.SearchResultPoiClassification[]): string[] {
            var types: string[] = [];

            if (classifications && classifications.length > 0) {
                classifications.forEach(C => {
                    var c = C.code.toLowerCase();

                    switch (c) {
                        case 'airport':
                        case 'courthouse':
                        case 'doctor':
                        case 'embassy':
                        case 'library':
                        case 'museum':
                        case 'post_office':
                        case 'stadium':
                            types.push(c);
                            break;
                        case 'amusement_park':
                        case 'bank':
                        case 'car_wash':
                        case 'casino':
                        case 'dentist':
                        case 'department_store':
                            types.push('establishment');
                            types.push(c);
                            break;
                        case 'park_recreation_area':
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'cemetery':
                                        types.push('cemetery');
                                        break;
                                    default:
                                        types.push('park');
                                        break;
                                }
                            });
                            break;
                        case 'parking_garage':
                        case 'open_parking_area':
                            types.push('parking');
                            break;
                        case 'public_transit_stop':
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'coach stop':
                                    case 'bus stop':
                                    case 'bus station':
                                        types.push('bus_station');
                                        break;
                                    case 'tram stop':
                                        types.push('light_rail_station');
                                    case 'metro station':
                                        types.push('subway_station');
                                        break;
                                    case 'railroad stop':
                                    case 'railroad station':
                                        types.push('train_station');
                                        break;
                                    case 'public transport stop':
                                        types.push('transit_station');
                                        break;
                                    case 'taxi stand':
                                        types.push('taxi_stand');
                                        break;
                                }
                            });
                            break;
                        case 'railway_station':
                            types.push('train_station');
                            break;
                        case 'school':
                            types.push('school');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'primary school':
                                    case 'middle school':
                                        types.push('primary_school');
                                        break;
                                    case 'high school':
                                    case 'senior high school':
                                        types.push('secondary_school');
                                        break;
                                }
                            });
                            break;
                        case 'zoos_arboreta_botanical_garden':
                            types.push('zoo');
                            break;
                        case 'veterinarian':
                            types.push('veterinary_care');
                            break;
                        case 'college_university':
                            types.push('school');
                            types.push('university');
                            break;
                        case 'place_of_worship':
                            types.push('place_of_worship');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'synagogue':
                                        types.push('synagogue');
                                        break;
                                    case 'mosque':
                                        types.push('mosque');
                                        break;
                                    default:
                                        types.push('church');
                                        break;
                                }
                            });
                            break;
                        case 'cash_dispenser':
                            types.push('atm');
                            break;
                        case 'nightlife':
                            types.push('establishment');
                            types.push('bar');
                            types.push('night_club');
                            break;
                        case 'shop':
                            types.push('establishment');
                            types.push('store');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'laundry':
                                    case 'florists':
                                        types.push(n.name);
                                        break;
                                    case 'food drinks: bakers':
                                    case 'bakers':
                                        types.push('food');
                                        types.push('bakers');
                                        break;
                                    case 'hairdressers barbers':
                                    case 'hairdressers':
                                    case 'barbers':
                                        types.push('hair_care');
                                        break;
                                    case 'beauty salon':
                                        types.push('beauty_salon');
                                        break;
                                    case 'drug store':
                                        types.push('drugstore');
                                        break;
                                    case 'electrical':
                                    case 'office it: consumer electronics':
                                    case 'electrical appliance':
                                    case 'electronics':
                                        types.push('electronics_store');
                                        break;
                                    case 'furniture':
                                    case 'furniture fittings':
                                        types.push('furniture_store');
                                        break;
                                    case 'furniture/home furnishings':
                                        types.push('home_goods_store');
                                        break;
                                    case 'food drinks: grocers':
                                    case 'food drinks: green grocers':
                                        types.push('food');
                                        types.push('grocery_or_supermarket');
                                        break;
                                    case 'book shops':
                                        types.push('book_store');
                                        break;
                                    case 'hardware':
                                        types.push('hardware_store');
                                        break;
                                    case 'jewelry':
                                        types.push('jewelry_store');
                                        break;
                                    case 'pet supplies':
                                        types.push('pet_store');
                                        break;
                                    case 'clothing accessories: footwear shoe repairs':
                                        types.push('shoe_store');
                                        types.push('clothing_store');
                                        break;
                                    case 'clothing accessories: specialty':
                                    case 'clothing accessories: children':
                                    case 'clothing accessories: men':
                                    case 'clothing accessories: general':
                                    case 'sports equipment clothing':
                                    case 'clothing accessories: women':
                                        types.push('clothing_store');
                                        break;
                                    case 'convenience stores':
                                        types.push('convenience_store');
                                        break;
                                    case 'travel agents':
                                        types.push('travel_agency');
                                        break;
                                }
                            });
                            break;
                        case 'company':
                            types.push('establishment');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'funeral service mortuaries':
                                        types.push('funeral_home');
                                        break;
                                    case 'insurance':
                                        types.push('insurance_agency');
                                        break;
                                    case 'real estate':
                                        types.push('real_estate_agency');
                                        break;
                                    case 'moving storage':
                                        types.push('storage');
                                        break;
                                }
                            });
                            break;
                        case 'restaurant':
                            types.push('food');
                            types.push('establishment');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'take away':
                                    case 'fast food':
                                        types.push('meal_takeaway');
                                        break;
                                }
                            });
                            break;
                        case 'leisure_center':
                            types.push('establishment');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'bowling':
                                        types.push('bowling_alley');
                                        break;
                                    case 'spa':
                                        types.push('spa');
                                        break;
                                }
                            });
                            break;
                        case 'cafe_pub':
                            types.push('food');
                            types.push('establishment');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'internet café':
                                    case 'tea house, cafe':
                                    case 'internet cafe':
                                    case 'café':
                                    case 'coffee shop':
                                    case 'café/pub':
                                    case 'cafe/pub':
                                        types.push('cafe');
                                        break;
                                    case 'microbrewery/beer garden':
                                    case 'pub':
                                        types.push('bar');
                                        break;
                                }
                            });
                            break;
                        case 'petrol_station':
                            types.push('establishment');
                            types.push('gas_station');
                            break;
                        case 'fire_station_brigade':
                            types.push('fire_station');
                            break;
                        case 'pharmacy':
                            types.push('establishment');
                            types.push('drugstore');
                            break;
                        case 'market':
                            types.push('food');
                            types.push('establishment');
                            types.push('grocery_or_supermarket');
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'supermarkets hypermarkets':
                                        types.push('supermarket');
                                        break;
                                }
                            });
                            break;
                        case 'government_office':
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'local government office':
                                        types.push('local_government_office');
                                        break;
                                }
                            });
                            break;
                        case 'police_station':
                            types.push('police');
                            break;
                        case 'camping_ground':
                            types.push('campground');
                            break;
                        case 'reapir_facility':
                            types.push('establishment');
                            types.push('car_repair');
                            break;
                        case 'rent_a_car_facility':
                            types.push('establishment');
                            types.push('car_rental');
                            break;
                        case 'automotive_dealer':
                            types.push('establishment');
                            types.push('car_dealer');
                            break;
                        case 'shopping_center':
                            types.push('establishment');
                            types.push('shopping_mall');
                            break;
                        case 'important_tourist_attraction':
                            types.push('tourist_attraction');
                            break;
                        case 'hotel_motel':
                            types.push('establishment');
                            types.push('lodging');
                            break;
                        case 'health_care_service':
                            C.names.forEach(n => {
                                switch (n.name) {
                                    case 'hospital':
                                        types.push('hospital');
                                        break;
                                }
                            });
                            break;
                    }
                });
            }

            //Remove duplicates
            return [...new Set(types)];
        }

        public static poiIconFromTypes(types: string[]): string {
            if (!placesIcons['night_club']) {
                //Cross reference place icon names.
                Object.assign(placesIcons, {
                    grocery_or_supermarket: placesIcons.supermarket,
                    light_rail_station: placesIcons.train_station,
                    book_store: placesIcons.shopping_mall,
                    night_club: placesIcons.bar,
                    local_government_office: placesIcons.city_hall,
                    primary_school: placesIcons.school,
                    movie_rental: placesIcons.movie_theater
                });
            }

            var typeName: string;
            var icon: string;
            var genericIcon: string;

            for (var i = 0; i < types.length; i++) {
                typeName = types[i];

                icon = placesIcons[typeName];

                if (icon) {
                    if (typeName === 'establishment' || typeName === 'place_of_worship' || typeName === 'geocode') {
                        genericIcon = placesIcons[typeName];
                    } else {
                        break;
                    }
                }
            }

            if (!icon && genericIcon) {
                icon = genericIcon;
            }

            if (icon) {
                return `https://maps.gstatic.com/mapfiles/place_api/icons/${icon}-71.png`;
            }

            return undefined;
        }
    }

    var placesIcons = {
        airport: 'airport',
        amusement_park: 'amusement',
        aquarium: 'aquarium',
        art_gallery: 'art_gallery',
        atm: 'atm',
        hair_care: 'barber',
        bar: 'bar',
        bicycle_store: 'bicycle',
        bowling_alley: 'bowling',
        bus_station: 'bus',
        cafe: 'cafe',
        campground: 'camping',
        car_dealer: 'car_dealer',
        car_rental: 'car_rental',
        car_repair: 'car_repair',
        casino: 'casino',
        city_hall: 'civic_building',
        convenience_store: 'convenience',
        courthouse: 'courthouse',
        dentist: 'dentist',
        doctor: 'doctor',
        electronics_store: 'electronics',
        gym: 'fitness',
        florist: 'flower',
        gas_station: 'gas_station',
        establishment: 'generic_business',
        park: 'generic_recreational',
        geocode: 'geocode',
        golf: 'golf',
        jewelry_store: 'jewelry',
        library: 'library',
        lodging: 'lodging',
        movie_theater: 'movies',
        museum: 'museum',
        pet_store: 'pet',
        police: 'police',
        post_office: 'post_office',
        restaurant: 'restaurant',
        school: 'school',
        shopping_mall: 'shopping',
        stadium: 'stadium',
        supermarket: 'supermarket',
        taxi_stand: 'taxi',
        train_station: 'train',
        travel_agency: 'travel_agent',
        university: 'university',
        church: 'worship_christian',
        place_of_worship: 'worship_general',
        hindu_temple: 'worship_hindu',
        mosque: 'worship_islam',
        synagogue: 'worship_jewish',
        zoo: 'zoo'
    };

    /**
     * An object that represents the full screen control text resources.
     */
    interface FullscreenTranslation {
        /** View Full Screen */
        view: string;

        /** Exit Full Screen */
        exit: string;

        /** Full Screen Control */
        title: string;
    }

    /**
    * Options that define how the full screen control renders and functions.
    */
    interface FullscreenControlOptions {
        /**
        * The style of the control. Can be; light, dark, auto, or any CSS3 color. When set to auto, the style will change based on the map style.
        * Default `light'.
        * @default light
        */
        style?: atlas.ControlStyle | string;

        /**
        * Specifies if the control should be hidden if fullscreen is not supported by the browser. 
        * @default false
        */
        hideIfUnsupported?: boolean;
    }

    /**
     * A control that toggles the map from its defined size to a fullscreen size.
     */
    class FullscreenControl implements atlas.Control {

        /****************************
         * Private Properties
         ***************************/

        private _container: HTMLElement;
        private _button: HTMLButtonElement;
        private _options: atlas.ControlOptions = {
            style: 'light',
            hideIfUnsupported: true
        };
        private _darkColor = '#011c2c';
        private _map: atlas.Map;
        private _resource: FullscreenTranslation;

        private _fullscreenCss = '{elm}:-webkit-full-screen{width:100%;height:100%;}{elm}:-moz-full-screen{width:100%;height:100%;}{elm}:-ms-fullscreen{width:100%;height:100%;}{elm}:-o-full-screen{width:100%;height:100%;}{elm}:-full-screen{width:100%;height:100%;}' +
            '.atlas-map-fullscreenMapBtn{margin:0;padding:0;border:none;border-collapse:collapse;width:32px;height:32px;text-align:center;cursor:pointer;line-height:32px;background-repeat:no-repeat;background-size:20px;background-position:center center;z-index:200;box-shadow:0px 0px 4px rgba(0,0,0,0.16);}' +
            '.atlas-map-fullscreenMapExpand{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAMAAAF6ePCOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAAJacn5ean5idopicopicoZicoZbVOdIAAAAGdFJOUwBQYI+fucOe/hkAAAAJcEhZcwAAFxEAABcRAcom8z8AAADMSURBVDhPzZSNDoIwDITn397/kV27il9Rzmwq4Qux194VRmIombqqDzCvtV236LvRJos28rD6RlPGs5jpvHaZVTLWe0nEbCkxbnKkU4zcMw7xpvTqeHrho2WzzDfWHHPPmraCmAXWzRDrtZ7ZpCeNOe03c3xnL2bOdginc2Iz6/yYuDGxP+WG1Q8Qmvxxx6UGQUgNgpAaBCE1CEJqEITUIHhxXGquTjTHBa+mQRBSgyCkBkFIDYKQGgQhNQhCahDsMmGfoA1r351BSrkDTQQSzEhW2qYAAAAASUVORK5CYII=);}' +
            '.atlas-map-fullscreenMapExpand:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAMAAAF6ePCOAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAVUExURQAAADCszDCqzTKtzzKszzCszzGszvdFYikAAAAGdFJOUwBQYI+fucOe/hkAAAAJcEhZcwAAFxEAABcRAcom8z8AAADMSURBVDhPzZSNDoIwDITn397/kV27il9Rzmwq4Qux194VRmIombqqDzCvtV236LvRJos28rD6RlPGs5jpvHaZVTLWe0nEbCkxbnKkU4zcMw7xpvTqeHrho2WzzDfWHHPPmraCmAXWzRDrtZ7ZpCeNOe03c3xnL2bOdginc2Iz6/yYuDGxP+WG1Q8Qmvxxx6UGQUgNgpAaBCE1CEJqEITUIHhxXGquTjTHBa+mQRBSgyCkBkFIDYKQGgQhNQhCahDsMmGfoA1r351BSrkDTQQSzEhW2qYAAAAASUVORK5CYII=);}' +
            '.atlas-map-fullscreenMapCollapse{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAD1BMVEWWnJ+Xmp+YnKKYnKKYnKHcteq5AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAFxEAABcRAcom8z8AAAAHdElNRQfiCw8VGzLD58rvAAAANUlEQVQ4y2NgIB+wuLg4IKhRGUpkXGAAKgMFg0JmuIHBH9ajuYTaMszGxgZAiklJSYFg+gAAKrRnAIqOPxgAAAAASUVORK5CYII=);}' +
            '.atlas-map-fullscreenMapCollapse:hover{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAD1BMVEUwrMwwqs0yrM8yrM8xrM6kUFC0AAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAAFxEAABcRAcom8z8AAAAHdElNRQfiCw8VGSuVugCtAAAANUlEQVQ4y2NgIB+wuLg4IKhRGUpkXGAAKgMFg0JmuIHBH9ajuYTaMszGxgZAiklJSYFg+gAAKrRnAIqOPxgAAAAASUVORK5CYII=);}';

        /****************************
         * Constructor
         ***************************/

        /**
         * A control that toggles the map from its defined size to a fullscreen size.
         * @param options Options for defining how the control is rendered and functions.
         */
        constructor(options?: FullscreenControlOptions) {
            this._options = Object.assign(this._options, options);
        }

        /****************************
         * Public Methods
         ***************************/

        /**
         * Action to perform when the control is added to the map.
         * @param map The map the control was added to.
         * @param options The control options used when adding the control to the map.
         * @returns The HTML Element that represents the control.
         */
        public onAdd(map: atlas.Map, options?: atlas.ControlOptions): HTMLElement {
            this._map = map;

            var isSupported = FullscreenControl.isSupported();

            if (isSupported || (!isSupported && !this._options.hideIfUnsupported)) {
                this._resource = FullscreenControl._getTranslations(this._map.getStyle().language);

                var color = this._options.style || 'light';

                if (color === 'light') {
                    color = 'white';
                } else if (color === 'dark') {
                    color = this._darkColor;
                } else if (color === 'auto') {
                    //Color will change between light and dark depending on map style.
                    this._map.events.add('styledata', () => { this._mapStyleChanged(); });
                    color = this._getColorFromMapStyle();
                }

                var mapContainer = this._map.getMapContainer();

                //Add css for fullscreen.
                var css = this._fullscreenCss.replace(/{elm}/g, '#' + mapContainer.id);

                //Add the CSS style for the control to the DOM.
                var style = document.createElement('style');
                style.innerHTML = css;
                document.body.appendChild(style);

                //Create the fullscreen button.
                this._container = document.createElement('div');
                this._container.classList.add('azure-maps-control-container');
                this._container.setAttribute('aria-label', this._resource.title);
                this._container.style.flexDirection = 'column';

                this._button = document.createElement("button");
                this._button.classList.add('atlas-map-fullscreenMapBtn');
                this._button.classList.add('atlas-map-fullscreenMapExpand');
                this._button.style.backgroundColor = color;
                this._button.setAttribute('title', this._resource.view);
                this._button.setAttribute('alt', this._resource.view);
                this._button.setAttribute('type', 'button');
                this._button.addEventListener('click', () => {
                    if (this.isFullscreen()) {
                        var closeFullScreenFn =
                            document['webkitCancelFullScreen']
                            || document['cancelFullScreen']
                            || document['mozCancelFullScreen']
                            || document['msExitFullscreen']
                            || document.exitFullscreen;

                        closeFullScreenFn.call(document);
                    } else {
                        var openFullScreenFn =
                            mapContainer['webkitRequestFullScreen']
                            || mapContainer['requestFullScreen']
                            || mapContainer['mozRequestFullScreen']
                            || mapContainer['msRequestFullscreen']
                            || mapContainer.requestFullscreen;

                        openFullScreenFn.call(mapContainer);
                    }
                });
                this._updateBtn();
                this._container.appendChild(this._button);

                var changeEventName;

                if (document['fullscreenchange']) {
                    changeEventName = 'fullscreenchange';
                } else if (document['webkitCancelFullScreen']) {
                    changeEventName = 'webkitfullscreenchange';
                } else if (document['mozCancelFullScreen']) {
                    changeEventName = 'mozfullscreenchange';
                } else if (document['msExitFullscreen']) {
                    changeEventName = 'MSFullscreenChange';
                }

                if (changeEventName) {
                    document.addEventListener(changeEventName, () => { this._updateBtn() });
                }

                return this._container;
            }

            return null;
        }

        /**
         * Action to perform when control is removed from the map.
         */
        public onRemove(): void {
            if (this._container) {
                this._container.remove();
                this._container = null;
            }

            if (this._options.style === 'auto') {
                this._map.events.remove('styledata', () => { this._mapStyleChanged(); });
            }

            this._map = null;
        }

        /**
         * Determines if the map is in full screen mode or not.
         */
        public isFullscreen(): boolean {
            return !(!document['fullscreenElement'] &&
                !document['msFullscreenElement'] &&
                !document['mozFullScreenElement'] &&
                !document['webkitFullscreenElement']);
        }

        /**
         * Determines if fullscreen can be requested of not.
         */
        public static isSupported(): boolean {
            return document['fullscreenEnabled'] ||
                document['msFullscreenEnabled'] ||
                document['mozFullScreenEnabled'] ||
                document['webkitFullscreenEnabled'];
        }

        /****************************
         * Private Methods
         ***************************/

        /**
         * An event handler for when the map style changes. Used when control style is set to auto.
         */
        private _mapStyleChanged(): void {
            if (this._button) {
                this._button.style.backgroundColor = this._getColorFromMapStyle();
            }
        }

        /**
         * Retrieves the background color for the button based on the map style. This is used when style is set to auto.
         */
        private _getColorFromMapStyle(): string {
            var style = this._map.getStyle().style;
            var color = 'white';

            switch (style) {
                //When the style is dark (i.e. satellite, night), show the dark colored theme.
                case 'satellite':
                case 'satellite_road_labels':
                case 'grayscale_dark':
                case 'night':
                    color = this._darkColor;
                    break;
                //When the style is bright (i.e. road), show the light colored theme.
                case 'road':
                case 'grayscale_light':
                default:
                    break;
            }

            return color;
        }

        /**
         * Toggles the fullscreen state of the button.
         */
        private _updateBtn(): void {
            var ariaLabel = this._resource.view;
            var removeClass, addClass;

            if (this.isFullscreen()) {
                //Is fullscreen, exit.
                ariaLabel = this._resource.exit;

                removeClass = 'atlas-map-fullscreenMapExpand';
                addClass = 'atlas-map-fullscreenMapCollapse';
            } else {
                //Make map full screen.
                ariaLabel = this._resource.view;

                removeClass = 'atlas-map-fullscreenMapCollapse';
                addClass = 'atlas-map-fullscreenMapExpand';
            }

            this._button.setAttribute('title', ariaLabel);
            this._button.setAttribute('alt', ariaLabel);

            this._button.classList.remove(removeClass);
            this._button.classList.add(addClass);
        }

        /**
         * Returns the set of translation text resources needed for the fullscreen control for a given language.
         * @param lang The language code to retrieve the text resources for.
         * @returns An object containing text resources in the specified language.
         */
        private static _getTranslations(lang?: string): FullscreenTranslation {
            if (lang && lang.indexOf('-') > 0) {
                lang = lang.substring(0, lang.indexOf('-'));
            }

            switch (lang.toLowerCase()) {
                //Afrikaans
                case 'af':
                    return { exit: 'Verlaat volskerm', view: 'Vertoon volskerm', title: 'Volskerm beheer' };
                //Arabic
                case 'ar':
                    return { exit: 'الخروج من وضع ملئ للشاشة', view: 'المشاهدة بحجم الشاشة', title: 'تحكم ملء الشاشة' };
                //Basque
                case 'eu':
                    return { exit: 'Irten pantaila osoko', view: 'ikusi pantaila osoan', title: 'Pantaila osoa kontrol' };
                //Bulgarian
                case 'bg':
                    return { exit: 'Изход на цял екран', view: 'Преглед на цял екран', title: 'Контрол на цял екран' };
                //Chinese
                case 'zh':
                    return { exit: '退出全屏', view: '全屏查看', title: '全屏控制' };
                //Croatian
                case 'hr':
                    return { exit: 'Izlaz na cijelom zaslonu', view: 'Prikaz na cijelom zaslonu', title: 'Puni zaslon kontrola' };
                //Czech
                case 'cs':
                    return { exit: 'Ukončit celou obrazovku', view: 'pohled na celou obrazovku', title: 'fullscreen kontrola' };
                //Danish
                case 'da':
                    return { exit: 'Afslut fuld skærm', view: 'Se fuld skærm', title: 'fullscreen kontrol' };
                //Dutch
                case 'nl':
                    return { exit: 'Verlaat volledig scherm', view: 'Bekijk fullscreen', title: 'fullscreen controle' };
                //Estonian
                case 'et':
                    return { exit: 'Välja täisekraani', view: 'Vaata täisekraani', title: 'Täisekraan kontrolli' };
                //Finnish
                case 'fi':
                    return { exit: 'Poistu koko näytöstä', view: 'Koko näyttö', title: 'fullscreen ohjaus' };
                //French
                case 'fr':
                    return { exit: 'Quitter le mode plein écran', view: 'Voir en plein écran', title: 'Contrôle plein écran' };
                //Galician
                case 'gl':
                    return { exit: 'Saia da pantalla completa', view: 'Ver a pantalla completa', title: 'Control de pantalla completa' };
                //German
                case 'de':
                    return { exit: 'Beenden Vollbild', view: 'Ansicht Vollbild', title: 'Vollbild-Steuerung' };
                //Greek
                case 'el':
                    return { exit: 'Έξοδος από πλήρη οθόνη', view: 'Προβολή σε πλήρη οθόνη', title: 'Πλήρης οθόνη ελέγχου' };
                //Hindi
                case 'hi':
                    return { exit: 'पूर्ण स्क्रीन से बाहर निकलें', view: 'पूर्णस्क्रीन देखें', title: 'पूर्ण स्क्रीन नियंत्रण' };
                //Hungarian
                case 'hu':
                    return { exit: 'Kilépés a teljes képernyős', view: 'Megtekintés teljes képernyőn', title: 'Nagyítás ellenőrzés' };
                //Indonesian
                case 'id':
                    return { exit: 'Keluar layar penuh', view: 'Lihat fullscreen', title: 'Kontrol layar penuh' };
                //Italian
                case 'it':
                    return { exit: 'Esci da schermo intero', view: 'Visualizza schermo intero', title: 'controllo a tutto schermo' };
                //Japanese
                case 'ja':
                    return { exit: '出口フルスクリーン', view: '表示フルスクリーン', title: 'フルスクリーンコントロール' };
                //Kazakh
                case 'kk':
                    return { exit: 'Толық экраннан шығу', view: 'View толық экран', title: 'Fullscreen бақылау' };
                //Korean
                case 'ko':
                    return { exit: '전체 화면 종료', view: '전체 화면보기', title: '전체 화면 제어' };
                //Spanish
                case 'es':
                    return { exit: 'Salir de pantalla completa', view: 'Ver en pantalla completa', title: 'control de pantalla completa' };
                //Latvian
                case 'lv':
                    return { exit: 'Iziet no pilnekrāna', view: 'Skatīt pilnekrāna režīmā', title: 'Pilnekrāna kontrole' };
                //Lithuanian
                case 'lt':
                    return { exit: 'Išjungti viso ekrano režimą', view: 'Peržiūrėti per visą ekraną', title: 'Fullscreen kontrolė' };
                //Malay
                case 'ms':
                    return { exit: 'keluar skrin penuh', view: 'paparan skrin penuh', title: 'kawalan skrin penuh' };
                //Norwegian
                case 'nb':
                    return { exit: 'Avslutt full skjerm', view: 'Vis fullskjerm', title: 'Full skjermkontroll' };
                //Polish
                case 'pl':
                    return { exit: 'Wyłączyć tryb pełnoekranowy', view: 'Zobacz na pełnym ekranie', title: 'kontrola na pełnym ekranie' };
                //Portuguese
                case 'pt':
                    return { exit: 'Sair em tela cheia', view: 'Ver tela cheia', title: 'controle de tela cheia' };
                //Romanian
                case 'ro':
                    return { exit: 'Ieșire ecran complet', view: 'Vezi tot ecranul', title: 'controlul pe tot ecranul' };
                //Russian
                case 'ru':
                    return { exit: 'Выход из полноэкранного режима', view: 'Просмотреть весь экран', title: 'Полноэкранный контроль' };
                //Serbian
                case 'sr':
                    return { exit: 'Излаз из целог екрана', view: 'Погледај преко целог екрана', title: 'фуллсцреен контрола' };
                //Slovak
                case 'sk':
                    return { exit: 'Skončiť celú obrazovku', view: 'pohľad na celú obrazovku', title: 'fullscreen kontrola' };
                //Slovenian
                case 'sl':
                    return { exit: 'Izhod celozaslonski', view: 'Poglej celozaslonski', title: 'celozaslonski nadzor' };
                //Swedish
                case 'sv':
                    return { exit: 'Avsluta helskärm', view: 'Visa helskärm', title: 'Full skärms kontroll' };
                //Thai
                case 'th':
                    return { exit: 'แบบเต็มหน้าจอออกจาก', view: 'ดูแบบเต็มจอ', title: 'การควบคุมแบบเต็มหน้าจอ' };
                //Turkish
                case 'tr':
                    return { exit: 'Tam ekrandan çık', view: 'Tam ekran görüntüle', title: 'Tam Ekran kontrolü' };
                //Ukrainian
                case 'uk':
                    return { exit: 'Вихід з повноекранного режиму', view: 'Переглянути весь екран', title: 'Редакція контроль' };
                //Vietnamese
                case 'vi':
                    return { exit: 'Thoát toàn màn hình', view: 'Xem toàn màn hình', title: 'kiểm soát toàn màn hình' };
                //English
                case 'en':
                default:
                    return { exit: 'Exit Fullscreen', view: 'View Fullscreen', title: 'Fullscreen Control' };
            }
        }
    }

    ////////////////////////////////////////////
    // Not supported
    ////////////////////////////////////////////

    export class StreetViewPanorama extends MVCObject {
        constructor(container: HTMLElement, opts?: StreetViewPanoramaOptions) {
            super();
        }

        public controls: Array<MVCArray<Node>>;

        public getLinks(): StreetViewLink[] { return null; }
        public getLocation(): StreetViewLocation { return null; }
        public getMotionTracking(): boolean { return null; }
        public getPano(): string { return null; }
        public getPhotographerPov(): StreetViewPov { return null; }
        public getPosition(): LatLng { return null; }
        public getPov(): StreetViewPov { return null; }
        public getStatus(): StreetViewStatus { return null; }
        public getVisible(): boolean { return null; }
        public getZoom(): number { return null; }
        public registerPanoProvider(provider: (input: string) => StreetViewPanoramaData, opts?: PanoProviderOptions): void { return null; }
        public setLinks(links: StreetViewLink[]): void { return null; }
        public setMotionTracking(motionTracking: boolean): void { return null; }
        public setOptions(options: StreetViewPanoramaOptions): void { return null; }
        public setPano(pano: string): void { return null; }
        public setPosition(latLng: LatLng | LatLngLiteral): void { return null; }
        public setPov(pov: StreetViewPov): void { return null; }
        public setVisible(flag: boolean): void { return null; }
        public setZoom(zoom: number): void { return null; }
    }

    export enum SymbolPath {
        BACKWARD_CLOSED_ARROW = 3,
        BACKWARD_OPEN_ARROW = 4,
        CIRCLE = 0,
        FORWARD_CLOSED_ARROW = 1,
        FORWARD_OPEN_ARROW = 2,
    }

    export enum ScaleControlStyle {
        DEFAULT = 0,
    }

    export enum ZoomControlStyle {
        DEFAULT = 0,
        SMALL = 1,
        LARGE = 2,
    }

    interface StreetViewControlOptions {
        position?: ControlPosition;
    }

    interface ScaleControlOptions {
        style?: ScaleControlStyle;
    }

    interface PanControlOptions {
        position?: ControlPosition;
    }

    type GestureHandlingOptions = 'cooperative' | 'greedy' | 'none' | 'auto';

    interface IconSequence {
        fixedRotation?: boolean;
        icon?: Symbol;
        offset?: string;
        repeat?: string;
    }

    export enum StrokePosition {
        CENTER = 0,
        INSIDE = 1,
        OUTSIDE = 2,
    }

    interface Attribution {
        iosDeepLinkId?: string;
        source?: string;
        webUrl?: string;
    }

    export class SaveWidget {
        constructor(container: Node, opts?: SaveWidgetOptions) { }
        public getAttribution(): Attribution { return null; }
        public getPlace(): Place { return null; }
        public setAttribution(attribution: Attribution): void { }
        public setOptions(opts: SaveWidgetOptions): void { }
        public setPlace(place: Place): void { }
    }

    interface SaveWidgetOptions {
        attribution?: Attribution;
        place?: Place;
    }

    export class BicyclingLayer extends MVCObject {
        constructor() { super(); }
        public getMap(): Map { return null; }
        public setMap(map: Map | null): void { }
    }

    export class FusionTablesLayer extends MVCObject {
        constructor(options: FusionTablesLayerOptions) { super(); }
        public getMap(): Map { return null; }
        public setMap(map: Map | null): void { }
        public setOptions(options: FusionTablesLayerOptions): void { }
    }

    interface FusionTablesLayerOptions {
        clickable?: boolean;
        heatmap?: FusionTablesHeatmap;
        map?: Map;
        query?: FusionTablesQuery;
        styles?: FusionTablesStyle[];
        suppressInfoWindows?: boolean;
    }

    interface FusionTablesQuery {
        from?: string;
        limit?: number;
        offset?: number;
        orderBy?: string;
        select?: string;
        where?: string;
    }

    interface FusionTablesStyle {
        markerOptions?: FusionTablesMarkerOptions;
        polygonOptions?: FusionTablesPolygonOptions;
        polylineOptions?: FusionTablesPolylineOptions;
        where?: string;
    }

    interface FusionTablesHeatmap {
        enabled: boolean;
    }

    interface FusionTablesMarkerOptions {
        iconName: string;
    }

    interface FusionTablesPolygonOptions {
        fillColor?: string;
        fillOpacity?: number;
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
    }

    interface FusionTablesPolylineOptions {
        strokeColor?: string;
        strokeOpacity?: number;
        strokeWeight?: number;
    }

    interface FusionTablesMouseEvent {
        infoWindowHtml?: string;
        latLng?: LatLng;
        //pixelOffset?: Size;
        row?: object; // Object<FusionTablesCell>
    }

    interface FusionTablesCell {
        columnName?: string;
        value?: string;
    }

    interface StreetViewPanoramaOptions {
        addressControl?: boolean;
        addressControlOptions?: StreetViewAddressControlOptions;
        clickToGo?: boolean;
        disableDefaultUI?: boolean;
        disableDoubleClickZoom?: boolean;
        enableCloseButton?: boolean;
        fullscreenControl?: boolean;
        fullscreenControlOptions?: FullscreenControlOptions;
        imageDateControl?: boolean;
        linksControl?: boolean;
        motionTracking?: boolean;
        motionTrackingControl?: boolean;
        motionTrackingControlOptions?: MotionTrackingControlOptions;
        mode?: 'html4' | 'html5' | 'webgl';
        panControl?: boolean;
        panControlOptions?: PanControlOptions;
        pano?: string;
        panoProvider?: (input: string) => StreetViewPanoramaData;
        position?: LatLng | LatLngLiteral;
        pov?: StreetViewPov;
        scrollwheel?: boolean;
        visible?: boolean;
        zoom?: number;
        zoomControl?: boolean;
        zoomControlOptions?: ZoomControlOptions;
    }

    interface StreetViewAddressControlOptions {
        position?: ControlPosition;
    }

    interface StreetViewLink {
        description?: string;
        heading?: number;
        pano?: string;
    }

    interface StreetViewPov {
        heading?: number;
        pitch?: number;
    }

    interface StreetViewPanoramaData {
        copyright?: string;
        imageDate?: string;
        links?: StreetViewLink[];
        location?: StreetViewLocation;
        tiles?: StreetViewTileData;
    }

    interface StreetViewLocation {
        description?: string;
        latLng?: LatLng;
        pano?: string;
        shortDescription?: string;
    }

    interface StreetViewTileData {
        getTileUrl(pano: string, tileZoom: number, tileX: number, tileY: number): string;
        centerHeading?: number;
        tileSize?: Size;
        worldSize?: Size;
    }

    export enum StreetViewPreference {
        BEST = 'best',
        NEAREST = 'nearest',
    }

    export enum StreetViewSource {
        DEFAULT = 'default',
        OUTDOOR = 'outdoor',
    }

    interface StreetViewLocationRequest {
        location: LatLng | LatLngLiteral;
        preference?: StreetViewPreference;
        radius?: number;
        source?: StreetViewSource;
    }

    interface StreetViewPanoRequest {
        pano: string;
    }

    export class StreetViewService {
        public getPanorama(
            request: StreetViewLocationRequest | StreetViewPanoRequest,
            cb: (data: StreetViewPanoramaData | null, status: StreetViewStatus) => void,
        ): void {
            return null;
        }
        public getPanoramaById(
            pano: string,
            callback: (streetViewPanoramaData: StreetViewPanoramaData, streetViewStatus: StreetViewStatus) => void,
        ): void {
            return null;
        }
        public getPanoramaByLocation(
            latlng: LatLng | LatLngLiteral,
            radius: number,
            callback: (streetViewPanoramaData: StreetViewPanoramaData, streetViewStatus: StreetViewStatus) => void,
        ): void {
            return null;
        }
    }

    export enum StreetViewStatus {
        OK = 'OK',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
        ZERO_RESULTS = 'ZERO_RESULTS',
    }

    export class StreetViewCoverageLayer extends MVCObject {
        constructor() {
            super();
        }
        public getMap(): Map { return null; }
        public setMap(map: Map | null): void { }
    }

    interface MotionTrackingControlOptions {
        position?: ControlPosition;
    }

    interface PanoProviderOptions {
        cors?: boolean;
    }

    export class StyledMapType extends MVCObject implements MapType {
        public _setMap(map: Map): void { }
        public _layer: atlas.layer.Layer;
        constructor(styles: MapTypeStyle[], options?: StyledMapTypeOptions) { super(); }
        public getTile(tileCoord: Point, zoom: number, ownerDocument: Document): Element { return null; }
        public releaseTile(tile: Element): void { }
        public alt: string;
        public maxZoom: number;
        public minZoom: number;
        public name: string;
        public projection: Projection;
        public radius: number;
        public tileSize: Size;
    }

    interface StyledMapTypeOptions {
        alt?: string;
        maxZoom?: number;
        minZoom?: number;
        name?: string;
    }

    interface MapTypeStyle {
        elementType?: MapTypeStyleElementType;
        featureType?: MapTypeStyleFeatureType;
        stylers?: MapTypeStyler[];
    }

    type MapTypeStyleFeatureType =
        | 'all'
        | 'administrative'
        | 'administrative.country'
        | 'administrative.land_parcel'
        | 'administrative.locality'
        | 'administrative.neighborhood'
        | 'administrative.province'
        | 'landscape'
        | 'landscape.man_made'
        | 'landscape.natural'
        | 'landscape.natural.landcover'
        | 'landscape.natural.terrain'
        | 'poi'
        | 'poi.attraction'
        | 'poi.business'
        | 'poi.government'
        | 'poi.medical'
        | 'poi.park'
        | 'poi.place_of_worship'
        | 'poi.school'
        | 'poi.sports_complex'
        | 'road'
        | 'road.arterial'
        | 'road.highway'
        | 'road.highway.controlled_access'
        | 'road.local'
        | 'transit'
        | 'transit.line'
        | 'transit.station'
        | 'transit.station.airport'
        | 'transit.station.bus'
        | 'transit.station.rail'
        | 'water';

    type MapTypeStyleElementType =
        | 'all'
        | 'geometry'
        | 'geometry.fill'
        | 'geometry.stroke'
        | 'labels'
        | 'labels.icon'
        | 'labels.text'
        | 'labels.text.fill'
        | 'labels.text.stroke';

    interface MapTypeStyler {
        color?: string;
        gamma?: number;
        hue?: string;
        invert_lightness?: boolean;
        lightness?: number;
        saturation?: number;
        visibility?: string;
        weight?: number;
    }

    type DrawingMode = 'Point' | 'LineString' | 'Polygon';
    
    export class TransitLayer extends MVCObject {
        constructor() { super(); }
        public getMap(): void { return null; }
        public setMap(map: Map | null): void { }
    }

    export namespace adsense {
        export class AdUnit extends MVCObject {
            constructor(container: Element, opts: AdUnitOptions) { super(); }
            public getBackgroundColor(): string { return null; }
            public getBorderColor(): string { return null; }
            public getChannelNumber(): string { return null; }
            public getContainer(): Element { return null; }
            public getFormat(): AdFormat { return null; }
            public getMap(): Map { return null; }
            public getPosition(): ControlPosition { return null; }
            public getPublisherId(): string { return null; }
            public getTextColor(): string { return null; }
            public getTitleColor(): string { return null; }
            public getUrlColor(): string { return null; }
            public setBackgroundColor(backgroundColor: string): void { }
            public setBorderColor(borderColor: string): void { }
            public setChannelNumber(channelNumber: string): void { }
            public setFormat(format: AdFormat): void { }
            public setMap(map: Map | null): void { }
            public setPosition(position: ControlPosition): void { }
            public setTextColor(textColor: string): void { }
            public setTitleColor(titleColor: string): void { }
            public setUrlColor(urlColor: string): void { }
        }

        interface AdUnitOptions {
            backgroundColor?: string;
            borderColor?: string;
            channelNumber?: string;
            format?: AdFormat;
            map?: Map;
            position?: ControlPosition;
            publisherId?: string;
            textColor?: string;
            titleColor?: string;
            urlColor?: string;
        }

        export enum AdFormat {
            BANNER = '468x60_as',
            BUTTON = '125x125_as',
            HALF_BANNER = '234x60_as',
            LARGE_HORIZONTAL_LINK_UNIT = '728x15_0ads_al',
            LARGE_RECTANGLE = '336x280_as',
            LARGE_VERTICAL_LINK_UNIT = '180x90_0ads_al',
            LEADERBOARD = '728x90_as',
            MEDIUM_RECTANGLE = '300x250_as',
            MEDIUM_VERTICAL_LINK_UNIT = '160x90_0ads_al',
            SKYSCRAPER = '120x600_as',
            SMALL_HORIZONTAL_LINK_UNIT = '468x15_0ads_al',
            SMALL_RECTANGLE = '180x150_as',
            SMALL_SQUARE = '200x200_as',
            SMALL_VERTICAL_LINK_UNIT = '120x90_0ads_al',
            SQUARE = '250x250_as',
            VERTICAL_BANNER = '120x240_as',
            WIDE_SKYSCRAPER = '160x600_as',
            X_LARGE_VERTICAL_LINK_UNIT = '200x90_0ads_al',
        }
    }
    
    export class ElevationService {
        public getElevationAlongPath(
            request: PathElevationRequest,
            callback: (results: ElevationResult[], status: ElevationStatus) => void,
        ): void { }
        public getElevationForLocations(
            request: LocationElevationRequest,
            callback: (results: ElevationResult[], status: ElevationStatus) => void,
        ): void { }
    }

    interface LocationElevationRequest {
        locations: LatLng[];
    }

    interface PathElevationRequest {
        path?: LatLng[];
        samples?: number;
    }

    interface ElevationResult {
        elevation: number;
        location: LatLng;
        resolution: number;
    }

    enum ElevationStatus {
        INVALID_REQUEST = 'INVALID_REQUEST',
        OK = 'OK',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR',
    }

    export class MaxZoomService {
        public getMaxZoomAtLatLng(latlng: LatLng | LatLngLiteral, callback: (result: MaxZoomResult) => void): void {
            callback({
                status: google.maps.MaxZoomStatus.OK,
                zoom: 19
            });
        }
    }

    interface MaxZoomResult {
        status: MaxZoomStatus;
        zoom: number;
    }

    export enum MaxZoomStatus {
        ERROR = 'ERROR',
        OK = 'OK',
    }

    class SvgParser {
        private static validCommands = /[MmLlHhVvCcSsQqTtAaZz]/g;

        private static commandLengths = {
            A: 7,
            C: 6,
            H: 1,
            L: 2,
            M: 2,
            Q: 4,
            S: 4,
            T: 2,
            V: 1,
            Z: 0
        };

        private static relativeCommands = [
            'a',
            'c',
            'h',
            'l',
            'm',
            'q',
            's',
            't',
            'v'
        ];

        private static optionalArcKeys = ['xAxisRotation', 'largeArcFlag', 'sweepFlag']

        /**
         * Calculates the [minX, miny, width, height] of an svg path.
         * @param d
         */
        public static getPathSize(d: string): [number, number, number, number] {
            var points = SvgParser.getPointsFromPath(d);

            var minX = points[0].x;
            var minY = points[0].y;
            var maxX = points[0].x;
            var maxY = points[0].y;

            points.forEach(p => {
                if (p.x < minX) {
                    minX = p.x;
                }

                if (p.x > maxX) {
                    maxX = p.x;
                }

                if (p.y < minY) {
                    minY = p.y;
                }

                if (p.y > maxY) {
                    maxY = p.y;
                }
            });

            return [minX, minY, maxX - minX, maxY - minY];
        }

        private static getPointsFromPath(d: string): any {
            const commands = d.match(SvgParser.validCommands);
            const params = d.split(SvgParser.validCommands)
                .map(v => v.replace(/[0-9]+-/g, m => `${m.slice(0, -1)} -`))
                .map(v => v.replace(/\.[0-9]+/g, m => `${m} `))
                .map(v => v.trim())
                .filter(v => v.length > 0)
                .map(v => v.split(/[ ,]+/)
                    .map(parseFloat)
                    .filter(n => !isNaN(n))
                );

            const points = []

            let moveTo

            for (let i = 0, l = commands.length; i < l; i++) {
                const command = commands[i]
                const upperCaseCommand = command.toUpperCase()
                const commandLength = SvgParser.commandLengths[upperCaseCommand]
                const relative = SvgParser.relativeCommands.indexOf(command) !== -1;

                if (commandLength > 0) {
                    const commandParams = params.shift()
                    const iterations = commandParams.length / commandLength

                    for (let j = 0; j < iterations; j++) {
                        const prevPoint = points[points.length - 1] || { x: 0, y: 0 }

                        switch (upperCaseCommand) {
                            case 'M':
                                const x = (relative ? prevPoint.x : 0) + commandParams.shift()
                                const y = (relative ? prevPoint.y : 0) + commandParams.shift()

                                if (j === 0) {
                                    moveTo = { x, y }
                                    points.push({ x, y, moveTo: true })
                                } else {
                                    points.push({ x, y })
                                }
                                break;
                            case 'L':
                                points.push({
                                    x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                    y: (relative ? prevPoint.y : 0) + commandParams.shift()
                                });
                                break;
                            case 'H':
                                points.push({
                                    x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                    y: prevPoint.y
                                });
                                break;
                            case 'V':
                                points.push({
                                    x: prevPoint.x,
                                    y: (relative ? prevPoint.y : 0) + commandParams.shift()
                                });
                                break;
                            case 'A':
                                points.push({
                                    curve: {
                                        type: 'arc',
                                        rx: commandParams.shift(),
                                        ry: commandParams.shift(),
                                        xAxisRotation: commandParams.shift(),
                                        largeArcFlag: commandParams.shift(),
                                        sweepFlag: commandParams.shift()
                                    },
                                    x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                    y: (relative ? prevPoint.y : 0) + commandParams.shift()
                                });

                                for (let k of SvgParser.optionalArcKeys) {
                                    if (points[points.length - 1]['curve'][k] === 0) {
                                        delete points[points.length - 1]['curve'][k]
                                    }
                                }
                                break;
                            case 'C':
                                points.push({
                                    curve: {
                                        type: 'cubic',
                                        x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                        y1: (relative ? prevPoint.y : 0) + commandParams.shift(),
                                        x2: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                        y2: (relative ? prevPoint.y : 0) + commandParams.shift()
                                    },
                                    x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                    y: (relative ? prevPoint.y : 0) + commandParams.shift()
                                });
                                break;
                            case 'S':
                                var sx2 = (relative ? prevPoint.x : 0) + commandParams.shift()
                                var sy2 = (relative ? prevPoint.y : 0) + commandParams.shift()
                                var sx = (relative ? prevPoint.x : 0) + commandParams.shift()
                                var sy = (relative ? prevPoint.y : 0) + commandParams.shift()

                                var diff: any = {}

                                let sx1
                                let sy1

                                if (prevPoint.curve && prevPoint.curve.type === 'cubic') {
                                    diff.x = Math.abs(prevPoint.x - prevPoint.curve.x2)
                                    diff.y = Math.abs(prevPoint.y - prevPoint.curve.y2)
                                    sx1 = prevPoint.x < prevPoint.curve.x2 ? prevPoint.x - diff.x : prevPoint.x + diff.x
                                    sy1 = prevPoint.y < prevPoint.curve.y2 ? prevPoint.y - diff.y : prevPoint.y + diff.y
                                } else {
                                    diff.x = Math.abs(sx - sx2)
                                    diff.y = Math.abs(sy - sy2)
                                    sx1 = prevPoint.x
                                    sy1 = prevPoint.y
                                }

                                points.push({ curve: { type: 'cubic', x1: sx1, y1: sy1, x2: sx2, y2: sy2 }, x: sx, y: sy });
                                break;
                            case 'Q':
                                points.push({
                                    curve: {
                                        type: 'quadratic',
                                        x1: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                        y1: (relative ? prevPoint.y : 0) + commandParams.shift()
                                    },
                                    x: (relative ? prevPoint.x : 0) + commandParams.shift(),
                                    y: (relative ? prevPoint.y : 0) + commandParams.shift()
                                });
                                break;
                            case 'T':
                                const tx = (relative ? prevPoint.x : 0) + commandParams.shift();
                                const ty = (relative ? prevPoint.y : 0) + commandParams.shift();

                                let tx1
                                let ty1

                                if (prevPoint.curve && prevPoint.curve.type === 'quadratic') {
                                    const diff = {
                                        x: Math.abs(prevPoint.x - prevPoint.curve.x1),
                                        y: Math.abs(prevPoint.y - prevPoint.curve.y1)
                                    }

                                    tx1 = prevPoint.x < prevPoint.curve.x1 ? prevPoint.x - diff.x : prevPoint.x + diff.x
                                    ty1 = prevPoint.y < prevPoint.curve.y1 ? prevPoint.y - diff.y : prevPoint.y + diff.y
                                } else {
                                    tx1 = prevPoint.x
                                    ty1 = prevPoint.y
                                }

                                points.push({ curve: { type: 'quadratic', x1: tx1, y1: ty1 }, x: tx, y: ty });
                                break;
                        }
                    }
                } else {
                    const prevPoint = points[points.length - 1] || { x: 0, y: 0 }

                    if (prevPoint.x !== moveTo.x || prevPoint.y !== moveTo.y) {
                        points.push({ x: moveTo.x, y: moveTo.y })
                    }
                }
            }

            return points
        }
    }
}

module cluster {
    /**
     * Optional parameter passed to the {@link MarkerClusterer} constructor.
     */
    interface MarkerClustererOptions {
        /**
         * The grid size of a cluster in pixels. The grid is a square.
         *
         * @default `60`
         */
        gridSize?: number;
        /**
         * The maximum zoom level at which clustering is enabled or
         * `null` if clustering is to be enabled at all zoom levels.
         *
         * @default `null`
         */
        maxZoom?: number;

        /**
         * Whether to zoom the map when a cluster marker is
         * clicked. You may want to set this to `false` if you have installed a handler
         * for the `click` event and it deals with zooming on its own.
         *
         * @default `true`
         */
        zoomOnClick?: boolean;
        /***
         * Whether the position of a cluster marker should be
         * the average position of all markers in the cluster. If set to `false`, the
         * cluster marker is positioned at the location of the first marker added to the cluster.
         *
         * @default `false`
         */
        // averageCenter?: boolean;
        /**
         * The minimum number of markers needed in a cluster
         * before the markers are hidden and a cluster marker appears.
         *
         * @default `2`
         */
        // minimumClusterSize?: number;

        /**
         *  the z-index of a cluster.
         *
         *  @default `google.maps.Marker.MAX_ZINDEX + 1`
         */
        // zIndex?: number;

        /**
         * Whether to ignore hidden markers in clusters. You
         * may want to set this to `true` to ensure that hidden markers are not included
         * in the marker count that appears on a cluster marker (this count is the value of the
         * `text` property of the result returned by the default  {@link calculator}).
         * If set to `true` and you change the visibility of a marker being clustered, be
         * sure to also call {@link MarkerClusterer#repaint()}.
         *
         * @default `false`
         */
        //ignoreHidden?: boolean;
        /**
         * The tooltip to display when the mouse moves over a cluster
         * marker. (Alternatively, you can use a custom `calculator` function to specify a
         * different tooltip for each cluster marker.)
         *
         * @default `""`
         */
        //title?: string;
        /**
         * The function used to determine
         * the text to be displayed on a cluster marker and the index indicating which style to use
         * for the cluster marker. The input parameters for the function are (1) the array of markers
         * represented by a cluster marker and (2) the number of cluster icon styles. It returns a
         * {@link ClusterIconInfo} object. The default `calculator` returns a
         * `text` property which is the number of markers in the cluster and an
         * `index` property which is one higher than the lowest integer such that
         * `10^i` exceeds the number of markers in the cluster, or the size of the styles
         * array, whichever is less. The `styles` array element used has an index of
         * `index` minus 1. For example, the default `calculator` returns a
         * `text` value of `"125"` and an `index` of `3`
         * for a cluster icon representing 125 markers so the element used in the `styles`
         * array is `2`. A `calculator` may also return a `title`
         * property that contains the text of the tooltip to be used for the cluster marker. If
         * `title` is not defined, the tooltip is set to the value of the `title`
         * property for the MarkerClusterer.
         *
         * @default {@link MarkerClusterer.CALCULATOR}
         */
        //calculator?: Calculator;
        /**
         * The name of the CSS class defining general styles
         * for the cluster markers. Use this class to define CSS styles that are not set up by the code
         * that processes the `styles` array.
         *
         * @default `"cluster"`
         */
        //clusterClass?: string;
        /**
         * An array of {@link ClusterIconStyle} elements defining the styles
         * of the cluster markers to be used. The element to be used to style a given cluster marker
         * is determined by the function defined by the `calculator` property.
         * The default is an array of {@link ClusterIconStyle} elements whose properties are derived
         * from the values for `imagePath`, `imageExtension`, and `imageSizes`.
         *
         * @default `styles`
         */
        //  styles?: ClusterIconStyle[];
        /**
         * Whether to allow the use of cluster icons that
         * have sizes that are some multiple (typically double) of their actual display size. Icons such
         * as these look better when viewed on high-resolution monitors such as Apple's Retina displays.
         * Note: if this property is `true`, sprites cannot be used as cluster icons.
         *
         * @default `false`
         */
        //enableRetinaIcons?: boolean;
        /**
         * Set this property to the number of markers to be processed in a single batch when using
         * a browser other than Internet Explorer (for Internet Explorer, use the batchSizeIE property instead).
         *
         * @default `MarkerClusterer.BATCH_SIZE`
         */
        // batchSize?: number;
        /**
         * When Internet Explorer is
         * being used, markers are processed in several batches with a small delay inserted between
         * each batch in an attempt to avoid Javascript timeout errors. Set this property to the
         * number of markers to be processed in a single batch; select as high a number as you can
         * without causing a timeout error in the browser. This number might need to be as low as 100
         * if 15,000 markers are being managed, for example.
         *
         * @default `MarkerClusterer.BATCH_SIZE_IE`
         */
        //batchSizeIE?: number;
        /**
         * The full URL of the root name of the group of image files to use for cluster icons.
         * The complete file name is of the form `imagePath`n.`imageExtension`
         * where n is the image file number (1, 2, etc.).
         *
         * @default `MarkerClusterer.IMAGE_PATH`
         */
        imagePath?: string;
        /**
         * The extension name for the cluster icon image files (e.g., `"png"` or
         * `"jpg"`).
         *
         * @default `MarkerClusterer.IMAGE_EXTENSION`
         */
        imageExtension?: string;
        /**
         * An array of numbers containing the widths of the group of
         * `imagePath`n.`imageExtension` image files.
         * (The images are assumed to be square.)
         *
         * @default `MarkerClusterer.IMAGE_SIZES`
         */
        imageSizes?: number[];
        /**
         * A function to take the text attribute associated with the cluster and output a string to attach an
         * ariaLabel to the cluster
         */
        // ariaLabelFn?: AriaLabelFn;
    }

    export class MarkerClusterer extends google.maps.Data {
        /**
         * The number of markers to process in one batch.
         */
        static BATCH_SIZE = 2000;

        /**
         * The number of markers to process in one batch (IE only).
         */
        static BATCH_SIZE_IE = 500;

        /**
         * The default root name for the marker cluster images.
         */
        static IMAGE_PATH = "../images/m";

        /**
         * The default extension name for the marker cluster images.
         */
        static IMAGE_EXTENSION = "png";

        /**
         * The default array of sizes for the marker cluster images.
         */
        static IMAGE_SIZES: number[] = [53, 56, 66, 78, 90];

        private _markers: google.maps.Marker[] = [];
        private _options: MarkerClustererOptions = {
            imageSizes: MarkerClusterer.IMAGE_SIZES,
            imageExtension: 'png',
            gridSize: 60,
            maxZoom: null,
            zoomOnClick: true
        };

        private _bubbleShadowLayer: atlas.layer.BubbleLayer;

        constructor(
            map: google.maps.Map,
            markers: google.maps.Marker[] = [],
            private options: MarkerClustererOptions = {}
        ) {
            super();
            Object.assign(this._options, options || {});

            this._ds.setOptions({
                cluster: true,
                clusterMaxZoom: this._options.maxZoom || 18,
                clusterRadius: this._options.gridSize
            });

            this._markers = markers || [];

            this.setMap(map);
        }

        public setMap(map: google.maps.Map): void {
            super.setMap(map);

            if (map) {
                map._map.events.add('ready', () => {
                    var s = [];

                    this._markers.forEach(x => {
                        s.push(x._getShape())
                    });

                    this._ds.add(s);

                    if (!this._bubbleShadowLayer) {
                        var c = <atlas.Expression>[
                            "step",
                            ["get", "point_count"],
                            "#009dff",
                            10, "rgb(241,211,87)",
                            100, "rgb(253,156,115)"
                        ];

                        this._bubbleLayer.setOptions({
                            strokeOpacity: 0.6,
                            strokeWidth: 6,
                            strokeColor: c
                        });

                        this._bubbleShadowLayer = new atlas.layer.BubbleLayer(this._ds, null, {
                            filter: ["all",
                                ["has", "point_count"],
                                ["any",
                                    ["==", ["geometry-type"], "Point"],
                                    ["==", ["geometry-type"], "MultiPoint"]
                                ]
                            ],
                            radius: 22,
                            opacity: 0,
                            strokeWidth: 6,
                            strokeOpacity: 0.3,
                            strokeColor: c
                        });
                    }

                    map._map.layers.add(this._bubbleShadowLayer, this._bubbleLayer);

                    map._map.events.add('click', this._bubbleLayer, (e) => {
                        if (this._options.zoomOnClick && e.shapes && e.shapes.length > 0) {
                            var props: any;
                            var pos: atlas.data.Position;

                            if (e.shapes[0] instanceof atlas.Shape) {
                                props = (<atlas.Shape>e.shapes[0]).getProperties();
                                pos = <atlas.data.Position>(<atlas.Shape>e.shapes[0]).getCoordinates();
                            } else {
                                var f = <atlas.data.Feature<atlas.data.Point, any>>e.shapes[0];
                                props = f.properties;
                                pos = f.geometry.coordinates;
                            }

                            if (props.cluster) {
                                this._ds.getClusterExpansionZoom(props.cluster_id).then((zoom) => {

                                    //Update the map camera to be centered over the cluster. 
                                    this.get('map')._map.setCamera({
                                        center: pos,
                                        zoom: zoom,
                                        type: 'ease',
                                        duration: 200
                                    });
                                });
                            }
                        }
                    });
                });
            }
        }

        public fitMapToMarkers(): void {
            const markers = this.getMarkers();
            const bounds = new google.maps.LatLngBounds();
            for (let i = 0; i < markers.length; i++) {
                bounds.extend(markers[i].getPosition());
            }

            this.get('map').fitBounds(bounds);
        }

        public getGridSize(): number {
            return this.options.gridSize;
        }

        public setGridSize(gridSize: number): void {
            this.options.gridSize = gridSize;
            this._ds.setOptions({
                radius: gridSize
            });
        }

        public getMaxZoom(): number {
            return this.options.maxZoom;
        }

        public setMaxZoom(maxZoom: number): void {
            this.options.maxZoom = maxZoom;
            this._ds.setOptions({
                maxZoom: maxZoom || 18
            });
        }

        public getZoomOnClick(): boolean {
            return this.options.zoomOnClick;
        }

        public setZoomOnClick(zoomOnClick: boolean): void {
            this.options.zoomOnClick = zoomOnClick;
        }

        public getMarkers(): google.maps.Marker[] {
            return this._markers;
        }

        public getTotalMarkers(): number {
            return this._markers.length;
        }

        public addMarker(marker: google.maps.Marker, nodraw?: boolean): void {
            if (marker) {
                this._markers.push(marker);
                this._ds.add(marker._getShape());
            }
        }

        public addMarkers(markers: google.maps.Marker[], nodraw?: boolean): void {
            if (markers) {
                this._markers = this._markers.concat(markers);

                var s = [];
                markers.forEach(x => {
                    s.push(x._getShape());
                });
                this._ds.add(s);
            }
        }

        public removeMarker(marker: google.maps.Marker, nodraw?: boolean): boolean {
            var m = this._markers.slice(this._markers.indexOf(marker), 1)[0];
            this._ds.remove(m._getShape());
            return true;
        }

        public removeMarkers(markers: google.maps.Marker[], nodraw?: boolean): boolean {
            for (var i = markers.length; i >= 0; i--) {
                this.removeMarker(markers[i], true);
            }
            return true;
        }

        public clearMarkers(): void {
            this.removeMarkers(this._markers);
            this._markers = [];
        }

        //Not supported

        public getMinimumClusterSize(): number { return 2; }
        public setMinimumClusterSize(minimumClusterSize: number): void { }
        public getEnableRetinaIcons(): boolean { return false; }
        public setEnableRetinaIcons(enableRetinaIcons: boolean): void { }
        public getCalculator(): Calculator { return null; }
        public setCalculator(calculator: Calculator): void { }
        public getBatchSizeIE(): number { return MarkerClusterer.BATCH_SIZE_IE; }
        public setBatchSizeIE(batchSizeIE: number): void { }
        public getClusterClass(): string { return null; }
        public setClusterClass(clusterClass: string): void { }
        public getZIndex(): number { return 0; }
        public setZIndex(zIndex: number): void { }
        public getStyles(): ClusterIconStyle[] { return null; }
        public setStyles(styles: ClusterIconStyle[]): void { }
        public getTitle(): string { return ''; }
        public setTitle(title: string): void { }
        public getAverageCenter(): boolean { return false; }
        public setAverageCenter(averageCenter: boolean): void { }
        public getIgnoreHidden(): boolean { return false; }
        public setIgnoreHidden(ignoreHidden: boolean): void { }
        public getClusters(): Cluster[] {
            return null;
        }
        public getTotalClusters(): number {
            return 0;
        }

        public getImageExtension(): string {
            return this.options.imageExtension;
        }

        public setImageExtension(imageExtension: string): void {
            this.options.imageExtension = imageExtension;
        }

        public getImagePath(): string {
            return this.options.imagePath;
        }

        public setImagePath(imagePath: string): void {
            this.options.imagePath = imagePath;
        }

        public getImageSizes(): number[] {
            return this._options.imageSizes;
        }

        public setImageSizes(imageSizes: number[]): void {
            this._options.imageSizes = imageSizes;
        }

    }

    interface Cluster { }
    interface ClusterIconStyle { }
    interface Calculator { }
}

(function () {
    //Load the Atlas CSS Styles.
    var loadCss = function (href: string) {
        var styles = document.createElement('link');
        styles.setAttribute('type', 'text/css');
        styles.setAttribute('rel', 'stylesheet');
        styles.setAttribute('href', href);
        document.head.appendChild(styles);
    };

    loadCss('https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.css');
    loadCss('https://atlas.microsoft.com/sdk/javascript/drawing/0/atlas-drawing.min.css');

    var style = document.createElement('style');
    style.innerHTML = '.pac-container{background-color:#fff;position:absolute!important;z-index:1000;border-radius:2px;border-top:1px solid #d9d9d9;font-family:Arial,sans-serif;box-shadow:0 2px 6px rgba(0,0,0,.3);-moz-box-sizing:border-box;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.pac-item{cursor:default;padding:0 4px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:30px;text-align:left;border-top:1px solid #e6e6e6;font-size:11px;color:#999}.pac-item:hover{background-color:#fafafa}.pac-item-query{font-size:13px;padding-right:3px;color:#000}.pac-item-selected,.pac-item-selected:hover{background-color:#ebf2fe}.pac-matched{font-weight:700}.pac-icon{width:15px;height:20px;margin-right:7px;margin-top:6px;display:inline-block;vertical-align:top;background-image:url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNC41IDM2LjUiIHdpZHRoPSIxMy41IiBoZWlnaHQ9IjIwIiBkaXNwbGF5PSJibG9jayI+PHBhdGggZD0iTTEyLjI1LjI1YTEyLjI1NDMsMTIuMjU0MywwLDAsMC0xMiwxMi40OTM3YzAsNi40NDM2LDYuNDg3OSwxMi4xMDkzLDExLjA1OSwyMi41NjQxLjU0OTMsMS4yNTYzLDEuMzMyNywxLjI1NjMsMS44ODIsMEMxNy43NjIxLDI0Ljg1MjksMjQuMjUsMTkuMTg1NywyNC4yNSwxMi43NDM3QTEyLjI1NDMsMTIuMjU0MywwLDAsMCwxMi4yNS4yNVoiIGZpbGw9IiNiM2IzYjMiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjx0ZXh0IHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyMHB4O2ZpbGw6d2hpdGU7IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSI1MCUiIHk9IjE4Ij7il488L3RleHQ+PC9zdmc+\');background-repeat: no-repeat;}.pac-item-selected .pac-icon {background-image: url(\'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNC41IDM2LjUiIHdpZHRoPSIxMy41IiBoZWlnaHQ9IjIwIiBkaXNwbGF5PSJibG9jayI+PHBhdGggZD0iTTEyLjI1LjI1YTEyLjI1NDMsMTIuMjU0MywwLDAsMC0xMiwxMi40OTM3YzAsNi40NDM2LDYuNDg3OSwxMi4xMDkzLDExLjA1OSwyMi41NjQxLjU0OTMsMS4yNTYzLDEuMzMyNywxLjI1NjMsMS44ODIsMEMxNy43NjIxLDI0Ljg1MjksMjQuMjUsMTkuMTg1NywyNC4yNSwxMi43NDM3QTEyLjI1NDMsMTIuMjU0MywwLDAsMCwxMi4yNS4yNVoiIGZpbGw9IiNlYTQzMzUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjx0ZXh0IHN0eWxlPSJmb250LWZhbWlseTpBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyMHB4O2ZpbGw6d2hpdGU7IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiB4PSI1MCUiIHk9IjE4Ij7il488L3RleHQ+PC9zdmc+\')}.pac-placeholder{color:gray}.directions-container{width:100%;height:100%;font-size:16px;font-family:Arial,sans-serif;font-weight:300;background-color:#fff;overflow-y:auto;line-height:30px}.directions-container table{margin:5px;width:calc(100% - 10px);border-collapse:collapse}.directions-container table td{vertical-align:top}.directions-waypoint{border:1px solid silver;background-color:#eee}.directions-waypoint td:nth-child(1){text-align:center;padding-top:10px}.directions-waypoint td:nth-child(2){vertical-align:middle;margin:10px 0 10px 0}.directions-step{border-top:1px solid #cdcdcd}.directions-step td:nth-child(1){text-align:center}.marker-drop{animation-name:marker-drop;animation-fill-mode:both;animation-duration:.4s}@keyframes marker-drop{0%{transform:translateY(-250px)}100%,50%{transform:translateY(0)}75%{transform:translateY(-20px)}}.marker-bounce{animation:marker-bounce .7s ease-in-out infinite}@keyframes marker-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}';

    document.head.appendChild(style);

    var loadScriptAsync = function (src: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            var script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.setAttribute('src', 'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js');
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            script.src = src;
            document.head.appendChild(script);
        });
    };

    var loadScriptSync = function (src: string): void {
        var request = new XMLHttpRequest();
        request.open('GET', src, false);  // `false` makes the request synchronous
        request.send(null);

        var script = document.createElement('script');
        script.setAttribute('type', 'text/javascript');
        script.innerHTML = request.responseText;
        document.head.appendChild(script);
    };

    var loadScripts = function (scripts: string[], lang: string, region: string, key: string, callback: string): void {
        if (callback) {
            //Load async
            loadScriptAsync(scripts.shift()).then(() => {

                var promisies = scripts.map(s => {
                    return loadScriptAsync(s);
                });

                Promise.all(promisies).then(() => {
                    atlas.setLanguage(lang);
                    atlas.setView(region);
                    atlas.setSubscriptionKey(key);

                    //Overwrite marker clusterer class with custom version.
                    window['MarkerClusterer'] = cluster.MarkerClusterer;
                    window[callback]();
                });
            });
        } else {
            //Load synchoronously.
            scripts.forEach(s => {
                loadScriptSync(s);
            });

            atlas.setLanguage(lang);
            atlas.setView(region);
            atlas.setSubscriptionKey(key);
        }
    };

    var azScripts = [
        'https://atlas.microsoft.com/sdk/javascript/mapcontrol/2/atlas.min.js',
        'https://atlas.microsoft.com/sdk/javascript/service/2/atlas-service.min.js',
        'https://atlas.microsoft.com/sdk/javascript/drawing/0/atlas-drawing.min.js',
        'https://atlas.microsoft.com/sdk/javascript/spatial/0/atlas-spatial.min.js'
    ];

    var scripts = document.getElementsByTagName('script');

    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf('GoogleMapsToAzureMapsShim') > -1) {
            var params = new URLSearchParams(scripts[i].src.substr(scripts[i].src.indexOf('?')));

            var lang = params.has('language') ? params.get('language') : 'en-US';
            var region = 'Auto';
            var key = params.get('key')
            var callback = params.get('callback');

            loadScripts(azScripts, lang, region, key, callback);
            break;
        }
    }
}())
