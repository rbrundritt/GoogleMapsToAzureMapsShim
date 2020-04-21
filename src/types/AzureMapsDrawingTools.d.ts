


/// <reference path="AzureMaps.d.ts"/>

declare namespace atlas {
    export module control {
        /**
         * A control for changing the drawing mode.
         */
        export class DrawingToolbar implements Control {
            private static CSS;
            private control;
            private drawMgr;
            private map;
            private options;
            private toolbar;
            /**
             * Constructs a DrawingToolbar.
             * @param options The options for the DrawingToolbar.
             */
            constructor(options?: DrawingToolbarOptions);
            /**
             * Gets the options used by the DrawingToolbar.
             */
            getOptions(): DrawingToolbarOptions;
            /**
             * Sets the options for the DrawingToolbar.
             * @param options The new options for the DrawingToolbar.
             */
            setOptions(options: DrawingToolbarOptions): void;
            /**
             * Initialization method for the control which is called when added to the map.
             * @return An HTMLElement to be placed on the map for the control.
             */
            onAdd(): HTMLElement;
            /**
             * Method that is called when the control is removed from the map. Should perform any necessary cleanup for the
             * control.
             */
            onRemove(): void;
            /**
             * Removes the toolbar and releases all resources used by it.
             */
            _dispose(): void;
            /**
             * Constructs the container for the toolbar.
             */
            private _constructToolbar;
            /**
             * Adds buttons to a toolbar based on the specified options.
             */
            private _addButtons;
            /**
             * Creates the necessary callback for a button based on the button type.
             */
            private _getBtnCallback;
            /**
             * Constructs the control element for holding the toolbar.
             */
            private _constructControl;
            /**
             * Call back for styledata event, updates the toolbar's style based on the map's style.
             */
            private _updateStyle;
            /**
             * Sets the effective style the toolbar should use based on the specified style and possibly the map's style.
             */
            private _setStyle;
            /**
             * Sets the effective drawing mode for the toolbar.
             * Updates the buttons active state.
             */
            private _updateMode;
        }
    }

    export module drawing {
        /**
         * The events supported by the `DrawingManager`
         */
        export interface DrawingManagerEvents {
            drawingchanged: Shape;
            drawingchanging: Shape;
            drawingcomplete: Shape;
            drawingmodechanged: DrawingMode;
            drawingstarted: Shape;
        }

        /**
         * The drawing manager is the primary class that manages all the drawing functionality on the map.
         * It can be used directly (programmatically or with custom toolbars)
         * or in combination with the drawing toolbar control.
         */
        export class DrawingManager extends internal.EventEmitter<DrawingManagerEvents> {
            private map;
            private options;
            private drawingLayers;
            private source;
            private inputHelper;
            private drawingHelper;
            private editHelper;
            /**
             * Constructs a DrawingManager.
             * @param map The map to draw on.
             * @param options The options for the DrawingManager.
             */
            constructor(map: Map, options?: DrawingManagerOptions);
            /**
             * Disposes the DrawingManager.
             * When disposed, all resources used by the DrawingManager are released.
             * Any attached toolbars or dialogs will also be disposed.
             */
            dispose(): void;
            /**
             * Gets the options used by the DrawingManager.
             */
            getOptions(): DrawingManagerOptions;
            /**
             * Gets the collection of layers used for rendering the shapes draw on the map.
             * Edit these layers' options to customize the rendering.
             */
            getLayers(): DrawingLayers;
            /**
             * Gets the data source used by the DrawingManager to store the completed shapes.
             */
            getSource(): source.DataSource;
            /**
             * Sets the options for the DrawingManager.
             * @param options The new options for the DrawingManager.
             */
            setOptions(options: DrawingManagerOptions): void;
            private _setLayerSources;
        }

        /**
         * An enumeration of the available drawing modes.
         */
        export enum DrawingMode {
            /**
             * Draw individual points on the map.
             * Literal value `"draw-point"`
             */
            drawPoint = "draw-point",
            /**
             * Draw lines on the map.
             * Literal value `"draw-line"`
             */
            drawLine = "draw-line",
            /**
             * Draw polygons on the map.
             * Literal value `"draw-polygon"`
             */
            drawPolygon = "draw-polygon",
            /**
             * Draw circles on the map.
             * Literal value `"draw-circle"`
             */
            drawCircle = "draw-circle",
            /**
             * Draw rectangles on the map.
             * Literal value `"draw-rectangle"`
             */
            drawRectangle = "draw-rectangle",
            /**
             * Sets the drawing manager into an idle state.
             * Completes any drawing/edit that are in progress.
             * Literal value `"idle"`
             */
            idle = "idle"
        }

