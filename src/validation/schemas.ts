import Joi from "joi";
import { PubSubPayload, State } from "../types/pubsub";

export const pubSubSchema = Joi.object<PubSubPayload>({
  message: Joi.object({
    data: Joi.string().required(),
    publishTime: Joi.string().required(),
    messageId: Joi.string().required(),
  })
    .unknown(true)
    .required(),
}).unknown(true);

export const stateSchema = Joi.object<State>({
  processid: Joi.string().required(),
  status: Joi.string().valid("success", "error", "pending").required(),
  message: Joi.string().allow("").optional(),
  error: Joi.string().allow("").optional(),
});

export const decodedMessageSchema = Joi.object({
  newState: stateSchema.required(),
  previousState: stateSchema.optional(),
});
