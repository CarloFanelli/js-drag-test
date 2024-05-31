
# DragAndDrop
This library implemnents the drag and drop feature.
## Installation
Download the code

`git clone https://github.com/CarloFanelli/js-drag-test.git`

### Install package
`npm i`
### Run the project with:
`npm run dev`

If you want you can watch the files with:

`npm run watch`
### For Production run
`npm run build`

## Usage
**This library expose a constructor:**

`DragAndDrop(options: iDragDropOptions, callback: (elementDragged: HTMLElement, dropzoneHit: HTMLElement) => void)`

**The interface iDragDropOptions is defined in this way:**

    export default interface iDragDropOptions {
    	dropZoneHoverClasses?: string[];
    	dropZoneClasses?: string[];
    	draggedElementClasses?: string[];
    	draggedElementHoverClasses?: string[];
    	draggedElementCloneOpacity?: number;
    	dropZoneHtmlElements: HTMLElement[];
    	draggableHtmlElements: HTMLElement[];
    }
**The follow property is public:**

    dropZones:  iDropZone[];
    draggableElements:  iDraggableElement[];

**The interface iDropZone is defined in this way:**

    export  default  interface  iDropZone {
	    element:  HTMLElement;
	    hoverClasses?:  string[];
	    draggingClasses?:  string[];
	    addDragClasses: () =>  void;
	    removeDragClasses: () =>  void;
	    addHoverClasses: () =>  void;
	    removeHoverClasses: () =>  void;
    }

**The interface iDraggableElement is defined in this way:**

    export  default  interface  iDraggableElement {
	    element:  HTMLElement;
	    cloneOpacity:  number;
	    createClone: () =>  void;
	    destroyClone: () =>  void;
	    addDragClasses: () =>  void;
	    removeDragClasses: () =>  void;
	    addHoverClasses: () =>  void;
	    removeHoverClasses: () =>  void;
    }
