import WatchedList from '@/core/entities/watched-list'
import QuestionAttachment from './question-attachment'

export default class QuestionAttachmentList extends WatchedList<QuestionAttachment> {
  compareItems(a: QuestionAttachment, b: QuestionAttachment): boolean {
    return a.attachmentId === b.attachmentId
  }
}
