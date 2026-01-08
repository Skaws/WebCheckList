import ListItem from "./ListItem";
// Make the template for the list object - our "Interface" - List
interface List {
  // create an array of listItem objects and store it in
  // variable - list
  list: ListItem[];
  // creating void functions in a similar way to java and js
  load(): void;
  save(): void;
  clearList(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

// with the list's "skeleton" established we create the real model
export default class FullList implements List {
  // we're only gonna be using one list so we instantiate it within the class as static
  static instance: FullList = new FullList();
  // put private in front of the constructor to ensure only one instance of this class is created - a "singleton"
  private constructor(private _list: ListItem[] = []) {}
  get list(): ListItem[] {
    return this._list;
  }
  set list(inpList: ListItem[]) {
    this._list = inpList;
  }
  load(): void {
    // as defined in the save function we retrieve our list in string format under the title "myList" in localStorage. it can either be a string or empty - null
    const storedList: string | null = localStorage.getItem("myList");
    // if the storedList we retrieve isn't a string, exit this function as its the wrong list
    if (typeof storedList != "string") {
      return;
    }
    // when our list is put into localStorage all of it (id,the item, whether it's checked or not) is converted to text format as a string and saved
    // thus to load from localStorage we need to do the reverse and parse the string for the id, item and checked elements via JSON.parse
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    // for each "itemObj" aka element in our parsedList array
    parsedList.forEach((itemObj) => {
      // convert itemObj into a listItem by instantiating a ListItem with itemObj's attributes/variables
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      // add the item to our List
      FullList.instance.addItem(newListItem);
    });
  }
  save(): void {
    // turn all of the lists data ( for each entry - id,item,checked) into a string via JSON.stringify
    //  to put in "localstorage" aka browser storage under variable name "myList"
    // this form of storage remains even if the browser is closed or the PC restarts
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clearList(): void {
    this._list = [];
    this.save();
  }
  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }
  removeItem(id: string): void {
    // the filter function extracts all elements from an array that match the criteria given
    // in this case all ListItem objects ("item") whose id is not equal to the input id that we wish to remove
    // effectively removing the listitem with the id presented
    this._list = this._list.filter((item) => item.id != id);
  }
}
