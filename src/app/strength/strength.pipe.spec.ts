import { StrengthPipe } from "./strength.pipe";

describe('StrengthPipe', () => {
    let sut;

    beforeEach(() => {
        sut = new StrengthPipe();
    });

    it('should display weak when strength is less than 10', () => {
        expect(sut.transform(9)).toBe('9 (weak)');
    });

    it('should display strong when strength is 15', () => {
        expect(sut.transform(15)).toBe('15 (strong)');
    });

    it('should display unbelievable when strength is 20', () => {
        expect(sut.transform(20)).toBe('20 (unbelievable)');
    });
});