/**
 * Sample Test Data for Attachment Preview System
 * 
 * Use this data to test the attachment preview functionality
 * with various file types and edge cases.
 */

export const sampleAttachments = {
  // Complete example with all file types
  allTypes: [
    {
      id: "att_001",
      filename: "assignment-brief.pdf",
      original_name: "Assignment Brief - Week 1.pdf",
      file_type: "pdf",
      mime_type: "application/pdf",
      size: 2458624, // 2.3 MB
      public_url: "https://storage.example.com/files/assignment-brief.pdf"
    },
    {
      id: "att_002",
      filename: "diagram.png",
      original_name: "System Architecture Diagram.png",
      file_type: "image",
      mime_type: "image/png",
      size: 875520, // 856 KB
      public_url: "https://storage.example.com/files/diagram.png"
    },
    {
      id: "att_003",
      filename: "tutorial.mp4",
      original_name: "Tutorial Video - Part 1.mp4",
      file_type: "video",
      mime_type: "video/mp4",
      size: 15728640, // 15 MB
      public_url: "https://storage.example.com/files/tutorial.mp4"
    },
    {
      id: "att_004",
      filename: "lecture-audio.mp3",
      original_name: "Lecture Recording.mp3",
      file_type: "audio",
      mime_type: "audio/mpeg",
      size: 8912896, // 8.5 MB
      public_url: "https://storage.example.com/files/lecture-audio.mp3"
    },
    {
      id: "att_005",
      filename: "instructions.txt",
      original_name: "Assignment Instructions.txt",
      file_type: "text",
      mime_type: "text/plain",
      size: 12288, // 12 KB
      public_url: "https://storage.example.com/files/instructions.txt"
    },
    {
      id: "att_006",
      filename: "starter-code.zip",
      original_name: "Starter Code Package.zip",
      file_type: "archive",
      mime_type: "application/zip",
      size: 5242880, // 5 MB
      public_url: "https://storage.example.com/files/starter-code.zip"
    }
  ],

  // PDF examples
  pdfExamples: [
    {
      id: "att_pdf_1",
      filename: "rubric.pdf",
      original_name: "Assignment Rubric.pdf",
      file_type: "pdf",
      mime_type: "application/pdf",
      size: 524288, // 512 KB
      public_url: "https://storage.example.com/files/rubric.pdf"
    },
    {
      id: "att_pdf_2",
      filename: "readings.pdf",
      original_name: "Required Readings - Chapter 5.pdf",
      file_type: "pdf",
      mime_type: "application/pdf",
      size: 10485760, // 10 MB
      public_url: "https://storage.example.com/files/readings.pdf"
    }
  ],

  // Image examples (various formats)
  imageExamples: [
    {
      id: "att_img_1",
      filename: "screenshot.png",
      original_name: "Expected Output Screenshot.png",
      file_type: "image",
      mime_type: "image/png",
      size: 1048576, // 1 MB
      public_url: "https://storage.example.com/files/screenshot.png"
    },
    {
      id: "att_img_2",
      filename: "flowchart.jpg",
      original_name: "Algorithm Flowchart.jpg",
      file_type: "image",
      mime_type: "image/jpeg",
      size: 786432, // 768 KB
      public_url: "https://storage.example.com/files/flowchart.jpg"
    },
    {
      id: "att_img_3",
      filename: "wireframe.webp",
      original_name: "UI Wireframe.webp",
      file_type: "image",
      mime_type: "image/webp",
      size: 204800, // 200 KB
      public_url: "https://storage.example.com/files/wireframe.webp"
    }
  ],

  // Video examples
  videoExamples: [
    {
      id: "att_vid_1",
      filename: "demo.mp4",
      original_name: "Feature Demo.mp4",
      file_type: "video",
      mime_type: "video/mp4",
      size: 20971520, // 20 MB
      public_url: "https://storage.example.com/files/demo.mp4"
    },
    {
      id: "att_vid_2",
      filename: "presentation.webm",
      original_name: "Student Presentation.webm",
      file_type: "video",
      mime_type: "video/webm",
      size: 15728640, // 15 MB
      public_url: "https://storage.example.com/files/presentation.webm"
    }
  ],

  // Audio examples
  audioExamples: [
    {
      id: "att_aud_1",
      filename: "podcast.mp3",
      original_name: "Guest Speaker Podcast.mp3",
      file_type: "audio",
      mime_type: "audio/mpeg",
      size: 12582912, // 12 MB
      public_url: "https://storage.example.com/files/podcast.mp3"
    },
    {
      id: "att_aud_2",
      filename: "interview.wav",
      original_name: "Research Interview.wav",
      file_type: "audio",
      mime_type: "audio/wav",
      size: 25165824, // 24 MB
      public_url: "https://storage.example.com/files/interview.wav"
    }
  ],

  // Text/Code examples
  textExamples: [
    {
      id: "att_txt_1",
      filename: "readme.md",
      original_name: "README.md",
      file_type: "text",
      mime_type: "text/markdown",
      size: 8192, // 8 KB
      public_url: "https://storage.example.com/files/readme.md"
    },
    {
      id: "att_txt_2",
      filename: "config.json",
      original_name: "Configuration.json",
      file_type: "text",
      mime_type: "application/json",
      size: 4096, // 4 KB
      public_url: "https://storage.example.com/files/config.json"
    },
    {
      id: "att_txt_3",
      filename: "notes.txt",
      original_name: "Lecture Notes.txt",
      file_type: "text",
      mime_type: "text/plain",
      size: 16384, // 16 KB
      public_url: "https://storage.example.com/files/notes.txt"
    }
  ],

  // Code file examples
  codeExamples: [
    {
      id: "att_code_1",
      filename: "solution.py",
      original_name: "Sample Solution.py",
      file_type: "code",
      mime_type: "text/x-python",
      size: 12288, // 12 KB
      public_url: "https://storage.example.com/files/solution.py"
    },
    {
      id: "att_code_2",
      filename: "component.tsx",
      original_name: "Component Example.tsx",
      file_type: "code",
      mime_type: "text/typescript",
      size: 8192, // 8 KB
      public_url: "https://storage.example.com/files/component.tsx"
    }
  ],

  // Archive/Other examples
  archiveExamples: [
    {
      id: "att_zip_1",
      filename: "dataset.zip",
      original_name: "Training Dataset.zip",
      file_type: "archive",
      mime_type: "application/zip",
      size: 104857600, // 100 MB
      public_url: "https://storage.example.com/files/dataset.zip"
    },
    {
      id: "att_zip_2",
      filename: "resources.rar",
      original_name: "Additional Resources.rar",
      file_type: "archive",
      mime_type: "application/x-rar-compressed",
      size: 52428800, // 50 MB
      public_url: "https://storage.example.com/files/resources.rar"
    }
  ],

  // Edge case: Missing public_url
  missingUrl: [
    {
      id: "att_err_1",
      filename: "broken.pdf",
      original_name: "Broken Link.pdf",
      file_type: "pdf",
      mime_type: "application/pdf",
      size: 1024000,
      public_url: "" // Empty URL - should show error state
    }
  ],

  // Edge case: No mime_type (relies on extension)
  noMimeType: [
    {
      id: "att_ext_1",
      filename: "document.pdf",
      original_name: "Document Without MIME.pdf",
      file_type: "unknown",
      // mime_type is missing
      size: 2048000,
      public_url: "https://storage.example.com/files/document.pdf"
    }
  ],

  // Edge case: Large text file (should show fallback)
  largeTextFile: [
    {
      id: "att_large_1",
      filename: "dataset.csv",
      original_name: "Large Dataset.csv",
      file_type: "text",
      mime_type: "text/csv",
      size: 5242880, // 5 MB - exceeds 1MB limit
      public_url: "https://storage.example.com/files/dataset.csv"
    }
  ],

  // Edge case: Unsupported file types
  unsupportedTypes: [
    {
      id: "att_doc_1",
      filename: "report.docx",
      original_name: "Final Report.docx",
      file_type: "document",
      mime_type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      size: 3145728, // 3 MB
      public_url: "https://storage.example.com/files/report.docx"
    },
    {
      id: "att_ppt_1",
      filename: "slides.pptx",
      original_name: "Presentation Slides.pptx",
      file_type: "presentation",
      mime_type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      size: 8388608, // 8 MB
      public_url: "https://storage.example.com/files/slides.pptx"
    },
    {
      id: "att_xls_1",
      filename: "data.xlsx",
      original_name: "Data Analysis.xlsx",
      file_type: "spreadsheet",
      mime_type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 2097152, // 2 MB
      public_url: "https://storage.example.com/files/data.xlsx"
    }
  ],

  // Empty array (component should not render)
  emptyArray: [],

  // Single attachment
  singleAttachment: [
    {
      id: "att_single_1",
      filename: "assignment.pdf",
      original_name: "Assignment Instructions.pdf",
      file_type: "pdf",
      mime_type: "application/pdf",
      size: 1048576, // 1 MB
      public_url: "https://storage.example.com/files/assignment.pdf"
    }
  ],

  // Many attachments (performance test)
  manyAttachments: Array.from({ length: 15 }, (_, i) => ({
    id: `att_many_${i + 1}`,
    filename: `file-${i + 1}.pdf`,
    original_name: `Test File ${i + 1}.pdf`,
    file_type: "pdf",
    mime_type: "application/pdf",
    size: Math.floor(Math.random() * 5000000) + 500000, // 500KB - 5MB
    public_url: `https://storage.example.com/files/file-${i + 1}.pdf`
  }))
};

