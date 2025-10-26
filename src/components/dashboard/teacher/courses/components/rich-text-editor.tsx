"use client";
import { Box, Text, rem } from "@mantine/core";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Link as TiptapLink } from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Youtube from "@tiptap/extension-youtube";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { createLowlight } from "lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import json from "highlight.js/lib/languages/json";
import sql from "highlight.js/lib/languages/sql";
import bash from "highlight.js/lib/languages/bash";
import { IconLink } from "@tabler/icons-react";

// Create lowlight instance
const lowlight = createLowlight();

// Register languages
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("python", python);
lowlight.register("java", java);
lowlight.register("cpp", cpp);
lowlight.register("css", css);
lowlight.register("html", html);
lowlight.register("json", json);
lowlight.register("sql", sql);
lowlight.register("bash", bash);

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  onAddLink: () => void;
  placeholder?: string;
}

export function CustomRichTextEditor({
  content,
  onChange,
  onAddLink,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "tiptap-bullet-list",
          },
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
          HTMLAttributes: {
            class: "tiptap-ordered-list",
          },
        },
        listItem: {
          HTMLAttributes: {
            class: "tiptap-list-item",
          },
        },
        codeBlock: false, // Disable default code block
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: "hljs-code-block",
        },
      }),
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
      const html = editor.getHTML();
      onChange(html);
    },
  });

  return (
    <Box>
      <Text size="sm" fw={600} mb={8} c="#4fd1c5">
        Lesson Content *
      </Text>
      <Text size="xs" c="dimmed" mb={12}>
        Create engaging lesson content with rich formatting, images, and videos
      </Text>
      <RichTextEditor
        editor={editor}
        styles={{
          toolbar: {
            background: "#222222",
            borderBottom: "1px solid rgba(79, 209, 197, 0.3)",
            borderRadius: 0,
            padding: rem(12),
            gap: rem(8),
            flexWrap: "wrap",
            "& .mantineRichTextEditorControl": {
              color: "#ffffff",
              border: "1px solid transparent",
              borderRadius: rem(6),
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(79, 209, 197, 0.15)",
                borderColor: "#4fd1c5",
              },
              "&[dataActive]": {
                background: "rgba(79, 209, 197, 0.25)",
                color: "#4fd1c5",
                borderColor: "#4fd1c5",
              },
            },
          },
          content: {
            background: "#1a1a1a",
            color: "#ffffff",
            minHeight: rem(700),
            "& .ProseMirror": {
              minHeight: rem(700),
              padding: rem(20),
              color: "#ffffff !important",
              fontSize: rem(15),
              lineHeight: 1.7,
              "& *": {
                color: "#ffffff",
              },
              "& p": {
                color: "#ffffff !important",
                margin: "0 0 1rem 0",
              },
              "& p.is-editor-empty:first-of-type::before": {
                color: "#999",
                content: "attr(data-placeholder)",
                float: "left",
                height: 0,
                pointerEvents: "none",
              },
              "& h1, & h2, & h3, & h4, & h5, & h6": {
                color: "#4fd1c5 !important",
                fontWeight: 700,
                margin: "1.5rem 0 1rem 0",
                lineHeight: 1.3,
              },
              "& h1": { fontSize: rem(32) },
              "& h2": { fontSize: rem(26) },
              "& h3": { fontSize: rem(22) },
              "& h4": { fontSize: rem(18) },
              "& ul": {
                paddingLeft: rem(28),
                margin: "1rem 0",
                listStyleType: "disc",
                listStylePosition: "outside",
              },
              "& ol": {
                paddingLeft: rem(28),
                margin: "1rem 0",
                listStyleType: "decimal",
                listStylePosition: "outside",
              },
              "& li": {
                color: "#ffffff !important",
                margin: "0.5rem 0",
                paddingLeft: rem(4),
                display: "list-item",
              },
              "& li::marker": {
                color: "#ffffff !important",
                fontSize: rem(16),
              },
              "& ul > li::marker": {
                content: "'• '",
                color: "#4fd1c5 !important",
              },
              "& ol > li::marker": {
                color: "#4fd1c5 !important",
                fontWeight: 600,
              },
              "& blockquote": {
                borderLeft: `4px solid #4fd1c5`,
                paddingLeft: rem(16),
                margin: "1.5rem 0",
                fontStyle: "italic",
                color: "#1a1a1a !important",
                background: "rgba(79, 209, 197, 0.15)",
                padding: rem(16),
                borderRadius: `0 ${rem(8)} ${rem(8)} 0`,
              },
              "& code": {
                background:
                  "linear-gradient(135deg, rgba(79, 209, 197, 0.15) 0%, rgba(56, 178, 172, 0.15) 100%)",
                padding: "4px 10px",
                borderRadius: rem(6),
                fontSize: rem(14),
                color: "#4fd1c5",
                fontFamily: "'Fira Code', 'Courier New', monospace",
                border: "1px solid rgba(79, 209, 197, 0.4)",
                fontWeight: 500,
                letterSpacing: "0.3px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              },
              "& pre": {
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
                border: "2px solid rgba(79, 209, 197, 0.4)",
                borderRadius: rem(12),
                padding: rem(20),
                overflow: "auto",
                margin: "1.5rem 0",
                boxShadow:
                  "0 8px 16px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(79, 209, 197, 0.1)",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "32px",
                  background: "rgba(79, 209, 197, 0.08)",
                  borderBottom: "1px solid rgba(79, 209, 197, 0.2)",
                },
                "& code": {
                  background: "transparent",
                  padding: 0,
                  color: "#ffffff",
                  border: "none",
                  boxShadow: "none",
                  fontSize: rem(14),
                  lineHeight: 1.6,
                  display: "block",
                  fontFamily: "'Fira Code', 'Courier New', monospace",
                },
              },
              "& img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: rem(8),
                margin: "20px 0",
                border: "2px solid rgba(79, 209, 197, 0.3)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              },
              "& iframe": {
                maxWidth: "100%",
                aspectRatio: "16/9",
                borderRadius: rem(8),
                margin: "20px 0",
                border: "2px solid rgba(79, 209, 197, 0.3)",
              },
              "& a": {
                color: "#4fd1c5",
                textDecoration: "underline",
                fontWeight: 500,
                "&:hover": {
                  color: "#38b2ac",
                  textDecoration: "none",
                },
              },
              "& mark": {
                background: "rgba(189, 240, 82, 0.3)",
                color: "#ffffff",
                padding: "2px 6px",
                borderRadius: rem(4),
              },
              "& hr": {
                border: "none",
                borderTop: "2px solid rgba(79, 209, 197, 0.3)",
                margin: "2rem 0",
              },
              "& strong, & b": {
                color: "#ffffff !important",
                fontWeight: 700,
              },
              "& em, & i": {
                color: "#ffffff !important",
                fontStyle: "italic",
              },
              "& u": {
                color: "#ffffff !important",
                textDecoration: "underline",
              },
            },
            "& .ProseMirrorFocused": {
              outline: "none",
            },
          },
          controlsGroup: {
            background: "transparent",
            gap: rem(4),
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
          </RichTextEditor.ControlsGroup>

          {/* Headings */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          {/* Text Style */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
          </RichTextEditor.ControlsGroup>

          {/* Lists and Structure */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Blockquote />
          </RichTextEditor.ControlsGroup>

          {/* Text Alignment */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
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

          {/* Advanced */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Hr />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          {/* History */}
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Undo />
            <RichTextEditor.Redo />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
      </RichTextEditor>
    </Box>
  );
}
