"use client"
import { useState } from "react"
import { Button, Card, Stack, Text, Group } from "@mantine/core"
import { IconTestPipe } from "@tabler/icons-react"
import { useBulkLessonCreation } from "@/hooks/query-hooks/lesson-query"

export function TestBulkLesson() {
    const [isTesting, setIsTesting] = useState(false)
    const bulkLessonMutation = useBulkLessonCreation()

    const testBulkCreation = async () => {
        setIsTesting(true)
        try {
            // Test data matching the API format
            const testData = {
                courseId: "2b3f0259-9e13-4869-8629-7831eeb92325",
                moduleId: "c9d360c8-9252-4f01-b629-d3f81ff21789",
                lessons: {
                    lessons: {
                        "0": {
                            title: "JavaScript Fundamentals",
                            description: "Learn the basics of JavaScript programming",
                            content: "<h1><strong>JavaScript Fundamentals</strong></h1><p></p><p><strong>JavaScript 101:</strong></p><ul><li><p>Variables and Data Types</p></li><li><p>Functions and Scope</p></li><li><p>Objects and Arrays</p></li></ul><p></p><ol><li><p>Control Structures</p></li></ol><p></p><blockquote><p>JavaScript is a versatile programming language</p></blockquote><p></p><div data-youtube-video=\"\"><iframe class=\"tiptap-youtube\" width=\"640\" height=\"480\" allowfullscreen=\"true\" autoplay=\"false\" disablekbcontrols=\"false\" enableiframeapi=\"false\" endtime=\"0\" ivloadpolicy=\"0\" loop=\"false\" modestbranding=\"false\" origin=\"\" playlist=\"\" rel=\"1\" src=\"https://www.youtube-nocookie.com/embed/tsu0Rw3Nqi8?rel=1\" start=\"0\"></iframe></div><p></p>",
                            order: 1,
                            difficulty: "beginner",
                            estimatedDuration: 25,
                            isPublished: true,
                            tags: ["javascript", "react", "css", "fundamentals"]
                        },
                        "1": {
                            title: "Advanced JavaScript Concepts",
                            description: "Deep dive into advanced JavaScript features",
                            content: "<h1><strong>Advanced JavaScript</strong></h1><p></p><p>Explore advanced concepts like closures, prototypes, and async programming.</p>",
                            order: 2,
                            difficulty: "intermediate",
                            estimatedDuration: 45,
                            isPublished: true,
                            tags: ["javascript", "async", "closures", "prototypes"]
                        }
                    }
                }
            }

            await bulkLessonMutation.mutateAsync(testData)
        } catch (error) {
            console.error("Test failed:", error)
        } finally {
            setIsTesting(false)
        }
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" style={{
            background: "#1a1a1a",
            border: "1px solid #bdf052"
        }}>
            <Stack gap="md">
                <Group gap="sm">
                    <IconTestPipe size={20} color="#bdf052" />
                    <Text size="lg" fw={600} c="#bdf052">
                        Test Bulk Lesson Creation
                    </Text>
                </Group>

                <Text size="sm" c="dimmed">
                    This will test the bulk lesson creation API with sample data.
                </Text>

                <Button
                    onClick={testBulkCreation}
                    loading={isTesting || bulkLessonMutation.isPending}
                    disabled={bulkLessonMutation.isPending}
                    style={{
                        background: "linear-gradient(135deg, #bdf052 0%, #a3d742 100%)",
                        color: "#1a1a1a",
                        fontWeight: 600,
                    }}
                >
                    {isTesting ? "Testing..." : "Test API Integration"}
                </Button>
            </Stack>
        </Card>
    )
}
