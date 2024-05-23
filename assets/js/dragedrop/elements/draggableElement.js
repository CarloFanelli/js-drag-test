class DraggableElement {
    constructor(element,cloneOpacity) {
        this.element = element;
        // this.mouse = mouse;
        this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
        // this.element.style.width = this.element.offsetWidth + 'px';
        // this.element.style.height = this.element.offsetHeight + 'px';
        this.element.hover = this.element.style.cursor = 'grab';
        // this.element.onmousedown = this.dragMouseDown.bind(this);
        // this.callbackF = callback;
        // this.setCallback = function (c) {this.callbackF = c;};
        this.isDragging = false;
        // this.detectDropzoneEvent = new Event('detectDropZone');
        // this.createClone();
        this.clone = null;
        this.cloneOpacity = cloneOpacity;
    }

    createClone(){
        this.clone = this.element.cloneNode(true);
        
        this.clone.id = this.element.id + '-cloned';
        this.clone.style.opacity = this.cloneOpacity + '%';
        this.clone.style.userSelect = 'none';
        // parent.insertAdiacentHTML('beforeend',clone);
        // this.element.position = 'absolute';
        this.element.parentElement.appendChild(this.clone);
        // this.element.top = this.clone.top;
        // this.element.left = this.clone.left;
        // this.element.style.width = this.clone.offsetWidth + 'px';
        // this.element.style.height = this.clone.offsetHeight + 'px';
    }

    deleteClone(){
        this.clone.remove();
        this.clone = null;
    }


    // dragMouseDown() {
    //     this.pos3 = this.mouse.position.x;
    //     this.pos4 = this.mouse.position.y;
    //     this.isDragging = true;
    //     let draggingEvent = new CustomEvent('detectDragging',this);
    //     this.element.dispatchEvent(draggingEvent);
    //     document.onmouseup = this.closeDragElement.bind(this);
    //     document.onmousemove = this.elementDrag.bind(this);
    // }

    // elementDrag() {
    //     this.element.style.cursor = 'grabbing';
    //     this.element.style.top = (this.element.offsetTop - this.pos2) + "px";
    //     this.element.style.left = (this.element.offsetLeft - this.pos1) + "px";
    //     this.element.style.position = 'absolute';
    // }

    // closeDragElement() {
    //     this.element.style.cursor = 'grab';
    //     this.element.style.position = 'static'    
    //     document.onmouseup = null;
    //     document.onmousemove = null;

    //     // const overDropZone = this.detectDropzone().find(result=> result.isOverDropZone);

    //     // if (overDropZone) {
    //     //     const dropzone = this.detectDropzone().find(result=> result.isOverDropZone).dropZone;
    //     //     this.setCallback = function (dropzone, element) {this.callbackF = callback;};
    //     // }
    // }
}

export default DraggableElement;