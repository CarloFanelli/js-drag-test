export default interface iDropZone {
    element: HTMLElement;
    hoverClasses?: string[];
    draggingClasses?: string[];

    addDragClasses: () => void;
    removeDragClasses: () => void;
    addHoverClasses: () => void;
    removeHoverClasses: () => void;
}