// Name generator for unique identifiers
export class UniqueNameGenerator {
  private current: number[] = [0];

  next(): string {
    const name = this.current
      .map((i) => {
        const isUpperCase = i >= 26;
        const charCode = isUpperCase ? 65 + (i - 26) : 97 + i;
        return String.fromCharCode(charCode);
      })
      .join('');

    // Increment the name
    let index = this.current.length - 1;
    while (index >= 0) {
      if (this.current[index] < 51) {
        // 26 lowercase + 26 uppercase = 52
        this.current[index]++;
        break;
      } else {
        this.current[index] = 0;
        index--;
      }
    }

    if (index < 0) {
      this.current.unshift(0);
    }

    return name;
  }
}
