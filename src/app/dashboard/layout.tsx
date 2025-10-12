'use client';

import { NavigationHeader } from '@/components/ui/navigation-header';
import { NavigationBar } from '@/components/ui/navigation-bar';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { WithAuth } from '@/components/withAuth';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <WithAuth>
            <AppShell
                header={{ height: 80 }}
                navbar={{
                    width: 300,
                    breakpoint: 'sm',
                    collapsed: { mobile: !opened },
                }}
                padding="xl"
            >
                <AppShell.Header>
                    <NavigationHeader opened={opened} toggle={toggle} />
                </AppShell.Header>
                <AppShell.Navbar p="md">
                    <NavigationBar />
                </AppShell.Navbar>
                <AppShell.Main>
                    {children}
                </AppShell.Main>
            </AppShell>
        </WithAuth>
    );
}

