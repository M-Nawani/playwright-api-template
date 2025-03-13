import { test, expect } from "@playwright/test";
import { ApiHelper } from "../../utilities/api_template/ApiHelper";
import { ResponseAssertions } from "../../utilities/api_template/ResponseAssertions";

test.describe.configure({ mode: "serial" });
test.describe("Restful Booker - E2E Test", () => {
  const baseURL = "https://restful-booker.herokuapp.com";
  const apiHelper = new ApiHelper(baseURL);
  const resource = "booking";

  test("Get bookings by ID", async () => {
    const id = "1";

    await test.step("Send GET request to fetch booking details", async () => {
      console.log(`Reading resource at ${baseURL}/${resource}/${id}`);
    });

    const readResponse = await test.step(
      "Execute API call to fetch booking",
      async () => {
        return await apiHelper.readSingleResource(resource, id);
      }
    );

    await test.step("Verify response status is 200", async () => {
      expect(readResponse.status).toBe(200);
    });

    const response_json = await test.step("Parse response JSON", async () => {
      return await readResponse.data;
    });

    await test.step("Validate response properties", async () => {
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "",
        "firstname",
        "Jim"
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "",
        "lastname",
        "Brown"
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "",
        "depositpaid",
        true
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "",
        "totalprice",
        990
      );
      //ResponseAssertions.assertPropertyEquals(response_json, "", "additionalneeds", "Breakfast");
    });
  });

  test("Create new booking", async () => {
    const requestBody = {
      firstname: "John",
      lastname: "Doe",
      totalprice: 899,
      depositpaid: true,
      bookingdates: {
        checkin: "2025-02-10",
        checkout: "2025-02-12",
      },
      additionalneeds: "Breakfast",
    };

    await test.step("Send POST request to create booking", async () => {
      console.log(
        `Creating resource at ${baseURL}/${resource} with request body:`,
        requestBody
      );
    });

    const createResponse = await test.step(
      "Execute API call to create booking",
      async () => {
        return await apiHelper.createResource(resource, requestBody);
      }
    );

    await test.step("Verify response status is 200", async () => {
      expect(createResponse.status).toBe(200);
    });

    const response_json = await test.step("Parsing response json", async () => {
      return await createResponse.data;
    });
    console.log("Response json is", response_json);

    await test.step("Validating response properties", async () => {
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "booking",
        "firstname",
        "John"
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "booking",
        "lastname",
        "Doe"
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "booking",
        "depositpaid",
        true
      );
      ResponseAssertions.assertPropertyEquals(
        response_json,
        "booking",
        "totalprice",
        899
      );
      //const bookingID = response_json.bookingid;
      //console.log("Created booking ID:", bookingID);
    });
  });

  test("Get booking by non-existent ID", async () => {
    const id = "900008";
  
    const readResponse = await test.step(
      "Execute API call to fetch non-existent booking",
      async () => {
        return await apiHelper.readSingleResource(resource, id);
      }
    );
  
    await test.step("Verify response status is 404", async () => {
      expect(readResponse.status).toBe(404);
    });
  });

  test("Create booking with missing required fields", async () => {
    const requestBody = {
      firstname: "John",
    };

    await test.step("Send POST request to create booking", async () => {
      console.log(
        `Creating resource at ${baseURL}/${resource} with request body:`,
        requestBody
      );
    });

    const createResponse = await test.step(
      "Execute API call to create booking",
      async () => {
        return await apiHelper.createResource(resource, requestBody);
      }
    );

    await test.step("Verify response status is 500", async () => {
      expect(createResponse.status).toBe(500);
    });
  });

  test("Check response time for fetching booking", async () => {
    const id = "1";
    const start = Date.now();
    
    const readResponse = await test.step(
      "Execute API call to fetch booking",
      async () => {
        return await apiHelper.readSingleResource(resource, id);
      }
    );
  
    const responseTime = Date.now() - start;
    console.log(`Response time: ${responseTime}ms`);
  
    await test.step("Verify response time is within acceptable range", async () => {
      expect(responseTime).toBeLessThan(3000); // 3 seconds
    });
  });
  
  
});
