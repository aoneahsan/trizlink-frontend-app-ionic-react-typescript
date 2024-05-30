import { type Response } from 'express';
import messages from '../constants/messages';

/**
 * Generates a unique random key.
 *
 * @returns {string} A unique random key.
 */
export const getZUniqueKey = (): string => {
    // Get the current timestamp and convert it to a base-36 string
    const head = Date.now().toString(36);

    // Generate a random number, convert it to a base-36 string, and remove the leading "0."
    const tail = Math.random().toString(36).substr(2);

    // Concatenate the timestamp string and the random string, and return it
    return head + tail;
};

/**
 * Sends a standardized success response with the given data.
 *
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {unknown} data - The data to include in the response body. This can be of any type.
 * @returns {Response} The response object with the success status and data.
 */
export const sendBackSuccessResponse = (res: Response, data: unknown): Response => {
    return res.status(200).send({
        success: true,
        data: data,
        message: messages.general.requestSuccess
    });
}

/**
 * Sends a standardized failed response with the given error.
 *
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {unknown} error - The error to include in the response body. This can be of any type.
 * @returns {Response} The response object with the failed status and error.
 */
export const sendBackFailedResponse = (res: Response, error: unknown): Response => {
    return res.status(500).send({
        success: false,
        error: error,
        message: messages.general.requestSuccess
    });
}

/**
 * Sends a standardized response for invalid parameters.
 *
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {unknown} error - The error to include in the response body. This can be of any type.
 * @returns {Response} The response object with the invalid parameters status and error.
 */
export const sendBackInvalidParamsResponse = (res: Response, error: unknown): Response => {
    return res.status(400).send({
        success: false,
        error: error,
        message: messages.general.invalidParams
    });
}

/**
 * Sends a standardized response for not found resources.
 *
 * @param {Response} res - The response object used to send the HTTP response.
 * @param {unknown} error - The error to include in the response body. This can be of any type.
 * @returns {Response} The response object with the not found status and error.
 */
export const sendBackNotFoundResponse = (res: Response, error: unknown): Response => {
    return res.status(404).send({
        success: false,
        error: error,
        message: messages.general.notFound
    });
}

/**
 * Checks if the given value is a non-empty string.
 *
 * @param value - The string value to be checked.
 * @returns A boolean indicating whether the string is non-empty or not.
 */
export const isZNonEmptyString = (
    value: string | undefined | null
): boolean => {
    return value !== undefined && value !== null && value?.trim()?.length > 0;
};
