


/// <reference path="AzureMaps.d.ts"/>

declare namespace atlas {

    export interface RequestParameters {
        headers?: object;
        url?: string;
    }

    export module service {
        export type RestError = {
            code?: string;
            statusCode?: number;
            request?: WebResource;
            response?: HttpOperationResponse;
            body?: any;
        };

        /**
         * An aborter instance implements AbortSignal interface, can abort HTTP requests.
         *
         * - Call Aborter.none to create a new Aborter instance without timeout.
         * - Call Aborter.timeout() to create a new Aborter instance with timeout.
         *
         * For an existing instance aborter:
         * - Call aborter.withTimeout() to create and return a child Aborter instance with timeout.
         * - Call aborter.withValue(key, value) to create and return a child Aborter instance with key/value pair.
         * - Call aborter.abort() to abort current instance and all children instances.
         * - Call aborter.getValue(key) to search and get value with corresponding key from current aborter to all parents.
         *
         * @export
         * @class Aborter
         * @implements {AbortSignalLike}
         */
        export class Aborter implements msRest.AbortSignalLike {
            /**
             * Status of whether aborted or not.
             *
             * @readonly
             * @type {boolean}
             * @memberof Aborter
             */
            readonly aborted: boolean;
            /**
             * Creates a new Aborter instance without timeout.
             *
             * @readonly
             * @static
             * @type {Aborter}
             * @memberof Aborter
             */
            static readonly none: Aborter;
            /**
             * Creates a new Aborter instance with timeout in milliseconds.
             * Set parameter timeout to 0 will not create a timer.
             *
             * @static
             * @param {number} {timeout} in milliseconds
             * @returns {Aborter}
             * @memberof Aborter
             */
            static timeout(timeout: number): Aborter;
            /**
             * onabort event listener.
             *
             * @memberof Aborter
             */
            onabort?: ((ev?: Event) => any);
            private timer?;
            private readonly parent?;
            private readonly children;
            private readonly abortEventListeners;
            private readonly key?;
            private readonly value?;
            /**
             * Private constructor for internal usage, creates an instance of Aborter.
             *
             * @param {Aborter} [parent] Optional. Parent aborter.
             * @param {number} [timeout=0] Optional. Timeout before abort in millisecond, 0 means no timeout.
             * @param {string} [key] Optional. Immutable key in string.
             * @param {(string | number | boolean | null)} [value] Optional. Immutable value.
             * @memberof Aborter
             */
            private constructor();
            /**
             * Create and return a new Aborter instance, which will be appended as a child node of current Aborter.
             * Current Aborter instance becomes parent node of the new instance. When current or parent Aborter node
             * triggers timeout event, all children node's abort event will be triggered too.
             *
             * When timeout parameter (in millisecond) is larger than 0, the abort event will be triggered when timeout.
             * Otherwise, call abort() method to manually abort.
             *
             * @param {number} {timeout} Timeout in millisecond.
             * @returns {Aborter} The new Aborter instance created.
             * @memberof Aborter
             */
            withTimeout(timeout: number): Aborter;
            /**
             * Create and return a new Aborter instance, which will be appended as a child node of current Aborter.
             * Current Aborter instance becomes parent node of the new instance. When current or parent Aborter node
             * triggers timeout event, all children nodes abort event will be triggered too.
             *
             * Immutable key value pair will be set into the new created Aborter instance.
             * Call getValue() to find out latest value with corresponding key in the chain of
             * [current node] -> [parent node] and [grand parent node]....
             *
             * @param {string} key
             * @param {(string | number | boolean | null)} [value]
             * @returns {Aborter}
             * @memberof Aborter
             */
            withValue(key: string, value?: string | number | boolean | null): Aborter;
            /**
             * Find out latest value with corresponding key in the chain of
             * [current node] -> [parent node] -> [grand parent node] -> ... -> [root node].
             *
             * If key is not found, undefined will be returned.
             *
             * @param {string} key
             * @returns {(string | number | boolean | null | undefined)}
             * @memberof Aborter
             */
            getValue(key: string): string | number | boolean | null | undefined;
            /**
             * Trigger abort event immediately, the onabort and all abort event listeners will be triggered.
             * Will try to trigger abort event for all children Aborter nodes.
             *
             * - If there is a timeout, the timer will be cancelled.
             * - If aborted is true, nothing will happen.
             *
             * @returns
             * @memberof Aborter
             */
            abort(): void;
            /**
             * Added new "abort" event listener, only support "abort" event.
             *
             * @param {"abort"} _type Only support "abort" event
             * @param {(this: AbortSignalLike, ev: any) => any} listener
             * @memberof Aborter
             */
            addEventListener(_type: "abort", listener: (this: msRest.AbortSignalLike, ev: any) => any): void;
            /**
             * Remove "abort" event listener, only support "abort" event.
             *
             * @param {"abort"} _type Only support "abort" event
             * @param {(this: AbortSignalLike, ev: any) => any} listener
             * @memberof Aborter
             */
            removeEventListener(_type: "abort", listener: (this: msRest.AbortSignalLike, ev: any) => any): void;
            private cancelByParent;
            private cancelTimer;
        }

        /**
         * The base interface for a geojson helper extension.
         */
        export interface IBaseGeojson {
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * Credential is an abstract class for Azure Maps HTTP requests signing. This
         * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
         *
         * @export
         * @abstract
         * @class Credential
         */
        export abstract class Credential implements msRest.RequestPolicyFactory {
            /**
             * Creates a RequestPolicy object.
             *
             * @param {RequestPolicy} _nextPolicy
             * @param {RequestPolicyOptions} _options
             * @returns {RequestPolicy}
             * @memberof Credential
             */
            create(_nextPolicy: msRest.RequestPolicy, _options: msRest.RequestPolicyOptions): msRest.RequestPolicy;
        }

        /**
         * Credential policy used to sign HTTP(S) requests before sending. This is an
         * abstract class.
         *
         * @export
         * @abstract
         * @class CredentialPolicy
         * @extends {BaseRequestPolicy}
         */
        export abstract class CredentialPolicy extends msRest.BaseRequestPolicy {
            /**
             * Sends out request.
             *
             * @param {WebResource} request
             * @returns {Promise<HttpOperationResponse>}
             * @memberof CredentialPolicy
             */
            sendRequest(request: msRest.WebResource): Promise<msRest.HttpOperationResponse>;
            /**
             * Child classes must implement this method with request signing. This method
             * will be executed in sendRequest().
             *
             * @protected
             * @abstract
             * @param {WebResource} request
             * @returns {WebResource}
             * @memberof CredentialPolicy
             */
            protected signRequest(request: msRest.WebResource): msRest.WebResource | PromiseLike<msRest.WebResource>;
        }

        /**
         * A factory function that creates a new CredentialPolicy that uses the provided nextPolicy.
         */
        export type CredentialPolicyCreator = (nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions) => CredentialPolicy;

        /**
        * IRequestLogOptions configures the retry policy's behavior.
        *
        * @export
        * @interface IRequestLogOptions
        */
        export interface IRequestLogOptions {
            /**
             * LogWarningIfTryOverThreshold logs a warning if a tried operation takes longer than the specified
             * duration in ms. Default is 3000ms.
             * @type {number}
             * @memberof IRequestLogOptions
             */
            logWarningIfTryOverThreshold: number;
        }

        /**
         * LoggingPolicyFactory is a factory class helping generating LoggingPolicy objects.
         *
         * @export
         * @class LoggingPolicyFactory
         * @implements {RequestPolicyFactory}
         */
        export class LoggingPolicyFactory implements msRest.RequestPolicyFactory {
            private readonly loggingOptions?;
            /**
             * Creates an instance of LoggingPolicyFactory.
             * @param {IRequestLogOptions} [loggingOptions]
             * @memberof LoggingPolicyFactory
             */
            constructor(loggingOptions?: IRequestLogOptions);
            create(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions): msRest.BaseRequestPolicy;
        }

        /**
         * MapControlCredential for sharing authentication with an `atlas.Map` instance.
         *
         * @export
         * @class MapControlCredential
         * @extends {Credential}
         */
        export class MapControlCredential extends Credential {
            /**
             * An authenticated `atlas.Map` instance. readonly.
             *
             * @type {atlas.Map}
             * @memberof MapControlCredential
             */
            private readonly map;
            /**
             * Creates an instance of MapControlCredential.
             * @param {atlas.Map} map
             * @memberof MapControlCredential
             */
            constructor(map: atlas.Map);
            /**
             * Creates a MapControlCredentialPolicy object.
             *
             * @param {RequestPolicy} nextPolicy
             * @param {RequestPolicyOptions} options
             * @returns {MapControlCredentialPolicy}
             * @memberof MapControlCredential
             */
            create(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions): MapControlCredentialPolicy;
        }

        /**
         * MapControlCredentialPolicy is a policy used to sign HTTP requests
         * with shared authentication from an `atlas.Map` instance.
         *
         * @export
         * @class MapControlCredentialPolicy
         * @extends {CredentialPolicy}
         */
        export class MapControlCredentialPolicy extends CredentialPolicy {
            /**
             * An authenticated `atlas.Map` instance. readonly.
             *
             * @type {atlas.Map}
             * @memberof MapControlCredentialPolicy
             */
            private readonly map;
            /**
             * Creates an instance of MapControlCredentialPolicy.
             * @param {RequestPolicy} nextPolicy
             * @param {RequestPolicyOptions} options
             * @param {atlas.Map} map
             * @memberof MapControlCredentialPolicy
             */
            constructor(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions, map: atlas.Map);
            /**
             * Signs request.
             *
             * @protected
             * @param {WebResource} request
             * @returns {WebResource}
             * @memberof MapControlCredentialPolicy
             */
            protected signRequest(request: msRest.WebResource): Promise<msRest.WebResource>;
        }

        /**
         * Option interface for MapsURL.newPipeline method.
         *
         * @export
         * @interface INewPipelineOptions
         */
        export interface INewPipelineOptions {
            retryOptions?: IRetryOptions;
            logger?: IHttpPipelineLogger;
            httpClient?: IHttpClient;
        }

        /**
         * Create a new serialization RequestPolicyCreator that will serialized HTTP request bodies as they
         * pass through the HTTP pipeline.
         */
        export function deserializationPolicy(): RequestPolicyFactory;

        /**
         * A MapsURL represents a base URL class for SearchURL, RouteURL and etc.
         *
         * @export
         * @class MapsURL
         */
        export abstract class MapsURL {
            /**
             * A static method used to create a new Pipeline object with Credential provided.
             *
             * @static
             * @param {Credential} credential Such as SubscriptionKeyCredential, TokenCredential, and MapControlCredential.
             * @param {INewPipelineOptions} [pipelineOptions] Optional. Options.
             * @returns {Pipeline} A new Pipeline object.
             * @memberof Pipeline
             */
            static newPipeline(credential: Credential, pipelineOptions?: INewPipelineOptions): Pipeline;
            /**
             * Base URL string value.
             *
             * @type {string}
             * @memberof MapsURL
             */
            readonly mapsUrl: string;
            
            /**
             * Creates an instance of MapsURL.
             * @param {Pipeline} pipeline
             * @param {string} mapsUrl
             * @memberof MapsURL
             */
            protected constructor(pipeline: Pipeline, mapsUrl: string);
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class CarShareGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include one Point feature representing the car share vehicle.
             * The properties of the feature match the properties of the results, except
             * the `position` property is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class MetroAreaGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * Each feature in the collection is a Polygon representing one area.
             * The properties of each feature match the properties of the `MetroAreaResult`, except
             * the `geometry` property is omitted because it is redundant with the feature's geometry.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class NearbyTransitGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * Each feature in the collection is a Point representing one transit object.
             * The properties of each feature match the properties of the `TransitObjectResult`, except
             * the `position` property is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class RealTimeArrivalsGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * Each feature in the collection is a Point representing one arrival.
             * The properties of each feature match the properties of the `RealTimeArrivalResult`, except
             * the `position` property of the stop is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class TransitDockGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include one Point feature representing the dock.
             * The properties of the feature match the properties of the results, except
             * the `position` property is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class TransitItineraryGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the itinerary.
             * Each feature in the collection is a `LineString` representing one leg of the itinerary.
             * Legs which don't specify start and end positions will be omitted from the collection,
             * e.g. `"Wait"` or sometimes `"PathWayWalk"`.
             * If geometry details were requested the LineStrings will follow those geometries.
             * If geometry details were not requested the LineStrings will directly connect the start and end points of the leg.
             * The properties of each feature match the properties of the `Leg`, except
             * the `geometry`, `origin`, and `destination` properties is omitted
             * because they are redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class TransitLineGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * If stop details were requested the collection will contain `Point` features representing each stop.
             * If pattern details were requested the collection will contain `LineString` features representing each pattern.
             * Features representing stops will have properties matching the `Stop`, except `position` will be omitted.
             * Features representing patterns will have properties matching the `Pattern`, except geometry will be omitted.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class TransitStopGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include one Point feature representing the `Stop`.
             * The properties of the feature match the properties of the results, except
             * the `position` property of the stop is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        // Responses
        export type GetCarShareInfoResponse = Response<Models.CarShareResponse, Models.MobilityGetCarShareInfoPreviewResponse, CarShareGeojson>;
        export type GetMetroAreaResponse = Response<Models.MetroAreaResponse, Models.MobilityGetMetroAreaPreviewResponse, MetroAreaGeojson>;
        export type GetMetroAreaInfoResponse = Response<Models.MetroAreaInfoResponse, Models.MobilityGetMetroAreaInfoPreviewResponse>;
        export type GetNearbyTransitResponse = Response<Models.NearbyTransitResponse, Models.MobilityGetNearbyTransitPreviewResponse, NearbyTransitGeojson>;
        export type GetRealTimeArrivalsResponse = Response<Models.RealTimeArrivalsResponse, Models.MobilityGetRealTimeArrivalsPreviewResponse, RealTimeArrivalsGeojson>;
        export type GetTransitDockInfoResponse = Response<Models.TransitDockInfoResponse, Models.MobilityGetTransitDockInfoPreviewResponse, TransitDockGeojson>;
        export type GetTransitItineraryResponse = Response<Models.TransitItineraryResponse, Models.MobilityGetTransitItineraryPreviewResponse, TransitItineraryGeojson>;
        export type GetTransitLineInfoResponse = Response<Models.TransitLineInfoResponse, Models.MobilityGetTransitLineInfoPreviewResponse, TransitLineGeojson>;
        export type GetTransitRouteResponse = Response<Models.TransitRouteResponse, Models.MobilityGetTransitRoutePreviewResponse>;
        export type GetTransitStopInfoResponse = Response<Models.TransitStopInfoResponse, Models.MobilityGetTransitStopInfoPreviewResponse, TransitStopGeojson>;

        // Options
        export type GetCarShareInfoOptions = Models.MobilityGetCarShareInfoPreviewOptionalParams;
        export type GetMetroAreaOptions = Models.MobilityGetMetroAreaPreviewOptionalParams;
        export type GetMetroAreaInfoOptions = Models.MobilityGetMetroAreaInfoPreviewOptionalParams;
        export type GetNearbyTransitOptions = Models.MobilityGetNearbyTransitPreviewOptionalParams;
        export type GetRealTimeArrivalsOptions = Models.MobilityGetRealTimeArrivalsPreviewOptionalParams;
        export type GetTransitDockInfoOptions = Models.MobilityGetTransitDockInfoPreviewOptionalParams;
        export type GetTransitItineraryOptions = Models.MobilityGetTransitItineraryPreviewOptionalParams;
        export type GetTransitLineInfoOptions = Models.MobilityGetTransitLineInfoPreviewOptionalParams;
        export type GetTransitRouteOptions = Models.MobilityGetTransitRoutePreviewOptionalParams;
        export type GetTransitStopInfoOptions = Models.MobilityGetTransitStopInfoPreviewOptionalParams;

