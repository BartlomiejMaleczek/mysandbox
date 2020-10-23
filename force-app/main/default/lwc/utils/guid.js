class Guid {
  static GENERATED_KEYS = [];

  generate() {
    let value =
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      this.s4() +
      this.s4();

    if (Guid.GENERATED_KEYS.includes(value)) {
      this.generate();
    } else {
      Guid.GENERATED_KEYS.push(value);
      return value;
    }
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
}

const _guid = new Guid();

export { _guid };
