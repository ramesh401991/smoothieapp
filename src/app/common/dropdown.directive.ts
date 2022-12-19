import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
    selector: '[appDropDown]',
    exportAs:'appDropDown'
})

export class DropDownDirective{
    
    @HostBinding('class.open') isOpen = false;

    @HostListener('document:click',['$event']) toggleOpen(event: Event){
        //console.log(this.elRef.nativeElement);
        //console.log(event);
        this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen:false;
        
        //this.isOpen = !this.isOpen;
    }

    constructor(private elRef: ElementRef){}

}