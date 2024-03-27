export default class item {
  constructor(title, note, features, price, extra_details, purchased) {
    this.title = title; //string
    this.note = note; //string
    this.features = features; //list of strings
    this.price = price; //number
    this.extra_details = extra_details;
    this.purchased = purchased;
  }
  toJSON() {
    return JSON.stringify(this);
  }

  get title() {
    return this.title;
  }

  set title(title) {
    this.title = title;
  }

  get features() {
    return this.features;
  }

  set features(features) {
    this.features = features;
  }

  get price() {
    return this.price;
  }

  set price(price) {
    this.price = price;
  }

  get note() {
    return this.note;
  }

  set note(note) {
    this.note = note;
  }

  get extraDetails() {
    return this.extra_details;
  }

  set extraDetails(extra_details) {
    this.extra_details = extra_details;
  }
  get purchased() {
    return this.purchased;
  }

  set purchased(purchased) {
    this.purchased = purchased;
  }
}
