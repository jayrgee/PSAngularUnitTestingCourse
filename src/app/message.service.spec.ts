import { MessageService } from "./message.service";

describe('MessageService', () => {
    let sut: MessageService;

    it('should initially have no messages', () => {
        sut = new MessageService();

        expect(sut.messages.length).toBe(0);
    })

    it('should add a message', () => {
        sut = new MessageService();

        sut.add('a message');

        expect(sut.messages.length).toBe(1);
    })

    it('should clear all messages', () => {
        sut = new MessageService();
        sut.add('a message');

        sut.clear();

        expect(sut.messages.length).toBe(0);
    })
});