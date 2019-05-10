import { Component, OnInit, Input } from '@angular/core';
import { PaService } from '../service/pa.service';
import { OffersService } from '../services/offers.service';


@Component({
  selector: '[app-rfqitem]',
  templateUrl: './rfqitem.component.html',
  styleUrls: ['./rfqitem.component.scss']
})
export class RfqitemComponent implements OnInit {

  constructor(private pa: PaService) { }
  @Input() rfqitem;
  @Input() offers;
  private maps: [];


   ngOnInit() {
     this.offers = Object.values(this.offers)
    }

    select(event,offer) {
      offer.selected = true;
    }




}
