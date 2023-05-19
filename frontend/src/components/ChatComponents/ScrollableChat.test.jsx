import { render } from "@testing-library/react";
import { it, describe } from "vitest";
import ScrollableChat from "./ScrollableChat";

it("Rendering Scrollable Stuff", ()=>{
    render(<ScrollableChat/>);
    expect(true).toBe(true);
})