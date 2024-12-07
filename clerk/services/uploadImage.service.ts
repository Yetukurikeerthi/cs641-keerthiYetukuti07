import { Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { ref, uploadString, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const uploadImage = async ({ imageUri, storage, db, userId, text }) => {
  try {
    let imageUrl;
    const imagePath = `todos/${userId}/${Date.now()}.jpg`;
    const storageRef = ref(storage, imagePath);

    // Handle upload based on platform
    if (Platform.OS === 'web') {
      // For web, convert the blob URL to actual blob
      const response = await fetch(imageUri);
      const blob = await response.blob();
      
      // Upload blob directly
      await uploadBytes(storageRef, blob, {
        contentType: 'image/jpeg',
      });
    } else {
      // For mobile, use FileSystem and base64
      const base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Upload base64 string
      await uploadString(storageRef, base64, 'base64', {
        contentType: 'image/jpeg',
      });
    }

    imageUrl = await getDownloadURL(storageRef);

    return imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image: ' + error.message);
  }
};

export default uploadImage;