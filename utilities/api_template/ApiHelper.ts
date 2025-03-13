require("dotenv").config();

interface ApiResponse<T> {
  data: T;
  status: number;
}

export class ApiHelper {
  private apiURL: string;
  private commonHeaders: Record<string, string>;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
    this.commonHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.PWE2E_APP_TOKEN}`,
    };
  }

  // Private method to fetch a resource
  private async fetchResource<T>(
    url: string,
    method: string,
    requestBody?: any,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    // Append query parameters to the URL if available
    if (queryParams) {
      url += `?${new URLSearchParams(queryParams).toString()}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: this.commonHeaders,
        body: requestBody ? JSON.stringify(requestBody) : undefined,
      });

      // Check if the response is JSON or plain text
      let data: any;

      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          // Parse JSON response
          data = await response.json();
        } else {
          // Handle non-JSON responses
          data = await response.text();
        }
      } else {
        // Handle non-200 responses
        data = await response.text();
      }

      return { data, status: response.status };
    } catch (error) {
      console.error(`Error during API request: ${error}`);
      throw error;
    }
  }

  // Utility function for building resource URLs
  private buildUrl(resource: string, id?: string): string {
    return `${this.apiURL}/${resource}${id ? `/${id}` : ""}`;
  }

  /**
   * Creates a resource via POST request.
   * @param resource : The resource path.
   * @param requestBody : The body data.
   * @param queryParams : Optional query parameters.
   * @returns {Promise<ApiResponse>} A promise that resolves with the API response.
   */
  async createResource<T>(
    resource: string,
    requestBody: any,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(resource);
    return this.fetchResource(url, "POST", requestBody, queryParams);
  }

  /**
   * Reads a resource via GET request.
   * @param resource : The resource path.
   * @param queryParams : Optional query parameters.
   * @returns {Promise<ApiResponse>} A promise that resolves with the API response.
   */
  async readResource<T>(
    resource: string,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(resource);
    return this.fetchResource(url, "GET", undefined, queryParams);
  }

  /**
   * Updates a resource via PUT request.
   * @param resource : The resource path.
   * @param id : The resource ID.
   * @param requestBody : The body data.
   * @param queryParams : Optional query parameters.
   * @returns {Promise<ApiResponse>} A promise that resolves with the API response.
   */
  async updateResource<T>(
    resource: string,
    id: string,
    requestBody: any,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(resource, id);
    return this.fetchResource(url, "PUT", requestBody, queryParams);
  }

  /**
   * Deletes a resource via DELETE request.
   * @param resource : The resource path.
   * @param id : The resource ID.
   * @param queryParams : Optional query parameters.
   * @returns {Promise<ApiResponse>} A promise that resolves with the API response.
   */
  async deleteResource<T>(
    resource: string,
    id: string,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(resource, id);
    return this.fetchResource(url, "DELETE", undefined, queryParams);
  }

  /**
   * Reads a single resource via GET request.
   * @param resource : The resource path.
   * @param id : The resource ID.
   * @param queryParams : Optional query parameters.
   * @returns {Promise<ApiResponse>} A promise that resolves with the API response.
   */
  async readSingleResource<T>(
    resource: string,
    id: string,
    queryParams?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(resource, id);
    return this.fetchResource(url, "GET", undefined, queryParams);
  }
}
