function dragElem(elem, borderElem) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;

  function getBoundaries() {
    const left = borderElem.getBoundingClientRect().left + window.scrollX;
    const top = borderElem.getBoundingClientRect().top + window.scrollY;
    return {
      left: left,
      top: top,
      right: left + borderElem.offsetWidth - elem.offsetWidth,
      bottom: top + borderElem.offsetHeight - elem.offsetHeight,
    };
  }

  function elementBoundary() {
    elem.innerHTML = "Ouch!";
    elem.style.background = "#ff9999";
    elem.style.borderColor = "#8b0000";
    document
      .getElementsByTagName("p")
      .forEach((e) => (e.style.color = "#b30000"));
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    let newPositionTop = elem.offsetTop - pos2;
    let newPositionLeft = elem.offsetLeft - pos1;

    const boundaries = getBoundaries();

    if (newPositionTop < boundaries.top) {
      newPositionTop = boundaries.top;
      elementBoundary();
    }

    if (newPositionLeft < boundaries.left) {
      newPositionLeft = boundaries.left;
      elementBoundary();
    }

    if (newPositionTop > boundaries.bottom) {
      newPositionTop = boundaries.bottom;
      elementBoundary();
    }

    if (newPositionLeft > boundaries.right) {
      newPositionLeft = boundaries.right;
      elementBoundary();
    }

    elem.style.top = newPositionTop + "px";
    elem.style.left = newPositionLeft + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  elem.onmousedown = dragMouseDown;
}

dragElem(document.getElementById("child"), document.getElementById("parent"));
