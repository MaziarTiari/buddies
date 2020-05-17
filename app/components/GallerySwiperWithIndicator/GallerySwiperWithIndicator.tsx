import React, { useState } from "react";
import GallerySwiper, { GallerySwiperProps } from "react-native-gallery-swiper";
import { View, Text } from "react-native";

export interface GallerySwiperWithIndicatorProps extends GallerySwiperProps {
    showIndicator?: boolean;
    indicatorBackground?: string;
    indicatorForeground?: string;
    indicatorPosition?: "topleft" | "topright" | "bottomleft" | "bottomright";
    indicatorMargin?: number;
}

const GallerySwiperWithIndicator = (props: GallerySwiperWithIndicatorProps) => {
    const [indicatorPage, setIndicatorPage] = useState<number>(
        props.initialPage ? props.initialPage + 1 : 0
    );

    const handlePageSelected = (page: number) => {
        setIndicatorPage(page + 1);
    };

    const indicatorPosition = props.indicatorPosition
        ? props.indicatorPosition
        : "topright";

    return (
        <View style={{ flex: 1 }}>
            <GallerySwiper {...props} onPageSelected={handlePageSelected} />

            {props.showIndicator && props.images.length > 1 && (
                <View
                    style={{
                        position: "absolute",
                        right: indicatorPosition.endsWith("right") ? 0 : undefined,
                        left: indicatorPosition.endsWith("left") ? 0 : undefined,
                        top: indicatorPosition.startsWith("top") ? 0 : undefined,
                        bottom: indicatorPosition.startsWith("bottom") ? 0 : undefined,
                        paddingVertical: 5,
                        paddingHorizontal: 10,
                        borderRadius: 15,
                        backgroundColor: props.indicatorBackground
                            ? props.indicatorBackground
                            : "black",
                        margin: props.indicatorMargin ? props.indicatorMargin : 10,
                    }}
                >
                    <Text
                        style={{
                            color: props.indicatorForeground
                                ? props.indicatorForeground
                                : "white",
                        }}
                    >
                        {indicatorPage}/{props.images.length}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default GallerySwiperWithIndicator;
