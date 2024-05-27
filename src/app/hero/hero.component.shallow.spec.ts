import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe('HeroComponent (shallow tests)', () => {
    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });
        fixture = TestBed.createComponent(HeroComponent);
    });

    it('should have the correct hero', () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: 'Super Chicken',
            strength: 3
        };
        // fixture.detectChanges();

        expect(fixture.componentInstance.hero.name).toBe('Super Chicken');
    });

    it('should render hero name and anchor badge', () => {
        fixture.componentInstance.hero = {
            id: 1,
            name: 'Super Chicken',
            strength: 3
        };
        fixture.detectChanges();

        let deA = fixture.debugElement.query(By.css('a'));
        expect(deA.nativeElement.textContent).toContain('Super Chicken');

        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('Super Chicken');




    });
});
