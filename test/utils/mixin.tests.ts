import mixin from "../../src/utils/mixin";
import * as chai from "chai";

const addMixin = mixin({
    add(x: number, y: number) {
        return x + y;
    },
}, {
    COST: 1,
});

@addMixin
class Calculator {
    static COST: number;
    add: (x: number, y: number) => number;
}

describe("<HEREMap />", () => {
    describe("#mixin(behavior: any, sharedBehavior: any = {})", () => {

        it("should add behavior to a class where a decorator provided", () => {
            const calculator = new Calculator();

            const total = calculator.add(10, 10);

            // should add 10 and 10
            chai.expect(total).to.equal(20);
        });

        it("should add static behavior to a class when a decorator with such behavior is provided", () => {
            // should have a static property, COST, equal to 1
            chai.expect(Calculator.COST).to.equal(1);
        });

        it("should support the instanceof operator", () => {
            const calculator = new Calculator();
            chai.expect(calculator instanceof addMixin).to.be.true;
        });

    });
});