/**
 * Mock Assignment Data with Attachments
 */
export const mockAssignmentWithAttachments = {
  id: "asgn_001",
  title: "Week 5: Full Stack Development Project",
  description: "Build a complete full-stack application using React and Node.js. Review the attached materials for requirements and examples.",
  assignmentType: "assignment" as const,
  assignmentSubtype: "file_upload" as const,
  difficulty: "hard" as const,
  points: 100,
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  is_published: true,
  secured_browser: false,
  module_id: "mod_001",
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
  updated_at: new Date().toISOString(),
  questions: [],
  starterCode: null,
  already_submitted: false,
  instructor: {
    id: "inst_001",
    first_name: "John",
    last_name: "Smith",
    email: "john.smith@university.edu",
    avatar_url: null
  },
  attachments: sampleAttachments.allTypes
};

/**
 * Usage Example:
 * 
 * // In your component for testing
 * import { sampleAttachments, mockAssignmentWithAttachments } from './test-data';
 * 
 * // Test with all types
 * <AttachmentPreviewList attachments={sampleAttachments.allTypes} />
 * 
 * // Test with only PDFs
 * <AttachmentPreviewList attachments={sampleAttachments.pdfExamples} />
 * 
 * // Test with edge cases
 * <AttachmentPreviewList attachments={sampleAttachments.missingUrl} />
 * 
 * // Test with empty array (component should not render)
 * <AttachmentPreviewList attachments={sampleAttachments.emptyArray} />
 * 
 * // Use full mock assignment
 * const assignment = mockAssignmentWithAttachments;
 */

