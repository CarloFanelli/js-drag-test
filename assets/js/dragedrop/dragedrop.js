import Mouse from './elements/mouse.js';
import DropZone from './elements/dropZone.js';
import DraggableElement from './elements/draggableElement.js';

class DragAndDrop {
    constructor(options,callback) {
        this.dropZoneHoverClassList = options.dropZoneHoverClassList;
        this.dropZoneClassList = options.dropZoneClassList;
        this.mouse = new Mouse();
        this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
        this.dropZoneHit = [];
        this.elementDragging = null;
        this.callbackF = callback;
        this.setCallback = function (c) {this.callbackF = c;};

        this.dropZones = options.dropZoneSelector.map(el => 
            new DropZone(el, options.dropZoneClassList,this.mouse, options.dropZoneHoverClassList)
        );

        // this.draggableElements = options.draggableElementSelector.map(el => {
        //     el.addEventListener('mousedown',(e)=>{
        //         this.pos3 = this.mouse.position.x;
        //         this.pos4 = this.mouse.position.y;
        //         this.elementDragging = el;

        //         document.onmousemove = ()=>{
        //             this.detectDropZone() 
        //             this.pos1 = this.pos3 - this.mouse.position.x;
        //             this.pos2 = this.pos4 - this.mouse.position.y;
        //             this.pos3 = this.mouse.position.x;
        //             this.pos4 = this.mouse.position.y;
        //             el.draggable = false;
        //             el.style.cursor = 'grabbing';
        //             el.style.position = 'absolute';
        //             el.style.top = (el.offsetTop - this.pos2) + "px";
        //             el.style.left = (el.offsetLeft - this.pos1) + "px";
        //         };
        this.draggableElements = options.draggableElementSelector.map(el => {
            let element = new DraggableElement(el);

            el.addEventListener('mousedown',(e)=>{
                this.pos3 = e.pageX; 
                this.pos4 = e.pageY; 
                this.elementDragging = el;
                el.style.width = el.offsetWidth + 'px';
                el.style.height = el.offsetHeight + 'px';
                element.createClone();
                el.style.position = 'absolute'

                document.onmousemove = (e)=>{
                    
                    this.detectDropZone() 
                    this.pos1 = this.pos3 - e.pageX; 
                    this.pos2 = this.pos4 - e.pageY; 
                    this.pos3 = e.pageX; 
                    this.pos4 = e.pageY; 
                    el.draggable = false;
                    el.style.cursor = 'grabbing';
                    el.style.position = 'absolute';
                    el.style.top = (el.offsetTop - this.pos2) + "px";
                    el.style.left = (el.offsetLeft - this.pos1) + "px";
                };
                
                document.onmouseup = ()=>{ this.actionOnDrop(element) };
            })
            
            return element;
        });
        // document.addEventListener('detectDropZone',this.detectDropZone);
        // this.addEventListener('detectDropZone',this.detectDropZone);
    }


    detectDropZone() {
        const dropZone = this.dropZones.map(dropZone => {
            // const dropZonePosition = {
            //     top_left : {x: dropZone.element.getBoundingClientRect().x, y: dropZone.element.getBoundingClientRect().y},
            //     bottom_left:{x: dropZone.element.getBoundingClientRect().x , y: dropZone.element.getBoundingClientRect().y + dropZone.element.getBoundingClientRect().height},
            //     top_right:{x: dropZone.element.getBoundingClientRect().x  + dropZone.element.getBoundingClientRect().width, y: dropZone.element.getBoundingClientRect().y},
            //     bottom_right:{x: dropZone.element.getBoundingClientRect().x + dropZone.element.getBoundingClientRect().width, y: dropZone.element.getBoundingClientRect().y + dropZone.element.getBoundingClientRect().height}
            // }
            const dropZonePosition = {
                top_left : {x: getCoords(dropZone.element).left, y: getCoords(dropZone.element).top},
                bottom_left:{x: getCoords(dropZone.element).left , y: getCoords(dropZone.element).top + dropZone.element.getBoundingClientRect().height},
                top_right:{x: getCoords(dropZone.element).left  + dropZone.element.getBoundingClientRect().width, y: getCoords(dropZone.element).top},
                bottom_right:{x: getCoords(dropZone.element).left + dropZone.element.getBoundingClientRect().width, y: getCoords(dropZone.element).top + dropZone.element.getBoundingClientRect().height}
            }

            // console.log('-----------------');
            // console.log(dropZone.element.getBoundingClientRect().y,dropZone.element.getBoundingClientRect().x);
            // console.log(getCoords(dropZone.element).top,getCoords(dropZone.element).left);

            function getCoords(elem) {
                var box = elem.getBoundingClientRect();
            
                var body = document.body;
                var docEl = document.documentElement;
            
                var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
                var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
            
                var clientTop = docEl.clientTop || body.clientTop || 0;
                var clientLeft = docEl.clientLeft || body.clientLeft || 0;
            
                var top  = box.top +  scrollTop - clientTop;
                var left = box.left + scrollLeft - clientLeft;
                
                //console.log({ top: Math.round(top), left: Math.round(left) });
                return { top: Math.round(top), left: Math.round(left) };
            }
               
            const borderPX = 1;
        
            let isOverDropZone = false;
            
            if ((dropZonePosition.top_left.x - borderPX) <= this.mouse.position.x && (dropZonePosition.top_left.y - borderPX) <= this.mouse.position.y
                && (dropZonePosition.bottom_left.x - borderPX) <= this.mouse.position.x  && (dropZonePosition.bottom_left.y + borderPX) >= this.mouse.position.y
                && (dropZonePosition.top_right.x + borderPX) >= this.mouse.position.x && (dropZonePosition.top_right.y - borderPX) <= this.mouse.position.y
                && (dropZonePosition.bottom_right.x + borderPX) >= this.mouse.position.x && (dropZonePosition.bottom_right.x + borderPX) >= this.mouse.position.x )
                {
                    // dropZone.element.style.border = borderPX + 'px solid blue';
                    dropZone.element.classList.remove(this.dropZoneClassList);
                    dropZone.element.classList.add(this.dropZoneHoverClassList);
                    isOverDropZone = true;
                    this.isDragging = true;
            } 
            else {
            //    dropZone.element.style.border = '1px solid yellow';
               dropZone.element.classList.remove(this.dropZoneHoverClassList);
               dropZone.element.classList.add(this.dropZoneClassList);
            }
            return { isOverDropZone, dropZone };
        })
        this.dropZoneHit = dropZone.filter(el => el.isOverDropZone)
    }

    actionOnDrop(element){
        document.onmouseup=null;
        document.onmousemove = null;
        element.deleteClone();
        this.elementDragging.style.cursor = 'grab';
        this.elementDragging.style.top = null;
        this.elementDragging.style.left = null;
        this.elementDragging.style.position = 'static';
        
        if (this.dropZoneHit.length !== 0) {
            this.dropZoneHit[0].dropZone.element.classList.remove(this.dropZoneHoverClassList);
            this.dropZoneHit[0].dropZone.element.classList.add(this.dropZoneClassList)
            this.callbackF(this.elementDragging,this.dropZoneHit[0].dropZone.element);
        }

        this.dropZoneHit = [];
    }
    
    // actionDragging(e){
    //     console.log(e.target);
    //     console.log(this);
    // }

}

export default DragAndDrop

