import { initializeApp } from 'firebase/app';
import { addDoc, getDocs, collection, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCjA3GI1FC6_wikAy6qMw8hk4ZXDPsgw1U',
  authDomain: 'laajverd-42a3f.firebaseapp.com',
  databaseURL: 'https://laajverd-42a3f-default-rtdb.firebaseio.com',
  projectId: 'laajverd-42a3f',
  storageBucket: 'laajverd-42a3f.firebasestorage.app',
  messagingSenderId: '654657065769',
  appId: '1:654657065769:web:9cff527bd2a4ec6a9f1d38',
  measurementId: 'G-ZS0JV6362J',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Define the type for archive document data
interface ArchiveDocument {
  title: string;
  description: string;
  record?: string; // Optional field for archive entries
  imageUrl?: string; // Optional field for archive entries
}

// Middleware functions for archive
const addArchiveEntry = async (docData: { title: string; record: string; imageUrl: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'archive'), docData);
    console.log('Archive entry added with ID:', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding archive entry:', error);
    throw new Error(error.message);
  }
};

const fetchArchiveEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'archive'));
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as ArchiveDocument; // Cast to ArchiveDocument
      return { id: doc.id, ...data }; // Include document ID
    });
  } catch (error) {
    console.error('Error fetching archive data:', error);
    throw new Error(error.message);
  }
};

// Middleware functions for glossary
const addGlossaryEntry = async (title: string, description: string) => {
  const docData = { title, description };
  try {
    const docRef = await addDoc(collection(db, 'archives'), docData); // Use 'glossary' collection
    console.log('Glossary entry added with ID:', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding glossary entry:', error);
    throw new Error(error.message);
  }
};

const fetchGlossaryEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'archives')); // Use 'glossary' collection
    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as ArchiveDocument; // Cast to ArchiveDocument
      return { id: doc.id, ...data }; // Include document ID
    });
  } catch (error) {
    console.error('Error fetching glossary data:', error);
    throw new Error(error.message);
  }
};

// Middleware functions for map
const addMapEntry = async (docData: { title: string; latitude: string; longitude: string; distance: string }) => {
  try {
    const docRef = await addDoc(collection(db, 'map'), docData); // Use 'map' collection
    console.log('Map entry added with ID:', docRef.id);
    return docRef.id; // Return the document ID
  } catch (error) {
    console.error('Error adding map entry:', error);
    throw new Error(error.message);
  }
};

const fetchMapEntries = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'map')); // Use 'map' collection
    return querySnapshot.docs.map((doc) => {
      const data = doc.data(); // Cast to appropriate type if needed
      return { id: doc.id, ...data }; // Include document ID
    });
  } catch (error) {
    console.error('Error fetching map data:', error);
    throw new Error(error.message);
  }
};

// Controller functions
export const firebaseController = {
  addMapEntry: async (docData: { title: string; latitude: string; longitude: string; distance: string }) => addMapEntry(docData), // Call the middleware function
  fetchMapEntries: async () => fetchMapEntries(), // Fetch map entries

  addGlossaryEntry: async (title: string, description: string) => addGlossaryEntry(title, description), // Call the middleware function
  getGlossaryEntries: async () => fetchGlossaryEntries(), // Fetch glossary entries

  addArchiveEntry: async (docData: { title: string; record: string; imageUrl: string }) => addArchiveEntry(docData), // Call the middleware function
  getArchiveEntries: async () => fetchArchiveEntries(), // Fetch archive entries
};
