const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");

class AIService {
  constructor() {
    this.model = new OpenAI({
      openAIApiKey: process.env.AI_API_KEY,
      temperature: 0.7,
      modelName: process.env.AI_MODEL || "gpt-3.5-turbo",
      maxTokens: 500,
    });

    // Initialize prompt template
    this.promptTemplate = new PromptTemplate({
      template:
        "Answer the following question clearly and concisely: {question}",
      inputVariables: ["question"],
    });
  }

  async generateAnswer(question) {
    try {
      const startTime = Date.now();

      // Format the prompt
      const prompt = await this.promptTemplate.format({
        question: question,
      });

      // Generate answer
      const response = await this.model.call(prompt);

      const processingTime = Date.now() - startTime;

      return {
        answer: response,
        metadata: {
          model: this.model.modelName,
          processingTime,
          // Note: In a production environment, you'd want to track tokens and cost
          tokens: null,
          cost: null,
        },
      };
    } catch (error) {
      console.error("AI Service Error:", error);
      throw new Error("Failed to generate answer");
    }
  }
}

module.exports = new AIService();
