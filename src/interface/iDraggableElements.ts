export default interface iDraggableElement {
    element: HTMLElement;
    cloneOpacity: number;
    destroyClone: () => void;
    addDragClasses: () => void;
    removeDragClasses: () => void;
    addHoverClasses: () => void;
    removeHoverClasses: () => void;
}