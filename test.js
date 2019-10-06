const str = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABkAAAAZACAMAAAAW0n6VAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAbrqAAG66g';

const type = str.match(/^data:(image\/\w+);base64,/)[1];

console.log(type);
