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
  toDrop:true,
  dragElements:{
    elementSelector:dragElement, //array of HTML Elements
    elementOnDragClassList:['bg-pink-500','border-2','border-orange-500'],
    elementHoverClassList:['bg-red-500','border-2','border-yellow-400','text-white'],
    placeholderOpacity: 20 // from 0 to 100
  },
  dropZones:{
    elementSelector:dropZones, //array of HTML Elements
    elementDragClassList:['border-2','border-white-500'],
    elementHoverClassList:['border','border-blue-500','bg-green-500']
  },
  callback: function(dragElement,dropZone){
    console.log('dragged el: ',dragElement);
    console.log('dropZone: ',dropZone);
  }
})