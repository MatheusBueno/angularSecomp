import { Component, OnInit, Output, EventEmitter } from "@angular/core";

import { AuthenticateService } from "src/app/shared/services/authenticate.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public existUser: boolean = false;

  @Output() openModalEmitter: EventEmitter<void> = new EventEmitter();

  constructor(private authenticateService: AuthenticateService) {}

  ngOnInit() {
    this.authenticateService.user$.subscribe(user => (this.existUser = !!user));
  }

  async logout() {
    try {
      await this.authenticateService.logout();
    } catch (error) {
      console.log(error);
    }
  }

  openModal() {
    this.openModalEmitter.emit();
  }
}
