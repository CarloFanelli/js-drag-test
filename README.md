# DragAndDrop
This library implemnents the drag and drop feature. 

## Installation

Download the code

`git clone https://github.com/CarloFanelli/js-drag-test.git`

Install package 

`npm i`

Run the project with:

`npm run dev`

If you want you can watch the files with:

`npm run watch`

For Production run

`npm run build`

## Usage

This library expose a constructor:

`DragAndDrop(options: iDragDropOptions, callback: (elementDragged: HTMLElement, dropzoneHit: HTMLElement) => void)`

The interface iDragDropOptions is defined in this way:

`{
    dropZoneHoverClass: string[],
    dropZoneClass: string[],
    dropZoneHtmlElements: HTMLElements[],
    draggableHtmlElements: HTMLElements[]
}`