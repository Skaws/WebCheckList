// item interface defined as an object
export interface Item {
  id: string;
  item: string;
  checked: boolean;
}

// inherit the item interface as a subclass
// we'll make them private by stating private with _ before the var name
export default class ListItem implements Item {
  constructor(
    private _id: string = "",
    private _item: string = "",
    private _checked: boolean = false
  ) {}
  //   classic getter and setter functions in OOP
  // necessary due to the elements being private
  get id(): string {
    return this._id;
  }
  get item(): string {
    return this._item;
  }
  get checked(): boolean {
    return this._checked;
  }
  set id(inpId: string) {
    this._id = inpId;
  }
  set item(inpItem: string) {
    this._id = inpItem;
  }
  set checked(inpChecked: boolean) {
    this._checked = inpChecked;
  }
}
