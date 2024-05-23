class DropZone {
    constructor(element, classListDrag, classListHover, mouse) {
        this.element = element;
        this.classListDrag = classListDrag;
        this.classListHover = classListHover;
        this.mousePosition = mouse;
        // this.addClass(this.classList);
    }
    
    // addClass(classList){
    //     this.element.classList.add(classList);
    // }

    // removeClass(classList){
    //     this.element.classList.remove(classList);
    // }

    // detectDropZone(mousePosition) {
    //     const position = {
    //         top_left : {x: this.element.getBoundingClientRect().x, y: this.element.getBoundingClientRect().y},
    //         bottom_left:{x: this.element.getBoundingClientRect().x , y: this.element.getBoundingClientRect().y + this.element.getBoundingClientRect().height},
    //         top_right:{x: this.element.getBoundingClientRect().x  + this.element.getBoundingClientRect().width, y: this.element.getBoundingClientRect().y},
    //         bottom_right:{x: this.element.getBoundingClientRect().x + this.element.getBoundingClientRect().width, y: this.element.getBoundingClientRect().y + this.element.getBoundingClientRect().height}
    //     }

    //     let isOverDropZone = false;

    //     if ((position.top_left.x - this.borderPX) <= mousePosition.x && (position.top_left.y - this.borderPX) <= mousePosition.y
    //         && (position.bottom_left.x - this.borderPX) <= mousePosition.x  && (position.bottom_left.y + this.borderPX) >= mousePosition.y
    //         && (position.top_right.x + this.borderPX) >= mousePosition.x && (position.top_right.y - this.borderPX) <= mousePosition.y
    //         && (position.bottom_right.x + this.borderPX) >= mousePosition.x && (position.bottom_right.x + this.borderPX) >= mousePosition.x )
    //         {
    //            this.removeClass(this.classList);
    //             this.addClass(this.classListHover);
    //             isOverDropZone = true;
    //     } 
    //     else {
    //         this.removeClass(this.classListHover);
    //         this.addClass(this.classList);
    //     }

    //     console.log({ isOverDropZone, dropZone: this.element })
    //   return { isOverDropZone, dropZone: this.element};
    // }
}

export default DropZone;