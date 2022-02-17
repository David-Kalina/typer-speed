import { CollectionReference, DocumentData, addDoc } from 'firebase/firestore'
import { testsRef } from '../firebase'

export const addDocument = (collection: CollectionReference<DocumentData>, document: any) => {
  addDoc(collection, document)
}
