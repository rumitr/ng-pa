import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() selected = new EventEmitter<number>();
  private selectedOffer: '';
  total: number = 0;


   ngOnInit() {
     this.offers = Object.values(this.offers);
     this.selectByPrice();
    }

    selectOffer(index) {
      if (this.selectedOffer !== undefined) {
        this.offers[this.selectedOffer].selected = false;
      }
      const prev_total = this.total;
      this.offers[index].selected = true;
      this.total = this.offers[index].price * this.rfqitem.quantity;
      this.selectedOffer = index;
      this.selected.emit(this.total- prev_total);
      console.log('1');
    }

    selectByPrice(){
      let price, selected_offer;

      this.offers.forEach((offer, index) => {
        if(offer !== 'null') {
          if(price == undefined){
            price = offer.price;
            selected_offer = index;
          } else if(price > offer.price) {
            price = offer.price;
            selected_offer = index;
          }
        }
      });
      if(price != undefined) {
        this.selectOffer( selected_offer);
      }
    }




}
