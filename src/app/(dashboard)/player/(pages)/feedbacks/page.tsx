"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import {
  Container,
  Center,
  Stack,
  Grid,
  Paper,
  Text,
  Button,
  Image,
} from "@mantine/core";
import { toast } from "react-hot-toast";

const reviews = [
  {
    name: "Leo",
    title: "Lead Designer",
    content:
      "It was a very good experience. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.",
    rating: 4,
  },
  {
    name: "Sarah",
    title: "Project Manager",
    content:
      "Excellent service and communication. Faucibus venenatis felis id augue sit cursus pellentesque enim arcu. Elementum felis magna pretium in viverra.",
    rating: 5,
  },
  {
    name: "Mike",
    title: "Developer",
    content:
      "Great team to work with. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus nibh mauris, nec turpis orci lectus maecenas.",
    rating: 4,
  },
];

export default function Reviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const handleRateUsClick = () => {
    toast.success("Thank you for rating us!");
  };

  return (
    <Container size="xl" py="xl">
      <Center mt="xl">
        <Stack spacing="xs">
          <Text weight={600} size="2rem" color="darkslategray">
            What Our Clients Say About Us
          </Text>
        </Stack>
      </Center>

      <Grid mt="xs">
        <Grid.Col>
          <div className="relative flex items-center justify-center">
            {/* Previous arrow */}
            <Button
              onClick={prevReview}
              variant="outline"
              radius="md"
              size="lg"
              className="absolute left-0 z-10"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </Button>

            {/* Review Cards */}
            <div className="flex items-center space-x-4 relative">
              {reviews.map((review, index) => {
                const position =
                  (index - currentIndex + reviews.length) % reviews.length;

                const isCenter = position === 0;

                return (
                  <Paper
                    key={index}
                    shadow="lg"
                    radius="md"
                    p="md"
                    className={`transition-all duration-300 ease-in-out ${
                      isCenter
                        ? "transform scale-100 z-10"
                        : "transform scale-90 opacity-80"
                    } flex-shrink-0 relative`}
                    style={{
                      width: isCenter ? "320px" : "280px",
                      transform:
                        position === 0
                          ? "translateX(0)"
                          : position === 1
                          ? "translateX(20px)"
                          : "translateX(-20px)",
                    }}
                  >
                    <Stack spacing="md">
                      <div className="flex items-center mb-4">
                        <Image
                          src="https://i.pravatar.cc/100"
                          alt={`${review.name}'s avatar`}
                          width={60}
                          height={60}
                          radius="xl"
                        />
                        <div className="ml-4">
                          <Text size="lg" weight={500}>
                            {review.name}
                          </Text>
                          <Text size="sm" color="dimmed">
                            {review.title}
                          </Text>
                        </div>
                      </div>
                      <Text size="md" weight={600}>
                        {review.content.split(".")[0]}
                      </Text>
                      <Text size="sm" color="dimmed">
                        {review.content}
                      </Text>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } fill-current`}
                          />
                        ))}
                      </div>
                    </Stack>
                  </Paper>
                );
              })}
            </div>

            {/* Next arrow */}
            <Button
              onClick={nextReview}
              variant="outline"
              radius="md"
              size="lg"
              className="absolute right-0 z-10"
              aria-label="Next review"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </Button>
          </div>

          {/* Carousel indicators */}
          <Center mt="md">
            <Stack direction="row" spacing="xs">
              {reviews.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full cursor-pointer transition ${
                    i === currentIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentIndex(i)} // Set current index on dot click
                />
              ))}
            </Stack>
          </Center>

          {/* Rate Us Button */}
          <Center mt="lg">
            <Button
              color="green"
              radius="md"
              size="md"
              onClick={handleRateUsClick}
            >
              Rate Us Here
            </Button>
          </Center>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
