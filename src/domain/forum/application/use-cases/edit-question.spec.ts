import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import EditQuestionUseCase from './edit-question'
import { makeQuestion } from 'test/factories/make-question'
import UniqueEntityId from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question Use Case', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      title: 'test question',
      content: 'test content',
      questionId: newQuestion.id.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'test question',
      content: 'test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        title: 'test question',
        content: 'test content',
        questionId: newQuestion.id.toString(),
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})