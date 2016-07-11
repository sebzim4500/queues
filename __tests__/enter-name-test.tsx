/// <reference path="../typings/globals/jest/index.d.ts" />

jest.unmock("../src/components/EnterName");
import { EnterName } from "../src/components/EnterName";

import * as TestUtils from "react-addons-test-utils";

import * as React from "react";
import * as ReactDOM from "react-dom";

describe("EnterName", () => {
    it("allows the user to enter a name", () => {
        let handleNameSubmit = jest.fn();
        let enterName = TestUtils.renderIntoDocument(
            <EnterName handleNameSubmit = {handleNameSubmit} />
        ) as React.Component<any, any>;
        let enterNameNode = ReactDOM.findDOMNode(enterName);
        let inputNode = enterNameNode.querySelector("input") as HTMLInputElement;

        inputNode.value = "Test Name";
        TestUtils.Simulate.change(inputNode);
        expect(handleNameSubmit).not.toBeCalled();
        TestUtils.Simulate.keyUp(inputNode, {key : "Enter", keyCode: 13, which: 13});
        expect(handleNameSubmit).toBeCalledWith("Test Name");
    });
});
