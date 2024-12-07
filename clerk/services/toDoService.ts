import { collection, query, orderBy, addDoc, updateDoc, deleteDoc, doc, where, getDocs, limit } from 'firebase/firestore';
import { Todo } from '../types/todo';
import { db, storage } from '../config/firebaseConfig';
import { useUser, useAuth } from '@clerk/clerk-expo';
import uploadImage from './uploadImage.service';

export class TodoService {
      user = useUser();


    static async getTodos(userId: string, limitCount?: number): Promise<Todo[]> {
        let q = query(
            collection(db, 'todos'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        if (limitCount) {
            q = query(q, limit(limitCount));
        }


        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate()
        } as Todo));
    }

    static async getStats(userId: string) {
        const todos = await this.getTodos(userId);
        const completed = todos.filter(todo => todo.completed).length;

        return {
            total: todos.length,
            completed,
            pending: todos.length - completed
        };
    }

    static async addTodo(userId: string, text: string, imageUri?: string): Promise<void> {

    
        let imageUrl: string | undefined;
    
        if (imageUri) {
          try {
            const imageUrl = await uploadImage({
              imageUri: imageUri,
              storage: storage,
              db: db,
              userId: userId,
              text: text,
            });
            await addDoc(collection(db, 'todos'), {
              text,
              completed: false,
              createdAt: new Date(),
              userId,
              imageUrl
            });
            console.log('Upload successful:', imageUrl);
          } catch (error) {
            console.error('Upload failed:', error);
          }
        }else {
            await addDoc(collection(db, 'todos'), {
              text,
              completed: false,
              createdAt: new Date(),
              userId,
            });
          }
        


      }

    static async toggleTodo(todoId: string, completed: boolean): Promise<void> {
        const todoRef = doc(db, 'todos', todoId);
        await updateDoc(todoRef, { completed });
    }

    static async deleteTodo(todoId: string): Promise<void> {
        const todoRef = doc(db, 'todos', todoId);
        await deleteDoc(todoRef);
    }
}