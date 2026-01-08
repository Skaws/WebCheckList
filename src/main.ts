import "./css/style.css";
import FullList from "./model/FullList.ts";
import ListItem from "./model/ListItem.ts";
import ListTemplate from "./templates/ListTemplates.ts";

// Void function initApp that handles app initialising and app running
const initApp = (): void => {
  // get the singletons of the full list and template from their respective objects
  const fullListInst = FullList.instance;
  const templateInst = ListTemplate.instance;
  // referring to line 18/the form section of index.html
  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;
  // add an event listener to check when a new item is SUBMITTED to the form aka new item added to the list
  // when this happens, execute the void function as stated
  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    // default behaviour is reloading the page so we want to prevent that
    event.preventDefault();
    // we create a handler to submit the event
    // to do so we first get the input html section from index.html
    // and store it in constant named input
    const input = document.getElementById("newItem") as HTMLInputElement;
    // from this html input element we then get the text and store it in newEntryText
    // whilst trimming it for whitespaces
    const newEntryText: string = input.value.trim();
    // if the length of the newEntryText is 0 (!0=1) empty the function
    if (!newEntryText.length) return;
    // we can calculate the id by getting the length of the list
    const itemId: number = fullListInst.list.length
      ? parseInt(fullListInst.list[fullListInst.list.length - 1].id) + 1
      : 1;
    // the ? is an if else statement. if the fullListLength is 0 do the first option otherwise do the second
    // the first option gets the id of the LAST element of the list and adds 1 to it to get our new item's id
    // the second option (in the case where the list length is 0) makes the item id 1
    // as the list is empty so this is our first item, and thus it has an id of 1

    // with an itemID calculates lets create our item
    const newItem = new ListItem(itemId.toString(), newEntryText);
    // then add our new item to the list
    fullListInst.addItem(newItem);
    // then re-render the list with this new item
    templateInst.render(fullListInst);
  });

  // referring to the clear items button on line 43 of the index.html file
  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  // add an event listener to check when the clear items button is clicked, in which case
  clearItems.addEventListener("click", (): void => {
    // when the list is cleared, first empty the list
    fullListInst.clearList();
    // then empty the HTML rendering the list
    templateInst.clear();
  });

  // so far only event listeners have been added but the list needs to be rendered
  // immediately upon webpage load. thus with no listeners we call the load
  // and render functions of FullList and ListTemplate instances respectively
  fullListInst.load();
  templateInst.render(fullListInst);
};

// add an event listener for DOM content loaded, aka when the DOM/page is loaded
// when this happens, call the initApp function
// this ensures we know our elements exist before we interact with them via TS
document.addEventListener("DOMContentLoaded", initApp);
