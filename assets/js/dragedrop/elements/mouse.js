class Mouse {
    constructor() {
        this.position = {x: 0, y: 0};
        document.addEventListener('mousemove', this.detectMouse.bind(this));
    }

    detectMouse(event) {
        // this.position = {x: event.clientX, y: event.clientY};
        this.position = {x: event.pageX, y: event.pageY};
    }
}

export default Mouse;