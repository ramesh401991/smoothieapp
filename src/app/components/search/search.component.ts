import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject,debounceTime,distinctUntilChanged, Subscription } from 'rxjs';
import { SmoothieService } from 'src/app/services/smoothie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,OnDestroy {
  
  @Input() initialValue: string = '';
  @Input() debounceTime: number = 300;

  inputValue = new Subject<string>();

  trigger = this.inputValue.pipe(
    debounceTime(this.debounceTime),
    distinctUntilChanged()
  );

  searchSubscriptions: Subscription[] = [];

  constructor(private smoothieService: SmoothieService) {
  }

  ngOnInit() {
    const subscription = this.trigger.subscribe(currentValue => {
      console.log(currentValue);
      this.smoothieService.textChange.next(currentValue);
    });
    this.searchSubscriptions.push(subscription);
  }

  ngOnDestroy() {
    this.searchSubscriptions.forEach(sub => sub.unsubscribe());
  }

  onInput(e: any) {
    console.log(e);
    this.inputValue.next(e.target.value);
  }


}
