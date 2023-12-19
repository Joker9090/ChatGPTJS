import OpenAIApi from "../services/gpt";

export const longPollingCall = async (threadId: string, runnerId: string) => {
  let loonPolling = 20;
  while (loonPolling > 0) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const runner = await OpenAIApi.retrieve(threadId, runnerId);
      console.log("call", runner.status);
      if (
        runner.status === "completed" ||
        runner.status === "requires_action"
      ) {
        return runner;
      } else if (!["queued", "in_progress"].includes(runner.status)) {
        throw runner;
      }
      loonPolling--;
    } catch (error) {
      if (loonPolling === 0) throw "Long polling timeout";
      throw error;
    }
  }
  throw "Long polling ended without completion";
};

export const longPollingCallList = async (threadId: string) => {
  let loonPollingList = 20;
  while (loonPollingList > 0) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const runner = await OpenAIApi.list(threadId);
      console.log("list", runner.data[0].status);
      if (
        runner.data[0].status === "completed" ||
        runner.data[0].status === "requires_action"
      ) {
        return runner;
      } else if (!["queued", "in_progress"].includes(runner.data[0].status)) {
        throw runner;
      }
      loonPollingList--;
    } catch (error) {
      if (loonPollingList === 0) throw "Long polling timeout";
      throw error;
    }
  }
  throw "Long polling ended without completion";
};
