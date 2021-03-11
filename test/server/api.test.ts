import api from "../../server/api";
import { Application } from "express";
import { RocketCrab } from "../../types/types";

describe("server/api.ts", () => {
    let app;
    let rocketcrab: RocketCrab;
    beforeEach(() => {
        app = ({
            post: jest.fn(),
            get: jest.fn(),
            all: jest.fn(),
        } as unknown) as Application;

        rocketcrab = ({
            partyList: [],
        } as Partial<RocketCrab>) as RocketCrab;

        api(app, rocketcrab);
    });

    it("/api/new works", () => {
        expect(app.post.mock.calls[0][0]).toEqual("/api/new");
        const handler = app.post.mock.calls[0][1];
        const res = { json: jest.fn() };
        handler(undefined, res);

        expect(rocketcrab.partyList[0].code).toEqual(
            res.json.mock.calls[0][0].code
        );
    });

    it("/transfer create party", () => {
        expect(app.get.mock.calls[0][0]).toEqual("/transfer/:gameid/:uuid?");
        const handler = app.get.mock.calls[0][1];
        const req = {
            params: {
                uuid: "1234567890",
                gameid: "drawphone",
            },
            query: {
                name: "John",
            },
        };
        const res = {
            cookie: jest.fn(),
            redirect: jest.fn(),
        };
        handler(req, res);

        expect(rocketcrab.partyList[0].uuid).toEqual(req.params.uuid);
        expect(rocketcrab.partyList[0].selectedGameId).toEqual(
            req.params.gameid
        );
        expect(res.cookie.mock.calls[0][1]).toEqual(req.query.name);
    });

    it("/transfer doesn't create party if already made", () => {
        const handler = app.get.mock.calls[0][1];
        const res = {
            cookie: jest.fn(),
            redirect: jest.fn(),
        };
        handler(
            {
                params: {
                    uuid: "1234567890",
                    gameid: "drawphone",
                },
                query: {
                    name: "John",
                },
            },
            res
        );
        handler(
            {
                params: {
                    uuid: "1234567890",
                    gameid: "drawphone",
                },
                query: {
                    name: "Jack",
                },
            },
            res
        );

        expect(rocketcrab.partyList.length).toEqual(1);
    });

    it("/transfer doesn't create party if uuid invalid", () => {
        const handler = app.get.mock.calls[0][1];
        const req = {
            params: {
                uuid: "12345",
            },
            query: {},
        };
        const end = jest.fn();
        const res = {
            status: jest.fn(() => ({ end })),
        };
        handler(req, res);

        expect(rocketcrab.partyList.length).toEqual(0);
        expect(res.status).toBeCalledWith(400);
        expect(end).toBeCalled();
    });

    it("/transfer works without uuid", () => {
        const handler = app.get.mock.calls[0][1];
        const req = {
            params: {
                gameid: "drawphone",
            },
            query: {},
        };
        const res = {
            redirect: jest.fn(),
        };
        handler(req, res);

        expect(rocketcrab.partyList[0].selectedGameId).toEqual(
            req.params.gameid
        );
    });

    it("/transfer works without uuid even if gameid invalid", () => {
        const handler = app.get.mock.calls[0][1];
        const req = {
            params: {
                gameid: "game-that-doesnt-exist",
            },
            query: {},
        };
        const res = {
            redirect: jest.fn(),
        };
        handler(req, res);

        expect(rocketcrab.partyList[0].selectedGameId).toBe("");
    });

    it("locale transfers work", () => {
        expect(app.all.mock.calls[0][0]).toEqual(["/MAIN/*", "/KIDS/*"]);
        const handler = app.all.mock.calls[0][1];
        const res = { redirect: jest.fn() };
        handler({ originalUrl: "/MAIN/a/b/c" }, res);
        handler({ originalUrl: "/KIDS/d/e/f" }, res);

        expect(res.redirect.mock.calls.length).toBe(2);
        expect(res.redirect.mock.calls[0][0]).toBe("/a/b/c");
        expect(res.redirect.mock.calls[1][0]).toBe("/d/e/f");
    });
});
