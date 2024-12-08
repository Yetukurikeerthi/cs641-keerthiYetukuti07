import {
  View,
  Image,
  Text,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";

import { AdvancedImage } from "cloudinary-react-native";
// Import required actions and qualifiers.
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "~/src/lib/cloudinary";
import PostContent from "./PostContent";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../providers/AuthProvider";

type Post = {
  id: string;
  user: {
    username?: string;
    avatar_url?: string;
  };
  [key: string]: any; // For additional dynamic properties
};

type LikeRecord = {
  id: string;
};

export default function PostListItem({ post }: { post: Post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeRecord, setLikeRecord] = useState<LikeRecord | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchLike();
  }, []);

  useEffect(() => {
    if (isLiked) {
      saveLike();
    } else {
      deleteLike();
    }
  }, [isLiked]);

  const fetchLike = async () => {
    const { data, error } = await supabase
      .from("likes")
      .select("*")
      .eq("user_id", user?.id)
      .eq("post_id", post.id);

    if (data && data.length > 0) {
      setLikeRecord(data[0] as LikeRecord);
      setIsLiked(true);
    }
  };

  const saveLike = async () => {
    if (likeRecord) {
      return;
    }
    const { data } = await supabase
      .from("likes")
      .insert([{ user_id: user?.id, post_id: post.id }])
      .select();

    if (data && data.length > 0) {
      setLikeRecord(data[0] as LikeRecord);
    }
  };

  const deleteLike = async () => {
    if (likeRecord) {
      const { error } = await supabase
        .from("likes")
        .delete()
        .eq("id", likeRecord.id);
      if (!error) {
        setLikeRecord(null);
      }
    }
  };

  const avatar = cld.image(post?.user?.avatar_url || "puppi_e8hgfi");
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.face()))
  );

  return (
    <View className="bg-white">
      {/* Header */}
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-semibold">
          {post?.user?.username || "New user"}
        </Text>
      </View>

      {/* Content */}
      <PostContent post={post} />

      {/* Icons */}
      <View className="flex-row gap-3 p-3">
        <AntDesign
          onPress={() => setIsLiked(!isLiked)}
          name={isLiked ? "heart" : "hearto"}
          size={20}
          color={isLiked ? "crimson" : "black"}
        />
        <Ionicons name="chatbubble-outline" size={20} />
        <Feather name="send" size={20} />

        <Feather name="bookmark" size={20} className="ml-auto" />
      </View>
      <View className="gap-8 p-2">
        <Text style={{ fontWeight: "bold" }}>{post?.caption}</Text>
      </View>
    </View>
  );
}
