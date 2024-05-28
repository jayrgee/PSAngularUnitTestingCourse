import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('HeroService', () => {
    let service: HeroService;
    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let HEROES;

    beforeEach(() => {
        HEROES = [
            {id:1, name: 'SpiderDude', strength: 8},
            {id:2, name: 'Wonderful Woman', strength: 24},
            {id:3, name: 'SuperDude', strength: 55}
        ];

        mockMessageService = jasmine.createSpyObj(['add'])

        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [
                HeroService,
                {provide: MessageService, useValue: mockMessageService }
            ]
        })

        service = TestBed.inject(HeroService);
        httpTestingController = TestBed.inject(HttpTestingController);
        // let msgSvc = TestBed.inject(MessageService);
    });

    describe('getHero', () => {
        it('should ... with verbose DI', inject(
            [HeroService, HttpTestingController],
            (service: HeroService, controller: HttpTestingController) => {
            // call getHero
            service.getHero(4).subscribe();

            // test URL was correct
            const req = httpTestingController.expectOne('api/heroes/4');

            req.flush({id:4, name: 'SpiderDude', strength: 8});
            expect(req.request.method).toBe('GET');
            httpTestingController.verify();
        }));
        it('should call get with expected URL', () => {
            // call getHero
            service.getHero(4).subscribe(hero => {
                expect(hero.id).toBe(4)
            });
            // service.getHero(5).subscribe();

            // test URL was correct
            const req = httpTestingController.expectOne('api/heroes/4');

            req.flush({id:4, name: 'SpiderDude', strength: 8});
            // expect(req.request.method).toBe('GET');
            httpTestingController.verify();
        });
    });
});
