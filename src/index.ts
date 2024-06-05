import express from "express";
import {
  validatePubSubPayload,
  validateDecodedMessage,
} from "./validation/validation";
import { PubSubPayload, DecodedMessage } from "./types/pubsub";

const app = express();
app.use(express.json());

app.post("/pubsub", (req, res) => {
  try {
    const payload: PubSubPayload = validatePubSubPayload(req.body);
    const decodedData = Buffer.from(payload.message.data, "base64").toString(
      "utf-8"
    );
    const decodedMessage: DecodedMessage = JSON.parse(decodedData);
    validateDecodedMessage(decodedMessage);

    console.log("Nuevo Estado:", decodedMessage.newState);
    if (decodedMessage.previousState) {
      console.log("Estado Anterior:", decodedMessage.previousState);
    }

    res
      .status(200)
      .send(
        `Nuevo Estado: ${JSON.stringify(decodedMessage.newState)}\n${
          decodedMessage.previousState
            ? `Estado Anterior: ${JSON.stringify(decodedMessage.previousState)}`
            : ""
        }`
      );
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

app.post("/toPubSub", (req, res) => {
  try {
    // Validar el mensaje decodificado
    const decodedMessage: DecodedMessage = validateDecodedMessage(req.body);

    // Convertir el mensaje a base64
    const jsonData = JSON.stringify(decodedMessage);
    const base64Data = Buffer.from(jsonData).toString("base64");

    // Crear el objeto Pub/Sub
    const pubSubMessage: PubSubPayload = {
      message: {
        data: base64Data,
        publishTime: new Date().toISOString(),
        messageId: `${Date.now()}`,
      },
    };

    res.status(200).json(pubSubMessage);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export default app;
