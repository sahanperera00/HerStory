import { getByTestId, render } from "@testing-library/react";
import ProfileModal from "./ProfileModal";

import { it } from "vitest";


it("should work", (ctx)=>{
    console.log(ctx.meta.name);
})

it("rendering Profile Modal Component",()=>{
    render(<ProfileModal/>);
    const data = getByTestId("username");
    expect(data);
})

