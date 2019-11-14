/*
 *
 */
var AsyncEmitter = require("./asyncemitter");

export default class Historage extends AsyncEmitter {
  constructor({id}) {
    super();

    this.id = id;

    this._data = {};
  }

  get(key) {
    if (!this._data[key]) {
      this._data[key] = new HistorageData({id: this.id, key:key});
    }

    return this._data[key];
  }
};

export class HistorageData extends AsyncEmitter {
  /*
   * id ... ユニーク性を担保
   * key ... 固有のキー
   */
  constructor({id, key}) {
    super();

    this.id = id;
    this.key = key;
    this.load();
  }

  load() {
    var keyName = this.getKeyName();
    var data_str = localStorage.getItem(keyName);
    this.data = data_str ? JSON.parse(data_str) : {};
  }

  save() {
    var keyName = this.getKeyName();
    // ローカルストレージに保存
    var value_str = JSON.stringify(this.data);
    localStorage.setItem(keyName, value_str);

    this.emit('saved', {
      target: this,
    });

    return this;
  }

  getKeyName() {
    return this.id + '.' + this.key;
  }
}