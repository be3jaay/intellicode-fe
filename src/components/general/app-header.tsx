'use client';

import { HiredUpLogo } from '@/icons';
import {
  Burger,
  Container,
  Group,
  Menu,
  Text,
  Flex,
  Box,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/auth-context';

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function HeaderMenu() {
  const [opened, { toggle }] = useDisclosure(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // Safely get auth state
  let isAuthenticated = false;
  let user = null;
  let logout = () => { };

  try {
    const auth = useAuth();
    isAuthenticated = auth.isAuthenticated;
    user = auth.user;
    logout = auth.signOut;
  } catch (error) {
    // AuthProvider not available, treat as unauthenticated
    console.warn('AuthProvider not available in HeaderMenu');
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const items = (
    <Flex gap="lg" align="center">
      {links.map(link => {
        const menuItems = link.links?.map(item => (
          <Menu.Item
            style={{
              padding: '0.5rem 2rem',
            }}
            key={item.link}
          >
            {item.label}
          </Menu.Item>
        ));

        if (menuItems) {
          return (
            <Menu
              key={link.label}
              trigger="hover"
              transitionProps={{ exitDuration: 0 }}
              withinPortal
            >
              <Menu.Target>
                <Button
                  variant="ghost"
                  color="dark"
                  rightSection={<ChevronDown size={14} />}
                >
                  <Text size="sm" fw={500} c="dark">
                    {link.label}
                  </Text>
                </Button>
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          );
        }

        return (
          <Button
            key={link.label}
            variant="ghost"
            color="dark"
            style={{ fontWeight: 500 }}
          >
            {link.label}
          </Button>
        );
      })}
    </Flex>
  );

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-in-out',
        boxShadow: isScrolled ? '0 2px 20px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <Container size="xl" py={isScrolled ? 8 : 12}>
        <Group justify="space-between" h="100%">
          <Group>
            <Group gap="xs">
              <HiredUpLogo fill="#2563eb" withLogo />
            </Group>
          </Group>

          <Group gap="sm" visibleFrom="sm">
            {items}
          </Group>
          <Flex gap={12}>
            {isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  color="dark"
                  onClick={() => router.push('/dashboard')}
                >
                  Dashboard
                </Button>
                <Button
                  variant="outline"
                  color="red"
                  onClick={logout}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" color="dark" onClick={() => router.push('/sign-in')}>
                  Sign In
                </Button>
                <Button onClick={() => router.push('/sign-up')}>
                  Get Started
                </Button>
              </>
            )}
          </Flex>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
          />
        </Group>
      </Container>
    </Box>
  );
}