import DragAndDrop from "./dragedrop/dragedrop.js";

const dropZones = Array.from(document.querySelectorAll('.dropZone'));

const dragElement = Array.from(document.querySelectorAll('.dragElement'));

/*
const dragAndDrop = new DragAndDrop({
  draggableElementSelector: dragElement,
  dropZoneSelector: dropZones,
  dropZoneClassList:('bg-pink-500','border-white-500'), //poco sensato
  // dropZoneClassList:'bg-pink-500 text-white-500',
  dropZoneHoverClassList: 'bg-green-400' // sensato
},
function (e, dropZone) { 
      console.log(e);
      console.log(dropZone);
   }
);
*/

const dragAndDrop = new DragAndDrop({
  dragElements:{
    elementSelector:dragElement, //array of HTML Elements
    elementOnDragClassList:['class-1-drag','class-2-drag','class-3-drag'],
    elementHoverClassList:['class-1-hover','class-2-hover','class-3-hover'],
    placeholderOpacity: 20 // from 0 to 100
  },
  dropZones:{
    elementSelector:dropZones, //array of HTML Elements
    elementDragClassList:['class-1-drag','class-2-drag','class-3-drag'],
    elementHoverClassList:['class-1-hover','class-2-hover','class-3-hover']
  },
  callback: function(dragElement,dropZone){
    console.log('dragged el: ',dragElement);
    console.log('dropZone: ',dropZone);
  }
})