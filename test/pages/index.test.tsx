import React from "react";
import { render } from "../testUtils";
import { Home } from "../../pages/index";

describe("pages/index.tsx", () => {
    it("matches snapshot", () => {
        const { asFragment } = render(<Home />, {});
        expect(asFragment()).toMatchSnapshot();
    });
});
