import iDropZone from "../interface/iDropZone.js";
export default class DropZone implements iDropZone {
    element: HTMLElement;
    hoverClasses?: string[];
    draggingClasses?: string[];

    constructor(element: HTMLElement, hoverClasses?: string[], draggingClasses?: string[]) {
        this.element = element;
        this.hoverClasses = hoverClasses;
        this.draggingClasses = draggingClasses;
    }

    addDragClasses(): void {
        if (this.draggingClasses) {
            this.element.classList.add(...this.draggingClasses);
        }
    };
    removeDragClasses(): void {
        if (this.draggingClasses) {
            this.element.classList.remove(...this.draggingClasses);
        }
    };
    addHoverClasses(): void {
        if (this.hoverClasses) {
            this.element.classList.add(...this.hoverClasses);
        }
    };
    removeHoverClasses(): void {
        if (this.hoverClasses) {
            this.element.classList.remove(...this.hoverClasses);
        }
    };
}