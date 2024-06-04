export interface PubSubPayload {
  message: Message;
}

export interface Message {
  data: string;
  publishTime: string;
  messageId: string;
}

export interface State {
  processid: string;
  status: "success" | "error" | "pending";
  message?: string;
  error?: string;
}

export interface DecodedMessage {
  newState: State;
  previousState?: State;
}