        /**
         * An enumeration of the available drawing interaction types.
         * The drawing interaction type specifies how certain drawing modes behave.
         */
        export enum DrawingInteractionType {
            /**
             * Coordinates are added when the mouse or touch is clicked or dragged.
             * Literal value `"hybrid"`
             */
            hybrid = "hybrid",
            /**
             * Coordinates are added when the mouse or touch is dragged on the map.
             * Literal value `"freehand"`
             */
            freehand = "freehand",
            /**
             * Coordinates are added when the mouse or touch is clicked.
             * Literal value `"click"`
             */
            click = "click"
        }
    }

    /**
     * Options for the DrawingToolbar control.
     */
    export interface DrawingToolbarOptions {
        /**
         * The id of a HTML element in which the toolbar should be added to.
         * If not specified, the toolbar will be added to the map.
         */
        containerId?: string;
        /**
         * If the toolbar is added to the map, this value will specify where on the map the toolbar control will be added.
         * Default is `atlas.ControlPosition.NonFixed`
         * @default atlas.ControlPosition.NonFixed
         */
        position?: string;
        /**
         * An array of buttons to display in the toolbar.
         * The order of this array will match the order of the buttons in the toolbar.
         * Valid values are any drawing mode except `"idle"`.
         * Default is all drawing modes except `"idle"`.
         * @default All drawing modes except "idle"
         */
        buttons?: string[];
        /**
         * The number of columns to display the buttons with.
         * If the number of columns is greater than or equal to the number of buttons
         * the toolbar will be a single horizontal row.
         * If only one column is used the toolbar will be a single vertical column.
         * Default is `Infinity`.
         * @default Infinity
         */
        numColumns?: number;
        /**
         * The style of the DrawingToolbar.
         * Possible values are: `"light"` or `"dark"`.
         * Default is `"light"`.
         * @default "light"
         */
        style?: string;
        /**
         * Specifies if the toolbar is visible or not.
         * Default `true`.
         * @default true
         */
        visible?: boolean;
    }

    /**
     * A collection of the layers used by the drawing manager for rendering shapes.
     */
    export interface DrawingLayers {
        /**
         * The layer used for rendering LineStrings.
         */
        lineLayer?: layer.LineLayer;
        /**
         * The layer used for rendering the interior area of Polygons, Circles, and Rectangles.
         */
        polygonLayer?: layer.PolygonLayer;
        /**
         * The layer used for rendering the outlines of Polygons, Circles, and Rectangles.
         */
        polygonOutlineLayer?: layer.LineLayer;
        /**
         * The layer used for rendering Points.
         */
        pointLayer?: layer.SymbolLayer;
    }

    /**
     * Options for the drawing manager.
     */
    export interface DrawingManagerOptions {
        /**
         * Specifies the number of pixels the mouse or touch must move before another
         * coordinate is added to a shape when in `"freehand"` or `"hybrid"` drawing modes.
         * Default is `3`.
         * @default 3
         */
        freehandInterval?: number;
        /**
         * The type of drawing interaction the manager should adhere to.
         * Default is `"hybrid"`.
         * @default "hybrid"
         */
        interactionType?: atlas.drawing.DrawingInteractionType;
        /**
         * The drawing mode the manager is in.
         * Default is `"idle"`.
         * @default "idle"
         */
        mode?: atlas.drawing.DrawingMode;
        /**
         * A data source to add newly created shapes to.
         * If not specified when the drawing manager is constructed one will be created automatically.
         * If the data source is changed the drawing manager will be switched to `"idle"` mode.
         */
        source?: source.DataSource;
        /**
         * A drawing toolbar to display as a control for the drawing manager.
         */
        toolbar?: atlas.control.DrawingToolbar;
    }
}

/**
 * This module partially defines the map control.
 * This definition only includes the features added by using the drawing tools.
 * For the base definition see:
 * https://docs.microsoft.com/javascript/api/azure-maps-control/?view=azure-maps-typescript-latest
 */
declare module "azure-maps-control" {
    /**
     * This interface partially defines the map control's `EventManager`.
     * This definition only includes the method added by using the drawing tools.
     * For the base definition see:
     * https://docs.microsoft.com/javascript/api/azure-maps-control/atlas.eventmanager?view=azure-maps-typescript-latest
     */
    interface EventManager {
        /**
         * Adds an event to the `DrawingManager`
         * @param eventType The event name.
         * @param target The `DrawingManager` to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "drawingmodechanged", target: atlas.drawing.DrawingManager, callback: (e: atlas.drawing.DrawingMode) => void): void;
        /**
         *  Adds an event to the `DrawingManager`
         * @param eventType The event name.
         * @param target The `DrawingManager` to add the event for.
         * @param callback The event handler callback.
         */
        add(eventType: "drawingchanged" | "drawingchanging" | "drawingcomplete" | "drawingstarted", target: atlas.drawing.DrawingManager, callback: (e: atlas.Shape) => void): void;
        /**
         * Removes an event listener from the `DrawingManager`
         * @param eventType The event name.
         * @param target The `DrawingManager` to remove the event for.
         * @param callback The event handler callback.
         */
        remove(eventType: string, target: atlas.drawing.DrawingManager, callback: (e?: any) => void): void;
    }
}