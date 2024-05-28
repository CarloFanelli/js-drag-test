import DropZone from "./components/DropZone.js";
import iDragDropOptions from "./interface/iDragDropOptions.js";
import iDropZone from "./interface/iDropZone.js";
import iDraggableElement from "./interface/iDraggableElements.js";
import DraggableElement from "./components/DraggableElement.js";
import iDragAndDrop from "./interface/iDragDrop.js";
import DropZoneService from "./service/DropZoneService.js"
import MouseService, { iMousePosition } from "./service/MouseService.js";

export default class DragAndDrop implements iDragAndDrop {
    dropZoneHoverClass: string[];
    dropZoneClass: string[];
    dropZoneHit?: iDropZone;
    private dropZones: iDropZone[];
    private draggableElements: iDraggableElement[];
    private pos1: number;
    private pos2: number;
    private pos3: number;
    private pos4: number;
    private elementDragging?: HTMLElement;
    private mouseService: MouseService = new MouseService();

    Callback: (elementDragged: HTMLElement, dropZoneHit: HTMLElement) => void;

    constructor(options: iDragDropOptions, callback: (element: HTMLElement, dropzone: HTMLElement) => void) {
        this.dropZoneHoverClass = options.dropZoneHoverClass;
        this.dropZoneClass = options.dropZoneClass;
        this.Callback = callback;
        this.dropZones = options.dropZoneHtmlElements.map(el =>
            new DropZone(el)
        );
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;

        this.draggableElements = options.draggableHtmlElements.map(el => {
            let element = new DraggableElement(el);

            el.addEventListener('mousedown', (e) => {
                this.pos3 = e.pageX;
                this.pos4 = e.pageY;
                this.elementDragging = el;
                el.style.width = el.offsetWidth + 'px';
                el.style.height = el.offsetHeight + 'px';
                element.createClone();
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
        let dropZoneService = new DropZoneService();
        this.dropZones.forEach((dz) => {
            let zonehit = dropZoneService.detectDropZone(dz, this.mouseService.getPosition());
            if (zonehit) {
                dz.element.classList.remove(...this.dropZoneClass);
                dz.element.classList.add(...this.dropZoneHoverClass);
                this.dropZoneHit = dz;
            } else {
                dz.element.classList.remove(...this.dropZoneHoverClass);
                dz.element.classList.add(...this.dropZoneClass);
            }
        });
    }

    private actionOnDrop(element: iDraggableElement) {
        document.onmouseup = null;
        document.onmousemove = null;
        element.destroyClone();
        if (this.elementDragging) {
            this.elementDragging.style.cursor = 'grab';
            this.elementDragging.style.top = "";
            this.elementDragging.style.left = "";
            this.elementDragging.style.position = 'static';

            if (this.dropZoneHit) {
                this.dropZoneHit.element.classList.remove(...this.dropZoneHoverClass);
                this.Callback(this.elementDragging, this.dropZoneHit.element);
            }
        }

    }
}
