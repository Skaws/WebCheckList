import FullList from "../model/FullList";

import taskComplSound from "../audio/taskComplete.wav";
interface DOMList {
  // this class consists of variables:
  // ul - a var for holding a HTML list element
  ul: HTMLUListElement;
  // a function to clear the list
  clear(): void;
  // a function to render the list
  render(fullList: FullList): void;
}
// create a class called list template
// make it export default
// make it implement domlist
// make it a singleton so we only have 1 template for the entire app
// clear method should clear all the HTML in the unorder list
// render method should render the list

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();

  ul: HTMLUListElement;
  private constructor() {
    // set the objects HTMLelement as the one encompassing the "listItems" section of index.html
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }
  clear(): void {
    // get the HTML in listItems and clear it
    this.ul.innerHTML = "";
  }
  render(fullList: FullList): void {
    this.clear();
    // access the array in full list, iterate through the array via for loop storing the currently examined element as currItem
    fullList.list.forEach((currItem) => {
      // create a HTML element of list element format "li"
      let li = document.createElement("li") as HTMLElement;
      //   in our original html doc the intended list has an item, and id and a checkbox to mark complete or not, we shall implement that below
      // first establish our list element under the class name "item
      li.className = "item";

      //next create the checkbox to accompany our list item. we do this by creating an input element, converting it to htmlinput element and then storing it in constant "check"
      const check = document.createElement("input") as HTMLInputElement;
      //   establish our html input type as a checkbox
      check.type = "checkbox";
      //   ensure our checkbox and ListItem share the same id
      check.id = currItem.id;
      //   makes element focusable in sequential keyboard nav (the line below is removable)
      check.tabIndex = 0;
      // set the checkbox's checked status to the same as our ListItem object's checked status
      check.checked = currItem.checked;
      li.append(check);

      //Last step of checkbox creation is we create a way to actually change the checkbox status - a HTML event listener
      //in the event of a change we run the following anonymous function
      check.addEventListener("change", () => {
        // flip the boolean ListItem status, then save the list
        currItem.checked = !currItem.checked;
        if (currItem.checked == true) {
          let audio = new Audio(taskComplSound);
          audio.volume = 0.1;
          audio.play();
        }
        fullList.save();
      });

      //   next we create the listitem's label aka the task(item text)/task description
      const label = document.createElement("label") as HTMLLabelElement;
      // in the index.html list blueprint I created the label matched the element ID and thus we accomplish the same here
      label.htmlFor = currItem.id;
      // set the labels text content as the item's description
      label.textContent = currItem.item;
      // add this label to the list element
      li.append(label);

      // lastly we add a deletion button for each list element
      const button = document.createElement("button") as HTMLButtonElement;
      // give the button html element its respective class name
      button.className = "button";
      // use the classic X will delete item UI
      button.textContent = "X";
      // add this button to the list item element
      li.append(button);
      //create an event listener for the button so we can delete if its clicked
      button.addEventListener("click", () => {
        // in which case remove the item from the fullList obj via the function previously programmed
        fullList.removeItem(currItem.id);
        //restart the render process to render the list without the item
        this.render(fullList);
      });
      this.ul.append(li);
    });
  }
}
