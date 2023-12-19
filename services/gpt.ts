import axios, { AxiosInstance } from 'axios';
import OpenAI from 'openai';

export type globalType = {
  OpenAIApiInstance?: OpenAIApi;
};

const apiUrls = {
  prompt: "/prompt",
};

class OpenAIApi {
  axios: AxiosInstance;
  openai: OpenAI;
  model: string = "gpt-4-1106-preview"
  modelEmbedding: string = "text-embedding-ada-002"

  constructor() {
    if ((global as globalType).OpenAIApiInstance) {
      throw new Error("New instance cannot be created!!");
    } else {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        organization: process.env.OPENAI_ORG,
      });
      this.axios = axios.create({
        baseURL: "/",
        // timeout: 1000,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    (global as globalType).OpenAIApiInstance = this;
  }

  setModel(model: string) {
    this.model = model;
  }

  setModelEmbeddings(modelEmbedding: string) {
    this.modelEmbedding = modelEmbedding;
  }

  getModels() {
    return this.openai.models.list();
  }

  createAssistant(instructions: string, tools: any[] = [{ "type": "code_interpreter" }]) {
    return this.openai.beta.assistants.create({
      instructions: instructions,
      model: this.model,
      tools: tools
    })
  }

  createThread() {
    return this.openai.beta.threads.create({})
  }

  deleteThread(threadId: string) {
    return this.openai.beta.threads.del(threadId)
  }

  createMessage(threadId: string, message: string) {
    return this.openai.beta.threads.messages.create(threadId, {
      role: "user",
      content: message,
    })

  }

  runner(threadId: string, assistantId: string, instructions?: string) {
    const body: OpenAI.Beta.Threads.Runs.RunCreateParams = {
      assistant_id: assistantId
    }
    if (instructions) body["instructions"] = instructions
    return this.openai.beta.threads.runs.create(threadId, body)
  }

  retrieve(threadId: string, runId: string) {
    return this.openai.beta.threads.runs.retrieve(threadId, runId)
  }

  list(threadId: string) {
    return this.openai.beta.threads.runs.list(threadId)
  }

  getMessages(threadId:string) {
    return this.openai.beta.threads.messages.list(threadId)
  }

  createEmbedding(text: string | string[]) {
    return this.openai.embeddings.create({
        model: this.modelEmbedding,
        input: text,
    })
  }

}

let OpenAIApiSingleton;
if (!(global as globalType).OpenAIApiInstance) OpenAIApiSingleton = new OpenAIApi();
else OpenAIApiSingleton = (global as globalType).OpenAIApiInstance;
export default OpenAIApiSingleton as OpenAIApi;

