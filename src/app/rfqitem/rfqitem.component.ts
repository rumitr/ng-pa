import { Component, OnInit, Input } from '@angular/core';
import { PaService } from '../service/pa.service';


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
     this.offers = Object.values(this.offers);
     this.selectByPrice();
    }

    selectOffer(event,offer) {
      offer.selected = true;
    }
    toggleOffer(){

    }

    selectByPrice(){
      let price, selected_offer;

      this.offers.forEach((offer, index) => {
        if(offer !== 'null') {
          if(price == undefined){
            price = offer.price;
            selected_offer = index;
          } else if(price < offer.price) {
            price = offer.price;
            selected_offer = index;
          }
        }
      });
      if(price != undefined) {
        this.offers[selected_offer]['selected'] = true;
      }
    }
    calculatePrice(){

    }




}
