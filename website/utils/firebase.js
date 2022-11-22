// ========================================================================
// NOTE: THIS FILE IS NOT FOR DISTRIBUTION, IT CONTAINS PRIVATE ACCESS DATA
// 
// This is ok during development. When moving to production / hosted
// version, please read the Firebase configuration from a local .env
// file.
// ========================================================================

import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, collection, query, where, getDocs, Timestamp, addDoc, documentId } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDdPNhZBcf0HdKr8_0iqq2teC0q45Ctlbg",
    authDomain: "interactive-videos-2.firebaseapp.com",
    projectId: "interactive-videos-2",
    storageBucket: "interactive-videos-2.appspot.com",
    messagingSenderId: "588554592421",
    appId: "1:588554592421:web:b616a704676954b8572d4c"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const promptsCollectionRef = collection(db, 'prompts')
const reviewsCollectionRef = collection(db, 'promptReviews')
const contextCollectionRef = collection(db, 'promptContexts')

export async function fetchPrompt(promptID) {
    const docRef = doc(promptsCollectionRef, promptID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

export async function fetchMultiplePrompts(promptIDs) {
    const q = query(promptsCollectionRef, where(documentId(), 'in', promptIDs))
    const querySnapshot = await getDocs(q);
    const docData = {}
    querySnapshot.forEach((doc) => {
        docData[doc.id] = doc.data()
    })
    return docData
}

export async function fetchUserPromptsReviews(userID) {
    const q = query(reviewsCollectionRef, where("user", "==", userID))

    const querySnapshot = await getDocs(q);
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push(doc.data())
    })
    return docData
}

export async function fetchUserSpecificPromptReviews(userID, promptID) {
    const q = query(reviewsCollectionRef, where("user", "==", userID), where('promptID', '==', promptID))
    const querySnapshot = await getDocs(q);
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push(doc.data())
    })
    return docData.sort((a, b) => b.created.seconds - a.created.seconds)
}

export async function createUserPromptReview(userID, promptID, remembered, nextDueDate) {
    const data = {
        user: userID,
        promptID: promptID,
        remembered: remembered,
        calculatedNextDue: Timestamp.fromDate(nextDueDate),
        created: Timestamp.fromDate(new Date())
    }
    const docRef = await addDoc(reviewsCollectionRef, data)
    return docRef
}

export async function fetchSameContext(userID, promptID, contextLink) {
    const q = query(contextCollectionRef, where('user', '==', userID), where('promptID', '==', promptID), where('contextLink', '==', contextLink))
    const querySnapshot = await getDocs(q);
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push(doc.data())
    })
    return docData
}

export async function createPromptContext(userID, promptID, contextLink, linkName) {
    const data = {
        user: userID,
        promptID: promptID,
        contextLink: contextLink,
        linkName: linkName,
        created: Timestamp.fromDate(new Date())
    }
    const docRef = await addDoc(contextCollectionRef, data)
    return docRef
}

export async function fetchUserSpecificPromptContexts(userID, promptID) {
    const q = query(contextCollectionRef, where('user', '==', userID), where('promptID', '==', promptID))
    const querySnapshot = await getDocs(q);
    const docData = []
    querySnapshot.forEach((doc) => {
        docData.push(doc.data())
    })
    return docData.sort((a, b) => b.created.seconds - a.created.seconds)
}