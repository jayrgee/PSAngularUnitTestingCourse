import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import { HeroService } from "../hero.service";
import { HeroComponent } from "../hero/hero.component";
import { of } from "rxjs";
import { Directive, Input, NO_ERRORS_SCHEMA, input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";

// template for dealing with built-in directives
@Directive({
  selector: '[routerLink]',
  host: { '(click)': 'onClick()' }
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('HeroesComponent (deep tests)', () => {
    let fixture: ComponentFixture<HeroesComponent>;
    let mockHeroService;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj([
            'getHeroes',
            'addHero',
            'deleteHero'
        ]);

        TestBed.configureTestingModule({
            declarations: [
                HeroesComponent,
                HeroComponent,
                RouterLinkDirectiveStub
            ],
            providers: [
                {
                    provide: HeroService,
                    useValue: mockHeroService
                }
            ],
            // schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroesComponent);

    });

    it('should render each hero as a HeroComponent', () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        // run ngOnInit
        fixture.detectChanges();

        // in Angular a component is a subclass of a directive
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // expect(heroComponentDEs.length).toBe(3);
        // expect(heroComponentDEs[0].componentInstance.hero.name).toBe('foo')
        // expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('SpiderDude');

        for (let i = 0; i < heroComponentDEs.length; i++) {
            expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
        }
    })

    // Testing DOM Interaction
   
    it(`should call heroService.deleteHero when the Hero Component's
      delete button is clicked`, () => {
        spyOn(fixture.componentInstance, 'delete');
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        fixture.detectChanges();

        // in Angular a component is a subclass of a directive
        const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

        // trigger click event on child DOM element 
        // heroComponentDEs[0].query(By.css('button')).triggerEventHandler('click', {stopPropagation: () => {}});
        // OR
        // emit delete event from child component
        // (<HeroComponent>heroComponentDEs[0].componentInstance).delete.emit(undefined);
        // OR
        // trigger delete event on debug element
        heroComponentDEs[0].triggerEventHandler('delete', null);

        expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
    });

    it('should add a new hero to the hero list when the add button is clicked', () => {
      // note: not specifically deep or shallow test
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      const name = "Foo Bar";
      mockHeroService.addHero.and.returnValue(of({id: 5, name, strength: 4}))
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

      inputElement.value = name;
      addButton.triggerEventHandler('click', null);
      fixture.detectChanges();

      const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
      expect(heroText).toContain(name);
    })

    // test routerLink
    fit('should have the correct route for the first hero', () => {
      mockHeroService.getHeroes.and.returnValue(of(HEROES));
      fixture.detectChanges();
      // in Angular a component is a subclass of a directive
      const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

      let routerLink = heroComponentDEs[0]
        .query(By.directive(RouterLinkDirectiveStub))
        .injector.get(RouterLinkDirectiveStub) // returns a handle for the actual router link directive stub instance

      // click on first anchor tag
      heroComponentDEs[0].query(By.css('a')).triggerEventHandler('click', null);

      expect(routerLink.navigatedTo).toBe('/detail/1');
    });
});
