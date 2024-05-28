export default interface iDraggableElement {
    element: HTMLElement;

    createClone: () => void;
    destroyClone: () => void;
}