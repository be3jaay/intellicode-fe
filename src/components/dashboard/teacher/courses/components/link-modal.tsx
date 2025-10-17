"use client"
import {
    Modal,
    Stack,
    Text,
    Group,
    Button,
    TextInput,
} from "@mantine/core"
import {
    IconPhoto,
    IconVideo,
} from "@tabler/icons-react"

interface LinkModalProps {
    opened: boolean
    onClose: () => void
    linkType: "image" | "video"
    setLinkType: (type: "image" | "video") => void
    linkUrl: string
    setLinkUrl: (url: string) => void
    onSubmit: () => void
}

export function LinkModal({
    opened,
    onClose,
    linkType,
    setLinkType,
    linkUrl,
    setLinkUrl,
    onSubmit
}: LinkModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Insert Media"
            size="md"
            centered
            styles={{
                header: { background: "#1a1a1a", borderBottom: "1px solid #4fd1c5" },
                body: { background: "#222222" },
                title: { color: "#4fd1c5", fontWeight: 600 }
            }}
        >
            <Stack gap="md">
                <Text size="sm" c="dimmed">
                    Choose the type of media you want to insert
                </Text>

                <Group gap="md">
                    <Button
                        variant={linkType === "image" ? "filled" : "outline"}
                        color="#4fd1c5"
                        onClick={() => setLinkType("image")}
                        leftSection={<IconPhoto size={16} />}
                    >
                        Image
                    </Button>
                    <Button
                        variant={linkType === "video" ? "filled" : "outline"}
                        color="#4fd1c5"
                        onClick={() => setLinkType("video")}
                        leftSection={<IconVideo size={16} />}
                    >
                        YouTube Video
                    </Button>
                </Group>

                <TextInput
                    label={`${linkType === "image" ? "Image" : "YouTube"} URL`}
                    placeholder={`Enter ${linkType === "image" ? "image" : "YouTube video"} URL`}
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    styles={{
                        label: { color: "#4fd1c5", fontWeight: 600 },
                        input: {
                            background: "#1a1a1a",
                            border: "1px solid #4fd1c5",
                            color: "#fff",
                            "&:focus": { borderColor: "#38b2ac" }
                        }
                    }}
                />

                <Group justify="flex-end" gap="md">
                    <Button variant="outline" color="gray" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        color="#4fd1c5"
                        onClick={onSubmit}
                        disabled={!linkUrl.trim()}
                    >
                        Insert {linkType === "image" ? "Image" : "Video"}
                    </Button>
                </Group>
            </Stack>
        </Modal>
    )
}
