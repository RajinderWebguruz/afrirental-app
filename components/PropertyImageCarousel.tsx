import React, { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";

interface PropertyImageCarouselProps {
  images: Array<{ image_src: string; image_title: string }>;
  style?: any;
}

const { width } = Dimensions.get("window");

export default function PropertyImageCarousel({
  images,
  style,
}: PropertyImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!images || images.length === 0) {
    return (
      <Image
        source={{
          uri: "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
        }}
        style={[styles.image, style]}
      />
    );
  }

  const imageWidth =
    typeof style?.width === "string" && style.width.includes("%")
      ? width
      : style?.width || 200;
  const imageHeight = style?.height || 150;

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / imageWidth);
    setCurrentIndex(index);
  };

  return (
    <View
      style={[styles.container, { width: imageWidth, height: imageHeight }]}
    >
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        nestedScrollEnabled={true}
        directionalLockEnabled={true}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{
              uri:
                image.image_src ||
                "https://img.freepik.com/premium-vector/hand-drawn-real-estate-agent-character-flat-style-isolated-background_1375-24731.jpg?semt=ais_hybrid&w=740&q=80",
            }}
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  pagination: {
    position: "absolute",
    bottom: 8,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  activeDot: {
    backgroundColor: Colors.white,
  },
  image: {},
});
