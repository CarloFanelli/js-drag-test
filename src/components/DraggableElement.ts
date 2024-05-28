import iDraggableElement from "../interface/iDraggableElements.js";

export default class DraggableElement implements iDraggableElement {
    element: HTMLElement;
    cloneOpacity: number;
    dragElementDragClasses?: string[];
    dragElementHoverClasses?: string[];
    private cloneOpacityDefault: number = 10;
    private clone: HTMLElement | null;

    constructor(
        element: HTMLElement,
        opacity?: number,
        dragElementDragClasses?: string[],
        dragElementHoverClasses?: string[]
    ) {
        this.element = element;
        this.element.style.cursor = 'grab';
        this.element.setAttribute('hover', this.element.style.cursor);
        this.clone = null;
        if (opacity && (opacity >= 0 && opacity <= 100)) {
            this.cloneOpacity = opacity;
        } else {
            this.cloneOpacity = this.cloneOpacityDefault;
        }
        this.dragElementDragClasses = dragElementDragClasses;
        this.dragElementHoverClasses = dragElementHoverClasses;
    }

    public addDragClasses(): void {
        if (this.dragElementDragClasses) {
            this.element.classList.add(...this.dragElementDragClasses);
        }
    };
    public removeDragClasses(): void {
        if(this.dragElementDragClasses) {
            this.element.classList.remove(...this.dragElementDragClasses);
        }
    };
    public addHoverClasses(): void {
        if(this.dragElementHoverClasses) {
            this.element.classList.add(...this.dragElementHoverClasses);
        }
    };
    public removeHoverClasses(): void {
        if(this.dragElementHoverClasses) {
            this.element.classList.remove(...this.dragElementHoverClasses);
        }
    };

    public createClone() {
        this.clone = this.element.cloneNode(true) as HTMLElement;
        this.clone.id = this.element.id + '-cloned';
        this.clone.style.opacity = this.cloneOpacity + '%';
        this.clone.style.userSelect = 'none';
        if (!this.element.parentElement) {
            this.element.appendChild(this.clone);
        } else {
            this.element.parentElement.appendChild(this.clone);
        }
    }

    destroyClone() {
        if (this.clone) {
            this.clone.remove();
            this.clone = null;
        }
    }
}