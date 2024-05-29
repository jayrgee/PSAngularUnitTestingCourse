import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from "@angular/core/testing";
import { HeroDetailComponent } from "./hero-detail.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../hero.service";
import { Location } from "@angular/common";
import { of } from "rxjs";
import { HeroComponent } from "../hero/hero.component";
import { FormsModule } from "@angular/forms";

describe('HeroDetailComponent', () => {
  let fixture: ComponentFixture<HeroDetailComponent>
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: { paramMap: { get: () => '3' } }
    };
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      declarations: [HeroDetailComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: HeroService, useValue: mockHeroService },
        { provide: Location, useValue: mockLocation },
      ],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of({id:3, name: 'SuperDude', strength: 55}));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called (fakeAsync)', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges()

    fixture.componentInstance.save();
    // tick(250);
    flush();
    
    expect(mockHeroService.updateHero).toHaveBeenCalled();
  }));

  it('should call updateHero when save is called (waitForAsync)',  waitForAsync(() => {
    // note: waitForAsync only works for promises
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges()

    fixture.componentInstance.save2();

    fixture.whenStable().then(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled();
    })
  }));
});