/// <reference path="../typings/globals/jest/index.d.ts" />

jest.unmock("../src/components/TopMenu");
jest.unmock("../src/components/AddQueueButton");
import { TopMenu } from "../src/components/TopMenu";

import * as TestUtils from "react-addons-test-utils";

import * as React from "react";
import * as ReactDOM from "react-dom";

describe("TopMenu", () => {
    it("allows the user to add a queue", () => {
        let handleAddQueue = jest.fn();
        let enterName = TestUtils.renderIntoDocument(
            <TopMenu handleAddQueue = {handleAddQueue}/>
        ) as React.Component<any, any>;
        let topMenuNode = ReactDOM.findDOMNode(enterName);
        expect(topMenuNode.querySelector("input")).not.toBeTruthy();
        TestUtils.Simulate.click(topMenuNode.querySelector(".AddQueueButton"));

        let inputNode = topMenuNode.querySelector("input") as HTMLInputElement;

        expect(inputNode).toBeTruthy();
        expect(topMenuNode.querySelector(".AddQueueButton")).not.toBeTruthy();

        inputNode.value = "Test Queue";
        TestUtils.Simulate.change(inputNode);
        expect(handleAddQueue).not.toBeCalled();
        TestUtils.Simulate.keyUp(inputNode, {key : "Enter", keyCode: 13, which: 13});
        expect(handleAddQueue).toBeCalledWith("Test Queue");
        expect(topMenuNode.querySelector(".AddQueueButton")).toBeTruthy();
    });

    it("disallows the user from adding an empty queue", () => {
        let handleAddQueue = jest.fn();
        let enterName = TestUtils.renderIntoDocument(
            <TopMenu handleAddQueue = {handleAddQueue}/>
        ) as React.Component<any, any>;
        let topMenuNode = ReactDOM.findDOMNode(enterName);
        expect(topMenuNode.querySelector("input")).not.toBeTruthy();
        TestUtils.Simulate.click(topMenuNode.querySelector(".AddQueueButton"));

        let inputNode = topMenuNode.querySelector("input") as HTMLInputElement;

        expect(inputNode).toBeTruthy();
        expect(topMenuNode.querySelector(".AddQueueButton")).not.toBeTruthy();

        TestUtils.Simulate.keyUp(inputNode, {key : "Enter", keyCode: 13, which: 13});
        expect(handleAddQueue).not.toBeCalled();
        expect(topMenuNode.querySelector(".AddQueueButton")).toBeTruthy();
    });
});
