import { pubSubSchema, decodedMessageSchema } from "./schemas";
import { PubSubPayload, DecodedMessage } from "../types/pubsub";

export const validatePubSubPayload = (payload: any): PubSubPayload => {
  const { error, value } = pubSubSchema.validate(payload);
  if (error) {
    throw new Error(`Invalid PubSub payload: ${error.message}`);
  }
  return value;
};

export const validateDecodedMessage = (message: any): DecodedMessage => {
  const { error, value } = decodedMessageSchema.validate(message);
  if (error) {
    throw new Error(`Invalid decoded message: ${error.message}`);
  }
  return value;
};
