"use client";

import { NavigationHeader } from "@/components/ui/navigation-header";
import { NavigationBar } from "@/components/ui/navigation-bar";
import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WithAuth } from "@/components/withAuth";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();

  // Hide navigation for assignment pages
  const isAssignmentPage = pathname?.includes("/student/assignment/");

  return (
    <WithAuth>
      <AppShell
        header={isAssignmentPage ? undefined : { height: 80 }}
        navbar={
          isAssignmentPage
            ? undefined
            : {
                width: 280,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
              }
        }
        padding={isAssignmentPage ? 0 : "xl"}
        styles={{
          main: {
            background: "#222222",
            minHeight: "100vh",
          },
          navbar: {
            background: "#2a2a2a",
            borderRight: "1px solid rgba(189, 240, 82, 0.1)",
            textColor: "white",
          },
          header: {
            background: "#2a2a2a",
            borderBottom: "1px solid rgba(189, 240, 82, 0.1)",
          },
        }}
      >
        {!isAssignmentPage && (
          <>
            <AppShell.Header>
              <NavigationHeader opened={opened} toggle={toggle} />
            </AppShell.Header>
            <AppShell.Navbar p="md">
              <NavigationBar />
            </AppShell.Navbar>
          </>
        )}
        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </WithAuth>
  );
}
