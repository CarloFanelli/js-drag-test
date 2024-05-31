import DropZone from "./components/DropZone.js";
import iDragDropOptions from "./interface/iDragDropOptions.js";
import iDropZone from "./interface/iDropZone.js";
import iDraggableElement from "./interface/iDraggableElements.js";
import DraggableElement from "./components/DraggableElement.js";
import iDragAndDrop from "./interface/iDragDrop.js";
import DropZoneService from "./service/DropZoneService.js"
import MouseService, { iMousePosition } from "./service/MouseService.js";

export default class DragAndDrop implements iDragAndDrop {
    dropZoneHoverClass?: string[];
    dropZoneClass?: string[];
    dropZoneHit?: iDropZone;
    private dropZones: iDropZone[];
    private draggableElements: iDraggableElement[];
    private pos1: number;
    private pos2: number;
    private pos3: number;
    private pos4: number;
    private elementDragging?: iDraggableElement;
    private mouseService: MouseService = new MouseService();

    Callback: (elementDragged: HTMLElement, dropZoneHit?: HTMLElement) => void;

    constructor(options: iDragDropOptions, callback: (element: HTMLElement, dropzone?: HTMLElement) => void) {
        this.dropZoneHoverClass = options.dropZoneHoverClasses;
        this.dropZoneClass = options.dropZoneClasses;
        this.Callback = callback;
        this.dropZones = options.dropZoneHtmlElements.map(el =>
            new DropZone(el, options.dropZoneClasses, options.dropZoneHoverClasses)
        );
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;

        this.draggableElements = options.draggableHtmlElements.map(el => {
            let element = new DraggableElement
                (
                    el,
                    options.draggedElementCloneOpacity,
                    options.draggedElementClasses,
                    options.draggedElementHoverClasses
                );

            el.addEventListener('mousedown', (e) => {
                this.pos3 = e.pageX;
                this.pos4 = e.pageY;
                this.elementDragging = element;
                el.style.width = el.offsetWidth + 'px';
                el.style.height = el.offsetHeight + 'px';
                element.createClone();
                element.addDragClasses();
                this.dropZones.forEach((dz) => dz.addDragClasses());
                el.style.position = 'absolute';
                document.onmousemove = (e) => {
                    this.mouseService.detectMouse(e);
                    this.detectDropZone();
                    this.pos1 = this.pos3 - e.pageX;
                    this.pos2 = this.pos4 - e.pageY;
                    this.pos3 = e.pageX;
                    this.pos4 = e.pageY;
                    el.draggable = false;
                    el.style.cursor = 'grabbing';
                    el.style.position = 'absolute';
                    el.style.top = (el.offsetTop - this.pos2) + "px";
                    el.style.left = (el.offsetLeft - this.pos1) + "px";
                };

                document.onmouseup = () => { this.actionOnDrop(element) };
            })

            return element;
        });
    }

    private detectDropZone() {
        const dropZoneService = new DropZoneService();
        this.dropZones.forEach((dz) => {
            dz.addDragClasses();
            let zonehit = dropZoneService.detectDropZone(dz, this.mouseService.getPosition());
            if (zonehit) {
                this.elementDragging?.removeDragClasses();
                this.elementDragging?.addHoverClasses();
                dz.removeDragClasses();
                dz.addHoverClasses();
                this.dropZoneHit = dz;
            } else {
                this.elementDragging?.removeHoverClasses();
                this.elementDragging?.addDragClasses();
                if (this.dropZoneHit) {
                    dz.removeHoverClasses();
                    dz.addDragClasses();
                    this.dropZoneHit = undefined;
                }
            }
        });
    }

    private actionOnDrop(element: iDraggableElement) {
        document.onmouseup = null;
        document.onmousemove = null;
        element.removeDragClasses();
        element.addHoverClasses();
        element.destroyClone();
        this.dropZones.forEach((dr) => dr.removeDragClasses());
        if (this.elementDragging) {
            this.elementDragging.element.style.cursor = 'grab';
            this.elementDragging.element.style.top = "";
            this.elementDragging.element.style.left = "";
            this.elementDragging.element.style.position = 'static';
            this.elementDragging.removeHoverClasses();
            this.Callback(this.elementDragging.element, this.dropZoneHit?.element);
            if (this.dropZoneHit) {
                this.dropZoneHit.removeHoverClasses();

            }
        }
    }
}
