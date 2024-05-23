detectMouse();


// START MOUSE SECTION
let mousePosition;

function detectMouse(){
    document.addEventListener('mousemove',function (event) {

        const mouseX = event.clientX;
        const mouseY = event.clientY;

        mousePosition = {x:mouseX,y:mouseY};

        // dropZoneHoverDetection2();

    })
}

// END MOUSE SECTION

const dragElementList = document.querySelectorAll('.dragElement');

dragElementList.forEach(element => {
        dragElement(element);
});

function dragElement(elmnt) {
  let pos1 = pos2 = pos3 = pos4 = 0;

  elmnt.style.width = elmnt.offsetWidth + 'px';
  elmnt.style.height = elmnt.offsetHeight + 'px';
  elmnt.style.cursor = 'grab';
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(/*e*/) {
    // e = e || window.event;
    // e.preventDefault();
    // get the mouse cursor position at startup using detectMouse() f
    pos3 = mousePosition.x;
    pos4 = mousePosition.y;
    document.onmouseup = stopDragElement;

    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

    //actions while dragging an element
  function elementDrag(/*e*/) {
    // e = e || window.event;
    // e.preventDefault();
    detectDropZoneCartesian2('bg-blue-500','bg-pink-500')
    
    // calculate the new cursor position:
    pos1 = pos3 - mousePosition.x;
    pos2 = pos4 - mousePosition.y;
    pos3 = mousePosition.x;
    pos4 = mousePosition.y;
    elmnt.style.cursor = 'grabbing';
    
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    elmnt.style.position = 'absolute';
  }

  function stopDragElement(e) {
    /* stop moving when mouse button is released:*/
    elmnt.style.cursor = 'grab';
    elmnt.style.position = 'static';
    document.onmouseup = null;
    document.onmousemove = null;
    // console.log('mouse up from ' + e.target.id);
    const overDropZone = detectDropZoneCartesian2('bg-blue-500','bg-pink-500').find(result => result.isOverDropZone);

    if (overDropZone) {
        const dropZone = detectDropZoneCartesian2('bg-blue-500','bg-pink-500').find(result => result.isOverDropZone).dropZone;
        dropZone.style.border = '1px solid yellow';
        console.log('azione al drop');
        console.log('candidato: ',e.target.getAttribute('data-position'), e.target.dataset.position);
        console.log(e.target.id + ' dragged element, released on dropzone with id '+ dropZone.id );
    } else{
        console.log('any dropzone detected');
    }
  }
}

// START DROPZONE CARTESIAN DETECTION

function detectDropZoneCartesian(dragEl){
    const dropZoneList = document.querySelectorAll('.dropZone');
    dropZoneList.forEach(dropZone => {
        //dropZone.addEventListener('mouseover',function(){

            const dropZonePosition = {
                top_left : {x: dropZone.getBoundingClientRect().x, y: dropZone.getBoundingClientRect().y},
                bottom_left:{x: dropZone.getBoundingClientRect().x , y: dropZone.getBoundingClientRect().y + dropZone.getBoundingClientRect().height},
                top_right:{x: dropZone.getBoundingClientRect().x  + dropZone.getBoundingClientRect().width, y: dropZone.getBoundingClientRect().y},
                bottom_right:{x: dropZone.getBoundingClientRect().x + dropZone.getBoundingClientRect().width, y: dropZone.getBoundingClientRect().y + dropZone.getBoundingClientRect().height}
            }
            
            //  x,y punti in alto a sx
            //  bottom, left, right, top indicano i 4 punti dell'elemento
            // width, height larhezza ed altezza
            const borderPX = 1;

            if ((dropZonePosition.top_left.x - borderPX) <= mousePosition.x && (dropZonePosition.top_left.y - borderPX) <= mousePosition.y
                && (dropZonePosition.bottom_left.x - borderPX) <= mousePosition.x  && (dropZonePosition.bottom_left.y + borderPX) >= mousePosition.y
                && (dropZonePosition.top_right.x + borderPX) >= mousePosition.x && (dropZonePosition.top_right.y - borderPX) <= mousePosition.y
                && (dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x && (dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x )
                {
                    console.log('element id '+ dragEl.id + ' over dropzone ' + dropZone.id +' detect');                     
                    dropZone.style.border = borderPX + 'px solid blue';
                    return true;
            } else{
                dropZone.style.border = '1px solid yellow';
                return false;
            }
            // #debug
            // if ((dropZonePosition.top_left.x - borderPX) <= mousePosition.x) {
                //     console.log('1');
                //     if ((dropZonePosition.top_left.y - borderPX) <= mousePosition.y) {
                //         console.log('2');
                //         if ((dropZonePosition.bottom_left.x - borderPX) <= mousePosition.x) {
                //             console.log('3');
                //             if ((dropZonePosition.bottom_left.y + borderPX) >= mousePosition.y) {
                //                 console.log('4');
                //                 if ((dropZonePosition.top_right.x + borderPX) >= mousePosition.x) {
                //                     console.log('5');
                //                     if ((dropZonePosition.top_right.y - borderPX) <= mousePosition.y) {
                //                         console.log('6');
                //                         if ((dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x) {
                //                             console.log('7');
                //                             if ((dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x) {
                //                                 console.log('8');
                //                                 console.log('dropzone');
                //                                 console.log(dropZone.id);
                //                             }
                //                         }
                //                     }
                //                 }
                //             }
                //         }
                //     }
            // }
        
    });
}

function detectDropZoneCartesian2(classList,classListHover){
    const dropZoneList = document.querySelectorAll('.dropZone');

    return Array.from(dropZoneList).map(dropZone => {
        const dropZonePosition = {
            top_left : {x: dropZone.getBoundingClientRect().x, y: dropZone.getBoundingClientRect().y},
            bottom_left:{x: dropZone.getBoundingClientRect().x , y: dropZone.getBoundingClientRect().y + dropZone.getBoundingClientRect().height},
            top_right:{x: dropZone.getBoundingClientRect().x  + dropZone.getBoundingClientRect().width, y: dropZone.getBoundingClientRect().y},
            bottom_right:{x: dropZone.getBoundingClientRect().x + dropZone.getBoundingClientRect().width, y: dropZone.getBoundingClientRect().y + dropZone.getBoundingClientRect().height}
        }
        
        const borderPX = 1;
    
        let isOverDropZone = false;
        
        if ((dropZonePosition.top_left.x - borderPX) <= mousePosition.x && (dropZonePosition.top_left.y - borderPX) <= mousePosition.y
            && (dropZonePosition.bottom_left.x - borderPX) <= mousePosition.x  && (dropZonePosition.bottom_left.y + borderPX) >= mousePosition.y
            && (dropZonePosition.top_right.x + borderPX) >= mousePosition.x && (dropZonePosition.top_right.y - borderPX) <= mousePosition.y
            && (dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x && (dropZonePosition.bottom_right.x + borderPX) >= mousePosition.x )
            {
                // dropZone.style.border = borderPX + 'px solid blue';
                dropZone.classList.remove(classList);
                dropZone.classList.add(classListHover);
                isOverDropZone = true;
        } 
        else {
        //    dropZone.style.border = '1px solid yellow';
            dropZone.classList.remove(classListHover);
           dropZone.classList.add(classList);
        }
        console.log({ isOverDropZone, dropZone });
        return { isOverDropZone, dropZone };
    })
    //.find(result => result.isOverDropZone);

}

// END DROPZONE DETECTION

// START DROPZONE :hover DETECTION

function dropZoneHoverDetection(){

    const documentNodeList = document.querySelectorAll(":hover");
    
    const nodeClassList = [];
    
    documentNodeList.forEach(node => {
        
        const classList = node.classList;
        
        classList.forEach(classIn => {
            nodeClassList.push(classIn);
        });
    });
    
    if (nodeClassList.includes('dropZone')) {
        console.log('over a dropzone');
    }
        // verifico se ho un oggetto e poi guardo cosa c'è dietro con lo stesso selettore
}


function dropZoneHoverDetection2(){

    const documentNodeList = document.querySelectorAll(":hover");
    
    const nodeClassList = [];
    // console.log(documentNodeList);
    
    documentNodeList.forEach(node => {
        if (node.classList.contains('dropZone')) {
            // document.addEventListener('click',()=>{
                console.log('detect drop zone ' + node.id);
            // })
        }
    });
    // verifico se ho un oggetto e poi guardo cosa c'è dietro con lo stesso selettore
}
// END DROPZONE :hover DETECTION

/*
  -  rilevo cosa ho sotto il puntatore -> document.querySelectorAll( ":hover" ) -> ho un array 
  -  in questo array devo vedere le classi di ogni elemento dell'array -> document.querySelectorAll( ":hover" ) ciclato e vedo .classList -> ottengo un array con ogni classe di ciascun elemento
  - verifico in questo array di array se ho una dropZone -> è meglio fare un array di array o un array unico? secondo me array di array perché potrei avere non dropzone inserita dentro una dropzone
*/    