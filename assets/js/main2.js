import DragAndDrop from "./dragedrop/dragedrop.js";

const dropZones = Array.from(document.querySelectorAll('.dropZone'));

const dragElement = Array.from(document.querySelectorAll('.dragElement'));

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
