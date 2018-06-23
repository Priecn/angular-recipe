import { Directive, HostListener, ViewChild, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{
    isOpen: boolean;


    constructor(private elementRef: ElementRef, private renderer: Renderer2){ }

    ngOnInit(){
        this.isOpen = false;
    }

    @HostListener('click') toggleDropdownMenu() {
        var dropdownMenuDiv: HTMLDivElement  = this.elementRef.nativeElement.childNodes[1];
        if(!this.isOpen)
            this.renderer.addClass(dropdownMenuDiv, 'show');
        else
            this.renderer.removeClass(dropdownMenuDiv, 'show');
        this.isOpen = !this.isOpen;
    }
}