/**
 * Real-world URL Examples (for actual testing)
 * Replace the example.com URLs above with these public URLs:
 */
export const publicTestUrls = {
  pdf: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  image: "https://via.placeholder.com/800x600.png",
  video: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  json: "https://jsonplaceholder.typicode.com/posts/1",
};

/**
 * Test Scenarios
 */
export const testScenarios = {
  "All file types": sampleAttachments.allTypes,
  "PDF only": sampleAttachments.pdfExamples,
  "Images only": sampleAttachments.imageExamples,
  "Videos only": sampleAttachments.videoExamples,
  "Audio only": sampleAttachments.audioExamples,
  "Text/Code only": [...sampleAttachments.textExamples, ...sampleAttachments.codeExamples],
  "Archives only": sampleAttachments.archiveExamples,
  "Edge case: Missing URL": sampleAttachments.missingUrl,
  "Edge case: No MIME type": sampleAttachments.noMimeType,
  "Edge case: Large text file": sampleAttachments.largeTextFile,
  "Edge case: Unsupported types": sampleAttachments.unsupportedTypes,
  "Edge case: Empty array": sampleAttachments.emptyArray,
  "Edge case: Single attachment": sampleAttachments.singleAttachment,
  "Performance: Many attachments": sampleAttachments.manyAttachments,
};
