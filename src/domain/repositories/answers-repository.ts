import Answer from "../entities/answer";

export default interface AnswersRepository {
  create(answer: Answer): Promise<void>;
}
