import Answer from '../../enterprise/entities/answer'

export default interface AnswersRepository {
  create(answer: Answer): Promise<void>
}
