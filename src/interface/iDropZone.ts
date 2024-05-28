export default interface iDropZone {
    element: HTMLElement;

    addClass: (classList: string[]) => Boolean
    removeClass: (classList: string[]) => Boolean
}