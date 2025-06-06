import { describe, expect, it } from "@jest/globals";
import { fetchAPIByPage } from "../src/runner.js";
import page01Fixture from "./fixtures/get-page01.json";
import page02Fixture from "./fixtures/get-page02.json";

/*
como o global.fetch não faz chamadas usando o http.request ou http.ClientRequest
instalamos o axios para fazer requisições
*/
import nock from "nock";

describe("Web Integration Test Suite", () => {
  /*   it("without nock", async () => {
    const page10 = await fetchAPIByPage(10);
    console.log("page10: ", page10);
  }); */

  it("should return the right object with right properties", async () => {
    const scope = nock("https://rickandmortyapi.com/api")
      .get("/character/")
      .query({ page: 1 })
      .reply(200, page01Fixture);

    const page01 = await fetchAPIByPage();
    expect(page01).toEqual([
      {
        id: 1,
        name: "Rick Sanchez",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      },
    ]);
    scope.done();
  });

  it("should return the right object with right properties", async () => {
    const scope = nock("https://rickandmortyapi.com/api")
      .get("/character/")
      .query({ page: 2 })
      .reply(200, page02Fixture);

    const page02 = await fetchAPIByPage(2);
    expect(page02).toEqual([
      {
        id: 21,
        name: "Aqua Morty",
        image: "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
      },
    ]);
    scope.done();
  });
});
