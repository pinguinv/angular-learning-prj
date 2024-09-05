// this is dummy service added to learn how can I load services in Angular

import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LoggingService {
  lastLog?: string;

  printLog(message: string) {
    console.log(this.lastLog);
    console.log(message);
    this.lastLog = message;
  }
}
