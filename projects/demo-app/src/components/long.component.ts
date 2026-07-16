import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { FormError } from "ccnextgen-layout";

@Component({
  selector: "app-long",
  templateUrl: "./long.component.html",
  imports: [CommonModule, FormError],
  standalone: true,
})
export class LongComponent {

}