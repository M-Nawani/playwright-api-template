import { expect } from "@playwright/test";

export class ResponseAssertions {
  /**
   * Asserts that a response body contains a specific property, works for nested properties.
   * @param responseBody The response body to assert against.
   * @param parentPropertyName The name of the parent property if the property is nested, otherwise leave it empty.
   * @param propertyName The name of the property to check.
   * @param expectedValue Expected value of the property.
   */
  static assertPropertyEquals(
    responseBody: any,
    parentPropertyName: string,
    propertyName: string,
    expectedValue: any
  ) {
      const propertyValue = parentPropertyName ? responseBody[parentPropertyName]?.[propertyName] :
        responseBody?.[propertyName]
      expect(propertyValue).toEqual(expectedValue);
  }

  /**
   * Asserts that a response body contains a specific property.
   * @param responseBody The response body to assert against.
   * @param parentPropertyName The name of the parent property if the property is nested, otherwise leave it empty.
   * @param propertyName The name of the property to check.
   */
  static assertPropertyExists(
    responseBody: any,
    parentPropertyName: string,
    propertyName: string
  ) {
    if (parentPropertyName) {
      //Check for nested properties
      expect(responseBody[parentPropertyName]).toHaveProperty(propertyName);
    } else {
      expect(responseBody).toHaveProperty(propertyName);
    }
  }

  /**
   * Asserts that a response body does not contain a specific property.
   * @param responseBody The response body to assert against.
   * @param parentPropertyName The name of the parent property if the property is nested, otherwise leave it empty.
   * @param propertyName The name of the property to check.
   */
  static assertPropertyDoesNotExist(
    responseBody: any,
    parentPropertyName: string,
    propertyName: string
  ) {
    if (parentPropertyName) {
      expect(responseBody[parentPropertyName]).not.toHaveProperty(propertyName);
    } else {
      expect(responseBody).not.toHaveProperty(propertyName);
    }
  }

  /**
   * Asserts that a property is not empty.
   * @param responseBody The response body to assert against.
   * @param parentPropertyName The name of the parent property.
   * @param propertyName The name of the property to check.
   */
  static assertPropertyNotEmpty(
    responseBody: any,
    parentPropertyName: string,
    propertyName: string
  ) {
    let propertyValue;
    if (parentPropertyName) {
      propertyValue = responseBody[parentPropertyName][propertyName];
    } else {
      propertyValue = responseBody[propertyName];
    }

    // Check if the property value is empty based on its type
    if (Array.isArray(propertyValue)) {
      expect(propertyValue).not.toHaveLength(0);
    } else {
      expect(propertyValue).toBeTruthy();
    }
  }
  /**
   * Asserts that a property has some value.
   * @param responseBody The response body to assert against.
   * @param parentPropertyName The name of the parent property.
   * @param propertyName The name of the property to check.
   */
  static assertPropertyHasValue(
    responseBody: any,
    parentPropertyName: string,
    propertyName: string
  ) {
    let propertyValue;
    if (parentPropertyName) {
      propertyValue = responseBody[parentPropertyName][propertyName];
    } else {
      propertyValue = responseBody[propertyName];
    }
    expect(propertyValue).not.toBeNull();
  }

  /**
   * Asserts that the lengths of specified arrays in the response body are as expected.
   * @param responseBody The response body to assert against.
   * @param parentProperty The name of the parent property containing the array.
   * @param property The name of the property (array) to check.
   * @param expectedLength The expected length of the array.
   */
  static assertArrayLength(
    responseBody: any,
    parentProperty: string,
    property: string,
    expectedLength: number
  ) {
    const array = parentProperty
      ? responseBody[parentProperty][property]
      : responseBody[property];
    expect(array).toHaveLength(expectedLength);
  }

  /**
   * Asserts that the object contains the expected number of properties.
   * @param obj The object to assert against.
   * @param parentPropertyName The name of the parent property if nested.
   * @param propertyName The name of the property to assert against.
   * @param expectedCount The expected number of properties in the object.
   */
  static assertObjectPropertyCount(
    obj: any,
    parentPropertyName: string | undefined,
    propertyName: string,
    expectedCount: number
  ) {
    let propertyObj = parentPropertyName ? obj[parentPropertyName] : obj;
    const actualCount = Object.keys(propertyObj[propertyName]).length;
    expect(actualCount).toBe(expectedCount);
  }

  /**
   * Asserts that the response contains a specific error message.
   * @param responseBody The response body to assert against.
   * @param expectedErrorMessage The expected error message.
   */
  static assertErrorMessage(responseBody: any, expectedErrorMessage: string) {
    expect(responseBody.error).toBeDefined();
    expect(responseBody.error.message).toEqual(expectedErrorMessage);
  }
}
