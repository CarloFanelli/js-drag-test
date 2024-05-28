export default interface iDraggableElement {
    element: HTMLElement;
    cloneOpacity: number;
    dragElementDragClasses?: string[];
    dragElementHoverClasses?: string[];

    createClone: () => void;
    destroyClone: () => void;
    addDragClasses: () => void;
    removeDragClasses: () => void;
    addHoverClasses: () => void;
    removeHoverClasses: () => void;
}