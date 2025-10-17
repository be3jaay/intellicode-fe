"use client"
import { Box, Text, rem } from "@mantine/core"
import { RichTextEditor } from "@mantine/tiptap"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import { Link as TiptapLink } from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Youtube from "@tiptap/extension-youtube"
import Highlight from "@tiptap/extension-highlight"
import TextAlign from "@tiptap/extension-text-align"
import Superscript from "@tiptap/extension-superscript"
import SubScript from "@tiptap/extension-subscript"
import Color from "@tiptap/extension-color"
import { TextStyle } from "@tiptap/extension-text-style"
import { IconLink } from "@tabler/icons-react"

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    onAddLink: () => void
    placeholder?: string
}

export function CustomRichTextEditor({ content, onChange, onAddLink, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            TextStyle,
            Color,
            TiptapLink.configure({
                openOnClick: false,
                HTMLAttributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                },
            }),
            Image.configure({
                inline: true,
                allowBase64: false, // Only allow URLs now
                HTMLAttributes: {
                    class: "tiptap-image",
                },
            }),
            Youtube.configure({
                controls: true,
                nocookie: true,
                HTMLAttributes: {
                    class: "tiptap-youtube",
                },
            }),
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Superscript,
            SubScript,
        ],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            onChange(html)
        },
    })

    return (
        <Box>
            <Text size="sm" fw={600} mb={8} c="#4fd1c5">
                Lesson Content
            </Text>
            <RichTextEditor
                editor={editor}
                styles={{
                    root: {
                        border: "1px solid #4fd1c5",
                        borderRadius: rem(8),
                        background: "#1a1a1a",
                    },
                    toolbar: {
                        background: "#1a1a1a",
                        borderBottom: "1px solid #4fd1c5",
                        borderRadius: `${rem(8)} ${rem(8)} 0 0`,
                        padding: rem(8),
                        "& .mantine-RichTextEditor-control": {
                            color: "#ffffff",
                            "&:hover": {
                                background: "rgba(79, 209, 197, 0.1)",
                            },
                            "&[data-active]": {
                                background: "rgba(79, 209, 197, 0.2)",
                                color: "#4fd1c5",
                            },
                        },
                    },
                    content: {
                        background: "#1a1a1a",
                        color: "#ffffff",
                        minHeight: rem(300),
                        "& .ProseMirror": {
                            minHeight: rem(300),
                            padding: rem(16),
                            color: "#ffffff",
                            fontSize: rem(15),
                            lineHeight: 1.6,
                            "& p": {
                                color: "#ffffff",
                                margin: "0 0 1rem 0",
                            },
                            "& h1, & h2, & h3, & h4, & h5, & h6": {
                                color: "#ffffff",
                                fontWeight: 600,
                                margin: "1.5rem 0 1rem 0",
                            },
                            "& h1": { fontSize: rem(28) },
                            "& h2": { fontSize: rem(24) },
                            "& h3": { fontSize: rem(20) },
                            "& h4": { fontSize: rem(18) },
                            "& ul, & ol": {
                                color: "#ffffff",
                                paddingLeft: rem(20),
                            },
                            "& li": {
                                color: "#ffffff",
                                margin: "0.25rem 0",
                            },
                            "& blockquote": {
                                borderLeft: `4px solid #4fd1c5`,
                                paddingLeft: rem(16),
                                margin: "1rem 0",
                                fontStyle: "italic",
                                color: "#b0b0b0",
                            },
                            "& code": {
                                background: "#333",
                                padding: "2px 6px",
                                borderRadius: rem(4),
                                fontSize: rem(14),
                                color: "#4fd1c5",
                            },
                            "& pre": {
                                background: "#1a1a1a",
                                border: "1px solid #333",
                                borderRadius: rem(8),
                                padding: rem(16),
                                overflow: "auto",
                                "& code": {
                                    background: "transparent",
                                    padding: 0,
                                    color: "#ffffff",
                                },
                            },
                            "& img": {
                                maxWidth: "100%",
                                height: "auto",
                                borderRadius: rem(8),
                                margin: "16px 0",
                                border: "1px solid #333",
                            },
                            "& iframe": {
                                maxWidth: "100%",
                                aspectRatio: "16/9",
                                borderRadius: rem(8),
                                margin: "16px 0",
                                border: "1px solid #333",
                            },
                            "& a": {
                                color: "#4fd1c5",
                                textDecoration: "underline",
                                "&:hover": {
                                    color: "#38b2ac",
                                },
                            },
                            "& mark": {
                                background: "rgba(79, 209, 197, 0.3)",
                                color: "#ffffff",
                                padding: "2px 4px",
                                borderRadius: rem(4),
                            },
                        },
                        "& .ProseMirror-focused": {
                            outline: "none",
                        },
                    },
                    controlsGroup: {
                        background: "transparent",
                    },
                }}
            >
                <RichTextEditor.Toolbar sticky stickyOffset={60}>
                    {/* Text Formatting */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Bold />
                        <RichTextEditor.Italic />
                        <RichTextEditor.Underline />
                        <RichTextEditor.Strikethrough />
                        <RichTextEditor.Highlight />
                        <RichTextEditor.Code />
                    </RichTextEditor.ControlsGroup>

                    {/* Headings */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.H1 />
                        <RichTextEditor.H2 />
                        <RichTextEditor.H3 />
                        <RichTextEditor.H4 />
                    </RichTextEditor.ControlsGroup>

                    {/* Lists and Structure */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.BulletList />
                        <RichTextEditor.OrderedList />
                        <RichTextEditor.Blockquote />
                        <RichTextEditor.Hr />
                    </RichTextEditor.ControlsGroup>

                    {/* Text Alignment */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.AlignLeft />
                        <RichTextEditor.AlignCenter />
                        <RichTextEditor.AlignJustify />
                        <RichTextEditor.AlignRight />
                    </RichTextEditor.ControlsGroup>

                    {/* Links and Media */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Link />
                        <RichTextEditor.Unlink />
                        <RichTextEditor.Control
                            onClick={onAddLink}
                            aria-label="Insert media"
                            title="Insert image or video"
                        >
                            <IconLink size={16} />
                        </RichTextEditor.Control>
                    </RichTextEditor.ControlsGroup>

                    {/* Advanced Formatting */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Subscript />
                        <RichTextEditor.Superscript />
                        <RichTextEditor.ClearFormatting />
                    </RichTextEditor.ControlsGroup>

                    {/* History */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.Undo />
                        <RichTextEditor.Redo />
                    </RichTextEditor.ControlsGroup>

                    {/* Source Code */}
                    <RichTextEditor.ControlsGroup>
                        <RichTextEditor.SourceCode />
                    </RichTextEditor.ControlsGroup>
                </RichTextEditor.Toolbar>

                <RichTextEditor.Content />
            </RichTextEditor>
        </Box>
    )
}
