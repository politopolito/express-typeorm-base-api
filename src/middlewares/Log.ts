class Log {
  public linePrefix: string;

  public today = new Date();

  constructor() {
    const dateString = `${this.today.getFullYear()}-${(this.today.getMonth() + 1)}-${this.today.getDate()}`;
    const timeString = `${this.today.getHours()}:${this.today.getMinutes()}:${this.today.getSeconds()}`;
    this.linePrefix = `[${dateString} ${timeString}`;
  }

  public info = (msg: string): void => console.log(msg);

  public warn = (msg: string): void => console.warn(msg);

  public error = (msg: string): void => console.error(msg);
}

export default new Log;
