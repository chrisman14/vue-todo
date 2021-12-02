import app from "../service-firestore";

import { getFirestore, doc, collection, getDocs, addDoc, query, where, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'
import { store } from "../store";
const db = getFirestore(app)
const todoCollection = collection(db, 'todos')


class TodoServices {
    getAllTodos() {
        return getDocs(todoCollection)
    }
   async getAllTodosCondition(condition) {
    
        const q = query(todoCollection, where(condition, "==", true));
        const querySnapshot = await getDocs(q);
        var data=[]
        querySnapshot.forEach((doc) => {
            data.push(doc)
        });
        return data;
    }
    async deleteDocs(id) {
        const washingtonRef = doc(db, "todos", id);

        // Set the "capital" field of the city 'DC'
        return await updateDoc(washingtonRef, { isDeleted: true });
        //return await deleteDoc(doc(db, 'todos', id));

    }
    async addDataTodos(title, isChecked, isImportant) {
        try {
            const docRef = await addDoc(todoCollection, {
                title: title,
                isImportant: isImportant,
                isChecked: isChecked,
                isDeleted: false,
                itime: Date.now()
            });
            return docRef

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    // async getRealtimeData() {
    //     return new Promise(async (resolve, reject)  => {
    //         const q = query(todoCollection);
    //         await onSnapshot(q, (querySnapshot) => {
    //             resolve(querySnapshot);
    //         });
    //     })

    // }
    async updateData(id, data) {
        const washingtonRef = doc(db, "todos", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, data);

    }
    async updateChecks(id, data) {
        const washingtonRef = doc(db, "todos", id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, data);

    }
    async getRealtimeData() {

        const q = query(todoCollection);
        await onSnapshot(q, (querySnapshot) => {
            store.commit("add_list", querySnapshot)

        });


    }
}

export default new TodoServices();