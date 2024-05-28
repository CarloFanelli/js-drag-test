import iDropZone from "./iDropZone.js";

export default interface iDragAndDrop {
    dropZoneHoverClass?: string[];
    dropZoneClass?: string[];
    dropZoneHit?: iDropZone;
    Callback: (elementDragged: HTMLElement, dropZoneHit: HTMLElement) => void;
}