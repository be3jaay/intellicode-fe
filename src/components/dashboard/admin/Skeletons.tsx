"use client";

import React from "react";
import { Skeleton, Grid, Card, Stack } from "@mantine/core";

export function AdminSkeletons() {
  return (
    <Stack gap="xl">
      {/* Sparkline Trends Skeleton */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Skeleton height={200} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Skeleton height={200} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Skeleton height={200} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
          <Skeleton height={200} radius={8} />
        </Grid.Col>
      </Grid>

      {/* Stats Grid Skeleton */}
      <Grid gutter="md">
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xs: 6, md: 4, lg: 2 }}>
          <Skeleton height={140} radius={8} />
        </Grid.Col>
      </Grid>

      {/* System Analytics Charts Skeleton */}
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ backgroundColor: "#2a2a2a" }}
          >
            <Skeleton height={20} width={200} mb={16} />
            <Skeleton height={300} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ backgroundColor: "#2a2a2a" }}
          >
            <Skeleton height={20} width={200} mb={16} />
            <Skeleton height={300} />
          </Card>
        </Grid.Col>
        <Grid.Col span={12}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ backgroundColor: "#2a2a2a" }}
          >
            <Skeleton height={20} width={250} mb={16} />
            <Skeleton height={350} />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Course Analytics Skeleton */}
      <Grid gutter="lg">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ backgroundColor: "#2a2a2a" }}
          >
            <Skeleton height={20} width={200} mb={16} />
            <Skeleton height={300} />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{ backgroundColor: "#2a2a2a" }}
          >
            <Skeleton height={20} width={200} mb={16} />
            <Skeleton height={300} />
          </Card>
        </Grid.Col>
      </Grid>

      {/* Performance Charts Skeleton */}
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{ backgroundColor: "#2a2a2a" }}
      >
        <Skeleton height={20} width={250} mb={16} />
        <Skeleton height={350} />
      </Card>

      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        style={{ backgroundColor: "#2a2a2a" }}
      >
        <Skeleton height={20} width={250} mb={16} />
        <Skeleton height={350} />
      </Card>
    </Stack>
  );
}

export default AdminSkeletons;
