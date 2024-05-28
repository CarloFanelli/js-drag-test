import iDraggableElement from "../interface/iDraggableElements.js";

export default class DraggableElement implements iDraggableElement {
    element: HTMLElement;
    private clone: HTMLElement | null;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.style.cursor = 'grab';
        this.element.setAttribute('hover', this.element.style.cursor);
        this.clone = null;
    }

    public createClone() {
        this.clone = this.element.cloneNode(true) as HTMLElement;

        this.clone.id = this.element.id + '-cloned';
        this.clone.style.opacity = '20%';
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