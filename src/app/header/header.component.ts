import { Component, OnInit, Input } from '@angular/core';
import { PaService } from '../service/pa.service';

@Component({
  selector: '[app-header]',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private pa: PaService) { }

  @Input() suppliers;
  @Input() total;
  ngOnInit() {
   }

}
