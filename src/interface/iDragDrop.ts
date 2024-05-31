import iDraggableElement from "./iDraggableElements.js";
import iDropZone from "./iDropZone.js";

export default interface iDragAndDrop {
    dropZones: iDropZone[];
    draggableElements: iDraggableElement[];
    Callback: (elementDragged: HTMLElement, dropZoneHit: HTMLElement) => void;
}