        /**
         * A MobilityURL represents a URL to the Azure Maps mobility operations.
         *
         * @export
         * @class MobilityURL
         * @extends {MapsURL}
         */
        export class MobilityURL extends MapsURL {
            /**
             * mobilityContext provided by protocol layer.
             *
             * @private
             * @type {Mobility}
             * @memberof MobilityURL
             */
            private mobilityContext;
            /**
             * Creates an instance of MobilityURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof MobilityURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Requests static and real-time information for a given car share vehicle.
             * Response contains details such as availability and vacancy information and operator details. The
             * service supplements [Nearby Transit API](https://aka.ms/AzureMapsMobilityNearbyTransit).
             *
             * Uses the Get Car Share Info API: https://docs.microsoft.com/rest/api/maps/mobility/getcarshareinfopreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query vehicleId. The unique identifier of the car share vehicle. For example,
             * "29B8C4AFC062D681E050007F01004F07". Can be requested by using [Nearby Transit
             * API](https://aka.ms/AzureMapsMobilityNearbyTransit).
             * @param {GetCarShareInfoOptions} [options] The optional parameters
             * @returns {Promise<GetCarShareInfoResponse>}
             * @memberof MobilityURL
             */
            getCarShareInfo(aborter: Aborter, query: string, options?: GetCarShareInfoOptions): Promise<GetCarShareInfoResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Request metro areas in which the Azure Maps Mobility Service is available. The
             * service supports filtering results by country or coordinate location. Information returned
             * includes Metro Area  details such as metro Id, name and a representation of the metro area
             * geometry in GeoJSON format.
             *
             * Uses the Get Metro Area API: https://docs.microsoft.com/rest/api/maps/mobility/getmetroareapreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position | string} query The applicable location input. Can be a GeoJSON position or countryCode
             * (2-character ISO country code).
             * @param {GetMetroAreaOptions} [options] The optional parameters
             * @returns {Promise<GetMetroAreaResponse>}
             * @memberof MobilityURL
             */
            getMetroArea(aborter: Aborter, query: atlas.data.Position | string, options?: GetMetroAreaOptions): Promise<GetMetroAreaResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Request additional information for metro areas in which the Azure Maps
             * Mobility Service is available. Information such as supported transit types, transit agencies and
             * active alerts is available, depending on the options selected.
             *
             * Uses the Get Metro Area Info API: https://docs.microsoft.com/rest/api/maps/mobility/getmetroareainfopreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} query metroId. The unique id of the metro area. Required parameter specifying the
             * required metro area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityTransitRoute).
             * @param {Models.MetroAreaDetailType} detailType Specify details requested respective to the metro area as a comma separated
             * list.
             * @param {GetMetroAreaInfoOptions} [options] The optional parameters
             * @returns {Promise<GetMetroAreaInfoResponse>}
             * @memberof MobilityURL
             */
            getMetroAreaInfo(aborter: Aborter, query: number, detailType: Models.MetroAreaDetailType[], options?: GetMetroAreaInfoOptions): Promise<GetMetroAreaInfoResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Searches transit objects, for example, public transit
             * stops ans shared bikes around a given location  returning the transit object details. Service
             * allows users to search for specific object types and within a given radius returning a set of
             * transit object with object details. Additional  information such as transit operator information
             * is returned depending on the options selected. The returned information can be used for further
             * processing such as requesting [real-time
             * arrivals](https://aka.ms/AzureMapsMobilityRealTimeArrivals) for the stop or [transit stop
             * details](https://aka.ms/AzureMapsMobilityTransitStop) such as main transit type of most lines
             * stopping for a given public, active service alerts or main transport agency.
             *
             * Uses the Get Nearby Transit API: https://docs.microsoft.com/rest/api/maps/mobility/getnearbytransitpreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} metroId The unique id of the metro area. Required parameter specifying the required metro
             * area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityMetro).
             * @param {atlas.data.Position} location Location input from user.
             * @param {GetNearbyTransitOptions} [options] The optional parameters
             * @returns {Promise<GetNearbyTransitResponse>}
             * @memberof MobilityURL
             */
            getNearbyTransit(aborter: Aborter, metroId: number, location: atlas.data.Position, options?: GetNearbyTransitOptions): Promise<GetNearbyTransitResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Returns for a given a stop, line or location the requested number of
             * real-time arrivals. Endpoint support different modes to request real-time arrivals such as
             * number of live arrivals for all lines arriving at the specified stop or all arrivals of a line
             * to stops near the user’s location. The API supports parameters to request one or multiple public
             * transit types such as bus, tram and subway, maximum number if arrivals, and prefer a specific
             * transit agency operating in the area. In some cases real-time arrivals may not be available, for
             * example, if arrival is too far in the future or transit vehicle does not have capability to
             * share the real-time location. This is symbolized in a scheduleType field present in all
             * responses.
             *
             * Uses Get Real Time Arrivals API: https://docs.microsoft.com/rest/api/maps/mobility/getrealtimearrivalspreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} metroId The unique id of the metro area. Required parameter specifying the required metro
             * area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityMetro).
             * @param {string | string[] | atlas.data.Position} query Stop, line or location identifier.
             * For stop queries a `string` or `string[]` of stop IDs can be provided.
             * For line queries a `string` of the line ID can be provided.
             * For line and stop queries a `string[]` of `["lineId", "stopId"]` can be provided.
             * For position queries a `atlas.data.Position` can be provided.
             * @param {GetRealTimeArrivalsOptions} [options] The optional parameters
             * @returns {Promise<GetRealTimeArrivalsResponse>}
             * @memberof MobilityURL
             */
            getRealTimeArrivals(aborter: Aborter, metroId: number, query: string | string[] | atlas.data.Position, options?: GetRealTimeArrivalsOptions): Promise<GetRealTimeArrivalsResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Request static and real-time information for a given bike or
             * scooter docking station. Response includes availability and vacancy information and operator
             * details. The service supplements [Nearby Transit
             * API](https://aka.ms/AzureMapsMobilityNearbyTransit) that allows you to search nearby bike and
             * scooter docking stations.
             *
             * Uses the Get Transit Dock Info API: https://docs.microsoft.com/rest/api/maps/mobility/gettransitdockinfopreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query dockId. Required parameter specifying the docking station to search for. Can be
             * retrieved via [Get Nearby Transit API](https://aka.ms/AzureMapsMobilityNearbyTransit).
             * @param {GetTransitDockInfoOptions} [options] The optional parameters
             * @returns {Promise<GetTransitDockInfoResponse>}
             * @memberof MobilityURL
             */
            getTransitDockInfo(aborter: Aborter, query: string, options?: GetTransitDockInfoOptions): Promise<GetTransitDockInfoResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Returns data according to an itinerary Id previously returned by [Transit Route
             * API](https://aka.ms/AzureMapsMobilityTransitRoute). The basic info contains data as to the
             * various legs comprising  the itinerary, including the locations, public transit lines, start and
             * end times. User can request additional routing information such as the  shape of the itinerary
             * and detailed itinerary schedules is also available, depending on the options selected. An
             * itinerary is available up to 24  hours following a search request.
             *
             * Uses the Get Transit Itinerary API: https://docs.microsoft.com/rest/api/maps/mobility/gettransititinerarypreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query The unique id (itineraryId) of an itinerary previously returned by [Transit Route
             * API](https://aka.ms/AzureMapsMobilityTransitRoute).
             * @param {GetTransitItineraryOptions} [options] The optional parameters
             * @returns {Promise<GetTransitItineraryResponse>}
             * @memberof MobilityURL
             */
            getTransitItinerary(aborter: Aborter, query: string, options?: GetTransitItineraryOptions): Promise<GetTransitItineraryResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Request line group by line group id returning
             * a line group comprised a set of lines.  Additional information such  as 24 hours static
             * schedule, active alerts for the line group and line patterns is also available, depending on the
             * options  selected. Mobility services uses a parallel data model for public transit lines and
             * line groups. Usually line group contains  2 lines, one going from A to B, and the other
             * returning from B to A, both operating by the same Public Transport Agency having  the same line
             * number. We recommend you review our guidance
             * [article](https://aka.ms/AMapsPublicTRansitConcepts) to understand  the concepts of lines and
             * line groups.
             *
             * Uses the Get Transit Line Info API: https://docs.microsoft.com/rest/api/maps/mobility/gettransitlineinfopreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} metroId The unique id of the metro area. Required parameter specifying the required metro
             * area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityMetro).
             * @param {string} query lineGroupId, for example,'666074'. Typically contains 2 lines having the same
             * agency and line, one going from A to B, and the other from B to A.
             * @param {GetTransitLineInfoOptions} [options] The optional parameters
             * @returns {Promise<GetTransitLineInfoResponse>}
             * @memberof MobilityURL
             */
            getTransitLineInfo(aborter: Aborter, metroId: number, query: string, options?: GetTransitLineInfoOptions): Promise<GetTransitLineInfoResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Allow trip planning returning the best possible route options between
             * an origin and destination by using multi-modal search. Service provides a variety of travel
             * modes, including walk, bike, and public transit.  The API supports parameters to request one or
             * multiple public transit types such as bus, tram and subway, and focus on certain types of bikes,
             * and prefer a specific transit agency operating in the area. Also, service provides options to
             * choose optimal route with least walk or transfers and specify arrival or departure times when
             * user need to be at a specific destination by a certain time.
             *
             * Uses the Get Transit Route API: https://docs.microsoft.com/rest/api/maps/mobility/gettransitroutepreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} metroId The unique id of the metro area. Required parameter specifying the required metro
             * area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityMetro).
             * @param {string | atlas.data.Position} origin The origin of the route.
             * If originType=position a `atlas.data.Position` should be specified.
             * Otherwise, a `string` should be specified.
             * @param {string | atlas.data.Position} destination The destination of the route.
             * If destinationType=position a `atlas.data.Position` should be specified.
             * Otherwise, a `string` should be specified.
             * @param {GetNearbyTransitOptions} [options] The optional parameters
             * @returns {Promise<GetTransitRouteResponse>}
             * @memberof MobilityURL
             */
            getTransitRoute(aborter: Aborter, metroId: number, origin: string | atlas.data.Position, destination: string | atlas.data.Position, options?: GetTransitRouteOptions): Promise<GetTransitRouteResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Requests information for a given public transit stop.
             * Basic information returned includes  details such as main transit type of most lines stopping
             * for a given public and main transport agency. Additional details such as stop  lines, active
             * service alerts for specified stop, photos and user reviews are also available, depending on the
             * options selected.
             *
             * Uses the Get Transit Stop Info API: https://docs.microsoft.com/rest/api/maps/mobility/gettransitstopinfopreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} metroId The unique id of the metro area. Required parameter specifying the required metro
             * area to search in. Can be retrieved via [Get Metro Area
             * API](https://aka.ms/AzureMapsMobilityMetro).
             * @param {string} query The stopId or stopKey for which the user is requesting transit stop details.
             * @param {GetTransitStopInfoOptions} [options] The optional parameters
             * @returns {Promise<GetTransitStopInfoResponse>}
             * @memberof MobilityURL
             */
            getTransitStopInfo(aborter: Aborter, metroId: number, query: string, options?: GetTransitStopInfoOptions): Promise<GetTransitStopInfoResponse>;
        }

        export type IHttpClient = msRest.HttpClient;
        export type IHttpPipelineLogger = msRest.HttpPipelineLogger;
        export type HttpHeaders = msRest.HttpHeaders;
        export type HttpPipelineLogLevel = msRest.HttpPipelineLogLevel;
        export type HttpOperationResponse = msRest.HttpOperationResponse
        export type WebResource = msRest.WebResource;
        export type BaseRequestPolicy = msRest.BaseRequestPolicy
        export type RequestPolicyFactory = msRest.RequestPolicyFactory
        export type RequestPolicy = msRest.RequestPolicy;
        export type RequestPolicyOptions = msRest.RequestPolicyOptions;

        /**
         * Option interface for Pipeline constructor.
         *
         * @export
         * @interface IPipelineOptions
         */
        export interface IPipelineOptions {
            logger?: IHttpPipelineLogger;
            HTTPClient?: IHttpClient;
        }

        /**
         * A Pipeline class containing HTTP request policies.
         * You can create a default Pipeline by calling MapsURL.newPipeline().
         * Or you can create a Pipeline with your own policies by the constructor of Pipeline.
         * Refer to MapsURL.newPipeline() and provided policies as reference before
         * implementing your customized Pipeline.
         *
         * @export
         * @class Pipeline
         */
        export class Pipeline {
            readonly factories: msRest.RequestPolicyFactory[];
            readonly options: IPipelineOptions;
            /**
             * Creates an instance of Pipeline. Customize HTTPClient by implementing IHttpClient interface.
             *
             * @param {RequestPolicyFactory[]} factories
             * @param {IPipelineOptions} [options={}]
             * @memberof Pipeline
             */
            constructor(factories: RequestPolicyFactory[], options?: IPipelineOptions);
        }

        // Responses
        export type GetMapImageryTileResponse = Response<Uint8Array, Models.RenderGetMapImageryTileResponse>;
        export type GetMapTileResponse = Response<Uint8Array, Models.RenderGetMapTileResponse>;
        export type GetMapImageResponse = Response<Uint8Array, Models.RenderGetMapImageResponse>;

        // Options
        export type GetMapImageOptions = Merge<Models.RenderGetMapImageOptionalParams, {
            center?: atlas.data.Position;
            bbox?: atlas.data.BoundingBox;
        }>;
        export type GetMapTileOptions = Models.RenderGetMapTileOptionalParams;

        /**
         * A RenderURL represents a URL to the Azure Maps render operations.
         *
         * @export
         * @class RenderURL
         * @extends {MapsURL}
         */
        export class RenderURL extends MapsURL {
            /**
             * renderContext provided by protocol layer.
             *
             * @private
             * @type {Render}
             * @memberof RenderURL
             */
            private renderContext;
            /**
             * Creates an instance of RenderURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof RenderURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * Returns a map image tile with size 256x256, given the x and y coordinates and zoom
             * level. Zoom level ranges from 0 to 18. The current available style value is 'satellite' which
             * provides satellite
             * imagery alone.
             *
             * Uses the Get Map Imagery Tile API: https://docs.microsoft.com/rest/api/maps/render/getmapimagerytile
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {number} zoom Zoom level for the desired tile. Zoom value must be in the range: 0-18 (inclusive).
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @param {number} xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
             * 2<sup>`zoom`</sup> -1].
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @param {number} yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
             * 2<sup>`zoom`</sup> -1].
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @returns {Promise<GetMapImageryTileResponse>}
             */
            getMapImageryTile(aborter: Aborter, zoom: number, xTileIndex: number, yTileIndex: number): Promise<GetMapImageryTileResponse>;
            /**
             * Returns a map tiles in vector or raster format typically to be integrated into a new map control
             * or SDK. By default, Azure uses vector map tiles for its web map control (see [Zoom Levels and
             * Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid))
             *
             * Uses the Get Map Tile API: https://docs.microsoft.com/rest/api/maps/render/getmaptile
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {Models.TileFormat} format Desired format of the response. Possible values are png & pbf. Possible values
             * include: 'png', 'pbf'
             * @param {Models.MapTileLayer} layer Map layer requested. Possible values are basic, hybrid, labels and terra. Possible
             * values include: 'basic', 'hybrid', 'labels', 'terra'
             * @param {Models.MapTileStyle} style Map style to be returned. Possible values are main & shaded_relief. Possible values
             * include: 'main', 'shaded_relief'
             * @param {number} zoom Zoom level for the desired tile. For _raster_ tiles, value must be in the range:
             * 0-18 (inclusive). Terra raster tiles, values must be in the range 0-6 (inclusive). For _vector_
             * tiles, value must be in the range: 0-22 (inclusive).
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @param {number} xTileIndex X coordinate of the tile on zoom grid. Value must be in the range [0,
             * 2<sup>`zoom`</sup> -1].
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @param {number} yTileIndex Y coordinate of the tile on zoom grid. Value must be in the range [0,
             * 2<sup>`zoom`</sup> -1].
             *
             * Please see [Zoom Levels and Tile
             * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
             * for details.
             * @param {GetMapTileOptions} [options] The optional parameters
             * @returns {Promise<GetMapTileResponse>}
             */
            getMapTile(aborter: Aborter, format: Models.TileFormat, layer: Models.MapTileLayer, style: Models.MapTileStyle, zoom: number, xTileIndex: number, yTileIndex: number, options?: GetMapTileOptions): Promise<GetMapTileResponse>;
            /**
             * Renders a user-defined, rectangular image containing a map section
             * using a zoom level from 0 to 20. The static image service renders a user-defined, rectangular
             * image containing a map section using a zoom level from 0 to 20. The supported resolution range
             * for the map image is from 1x1 to 8192x8192. If you are deciding when to use the static image
             * service over the map tile service, you may want to consider how you would like to interact with
             * the rendered map. If the map contents will be relatively unchanging, a static map is a good
             * choice. If you want to support a lot of zooming, panning and changing of the map content, the
             * map tile service would be a better choice.
             *
             * Service also provides Image Composition functionality to get a static image back with additional
             * data like; pushpins and geometry overlays with following S0 and S1 capabilities.
             *
             * In S0 you can:
             * - Render up to 5 pushpins specified in the request
             * - Provide one custom image for the pins referenced in the request
             * - Add labels to the pushpins
             *
             * In S1 you can:
             * - Render pushpins through [Azure Maps Data Service](https://aka.ms/AzureMapsMapDataService)
             * - Specify multiple pushpin styles
             * - Provide custom pushpin images stored in [Azure Maps Data
             * Service](https://aka.ms/AzureMapsMapDataService)
             * - Render circle, polyline and polygon geometry types.
             * - Render of supported GeoJSON geometry types uploaded through [Azure Maps Data
             * Service](https://aka.ms/AzureMapsMapDataService)
             *
             * Please see [How-to-Guide](https://aka.ms/AzureMapsHowToGuideImageCompositor) for detailed
             * examples.
             *
             * _Note_ : Either **center** or **bbox** parameter must be supplied to the
             * API.
             * <br><br>
             * The supported Lat and Lon ranges when using the **bbox** parameter, are as follows:
             * <br><br>
             *
             * |Zoom Level | Max Lon Range   | Max Lat Range|
             * |:----------|:----------------|:-------------|
             * |0          | 360.0           | 170.0        |
             * |1          | 360.0           | 170.0        |
             * |2          | 360.0           | 170.0        |
             * |3          | 360.0           | 170.0        |
             * |4          | 360.0           | 170.0        |
             * |5          | 180.0           | 85.0         |
             * |6          | 90.0            | 42.5         |
             * |7          | 45.0            | 21.25        |
             * |8          | 22.5            | 10.625       |
             * |9          | 11.25           | 5.3125       |
             * |10         | 5.625           | 2.62625      |
             * |11         | 2.8125          | 1.328125     |
             * |12         | 1.40625         | 0.6640625    |
             * |13         | 0.703125        | 0.33203125   |
             * |14         | 0.3515625       | 0.166015625  |
             * |15         | 0.17578125      | 0.0830078125 |
             * |16         | 0.087890625     | 0.0415039063 |
             * |17         | 0.0439453125    | 0.0207519531 |
             * |18         | 0.0219726563    | 0.0103759766 |
             * |19         | 0.0109863281    | 0.0051879883 |
             * |20         | 0.0054931641    | 0.0025939941 |
             *
             * Uses the Get Map Image API: https://docs.microsoft.com/rest/api/maps/render/getmapimage
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {GetMapImageOptions} [options] The options
             * @returns {Promise<GetMapImageResponse>}
             */
            getMapImage(aborter: Aborter, options: GetMapImageOptions): Promise<GetMapImageResponse>;
            /** Converts a GeoJSON center position to a string which can be used as a query param. */
            private centerToString;
            /** Converts a GeoJSON bbox to a string which can be used as a query param. */
            private bboxToString;
        }

        /**
         * RetryPolicy types.
         *
         * @export
         * @enum {number}
         */
        export enum RetryPolicyType {
            /**
             * Exponential retry. Retry time delay grows exponentially.
             * Literal value `"exponential"`
             */
            EXPONENTIAL = "exponential",
            /**
             * Linear retry. Retry time delay grows linearly.
             * Literal value `"fixed"`
             */
            FIXED = "fixed"
        }

        /**
         * Retry options interface.
         *
         * @export
         * @interface IRetryOptions
         */
        export interface IRetryOptions {
            /**
             * Optional. RetryPolicyType, default is exponential retry policy.
             *
             * @type {RetryPolicyType}
             * @memberof RetryOptions
             */
            readonly retryPolicyType?: RetryPolicyType;
            /**
             * Optional. Max try number of attempts, default is 4.
             * A value of 1 means 1 try and no retries.
             * A value smaller than 1 means default retry number of attempts.
             *
             * @type {number}
             * @memberof IRetryOptions
             */
            readonly maxTries?: number;
            /**
             * Optional. Specifies the amount of delay to use before retrying an operation (default is 4s or 4 * 1000ms).
             * The delay increases (exponentially or linearly) with each retry up to a maximum specified by
             * maxRetryDelayInMs. If you specify 0, then you must also specify 0 for maxRetryDelayInMs.
             *
             * @type {number}
             * @memberof IRetryOptions
             */
            readonly retryDelayInMs?: number;
            /**
             * Optional. Specifies the maximum delay allowed before retrying an operation (default is 120s or 120 * 1000ms).
             * If you specify 0, then you must also specify 0 for retryDelayInMs.
             *
             * @type {number}
             * @memberof IRetryOptions
             */
            readonly maxRetryDelayInMs?: number;
        }

        /**
         * RetryPolicyFactory is a factory class helping generating RetryPolicy objects.
         *
         * @export
         * @class RetryPolicyFactory
         * @implements {RequestPolicyFactory}
         */
        export class RetryPolicyFactory implements msRest.RequestPolicyFactory {
            private retryOptions?;
            /**
             * Creates an instance of RetryPolicyFactory.
             * @param {IRetryOptions} [retryOptions]
             * @memberof RetryPolicyFactory
             */
            constructor(retryOptions?: IRetryOptions);
            create(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions): msRest.BaseRequestPolicy;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class RouteGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the routes.
             * Each feature in the collection is a MultiLineString representing one route.
             * The MultiLineString contains LineStrings representing a leg of the route.
             * The properties of each feature match the properties of the `route`, except
             * the `legs` property is replaced by a `legSummaries` property which is an array
             * of the summaries of each leg. The coordinates of each leg are already part
             * of the MultiLineString's coordinates. Each feature's properties also includes
             * a resultIndex. The resultIndex is the index of the route within the original `routes` array.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class RouteRangeGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the reachable range.
             * The first feature in the collection is a Polygon representing the boundary of the reachable range.
             * The second feature is a Point representing the center point of the reachable range.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        // Responses
        export type CalculateRouteDirectionsResponse = Response<Models.RouteDirectionsResponse, Models.RouteGetRouteDirectionsResponse, RouteGeojson>;
        export type CalculateRouteRangeResponse = Response<Models.RouteRangeResponse, Models.RouteGetRouteRangeResponse, RouteRangeGeojson>;
        export type CalculateRouteMatrixResponse = Response<Models.RouteMatrixResponse, Models.RoutePostRouteMatrixPreviewResponse>;

        // Options
        export type CalculateRouteDirectionsOptions = Models.RouteGetRouteDirectionsOptionalParams & {
            /**
             * Used for reconstructing a route and for calculating zero or
             * more alternative routes to this reference route.  The provided sequence of coordinates is used
             * as input for route reconstruction. The alternative routes  are calculated between the origin and
             * destination points specified in the base path parameter locations.  If both minDeviationDistance
             * and minDeviationTime are set to zero, then these origin and destination points  are expected to
             * be at (or very near) the beginning and end of the reference route, respectively. Intermediate
             * locations (waypoints) are not supported when using supportingPoints.
             *
             * Setting at least one of minDeviationDistance or minDeviationTime to a value greater than zero
             * has the  following consequences:
             *
             * *  The origin point of the calculateRoute request must be on (or very near) the input reference
             * route. If  this is not the case, an error is returned. However, the origin point does not need
             * to be at the beginning of  the input reference route (it can be thought of as the current
             * vehicle position on the reference route).
             * *  The reference route, returned as the first route in the calculateRoute response, will start
             * at the origin  point specified in the calculateRoute request. The initial part of the input
             * reference route up until the  origin point will be excluded from the response.
             * *  The values of minDeviationDistance and minDeviationTime determine how far alternative routes
             * will be  guaranteed to follow the reference route from the origin point onwards.
             * *  The route must use departAt.
             * *  The vehicleHeading is ignored.
             */
            postBody?: Models.RouteDirectionsRequestBody;
        };
        export type CalculateRouteRangeOptions = Models.RouteGetRouteRangeOptionalParams;
        export type CalculateRouteMatrixOptions = Models.RoutePostRouteMatrixPreviewOptionalParams;

        // Bodies
        export type CalculateRouteMatrixRequestBody = Models.RouteMatrixRequestBody;

        /**
         * A RouteURL represents a URL to the Azure Maps route operations.
         *
         * @export
         * @class RouteURL
         * @extends {MapsURL}
         */
        export class RouteURL extends MapsURL {
            /**
             * routeContext provided by protocol layer.
             *
             * @private
             * @type {Route}
             * @memberof RouteURL
             */
            private routeContext;
            /**
             * Creates an instance of RouteURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof RouteURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * Returns  a route between an origin and a destination, passing through waypoints if they are
             * specified. The route will take into account factors such as current traffic and the typical road
             * speeds on the requested day of the week and time of day.
             *
             * Information returned includes the distance, estimated travel time, and a representation of the
             * route geometry. Additional routing information such as optimized waypoint order or turn by turn
             * instructions is also available, depending on the options selected.
             *
             * Routing service provides a set of parameters for a detailed description of vehicle-specific
             * Consumption Model. Please check [Consumption
             * Model](https://docs.microsoft.com/azure/azure-maps/consumption-model) for detailed explanation
             * of the concepts and parameters involved.
             *
             * If `options.postBody` is specified uses the Post Route Directions API: https://docs.microsoft.com/rest/api/maps/route/postroutedirections
             *
             * Otherwise uses the Get Route Directions API: https://docs.microsoft.com/rest/api/maps/route/getroutedirections
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position[]} coordinates An array of coordinates through which the route is calculated.
             * Each coordinate is an array of `[longitude, latitude]`. A minimum of two coordinates is required.
             * The first one is the origin and the last is the destination of the route.
             * Optional coordinates in-between act as WayPoints in the route. You can pass up to 150 WayPoints.
             * @param {CalculateRouteDirectionsOptions} [options]
             * @returns {Promise<CalculateRouteDirectionsResponse>}
             * @memberof RouteURL
             */
            calculateRouteDirections(aborter: Aborter, coordinates: atlas.data.Position[], options?: CalculateRouteDirectionsOptions): Promise<CalculateRouteDirectionsResponse>;
            /**
             * Calculate a set of locations that can be reached from the origin point based
             * on fuel, energy,  or time budget that is specified. A polygon boundary (or Isochrone) is
             * returned in a counterclockwise  orientation as well as the precise polygon center which was the
             * result of the origin point.
             *
             * The returned polygon can be used for further processing such as  [Search Inside
             * Geometry](https://docs.microsoft.com/rest/api/maps/search/getsearchinsidegeometry) to
             * search for POIs within the provided Isochrone.
             *
             * Uses the Get Route Range API: https://docs.microsoft.com/rest/api/maps/route/getrouterange
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position} center The coordinate from which the range calculation should start.
             * @param {CalculateRouteRangeOptions} [options] The optional parameters
             * @returns {Promise<CalculateRouteRangeResponse>}
             * @memberof RouteURL
             */
            calculateRouteRange(aborter: Aborter, center: atlas.data.Position, options?: CalculateRouteRangeOptions): Promise<CalculateRouteRangeResponse>;
            /**
             * **Note: This API is currently in preview and may be subject to breaking changes.**
             * Calculates a matrix of route summaries for a set of routes
             * defined by origin and destination locations. For every given origin, this service calculates the
             * cost of routing from that origin to every given destination. The set of origins and the set of
             * destinations can be thought of as the column and row headers of a table and each cell in the
             * table contains the costs of routing from the origin to the destination for that cell. For each
             * route, the travel times and distances are calculated. You can use the computed costs to
             * determine which routes to calculate using the Routing Directions API. If waitForResults
             * parameter in the request is set to false (default value), this API returns a 202 response code
             * along a redirect URL in the Location field of the response header. This URL should be checked
             * periodically until the response data or error information is available.
             *
             * The maximum size of a matrix for this API is 700 (the number of origins  multiplied by the
             * number of destinations). With that constraint in mind,  examples of possible matrix dimensions
             * are: 50x10, 10x10, 28x25. 10x70  (it does not need to be square).
             *
             * Calculating a route matrix is considered a long running operation.
             * A long running operations implies that after the initial request is accepted (HTTP 202)
             * the final result will be polled for until available.
             * Each poll request restarts the aborter's timeout, if one was specified.
             *
             * Uses the Post Route Matrix API: https://docs.microsoft.com/rest/api/maps/route/postroutematrixpreview
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {CalculateRouteMatrixRequestBody} body The matrix of origin and destination coordinates to compute the route
             * distance, travel time and other summary for each cell of the matrix based on the input
             * parameters. The minimum and the maximum cell count supported are 1 and 700 respectively. For
             * example, it can be 35 origins and 20 destinations or 25 origins and 25 destinations.
             * @param {CalculateRouteMatrixOptions} [options] The optional parameters
             * @returns {Promise<CalculateRouteMatrixResponse>}
             * @memberof RouteURL
             */
            calculateRouteMatrix(aborter: Aborter, body: CalculateRouteMatrixRequestBody, options?: CalculateRouteMatrixOptions): Promise<CalculateRouteMatrixResponse>;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class SearchGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * Each feature in the collection is a Point representing one result.
             * The properties of each feature match the properties of the `result`,
             * except the `position` property is omitted because it is already
             * the coordinate of the point. Each feature's properties also includes
             * a resultIndex. The resultIndex is the index of the route within the
             * original `results` array.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class SearchReverseGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the addresses.
             * Each feature in the collection is a Point representing one address.
             * The properties of each feature match the properties of the `address`,
             * except the `position` property is omitted because it is already the
             * coordinate of the point. Each feature's properties also includes
             * a resultIndex. The resultIndex is the index of the route within the
             * original `addresses` array.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class SearchPolygonGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * Each feature in the collection is a Polygon or MultiPolygon representing one geometry ID.
             * The properties of each feature match the properties of `additionalData`,
             * except the `geometryData` is omitted because it is redundant with the feature itself.
             * The properties of the features in `geometryData` are kept too.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        // Responses
        export type SearchFuzzyResponse = Response<Models.SearchFuzzyResponse, Models.SearchGetSearchFuzzyResponse, SearchGeojson>;
        export type SearchPOIResponse = Response<Models.SearchPoiResponse, Models.SearchGetSearchPOICategoryResponse, SearchGeojson>;
        export type SearchNearbyResponse = Response<Models.SearchNearbyResponse, Models.SearchGetSearchNearbyResponse, SearchGeojson>;
        export type SearchPOICategoryResponse = Response<Models.SearchPoiCategoryResponse, Models.SearchGetSearchPOICategoryResponse, SearchGeojson>;
        export type SearchAddressResponse = Response<Models.SearchAddressResponse, Models.SearchGetSearchAddressResponse, SearchGeojson>;
        export type SearchAddressReverseResponse = Response<Models.SearchAddressReverseResponse, Models.SearchGetSearchAddressReverseResponse, SearchReverseGeojson>;
        export type SearchAddressReverseCrossStreetResponse = Response<Models.SearchAddressReverseCrossStreetResponse, Models.SearchGetSearchAddressReverseCrossStreetResponse, SearchReverseGeojson>;
        export type SearchAddressStructuredResponse = Response<Models.SearchAddressStructuredResponse, Models.SearchGetSearchAddressStructuredResponse, SearchGeojson>;
        export type SearchInsideGeometryResponse = Response<Models.SearchPostSearchInsideGeometryResponse, Models.SearchPostSearchInsideGeometryResponse, SearchGeojson>;
        export type SearchAlongRouteResponse = Response<Models.SearchAlongRouteResponse, Models.SearchPostSearchAlongRouteResponse, SearchGeojson>;
        export type SearchPolygonResponse = Response<Models.SearchPolygonResponse, Models.SearchGetSearchPolygonResponse, SearchPolygonGeojson>;

        // Options
        export type SearchFuzzyOptions = Models.SearchGetSearchFuzzyOptionalParams;
        export type SearchPOIOptions = Models.SearchGetSearchPOIOptionalParams;
        export type SearchNearbyOptions = Models.SearchGetSearchNearbyOptionalParams;
        export type SearchPOICategoryOptions = Models.SearchGetSearchPOICategoryOptionalParams;
        export type SearchAddressOptions = Models.SearchGetSearchAddressOptionalParams;
        export type SearchAddressReverseOptions = Models.SearchGetSearchAddressReverseOptionalParams;
        export type SearchAddressReverseCrossStreetOptions = Models.SearchGetSearchAddressReverseCrossStreetOptionalParams;
        export type SearchAddressStructuredOptions = Models.SearchGetSearchAddressStructuredOptionalParams;
        export type SearchInsideGeometryOptions = Models.SearchPostSearchInsideGeometryOptionalParams;
        export type SearchAlongRouteOptions = Models.SearchPostSearchAlongRouteOptionalParams;

        // Bodies
        export type SearchAlongRouteRequestBody = Models.SearchAlongRouteRequestBody;
        export type SearchInsideGeometryRequestBody = Models.SearchInsideGeometryRequestBody;

        /**
         * A SearchURL represents a URL to the Azure Maps search operations.
         *
         * @export
         * @class SearchURL
         * @extends {MapsURL}
         */
        export class SearchURL extends MapsURL {
            /**
             * searchContext provided by protocol layer.
             *
             * @private
             * @type {Search}
             * @memberof SearchURL
             */
            private searchContext;
            /**
             * Creates an instance of SearchURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof SearchURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * **Free Form Search** The basic default API is Free Form Search which handles the most
             * fuzzy of inputs handling any combination of address or POI tokens.
             * This search API is the canonical 'single line search'.
             * The Free Form Search API is a seamless combination of POI search and geocoding.
             * The API can also be weighted with a contextual position (lat./lon. pair), or
             * fully constrained by a coordinate and radius, or it can be executed more generally without any
             * geo biasing anchor point.
             * We strongly advise you to use the 'countrySet' parameter to specify only the countries for
             * which your application needs coverage, as the default behavior will be to search the entire world,
             * potentially returning unnecessary results. E.g.: `countrySet`=US,FR. Please see [Search Coverage]
             * (https://docs.microsoft.com/azure/location-based-services/geocoding-coverage) for
             * a complete list of all the supported countries.
             * Most Search queries default to `maxFuzzyLevel`=2 to gain performance and also reduce unusual results.
             * This new default can be overridden as needed per request by passing in the query param `maxFuzzyLevel`=3 or 4.
             * Uses the Get Search Fuzzy API: https://docs.microsoft.com/rest/api/maps/search/getsearchfuzzy
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | atlas.data.Position} query The applicable query string (e.g., "seattle", "pizza").
             * Can _also_ be specified as a coordinate array of `[longitude, latitude]` (e.g., `[-122.125679, 47.641268]`).
             * @param {SearchFuzzyOptions} [options] The optional parameters
             * @returns {Promise<SearchFuzzyResponse>}
             * @memberof SearchURL
             */
            searchFuzzy(aborter: Aborter, query: string | atlas.data.Position, options?: SearchFuzzyOptions): Promise<SearchFuzzyResponse>;
            /**
             * **Get POI by Name** If your search use case only requires POI results, you may use the
             * POI endpoint for searching.
             * This endpoint will only return POI results.
             * Uses the Get Search POI API: https://docs.microsoft.com/rest/api/maps/search/getsearchpoi
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query The POI name to search for (e.g., "statue of liberty", "starbucks").
             * @param {SearchPOIOptions} [options] The optional parameters
             * @returns {Promise<SearchPOIResponse>}
             * @memberof SearchURL
             */
            searchPOI(aborter: Aborter, query: string, options?: SearchPOIOptions): Promise<SearchPOIResponse>;
            /**
             * **Nearby Search** If you have a use case for only retrieving POI results around a
             * specific location, the nearby search method may be the right choice.
             * This endpoint will only return POI results, and does not take in a search query parameter.
             * Uses the Get Search Nearby API: https://docs.microsoft.com/rest/api/maps/search/getsearchnearby
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position} location Location where results should be biased.
             * Should be an array of `[longitude, latitude]`, E.g. `[-121.89, 37.337]`.
             * @param {SearchNearbyOptions} [options] The optional parameters
             * @returns {Promise<SearchNearbyResponse>}
             * @memberof SearchURL
             */
            searchNearby(aborter: Aborter, location: atlas.data.Position, options?: SearchNearbyOptions): Promise<SearchNearbyResponse>;
            /**
             * **Get POI by Category** If your search use case only requires POI results filtered by
             * category, you may use the category endpoint.
             * This endpoint will only return POI results which are categorized as specified.
             * List of available categories can be found [here](https://docs.microsoft.com/azure/azure-maps/search-categories).
             * Uses the Get Search POI Category API: https://docs.microsoft.com/rest/api/maps/search/getsearchpoicategory
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query The POI category to search for (e.g., "AIRPORT", "BEACH").
             * @param {SearchPOICategoryOptions} [options] The optional parameters
             * @returns {Promise<SearchPOICategoryResponse>}
             * @memberof SearchURL
             */
            searchPOICategory(aborter: Aborter, query: string, options?: SearchPOICategoryOptions): Promise<SearchPOICategoryResponse>;
            /**
             * **Address Geocoding** In many cases, the complete search service might be too much, for
             * instance if you are only interested in traditional geocoding.
             * Search can also be accessed for address look up exclusively.
             * The geocoding is performed by hitting the geocode endpoint with just the address or
             * partial address in question.
             * The geocoding search index will be queried for everything above the street level data.
             * No POIs will be returned.
             * Note that the geocoder is very tolerant of typos and incomplete addresses.
             * It will also handle everything from exact street addresses or street or intersections
             * as well as higher level geographies such as city centers, counties, states etc.
             * Uses the Get Search Address API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddress
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} query The address to search for (e.g., "1 Microsoft way, Redmond, WA").
             * @param {SearchAddressOptions} [options] The optional parameters
             * @returns {Promise<SearchAddressResponse>}
             * @memberof SearchURL
             */
            searchAddress(aborter: Aborter, query: string, options?: SearchAddressOptions): Promise<SearchAddressResponse>;
            /**
             * **Reverse Geocode to an Address** There may be times when you need to translate a
             * coordinate (example: -122.3862, 37.786505) into a human understandable street address.
             * Most often this is needed in tracking applications where you receive a GPS feed from the device or
             * asset and wish to know what address where the coordinate is located.
             * This endpoint will return address information for a given coordinate.
             * Uses the Get Search Address Reverse API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreverse
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position} position The position to reverse search,
             * a coordinate array of `[longitude, latitude]` e.g. `[-122.125679, 47.641268]`.
             * @param {SearchAddressReverseOptions} [options] The optional parameters
             * @returns {Promise<SearchFuzzyResponse>}
             * @memberof SearchURL
             */
            searchAddressReverse(aborter: Aborter, position: atlas.data.Position, options?: SearchAddressReverseOptions): Promise<SearchAddressReverseResponse>;
            /**
             * **Reverse Geocode to a Cross Street** There may be times when you need to translate a
             * coordinate (example: -122.3862, 37.786505) into a human understandable cross street.
             * Most often this is needed in tracking applications where you receive a GPS feed from the device or asset
             * and wish to know what address where the coordinate is located.
             * This endpoint will return cross street information for a given coordinate.
             * Uses the Get Search Address Reverse Cross Street API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressreversecrossstreet
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position} position The position to reverse search,
             * a coordinate array of `[longitude, latitude]` e.g. `[-122.125679, 47.641268]`.
             * @param {SearchAddressReverseCrossStreetOptions} [options] The optional parameters
             * @returns {Promise<SearchAddressReverseCrossStreetResponse>}
             * @memberof SearchURL
             */
            searchAddressReverseCrossStreet(aborter: Aborter, position: atlas.data.Position, options?: SearchAddressReverseCrossStreetOptions): Promise<SearchAddressReverseCrossStreetResponse>;
            /**
             * **Structured Address Geocoding** Azure Address Geocoding can also be accessed for
             * structured address look up exclusively.
             * The geocoding search index will be queried for everything above the street level data.
             * No POIs will be returned. Note that the geocoder is very tolerant of typos and incomplete addresses.
             * It will also handle everything from exact street addresses or street or intersections as well as
             * higher level geographies such as city centers, counties, states etc.
             * Uses the Get Search Address Structured API: https://docs.microsoft.com/rest/api/maps/search/getsearchaddressstructured
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} countryCode The 2 or 3 letter
             * [ISO3166-1](https://www.iso.org/iso-3166-country-codes.html) country code portion of an address.
             * E.g. US.
             * @param {SearchAddressStructuredOptions} [options] The optional parameters
             * @returns {Promise<SearchAddressStructuredResponse>}
             * @memberof SearchURL
             */
            searchAddressStructured(aborter: Aborter, countryCode: string, options?: SearchAddressStructuredOptions): Promise<SearchAddressStructuredResponse>;
            /**
             * The Search Geometry endpoint allows you to perform a free form search inside a single geometry
             * or many of them.
             * The search results that fall inside the geometry/geometries will be returned.
             * The geographical features to be searched can be modeled as Polygon and/or Circle geometries
             * represented using any one of the following `GeoJSON` types: **GeoJSON FeatureCollection**,
             * The `geometry` can be represented as a `GeoJSON FeatureCollection` object.
             * This is the recommended option if the geometry contains both Polygons and Circles.
             * The `FeatureCollection` can contain a max of 50 `GeoJSON Feature` objects.
             * Each `Feature` object should represent either a Polygon or a Circle with the following conditions:
             * A `Feature` object for the Polygon geometry can have a max of 50 coordinates and it's properties must be empty.
             * A `Feature` object for the Circle geometry is composed of a _center_ represented using a `GeoJSON Point` type and a _radius_ value
             * (in meters) which must be specified in the object's properties along with the _subType_ property
             * whose value should be 'Circle'.
             * Please see the Examples section below for a sample `FeatureCollection` representation.
             * **GeoJSON GeometryCollection**, The `geometry` can be represented as a `GeoJSON GeometryCollection` object.
             * This is the recommended option if the geometry contains a list of Polygons only.
             * The `GeometryCollection` can contain a max of 50 `GeoJSON Polygon` objects.
             * Each `Polygon` object can have a max of 50 coordinates.
             * Please see the Examples section below for a sample `GeometryCollection` representation.
             * **GeoJSON Polygon**, The `geometry` can be represented as a `GeoJSON Polygon` object.
             * This is the recommended option if the geometry contains a single Polygon.
             * The `Polygon` object can have a max of 50 coordinates.
             * Uses the Post Search Inside Geometry API: https://docs.microsoft.com/rest/api/maps/search/postsearchinsidegeometry
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | number[]} query The applicable query string (e.g., "seattle", "pizza").
             * @param {SearchInsideGeometryRequestBody} body This represents the geometry for one or more geographical
             * features (parks, state boundary etc.) to search in and should be a GeoJSON compliant type.
             * Please refer to [RFC 7946](https://tools.ietf.org/html/rfc7946) for details.
             * @param {SearchInsideGeometryOptions} [options] The optional parameters
             * @returns {Promise<SearchInsideGeometryResponse>}
             * @memberof SearchURL
             */
            searchInsideGeometry(aborter: Aborter, query: string, body: SearchInsideGeometryRequestBody, options?: SearchInsideGeometryOptions): Promise<SearchInsideGeometryResponse>;
            /**
             * The Search Along Route endpoint allows you to perform a fuzzy search for POIs along a specified
             * route.
             * This search is constrained by specifying the `maxDetourTime` limiting measure.
             * To send the route-points you will use a `body` which will contain the `route` object represented
             * as a `GeoJSON LineString` type and the `Content-Type` header will be set to `application/json`.
             * Each route-point in `route` is represented as a `GeoJSON Position` type i.e. an array where the
             * _longitude_ value is followed by the _latitude_ value and the _altitude_ value is ignored.
             * The `route` should contain at least 2 route-points.
             * It is possible that original route will be altered, some of it's points may be skipped.
             * If the route that passes through the found point is faster than the original one, the `detourTime` value in
             * the response is negative.
             * Uses the Post Search Along Route API: https://docs.microsoft.com/rest/api/maps/search/postsearchalongroute
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | number[]} query The applicable query string (e.g., "seattle", "pizza").
             * @param {number} maxDetourTime Maximum detour time of the point of interest in seconds. Max value is 3600
             * seconds
             * @param {SearchAlongRouteRequestBody} body This represents the route to search along and should be a
             * valid `GeoJSON LineString` type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details.
             * @param {SearchAlongRouteOptions} [options] The optional parameters
             * @returns {Promise<SearchAlongRouteResponse>}
             * @memberof SearchURL
             */
            searchAlongRoute(aborter: Aborter, query: string, maxDetourTime: number, body: SearchAlongRouteRequestBody, options?: SearchAlongRouteOptions): Promise<SearchAlongRouteResponse>;
            /**
             * The Search Polygon API allows you to request the geometry data such as a city or country
             * outline for a set of entities, previously retrieved from an Online Search request in GeoJSON
             * format. The geometry  ID is returned in the dataSources object under "geometry" and "id" in
             * either a Search Address or Search Fuzzy call.
             *
             * Please note that any geometry ID retrieved from an Online Search endpoint has a limited
             * lifetime. The client  should not store geometry IDs in persistent storage for later referral, as
             * the stability of these identifiers is  not guaranteed for a long period of time. It is expected
             * that a request to the Polygon method is made within a  few minutes of the request to the Online
             * Search method that provided the ID. The service allows for batch  requests up to 20 identifiers.
             *
             * Uses the Get Search Polygon API: https://docs.microsoft.com/rest/api/maps/search/getsearchpolygon
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} geometries Comma separated list of geometry UUIDs, previously retrieved from an Online
             * Search request.
             * @returns {Promise<SearchPolygonResponse>}
             * @memberof SearchURL
             */
            searchPolygon(aborter: Aborter, geometries: string[]): Promise<SearchPolygonResponse>;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class ClosestPointGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include a Point feature for each `result`.
             * The properties of the features match the properties of the result, except
             * the `position` property is omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class GeofenceGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include a Point feature for each of the `geometries`.
             * The properties of the features match the properties of the geofence geometry,
             * except the `nearestLat` and `nearestLon` properties are omitted
             * because they are redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        /**
         * A helper extension providing methods for accessing the response data in GeoJSON format.
         */
        export class PointInPolygonGeojson implements IBaseGeojson {
            /**
             * @private
             */
            private readonly response;
            /**
             * Returns a GeoJSON feature collection built from the results.
             * The collection will include one Point feature representing the input.
             * The properties of the feature match the properties of the `result` and `summary`,
             * except the `sourcePoint` will be omitted because it is redundant with the feature's coordinates.
             */
            getFeatures(): atlas.data.FeatureCollection;
        }

        // Responses
        export type GetBufferResponse = Response<Models.BufferResponse, Models.SpatialGetBufferResponse>;
        export type GetClosesPointResponse = Response<Models.GetClosestPointResponse, Models.SpatialGetClosestPointResponse, ClosestPointGeojson>;
        export type GetGeofenceResponse = Response<Models.GeofenceResponse & Models.SpatialGetGeofenceHeaders, Models.SpatialGetGeofenceResponse, GeofenceGeojson>;
        export type GetGreatCircleDistance = Response<Models.GreatCircleDistanceResponse, Models.SpatialGetGreatCircleDistanceResponse>;
        export type GetPointInPolygonResponse = Response<Models.PostPointInPolygonResponse, Models.SpatialPostPointInPolygonResponse, PointInPolygonGeojson>;

        // Options
        export type GetClosestPointOptions = Models.SpatialGetClosestPointOptionalParams;
        export type GetGeofenceOptions = Models.SpatialGetGeofenceOptionalParams;

        /**
         * A GeoJSON `FeatureCollection` whose features each specify a `geometryId` in their properties.
         */
        export type SpatialFeatureCollection = atlas.data.FeatureCollection;
        /**
         * A SpatialURL represents a URL to the Azure Maps spatial operations.
         *
         * @export
         * @class SpatialURL
         * @extends {MapsURL}
         */
        export class SpatialURL extends MapsURL {
            /**
             * spatialContext provided by protocol layer.
             *
             * @private
             * @type {Spatial}
             * @memberof SpatialURL
             */
            private spatialContext;
            /**
             * Creates an instance of SpatialURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof SpatialURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * Returns a FeatureCollection where each Feature is a buffer around the corresponding
             * indexed Feature of the input. The buffer could be either on the outside or the inside of the
             * provided Feature, depending on the distance provided in the input. There must be either one
             * distance provided per Feature in the FeatureCollection  input, or if only one distance is
             * provided, then that distance is applied to every Feature in the collection. The positive (or
             * negative) buffer of a geometry is defined as the Minkowski sum (or difference) of the geometry
             * with a circle of radius equal to the absolute value of the buffer distance. The buffer API
             * always returns a polygonal result. The negative or zero-distance buffer of lines and points is
             * always an empty polygon. The input features are provided in the request or
             * by a GeoJSON file which is uploaded via [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview)
             * and referenced by a unique udid. The data may contain a collection of Point, MultiPoint,
             * Polygon, MultiPolygon, LineString and MultiLineString. GeometryCollection will be ignored if
             * provided.
             *
             * If directly providing the `FeatureCollection` uses the Post Buffer API: https://docs.microsoft.com/rest/api/maps/spatial/postbuffer
             *
             * Otherwise uses the Get Buffer API: https://docs.microsoft.com/rest/api/maps/spatial/getbuffer
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | SpatialFeatureCollection} udidOrFeatureCollection
             *  A `FeatureCollection` containing the inputs or the unique id returned from [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) after uploading a valid
             * GeoJSON FeatureCollection object.  Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. All the feature's properties
             * should contain `geometryId`, which is used for identifying the geometry and is case-sensitive.
             * @param {number[]} distances The list of distances (one per feature or one for all features).
             * Positive distance will generate a buffer outside of the
             * feature, whereas negative distance will generate a buffer inside of the feature. If the negative
             * distance larger than the geometry itself, an empty polygon will be returned.
             * @returns {Promise<GetBufferResponse>}
             * @memberof SpatialURL
             */
            getBuffer(aborter: Aborter, udidOrFeatureCollection: string | SpatialFeatureCollection, distances: number[]): Promise<GetBufferResponse>;
            /**
             * Returns the closest point between a base point and a given set of points provided
             * by user data in the request or in a user uploaded data set identified by udid.
             * If using a udid the set of target points is provided by a GeoJSON file
             * which is uploaded via [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) and referenced by a
             * unique udid. The GeoJSON file may only contain a collection of Point geometry. MultiPoint or
             * other geometries will be ignored if provided. The maximum number of points accepted is 100,000.
             * The algorithm does not take into account routing or traffic. Information returned includes
             * closest point latitude, longitude, and distance in meters from the closest point.
             *
             * If directly providing the `FeatureCollection` uses the Post Closest Point API: https://docs.microsoft.com/rest/api/maps/spatial/postclosestpoint
             *
             * Otherwise uses the Get Closest Point API: https://docs.microsoft.com/rest/api/maps/spatial/getclosestpoint
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | SpatialFeatureCollection} udidOrFeatureCollection
             * A `FeatureCollection` containing the target points or the unique id returned from [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) after uploading a valid
             * GeoJSON FeatureCollection object.  Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. All the feature's properties
             * should contain `geometryId`, which is used for identifying the geometry and is case-sensitive.
             * @param {atlas.data.Position} position The base point.
             * @param {GetClosestPointOptions} [options] The optional parameters
             * @returns {Promise<GetClosesPointResponse>}
             * @memberof SpatialURL
             */
            getClosestPoint(aborter: Aborter, position: atlas.data.Position, udidOrFeatureCollection: string | SpatialFeatureCollection, options?: GetClosestPointOptions): Promise<GetClosesPointResponse>;
            /**
             * Retrieves the proximity of a coordinate to a
             * geofence provided in the request or that has been uploaded to the Data service. You can use the
             * [Data Upload API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) to upload
             * a geofence or set of fences. See [Geofencing GeoJSON
             * data](https://docs.microsoft.com/en-us/azure/azure-maps/geofence-geojson)
             * for more details on the geofence data format. To query the proximity of a coordinate, you supply
             * the location of the object you are tracking as well
             * as the ID for the fence or set of fences, and the response will contain information about
             * the distance from the outer edge of the geofence. A negative value signifies that the
             * coordinate is inside of the fence while a positive value means that it is outside of the
             * fence. This API can be used for a variety of scenarios that include things like asset
             * tracking, fleet management, or setting up alerts for moving objects.
             *
             * The API supports [integration with Event
             * Grid](https://docs.microsoft.com/azure/azure-maps/azure-maps-event-grid-integration). The
             * isAsync parameter is used to enable integration with Event Grid (disabled by default).
             * To test this API, you can upload the sample data from Post Geofence API examples(Request Body)
             * via Data Upload API and replace the [udid] from the sample request below with the udid returned
             * by Data Upload API.
             *
             * If directly providing the geofence uses the Post Geofence API: https://docs.microsoft.com/rest/api/maps/spatial/postgeofence
             *
             * Otherwise uses the Get Geofence API: https://docs.microsoft.com/en-us/rest/api/maps/spatial/getgeofence
             *
             * ### Geofencing InnerError code
             *
             * In geofencing response error contract, `innererror` is  an object containing service specific
             * information about the error. `code` is a property in `innererror` which can map to a specific
             * geofencing error type. The table belows shows the code mapping between all the known client
             * error type to the corresponding geofencing error `message`.
             *
             * innererror.code | error.message
             * ---------------------------- | --------------------------------------
             * NullDeviceId  | Device Id should not be null.
             * NullUdid	  | Udid should not be null.
             * UdidWrongFormat| Udid should be acquired from user data ingestion API.
             * InvalidUserTime| Usertime is invalid.
             * InvalidSearchBuffer| Searchbuffer is invalid.
             * InvalidSearchRange| The value range of searchbuffer should be from 0 to 500 meters.
             * InvalidLatLon| Lat and/or lon parameters are invalid.
             * InvalidIsAsyncValue| The IsAsync parameter is invalid.
             * InvalidModeValue| The mode parameter invalid.
             * InvalidJson| Geofencing data is not a valid json file.
             * NotSupportedGeoJson| Geofencing data can't be read as a Feature or FeatureCollections.
             * InvalidGeoJson| Geofencing data is invalid.
             * NoUserDataWithAccountOrSubscription| Can't find user geofencing data with provided account-id
             * and/or subscription-id.
             * NoUserDataWithUdid|	Can't find user geofencing data with provided udId.
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string} deviceId ID of the device
             * @param {string | SpatialFeatureCollection} udidOrFeatureCollection
             * A `FeatureCollection` containing the fence or the unique id returned from [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) after uploading a valid
             * GeoJSON FeatureCollection object. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. All the feature's
             * properties should contain `geometryId`, which is used for identifying the geometry and is
             * case-sensitive.
             * @param {atlas.data.Position} position The location being passed.
             * @param {GetGeofenceOptions} [options] The optional parameters
             * @returns {Promise<GetGeofenceResponse>}
             * @memberof SpatialURL
             */
            getGeofence(aborter: Aborter, deviceId: string, udidOrFeatureCollection: string | SpatialFeatureCollection, position: atlas.data.Position, options?: GetGeofenceOptions): Promise<GetGeofenceResponse>;
            /**
             * Return the great-circle or shortest distance between two points on the surface of
             * a sphere, measured along the surface of the sphere.  This differs from calculating a straight
             * line through the sphere's interior. This method is helpful for estimating travel distances for
             * airplanes by calculating the shortest distance between airports.
             *
             * Uses the Get Great Circle Distance API: https://docs.microsoft.com/rest/api/maps/spatial/getgreatcircledistance
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {atlas.data.Position[]} coordinates The coordinates through which the distance is calculated. Two
             * coordinates are required. The first one is the source point coordinate and the last is the
             * target point coordinate.
             * @returns {Promise<GetGreatCircleDistance>}
             */
            getGreatCircleDistance(aborter: Aborter, coordinates: [atlas.data.Position, atlas.data.Position]): Promise<GetGreatCircleDistance>;
            /**
             * Returns whether a point is inside a set of polygons. The set
             * of polygons is provided in the request or by a GeoJSON file which is uploaded via [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) and referenced by a
             * unique udid. The GeoJSON file may contain Polygon and MultiPolygon geometries, other geometries
             * will be ignored if provided. If the point is inside or on the boundary of one of these polygons,
             * the value returned is true. In all other cases, the value returned is false. When the point is
             * inside multiple polygons, the result will give intersecting geometries section to show all valid
             * geometries(referenced by geometryId) in user data. The maximum number of vertices accepted to
             * form a Polygon is 10,000.
             *
             * If directly providing the `FeatureCollection` uses the Post Point In Polygon API: https://docs.microsoft.com/rest/api/maps/spatial/postpointinpolygon
             *
             * Otherwise uses the Get Point In Polygon API: https://docs.microsoft.com/rest/api/maps/spatial/getpointinpolygon
             *
             * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
             * goto documents of Aborter for more examples about request cancellation.
             * @param {string | SpatialFeatureCollection} udidOrFeatureCollection
             * A `FeatureCollection` containing the polygons or the unique id returned from [Data Upload
             * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) after uploading a valid
             * GeoJSON FeatureCollection object.  Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. All the feature's properties
             * should contain `geometryId`, which is used for identifying the geometry and is case-sensitive.
             * @param {atlas.data.Position} position The base point.
             * @returns {Promise<GetPointInPolygonResponse>}
             * @memberof SpatialURL
             */
            getPointInPolygon(aborter: Aborter, udidOrFeatureCollection: string | SpatialFeatureCollection, position: atlas.data.Position): Promise<GetPointInPolygonResponse>;
        }

        // Responses
        export type GetTimezoneByCoordinatesResponse = Response<Models.TimezoneByCoordinatesResult, Models.TimezoneGetTimezoneByCoordinatesResponse>;
        export type GetTimezoneByIdResponse = Response<Models.TimezoneByIdResult, Models.TimezoneGetTimezoneByIDResponse>;

        // Options
        export type GetTimezoneByCoordinatesOptions = Models.TimezoneGetTimezoneByCoordinatesOptionalParams;
        export type GetTimezoneByIdOptions = Models.TimezoneGetTimezoneByIDOptionalParams;

        /**
         * A TimezoneURL represents a URL to the Azure Maps timezone operations.
         *
         * @export
         * @class TimezoneURL
         * @extends {MapsURL}
         */
        export class TimezoneURL extends MapsURL {
            /**
             * timezoneContext provided by protocol layer.
             *
             * @private
             * @type {Timezone}
             * @memberof TimezoneURL
             */
            private timezoneContext;
            /**
             * Creates an instance of TimezoneURL.
             * @param {Pipeline} pipeline Call MapsURL.newPipeline() to create a default
             * pipeline, or provide a customized pipeline.
             * @param {string} mapsUrl A URL string pointing to Azure Maps service, default is
             * `"https://atlas.microsoft.com"`.
             * If no protocol is specified, e.g. `"atlas.microsoft.com"`, then `https` will be assumed.
             * @memberof TimezoneURL
             */
            constructor(pipeline: Pipeline, mapsUrl?: string);
            /**
             * This API returns current, historical, and future time zone information for a specified
             * latitude-longitude pair. In addition, the API provides sunset and sunrise times for a given
             * location.
             *
             * Uses the Get Timezone By Coordinates API: https://docs.microsoft.com/rest/api/maps/timezone/gettimezonebycoordinates
             *
             * @param {atlas.data.Position} coordinate Coordinates of the point for which time zone information is requested. The
             * applicable query is specified as a comma separated string composed by latitude followed by
             * longitude e.g. "47.641268,-122.125679".
             * @param {GetTimezoneByCoordinatesOptions} [options] The optional parameters
             * @returns {Promise<GetTimezoneByCoordinatesResponse>}
             * @memberof TimezoneURL
             */
            getTimezoneByCoordinates(aborter: Aborter, coordinate: atlas.data.Position, options?: GetTimezoneByCoordinatesOptions): Promise<GetTimezoneByCoordinatesResponse>;
            /**
             * This API returns current, historical, and future time zone information for the specified IANA
             * time zone ID.
             *
             * Uses the Get Timezone By ID API: https://docs.microsoft.com/rest/api/maps/timezone/gettimezonebyid
             *
             * @param {string} id The IANA time zone ID.
             * @param {GetTimezoneByIdOptions} [options] The optional parameters
             * @returns {Promise<GetTimezoneByIdResponse>}
             * @memberof TimezoneURL
             */
            getTimezoneById(aborter: Aborter, id: string, options?: GetTimezoneByIdOptions): Promise<GetTimezoneByIdResponse>;
        }

        /**
         * SubscriptionKeyCredential for account key authorization of Azure Maps service.
         *
         * @export
         * @class SubscriptionKeyCredential
         * @extends {Credential}
         */
        export class SubscriptionKeyCredential extends Credential {
            /**
             * Azure Maps subscriptions key; readonly.
             *
             * @type {string}
             * @memberof SubscriptionKeyCredential
             */
            private readonly subscriptionKey;
            /**
             * Creates an instance of SubscriptionKeyCredential.
             * @param {string} subscriptionKey
             * @memberof SubscriptionKeyCredential
             */
            constructor(subscriptionKey: string);
        }

        /**
         * TokenCredential is a Credential used to generate a TokenCredentialPolicy.
         * Renew token by setting a new token string value to token property.
         *
         * @example
         *  const tokenCredential = new TokenCredential("clientId", "token");
         *  const pipeline = MapsURL.newPipeline(tokenCredential);
         *
         *  const searchURL = new SearchURL(pipeline);
         *
         *  // Set up a timer to refresh the token
         *  const timerID = setInterval(() => {
         *    // Update token by accessing to public tokenCredential.token
         *    tokenCredential.token = "updatedToken";
         *    // WARNING: Timer must be manually stopped! It will forbid GC of tokenCredential
         *    if (shouldStop()) {
         *      clearInterval(timerID);
         *    }
         *  }, 60 * 60 * 1000); // Set an interval time before your token expired
         * @export
         * @class TokenCredential
         * @extends {Credential}
         *
         */
        export class TokenCredential extends Credential {
            /**
             * Mutable client ID value. You can set a new ID value to this property,
             * for example, when using a new token for another Azure Maps account.
             *
             * @type {string}
             * @memberof TokenCredential
             */
            clientId: string;
            /**
             * Mutable token value. You can set a renewed token value to this property,
             * for example, when an OAuth token is expired.
             *
             * @type {string}
             * @memberof TokenCredential
             */
            token: string;
            /**
             * Creates an instance of TokenCredential.
             * @param {string} token
             * @memberof TokenCredential
             */
            constructor(clientId: string, token: string);
            /**
             * Creates a TokenCredentialPolicy object.
             *
             * @param {RequestPolicy} nextPolicy
             * @param {RequestPolicyOptions} options
             * @returns {TokenCredentialPolicy}
             * @memberof TokenCredential
             */
            create(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions): TokenCredentialPolicy;
        }

        /**
         * TokenCredentialPolicy is a policy used to sign HTTP request with a token.
         * Such as an OAuth bearer token.
         *
         * @export
         * @class TokenCredentialPolicy
         * @extends {CredentialPolicy}
         */
        export class TokenCredentialPolicy extends CredentialPolicy {
            /**
             * The value of token.
             *
             * @type {TokenCredential}
             * @memberof TokenCredentialPolicy
             */
            readonly tokenCredential: TokenCredential;
            /**
             * Token authorization scheme, default header is "Bearer".
             *
             * @type {string}
             * @memberof TokenCredentialPolicy
             */
            readonly authorizationScheme: string;
            /**
             * Creates an instance of TokenCredentialPolicy.
             * @param {RequestPolicy} nextPolicy
             * @param {RequestPolicyOptions} options
             * @param {TokenCredential} tokenCredential
             * @memberof TokenCredentialPolicy
             */
            constructor(nextPolicy: msRest.RequestPolicy, options: msRest.RequestPolicyOptions, tokenCredential: TokenCredential);
            /**
             * Sign request with token.
             *
             * @protected
             * @param {WebResource} request
             * @returns {WebResource}
             * @memberof TokenCredentialPolicy
             */
            protected signRequest(request: msRest.WebResource): msRest.WebResource;
        }

        // Helper types
        export type Merge<T, K> = {
            [P in keyof T]: P extends keyof K ? K[P] : T[P];
        };
        /**
         * A type alias for easily representing a response interface with or without a geojson helper.
         * Also provides the raw response data in the response object.
         */
        export type Response<D, // The base data type the response will extend.
            R, // The response model which produced the data.
            G extends IBaseGeojson = undefined> = D & (G extends undefined ? {
                /**
                 * The raw response and request data.
                 */
                rawResponse: any;
            } : {
                    /**
                     * The raw response and request data.
                     */
                rawResponse: any;
                    /**
                     * A helper extension providing methods for accessing the response data in GeoJSON format.
                     */
                    geojson: G;
                });

        export module Models {
            /**
             * This object is returned when an error occurs in the Maps API
             */
            export interface ErrorModel {
                /**
                 * The HTTP status code.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly code?: string;
                /**
                 * If available, a human readable description of the error.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly message?: string;
            }
            /**
             * This response object is returned when an error occurs in the Maps API
             */
            export interface ErrorResponse {
                error?: ErrorModel;
            }
            /**
             * Summary for the batch request
             */
            export interface BatchResponseSummary {
                /**
                 * Number of successful requests in the batch
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly successfulRequests?: number;
                /**
                 * Total number of requests in the batch
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalRequests?: number;
            }
            /**
             * This object is returned from a successful Batch service call
             */
            export interface BatchResponse {
                /**
                 * Summary for the batch request
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly summary?: BatchResponseSummary;
                /**
                 * Array containing the batch results
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly batchItems?: any[];
            }
            /**
             * Batch Query object
             */
            export interface BatchRequestBodyBatchItemsItem {
                /**
                 * Partial query string
                 */
                query?: string;
            }
            /**
             * This type represents the request body for the Batch service.
             */
            export interface BatchRequestBody {
                /**
                 * The list of queries/requests to process
                 */
                batchItems?: BatchRequestBodyBatchItemsItem[];
            }
            /**
             * A location represented as a latitude and longitude.
             */
            export interface CoordinateAbbreviated {
                /**
                 * Latitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lat?: number;
                /**
                 * Longitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lon?: number;
            }
            /**
             * Contains the possible cases for GeoJSONGeometry.
             */
            export type GeoJSONGeometryUnion = GeoJSONGeometry | LineString | MultiPoint | Point | MultiPolygon | Polygon | MultiLineString;
            /**
             * A valid `GeoJSON` geometry object. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1) for details.
             */
            export interface GeoJSONGeometry {
                /**
                 * Polymorphic Discriminator
                 */
                type: "GeoJSONGeometry";
            }
            /**
             * A valid `GeoJSON LineString` geometry type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.4) for details.
             */
            export interface LineString {
                /**
                 * Polymorphic Discriminator
                 */
                type: "LineString";
                /**
                 * Coordinates for the `LineString` geometry.
                 */
                coordinates: number[][];
            }
            /**
             * An interface representing SearchPolygonResult.
             */
            export interface SearchPolygonResult {
                /**
                 * ID of the returned entity
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly providerID?: string;
                /**
                 * Reason for the failure to obtain data for this provider.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly error?: string;
                /**
                 * Geometry data in GeoJSON format. Please refer to [RFC
                 * 7946](https://tools.ietf.org/html/rfc7946) for details. Present only if "error" is not
                 * present.
                 */
                geometryData?: any;
            }
            /**
             * This object is returned from a successful Search Polygon call
             */
            export interface SearchPolygonResponse {
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly additionalData?: SearchPolygonResult[];
            }
            /**
             * Summary object for a Search Fuzzy response
             */
            export interface SearchFuzzySummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
            }
            /**
             * Name for the classification
             */
            export interface SearchResultPoiClassificationName {
                /**
                 * Name Locale property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly nameLocale?: string;
                /**
                 * Name property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly name?: string;
            }
            /**
             * The classification for the POI being returned
             */
            export interface SearchResultPoiClassification {
                /**
                 * Code property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly code?: string;
                /**
                 * Names array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly names?: SearchResultPoiClassificationName[];
            }
            /**
             * The name of the brand for the POI being returned
             */
            export interface SearchResultPoiBrand {
                /**
                 * Name of the brand
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly name?: string;
            }
            /**
             * Details of the poi including the name, phone, url, and categories.
             */
            export interface SearchResultPoi {
                /**
                 * Name property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly name?: string;
                /**
                 * Phone property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly phone?: string;
                /**
                 * URL property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly url?: string;
                /**
                 * __[Deprecated]__ Use classifications instead. Categories array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly categories?: string[];
                /**
                 * Classification array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly classifications?: SearchResultPoiClassification[];
                /**
                 * Brands array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly brands?: SearchResultPoiBrand[];
            }
            /**
             * The address of the result
             */
            export interface SearchResultAddress {
                /**
                 * Building Number property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly buildingNumber?: string;
                /**
                 * Street property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly street?: string;
                /**
                 * Cross Street property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly crossStreet?: string;
                /**
                 * Street Number property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly streetNumber?: string;
                /**
                 * number of routes
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly routeNumbers?: number[];
                /**
                 * Street Name property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly streetName?: string;
                /**
                 * Street Name and Number property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly streetNameAndNumber?: string;
                /**
                 * Municipality property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly municipality?: string;
                /**
                 * Municipality Subdivision property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly municipalitySubdivision?: string;
                /**
                 * Country Tertiary Subdivision property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countryTertiarySubdivision?: string;
                /**
                 * Country Secondary Subdivision property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countrySecondarySubdivision?: string;
                /**
                 * Country Subdivision property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countrySubdivision?: string;
                /**
                 * Postal Code property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly postalCode?: string;
                /**
                 * Extended Postal Code property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly extendedPostalCode?: string;
                /**
                 * Country Code property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countryCode?: string;
                /**
                 * Country property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly country?: string;
                /**
                 * Country Code ISO3 property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countryCodeISO3?: string;
                /**
                 * Free form Address property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly freeformAddress?: string;
                /**
                 * Country Subdividion Name property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countrySubdivisionName?: string;
                /**
                 * An address component which represents the name of a geographic area or locality that groups a
                 * number of addressable objects for addressing purposes, without being an administrative unit.
                 * This field is used to build the `freeformAddress` property.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly localName?: string;
            }
            /**
             * The viewport that covers the result represented by the top-left and bottom-right coordinates of
             * the  viewport.
             */
            export interface SearchResultViewport {
                topLeftPoint?: CoordinateAbbreviated;
                btmRightPoint?: CoordinateAbbreviated;
            }
            /**
             * The entry point for the POI being returned.
             */
            export interface SearchResultEntryPoint {
                /**
                 * The type of entry point. Value can be either _main_ or _minor_. Possible values include:
                 * 'main', 'minor'
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: Type;
                position?: CoordinateAbbreviated;
            }
            /**
             * Describes the address range on both sides of the street for a search result. Coordinates for the
             * start and end locations of the address range are included.
             */
            export interface SearchResultAddressRanges {
                rangeLeft?: string;
                rangeRight?: string;
                from?: CoordinateAbbreviated;
                to?: CoordinateAbbreviated;
            }
            /**
             * Information about the geometric shape of the result. Only present if type == Geography.
             */
            export interface DataSourcesGeometry {
                /**
                 * Pass this as geometryId to the [Get Search
                 * Polygon](https://docs.microsoft.com/en-us/rest/api/maps/search/getsearchpolygon) API to fetch
                 * geometry information for this result.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
            }
            /**
             * Optional section. Reference ids for use with the [Get Search
             * Polygon](https://docs.microsoft.com/en-us/rest/api/maps/search/getsearchpolygon) API.
             */
            export interface DataSources {
                geometry?: DataSourcesGeometry;
            }
            /**
             * An interface representing SearchFuzzyResult.
             */
            export interface SearchFuzzyResult {
                /**
                 * One of:
                 * * POI
                 * * Street
                 * * Geography
                 * * Point Address
                 * * Address Range
                 * * Cross Street
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                /**
                 * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
                addressRanges?: SearchResultAddressRanges;
                dataSources?: DataSources;
            }
            /**
             * This object is returned from a successful Search Fuzzy call
             */
            export interface SearchFuzzyResponse {
                summary?: SearchFuzzySummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchFuzzyResult[];
            }
            /**
             * Indication when the internal search engine has applied a geospatial bias to improve the ranking
             * of results.  In  some methods, this can be affected by setting the lat and lon parameters where
             * available.  In other cases it is  purely internal.
             */
            export interface SearchSummaryGeoBias {
                /**
                 * Latitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lat?: number;
                /**
                 * Longitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lon?: number;
            }
            /**
             * Summary object for a Search POI response
             */
            export interface SearchPoiSummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
                geoBias?: SearchSummaryGeoBias;
            }
            /**
             * An interface representing SearchPoiResult.
             */
            export interface SearchPoiResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                dist?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                /**
                 * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
            }
            /**
             * This object is returned from a successful Search POI call
             */
            export interface SearchPoiResponse {
                summary?: SearchPoiSummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchPoiResult[];
            }
            /**
             * Summary object for a Search Nearby response
             */
            export interface SearchNearbySummary {
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
                geoBias?: SearchSummaryGeoBias;
            }
            /**
             * An interface representing SearchNearbyResult.
             */
            export interface SearchNearbyResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                dist?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
            }
            /**
             * This object is returned from a successful Search Nearby call
             */
            export interface SearchNearbyResponse {
                summary?: SearchNearbySummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchNearbyResult[];
            }
            /**
             * Summary object for a Search POI Category response
             */
            export interface SearchPoiCategorySummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
                geoBias?: SearchSummaryGeoBias;
            }
            /**
             * An interface representing SearchPoiCategoryResult.
             */
            export interface SearchPoiCategoryResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                dist?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                /**
                 * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
            }
            /**
             * This object is returned from a successful Search POI Category call
             */
            export interface SearchPoiCategoryResponse {
                summary?: SearchPoiCategorySummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchPoiCategoryResult[];
            }
            /**
             * Summary object for a Search Address response
             */
            export interface SearchAddressSummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
            }
            /**
             * An interface representing SearchAddressResult.
             */
            export interface SearchAddressResult {
                /**
                 * One of:
                 * * POI
                 * * Street
                 * * Geography
                 * * Point Address
                 * * Address Range
                 * * Cross Street
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
                dataSources?: DataSources;
            }
            /**
             * This object is returned from a successful Search Address call
             */
            export interface SearchAddressResponse {
                summary?: SearchAddressSummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchAddressResult[];
            }
            /**
             * Summary object for a Search Address Reverse response
             */
            export interface SearchAddressReverseSummary {
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
            }
            /**
             * An interface representing SearchAddressReverseResult.
             */
            export interface SearchAddressReverseResult {
                address?: SearchResultAddress;
                /**
                 * Position property in the form of "{latitude},{longitude}"
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly position?: string;
                /**
                 * Information on the type of match.
                 *
                 * One of:
                 * * AddressPoint
                 * * HouseNumberRange
                 * * Street
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly matchType?: string;
            }
            /**
             * This object is returned from a successful Search Address Reverse call
             */
            export interface SearchAddressReverseResponse {
                summary?: SearchAddressReverseSummary;
                /**
                 * Addresses array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly addresses?: SearchAddressReverseResult[];
            }
            /**
             * Summary object for a Search Address Reverse Cross Street response
             */
            export interface SearchAddressReverseCrossStreetSummary {
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
            }
            /**
             * An interface representing SearchAddressReverseCrossStreetResult.
             */
            export interface SearchAddressReverseCrossStreetResult {
                address?: SearchResultAddress;
                /**
                 * Position property in the form of "{latitude},{longitude}"
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly position?: string;
            }
            /**
             * This object is returned from a successful Search Address Reverse CrossStreet call
             */
            export interface SearchAddressReverseCrossStreetResponse {
                summary?: SearchAddressReverseCrossStreetSummary;
                /**
                 * Addresses array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly addresses?: SearchAddressReverseCrossStreetResult[];
            }
            /**
             * Summary object for a Search Address Structured response
             */
            export interface SearchAddressStructuredSummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Maximum number of responses that will be returned
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly limit?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
                geoBias?: SearchSummaryGeoBias;
            }
            /**
             * An interface representing SearchAddressStructuredResult.
             */
            export interface SearchAddressStructuredResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                dist?: number;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
                addressRanges?: SearchResultAddressRanges;
            }
            /**
             * This object is returned from a successful Search Address Structured call
             */
            export interface SearchAddressStructuredResponse {
                summary?: SearchAddressStructuredSummary;
                /**
                 * Results array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchAddressStructuredResult[];
            }
            /**
             * Summary object for a Search Geometry response
             */
            export interface SearchGeometrySummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
            }
            /**
             * This type represents the Search Inside Geometry result object.
             */
            export interface SearchGeometryResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                /**
                 * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
            }
            /**
             * This object is returned from a successful Search By Geometry call
             */
            export interface SearchGeometryResponse {
                summary?: SearchGeometrySummary;
                /**
                 * A list of Search Inside Geometry results.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchGeometryResult[];
            }
            /**
             * Summary object for a Search Along Route response
             */
            export interface SearchAlongRouteSummary {
                /**
                 * Query property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly query?: string;
                /**
                 * QueryType property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryType?: string;
                /**
                 * QueryTime property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly queryTime?: number;
                /**
                 * NumResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly numResults?: number;
                /**
                 * Offset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly offset?: number;
                /**
                 * TotalResults property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalResults?: number;
                /**
                 * FuzzyLevel property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuzzyLevel?: number;
            }
            /**
             * This type represents the Search Along Route result object.
             */
            export interface SearchAlongRouteResult {
                /**
                 * Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly type?: string;
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                score?: number;
                /**
                 * Info property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly info?: string;
                /**
                 * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                poi?: SearchResultPoi;
                address?: SearchResultAddress;
                position?: CoordinateAbbreviated;
                viewport?: SearchResultViewport;
                /**
                 * Entry Points array
                 */
                entryPoints?: SearchResultEntryPoint[];
                dist?: number;
                /**
                 * Detour time in seconds
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly detourTime?: number;
            }
            /**
             * This object is returned from a successful Search Along Route call.
             */
            export interface SearchAlongRouteResponse {
                summary?: SearchAlongRouteSummary;
                /**
                 * A list of Search Along Route results.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly results?: SearchAlongRouteResult[];
            }
            /**
             * This type represents the request body for the Search Inside Geometry service.
             */
            export interface SearchInsideGeometryRequestBody {
                geometry?: any;
            }
            /**
             * This type represents the request body for the Search Along Route service.
             */
            export interface SearchAlongRouteRequestBody {
                route?: LineString;
            }
            /**
             * A valid `GeoJSON MultiPoint` geometry type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.3) for details.
             */
            export interface MultiPoint {
                /**
                 * Polymorphic Discriminator
                 */
                type: "MultiPoint";
                /**
                 * Coordinates for the `MultiPoint` geometry.
                 */
                coordinates: number[][];
            }
            /**
             * A valid `GeoJSON Point` geometry type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.2) for details.
             */
            export interface Point {
                /**
                 * Polymorphic Discriminator
                 */
                type: "Point";
                coordinates: number[];
            }
            /**
             * A valid `GeoJSON MultiPolygon` object type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.7) for details.
             */
            export interface MultiPolygon {
                /**
                 * Polymorphic Discriminator
                 */
                type: "MultiPolygon";
                /**
                 * Contains a list of valid `GeoJSON` Polygon objects.
                 */
                coordinates: number[][][][];
            }
            /**
             * A valid `GeoJSON GeometryCollection` object type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.8) for details.
             */
            export interface GeoJSONGeometryCollection {
                /**
                 * Specifies the `type` for the object. Value should always be equal to "GeometryCollection".
                 */
                type?: string;
                /**
                 * Contains a list of valid `GeoJSON` geometry objects.
                 */
                geometries: GeoJSONGeometryUnion[];
            }
            /**
             * A location represented as a latitude and longitude.
             */
            export interface Coordinate {
                /**
                 * Latitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly latitude?: number;
                /**
                 * Longitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly longitude?: number;
            }
            /**
             * A GeoJSON Geometry collection representing sequence of coordinates used as input for route
             * reconstruction
             */
            export interface RouteDirectionsRequestBodySupportingPoints extends GeoJSONGeometryCollection {
            }
            /**
             * Post body parameters for Route directions.
             */
            export interface RouteDirectionsRequestBody {
                /**
                 * A GeoJSON Geometry collection representing sequence of coordinates used as input for route
                 * reconstruction
                 */
                supportingPoints?: RouteDirectionsRequestBodySupportingPoints;
                /**
                 * This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which all
                 * toll roads with vignettes are to be avoided, e.g. "AUS,CHE". Toll roads with vignettes in
                 * countries not in the list are unaffected. Note: It is an error to specify both
                 * **avoidVignette** and **allowVignette**.
                 */
                avoidVignette?: string[];
                /**
                 * This is a list of 3-character, ISO 3166-1, alpha-3 country codes of countries in which toll
                 * roads with vignettes are allowed, e.g. "AUS,CHE". Specifying **allowVignette** with some
                 * countries X is equivalent to specifying **avoidVignette** with all countries but X. Specifying
                 * **allowVignette** with an empty list is the same as avoiding all toll roads with vignettes.
                 * Note: It is an error to specify both **avoidVignette** and **allowVignette**.
                 */
                allowVignette?: string[];
                /**
                 * A GeoJSON MultiPolygon representing list of areas to avoid. Only rectangle polygons are
                 * supported. The maximum size of a rectangle is about 160x160 km. It cannot cross the 180th
                 * meridian. It must be between -80 and +80 degrees of latitude.
                 */
                avoidAreas?: MultiPolygon;
            }
            /**
             * Summary object
             */
            export interface RouteDirectionsSummary {
                /**
                 * Length In Meters property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lengthInMeters?: number;
                /**
                 * Estimated travel time in seconds property that includes the delay due to real-time traffic.
                 * Note that even when traffic=false travelTimeInSeconds still includes the delay due to traffic.
                 * If DepartAt is in the future, travel time is calculated using time-dependent historic traffic
                 * data.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly travelTimeInSeconds?: number;
                /**
                 * Estimated delay in seconds caused by the real-time incident(s) according to traffic
                 * information. For routes planned with departure time in the future, delays is always 0. To
                 * return additional travel times using different types of traffic information, parameter
                 * computeTravelTimeFor=all needs to be added.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly trafficDelayInSeconds?: number;
                /**
                 * Departure Time property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly departureTime?: string;
                /**
                 * Arrival Time property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly arrivalTime?: string;
            }
            /**
             * Summary object for route section.
             */
            export interface RouteResultLegSummary {
                /**
                 * Length In Meters property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lengthInMeters?: number;
                /**
                 * Estimated travel time in seconds property that includes the delay due to real-time traffic.
                 * Note that even when traffic=false travelTimeInSeconds still includes the delay due to traffic.
                 * If DepartAt is in the future, travel time is calculated using time-dependent historic traffic
                 * data.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly travelTimeInSeconds?: number;
                /**
                 * Estimated delay in seconds caused by the real-time incident(s) according to traffic
                 * information. For routes planned with departure time in the future, delays is always 0. To
                 * return additional travel times using different types of traffic information, parameter
                 * computeTravelTimeFor=all needs to be added.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly trafficDelayInSeconds?: number;
                /**
                 * Departure Time property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly departureTime?: string;
                /**
                 * Arrival Time property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly arrivalTime?: string;
                /**
                 * Estimated travel time calculated as if there are no delays on the route due to traffic
                 * conditions (e.g. congestion). Included only if computeTravelTimeFor = all is used in the
                 * query.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly noTrafficTravelTimeInSeconds?: number;
                /**
                 * Estimated travel time calculated using time-dependent historic traffic data. Included only if
                 * computeTravelTimeFor = all is used in the query.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly historicTrafficTravelTimeInSeconds?: number;
                /**
                 * Estimated travel time calculated using real-time speed data. Included only if
                 * computeTravelTimeFor = all is used in the query.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly liveTrafficIncidentsTravelTimeInSeconds?: number;
                /**
                 * Estimated fuel consumption in liters using the Combustion Consumption Model. Included if
                 * vehicleEngineType is set to _combustion_ and constantSpeedConsumptionInLitersPerHundredkm is
                 * specified. The value will be non-negative.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly fuelConsumptionInLiters?: number;
                /**
                 * Estimated electric energy consumption in kilowatt hours (kWh) using the Electric Consumption
                 * Model. Included if vehicleEngineType is set to electric and
                 * constantSpeedConsumptionInkWhPerHundredkm is specified. The value of batteryConsumptionInkWh
                 * includes the recuperated electric energy and can therefore be negative (which indicates
                 * gaining energy). If both maxChargeInkWh and currentChargeInkWh are specified, recuperation
                 * will be capped to ensure that the battery charge level never exceeds maxChargeInkWh. If
                 * neither maxChargeInkWh nor currentChargeInkWh are specified, unconstrained recuperation is
                 * assumed in the consumption calculation.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly batteryConsumptionInkWh?: number;
            }
            /**
             * An interface representing RouteResultLeg.
             */
            export interface RouteResultLeg {
                summary?: RouteResultLegSummary;
                /**
                 * Points array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly points?: Coordinate[];
            }
            /**
             * The cause of the traffic event. Can contain <mainCauseCode> and <subCauseCode> elements. Can be
             * used to define iconography and descriptions.
             */
            export interface RouteResultSectionTecCause {
                /**
                 * The main cause of the traffic event. Contains a value in the tec002:CauseCode table, as
                 * defined in the TPEG2-TEC standard.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly mainCauseCode?: number;
                /**
                 * The subcause of the traffic event. Contains a value in the sub cause table defined by the
                 * mainCauseCode, as defined in the TPEG2-TEC standard.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly subCauseCode?: number;
            }
            /**
             * Details of the traffic event, using definitions in the TPEG2-TEC standard. Can contain
             * <effectCode> and <causes> elements.
             */
            export interface RouteResultSectionTec {
                /**
                 * The effect on the traffic flow. Contains a value in the tec001:EffectCode table, as defined in
                 * the TPEG2-TEC standard. Can be used to color-code traffic events according to severity.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly effectCode?: number;
                /**
                 * List of <cause> elements.
                 */
                causes?: RouteResultSectionTecCause[];
            }
            /**
             * An interface representing RouteResultSection.
             */
            export interface RouteResultSection {
                /**
                 * Start Point Index property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly startPointIndex?: number;
                /**
                 * End Point Index property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly endPointIndex?: number;
                /**
                 * Section Type property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly sectionType?: string;
                /**
                 * Travel Mode property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly travelMode?: string;
                /**
                 * Type of the incident. Can currently be JAM, ROAD_WORK, ROAD_CLOSURE, or OTHER. See "tec" for
                 * detailed information.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly simpleCategory?: string;
                /**
                 * Effective speed of the incident in km/h, averaged over its entire length.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly effectiveSpeedInKmh?: number;
                /**
                 * Delay in seconds caused by the incident.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly delayInSeconds?: number;
                /**
                 * The magnitude of delay caused by the incident. These values correspond to the values of the
                 * response field <ty> of the Get Traffic Incident Detail API. Possible values include: '0', '1',
                 * '2', '3', '4'
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly magnitudeOfDelay?: MagnitudeOfDelay;
                tec?: RouteResultSectionTec;
            }
            /**
             * A set of attributes describing a maneuver, e.g. 'Turn right', 'Keep left', 'Take the ferry',
             * 'Take the motorway', 'Arrive'.
             */
            export interface RouteResultInstruction {
                /**
                 * Distance from the start of the route to the point of the instruction.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly routeOffsetInMeters?: number;
                /**
                 * Estimated travel time up to the point corresponding to routeOffsetInMeters.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly travelTimeInSeconds?: number;
                point?: Coordinate;
                /**
                 * Type of the instruction, e.g., turn or change of road form. Possible values include: 'TURN',
                 * 'ROAD_CHANGE', 'LOCATION_DEPARTURE', 'LOCATION_ARRIVAL', 'DIRECTION_INFO', 'LOCATION_WAYPOINT'
                 */
                instructionType?: GuidanceInstructionType;
                /**
                 * Street name of the next significant road segment after the maneuver, or of the street that
                 * should be followed.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly street?: string;
                /**
                 * 3-character [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html) alpha-3 country
                 * code. E.g. USA.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countryCode?: string;
                /**
                 * It is possible to optionally combine the instruction with the next one. This can be used to
                 * build messages like "Turn left and then turn right".
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly possibleCombineWithNext?: boolean;
                /**
                 * Indicates left-hand vs. right-hand side driving at the point of the maneuver. Possible values
                 * include: 'LEFT', 'RIGHT'
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly drivingSide?: DrivingSide;
                /**
                 * A code identifying the maneuver. Possible values include: 'ARRIVE', 'ARRIVE_LEFT',
                 * 'ARRIVE_RIGHT', 'DEPART', 'STRAIGHT', 'KEEP_RIGHT', 'BEAR_RIGHT', 'TURN_RIGHT', 'SHARP_RIGHT',
                 * 'KEEP_LEFT', 'BEAR_LEFT', 'TURN_LEFT', 'SHARP_LEFT', 'MAKE_UTURN', 'ENTER_MOTORWAY',
                 * 'ENTER_FREEWAY', 'ENTER_HIGHWAY', 'TAKE_EXIT', 'MOTORWAY_EXIT_LEFT', 'MOTORWAY_EXIT_RIGHT',
                 * 'TAKE_FERRY', 'ROUNDABOUT_CROSS', 'ROUNDABOUT_RIGHT', 'ROUNDABOUT_LEFT', 'ROUNDABOUT_BACK',
                 * 'TRY_MAKE_UTURN', 'FOLLOW', 'SWITCH_PARALLEL_ROAD', 'SWITCH_MAIN_ROAD', 'ENTRANCE_RAMP',
                 * 'WAYPOINT_LEFT', 'WAYPOINT_RIGHT', 'WAYPOINT_REACHED'
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly maneuver?: GuidanceManeuver;
                /**
                 * A human-readable message for the maneuver.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly message?: string;
            }
            /**
             * Groups a sequence of instruction elements which are related to each other. The sequence range is
             * constrained with firstInstructionIndex and lastInstructionIndex. When human-readable text
             * messages are requested for guidance (instructionType=text or tagged), then the instructionGroup
             * has a summary message returned when available.
             */
            export interface RouteResultInstructionGroup {
                /**
                 * Index of the first instruction.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly firstInstructionIndex?: number;
                /**
                 * Index of the last instruction.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lastInstructionIndex?: number;
                /**
                 * Length of the group.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly groupLengthInMeters?: number;
                /**
                 * Summary message when human-readable text messages are requested for guidance
                 * (instructionType=text or tagged).
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly groupMessage?: string;
            }
            /**
             * Contains guidance related elements. This field is present only when guidance was requested and
             * is available.
             */
            export interface RouteResultGuidance {
                /**
                 * A list of instructions describing maneuvers.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly instructions?: RouteResultInstruction[];
                /**
                 * Groups a sequence of instruction elements which are related to each other.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly instructionGroups?: RouteResultInstructionGroup[];
            }
            /**
             * An interface representing RouteDirectionsResult.
             */
            export interface RouteDirectionsResult {
                summary?: RouteDirectionsSummary;
                /**
                 * Legs array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly legs?: RouteResultLeg[];
                /**
                 * Sections array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly sections?: RouteResultSection[];
                guidance?: RouteResultGuidance;
            }
            /**
             * Optimized way point object.
             */
            export interface RouteOptimizedWaypoint {
                /**
                 * Way point index provided by the user.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly providedIndex?: number;
                /**
                 * Optimized way point index from the system.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly optimizedIndex?: number;
            }
            /**
             * Effective parameter or data used when calling this Route API.
             */
            export interface RouteResponseReportEffectiveSetting {
                /**
                 * Name of the parameter used.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly key?: string;
                /**
                 * Value of the parameter used.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly value?: string;
            }
            /**
             * Reports the effective settings used in the current call.
             */
            export interface RouteResponseReport {
                /**
                 * Effective parameters or data used when calling this Route API.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly effectiveSettings?: RouteResponseReportEffectiveSetting[];
            }
            /**
             * This object is returned from a successful Route Directions call
             */
            export interface RouteDirectionsResponse {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * Copyright property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly copyright?: string;
                /**
                 * Privacy property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly privacy?: string;
                /**
                 * Routes array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly routes?: RouteDirectionsResult[];
                /**
                 * Optimized sequence of waypoints. It shows the index from the user provided waypoint sequence
                 * for the original and optimized list. For instance, a response:
                 *
                 * ```
                 * <optimizedWaypoints>
                 * <waypoint providedIndex="0" optimizedIndex="1"/>
                 * <waypoint providedIndex="1" optimizedIndex="2"/>
                 * <waypoint providedIndex="2" optimizedIndex="0"/>
                 * </optimizedWaypoints>
                 * ```
                 *
                 * means that the original sequence is [0, 1, 2] and optimized sequence is [1, 2, 0]. Since the
                 * index starts by 0 the original is "first, second, third" while the optimized is "second,
                 * third, first".
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly optimizedWaypoints?: RouteOptimizedWaypoint[];
                report?: RouteResponseReport;
            }
            /**
             * Reachable Range
             */
            export interface RouteRange {
                /**
                 * Center point of the reachable range
                 */
                center?: Coordinate;
                /**
                 * Polygon boundary of the reachable range represented as a list of points.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly boundary?: Coordinate[];
            }
            /**
             * This object is returned from a successful Route Reachable Range call
             */
            export interface RouteRangeResponse {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * Copyright property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly copyright?: string;
                /**
                 * Privacy property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly privacy?: string;
                reachableRange?: RouteRange;
                report?: RouteResponseReport;
            }
            /**
             * Response object of the current cell in the input matrix.
             */
            export interface RouteMatrixResultResponse {
                routeSummary?: RouteResultLegSummary;
            }
            /**
             * Matrix result object
             */
            export interface RouteMatrixResult {
                /**
                 * StatusCode property for the current cell in the input matrix.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly statusCode?: number;
                response?: RouteMatrixResultResponse;
            }
            /**
             * Summary object
             */
            export interface RouteMatrixSummary {
                /**
                 * Number of successful routes in the response.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly successfulRoutes?: number;
                /**
                 * Total number of routes requested. Number of cells in the input matrix.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly totalRoutes?: number;
            }
            /**
             * This object is returned from a successful Route Matrix call. For ex, if 2 origins and 3
             * destinations are provided, there are going to 2 arrays with 3 elements in each. Each element's
             * content depends on the options provided in the query.
             */
            export interface RouteMatrixResponse {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * Results as a 2 dimensional array of route summaries.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly matrix?: RouteMatrixResult[][];
                summary?: RouteMatrixSummary;
            }
            /**
             * An object with a matrix of coordinates.
             */
            export interface RouteMatrixRequestBody {
                origins?: MultiPoint;
                destinations?: MultiPoint;
            }
            /**
             * A country record.
             */
            export interface Country {
                /**
                 * Country Name
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly name?: string;
                /**
                 * ISO-3166 2-letter country code for the country.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly code?: string;
            }
            /**
             * An interface representing TimeTransition.
             */
            export interface TimeTransition {
                /**
                 * Tag property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly tag?: string;
                /**
                 * StandardOffset property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly standardOffset?: string;
                /**
                 * DaylightSavings property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly daylightSavings?: string;
                /**
                 * Start date, start time for this transition period
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly utcStart?: Date;
                /**
                 * End date, end time for this transition period
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly utcEnd?: Date;
            }
            /**
             * Timezone names object.
             */
            export interface Names {
                /**
                 * The ISO 639-1 language code of the Names
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly iSO6391LanguageCode?: string;
                /**
                 * Generic Name
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly generic?: string;
                /**
                 * Standard Name
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly standard?: string;
                /**
                 * Daylight Name
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly daylight?: string;
            }
            /**
             * Details in effect at the local time.
             */
            export interface ReferenceTimeById {
                /**
                 * Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether
                 * Daylight Savings Time is in effect).
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly tag?: string;
                /**
                 * UTC offset in effect at the `ReferenceUTCTimestamp`.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly standardOffset?: string;
                /**
                 * Time saving in minutes in effect at the `ReferenceUTCTimestamp`.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly daylightSavings?: string;
                /**
                 * Current wall time at the given time zone as shown in the `Tag` property.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly wallTime?: string;
                /**
                 * The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given
                 * year.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly posixTzValidYear?: number;
                /**
                 * POSIX string used to set the time zone environment variable.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly posixTz?: string;
            }
            /**
             * Representative point property
             */
            export interface RepresentativePoint {
                /**
                 * Latitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly latitude?: number;
                /**
                 * Longitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly longitude?: number;
            }
            /**
             * An interface representing TimezoneById.
             */
            export interface TimezoneById {
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                /**
                 * An array of time zone ID aliases.  Only returned when [options]=*zoneinfo* or *all*.
                 *
                 * Note: may be null.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly aliases?: string[];
                /**
                 * An array of country records. Only returned when [options]=*zoneinfo* or *all*.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countries?: Country[];
                names?: Names;
                referenceTime?: ReferenceTimeById;
                representativePoint?: RepresentativePoint;
                /**
                 * Time zone DST transitions from [transitionsFrom] until timestamp + 1 year.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly timeTransitions?: TimeTransition[];
            }
            /**
             * This object is returned from a successful Timezone By ID call
             */
            export interface TimezoneByIdResult {
                /**
                 * Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly version?: string;
                /**
                 * Reference Utc Timestamp property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly referenceUtcTimestamp?: Date;
                timeZones?: TimezoneById[];
                /**
                 * Count property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly count?: number;
            }
            /**
             * Details in effect at the local time.
             */
            export interface ReferenceTimeByCoordinates {
                /**
                 * Time zone name in effect at the reference timestamp (i.e. PST or PDT depending whether
                 * Daylight Savings Time is in effect).
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly tag?: string;
                /**
                 * UTC offset in effect at the `ReferenceUTCTimestamp`.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly standardOffset?: string;
                /**
                 * Time saving in minutes in effect at the `ReferenceUTCTimestamp`.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly daylightSavings?: string;
                /**
                 * Current wall time at the given time zone as shown in the `Tag` property.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly wallTime?: string;
                /**
                 * The year this POSIX string is valid for. Note: A POSIX string will only be valid in the given
                 * year.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly posixTzValidYear?: number;
                /**
                 * POSIX string used to set the time zone environment variable.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly posixTz?: string;
                /**
                 * Sunrise at the given time zone as shown in the `Tag` property.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly sunrise?: string;
                /**
                 * Sunset at the given time zone as shown in the `Tag` property.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly sunset?: string;
            }
            /**
             * An interface representing TimeZoneByCoordinates.
             */
            export interface TimeZoneByCoordinates {
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                /**
                 * An array of time zone ID aliases.  Only returned when [options]=*zoneinfo* or *all*.
                 *
                 * Note: may be null.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly aliases?: string[];
                /**
                 * An array of country records. Only returned when [options]=*zoneinfo* or *all*.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly countries?: Country[];
                names?: Names;
                referenceTime?: ReferenceTimeByCoordinates;
                representativePoint?: RepresentativePoint;
                /**
                 * Time zone DST transitions from [transitionsFrom] until timestamp + 1 year.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly timeTransitions?: TimeTransition[];
            }
            /**
             * This object is returned from a successful Timezone By Coordinates call
             */
            export interface TimezoneByCoordinatesResult {
                /**
                 * Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly version?: string;
                /**
                 * Reference Utc Timestamp property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly referenceUtcTimestamp?: Date;
                timeZones?: TimeZoneByCoordinates[];
                /**
                 * Count property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly count?: number;
            }
            /**
             * An interface representing TimezoneEnumWindow.
             */
            export interface TimezoneEnumWindow {
                /**
                 * Windows Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly windowsId?: string;
                /**
                 * Territory property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly territory?: string;
                /**
                 * IanaIds array
                 */
                ianaIds?: string[];
            }
            /**
             * An interface representing IanaId.
             */
            export interface IanaId {
                /**
                 * Id property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly id?: string;
                /**
                 * IsAlias property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly isAlias?: boolean;
                /**
                 * AliasOf property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly aliasOf?: string;
                /**
                 * HasZone1970Location property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly hasZone1970Location?: boolean;
            }
            /**
             * This object is returned from a successful Timezone IANA Version call
             */
            export interface TimezoneIanaVersionResult {
                /**
                 * Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly version?: string;
            }
            /**
             * Country property
             */
            export interface RegionCountry {
                /**
                 * ISO3 property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly iSO3?: string;
                /**
                 * Label property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly label?: string;
            }
            /**
             * An interface representing Region.
             */
            export interface Region {
                /**
                 * Copyrights array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly copyrights?: string[];
                /**
                 * Country property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly country?: RegionCountry;
            }
            /**
             * This object is returned from a successful Copyright Bounding call
             */
            export interface CopyrightBoundingResult {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * General Copyrights array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly generalCopyrights?: string[];
                /**
                 * Regions array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly regions?: Region[];
            }
            /**
             * This object is returned from a successful Copyright Caption call
             */
            export interface CopyrightCaptionResult {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * Copyrights Caption property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly copyrightsCaption?: string;
            }
            /**
             * This object is returned from a successful Copyright World call
             */
            export interface CopyrightWorldResult {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * General Copyrights array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly generalCopyrights?: string[];
                /**
                 * Regions array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly regions?: Region[];
            }
            /**
             * This object is returned from a successful Copyright Tile call
             */
            export interface CopyrightTileResult {
                /**
                 * Format Version property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly formatVersion?: string;
                /**
                 * General Copyrights array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly generalCopyrights?: string[];
                /**
                 * Regions array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly regions?: Region[];
            }
            /**
             * A valid `GeoJSON Polygon` geometry type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.6) for details.
             */
            export interface Polygon {
                /**
                 * Polymorphic Discriminator
                 */
                type: "Polygon";
                /**
                 * Coordinates for the `Polygon` geometry type.
                 */
                coordinates: number[][][];
            }
            /**
             * The viewport that covers the result represented by the top-left and bottom-right coordinates of
             * the  viewport.
             */
            export interface ResultViewport {
                topLeftPoint?: Coordinate;
                btmRightPoint?: Coordinate;
            }
            /**
             * Details of the metro area.
             */
            export interface MetroAreaResult {
                /**
                 * The metro area's Id for use with other API calls.
                 */
                metroId?: number;
                /**
                 * The main display name of the metro.
                 */
                metroName?: string;
                geometry?: Polygon;
                viewport?: ResultViewport;
            }
            /**
             * This object is returned from a successful Get Metro Area call
             */
            export interface MetroAreaResponse {
                results?: MetroAreaResult[];
            }
            /**
             * An interface representing TransitTypeResult.
             */
            export interface TransitTypeResult {
                /**
                 * Supported public transit type. Possible values include: 'Bus', 'CableCar', 'Ferry',
                 * 'Funicular', 'Gondola', 'Rail', 'Tram', 'Subway'
                 */
                transitType?: TransitType;
                /**
                 * For metro areas in which local name is different than the GFTS supported transit type,
                 * original name is returned.
                 */
                captionOverride?: string;
            }
            /**
             * Details of the agency.
             */
            export interface Agency {
                /**
                 * The Id of the relevant transit agency, for example, '5872'
                 */
                agencyId?: string;
                /**
                 * The agency’s GTFS Id.
                 */
                agencyKey?: string;
                /**
                 * Name of the relevant transit agency, e.g. Metro Transit.
                 */
                agencyName?: string;
                /**
                 * Supported public transit type. One of Tram, Subway, Rail, Bus, Ferry, CableCar, Gondola,
                 * Funicular.
                 */
                transitType?: TransitTypeResult;
            }
            /**
             * An interface representing AlertDescription.
             */
            export interface AlertDescription {
                /**
                 * Description of the alert.
                 */
                data?: string;
                /**
                 * Format of the alert description.
                 */
                format?: string;
                /**
                 * Source URL.
                 */
                sourceUrl?: string;
            }
            /**
             * A list of alert details.
             */
            export interface AlertDetail {
                /**
                 * The Id of the relevant transit agency, for example, '5872'.
                 */
                agencyId?: string;
                /**
                 * Name of the relevant transit agency, e.g. Metro Transit.
                 */
                agencyName?: string;
                /**
                 * The title of the alert.
                 */
                title?: string;
                /**
                 * A short description of the alert.
                 */
                description?: AlertDescription;
                /**
                 * The start time of the alert in the local time in ISO format (2019-04-05T14:24:18-04:00).
                 */
                activeFrom?: Date;
                /**
                 * The estimated end time of the alert in the local time in ISO format
                 * (2019-04-05T14:24:18-04:00).
                 */
                activeTo?: Date;
                /**
                 * Service Alert effect - one of SA_NO_SERVICE, SA_REDUCED_SERVICE, SA_SIGNIFICANT_DELAYS,
                 * SA_DETOUR, SA_ADDITIONAL_SERVICE, SA_MODIFIED_SERVICE, SA_OTHER_EFFECT, SA_STOP_MOVED,
                 * SA_GOOD_SERVICE, SA_SLEEPING, SA_OTHER_EFFECT
                 */
                effect?: string;
            }
            /**
             * Basic information associated with the active alert.
             */
            export interface Alert {
                /**
                 * Text summarizing the alert.
                 */
                alertSummary?: string;
                /**
                 * The date and time in ISO 8601 format, e.g. 2019-04-05T14:24:18-04:00.
                 */
                publicationDate?: Date;
                /**
                 * The category of the alert. One of None, Regular, Info, Modified, Critical.
                 */
                category?: string;
                /**
                 * The level at which the respective alert extents to. One of Metro, Agency, Line, Stop.
                 */
                alertLevel?: string;
                details?: AlertDetail;
            }
            /**
             * This object is returned from a successful Metro Area call.
             */
            export interface MetroAreaInfoResponse {
                /**
                 * The name of the metro area.
                 */
                metroName?: string;
                transitTypes?: TransitTypeResult[];
                agencies?: Agency[];
                alerts?: Alert[];
            }
            /**
             * An interface representing TransitObjectResult.
             */
            export interface TransitObjectResult {
                /**
                 * The object identifier found as a result of the query, for example, stopId for stops.
                 */
                id?: string;
                /**
                 * The type of object found as a result of the query.
                 */
                type?: string;
                /**
                 * The object specific details.
                 */
                objectDetails?: any;
                /**
                 * The transit object's position.
                 */
                position?: Coordinate;
                viewport?: ResultViewport;
            }
            /**
             * This object is returned from a successful Get Nearby Transit call
             */
            export interface NearbyTransitResponse {
                results?: TransitObjectResult[];
            }
            /**
             * The stop's basic info
             */
            export interface Stop {
                /**
                 * The unique Azure Maps identifier for the respective public transit stop. When referring stops
                 * overtime, it is suggested to use stopId that will not change if the physical stop exists.
                 */
                stopId?: string;
                /**
                 * The GTFS stop Id. GTFS stop Ids are provided by the transit authority and subject to change.
                 */
                stopKey?: string;
                /**
                 * The name of the stop.
                 */
                stopName?: string;
                /**
                 * The stop code displayed at the physical stop. Returned if available.
                 */
                stopCode?: string;
                /**
                 * The Stop's location, latitude and longitude.
                 */
                position?: Coordinate;
                /**
                 * The transit type of most lines stopping at this stop. One of Tram, Subway, Rail, Bus, Ferry,
                 * CableCar, Gondola, Funicular
                 */
                mainTransitType?: string;
                /**
                 * The Id of the transit agency of most lines stopping at this stop. For example '5872'.
                 */
                mainAgencyId?: string;
                /**
                 * The name of the agency of most lines stopping at this stop, for example, 'Metro Transit'.
                 */
                mainAgencyName?: string;
            }
            /**
             * A stop line
             */
            export interface Line {
                /**
                 * Line Id.
                 */
                lineId?: string;
                /**
                 * Line group Id. Typically contains 2 lines having the same agency and line, one going from A to
                 * B, and the other from B to A.
                 */
                lineGroupId?: string;
                /**
                 * Line direction. Possible values 'forward' or 'backward'.
                 */
                direction?: string;
                /**
                 * The Id of the transit agency, for example, '5872'.
                 */
                agencyId?: string;
                /**
                 * The name of the transit agency, for example, 'NJ Transit'.
                 */
                agencyName?: string;
                /**
                 * The transit line number.
                 */
                lineNumber?: string;
                /**
                 * The line’s origin, will be present according to metro settings.
                 */
                origin?: string;
                /**
                 * The line’s user displayable destination.
                 */
                lineDestination?: string;
                /**
                 * Most common pattern for the line.
                 */
                mostFrequentPatternId?: string;
                /**
                 * The public transit type of the line. Possible values include: 'Bus', 'CableCar', 'Ferry',
                 * 'Funicular', 'Gondola', 'Rail', 'Tram', 'Subway'
                 */
                transitType?: TransitType;
            }
            /**
             * A line group
             */
            export interface LineGroup {
                /**
                 * Line group Id. Typically contains 2 lines having the same agency and line, one going from A to
                 * B, and the other from B to A.
                 */
                lineGroupId?: string;
                /**
                 * The Id of the transit agency, for example, '5872'.
                 */
                agencyId?: string;
                /**
                 * The name of the transit agency, e.g. Metro Transit.
                 */
                agencyName?: string;
                /**
                 * The transit line number.
                 */
                lineNumber?: string;
                /**
                 * A descriptive string. In case caption2 is null, should be used alone as a subtitle to the line
                 * number (i.e. Circular). In case caption2 has a value present, should be used in conjunction
                 * with it (i.e. Rome ↔ Napoli).
                 */
                caption1?: string;
                /**
                 * A descriptive string.
                 */
                caption2?: string;
                /**
                 * HEX color for the line.
                 */
                color?: string;
                /**
                 * The public transit type of the line. Possible values include: 'Bus', 'CableCar', 'Ferry',
                 * 'Funicular', 'Gondola', 'Rail', 'Tram', 'Subway'
                 */
                transitType?: TransitType;
            }
            /**
             * This object is returned from a successful Get Transit Stop Info call
             */
            export interface TransitStopInfoResponse {
                stop?: Stop;
                lines?: Line[];
                lineGroups?: LineGroup[];
                alerts?: Alert[];
            }
            /**
             * An interface representing RouteItineraryLeg.
             */
            export interface RouteItineraryLeg {
                /**
                 * The travel mode of the leg. Possible values include: 'Walk', 'Bicycle', 'Tram', 'Subway',
                 * 'Rail', 'Bus', 'Ferry', 'Cable', 'Gondola', 'Funicular', 'PathWayWalk', 'Wait',
                 * 'WaitOnVehicle'
                 */
                legType?: LegType;
                /**
                 * Start time for the leg in ISO 8601 format, e.g. 1996-12-19T19:39:57-08:00.
                 */
                legStartTime?: string;
                /**
                 * End time for the leg in ISO 8601 format, e.g. 1996-12-19T19:39:57-08:00.
                 */
                legEndTime?: string;
                /**
                 * For Public Transit legs the caption of the line serving the leg, for example, line number.
                 */
                caption?: string;
                /**
                 * The total distance of the leg in meters.
                 */
                lengthInMeters?: number;
            }
            /**
             * An interface representing ItineraryResult.
             */
            export interface ItineraryResult {
                /**
                 * A unique identifier of the returned itinerary.
                 */
                itineraryId?: string;
                /**
                 * The date and time of departure from the origin point in ISO 8601 format, e.g.
                 * 1996-12-19T16:39:57-08:00.
                 */
                departureTime?: Date;
                /**
                 * The date and time of arrival at the destination point in ISO 8601 format, e.g.
                 * 1996-12-19T19:39:57-08:00.
                 */
                arrivalTime?: Date;
                /**
                 * Estimated travel time in seconds.
                 */
                travelTimeInSeconds?: number;
                /**
                 * Number of legs.
                 */
                numberOfLegs?: number;
                /**
                 * An array summarizing the legs of this itinerary.
                 */
                legs?: RouteItineraryLeg[];
            }
            /**
             * This object is returned from a successful Get Transit Stop Info call
             */
            export interface TransitRouteResponse {
                results?: ItineraryResult[];
            }
            /**
             * The walking directions guidance.
             */
            export interface Direction {
                /**
                 * The relative walking direction associated with applicable step. Possible values include:
                 * 'depart', 'hardLeft', 'left', 'slightlyLeft', 'continue', 'slightlyRight', 'right',
                 * 'hardRight', 'circleClockwise', 'circleCounterclockwise', 'elevator', 'uturnLeft',
                 * 'uturnRight'
                 */
                relativeDirection?: RelativeDirection;
                /**
                 * The absolute walking direction associated with this step. Possible values include: 'north',
                 * 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'
                 */
                absoluteDirection?: AbsoluteDirection;
            }
            /**
             * An interface representing Step.
             */
            export interface Step {
                /**
                 * The walking direction associated with this step.
                 */
                direction?: Direction;
                /**
                 * The name of the street in which this step takes place.
                 */
                streetName?: string;
            }
            /**
             * An interface representing LegPoint.
             */
            export interface LegPoint {
                position?: Coordinate;
            }
            /**
             * An interface representing LineArrival.
             */
            export interface LineArrival {
                /**
                 * Line Id.
                 */
                lineId?: string;
                /**
                 * The unique Azure Maps identifier for the respective public transit stop. When referring stops
                 * overtime, it is suggested to use stopId that will not change if the physical stop exists.
                 */
                stopId?: string;
                /**
                 * The date and time of departure from the stop in ISO 8601 format, e.g.
                 * 1996-12-19T19:39:57-08:00.
                 */
                scheduleTime?: Date;
                /**
                 * Whether the result is based on real-time or static data. Possible values include:
                 * 'scheduledTime', 'realTime'
                 */
                scheduleType?: ScheduleType;
            }
            /**
             * An interface representing Leg.
             */
            export interface Leg {
                /**
                 * The travel mode of the leg. Possible values include: 'Walk', 'Bicycle', 'Tram', 'Subway',
                 * 'Rail', 'Bus', 'Ferry', 'Cable', 'Gondola', 'Funicular', 'PathWayWalk', 'Wait',
                 * 'WaitOnVehicle'
                 */
                legType?: LegType;
                /**
                 * Start time for the leg.
                 */
                legStartTime?: string;
                /**
                 * End time for the leg.
                 */
                legEndTime?: string;
                /**
                 * In case of walk or bike leg, the directions.
                 */
                steps?: Step[];
                /**
                 * The walk/bike leg’s origin.
                 */
                origin?: LegPoint;
                /**
                 * The walk/bike leg’s destination.
                 */
                destination?: LegPoint;
                geometry?: LineString;
                /**
                 * In case of a public transit leg, the line group serving this leg.
                 */
                lineGroup?: LineGroup;
                /**
                 * In case of a public transit leg, the line serving this leg.
                 */
                line?: Line;
                /**
                 * List of stops comprising the line’s route within the leg (e.g. the stops the leg passes
                 * through).
                 */
                stops?: Stop[];
                /**
                 * Relevant for Public Transit and Wait legs only
                 */
                departures?: LineArrival[];
                /**
                 * Indicates whether it’s necessary to wait for the next leg on the same vehicle (i.e. the bus
                 * will only change its line number).
                 */
                waitOnVehicle?: string;
            }
            /**
             * This object is returned from a successful Get Transit Itinerary call
             */
            export interface TransitItineraryResponse {
                /**
                 * The date and time of departure from the origin point in ISO 8601 format, e.g.
                 * 1996-12-19T16:39:57-08:00.
                 */
                departureTime?: string;
                /**
                 * The date and time of arrival at the destination point in ISO 8601 format, e.g.
                 * 1996-12-19T19:39:57-08:00.
                 */
                arrivalTime?: string;
                legs?: Leg[];
            }
            /**
             * Pricing details including currency, reservation price and usage price.
             */
            export interface Pricing {
                /**
                 * The [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) of returned prices.
                 * Will be returned in case any of the other pricing fields were returned.
                 */
                currency?: string;
                /**
                 * The price per minute charged when the vehicle is in use.
                 */
                usagePrice?: string;
                /**
                 * The price per minute charged when the vehicle has been reserved but not yet in use.
                 */
                reservationPrice?: string;
            }
            /**
             * Contains information about the operator. Apart form Id and name, all other fields are optional
             * and nor always returned.
             */
            export interface OperatorInfo {
                /**
                 * The Id of the operator operating this object.
                 */
                id?: string;
                /**
                 * The name of the operator operating this object.
                 */
                name?: string;
                /**
                 * Short description about the operator.
                 */
                description?: string;
                /**
                 * Operator's home page.
                 */
                siteUrl?: string;
            }
            /**
             * Details of the car share vehicle. Name is always returned. Level of other returned details
             * depends on car share operator.
             */
            export interface CarShareResponse {
                /**
                 * Car share provider specific value – most often will be the vehicle's license plate.
                 */
                name?: string;
                /**
                 * Model of the car.
                 */
                model?: string;
                /**
                 * Total number of seats in the vehicle.
                 */
                seatCount?: number;
                /**
                 * Percentage of fuel indicating the fuel level, 100 being full, 0 empty. Unit: percentage (%).
                 */
                fuelLevel?: number;
                /**
                 * Percentage of battery indicating the battery level, 100 being full, 0 empty. Unit: percentage
                 * (%).
                 */
                batteryLevel?: number;
                /**
                 * Pricing details including currency, reservation price and usage price.
                 */
                pricing?: Pricing;
                /**
                 * Last known location of the vehicle.
                 */
                position?: Coordinate;
                /**
                 * Details of the share operator.
                 */
                operatorInfo?: OperatorInfo;
            }
            /**
             * This object is returned from a successful Transit Dock Info call.
             */
            export interface TransitDockInfoResponse {
                /**
                 * Number of available bikes / scooters in the given bike or scooter docking station.
                 */
                availableVehicles?: number;
                /**
                 * Number of vacant dock locations in the given bike or scooter docking station.
                 */
                vacantLocations?: number;
                /**
                 * The dock's position.
                 */
                position?: Coordinate;
                /**
                 * When the vacancy and availability information was last updated.
                 */
                lastUpdated?: Date;
                /**
                 * Details of the share operator. Id is always returned. Level of other returned details depends
                 * on the operator.
                 */
                operatorInfo?: OperatorInfo;
            }
            /**
             * Stop-shape-segments of the trip pattern, which are an ordered list of the stops and the shapes
             * connecting them.
             */
            export interface Pattern {
                /**
                 * Pattern Id, for example, '3267995'.
                 */
                patternId?: string;
                /**
                 * Line Id.
                 */
                lineId?: string;
                /**
                 * Stops the line goes through.
                 */
                stopIds?: string[];
                /**
                 * Stop sequence and shape per a line in GeoJSON format.
                 */
                geometry?: LineString;
            }
            /**
             * This object is returned from a successful Transit Line Info call.
             */
            export interface TransitLineInfoResponse {
                /**
                 * Groups together all lines that are logically part of the same group. Typically contains 2
                 * lines having the same agency and line, one going from A to B, and the other from B to A.
                 */
                lineGroup?: LineGroup;
                /**
                 * The line group’s basic info and list of the lines.
                 */
                lines?: Line[];
                /**
                 * List of stops the line group goes through.
                 */
                stops?: Stop[];
                /**
                 * List of patterns this group is comprised of. A pattern consists of a stop sequence and shape
                 * per a line in GeoJSON format.
                 */
                patterns?: Pattern[];
                /**
                 * Line schedule for the current 24h. May be null in case no schedule exists for the current
                 * time.
                 */
                schedule?: LineArrival;
            }
            /**
             * Contains real-time arrival related details.
             */
            export interface RealTimeArrivalResult {
                /**
                 * The estimated time of arrival in minutes.
                 */
                arrivalMinutes?: number;
                /**
                 * Whether the result is based on real-time or static data. Possible values include:
                 * 'scheduledTime', 'realTime'
                 */
                scheduleType?: ScheduleType;
                /**
                 * The pattern Id.
                 */
                patternId?: string;
                /**
                 * The public transit type of the line.
                 */
                line?: Line;
                /**
                 * Object for the given stop.
                 */
                stop?: Stop;
            }
            /**
             * This object is returned from a successful Get Real Time Arrival Info call.
             */
            export interface RealTimeArrivalsResponse {
                /**
                 * Results array. Contains results related details.
                 */
                results?: RealTimeArrivalResult[];
            }
            /**
             * A location represented as a latitude and longitude
             */
            export interface SpatialCoordinate {
                /**
                 * Latitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lat?: number;
                /**
                 * Longitude property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly lon?: number;
            }
            /**
             * A valid `GeoJSON Feature` object type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.2) for details.
             */
            export interface GeoJSONFeatureCollectionFeaturesItem {
                /**
                 * Specifies the `type` for the object. Value should always be equal to "Feature".
                 */
                type?: string;
                geometry?: GeoJSONGeometryUnion;
                /**
                 * Properties can contain any additional metadata about the `Feature`. Value can be any JSON
                 * object or a JSON null value
                 */
                properties?: any;
            }
            /**
             * A valid `GeoJSON FeatureCollection` object type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details.
             */
            export interface GeoJSONFeatureCollection {
                /**
                 * Specifies the `type` for the object. Value should always be equal to "FeatureCollection".
                 */
                type: string;
                /**
                 * Contains a list of valid `GeoJSON Feature` objects.
                 */
                features: GeoJSONFeatureCollectionFeaturesItem[];
            }
            /**
             * A valid `GeoJSON MultiLineString` geometry type. Please refer to [RFC
             * 7946](https://tools.ietf.org/html/rfc7946#section-3.1.5) for details.
             */
            export interface MultiLineString {
                /**
                 * Polymorphic Discriminator
                 */
                type: "MultiLineString";
                /**
                 * Coordinates for the `MultiLineString` geometry.
                 */
                coordinates: number[][][];
            }
            /**
             * The geofencing geometry.
             */
            export interface GeofenceGeometry {
                /**
                 * ID of the device.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly deviceId?: string;
                /**
                 * The unique id returned from [Data Upload
                 * API](https://docs.microsoft.com/en-us/rest/api/maps/data/uploadPreview) after uploading a
                 * valid GeoJSON FeatureCollection object. Please refer to  [RFC
                 * 7946](https://tools.ietf.org/html/rfc7946#section-3.3) for details. All the feature's
                 * properties should  contain `geometryId`, which is used for identifying the geometry and is
                 * case-sensitive.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udId?: string;
                /**
                 * The unique id identifies a geometry.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly geometryId?: string;
                /**
                 * Distance from the coordinate to the closest border of the geofence. Positive means the
                 * coordinate is outside of the geofence. If the coordinate is outside of the geofence, but more
                 * than the value of searchBuffer away from the closest geofence border, then the value is 999.
                 * Negative means the coordinate is inside of the geofence. If the coordinate is inside the
                 * polygon, but more than the value of searchBuffer away from the closest geofencing border, then
                 * the value is -999. A value of 999 means that there is great confidence the coordinate is well
                 * outside the geofence. A value of -999 means that there is great confidence the coordinate is
                 * well within the geofence.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly distance?: number;
                /**
                 * Latitude of the nearest point of the geometry.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly nearestLat?: number;
                /**
                 * Longitude of the nearest point of the geometry.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly nearestLon?: number;
            }
            /**
             * This object is returned from a geofence proximity call.
             */
            export interface GeofenceResponse {
                /**
                 * Lists the fence geometries that contain the coordinate position or overlap the searchBuffer
                 * around the position.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly geometries?: GeofenceGeometry[];
                /**
                 * Lists of the geometry ID of the geofence which is expired relative to the user time in the
                 * request.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly expiredGeofenceGeometryId?: string[];
                /**
                 * Lists of the geometry ID of the geofence which is in invalid period relative to the user time
                 * in the request.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly invalidPeriodGeofenceGeometryId?: string[];
                /**
                 * True if at least one event is published to the Azure Maps event subscriber, false if no event
                 * is published to the Azure Maps event subscriber.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly isEventPublished?: boolean;
            }
            /**
             * An object with a FeatureCollection and a list of distances.  All the feature's properties should
             * contain `geometryId`, which is used for identifying the geometry and is case-sensitive.
             */
            export interface BufferRequestBody {
                geometries?: GeoJSONFeatureCollection;
                /**
                 * List of the distances to compute the buffer for, one-to-one per Feature in the collection, or
                 * one for all Features in the collection.
                 */
                distances?: number[];
            }
            /**
             * Summary of the call.
             */
            export interface BufferResponseSummary {
                /**
                 * The udid for the user data if one exists
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
                /**
                 * The information about what happened during the call.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly information?: string;
            }
            /**
             * This object is returned from a successful Spatial Buffer call.
             */
            export interface BufferResponse {
                /**
                 * Summary of the call.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly summary?: BufferResponseSummary;
                /**
                 * The FeatureCollection of buffers for the input.
                 */
                result?: GeoJSONFeatureCollection;
            }
            /**
             * Get Closest Point Summary object
             */
            export interface GetClosestPointSummary {
                sourcePoint?: SpatialCoordinate;
                /**
                 * A unique data id (udid) for the uploaded content
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
                /**
                 * Processing information
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly information?: string;
            }
            /**
             * Closest Point Result Entry Object
             */
            export interface ClosestPointResultEntry {
                /**
                 * The distance in meters from the source point to the closest point
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly distanceInMeters?: number;
                position?: SpatialCoordinate;
                /**
                 * The unique id identifies a geometry
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly geometryId?: string;
            }
            /**
             * This object is returned from a successful Get Spatial Closest Point call
             */
            export interface GetClosestPointResponse {
                summary?: GetClosestPointSummary;
                result?: ClosestPointResultEntry[];
            }
            /**
             * Post Closest Point Summary object
             */
            export interface PostClosestPointSummary {
                sourcePoint?: SpatialCoordinate;
                /**
                 * A unique data id (udid) for the uploaded content. Udid is not applicable for POST spatial
                 * operations(set to null)
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
                /**
                 * Processing information
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly information?: string;
            }
            /**
             * This object is returned from a successful Post Spatial Closest Point call
             */
            export interface PostClosestPointResponse {
                summary?: PostClosestPointSummary;
                result?: ClosestPointResultEntry[];
            }
            /**
             * Point In Polygon Summary object
             */
            export interface GetPointInPolygonSummary {
                sourcePoint?: SpatialCoordinate;
                /**
                 * A unique data id (udid) for the uploaded content
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
                /**
                 * Processing information
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly information?: string;
            }
            /**
             * Point In Polygon Result Object
             */
            export interface PointInPolygonResult {
                /**
                 * Point In Polygons Property
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly pointInPolygons?: boolean;
                /**
                 * Geometries array
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly intersectingGeometries?: string[];
            }
            /**
             * Returns true if point is within the polygon, false otherwise
             */
            export interface GetPointInPolygonResponse {
                summary?: GetPointInPolygonSummary;
                result?: PointInPolygonResult;
            }
            /**
             * Point In Polygon Summary object
             */
            export interface PostPointInPolygonSummary {
                sourcePoint?: SpatialCoordinate;
                /**
                 * A unique data id (udid) for the uploaded content. Udid is not applicable for POST spatial
                 * operations(set to null)
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
                /**
                 * Processing information
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly information?: string;
            }
            /**
             * Returns true if point is within the polygon, false otherwise
             */
            export interface PostPointInPolygonResponse {
                summary?: PostPointInPolygonSummary;
                result?: PointInPolygonResult;
            }
            /**
             * Summary object
             */
            export interface GreatCircleDistanceResponseSummary {
                sourcePoint?: SpatialCoordinate;
                targetPoint?: SpatialCoordinate;
            }
            /**
             * Result Object
             */
            export interface GreatCircleDistanceResponseResult {
                /**
                 * The great circle distance in meters from the source point to the target point
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly distanceInMeters?: number;
            }
            /**
             * This object is returned from a successful Great Circle Distance call
             */
            export interface GreatCircleDistanceResponse {
                /**
                 * Summary object
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly summary?: GreatCircleDistanceResponseSummary;
                /**
                 * Result Object
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly result?: GreatCircleDistanceResponseResult;
            }
            /**
             * The response model for the spatial data upload API. Returns a unique data id (udid) for the
             * uploaded content.
             */
            export interface UploadDataResponse {
                /**
                 * A unique data id (udid) for the uploaded content.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly udid?: string;
            }
            /**
             * The response model for the spatial data upload API. Returns the current status and a status URI.
             */
            export interface UploadDataAcceptedResponse {
                /**
                 * Current status of the long running upload operation.
                 * **NOTE: This property will not be serialized. It can only be populated by the server.**
                 */
                readonly status?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchFuzzyOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and
                 * the search will enter predictive mode
                 */
                typeahead?: boolean;
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and
                 * maximum: 1900
                 */
                ofs?: number;
                /**
                 * Comma separated string of country codes, e.g. FR,ES. This will limit the search to the
                 * specified countries
                 */
                countrySet?: string[];
                /**
                 * Latitude where results should be biased. E.g. 37.337
                 */
                lat?: number;
                /**
                 * Longitude where results should be biased. E.g. -121.89
                 */
                lon?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * Top left position of the bounding box. E.g. 37.553,-122.453
                 */
                topLeft?: string;
                /**
                 * Bottom right position of the bounding box. E.g. 37.553,-122.453
                 */
                btmRight?: string;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * Minimum fuzzyness level to be used. Default: 1, minimum: 1 and maximum: 4
                 *
                 * * Level 1 has no spell checking.
                 *
                 * * Level 2 uses normal n-gram spell checking. For example, query "restrant" can be matched to
                 * "restaurant."
                 *
                 * * Level 3 uses sound-like spell checking, and shingle spell checking. Sound-like spell
                 * checking is for "rstrnt" to "restaurant" matching. Shingle spell checking is for
                 * "mountainview" to "mountain view" matching.
                 *
                 * * Level 4 doesn’t add any more spell checking functions.
                 *
                 *
                 *
                 * The search engine will start looking for a match on the level defined by minFuzzyLevel, and
                 * will stop searching at the level specified by maxFuzzyLevel.
                 */
                minFuzzyLevel?: number;
                /**
                 * Maximum fuzzyness level to be used. Default: 2, minimum: 1 and maximum: 4
                 *
                 * * Level 1 has no spell checking.
                 *
                 * * Level 2 uses normal n-gram spell checking. For example, query "restrant" can be matched to
                 * "restaurant."
                 *
                 * * Level 3 uses sound-like spell checking, and shingle spell checking. Sound-like spell
                 * checking is for "rstrnt" to "restaurant" matching. Shingle spell checking is for
                 * "mountainview" to "mountain view" matching.
                 *
                 * * Level 4 doesn’t add any more spell checking functions.
                 *
                 *
                 *
                 * The search engine will start looking for a match on the level defined by minFuzzyLevel, and
                 * will stop searching at the level specified by maxFuzzyLevel.
                 */
                maxFuzzyLevel?: number;
                /**
                 * A comma separated list of indexes which should be utilized for the search. Item order does not
                 * matter. Available indexes are: Addr = Address range interpolation, Geo = Geographies, PAD =
                 * Point Addresses, POI = Points of interest, Str = Streets, Xstr = Cross Streets (intersections)
                 */
                idxSet?: SearchIndexSet[];
                /**
                 * A comma-separated list of brand names which could be used to restrict the result to specific
                 * brands. Item order does not matter. When multiple brands are provided, only results that
                 * belong to (at least) one of the provided list will be returned. Brands that contain a "," in
                 * their name should be put into quotes.
                 *
                 * Usage examples:
                 *
                 * brandSet=Foo
                 *
                 * brandSet=Foo,Bar
                 *
                 * brandSet="A,B,C Comma",Bar
                 */
                brandSet?: string[];
                /**
                 * A comma-separated list of connector types which could be used to restrict the result to
                 * Electric Vehicle Station supporting specific connector types. Item order does not matter. When
                 * multiple connector types are provided, only results that belong to (at least) one of the
                 * provided list will be returned.
                 *
                 * Available connector types are:
                 * * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a
                 * certain region. They are all AC single phase and the standard Voltage and standard Amperage.
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
                 * * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called
                 * Yazaki after the original manufacturer or SAE J1772 after the standard that first published
                 * it. Mostly used in combination with 120V single phase or up to 240V single phase
                 * infrastructure.
                 * * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard.
                 * Provided as a cable and plug attached to the charging point.
                 * * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as
                 * a socket set into the charging point.
                 * * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame
                 * after the original manufacturer. Mostly used in combination with up to 240V single phase or up
                 * to 420V three phase infrastructure.
                 * * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power
                 * Company and industrial partners. Because of this is is also known as the TEPCO's connector. It
                 * supports fast DC charging.
                 * * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309
                 * standard. It is sometime referred to as by some combination of the standard, the color and the
                 * fact that is a single phase connector. The connector usually has the "P+N+E, 6h"
                 * configuration.
                 * * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309
                 * standard.
                 * * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e.
                 * it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly
                 * limited to North America or the modified Type 2 (DC over Type 2) in Europe.
                 *
                 * Usage examples:
                 *
                 * connectorSet=IEC62196Type2CableAttached
                 * connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
                 */
                connectorSet?: ConnectorSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
                /**
                 * Opening hours for a POI (Points of Interest). The availability of opening hours will vary
                 * based on the data available. Possible values include: 'nextSevenDays'
                 */
                openingHours?: OpeningHours;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchPOIOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and
                 * the search will enter predictive mode
                 */
                typeahead?: boolean;
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Starting offset of the returned results within the full result set. Default: 0, minimum: 0 and
                 * maximum: 1900
                 */
                ofs?: number;
                /**
                 * Comma separated string of country codes, e.g. FR,ES. This will limit the search to the
                 * specified countries
                 */
                countrySet?: string[];
                /**
                 * Latitude where results should be biased. E.g. 37.337
                 */
                lat?: number;
                /**
                 * Longitude where results should be biased. E.g. -121.89
                 */
                lon?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * Top left position of the bounding box. E.g. 37.553,-122.453
                 */
                topLeft?: string;
                /**
                 * Bottom right position of the bounding box. E.g. 37.553,-122.453
                 */
                btmRight?: string;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **POI** = Points of Interest
                 *
                 * Value should be **POI** or **None** to disable extended postal codes.
                 *
                 * By default extended postal codes are included.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * A comma-separated list of brand names which could be used to restrict the result to specific
                 * brands. Item order does not matter. When multiple brands are provided, only results that
                 * belong to (at least) one of the provided list will be returned. Brands that contain a "," in
                 * their name should be put into quotes.
                 *
                 * Usage examples:
                 *
                 * brandSet=Foo
                 *
                 * brandSet=Foo,Bar
                 *
                 * brandSet="A,B,C Comma",Bar
                 */
                brandSet?: string[];
                /**
                 * A comma-separated list of connector types which could be used to restrict the result to
                 * Electric Vehicle Station supporting specific connector types. Item order does not matter. When
                 * multiple connector types are provided, only results that belong to (at least) one of the
                 * provided list will be returned.
                 *
                 * Available connector types are:
                 * * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a
                 * certain region. They are all AC single phase and the standard Voltage and standard Amperage.
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
                 * * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called
                 * Yazaki after the original manufacturer or SAE J1772 after the standard that first published
                 * it. Mostly used in combination with 120V single phase or up to 240V single phase
                 * infrastructure.
                 * * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard.
                 * Provided as a cable and plug attached to the charging point.
                 * * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as
                 * a socket set into the charging point.
                 * * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame
                 * after the original manufacturer. Mostly used in combination with up to 240V single phase or up
                 * to 420V three phase infrastructure.
                 * * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power
                 * Company and industrial partners. Because of this is is also known as the TEPCO's connector. It
                 * supports fast DC charging.
                 * * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309
                 * standard. It is sometime referred to as by some combination of the standard, the color and the
                 * fact that is a single phase connector. The connector usually has the "P+N+E, 6h"
                 * configuration.
                 * * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309
                 * standard.
                 * * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e.
                 * it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly
                 * limited to North America or the modified Type 2 (DC over Type 2) in Europe.
                 *
                 * Usage examples:
                 *
                 * connectorSet=IEC62196Type2CableAttached
                 * connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
                 */
                connectorSet?: ConnectorSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
                /**
                 * Opening hours for a POI (Points of Interest). The availability of opening hours will vary
                 * based on the data available. Possible values include: 'nextSevenDays'
                 */
                openingHours?: OpeningHours;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchNearbyOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Starting offset of returned results. Max value is 1900.
                 */
                ofs?: number;
                /**
                 * Comma separated string of country codes, e.g. FR,ES. This will limit the search to the
                 * specified countries
                 */
                countrySet?: string[];
                /**
                 * The radius in meters to for the results to be constrained to the defined area, Min value is 1,
                 * Max Value is 50000.
                 */
                radius?: number;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * A comma-separated list of brand names which could be used to restrict the result to specific
                 * brands. Item order does not matter. When multiple brands are provided, only results that
                 * belong to (at least) one of the provided list will be returned. Brands that contain a "," in
                 * their name should be put into quotes.
                 *
                 * Usage examples:
                 *
                 * brandSet=Foo
                 *
                 * brandSet=Foo,Bar
                 *
                 * brandSet="A,B,C Comma",Bar
                 */
                brandSet?: string[];
                /**
                 * A comma-separated list of connector types which could be used to restrict the result to
                 * Electric Vehicle Station supporting specific connector types. Item order does not matter. When
                 * multiple connector types are provided, only results that belong to (at least) one of the
                 * provided list will be returned.
                 *
                 * Available connector types are:
                 * * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a
                 * certain region. They are all AC single phase and the standard Voltage and standard Amperage.
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
                 * * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called
                 * Yazaki after the original manufacturer or SAE J1772 after the standard that first published
                 * it. Mostly used in combination with 120V single phase or up to 240V single phase
                 * infrastructure.
                 * * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard.
                 * Provided as a cable and plug attached to the charging point.
                 * * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as
                 * a socket set into the charging point.
                 * * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame
                 * after the original manufacturer. Mostly used in combination with up to 240V single phase or up
                 * to 420V three phase infrastructure.
                 * * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power
                 * Company and industrial partners. Because of this is is also known as the TEPCO's connector. It
                 * supports fast DC charging.
                 * * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309
                 * standard. It is sometime referred to as by some combination of the standard, the color and the
                 * fact that is a single phase connector. The connector usually has the "P+N+E, 6h"
                 * configuration.
                 * * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309
                 * standard.
                 * * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e.
                 * it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly
                 * limited to North America or the modified Type 2 (DC over Type 2) in Europe.
                 *
                 * Usage examples:
                 *
                 * connectorSet=IEC62196Type2CableAttached
                 * connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
                 */
                connectorSet?: ConnectorSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchPOICategoryOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and
                 * the search will enter predictive mode
                 */
                typeahead?: boolean;
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Comma separated string of country codes, e.g. FR,ES. This will limit the search to the
                 * specified countries
                 */
                countrySet?: string[];
                /**
                 * Latitude where results should be biased. E.g. 37.337
                 */
                lat?: number;
                /**
                 * Longitude where results should be biased. E.g. -121.89
                 */
                lon?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * Top left position of the bounding box. E.g. 37.553,-122.453
                 */
                topLeft?: string;
                /**
                 * Bottom right position of the bounding box. E.g. 37.553,-122.453
                 */
                btmRight?: string;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * A comma-separated list of brand names which could be used to restrict the result to specific
                 * brands. Item order does not matter. When multiple brands are provided, only results that
                 * belong to (at least) one of the provided list will be returned. Brands that contain a "," in
                 * their name should be put into quotes.
                 *
                 * Usage examples:
                 *
                 * brandSet=Foo
                 *
                 * brandSet=Foo,Bar
                 *
                 * brandSet="A,B,C Comma",Bar
                 */
                brandSet?: string[];
                /**
                 * A comma-separated list of connector types which could be used to restrict the result to
                 * Electric Vehicle Station supporting specific connector types. Item order does not matter. When
                 * multiple connector types are provided, only results that belong to (at least) one of the
                 * provided list will be returned.
                 *
                 * Available connector types are:
                 * * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a
                 * certain region. They are all AC single phase and the standard Voltage and standard Amperage.
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
                 * * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called
                 * Yazaki after the original manufacturer or SAE J1772 after the standard that first published
                 * it. Mostly used in combination with 120V single phase or up to 240V single phase
                 * infrastructure.
                 * * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard.
                 * Provided as a cable and plug attached to the charging point.
                 * * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as
                 * a socket set into the charging point.
                 * * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame
                 * after the original manufacturer. Mostly used in combination with up to 240V single phase or up
                 * to 420V three phase infrastructure.
                 * * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power
                 * Company and industrial partners. Because of this is is also known as the TEPCO's connector. It
                 * supports fast DC charging.
                 * * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309
                 * standard. It is sometime referred to as by some combination of the standard, the color and the
                 * fact that is a single phase connector. The connector usually has the "P+N+E, 6h"
                 * configuration.
                 * * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309
                 * standard.
                 * * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e.
                 * it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly
                 * limited to North America or the modified Type 2 (DC over Type 2) in Europe.
                 *
                 * Usage examples:
                 *
                 * connectorSet=IEC62196Type2CableAttached
                 * connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
                 */
                connectorSet?: ConnectorSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
                /**
                 * Opening hours for a POI (Points of Interest). The availability of opening hours will vary
                 * based on the data available. Possible values include: 'nextSevenDays'
                 */
                openingHours?: OpeningHours;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchAddressOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean. If the typeahead flag is set, the query will be interpreted as a partial input and
                 * the search will enter predictive mode
                 */
                typeahead?: boolean;
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Starting offset of the returned results within the full result set.
                 */
                ofs?: number;
                /**
                 * Comma separated string of country codes, e.g. FR,ES. This will limit the search to the
                 * specified countries
                 */
                countrySet?: string[];
                /**
                 * Latitude where results should be biased. E.g. 37.337
                 */
                lat?: number;
                /**
                 * Longitude where results should be biased. E.g. -121.89
                 */
                lon?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * Top left position of the bounding box. E.g. 37.553,-122.453
                 */
                topLeft?: string;
                /**
                 * Bottom right position of the bounding box. E.g. 37.553,-122.453
                 */
                btmRight?: string;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchAddressReverseOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Boolean. To enable return of the posted speedlimit
                 */
                returnSpeedLimit?: boolean;
                /**
                 * The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is
                 * North, 90 is East and so on, values range from -360 to 360. The precision can include upto one
                 * decimal place
                 */
                heading?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * If a number is sent in along with the request, the response may include the side of the street
                 * (Left/Right) and also an offset position for that number
                 */
                number?: string;
                /**
                 * Boolean. To enable return of the road use array for reversegeocodes at street level
                 */
                returnRoadUse?: boolean;
                /**
                 * To restrict reversegeocodes to a certain type of roaduse. The road use array for
                 * reversegeocodes can be one or more of LimitedAccess, Arterial, Terminal, Ramp, Rotary,
                 * LocalStreet
                 */
                roadUse?: string;
                /**
                 * Format of newlines in the formatted address.
                 *
                 * If true, the address will contain newlines.
                 * If false, newlines will be converted to commas.
                 */
                allowFreeformNewline?: boolean;
                /**
                 * Include information on the type of match the geocoder achieved in the response.
                 */
                returnMatchType?: boolean;
                /**
                 * Narrows the search for specified geography entity types, e.g. return only municipality. The
                 * resulting response will contain the geography ID as well as the entity type matched. If you
                 * provide more than one entity as a comma separated list, endpoint will return the 'smallest
                 * entity available'. Returned Geometry ID can be used to get the geometry of that geography via
                 * [Get Search Polygon](https://docs.microsoft.com/en-us/rest/api/maps/search/getsearchpolygon)
                 * API. Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
                 * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
                 * 'PostalCodeArea'
                 */
                entityType?: EntityType;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchAddressReverseCrossStreetOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The directional heading of the vehicle in degrees, for travel along a segment of roadway. 0 is
                 * North, 90 is East and so on, values range from -360 to 360. The precision can include upto one
                 * decimal place
                 */
                heading?: number;
                /**
                 * The radius in meters to for the results to be constrained to the defined area
                 */
                radius?: number;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchGetSearchAddressStructuredOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Maximum number of responses that will be returned
                 */
                limit?: number;
                /**
                 * Starting offset of the returned results within the full result set
                 */
                ofs?: number;
                /**
                 * The street number portion of an address
                 */
                streetNumber?: string;
                /**
                 * The street name portion of an address
                 */
                streetName?: string;
                /**
                 * The cross street name for the structured address
                 */
                crossStreet?: string;
                /**
                 * The municipality portion of an address
                 */
                municipality?: string;
                /**
                 * The municipality subdivision (sub/super city) for the structured address
                 */
                municipalitySubdivision?: string;
                /**
                 * The named area for the structured address
                 */
                countryTertiarySubdivision?: string;
                /**
                 * The county for the structured address
                 */
                countrySecondarySubdivision?: string;
                /**
                 * The country subdividion portion of an address
                 */
                countrySubdivision?: string;
                /**
                 * The postal code portion of an address
                 */
                postalCode?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchPostSearchInsideGeometryOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Maximum number of responses that will be returned. Default: 10, minimum: 1 and maximum: 100
                 */
                limit?: number;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * Indexes for which extended postal codes should be included in the results.
                 *
                 * Available indexes are:
                 *
                 * **Addr** = Address ranges
                 *
                 * **Geo** = Geographies
                 *
                 * **PAD** = Point Addresses
                 *
                 * **POI** = Points of Interest
                 *
                 * **Str** = Streets
                 *
                 * **XStr** = Cross Streets (intersections)
                 *
                 * Value should be a comma separated list of index types (in any order) or **None** for no
                 * indexes.
                 *
                 * By default extended postal codes are included for all indexes except Geo. Extended postal code
                 * lists for geographies can be quite long so they have to be explicitly requested when needed.
                 *
                 * Usage examples:
                 *
                 * extendedPostalCodesFor=POI
                 *
                 * extendedPostalCodesFor=PAD,Addr,POI
                 *
                 * extendedPostalCodesFor=None
                 *
                 * Extended postal code is returned as an **extendedPostalCode** property of an address.
                 * Availability is region-dependent.
                 */
                extendedPostalCodesFor?: string;
                /**
                 * A comma separated list of indexes which should be utilized for the search. Item order does not
                 * matter. Available indexes are: Addr = Address range interpolation, Geo = Geographies, PAD =
                 * Point Addresses, POI = Points of interest, Str = Streets, Xstr = Cross Streets (intersections)
                 */
                idxSet?: SearchIndexSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
                /**
                 * Opening hours for a POI (Points of Interest). The availability of opening hours will vary
                 * based on the data available. Possible values include: 'nextSevenDays'
                 */
                openingHours?: OpeningHours;
            }
            /**
             * Optional Parameters.
             */
            export interface SearchPostSearchAlongRouteOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Maximum number of responses that will be returned. Default value is 10. Max value is 20
                 */
                limit?: number;
                /**
                 * A comma-separated list of brand names which could be used to restrict the result to specific
                 * brands. Item order does not matter. When multiple brands are provided, only results that
                 * belong to (at least) one of the provided list will be returned. Brands that contain a "," in
                 * their name should be put into quotes.
                 *
                 * Usage examples:
                 *
                 * brandSet=Foo
                 *
                 * brandSet=Foo,Bar
                 *
                 * brandSet="A,B,C Comma",Bar
                 */
                brandSet?: string[];
                /**
                 * A comma-separated list of connector types which could be used to restrict the result to
                 * Electric Vehicle Station supporting specific connector types. Item order does not matter. When
                 * multiple connector types are provided, only results that belong to (at least) one of the
                 * provided list will be returned.
                 *
                 * Available connector types are:
                 * * `StandardHouseholdCountrySpecific` - These are the standard household connectors for a
                 * certain region. They are all AC single phase and the standard Voltage and standard Amperage.
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets).
                 * * `IEC62196Type1` - Type 1 connector as defined in the IEC 62196-2 standard. Also called
                 * Yazaki after the original manufacturer or SAE J1772 after the standard that first published
                 * it. Mostly used in combination with 120V single phase or up to 240V single phase
                 * infrastructure.
                 * * `IEC62196Type1CCS` - Type 1 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 1 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type2CableAttached` - Type 2 connector as defined in the IEC 62196-2 standard.
                 * Provided as a cable and plug attached to the charging point.
                 * * `IEC62196Type2Outlet` - Type 2 connector as defined in the IEC 62196-2 standard. Provided as
                 * a socket set into the charging point.
                 * * `IEC62196Type2CCS` - Type 2 based combo connector as defined in the IEC 62196-3 standard.
                 * The connector is based on the Type 2 connector – as defined in the IEC 62196-2 standard – with
                 * two additional direct current (DC) contacts to allow DC fast charging.
                 * * `IEC62196Type3` - Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame
                 * after the original manufacturer. Mostly used in combination with up to 240V single phase or up
                 * to 420V three phase infrastructure.
                 * * `Chademo` - CHAdeMO connector named after an association formed by the Tokyo Electric Power
                 * Company and industrial partners. Because of this is is also known as the TEPCO's connector. It
                 * supports fast DC charging.
                 * * `IEC60309AC1PhaseBlue` - Industrial Blue connector is a connector defined in the IEC 60309
                 * standard. It is sometime referred to as by some combination of the standard, the color and the
                 * fact that is a single phase connector. The connector usually has the "P+N+E, 6h"
                 * configuration.
                 * * `IEC60309DCWhite` - Industrial White connector is a DC connector defined in the IEC 60309
                 * standard.
                 * * `Tesla` - The Tesla connector is the regionally specific Tesla Supercharger connector. I.e.
                 * it refers to either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly
                 * limited to North America or the modified Type 2 (DC over Type 2) in Europe.
                 *
                 * Usage examples:
                 *
                 * connectorSet=IEC62196Type2CableAttached
                 * connectorSet=IEC62196Type2Outlet,IEC62196Type2CableAttached
                 */
                connectorSet?: ConnectorSet[];
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
                /**
                 * Opening hours for a POI (Points of Interest). The availability of opening hours will vary
                 * based on the data available. Possible values include: 'nextSevenDays'
                 */
                openingHours?: OpeningHours;
            }
            /**
             * Optional Parameters.
             */
            export interface RoutePostRouteMatrixPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean to indicate whether to execute the request synchronously. If set to true, user will
                 * get a 200 response if the request is finished under 120 seconds. Otherwise, user will get a
                 * 202 response right away. Please refer to the API description for more details on 202 response.
                 */
                waitForResults?: boolean;
                /**
                 * Specifies whether to return additional travel times using different types of traffic
                 * information (none, historic, live) as well as the default best-estimate travel time. Possible
                 * values include: 'none', 'all'
                 */
                computeTravelTimeFor?: ComputeTravelTimeFor;
                /**
                 * Specifies which of the section types is reported in the route response. <br><br>For example if
                 * sectionType = pedestrian the sections which are suited for pedestrians only are returned.
                 * Multiple types can be used. The default sectionType refers to the travelMode input. By default
                 * travelMode is set to car. Possible values include: 'carTrain', 'country', 'ferry', 'motorway',
                 * 'pedestrian', 'tollRoad', 'tollVignette', 'traffic', 'travelMode', 'tunnel'
                 */
                sectionType?: SectionType;
                /**
                 * The date and time of arrival at the destination point. It must be specified as a dateTime.
                 * When a time zone offset is not specified it will be assumed to be that of the destination
                 * point. The arriveAt value must be in the future. The arriveAt parameter cannot be used in
                 * conjunction with departAt, minDeviationDistance or minDeviationTime.
                 */
                arriveAt?: Date;
                /**
                 * The date and time of departure from the origin point. Departure times apart from now must be
                 * specified as a dateTime. When a time zone offset is not specified, it will be assumed to be
                 * that of the origin point. The departAt value must be in the future in the date-time format
                 * (1996-12-19T16:39:57-08:00).
                 */
                departAt?: Date;
                /**
                 * Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are
                 * not considered.
                 */
                vehicleAxleWeight?: number;
                /**
                 * Length of the vehicle in meters. A value of 0 means that length restrictions are not
                 * considered.
                 */
                vehicleLength?: number;
                /**
                 * Height of the vehicle in meters. A value of 0 means that height restrictions are not
                 * considered.
                 */
                vehicleHeight?: number;
                /**
                 * Width of the vehicle in meters. A value of 0 means that width restrictions are not considered.
                 */
                vehicleWidth?: number;
                /**
                 * Maximum speed of the vehicle in km/hour. A value of 0 means that an appropriate value for the
                 * vehicle will be determined and applied during route planning. A non-zero value may be
                 * overridden during route planning.
                 */
                vehicleMaxSpeed?: number;
                /**
                 * Weight of the vehicle in kilograms.
                 */
                vehicleWeight?: number;
                /**
                 * Level of turns for thrilling route. This parameter can only be used in conjunction with
                 * routeType=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                windingness?: Windingness;
                /**
                 * Degree of hilliness for thrilling route. This parameter can only be used in conjunction with
                 * `routeType`=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                hilliness?: Hilliness;
                /**
                 * The mode of travel for the requested route. Note that the requested travelMode may not be
                 * available for the entire route. Where the requested travelMode is not available for a
                 * particular section, the travelMode element of the response for that section will be other.
                 * Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction
                 * data is not available in all areas. In **calculateReachableRange** requests, the values
                 * bicycle and pedestrian must not be used. Possible values include: 'car', 'truck', 'taxi',
                 * 'bus', 'van', 'motorcycle', 'bicycle', 'pedestrian'
                 */
                travelMode?: TravelMode;
                /**
                 * Specifies something that the route calculation should try to avoid when determining the route.
                 * Can be specified multiple times in one request, for example,
                 * '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In calculateReachableRange requests, the
                 * value alreadyUsedRoads must not be used. Possible values include: 'tollRoads', 'motorways',
                 * 'ferries', 'unpavedRoads', 'carpools', 'alreadyUsedRoads', 'borderCrossings'
                 */
                avoid?: Avoid;
                /**
                 * Possible values:
                 * * true - Do consider all available traffic information during routing
                 * * false - Ignore current traffic data during routing. Note that although the current traffic
                 * data is ignored
                 * during routing, the effect of historic traffic on effective road speeds is still incorporated.
                 */
                traffic?: boolean;
                /**
                 * The type of route requested. Possible values include: 'fastest', 'shortest', 'eco',
                 * 'thrilling'
                 */
                routeType?: RouteType;
                /**
                 * Types of cargo that may be classified as hazardous materials and restricted from some roads.
                 * Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic
                 * classifications for use in other countries. Values beginning with USHazmat are for US routing
                 * while otherHazmat should be used for all other countries. vehicleLoadType can be specified
                 * multiple times. This parameter is currently only considered for travelMode=truck. Possible
                 * values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
                 * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
                 * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
                 */
                vehicleLoadType?: VehicleLoadType;
            }
            /**
             * Optional Parameters.
             */
            export interface RouteGetRouteDirectionsOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Number of desired alternative routes to be calculated. Default: 0, minimum: 0 and maximum: 5
                 */
                maxAlternatives?: number;
                /**
                 * Controls the optimality, with respect to the given planning criteria, of the calculated
                 * alternatives compared to the reference route. Possible values include: 'anyRoute',
                 * 'betterRoute'
                 */
                alternativeType?: AlternativeRouteType;
                /**
                 * All alternative routes returned will follow the reference route (see section POST Requests)
                 * from the origin point of the calculateRoute request for at least this number of meters. Can
                 * only be used when reconstructing a route. The minDeviationDistance parameter cannot be used in
                 * conjunction with arriveAt
                 */
                minDeviationDistance?: number;
                /**
                 * The date and time of arrival at the destination point. It must be specified as a dateTime.
                 * When a time zone offset is not specified it will be assumed to be that of the destination
                 * point. The arriveAt value must be in the future. The arriveAt parameter cannot be used in
                 * conjunction with departAt, minDeviationDistance or minDeviationTime.
                 */
                arriveAt?: Date;
                /**
                 * The date and time of departure from the origin point. Departure times apart from now must be
                 * specified as a dateTime. When a time zone offset is not specified, it will be assumed to be
                 * that of the origin point. The departAt value must be in the future in the date-time format
                 * (1996-12-19T16:39:57-08:00).
                 */
                departAt?: Date;
                /**
                 * All alternative routes returned will follow the reference route (see section POST Requests)
                 * from the origin point of the calculateRoute request for at least this number of seconds. Can
                 * only be used when reconstructing a route. The minDeviationTime parameter cannot be used in
                 * conjunction with arriveAt
                 */
                minDeviationTime?: number;
                /**
                 * If specified, guidance instructions will be returned. Note that the instructionsType parameter
                 * cannot be used in conjunction with routeRepresentation=none. Possible values include: 'coded',
                 * 'text', 'tagged'
                 */
                instructionsType?: RouteInstructionsType;
                /**
                 * The language parameter determines the language of the guidance messages. It does not affect
                 * proper nouns (the names of streets, plazas, etc.) It has no effect when
                 * instructionsType=coded. Allowed values are (a subset of) the IETF language tags described
                 */
                language?: string;
                /**
                 * Re-order the route waypoints to reduce the route length. Yields best results when used in
                 * conjunction with routeType _shortest_. Possible values are true or false. True computes a
                 * better order if possible, but is not allowed to be used in conjunction with maxAlternatives
                 * value greater than 0 or in conjunction with circle waypoints. False will use the locations  in
                 * the given order and not allowed to be used in conjunction with routeRepresentation
                 * _none_.
                 */
                computeBestOrder?: boolean;
                /**
                 * Specifies the representation of the set of routes provided as response. This parameter value
                 * can only be used in conjunction with computeBestOrder=true. Possible values include:
                 * 'polyline', 'summaryOnly', 'none'
                 */
                routeRepresentation?: RouteRepresentation;
                /**
                 * Specifies whether to return additional travel times using different types of traffic
                 * information (none, historic, live) as well as the default best-estimate travel time. Possible
                 * values include: 'none', 'all'
                 */
                computeTravelTimeFor?: ComputeTravelTimeFor;
                /**
                 * The directional heading of the vehicle in degrees starting at true North and continuing in
                 * clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270
                 * degrees. Possible values 0-359
                 */
                vehicleHeading?: number;
                /**
                 * Specifies which data should be reported for diagnosis purposes. The only possible value is
                 * _effectiveSettings_. Reports the effective parameters or data used when calling the API. In
                 * the case of defaulted parameters the default will be reflected where the parameter was not
                 * specified by the caller.
                 */
                report?: string;
                /**
                 * Specifies which of the section types is reported in the route response. <br><br>For example if
                 * sectionType = pedestrian the sections which are suited for pedestrians only are returned.
                 * Multiple types can be used. The default sectionType refers to the travelMode input. By default
                 * travelMode is set to car. Possible values include: 'carTrain', 'country', 'ferry', 'motorway',
                 * 'pedestrian', 'tollRoad', 'tollVignette', 'traffic', 'travelMode', 'tunnel'
                 */
                sectionType?: SectionType;
                /**
                 * Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are
                 * not considered.
                 */
                vehicleAxleWeight?: number;
                /**
                 * Width of the vehicle in meters. A value of 0 means that width restrictions are not considered.
                 */
                vehicleWidth?: number;
                /**
                 * Height of the vehicle in meters. A value of 0 means that height restrictions are not
                 * considered.
                 */
                vehicleHeight?: number;
                /**
                 * Length of the vehicle in meters. A value of 0 means that length restrictions are not
                 * considered.
                 */
                vehicleLength?: number;
                /**
                 * Maximum speed of the vehicle in km/hour. A value of 0 means that an appropriate value for the
                 * vehicle will be determined and applied during route planning. A non-zero value may be
                 * overridden during route planning.
                 */
                vehicleMaxSpeed?: number;
                /**
                 * Weight of the vehicle in kilograms.
                 *
                 * * It is mandatory if any of the *Efficiency parameters are set.
                 *
                 * * It must be strictly positive when used in the context of the Consumption Model. Weight
                 * restrictions are considered.
                 *
                 * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is
                 * non-zero, then weight restrictions are considered.
                 *
                 * * In all other cases, this parameter is ignored.
                 *
                 * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
                 */
                vehicleWeight?: number;
                /**
                 * Vehicle is used for commercial purposes and thus may not be allowed to drive  on some roads.
                 */
                vehicleCommercial?: boolean;
                /**
                 * Level of turns for thrilling route. This parameter can only be used in conjunction with
                 * routeType=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                windingness?: Windingness;
                /**
                 * Degree of hilliness for thrilling route. This parameter can only be used in conjunction with
                 * `routeType`=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                hilliness?: Hilliness;
                /**
                 * The mode of travel for the requested route. Note that the requested travelMode may not be
                 * available for the entire route. Where the requested travelMode is not available for a
                 * particular section, the travelMode element of the response for that section will be other.
                 * Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction
                 * data is not available in all areas. In **calculateReachableRange** requests, the values
                 * bicycle and pedestrian must not be used. Possible values include: 'car', 'truck', 'taxi',
                 * 'bus', 'van', 'motorcycle', 'bicycle', 'pedestrian'
                 */
                travelMode?: TravelMode;
                /**
                 * Specifies something that the route calculation should try to avoid when determining the route.
                 * Can be specified multiple times in one request, for example,
                 * '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In calculateReachableRange requests, the
                 * value alreadyUsedRoads must not be used. Possible values include: 'tollRoads', 'motorways',
                 * 'ferries', 'unpavedRoads', 'carpools', 'alreadyUsedRoads', 'borderCrossings'
                 */
                avoid?: Avoid;
                /**
                 * Possible values:
                 * * true - Do consider all available traffic information during routing
                 * * false - Ignore current traffic data during routing. Note that although the current traffic
                 * data is ignored
                 * during routing, the effect of historic traffic on effective road speeds is still incorporated.
                 */
                traffic?: boolean;
                /**
                 * The type of route requested. Possible values include: 'fastest', 'shortest', 'eco',
                 * 'thrilling'
                 */
                routeType?: RouteType;
                /**
                 * Types of cargo that may be classified as hazardous materials and restricted from some roads.
                 * Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic
                 * classifications for use in other countries. Values beginning with USHazmat are for US routing
                 * while otherHazmat should be used for all other countries. vehicleLoadType can be specified
                 * multiple times. This parameter is currently only considered for travelMode=truck. Possible
                 * values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
                 * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
                 * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
                 */
                vehicleLoadType?: VehicleLoadType;
                /**
                 * Engine type of the vehicle. When a detailed Consumption Model is specified, it must be
                 * consistent with the value of **vehicleEngineType**. Possible values include: 'combustion',
                 * 'electric'
                 */
                vehicleEngineType?: VehicleEngineType;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list
                 * defines points on a consumption curve. Consumption rates for speeds not in the list are found
                 * as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller speed.
                 *
                 * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
                 *
                 * Sensible Values : 50,6.3:130,11.5
                 *
                 * **Note** : This parameter is required for **The Combustion Consumption Model**.
                 */
                constantSpeedConsumptionInLitersPerHundredkm?: number;
                /**
                 * Specifies the current supply of fuel in liters.
                 *
                 * Sensible Values : 55
                 */
                currentFuelInLiters?: number;
                /**
                 * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in
                 * liters per hour.
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 0.2
                 */
                auxiliaryPowerInLitersPerHour?: number;
                /**
                 * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is
                 * used in conjunction with the ***Efficiency** parameters for conversions between saved or
                 * consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l
                 * for Diesel fuel.
                 *
                 * This parameter is required if any ***Efficiency** parameter is set.
                 *
                 * Sensible Values : 34.2
                 */
                fuelEnergyDensityInMJoulesPerLiter?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when
                 * the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **decelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
                 */
                accelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the
                 * vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is
                 * obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **accelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
                 */
                decelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when
                 * the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **downhillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
                 */
                uphillEfficiency?: number;
                /**
                 * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the
                 * vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_
                 * is obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **uphillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
                 */
                downhillEfficiency?: number;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a
                 * consumption curve. Consumption rates for speeds not in the list are found as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller  speed.
                 *
                 * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and
                 * 100000.0.
                 *
                 * Sensible Values : 50,8.2:130,21.3
                 *
                 * This parameter is required for **Electric consumption model**.
                 */
                constantSpeedConsumptionInkWhPerHundredkm?: string;
                /**
                 * Specifies the current electric energy supply in kilowatt hours (kWh).
                 *
                 * This parameter co-exists with **maxChargeInkWh** parameter.
                 *
                 * The range of values allowed are 0.0 to **maxChargeInkWh**.
                 *
                 * Sensible Values : 43
                 */
                currentChargeInkWh?: string;
                /**
                 * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the
                 * vehicle's battery.
                 *
                 * This parameter co-exists with **currentChargeInkWh** parameter.
                 *
                 * Minimum value has to be greater than or equal to **currentChargeInkWh**.
                 *
                 * Sensible Values : 85
                 */
                maxChargeInkWh?: string;
                /**
                 * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 1.7
                 */
                auxiliaryPowerInkW?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RoutePostRouteDirectionsOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Number of desired alternative routes to be calculated. Default: 0, minimum: 0 and maximum: 5
                 */
                maxAlternatives?: number;
                /**
                 * Controls the optimality, with respect to the given planning criteria, of the calculated
                 * alternatives compared to the reference route. Possible values include: 'anyRoute',
                 * 'betterRoute'
                 */
                alternativeType?: AlternativeRouteType;
                /**
                 * All alternative routes returned will follow the reference route (see section POST Requests)
                 * from the origin point of the calculateRoute request for at least this number of meters. Can
                 * only be used when reconstructing a route. The minDeviationDistance parameter cannot be used in
                 * conjunction with arriveAt
                 */
                minDeviationDistance?: number;
                /**
                 * All alternative routes returned will follow the reference route (see section POST Requests)
                 * from the origin point of the calculateRoute request for at least this number of seconds. Can
                 * only be used when reconstructing a route. The minDeviationTime parameter cannot be used in
                 * conjunction with arriveAt
                 */
                minDeviationTime?: number;
                /**
                 * If specified, guidance instructions will be returned. Note that the instructionsType parameter
                 * cannot be used in conjunction with routeRepresentation=none. Possible values include: 'coded',
                 * 'text', 'tagged'
                 */
                instructionsType?: RouteInstructionsType;
                /**
                 * The language parameter determines the language of the guidance messages. It does not affect
                 * proper nouns (the names of streets, plazas, etc.) It has no effect when
                 * instructionsType=coded. Allowed values are (a subset of) the IETF language tags described
                 */
                language?: string;
                /**
                 * Re-order the route waypoints to reduce the route length. Yields best results when used in
                 * conjunction with routeType _shortest_. Possible values are true or false. True computes a
                 * better order if possible, but is not allowed to be used in conjunction with maxAlternatives
                 * value greater than 0 or in conjunction with circle waypoints. False will use the locations  in
                 * the given order and not allowed to be used in conjunction with routeRepresentation
                 * _none_.
                 */
                computeBestOrder?: boolean;
                /**
                 * Specifies the representation of the set of routes provided as response. This parameter value
                 * can only be used in conjunction with computeBestOrder=true. Possible values include:
                 * 'polyline', 'summaryOnly', 'none'
                 */
                routeRepresentation?: RouteRepresentation;
                /**
                 * Specifies whether to return additional travel times using different types of traffic
                 * information (none, historic, live) as well as the default best-estimate travel time. Possible
                 * values include: 'none', 'all'
                 */
                computeTravelTimeFor?: ComputeTravelTimeFor;
                /**
                 * The directional heading of the vehicle in degrees starting at true North and continuing in
                 * clockwise direction. North is 0 degrees, east is 90 degrees, south is 180 degrees, west is 270
                 * degrees. Possible values 0-359
                 */
                vehicleHeading?: number;
                /**
                 * Specifies which data should be reported for diagnosis purposes. The only possible value is
                 * _effectiveSettings_. Reports the effective parameters or data used when calling the API. In
                 * the case of defaulted parameters the default will be reflected where the parameter was not
                 * specified by the caller.
                 */
                report?: string;
                /**
                 * Specifies which of the section types is reported in the route response. <br><br>For example if
                 * sectionType = pedestrian the sections which are suited for pedestrians only are returned.
                 * Multiple types can be used. The default sectionType refers to the travelMode input. By default
                 * travelMode is set to car. Possible values include: 'carTrain', 'country', 'ferry', 'motorway',
                 * 'pedestrian', 'tollRoad', 'tollVignette', 'traffic', 'travelMode', 'tunnel'
                 */
                sectionType?: SectionType;
                /**
                 * The date and time of arrival at the destination point. It must be specified as a dateTime.
                 * When a time zone offset is not specified it will be assumed to be that of the destination
                 * point. The arriveAt value must be in the future. The arriveAt parameter cannot be used in
                 * conjunction with departAt, minDeviationDistance or minDeviationTime.
                 */
                arriveAt?: Date;
                /**
                 * The date and time of departure from the origin point. Departure times apart from now must be
                 * specified as a dateTime. When a time zone offset is not specified, it will be assumed to be
                 * that of the origin point. The departAt value must be in the future in the date-time format
                 * (1996-12-19T16:39:57-08:00).
                 */
                departAt?: Date;
                /**
                 * Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are
                 * not considered.
                 */
                vehicleAxleWeight?: number;
                /**
                 * Length of the vehicle in meters. A value of 0 means that length restrictions are not
                 * considered.
                 */
                vehicleLength?: number;
                /**
                 * Height of the vehicle in meters. A value of 0 means that height restrictions are not
                 * considered.
                 */
                vehicleHeight?: number;
                /**
                 * Width of the vehicle in meters. A value of 0 means that width restrictions are not considered.
                 */
                vehicleWidth?: number;
                /**
                 * Maximum speed of the vehicle in km/hour. A value of 0 means that an appropriate value for the
                 * vehicle will be determined and applied during route planning. A non-zero value may be
                 * overridden during route planning.
                 */
                vehicleMaxSpeed?: number;
                /**
                 * Weight of the vehicle in kilograms.
                 *
                 * * It is mandatory if any of the *Efficiency parameters are set.
                 *
                 * * It must be strictly positive when used in the context of the Consumption Model. Weight
                 * restrictions are considered.
                 *
                 * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is
                 * non-zero, then weight restrictions are considered.
                 *
                 * * In all other cases, this parameter is ignored.
                 *
                 * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
                 */
                vehicleWeight?: number;
                /**
                 * Vehicle is used for commercial purposes and thus may not be allowed to drive  on some roads.
                 */
                vehicleCommercial?: boolean;
                /**
                 * Level of turns for thrilling route. This parameter can only be used in conjunction with
                 * routeType=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                windingness?: Windingness;
                /**
                 * Degree of hilliness for thrilling route. This parameter can only be used in conjunction with
                 * `routeType`=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                hilliness?: Hilliness;
                /**
                 * The mode of travel for the requested route. Note that the requested travelMode may not be
                 * available for the entire route. Where the requested travelMode is not available for a
                 * particular section, the travelMode element of the response for that section will be other.
                 * Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction
                 * data is not available in all areas. In **calculateReachableRange** requests, the values
                 * bicycle and pedestrian must not be used. Possible values include: 'car', 'truck', 'taxi',
                 * 'bus', 'van', 'motorcycle', 'bicycle', 'pedestrian'
                 */
                travelMode?: TravelMode;
                /**
                 * Specifies something that the route calculation should try to avoid when determining the route.
                 * Can be specified multiple times in one request, for example,
                 * '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In calculateReachableRange requests, the
                 * value alreadyUsedRoads must not be used. Possible values include: 'tollRoads', 'motorways',
                 * 'ferries', 'unpavedRoads', 'carpools', 'alreadyUsedRoads', 'borderCrossings'
                 */
                avoid?: Avoid;
                /**
                 * Possible values:
                 * * true - Do consider all available traffic information during routing
                 * * false - Ignore current traffic data during routing. Note that although the current traffic
                 * data is ignored
                 * during routing, the effect of historic traffic on effective road speeds is still incorporated.
                 */
                traffic?: boolean;
                /**
                 * The type of route requested. Possible values include: 'fastest', 'shortest', 'eco',
                 * 'thrilling'
                 */
                routeType?: RouteType;
                /**
                 * Types of cargo that may be classified as hazardous materials and restricted from some roads.
                 * Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic
                 * classifications for use in other countries. Values beginning with USHazmat are for US routing
                 * while otherHazmat should be used for all other countries. vehicleLoadType can be specified
                 * multiple times. This parameter is currently only considered for travelMode=truck. Possible
                 * values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
                 * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
                 * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
                 */
                vehicleLoadType?: VehicleLoadType;
                /**
                 * Engine type of the vehicle. When a detailed Consumption Model is specified, it must be
                 * consistent with the value of **vehicleEngineType**. Possible values include: 'combustion',
                 * 'electric'
                 */
                vehicleEngineType?: VehicleEngineType;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list
                 * defines points on a consumption curve. Consumption rates for speeds not in the list are found
                 * as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller speed.
                 *
                 * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
                 *
                 * Sensible Values : 50,6.3:130,11.5
                 *
                 * **Note** : This parameter is required for **The Combustion Consumption Model**.
                 */
                constantSpeedConsumptionInLitersPerHundredkm?: number;
                /**
                 * Specifies the current supply of fuel in liters.
                 *
                 * Sensible Values : 55
                 */
                currentFuelInLiters?: number;
                /**
                 * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in
                 * liters per hour.
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 0.2
                 */
                auxiliaryPowerInLitersPerHour?: number;
                /**
                 * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is
                 * used in conjunction with the ***Efficiency** parameters for conversions between saved or
                 * consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l
                 * for Diesel fuel.
                 *
                 * This parameter is required if any ***Efficiency** parameter is set.
                 *
                 * Sensible Values : 34.2
                 */
                fuelEnergyDensityInMJoulesPerLiter?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when
                 * the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **decelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
                 */
                accelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the
                 * vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is
                 * obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **accelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
                 */
                decelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when
                 * the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **downhillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
                 */
                uphillEfficiency?: number;
                /**
                 * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the
                 * vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_
                 * is obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **uphillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
                 */
                downhillEfficiency?: number;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a
                 * consumption curve. Consumption rates for speeds not in the list are found as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller  speed.
                 *
                 * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and
                 * 100000.0.
                 *
                 * Sensible Values : 50,8.2:130,21.3
                 *
                 * This parameter is required for **Electric consumption model**.
                 */
                constantSpeedConsumptionInkWhPerHundredkm?: string;
                /**
                 * Specifies the current electric energy supply in kilowatt hours (kWh).
                 *
                 * This parameter co-exists with **maxChargeInkWh** parameter.
                 *
                 * The range of values allowed are 0.0 to **maxChargeInkWh**.
                 *
                 * Sensible Values : 43
                 */
                currentChargeInkWh?: string;
                /**
                 * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the
                 * vehicle's battery.
                 *
                 * This parameter co-exists with **currentChargeInkWh** parameter.
                 *
                 * Minimum value has to be greater than or equal to **currentChargeInkWh**.
                 *
                 * Sensible Values : 85
                 */
                maxChargeInkWh?: string;
                /**
                 * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 1.7
                 */
                auxiliaryPowerInkW?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RouteGetRouteRangeOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Fuel budget in liters that determines maximal range which can be travelled using the specified
                 * Combustion Consumption Model. This parameter is required if vehicleEngineType is Combustion
                 * and timeBudgetInSec is not used. Either fuelBudgetInLiters, energyBudgetInkWh or
                 * timeBudgetInSec must be provided.
                 */
                fuelBudgetInLiters?: number;
                /**
                 * Electric energy budget in kilowatt hours (kWh) that determines maximal range which can be
                 * travelled using the specified Electric Consumption Model. This parameter is required if
                 * vehicleEngineType is Electric and timeBudgetInSec is not used. Either fuelBudgetInLiters,
                 * energyBudgetInkWh or timeBudgetInSec must be provided.
                 */
                energyBudgetInkWh?: number;
                /**
                 * Time budget in seconds that determines maximal range which can be travelled using driving
                 * time. The consumption parameters will only affect eco-routes and thereby indirectly the
                 * driving time. This parameter is required if fuelBudgetInLiters or energyBudgetInkWh are not
                 * used. Either fuelBudgetInLiters, energyBudgetInkWh or timeBudgetInSec must be provided.
                 */
                timeBudgetInSec?: number;
                /**
                 * The date and time of departure from the origin point. Departure times apart from now must be
                 * specified as a dateTime. When a time zone offset is not specified, it will be assumed to be
                 * that of the origin point. The departAt value must be in the future in the date-time format
                 * (1996-12-19T16:39:57-08:00).
                 */
                departAt?: Date;
                /**
                 * The type of route requested. Possible values include: 'fastest', 'shortest', 'eco',
                 * 'thrilling'
                 */
                routeType?: RouteType;
                /**
                 * Possible values:
                 * * true - Do consider all available traffic information during routing
                 * * false - Ignore current traffic data during routing. Note that although the current traffic
                 * data is ignored
                 * during routing, the effect of historic traffic on effective road speeds is still incorporated.
                 */
                traffic?: boolean;
                /**
                 * Specifies something that the route calculation should try to avoid when determining the route.
                 * Can be specified multiple times in one request, for example,
                 * '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In calculateReachableRange requests, the
                 * value alreadyUsedRoads must not be used. Possible values include: 'tollRoads', 'motorways',
                 * 'ferries', 'unpavedRoads', 'carpools', 'alreadyUsedRoads', 'borderCrossings'
                 */
                avoid?: Avoid;
                /**
                 * The mode of travel for the requested route. Note that the requested travelMode may not be
                 * available for the entire route. Where the requested travelMode is not available for a
                 * particular section, the travelMode element of the response for that section will be other.
                 * Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction
                 * data is not available in all areas. In **calculateReachableRange** requests, the values
                 * bicycle and pedestrian must not be used. Possible values include: 'car', 'truck', 'taxi',
                 * 'bus', 'van', 'motorcycle', 'bicycle', 'pedestrian'
                 */
                travelMode?: TravelMode;
                /**
                 * Degree of hilliness for thrilling route. This parameter can only be used in conjunction with
                 * `routeType`=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                hilliness?: Hilliness;
                /**
                 * Level of turns for thrilling route. This parameter can only be used in conjunction with
                 * routeType=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                windingness?: Windingness;
                /**
                 * Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are
                 * not considered.
                 */
                vehicleAxleWeight?: number;
                /**
                 * Width of the vehicle in meters. A value of 0 means that width restrictions are not considered.
                 */
                vehicleWidth?: number;
                /**
                 * Height of the vehicle in meters. A value of 0 means that height restrictions are not
                 * considered.
                 */
                vehicleHeight?: number;
                /**
                 * Length of the vehicle in meters. A value of 0 means that length restrictions are not
                 * considered.
                 */
                vehicleLength?: number;
                /**
                 * Maximum speed of the vehicle in km/hour. A value of 0 means that an appropriate value for the
                 * vehicle will be determined and applied during route planning. A non-zero value may be
                 * overridden during route planning.
                 */
                vehicleMaxSpeed?: number;
                /**
                 * Weight of the vehicle in kilograms.
                 *
                 * * It is mandatory if any of the *Efficiency parameters are set.
                 *
                 * * It must be strictly positive when used in the context of the Consumption Model. Weight
                 * restrictions are considered.
                 *
                 * * If no detailed **Consumption Model** is specified and the value of **vehicleWeight** is
                 * non-zero, then weight restrictions are considered.
                 *
                 * * In all other cases, this parameter is ignored.
                 *
                 * Sensible Values : for **Combustion Model** : 1600, for **Electric Model** : 1900
                 */
                vehicleWeight?: number;
                /**
                 * Vehicle is used for commercial purposes and thus may not be allowed to drive  on some roads.
                 */
                vehicleCommercial?: boolean;
                /**
                 * Types of cargo that may be classified as hazardous materials and restricted from some roads.
                 * Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic
                 * classifications for use in other countries. Values beginning with USHazmat are for US routing
                 * while otherHazmat should be used for all other countries. vehicleLoadType can be specified
                 * multiple times. This parameter is currently only considered for travelMode=truck. Possible
                 * values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
                 * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
                 * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
                 */
                vehicleLoadType?: VehicleLoadType;
                /**
                 * Engine type of the vehicle. When a detailed Consumption Model is specified, it must be
                 * consistent with the value of **vehicleEngineType**. Possible values include: 'combustion',
                 * 'electric'
                 */
                vehicleEngineType?: VehicleEngineType;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of colon-delimited speed & consumption-rate pairs. The list
                 * defines points on a consumption curve. Consumption rates for speeds not in the list are found
                 * as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller speed.
                 *
                 * The valid range for the consumption values(expressed in l/100km) is between 0.01 and 100000.0.
                 *
                 * Sensible Values : 50,6.3:130,11.5
                 *
                 * **Note** : This parameter is required for **The Combustion Consumption Model**.
                 */
                constantSpeedConsumptionInLitersPerHundredkm?: number;
                /**
                 * Specifies the current supply of fuel in liters.
                 *
                 * Sensible Values : 55
                 */
                currentFuelInLiters?: number;
                /**
                 * Specifies the amount of fuel consumed for sustaining auxiliary systems of the vehicle, in
                 * liters per hour.
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 0.2
                 */
                auxiliaryPowerInLitersPerHour?: number;
                /**
                 * Specifies the amount of chemical energy stored in one liter of fuel in megajoules (MJ). It is
                 * used in conjunction with the ***Efficiency** parameters for conversions between saved or
                 * consumed energy and fuel. For example, energy density is 34.2 MJ/l for gasoline, and 35.8 MJ/l
                 * for Diesel fuel.
                 *
                 * This parameter is required if any ***Efficiency** parameter is set.
                 *
                 * Sensible Values : 34.2
                 */
                fuelEnergyDensityInMJoulesPerLiter?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to kinetic energy when
                 * the vehicle accelerates _(i.e. KineticEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **decelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**decelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.33, for **Electric Model** : 0.66
                 */
                accelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting kinetic energy to saved (not consumed) fuel when the
                 * vehicle decelerates _(i.e. ChemicalEnergySaved/KineticEnergyLost). ChemicalEnergySaved_ is
                 * obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **accelerationEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**accelerationEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.83, for **Electric Model** : 0.91
                 */
                decelerationEfficiency?: number;
                /**
                 * Specifies the efficiency of converting chemical energy stored in fuel to potential energy when
                 * the vehicle gains elevation _(i.e. PotentialEnergyGained/ChemicalEnergyConsumed).
                 * ChemicalEnergyConsumed_ is obtained by converting consumed fuel to chemical energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **downhillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**downhillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.27, for **Electric Model** : 0.74
                 */
                uphillEfficiency?: number;
                /**
                 * Specifies the efficiency of converting potential energy to saved (not consumed) fuel when the
                 * vehicle loses elevation _(i.e. ChemicalEnergySaved/PotentialEnergyLost). ChemicalEnergySaved_
                 * is obtained by converting saved (not consumed) fuel to energy using
                 * **fuelEnergyDensityInMJoulesPerLiter**.
                 *
                 * Must be paired with **uphillEfficiency**.
                 *
                 * The range of values allowed are 0.0 to 1/**uphillEfficiency**.
                 *
                 * Sensible Values : for **Combustion Model** : 0.51, for **Electric Model** : 0.73
                 */
                downhillEfficiency?: number;
                /**
                 * Specifies the speed-dependent component of consumption.
                 *
                 * Provided as an unordered list of speed/consumption-rate pairs. The list defines points on a
                 * consumption curve. Consumption rates for speeds not in the list are found as follows:
                 *
                 * * by linear interpolation, if the given speed lies in between two speeds in the list
                 *
                 * * by linear extrapolation otherwise, assuming a constant (ΔConsumption/ΔSpeed) determined by
                 * the nearest two points in the list
                 *
                 * The list must contain between 1 and 25 points (inclusive), and may not contain duplicate
                 * points for the same speed. If it only contains a single point, then the consumption rate of
                 * that point is used without further processing.
                 *
                 * Consumption specified for the largest speed must be greater than or equal to that of the
                 * penultimate largest speed. This ensures that extrapolation does not lead to negative
                 * consumption rates.
                 *
                 * Similarly, consumption values specified for the two smallest speeds in the list cannot lead to
                 * a negative consumption rate for any smaller  speed.
                 *
                 * The valid range for the consumption values(expressed in kWh/100km) is between 0.01 and
                 * 100000.0.
                 *
                 * Sensible Values : 50,8.2:130,21.3
                 *
                 * This parameter is required for **Electric consumption model**.
                 */
                constantSpeedConsumptionInkWhPerHundredkm?: string;
                /**
                 * Specifies the current electric energy supply in kilowatt hours (kWh).
                 *
                 * This parameter co-exists with **maxChargeInkWh** parameter.
                 *
                 * The range of values allowed are 0.0 to **maxChargeInkWh**.
                 *
                 * Sensible Values : 43
                 */
                currentChargeInkWh?: string;
                /**
                 * Specifies the maximum electric energy supply in kilowatt hours (kWh) that may be stored in the
                 * vehicle's battery.
                 *
                 * This parameter co-exists with **currentChargeInkWh** parameter.
                 *
                 * Minimum value has to be greater than or equal to **currentChargeInkWh**.
                 *
                 * Sensible Values : 85
                 */
                maxChargeInkWh?: string;
                /**
                 * Specifies the amount of power consumed for sustaining auxiliary systems, in kilowatts (kW).
                 *
                 * It can be used to specify consumption due to devices and systems such as AC systems, radio,
                 * heating, etc.
                 *
                 * Sensible Values : 1.7
                 */
                auxiliaryPowerInkW?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RouteBeginPostRouteMatrixPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Boolean to indicate whether to execute the request synchronously. If set to true, user will
                 * get a 200 response if the request is finished under 120 seconds. Otherwise, user will get a
                 * 202 response right away. Please refer to the API description for more details on 202 response.
                 */
                waitForResults?: boolean;
                /**
                 * Specifies whether to return additional travel times using different types of traffic
                 * information (none, historic, live) as well as the default best-estimate travel time. Possible
                 * values include: 'none', 'all'
                 */
                computeTravelTimeFor?: ComputeTravelTimeFor;
                /**
                 * Specifies which of the section types is reported in the route response. <br><br>For example if
                 * sectionType = pedestrian the sections which are suited for pedestrians only are returned.
                 * Multiple types can be used. The default sectionType refers to the travelMode input. By default
                 * travelMode is set to car. Possible values include: 'carTrain', 'country', 'ferry', 'motorway',
                 * 'pedestrian', 'tollRoad', 'tollVignette', 'traffic', 'travelMode', 'tunnel'
                 */
                sectionType?: SectionType;
                /**
                 * The date and time of arrival at the destination point. It must be specified as a dateTime.
                 * When a time zone offset is not specified it will be assumed to be that of the destination
                 * point. The arriveAt value must be in the future. The arriveAt parameter cannot be used in
                 * conjunction with departAt, minDeviationDistance or minDeviationTime.
                 */
                arriveAt?: Date;
                /**
                 * The date and time of departure from the origin point. Departure times apart from now must be
                 * specified as a dateTime. When a time zone offset is not specified, it will be assumed to be
                 * that of the origin point. The departAt value must be in the future in the date-time format
                 * (1996-12-19T16:39:57-08:00).
                 */
                departAt?: Date;
                /**
                 * Weight per axle of the vehicle in kg. A value of 0 means that weight restrictions per axle are
                 * not considered.
                 */
                vehicleAxleWeight?: number;
                /**
                 * Length of the vehicle in meters. A value of 0 means that length restrictions are not
                 * considered.
                 */
                vehicleLength?: number;
                /**
                 * Height of the vehicle in meters. A value of 0 means that height restrictions are not
                 * considered.
                 */
                vehicleHeight?: number;
                /**
                 * Width of the vehicle in meters. A value of 0 means that width restrictions are not considered.
                 */
                vehicleWidth?: number;
                /**
                 * Maximum speed of the vehicle in km/hour. A value of 0 means that an appropriate value for the
                 * vehicle will be determined and applied during route planning. A non-zero value may be
                 * overridden during route planning.
                 */
                vehicleMaxSpeed?: number;
                /**
                 * Weight of the vehicle in kilograms.
                 */
                vehicleWeight?: number;
                /**
                 * Level of turns for thrilling route. This parameter can only be used in conjunction with
                 * routeType=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                windingness?: Windingness;
                /**
                 * Degree of hilliness for thrilling route. This parameter can only be used in conjunction with
                 * `routeType`=thrilling. Possible values include: 'low', 'normal', 'high'
                 */
                hilliness?: Hilliness;
                /**
                 * The mode of travel for the requested route. Note that the requested travelMode may not be
                 * available for the entire route. Where the requested travelMode is not available for a
                 * particular section, the travelMode element of the response for that section will be other.
                 * Note that travel modes bus, motorcycle, taxi and van are BETA functionality. Full restriction
                 * data is not available in all areas. In **calculateReachableRange** requests, the values
                 * bicycle and pedestrian must not be used. Possible values include: 'car', 'truck', 'taxi',
                 * 'bus', 'van', 'motorcycle', 'bicycle', 'pedestrian'
                 */
                travelMode?: TravelMode;
                /**
                 * Specifies something that the route calculation should try to avoid when determining the route.
                 * Can be specified multiple times in one request, for example,
                 * '&avoid=motorways&avoid=tollRoads&avoid=ferries'. In calculateReachableRange requests, the
                 * value alreadyUsedRoads must not be used. Possible values include: 'tollRoads', 'motorways',
                 * 'ferries', 'unpavedRoads', 'carpools', 'alreadyUsedRoads', 'borderCrossings'
                 */
                avoid?: Avoid;
                /**
                 * Possible values:
                 * * true - Do consider all available traffic information during routing
                 * * false - Ignore current traffic data during routing. Note that although the current traffic
                 * data is ignored
                 * during routing, the effect of historic traffic on effective road speeds is still incorporated.
                 */
                traffic?: boolean;
                /**
                 * The type of route requested. Possible values include: 'fastest', 'shortest', 'eco',
                 * 'thrilling'
                 */
                routeType?: RouteType;
                /**
                 * Types of cargo that may be classified as hazardous materials and restricted from some roads.
                 * Available vehicleLoadType values are US Hazmat classes 1 through 9, plus generic
                 * classifications for use in other countries. Values beginning with USHazmat are for US routing
                 * while otherHazmat should be used for all other countries. vehicleLoadType can be specified
                 * multiple times. This parameter is currently only considered for travelMode=truck. Possible
                 * values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
                 * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
                 * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
                 */
                vehicleLoadType?: VehicleLoadType;
            }
            /**
             * Optional Parameters.
             */
            export interface TimezoneGetTimezoneByIDOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Specifies the language code in which the timezone names should be returned. If no language
                 * code is provided, the response will be in "EN". Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                acceptLanguage?: string;
                /**
                 * Alternatively, use alias "o". Options available for types of information returned in the
                 * result. Possible values include: 'none', 'zoneInfo', 'transitions', 'all'
                 */
                options?: TimezoneOptions;
                /**
                 * Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the
                 * machine time serving the request.
                 */
                timeStamp?: Date;
                /**
                 * Alternatively, use alias "tf". The start date from which daylight savings time (DST)
                 * transitions are requested, only applies when "options" = all or "options" = transitions.
                 */
                transitionsFrom?: Date;
                /**
                 * Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST
                 * transitions are requested, only applies when "options" = all or "options" = transitions.
                 */
                transitionsYears?: number;
            }
            /**
             * Optional Parameters.
             */
            export interface TimezoneGetTimezoneByCoordinatesOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Specifies the language code in which the timezone names should be returned. If no language
                 * code is provided, the response will be in "EN". Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                acceptLanguage?: string;
                /**
                 * Alternatively, use alias "o". Options available for types of information returned in the
                 * result. Possible values include: 'none', 'zoneInfo', 'transitions', 'all'
                 */
                options?: TimezoneOptions;
                /**
                 * Alternatively, use alias "stamp", or "s". Reference time, if omitted, the API will use the
                 * machine time serving the request.
                 */
                timeStamp?: Date;
                /**
                 * Alternatively, use alias "tf". The start date from which daylight savings time (DST)
                 * transitions are requested, only applies when "options" = all or "options" = transitions.
                 */
                transitionsFrom?: Date;
                /**
                 * Alternatively, use alias "ty". The number of years from "transitionsFrom" for which DST
                 * transitions are requested, only applies when "options" = all or "options" = transitions.
                 */
                transitionsYears?: number;
            }
            /**
             * Optional Parameters.
             */
            export interface TimezoneGetTimezoneWindowsToIANAOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Windows Time Zone territory code.
                 */
                territory?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RenderGetMapImageOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Pushpin style and instances. Use this parameter to optionally add pushpins to the image.
                 * The pushpin style describes the appearance of the pushpins, and the instances specify
                 * the coordinates of the pushpins and optional labels for each pin. (Be sure to properly
                 * URL-encode values of this
                 * parameter since it will contain reserved characters such as pipes and punctuation.)
                 *
                 * The Azure Maps account S0 SKU only supports a single instance of the pins parameter. Other
                 * SKUs
                 * allow multiple instances of the pins parameter to specify multiple pin styles.
                 *
                 * To render a pushpin at latitude 45°N and longitude 122°W using the default built-in pushpin
                 * style, add the
                 * querystring parameter
                 *
                 * `pins=default||-122 45`
                 *
                 * Note that the longitude comes before the latitude.
                 * After URL encoding this will look like
                 *
                 * `pins=default%7C%7C-122+45`
                 *
                 * All of the examples here show the pins
                 * parameter without URL encoding, for clarity.
                 *
                 * To render a pin at multiple locations, separate each location with a pipe character. For
                 * example, use
                 *
                 * `pins=default||-122 45|-119.5 43.2|-121.67 47.12`
                 *
                 * The S0 Azure Maps account SKU only allows five pushpins. Other account SKUs do not have this
                 * limitation.
                 *
                 * ### Style Modifiers
                 *
                 * You can modify the appearance of the pins by adding style modifiers. These are added after the
                 * style but before
                 * the locations and labels. Style modifiers each have a two-letter name. These abbreviated names
                 * are used to help
                 * reduce the length of the URL.
                 *
                 * To change the color of the pushpin, use the 'co' style modifier and specify the color using
                 * the HTML/CSS RGB color
                 * format which is a six-digit hexadecimal number (the three-digit form is not supported). For
                 * example, to use
                 * a deep pink color which you would specify as #FF1493 in CSS, use
                 *
                 * `pins=default|coFF1493||-122 45`
                 *
                 * ### Pushpin Labels
                 *
                 * To add a label to the pins, put the label in single quotes just before the coordinates. For
                 * example, to label
                 * three pins with the values '1', '2', and '3', use
                 *
                 * `pins=default||'1'-122 45|'2'-119.5 43.2|'3'-121.67 47.12`
                 *
                 * There is a built in pushpin style called 'none' that does not display a pushpin image. You can
                 * use this if
                 * you want to display labels without any pin image. For example,
                 *
                 * `pins=none||'A'-122 45|'B'-119.5 43.2`
                 *
                 * To change the color of the pushpin labels, use the 'lc' label color style modifier. For
                 * example, to use pink
                 * pushpins with black labels, use
                 *
                 * `pins=default|coFF1493|lc000000||-122 45`
                 *
                 * To change the size of the labels, use the 'ls' label size style modifier. The label size
                 * represents the approximate
                 * height of the label text in pixels. For example, to increase the label size to 12, use
                 *
                 * `pins=default|ls12||'A'-122 45|'B'-119 43`
                 *
                 * The labels are centered at the pushpin 'label anchor.' The anchor location is predefined for
                 * built-in pushpins and
                 * is at the top center of custom pushpins (see below). To override the label anchor, using the
                 * 'la' style modifier
                 * and provide X and Y pixel coordinates for the anchor. These coordinates are relative to the
                 * top left corner of the
                 * pushpin image. Positive X values move the anchor to the right, and positive Y values move the
                 * anchor down. For example,
                 * to position the label anchor 10 pixels right and 4 pixels above the top left corner of the
                 * pushpin image,
                 * use
                 *
                 * `pins=default|la10 -4||'A'-122 45|'B'-119 43`
                 *
                 * ### Custom Pushpins
                 *
                 * To use a custom pushpin image, use the word 'custom' as the pin style name, and then specify a
                 * URL after the
                 * location and label information. Use two pipe characters to indicate that you're done
                 * specifying locations and are
                 * starting the URL. For example,
                 *
                 * `pins=custom||-122 45||http://contoso.com/pushpins/red.png`
                 *
                 * After URL encoding, this would look like
                 *
                 * `pins=custom%7C%7C-122+45%7C%7Chttp%3A%2F%2Fcontoso.com%2Fpushpins%2Fred.png`
                 *
                 * By default, custom pushpin images are drawn centered at the pin coordinates. This usually
                 * isn't ideal as it obscures
                 * the location that you're trying to highlight. To override the anchor location of the pin
                 * image, use the 'an'
                 * style modifier. This uses the same format as the 'la' label anchor style modifier. For
                 * example, if your custom
                 * pin image has the tip of the pin at the top left corner of the image, you can set the anchor
                 * to that spot by
                 * using
                 *
                 * `pins=custom|an0 0||-122 45||http://contoso.com/pushpins/red.png`
                 *
                 * Note: If you use the 'co' color modifier with a custom pushpin image, the specified color will
                 * replace the RGB
                 * channels of the pixels in the image but will leave the alpha (opacity) channel unchanged. This
                 * would usually
                 * only be done with a solid-color custom image.
                 *
                 * ### Getting Pushpins from Azure Maps Data Storage
                 *
                 * For all Azure Maps account SKUs other than S0,
                 * the pushpin image and location information can be obtained from Azure Maps Data Storage. After
                 * uploading a pushpin image
                 * or a GeoJSON document containing pin locations, the Data Storage service returns a Unique Data
                 * ID (UDID) that you can use
                 * to reference the data in the pins parameter.
                 *
                 * To use a custom pushpin image from Azure Maps Data Storage, specify the UDID prefixed by
                 * 'udid-' as the name of the
                 * pushpin style. For example,
                 *
                 * `pins=udid-fe22c504-3a81-4fcd-adc6-a3507ce866c1||-122 45`
                 *
                 * To use the point geometry from an uploaded GeoJSON document as the pin locations, specify the
                 * UDID in the locations
                 * section of the pins parameter. For example,
                 *
                 * `pins=default||udid-29dc105a-dee7-409f-a3f9-22b066ae4713`
                 *
                 * Note that
                 * only point and multipoint geometry, points and multipoints from geometry collections, and
                 * point geometry from features
                 * will be used. Linestring and polygon geometry will be ignored. If the point comes from a
                 * feature and the feature
                 * has a string property called "label", the value of that property will be used as the label for
                 * the pin.
                 *
                 * You can mix pin locations from Data Storage and pin locations specified in the pins parameter.
                 * Any of the pipe-delimited
                 * pin locations can be a longitude and latitude or a UDID. For example,
                 *
                 * `pins=default||-122 45|udid-29dc105a-dee7-409f-a3f9-22b066ae4713|-119 43`
                 *
                 * ### Scale, Rotation, and Opacity
                 *
                 * You can make pushpins and their labels larger or smaller by using the 'sc' scale style
                 * modifier. This is a
                 * value greater than zero. A value of 1 is the standard scale. Values larger than 1 will make
                 * the pins larger, and
                 * values smaller than 1 will make them smaller. For example, to draw the pushpins 50% larger
                 * than normal, use
                 *
                 * `pins=default|sc1.5||-122 45`
                 *
                 * You can rotate pushpins and their labels by using the 'ro' rotation style modifier. This is a
                 * number of degrees
                 * of clockwise rotation. Use a negative number to rotate counter-clockwise. For example, to
                 * rotate the pushpins
                 * 90 degrees clockwise and double their size, use
                 *
                 * `pins=default|ro90|sc2||-122 45`
                 *
                 * You can make pushpins and their labels partially transparent by specifying the 'al' alpha
                 * style modifier.
                 * This is a number between 0 and 1 indicating the opacity of the pushpins. Zero makes them
                 * completely transparent
                 * (and not visible) and 1 makes them completely opaque (which is the default). For example, to
                 * make pushpins
                 * and their labels only 67% opaque, use
                 *
                 * `pins=default|al.67||-122 45`
                 *
                 * ### Style Modifier Summary
                 *
                 * Modifier  | Description     | Range
                 * :--------:|-----------------|------------------
                 * al        | Alpha (opacity) | 0 to 1
                 * an        | Pin anchor      | *
                 * co        | Pin color       | 000000 to FFFFFF
                 * la        | Label anchor    | *
                 * lc        | Label color     | 000000 to FFFFFF
                 * ls        | Label size      | Greater than 0
                 * ro        | Rotation        | -360 to 360
                 * sc        | Scale           | Greater than 0
                 *
                 * * X and Y coordinates can be anywhere within pin image or a margin around it.
                 * The margin size is the minimum of the pin width and height.
                 */
                pins?: string[];
                /**
                 * Path style and locations. Use this parameter to optionally add lines, polygons or circles to
                 * the image.
                 * The path style describes the appearance of the line and fill. (Be sure to properly URL-encode
                 * values of this
                 * parameter since it will contain reserved characters such as pipes and punctuation.)
                 *
                 * Path parameter is supported in Azure Maps account SKU starting with S1. Multiple instances of
                 * the path parameter
                 * allow to specify multiple geometries with their styles. Number of parameters per request is
                 * limited to 10 and
                 * number of locations is limited to 100 per path.
                 *
                 * To render a circle with radius 100 meters and center point at latitude 45°N and longitude
                 * 122°W using the default style, add the
                 * querystring parameter
                 *
                 * `path=ra100||-122 45`
                 *
                 * Note that the longitude comes before the latitude.
                 * After URL encoding this will look like
                 *
                 * `path=ra100%7C%7C-122+45`
                 *
                 * All of the examples here show the path parameter without URL encoding, for clarity.
                 *
                 * To render a line, separate each location with a pipe character. For example, use
                 *
                 * `path=||-122 45|-119.5 43.2|-121.67 47.12`
                 *
                 * To render a polygon, last location must be equal to the start location. For example, use
                 *
                 * `path=||-122 45|-119.5 43.2|-121.67 47.12|-122 45`
                 *
                 * Longitude and latitude values for locations of lines and polygons can be in the range from
                 * -360 to 360 to allow for rendering of geometries crossing the anti-meridian.
                 *
                 * ### Style Modifiers
                 *
                 * You can modify the appearance of the path by adding style modifiers. These are added before
                 * the locations.
                 * Style modifiers each have a two-letter name. These abbreviated names are used to help reduce
                 * the length
                 * of the URL.
                 *
                 * To change the color of the outline, use the 'lc' style modifier and specify the color using
                 * the HTML/CSS RGB color
                 * format which is a six-digit hexadecimal number (the three-digit form is not supported). For
                 * example, to use
                 * a deep pink color which you would specify as #FF1493 in CSS, use
                 *
                 * `path=lcFF1493||-122 45|-119.5 43.2`
                 *
                 * Multiple style modifiers may be combined together to create a more complex visual style.
                 *
                 * `lc0000FF|lw3|la0.60|fa0.50||-122.2 47.6|-122.2 47.7|-122.3 47.7|-122.3 47.6|-122.2 47.6`
                 *
                 * ### Getting Path locations from Azure Maps Data Storage
                 *
                 * For all Azure Maps account SKUs other than S0, the path location information can be obtained
                 * from Azure Maps Data Storage.
                 * After uploading a GeoJSON document containing path locations, the Data Storage service returns
                 * a Unique Data ID (UDID) that you can use
                 * to reference the data in the path parameter.
                 *
                 * To use the point geometry from an uploaded GeoJSON document as the path locations, specify the
                 * UDID in the locations
                 * section of the path parameter. For example,
                 *
                 * `path=||udid-29dc105a-dee7-409f-a3f9-22b066ae4713`
                 *
                 * Note the it is not allowed to mix path locations from Data Storage with locations specified in
                 * the path parameter.
                 *
                 * ### Style Modifier Summary
                 *
                 * Modifier  | Description            | Range
                 * :--------:|------------------------|------------------
                 * lc        | Line color             | 000000 to FFFFFF
                 * fc        | Fill color             | 000000 to FFFFFF
                 * la        | Line alpha (opacity)   | 0 to 1
                 * fa        | Fill alpha (opacity)   | 0 to 1
                 * lw        | Line width             | Greater than 0
                 * ra        | Circle radius (meters) | Greater than 0
                 */
                path?: string[];
                /**
                 * Map layer requested. If layer is set to labels or hybrid, the format should be png. Possible
                 * values include: 'basic', 'hybrid', 'labels'
                 */
                layer?: StaticMapLayer;
                /**
                 * Map style to be returned. Currently, only style available is main. Possible values include:
                 * 'main'
                 */
                style?: Style;
                /**
                 * Desired zoom level of the map. Zoom value must be in the range: 0-20 (inclusive). Default
                 * value is 12.<br><br>Please see [Zoom Levels and Tile
                 * Grid](https://docs.microsoft.com/en-us/azure/location-based-services/zoom-levels-and-tile-grid)
                 * for details.
                 */
                zoom?: number;
                /**
                 * Coordinates of the center point. Format: 'lon,lat'. Projection used
                 * - EPSG:3857. Longitude range: -180 to 180. Latitude range: -85 to 85.
                 *
                 * Note: Either center or bbox are required parameters. They are
                 * mutually exclusive.
                 */
                center?: string;
                /**
                 * Bounding box. Projection used - EPSG:3857. Format : 'minLon, minLat,
                 * maxLon, maxLat'.
                 *
                 * Note: Either bbox or center are required
                 * parameters. They are mutually exclusive. It shouldn’t be used with
                 * height or width.
                 *
                 * The maximum allowed ranges for Lat and Lon are defined for each zoom level
                 * in the table at the top of this page.
                 */
                bbox?: string;
                /**
                 * Height of the resulting image in pixels. Range is 1 to 8192. Default
                 * is 512. It shouldn’t be used with bbox.
                 */
                height?: number;
                /**
                 * Width of the resulting image in pixels. Range is 1 to 8192. Default is 512. It shouldn’t be
                 * used with bbox.
                 */
                width?: number;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RenderGetMapTileOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The size of the returned map tile in pixels.
                 */
                tileSize?: number;
                /**
                 * Language in which search results should be returned. Should be one of supported IETF language
                 * tags, case insensitive. When data in specified language is not available for a specific field,
                 * default language is used.
                 *
                 * Please refer to [Supported
                 * Languages](https://docs.microsoft.com/en-us/azure/azure-maps/supported-languages) for details.
                 */
                language?: string;
                /**
                 * The View parameter specifies which set of geopolitically disputed content is returned via
                 * Azure Maps services, including  borders and labels displayed on the map. The View parameter
                 * (also referred to as “user region parameter”) will show the  correct maps for that
                 * country/region. By default, the View parameter is set to “Unified” even if you haven’t defined
                 * it in  the request. It is your responsibility to determine the location of your users, and
                 * then set the View parameter correctly  for that location. Alternatively, you have the option
                 * to set ‘View=Auto’, which will return the map data based on the IP  address of the request.
                 * The View parameter in Azure Maps must be used in compliance with applicable laws, including
                 * those  regarding mapping, of the country where maps, images and other data and third party
                 * content that you are authorized to  access via Azure Maps is made available. Example: view=IN.
                 *
                 * Please refer to [Supported Views](https://aka.ms/AzureMapsLocalizationViews) for details and
                 * to see the available Views.
                 */
                view?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface RenderGetCopyrightFromBoundingBoxOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Yes/no value to exclude textual data from response. Only images and country names will be in
                 * response. Possible values include: 'yes', 'no'
                 */
                text?: Text;
            }
            /**
             * Optional Parameters.
             */
            export interface RenderGetCopyrightForTileOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Yes/no value to exclude textual data from response. Only images and country names will be in
                 * response. Possible values include: 'yes', 'no'
                 */
                text?: Text1;
            }
            /**
             * Optional Parameters.
             */
            export interface RenderGetCopyrightForWorldOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Yes/no value to exclude textual data from response. Only images and country names will be in
                 * response. Possible values include: 'yes', 'no'
                 */
                text?: Text2;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetMetroAreaPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The type of the query. By default originType=position, specified as a comma separated string
                 * composed by latitude followed by longitude, e.g. "47.641268,-122.125679”. Possible values
                 * include: 'position', 'countryCode'
                 */
                queryType?: MetroAreaQueryType;
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetMetroAreaInfoPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetNearbyTransitPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Maximum number of responses that will be returned. Default is 3, minimum 1 and maximum 100.
                 * Sort order is based on distance from input location.
                 */
                limit?: number;
                /**
                 * Specifies the search area to constrain a search. The radius in meters  to for the results to
                 * be constrained to the defined area. Default value is 30 meters, minimum 1 meter and maximum
                 * 5000 meters (5km).
                 */
                radius?: number;
                /**
                 * Comma separated list of transit object types. By default, objectType is set to stop.
                 */
                objectType?: ObjectType[];
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetTransitDockInfoPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetCarShareInfoPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetTransitLineInfoPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Specify additional details requested respective to the line group as a comma separated list.
                 * As a default service returns line basic info.
                 */
                detailType?: TransitLineDetailType[];
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetTransitStopInfoPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The type of the unique query parameter of the stop. By default queryType=stopId. Possible
                 * values include: 'stopId', 'stopKey'
                 */
                queryType?: TransitStopQueryType;
                /**
                 * Specify additional details requested respective to the transit stop as a commma separated
                 * list.
                 */
                detailType?: TransitStopDetailType[];
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetTransitRoutePreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The type of the origin. By default originType=position, specified as a comma separated string
                 * composed by latitude followed by longitude, e.g., "47.641268,-122.125679”. Possible values
                 * include: 'position', 'stopId', 'stopKey'
                 */
                originType?: OriginType;
                /**
                 * The type of the destination. Possible values include: 'position', 'stopId', 'stopKey'
                 */
                destinationType?: DestinationType;
                /**
                 * The mode of travel for the requested route; as comma separated list. If not specified, all
                 * modes will be allowed. All modes might not be available in all metro areas. If valid trip is
                 * not found, empty result will be returned.
                 */
                modeType?: ModeType[];
                /**
                 * Applicable only with modeType = publicTransit. Allow only a specific set of public transit
                 * types (as a comma separated list) to be returned for the route. Note that the requested
                 * transitType may not be available for the entire route. If not specified, all modes will be
                 * allowed.
                 */
                transitType?: TransitTypeFilter[];
                /**
                 * Specifies whether to prefer routes from a specific set of agencies if possible; as a comma
                 * separated list. If valid trip isn’t found with the preferred agency, or only one with very
                 * long trips or with large number of transfers, itineraries with other agencies will be
                 * returned.
                 */
                agency?: string[];
                /**
                 * Specifies the agency identifier to request routes from preferred agencies. By default the
                 * agencyType=agencyId. Possible values include: 'agencyId', 'agencyKey', 'agencyName'
                 */
                agencyType?: AgencyType;
                /**
                 * The time of departure or arrival in the local time in ISO format (2019-04-05T14:24:18-04:00).
                 * If timeType is not specified, it will be assumed to be 'departure' and time is the current
                 * local time at the origin point.
                 */
                time?: string;
                /**
                 * Specifies whether the time signifies departure time or arrival time. If not defined, default
                 * value is 'departure'. Possible values include: 'arrival', 'departure', 'last'
                 */
                timeType?: TimeType;
                /**
                 * The type of route requested. If not specified, 'optimal' will be used. Possible values
                 * include: 'optimal', 'leastWalk', 'leastTransfers'
                 */
                routeType?: TransitRouteType;
                /**
                 * Bike type of the bike. Specifies which type of bikes will be used. If not specified, all will
                 * be allowed. Possible values include: 'privateBike', 'dockedBike'
                 */
                bikeType?: BikeType;
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetTransitItineraryPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * Specify additional details returned in the transit route itinerary response, as a comma
                 * separated list.
                 */
                detailType?: TransitItineraryDetailType[];
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface MobilityGetRealTimeArrivalsPreviewOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The type of the query parameter. Defines the mode of the request. Only one mode per request is
                 * supported. By default queryType is set to be ‘stops’ returning the requested number of Live
                 * Arrivals for all lines arriving at the specified stop. Possible values include: 'stops',
                 * 'line', 'lineAndStop', 'position'
                 */
                queryType?: RealTimeArrivalsQueryType;
                /**
                 * The type of the unique query parameter of the stop. By default stopQueryType=stopId. This
                 * parameter can only be used in conjunction with queryType=stops or queryType=lineAndStop.
                 * Possible values include: 'stopId', 'stopKey'
                 */
                stopQueryType?: StopQueryType;
                /**
                 * The maximum arrivals to return. If not specified, the system default will be used. For stops
                 * max number of arrivals per stop. For lines max arrivals per stop on the line. For everything
                 * else max arrivals overall.
                 */
                limit?: number;
                /**
                 * The maximum time (in minutes) in the future to return arrivals for. If not specified, the
                 * system default (30 minutes) will be used.  The minimum value is 0 and maximum value is 60
                 * minutes.
                 */
                maxMinutesInFuture?: number;
                /**
                 * Type of public transit user is requesting respective transit stop, as a comma separated list.
                 * If not specified, all will be allowed. This parameter can only be used in conjunction with
                 * queryType=stops. Supported transit types are Tram, Subway, Rail, Bus, Ferry, CableCar,
                 * Gondola, Funicular. For example, transitType=Bus,Subway.
                 */
                transitType?: TransitTypeFilter[];
                /**
                 * In case you prefer routes from a specific set of agencies to be returned. Specified as a comma
                 * separated string.
                 */
                agency?: string[];
                /**
                 * Specifies the agency identifier to request routes from a specific set of agencies to be
                 * returned. By default the agencyType=agencyId. Possible values include: 'agencyId',
                 * 'agencyKey', 'agencyName'
                 */
                agencyType?: AgencyType;
                /**
                 * Time in seconds within which if the provider doesn’t respond, end point will return static
                 * data.
                 */
                timeoutInSeconds?: number;
                /**
                 * Language in which search results will be returned.  Only NGT is supported. Please refer to
                 * [Supported languages](https://docs.microsoft.com/azure/azure-maps/supported-languages) for
                 * details.
                 */
                language?: string;
            }
            /**
             * Optional Parameters.
             */
            export interface SpatialGetGeofenceOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The user request time. If not presented in the request, the default value is DateTime.Now.
                 */
                userTime?: string;
                /**
                 * The radius of the buffer around the geofence in meters that defines how far to search inside
                 * and outside the border of the fence against the coordinate that was provided when calculating
                 * the result.  The minimum value is 0, and the maximum is 500.  The default value is 50.
                 */
                searchBuffer?: number;
                /**
                 * If true, the request will use async event mechanism; if false, the request will be
                 * synchronized and do not trigger any event. The default value is false.
                 */
                isAsync?: boolean;
                /**
                 * Mode of the geofencing async event mechanism. Possible values include: 'All', 'EnterAndExit'
                 */
                mode?: GeofenceMode;
            }
            /**
             * Optional Parameters.
             */
            export interface SpatialPostGeofenceOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The user request time. If not presented in the request, the default value is DateTime.UtcNow.
                 */
                userTime?: string;
                /**
                 * The radius of the buffer around the geofence in meters that defines how far to search inside
                 * and outside the border of the fence against the coordinate that was provided when calculating
                 * the result.  The minimum value is 0, and the maximum is 500.  The default value is 50.
                 */
                searchBuffer?: number;
                /**
                 * If true, the request will use async event mechanism; if false, the request will be
                 * synchronized and do not trigger any event. The default value is false.
                 */
                isAsync?: boolean;
                /**
                 * Mode of the geofencing async event mechanism. Possible values include: 'All', 'EnterAndExit'
                 */
                mode?: GeofenceMode;
            }
            /**
             * Optional Parameters.
             */
            export interface SpatialPostClosestPointOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The number of closest points expected from response. Default: 1, minimum: 1 and maximum: 50
                 */
                numberOfClosestPoints?: number;
            }
            /**
             * Optional Parameters.
             */
            export interface SpatialGetClosestPointOptionalParams extends msRest.RequestOptionsBase {
                /**
                 * The number of closest points expected from response. Default: 1, minimum: 1 and maximum: 50
                 */
                numberOfClosestPoints?: number;
            }
            /**
             * An interface representing MapsClientOptions.
             */
            export interface MapsClientOptions {
                baseUri?: string;
            }
            /**
             * Defines headers for PostSearchFuzzyBatchPreview operation.
             */
            export interface SearchPostSearchFuzzyBatchPreviewHeaders {
                /**
                 * New URL to check for the results of the long running process.
                 */
                location: string;
            }
            /**
             * Defines headers for PostSearchAddressBatchPreview operation.
             */
            export interface SearchPostSearchAddressBatchPreviewHeaders {
                /**
                 * New URL to check for the results of the long running process.
                 */
                location: string;
            }
            /**
             * Defines headers for PostSearchAddressReverseBatchPreview operation.
             */
            export interface SearchPostSearchAddressReverseBatchPreviewHeaders {
                /**
                 * New URL to check for the results of the long running process.
                 */
                location: string;
            }
            /**
             * Defines headers for PostRouteMatrixPreview operation.
             */
            export interface RoutePostRouteMatrixPreviewHeaders {
                /**
                 * New URL to check for the results of the long running process.
                 */
                location: string;
            }
            /**
             * Defines headers for PostRouteDirectionsBatchPreview operation.
             */
            export interface RoutePostRouteDirectionsBatchPreviewHeaders {
                /**
                 * New URL to check for the results of the long running process.
                 */
                location: string;
            }
            /**
             * Defines headers for GetGeofence operation.
             */
            export interface SpatialGetGeofenceHeaders {
                /**
                 * Value present in an async call's response and the Event Grid event data. It helps correlate
                 * the async call’s response with the corresponding Event Grid event.
                 */
                xCorrelationId: string;
            }
            /**
             * Defines headers for PostGeofence operation.
             */
            export interface SpatialPostGeofenceHeaders {
                /**
                 * Value present in an async call's response and the Event Grid event data. It helps correlate
                 * the async call’s response with the corresponding Event Grid event.
                 */
                xCorrelationId: string;
            }
            /**
             * Defines values for EntityType.
             * Possible values include: 'Country', 'CountrySubdivision', 'CountrySecondarySubdivision',
             * 'CountryTertiarySubdivision', 'Municipality', 'MunicipalitySubdivision', 'Neighbourhood',
             * 'PostalCodeArea'
             * @readonly
             * @enum {string}
             */
            export enum EntityType {
                /**
                 * Country name
                 */
                Country = "Country",
                /**
                 * State or Province
                 */
                CountrySubdivision = "CountrySubdivision",
                /**
                 * County
                 */
                CountrySecondarySubdivision = "CountrySecondarySubdivision",
                /**
                 * Named Area
                 */
                CountryTertiarySubdivision = "CountryTertiarySubdivision",
                /**
                 * City / Town
                 */
                Municipality = "Municipality",
                /**
                 * Sub / Super City
                 */
                MunicipalitySubdivision = "MunicipalitySubdivision",
                /**
                 * Neighbourhood
                 */
                Neighbourhood = "Neighbourhood",
                /**
                 * Postal Code / Zip Code
                 */
                PostalCodeArea = "PostalCodeArea"
            }
            /**
             * Defines values for MagnitudeOfDelay.
             * Possible values include: '0', '1', '2', '3', '4'
             * @readonly
             * @enum {string}
             */
            export enum MagnitudeOfDelay {
                /**
                 * Unknown.
                 */
                Zero = "0",
                /**
                 * Minor.
                 */
                One = "1",
                /**
                 * Moderate.
                 */
                Two = "2",
                /**
                 * Major.
                 */
                Three = "3",
                /**
                 * Undefined, used for road closures and other indefinite delays.
                 */
                Four = "4"
            }
            /**
             * Defines values for GuidanceInstructionType.
             * Possible values include: 'TURN', 'ROAD_CHANGE', 'LOCATION_DEPARTURE', 'LOCATION_ARRIVAL',
             * 'DIRECTION_INFO', 'LOCATION_WAYPOINT'
             * @readonly
             * @enum {string}
             */
            export enum GuidanceInstructionType {
                /**
                 * Turn.
                 */
                TURN = "TURN",
                /**
                 * Road Change.
                 */
                ROADCHANGE = "ROAD_CHANGE",
                /**
                 * Departure location.
                 */
                LOCATIONDEPARTURE = "LOCATION_DEPARTURE",
                /**
                 * Arrival location.
                 */
                LOCATIONARRIVAL = "LOCATION_ARRIVAL",
                /**
                 * Direction information.
                 */
                DIRECTIONINFO = "DIRECTION_INFO",
                /**
                 * Way point location.
                 */
                LOCATIONWAYPOINT = "LOCATION_WAYPOINT"
            }
            /**
             * Defines values for DrivingSide.
             * Possible values include: 'LEFT', 'RIGHT'
             * @readonly
             * @enum {string}
             */
            export enum DrivingSide {
                /**
                 * Left side.
                 */
                LEFT = "LEFT",
                /**
                 * Right side.
                 */
                RIGHT = "RIGHT"
            }
            /**
             * Defines values for GuidanceManeuver.
             * Possible values include: 'ARRIVE', 'ARRIVE_LEFT', 'ARRIVE_RIGHT', 'DEPART', 'STRAIGHT',
             * 'KEEP_RIGHT', 'BEAR_RIGHT', 'TURN_RIGHT', 'SHARP_RIGHT', 'KEEP_LEFT', 'BEAR_LEFT', 'TURN_LEFT',
             * 'SHARP_LEFT', 'MAKE_UTURN', 'ENTER_MOTORWAY', 'ENTER_FREEWAY', 'ENTER_HIGHWAY', 'TAKE_EXIT',
             * 'MOTORWAY_EXIT_LEFT', 'MOTORWAY_EXIT_RIGHT', 'TAKE_FERRY', 'ROUNDABOUT_CROSS',
             * 'ROUNDABOUT_RIGHT', 'ROUNDABOUT_LEFT', 'ROUNDABOUT_BACK', 'TRY_MAKE_UTURN', 'FOLLOW',
             * 'SWITCH_PARALLEL_ROAD', 'SWITCH_MAIN_ROAD', 'ENTRANCE_RAMP', 'WAYPOINT_LEFT', 'WAYPOINT_RIGHT',
             * 'WAYPOINT_REACHED'
             * @readonly
             * @enum {string}
             */
            export enum GuidanceManeuver {
                /**
                 * You have arrived.
                 */
                ARRIVE = "ARRIVE",
                /**
                 * You have arrived. Your destination is on the left.
                 */
                ARRIVELEFT = "ARRIVE_LEFT",
                /**
                 * You have arrived. Your destination is on the right.
                 */
                ARRIVERIGHT = "ARRIVE_RIGHT",
                /**
                 * Leave.
                 */
                DEPART = "DEPART",
                /**
                 * Keep straight on.
                 */
                STRAIGHT = "STRAIGHT",
                /**
                 * Keep right.
                 */
                KEEPRIGHT = "KEEP_RIGHT",
                /**
                 * Bear right.
                 */
                BEARRIGHT = "BEAR_RIGHT",
                /**
                 * Turn right.
                 */
                TURNRIGHT = "TURN_RIGHT",
                /**
                 * Turn sharp right.
                 */
                SHARPRIGHT = "SHARP_RIGHT",
                /**
                 * Keep left.
                 */
                KEEPLEFT = "KEEP_LEFT",
                /**
                 * Bear left.
                 */
                BEARLEFT = "BEAR_LEFT",
                /**
                 * Turn left.
                 */
                TURNLEFT = "TURN_LEFT",
                /**
                 * Turn sharp left.
                 */
                SHARPLEFT = "SHARP_LEFT",
                /**
                 * Make a U-turn.
                 */
                MAKEUTURN = "MAKE_UTURN",
                /**
                 * Take the motorway.
                 */
                ENTERMOTORWAY = "ENTER_MOTORWAY",
                /**
                 * Take the freeway.
                 */
                ENTERFREEWAY = "ENTER_FREEWAY",
                /**
                 * Take the highway.
                 */
                ENTERHIGHWAY = "ENTER_HIGHWAY",
                /**
                 * Take the exit.
                 */
                TAKEEXIT = "TAKE_EXIT",
                /**
                 * Take the left exit.
                 */
                MOTORWAYEXITLEFT = "MOTORWAY_EXIT_LEFT",
                /**
                 * Take the right exit.
                 */
                MOTORWAYEXITRIGHT = "MOTORWAY_EXIT_RIGHT",
                /**
                 * Take the ferry.
                 */
                TAKEFERRY = "TAKE_FERRY",
                /**
                 * Cross the roundabout.
                 */
                ROUNDABOUTCROSS = "ROUNDABOUT_CROSS",
                /**
                 * At the roundabout take the exit on the right.
                 */
                ROUNDABOUTRIGHT = "ROUNDABOUT_RIGHT",
                /**
                 * At the roundabout take the exit on the left.
                 */
                ROUNDABOUTLEFT = "ROUNDABOUT_LEFT",
                /**
                 * Go around the roundabout.
                 */
                ROUNDABOUTBACK = "ROUNDABOUT_BACK",
                /**
                 * Try to make a U-turn.
                 */
                TRYMAKEUTURN = "TRY_MAKE_UTURN",
                /**
                 * Follow.
                 */
                FOLLOW = "FOLLOW",
                /**
                 * Switch to the parallel road.
                 */
                SWITCHPARALLELROAD = "SWITCH_PARALLEL_ROAD",
                /**
                 * Switch to the main road.
                 */
                SWITCHMAINROAD = "SWITCH_MAIN_ROAD",
                /**
                 * Take the ramp.
                 */
                ENTRANCERAMP = "ENTRANCE_RAMP",
                /**
                 * You have reached the waypoint. It is on the left.
                 */
                WAYPOINTLEFT = "WAYPOINT_LEFT",
                /**
                 * You have reached the waypoint. It is on the right.
                 */
                WAYPOINTRIGHT = "WAYPOINT_RIGHT",
                /**
                 * You have reached the waypoint.
                 */
                WAYPOINTREACHED = "WAYPOINT_REACHED"
            }
            /**
             * Defines values for TransitType.
             * Possible values include: 'Bus', 'CableCar', 'Ferry', 'Funicular', 'Gondola', 'Rail', 'Tram',
             * 'Subway'
             * @readonly
             * @enum {string}
             */
            export enum TransitType {
                /**
                 * bus
                 */
                Bus = "Bus",
                /**
                 * cableCar
                 */
                CableCar = "CableCar",
                /**
                 * ferry
                 */
                Ferry = "Ferry",
                /**
                 * funicular
                 */
                Funicular = "Funicular",
                /**
                 * gondola
                 */
                Gondola = "Gondola",
                /**
                 * rail
                 */
                Rail = "Rail",
                /**
                 * tram
                 */
                Tram = "Tram",
                /**
                 * subway
                 */
                Subway = "Subway"
            }
            /**
             * Defines values for LegType.
             * Possible values include: 'Walk', 'Bicycle', 'Tram', 'Subway', 'Rail', 'Bus', 'Ferry', 'Cable',
             * 'Gondola', 'Funicular', 'PathWayWalk', 'Wait', 'WaitOnVehicle'
             * @readonly
             * @enum {string}
             */
            export enum LegType {
                /**
                 * Pedestrian walk
                 */
                Walk = "Walk",
                /**
                 * Bicycle
                 */
                Bicycle = "Bicycle",
                /**
                 * Tram
                 */
                Tram = "Tram",
                /**
                 * Subway
                 */
                Subway = "Subway",
                /**
                 * Rail
                 */
                Rail = "Rail",
                /**
                 * Bus
                 */
                Bus = "Bus",
                /**
                 * Ferry
                 */
                Ferry = "Ferry",
                /**
                 * Cable Car
                 */
                Cable = "Cable",
                /**
                 * Gondola
                 */
                Gondola = "Gondola",
                /**
                 * Funicular
                 */
                Funicular = "Funicular",
                /**
                 * A Leg describing a walk within a compound, e.g. Central Station
                 */
                PathWayWalk = "PathWayWalk",
                /**
                 * A Leg describing a wait for the next public transit leg
                 */
                Wait = "Wait",
                /**
                 * It’s necessary to wait for the next leg on the same vehicle (i.e. the bus will only change its
                 * line number)
                 */
                WaitOnVehicle = "WaitOnVehicle"
            }
            /**
             * Defines values for RelativeDirection.
             * Possible values include: 'depart', 'hardLeft', 'left', 'slightlyLeft', 'continue',
             * 'slightlyRight', 'right', 'hardRight', 'circleClockwise', 'circleCounterclockwise', 'elevator',
             * 'uturnLeft', 'uturnRight'
             * @readonly
             * @enum {string}
             */
            export enum RelativeDirection {
                /**
                 * Leave
                 */
                Depart = "depart",
                /**
                 * Turn sharp left.
                 */
                HardLeft = "hardLeft",
                /**
                 * Turn left.
                 */
                Left = "left",
                /**
                 * Turn slightly left.
                 */
                SlightlyLeft = "slightlyLeft",
                /**
                 * Keep going.
                 */
                Continue = "continue",
                /**
                 * Turn slightly right.
                 */
                SlightlyRight = "slightlyRight",
                /**
                 * Turn right.
                 */
                Right = "right",
                /**
                 * Turn sharp right.
                 */
                HardRight = "hardRight",
                /**
                 * Circle clockwise.
                 */
                CircleClockwise = "circleClockwise",
                /**
                 * Circle counter clockwise.
                 */
                CircleCounterclockwise = "circleCounterclockwise",
                /**
                 * Take the elevator.
                 */
                Elevator = "elevator",
                /**
                 * Make a U-turn left.
                 */
                UturnLeft = "uturnLeft",
                /**
                 * Make a U-turn right.
                 */
                UturnRight = "uturnRight"
            }
            /**
             * Defines values for AbsoluteDirection.
             * Possible values include: 'north', 'northeast', 'east', 'southeast', 'south', 'southwest',
             * 'west', 'northwest'
             * @readonly
             * @enum {string}
             */
            export enum AbsoluteDirection {
                /**
                 * North
                 */
                North = "north",
                /**
                 * NorthEast
                 */
                Northeast = "northeast",
                /**
                 * East
                 */
                East = "east",
                /**
                 * SouthEast
                 */
                Southeast = "southeast",
                /**
                 * South
                 */
                South = "south",
                /**
                 * SouthWest
                 */
                Southwest = "southwest",
                /**
                 * West
                 */
                West = "west",
                /**
                 * NorthWest
                 */
                Northwest = "northwest"
            }
            /**
             * Defines values for ScheduleType.
             * Possible values include: 'scheduledTime', 'realTime'
             * @readonly
             * @enum {string}
             */
            export enum ScheduleType {
                /**
                 * Returned when estimated time of arrival is based on real-time data.
                 */
                ScheduledTime = "scheduledTime",
                /**
                 * Returned when estimated time of arrival is based on static data.
                 */
                RealTime = "realTime"
            }
            /**
             * Defines values for SearchIndexSet.
             * Possible values include: 'Addr', 'Geo', 'PAD', 'POI', 'Str', 'Xstr'
             * @readonly
             * @enum {string}
             */
            export enum SearchIndexSet {
                /**
                 * Address range interpolation
                 */
                Addr = "Addr",
                /**
                 * Geographies
                 */
                Geo = "Geo",
                /**
                 * Point Addresses
                 */
                PAD = "PAD",
                /**
                 * Points of interest
                 */
                POI = "POI",
                /**
                 * Streets
                 */
                Str = "Str",
                /**
                 * Cross Streets (Intersections)
                 */
                Xstr = "Xstr"
            }
            /**
             * Defines values for ConnectorSet.
             * Possible values include: 'StandardHouseholdCountrySpecific', 'IEC62196Type1',
             * 'IEC62196Type1CCS', 'IEC62196Type2CableAttached', 'IEC62196Type2Outlet', 'IEC62196Type2CCS',
             * 'IEC62196Type3', 'Chademo', 'IEC60309AC1PhaseBlue', 'IEC60309DCWhite', 'Tesla'
             * @readonly
             * @enum {string}
             */
            export enum ConnectorSet {
                /**
                 * These are the standard household connectors for a certain region. They are all AC single phase
                 * and the standard Voltage and standard Amperage.
                 *
                 * See also: [Plug & socket types - World
                 * Standards](https://www.worldstandards.eu/electricity/plugs-and-sockets)
                 */
                StandardHouseholdCountrySpecific = "StandardHouseholdCountrySpecific",
                /**
                 * Type 1 connector as defined in the IEC 62196-2 standard. Also called Yazaki after the original
                 * manufacturer or SAE J1772 after the standard that first published it. Mostly used in
                 * combination with 120V single phase or up to 240V single phase infrastructure.
                 */
                IEC62196Type1 = "IEC62196Type1",
                /**
                 * Type 1 based combo connector as defined in the IEC 62196-3 standard. The connector is based on
                 * the Type 1 connector – as defined in the IEC 62196-2 standard – with two additional direct
                 * current (DC) contacts to allow DC fast charging.
                 */
                IEC62196Type1CCS = "IEC62196Type1CCS",
                /**
                 * Type 2 connector as defined in the IEC 62196-2 standard. Provided as a cable and plug attached
                 * to the charging point
                 */
                IEC62196Type2CableAttached = "IEC62196Type2CableAttached",
                /**
                 * Type 2 connector as defined in the IEC 62196-2 standard. Provided as a socket set into the
                 * charging point.
                 */
                IEC62196Type2Outlet = "IEC62196Type2Outlet",
                /**
                 * Type 2 based combo connector as defined in the IEC 62196-3 standard. The connector is based on
                 * the Type 2 connector – as defined in the IEC 62196-2 standard – with two additional direct
                 * current (DC) contacts to allow DC fast charging.
                 */
                IEC62196Type2CCS = "IEC62196Type2CCS",
                /**
                 * Type 3 connector as defined in the IEC 62196-2 standard. Also called Scame after the original
                 * manufacturer. Mostly used in combination with up to 240V single phase or up to 420V three
                 * phase infrastructure.
                 */
                IEC62196Type3 = "IEC62196Type3",
                /**
                 * CHAdeMO connector named after an association formed by the Tokyo Electric Power Company and
                 * industrial partners. Because of this is is also known as the TEPCO's connector. It supports
                 * fast DC charging.
                 */
                Chademo = "Chademo",
                /**
                 * Industrial Blue connector is a connector defined in the IEC 60309 standard. It is sometime
                 * referred to as by some combination of the standard, the color and the fact that is a single
                 * phase connector. The connector usually has the "P+N+E, 6h" configuration.
                 */
                IEC60309AC1PhaseBlue = "IEC60309AC1PhaseBlue",
                /**
                 * Industrial White connector is a DC connector defined in the IEC 60309 standard.
                 */
                IEC60309DCWhite = "IEC60309DCWhite",
                /**
                 * The Tesla connector is the regionally specific Tesla Supercharger connector. I.e. it refers to
                 * either Tesla's proprietary connector, sometimes referred to as Tesla Port mostly limited to
                 * North America or the modified Type 2 (DC over Type 2) in Europe.
                 */
                Tesla = "Tesla"
            }
            /**
             * Defines values for OpeningHours.
             * Possible values include: 'nextSevenDays'
             * @readonly
             * @enum {string}
             */
            export enum OpeningHours {
                /**
                 * Shows the opening hours for next week, starting with the current day in the local time of the
                 * POI.
                 */
                NextSevenDays = "nextSevenDays"
            }
            /**
             * Defines values for VehicleLoadType.
             * Possible values include: 'USHazmatClass1', 'USHazmatClass2', 'USHazmatClass3', 'USHazmatClass4',
             * 'USHazmatClass5', 'USHazmatClass6', 'USHazmatClass7', 'USHazmatClass8', 'USHazmatClass9',
             * 'otherHazmatExplosive', 'otherHazmatGeneral', 'otherHazmatHarmfulToWater'
             * @readonly
             * @enum {string}
             */
            export enum VehicleLoadType {
                /**
                 * Explosives
                 */
                USHazmatClass1 = "USHazmatClass1",
                /**
                 * Compressed gas
                 */
                USHazmatClass2 = "USHazmatClass2",
                /**
                 * Flammable liquids
                 */
                USHazmatClass3 = "USHazmatClass3",
                /**
                 * Flammable solids
                 */
                USHazmatClass4 = "USHazmatClass4",
                /**
                 * Oxidizers
                 */
                USHazmatClass5 = "USHazmatClass5",
                /**
                 * Poisons
                 */
                USHazmatClass6 = "USHazmatClass6",
                /**
                 * Radioactive
                 */
                USHazmatClass7 = "USHazmatClass7",
                /**
                 * Corrosives
                 */
                USHazmatClass8 = "USHazmatClass8",
                /**
                 * Miscellaneous
                 */
                USHazmatClass9 = "USHazmatClass9",
                /**
                 * Explosives
                 */
                OtherHazmatExplosive = "otherHazmatExplosive",
                /**
                 * Miscellaneous
                 */
                OtherHazmatGeneral = "otherHazmatGeneral",
                /**
                 * Harmful to water
                 */
                OtherHazmatHarmfulToWater = "otherHazmatHarmfulToWater"
            }
            /**
             * Defines values for RouteType.
             * Possible values include: 'fastest', 'shortest', 'eco', 'thrilling'
             * @readonly
             * @enum {string}
             */
            export enum RouteType {
                /**
                 * The fastest route.
                 */
                Fastest = "fastest",
                /**
                 * The shortest route by distance.
                 */
                Shortest = "shortest",
                /**
                 * A route balanced by economy and speed.
                 */
                Eco = "eco",
                /**
                 * Includes interesting or challenging roads and uses as few motorways as possible. You can
                 * choose the level of turns included and also the degree of hilliness. See the hilliness and
                 * windingness parameters for how to set this. There is a limit of 900 km on routes planned with
                 * routeType=thrilling
                 */
                Thrilling = "thrilling"
            }
            /**
             * Defines values for Windingness.
             * Possible values include: 'low', 'normal', 'high'
             * @readonly
             * @enum {string}
             */
            export enum Windingness {
                /**
                 * low
                 */
                Low = "low",
                /**
                 * normal
                 */
                Normal = "normal",
                /**
                 * high
                 */
                High = "high"
            }
            /**
             * Defines values for Hilliness.
             * Possible values include: 'low', 'normal', 'high'
             * @readonly
             * @enum {string}
             */
            export enum Hilliness {
                /**
                 * low
                 */
                Low = "low",
                /**
                 * normal
                 */
                Normal = "normal",
                /**
                 * high
                 */
                High = "high"
            }
            /**
             * Defines values for TravelMode.
             * Possible values include: 'car', 'truck', 'taxi', 'bus', 'van', 'motorcycle', 'bicycle',
             * 'pedestrian'
             * @readonly
             * @enum {string}
             */
            export enum TravelMode {
                /**
                 * car
                 */
                Car = "car",
                /**
                 * truck
                 */
                Truck = "truck",
                /**
                 * taxi
                 */
                Taxi = "taxi",
                /**
                 * bus
                 */
                Bus = "bus",
                /**
                 * van
                 */
                Van = "van",
                /**
                 * motorcycle
                 */
                Motorcycle = "motorcycle",
                /**
                 * bicycle
                 */
                Bicycle = "bicycle",
                /**
                 * pedestrian
                 */
                Pedestrian = "pedestrian"
            }
            /**
             * Defines values for Avoid.
             * Possible values include: 'tollRoads', 'motorways', 'ferries', 'unpavedRoads', 'carpools',
             * 'alreadyUsedRoads', 'borderCrossings'
             * @readonly
             * @enum {string}
             */
            export enum Avoid {
                /**
                 * Avoids toll roads.
                 */
                TollRoads = "tollRoads",
                /**
                 * Avoids motorways
                 */
                Motorways = "motorways",
                /**
                 * Avoids ferries
                 */
                Ferries = "ferries",
                /**
                 * Avoids unpaved roads
                 */
                UnpavedRoads = "unpavedRoads",
                /**
                 * Avoids routes that require the use of carpool (HOV/High Occupancy Vehicle) lanes.
                 */
                Carpools = "carpools",
                /**
                 * Avoids using the same road multiple times. Most useful in conjunction with
                 * `routeType`=thrilling.
                 */
                AlreadyUsedRoads = "alreadyUsedRoads",
                /**
                 * Avoids border crossings in route calculation.
                 */
                BorderCrossings = "borderCrossings"
            }
            /**
             * Defines values for VehicleEngineType.
             * Possible values include: 'combustion', 'electric'
             * @readonly
             * @enum {string}
             */
            export enum VehicleEngineType {
                /**
                 * Internal combustion engine.
                 */
                Combustion = "combustion",
                /**
                 * Electric engine.
                 */
                Electric = "electric"
            }
            /**
             * Defines values for SectionType.
             * Possible values include: 'carTrain', 'country', 'ferry', 'motorway', 'pedestrian', 'tollRoad',
             * 'tollVignette', 'traffic', 'travelMode', 'tunnel'
             * @readonly
             * @enum {string}
             */
            export enum SectionType {
                /**
                 * Get sections if the route includes car trains.
                 */
                CarTrain = "carTrain",
                /**
                 * Countries the route has parts in.
                 */
                Country = "country",
                /**
                 * Get sections if the route includes ferries.
                 */
                Ferry = "ferry",
                /**
                 * Get sections if the route includes motorways.
                 */
                Motorway = "motorway",
                /**
                 * Get sections which are suited for pedestrians.
                 */
                Pedestrian = "pedestrian",
                /**
                 * Get sections which require a toll to be payed.
                 */
                TollRoad = "tollRoad",
                /**
                 * Get sections which require a toll vignette to be present.
                 */
                TollVignette = "tollVignette",
                /**
                 * Get sections which contain traffic information.
                 */
                Traffic = "traffic",
                /**
                 * Get sections in relation to the request parameter `travelMode`.
                 */
                TravelMode = "travelMode",
                /**
                 * Get sections if the route includes tunnels.
                 */
                Tunnel = "tunnel"
            }
            /**
             * Defines values for RouteRepresentation.
             * Possible values include: 'polyline', 'summaryOnly', 'none'
             * @readonly
             * @enum {string}
             */
            export enum RouteRepresentation {
                /**
                 * Includes route geometry in the response.
                 */
                Polyline = "polyline",
                /**
                 * Summary as per polyline but excluding the point geometry elements for the routes in the
                 * response.
                 */
                SummaryOnly = "summaryOnly",
                /**
                 * Includes only the optimized waypoint indices but does not include the route geometry in the
                 * response.
                 */
                None = "none"
            }
            /**
             * Defines values for ComputeTravelTimeFor.
             * Possible values include: 'none', 'all'
             * @readonly
             * @enum {string}
             */
            export enum ComputeTravelTimeFor {
                /**
                 * Does not compute additional travel times.
                 */
                None = "none",
                /**
                 * Computes travel times for all types of traffic information and specifies all results in the
                 * fields noTrafficTravelTimeInSeconds, historicTrafficTravelTimeInSeconds and
                 * liveTrafficIncidentsTravelTimeInSeconds being included in the summaries in the route response.
                 */
                All = "all"
            }
            /**
             * Defines values for AlternativeRouteType.
             * Possible values include: 'anyRoute', 'betterRoute'
             * @readonly
             * @enum {string}
             */
            export enum AlternativeRouteType {
                /**
                 * Allow any alternative route to be returned irrespective of how it compares to the reference
                 * route in terms of optimality.
                 */
                AnyRoute = "anyRoute",
                /**
                 * Return an alternative route only if it is better than the reference route according to the
                 * given planning criteria.
                 */
                BetterRoute = "betterRoute"
            }
            /**
             * Defines values for RouteInstructionsType.
             * Possible values include: 'coded', 'text', 'tagged'
             * @readonly
             * @enum {string}
             */
            export enum RouteInstructionsType {
                /**
                 * Returns raw instruction data without human-readable messages.
                 */
                Coded = "coded",
                /**
                 * Returns raw instructions data with human-readable messages in plain text.
                 */
                Text = "text",
                /**
                 * Returns raw instruction data with tagged human-readable messages to permit formatting.
                 */
                Tagged = "tagged"
            }
            /**
             * Defines values for TimezoneOptions.
             * Possible values include: 'none', 'zoneInfo', 'transitions', 'all'
             * @readonly
             * @enum {string}
             */
            export enum TimezoneOptions {
                /**
                 * Do not include zoneinfo or transitions in the result.
                 */
                None = "none",
                /**
                 * Include additional time zone info in the result.
                 */
                ZoneInfo = "zoneInfo",
                /**
                 * Include transition information in the result (The number of transitions is currently capped at
                 * 250).
                 */
                Transitions = "transitions",
                /**
                 * Include both zoneinfo and transitions in the result.
                 */
                All = "all"
            }
            /**
             * Defines values for TileFormat.
             * Possible values include: 'png', 'pbf'
             * @readonly
             * @enum {string}
             */
            export enum TileFormat {
                /**
                 * An image in the png format. Supports zoom levels 0 through 18.
                 */
                Png = "png",
                /**
                 * Vector graphic in the pbf format. Supports zoom levels 0 through 22.
                 */
                Pbf = "pbf"
            }
            /**
             * Defines values for GeofenceMode.
             * Possible values include: 'All', 'EnterAndExit'
             * @readonly
             * @enum {string}
             */
            export enum GeofenceMode {
                /**
                 * Publish all the query results to Azure Maps account event subscription.
                 */
                All = "All",
                /**
                 * Only publish result when user location is considered as crossing geofencing boarder.
                 */
                EnterAndExit = "EnterAndExit"
            }
            /**
             * Defines values for StaticMapLayer.
             * Possible values include: 'basic', 'hybrid', 'labels'
             * @readonly
             * @enum {string}
             */
            export enum StaticMapLayer {
                /**
                 * Returns an image containing all map features including polygons, borders, roads and labels.
                 */
                Basic = "basic",
                /**
                 * Returns an image containing borders, roads, and labels, and can be overlaid on other tiles
                 * (such as satellite imagery) to produce hybrid tiles.
                 */
                Hybrid = "hybrid",
                /**
                 * Returns an image of just the map's label information.
                 */
                Labels = "labels"
            }
            /**
             * Defines values for MapTileLayer.
             * Possible values include: 'basic', 'hybrid', 'labels', 'terra'
             * @readonly
             * @enum {string}
             */
            export enum MapTileLayer {
                /**
                 * Returns a tile containing all map features including polygons, borders, roads and labels.
                 */
                Basic = "basic",
                /**
                 * Returns a tile containing borders, roads, and labels, and can be overlaid on other tiles (such
                 * as satellite imagery) to produce hybrid tiles.
                 */
                Hybrid = "hybrid",
                /**
                 * Returns a tile of just the map's label information.
                 */
                Labels = "labels",
                /**
                 * Map canvas complete with shaded relief tiles. Zoom levels 0-6 (inclusive) are supported. Png
                 * is the only supported TileFormat and only available MapTileSize is 512.
                 */
                Terra = "terra"
            }
            /**
             * Defines values for MapTileStyle.
             * Possible values include: 'main', 'shaded_relief'
             * @readonly
             * @enum {string}
             */
            export enum MapTileStyle {
                /**
                 * Azure Maps main style
                 */
                Main = "main",
                /**
                 * Azure Maps main style completed with shaded relief. Supported by Layer terra.
                 */
                ShadedRelief = "shaded_relief"
            }
            /**
             * Defines values for MetroAreaQueryType.
             * Possible values include: 'position', 'countryCode'
             * @readonly
             * @enum {string}
             */
            export enum MetroAreaQueryType {
                /**
                 * The origin of the route as a comma separated string composed by latitude followed by longitude
                 * e.g. "47.641268,-122.125679".
                 */
                Position = "position",
                /**
                 * 2-character [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html) alpha-2 country
                 * code. E.g. US.
                 */
                CountryCode = "countryCode"
            }
            /**
             * Defines values for MetroAreaDetailType.
             * Possible values include: 'agencies', 'alerts', 'alertDetails', 'transitTypes'
             * @readonly
             * @enum {string}
             */
            export enum MetroAreaDetailType {
                /**
                 * Return a list of all public transit agencies operating in the given metro area.
                 */
                Agencies = "agencies",
                /**
                 * Returns a list of all active service alerts, that are defined in the metro or agency level,
                 * and are not connected to a specific line or stop.
                 */
                Alerts = "alerts",
                /**
                 * Applicable only when alerts are requested. Returns details of the alerts.
                 */
                AlertDetails = "alertDetails",
                /**
                 * Returns a list of all supported transit types in the given metro area.
                 */
                TransitTypes = "transitTypes"
            }
            /**
             * Defines values for ObjectType.
             * Possible values include: 'stop', 'docklessBike', 'docklessElectricBike',
             * 'docklessElectricScooter', 'docklessScooter', 'docklessMoped', 'carShare', 'docklessVehicle',
             * 'bikeDock'
             * @readonly
             * @enum {string}
             */
            export enum ObjectType {
                /**
                 * Stop
                 */
                Stop = "stop",
                /**
                 * Dockless bike
                 */
                DocklessBike = "docklessBike",
                /**
                 * Dockless electric bike
                 */
                DocklessElectricBike = "docklessElectricBike",
                /**
                 * Dockless electric scooter
                 */
                DocklessElectricScooter = "docklessElectricScooter",
                /**
                 * Dockless scooter
                 */
                DocklessScooter = "docklessScooter",
                /**
                 * Dockless moped
                 */
                DocklessMoped = "docklessMoped",
                /**
                 * Car Share
                 */
                CarShare = "carShare",
                /**
                 * Dockless Vehicle
                 */
                DocklessVehicle = "docklessVehicle",
                /**
                 * Docked Bike
                 */
                BikeDock = "bikeDock"
            }
            /**
             * Defines values for TransitLineDetailType.
             * Possible values include: 'alerts', 'alertDetails', 'lines', 'stops', 'schedule', 'patterns'
             * @readonly
             * @enum {string}
             */
            export enum TransitLineDetailType {
                /**
                 * Return any active service alerts for the specified stop. Response provides brief information
                 * for disruption in service and all basic data associated with the alert.
                 */
                Alerts = "alerts",
                /**
                 * Can only be used in conjunction with detailType=alerts.Return additional details associated
                 * with the active service alerts.
                 */
                AlertDetails = "alertDetails",
                /**
                 * Return transit lines that stops at the specified stop.
                 */
                Lines = "lines",
                /**
                 * Return list of stops the line group goes through.
                 */
                Stops = "stops",
                /**
                 * Return a 24h static schedule for the specified line group from the current time of the day to
                 * the end of the current day. Data is guaranteed to be returned only between the current day and
                 * 3 days forward.
                 */
                Schedule = "schedule",
                /**
                 * Return list of patterns this group is comprised of. A pattern consists of a stop sequence and
                 * shape per line.
                 */
                Patterns = "patterns"
            }
            /**
             * Defines values for TransitStopQueryType.
             * Possible values include: 'stopId', 'stopKey'
             * @readonly
             * @enum {string}
             */
            export enum TransitStopQueryType {
                /**
                 * The unique Azure Maps identifier for the respective public transit stop. When referring stops
                 * overtime, it is suggested to use stopId that will not change if the physical stop exists.
                 */
                StopId = "stopId",
                /**
                 * The GTFS stop Id. GTFS stop Ids are provided by the transit authority and are subject to
                 * change.
                 */
                StopKey = "stopKey"
            }
            /**
             * Defines values for TransitStopDetailType.
             * Possible values include: 'alerts', 'alertDetails', 'lines', 'lineGroups'
             * @readonly
             * @enum {string}
             */
            export enum TransitStopDetailType {
                /**
                 * Return any active service alerts for the specified stop. Response provides brief information
                 * for disruption in service and all basic data associated with the alert.
                 */
                Alerts = "alerts",
                /**
                 * Can only be used in conjunction with detailType=alerts.Return additional details associated
                 * with the active service alerts.
                 */
                AlertDetails = "alertDetails",
                /**
                 * Return transit lines that stops at the specified stop.
                 */
                Lines = "lines",
                /**
                 * Return line groups that stops at the specified stop.
                 */
                LineGroups = "lineGroups"
            }
            /**
             * Defines values for OriginType.
             * Possible values include: 'position', 'stopId', 'stopKey'
             * @readonly
             * @enum {string}
             */
            export enum OriginType {
                /**
                 * The origin of the route as a comma separated string composed by latitude followed by longitude
                 * e.g. "47.641268,-122.125679".
                 */
                Position = "position",
                /**
                 * The unique Azure Maps identifier for the respective public transit stop. When referring stops
                 * overtime, it is suggested to use stopId that will not change if the physical stop exists.
                 */
                StopId = "stopId",
                /**
                 * The GTFS stop Id. GTFS stop Ids are provided by the transit authority and are subject to
                 * change.
                 */
                StopKey = "stopKey"
            }
            /**
             * Defines values for DestinationType.
             * Possible values include: 'position', 'stopId', 'stopKey'
             * @readonly
             * @enum {string}
             */
            export enum DestinationType {
                /**
                 * The destination of the route as a comma separated string composed by latitude followed by
                 * longitude e.g. "47.641268,-122.125679".
                 */
                Position = "position",
                /**
                 * The unique Azure Maps identifier for the respective public transit stop. When referring stops
                 * overtime, it is suggested to use stopId that will not change if the physical stop exists.
                 */
                StopId = "stopId",
                /**
                 * The GTFS stop Id. GTFS stop Ids are provided by the transit authority and are subject to
                 * change.
                 */
                StopKey = "stopKey"
            }
            /**
             * Defines values for ModeType.
             * Possible values include: 'walk', 'bike', 'publicTransit'
             * @readonly
             * @enum {string}
             */
            export enum ModeType {
                /**
                 * walk (pedestrian)
                 */
                Walk = "walk",
                /**
                 * bike
                 */
                Bike = "bike",
                /**
                 * public transit
                 */
                PublicTransit = "publicTransit"
            }
            /**
             * Defines values for TransitTypeFilter.
             * Possible values include: 'bus', 'cableCar', 'ferry', 'funicular', 'gondola', 'rail', 'tram',
             * 'subway'
             * @readonly
             * @enum {string}
             */
            export enum TransitTypeFilter {
                /**
                 * bus
                 */
                Bus = "bus",
                /**
                 * cableCar
                 */
                CableCar = "cableCar",
                /**
                 * ferry
                 */
                Ferry = "ferry",
                /**
                 * funicular
                 */
                Funicular = "funicular",
                /**
                 * gondola
                 */
                Gondola = "gondola",
                /**
                 * rail
                 */
                Rail = "rail",
                /**
                 * tram
                 */
                Tram = "tram",
                /**
                 * subway
                 */
                Subway = "subway"
            }
            /**
             * Defines values for AgencyType.
             * Possible values include: 'agencyId', 'agencyKey', 'agencyName'
             * @readonly
             * @enum {string}
             */
            export enum AgencyType {
                /**
                 * The Id of the transit agency, e.g. '5872'
                 */
                AgencyId = "agencyId",
                /**
                 * The agency’s GTFS Id.
                 */
                AgencyKey = "agencyKey",
                /**
                 * The name of the transit agency, e.g. Metro Transit.
                 */
                AgencyName = "agencyName"
            }
            /**
             * Defines values for TimeType.
             * Possible values include: 'arrival', 'departure', 'last'
             * @readonly
             * @enum {string}
             */
            export enum TimeType {
                /**
                 * arrival at the destination point. Requires that 'time' value must be in the future.
                 */
                Arrival = "arrival",
                /**
                 * Request departure at the destination point. Requires that 'time' value must be now or in the
                 * future.
                 */
                Departure = "departure",
                /**
                 * Request the last lines for the day.
                 */
                Last = "last"
            }
            /**
             * Defines values for TransitRouteType.
             * Possible values include: 'optimal', 'leastWalk', 'leastTransfers'
             * @readonly
             * @enum {string}
             */
            export enum TransitRouteType {
                /**
                 * The best optimal route.
                 */
                Optimal = "optimal",
                /**
                 * Route with least walk.
                 */
                LeastWalk = "leastWalk",
                /**
                 * Route with least transfers.
                 */
                LeastTransfers = "leastTransfers"
            }
            /**
             * Defines values for BikeType.
             * Possible values include: 'privateBike', 'dockedBike'
             * @readonly
             * @enum {string}
             */
            export enum BikeType {
                /**
                 * Use private bike.
                 */
                PrivateBike = "privateBike",
                /**
                 * Use docked bike share bike.
                 */
                DockedBike = "dockedBike"
            }
            /**
             * Defines values for TransitItineraryDetailType.
             * Possible values include: 'geometry', 'schedule'
             * @readonly
             * @enum {string}
             */
            export enum TransitItineraryDetailType {
                /**
                 * Shape of an in GeoJSON format. For public transit legs will return also the stops that the leg
                 * passes through. For walk and bike legs, will return also the turn-by-turn navigation data.
                 */
                Geometry = "geometry",
                /**
                 * Static schedule data as to all departures of Public Transit legs from the current time of the
                 * day to the end of the current day. Data is guaranteed to be returned only between the current
                 * day and 3 days forward.
                 */
                Schedule = "schedule"
            }
            /**
             * Defines values for RealTimeArrivalsQueryType.
             * Possible values include: 'stops', 'line', 'lineAndStop', 'position'
             * @readonly
             * @enum {string}
             */
            export enum RealTimeArrivalsQueryType {
                /**
                 * One or multiple stops as a comma separated list. Returns the requested number of live arrivals
                 * for all lines arriving at the specified stop. Defined by parameter stopQueryType.
                 */
                Stops = "stops",
                /**
                 * Returns the next live arrival times for each stop within the specified line. lineId, for
                 * example, '3785742'.
                 */
                Line = "line",
                /**
                 * Returns up to three next Live Arrival times for a given line at a given stop. Comma-separated
                 * list including lineId and stop identifier, for example, 1228526,14014071 (lineId,stopId).
                 */
                LineAndStop = "lineAndStop",
                /**
                 * Returns arrivals of a line to stops near the user’s location. The applicable location query
                 * specified as a comma separated string composed by latitude followed by longitude e.g.
                 * "47.641268,-122.125679".
                 */
                Position = "position"
            }
            /**
             * Defines values for StopQueryType.
             * Possible values include: 'stopId', 'stopKey'
             * @readonly
             * @enum {string}
             */
            export enum StopQueryType {
                /**
                 * The unique identifier for the respective public transit stop. When referring stops overtime,
                 * it is suggested to use stopId that will not change if the physical stop exists.
                 */
                StopId = "stopId",
                /**
                 * The GTFS stop Id. GTFS stop Ids are provided by the transit authority and are subject to
                 * change.
                 */
                StopKey = "stopKey"
            }
            /**
             * Defines values for Type.
             * Possible values include: 'main', 'minor'
             * @readonly
             * @enum {string}
             */
            export enum Type {
                Main = "main",
                Minor = "minor"
            }
            /**
             * Defines values for Style.
             * Possible values include: 'main'
             * @readonly
             * @enum {string}
             */
            export enum Style {
                Main = "main"
            }
            /**
             * Defines values for Text.
             * Possible values include: 'yes', 'no'
             * @readonly
             * @enum {string}
             */
            export enum Text {
                Yes = "yes",
                No = "no"
            }
            /**
             * Defines values for Text1.
             * Possible values include: 'yes', 'no'
             * @readonly
             * @enum {string}
             */
            export enum Text1 {
                Yes = "yes",
                No = "no"
            }
            /**
             * Defines values for Text2.
             * Possible values include: 'yes', 'no'
             * @readonly
             * @enum {string}
             */
            export enum Text2 {
                Yes = "yes",
                No = "no"
            }
            /**
             * Contains response data for the getSearchPolygon operation.
             */
            export type SearchGetSearchPolygonResponse = SearchPolygonResponse;
            /**
             * Contains response data for the getSearchFuzzy operation.
             */
            export type SearchGetSearchFuzzyResponse = SearchFuzzyResponse;
            /**
             * Contains response data for the getSearchPOI operation.
             */
            export type SearchGetSearchPOIResponse = SearchPoiResponse;
            /**
             * Contains response data for the getSearchNearby operation.
             */
            export type SearchGetSearchNearbyResponse = SearchNearbyResponse;
            /**
             * Contains response data for the getSearchPOICategory operation.
             */
            export type SearchGetSearchPOICategoryResponse = SearchPoiCategoryResponse;
            /**
             * Contains response data for the getSearchAddress operation.
             */
            export type SearchGetSearchAddressResponse = SearchAddressResponse;
            /**
             * Contains response data for the getSearchAddressReverse operation.
             */
            export type SearchGetSearchAddressReverseResponse = SearchAddressReverseResponse;
            /**
             * Contains response data for the getSearchAddressReverseCrossStreet operation.
             */
            export type SearchGetSearchAddressReverseCrossStreetResponse = SearchAddressReverseCrossStreetResponse;
            /**
             * Contains response data for the getSearchAddressStructured operation.
             */
            export type SearchGetSearchAddressStructuredResponse = SearchAddressStructuredResponse;
            /**
             * Contains response data for the postSearchInsideGeometry operation.
             */
            export type SearchPostSearchInsideGeometryResponse = SearchGeometryResponse;
            /**
             * Contains response data for the postSearchAlongRoute operation.
             */
            export type SearchPostSearchAlongRouteResponse = SearchAlongRouteResponse;
            /**
             * Contains response data for the postSearchFuzzyBatchPreview operation.
             */
            export type SearchPostSearchFuzzyBatchPreviewResponse = BatchResponse & SearchPostSearchFuzzyBatchPreviewHeaders;
            /**
             * Contains response data for the postSearchAddressBatchPreview operation.
             */
            export type SearchPostSearchAddressBatchPreviewResponse = BatchResponse & SearchPostSearchAddressBatchPreviewHeaders;
            /**
             * Contains response data for the postSearchAddressReverseBatchPreview operation.
             */
            export type SearchPostSearchAddressReverseBatchPreviewResponse = BatchResponse & SearchPostSearchAddressReverseBatchPreviewHeaders;
            /**
             * Contains response data for the postRouteMatrixPreview operation.
             */
            export type RoutePostRouteMatrixPreviewResponse = RouteMatrixResponse & RoutePostRouteMatrixPreviewHeaders;
            /**
             * Contains response data for the getRouteDirections operation.
             */
            export type RouteGetRouteDirectionsResponse = RouteDirectionsResponse;
            /**
             * Contains response data for the postRouteDirections operation.
             */
            export type RoutePostRouteDirectionsResponse = RouteDirectionsResponse;
            /**
             * Contains response data for the getRouteRange operation.
             */
            export type RouteGetRouteRangeResponse = RouteRangeResponse;
            /**
             * Contains response data for the postRouteDirectionsBatchPreview operation.
             */
            export type RoutePostRouteDirectionsBatchPreviewResponse = BatchResponse & RoutePostRouteDirectionsBatchPreviewHeaders;
            /**
             * Contains response data for the getTimezoneByID operation.
             */
            export type TimezoneGetTimezoneByIDResponse = TimezoneByIdResult;
            /**
             * Contains response data for the getTimezoneByCoordinates operation.
             */
            export type TimezoneGetTimezoneByCoordinatesResponse = TimezoneByCoordinatesResult;
            /**
             * Contains response data for the getTimezoneEnumWindows operation.
             */
            export type TimezoneGetTimezoneEnumWindowsResponse = Array<TimezoneEnumWindow>;
            /**
             * Contains response data for the getTimezoneEnumIANA operation.
             */
            export type TimezoneGetTimezoneEnumIANAResponse = Array<IanaId>;
            /**
             * Contains response data for the getTimezoneIANAVersion operation.
             */
            export type TimezoneGetTimezoneIANAVersionResponse = TimezoneIanaVersionResult;
            /**
             * Contains response data for the getTimezoneWindowsToIANA operation.
             */
            export type TimezoneGetTimezoneWindowsToIANAResponse = Array<IanaId>;
            /**
             * Contains response data for the getMapImage operation.
             */
            export type RenderGetMapImageResponse = {
                /**
                 * BROWSER ONLY
                 *
                 * The response body as a browser Blob.
                 * Always undefined in node.js.
                 */
                blobBody?: Promise<Blob>
            };
            /**
             * Contains response data for the getMapTile operation.
             */
            export type RenderGetMapTileResponse = {
                /**
                 * BROWSER ONLY
                 *
                 * The response body as a browser Blob.
                 * Always undefined in node.js.
                 */
                blobBody?: Promise<Blob>
            };
            /**
             * Contains response data for the getCopyrightCaption operation.
             */
            export type RenderGetCopyrightCaptionResponse = CopyrightCaptionResult;
            /**
             * Contains response data for the getMapImageryTile operation.
             */
            export type RenderGetMapImageryTileResponse = {
                /**
                 * BROWSER ONLY
                 *
                 * The response body as a browser Blob.
                 * Always undefined in node.js.
                 */
                blobBody?: Promise<Blob>
            };
            /**
             * Contains response data for the getCopyrightFromBoundingBox operation.
             */
            export type RenderGetCopyrightFromBoundingBoxResponse = CopyrightBoundingResult;
            /**
             * Contains response data for the getCopyrightForTile operation.
             */
            export type RenderGetCopyrightForTileResponse = CopyrightTileResult;
            /**
             * Contains response data for the getCopyrightForWorld operation.
             */
            export type RenderGetCopyrightForWorldResponse = CopyrightWorldResult;
            /**
             * Contains response data for the getMetroAreaPreview operation.
             */
            export type MobilityGetMetroAreaPreviewResponse = MetroAreaResponse;
            /**
             * Contains response data for the getMetroAreaInfoPreview operation.
             */
            export type MobilityGetMetroAreaInfoPreviewResponse = MetroAreaInfoResponse;
            /**
             * Contains response data for the getNearbyTransitPreview operation.
             */
            export type MobilityGetNearbyTransitPreviewResponse = NearbyTransitResponse;
            /**
             * Contains response data for the getTransitDockInfoPreview operation.
             */
            export type MobilityGetTransitDockInfoPreviewResponse = TransitDockInfoResponse;
            /**
             * Contains response data for the getCarShareInfoPreview operation.
             */
            export type MobilityGetCarShareInfoPreviewResponse = CarShareResponse;
            /**
             * Contains response data for the getTransitLineInfoPreview operation.
             */
            export type MobilityGetTransitLineInfoPreviewResponse = TransitLineInfoResponse;
            /**
             * Contains response data for the getTransitStopInfoPreview operation.
             */
            export type MobilityGetTransitStopInfoPreviewResponse = TransitStopInfoResponse;
            /**
             * Contains response data for the getTransitRoutePreview operation.
             */
            export type MobilityGetTransitRoutePreviewResponse = TransitRouteResponse;
            /**
             * Contains response data for the getTransitItineraryPreview operation.
             */
            export type MobilityGetTransitItineraryPreviewResponse = TransitItineraryResponse;
            /**
             * Contains response data for the getRealTimeArrivalsPreview operation.
             */
            export type MobilityGetRealTimeArrivalsPreviewResponse = RealTimeArrivalsResponse;
            /**
             * Contains response data for the getGeofence operation.
             */
            export type SpatialGetGeofenceResponse = GeofenceResponse & SpatialGetGeofenceHeaders;
            /**
             * Contains response data for the postGeofence operation.
             */
            export type SpatialPostGeofenceResponse = GeofenceResponse & SpatialPostGeofenceHeaders;
            /**
             * Contains response data for the postBuffer operation.
             */
            export type SpatialPostBufferResponse = BufferResponse;
            /**
             * Contains response data for the getBuffer operation.
             */
            export type SpatialGetBufferResponse = BufferResponse;
            /**
             * Contains response data for the postClosestPoint operation.
             */
            export type SpatialPostClosestPointResponse = PostClosestPointResponse;
            /**
             * Contains response data for the getClosestPoint operation.
             */
            export type SpatialGetClosestPointResponse = GetClosestPointResponse;
            /**
             * Contains response data for the postPointInPolygon operation.
             */
            export type SpatialPostPointInPolygonResponse = PostPointInPolygonResponse;
            /**
             * Contains response data for the getPointInPolygon operation.
             */
            export type SpatialGetPointInPolygonResponse = GetPointInPolygonResponse;
            /**
             * Contains response data for the getGreatCircleDistance operation.
             */
            export type SpatialGetGreatCircleDistanceResponse = GreatCircleDistanceResponse;
        }

        module msRest {
            export interface AbortSignalLike {
                readonly aborted: boolean;
                addEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
                removeEventListener(type: "abort", listener: (this: AbortSignalLike, ev: any) => any, options?: any): void;
            }

            export type RequestPolicyFactory = {
                create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPolicy
            };

            export interface RequestPolicy {
                sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
            }

            export interface HttpResponse {
                /**
                 * The raw request
                 */
                request: WebResource;

                /**
                 * The HTTP response status (e.g. 200)
                 */
                status: number;

                /**
                 * The HTTP response headers.
                 */
                headers: HttpHeaders;
            }

            export interface HttpOperationResponse extends HttpResponse {
                /**
                 * The parsed HTTP response headers.
                 */
                parsedHeaders?: { [key: string]: any };

                /**
                 * The response body as text (string format)
                 */
                bodyAsText?: string | null;

                /**
                 * The response body as parsed JSON or XML
                 */
                parsedBody?: any;

                /**
                 * BROWSER ONLY
                 *
                 * The response body as a browser Blob.
                 * Always undefined in node.js.
                 */
                blobBody?: Promise<Blob>;
            }

            /**
             * The flattened response to a REST call.
             * Contains the underlying HttpOperationResponse as well as
             * the merged properties of the parsedBody, parsedHeaders, etc.
             */
            export interface RestResponse {

                [key: string]: any;
            }

            export type HttpMethods = "GET" | "PUT" | "POST" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS" | "TRACE";
            export type HttpRequestBody = Blob | string | ArrayBuffer | ArrayBufferView;

            /**
             * Fired in response to upload or download progress.
             */
            export type TransferProgressEvent = {
                /**
                 * The number of bytes loaded so far.
                 */
                loadedBytes: number
            };

            export interface RequestPrepareOptions {
                /**
                 * The HTTP request method. Valid values are "GET", "PUT", "HEAD", "DELETE", "OPTIONS", "POST",
                 * or "PATCH".
                 */
                method: HttpMethods;
                /**
                 * The request url. It may or may not have query parameters in it. Either provide the "url" or
                 * provide the "pathTemplate" in the options object. Both the options are mutually exclusive.
                 */
                url?: string;
                /**
                 * A dictionary of query parameters to be appended to the url, where
                 * the "key" is the "query-parameter-name" and the "value" is the "query-parameter-value".
                 * The "query-parameter-value" can be of type "string" or it can be of type "object".
                 * The "object" format should be used when you want to skip url encoding. While using the object format,
                 * the object must have a property named value which provides the "query-parameter-value".
                 * Example:
                 *    - query-parameter-value in "object" format: { "query-parameter-name": { value: "query-parameter-value", skipUrlEncoding: true } }
                 *    - query-parameter-value in "string" format: { "query-parameter-name": "query-parameter-value"}.
                 * Note: "If options.url already has some query parameters, then the value provided in options.queryParameters will be appended to the url.
                 */
                queryParameters?: { [key: string]: any | ParameterValue };
                /**
                 * The path template of the request url. Either provide the "url" or provide the "pathTemplate" in
                 * the options object. Both the options are mutually exclusive.
                 * Example: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Storage/storageAccounts/{accountName}"
                 */
                pathTemplate?: string;
                /**
                 * The base url of the request. Default value is: "https://management.azure.com". This is
                 * applicable only with pathTemplate. If you are providing options.url then it is expected that
                 * you provide the complete url.
                 */
                baseUrl?: string;
                /**
                 * A dictionary of path parameters that need to be replaced with actual values in the pathTemplate.
                 * Here the key is the "path-parameter-name" and the value is the "path-parameter-value".
                 * The "path-parameter-value" can be of type "string"  or it can be of type "object".
                 * The "object" format should be used when you want to skip url encoding. While using the object format,
                 * the object must have a property named value which provides the "path-parameter-value".
                 * Example:
                 *    - path-parameter-value in "object" format: { "path-parameter-name": { value: "path-parameter-value", skipUrlEncoding: true } }
                 *    - path-parameter-value in "string" format: { "path-parameter-name": "path-parameter-value" }.
                 */
                pathParameters?: { [key: string]: any | ParameterValue };
                formData?: { [key: string]: any };
                /**
                 * A dictionary of request headers that need to be applied to the request.
                 * Here the key is the "header-name" and the value is the "header-value". The header-value MUST be of type string.
                 *  - ContentType must be provided with the key name as "Content-Type". Default value "application/json; charset=utf-8".
                 *  - "Transfer-Encoding" is set to "chunked" by default if "options.bodyIsStream" is set to true.
                 *  - "Content-Type" is set to "application/octet-stream" by default if "options.bodyIsStream" is set to true.
                 *  - "accept-language" by default is set to "en-US"
                 *  - "x-ms-client-request-id" by default is set to a new Guid. To not generate a guid for the request, please set options.disableClientRequestId to true
                 */
                headers?: { [key: string]: any };
                /**
                 * When set to true, instructs the client to not set "x-ms-client-request-id" header to a new Guid().
                 */
                disableClientRequestId?: boolean;
                /**
                 * The request body. It can be of any type. This value will be serialized if it is not a stream.
                 */
                body?: any;
                /**
                 * A dictionary of mappers that may be used while [de]serialization.
                 */
                mappers?: { [x: string]: any };
                /**
                 * Provides information on how to deserialize the response body.
                 */
                deserializationMapper?: object;
                /**
                 * Indicates whether this method should JSON.stringify() the request body. Default value: false.
                 */
                disableJsonStringifyOnBody?: boolean;
                /**
                 * Indicates whether the request body is a stream (useful for file upload scenarios).
                 */
                bodyIsStream?: boolean;
                abortSignal?: AbortSignalLike;
                onUploadProgress?: (progress: TransferProgressEvent) => void;
                onDownloadProgress?: (progress: TransferProgressEvent) => void;
            }

            /**
             * The Parameter value provided for path or query parameters in RequestPrepareOptions
             */
            export interface ParameterValue {
                value: any;
                skipUrlEncoding: boolean;
                [key: string]: any;
            }

            /**
             * Describes the base structure of the options object that will be used in every operation.
             */
            export interface RequestOptionsBase {
                /**
                 * @property {object} [customHeaders] User defined custom request headers that
                 * will be applied before the request is sent.
                 */
                customHeaders?: { [key: string]: string };

                /**
                 * The signal which can be used to abort requests.
                 */
                abortSignal?: AbortSignalLike;

                /**
                 * The number of milliseconds a request can take before automatically being terminated.
                 */
                timeout?: number;

                /**
                 * Callback which fires upon upload progress.
                 */
                onUploadProgress?: (progress: TransferProgressEvent) => void;

                /**
                 * Callback which fires upon download progress.
                 */
                onDownloadProgress?: (progress: TransferProgressEvent) => void;

                [key: string]: any;
            }


            export interface RequestPolicy {
                sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
            }

            export abstract class BaseRequestPolicy implements RequestPolicy {
                protected constructor(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions);

                public abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;

                /**
                 * Get whether or not a log with the provided log level should be logged.
                 * @param logLevel The log level of the log that will be logged.
                 * @returns Whether or not a log with the provided log level should be logged.
                 */
                public shouldLog(logLevel: HttpPipelineLogLevel): boolean;

                /**
                 * Attempt to log the provided message to the provided logger. If no logger was provided or if
                 * the log level does not meat the logger's threshold, then nothing will be logged.
                 * @param logLevel The log level of this log.
                 * @param message The message of this log.
                 */
                public log(logLevel: HttpPipelineLogLevel, message: string): void;
            }

            /**
             * Optional properties that can be used when creating a RequestPolicy.
             */
            export class RequestPolicyOptions {
                constructor(_);

                /**
                 * Get whether or not a log with the provided log level should be logged.
                 * @param logLevel The log level of the log that will be logged.
                 * @returns Whether or not a log with the provided log level should be logged.
                 */
                public shouldLog(logLevel: HttpPipelineLogLevel): boolean;

                /**
                 * Attempt to log the provided message to the provided logger. If no logger was provided or if
                 * the log level does not meat the logger's threshold, then nothing will be logged.
                 * @param logLevel The log level of this log.
                 * @param message The message of this log.
                 */
                public log(logLevel: HttpPipelineLogLevel, message: string): void;
            }

            export class WebResource {
                url: string;
                method: HttpMethods;
                body?: any;
                headers: HttpHeaders;
                /**
                 * Whether or not the body of the HttpOperationResponse should be treated as a stream.
                 */
                streamResponseBody?: boolean;
                /**
                 * Whether or not the HttpOperationResponse should be deserialized. If this is undefined, then the
                 * HttpOperationResponse should be deserialized.
                 */
                shouldDeserialize?: boolean | ((response: HttpOperationResponse) => boolean);
                /**
                 * A function that returns the proper OperationResponse for the given OperationSpec and
                 * HttpOperationResponse combination. If this is undefined, then a simple status code lookup will
                 * be used.
                 */
                operationResponseGetter?: (operationSpec: any, response: HttpOperationResponse) => (undefined | any);
                formData?: any;
                query?: { [key: string]: any; };
                operationSpec?: any;
                withCredentials: boolean;
                timeout: number;
                proxySettings?: any;

                abortSignal?: AbortSignalLike;

                /** Callback which fires upon upload progress. */
                onUploadProgress?: (progress: TransferProgressEvent) => void;

                /** Callback which fires upon download progress. */
                onDownloadProgress?: (progress: TransferProgressEvent) => void;

                constructor(
                    url?: string,
                    method?: HttpMethods,
                    body?: any,
                    query?: { [key: string]: any; },
                    headers?: { [key: string]: any; } | HttpHeaders,
                    streamResponseBody?: boolean,
                    withCredentials?: boolean,
                    abortSignal?: AbortSignalLike,
                    timeout?: number,
                    onUploadProgress?: (progress: TransferProgressEvent) => void,
                    onDownloadProgress?: (progress: TransferProgressEvent) => void,
                    proxySettings?: any);

                /**
                 * Validates that the required properties such as method, url, headers["Content-Type"],
                 * headers["accept-language"] are defined. It will throw an error if one of the above
                 * mentioned properties are not defined.
                 */
                validateRequestProperties(): void;

                /**
                 * Prepares the request.
                 * @param {RequestPrepareOptions} options Options to provide for preparing the request.
                 * @returns {WebResource} Returns the prepared WebResource (HTTP Request) object that needs to be given to the request pipeline.
                 */
                prepare(options: RequestPrepareOptions): WebResource;

                /**
                 * Clone this WebResource HTTP request object.
                 * @returns {WebResource} The clone of this WebResource HTTP request object.
                 */
                clone(): WebResource;
            }

            export interface HttpPipelineLogger {
                /**
                 * The log level threshold for what logs will be logged.
                 */
                minimumLogLevel: HttpPipelineLogLevel;

                /**
                 * Log the provided message.
                 * @param logLevel The HttpLogDetailLevel associated with this message.
                 * @param message The message to log.
                 */
                log(logLevel: HttpPipelineLogLevel, message: string): void;
            }

            /**
 * An individual header within a HttpHeaders collection.
 */
            export interface HttpHeader {
                /**
                 * The name of the header.
                 */
                name: string;

                /**
                 * The value of the header.
                 */
                value: string;
            }

            /**
             * A HttpHeaders collection represented as a simple JSON object.
             */
            export type RawHttpHeaders = { [headerName: string]: string };

            /**
             * A collection of HTTP header key/value pairs.
             */
            export class HttpHeaders {
                private readonly _headersMap: { [headerKey: string]: HttpHeader };

                constructor(rawHeaders?: RawHttpHeaders);

                /**
                 * Set a header in this collection with the provided name and value. The name is
                 * case-insensitive.
                 * @param headerName The name of the header to set. This value is case-insensitive.
                 * @param headerValue The value of the header to set.
                 */
                public set(headerName: string, headerValue: string | number): void;

                /**
                 * Get the header value for the provided header name, or undefined if no header exists in this
                 * collection with the provided name.
                 * @param headerName The name of the header.
                 */
                public get(headerName: string): string | undefined;

                /**
                 * Get whether or not this header collection contains a header entry for the provided header name.
                 */
                public contains(headerName: string): boolean;

                /**
                 * Remove the header with the provided headerName. Return whether or not the header existed and
                 * was removed.
                 * @param headerName The name of the header to remove.
                 */
                public remove(headerName: string): boolean;

                /**
                 * Get the headers that are contained this collection as an object.
                 */
                public rawHeaders(): RawHttpHeaders;

                /**
                 * Get the headers that are contained in this collection as an array.
                 */
                public headersArray(): HttpHeader[];

                /**
                 * Get the header names that are contained in this collection.
                 */
                public headerNames(): string[];

                /**
                 * Get the header names that are contained in this collection.
                 */
                public headerValues(): string[];

                /**
                 * Get the JSON object representation of this HTTP header collection.
                 */
                public toJson(): RawHttpHeaders;

                /**
                 * Get the string representation of this HTTP header collection.
                 */
                public toString(): string;

                /**
                 * Create a deep clone/copy of this HttpHeaders collection.
                 */
                public clone(): HttpHeaders;
            }
                        
            export enum HttpPipelineLogLevel {
                /**
                 * A log level that indicates that no logs will be logged.
                 */
                OFF,

                /**
                 * An error log.
                 */
                ERROR,

                /**
                 * A warning log.
                 */
                WARNING,

                /**
                 * An information log.
                 */
                INFO
            }

            export interface HttpClient extends RequestPolicy {
            }
        }
    }
}