import { Box, Loader } from "@mantine/core";
import dynamic from "next/dynamic";

export const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <Box
      style={{
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#1e1e1e",
        borderRadius: "8px",
      }}
    >
      <Loader size="lg" color="blue" />
    </Box>
  ),
});
