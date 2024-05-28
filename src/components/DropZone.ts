import iDropZone from "../interface/iDropZone.js";

export default class DropZone implements iDropZone {
    element: HTMLElement;

    constructor(element: HTMLElement) {
        this.element = element;
    }

    addClass(classList: Array<string>): boolean {
        try {
            this.element.classList.add(...classList);
            return true;
        } catch (error) {
            return false;
        }

    }

    removeClass(classList: Array<string>): boolean {
        try {
            this.element.classList.remove(...classList);
            return true;
        }
        catch (error) {
            return false;
        }
    }

}