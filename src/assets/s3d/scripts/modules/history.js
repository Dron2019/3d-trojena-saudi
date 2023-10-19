import { dropRight } from "lodash";

class History {
  constructor(data) {
    this.history = [];
    this.histories = [];
    this.updateFsm = data.updateFsm;
    this.update = this.update.bind(this);
    this.next = this.next.bind(this);
    this.parseSearchUrl = this.parseSearchUrl.bind(this);
    this.replaceUrl = this.replaceUrl.bind(this);
    this.stepBack = this.stepBack.bind(this);
    this.init();
  }

  init() {
    window.onpopstate = e => {
      this.histories = dropRight(this.histories, 1);
      this.stepBack(e.state);
      return true;
    };
  }

  stepBack(data) {
    const config = data ?? this.history;
    this.updateFsm(config, true);
  }

  next(name) {
    window.history.pushState(
      name, '3dModule', this.createUrl(name),
    );

    if (this.histories[this.histories.length-1] && JSON.stringify(this.histories[this.histories.length-1]) === JSON.stringify(name)) {
      return this.history = name;
    }
    this.histories.push(name);
    this.history = name;
  }

  update(search) {
    const searchConfig = this.parseSearchUrl(window.location);
    const newSearch = {
      ...searchConfig,
      ...search,
    };

    window.history.replaceState(
      newSearch, '3dModule', this.createUrl(newSearch),
    );
    this.history = newSearch;
  }

  replaceUrl(name) {
    window.history.replaceState(
      name, '3dModule', this.createUrl(name),
    );
  }

  createUrl(data) {
    const entries = Object.entries(data);
    const href = entries.reduce((acc, [key, value]) => `${acc}&${key}=${value}`, '');
    // return `?${encodeURIComponent(href)}`;
    return `?${href}`;
  }

  parseSearchUrl(url) {
    const { searchParams } = new URL(decodeURIComponent(url));
    const parseSearchParam = Object.fromEntries(searchParams.entries());
    return parseSearchParam;
  }
}

export default History;
