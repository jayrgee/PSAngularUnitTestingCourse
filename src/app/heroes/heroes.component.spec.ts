// import { HeroService } from "../hero.service";
import { of } from "rxjs";
import { HeroesComponent } from "./heroes.component";

describe('HeroesComponent', () => {
    let sut: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55}
        ];

        mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

        sut = new HeroesComponent(mockHeroService);
    });

    describe('delete', () => {
        it('should delete item', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            sut.heroes = HEROES;

            sut.delete(HEROES[2]);

            expect(sut.heroes.length).toBe(2); // only tests the state of the component

            // TODO: explicitly check specified item has been deleted
        });

        it('should call deleteHero', () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            sut.heroes = HEROES;

            sut.delete(HEROES[2]);

            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });

        //  TODO: test we are subscribing to the deleteHero call
    });
});
