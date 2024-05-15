import { helperName } from "../helpers.js";
import { Assistant } from "../../src/experts/assistant.js";

class EventedAssistant extends Assistant {
  constructor() {
    const name = helperName("EventedAssistant");
    const description = "Echo";
    const instructions = "Echo the same text back to the user";
    super(name, description, instructions);
    this.myEvents = [];
    this.on("event", this.noOp);
    this.on("end", this.noOp);
    this.on("textDone", this.textDone.bind(this));
    this.on("textDoneAsync", this.textDoneAsync.bind(this));
  }

  noOp() {}

  textDone(content, _snapshot) {
    this.myEvents.push({ textDone: content.value });
  }

  async textDoneAsync(content, _snapshot) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.myEvents.push({ textDoneAsync: content?.value });
  }
}

export { EventedAssistant };
