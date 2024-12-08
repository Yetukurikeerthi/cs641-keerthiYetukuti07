import { Text, View, Image, TextInput, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/supabase";
import { useAuth } from "~/src/providers/AuthProvider";
import CustomTextInput from "~/src/components/CustomTextInput";
import { cld, uploadImage } from "~/src/lib/cloudinary";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { AdvancedImage } from "cloudinary-react-native";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [remoteImage, setRemoteImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    if (!user) {
      console.log("No user found. Cannot fetch profile.");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Failed to fetch profile");
        return;
      }

      console.log("Fetched profile data:", data);
      setUsername(data.username);
      setBio(data.bio);
      setRemoteImage(data.avatar_url);
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
    }
  };

  const updateProfile = async () => {
    if (!user) {
      console.log("No user found. Cannot update profile.");
      return;
    }

    try {
      const updatedProfile: any = {
        username,
        bio,
      };

      // If a new image is selected, upload and update the avatar URL
      if (image) {
        console.log("Uploading image...");
        const response = await uploadImage(image);
        console.log("Image upload response:", response);

        if (response?.public_id) {
          updatedProfile.avatar_url = response.public_id;
        } else {
          console.warn("Image upload failed. Skipping avatar update.");
        }
      }

      console.log("Updating profile with data:", updatedProfile);

      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("email", user.email)
        .select();

      if (error) {
        console.error("Error updating profile:", error);
        Alert.alert("Failed to update profile", error.message);
      } else {
        console.log("Profile updated successfully!");
        Alert.alert("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Unexpected error updating profile:", err);
      Alert.alert("An unexpected error occurred", err.message);
    }
  };

  const pickImage = async () => {
    try {
      console.log("Opening image picker...");
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        console.log("Image selected:", result.assets[0].uri);
        setImage(result.assets[0].uri);
      } else {
        console.log("Image selection canceled.");
      }
    } catch (err) {
      console.error("Unexpected error opening image picker:", err);
    }
  };

  let remoteCldImage;
  if (remoteImage) {
    remoteCldImage = cld.image(remoteImage);
    remoteCldImage.resize(thumbnail().width(300).height(300));
  }

  return (
    <View className="p-3 flex-1">
      {/* Avatar image picker */}
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-52 aspect-square self-center rounded-full bg-slate-300"
        />
      ) : remoteCldImage ? (
        <AdvancedImage
          cldImg={remoteCldImage}
          className="w-52 aspect-square self-center rounded-full bg-slate-300"
        />
      ) : (
        <View className="w-52 aspect-square self-center rounded-full bg-slate-300" />
      )}
      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>

      {/* Form */}
      <View className="gap-5">
        <CustomTextInput
          label="Username"
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <CustomTextInput
          label="Bio"
          placeholder="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={1}
        />
      </View>

      {/* Button */}
      <View className="gap-2 mt-auto">
        <Button title="Update profile" onPress={updateProfile} />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}
