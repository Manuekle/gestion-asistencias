/* eslint-disable import/prefer-default-export */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */

import React from "react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer } from "./ui/chart.tsx";

const chartConfig = {
  percentage: {
    label: "Percentage",
    color: "black",
  },
};

const sizes = {
  small: {
    containerSize: "h-[100px] w-[100px]",
    innerRadius: 30,
    outerRadius: 45,
    fontSize: "text-base",
    labelSize: "text-[10px]",
  },
  medium: {
    containerSize: "h-[150px] w-[150px]",
    innerRadius: 50,
    outerRadius: 70,
    fontSize: "text-2xl",
    labelSize: "text-xs",
  },
  large: {
    containerSize: "h-[200px] w-[200px]",
    innerRadius: 70,
    outerRadius: 95,
    fontSize: "text-3xl",
    labelSize: "text-sm",
  },
};

function ChartRadialPercentage({
  size = "small",
  percentage = 0,
  className = "",
}) {
  const { containerSize, innerRadius, outerRadius, fontSize, labelSize } =
    sizes[size];

  // Ensure percentage is between 0 and 100
  const safePercentage = Math.min(100, Math.max(0, percentage));

  const chartData = [
    {
      name: "Percentage",
      percentage: safePercentage,
      fill: "var(--color-percentage)",
    },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className={`aspect-square ${containerSize} ${className}`}
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={-270}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="fill-muted/20"
        />
        <RadialBar
          dataKey="percentage"
          background
          clockWise
          cornerRadius={outerRadius - innerRadius}
          fill="var(--color-percentage)"
        />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className={`fill-foreground font-bold ${fontSize}`}
                    >
                      {`${safePercentage}%`}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + (size === "small" ? 12 : 16)}
                      className={`fill-muted-foreground ${labelSize}`}
                    >
                      Complete
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
export default ChartRadialPercentage;
