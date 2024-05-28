export default interface iDragDropOptions {
    dropZoneHoverClasses?: string[];
    dropZoneClasses?: string[];
    draggedElementClasses?: string[];
    draggedElementHoverClasses?: string[];
    draggedElementCloneOpacity?: number;
    dropZoneHtmlElements: HTMLElement[];
    draggableHtmlElements: HTMLElement[];
}