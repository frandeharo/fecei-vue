export interface CustomErrorInterface {
  msg: string;
  code: number | null;
}


export class CustomError {
  msg = ''
  code: number | null = null

  constructor(msg: string, code: number | null = null) {
    this.msg = msg;
    this.code = code;
  }
}
