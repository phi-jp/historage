/*
 *
 */

export default class Historage {
  constructor({id}) {
    this.id = id;

    this._data = {};
  }

  get(key) {
    var new_key = this.getKey(key);
    if (!this._data[new_key]) {
      var item = localStorage.getItem(new_key);
      this._data[new_key] = item ? JSON.parse(item) : null;
    }

    return this._data[new_key];
  }

  set(key, value) {
    var new_key = this.getKey(key);
    this._data[new_key] = value;

    // ローカルストレージに保存
    var value_str = JSON.stringify(value);
    var item = localStorage.setItem(new_key, value_str);
  }

  sync(key) {
    var new_key = this.getKey(key);
    var value_str = JSON.stringify(value);
    var item = localStorage.setItem(new_key, value_str);
  }

  getKey(key) {
    return this.id + '_' + key;
  }
};
