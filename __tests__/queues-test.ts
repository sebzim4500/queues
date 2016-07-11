/// <reference path="../typings/globals/jest/index.d.ts" />

jest.unmock("../src/Queue");
jest.unmock("../src/Queues");

import { Queue } from "../src/Queue";
import { Queues } from "../src/Queues";

describe("Queues", () => {
    let queues: Queues;
    beforeEach(() => {
        queues = new Queues([
        new Queue("First Queue", 17, ["Bob"]),
        new Queue("Second Queue", 11, ["John", "Bob"]),
        new Queue("Third Queue", 41, ["John"])]);
    });

    it("can find the index of a queue", () => {
        expect(queues.indexOf(17)).toBe(0);
        expect(queues.indexOf(11)).toBe(1);
        expect(queues.indexOf(41)).toBe(2);
        expect(queues.indexOf(3)).toBe(-1);
    });

    it("can delete a queue", () => {
        queues.deleteQueue(11);
        expect(queues.queues.length).toBe(2);
        expect(queues.queues[1].id).toBe(41);
    });

    it("can push a queue", () => {
        let newQueue = new Queue("Fourth Queue", 15, []);
        queues.pushQueue(newQueue);
        expect(queues.queues.length).toBe(4);
        expect(queues.queues[3]).toBe(newQueue);
    });

    it("can make a user join a queue", () => {
        queues.toggleJoin(41, "Bob");
        expect(queues.queues[2].users).toEqual(["John", "Bob"]);
    });

    it("can make a user leave a queue", () => {
        queues.toggleJoin(11, "Bob");
        expect(queues.queues[2].users).toEqual(["John"]);
    });
});
