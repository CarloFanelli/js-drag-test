export interface iMousePosition {
    x: number;
    y: number;
}

export default class MouseService {
    private position: iMousePosition = {
        x: 0,
        y: 0
    };
    constructor() {
    }

    public detectMouse(event: MouseEvent): void {
        this.position = { x: event.pageX, y: event.pageY };
    }

    public getPosition(): iMousePosition {
        return this.position;
    }
}
